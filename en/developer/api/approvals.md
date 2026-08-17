# Approval API

Approval-template authoring/versioning and generic routing-slip actions.

This generated route index is an exhaustive navigation table, not independent proof of a contract. For each handler, the coverage ledger records the direct authorization, validation, helper, database, response, UI, and test evidence required before terminal verification. Client permissions never replace server authorization.

## Handlers (15)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| POST | `/api/approval-templates/[templateId]/activate` | resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/activate.post.ts` |
| DELETE | `/api/approval-templates/[templateId]` | currentScopeContext, resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/index.delete.ts` |
| GET | `/api/approval-templates/[templateId]` | resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/index.get.ts` |
| PATCH | `/api/approval-templates/[templateId]` | currentScopeContext, resolveApprovalTemplateScopeContextFromTemplateId | ApprovalTemplatePatchSchema, ApprovalTemplatePersistenceSchema, parseI18n, readValidatedBodyI18n | `server/api/approval-templates/[templateId]/index.patch.ts` |
| POST | `/api/approval-templates/[templateId]/publish` | resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/publish.post.ts` |
| GET | `/api/approval-templates` | resolveApprovalTemplateScopeContext | ApprovalTemplateListQuerySchema, getValidatedQueryI18n | `server/api/approval-templates/index.get.ts` |
| POST | `/api/approval-templates` | resolveApprovalTemplateScopeContext | ApprovalTemplateCreateSchema, readValidatedBodyI18n | `server/api/approval-templates/index.post.ts` |
| POST | `/api/approvals/add-step` | canAuthorizeReviewRuntimeAction, executeFreshAuthorizedApprovalActorWrite, executeFreshAuthorizedReviewRuntimeWrite | AddApprovalStepSchema, readValidatedBodyI18n | `server/api/approvals/add-step.post.ts` |
| POST | `/api/approvals/approve` | — | ReviewApprovalApproveSchema, readValidatedBodyI18n | `server/api/approvals/approve.post.ts` |
| POST | `/api/approvals/create-routing-slip` | canAuthorizeReviewRuntimeAction | ApprovalRuntimeEntitySchema, readValidatedBodyI18n | `server/api/approvals/create-routing-slip.post.ts` |
| POST | `/api/approvals/deny` | — | ReviewApprovalDenySchema, readValidatedBodyI18n | `server/api/approvals/deny.post.ts` |
| GET | `/api/approvals/lookups/behalf-types` | — | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/behalf-types.get.ts` |
| GET | `/api/approvals/lookups/users` | canAuthorizeReviewRuntimeAction | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/users.get.ts` |
| POST | `/api/approvals/reassign` | — | ReviewApprovalReassignSchema, readValidatedBodyI18n | `server/api/approvals/reassign.post.ts` |
| GET | `/api/approvals/runtime` | canAuthorizeReviewRuntimeAction | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/runtime.get.ts` |
