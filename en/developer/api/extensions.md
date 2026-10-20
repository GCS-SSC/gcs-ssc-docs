# Extension host API

Extensions add features to the core system. These requests let the application find those features, read agency and stream settings, and call extension services. See [Extensions](../../concepts/extensions.md) to understand how they affect an officer’s workspace.

This index maps server requests to their handler files. The linked guides explain the on-screen steps. The server checks access to protected records even when a screen offers an action.

- The method identifies the request type. `GET` reads information. `POST` usually creates a record or runs an action. `PATCH` and `PUT` save changes. `DELETE` removes a record. `ANY` means the handler has no single method declared in its filename.
- The route is the request address. Replace bracketed names such as `[id]` with the actual record ID.
- Authorization names and validation names are matches found in the handler source. They help locate access checks and checks on submitted fields or query options.
- The source is the application file that handles the request.

A dash in the names columns means the generator found no matching name. It does not prove that a check is absent. A listed name may come from a field or comment. Follow the handler and its shared helpers to confirm access rules, validation and responses. The coverage ledger records the supporting evidence.

## Read-only example

An authorized request for `GET /api/extensions/agency/12` lists registered extensions and their enablement and configuration for agency 12. It does not enable an extension or run its migrations. The IDs are examples. Use existing records you are allowed to read.

## Handlers (13)

| Method | Route | Authorization names | Validation names | Source |
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
