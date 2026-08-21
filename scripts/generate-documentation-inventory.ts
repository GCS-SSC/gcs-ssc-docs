import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { basename, dirname, join, relative, resolve } from 'node:path'

const docsRoot = resolve(import.meta.dir, '..')
const appRoot = resolve(process.env.GCS_SSC_SOURCE ?? join(docsRoot, '..', 'gcs-ssc'))
const auditRoot = join(docsRoot, 'documentation-audit')
const sourceAuditRoot = join(appRoot, 'audit')

type Status = 'IN_PROGRESS' | 'DOCUMENTED_VERIFIED' | 'NOT_APPLICABLE_VERIFIED'

interface CoverageRow {
  id: string
  source: string
  audience: string[]
  en: string
  fr: string
  evidence: string[]
  status: Status
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

const readExisting = async (name: string): Promise<Map<string, CoverageRow>> => {
  const path = join(auditRoot, name)
  if (!existsSync(path)) return new Map()
  const rows = JSON.parse(await readFile(path, 'utf8')) as CoverageRow[]
  return new Map(rows.map(row => [row.id, row]))
}

const merge = (generated: CoverageRow[], existing: Map<string, CoverageRow>): CoverageRow[] =>
  generated.map(row => {
    const prior = existing.get(row.id)
    return prior
      ? {
          ...row,
          audience: prior.audience,
          en: prior.en,
          fr: prior.fr,
          evidence: prior.evidence,
          status: prior.status,
          notes: prior.notes
        }
      : row
  })

const writeCoverage = async (name: string, rows: CoverageRow[]): Promise<void> => {
  const existing = await readExisting(name)
  await writeFile(join(auditRoot, name), `${JSON.stringify(merge(rows, existing), null, 2)}\n`)
}

const row = (
  id: string,
  source: string,
  audience: string[],
  destination: string,
  notes: string
): CoverageRow => ({
  id,
  source,
  audience,
  en: `en/${destination}`,
  fr: `fr/${destination}`,
  evidence: [source],
  status: 'IN_PROGRESS',
  notes
})

const pageDestination = (source: string): string => {
  const normalized = source.toLowerCase()
  if (normalized.includes('/assignment-management') || normalized.includes('/assignedusers')) return 'admin/assignments.md'
  if (normalized.includes('/claim-reconciliations/')) return 'agreements/claims.md'
  if (normalized.includes('/recommendations/')) return 'concepts/workflows.md'
  if (normalized.includes('/recommendationsetupschemacreatemodal')) return 'programs/recommendations.md'
  if (normalized.includes('/homestats')) return 'getting-started/navigation.md'
  if (normalized.includes('/agreementcloseout') || normalized.includes('/closeouts/')) return 'agreements/closeouts.md'
  if (normalized.includes('/agreement/fields/')) return 'agreements/index.md'
  if (normalized.includes('/agreement') || normalized.includes('/agreements/')) return 'agreements/index.md'
  if (normalized.includes('/applicantrecipient') || normalized.includes('/proponents/')) return 'proponents/index.md'
  if (normalized.includes('/transferpayment') || normalized.includes('/transfer-payments/')) return 'programs/streams.md'
  if (normalized.includes('/role/') || normalized.includes('/roles/')) return 'admin/roles.md'
  if (normalized.includes('/user/') || normalized.includes('/users/')) return 'admin/users.md'
  if (normalized.includes('/agency/') || normalized.includes('/agencies/')) return 'admin/agencies.md'
  if (normalized.includes('/admincommon') || normalized.includes('/admin/common')) return 'admin/common-admin.md'
  if (normalized.includes('/assessment') || normalized.includes('/checklist') || normalized.includes('/reviews/')) return 'programs/assessment-schemas.md'
  if (normalized.includes('/recommendation') || normalized.includes('/common/approval') || normalized.includes('/common/completion') || normalized.includes('/common/workflow')) return 'concepts/approvals-completions.md'
  if (normalized.includes('/extension/')) return 'concepts/extensions.md'
  if (normalized.endsWith('/login.vue')) return 'getting-started/login.md'
  return 'getting-started/navigation.md'
}

const apiDestination = (source: string): string => {
  if (source.includes('/entity-assignments/') || source.includes('/assigned-work') || source.includes('/assignment-management')) return 'developer/api/identity.md'
  if (source.includes('/claim-reconciliations/')) return 'developer/api/agreements.md'
  if (source.includes('/recommendations/')) return 'developer/api/workflows.md'
  if (source.includes('/agreements/')) return 'developer/api/agreements.md'
  if (source.includes('/applicant-recipients/')) return 'developer/api/applicant-recipients.md'
  if (source.includes('/transfer-payments/')) return 'developer/api/transfer-payments.md'
  if (source.includes('/review-sets/') || source.includes('/reviews/')) return 'developer/api/reviews.md'
  if (source.includes('/approval-templates/') || source.includes('/approvals/')) return 'developer/api/approvals.md'
  if (source.includes('/workflows/') || source.includes('/completions/')) return 'developer/api/workflows.md'
  if (source.includes('/extensions/')) return 'developer/api/extensions.md'
  if (source.includes('/agency/')) return 'developer/api/agencies.md'
  if (source.includes('/roles/') || source.includes('/users/') || source.includes('/auth/')) return 'developer/api/identity.md'
  return 'developer/api/platform.md'
}

await mkdir(auditRoot, { recursive: true })

const pagePaths = await walk(join(appRoot, 'app/pages'), path => path.endsWith('.vue'))
const componentPaths = await walk(join(appRoot, 'app/components'), path => path.endsWith('.vue'))
const shellPaths = [
  ...(await walk(join(appRoot, 'app/layouts'), path => path.endsWith('.vue'))),
  ...(await walk(join(appRoot, 'app/middleware'), path => path.endsWith('.ts')))
]
await writeCoverage('page-coverage.json', [...pagePaths, ...shellPaths, ...componentPaths].map(path => {
  const source = relative(appRoot, path)
  const kind = source.startsWith('app/components/') ? 'component' : 'page'
  return row(`${kind}:${source}`, source, ['end-user', 'administrator'], pageDestination(source), 'Page, layout, middleware, tab, modal, wizard, form, table, state, action, and accessibility behavior require direct bilingual verification or a justified not-applicable disposition.')
}))

const apiPaths = await walk(join(appRoot, 'server/api'), path => path.endsWith('.ts'))
const extractSymbols = (text: string, pattern: RegExp): string => {
  const values = new Set<string>()
  for (const match of text.matchAll(pattern)) values.add(match[1])
  return [...values].sort().join(', ') || 'none in route; inspect delegated/domain helper and API middleware'
}
const apiRows: CoverageRow[] = []
for (const path of apiPaths) {
  const source = relative(appRoot, path)
  const routeText = await readFile(path, 'utf8')
  const filename = basename(path)
  const method = filename.match(/\.(get|post|patch|put|delete)\.ts$/)?.[1]?.toUpperCase() ?? 'ANY'
  const routePath = `/${relative(join(appRoot, 'server/api'), path)}`
    .replace(/\.(get|post|patch|put|delete)\.ts$/, '')
    .replace(/\.ts$/, '')
    .replace(/index$/, '')
  const result = row(`api:${source}`, source, ['developer', 'operator'], apiDestination(source), 'Authorization, validation, domain path, response, and failure contracts require direct verification.')
  const authorization = extractSymbols(routeText, /\b([A-Za-z_$][\w$]*(?:[Aa]uthoriz|AuthContext|ScopeContext|TeamAccess)[\w$]*)\b/g)
  const validation = extractSymbols(routeText, /\b([A-Z][A-Za-z0-9_$]*Schema|readValidatedBodyI18n|getValidatedQueryI18n|parseI18n)\b/g)
  result.notes = `${method} /api${routePath}; authorization landmarks: ${authorization}; validation landmarks: ${validation}; request/response/error implementation: ${source}. Direct domain-helper and test evidence remains required.`
  apiRows.push(result)
}
await writeCoverage('api-coverage.json', apiRows)

const migrationRegistry = await readFile(join(appRoot, 'server/database/production-core-migrations.ts'), 'utf8')
const migrationNames = [...migrationRegistry.matchAll(/'(?<name>\d{4}_[^']+)':/g)].map(match => match.groups!.name)
const dataRows: CoverageRow[] = []
for (const name of migrationNames) {
  const source = `server/database/migrations/${name}.ts`
  const text = await readFile(join(appRoot, source), 'utf8')
  dataRows.push(row(`migration:${name}`, source, ['developer', 'operator'], 'developer/data-model.md', 'Registered ordered core migration and its PostgreSQL/PGlite behavior.'))
  const mechanisms = new Set<string>()
  for (const pattern of [
    /createTable\(['"`]([^'"`]+)['"`]\)/g,
    /createType\(['"`]([^'"`]+)['"`]\)/g,
    /CREATE(?: OR REPLACE)? FUNCTION\s+([\w.]+)/gi,
    /CREATE(?: CONSTRAINT)? TRIGGER\s+([\w.]+)(?=\s)/gi,
    /ADD CONSTRAINT\s+([\w.]+)/gi
  ]) {
    for (const match of text.matchAll(pattern)) mechanisms.add(match[1])
  }
  if (text.includes('createAssignmentLifecycleTriggers')) {
    for (const match of text.matchAll(/createAssignmentLifecycleTriggers\(\s*db,\s*'[^']+',\s*'[^']+',\s*'([^']+)'\s*\)/g)) {
      mechanisms.add(`trg_enforce_${match[1]}_assignment_roster`)
      mechanisms.add(`trg_soft_delete_${match[1]}_assignments`)
    }
    const assignmentEntities = text.match(/const assignmentEntities\s*=\s*\[([\s\S]*?)\]\s+as const/)?.[1] ?? ''
    for (const match of assignmentEntities.matchAll(/\[\s*'[^']+',\s*'[^']+',\s*'([^']+)'\s*\]/g)) {
      mechanisms.add(`trg_enforce_${match[1]}_assignment_roster`)
      mechanisms.add(`trg_soft_delete_${match[1]}_assignments`)
    }
  }
  for (const mechanism of [...mechanisms].sort()) {
    dataRows.push(row(`data:${name}:${mechanism.toLowerCase()}`, `${source}#${mechanism}`, ['developer', 'operator'], 'developer/data-model.md', 'Material table, enum, constraint, trigger, function, ownership, lifecycle, precision, or polymorphic integrity mechanism; verify exact kind and contract.'))
  }
}
await writeCoverage('data-coverage.json', dataRows)

const extensionConfigs = await walk(join(appRoot, 'extensions'), path => path.endsWith('/extension.config.ts'))
const extensionRows: CoverageRow[] = []
for (const path of extensionConfigs) {
  const source = relative(appRoot, path)
  const text = await readFile(path, 'utf8')
  const key = text.match(/key:\s*'([^']+)'/)?.[1] ?? basename(dirname(path))
  extensionRows.push(row(`extension:${key}`, source, ['end-user', 'administrator', 'operator', 'developer'], `extensions/${key === 'gcs-gcforms-integration' ? 'gc-forms' : key.replace(/^gcs-/, '')}.md`, 'Manifest, capabilities, contributions, enablement, RBAC, storage, failure, and deployment boundaries require direct verification.'))
  const destination = `extensions/${key === 'gcs-gcforms-integration' ? 'gc-forms' : key.replace(/^gcs-/, '')}.md`
  const capabilitiesBlock = text.match(/requiredHostCapabilities:\s*\[([\s\S]*?)\]/)?.[1] ?? ''
  for (const capability of [...capabilitiesBlock.matchAll(/'([^']+)'/g)].map(match => match[1])) {
    extensionRows.push(row(`extension:${key}:capability:${capability}`, `${source}#requiredHostCapabilities`, ['administrator', 'operator', 'developer'], destination, `Declared host capability: ${capability}.`))
  }
  const contributionPatterns: Array<[string, RegExp]> = [
    ['handler', /route:\s*'([^']+)'/g],
    ['migration', /migrations:\s*\[([\s\S]*?)\]/g],
    ['slot', /slot:\s*'([^']+)'/g],
    ['tab', /target:\s*'([^']+)'/g],
    ['operation', /operation:\s*'([^']+)'/g],
    ['asset', /baseURL:\s*'([^']+)'/g]
  ]
  for (const [kind, pattern] of contributionPatterns) {
    let index = 0
    for (const match of text.matchAll(pattern)) {
      const value = match[1].replace(/\s+/g, ' ').trim()
      extensionRows.push(row(`extension:${key}:${kind}:${index++}`, `${source}#${kind}:${value}`, ['end-user', 'administrator', 'operator', 'developer'], destination, `${kind} contribution: ${value}.`))
    }
  }
}
extensionRows.unshift(row('extension:host-platform', 'modules/gcs-extensions.ts; packages/gcs-ssc-extensions', ['administrator', 'operator', 'developer'], 'developer/extensions-authoring.md', 'Host scanner, SDK entry points, enablement, dispatch, capability, hook, migration, KV, secret, asset, and packaging boundaries.'))
await writeCoverage('extension-coverage.json', extensionRows)

