# Extension host API

Discovery metadata, enablement/configuration, dynamic dispatch, runtime contributions, and extension storage.

This generated route index is an exhaustive navigation table, not independent proof of a contract. For each handler, the coverage ledger records the direct authorization, validation, helper, database, response, UI, and test evidence required before terminal verification. Client permissions never replace server authorization.

## Handlers (10)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| ANY | `/api/extensions/[extensionKey]/[...route]` | — | — | `server/api/extensions/[extensionKey]/[...route].ts` |
| GET | `/api/extensions/agency/[agencyId]` | — | — | `server/api/extensions/agency/[agencyId]/index.get.ts` |
| PATCH | `/api/extensions/agency/[agencyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionToggleSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/index.patch.ts` |
| POST | `/api/extensions/agency/[agencyId]/migrations` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionMigrationRunSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/migrations.post.ts` |
| GET | `/api/extensions/create-actions` | — | CreateActionsQuerySchema, parseI18n | `server/api/extensions/create-actions/index.get.ts` |
| GET | `/api/extensions/entity-tabs` | getExtensionEntityAuthorizationSubject | EntityTabQuerySchema, parseI18n | `server/api/extensions/entity-tabs/index.get.ts` |
| GET | `/api/extensions/payment-amount-calculators` | — | PaymentAmountCalculatorsQuerySchema, parseI18n | `server/api/extensions/payment-amount-calculators/index.get.ts` |
| GET | `/api/extensions/runtime` | — | RuntimeSlotQuerySchema, parseI18n | `server/api/extensions/runtime/index.get.ts` |
| GET | `/api/extensions/streams/[streamId]` | — | — | `server/api/extensions/streams/[streamId]/index.get.ts` |
| PATCH | `/api/extensions/streams/[streamId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionStreamConfigurationSchema, readValidatedBodyI18n | `server/api/extensions/streams/[streamId]/index.patch.ts` |

## Registry and configuration contracts

`GET /api/extensions/agency/{agencyId}` requires agency read access and an active agency. It joins active agency-enablement rows to every build-registered client-safe manifest, so disabled or never-configured packages still appear with `enabled: false` and `{}` config. The envelope is `{ items, total, stats: { total, active }, page: 1, limit }`; this is an unpaginated registry even though it uses list metadata.

`PATCH /api/extensions/agency/{agencyId}` requires agency update access and `{ extensionKey, enabled, config? }`. It validates the key against the build registry. Inside one transaction it locks authorization state and the extension/agency lifecycle scope, locks and rechecks the active agency, repeats authorization, runs pending migrations before enabling or disable guards before disabling, then upserts the active row. Omitting `config` preserves existing config. Disabling also changes every active configuration row for a stream owned by that agency to `enabled: false`; it does not delete config.

`POST /api/extensions/agency/{agencyId}/migrations` accepts `{ extensionKey }`, requires agency update, and only runs for an extension still enabled after lifecycle locking. It returns `{ extensionKey, results: [{ migrationName, direction, status }] }`. Unknown extensions are 404; disabled extensions and migration failures use stable localized bad-request codes. Migration exceptions are allowed to leave the transaction so partial execution rolls back before the stable error is returned.

`GET /api/extensions/streams/{streamId}` resolves only an active stream, active profile, and active owning agency, then requires transfer-payment read access at that exact scope. It returns only build-registered extensions whose agency row is active and enabled. Each item contains the client-safe manifest, `agencyEnabled: true`, the stream switch, and stream config; absent stream rows become disabled with `{}`. Its list metadata is likewise unpaginated.

`PATCH /api/extensions/streams/{streamId}` accepts `{ extensionKey, enabled, config }`, where config defaults to `{}` and must be JSON-safe. It requires exact transfer-payment update access, locks auth state and the extension agency/stream lifecycle scope, re-resolves ownership, repeats authorization, rechecks agency enablement, runs the matching enable/disable guard, and upserts. Narrative Quality enablement normalizes an empty target configuration by enabling `agreementTopLevel`; other extension-specific config validation belongs to the extension component or guard.

## Contribution discovery contracts

All discovery queries use locale-aware Zod parsing. They deliberately return empty items—not 404—when an optional entity identifier is absent or cannot resolve, but a resolved entity that the caller cannot access is still subject to host authorization.

| Endpoint | Exact contract |
| --- | --- |
| `GET /api/extensions/runtime` | Accepts one of seven slot enums plus optional `streamId`, `agencyId`, `applicantRecipientId`, `agreementId`, and `permissionAction` (`read` by default). Agreement create without an agreement id requires `agreement:create` on the stream; existing agreement requests require the requested exact agreement access and matching stream. Proponent create requires an agency plus global applicant-recipient create; existing profiles use exact applicant-recipient/Team access and must match the supplied lead agency. Stream items require active agency and stream switches. Agency/Proponent items require the agency switch. See the documented `DOC-030` runtime-resolver limitation. |
| `GET /api/extensions/entity-tabs` | Accepts target `agreement`, `proponent`, `claim`, or `monitor` plus the target-specific id. It resolves the active ownership chain, authorizes entity read (`applicant_recipient` for Proponents, `agreement` otherwise), then filters every contributed tab by enablement, declared target/RBAC, and a generated component name. Response: `{ target, items }`. |
| `GET /api/extensions/create-actions` | Accepts operation `agreement.commitments.create` or `agreement.payments.create` and optional `agreementId`. It requires visible agreement read access, both enablement switches, action RBAC, and a registered component. Response includes `conflict: true` and `EXTENSION_CREATE_OPERATION_CONFLICT` when more than one returned action has mode `replace`. |
| `GET /api/extensions/payment-amount-calculators` | Accepts only operation `agreement.payments.create` and optional `agreementId`; authorization and enablement match create actions. More than one item sets `conflict: true` and `EXTENSION_PAYMENT_AMOUNT_CALCULATOR_CONFLICT`. |

Returned descriptors contain browser-safe metadata and context, not server handler paths, migration paths, package roots, capabilities, secrets, or decrypted values. Component names are stable generated registry keys and are ignored by the UI if they cannot be resolved.

## Dynamic dispatcher

The catch-all first calls `authorize(event, 'system', 'read', { bypass: true })`: the bypass avoids a system-role requirement but still establishes an authenticated host context. It then matches the registered extension, exact HTTP method, and equal-length literal/dynamic route pattern. Missing identifiers return `MISSING_IDS`; no match returns `EXTENSION_ROUTE_NOT_FOUND`.

For a handler with host RBAC, the dispatcher requires exactly one declared agency, stream, or entity target. It resolves active ownership, verifies extension enablement and the declared subject/action, and injects only the applicable config/context. Entity subject mismatches fail closed. Agency handlers receive `{}` config; stream and non-Proponent entity handlers receive persisted stream config; Proponent entities receive `{}` after agency enablement.

The handler context also receives host agreement visibility and, for RBAC routes, a write-authorization protocol. Its required transaction order is:

1. `lockAuthState(trx)` on the same transaction;
2. extension agency/stream lifecycle locks, followed by required extension/entity locks;
3. `authorizeCurrentScope(trx)` (or compatibility alias `authorizeCurrentEntity`);
4. protected reads and writes;
5. for a selected agreement, `lockAndAuthorizeAgreement(trx, ...)` before its mutation.

The agreement callback returns `false` for a missing/inactive agreement or stream mismatch and throws on authorization denial. A handler using `auth: "manual"` has no injected RBAC or write protocol: authentication is the only automatic guarantee, and the extension owns all authorization, active-ownership, enablement, locking, and validation checks.

Before invocation, the dispatcher overlays resolved params and the authenticated context; a `finally` block restores both. `GcsExtensionUserError` is translated into the request locale with its stable code and localized details. Other exceptions are not relabelled as user errors.

## Build and migration boundary

The build scanner walks extension directories lexically, validates private package identity and unique keys/package names, SDK compatibility, declared/implied capabilities, contained real paths, RBAC route parameters, bilingual contribution labels, IDs, operations, assets, and migration identities. It emits separate client-safe metadata, a component registry, and a server registry with sanitized metadata and statically analyzable lazy imports. Server-only paths and capabilities never enter the client manifest.

Extension migration history is isolated per extension using a sanitized key plus hash. `runExtensionMigrations` loads only registered migration modules with valid `up`/`down` exports and runs pending work. The startup migration plugin calls `runEnabledExtensionMigrations`, which selects distinct extension keys enabled for at least one active agency; installed-but-disabled extensions are not migrated automatically.
