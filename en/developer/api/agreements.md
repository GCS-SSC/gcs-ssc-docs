# Agreement API

These requests support funding agreements and their related records: budgets, claims, payments, amendments, assigned users and documents. For the work an officer performs on screen, start with [Agreements](../../agreements/index.md).

This index maps server requests to their handler files. The linked guides explain the on-screen steps. The server checks access to protected records even when a screen offers an action.

- The method identifies the request type. `GET` reads information. `POST` usually creates a record or runs an action. `PATCH` and `PUT` save changes. `DELETE` removes a record. `ANY` means the handler has no single method declared in its filename.
- The route is the request address. Replace bracketed names such as `[id]` with the actual record ID.
- Authorization names and validation names are matches found in the handler source. They help locate access checks and checks on submitted fields or query options.
- The source is the application file that handles the request.

A dash in the names columns means the generator found no matching name. It does not prove that a check is absent. A listed name may come from a field or comment. Follow the handler and its shared helpers to confirm access rules, validation and responses. The coverage ledger records the supporting evidence.

## Read-only example

An authorized request for `GET /api/agreements/42` reads the profile for agreement 42, including its status and program information. Reading the profile does not approve the agreement or create a payment. The IDs are examples. Use existing records you are allowed to read.

## Handlers (184)

| Method | Route | Authorization names | Validation names | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/agreements/[id]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | — | `server/api/agreements/[id].delete.ts` |
| GET | `/api/agreements/[id]` | authorizeWithFreshAuthContext, egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, freshAuthContext, requireFreshAuthContext, resolveAgreementScopeContext | — | `server/api/agreements/[id].get.ts` |
| PATCH | `/api/agreements/[id]` | resolveAgreementScopeContext | — | `server/api/agreements/[id].patch.ts` |
| GET | `/api/agreements/[id]/account-receivables` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/account-receivables/index.get.ts` |
| POST | `/api/agreements/[id]/account-receivables` | — | AccountReceivableCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/account-receivables/index.post.ts` |
| GET | `/api/agreements/[id]/account-receivables/lookups/fiscal-years` | — | — | `server/api/agreements/[id]/account-receivables/lookups/fiscal-years.get.ts` |
| GET | `/api/agreements/[id]/account-receivables/lookups/monitor-followups` | — | — | `server/api/agreements/[id]/account-receivables/lookups/monitor-followups.get.ts` |
| GET | `/api/agreements/[id]/account-receivables/lookups/proponents` | — | — | `server/api/agreements/[id]/account-receivables/lookups/proponents.get.ts` |
| GET | `/api/agreements/[id]/account-receivables/lookups/sources` | — | — | `server/api/agreements/[id]/account-receivables/lookups/sources.get.ts` |
| GET | `/api/agreements/[id]/account-receivables/lookups/types` | — | — | `server/api/agreements/[id]/account-receivables/lookups/types.get.ts` |
| GET | `/api/agreements/[id]/account-receivables/source-entry` | — | PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/agreements/[id]/account-receivables/source-entry.get.ts` |
| DELETE | `/api/agreements/[id]/activities/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/activities/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/activities/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/activities/[childId].patch.ts` |
| GET | `/api/agreements/[id]/activities` | freshAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/activities/index.get.ts` |
| POST | `/api/agreements/[id]/activities` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementActivityCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/activities/index.post.ts` |
| GET | `/api/agreements/[id]/activities/lookups/outcomes` | freshAuthContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/activities/lookups/outcomes.get.ts` |
| GET | `/api/agreements/[id]/activities/lookups/responsible-parties` | freshAuthContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/activities/lookups/responsible-parties.get.ts` |
| DELETE | `/api/agreements/[id]/addresses/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/addresses/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/addresses/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/addresses/[childId].patch.ts` |
| GET | `/api/agreements/[id]/addresses` | freshAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/addresses/index.get.ts` |
| POST | `/api/agreements/[id]/addresses` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementAddressCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/addresses/index.post.ts` |
| GET | `/api/agreements/[id]/addresses/lookups/address-types` | freshAuthContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/addresses/lookups/address-types.get.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId].delete.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]` | freshAuthContext, requireAuthContext | — | `server/api/agreements/[id]/amendments/[amendmentId].get.ts` |
| PATCH | `/api/agreements/[id]/amendments/[amendmentId]` | egcs_fc_proposedauthorizedassistanceenddate, egcs_fc_proposedauthorizedassistancestartdate, executeFreshAuthorizedAgreementWrite | FundingCaseAgreementAmendmentPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId].patch.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]/activities/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/activities/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/amendments/[amendmentId]/activities/[childId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementActivityPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/activities/[childId].patch.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/activities` | freshAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/[amendmentId]/activities/index.get.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/activities` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementActivityCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/activities/index.post.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/activity-snapshot` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/activity-snapshot.post.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/[childId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementBudgetFiscalYearPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/[childId].patch.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementBudgetFiscalYearCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/index.post.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/lookups/fiscal-years` | freshAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/lookups/fiscal-years.get.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/[childId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementBudgetLineItemPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/[childId].patch.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/budget-line-items` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementBudgetLineItemCreateSchema, FundingCaseAgreementBudgetLineItemFundingTotalsSchema, parseI18n, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/index.post.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/budget-overview` | freshAuthContext | — | `server/api/agreements/[id]/amendments/[amendmentId]/budget-overview.get.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/budget-snapshot` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/budget-snapshot.post.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/cancel` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/cancel.post.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/document-templates` | — | — | `server/api/agreements/[id]/amendments/[amendmentId]/document-templates.get.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/documents/[documentId]/download` | — | — | `server/api/agreements/[id]/amendments/[amendmentId]/documents/[documentId]/download.get.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]/documents/[documentId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/documents/[documentId]/index.delete.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/documents/generate` | executeFreshAuthorizedAgreementWrite, requireAuthContext | AgreementDocumentGenerateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/documents/generate.post.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/documents` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/[amendmentId]/documents/index.get.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/lookups/risk-ratings` | freshAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/[amendmentId]/lookups/risk-ratings.get.ts` |
| GET | `/api/agreements/[id]/amendments` | freshAuthContext | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/index.get.ts` |
| POST | `/api/agreements/[id]/amendments` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, egcs_fc_proposedauthorizedassistanceenddate, egcs_fc_proposedauthorizedassistancestartdate, executeFreshAuthorizedAgreementWrite | FundingCaseAgreementAmendmentCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/index.post.ts` |
| GET | `/api/agreements/[id]/amendments/lookups/subtypes` | — | PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/lookups/subtypes.get.ts` |
| GET | `/api/agreements/[id]/amendments/lookups/types` | — | AdminCommonListQuerySchema, AmendmentTypeLookupQuerySchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/lookups/types.get.ts` |
| DELETE | `/api/agreements/[id]/applicant-recipients/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/applicant-recipients/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/applicant-recipients/[childId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementApplicantRecipientCreateSchema, FundingCaseAgreementApplicantRecipientPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/agreements/[id]/applicant-recipients/[childId].patch.ts` |
| GET | `/api/agreements/[id]/applicant-recipients` | freshAuthContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/applicant-recipients/index.get.ts` |
| POST | `/api/agreements/[id]/applicant-recipients` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementApplicantRecipientCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/applicant-recipients/index.post.ts` |
| GET | `/api/agreements/[id]/applicant-recipients/lookups/applicant-recipients` | requireAuthContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/applicant-recipients/lookups/applicant-recipients.get.ts` |
| DELETE | `/api/agreements/[id]/budget-fiscal-years/[childId]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-fiscal-years/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/budget-fiscal-years/[childId]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-fiscal-years/[childId].patch.ts` |
| POST | `/api/agreements/[id]/budget-fiscal-years` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | FundingCaseAgreementBudgetFiscalYearCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/budget-fiscal-years/index.post.ts` |
| GET | `/api/agreements/[id]/budget-fiscal-years/lookups/fiscal-years` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, resolveAgreementScopeContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/budget-fiscal-years/lookups/fiscal-years.get.ts` |
| DELETE | `/api/agreements/[id]/budget-line-items/[childId]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-line-items/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/budget-line-items/[childId]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | FundingCaseAgreementBudgetLineItemPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/budget-line-items/[childId].patch.ts` |
| POST | `/api/agreements/[id]/budget-line-items` | resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-line-items/index.post.ts` |
| GET | `/api/agreements/[id]/budget-line-items/lookups/organization-cost-categories` | freshAuthContext, resolveAgreementScopeContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/budget-line-items/lookups/organization-cost-categories.get.ts` |
| GET | `/api/agreements/[id]/budget-overview` | freshAuthContext | — | `server/api/agreements/[id]/budget-overview.get.ts` |
| DELETE | `/api/agreements/[id]/claim-line-items/[lineId]` | — | — | `server/api/agreements/[id]/claim-line-items/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/claim-line-items/[lineId]` | — | — | `server/api/agreements/[id]/claim-line-items/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/claim-line-items` | — | FundingCaseAgreementClaimLineItemCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/claim-line-items/index.post.ts` |
| DELETE | `/api/agreements/[id]/claim-reconcile-line-items/[lineId]` | resolveAgreementScopeContext | — | `server/api/agreements/[id]/claim-reconcile-line-items/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/claim-reconcile-line-items/[lineId]` | resolveAgreementScopeContext | — | `server/api/agreements/[id]/claim-reconcile-line-items/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/claim-reconcile-line-items` | — | FundingCaseAgreementClaimReconcileLineItemCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/claim-reconcile-line-items/index.post.ts` |
| DELETE | `/api/agreements/[id]/claim-reconciles/[reconcileId]` | — | — | `server/api/agreements/[id]/claim-reconciles/[reconcileId].delete.ts` |
| PATCH | `/api/agreements/[id]/claim-reconciles/[reconcileId]` | — | — | `server/api/agreements/[id]/claim-reconciles/[reconcileId].patch.ts` |
| POST | `/api/agreements/[id]/claim-reconciles/[reconcileId]/cancel` | unauthorized | — | `server/api/agreements/[id]/claim-reconciles/[reconcileId]/cancel.post.ts` |
| POST | `/api/agreements/[id]/claim-reconciles` | — | FundingCaseAgreementClaimReconcileCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/claim-reconciles/index.post.ts` |
| GET | `/api/agreements/[id]/claims-overview` | — | ClaimOverviewQuerySchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/agreements/[id]/claims-overview.get.ts` |
| DELETE | `/api/agreements/[id]/claims/[claimId]` | — | — | `server/api/agreements/[id]/claims/[claimId].delete.ts` |
| PATCH | `/api/agreements/[id]/claims/[claimId]` | — | — | `server/api/agreements/[id]/claims/[claimId].patch.ts` |
| POST | `/api/agreements/[id]/claims/[claimId]/cancel` | — | — | `server/api/agreements/[id]/claims/[claimId]/cancel.post.ts` |
| POST | `/api/agreements/[id]/claims/[claimId]/withdraw` | — | — | `server/api/agreements/[id]/claims/[claimId]/withdraw.post.ts` |
| POST | `/api/agreements/[id]/claims` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementClaimCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/claims/index.post.ts` |
| GET | `/api/agreements/[id]/claims/lookups/proponents` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/claims/lookups/proponents.get.ts` |
| GET | `/api/agreements/[id]/closeout-readiness` | — | — | `server/api/agreements/[id]/closeout-readiness.get.ts` |
| DELETE | `/api/agreements/[id]/closeouts/[closeoutId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/closeouts/[closeoutId].delete.ts` |
| GET | `/api/agreements/[id]/closeouts/[closeoutId]` | freshAuthContext | — | `server/api/agreements/[id]/closeouts/[closeoutId].get.ts` |
| POST | `/api/agreements/[id]/closeouts/[closeoutId]/cancel` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/closeouts/[closeoutId]/cancel.post.ts` |
| GET | `/api/agreements/[id]/closeouts/[closeoutId]/document-templates` | — | — | `server/api/agreements/[id]/closeouts/[closeoutId]/document-templates.get.ts` |
| GET | `/api/agreements/[id]/closeouts/[closeoutId]/documents/[documentId]/download` | — | — | `server/api/agreements/[id]/closeouts/[closeoutId]/documents/[documentId]/download.get.ts` |
| POST | `/api/agreements/[id]/closeouts/[closeoutId]/documents/generate` | executeFreshAuthorizedAgreementWrite, freshAuthContext, requireAuthContext | AgreementDocumentGenerateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/closeouts/[closeoutId]/documents/generate.post.ts` |
| GET | `/api/agreements/[id]/closeouts/[closeoutId]/documents` | — | — | `server/api/agreements/[id]/closeouts/[closeoutId]/documents/index.get.ts` |
| POST | `/api/agreements/[id]/closeouts/[closeoutId]/documents/preview` | freshAuthContext, requireAuthContext | AgreementDocumentGenerateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/closeouts/[closeoutId]/documents/preview.post.ts` |
| GET | `/api/agreements/[id]/closeouts` | — | — | `server/api/agreements/[id]/closeouts/index.get.ts` |
| POST | `/api/agreements/[id]/closeouts` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/closeouts/index.post.ts` |
| GET | `/api/agreements/[id]/commitment-line-balances` | freshAuthContext | CommitmentLineBalancesQuerySchema, FundingCaseAgreementPaymentBaseSchema, FundingCaseAgreementPaymentCreateSchema, getValidatedQueryI18n | `server/api/agreements/[id]/commitment-line-balances.get.ts` |
| DELETE | `/api/agreements/[id]/commitment-lines/[lineId]` | — | — | `server/api/agreements/[id]/commitment-lines/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/commitment-lines/[lineId]` | — | — | `server/api/agreements/[id]/commitment-lines/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/commitment-lines` | — | FundingCaseAgreementCommitmentLineCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/commitment-lines/index.post.ts` |
| GET | `/api/agreements/[id]/commitment-lines/lookups/chart-of-accounts` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/commitment-lines/lookups/chart-of-accounts.get.ts` |
| GET | `/api/agreements/[id]/commitments-overview` | freshAuthContext | — | `server/api/agreements/[id]/commitments-overview.get.ts` |
| DELETE | `/api/agreements/[id]/commitments/[childId]` | — | — | `server/api/agreements/[id]/commitments/[childId].delete.ts` |
| GET | `/api/agreements/[id]/commitments/[childId]` | — | — | `server/api/agreements/[id]/commitments/[childId].get.ts` |
| PATCH | `/api/agreements/[id]/commitments/[childId]` | — | FundingCaseAgreementCommitmentPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/commitments/[childId].patch.ts` |
| POST | `/api/agreements/[id]/commitments` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementCommitmentCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/commitments/index.post.ts` |
| GET | `/api/agreements/[id]/commitments/lookups/types` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/commitments/lookups/types.get.ts` |
| GET | `/api/agreements/[id]/corrections/export` | — | CorrectionCollectionQuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/corrections/export.get.ts` |
| GET | `/api/agreements/[id]/corrections` | requireAuthContext | CorrectionCollectionQuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/corrections/index.get.ts` |
| POST | `/api/agreements/[id]/corrections` | — | CorrectionCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/corrections/index.post.ts` |
| GET | `/api/agreements/[id]/corrections/lookups/commitments` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/corrections/lookups/commitments.get.ts` |
| GET | `/api/agreements/[id]/corrections/lookups/payments` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/corrections/lookups/payments.get.ts` |
| GET | `/api/agreements/[id]/document-templates` | — | — | `server/api/agreements/[id]/document-templates/index.get.ts` |
| GET | `/api/agreements/[id]/documents/[documentId]/download` | — | — | `server/api/agreements/[id]/documents/[documentId]/download.get.ts` |
| DELETE | `/api/agreements/[id]/documents/[documentId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/documents/[documentId]/index.delete.ts` |
| POST | `/api/agreements/[id]/documents/generate` | executeFreshAuthorizedAgreementWrite, requireAuthContext | AgreementDocumentGenerateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/documents/generate.post.ts` |
| GET | `/api/agreements/[id]/documents` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/documents/index.get.ts` |
| GET | `/api/agreements/[id]/financial-summary` | freshAuthContext | — | `server/api/agreements/[id]/financial-summary.get.ts` |
| DELETE | `/api/agreements/[id]/forecast-line-items/[lineId]` | resolveAgreementScopeContext | — | `server/api/agreements/[id]/forecast-line-items/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/forecast-line-items/[lineId]` | AgreementScopeContext, resolveAgreementScopeContext | FundingCaseAgreementForecastLineItemPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/forecast-line-items/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/forecast-line-items` | — | FundingCaseAgreementForecastLineItemCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/forecast-line-items/index.post.ts` |
| GET | `/api/agreements/[id]/forecasts-overview` | — | ForecastOverviewQuerySchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/agreements/[id]/forecasts-overview.get.ts` |
| DELETE | `/api/agreements/[id]/forecasts/[forecastId]` | — | — | `server/api/agreements/[id]/forecasts/[forecastId].delete.ts` |
| PATCH | `/api/agreements/[id]/forecasts/[forecastId]/breakdown` | resolveAgreementScopeContext | FundingCaseAgreementForecastBreakdownPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/forecasts/[forecastId]/breakdown.patch.ts` |
| POST | `/api/agreements/[id]/forecasts` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementForecastCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/forecasts/index.post.ts` |
| GET | `/api/agreements/[id]/funding-subtypes` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/funding-subtypes.get.ts` |
| DELETE | `/api/agreements/[id]/monitor-findings/[childId]` | requireAuthContext | — | `server/api/agreements/[id]/monitor-findings/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-findings/[childId]` | — | FundingCaseAgreementMonitorFindingPatchSchema | `server/api/agreements/[id]/monitor-findings/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-findings` | — | FundingCaseAgreementMonitorFindingCreateSchema | `server/api/agreements/[id]/monitor-findings/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-followup-updates/[childId]` | requireAuthContext | — | `server/api/agreements/[id]/monitor-followup-updates/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-followup-updates/[childId]` | — | FundingCaseAgreementMonitorFollowupUpdatePatchSchema | `server/api/agreements/[id]/monitor-followup-updates/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-followup-updates` | executeFreshAuthorizedAgreementWrite, requireAuthContext | FundingCaseAgreementMonitorFollowupUpdateCreateSchema | `server/api/agreements/[id]/monitor-followup-updates/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-followups/[childId]` | — | — | `server/api/agreements/[id]/monitor-followups/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-followups/[childId]` | — | FundingCaseAgreementMonitorFollowupBaseSchema | `server/api/agreements/[id]/monitor-followups/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-followups` | — | FundingCaseAgreementMonitorFollowupCreateSchema | `server/api/agreements/[id]/monitor-followups/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-items/[childId]` | requireAuthContext | — | `server/api/agreements/[id]/monitor-items/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-items/[childId]` | — | FundingCaseAgreementMonitorItemsCreateSchema, FundingCaseAgreementMonitorItemsPatchSchema, parseI18n | `server/api/agreements/[id]/monitor-items/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-items` | — | FundingCaseAgreementMonitorItemsCreateSchema | `server/api/agreements/[id]/monitor-items/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-planning/[childId]` | requireAuthContext | — | `server/api/agreements/[id]/monitor-planning/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-planning/[childId]` | — | FundingCaseAgreementMonitorPlanningPatchSchema | `server/api/agreements/[id]/monitor-planning/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-planning` | — | FundingCaseAgreementMonitorPlanningCreateSchema | `server/api/agreements/[id]/monitor-planning/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-promising-practices/[childId]` | requireAuthContext | — | `server/api/agreements/[id]/monitor-promising-practices/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-promising-practices/[childId]` | requireAuthContext | FundingCaseAgreementMonitorPromisingPracticePatchSchema | `server/api/agreements/[id]/monitor-promising-practices/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-promising-practices` | — | FundingCaseAgreementMonitorPromisingPracticeCreateSchema | `server/api/agreements/[id]/monitor-promising-practices/index.post.ts` |
| GET | `/api/agreements/[id]/monitors-overview` | — | — | `server/api/agreements/[id]/monitors-overview.get.ts` |
| DELETE | `/api/agreements/[id]/monitors/[monitorId]` | — | — | `server/api/agreements/[id]/monitors/[monitorId].delete.ts` |
| GET | `/api/agreements/[id]/monitors/[monitorId]` | — | — | `server/api/agreements/[id]/monitors/[monitorId].get.ts` |
| PATCH | `/api/agreements/[id]/monitors/[monitorId]` | — | — | `server/api/agreements/[id]/monitors/[monitorId].patch.ts` |
| POST | `/api/agreements/[id]/monitors` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementMonitorCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitors/index.post.ts` |
| GET | `/api/agreements/[id]/monitors/lookups/fiscal-years` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/monitors/lookups/fiscal-years.get.ts` |
| GET | `/api/agreements/[id]/monitors/lookups/monitor-types` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/monitors/lookups/monitor-types.get.ts` |
| DELETE | `/api/agreements/[id]/notes/[noteId]` | — | — | `server/api/agreements/[id]/notes/[noteId].delete.ts` |
| PATCH | `/api/agreements/[id]/notes/[noteId]` | — | — | `server/api/agreements/[id]/notes/[noteId].patch.ts` |
| GET | `/api/agreements/[id]/notes` | — | — | `server/api/agreements/[id]/notes/index.get.ts` |
| POST | `/api/agreements/[id]/notes` | — | — | `server/api/agreements/[id]/notes/index.post.ts` |
| GET | `/api/agreements/[id]/payment-financial-inputs` | freshAuthContext | FundingCaseAgreementPaymentBaseSchema, FundingCaseAgreementPaymentCreateSchema, PaymentFinancialInputsQuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/payment-financial-inputs.get.ts` |
| DELETE | `/api/agreements/[id]/payment-lines/[lineId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/payment-lines/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/payment-lines/[lineId]` | — | — | `server/api/agreements/[id]/payment-lines/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/payment-lines` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementPaymentLineCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/payment-lines/index.post.ts` |
| GET | `/api/agreements/[id]/payment-lines/lookups/commitment-lines` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/payment-lines/lookups/commitment-lines.get.ts` |
| GET | `/api/agreements/[id]/payments-overview` | requireAuthContext | — | `server/api/agreements/[id]/payments-overview.get.ts` |
| DELETE | `/api/agreements/[id]/payments/[paymentId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/payments/[paymentId].delete.ts` |
| GET | `/api/agreements/[id]/payments/[paymentId]` | requireAuthContext | — | `server/api/agreements/[id]/payments/[paymentId].get.ts` |
| PATCH | `/api/agreements/[id]/payments/[paymentId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementPaymentCreateSchema, FundingCaseAgreementPaymentPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/payments/[paymentId].patch.ts` |
| POST | `/api/agreements/[id]/payments/[paymentId]/preview` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementPaymentCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/payments/[paymentId]/preview.post.ts` |
| POST | `/api/agreements/[id]/payments` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementPaymentCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/payments/index.post.ts` |
| GET | `/api/agreements/[id]/payments/lookups/commitments` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/payments/lookups/commitments.get.ts` |
| GET | `/api/agreements/[id]/payments/lookups/fiscal-years` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/payments/lookups/fiscal-years.get.ts` |
| GET | `/api/agreements/[id]/payments/lookups/proponents` | — | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/payments/lookups/proponents.get.ts` |
| POST | `/api/agreements/[id]/payments/preview` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementPaymentCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/payments/preview.post.ts` |
| GET | `/api/agreements` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, requireAuthContext | AgencyFilterSchema, AgreementsPaginationSchema, AssignedListViewSchema, PaginationSchema, getValidatedQueryI18n | `server/api/agreements/index.get.ts` |
| POST | `/api/agreements` | authorizeWithFreshAuthContext, egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, requireFreshAuthContext, resolveAgreementStreamScopeContext | FundingCaseAgreementCreateSchema, FundingCaseAgreementGeneratedCreateSchema, parseI18n, readValidatedBodyI18n | `server/api/agreements/index.post.ts` |
| GET | `/api/agreements/lookups/agreement-subtypes` | — | — | `server/api/agreements/lookups/agreement-subtypes.get.ts` |
| GET | `/api/agreements/lookups/applicant-recipients` | — | ApplicantRecipientLookupQuerySchema, PaginationSchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/agreements/lookups/applicant-recipients.get.ts` |
| GET | `/api/agreements/lookups/custom-fields` | — | — | `server/api/agreements/lookups/custom-fields.get.ts` |
| GET | `/api/agreements/lookups/financial-ids` | requireAuthContext, resolveAgreementStreamScopeContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/lookups/financial-ids.get.ts` |
| GET | `/api/agreements/lookups/holdback-bases` | — | — | `server/api/agreements/lookups/holdback-bases.get.ts` |
| GET | `/api/agreements/lookups/proponent-types` | requireAuthContext, resolveAgreementStreamScopeContext | PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/lookups/proponent-types.get.ts` |
| GET | `/api/agreements/lookups/risk-ratings` | — | — | `server/api/agreements/lookups/risk-ratings.get.ts` |
| GET | `/api/agreements/lookups/streams` | resolveAgreementScopeContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/lookups/streams.get.ts` |
| GET | `/api/agreements/number-mode` | resolveAgreementStreamScopeContext | PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/agreements/number-mode.get.ts` |
| POST | `/api/agreements/similarity` | requireAuthContext, resolveAgreementScopeContext, resolveAgreementStreamScopeContext | BodySchema, PositivePostgresBigintIdSchema, readValidatedBodyI18n | `server/api/agreements/similarity.post.ts` |
| GET | `/api/applicant-recipients/[id]/agreements` | authorizeWithFreshAuthContext, egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, requireFreshAuthContext, resolveApplicantRecipientAuthorization | AssignedListViewSchema, PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agreements/index.get.ts` |
| GET | `/api/claim-reconciliations/[reconcileId]` | resolveAgreementScopeContext | — | `server/api/claim-reconciliations/[reconcileId].get.ts` |
| PATCH | `/api/claim-reconciliations/[reconcileId]` | resolveAgreementScopeContext | — | `server/api/claim-reconciliations/[reconcileId].patch.ts` |
| PATCH | `/api/claim-reconciliations/[reconcileId]/lines/[lineId]` | resolveAgreementScopeContext | — | `server/api/claim-reconciliations/[reconcileId]/lines/[lineId].patch.ts` |
| PATCH | `/api/claim-reconciliations/[reconcileId]/lines/bulk` | resolveAgreementScopeContext | FundingCaseAgreementClaimReconcileLineItemBulkSaveSchema, readValidatedBodyI18n | `server/api/claim-reconciliations/[reconcileId]/lines/bulk.patch.ts` |
| POST | `/api/claim-reconciliations/[reconcileId]/lines` | resolveAgreementScopeContext | FundingCaseAgreementClaimReconcileLineItemCreateSchema, readValidatedBodyI18n | `server/api/claim-reconciliations/[reconcileId]/lines/index.post.ts` |
