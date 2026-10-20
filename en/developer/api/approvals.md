# Approval API

These requests support approval templates and the approval steps used on a file. A template defines how approval is arranged; a running approval records the decision on a particular item. See [Approval templates](../../programs/approval-templates.md) and [Approvals and completions](../../concepts/approvals-completions.md).

This index maps server requests to their handler files. The linked guides explain the on-screen steps. The server checks access to protected records even when a screen offers an action.

- The method identifies the request type. `GET` reads information. `POST` usually creates a record or runs an action. `PATCH` and `PUT` save changes. `DELETE` removes a record. `ANY` means the handler has no single method declared in its filename.
- The route is the request address. Replace bracketed names such as `[id]` with the actual record ID.
- Authorization names and validation names are matches found in the handler source. They help locate access checks and checks on submitted fields or query options.
- The source is the application file that handles the request.

A dash in the names columns means the generator found no matching name. It does not prove that a check is absent. A listed name may come from a field or comment. Follow the handler and its shared helpers to confirm access rules, validation and responses. The coverage ledger records the supporting evidence.

## Read-only example

An authorized request for `GET /api/agency/12/approval-templates/8` reads template 8 for agency 12. It does not publish the template or approve any file. The IDs are examples. Use existing records you are allowed to read.

## Handlers (16)

| Method | Route | Authorization names | Validation names | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/agency/[agencyId]/approval-templates/[templateId]` | currentScopeContext, requireAuthContext, resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/agency/[agencyId]/approval-templates/[templateId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/approval-templates/[templateId]` | requireAuthContext, resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/agency/[agencyId]/approval-templates/[templateId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/approval-templates/[templateId]` | currentScopeContext, requireAuthContext, resolveApprovalTemplateScopeContextFromTemplateId | ApprovalTemplatePatchSchema, ApprovalTemplatePersistenceSchema, parseI18n, readValidatedBodyI18n | `server/api/agency/[agencyId]/approval-templates/[templateId]/index.patch.ts` |
| POST | `/api/agency/[agencyId]/approval-templates/[templateId]/publish` | requireAuthContext | — | `server/api/agency/[agencyId]/approval-templates/[templateId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/approval-templates/[templateId]/retire` | requireAuthContext | — | `server/api/agency/[agencyId]/approval-templates/[templateId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/approval-templates` | requireAuthContext | ApprovalTemplateListQuerySchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/approval-templates/index.get.ts` |
| POST | `/api/agency/[agencyId]/approval-templates` | requireAuthContext | ApprovalTemplateCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/approval-templates/index.post.ts` |
| POST | `/api/approvals/[approvalId]/claim` | requireAuthContext, requireFreshAuthContext | — | `server/api/approvals/[approvalId]/claim.post.ts` |
| POST | `/api/approvals/add-step` | executeFreshAuthorizedApprovalAddStepWrite, requireAuthContext | AddApprovalStepSchema, readValidatedBodyI18n | `server/api/approvals/add-step.post.ts` |
| POST | `/api/approvals/approve` | executeFreshAuthorizedApprovalActorWrite, requireAuthContext | PositivePostgresBigintIdSchema, ReviewApprovalApproveSchema, readValidatedBodyI18n | `server/api/approvals/approve.post.ts` |
| POST | `/api/approvals/deny` | executeFreshAuthorizedApprovalActorWrite, requireAuthContext | PositivePostgresBigintIdSchema, ReviewApprovalDenySchema, readValidatedBodyI18n | `server/api/approvals/deny.post.ts` |
| GET | `/api/approvals/lookups/behalf-types` | requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/behalf-types.get.ts` |
| GET | `/api/approvals/lookups/groups` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/groups.get.ts` |
| GET | `/api/approvals/lookups/users` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/users.get.ts` |
| POST | `/api/approvals/reassign` | requireAuthContext | PositivePostgresBigintIdSchema, ReviewApprovalReassignSchema, readValidatedBodyI18n | `server/api/approvals/reassign.post.ts` |
| GET | `/api/approvals/runtime` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/runtime.get.ts` |
