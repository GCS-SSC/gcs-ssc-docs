# Extensions

Extensions are optional add-ons installed with GCS-SSC. Depending on what your organization has installed and enabled, you may see extra tabs, translation suggestions or payment calculation tools. The technical team installs extensions. Officers use the features available on their records. GCS-SSC provides the shared pages and checks permissions for these add-ons.

An extension is a code package. It can add configuration screens, page slots and tabs, specialized commitment or payment actions, payment calculators, authenticated server routes, database objects, public assets, and lifecycle guards. An administrator can enable an installed package, but cannot install one from the UI.

This site explains how GCS-SSC supports extensions and documents its public software development kit, or SDK. Consult each installed extension’s own guides for its features, settings and operation. Extension developers should read [Authoring Extensions](../developer/extensions-authoring.md) and the [host API reference](../developer/api/extensions.md).

## The three operating switches

Installed means the technical team has included the add-on in the application. Enabled means an authorized person has turned it on for an Agency and, when required, a Stream. Configured means its settings have been supplied. Complete all required steps before using the feature.

For example, if a payment calculator is available in one Stream but missing in another, ask the administrator to check the Agency and Stream settings as well as your access. Being assigned to the Agreement does not turn an extension on.

1. The technical team includes the extension in the application build. The build validates packages under `extensions/` and creates the client and server registries. Invalid SDK ranges, capabilities, paths, access-control declarations, duplicate identities or asset namespaces stop the build. It skips incomplete directories missing `package.json` or `extension.config.ts` with a warning.
2. An authorized user enables the extension for an Agency. This also runs pending migrations, which update the extension’s stored data or database structure. If a migration fails, GCS-SSC cancels the changes and leaves the extension disabled.
3. If the extension has Stream configuration, an authorized user enables and configures each intended Stream. Keep the Agency switch on. Features on Agreements, Claims and Monitors, as well as actions and calculators, require both switches. Features on Proponents use authorized active Agencies because Proponents do not belong to a Stream.

A guard is a check that can prevent an unsafe change, such as turning off a feature still in use. Disabling an agency extension runs registered disable guards, then turns off all active stream rows for that extension in the agency. Re-enabling the agency does **not** restore those stream switches. Stream enable and disable guards can also refuse a change with a localized business error.

## Configuration policy and provider selection

The default model uses both Agency and stream switches. An extension can instead declare Agency-only configuration: it is configured once for the Agency, has no stream configuration editor and applies to the Agency’s streams through that Agency switch. Do not create a stream row to work around an Agency-only declaration.

Each extension specifies the access level required to change its settings. Contributor is the default; a package may require Manager for enablement and configuration. In that case, an ordinary Contributor cannot save its configuration even when other extensions in the same table are editable. You still need the appropriate permissions and record assignment to use its features. Internally, the Manager check uses the delete permission included in that level. This check does not delete the extension.

File storage additionally has an Agency **selected provider**. Enabling a storage extension alone does not select it. New files use the selected provider. Existing files keep their original provider and storage location. You cannot disable or remove a provider while records still refer to it. See [Attachments](./attachments.md) and [Configuration](../operator/configuration.md).

Agreement-number providers are another host-selected contribution. Exactly one enabled provider can supply a generated number for the chosen stream; with none, enter a number manually. Multiple eligible providers produce a configuration conflict. GCS-SSC validates the generated number before creating the Agreement. The provider supplies the number, not a separate way to create an Agreement.

## Agency administration

Open an agency and select **Extensions**. The table lists every package registered in the running build, including packages not yet enabled; it shows localized names and descriptions, current status, and these actions:

- switch the agency enablement on or off;
- open the extension's custom agency configuration, or edit JSON when it has no custom component;
- run pending migrations manually while the extension is enabled. Migrations are technical updates to the extension’s stored data or database structure.

Agency configuration uses JSON, a structured text format visible in the browser. Do not enter credentials or private keys there. If you close a full-screen configuration window with unsaved changes, it asks whether to discard them. Correct invalid JSON before saving.

The list does not show whether migrations are pending. A successful manual run displays a success message. Failed enablement or migration runs display an error in your language.

Agency reads require `agency:read`; configuration writes enforce the extension’s Contributor or Manager policy, and migration actions require `agency:update`. Writes lock authorization state, the extension/agency lifecycle scope, and the active agency, then repeat authorization before changing data.

## Stream administration

Open a transfer-payment stream and select **Extensions**. Only extensions currently enabled for its owning agency appear. The table lets you search in your language and shows each extension’s status. If you have permission to update the Stream’s child records, it also offers an enable switch and configuration.

Configuration opens in one of three places:

- a contributed full-screen modal component;
- a dedicated locale-aware page at `/extension/{key}/config` (French: `/extension/{key}/configuration`) when the manifest declares `admin.streamConfigPage`;
- a JSON editor when no custom modal exists.

The dedicated page requires a `streamId` query value and normally receives `transferPaymentId` and `agencyId` for breadcrumbs and component context. It loads the authoritative stream registry, refuses an extension absent from that registry, shows a generic redacted error alert on loading failures, and delegates saving to the contributed component. If no registered page/modal component resolves, it shows an unavailable warning rather than a host save form.

If saving fails, check that the Stream still exists, the extension is registered and enabled for the Agency, and the JSON is valid. A change in your access or an extension guard can also block saving.

Before saving, GCS-SSC locks the relevant authorization and lifecycle records. It checks the Stream’s current owner, your required Contributor or Manager permission, Agency enablement and the extension guard. It creates or updates the settings only after these checks pass.

## Runtime contributions

