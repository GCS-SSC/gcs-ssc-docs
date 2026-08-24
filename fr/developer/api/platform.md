# API de plateforme et d’administration

Administration commune, métadonnées, état de santé et autres points d’entrée de plateforme.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (19)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/additional-reviewers/[additionalReviewerId]` | executeFreshAuthorizedReviewRuntimeDelete, requireAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId].delete.ts` |
| PATCH | `/api/additional-reviewers/[additionalReviewerId]` | executeFreshAuthorizedReviewAdditionalReviewerWrite, requireAuthContext | AdditionalReviewerInputSchema, readValidatedBodyI18n | `server/api/additional-reviewers/[additionalReviewerId].patch.ts` |
| POST | `/api/additional-reviewers/[additionalReviewerId]/complete` | executeFreshAuthorizedReviewAdditionalReviewerWrite, requireAuthContext | — | `server/api/additional-reviewers/[additionalReviewerId]/complete.post.ts` |
| GET | `/api/admin/common/[resource]/[id]` | — | — | `server/api/admin/common/[resource]/[id].get.ts` |
| PATCH | `/api/admin/common/[resource]/[id]` | executeFreshAuthorizedAdminCommonWrite | — | `server/api/admin/common/[resource]/[id].patch.ts` |
| GET | `/api/admin/common/[resource]` | — | AdminCommonListQuerySchema, getValidatedQueryI18n | `server/api/admin/common/[resource]/index.get.ts` |
| POST | `/api/admin/common/[resource]` | executeFreshAuthorizedAdminCommonWrite | — | `server/api/admin/common/[resource]/index.post.ts` |
| DELETE | `/api/admin/common/form-schemas/[id]` | — | Common_Form_Schema | `server/api/admin/common/form-schemas/[id].delete.ts` |
| GET | `/api/admin/common/form-schemas/[id]` | — | — | `server/api/admin/common/form-schemas/[id].get.ts` |
| PATCH | `/api/admin/common/form-schemas/[id]` | — | CommonFormSchemaPatchSchema, Common_Form_Schema, readValidatedBodyI18n | `server/api/admin/common/form-schemas/[id].patch.ts` |
| POST | `/api/admin/common/form-schemas/[id]/publish` | — | — | `server/api/admin/common/form-schemas/[id]/publish.post.ts` |
| POST | `/api/admin/common/form-schemas/[id]/retire` | — | — | `server/api/admin/common/form-schemas/[id]/retire.post.ts` |
| GET | `/api/admin/common/form-schemas/agencies` | — | PaginationSchema, getValidatedQueryI18n | `server/api/admin/common/form-schemas/agencies.get.ts` |
| GET | `/api/admin/common/form-schemas` | — | FormSchemaListQuerySchema, getValidatedQueryI18n | `server/api/admin/common/form-schemas/index.get.ts` |
| POST | `/api/admin/common/form-schemas` | — | CommonFormSchemaCreateSchema, Common_Form_Schema, readValidatedBodyI18n | `server/api/admin/common/form-schemas/index.post.ts` |
| GET | `/api/admin/dump` | — | — | `server/api/admin/dump.get.ts` |
| GET | `/api/health` | — | — | `server/api/health.get.ts` |
| GET | `/api/metadata/enums` | — | QuerySchema, getValidatedQueryI18n | `server/api/metadata/enums.get.ts` |
| GET | `/api/statuses` | — | — | `server/api/statuses/index.get.ts` |
