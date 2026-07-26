# Extensions

Extensions add local, versioned functionality to GCS-SSC. They can add agency and stream configuration, extra tabs, extra page sections, specialized create actions, payment amount calculators, server routes, public assets, extension-owned data, encrypted secrets, and bilingual messages.

See [Installed Extensions](../extensions/index.md) for the packages currently included with GCS-SSC and their operating rules. Developers should use [Authoring Extensions](../developer/extensions-authoring.md).

## Registration

Installed extensions are discovered when the application starts. Administrators do not create extension definitions in the UI; they enable and configure extensions that have already been installed with the application.

The host validates each extension's declared `sdkVersion` and `requiredHostCapabilities` before exposing it. Startup validation rejects unsupported SDK versions, unknown capabilities, and undeclared capabilities that can be inferred from manifest fields. It does not inspect implementation code for uses such as API clients, key-value storage, secrets, or create-operation hooks; extension authors must audit and declare those code-only dependencies.

## Agency enablement

Agency enablement is the first operational switch. Users need agency read access to view extension state and agency update access to enable or disable an extension.

When an extension is enabled for an agency, the app runs that extension's migrations. A manual Run Migrations action is also available for enabled extensions. If the extension is disabled at agency level, the app disables that extension for all streams under the agency.

Agency extensions can also expose a configuration screen. If an extension provides a custom agency config component, the modal renders it; otherwise it renders JSON text. Agency config is appropriate for non-secret settings that apply across the agency.

## Stream configuration

Stream configuration is available only when the extension is enabled for the agency. The stream Extensions tab lists agency-enabled extensions, allows stream enablement, and opens configuration.

Most extensions use a full-screen configuration modal. If the extension provides a custom stream config component, the modal renders it; otherwise it renders JSON text.

An extension can instead declare `admin.streamConfigPage`. In that case the Configure action opens a dedicated full-page configuration route with the program, stream, agency, extension metadata, current config, and host layout flag. Use full-page configuration when the setup needs more space, nested tables, credential setup, or a workflow that does not fit well in a modal.

The app rejects configuration for unknown extensions, disabled agency extensions, invalid JSON, and known extension-specific invalid states. When narrative quality is enabled for a stream with no configured target, the app defaults the agreement-level target on so the extension has a visible runtime surface.

## Runtime slots

Runtime slots are named places in existing pages where an enabled extension can render extra content. Supported slots include text-area after-slots, agreement description slots, agreement profile field/section slots, and proponent description slots.

For stream context, both agency enablement and stream enablement must be true. For agency-only context, the extension can render when the agency is enabled or when its runtime resolver explicitly returns an enabled resolution.

## Entity tabs

Extensions can add tabs to agreements, proponents, claims, and monitors. A tab appears only when the extension is enabled for the relevant agency or stream and the user has the required access.

Proponent tabs require agency enablement and use empty config by default because proponents are not stream-scoped.

## Operator Responsibilities

| Responsibility | Guidance |
| --- | --- |
| Enable extensions at agency level first | Stream configuration is unavailable until the agency switch is on. |
| Configure streams deliberately | Stream settings can change agreement, payment, or review behavior. |
| Run migrations when prompted | Extension-owned data structures must be ready before runtime use. |
| Test runtime pages after enablement | Confirm new tabs, slots, actions, and calculators appear only where expected. |
| Disable with care | Disabling an agency extension also disables it for streams under that agency. |

## Create actions and calculators

Extensions can add create actions for agreement commitments and payments. They can also add payment amount calculators. The host detects conflicts when more than one replace-style create action or more than one payment calculator is available for the same operation.

Installed financial extensions can also add agreement tabs with their own totals. For example, the outcome cost allocation tab shows allocated and unallocated amounts by allocation version, commitment type, and fiscal year so users can see whether the agreement program funding has been fully allocated.

## Data and migrations

Extension-owned data can be stored separately from core GCS records. Deleting extension-owned key-value data follows the same soft-delete expectation as the rest of the application.

Extension config and extension key-value data are not secret stores. Config can be rendered in browser-side admin components, and KV entries are ordinary JSON state. Private keys, API tokens, refresh tokens, signing secrets, and similar values belong in the SDK encrypted secret store, which is backed by separate encrypted storage and a deployment-managed `GCS_EXTENSION_SECRETS_KEY`. Secret metadata may be displayed for administration, but decrypted secret values are server-only.

## GC Forms integration

The GC Forms integration is an installed extension that can connect GC Forms submissions to GCS field mappings. Agency configuration stores credential metadata and encrypted private keys. Stream configuration stores the selected credential, GC Forms endpoint details, form id, confirmation behavior, and destination mappings.

The current materializer is claims-first: it can create submitted agreement claims and optional submitted claim line items, then link the generated GCS records back to the GC Forms submission. Imported lines without a valid budget-line match remain unallocated and can be assigned to a compatible agreement budget line while the claim is submitted. Sync checks the saved GC Forms template shape before reading submissions; if the live form shape changed, users must refresh the template, review mappings, save configuration, and run sync again. Unsupported destinations are then handled per submission after fetch, decryption, and integrity verification. The extension persists the normalized answers, attachments, and a stable `unsupported_destination` issue for each unsupported mapping, skips claim creation and confirmation for that submission, and continues processing the run.

For configuration and recovery details, see [GC Forms Integration](../extensions/gc-forms.md).
