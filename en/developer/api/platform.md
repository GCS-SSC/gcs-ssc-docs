# Platform and administration API

These requests support shared services such as attachments, audit logs, groups, searches and system health. This group also contains intake and financial records whose routes are outside the agreement and proponent groups. See [Audit and access logs](../../admin/audit.md), [Attachments](../../concepts/attachments.md) and [Funding case intakes](../../intake/funding-case-intakes.md).

This index maps server requests to their handler files. The linked guides explain the on-screen steps. The server checks access to protected records even when a screen offers an action.

- The method identifies the request type. `GET` reads information. `POST` usually creates a record or runs an action. `PATCH` and `PUT` save changes. `DELETE` removes a record. `ANY` means the handler has no single method declared in its filename.
- The route is the request address. Replace bracketed names such as `[id]` with the actual record ID.
- Authorization names and validation names are matches found in the handler source. They help locate access checks and checks on submitted fields or query options.
- The source is the application file that handles the request.

A dash in the names columns means the generator found no matching name. It does not prove that a check is absent. A listed name may come from a field or comment. Follow the handler and its shared helpers to confirm access rules, validation and responses. The coverage ledger records the supporting evidence.

## Read-only example

`GET /api/health` checks whether the application is ready and can reach its database. A successful response is `{ "status": "ok" }`. This public check does not return funding-file data.

## Handlers (108)

