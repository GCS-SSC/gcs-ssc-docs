# Workflow and completion API

These requests support the sequence of work on a file: starting a workflow, recording a recommendation, completing an item and recovering interrupted work. Agency workflow definitions describe that sequence before it is used. See [Workflows](../../concepts/workflows.md) and [Child workflows](../../agreements/child-workflows.md).

An API is the set of requests the application sends to its server when you open or save a record. Officers normally use the screens; developers use this index to find the code behind them. The server checks access to protected records even when a screen shows an action as available.

- **Method**: `GET` reads information; `POST` usually creates a record or performs an action; `PATCH` and `PUT` save changes; `DELETE` removes a record. `ANY` delegates requests without a single method listed here.
- **Route**: the request address. Replace names in brackets, such as `[id]`, with the actual record ID.
- **Authorization landmarks**: names found in the source that help a developer locate access checks.
- **Validation landmarks**: names that help locate checks on submitted fields or query options.
- **Source**: the application file that handles the request. A handler is the code that receives and answers it.

This table is generated from source names. A dash (`—`) means no matching name was found; it does not prove there is no access or data check. A listed name may also be a field or comment, rather than a check. Developers must follow the handler and its shared helpers to confirm the rules, response and tests; the coverage ledger tracks that evidence.

## Read-only example

An authorized request for `GET /api/agency/12/workflows/9` reads workflow definition 9, including its steps and owners. It does not start a workflow on an agreement. Any numbers shown are illustrative: use IDs for existing records you are allowed to read.

## Handlers (27)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
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
