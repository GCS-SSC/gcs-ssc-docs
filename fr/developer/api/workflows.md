# API des flux et des achèvements

Exécutions/éléments de flux, recommandations, achèvement, annulation et reprise.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (8)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| POST | `/api/completions/complete` | — | CompletionExecuteSchema, readValidatedBodyI18n | `server/api/completions/complete.post.ts` |
| GET | `/api/completions/runtime` | — | CompletionRuntimeQuerySchema, getValidatedQueryI18n | `server/api/completions/runtime.get.ts` |
| POST | `/api/workflows/cancel` | executeFreshAuthorizedReviewRuntimeWrite | WorkflowCancelSchema, readValidatedBodyI18n | `server/api/workflows/cancel.post.ts` |
| PUT | `/api/workflows/recommendation` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation.put.ts` |
| POST | `/api/workflows/recommendation/submit` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation/submit.post.ts` |
| POST | `/api/workflows/retry` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowStartSchema, readValidatedBodyI18n | `server/api/workflows/retry.post.ts` |
| GET | `/api/workflows/runtime` | — | WorkflowRuntimeQuerySchema, getValidatedQueryI18n | `server/api/workflows/runtime.get.ts` |
| POST | `/api/workflows/start` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowStartSchema, readValidatedBodyI18n | `server/api/workflows/start.post.ts` |