A contribution is a feature supplied by an extension. Slots are places on an existing page where it can add a control; entity tabs are extra tabs on a record. Role-based access control, or RBAC, determines who may use each feature. GCS-SSC checks sign-in, permissions and enablement on the server before returning available features to the browser.

| Contribution | Host behaviour |
| --- | --- |
| Slots | Nine named slots can render beside shared text areas, Agreement descriptions/profile fields/sections, Proponent descriptions, scoped bilingual fields and Payment evidence. Requests carry the intended `create`, `read`, or `update` action. Invalid or inaccessible ownership fails; no usable context returns an empty list. |
| Entity tabs | Agreement, Proponent, Claim, Monitor, Opportunity and Payment tabs resolve the exact active entity and its owner; Proponent contributions carry an authorized Agency-context array. The host checks entity read access and each tab's declared RBAC pair before returning its component and configuration. Missing IDs, deleted entities, disabled extensions, and denied tab RBAC produce no tab. |
| Create actions | Commitment and payment pages request append/replace actions for the current agreement. No agreement produces an empty result. More than one enabled `replace` action yields `EXTENSION_CREATE_OPERATION_CONFLICT`; the host does not choose one. |
| Payment calculators | Payment creation supports one enabled calculator. More than one yields `EXTENSION_PAYMENT_AMOUNT_CALCULATOR_CONFLICT`; configuration must be corrected before relying on a calculator. |

Host components resolve only names present in the generated component registry. A missing component therefore renders nothing. Successful create actions call the host callback to refresh the owning table. A calculator returns a result and supporting data identified by the extension key. The form applies the result, and the server validates it against the business rules.

### Runtime resolver behaviour

A runtime resolver is extension code that determines whether a feature applies to the current record and supplies its settings. Agency and Proponent slots consult the declared runtime resolver. If an extension declares a resolver, it must return `enabled: true` for the slot to appear; false or absent results suppress the contribution. An enabled result supplies the slot’s settings. Stream slots use saved Stream settings. GCS-SSC still checks Agency and Stream enablement and your permissions before displaying the feature.

## Dynamic server routes and trust boundary

This section describes the server checks used by technical teams. Officers still use the normal application screens; an extension must not bypass access restrictions on a record.

All extension routes enter through `/api/extensions/{extensionKey}/...` and require an authenticated session before dispatch. The build registry matches an exact method and segment pattern; it does not support an arbitrary filesystem route. The dispatcher isolates resolved parameters while calling the handler and restores the original request context afterward.

An RBAC-declared handler gets host-resolved agency, stream, or exact entity context, effective configuration, and the declared subject/action check. Agency and stream states are rechecked. Entity routes support Agreements, Proponents, Claims, Monitors, Opportunities and Payments; claim/monitor authorization remains in the owning agreement domain. A handler declared `auth: "manual"` receives authentication only and must perform its own complete domain authorization and enablement checks.

Protected extension writes use the supplied two-phase `writeAuthorization` protocol. In one transaction, they lock authorization state and the lifecycle and entity records, recheck access in the current scope, then read and change data. Agreement selections use the host visibility helper, and writes to a selected agreement use the same-transaction agreement lock and fresh authorization callback. Missing protocols or scope drift are fatal. Expected extension user errors are localized into the normal API error envelope; unexpected errors remain server failures.

## Migrations, state, and secrets

Each extension has separately hashed Kysely migration history and lock tables. Each run applies only pending migrations and returns their names, directions and statuses. Startup automatically applies migrations only for extensions enabled by at least one active agency; operators should still deploy compatible code and migrations before allowing traffic.

KV means key-value storage: a way to save settings under named keys. JSON is a structured text format for those settings. Use extension KV for simple non-secret JSON. KV deletion is soft deletion. Use extension-owned migrated tables for relational or reportable workflows. Use the encrypted secret helpers for credentials and private keys; AES-256-GCM records are bound to extension and owner identity. The deployment-managed `GCS_EXTENSION_SECRETS_KEY` must be a base64-encoded 32-byte value and must never enter config, KV, source control, seed data for real environments, or client payloads.

## Workspaces and retained evidence

Enabled extensions can expose an Agency workspace under **Management** or **Administration** in the application navigation. The extension determines its menu group and position. Choose an authorized Agency within that workspace; changing language preserves its selected section. Opportunity contributions use Program permissions, while Payment contributions use Agreement permissions. Proponent contributions gather authorized Agency configurations without requiring a lead-Agency selection. Missing grants or enablement can therefore explain an absent section even when the package is installed.

Agreement extension sections can link to host-framed detail pages. Bilingual field actions may propose translated draft values; review both languages and save the owning form. Payment evidence extensions show the calculation details saved with the Payment rather than recalculating them using today’s data. For example, when checking how an earlier Payment amount was calculated, use its retained evidence even if the calculator’s settings have since changed. Extension financial reads and coding allocation use host currency, capacity and authorization rules.

Scheduled imports activate after enabled migrations and run through durable L1 scheduling, the background-work queue that preserves jobs for later processing. They create eligible draft records and retain their own retry/conflict evidence. See [Portal](../intake/portal.md), [Background work](../operator/background-work.md) and the [SDK contracts](../developer/extensions-authoring.md). Consult each extension’s own guide for its connector, calculator or translation settings.

## Operational checklist

- Confirm the extension is packaged in the deployed build and appears in the agency registry.
- Enable it at agency level and resolve any migration or disable-guard error.
- For extensions with stream configuration, configure and enable each intended stream; re-enable streams explicitly after an agency-level disable.
- Store secrets through the encrypted server helpers, not the JSON editors.
- Test every contributed tab, slot, action, calculator, and server workflow with both permitted and denied users.
- After an upgrade, run pending migrations and verify the affected host lifecycle guards before processing production records.
