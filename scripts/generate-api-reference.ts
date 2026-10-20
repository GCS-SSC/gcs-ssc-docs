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
  if (source.includes('/entity-assignments/') || source.includes('/assigned-work') || source.includes('/assignment-management')) return 'identity'
  if (source.includes('/claim-reconciliations/')) return 'agreements'
  if (source.includes('/recommendations/')) return 'workflows'
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

const names: Record<string, { en: string, fr: string, enSummary: string, frSummary: string, exampleRoute: string, enExample: string, frExample: string }> = {
  "agencies": {
    "en": "Agency API",
    "fr": "API des agences",
    "enSummary": "These requests support agency profiles and the shared lists used in forms, such as agreement types and fiscal years. Officers use these lists when working on funding files. See [Agencies](../../admin/agencies.md) and [Agency catalogues](../../admin/agency-catalogs.md).",
    "frSummary": "Ces requêtes servent aux profils d’agence et aux listes partagées des formulaires, comme les types d’entente et les exercices financiers. Les agents utilisent ces listes dans leurs dossiers de financement. Consultez les [agences](../../admin/agencies.md) et les [catalogues d’agence](../../admin/agency-catalogs.md).",
    "exampleRoute": "/api/agency/[agencyId]",
    "enExample": "An authorized request for `GET /api/agency/12` reads the profile for agency 12. It does not change the profile or its reference lists.",
    "frExample": "Une requête autorisée `GET /api/agency/12` lit le profil de l’agence 12. Elle ne modifie ni le profil ni ses listes de référence."
  },
  "agreements": {
    "en": "Agreement API",
    "fr": "API des ententes",
    "enSummary": "These requests support funding agreements and their related records: budgets, claims, payments, amendments, assigned users and documents. For the work an officer performs on screen, start with [Agreements](../../agreements/index.md).",
    "frSummary": "Ces requêtes servent aux ententes de financement et à leurs dossiers liés : budgets, réclamations, paiements, modifications, utilisateurs affectés et documents. Pour le travail effectué à l’écran par un agent, commencez par les [ententes](../../agreements/index.md).",
    "exampleRoute": "/api/agreements/[id]",
    "enExample": "An authorized request for `GET /api/agreements/42` reads the profile for agreement 42, including its status and program information. Reading the profile does not approve the agreement or create a payment.",
    "frExample": "Une requête autorisée `GET /api/agreements/42` lit le profil de l’entente 42, y compris son état et les renseignements sur le programme. Cette lecture n’approuve pas l’entente et ne crée pas de paiement."
  },
  "applicant-recipients": {
    "en": "Applicant-recipient API",
    "fr": "API des bénéficiaires demandeurs",
    "enSummary": "These requests support proponent profiles: the organizations or people applying for or receiving funding. They also support contacts, addresses, funding history, reviews and links to agreements. See [Proponents](../../proponents/index.md).",
    "frSummary": "Ces requêtes servent aux profils des promoteurs : les organisations ou personnes qui demandent ou reçoivent un financement. Elles servent aussi aux contacts, adresses, historiques de financement, examens et liens vers les ententes. Consultez les [promoteurs](../../proponents/index.md).",
    "exampleRoute": "/api/applicant-recipients/[id]",
    "enExample": "An authorized request for `GET /api/applicant-recipients/27` reads proponent 27’s profile, including legal and operating names. It does not create an agreement for that proponent.",
    "frExample": "Une requête autorisée `GET /api/applicant-recipients/27` lit le profil du promoteur 27, y compris ses noms légaux et usuels. Elle ne crée pas d’entente pour ce promoteur."
  },
  "approvals": {
    "en": "Approval API",
    "fr": "API des approbations",
    "enSummary": "These requests support approval templates and the approval steps used on a file. A template defines how approval is arranged; a running approval records the decision on a particular item. See [Approval templates](../../programs/approval-templates.md) and [Approvals and completions](../../concepts/approvals-completions.md).",
    "frSummary": "Ces requêtes servent aux modèles d’approbation et aux étapes d’approbation d’un dossier. Un modèle définit l’organisation de l’approbation; une approbation en cours consigne la décision sur un élément précis. Consultez les [modèles d’approbation](../../programs/approval-templates.md) et les [approbations et achèvements](../../concepts/approvals-completions.md).",
    "exampleRoute": "/api/agency/[agencyId]/approval-templates/[templateId]",
    "enExample": "An authorized request for `GET /api/agency/12/approval-templates/8` reads template 8 for agency 12. It does not publish the template or approve any file.",
    "frExample": "Une requête autorisée `GET /api/agency/12/approval-templates/8` lit le modèle 8 de l’agence 12. Elle ne publie pas le modèle et n’approuve aucun dossier."
  },
  "workflows": {
    "en": "Workflow and completion API",
    "fr": "API des flux et des achèvements",
    "enSummary": "These requests support the sequence of work on a file: starting a workflow, recording a recommendation, completing an item and recovering interrupted work. Agency workflow definitions describe that sequence before it is used. See [Workflows](../../concepts/workflows.md) and [Child workflows](../../agreements/child-workflows.md).",
    "frSummary": "Ces requêtes servent à la succession des tâches d’un dossier : démarrer un flux, consigner une recommandation, terminer un élément et reprendre un travail interrompu. Les définitions de flux de l’agence décrivent cette succession avant son utilisation. Consultez les [flux de travail](../../concepts/workflows.md) et les [flux des dossiers liés](../../agreements/child-workflows.md).",
    "exampleRoute": "/api/agency/[agencyId]/workflows/[workflowId]",
    "enExample": "An authorized request for `GET /api/agency/12/workflows/9` reads workflow definition 9, including its steps and owners. It does not start a workflow on an agreement.",
    "frExample": "Une requête autorisée `GET /api/agency/12/workflows/9` lit la définition de flux 9, y compris ses étapes et responsables. Elle ne démarre pas de flux sur une entente."
  },
  "reviews": {
    "en": "Review API",
    "fr": "API des examens",
    "enSummary": "These requests support the reviews carried out on a file, including assessment answers, checklist answers and additional reviewers. They also support the agency definitions used to create those reviews. See [Runtime reviews](../../concepts/runtime-reviews.md) and [Proponent reviews](../../proponents/reviews.md).",
    "frSummary": "Ces requêtes servent aux examens réalisés sur un dossier, y compris les réponses aux évaluations et aux listes de contrôle et les examinateurs supplémentaires. Elles servent aussi aux définitions d’agence utilisées pour créer ces examens. Consultez les [examens en cours](../../concepts/runtime-reviews.md) et les [examens des promoteurs](../../proponents/reviews.md).",
    "exampleRoute": "/api/reviews/[reviewId]/checklist",
    "enExample": "An authorized request for `GET /api/reviews/35/checklist` reads review 35’s checklist definition, saved answers and current review state. It does not save answers or complete the review.",
    "frExample": "Une requête autorisée `GET /api/reviews/35/checklist` lit la définition de la liste de contrôle, les réponses enregistrées et l’état actuel de l’examen 35. Elle n’enregistre pas de réponses et ne termine pas l’examen."
  },
  "extensions": {
    "en": "Extension host API",
    "fr": "API hôte des extensions",
    "enSummary": "Extensions add features to the core system. These requests let the application find those features, read agency and stream settings, and call extension services. See [Extensions](../../concepts/extensions.md) to understand how they affect an officer’s workspace.",
    "frSummary": "Les extensions ajoutent des fonctions au système principal. Ces requêtes permettent à l’application de trouver ces fonctions, de lire les paramètres des agences et des volets et d’appeler les services des extensions. Consultez les [extensions](../../concepts/extensions.md) pour comprendre leur effet sur l’espace de travail d’un agent.",
    "exampleRoute": "/api/extensions/agency/[agencyId]",
    "enExample": "An authorized request for `GET /api/extensions/agency/12` lists registered extensions and their enablement and configuration for agency 12. It does not enable an extension or run its migrations.",
    "frExample": "Une requête autorisée `GET /api/extensions/agency/12` liste les extensions enregistrées ainsi que leur activation et leur configuration pour l’agence 12. Elle n’active pas d’extension et n’exécute pas ses migrations."
  },
  "identity": {
    "en": "Identity and RBAC API",
    "fr": "API d’identité et de contrôle d’accès",
    "enSummary": "These requests support sign-in, users, roles and assignments to individual files. Together, these determine who can see or act on a record and which work is assigned to them. See [Roles](../../admin/roles.md), [Assignments](../../admin/assignments.md) and [Access control](../../concepts/rbac.md).",
    "frSummary": "Ces requêtes servent à la connexion, aux utilisateurs, aux rôles et aux affectations à des dossiers précis. Ensemble, ces éléments déterminent qui peut consulter ou modifier un dossier et le travail qui lui est affecté. Consultez les [rôles](../../admin/roles.md), les [affectations](../../admin/assignments.md) et le [contrôle d’accès](../../concepts/rbac.md).",
    "exampleRoute": "/api/auth/permissions",
    "enExample": "For a signed-in user, `GET /api/auth/permissions` reads their static permission grants. It does not give them new rights. Permission to act on a particular file is still checked by that file’s server request.",
    "frExample": "Pour un utilisateur connecté, `GET /api/auth/permissions` lit les permissions statiques qui lui sont accordées. Cette requête ne lui donne aucun nouveau droit. L’autorisation d’agir sur un dossier précis est toujours vérifiée par la requête serveur de ce dossier."
  },
  "platform": {
    "en": "Platform and administration API",
    "fr": "API de plateforme et d’administration",
    "enSummary": "These requests support shared services such as attachments, audit logs, groups, searches and system health. This group also contains intake and financial records whose routes are outside the agreement and proponent groups. See [Audit and access logs](../../admin/audit.md), [Attachments](../../concepts/attachments.md) and [Funding case intakes](../../intake/funding-case-intakes.md).",
    "frSummary": "Ces requêtes servent aux services partagés comme les pièces jointes, les journaux d’audit, les groupes, les recherches et l’état du système. Ce groupe comprend aussi des dossiers de réception et de finances dont les routes sont hors des groupes des ententes et des promoteurs. Consultez les [journaux d’audit et d’accès](../../admin/audit.md), les [pièces jointes](../../concepts/attachments.md) et les [dossiers de réception](../../intake/funding-case-intakes.md).",
    "exampleRoute": "/api/health",
    "enExample": "`GET /api/health` checks whether the application is ready and can reach its database. A successful response is `{ \"status\": \"ok\" }`. This public check does not return funding-file data.",
    "frExample": "`GET /api/health` vérifie si l’application est prête et peut joindre sa base de données. Une réponse réussie est `{ \"status\": \"ok\" }`. Cette vérification publique ne renvoie pas les données des dossiers de financement."
  },
  "transfer-payments": {
    "en": "Transfer-payment API",
    "fr": "API des paiements de transfert",
    "enSummary": "Here, transfer payment means the funding program and its streams. These requests support program design, eligible recipients, budgets, financial rules, published forms and workflow settings. Individual payments under an agreement are listed in the [Agreement API](./agreements.md). For screen guidance, see [Programs](../../programs/index.md) and [Streams](../../programs/streams.md).",
    "frSummary": "Ici, paiement de transfert désigne le programme de financement et ses volets. Ces requêtes servent à la conception des programmes, aux bénéficiaires admissibles, aux budgets, aux règles financières, aux formulaires publiés et aux paramètres des flux. Les paiements individuels d’une entente figurent dans l’[API des ententes](./agreements.md). Pour les consignes à l’écran, consultez les [programmes](../../programs/index.md) et les [volets](../../programs/streams.md).",
    "exampleRoute": "/api/transfer-payments/[id]",
    "enExample": "An authorized request for `GET /api/transfer-payments/6` reads funding program 6’s profile. It does not issue a payment to a recipient.",
    "frExample": "Une requête autorisée `GET /api/transfer-payments/6` lit le profil du programme de financement 6. Elle ne verse pas de paiement à un bénéficiaire."
  }
}

