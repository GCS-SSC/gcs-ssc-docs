# Workflow and completion API

Workflow runs/items, recommendations, completion, cancellation, and retry.

This generated route index is an exhaustive navigation table, not independent proof of a contract. For each handler, the coverage ledger records the direct authorization, validation, helper, database, response, UI, and test evidence required before terminal verification. Client permissions never replace server authorization.

## Handlers (8)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| POST | `/api/completions/complete` | — | CompletionExecuteSchema, readValidatedBodyI18n | `server/api/completions/complete.post.ts` |
| GET | `/api/completions/runtime` | — | CompletionRuntimeQuerySchema, getValidatedQueryI18n | `server/api/completions/runtime.get.ts` |
| POST | `/api/workflows/cancel` | executeFreshAuthorizedReviewRuntimeWrite | WorkflowCancelSchema, readValidatedBodyI18n | `server/api/workflows/cancel.post.ts` |
| PUT | `/api/workflows/recommendation` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation.put.ts` |
| POST | `/api/workflows/recommendation/submit` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation/submit.post.ts` |
| POST | `/api/workflows/retry` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowStartSchema, readValidatedBodyI18n | `server/api/workflows/retry.post.ts` |
| GET | `/api/workflows/runtime` | — | WorkflowRuntimeQuerySchema, getValidatedQueryI18n | `server/api/workflows/runtime.get.ts` |
| POST | `/api/workflows/start` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowStartSchema, readValidatedBodyI18n | `server/api/workflows/start.post.ts` |
