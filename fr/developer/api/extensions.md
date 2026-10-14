# API hôte des extensions

Les extensions ajoutent des fonctions au système principal. Ces requêtes permettent à l’application de trouver ces fonctions, de lire les paramètres des agences et des volets et d’appeler les services des extensions. Consultez les [extensions](../../concepts/extensions.md) pour comprendre leur effet sur l’espace de travail d’un agent.

Une API est l’ensemble des requêtes que l’application envoie à son serveur lorsque vous ouvrez ou enregistrez un dossier. Les agents utilisent normalement les écrans; les développeurs utilisent cet index pour trouver le code correspondant. Le serveur vérifie l’accès aux dossiers protégés même si un écran affiche une action comme disponible.

- **Méthode** : `GET` lit des renseignements; `POST` crée généralement un dossier ou réalise une action; `PATCH` et `PUT` enregistrent des modifications; `DELETE` retire un dossier. `ANY` délègue les requêtes sans méthode unique indiquée ici.
- **Route** : l’adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l’identifiant réel du dossier.
- **Repères d’autorisation** : des noms trouvés dans les sources qui aident le développeur à repérer les vérifications d’accès.
- **Repères de validation** : des noms qui aident à repérer les vérifications des champs soumis ou des options de requête.
- **Source** : le fichier de l’application qui traite la requête. Un gestionnaire est le code qui la reçoit et y répond.

Ce tableau est généré à partir des noms dans les sources. Un tiret (`—`) signifie qu’aucun nom correspondant n’a été trouvé; il ne prouve pas l’absence de vérification d’accès ou de données. Un nom indiqué peut aussi être un champ ou un commentaire plutôt qu’une vérification. Les développeurs doivent suivre le gestionnaire et ses fonctions partagées pour confirmer les règles, la réponse et les tests; le registre de couverture suit ces preuves.

## Exemple de lecture seule

Une requête autorisée `GET /api/extensions/agency/12` liste les extensions enregistrées ainsi que leur activation et leur configuration pour l’agence 12. Elle n’active pas d’extension et n’exécute pas ses migrations. Les numéros indiqués sont des exemples : utilisez les identifiants de dossiers existants que vous avez le droit de consulter.

## Gestionnaires (13)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
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
