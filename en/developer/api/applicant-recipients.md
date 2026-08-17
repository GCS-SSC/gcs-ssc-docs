# Applicant-recipient API

Proponent profiles, identity, relationships, funding history, reviews, agreements, and Teams.

This generated route index is an exhaustive navigation table, not independent proof of a contract. For each handler, the coverage ledger records the direct authorization, validation, helper, database, response, UI, and test evidence required before terminal verification. Client permissions never replace server authorization.

## Handlers (41)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/applicant-recipients/[id]` | authorizeWithFreshAuthContext, requireFreshAuthContext | — | `server/api/applicant-recipients/[id].delete.ts` |
| GET | `/api/applicant-recipients/[id]` | getEntityTeamAccessLevel | — | `server/api/applicant-recipients/[id].get.ts` |
| PATCH | `/api/applicant-recipients/[id]` | — | — | `server/api/applicant-recipients/[id].patch.ts` |
| DELETE | `/api/applicant-recipients/[id]/addresses/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/addresses/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/addresses/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAddressPatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/addresses/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/addresses` | resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/addresses/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/addresses` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAddressCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/addresses/index.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/agency-financial-ids/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/agency-financial-ids/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/agency-financial-ids/[childId]` | resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/agency-financial-ids/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/agency-financial-ids` | resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/agency-financial-ids` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAgencyFinancialIdCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/agency-financial-ids/lookups/agencies` | resolveApplicantRecipientAuthorization | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/lookups/agencies.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/contacts/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/contacts/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/contacts/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientContactPatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/contacts/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/contacts` | resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/contacts/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/contacts` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientContactCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/contacts/index.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/funding-history/[historyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/funding-history/[historyId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/funding-history/[historyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryExternalPatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/[historyId].patch.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history/[historyId]/recipients` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | BodySchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/[historyId]/recipients.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/funding-history/[historyId]/recipients/[recipientId]` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/funding-history/[historyId]/recipients/[recipientId].delete.ts` |
| GET | `/api/applicant-recipients/[id]/funding-history` | egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/funding-history/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryExternalCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/funding-history/lookups/recipients` | resolveApplicantRecipientAuthorization | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/funding-history/lookups/recipients.get.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history/similarity` | requireAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryIdentityBaseSchema, SimilaritySchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/similarity.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/other-names/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/other-names/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/other-names/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientOtherNamePatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/other-names/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/other-names` | resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/other-names/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/other-names` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientOtherNameCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/other-names/index.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/registries/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/registries/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/registries/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientRegistryCreateSchema, ApplicantRecipientRegistryPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/registries/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/registries` | resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/registries/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/registries` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientRegistryCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/registries/index.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/team/[teamId]` | — | — | `server/api/applicant-recipients/[id]/team/[teamId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/team/[teamId]` | — | — | `server/api/applicant-recipients/[id]/team/[teamId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/team` | — | — | `server/api/applicant-recipients/[id]/team/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/team` | — | — | `server/api/applicant-recipients/[id]/team/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/team/lookups/users` | — | — | `server/api/applicant-recipients/[id]/team/lookups/users.get.ts` |
| GET | `/api/applicant-recipients` | getEntityTeamAccessLevels | ApplicantRecipientPaginationSchema, PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/index.get.ts` |
| POST | `/api/applicant-recipients` | — | ApplicantRecipientProfileSchema, readValidatedBodyI18n | `server/api/applicant-recipients/index.post.ts` |
| GET | `/api/applicant-recipients/lookups/agencies` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/lookups/agencies.get.ts` |
| GET | `/api/applicant-recipients/lookups/subtypes` | — | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/lookups/subtypes.get.ts` |