const domains = [
  ['platform-shell', 'nuxt.config.ts; app/app.vue; app/layouts; app/middleware', 'getting-started/navigation.md'],
  ['identity-rbac-assignments', 'packages/gcs-ssc-authorization; server/utils/authorize.ts; server/utils/entity-assignment.ts; server/utils/entity-assignment-write.ts', 'concepts/rbac.md'],
  ['agency-administration', 'server/api/agency; app/pages/agencies', 'admin/agencies.md'],
  ['transfer-payment-design', 'server/api/transfer-payments; app/pages/transfer-payments', 'programs/index.md'],
  ['applicant-recipients', 'server/api/applicant-recipients; app/pages/proponents', 'proponents/index.md'],
  ['agreements-financial-lifecycle', 'server/api/agreements; app/pages/agreements', 'agreements/index.md'],
  ['reviews-assessments-checklists', 'server/api/reviews; server/api/review-sets', 'programs/assessment-schemas.md'],
  ['approvals-recommendations-completions-workflows', 'server/api/approvals; server/api/completions; server/api/workflows', 'concepts/approvals-completions.md'],
  ['common-administration', 'server/api/admin/common', 'admin/common-admin.md'],
  ['database-integrity-concurrency', 'server/database/migrations; server/utils/*transaction*', 'developer/data-model.md'],
  ['i18n-validation-errors', 'i18n; shared/types/schemas; server/utils/api-validate.ts', 'developer/validation-i18n.md'],
  ['files-documents', 'server/utils/file-storage.ts; server/utils/document-generation.ts', 'developer/document-generation.md'],
  ['extensions', 'modules/gcs-extensions.ts; extensions; packages/gcs-ssc-extensions', 'concepts/extensions.md'],
  ['workers-background-processing', 'server/workers; extensions/*/client', 'operator/background-work.md'],
  ['build-deployment-operations', 'package.json; nuxt.config.ts; Dockerfile; railway.json; .github/workflows', 'operator/deployment.md'],
  ['accessibility-ui-states', 'app/components; app/pages', 'getting-started/navigation.md']
] as const
await writeCoverage('domain-coverage.json', domains.map(([id, source, destination]) =>
  row(`domain:${id}`, source, ['end-user', 'administrator', 'operator', 'developer'], destination, 'Logical domain requires exhaustive source-to-documentation reconciliation.')
))

