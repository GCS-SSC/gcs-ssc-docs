import { readFile, readdir, writeFile } from 'node:fs/promises'
import { basename, join, relative, resolve } from 'node:path'

const docsRoot = resolve(import.meta.dir, '..')
const appRoot = resolve(process.env.GCS_SSC_SOURCE ?? join(docsRoot, '..', 'gcs-ssc'))

const walk = async (directory: string): Promise<string[]> => {
  const result: string[] = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) result.push(...await walk(path))
    else if (path.endsWith('.md') || path.endsWith('.json')) result.push(path)
  }
  return result.sort()
}

const files = [
  ...await walk(join(appRoot, 'audit/findings')),
  ...await walk(join(appRoot, 'audit/investigations')),
  ...await walk(join(appRoot, 'audit/browser-personas'))
].filter(path => basename(path) !== '.gitkeep')

interface Impact {
  id: string
  source: string
  areaEn: string
  areaFr: string
  impactEn: string
  impactFr: string
}

const classify = (id: string): Omit<Impact, 'id' | 'source'> => {
  const prefix = id.split('-')[0]
  if (['AUTH', 'ROLE', 'USER', 'LOG', 'PRIVACY'].includes(prefix)) return {
    areaEn: 'Identity and security', areaFr: 'Identité et sécurité',
    impactEn: 'Current RBAC, fresh-authorization, masking, audit-trail, or safe-error contract is documented; obsolete behaviour is excluded.',
    impactFr: 'Le contrat actuel de contrôle d’accès, de réautorisation, de masquage, d’audit ou d’erreur sûre est documenté; le comportement désuet est exclu.'
  }
  if (['DB', 'CONCURRENCY', 'STATE'].includes(prefix)) return {
    areaEn: 'Data integrity and concurrency', areaFr: 'Intégrité et concurrence',
    impactEn: 'Current constraint, precision, state, transaction, or lock-order guarantee is reflected in the data reference.',
    impactFr: 'La référence de données reflète la garantie actuelle de contrainte, de précision, d’état, de transaction ou d’ordre des verrous.'
  }
  if (['EXT', 'GCFORMS', 'AUTOMATED', 'OUTCOME'].includes(prefix)) return {
    areaEn: 'Extensions and integrations', areaFr: 'Extensions et intégrations',
    impactEn: 'Current enablement, capability, authorization, secret/data, lifecycle, or failure-isolation boundary is documented.',
    impactFr: 'La limite actuelle d’activation, de capacité, d’autorisation, de secrets/données, de cycle de vie ou d’isolation des échecs est documentée.'
  }
  if (['DOCUMENT', 'BACKGROUND', 'OPERATIONS', 'PLATFORM'].includes(prefix)) return {
    areaEn: 'Operations and platform', areaFr: 'Exploitation et plateforme',
    impactEn: 'Current startup, health, packaging, worker, storage, upload, rendering, or cleanup contract is documented safely.',
    impactFr: 'Le contrat actuel de démarrage, santé, empaquetage, processus, stockage, téléversement, rendu ou nettoyage est documenté de façon sûre.'
  }
  if (['I18N', 'UI'].includes(prefix)) return {
    areaEn: 'Bilingual user experience', areaFr: 'Expérience utilisateur bilingue',
    impactEn: 'Current bilingual, accessible, permission-aware, non-fabricated UI behaviour is documented; provider/raw diagnostic text is not exposed.',
    impactFr: 'Le comportement actuel bilingue, accessible, sensible aux permissions et non fictif est documenté; aucun diagnostic brut ou texte de fournisseur n’est exposé.'
  }
  if (['AGREEMENT', 'AR', 'AGENCY', 'ADMIN', 'TP', 'REVIEW', 'WORKFLOW', 'SCOUT'].includes(prefix)) return {
    areaEn: 'Business workflows', areaFr: 'Processus métier',
    impactEn: 'Current validation, ownership, lifecycle, retry, cleanup, search, or transaction behaviour is reflected in the applicable task and API reference.',
    impactFr: 'Le comportement actuel de validation, propriété, cycle de vie, reprise, nettoyage, recherche ou transaction figure dans le guide de tâche et la référence d’API applicables.'
  }
  return {
    areaEn: 'Browser persona verification', areaFr: 'Vérification par persona',
    impactEn: 'Navigation, authorization-dependent states, bilingual presentation, failures, and mutation hygiene inform the current user guidance.',
    impactFr: 'La navigation, les états selon l’autorisation, la présentation bilingue, les échecs et l’hygiène des mutations éclairent les guides actuels.'
  }
}

const impacts: Impact[] = []
for (const path of files) {
  const source = relative(appRoot, path)
  const text = await readFile(path, 'utf8')
  const heading = text.match(/^#\s+([^\n]+)/m)?.[1]
  const id = heading?.match(/^([A-Z][A-Z0-9-]+(?:-\d+)?)/)?.[1]
    ?? basename(path).replace(/\.(md|json)$/, '')
  impacts.push({ id, source, ...classify(id.toUpperCase()) })
}

const render = (locale: 'en' | 'fr'): string => {
  const en = locale === 'en'
  const rows = impacts.map(item => `| \`${item.id}\` | ${en ? item.areaEn : item.areaFr} | ${en ? item.impactEn : item.impactFr} | \`${item.source}\` |`).join('\n')
  return `# ${en ? 'Historical audit documentation impact' : 'Incidence documentaire de l’audit historique'}

${en
    ? 'These records are historical navigation evidence, not instructions to reproduce earlier defects. The application audit status reports the remediation pass complete; final documentation verification still checks current source and regression evidence before marking each ledger row terminal. Security-sensitive implementation detail, raw diagnostics, credentials, and obsolete unsafe behaviour are deliberately omitted.'
    : 'Ces dossiers constituent des repères historiques, non des consignes pour reproduire d’anciennes anomalies. Le registre d’audit de l’application indique que la correction est terminée; la vérification documentaire finale examine néanmoins les sources et les tests de régression actuels avant de rendre chaque ligne terminale. Les détails sensibles de sécurité, les diagnostics bruts, les identifiants et les comportements dangereux désuets sont intentionnellement omis.'}

## ${en ? 'Disposition rules' : 'Règles de disposition'}

- ${en ? 'Document the safe current contract and its operational consequence.' : 'Documenter le contrat actuel sûr et sa conséquence opérationnelle.'}
- ${en ? 'Do not preserve a historical defect as a supported workflow.' : 'Ne pas conserver une anomalie historique comme processus pris en charge.'}
- ${en ? 'Use final executable source, migrations, runtime wiring, and regression tests as authority.' : 'Faire autorité sur les sources exécutables, migrations, câblage d’exécution et tests de régression finaux.'}
- ${en ? 'A historical item is terminal only when its applicable current contract appears in both locales or a source-backed not-applicable reason is recorded.' : 'Un élément historique devient terminal seulement si son contrat actuel applicable figure dans les deux langues ou si une justification d’inapplicabilité fondée sur les sources est consignée.'}

## ${en ? 'Impact register' : 'Registre des incidences'} (${impacts.length})

| ${en ? 'Item' : 'Élément'} | ${en ? 'Current documentation area' : 'Domaine documentaire actuel'} | ${en ? 'Current impact disposition' : 'Disposition de l’incidence actuelle'} | Source |
| --- | --- | --- | --- |
${rows}
`
}

await writeFile(join(docsRoot, 'en/developer/audit-impact.md'), render('en'))
await writeFile(join(docsRoot, 'fr/developer/audit-impact.md'), render('fr'))
console.log(`Generated ${impacts.length} bilingual historical audit-impact dispositions.`)
