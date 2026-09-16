# API de plateforme et d’administration

GWCOA, preuves d’audit, pièces jointes partagées, métadonnées, état de santé et points d’entrée de plateforme.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (23)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/additional-reviewers/[additionalReviewerId]` | executeFreshAuthorizedReviewRuntimeDelete, requireAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId].delete.ts` |
| PATCH | `/api/additional-reviewers/[additionalReviewerId]` | executeFreshAuthorizedReviewAdditionalReviewerWrite, requireAuthContext | AdditionalReviewerInputSchema, readValidatedBodyI18n | `server/api/additional-reviewers/[additionalReviewerId].patch.ts` |
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
| GET | `/api/health` | — | — | `server/api/health.get.ts` |
| GET | `/api/list-view-agencies` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/list-view-agencies.get.ts` |
| GET | `/api/metadata/enums` | — | QuerySchema, getValidatedQueryI18n | `server/api/metadata/enums.get.ts` |
| GET | `/api/statuses` | — | — | `server/api/statuses/index.get.ts` |
