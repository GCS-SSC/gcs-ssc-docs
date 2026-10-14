# Approval API

These requests support approval templates and the approval steps used on a file. A template defines how approval is arranged; a running approval records the decision on a particular item. See [Approval templates](../../programs/approval-templates.md) and [Approvals and completions](../../concepts/approvals-completions.md).

An API is the set of requests the application sends to its server when you open or save a record. Officers normally use the screens; developers use this index to find the code behind them. The server checks access to protected records even when a screen shows an action as available.

- **Method**: `GET` reads information; `POST` usually creates a record or performs an action; `PATCH` and `PUT` save changes; `DELETE` removes a record. `ANY` delegates requests without a single method listed here.
- **Route**: the request address. Replace names in brackets, such as `[id]`, with the actual record ID.
- **Authorization landmarks**: names found in the source that help a developer locate access checks.
- **Validation landmarks**: names that help locate checks on submitted fields or query options.
- **Source**: the application file that handles the request. A handler is the code that receives and answers it.

This table is generated from source names. A dash (`—`) means no matching name was found; it does not prove there is no access or data check. A listed name may also be a field or comment, rather than a check. Developers must follow the handler and its shared helpers to confirm the rules, response and tests; the coverage ledger tracks that evidence.

## Read-only example

An authorized request for `GET /api/agency/12/approval-templates/8` reads template 8 for agency 12. It does not publish the template or approve any file. Any numbers shown are illustrative: use IDs for existing records you are allowed to read.

## Handlers (16)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
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
| POST | `/api/approvals/approve` | executeFreshAuthorizedApprovalActorWrite, requireAuthContext | ReviewApprovalApproveSchema, readValidatedBodyI18n | `server/api/approvals/approve.post.ts` |
| POST | `/api/approvals/deny` | executeFreshAuthorizedApprovalActorWrite, requireAuthContext | ReviewApprovalDenySchema, readValidatedBodyI18n | `server/api/approvals/deny.post.ts` |
| GET | `/api/approvals/lookups/behalf-types` | requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/behalf-types.get.ts` |
| GET | `/api/approvals/lookups/groups` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/groups.get.ts` |
| GET | `/api/approvals/lookups/users` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/users.get.ts` |
| POST | `/api/approvals/reassign` | requireAuthContext | ReviewApprovalReassignSchema, readValidatedBodyI18n | `server/api/approvals/reassign.post.ts` |
| GET | `/api/approvals/runtime` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/runtime.get.ts` |
