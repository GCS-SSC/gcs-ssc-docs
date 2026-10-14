# API des examens

Ces requêtes servent aux examens réalisés sur un dossier, y compris les réponses aux évaluations et aux listes de contrôle et les examinateurs supplémentaires. Elles servent aussi aux définitions d’agence utilisées pour créer ces examens. Consultez les [examens en cours](../../concepts/runtime-reviews.md) et les [examens des promoteurs](../../proponents/reviews.md).

Une API est l’ensemble des requêtes que l’application envoie à son serveur lorsque vous ouvrez ou enregistrez un dossier. Les agents utilisent normalement les écrans; les développeurs utilisent cet index pour trouver le code correspondant. Le serveur vérifie l’accès aux dossiers protégés même si un écran affiche une action comme disponible.

- **Méthode** : `GET` lit des renseignements; `POST` crée généralement un dossier ou réalise une action; `PATCH` et `PUT` enregistrent des modifications; `DELETE` retire un dossier. `ANY` délègue les requêtes sans méthode unique indiquée ici.
- **Route** : l’adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l’identifiant réel du dossier.
- **Repères d’autorisation** : des noms trouvés dans les sources qui aident le développeur à repérer les vérifications d’accès.
- **Repères de validation** : des noms qui aident à repérer les vérifications des champs soumis ou des options de requête.
- **Source** : le fichier de l’application qui traite la requête. Un gestionnaire est le code qui la reçoit et y répond.

Ce tableau est généré à partir des noms dans les sources. Un tiret (`—`) signifie qu’aucun nom correspondant n’a été trouvé; il ne prouve pas l’absence de vérification d’accès ou de données. Un nom indiqué peut aussi être un champ ou un commentaire plutôt qu’une vérification. Les développeurs doivent suivre le gestionnaire et ses fonctions partagées pour confirmer les règles, la réponse et les tests; le registre de couverture suit ces preuves.

## Exemple de lecture seule

Une requête autorisée `GET /api/reviews/35/checklist` lit la définition de la liste de contrôle, les réponses enregistrées et l’état actuel de l’examen 35. Elle n’enregistre pas de réponses et ne termine pas l’examen. Les numéros indiqués sont des exemples : utilisez les identifiants de dossiers existants que vous avez le droit de consulter.

## Gestionnaires (29)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/agency/[agencyId]/review-sets/[reviewSetId]/groups` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/groups.get.ts` |
| DELETE | `/api/agency/[agencyId]/review-sets/[reviewSetId]` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/review-sets/[reviewSetId]` | — | Common_Review_Schema | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/review-sets/[reviewSetId]` | — | TransferPaymentStreamReviewSetupPatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/index.patch.ts` |
| DELETE | `/api/agency/[agencyId]/review-sets/[reviewSetId]/items/[itemId]` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/items/[itemId]/index.delete.ts` |
| PATCH | `/api/agency/[agencyId]/review-sets/[reviewSetId]/items/[itemId]` | — | TransferPaymentStreamReviewSetupMemberPatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/items/[itemId]/index.patch.ts` |
| POST | `/api/agency/[agencyId]/review-sets/[reviewSetId]/items/create-schema` | — | Common_Assessment_Schema, Common_Checklist_Schema, Common_Review_Schema, TransferPaymentStreamReviewSetupSchemaCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/items/create-schema.post.ts` |
| POST | `/api/agency/[agencyId]/review-sets/[reviewSetId]/items` | — | Common_Review_Schema, TransferPaymentStreamReviewSetupMemberCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/items/index.post.ts` |
| POST | `/api/agency/[agencyId]/review-sets/[reviewSetId]/publish` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/review-sets/[reviewSetId]/retire` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/review-sets` | — | Common_Review_Schema, EntityTypeIdentitySchema, PaginationSchema, ReviewSetupListQuerySchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/review-sets/index.get.ts` |
| POST | `/api/agency/[agencyId]/review-sets` | — | TransferPaymentStreamReviewSetupCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/index.post.ts` |
| GET | `/api/agency/[agencyId]/review-sets/next-order` | — | — | `server/api/agency/[agencyId]/review-sets/next-order.get.ts` |
| POST | `/api/review-sets/[reviewSetId]/cancel` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | — | `server/api/review-sets/[reviewSetId]/cancel.post.ts` |
| GET | `/api/review-sets` | canAuthorizeReviewRuntimeWorkOwnerRole, requireAuthContext | Common_Review_Schema, CoreOrExtensionEntityTargetSchema, PaginationSchema, ReviewSetListQuerySchema, getValidatedQueryI18n | `server/api/review-sets/index.get.ts` |
| POST | `/api/review-sets` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext, requireFreshAuthContext | CoreOrExtensionEntityTargetSchema, CreateReviewSetSchema, PositivePostgresBigintIdSchema, readValidatedBodyI18n | `server/api/review-sets/index.post.ts` |
| GET | `/api/review-sets/lookups/setups` | requireAuthContext | CoreOrExtensionEntityTargetSchema, PaginationSchema, ReviewSetupLookupQuerySchema, getValidatedQueryI18n | `server/api/review-sets/lookups/setups.get.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers` | canAuthorizeReviewRuntimeAction, requireAuthContext | — | `server/api/reviews/[reviewId]/additional-reviewers/index.get.ts` |
| POST | `/api/reviews/[reviewId]/additional-reviewers` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | AdditionalReviewerInputSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/additional-reviewers/index.post.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers/lookups/groups` | requireAuthContext | GroupLookupQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/reviews/[reviewId]/additional-reviewers/lookups/groups.get.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers/lookups/users` | requireAuthContext | PaginationSchema, UserLookupQuerySchema, getValidatedQueryI18n | `server/api/reviews/[reviewId]/additional-reviewers/lookups/users.get.ts` |
| GET | `/api/reviews/[reviewId]/assessment` | canAuthorizeReviewRuntimeAction, requireAuthContext | AssessmentRuntimeSchema, Common_Review_Schema | `server/api/reviews/[reviewId]/assessment.get.ts` |
| PATCH | `/api/reviews/[reviewId]/assessment` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | AssessmentResponseSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/assessment.patch.ts` |
| GET | `/api/reviews/[reviewId]/checklist` | canAuthorizeReviewRuntimeAction, requireAuthContext | — | `server/api/reviews/[reviewId]/checklist.get.ts` |
| PATCH | `/api/reviews/[reviewId]/checklist` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | ChecklistResponseEnvelopeSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/checklist.patch.ts` |
| POST | `/api/reviews/[reviewId]/claim` | requireAuthContext, requireFreshAuthContext | — | `server/api/reviews/[reviewId]/claim.post.ts` |
| POST | `/api/reviews/[reviewId]/clone` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | — | `server/api/reviews/[reviewId]/clone.post.ts` |
| PATCH | `/api/reviews/[reviewId]/group` | requireAuthContext | Common_Review_Schema, PositivePostgresBigintIdSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/group.patch.ts` |
| GET | `/api/reviews/[reviewId]/groups` | requireAuthContext | Common_Review_Schema | `server/api/reviews/[reviewId]/groups.get.ts` |
