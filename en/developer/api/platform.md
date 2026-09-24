# Platform and administration API

GWCOA, audit evidence, shared attachments, metadata, health, and platform endpoints.

This generated route index is an exhaustive navigation table, not independent proof of a contract. For each handler, the coverage ledger records the direct authorization, validation, helper, database, response, UI, and test evidence required before terminal verification. Client permissions never replace server authorization.

## Handlers (37)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| ANY | `/api/[...path]` | — | — | `server/api/[...path].ts` |
| DELETE | `/api/additional-reviewers/[additionalReviewerId]` | executeFreshAuthorizedReviewRuntimeDelete, requireAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId].delete.ts` |
| PATCH | `/api/additional-reviewers/[additionalReviewerId]` | executeFreshAuthorizedReviewAdditionalReviewerWrite, requireAuthContext | AdditionalReviewerInputSchema, readValidatedBodyI18n | `server/api/additional-reviewers/[additionalReviewerId].patch.ts` |
| POST | `/api/additional-reviewers/[additionalReviewerId]/claim` | requireAuthContext, requireFreshAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId]/claim.post.ts` |
| POST | `/api/additional-reviewers/[additionalReviewerId]/complete` | executeFreshAuthorizedReviewAdditionalReviewerWrite, requireAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId]/complete.post.ts` |
| GET | `/api/admin/audit/access/[id]` | — | — | `server/api/admin/audit/access/[id].get.ts` |
| GET | `/api/admin/audit/access` | — | — | `server/api/admin/audit/access/index.get.ts` |
| GET | `/api/admin/audit/config` | — | — | `server/api/admin/audit/config.get.ts` |
| GET | `/api/admin/audit/events/[kind]/[id]` | — | — | `server/api/admin/audit/events/[kind]/[id].get.ts` |
| GET | `/api/admin/audit/events` | — | — | `server/api/admin/audit/events/index.get.ts` |
| GET | `/api/admin/dump` | — | — | `server/api/admin/dump.get.ts` |
| GET | `/api/admin/gwcoa/[id]` | — | — | `server/api/admin/gwcoa/[id].get.ts` |
| PATCH | `/api/admin/gwcoa/[id]` | executeFreshAuthorizedGwcoaWrite | CommonGwcoaPatchSchema, readValidatedBodyI18n | `server/api/admin/gwcoa/[id].patch.ts` |
| GET | `/api/admin/gwcoa` | — | AdminCommonListQuerySchema, GwcoaListQuerySchema, getValidatedQueryI18n | `server/api/admin/gwcoa/index.get.ts` |
| POST | `/api/admin/gwcoa` | executeFreshAuthorizedGwcoaWrite | CommonGwcoaCreateSchema, readValidatedBodyI18n | `server/api/admin/gwcoa/index.post.ts` |
| GET | `/api/attachments/[entityType]/[entityId]/[attachmentId]/download` | — | — | `server/api/attachments/[entityType]/[entityId]/[attachmentId]/download.get.ts` |
| DELETE | `/api/attachments/[entityType]/[entityId]/[attachmentId]` | executeFreshAuthorizedAttachmentWrite | — | `server/api/attachments/[entityType]/[entityId]/[attachmentId]/index.delete.ts` |
| PATCH | `/api/attachments/[entityType]/[entityId]/[attachmentId]` | executeFreshAuthorizedAttachmentWrite | AttachmentPatchSchema, readValidatedBodyI18n | `server/api/attachments/[entityType]/[entityId]/[attachmentId]/index.patch.ts` |
| GET | `/api/attachments/[entityType]/[entityId]` | — | AttachmentListQuerySchema, getValidatedQueryI18n | `server/api/attachments/[entityType]/[entityId]/index.get.ts` |
| POST | `/api/attachments/[entityType]/[entityId]` | executeFreshAuthorizedAttachmentWrite | — | `server/api/attachments/[entityType]/[entityId]/index.post.ts` |
| GET | `/api/attachments/[entityType]/[entityId]/types` | — | AttachmentTypeLookupQuerySchema, getValidatedQueryI18n | `server/api/attachments/[entityType]/[entityId]/types.get.ts` |
| GET | `/api/group-work` | requireAuthContext, requireFreshAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/group-work/index.get.ts` |
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
| GET | `/api/health` | — | — | `server/api/health.get.ts` |
| GET | `/api/list-view-agencies` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/list-view-agencies.get.ts` |
| GET | `/api/metadata/enums` | — | QuerySchema, getValidatedQueryI18n | `server/api/metadata/enums.get.ts` |
| GET | `/api/statuses` | — | — | `server/api/statuses/index.get.ts` |