const escapeCell = (value: string): string => value.replaceAll('|', '\\|').replaceAll('\n', ' ')
for (const [group, rows] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
  const name = names[group]
  for (const locale of ['en', 'fr'] as const) {
    const title = name[locale]
    const summary = locale === 'en' ? name.enSummary : name.frSummary
    const notice = locale === 'en'
      ? "This index maps server requests to their handler files. The linked guides explain the on-screen steps. The server checks access to protected records even when a screen offers an action."
      : "Cet index associe les requêtes serveur aux fichiers qui les traitent. Les guides liés expliquent les étapes à l'écran. Le serveur vérifie l'accès aux dossiers protégés même si un écran propose une action."
    const columns = locale === 'en'
      ? "- The method identifies the request type. `GET` reads information. `POST` usually creates a record or runs an action. `PATCH` and `PUT` save changes. `DELETE` removes a record. `ANY` means the handler has no single method declared in its filename.\n- The route is the request address. Replace bracketed names such as `[id]` with the actual record ID.\n- Authorization names and validation names are matches found in the handler source. They help locate access checks and checks on submitted fields or query options.\n- The source is the application file that handles the request.\n\nA dash in the names columns means the generator found no matching name. It does not prove that a check is absent. A listed name may come from a field or comment. Follow the handler and its shared helpers to confirm access rules, validation and responses. The coverage ledger records the supporting evidence."
      : "- La méthode indique le type de requête. `GET` lit des renseignements. `POST` crée généralement un dossier ou exécute une action. `PATCH` et `PUT` enregistrent des modifications. `DELETE` retire un dossier. `ANY` signifie que le nom du fichier ne déclare aucune méthode unique.\n- La route est l'adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l'identifiant réel du dossier.\n- Les noms d'autorisation et de validation sont des correspondances trouvées dans le code du gestionnaire. Ils aident à repérer les vérifications d'accès et celles des champs soumis ou des options de requête.\n- La source est le fichier de l'application qui traite la requête.\n\nUn tiret dans les colonnes de noms signifie que le générateur ne trouve aucun nom correspondant. Il ne prouve pas l'absence de vérification. Un nom indiqué peut provenir d'un champ ou d'un commentaire. Suivez le gestionnaire et ses fonctions partagées pour confirmer les règles d'accès, la validation et les réponses. Le registre de couverture consigne les preuves correspondantes."
    if (!rows.some(row => row.method === 'GET' && row.route === name.exampleRoute)) {
      throw new Error(`Read-only example route missing from ${group}: ${name.exampleRoute}`)
    }
    const exampleText = locale === 'en' ? name.enExample : name.frExample
    const example = name.exampleRoute.includes('[')
      ? `${exampleText} ${locale === 'en'
        ? 'The IDs are examples. Use existing records you are allowed to read.'
        : "Les identifiants sont des exemples. Utilisez des dossiers existants que vous avez le droit de consulter."}`
      : exampleText
    const headers = locale === 'en'
      ? '| Method | Route | Authorization names | Validation names | Source |\n| --- | --- | --- | --- | --- |'
      : "| Méthode | Route | Noms d'autorisation | Noms de validation | Source |\n| --- | --- | --- | --- | --- |"
    const table = rows.map(row => `| ${row.method} | \`${escapeCell(row.route)}\` | ${escapeCell(row.authorization)} | ${escapeCell(row.validation)} | \`${row.source}\` |`).join('\n')
    const content = `# ${title}\n\n${summary}\n\n${notice}\n\n${columns}\n\n## ${locale === 'en' ? 'Read-only example' : 'Exemple de lecture seule'}\n\n${example}\n\n## ${locale === 'en' ? 'Handlers' : 'Gestionnaires'} (${rows.length})\n\n${headers}\n${table}\n`
    const directory = join(docsRoot, locale, 'developer', 'api')
    await mkdir(directory, { recursive: true })
    await writeFile(join(directory, `${group}.md`), content)
  }
}

console.log(`Generated ${[...groups.values()].reduce((sum, rows) => sum + rows.length, 0)} route rows in ${groups.size} bilingual API groups.`)
