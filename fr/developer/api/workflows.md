# API des flux et des achèvements

Ces requêtes servent à la succession des tâches d’un dossier : démarrer un flux, consigner une recommandation, terminer un élément et reprendre un travail interrompu. Les définitions de flux de l’agence décrivent cette succession avant son utilisation. Consultez les [flux de travail](../../concepts/workflows.md) et les [flux des dossiers liés](../../agreements/child-workflows.md).

Une API est l’ensemble des requêtes que l’application envoie à son serveur lorsque vous ouvrez ou enregistrez un dossier. Les agents utilisent normalement les écrans; les développeurs utilisent cet index pour trouver le code correspondant. Le serveur vérifie l’accès aux dossiers protégés même si un écran affiche une action comme disponible.

- **Méthode** : `GET` lit des renseignements; `POST` crée généralement un dossier ou réalise une action; `PATCH` et `PUT` enregistrent des modifications; `DELETE` retire un dossier. `ANY` délègue les requêtes sans méthode unique indiquée ici.
- **Route** : l’adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l’identifiant réel du dossier.
- **Repères d’autorisation** : des noms trouvés dans les sources qui aident le développeur à repérer les vérifications d’accès.
- **Repères de validation** : des noms qui aident à repérer les vérifications des champs soumis ou des options de requête.
- **Source** : le fichier de l’application qui traite la requête. Un gestionnaire est le code qui la reçoit et y répond.

Ce tableau est généré à partir des noms dans les sources. Un tiret (`—`) signifie qu’aucun nom correspondant n’a été trouvé; il ne prouve pas l’absence de vérification d’accès ou de données. Un nom indiqué peut aussi être un champ ou un commentaire plutôt qu’une vérification. Les développeurs doivent suivre le gestionnaire et ses fonctions partagées pour confirmer les règles, la réponse et les tests; le registre de couverture suit ces preuves.

## Exemple de lecture seule

Une requête autorisée `GET /api/agency/12/workflows/9` lit la définition de flux 9, y compris ses étapes et responsables. Elle ne démarre pas de flux sur une entente. Les numéros indiqués sont des exemples : utilisez les identifiants de dossiers existants que vous avez le droit de consulter.

## Gestionnaires (27)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/agency/[agencyId]/workflows/[workflowId]` | — | — | `server/api/agency/[agencyId]/workflows/[workflowId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/workflows/[workflowId]` | — | — | `server/api/agency/[agencyId]/workflows/[workflowId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/workflows/[workflowId]` | — | CommonWorkflowSetupCreateSchema, CommonWorkflowSetupPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/agency/[agencyId]/workflows/[workflowId]/index.patch.ts` |
| DELETE | `/api/agency/[agencyId]/workflows/[workflowId]/members/[memberId]` | — | — | `server/api/agency/[agencyId]/workflows/[workflowId]/members/[memberId]/index.delete.ts` |
| PATCH | `/api/agency/[agencyId]/workflows/[workflowId]/members/[memberId]` | — | CommonWorkflowSetupMemberPatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/workflows/[workflowId]/members/[memberId]/index.patch.ts` |
| PUT | `/api/agency/[agencyId]/workflows/[workflowId]/members/[memberId]/owners` | — | CommonWorkflowSetupMemberOwnersSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/workflows/[workflowId]/members/[memberId]/owners.put.ts` |
| POST | `/api/agency/[agencyId]/workflows/[workflowId]/members` | — | CommonWorkflowSetupMemberCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/workflows/[workflowId]/members/index.post.ts` |
| POST | `/api/agency/[agencyId]/workflows/[workflowId]/publish` | requireAuthContext | — | `server/api/agency/[agencyId]/workflows/[workflowId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/workflows/[workflowId]/retire` | requireAuthContext | — | `server/api/agency/[agencyId]/workflows/[workflowId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/workflows/entity-types` | — | — | `server/api/agency/[agencyId]/workflows/entity-types.get.ts` |
| GET | `/api/agency/[agencyId]/workflows` | — | AgencyWorkflowListQuerySchema, EntityTypeIdentitySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/workflows/index.get.ts` |
| POST | `/api/agency/[agencyId]/workflows` | — | CommonWorkflowSetupCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/workflows/index.post.ts` |
| POST | `/api/completions/complete` | requireAuthContext | CompletionExecuteSchema, readValidatedBodyI18n | `server/api/completions/complete.post.ts` |
| GET | `/api/completions/runtime` | requireAuthContext, requireFreshAuthContext | CompletionRuntimeQuerySchema, getValidatedQueryI18n | `server/api/completions/runtime.get.ts` |
| GET | `/api/recommendations/[recommendationId]` | resolveAgreementScopeContext | — | `server/api/recommendations/[recommendationId].get.ts` |
| PUT | `/api/recommendations/[recommendationId]` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext, unauthorized | RecommendationSaveQuerySchema, WorkflowRecommendationSaveSchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/recommendations/[recommendationId].put.ts` |
| POST | `/api/recommendations/[recommendationId]/claim` | executeFreshAuthorizedRuntimeGroupClaim, requireAuthContext | — | `server/api/recommendations/[recommendationId]/claim.post.ts` |
| GET | `/api/workflows/available` | — | WorkflowSourceSchema, getValidatedQueryI18n | `server/api/workflows/available.get.ts` |
| POST | `/api/workflows/cancel` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowCancelSchema, readValidatedBodyI18n | `server/api/workflows/cancel.post.ts` |
| GET | `/api/workflows/owner-candidates` | canAuthorizeReviewRuntimeAction | WorkflowOwnerCandidatesQuerySchema, getValidatedQueryI18n | `server/api/workflows/owner-candidates.get.ts` |
| PUT | `/api/workflows/recommendation` | executeFreshAuthorizedCurrentRecommendationWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation.put.ts` |
| POST | `/api/workflows/recommendation/submit` | executeFreshAuthorizedCurrentRecommendationWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation/submit.post.ts` |
| POST | `/api/workflows/resume` | canAuthorizeReviewRuntimeAction, executeFreshAuthorizedReviewRuntimeWrite, executeFreshAuthorizedWorkflowOwnerRecovery | WorkflowResumeSchema, readValidatedBodyI18n | `server/api/workflows/resume.post.ts` |
| POST | `/api/workflows/retry` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowRetrySchema, readValidatedBodyI18n | `server/api/workflows/retry.post.ts` |
| GET | `/api/workflows/runtime` | canAuthorizeReviewRuntimeAction, resolveAgreementScopeContext | WorkflowRuntimeQuerySchema, getValidatedQueryI18n | `server/api/workflows/runtime.get.ts` |
| POST | `/api/workflows/start` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowStartSchema, readValidatedBodyI18n | `server/api/workflows/start.post.ts` |
| GET | `/api/workflows/supplementary-information` | resolveAgreementScopeContext | SupplementaryInformationQuerySchema, WorkflowSourceSchema, getValidatedQueryI18n | `server/api/workflows/supplementary-information.get.ts` |
