import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { basename, dirname, join, relative, resolve } from 'node:path'

const docsRoot = resolve(import.meta.dir, '..')
const appRoot = resolve(process.env.GCS_SSC_SOURCE ?? join(docsRoot, '..', 'gcs-ssc'))

interface RouteRow {
  method: string
  route: string
  source: string
  authorization: string
  validation: string
}

const walk = async (directory: string): Promise<string[]> => {
  const result: string[] = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) result.push(...await walk(path))
    else if (path.endsWith('.ts')) result.push(path)
  }
  return result.sort()
}

const groupFor = (source: string): string => {
  if (source.includes('/agreements/')) return 'agreements'
  if (source.includes('/applicant-recipients/')) return 'applicant-recipients'
  if (source.includes('/transfer-payments/')) return 'transfer-payments'
  if (source.includes('/review-sets/') || source.includes('/reviews/')) return 'reviews'
  if (source.includes('/approval-templates/') || source.includes('/approvals/')) return 'approvals'
  if (source.includes('/workflows/') || source.includes('/completions/')) return 'workflows'
  if (source.includes('/extensions/')) return 'extensions'
  if (source.includes('/agency/')) return 'agencies'
  if (source.includes('/roles/') || source.includes('/users/') || source.includes('/auth/')) return 'identity'
  return 'platform'
}

const routeFromSource = (source: string): { method: string, route: string } => {
  const filename = basename(source)
  const method = filename.match(/\.(get|post|patch|put|delete)\.ts$/)?.[1]?.toUpperCase() ?? 'ANY'
  const route = `/api/${relative('server/api', source)}`
    .replace(/\.(get|post|patch|put|delete)\.ts$/, '')
    .replace(/\.ts$/, '')
    .replace(/\/index$/, '')
  return { method, route }
}

const symbols = (text: string, pattern: RegExp): string => {
  const values = new Set<string>()
  for (const match of text.matchAll(pattern)) values.add(match[1])
  return [...values].sort().join(', ') || '—'
}

const groups = new Map<string, RouteRow[]>()
for (const path of await walk(join(appRoot, 'server/api'))) {
  const source = relative(appRoot, path)
  const text = await readFile(path, 'utf8')
  const route = routeFromSource(source)
  const item: RouteRow = {
    ...route,
    source,
    authorization: symbols(text, /\b([A-Za-z_$][\w$]*(?:[Aa]uthoriz|AuthContext|ScopeContext|TeamAccess)[\w$]*)\b/g),
    validation: symbols(text, /\b([A-Z][A-Za-z0-9_$]*Schema|readValidatedBodyI18n|getValidatedQueryI18n|parseI18n)\b/g)
  }
  const group = groupFor(source)
  groups.set(group, [...(groups.get(group) ?? []), item])
}

const names: Record<string, { en: string, fr: string, enSummary: string, frSummary: string }> = {
  agreements: { en: 'Agreement API', fr: 'API des ententes', enSummary: 'Agreement profiles, child resources, finance, lifecycle, Teams, documents, and generation.', frSummary: 'Profils d’entente, ressources enfants, finances, cycle de vie, équipes, documents et production.' },
  'applicant-recipients': { en: 'Applicant-recipient API', fr: 'API des bénéficiaires demandeurs', enSummary: 'Proponent profiles, identity, relationships, funding history, reviews, agreements, and Teams.', frSummary: 'Profils de promoteur, identité, relations, historique du financement, examens, ententes et équipes.' },
  'transfer-payments': { en: 'Transfer-payment API', fr: 'API des paiements de transfert', enSummary: 'Program and stream design, reference relationships, financial setup, schemas, publication, and workflow configuration.', frSummary: 'Conception des programmes et volets, relations de référence, configuration financière, schémas, publication et configuration des flux.' },
  reviews: { en: 'Review API', fr: 'API des examens', enSummary: 'Runtime review sets, assessment and checklist responses, reviewers, cancellation, completion, and retry.', frSummary: 'Ensembles d’examens exécutés, réponses d’évaluation et de liste de contrôle, examinateurs, annulation, achèvement et reprise.' },
  approvals: { en: 'Approval API', fr: 'API des approbations', enSummary: 'Approval-template authoring/versioning and generic routing-slip actions.', frSummary: 'Conception/versionnage des modèles d’approbation et actions génériques sur les bordereaux.' },
  workflows: { en: 'Workflow and completion API', fr: 'API des flux et des achèvements', enSummary: 'Workflow runs/items, recommendations, completion, cancellation, and retry.', frSummary: 'Exécutions/éléments de flux, recommandations, achèvement, annulation et reprise.' },
  extensions: { en: 'Extension host API', fr: 'API hôte des extensions', enSummary: 'Discovery metadata, enablement/configuration, dynamic dispatch, runtime contributions, and extension storage.', frSummary: 'Métadonnées de découverte, activation/configuration, répartition dynamique, contributions d’exécution et stockage d’extension.' },
  agencies: { en: 'Agency API', fr: 'API des agences', enSummary: 'Agency profiles and agency-owned bilingual reference data.', frSummary: 'Profils d’agence et données de référence bilingues appartenant à l’agence.' },
  identity: { en: 'Identity and RBAC API', fr: 'API d’identité et de contrôle d’accès', enSummary: 'Better Auth delegation, permissions, users, roles, assignments, and Team navigation hints.', frSummary: 'Délégation Better Auth, permissions, utilisateurs, rôles, affectations et indices de navigation des équipes.' },
  platform: { en: 'Platform and administration API', fr: 'API de plateforme et d’administration', enSummary: 'Common administration, metadata, health, and remaining platform endpoints.', frSummary: 'Administration commune, métadonnées, état de santé et autres points d’entrée de plateforme.' }
}

const escapeCell = (value: string): string => value.replaceAll('|', '\\|').replaceAll('\n', ' ')
for (const [group, rows] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
  const name = names[group]
  for (const locale of ['en', 'fr'] as const) {
    const title = name[locale]
    const summary = locale === 'en' ? name.enSummary : name.frSummary
    const notice = locale === 'en'
      ? 'This generated route index is an exhaustive navigation table, not independent proof of a contract. For each handler, the coverage ledger records the direct authorization, validation, helper, database, response, UI, and test evidence required before terminal verification. Client permissions never replace server authorization.'
      : 'Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.'
    const headers = locale === 'en'
      ? '| Method | Route | Authorization landmarks | Validation landmarks | Source |\n| --- | --- | --- | --- | --- |'
      : '| Méthode | Route | Repères d’autorisation | Repères de validation | Source |\n| --- | --- | --- | --- | --- |'
    const table = rows.map(row => `| ${row.method} | \`${escapeCell(row.route)}\` | ${escapeCell(row.authorization)} | ${escapeCell(row.validation)} | \`${row.source}\` |`).join('\n')
    const content = `# ${title}\n\n${summary}\n\n${notice}\n\n## ${locale === 'en' ? 'Handlers' : 'Gestionnaires'} (${rows.length})\n\n${headers}\n${table}\n`
    const directory = join(docsRoot, locale, 'developer', 'api')
    await mkdir(directory, { recursive: true })
    await writeFile(join(directory, `${group}.md`), content)
  }
}

console.log(`Generated ${[...groups.values()].reduce((sum, rows) => sum + rows.length, 0)} route rows in ${groups.size} bilingual API groups.`)
