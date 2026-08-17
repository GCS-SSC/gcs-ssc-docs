import { existsSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'

const docsRoot = resolve(import.meta.dir, '..')
const appRoot = resolve(process.env.GCS_SSC_SOURCE ?? join(docsRoot, '..', 'gcs-ssc'))
const auditRoot = join(docsRoot, 'documentation-audit')
const terminalStatuses = new Set(['DOCUMENTED_VERIFIED', 'NOT_APPLICABLE_VERIFIED'])
const errors: string[] = []

interface CoverageRow {
  id: string
  source: string
  audience: string[]
  en: string
  fr: string
  evidence: string[]
  status: string
  notes: string
}

const walk = async (root: string, predicate: (path: string) => boolean): Promise<string[]> => {
  const paths: string[] = []
  const visit = async (directory: string): Promise<void> => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) await visit(path)
      else if (predicate(path)) paths.push(path)
    }
  }
  await visit(root)
  return paths.sort()
}

const slugify = (heading: string): string => heading
  .trim()
  .toLowerCase()
  .replace(/<[^>]+>/g, '')
  .replace(/[`*_~]/g, '')
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .replace(/\s+/g, '-')

const markdownFiles = await walk(docsRoot, path =>
  path.endsWith('.md') && !path.includes('/node_modules/') && !path.includes('/documentation-audit/')
)
const localeRelative = async (locale: 'en' | 'fr'): Promise<Set<string>> => new Set(
  (await walk(join(docsRoot, locale), path => path.endsWith('.md'))).map(path => relative(join(docsRoot, locale), path))
)
const enFiles = await localeRelative('en')
const frFiles = await localeRelative('fr')
for (const path of enFiles) if (!frFiles.has(path)) errors.push(`Missing French counterpart: fr/${path}`)
for (const path of frFiles) if (!enFiles.has(path)) errors.push(`Missing English counterpart: en/${path}`)
for (const path of [...enFiles].filter(path => frFiles.has(path)).sort()) {
  const enText = await readFile(join(docsRoot, 'en', path), 'utf8')
  const frText = await readFile(join(docsRoot, 'fr', path), 'utf8')
  const structure = (text: string): string[] => [
    ...[...text.matchAll(/^(#{1,6})\s+/gm)].map(match => `h${match[1].length}`),
    ...[...text.matchAll(/^\|.*\|$/gm)].map(() => 'table-row'),
    ...[...text.matchAll(/^```/gm)].map(() => 'fence')
  ]
  const enStructure = structure(enText)
  const frStructure = structure(frText)
  if (JSON.stringify(enStructure) !== JSON.stringify(frStructure)) {
    errors.push(`English/French heading, table, or code-block structure differs: ${path}`)
  }
}

const coverageNames = [
  'domain-coverage.json',
  'page-coverage.json',
  'api-coverage.json',
  'data-coverage.json',
  'extension-coverage.json',
  'config-coverage.json',
  'audit-impact-coverage.json'
]
const coverage = new Map<string, CoverageRow[]>()
for (const name of coverageNames) {
  const path = join(auditRoot, name)
  if (!existsSync(path)) {
    errors.push(`Missing coverage ledger: documentation-audit/${name}`)
    continue
  }
  let rows: CoverageRow[] = []
  try {
    rows = JSON.parse(await readFile(path, 'utf8')) as CoverageRow[]
  } catch (error) {
    errors.push(`Invalid JSON in ${name}: ${String(error)}`)
    continue
  }
  coverage.set(name, rows)
  const ids = new Set<string>()
  for (const [index, row] of rows.entries()) {
    for (const field of ['id', 'source', 'en', 'fr', 'status', 'notes'] as const) {
      if (typeof row[field] !== 'string' || row[field].trim() === '') errors.push(`${name}[${index}] missing ${field}`)
    }
    if (!Array.isArray(row.audience) || row.audience.length === 0) errors.push(`${name}[${index}] missing audience`)
    if (!Array.isArray(row.evidence) || row.evidence.length === 0) errors.push(`${name}[${index}] missing evidence`)
    if (ids.has(row.id)) errors.push(`${name} duplicate ID: ${row.id}`)
    ids.add(row.id)
    if (!terminalStatuses.has(row.status)) errors.push(`${name} non-terminal status: ${row.id}=${row.status}`)
    for (const destination of [row.en, row.fr]) {
      if (!existsSync(join(docsRoot, destination))) errors.push(`${name} destination does not exist: ${row.id} -> ${destination}`)
    }
    const sourceParts = row.source.split(';').map(value => value.trim().split('#')[0]).filter(Boolean)
    for (const source of sourceParts) {
      if (source.includes('*')) continue
      if (!existsSync(join(appRoot, source))) errors.push(`${name} source does not exist: ${row.id} -> ${source}`)
    }
  }
}

const pageRows = new Set((coverage.get('page-coverage.json') ?? []).map(row => row.id))
for (const path of await walk(join(appRoot, 'app/pages'), path => path.endsWith('.vue'))) {
  const source = relative(appRoot, path)
  if (!pageRows.has(`page:${source}`)) errors.push(`Discovered Nuxt page missing from inventory: ${source}`)
}
for (const path of await walk(join(appRoot, 'app/components'), path => path.endsWith('.vue'))) {
  const source = relative(appRoot, path)
  if (!pageRows.has(`component:${source}`)) errors.push(`Discovered Vue component missing from inventory: ${source}`)
}

