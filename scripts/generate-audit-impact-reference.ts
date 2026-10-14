import { existsSync } from 'node:fs'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { basename, join, relative, resolve } from 'node:path'

const docsRoot = resolve(import.meta.dir, '..')
const appRoot = resolve(process.env.GCS_SSC_SOURCE ?? join(docsRoot, '..', 'gcs-ssc'))

const walk = async (directory: string): Promise<string[]> => {
  const result: string[] = []
  if (!existsSync(directory)) return result
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
  .filter(path => !['AUTOMATED-PAYMENTS-', 'EXT-NARRATIVE-', 'GCFORMS-', 'OUTCOME-ALLOCATION-']
    .some(prefix => basename(path).startsWith(prefix)))

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
    ? 'This page records how historical audit findings affected the documentation. It helps maintainers explain the current behaviour and remove outdated advice. The current source may no longer contain the historical audit files, so the register can be empty. This does **not** mean the application has no audit logs; see [Audit and access logs](../admin/audit.md).'
    : 'Cette page consigne l’effet des constats d’audit historiques sur la documentation. Elle aide les responsables de la documentation à expliquer le comportement actuel et à retirer les conseils périmés. Les sources actuelles peuvent ne plus contenir les anciens dossiers d’audit; le registre peut donc être vide. Cela ne signifie **pas** que l’application n’a aucun journal d’audit; consultez les [journaux d’audit et d’accès](../admin/audit.md).'}

${en
    ? 'For example, if an old finding described an access problem that has since been fixed, the guide should explain the current access rule. It should not tell an officer to repeat the old workaround. Maintainers check current source and regression tests before treating an item as fully verified. Sensitive security details, raw diagnostics, credentials and obsolete unsafe steps are omitted.'
    : 'Par exemple, si un ancien constat décrivait un problème d’accès qui a été corrigé, le guide doit expliquer la règle d’accès actuelle. Il ne doit pas demander à un agent de répéter l’ancienne solution de contournement. Les responsables vérifient les sources actuelles et les tests de régression avant de considérer un élément comme entièrement vérifié. Les détails sensibles de sécurité, les diagnostics bruts, les identifiants et les anciennes étapes dangereuses sont omis.'}

## ${en ? 'Disposition rules' : 'Règles de disposition'}

- ${en ? 'Explain what the application does now and what that means for the officer.' : 'Expliquer ce que l’application fait maintenant et ce que cela signifie pour l’agent.'}
- ${en ? 'Remove old workarounds that depended on a defect; do not present them as supported steps.' : 'Retirer les anciennes solutions de contournement qui dépendaient d’une anomalie; ne pas les présenter comme des étapes prises en charge.'}
- ${en ? 'Confirm the behaviour using current executable code, database migrations, running-service connections and regression tests.' : 'Confirmer le comportement à l’aide du code exécutable actuel, des migrations de base de données, des connexions entre services en cours d’exécution et des tests de régression.'}
- ${en ? 'Mark an item as fully verified only after the current rule is documented in English and French, or after recording evidence that it no longer applies.' : 'Marquer un élément comme entièrement vérifié seulement après avoir documenté la règle actuelle en anglais et en français, ou après avoir consigné la preuve qu’elle ne s’applique plus.'}

## ${en ? 'Impact register' : 'Registre des incidences'} (${impacts.length})

| ${en ? 'Item' : 'Élément'} | ${en ? 'Current documentation area' : 'Domaine documentaire actuel'} | ${en ? 'Current impact disposition' : 'Disposition de l’incidence actuelle'} | Source |
| --- | --- | --- | --- |
${rows}
`
}

await writeFile(join(docsRoot, 'en/developer/audit-impact.md'), `${render('en').trimEnd()}\n`)
await writeFile(join(docsRoot, 'fr/developer/audit-impact.md'), `${render('fr').trimEnd()}\n`)
console.log(`Generated ${impacts.length} bilingual historical audit-impact dispositions.`)