| Method | Route | Authorization names | Validation names | Source |
| --- | --- | --- | --- | --- |
| ANY | `/api/[...path]` | — | — | `server/api/[...path].ts` |
| DELETE | `/api/account-receivable-credit-memos/[id]` | — | — | `server/api/account-receivable-credit-memos/[id].delete.ts` |
| GET | `/api/account-receivable-credit-memos/[id]` | — | — | `server/api/account-receivable-credit-memos/[id].get.ts` |
| PATCH | `/api/account-receivable-credit-memos/[id]` | — | AccountReceivableCreditMemoEditSchema, readValidatedBodyI18n | `server/api/account-receivable-credit-memos/[id].patch.ts` |
| DELETE | `/api/account-receivable-credit-memos/[id]/lines/[lineId]` | — | — | `server/api/account-receivable-credit-memos/[id]/lines/[lineId].delete.ts` |
| PATCH | `/api/account-receivable-credit-memos/[id]/lines/[lineId]` | — | AccountReceivableCreditMemoLineEditSchema, readValidatedBodyI18n | `server/api/account-receivable-credit-memos/[id]/lines/[lineId].patch.ts` |
| POST | `/api/account-receivable-credit-memos/[id]/lines` | — | AccountReceivableCreditMemoLineCreateSchema, readValidatedBodyI18n | `server/api/account-receivable-credit-memos/[id]/lines/index.post.ts` |
| POST | `/api/account-receivable-credit-memos` | — | AccountReceivableCreditMemoCreateSchema, readValidatedBodyI18n | `server/api/account-receivable-credit-memos/index.post.ts` |
| GET | `/api/account-receivable-credit-memos/lookups/agencies` | — | — | `server/api/account-receivable-credit-memos/lookups/agencies.get.ts` |
| GET | `/api/account-receivable-credit-memos/lookups/chart-of-accounts` | — | — | `server/api/account-receivable-credit-memos/lookups/chart-of-accounts.get.ts` |
| GET | `/api/account-receivable-credit-memos/lookups/receivables` | — | — | `server/api/account-receivable-credit-memos/lookups/receivables.get.ts` |
| DELETE | `/api/account-receivables/[id]` | — | — | `server/api/account-receivables/[id].delete.ts` |
| GET | `/api/account-receivables/[id]` | — | — | `server/api/account-receivables/[id].get.ts` |
| PATCH | `/api/account-receivables/[id]` | — | AccountReceivableEditSchema, AccountReceivableSummaryEditSchema, readValidatedBodyI18n | `server/api/account-receivables/[id].patch.ts` |
| POST | `/api/account-receivables/[id]/adjustments` | — | AccountReceivableCreateSchema, readValidatedBodyI18n | `server/api/account-receivables/[id]/adjustments.post.ts` |
| GET | `/api/account-receivables/[id]/claim-reductions` | — | — | `server/api/account-receivables/[id]/claim-reductions.get.ts` |
| PATCH | `/api/account-receivables/[id]/claim-reductions` | — | AccountReceivableClaimReductionSchema, readValidatedBodyI18n | `server/api/account-receivables/[id]/claim-reductions.patch.ts` |
| DELETE | `/api/account-receivables/[id]/lines/[lineId]` | — | — | `server/api/account-receivables/[id]/lines/[lineId].delete.ts` |
| PATCH | `/api/account-receivables/[id]/lines/[lineId]` | — | AccountReceivableLinePatchSchema, readValidatedBodyI18n | `server/api/account-receivables/[id]/lines/[lineId].patch.ts` |
| POST | `/api/account-receivables/[id]/lines/[lineId]/recode` | — | AccountReceivableRecodeSchema, readValidatedBodyI18n | `server/api/account-receivables/[id]/lines/[lineId]/recode.post.ts` |
| POST | `/api/account-receivables/[id]/lines/[lineId]/remove-coding` | — | — | `server/api/account-receivables/[id]/lines/[lineId]/remove-coding.post.ts` |
| POST | `/api/account-receivables/[id]/lines` | — | AccountReceivableLineCreateSchema, readValidatedBodyI18n | `server/api/account-receivables/[id]/lines/index.post.ts` |
| GET | `/api/account-receivables/[id]/lookups/charts` | — | — | `server/api/account-receivables/[id]/lookups/charts.get.ts` |
| GET | `/api/account-receivables/[id]/lookups/financial-ids` | — | PaginationSchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/account-receivables/[id]/lookups/financial-ids.get.ts` |
| GET | `/api/account-receivables/[id]/lookups/sources` | — | PaginationSchema, getValidatedQueryI18n | `server/api/account-receivables/[id]/lookups/sources.get.ts` |
| DELETE | `/api/additional-reviewers/[additionalReviewerId]` | executeFreshAuthorizedReviewRuntimeDelete, requireAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId].delete.ts` |
| PATCH | `/api/additional-reviewers/[additionalReviewerId]` | executeFreshAuthorizedReviewAdditionalReviewerWrite, requireAuthContext | AdditionalReviewerInputSchema, readValidatedBodyI18n | `server/api/additional-reviewers/[additionalReviewerId].patch.ts` |
| POST | `/api/additional-reviewers/[additionalReviewerId]/claim` | executeFreshAuthorizedReviewAdditionalReviewerWrite, requireAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId]/claim.post.ts` |
| POST | `/api/additional-reviewers/[additionalReviewerId]/complete` | executeFreshAuthorizedReviewAdditionalReviewerWrite, requireAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId]/complete.post.ts` |
| GET | `/api/admin/audit/access/[id]` | — | — | `server/api/admin/audit/access/[id].get.ts` |
| GET | `/api/admin/audit/access` | — | — | `server/api/admin/audit/access/index.get.ts` |
| GET | `/api/admin/audit/actors` | — | ActorLookupQuerySchema, AdminCommonListQuerySchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/admin/audit/actors.get.ts` |
| GET | `/api/admin/audit/config` | — | — | `server/api/admin/audit/config.get.ts` |
| GET | `/api/admin/audit/events/[kind]/[id]` | — | — | `server/api/admin/audit/events/[kind]/[id].get.ts` |
| GET | `/api/admin/audit/events` | — | — | `server/api/admin/audit/events/index.get.ts` |
| GET | `/api/admin/audit/tables` | — | — | `server/api/admin/audit/tables.get.ts` |
| GET | `/api/admin/dump` | — | — | `server/api/admin/dump.get.ts` |
| GET | `/api/admin/gwcoa/[id]` | — | — | `server/api/admin/gwcoa/[id].get.ts` |
| PATCH | `/api/admin/gwcoa/[id]` | executeFreshAuthorizedGwcoaWrite | CommonGwcoaPatchSchema, readValidatedBodyI18n | `server/api/admin/gwcoa/[id].patch.ts` |
| GET | `/api/admin/gwcoa` | — | AdminCommonListQuerySchema, GwcoaListQuerySchema, getValidatedQueryI18n | `server/api/admin/gwcoa/index.get.ts` |
| POST | `/api/admin/gwcoa` | executeFreshAuthorizedGwcoaWrite | CommonGwcoaCreateSchema, readValidatedBodyI18n | `server/api/admin/gwcoa/index.post.ts` |
| GET | `/api/admin/queues` | — | — | `server/api/admin/queues.get.ts` |
| GET | `/api/attachments/[entityType]/[entityId]/[attachmentId]/download` | — | — | `server/api/attachments/[entityType]/[entityId]/[attachmentId]/download.get.ts` |
| DELETE | `/api/attachments/[entityType]/[entityId]/[attachmentId]` | executeFreshAuthorizedAttachmentWrite | — | `server/api/attachments/[entityType]/[entityId]/[attachmentId]/index.delete.ts` |
| PATCH | `/api/attachments/[entityType]/[entityId]/[attachmentId]` | executeFreshAuthorizedAttachmentWrite | AttachmentPatchSchema, readValidatedBodyI18n | `server/api/attachments/[entityType]/[entityId]/[attachmentId]/index.patch.ts` |
| GET | `/api/attachments/[entityType]/[entityId]` | — | AttachmentListQuerySchema, getValidatedQueryI18n | `server/api/attachments/[entityType]/[entityId]/index.get.ts` |
| POST | `/api/attachments/[entityType]/[entityId]` | executeFreshAuthorizedAttachmentWrite | — | `server/api/attachments/[entityType]/[entityId]/index.post.ts` |
| GET | `/api/attachments/[entityType]/[entityId]/types` | — | AttachmentTypeLookupQuerySchema, getValidatedQueryI18n | `server/api/attachments/[entityType]/[entityId]/types.get.ts` |
| DELETE | `/api/corrections/[id]` | — | — | `server/api/corrections/[id].delete.ts` |
| GET | `/api/corrections/[id]` | — | — | `server/api/corrections/[id].get.ts` |
| PATCH | `/api/corrections/[id]` | — | CorrectionEditSchema, readValidatedBodyI18n | `server/api/corrections/[id].patch.ts` |
| POST | `/api/corrections/[id]/cancel` | — | CorrectionCancelSchema, readValidatedBodyI18n | `server/api/corrections/[id]/cancel.post.ts` |
| GET | `/api/data-collections/[dataCollectionId]` | canAuthorizeReviewRuntimeAction, requireAuthContext | — | `server/api/data-collections/[dataCollectionId].get.ts` |
| PUT | `/api/data-collections/[dataCollectionId]` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext, unauthorized | DataCollectionSaveQuerySchema, DataCollectionSaveSchema, getValidatedQueryI18n, readValidatedBodyI18n | `server/api/data-collections/[dataCollectionId].put.ts` |
| POST | `/api/data-collections/[dataCollectionId]/claim` | executeFreshAuthorizedRuntimeGroupClaim, requireAuthContext | — | `server/api/data-collections/[dataCollectionId]/claim.post.ts` |
| DELETE | `/api/funding-case-intakes/[id]` | requireAuthContext, requireFreshAuthContext | — | `server/api/funding-case-intakes/[id].delete.ts` |
| GET | `/api/funding-case-intakes/[id]` | requireAuthContext | — | `server/api/funding-case-intakes/[id].get.ts` |
| PATCH | `/api/funding-case-intakes/[id]` | requireAuthContext, requireFreshAuthContext | FundingCaseIntakePatchSchema, readValidatedBodyI18n | `server/api/funding-case-intakes/[id].patch.ts` |
| POST | `/api/funding-case-intakes/[id]/claim` | requireAuthContext, requireFreshAuthContext | — | `server/api/funding-case-intakes/[id]/claim.post.ts` |
| PATCH | `/api/funding-case-intakes/[id]/group` | requireAuthContext | PositivePostgresBigintIdSchema, readValidatedBodyI18n | `server/api/funding-case-intakes/[id]/group.patch.ts` |
| GET | `/api/funding-case-intakes/[id]/groups` | requireAuthContext | — | `server/api/funding-case-intakes/[id]/groups.get.ts` |
| GET | `/api/funding-case-intakes` | requireAuthContext | PaginationSchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/funding-case-intakes/index.get.ts` |
| POST | `/api/funding-case-intakes` | authorizeWithFreshAuthContext, requireFreshAuthContext | FundingCaseIntakeCreateSchema, readValidatedBodyI18n | `server/api/funding-case-intakes/index.post.ts` |
| GET | `/api/funding-case-intakes/lookups/attachment-types` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | AttachmentTypeLookupQuerySchema, QuerySchema, getValidatedQueryI18n | `server/api/funding-case-intakes/lookups/attachment-types.get.ts` |
| GET | `/api/funding-case-intakes/lookups/opportunities` | requireAuthContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/funding-case-intakes/lookups/opportunities.get.ts` |
| DELETE | `/api/funding-opportunities/[id]` | requireAuthContext, requireFreshAuthContext | — | `server/api/funding-opportunities/[id].delete.ts` |
| GET | `/api/funding-opportunities/[id]` | requireAuthContext | — | `server/api/funding-opportunities/[id].get.ts` |
| PATCH | `/api/funding-opportunities/[id]` | requireAuthContext, requireFreshAuthContext | FundingOpportunityPatchSchema, readValidatedBodyI18n | `server/api/funding-opportunities/[id].patch.ts` |
| GET | `/api/funding-opportunities/[id]/lookups/attachment-types` | requireAuthContext | AttachmentTypeLookupQuerySchema, getValidatedQueryI18n | `server/api/funding-opportunities/[id]/lookups/attachment-types.get.ts` |
| GET | `/api/funding-opportunities` | requireAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/funding-opportunities/index.get.ts` |
| POST | `/api/funding-opportunities` | authorizeWithFreshAuthContext, requireFreshAuthContext | FundingOpportunityCreateSchema, readValidatedBodyI18n | `server/api/funding-opportunities/index.post.ts` |
| GET | `/api/funding-opportunities/lookups/setups` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/funding-opportunities/lookups/setups.get.ts` |
| GET | `/api/funding-opportunities/lookups/streams` | requireAuthContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/funding-opportunities/lookups/streams.get.ts` |
| GET | `/api/group-work` | requireAuthContext, requireFreshAuthContext, resolveAgreementScopeContext | Common_Recommendation_Schema, Common_Review_Schema, PaginationSchema, getValidatedQueryI18n | `server/api/group-work/index.get.ts` |
| DELETE | `/api/groups/[id]` | — | — | `server/api/groups/[id].delete.ts` |
| GET | `/api/groups/[id]` | — | — | `server/api/groups/[id].get.ts` |
| PATCH | `/api/groups/[id]` | — | GroupPatchSchema, readValidatedBodyI18n | `server/api/groups/[id].patch.ts` |
| DELETE | `/api/groups/[id]/members/[userId]` | — | — | `server/api/groups/[id]/members/[userId].delete.ts` |
| GET | `/api/groups/[id]/members` | — | — | `server/api/groups/[id]/members/index.get.ts` |
| POST | `/api/groups/[id]/members` | — | GroupMemberSchema, readValidatedBodyI18n | `server/api/groups/[id]/members/index.post.ts` |
| GET | `/api/groups/[id]/members/lookups` | — | — | `server/api/groups/[id]/members/lookups.get.ts` |
| GET | `/api/groups/agencies` | — | — | `server/api/groups/agencies.get.ts` |
| GET | `/api/groups` | — | PaginationSchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/groups/index.get.ts` |
| POST | `/api/groups` | — | GroupCreateSchema, readValidatedBodyI18n | `server/api/groups/index.post.ts` |
| GET | `/api/groups/lookups` | resolveApprovalTemplateScopeContextFromTemplateId | PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/groups/lookups.get.ts` |
| DELETE | `/api/guided-help/[id]` | — | — | `server/api/guided-help/[id].delete.ts` |
| GET | `/api/guided-help/[id]` | — | — | `server/api/guided-help/[id].get.ts` |
| PATCH | `/api/guided-help/[id]` | requireAuthContext | GuidedHelpCreateSchema, readValidatedBodyI18n | `server/api/guided-help/[id].patch.ts` |
| POST | `/api/guided-help/[id]/publish` | — | — | `server/api/guided-help/[id]/publish.post.ts` |
| POST | `/api/guided-help/[id]/retire` | — | — | `server/api/guided-help/[id]/retire.post.ts` |
| GET | `/api/guided-help/contexts` | — | — | `server/api/guided-help/contexts.get.ts` |
| GET | `/api/guided-help/discovery` | — | — | `server/api/guided-help/discovery.get.ts` |
| GET | `/api/guided-help` | — | — | `server/api/guided-help/index.get.ts` |
| POST | `/api/guided-help` | requireAuthContext | GuidedHelpCreateSchema, readValidatedBodyI18n | `server/api/guided-help/index.post.ts` |
| GET | `/api/guided-help/shared` | — | — | `server/api/guided-help/shared.get.ts` |
| GET | `/api/health` | — | — | `server/api/health.get.ts` |
| DELETE | `/api/journal-vouchers/[id]` | — | — | `server/api/journal-vouchers/[id].delete.ts` |
| GET | `/api/journal-vouchers/[id]` | — | — | `server/api/journal-vouchers/[id].get.ts` |
| PATCH | `/api/journal-vouchers/[id]` | — | JournalVoucherEditSchema, readValidatedBodyI18n | `server/api/journal-vouchers/[id].patch.ts` |
| GET | `/api/journal-vouchers/[id]/coding` | — | TransferPaymentStreamChartOfAccountDimensionSchema | `server/api/journal-vouchers/[id]/coding.get.ts` |
| POST | `/api/journal-vouchers/[id]/reversal` | — | JournalVoucherReversalSchema, readValidatedBodyI18n | `server/api/journal-vouchers/[id]/reversal.post.ts` |
| GET | `/api/journal-vouchers` | requireAuthContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/journal-vouchers/index.get.ts` |
| POST | `/api/journal-vouchers` | — | JournalVoucherCreateSchema, readValidatedBodyI18n | `server/api/journal-vouchers/index.post.ts` |
| GET | `/api/journal-vouchers/lookups/payments` | requireAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/journal-vouchers/lookups/payments.get.ts` |
| GET | `/api/list-view-agencies` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/list-view-agencies.get.ts` |
| GET | `/api/metadata/enums` | — | QuerySchema, getValidatedQueryI18n | `server/api/metadata/enums.get.ts` |
| GET | `/api/search` | requireAuthContext | SearchQuerySchema, getValidatedQueryI18n | `server/api/search.get.ts` |
| GET | `/api/statuses` | — | — | `server/api/statuses/index.get.ts` |
