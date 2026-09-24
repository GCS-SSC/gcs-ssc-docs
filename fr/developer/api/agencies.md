# API des agences

Profils d’agence et données de référence bilingues appartenant à l’agence.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (105)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/agency/[agencyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | — | `server/api/agency/[agencyId].delete.ts` |
| GET | `/api/agency/[agencyId]` | requireAuthContext | — | `server/api/agency/[agencyId].get.ts` |
| PATCH | `/api/agency/[agencyId]` | — | AgencyProfilePatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId].patch.ts` |
| GET | `/api/agency/[agencyId]/address-types` | requireAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/address-types.get.ts` |
| POST | `/api/agency/[agencyId]/address-types` | — | AgencyAddressTypeSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/address-types.post.ts` |
| GET | `/api/agency/[agencyId]/agreement-types` | — | AgencyAgreementTypeListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/agreement-types.get.ts` |
| POST | `/api/agency/[agencyId]/agreement-types` | — | AgencyAgreementTypeSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/agreement-types.post.ts` |
| GET | `/api/agency/[agencyId]/applicant-recipient-subtypes` | — | ApplicantRecipientSubtypeListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/applicant-recipient-subtypes.get.ts` |
| POST | `/api/agency/[agencyId]/applicant-recipient-subtypes` | — | AgencyApplicantRecipientSubtypeSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/applicant-recipient-subtypes.post.ts` |
| GET | `/api/agency/[agencyId]/approval-behalf-types` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/approval-behalf-types.get.ts` |
| POST | `/api/agency/[agencyId]/approval-behalf-types` | — | AgencyApprovalBehalfTypeSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/approval-behalf-types.post.ts` |
| GET | `/api/agency/[agencyId]/attachment-types` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/attachment-types.get.ts` |
| POST | `/api/agency/[agencyId]/attachment-types` | — | AgencyAttachmentTypeSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/attachment-types.post.ts` |
| DELETE | `/api/agency/[agencyId]/chart-of-accounts/[chartId]` | — | — | `server/api/agency/[agencyId]/chart-of-accounts/[chartId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/chart-of-accounts/[chartId]` | — | — | `server/api/agency/[agencyId]/chart-of-accounts/[chartId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/chart-of-accounts/[chartId]` | — | AgencyChartOfAccountPatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/chart-of-accounts/[chartId]/index.patch.ts` |
| GET | `/api/agency/[agencyId]/chart-of-accounts` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/chart-of-accounts/index.get.ts` |
| POST | `/api/agency/[agencyId]/chart-of-accounts` | — | AgencyChartOfAccountSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/chart-of-accounts/index.post.ts` |
| GET | `/api/agency/[agencyId]/claim-reconciliation-statuses` | — | — | `server/api/agency/[agencyId]/claim-reconciliation-statuses.get.ts` |
| PATCH | `/api/agency/[agencyId]/claim-reconciliation-statuses` | — | AgencyClaimReconciliationStatusConfigurationSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/claim-reconciliation-statuses.patch.ts` |
| DELETE | `/api/agency/[agencyId]/commitment-types/[typeId]` | — | — | `server/api/agency/[agencyId]/commitment-types/[typeId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/commitment-types/[typeId]` | — | — | `server/api/agency/[agencyId]/commitment-types/[typeId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/commitment-types/[typeId]` | — | AgencyCommitmentTypePatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/commitment-types/[typeId]/index.patch.ts` |
| GET | `/api/agency/[agencyId]/commitment-types` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/commitment-types/index.get.ts` |
| POST | `/api/agency/[agencyId]/commitment-types` | — | AgencyCommitmentTypeSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/commitment-types/index.post.ts` |
| GET | `/api/agency/[agencyId]/cost-categories` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/cost-categories.get.ts` |
| POST | `/api/agency/[agencyId]/cost-categories` | — | AgencyCostCategorySchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/cost-categories.post.ts` |
| DELETE | `/api/agency/[agencyId]/custom-fields/[fieldId]` | — | — | `server/api/agency/[agencyId]/custom-fields/[fieldId].delete.ts` |
| PATCH | `/api/agency/[agencyId]/custom-fields/[fieldId]` | — | AgencyCustomFieldCreateSchema, AgencyCustomFieldPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/agency/[agencyId]/custom-fields/[fieldId].patch.ts` |
| DELETE | `/api/agency/[agencyId]/custom-fields/[fieldId]/options/[optionId]` | — | — | `server/api/agency/[agencyId]/custom-fields/[fieldId]/options/[optionId].delete.ts` |
| PATCH | `/api/agency/[agencyId]/custom-fields/[fieldId]/options/[optionId]` | — | AgencyCustomFieldOptionCreateSchema, AgencyCustomFieldOptionPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/agency/[agencyId]/custom-fields/[fieldId]/options/[optionId].patch.ts` |
| POST | `/api/agency/[agencyId]/custom-fields/[fieldId]/options` | — | AgencyCustomFieldOptionCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/custom-fields/[fieldId]/options/index.post.ts` |
| GET | `/api/agency/[agencyId]/custom-fields` | — | — | `server/api/agency/[agencyId]/custom-fields/index.get.ts` |
| POST | `/api/agency/[agencyId]/custom-fields` | — | AgencyCustomFieldCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/custom-fields/index.post.ts` |
| GET | `/api/agency/[agencyId]/document-templates/[templateId]/download` | — | QuerySchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/document-templates/[templateId]/download.get.ts` |
| DELETE | `/api/agency/[agencyId]/document-templates/[templateId]` | — | — | `server/api/agency/[agencyId]/document-templates/[templateId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/document-templates/[templateId]` | — | — | `server/api/agency/[agencyId]/document-templates/[templateId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/document-templates/[templateId]` | — | — | `server/api/agency/[agencyId]/document-templates/[templateId]/index.patch.ts` |
| GET | `/api/agency/[agencyId]/document-templates` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/document-templates/index.get.ts` |
| POST | `/api/agency/[agencyId]/document-templates` | — | — | `server/api/agency/[agencyId]/document-templates/index.post.ts` |
| GET | `/api/agency/[agencyId]/fiscal-years` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/fiscal-years.get.ts` |
| POST | `/api/agency/[agencyId]/fiscal-years` | — | AgencyFiscalYearSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/fiscal-years.post.ts` |
| GET | `/api/agency/[agencyId]/holdback-bases` | — | AgencyHoldbackBasisListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/holdback-bases.get.ts` |
| POST | `/api/agency/[agencyId]/holdback-bases` | — | AgencyHoldbackBasisWriteSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/holdback-bases.post.ts` |
| GET | `/api/agency/[agencyId]/line-items` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/line-items.get.ts` |
| GET | `/api/agency/[agencyId]/monitor-types` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/monitor-types.get.ts` |
| POST | `/api/agency/[agencyId]/monitor-types` | — | AgencyMonitorTypeSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/monitor-types.post.ts` |
| GET | `/api/agency/[agencyId]/programs` | — | TransferPaymentListQuerySchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/programs.get.ts` |
| GET | `/api/agency/[agencyId]/recommendation-schemas/[schemaId]` | — | — | `server/api/agency/[agencyId]/recommendation-schemas/[schemaId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/recommendation-schemas/[schemaId]` | — | — | `server/api/agency/[agencyId]/recommendation-schemas/[schemaId]/index.patch.ts` |
| POST | `/api/agency/[agencyId]/recommendation-schemas/[schemaId]/publish` | — | — | `server/api/agency/[agencyId]/recommendation-schemas/[schemaId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/recommendation-schemas/[schemaId]/retire` | — | — | `server/api/agency/[agencyId]/recommendation-schemas/[schemaId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/recommendation-schemas` | — | — | `server/api/agency/[agencyId]/recommendation-schemas/index.get.ts` |
| POST | `/api/agency/[agencyId]/recommendation-schemas` | — | — | `server/api/agency/[agencyId]/recommendation-schemas/index.post.ts` |
| DELETE | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/index.patch.ts` |
| DELETE | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/items/[itemId]` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/items/[itemId]/index.delete.ts` |
| PATCH | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/items/[itemId]` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/items/[itemId]/index.patch.ts` |
| POST | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/items/create-schema` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/items/create-schema.post.ts` |
| POST | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/items` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/items/index.post.ts` |
| POST | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/publish` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/retire` | — | — | `server/api/agency/[agencyId]/recommendation-sets/[recommendationSetId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/recommendation-sets` | — | — | `server/api/agency/[agencyId]/recommendation-sets/index.get.ts` |
| POST | `/api/agency/[agencyId]/recommendation-sets` | — | — | `server/api/agency/[agencyId]/recommendation-sets/index.post.ts` |
| GET | `/api/agency/[agencyId]/review-schemas` | — | AgencyReviewSchemaListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/review-schemas.get.ts` |
| POST | `/api/agency/[agencyId]/review-schemas` | — | — | `server/api/agency/[agencyId]/review-schemas.post.ts` |
| DELETE | `/api/agency/[agencyId]/review-schemas/[schemaId]` | — | — | `server/api/agency/[agencyId]/review-schemas/[schemaId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/review-schemas/[schemaId]` | — | — | `server/api/agency/[agencyId]/review-schemas/[schemaId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/review-schemas/[schemaId]` | — | — | `server/api/agency/[agencyId]/review-schemas/[schemaId]/index.patch.ts` |
| POST | `/api/agency/[agencyId]/review-schemas/[schemaId]/publish` | — | — | `server/api/agency/[agencyId]/review-schemas/[schemaId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/review-schemas/[schemaId]/retire` | — | — | `server/api/agency/[agencyId]/review-schemas/[schemaId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/statuses` | — | — | `server/api/agency/[agencyId]/statuses.get.ts` |
| POST | `/api/agency/[agencyId]/statuses` | — | StatusDefinitionCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/statuses.post.ts` |
| GET | `/api/agency/[agencyId]/workflow-condition-choices` | — | — | `server/api/agency/[agencyId]/workflow-condition-choices.get.ts` |
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
| PATCH | `/api/agency/holdback-bases/[id]` | — | AgencyHoldbackBasisPatchSchema, readValidatedBodyI18n | `server/api/agency/holdback-bases/[id].patch.ts` |
| GET | `/api/agency` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/index.get.ts` |
| POST | `/api/agency` | authorizeWithFreshAuthContext, requireFreshAuthContext | AgencyProfileSchema, readValidatedBodyI18n | `server/api/agency/index.post.ts` |
| DELETE | `/api/agency/line-items/[id]` | — | — | `server/api/agency/line-items/[id].delete.ts` |
| PATCH | `/api/agency/line-items/[id]` | — | AgencyCostCategoryLineItemPatchSchema, readValidatedBodyI18n | `server/api/agency/line-items/[id].patch.ts` |
| GET | `/api/agency/lookups/gwcoa/[number]` | — | AgencyGwcoaDetailQuerySchema, AgencyGwcoaNumberSchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n, parseI18n | `server/api/agency/lookups/gwcoa/[number].get.ts` |
| GET | `/api/agency/lookups/gwcoa` | — | AgencyGwcoaLookupQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/lookups/gwcoa/index.get.ts` |
| DELETE | `/api/agency/monitor-types/[id]` | — | — | `server/api/agency/monitor-types/[id].delete.ts` |
| PATCH | `/api/agency/monitor-types/[id]` | — | AgencyMonitorTypePatchSchema, readValidatedBodyI18n | `server/api/agency/monitor-types/[id].patch.ts` |
| PATCH | `/api/agency/statuses/[statusId]` | — | StatusDefinitionPatchSchema, readValidatedBodyI18n | `server/api/agency/statuses/[statusId].patch.ts` |
| POST | `/api/agency/statuses/[statusId]/delete` | — | — | `server/api/agency/statuses/[statusId]/delete.post.ts` |
| POST | `/api/agency/statuses/[statusId]/restore` | — | — | `server/api/agency/statuses/[statusId]/restore.post.ts` |
