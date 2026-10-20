# API hôte des extensions

Les extensions ajoutent des fonctions au système principal. Ces requêtes permettent à l’application de trouver ces fonctions, de lire les paramètres des agences et des volets et d’appeler les services des extensions. Consultez les [extensions](../../concepts/extensions.md) pour comprendre leur effet sur l’espace de travail d’un agent.

Cet index associe les requêtes serveur aux fichiers qui les traitent. Les guides liés expliquent les étapes à l'écran. Le serveur vérifie l'accès aux dossiers protégés même si un écran propose une action.

- La méthode indique le type de requête. `GET` lit des renseignements. `POST` crée généralement un dossier ou exécute une action. `PATCH` et `PUT` enregistrent des modifications. `DELETE` retire un dossier. `ANY` signifie que le nom du fichier ne déclare aucune méthode unique.
- La route est l'adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l'identifiant réel du dossier.
- Les noms d'autorisation et de validation sont des correspondances trouvées dans le code du gestionnaire. Ils aident à repérer les vérifications d'accès et celles des champs soumis ou des options de requête.
- La source est le fichier de l'application qui traite la requête.

Un tiret dans les colonnes de noms signifie que le générateur ne trouve aucun nom correspondant. Il ne prouve pas l'absence de vérification. Un nom indiqué peut provenir d'un champ ou d'un commentaire. Suivez le gestionnaire et ses fonctions partagées pour confirmer les règles d'accès, la validation et les réponses. Le registre de couverture consigne les preuves correspondantes.

## Exemple de lecture seule

Une requête autorisée `GET /api/extensions/agency/12` liste les extensions enregistrées ainsi que leur activation et leur configuration pour l’agence 12. Elle n’active pas d’extension et n’exécute pas ses migrations. Les identifiants sont des exemples. Utilisez des dossiers existants que vous avez le droit de consulter.

## Gestionnaires (13)

| Méthode | Route | Noms d'autorisation | Noms de validation | Source |
| --- | --- | --- | --- | --- |
| ANY | `/api/extensions/[extensionKey]/[...route]` | — | — | `server/api/extensions/[extensionKey]/[...route].ts` |
| GET | `/api/extensions/agency/[agencyId]` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | — | `server/api/extensions/agency/[agencyId]/index.get.ts` |
| PATCH | `/api/extensions/agency/[agencyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionToggleSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/index.patch.ts` |
| POST | `/api/extensions/agency/[agencyId]/migrations` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionMigrationRunSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/migrations.post.ts` |
| GET | `/api/extensions/agency/[agencyId]/storage-provider` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | — | `server/api/extensions/agency/[agencyId]/storage-provider.get.ts` |
| PATCH | `/api/extensions/agency/[agencyId]/storage-provider` | authorizeWithFreshAuthContext, requireFreshAuthContext | AgencyStorageProviderSelectionSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/storage-provider.patch.ts` |
| GET | `/api/extensions/create-actions` | requireAuthContext | CreateActionsQuerySchema, parseI18n | `server/api/extensions/create-actions/index.get.ts` |
| GET | `/api/extensions/entity-tabs` | getExtensionEntityAuthorizationSubject | EntityTabQuerySchema, parseI18n | `server/api/extensions/entity-tabs/index.get.ts` |
| GET | `/api/extensions/payment-amount-calculators` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | PaymentAmountCalculatorsQuerySchema, parseI18n | `server/api/extensions/payment-amount-calculators/index.get.ts` |
| GET | `/api/extensions/runtime` | — | RuntimeSlotQuerySchema, parseI18n | `server/api/extensions/runtime/index.get.ts` |
| GET | `/api/extensions/streams/[streamId]` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | — | `server/api/extensions/streams/[streamId]/index.get.ts` |
| PATCH | `/api/extensions/streams/[streamId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionStreamConfigurationSchema, readValidatedBodyI18n | `server/api/extensions/streams/[streamId]/index.patch.ts` |
| GET | `/api/extensions/workspaces` | — | — | `server/api/extensions/workspaces.get.ts` |
