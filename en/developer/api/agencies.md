# Agency API

These requests support agency profiles and the shared lists used in forms, such as agreement types and fiscal years. Officers use these lists when working on funding files. See [Agencies](../../admin/agencies.md) and [Agency catalogues](../../admin/agency-catalogs.md).

This index maps server requests to their handler files. The linked guides explain the on-screen steps. The server checks access to protected records even when a screen offers an action.

- The method identifies the request type. `GET` reads information. `POST` usually creates a record or runs an action. `PATCH` and `PUT` save changes. `DELETE` removes a record. `ANY` means the handler has no single method declared in its filename.
- The route is the request address. Replace bracketed names such as `[id]` with the actual record ID.
- Authorization names and validation names are matches found in the handler source. They help locate access checks and checks on submitted fields or query options.
- The source is the application file that handles the request.

A dash in the names columns means the generator found no matching name. It does not prove that a check is absent. A listed name may come from a field or comment. Follow the handler and its shared helpers to confirm access rules, validation and responses. The coverage ledger records the supporting evidence.

## Read-only example

An authorized request for `GET /api/agency/12` reads the profile for agency 12. It does not change the profile or its reference lists. The IDs are examples. Use existing records you are allowed to read.

## Handlers (137)

| Method | Route | Authorization names | Validation names | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/agency/[agencyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | — | `server/api/agency/[agencyId].delete.ts` |
| GET | `/api/agency/[agencyId]` | requireAuthContext | — | `server/api/agency/[agencyId].get.ts` |
| PATCH | `/api/agency/[agencyId]` | — | AgencyProfilePatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId].patch.ts` |
| DELETE | `/api/agency/[agencyId]/account-receivable-types/[typeId]` | — | — | `server/api/agency/[agencyId]/account-receivable-types/[typeId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/account-receivable-types/[typeId]` | — | — | `server/api/agency/[agencyId]/account-receivable-types/[typeId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/account-receivable-types/[typeId]` | — | AgencyAccountReceivableTypePatchSchema, AgencyAccountReceivableTypeSchema, parseI18n, readValidatedBodyI18n | `server/api/agency/[agencyId]/account-receivable-types/[typeId]/index.patch.ts` |
| GET | `/api/agency/[agencyId]/account-receivable-types` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/account-receivable-types/index.get.ts` |
| POST | `/api/agency/[agencyId]/account-receivable-types` | — | AgencyAccountReceivableTypeSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/account-receivable-types/index.post.ts` |
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
| GET | `/api/agency/[agencyId]/chart-of-accounts` | — | ChartListQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/chart-of-accounts/index.get.ts` |
| POST | `/api/agency/[agencyId]/chart-of-accounts` | — | AgencyChartOfAccountSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/chart-of-accounts/index.post.ts` |
| GET | `/api/agency/[agencyId]/chart-of-accounts/lookups/commitment-accounts` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, TransferPaymentStreamChartOfAccountDimensionSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/chart-of-accounts/lookups/commitment-accounts.get.ts` |
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
| DELETE | `/api/agency/[agencyId]/data-collections/[dataCollectionId]` | — | — | `server/api/agency/[agencyId]/data-collections/[dataCollectionId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/data-collections/[dataCollectionId]` | — | — | `server/api/agency/[agencyId]/data-collections/[dataCollectionId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/data-collections/[dataCollectionId]` | — | — | `server/api/agency/[agencyId]/data-collections/[dataCollectionId]/index.patch.ts` |
| POST | `/api/agency/[agencyId]/data-collections/[dataCollectionId]/publish` | — | — | `server/api/agency/[agencyId]/data-collections/[dataCollectionId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/data-collections/[dataCollectionId]/retire` | — | — | `server/api/agency/[agencyId]/data-collections/[dataCollectionId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/data-collections` | — | — | `server/api/agency/[agencyId]/data-collections/index.get.ts` |
| POST | `/api/agency/[agencyId]/data-collections` | — | — | `server/api/agency/[agencyId]/data-collections/index.post.ts` |
| GET | `/api/agency/[agencyId]/document-templates/[templateId]/download` | — | QuerySchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/document-templates/[templateId]/download.get.ts` |
| DELETE | `/api/agency/[agencyId]/document-templates/[templateId]` | — | — | `server/api/agency/[agencyId]/document-templates/[templateId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/document-templates/[templateId]` | — | — | `server/api/agency/[agencyId]/document-templates/[templateId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/document-templates/[templateId]` | — | — | `server/api/agency/[agencyId]/document-templates/[templateId]/index.patch.ts` |
| GET | `/api/agency/[agencyId]/document-templates` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/document-templates/index.get.ts` |
| POST | `/api/agency/[agencyId]/document-templates` | — | — | `server/api/agency/[agencyId]/document-templates/index.post.ts` |
| GET | `/api/agency/[agencyId]/fiscal-years` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/fiscal-years.get.ts` |
| POST | `/api/agency/[agencyId]/fiscal-years` | requireFreshAuthContext | AgencyFiscalYearSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/fiscal-years.post.ts` |
| GET | `/api/agency/[agencyId]/funding-subtypes` | — | — | `server/api/agency/[agencyId]/funding-subtypes/index.get.ts` |
| DELETE | `/api/agency/[agencyId]/funding-types/[typeId]` | — | — | `server/api/agency/[agencyId]/funding-types/[typeId].delete.ts` |
| PATCH | `/api/agency/[agencyId]/funding-types/[typeId]` | — | AgencyFundingTypePatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/funding-types/[typeId].patch.ts` |
| DELETE | `/api/agency/[agencyId]/funding-types/[typeId]/subtypes/[subtypeId]` | — | — | `server/api/agency/[agencyId]/funding-types/[typeId]/subtypes/[subtypeId].delete.ts` |
| PATCH | `/api/agency/[agencyId]/funding-types/[typeId]/subtypes/[subtypeId]` | — | AgencyFundingSubtypePatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/funding-types/[typeId]/subtypes/[subtypeId].patch.ts` |
| GET | `/api/agency/[agencyId]/funding-types/[typeId]/subtypes` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/funding-types/[typeId]/subtypes/index.get.ts` |
| POST | `/api/agency/[agencyId]/funding-types/[typeId]/subtypes` | — | AgencyFundingSubtypeBaseSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/funding-types/[typeId]/subtypes/index.post.ts` |
| GET | `/api/agency/[agencyId]/funding-types` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/funding-types/index.get.ts` |
| POST | `/api/agency/[agencyId]/funding-types` | — | AgencyFundingTypeBaseSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/funding-types/index.post.ts` |
| GET | `/api/agency/[agencyId]/guided-help/[catalogId]` | — | — | `server/api/agency/[agencyId]/guided-help/[catalogId].get.ts` |
| PATCH | `/api/agency/[agencyId]/guided-help/[catalogId]` | requireAuthContext | GuidedHelpCatalogSettingsSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/guided-help/[catalogId].patch.ts` |
| POST | `/api/agency/[agencyId]/guided-help/[catalogId]/launch` | requireAuthContext | GuidedHelpLaunchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/guided-help/[catalogId]/launch.post.ts` |
| POST | `/api/agency/[agencyId]/guided-help/[catalogId]/publish` | — | — | `server/api/agency/[agencyId]/guided-help/[catalogId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/guided-help/[catalogId]/unpublish` | — | — | `server/api/agency/[agencyId]/guided-help/[catalogId]/unpublish.post.ts` |
| POST | `/api/agency/[agencyId]/guided-help/clone` | requireAuthContext | GuidedHelpCloneSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/guided-help/clone.post.ts` |
| GET | `/api/agency/[agencyId]/guided-help/discovery` | — | — | `server/api/agency/[agencyId]/guided-help/discovery.get.ts` |
| GET | `/api/agency/[agencyId]/guided-help` | — | — | `server/api/agency/[agencyId]/guided-help/index.get.ts` |
| POST | `/api/agency/[agencyId]/guided-help` | requireAuthContext | GuidedHelpAdoptSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/guided-help/index.post.ts` |
| GET | `/api/agency/[agencyId]/guided-help/roles` | — | — | `server/api/agency/[agencyId]/guided-help/roles.get.ts` |
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
| PATCH | `/api/agency/fiscal-years/[id]` | requireFreshAuthContext | AgencyFiscalYearPatchSchema, AgencyFiscalYearSchema, parseI18n, readValidatedBodyI18n | `server/api/agency/fiscal-years/[id].patch.ts` |
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
