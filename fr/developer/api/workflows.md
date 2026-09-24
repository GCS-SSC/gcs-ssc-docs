# API des flux et des achèvements

Exécutions/éléments de flux, recommandations, achèvement, annulation et reprise.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (24)

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
| GET | `/api/agency/[agencyId]/workflows` | — | AgencyWorkflowListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/workflows/index.get.ts` |
| POST | `/api/agency/[agencyId]/workflows` | — | CommonWorkflowSetupCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/workflows/index.post.ts` |
| POST | `/api/completions/complete` | requireAuthContext | CompletionExecuteSchema, readValidatedBodyI18n | `server/api/completions/complete.post.ts` |
| GET | `/api/completions/runtime` | requireAuthContext, requireFreshAuthContext | CompletionRuntimeQuerySchema, getValidatedQueryI18n | `server/api/completions/runtime.get.ts` |
| GET | `/api/recommendations/[recommendationId]` | resolveAgreementScopeContext | — | `server/api/recommendations/[recommendationId].get.ts` |
| PUT | `/api/recommendations/[recommendationId]` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext, unauthorized | RecommendationSaveQuerySchema, WorkflowRecommendationSaveSchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/recommendations/[recommendationId].put.ts` |
| GET | `/api/workflows/available` | — | WorkflowSourceSchema, getValidatedQueryI18n | `server/api/workflows/available.get.ts` |
| POST | `/api/workflows/cancel` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowCancelSchema, readValidatedBodyI18n | `server/api/workflows/cancel.post.ts` |
| GET | `/api/workflows/owner-candidates` | canAuthorizeReviewRuntimeAction | WorkflowOwnerCandidatesQuerySchema, getValidatedQueryI18n | `server/api/workflows/owner-candidates.get.ts` |
| PUT | `/api/workflows/recommendation` | executeFreshAuthorizedCurrentRecommendationWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation.put.ts` |
| POST | `/api/workflows/recommendation/submit` | executeFreshAuthorizedCurrentRecommendationWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation/submit.post.ts` |
| POST | `/api/workflows/resume` | canAuthorizeReviewRuntimeAction, executeFreshAuthorizedReviewRuntimeWrite, executeFreshAuthorizedWorkflowOwnerRecovery | WorkflowResumeSchema, readValidatedBodyI18n | `server/api/workflows/resume.post.ts` |
| POST | `/api/workflows/retry` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowRetrySchema, readValidatedBodyI18n | `server/api/workflows/retry.post.ts` |
| GET | `/api/workflows/runtime` | canAuthorizeReviewRuntimeAction, resolveAgreementScopeContext | WorkflowRuntimeQuerySchema, getValidatedQueryI18n | `server/api/workflows/runtime.get.ts` |
| POST | `/api/workflows/start` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowStartSchema, readValidatedBodyI18n | `server/api/workflows/start.post.ts` |
