# API contracts

## Activity custom fields

The Stream routes under `/api/transfer-payments/[id]/streams/[streamId]/activity-custom-fields` manage Activity assignments under the owning Program. GET returns `items` and an empty `sections` array. Writes require Stream update authority. An Activity assignment cannot have a section. Resolve definitions for an Agreement through `GET /api/agreements/[id]/activities/lookups/custom-fields` with `permission_action` set to `read`, `create`, or `update`. Supply `amendment_id` when working in an Amendment.

Activity create and update accept `egcs_fc_customfields` keyed by Agency field ID. PATCH merges supplied keys into the saved object. Agency Number definitions accept nullable `egcs_ay_minimum`, `egcs_ay_maximum`, and `egcs_ay_decimalplaces`.

## Bilingual Activity and budget line text

Activity name, description, and expected results each require nonblank text in at least one language. Budget line subsection and description follow the same rule. Budget line English fields remain `egcs_fc_costsubsection` and `egcs_fc_description`; their French counterparts are `egcs_fc_costsubsection_fr` and `egcs_fc_description_fr`. Create requests default omitted translations to empty strings. On Agreement and Amendment PATCH requests, send an empty string to clear a translation, and keep another nonblank value in the pair after merging with saved fields.

## Agreement Financial System Number

`POST /api/agreements` and `PATCH /api/agreements/[id]` accept optional `egcs_fc_financialsystemnumber`. Send a non-negative bigint as decimal text. On PATCH, omission keeps the saved value unless a provider supplies a new one, and `null` requests a clear. `GET /api/agreements/number-mode?streamId=…` returns the create policy in `financialNumberPolicy`. For authorized editors, the Agreement detail response includes the edit policy or `financialNumberPolicyUnavailable: true` if policy resolution fails.

HTTP 409 codes are `AGREEMENT_FINANCIAL_NUMBER_REQUIRED`, `AGREEMENT_FINANCIAL_NUMBER_READ_ONLY`, and `AGREEMENT_FINANCIAL_NUMBER_PROVIDER_INVALID`. Agency extension enablement returns `AGREEMENT_FINANCIAL_NUMBER_PROVIDER_CONFLICT` if another provider is already enabled.

## Claim and Payment creation

`POST /api/agreements/[id]/claims` and `POST /api/agreements/[id]/payments` check initial Agreement approval within the authorized write transaction. The Agreement must have a retained revision `0` linked to its initial approval submission and a workflow run for that Agreement in state `succeeded` or `approved`. If that evidence is missing, the server returns HTTP 409 with code `AGREEMENT_INITIAL_APPROVAL_REQUIRED` before creating the record. Retry after the initial approval workflow succeeds.

## Agency field help

The Agency tooltip list requires `help:read` in the requested Agency and returns `items`, available `targets`, and action `capabilities`. POST, PATCH, and DELETE require `help:create`, `help:update`, and `help:delete`, respectively. POST and PATCH accept the full save object. Supply `egcs_ay_targetkey` (at most 500 characters), both text fields (each at most 4,000 characters), and the Boolean `egcs_ay_enabled`. Enabled entries require nonblank text in both languages. A new target must be registered and, for an extension target, enabled for the Agency. The list identifies unavailable targets and disabled extensions. A duplicate active target in the Agency returns 409. DELETE retires the entry and returns `{ success: true }`.

## Catalog revisions and runtime field help

`GET /api/catalog-versions` requires a current session and returns `accountId`, `sessionId`, and `agencies`, a map from Agency ID to visible catalog group revisions. The response uses `Cache-Control: no-store`. Existing business read scopes and exact approval assignments determine which revisions are visible. The endpoint returns revision metadata only. The session ID identifies the database session record.

`GET /api/field-tooltips/runtime` accepts `entityType` and `entityId`. For create forms the ID identifies the selected stream or opportunity. For existing records it identifies the requested business record. The endpoint checks access to that context and derives the Agency on the server. It returns `agencyId` and enabled, available entries as `{ targetKey, text: { en, fr } }`. A supported context with no owning Agency returns a null Agency ID and an empty list.

## Approval email configuration

The Agency notification provider GET route requires `agency:read`. It returns `selectedProvider` and registered providers with their enablement and selection flags. PATCH requires `agency:delete` for the same Agency and accepts `{ providerKey }`. The provider must be registered, enabled for the Agency, and pass its configuration validation. An unknown provider returns 404, a disabled provider or invalid configuration returns 409, and an unavailable provider returns 503. The stream notifier GET route requires `transfer_payment:read` on the stream scope and returns the supported notifier definitions in `notifiers`.

## Assigned approval workspace

`GET /api/workflows/approval-runtime` requires `purpose=approval_submission` and an exact approval item grant for the requested entity. If supplied, `runtimeId` must match the granted approval stage. The response exposes the retained submission and its source approval stage. Other workflow collections are empty and lifecycle capabilities are false. An invalid purpose, missing grant, or mismatched runtime returns 403.

## Agreement relationships

`GET /api/agreements/[id]/related-agreements` lists links in either direction after authorizing read access to the agreement in the path. The related agreement summary includes the number, bilingual title, program, stream, relationship type, and description. Opening the related agreement still requires its own read authorization.

POST requires `egcs_fc_relatedagreement` and `egcs_fc_relationshiptype`. PATCH requires the type and keeps both agreement IDs fixed. Both accept `egcs_fc_description` up to 255 characters. Omit the description on PATCH to preserve it, or send an empty string or null to clear it. Create rechecks target read access. Write authorization and assignment apply to the agreement in the path. The type and both agreements must belong to the same Agency.

`DUPLICATE_AGREEMENT_RELATIONSHIP` indicates an existing active link for the pair, regardless of direction. `INVALID_AGREEMENT_RELATIONSHIP` covers an ineligible target or type. DELETE marks the relationship deleted from both lists and preserves both agreement records.
