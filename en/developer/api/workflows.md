# Workflow and completion API

These requests support the sequence of work on a file: starting a workflow, recording a recommendation, completing an item and recovering interrupted work. Agency workflow definitions describe that sequence before it is used. See [Workflows](../../concepts/workflows.md) and [Child workflows](../../agreements/child-workflows.md).

This index maps server requests to their handler files. The linked guides explain the on-screen steps. The server checks access to protected records even when a screen offers an action.

- The method identifies the request type. `GET` reads information. `POST` usually creates a record or runs an action. `PATCH` and `PUT` save changes. `DELETE` removes a record. `ANY` means the handler has no single method declared in its filename.
- The route is the request address. Replace bracketed names such as `[id]` with the actual record ID.
- Authorization names and validation names are matches found in the handler source. They help locate access checks and checks on submitted fields or query options.
- The source is the application file that handles the request.

A dash in the names columns means the generator found no matching name. It does not prove that a check is absent. A listed name may come from a field or comment. Follow the handler and its shared helpers to confirm access rules, validation and responses. The coverage ledger records the supporting evidence.

## Read-only example

An authorized request for `GET /api/agency/12/workflows/9` reads workflow definition 9, including its steps and owners. It does not start a workflow on an agreement. The IDs are examples. Use existing records you are allowed to read.

## Handlers (27)

| Method | Route | Authorization names | Validation names | Source |
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
| GET | `/api/completions/runtime` | requireAuthContext | CompletionRuntimeQuerySchema, getValidatedQueryI18n | `server/api/completions/runtime.get.ts` |
| GET | `/api/recommendations/[recommendationId]` | resolveAgreementScopeContext | — | `server/api/recommendations/[recommendationId].get.ts` |
| PUT | `/api/recommendations/[recommendationId]` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext, unauthorized | RecommendationSaveQuerySchema, WorkflowRecommendationSaveSchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/recommendations/[recommendationId].put.ts` |
| POST | `/api/recommendations/[recommendationId]/claim` | executeFreshAuthorizedRuntimeGroupClaim, requireAuthContext | — | `server/api/recommendations/[recommendationId]/claim.post.ts` |
| GET | `/api/workflows/available` | — | WorkflowSourceSchema, getValidatedQueryI18n | `server/api/workflows/available.get.ts` |
| POST | `/api/workflows/cancel` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowCancelSchema, readValidatedBodyI18n | `server/api/workflows/cancel.post.ts` |
| GET | `/api/workflows/owner-candidates` | canAuthorizeWorkflowOwnerRecovery | WorkflowOwnerCandidatesQuerySchema, getValidatedQueryI18n | `server/api/workflows/owner-candidates.get.ts` |
| PUT | `/api/workflows/recommendation` | executeFreshAuthorizedCurrentRecommendationWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation.put.ts` |
| POST | `/api/workflows/recommendation/submit` | executeFreshAuthorizedCurrentRecommendationWrite, unauthorized | WorkflowRecommendationSaveSchema, WorkflowRuntimeQuerySchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/workflows/recommendation/submit.post.ts` |
| POST | `/api/workflows/resume` | canAuthorizeWorkflowOwnerRecovery, executeFreshAuthorizedReviewRuntimeWrite, executeFreshAuthorizedWorkflowOwnerRecovery | WorkflowResumeSchema, readValidatedBodyI18n | `server/api/workflows/resume.post.ts` |
| POST | `/api/workflows/retry` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowRetrySchema, readValidatedBodyI18n | `server/api/workflows/retry.post.ts` |
| GET | `/api/workflows/runtime` | canAuthorizeReviewRuntimeAction, canAuthorizeWorkflowOwnerRecovery, resolveAgreementScopeContext | WorkflowRuntimeQuerySchema, getValidatedQueryI18n | `server/api/workflows/runtime.get.ts` |
| POST | `/api/workflows/start` | executeFreshAuthorizedReviewRuntimeWrite, unauthorized | WorkflowStartSchema, readValidatedBodyI18n | `server/api/workflows/start.post.ts` |
| GET | `/api/workflows/supplementary-information` | resolveAgreementScopeContext | SupplementaryInformationQuerySchema, WorkflowSourceSchema, getValidatedQueryI18n | `server/api/workflows/supplementary-information.get.ts` |
