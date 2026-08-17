# Review API

Runtime review sets, assessment and checklist responses, reviewers, cancellation, completion, and retry.

This generated route index is an exhaustive navigation table, not independent proof of a contract. For each handler, the coverage ledger records the direct authorization, validation, helper, database, response, UI, and test evidence required before terminal verification. Client permissions never replace server authorization.

## Handlers (13)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/admin/common/review-sets` | — | — | `server/api/admin/common/review-sets/index.get.ts` |
| POST | `/api/review-sets/[reviewSetId]/cancel` | executeFreshAuthorizedReviewRuntimeWrite | — | `server/api/review-sets/[reviewSetId]/cancel.post.ts` |
| GET | `/api/review-sets` | — | Common_Review_Schema, PaginationSchema, ReviewSetListQuerySchema, getValidatedQueryI18n | `server/api/review-sets/index.get.ts` |
| POST | `/api/review-sets` | executeFreshAuthorizedReviewRuntimeWrite | CreateReviewSetSchema, readValidatedBodyI18n | `server/api/review-sets/index.post.ts` |
| GET | `/api/review-sets/lookups/setups` | — | PaginationSchema, ReviewSetupLookupQuerySchema, getValidatedQueryI18n | `server/api/review-sets/lookups/setups.get.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers` | — | — | `server/api/reviews/[reviewId]/additional-reviewers/index.get.ts` |
| POST | `/api/reviews/[reviewId]/additional-reviewers` | executeFreshAuthorizedReviewRuntimeWrite | AdditionalReviewerInputSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/additional-reviewers/index.post.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers/lookups/users` | — | PaginationSchema, UserLookupQuerySchema, getValidatedQueryI18n | `server/api/reviews/[reviewId]/additional-reviewers/lookups/users.get.ts` |
| GET | `/api/reviews/[reviewId]/assessment` | canAuthorizeReviewRuntimeAction | Common_Review_Schema | `server/api/reviews/[reviewId]/assessment.get.ts` |
| PATCH | `/api/reviews/[reviewId]/assessment` | executeFreshAuthorizedReviewRuntimeWrite | AssessmentResponseSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/assessment.patch.ts` |
| GET | `/api/reviews/[reviewId]/checklist` | canAuthorizeReviewRuntimeAction | Common_Review_Schema | `server/api/reviews/[reviewId]/checklist.get.ts` |
| PATCH | `/api/reviews/[reviewId]/checklist` | executeFreshAuthorizedReviewRuntimeWrite | ChecklistResponseEnvelopeSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/checklist.patch.ts` |
| POST | `/api/reviews/[reviewId]/clone` | executeFreshAuthorizedReviewRuntimeWrite | — | `server/api/reviews/[reviewId]/clone.post.ts` |