const apiRows = new Set((coverage.get('api-coverage.json') ?? []).map(row => row.id))
for (const path of await walk(join(appRoot, 'server/api'), path => path.endsWith('.ts'))) {
  const source = relative(appRoot, path)
  if (!apiRows.has(`api:${source}`)) errors.push(`Discovered API handler missing from inventory: ${source}`)
}

const migrationRegistry = await readFile(join(appRoot, 'server/database/production-core-migrations.ts'), 'utf8')
const dataRows = new Set((coverage.get('data-coverage.json') ?? []).map(row => row.id))
for (const match of migrationRegistry.matchAll(/'(?<name>\d{4}_[^']+)':/g)) {
  if (!dataRows.has(`migration:${match.groups!.name}`)) errors.push(`Registered migration missing from inventory: ${match.groups!.name}`)
}

const extensionRows = new Set((coverage.get('extension-coverage.json') ?? []).map(row => row.id))
for (const path of await walk(join(appRoot, 'extensions'), path => path.endsWith('/extension.config.ts'))) {
  const text = await readFile(path, 'utf8')
  const key = text.match(/key:\s*'([^']+)'/)?.[1]
  if (!key || !extensionRows.has(`extension:${key}`)) errors.push(`Installed extension missing from inventory: ${relative(appRoot, path)}`)
}

const resolveMarkdownTarget = (sourceFile: string, href: string): { path: string, anchor: string } | null => {
  if (/^(?:https?:|mailto:|tel:|javascript:)/.test(href)) return null
  const [rawPath, anchor = ''] = href.split('#', 2)
  if (rawPath === '' && anchor) return { path: sourceFile, anchor }
  const cleanPath = rawPath.split('?')[0]
  let target = cleanPath.startsWith('/') ? join(docsRoot, cleanPath) : resolve(dirname(sourceFile), cleanPath)
  if (extname(target) === '') {
    const mdTarget = `${target}.md`
    const indexTarget = join(target, 'index.md')
    target = existsSync(mdTarget) ? mdTarget : indexTarget
  }
  return { path: target, anchor }
}

const routeOwners = new Map<string, string>()
for (const file of markdownFiles) {
  const route = `/${relative(docsRoot, file).replace(/(?:\/index)?\.md$/, '')}`.replace(/\/$/, '') || '/'
  const existing = routeOwners.get(route)
  if (existing) errors.push(`Duplicate documentation route ${route}: ${existing}, ${relative(docsRoot, file)}`)
  routeOwners.set(route, relative(docsRoot, file))
  const text = await readFile(file, 'utf8')
  for (const match of text.matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = resolveMarkdownTarget(file, match[1])
    if (!target) continue
    if (!existsSync(target.path)) {
      errors.push(`Dead Markdown link in ${relative(docsRoot, file)}: ${match[1]}`)
      continue
    }
    if (target.anchor && target.path.endsWith('.md')) {
      const targetText = await readFile(target.path, 'utf8')
      const anchors = new Set([...targetText.matchAll(/^#{1,6}\s+(.+)$/gm)].map(item => slugify(item[1])))
      if (!anchors.has(decodeURIComponent(target.anchor).toLowerCase())) errors.push(`Missing heading anchor in ${relative(docsRoot, file)}: ${match[1]}`)
    }
  }
}

const configText = await readFile(join(docsRoot, '.vitepress/config.mts'), 'utf8')
for (const match of configText.matchAll(/link:\s*[`'"]([^`'"]+)[`'"]/g)) {
  const link = match[1]
  if (link.includes('${')) continue
  const target = resolveMarkdownTarget(join(docsRoot, 'index.md'), link)
  if (target && !existsSync(target.path)) errors.push(`Navigation target does not exist: ${link}`)
}

const rootIndex = await readFile(join(docsRoot, 'index.md'), 'utf8')
if (!rootIndex.includes('window.location.replace') || !rootIndex.includes('/en/')) errors.push('Root index must implement an English locale redirect.')

const statusText = existsSync(join(auditRoot, 'status.md')) ? await readFile(join(auditRoot, 'status.md'), 'utf8') : ''
if (!statusText.includes('zero remaining items')) errors.push('documentation-audit/status.md does not record zero remaining items.')
if (!statusText.includes('bun run docs:check')) errors.push('documentation-audit/status.md does not record the docs checker result.')

if (errors.length > 0) {
  errors.sort((left, right) => Number(left.includes('non-terminal status')) - Number(right.includes('non-terminal status')))
  console.error(`Documentation checks failed with ${errors.length} error(s):`)
  for (const error of errors.slice(0, 200)) console.error(`- ${error}`)
  if (errors.length > 200) console.error(`- ... ${errors.length - 200} additional errors omitted`)
  process.exit(1)
}

const build = Bun.spawn(['bun', 'run', 'docs:build'], { cwd: docsRoot, stdout: 'inherit', stderr: 'inherit' })
const exitCode = await build.exited
if (exitCode !== 0) process.exit(exitCode)
console.log('Documentation coverage, parity, navigation, links, anchors, redirects, source reconciliation, and production build passed.')
