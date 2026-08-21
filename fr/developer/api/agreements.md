# API des ententes

Profils d’entente, ressources enfants, finances, cycle de vie, affectations exactes, documents et production.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (147)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/agreements/[id]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | — | `server/api/agreements/[id].delete.ts` |
| GET | `/api/agreements/[id]` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, resolveAgreementScopeContext | — | `server/api/agreements/[id].get.ts` |
| PATCH | `/api/agreements/[id]` | resolveAgreementScopeContext | — | `server/api/agreements/[id].patch.ts` |
| DELETE | `/api/agreements/[id]/activities/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/activities/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/activities/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/activities/[childId].patch.ts` |
| GET | `/api/agreements/[id]/activities` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/activities/index.get.ts` |
| POST | `/api/agreements/[id]/activities` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementActivityCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/activities/index.post.ts` |
| GET | `/api/agreements/[id]/activities/lookups/outcomes` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/activities/lookups/outcomes.get.ts` |
| GET | `/api/agreements/[id]/activities/lookups/responsible-parties` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/activities/lookups/responsible-parties.get.ts` |
| DELETE | `/api/agreements/[id]/addresses/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/addresses/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/addresses/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/addresses/[childId].patch.ts` |
| GET | `/api/agreements/[id]/addresses` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/addresses/index.get.ts` |
| POST | `/api/agreements/[id]/addresses` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementAddressCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/addresses/index.post.ts` |
| GET | `/api/agreements/[id]/addresses/lookups/address-types` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/addresses/lookups/address-types.get.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId].delete.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]` | — | — | `server/api/agreements/[id]/amendments/[amendmentId].get.ts` |
| PATCH | `/api/agreements/[id]/amendments/[amendmentId]` | egcs_fc_proposedauthorizedassistanceenddate, egcs_fc_proposedauthorizedassistancestartdate, executeFreshAuthorizedAgreementWrite | FundingCaseAgreementAmendmentPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId].patch.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]/activities/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/activities/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/amendments/[amendmentId]/activities/[childId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementActivityPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/activities/[childId].patch.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/activities` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/[amendmentId]/activities/index.get.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/activities` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementActivityCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/activities/index.post.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/activity-snapshot` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/activity-snapshot.post.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/[childId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementBudgetFiscalYearPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/[childId].patch.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementBudgetFiscalYearCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/index.post.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/lookups/fiscal-years` | egcs_fc_proposedauthorizedassistanceenddate, egcs_fc_proposedauthorizedassistancestartdate | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-fiscal-years/lookups/fiscal-years.get.ts` |
| DELETE | `/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/[childId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementBudgetLineItemPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/[childId].patch.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/budget-line-items` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementBudgetLineItemCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/[amendmentId]/budget-line-items/index.post.ts` |
| GET | `/api/agreements/[id]/amendments/[amendmentId]/budget-overview` | — | — | `server/api/agreements/[id]/amendments/[amendmentId]/budget-overview.get.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/budget-snapshot` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/budget-snapshot.post.ts` |
| POST | `/api/agreements/[id]/amendments/[amendmentId]/cancel` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/amendments/[amendmentId]/cancel.post.ts` |
| GET | `/api/agreements/[id]/amendments` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/amendments/index.get.ts` |
| POST | `/api/agreements/[id]/amendments` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, egcs_fc_proposedauthorizedassistanceenddate, egcs_fc_proposedauthorizedassistancestartdate, executeFreshAuthorizedAgreementWrite | FundingCaseAgreementAmendmentCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/amendments/index.post.ts` |
| GET | `/api/agreements/[id]/amendments/lookups/subtypes` | — | getValidatedQueryI18n | `server/api/agreements/[id]/amendments/lookups/subtypes.get.ts` |
| GET | `/api/agreements/[id]/amendments/lookups/types` | — | — | `server/api/agreements/[id]/amendments/lookups/types.get.ts` |
| DELETE | `/api/agreements/[id]/applicant-recipients/[childId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/applicant-recipients/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/applicant-recipients/[childId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementApplicantRecipientPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/applicant-recipients/[childId].patch.ts` |
| GET | `/api/agreements/[id]/applicant-recipients` | — | PaginationSchema, getValidatedQueryI18n | `server/api/agreements/[id]/applicant-recipients/index.get.ts` |
| POST | `/api/agreements/[id]/applicant-recipients` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementApplicantRecipientCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/applicant-recipients/index.post.ts` |
| GET | `/api/agreements/[id]/applicant-recipients/lookups/applicant-recipients` | requireAuthContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/applicant-recipients/lookups/applicant-recipients.get.ts` |
| DELETE | `/api/agreements/[id]/budget-fiscal-years/[childId]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-fiscal-years/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/budget-fiscal-years/[childId]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-fiscal-years/[childId].patch.ts` |
| POST | `/api/agreements/[id]/budget-fiscal-years` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | FundingCaseAgreementBudgetFiscalYearCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/budget-fiscal-years/index.post.ts` |
| GET | `/api/agreements/[id]/budget-fiscal-years/lookups/fiscal-years` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, resolveAgreementScopeContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/budget-fiscal-years/lookups/fiscal-years.get.ts` |
| DELETE | `/api/agreements/[id]/budget-line-items/[childId]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-line-items/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/budget-line-items/[childId]` | executeFreshAuthorizedAgreementWrite, resolveAgreementScopeContext | FundingCaseAgreementBudgetLineItemPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/budget-line-items/[childId].patch.ts` |
| POST | `/api/agreements/[id]/budget-line-items` | resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-line-items/index.post.ts` |
| GET | `/api/agreements/[id]/budget-line-items/lookups/organization-cost-categories` | resolveAgreementScopeContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/budget-line-items/lookups/organization-cost-categories.get.ts` |
| GET | `/api/agreements/[id]/budget-overview` | resolveAgreementScopeContext | — | `server/api/agreements/[id]/budget-overview.get.ts` |
| DELETE | `/api/agreements/[id]/claim-line-items/[lineId]` | — | — | `server/api/agreements/[id]/claim-line-items/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/claim-line-items/[lineId]` | — | — | `server/api/agreements/[id]/claim-line-items/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/claim-line-items` | — | FundingCaseAgreementClaimLineItemCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/claim-line-items/index.post.ts` |
| DELETE | `/api/agreements/[id]/claim-reconcile-line-items/[lineId]` | — | — | `server/api/agreements/[id]/claim-reconcile-line-items/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/claim-reconcile-line-items/[lineId]` | — | — | `server/api/agreements/[id]/claim-reconcile-line-items/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/claim-reconcile-line-items` | — | FundingCaseAgreementClaimReconcileLineItemCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/claim-reconcile-line-items/index.post.ts` |
| DELETE | `/api/agreements/[id]/claim-reconciles/[reconcileId]` | — | — | `server/api/agreements/[id]/claim-reconciles/[reconcileId].delete.ts` |
| PATCH | `/api/agreements/[id]/claim-reconciles/[reconcileId]` | — | — | `server/api/agreements/[id]/claim-reconciles/[reconcileId].patch.ts` |
| POST | `/api/agreements/[id]/claim-reconciles` | — | FundingCaseAgreementClaimReconcileCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/claim-reconciles/index.post.ts` |
| GET | `/api/agreements/[id]/claims-overview` | — | — | `server/api/agreements/[id]/claims-overview.get.ts` |
| DELETE | `/api/agreements/[id]/claims/[claimId]` | — | — | `server/api/agreements/[id]/claims/[claimId].delete.ts` |
| PATCH | `/api/agreements/[id]/claims/[claimId]` | — | — | `server/api/agreements/[id]/claims/[claimId].patch.ts` |
| POST | `/api/agreements/[id]/claims/[claimId]/cancel` | — | — | `server/api/agreements/[id]/claims/[claimId]/cancel.post.ts` |
| POST | `/api/agreements/[id]/claims/[claimId]/ready-for-review` | — | — | `server/api/agreements/[id]/claims/[claimId]/ready-for-review.post.ts` |
| POST | `/api/agreements/[id]/claims/[claimId]/withdraw` | — | — | `server/api/agreements/[id]/claims/[claimId]/withdraw.post.ts` |
| POST | `/api/agreements/[id]/claims` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementClaimCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/claims/index.post.ts` |
| GET | `/api/agreements/[id]/closeout-readiness` | — | — | `server/api/agreements/[id]/closeout-readiness.get.ts` |
| DELETE | `/api/agreements/[id]/closeouts/[closeoutId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/closeouts/[closeoutId].delete.ts` |
| GET | `/api/agreements/[id]/closeouts/[closeoutId]` | — | — | `server/api/agreements/[id]/closeouts/[closeoutId].get.ts` |
| POST | `/api/agreements/[id]/closeouts/[closeoutId]/cancel` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/closeouts/[closeoutId]/cancel.post.ts` |
| GET | `/api/agreements/[id]/closeouts/[closeoutId]/document-templates` | — | — | `server/api/agreements/[id]/closeouts/[closeoutId]/document-templates.get.ts` |
| GET | `/api/agreements/[id]/closeouts/[closeoutId]/documents/[documentId]/download` | — | — | `server/api/agreements/[id]/closeouts/[closeoutId]/documents/[documentId]/download.get.ts` |
| POST | `/api/agreements/[id]/closeouts/[closeoutId]/documents/generate` | executeFreshAuthorizedAgreementWrite | AgreementDocumentGenerateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/closeouts/[closeoutId]/documents/generate.post.ts` |
| GET | `/api/agreements/[id]/closeouts/[closeoutId]/documents` | — | — | `server/api/agreements/[id]/closeouts/[closeoutId]/documents/index.get.ts` |
| POST | `/api/agreements/[id]/closeouts/[closeoutId]/documents/preview` | — | AgreementDocumentGenerateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/closeouts/[closeoutId]/documents/preview.post.ts` |
| GET | `/api/agreements/[id]/closeouts` | — | — | `server/api/agreements/[id]/closeouts/index.get.ts` |
| POST | `/api/agreements/[id]/closeouts` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/closeouts/index.post.ts` |
| DELETE | `/api/agreements/[id]/commitment-lines/[lineId]` | — | — | `server/api/agreements/[id]/commitment-lines/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/commitment-lines/[lineId]` | — | — | `server/api/agreements/[id]/commitment-lines/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/commitment-lines` | — | FundingCaseAgreementCommitmentLineCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/commitment-lines/index.post.ts` |
| GET | `/api/agreements/[id]/commitment-lines/lookups/stream-commitments` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/commitment-lines/lookups/stream-commitments.get.ts` |
| GET | `/api/agreements/[id]/commitments-overview` | — | — | `server/api/agreements/[id]/commitments-overview.get.ts` |
| DELETE | `/api/agreements/[id]/commitments/[childId]` | — | — | `server/api/agreements/[id]/commitments/[childId].delete.ts` |
| GET | `/api/agreements/[id]/commitments/[childId]` | — | — | `server/api/agreements/[id]/commitments/[childId].get.ts` |
| PATCH | `/api/agreements/[id]/commitments/[childId]` | — | FundingCaseAgreementCommitmentPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/commitments/[childId].patch.ts` |
| POST | `/api/agreements/[id]/commitments` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementCommitmentCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/commitments/index.post.ts` |
| GET | `/api/agreements/[id]/document-templates` | — | — | `server/api/agreements/[id]/document-templates/index.get.ts` |
| GET | `/api/agreements/[id]/documents/[documentId]/download` | — | — | `server/api/agreements/[id]/documents/[documentId]/download.get.ts` |
| DELETE | `/api/agreements/[id]/documents/[documentId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/documents/[documentId]/index.delete.ts` |
| POST | `/api/agreements/[id]/documents/generate` | executeFreshAuthorizedAgreementWrite | AgreementDocumentGenerateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/documents/generate.post.ts` |
| GET | `/api/agreements/[id]/documents` | — | — | `server/api/agreements/[id]/documents/index.get.ts` |
| DELETE | `/api/agreements/[id]/forecast-line-items/[lineId]` | — | — | `server/api/agreements/[id]/forecast-line-items/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/forecast-line-items/[lineId]` | AgreementScopeContext | FundingCaseAgreementForecastLineItemPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/forecast-line-items/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/forecast-line-items` | — | FundingCaseAgreementForecastLineItemCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/forecast-line-items/index.post.ts` |
| GET | `/api/agreements/[id]/forecasts-overview` | — | — | `server/api/agreements/[id]/forecasts-overview.get.ts` |
| DELETE | `/api/agreements/[id]/forecasts/[forecastId]` | — | — | `server/api/agreements/[id]/forecasts/[forecastId].delete.ts` |
| PATCH | `/api/agreements/[id]/forecasts/[forecastId]` | — | FundingCaseAgreementForecastPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/forecasts/[forecastId].patch.ts` |
| POST | `/api/agreements/[id]/forecasts` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementForecastCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/forecasts/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-findings/[childId]` | — | — | `server/api/agreements/[id]/monitor-findings/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-findings/[childId]` | — | FundingCaseAgreementMonitorFindingPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-findings/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-findings` | — | FundingCaseAgreementMonitorFindingCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-findings/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-followup-updates/[childId]` | — | — | `server/api/agreements/[id]/monitor-followup-updates/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-followup-updates/[childId]` | — | FundingCaseAgreementMonitorFollowupUpdatePatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-followup-updates/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-followup-updates` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementMonitorFollowupUpdateCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-followup-updates/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-followups/[childId]` | — | — | `server/api/agreements/[id]/monitor-followups/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-followups/[childId]` | — | FundingCaseAgreementMonitorFollowupPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-followups/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-followups` | — | FundingCaseAgreementMonitorFollowupCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-followups/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-items/[childId]` | — | — | `server/api/agreements/[id]/monitor-items/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-items/[childId]` | — | FundingCaseAgreementMonitorItemsPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-items/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-items` | — | FundingCaseAgreementMonitorItemsCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-items/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-planning/[childId]` | — | — | `server/api/agreements/[id]/monitor-planning/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-planning/[childId]` | — | FundingCaseAgreementMonitorPlanningPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-planning/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-planning` | — | FundingCaseAgreementMonitorPlanningCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-planning/index.post.ts` |
| DELETE | `/api/agreements/[id]/monitor-promising-practices/[childId]` | — | — | `server/api/agreements/[id]/monitor-promising-practices/[childId].delete.ts` |
| PATCH | `/api/agreements/[id]/monitor-promising-practices/[childId]` | — | FundingCaseAgreementMonitorPromisingPracticePatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-promising-practices/[childId].patch.ts` |
| POST | `/api/agreements/[id]/monitor-promising-practices` | — | FundingCaseAgreementMonitorPromisingPracticeCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitor-promising-practices/index.post.ts` |
| GET | `/api/agreements/[id]/monitors-overview` | — | — | `server/api/agreements/[id]/monitors-overview.get.ts` |
| DELETE | `/api/agreements/[id]/monitors/[monitorId]` | — | — | `server/api/agreements/[id]/monitors/[monitorId].delete.ts` |
| GET | `/api/agreements/[id]/monitors/[monitorId]` | — | — | `server/api/agreements/[id]/monitors/[monitorId].get.ts` |
| PATCH | `/api/agreements/[id]/monitors/[monitorId]` | — | — | `server/api/agreements/[id]/monitors/[monitorId].patch.ts` |
| POST | `/api/agreements/[id]/monitors` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementMonitorCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/monitors/index.post.ts` |
| GET | `/api/agreements/[id]/monitors/lookups/fiscal-years` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/monitors/lookups/fiscal-years.get.ts` |
| GET | `/api/agreements/[id]/monitors/lookups/monitor-types` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/monitors/lookups/monitor-types.get.ts` |
| DELETE | `/api/agreements/[id]/payment-lines/[lineId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/payment-lines/[lineId].delete.ts` |
| PATCH | `/api/agreements/[id]/payment-lines/[lineId]` | — | — | `server/api/agreements/[id]/payment-lines/[lineId].patch.ts` |
| POST | `/api/agreements/[id]/payment-lines` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementPaymentLineCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/payment-lines/index.post.ts` |
| GET | `/api/agreements/[id]/payment-lines/lookups/commitment-lines` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/payment-lines/lookups/commitment-lines.get.ts` |
| GET | `/api/agreements/[id]/payments-overview` | — | — | `server/api/agreements/[id]/payments-overview.get.ts` |
| DELETE | `/api/agreements/[id]/payments/[paymentId]` | executeFreshAuthorizedAgreementWrite | — | `server/api/agreements/[id]/payments/[paymentId].delete.ts` |
| GET | `/api/agreements/[id]/payments/[paymentId]` | — | — | `server/api/agreements/[id]/payments/[paymentId].get.ts` |
| PATCH | `/api/agreements/[id]/payments/[paymentId]` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementPaymentPatchSchema, readValidatedBodyI18n | `server/api/agreements/[id]/payments/[paymentId].patch.ts` |
| POST | `/api/agreements/[id]/payments` | executeFreshAuthorizedAgreementWrite | FundingCaseAgreementPaymentCreateSchema, readValidatedBodyI18n | `server/api/agreements/[id]/payments/index.post.ts` |
| GET | `/api/agreements/[id]/payments/lookups/commitments` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/payments/lookups/commitments.get.ts` |
| GET | `/api/agreements/[id]/payments/lookups/fiscal-years` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/[id]/payments/lookups/fiscal-years.get.ts` |
| GET | `/api/agreements` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, requireAuthContext | AgreementsPaginationSchema, PaginationSchema, getValidatedQueryI18n | `server/api/agreements/index.get.ts` |
| POST | `/api/agreements` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveAgreementStreamScopeContext | FundingCaseAgreementCreateSchema, readValidatedBodyI18n | `server/api/agreements/index.post.ts` |
| GET | `/api/agreements/lookups/agreement-subtypes` | — | — | `server/api/agreements/lookups/agreement-subtypes.get.ts` |
| GET | `/api/agreements/lookups/applicant-recipients` | — | ApplicantRecipientLookupQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/agreements/lookups/applicant-recipients.get.ts` |
| GET | `/api/agreements/lookups/holdback-bases` | — | — | `server/api/agreements/lookups/holdback-bases.get.ts` |
| GET | `/api/agreements/lookups/risk-ratings` | — | — | `server/api/agreements/lookups/risk-ratings.get.ts` |
| GET | `/api/agreements/lookups/streams` | resolveAgreementScopeContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/agreements/lookups/streams.get.ts` |
| POST | `/api/agreements/similarity` | requireAuthContext, resolveAgreementScopeContext, resolveAgreementStreamScopeContext | BodySchema, readValidatedBodyI18n | `server/api/agreements/similarity.post.ts` |
| GET | `/api/applicant-recipients/[id]/agreements` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agreements/index.get.ts` |
| GET | `/api/claim-reconciliations/[reconcileId]` | — | — | `server/api/claim-reconciliations/[reconcileId].get.ts` |
| PATCH | `/api/claim-reconciliations/[reconcileId]` | resolveAgreementScopeContext | — | `server/api/claim-reconciliations/[reconcileId].patch.ts` |
| PATCH | `/api/claim-reconciliations/[reconcileId]/lines/[lineId]` | resolveAgreementScopeContext | — | `server/api/claim-reconciliations/[reconcileId]/lines/[lineId].patch.ts` |
| POST | `/api/claim-reconciliations/[reconcileId]/lines` | resolveAgreementScopeContext | FundingCaseAgreementClaimReconcileLineItemCreateSchema, readValidatedBodyI18n | `server/api/claim-reconciliations/[reconcileId]/lines/index.post.ts` |
