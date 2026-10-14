# Applicant-recipient API

These requests support proponent profiles: the organizations or people applying for or receiving funding. They also support contacts, addresses, funding history, reviews and links to agreements. See [Proponents](../../proponents/index.md).

An API is the set of requests the application sends to its server when you open or save a record. Officers normally use the screens; developers use this index to find the code behind them. The server checks access to protected records even when a screen shows an action as available.

- **Method**: `GET` reads information; `POST` usually creates a record or performs an action; `PATCH` and `PUT` save changes; `DELETE` removes a record. `ANY` delegates requests without a single method listed here.
- **Route**: the request address. Replace names in brackets, such as `[id]`, with the actual record ID.
- **Authorization landmarks**: names found in the source that help a developer locate access checks.
- **Validation landmarks**: names that help locate checks on submitted fields or query options.
- **Source**: the application file that handles the request. A handler is the code that receives and answers it.

This table is generated from source names. A dash (`—`) means no matching name was found; it does not prove there is no access or data check. A listed name may also be a field or comment, rather than a check. Developers must follow the handler and its shared helpers to confirm the rules, response and tests; the coverage ledger tracks that evidence.

## Read-only example

An authorized request for `GET /api/applicant-recipients/27` reads proponent 27’s profile, including legal and operating names. It does not create an agreement for that proponent. Any numbers shown are illustrative: use IDs for existing records you are allowed to read.

## Handlers (44)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/applicant-recipients/[id]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id].delete.ts` |
| GET | `/api/applicant-recipients/[id]` | authorizeWithFreshAuthContext, requireFreshAuthContext | — | `server/api/applicant-recipients/[id].get.ts` |
| PATCH | `/api/applicant-recipients/[id]` | resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id].patch.ts` |
| GET | `/api/applicant-recipients/[id]/account-receivables` | — | — | `server/api/applicant-recipients/[id]/account-receivables/index.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/addresses/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/addresses/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/addresses/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAddressPatchSchema, CommonAddressSubdivisionSchema, parseI18n, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/addresses/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/addresses` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/addresses/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/addresses` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAddressCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/addresses/index.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/agency-financial-ids/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/agency-financial-ids/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/agency-financial-ids/[childId]` | requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/agency-financial-ids/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/agency-financial-ids/[childId]/uses` | requireAuthContext, resolveApplicantRecipientAuthorization | QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/[childId]/uses.get.ts` |
| GET | `/api/applicant-recipients/[id]/agency-financial-ids` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/agency-financial-ids` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAgencyFinancialIdCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/agency-financial-ids/lookups/agencies` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/lookups/agencies.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/contacts/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/contacts/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/contacts/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientContactPatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/contacts/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/contacts` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/contacts/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/contacts` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientContactCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/contacts/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/credit-memos` | — | — | `server/api/applicant-recipients/[id]/credit-memos/index.get.ts` |
| GET | `/api/applicant-recipients/[id]/financial-summary` | — | — | `server/api/applicant-recipients/[id]/financial-summary/index.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/funding-history/[historyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/funding-history/[historyId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/funding-history/[historyId]` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryExternalPatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/[historyId].patch.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history/[historyId]/recipients` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | BodySchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/[historyId]/recipients.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/funding-history/[historyId]/recipients/[recipientId]` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/funding-history/[historyId]/recipients/[recipientId].delete.ts` |
| GET | `/api/applicant-recipients/[id]/funding-history` | authorizeWithFreshAuthContext, egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, requireFreshAuthContext, resolveApplicantRecipientAuthorization | AssignedListViewSchema, PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/funding-history/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryExternalCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/funding-history/lookups/recipients` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/funding-history/lookups/recipients.get.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history/similarity` | requireAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryIdentityBaseSchema, SimilaritySchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/similarity.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/notes/[noteId]` | — | — | `server/api/applicant-recipients/[id]/notes/[noteId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/notes/[noteId]` | — | — | `server/api/applicant-recipients/[id]/notes/[noteId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/notes` | — | — | `server/api/applicant-recipients/[id]/notes/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/notes` | — | — | `server/api/applicant-recipients/[id]/notes/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/notes/lookups/agencies` | requireAuthContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/notes/lookups/agencies.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/other-names/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/other-names/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/other-names/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientOtherNamePatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/other-names/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/other-names` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/other-names/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/other-names` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientOtherNameCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/other-names/index.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/registries/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/registries/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/registries/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientRegistryCreateSchema, ApplicantRecipientRegistryPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/registries/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/registries` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/registries/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/registries` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientRegistryCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/registries/index.post.ts` |
| GET | `/api/applicant-recipients` | — | ApplicantRecipientPaginationSchema, AssignedListViewSchema, PaginationSchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/applicant-recipients/index.get.ts` |
| POST | `/api/applicant-recipients` | requireAuthContext | ApplicantRecipientProfileSchema, readValidatedBodyI18n | `server/api/applicant-recipients/index.post.ts` |
| GET | `/api/applicant-recipients/lookups/agencies` | requireAuthContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/lookups/agencies.get.ts` |
