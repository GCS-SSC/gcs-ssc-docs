# Extension host API

Discovery metadata, enablement/configuration, dynamic dispatch, runtime contributions, and extension storage.

This generated route index is an exhaustive navigation table, not independent proof of a contract. For each handler, the coverage ledger records the direct authorization, validation, helper, database, response, UI, and test evidence required before terminal verification. Client permissions never replace server authorization.

## Handlers (12)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| ANY | `/api/extensions/[extensionKey]/[...route]` | — | — | `server/api/extensions/[extensionKey]/[...route].ts` |
| GET | `/api/extensions/agency/[agencyId]` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | — | `server/api/extensions/agency/[agencyId]/index.get.ts` |
| PATCH | `/api/extensions/agency/[agencyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionToggleSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/index.patch.ts` |
| POST | `/api/extensions/agency/[agencyId]/migrations` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionMigrationRunSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/migrations.post.ts` |
| GET | `/api/extensions/agency/[agencyId]/storage-provider` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | — | `server/api/extensions/agency/[agencyId]/storage-provider.get.ts` |
| PATCH | `/api/extensions/agency/[agencyId]/storage-provider` | authorizeWithFreshAuthContext, requireFreshAuthContext | AgencyStorageProviderSelectionSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/storage-provider.patch.ts` |
| GET | `/api/extensions/create-actions` | requireAuthContext | CreateActionsQuerySchema, parseI18n | `server/api/extensions/create-actions/index.get.ts` |
| GET | `/api/extensions/entity-tabs` | getExtensionEntityAuthorizationSubject | EntityTabQuerySchema, parseI18n | `server/api/extensions/entity-tabs/index.get.ts` |
| GET | `/api/extensions/payment-amount-calculators` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | PaymentAmountCalculatorsQuerySchema, parseI18n | `server/api/extensions/payment-amount-calculators/index.get.ts` |
| GET | `/api/extensions/runtime` | — | RuntimeSlotQuerySchema, parseI18n | `server/api/extensions/runtime/index.get.ts` |
| GET | `/api/extensions/streams/[streamId]` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | — | `server/api/extensions/streams/[streamId]/index.get.ts` |
| PATCH | `/api/extensions/streams/[streamId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionStreamConfigurationSchema, readValidatedBodyI18n | `server/api/extensions/streams/[streamId]/index.patch.ts` |