const configItems = [
  ['runtime-environment', 'nuxt.config.ts; server/utils/db.ts; server/utils/auth.ts'],
  ['local-setup-commands', 'package.json; scripts/setup-workspaces.ts; scripts/dev.ts'],
  ['database-modes', 'server/utils/db.ts; server/plugins/migrations.ts'],
  ['authentication-providers', 'server/utils/auth.ts; nuxt.config.ts'],
  ['storage-document-generation', 'server/utils/file-storage.ts; server/utils/local-file-storage.ts; server/utils/document-generation.ts'],
  ['docker-railway', 'Dockerfile; docker-compose.yml; railway.json'],
  ['ci-demo-webcontainer', '.github/workflows; scripts/webcontainer.ts'],
  ['health-readiness', 'server/api/health.get.ts'],
  ['quality-testing', 'package.json; scripts/agent; vitest*.ts; playwright.config.ts'],
  ['extension-packaging', 'modules/gcs-extensions.ts; Dockerfile; package.json']
] as const
await writeCoverage('config-coverage.json', configItems.map(([id, source]) =>
  row(`config:${id}`, source, ['operator', 'developer'], 'operator/configuration.md', 'Runtime/deployment surface requires verified variables, modes, commands, failure states, and operational guidance.')
))

const auditEvidencePaths = [
  ...(await walk(join(sourceAuditRoot, 'findings'), path => path.endsWith('.md'))),
  ...(await walk(join(sourceAuditRoot, 'investigations'), path => path.endsWith('.md') || path.endsWith('.json'))),
  ...(await walk(join(sourceAuditRoot, 'browser-personas'), path => path.endsWith('.md')))
]
await writeCoverage('audit-impact-coverage.json', auditEvidencePaths.map(path => {
  const source = relative(appRoot, path)
  const id = relative(sourceAuditRoot, path).replace(/\.[^.]+$/, '').replaceAll('/', ':')
  return row(`audit-impact:${id}`, source, ['end-user', 'administrator', 'operator', 'developer'], 'developer/audit-impact.md', 'Historical lead only: inspect final source and regression tests, then record current documentation impact without reproducing obsolete or sensitive behavior.')
}))

console.log(`Generated ${pagePaths.length + shellPaths.length + componentPaths.length} page/shell/component, ${apiPaths.length} API, ${dataRows.length} data, ${extensionRows.length} extension, ${domains.length} domain, ${configItems.length} configuration, and ${auditEvidencePaths.length} audit-impact rows.`)
