# Extensions

Extensions add local, versioned functionality to GCS-SSC. They can add stream configuration, extra tabs, extra page sections, specialized create actions, payment amount calculators, extension-owned data, and bilingual messages.

## Registration

Installed extensions are discovered when the application starts. Administrators do not create extension definitions in the UI; they enable and configure extensions that have already been installed with the application.

## Agency enablement

Agency enablement is the first operational switch. Users need agency read access to view extension state and agency update access to enable or disable an extension.

When an extension is enabled for an agency, the app runs that extension's migrations. A manual Run Migrations action is also available for enabled extensions. If the extension is disabled at agency level, the app disables that extension for all streams under the agency.

## Stream configuration

Stream configuration is available only when the extension is enabled for the agency. The stream Extensions tab lists agency-enabled extensions, allows stream enablement, and opens a full-screen configuration modal. If the extension provides a custom stream config component, the modal renders it; otherwise it renders JSON text.

The app rejects configuration for unknown extensions, disabled agency extensions, invalid JSON, and known extension-specific invalid states such as enabling narrative quality without any enabled runtime target.

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

## Data and migrations

Extension-owned data can be stored separately from core GCS records. Deleting extension-owned key-value data follows the same soft-delete expectation as the rest of the application.
