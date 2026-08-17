# Extensions

Extensions are code packages installed with GCS-SSC. They can add configuration screens, page slots and tabs, specialized commitment or payment actions, payment calculators, authenticated server routes, database objects, public assets, and lifecycle guards. An administrator can enable an installed package, but cannot install one from the UI.

See [Installed Extensions](../extensions/index.md) for the five packages shipped in this checkout. Extension developers should also read [Authoring Extensions](../developer/extensions-authoring.md) and the [host API reference](../developer/api/extensions.md).

## The three operating switches

Do not treat “installed,” “enabled,” and “configured” as synonyms.

1. The Nuxt build scans directories under `extensions/`. It validates each package and generates client and server registries. Invalid SDK ranges, capabilities, paths, RBAC declarations, duplicate identities, or asset namespaces stop the build. An incomplete directory missing `package.json` or `extension.config.ts` is skipped with a warning.
2. A user with `agency:update` enables the registered extension for an agency. Enabling runs its pending migrations in the same transaction before the enablement row is saved. A migration failure rolls back and leaves the extension disabled.
3. A user with `transfer_payment:update` enables and configures it for a stream. The agency switch must still be on. Runtime agreement, claim, monitor, action, and calculator contributions require both switches; Proponent contributions use the lead agency because a Proponent is not stream-owned.

Disabling an agency extension runs registered disable guards, then turns off all active stream rows for that extension in the agency. Re-enabling the agency does **not** restore those stream switches. Stream enable and disable guards can also refuse a change with a localized business error.

## Agency administration

Open an agency and select **Extensions**. The table lists every package registered in the running build, including packages not yet enabled; it shows localized names and descriptions, current status, and these actions:

- switch the agency enablement on or off;
- open the extension's custom agency configuration, or edit JSON when it has no custom component;
- run pending migrations manually while the extension is enabled.

Agency configuration is ordinary browser-visible JSON, not a secret store. Closing a changed full-screen modal asks whether to discard the draft. Invalid fallback JSON prevents saving. The list does not report whether migrations are pending or current: a successful manual run reports success, while a failed enable or run returns a localized API error.

Agency reads require `agency:read`; enablement, configuration, and migration actions require `agency:update`. Writes lock authorization state, the extension/agency lifecycle scope, and the active agency, then repeat authorization before changing data.

## Stream administration

Open a transfer-payment stream and select **Extensions**. Only extensions currently enabled for its owning agency appear. The stream table supports localized search, status, an enable switch, and configuration when the page grants child-update access.

Configuration uses one of three surfaces:

- a contributed full-screen modal component;
- a dedicated locale-aware page at `/extension/{key}/config` (French: `/extension/{key}/configuration`) when the manifest declares `admin.streamConfigPage`;
- a JSON editor when no custom modal exists.

The dedicated page requires a `streamId` query value and normally receives `transferPaymentId` and `agencyId` for breadcrumbs and component context. It loads the authoritative stream registry, refuses an extension absent from that registry, shows a generic redacted error alert on loading failures, and delegates saving to the contributed component. If no registered page/modal component resolves, it shows an unavailable warning rather than a host save form.

Stream writes reject a missing/deleted stream, an unknown extension, a disabled agency switch, invalid JSON, authorization drift, and extension guard failures. The host takes the authorization-state and extension lifecycle locks, re-resolves the active stream ownership, repeats `transfer_payment:update`, checks agency enablement, runs the guard, and only then upserts the stream row. Enabling Narrative Quality with an otherwise empty configuration adds its agreement-level target so a meter can render.

## Runtime contributions

The host discovers contributions through authenticated, authorization-filtered endpoints; the browser never decides enablement or RBAC by itself.

| Contribution | Host behaviour |
| --- | --- |
| Slots | Seven named slots can render beside shared text areas, agreement descriptions/profile fields/sections, and Proponent descriptions. Requests carry the intended `create`, `read`, or `update` action. Invalid or inaccessible ownership fails; no usable context returns an empty list. |
| Entity tabs | Agreement, Proponent, claim, and monitor tabs resolve the exact active entity and owning agency/stream. The host checks entity read access and each tab's declared RBAC pair before returning its component and configuration. Missing IDs, deleted entities, disabled extensions, and denied tab RBAC produce no tab. |
| Create actions | Commitment and payment pages request append/replace actions for the current agreement. No agreement produces an empty result. More than one enabled `replace` action yields `EXTENSION_CREATE_OPERATION_CONFLICT`; the host does not choose one. |
| Payment calculators | Payment creation supports one enabled calculator. More than one yields `EXTENSION_PAYMENT_AMOUNT_CALCULATOR_CONFLICT`; configuration must be corrected before relying on a calculator. |

Host components resolve only names present in the generated component registry. A missing component therefore renders nothing. Successful create actions call the host callback to refresh the owning table. Calculator components emit a result and an extension-keyed payload; the host form applies the result, but server-side business validation remains authoritative.

### Runtime resolver limitation

The current executable path consults an extension runtime resolver only while loading agency/Proponent slots. Its returned configuration is used only when the resolver says it is enabled; however, a false or absent result does not suppress the slot—it falls back to `{}`. Stream slots use persisted stream configuration and do not call the runtime resolver. Operators and authors must not depend on the resolver alone to hide current slots; use agency/stream enablement and host RBAC. This discrepancy is tracked as `DOC-030`.

## Dynamic server routes and trust boundary

All extension routes enter through `/api/extensions/{extensionKey}/...` and require an authenticated session before dispatch. The build registry matches an exact method and segment pattern; it does not support an arbitrary filesystem route. The dispatcher isolates resolved parameters while calling the handler and restores the original request context afterward.

An RBAC-declared handler gets host-resolved agency, stream, or exact entity context, effective configuration, and the declared subject/action check. Agency and stream states are rechecked. Entity routes support agreements, Proponents, claims, and monitors; claim/monitor authorization remains in the owning agreement domain. A handler declared `auth: "manual"` receives authentication only and must perform its own complete domain authorization and enablement checks.

Protected extension writes use the supplied two-phase `writeAuthorization`: lock auth state in the same transaction, acquire lifecycle/entity locks, repeat current-scope authorization, then read and mutate. Agreement selections use the host visibility helper, and writes to a selected agreement use the same-transaction agreement lock and fresh authorization callback. Missing protocols or scope drift are fatal. Expected extension user errors are localized into the normal API error envelope; unexpected errors remain server failures.

## Migrations, state, and secrets

Each extension has separately hashed Kysely migration history and lock tables. Runs are pending-only and return migration name, direction, and status. Startup automatically applies migrations only for extensions enabled by at least one active agency; operators should still deploy compatible code and migrations before allowing traffic.

Use extension KV for simple non-secret JSON. KV deletion is soft deletion. Use extension-owned migrated tables for relational or reportable workflows. Use the encrypted secret helpers for credentials and private keys; AES-256-GCM records are bound to extension and owner identity. The deployment-managed `GCS_EXTENSION_SECRETS_KEY` must be a base64-encoded 32-byte value and must never enter config, KV, source control, seed data for real environments, or client payloads.

## Operational checklist

- Confirm the extension is packaged in the deployed build and appears in the agency registry.
- Enable it at agency level and resolve any migration or disable-guard error.
- Configure and enable each intended stream; re-enable streams explicitly after an agency-level disable.
- Store secrets through the encrypted server helpers, not the JSON editors.
- Test every contributed tab, slot, action, calculator, and server workflow with both permitted and denied users.
- After an upgrade, run pending migrations and verify the affected host lifecycle guards before processing production records.
