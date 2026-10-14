# Extension host API

Extensions add features to the core system. These requests let the application find those features, read agency and stream settings, and call extension services. See [Extensions](../../concepts/extensions.md) to understand how they affect an officer’s workspace.

An API is the set of requests the application sends to its server when you open or save a record. Officers normally use the screens; developers use this index to find the code behind them. The server checks access to protected records even when a screen shows an action as available.

- **Method**: `GET` reads information; `POST` usually creates a record or performs an action; `PATCH` and `PUT` save changes; `DELETE` removes a record. `ANY` delegates requests without a single method listed here.
- **Route**: the request address. Replace names in brackets, such as `[id]`, with the actual record ID.
- **Authorization landmarks**: names found in the source that help a developer locate access checks.
- **Validation landmarks**: names that help locate checks on submitted fields or query options.
- **Source**: the application file that handles the request. A handler is the code that receives and answers it.

This table is generated from source names. A dash (`—`) means no matching name was found; it does not prove there is no access or data check. A listed name may also be a field or comment, rather than a check. Developers must follow the handler and its shared helpers to confirm the rules, response and tests; the coverage ledger tracks that evidence.

## Read-only example

An authorized request for `GET /api/extensions/agency/12` lists registered extensions and their enablement and configuration for agency 12. It does not enable an extension or run its migrations. Any numbers shown are illustrative: use IDs for existing records you are allowed to read.

## Handlers (13)

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
| GET | `/api/extensions/workspaces` | — | — | `server/api/extensions/workspaces.get.ts` |
