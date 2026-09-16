# API des agences

Profils d’agence et données de référence bilingues appartenant à l’agence.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (54)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/agency/[id]` | authorizeWithFreshAuthContext, requireFreshAuthContext | — | `server/api/agency/[id].delete.ts` |
| GET | `/api/agency/[id]` | requireAuthContext | — | `server/api/agency/[id].get.ts` |
| PATCH | `/api/agency/[id]` | — | AgencyProfilePatchSchema, readValidatedBodyI18n | `server/api/agency/[id].patch.ts` |
| GET | `/api/agency/[id]/address-types` | requireAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/address-types.get.ts` |
| POST | `/api/agency/[id]/address-types` | — | AgencyAddressTypeSchema, readValidatedBodyI18n | `server/api/agency/[id]/address-types.post.ts` |
| GET | `/api/agency/[id]/agreement-types` | — | AgencyAgreementTypeListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/agreement-types.get.ts` |
| POST | `/api/agency/[id]/agreement-types` | — | AgencyAgreementTypeSchema, readValidatedBodyI18n | `server/api/agency/[id]/agreement-types.post.ts` |
| GET | `/api/agency/[id]/applicant-recipient-subtypes` | — | ApplicantRecipientSubtypeListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/applicant-recipient-subtypes.get.ts` |
| POST | `/api/agency/[id]/applicant-recipient-subtypes` | — | AgencyApplicantRecipientSubtypeSchema, readValidatedBodyI18n | `server/api/agency/[id]/applicant-recipient-subtypes.post.ts` |
| GET | `/api/agency/[id]/approval-behalf-types` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/approval-behalf-types.get.ts` |
| POST | `/api/agency/[id]/approval-behalf-types` | — | AgencyApprovalBehalfTypeSchema, readValidatedBodyI18n | `server/api/agency/[id]/approval-behalf-types.post.ts` |
| GET | `/api/agency/[id]/attachment-types` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/attachment-types.get.ts` |
| POST | `/api/agency/[id]/attachment-types` | — | AgencyAttachmentTypeSchema, readValidatedBodyI18n | `server/api/agency/[id]/attachment-types.post.ts` |
| GET | `/api/agency/[id]/claim-reconciliation-statuses` | — | — | `server/api/agency/[id]/claim-reconciliation-statuses.get.ts` |
| PATCH | `/api/agency/[id]/claim-reconciliation-statuses` | — | AgencyClaimReconciliationStatusConfigurationSchema, readValidatedBodyI18n | `server/api/agency/[id]/claim-reconciliation-statuses.patch.ts` |
| GET | `/api/agency/[id]/cost-categories` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/cost-categories.get.ts` |
| POST | `/api/agency/[id]/cost-categories` | — | AgencyCostCategorySchema, readValidatedBodyI18n | `server/api/agency/[id]/cost-categories.post.ts` |
| GET | `/api/agency/[id]/fiscal-years` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/fiscal-years.get.ts` |
| POST | `/api/agency/[id]/fiscal-years` | — | AgencyFiscalYearSchema, readValidatedBodyI18n | `server/api/agency/[id]/fiscal-years.post.ts` |
| GET | `/api/agency/[id]/holdback-bases` | — | AgencyHoldbackBasisListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/holdback-bases.get.ts` |
| POST | `/api/agency/[id]/holdback-bases` | — | AgencyHoldbackBasisWriteSchema, readValidatedBodyI18n | `server/api/agency/[id]/holdback-bases.post.ts` |
| GET | `/api/agency/[id]/line-items` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/line-items.get.ts` |
| GET | `/api/agency/[id]/programs` | — | TransferPaymentListQuerySchema, getValidatedQueryI18n | `server/api/agency/[id]/programs.get.ts` |
| GET | `/api/agency/[id]/review-schemas` | — | AgencyReviewSchemaListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[id]/review-schemas.get.ts` |
| GET | `/api/agency/[id]/statuses` | — | — | `server/api/agency/[id]/statuses.get.ts` |
| POST | `/api/agency/[id]/statuses` | — | StatusDefinitionCreateSchema, readValidatedBodyI18n | `server/api/agency/[id]/statuses.post.ts` |
| DELETE | `/api/agency/address-types/[id]` | — | — | `server/api/agency/address-types/[id].delete.ts` |
| PATCH | `/api/agency/address-types/[id]` | — | AgencyAddressTypeSchema, readValidatedBodyI18n | `server/api/agency/address-types/[id].patch.ts` |
| DELETE | `/api/agency/agreement-types/[id]` | — | — | `server/api/agency/agreement-types/[id].delete.ts` |
| PATCH | `/api/agency/agreement-types/[id]` | — | AgencyAgreementTypeSchema, readValidatedBodyI18n | `server/api/agency/agreement-types/[id].patch.ts` |
| DELETE | `/api/agency/applicant-recipient-subtypes/[id]` | — | — | `server/api/agency/applicant-recipient-subtypes/[id].delete.ts` |
| PATCH | `/api/agency/applicant-recipient-subtypes/[id]` | — | AgencyApplicantRecipientSubtypeSchema, readValidatedBodyI18n | `server/api/agency/applicant-recipient-subtypes/[id].patch.ts` |
| DELETE | `/api/agency/approval-behalf-types/[id]` | — | — | `server/api/agency/approval-behalf-types/[id].delete.ts` |
| PATCH | `/api/agency/approval-behalf-types/[id]` | — | AgencyApprovalBehalfTypeSchema, readValidatedBodyI18n | `server/api/agency/approval-behalf-types/[id].patch.ts` |
| DELETE | `/api/agency/attachment-types/[id]` | — | — | `server/api/agency/attachment-types/[id].delete.ts` |
| PATCH | `/api/agency/attachment-types/[id]` | — | AgencyAttachmentTypeSchema, readValidatedBodyI18n | `server/api/agency/attachment-types/[id].patch.ts` |
| DELETE | `/api/agency/cost-categories/[id]` | — | — | `server/api/agency/cost-categories/[id].delete.ts` |
| PATCH | `/api/agency/cost-categories/[id]` | — | AgencyCostCategoryPatchSchema, readValidatedBodyI18n | `server/api/agency/cost-categories/[id].patch.ts` |
| GET | `/api/agency/cost-categories/[id]/calculation-sources` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agency/cost-categories/[id]/calculation-sources.get.ts` |
| GET | `/api/agency/cost-categories/[id]/line-items` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/cost-categories/[id]/line-items.get.ts` |
| POST | `/api/agency/cost-categories/[id]/line-items` | — | AgencyCostCategoryLineItemSchema, readValidatedBodyI18n | `server/api/agency/cost-categories/[id]/line-items.post.ts` |
| DELETE | `/api/agency/fiscal-years/[id]` | — | — | `server/api/agency/fiscal-years/[id].delete.ts` |
| PATCH | `/api/agency/fiscal-years/[id]` | — | AgencyFiscalYearPatchSchema, AgencyFiscalYearSchema, parseI18n, readValidatedBodyI18n | `server/api/agency/fiscal-years/[id].patch.ts` |
| DELETE | `/api/agency/holdback-bases/[id]` | — | — | `server/api/agency/holdback-bases/[id].delete.ts` |
| PATCH | `/api/agency/holdback-bases/[id]` | — | AgencyHoldbackBasisWriteSchema, readValidatedBodyI18n | `server/api/agency/holdback-bases/[id].patch.ts` |
| GET | `/api/agency` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/index.get.ts` |
| POST | `/api/agency` | authorizeWithFreshAuthContext, requireFreshAuthContext | AgencyProfileSchema, readValidatedBodyI18n | `server/api/agency/index.post.ts` |
| DELETE | `/api/agency/line-items/[id]` | — | — | `server/api/agency/line-items/[id].delete.ts` |
| PATCH | `/api/agency/line-items/[id]` | — | AgencyCostCategoryLineItemPatchSchema, readValidatedBodyI18n | `server/api/agency/line-items/[id].patch.ts` |
| GET | `/api/agency/lookups/gwcoa/[number]` | — | AgencyGwcoaDetailQuerySchema, AgencyGwcoaNumberSchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n, parseI18n | `server/api/agency/lookups/gwcoa/[number].get.ts` |
| GET | `/api/agency/lookups/gwcoa` | — | AgencyGwcoaLookupQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/lookups/gwcoa/index.get.ts` |
| PATCH | `/api/agency/statuses/[statusId]` | — | StatusDefinitionPatchSchema, readValidatedBodyI18n | `server/api/agency/statuses/[statusId].patch.ts` |
| POST | `/api/agency/statuses/[statusId]/delete` | — | — | `server/api/agency/statuses/[statusId]/delete.post.ts` |
| POST | `/api/agency/statuses/[statusId]/restore` | — | — | `server/api/agency/statuses/[statusId]/restore.post.ts` |
