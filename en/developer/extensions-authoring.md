# Authoring extensions

An extension is a code package that adds features to a GCS-SSC deployment, such as tabs, fields, payment calculators, or action buttons. GCS-SSC discovers the package during the Nuxt build. Extensions let a deployment add features without changing the core screens for other deployments.

This reference describes the public contracts for extension developers. For configuration in the application, see [Extensions](../concepts/extensions.md) and the agency and stream Extensions tabs.

## Authoring contract

The host is the main GCS-SSC application. The software development kit, or SDK, provides the supported types, functions, and components for extensions. These public contracts define what the host and extension must provide, without depending on host internals.

Import SDK contracts from `@gcs-ssc/extensions`, server helpers from `@gcs-ssc/extensions/server`, UI wrappers from `@gcs-ssc/extensions/ui`, and test helpers from `@gcs-ssc/extensions/testing`. Do not import host internals such as `~~/server`, `~~/shared`, `~/`, or `#imports` for extension-owned contracts.

For standalone Nuxt typechecking, import `@gcs-ssc/extensions/nuxt` once from an ambient `.d.ts` file included by the extension's TypeScript configuration. This entry point supplies type declarations for host globals; runtime UI code must still use the SDK wrappers and must not reference host component names directly.

| Contract | Use |
| --- | --- |
| `defineGcsExtension` | Defines the extension manifest. |
| `GCS_EXTENSION_SDK_VERSION` | Current host SDK version for manifest compatibility. |
| `GcsExtensionJsonConfig` | Stream configuration JSON shape. |
| `GcsClientExtensionManifest` | Client-safe manifest passed to extension UI components. |
| `ExtensionEntityTabContext` | Props for entity tab components. |
| `defineGcsExtensionRouteHandler` | Adapts a route to the stable SDK request context. |
| `defineGcsExtensionNitroPlugin` | Defines a Nitro plugin without importing host globals. |
| `defineGcsExtensionMigration` | Wraps Kysely migrations owned by the extension. |
| `registerGcsExtensionCreateOperationHandler` | Hooks core commitment/payment create operations. |
| `createGcsExtensionUserError` | Raises localized, user-facing extension errors from server code. |
| KV helpers | Store extension-owned non-secret state by owner type, owner id, and key. |
| Encrypted secret helpers | Store sensitive values in host-managed encrypted secret storage. |
| UI wrappers and clients | Render host UI safely and call extension or host APIs from extension components. |

## Package shape

An extension package keeps its declaration, screens, server code and tests together. A typical extension has:

| File or folder | Purpose |
| --- | --- |
| `extension.config.ts` | Required manifest exported with `defineGcsExtension`. |
| `components/` | Vue components for admin config, runtime slots, entity tabs, create actions, or calculators. |
| `server/api/` | Extension server handlers exposed through the host dispatcher. |
| `server/migrations/` | Extension-owned migrations. |
| `server/plugins/` | Nitro plugins for create-operation hooks. |
| `server/runtime.ts` | Optional runtime resolver that can decide slot enablement dynamically. |
| `client/` or assets folder | Static files mounted by the extension manifest. |
| `i18n/` | Optional English/French message files. |
| `tests/` | Unit tests for config parsing, route helpers, UI, and business logic. |

## Manifest fields

The **manifest** is the extension’s declaration file. It tells the host the extension’s identity, the features it needs and where to find its components. For example, an extension that adds risk notes to an Agreement needs a tab and a server route to save those notes; both must be declared.

```ts
import { defineGcsExtension } from '@gcs-ssc/extensions'

export default defineGcsExtension({
  key: 'gcs-example',
  sdkVersion: '^0.3.19',
  requiredHostCapabilities: [
    'stream-config-modal',
    'server-handlers',
    'server-handler-rbac',
    'extension-api-client'
  ],
  name: { en: 'Example', fr: 'Exemple' },
  description: {
    en: 'Adds local behaviour.',
    fr: 'Ajoute un comportement local.'
  }
})
```

| Field | Rule |
| --- | --- |
| `key` | Stable extension key. Use lowercase kebab-case and never change it after data exists. |
| `sdkVersion` | Required compatible SDK version range, such as `^0.3.19`. The host rejects unsupported versions. |
| `requiredHostCapabilities` | Required list of host capabilities used by the manifest or implementation. Use an empty list only when none are needed. See the discovery-inference limits below. |
| `name` | Required bilingual display name. |
| `description` | Optional bilingual description for admin screens. |
| `admin` | Agency config, stream config modal, or stream config page components. |
| `client` | Runtime slots, entity tabs, create actions, and payment calculators. |
| `css`, `assets` | Optional client styling and static assets. Messages belong to an extension-owned SDK catalogue, not a manifest `i18n` contribution. |
| `serverHandlers` | Authenticated extension routes exposed through the host dispatcher. |
| `migrations` | Kysely migrations run when the extension is enabled or migrations are requested. |
| `runtime` | Optional resolver for slot enablement and config resolution. |
| `nitroPlugin` | Optional server plugin for hooks such as create-operation interception. |

The host validates component, handler, asset, and migration paths so they stay inside the extension package.

## Supported capabilities

A **capability** is a host feature that the extension needs. Declare every required capability. During Nuxt discovery, the host identifies features described by the `admin`, `client`, `serverHandlers`, `migrations`, `runtime`, `assets`, and `nitroPlugin` manifest fields. It rejects features that need an undeclared capability, and rejects unknown capabilities.

The host does not inspect imports or function calls. Declare capabilities used only in code too, such as API clients, KV helpers, secret helpers, and create-operation hooks.

| Capability | Use |
| --- | --- |
| `configuration-access` | Set the minimum configuration role to Contributor or Manager. |
| `agency-only-configuration` | Configure once at Agency scope, without stream editors. |
| `file-storage-provider` | Register the host file-storage adapter and metadata contract. |
| `agreement-number-provider` | Generate a number inside the host Agreement creation transaction. |
| `agency-config` | Agency admin configuration component. |
| `stream-config-modal` | Stream configuration rendered in the stream Extensions modal. |
| `stream-config-page` | Full-page stream configuration route through `admin.streamConfigPage`. |
| `entity-tabs` | Agreement, Proponent, Claim, Monitor, Opportunity or Payment tabs. |
| `textarea-slots` | Runtime slot components in supported host page locations. |
| `create-actions` | Extension create actions for agreement commitments or payments. |
| `payment-amount-calculators` | Payment amount calculator components. |
| `server-handlers` | Extension API routes under `/api/extensions/{extensionKey}`. |
| `server-handler-rbac` | Host-resolved RBAC/entity context for server handlers. |
| `migrations` | Extension-owned database migrations. |
| `runtime-resolution` | Extension runtime resolver for slot availability/config. |
| `public-assets` | Static assets mounted by the host. |
| `extension-ui` | Host-provided UI wrappers and runtime components. |
| `extension-api-client` | `useExtensionApi` or extension API client helpers. |
| `host-api-client` | `useHostApi` or stable host API client helpers. |
| `extension-kv` | Extension key-value helpers for non-secret JSON state. |
| `extension-secrets` | Encrypted extension secret helpers. |
| `extension-create-operation-hooks` | Create-operation Nitro hooks. |
| `extension-lifecycle-hooks` | Lifecycle/create hooks exposed through extension integration. |
| `lifecycle-entities` | Extension business entities participating in host Completion, Workflow, direct-Review, assignment, and typed-identity infrastructure. |

## Lifecycle entity declarations

A **lifecycle entity** is a business record created by an extension that uses the host’s completion, approval and assignment rules. For example, an extension-owned record may need to be completed and approved under an Agreement. The extension describes the record; the host controls permissions and records the lifecycle history.

Use the SDK lifecycle contracts when an extension-owned business entity needs host lifecycle management. Add `lifecycle-entities` to `requiredHostCapabilities`. Each local type declares:

- Nonempty bilingual labels.
- `completion` set to `supported` or `none`.
- `approvalSubmission` set to `on_completion` or `none`.
- `standardWorkflow: 'explicit'` and direct-Review support.
- `ownerKind` set to `agreement` or `proponent`.
- `assignmentMode` set to `independent` or `inherited`.
- A server adapter path inside the package.

The host identifies each type as `<extension-key>:<local-type>`, so two extensions can use the same local type name without sharing an identity.

The adapter resolves and locks the concrete entity, owner, scope, and business status and implements completion validation and any effect required when the process ends successfully. That effect must produce the same result for the same inputs. The adapter does not authorize requests, select lock order, weaken the declared ownership/assignment model, or create lifecycle evidence itself. Installation synchronizes the immutable declaration into `Common_Entity_Type`; an extension migration then uses `attachGcsLifecycleEntityIdentity(...)` to attach its concrete table to `Common_Entity`. Renaming or changing an installed declaration is rejected while identities or lifecycle history exist.

Host reads require Viewer at the resolved owner. Create requires Contributor plus the declared creation-parent assignment. Update, Completion, Workflow start, retry, cancellation, and transition require Contributor plus the exact declared assignment root. Delete requires Manager plus that assignment.

Independent entities create their assignment list, with the creator as primary user, in the same operation as the record. Inherited entities resolve their parent’s assignment list every time. Extension enablement remains an additional gate.

Managing the assignment roster uses the scoped Manager grant without requiring the Manager to be assigned to that record. The host rejects roster changes after Completion evidence exists or when the business status is read-only or terminal. This exception does not grant ordinary record mutation rights.

Completion records `not_applicable`, `no_workflow`, or `workflow_started` at creation time. A required missing Workflow is a conflict and rolls back; a `no_workflow` completion cannot gain a Workflow later. Retry creates a new attempt using the same published versions as the earlier attempt. Hooks for successful process endings (positive-terminus hooks) run inside the host transaction after `no_workflow`, `succeeded`, or `approved`; they must be deterministic, retry-safe, and free of external side effects that cannot roll back.

## Configuration scope and access

The public SDK version used here is 0.3.19. Declare `configuration-access` when setting `configurationAccess` to `contributor` or `manager`; Contributor is the default. This sets the minimum role required to enable the extension and edit its JSON configuration. Permissions for everyday work and exact record assignments are checked separately.

An extension with `configurationScope: 'agency'` declares `agency-only-configuration`. It has Agency enablement/configuration only and cannot declare stream configuration editors. This is useful for one Agency numbering service shared across streams. An extension without that declaration retains the Agency-plus-stream enablement model.

## File-storage provider contract

A **file-storage provider** connects the application to the service that stores uploaded files, templates and generated documents. Officers still use the host’s attachment screens and permissions. The provider implements storage behind those screens; it does not decide who may access a file.

Declare `file-storage-provider` and one `fileStorageProvider` contribution. The containing extension key is the permanent provider identity; do not rename it after storing objects.

```ts
// Fragment within defineGcsExtension(...)
fileStorageProvider: {
  adapter: { path: './server/storage.ts' }
}
```

The default export from that module uses `defineGcsFileStorageProviderAdapter` from the server SDK. Implement `writeObject`, `readObject`, and `deleteObject`; optionally normalize Agency configuration with `validateAgencyConfig`.

| Operation | Contract |
| --- | --- |
| Write | Receive host-generated object name, bytes, content type, Agency, purpose, optional typed target, configuration, scoped secret reader, and optional provider metadata. Return `{ objectId, locator }`. |
| Read | Resolve the recorded object ID and locator (provider-specific information used to find the object) and return `{ bytes, contentType? }`. Never depend on the currently selected provider for a different object. |
| Delete | Succeed when the object is already absent. Cleanup can repeat after a crash or expired lease. |

Object IDs are stable nonempty strings limited to 512 UTF-8 bytes, not temporary access URLs. The host bounds the server-only locator JSON object to 32 KiB and provider metadata to 15 KiB. Do not put credentials in browser metadata or assume an object name is a filesystem path. Purposes are `attachment`, `document-template`, and `generated-document`.

The host owns attachment metadata, typed target links, authorization, assignment, and business-status protection. The provider owns only its storage operations and declared metadata behavior. There is no local fallback if the selected or recorded provider is unavailable. One Agency selects one provider for new writes; existing objects remain linked to the provider that stored them. Host guards prevent disabling selected or referenced providers, and startup rejects missing referenced implementations.

Optional `metadata` declares a client component, server validator path, `persistence` (`host` or `provider`), `mutability` (`upload-only` or `editable`), and a positive integer `contractVersion`. Values stored by the host are kept separately for each provider. Provider-persisted values require `readProviderMetadata` and `updateProviderMetadata`. Updates require a compatible stored contract and cannot combine provider-owned metadata with host fields in one PATCH. Before an external update, the host reserves recovery work to restore the previous state if the database save fails. See [Attachments](../concepts/attachments.md) and [Background work](../operator/background-work.md) for user-visible partial saves and worker recovery.

## Agreement-number provider contract

This provider fills in an Agreement number during creation. For example, an Agency may use the sequence `ABC-0000123` across its Streams so officers do not enter numbers manually. The developer must make number allocation safe when two officers create Agreements at the same time.

Declare `agreement-number-provider` and `agreementNumberProvider: { path: './server/number.ts' }`. Its default export implements `GcsAgreementNumberProvider` and returns only the Agreement number. The host still authorizes creation, validates profile data, resolves the program/stream and selected proponents, creates the Agreement, and assigns its creator.

The provider receives the active host transaction, `agencyId`, `programId`, `streamId`, stream configuration, Agency configuration, and stable creation-time `sources`. Source names include `agreement.title_en`, `agreement.title_fr`, assistance dates, financial-system number, and bilingual Agency/program/stream names and abbreviations. They are explicitly language-qualified, not selected from the request locale.

A valid result is already trimmed, nonempty, at most 15 Unicode characters, and contains no NUL. Multiple enabled providers for the same creation scope produce `AGREEMENT_NUMBER_PROVIDER_CONFLICT`; an invalid result produces `INVALID_GENERATED_AGREEMENT_NUMBER`. With no provider the host keeps manual numbering. The mode lookup is advisory; creation resolves and validates the provider again inside the protected operation.

For example, a provider can allocate an Agency-wide sequence inside the supplied transaction and format `ABC-0000123`. It must implement its own concurrency-safe allocation; a client-side count of existing Agreements is not an allocator. A `configurationScope: 'agency'` provider applies across that Agency’s streams without separate stream activation. Counter design and configuration UI belong to the extension’s own documentation.

## Stream configuration

Use `admin.agency` when the extension needs agency-wide non-secret settings:

```ts
admin: {
  agency: {
    path: './components/ExampleAgencyConfig.vue'
  }
}
```

Agency config components receive the current JSON config with `v-model`, plus `extension` and `agencyId` props. Store sensitive values through extension server handlers and encrypted secret helpers instead of putting them in agency config.

Use `admin.streamConfig` when the extension needs a stream configuration component displayed in a modal (a dialog over the current page):

```ts
admin: {
  streamConfig: {
    path: './components/ExampleStreamConfig.vue'
  }
}
```

Use `admin.streamConfigPage` when the configuration needs a dedicated full page:

```ts
admin: {
  streamConfigPage: {
    path: './components/ExampleStreamConfigPage.vue'
  }
}
```

Stream config components receive the current JSON config with `v-model` and stream context props:

```vue
<script setup lang="ts">
import type { GcsExtensionJsonConfig } from '@gcs-ssc/extensions'
import type { GcsStreamConfigComponentProps } from '@gcs-ssc/extensions/ui'

defineProps<GcsStreamConfigComponentProps>()

const config = defineModel<GcsExtensionJsonConfig>({ required: true })
</script>
```

Full-page components also receive `hostLayout: true` and can use the page space for complex setup. Modal components should keep their layout compact.

| Rule | Behaviour |
| --- | --- |
| Config must be JSON-safe | Store primitives, arrays, and objects only. |
| Config is not secret storage | Store references to credentials, not credential values. Use encrypted secret helpers for secrets. |
| Agency enablement comes first | Stream config is unavailable until the extension is enabled for the agency. |
| Components must tolerate optional IDs | Older or non-page contexts may omit `transferPaymentId` or `agencyId`. |
| Validate before save | Reject incomplete combinations in the component or server-side stream config validation. |
| Keep config versionable | Add explicit version fields when config shape may change. |

## Runtime slots

A **slot** is a place in an existing host page where an extension can display its own component. For example, the risk-management slot can show extra fields alongside the Agreement’s existing risk information. Supported slot names are:

| Slot | Host area |
| --- | --- |
| `textarea.after` | Generic text-area after-slot. |
| `agreement.descriptions.after` | Agreement English/French description area. |
| `agreement.profile.classification.fields` | Agreement classification section. |
| `agreement.profile.profile.fields` | Agreement profile section. |
| `agreement.profile.risk-management.fields` | Agreement risk management section. |
| `agreement.profile.sections.after` | After agreement profile sections. |
| `proponent.descriptions.after` | Proponent English/French description area. |
| `bilingual-field.after` | Scoped paired-language fields; receives live field models, labels and explicit authorization context. |
| `payment.evidence` | Payment detail evidence; receives retained evidence and effective access context. |

```ts
client: {
  slots: [
    {
      slot: 'agreement.profile.risk-management.fields',
      path: './components/AgreementRiskFields.vue'
    }
  ]
}
```

Slot components should be visually quiet and should not duplicate host-owned fields. When a slot writes extension-owned data, store it under the extension key so multiple extensions cannot overwrite each other.

## Entity tabs

An entity tab gives officers a separate view on an existing record, such as the Risk notes tab below. Entity tabs can target `agreement`, `proponent`, `claim`, `monitor`, `opportunity` or `payment`. Opportunity uses the `transfer_payment` subject; Payment remains in the `agreement` domain.

```ts
client: {
  tabs: [
    {
      target: 'agreement',
      id: 'risk-notes',
      label: { en: 'Risk notes', fr: 'Notes de risque' },
      icon: 'i-lucide-database',
      path: './components/AgreementRiskNotesTab.vue',
      rbac: { subject: 'agreement', action: 'update' }
    }
  ]
}
```

Tab components receive:

| Prop | Contents |
| --- | --- |
| `extensionKey` | Extension key from the manifest. |
| `context` | Context depends on the target type. Ordinary targets include the resolved Agency, owner and scope. Proponent includes `applicantRecipientId`, owner identity and an authorized `agencies` list rather than one Agency/scope. |
| `config` | Resolved stream or agency extension config. |
| `rbac` | The tab's declared RBAC requirement. |

| Rule | Behaviour |
| --- | --- |
| Tab ids are unique per target | Use lowercase kebab-case ids. |
| Tabs require enablement | Agreement, claim, and monitor tabs require agency and stream enablement; proponent tabs require agency enablement. |
| Tabs require RBAC | The host checks the declared subject/action before rendering. |
| Proponent Agency contexts | The host returns authorized active Agencies with enablement/configuration in `context.agencies`; no lead-Agency picker is required. An explicit `agencyReadRequired` can further narrow availability. |

## SDK UI boundary

SDK UI wrappers are supported versions of the host’s interface components. Composables are reusable functions for tasks such as loading data or showing a notification.

Import host-provided wrappers and composables from `@gcs-ssc/extensions/ui`. Do not import `~/`, `~~/`, `#imports`, `#app`, or `#gcs-*`, and do not use host component names directly in an extension template. Wrappers such as `ExtensionButton`, `ExtensionFormField`, `ExtensionSaveButton`, and `ExtensionTable` preserve host behaviour behind a versioned contract.

Common exports include `ExtensionButton`, `ExtensionFormField`, `ExtensionInput`, `ExtensionSelect`, `ExtensionTable`, `ExtensionResourceLayoutCard`, `ExtensionSection`, `ExtensionSaveButton`, and `ExtensionStatusBadge`.

Use `useExtensionApi(extensionKey)` for extension routes and `useHostApi()` for stable host routes. Declare `extension-api-client` or `host-api-client` in `requiredHostCapabilities` as applicable; do not assemble `/api` URLs or call `fetch` directly from components. The UI entry point also provides typed host integrations:

| Helper | Contract |
| --- | --- |
| `useExtensionConfirmDialog` | Typed asynchronous confirmation options and boolean result. |
| `useExtensionFetch<T>` | Reactive data, status, pending, error, and refresh refs. |
| `useExtensionGroupedTableExpansion<Row>` | Shared grouping, expansion, row, and visibility state. |
| `useExtensionI18n(messages)` / `useExtensionToast` | Extension-owned messages with host locale/number formatting, and notifications. |

The host installs the concrete UI runtime. Standalone tests can install SDK test stubs instead of mounting host internals.

## Server handlers

**RBAC** means role-based access control: the host checks whether the user’s role allows the declared action on the relevant record. Showing a tab or button does not replace this server-side check.

A server handler receives a request from an extension screen and performs server-side work, such as saving a risk note. An endpoint is the address used to send that request. Use `serverHandlers` for authenticated extension endpoints:

```ts
serverHandlers: [
  {
    route: '/agreements/[agreementId]/risk-notes',
    method: 'post',
    path: './server/api/risk-notes.post.ts',
    rbac: {
      subject: 'agreement',
      action: 'update',
      entity: {
        target: 'agreement',
        param: 'agreementId'
      }
    }
  }
]
```

Handler files should use `defineGcsExtensionRouteHandler`:

```ts
import { defineGcsExtensionRouteHandler } from '@gcs-ssc/extensions/server'

export default defineGcsExtensionRouteHandler(async ({ db, params, config, entity, readBody }) => {
  const body = await readBody<{ note?: string }>()
  return { ok: true, agreementId: params.agreementId, config, entity, body, dbAvailable: Boolean(db) }
})
```

The stable route context contains `db`, `params`, `auth`, `config`, `entity`, `stream`, `agency`, `authorizedScope`, `writeAuthorization`, `agreementAccess`, `readBody`, and `getHeader`. `context.event` remains available as an escape hatch, but normal handlers should not read host H3 internals directly.

| Rule | Behaviour |
| --- | --- |
| Declare RBAC for entity data | The host resolves the entity from the route param, checks extension enablement, passes config/context, and enforces the declared subject/action. |
| Keep route params explicit | The `entity.param`, `stream.param`, or `agency.param` value must match a route param name. |
| Use `auth: "manual"` only deliberately | Manual handlers must perform their own domain authorization; they cannot combine `auth: "manual"` with `rbac`. |
| Throw `GcsExtensionUserError` for user-facing failures | Supply bilingual extension-owned messages; the server selects the request language before returning the error. |
| Validate all input | Extension handlers are responsible for request validation. |
| Do not bypass host ownership | Always resolve agreement, proponent, claim, monitor, stream, and agency ownership before writing when the host has not already done so. |

Manual handlers that resolve stream ownership must call `resolveExtensionStreamContext(db, streamId)` to resolve the active ownership chain. It returns `agencyId`, `profileId`, `streamId`, and the canonical entity scope only when the stream, its transfer payment profile, and its owning agency are all active; treat `null` as unavailable and stop the operation.

Protected extension writes use the host-provided `writeAuthorization` protocol. It checks current permissions in two phases. This keeps permission-table locks before extension or entity locks and allows a request to be rejected if access changes while it waits. A write handler must reject a missing protocol before entering transactional business logic:

```ts
import { defineGcsExtensionRouteHandler } from '@gcs-ssc/extensions/server'

export default defineGcsExtensionRouteHandler(async context => {
  const writeAuthorization = context.writeAuthorization
  if (!writeAuthorization) {
    throw new Error('Transaction-bound extension authorization is required for this write.')
  }

  // Inside the extension-owned transaction:
  // await writeAuthorization.lockAuthState(trx)
  // Acquire agency/stream lifecycle locks and any required entity locks.
  // const authorizeCurrentScope = writeAuthorization.authorizeCurrentScope
  // if (authorizeCurrentScope) {
  //   await authorizeCurrentScope(trx)
  // } else {
  //   await writeAuthorization.authorizeCurrentEntity(trx)
  // }
  // Re-read protected state and perform the write only after both phases.
})
```

The required order is `lockAuthState(trx)`, registered agency/stream lifecycle locks, required extension/entity locks, current-scope or current-entity authorization, then protected reads and writes. Prefer `authorizeCurrentScope`; `authorizeCurrentEntity` remains the compatibility fallback. Treat a missing protocol, a rejected phase, or scope drift as fatal and let the error leave the transaction callback so every protected write rolls back.

Routes that expose agreement choices must call `context.agreementAccess.listVisibleOptions(db, { streamId, action })`; the host applies scoped role visibility for reads and scoped role plus exact assignment for updates, and returns active agreements only. When a transaction writes an agreement-owned record selected through such a route, require `writeAuthorization.lockAndAuthorizeAgreement` and call it after lifecycle locks and current-route authorization. A missing callback is fatal. The host locks the agreement, re-resolves its active stream, and performs fresh agreement authorization in the same transaction. A `false` result means that the agreement is inactive or no longer belongs to the requested stream; authorization denial is thrown.

## Create actions

A create action is a button or command that starts creation. For example, Generate payments can provide an extension’s creation screen in the Agreement Payments tab. Extensions can add or replace create actions for:

| Operation | Host surface |
| --- | --- |
| `agreement.commitments.create` | Agreement Commitments tab. |
| `agreement.payments.create` | Agreement Payments tab. |

```ts
client: {
  createActions: [
    {
      operation: 'agreement.payments.create',
      id: 'generate-payments',
      mode: 'replace',
      label: { en: 'Generate payments', fr: 'Générer les paiements' },
      icon: 'i-lucide-wand-sparkles',
      path: './components/GeneratePaymentsAction.vue',
      rbac: { subject: 'agreement', action: 'update' }
    }
  ]
}
```

| Mode | Behaviour |
| --- | --- |
| `append` | Keeps the host Add button and adds the extension action beside it. |
| `replace` | Hides the host Add button when exactly one enabled replacement exists. |

If more than one enabled extension replaces the same operation, the host blocks the action until configuration is fixed. Create action components receive the operation, context, config, label, icon, RBAC requirement, and an `onCreated` callback. Call `onCreated()` after successful creation so the host refreshes the table.

A **hook** is code the host calls at a defined point in an operation. Server-side create hooks belong in a Nitro plugin (a module loaded by the application server):

```ts
import {
  defineGcsExtensionNitroPlugin,
  registerGcsExtensionCreateOperationHandler
} from '@gcs-ssc/extensions/server'

export default defineGcsExtensionNitroPlugin(nitroApp => {
  registerGcsExtensionCreateOperationHandler(
    'gcs-example',
    'agreement.payments.create',
    async context => ({ status: 'continue' }),
    nitroApp
  )
})
```

| Hook result | Behaviour |
| --- | --- |
| `continue` or no result | Core creation continues. |
| `handled` | Extension supplies the response and core creation stops. |

When a create hook blocks a user-correctable action, throw `createGcsExtensionUserError` with bilingual `message` and `details` values. The host resolves those messages using the request language and returns them through the normal API error shape.

## Payment amount calculators

Payment calculators supply a suggested amount, ceiling, currency, explanation, loading state, and extension data for `agreement.payments.create`. For example, a calculator can explain the maximum payment before an officer saves. The server must still validate the amount. Only one enabled calculator can apply to payment creation at a time.

| Rule | Behaviour |
| --- | --- |
| Calculator must match the operation | The current host supports agreement payment creation. |
| Calculator must be unique for the operation | Conflicting enabled calculators block the host form. |
| Ceiling is enforced in the form | The user cannot save an amount above the calculator ceiling. |
| Server validation is still required | Recheck generated amounts before writing records. |

## Migrations, KV, and secrets

A **migration** creates or changes database tables for the extension. **KV** means key-value storage: simple saved values identified by a key. A **secret** is a sensitive value, such as an external service password or API token. Keep secrets in encrypted storage, separate from ordinary settings.

```ts
import {
  defineGcsExtensionMigration,
  setEncryptedExtensionSecret,
  getEncryptedExtensionSecret,
  deleteEncryptedExtensionSecret
} from '@gcs-ssc/extensions/server'
```

| Storage | Use |
| --- | --- |
| Migrations are extension-owned | Use the `extensions` schema and extension-specific table names. |
| Migration paths are listed in the manifest | The host runs listed migrations for enabled extensions. |
| Standard package imports are allowed | Migration files can import runtime dependencies such as `kysely`; the host resolves them from the application install. |
| Migration history is per extension | Each extension uses its own migration history and lock tables, so pending migrations are tracked independently. |
| KV helpers | Store simple non-secret JSON state by owner type, owner id, and key. KV entries are soft-deleted. |
| Encrypted secret helpers | Store sensitive JSON values such as private keys, API tokens, refresh tokens, signing secrets, or external-service credentials. |
| Prefer explicit tables for complex workflows | Use migrations when the extension needs reporting, relationships, workflow states, or large records. |

Encrypted secrets use the `extensions.secret_entry` table and AES-256-GCM. Values are bound to extension key, owner type, owner id, secret key, and key version. Metadata can store non-sensitive listing fields such as a label or masked suffix.

The host root encryption key is `GCS_EXTENSION_SECRETS_KEY`, a base64-encoded 32-byte deployment secret. Do not store it in extension config, KV, source control, seed data for real environments, or browser-visible runtime config.

Encrypted secret helpers are exposed from `@gcs-ssc/extensions/server`: `setEncryptedExtensionSecret`, `getEncryptedExtensionSecret`, and `deleteEncryptedExtensionSecret`.

## Lifecycle locks and guards

A **transaction** is a group of database changes that either succeed together or are undone together. A **lock** prevents conflicting work from changing protected state at the same time. A **guard** rejects an operation that would break a business rule. For example, a guard can block deletion of an Agreement whose extension-owned history must remain available.

Extensions that generate durable records from configuration must coordinate with host lifecycle changes. All lifecycle helpers require an active Kysely `Transaction`; passing a root `Kysely` client is intentionally a type error because transaction advisory locks would be released after each statement.

After `writeAuthorization.lockAuthState(trx)`, call `lockGcsExtensionLifecycleScope(trx, extensionKey, agencyId, streamId)` before extension/entity locks. The canonical domain order is agency scope, stream scope, then extension-specific or entity locks. Re-read configuration after locking, call `authorizeCurrentScope(trx)` or its `authorizeCurrentEntity` compatibility fallback, and only then read or mutate protected state.

Register lifecycle hooks from `defineGcsExtensionNitroPlugin`:

| Registration | Use |
| --- | --- |
| `registerGcsExtensionDisableGuard` | Reject agency or stream disablement when extension-owned state still requires runtime support. |
| `registerGcsExtensionAgreementLifecycleLock` | Acquire extension agreement locks before the host agreement row lock. |
| `registerGcsExtensionAgreementStreamChangeGuard` | Reject a stream move that would invalidate extension-owned state. |
| `registerGcsExtensionAgreementDeleteGuard` | Reject agreement deletion while extension-owned history or generated provenance must be preserved. |
| `registerGcsExtensionAgreementPaymentMutationGuard` | Validate payment and payment-line updates, deletes, and status changes inside host transactions. |

The host runs an agreement-delete guard after extension lifecycle locks are acquired and before it deletes the agreement, inside the same host transaction. The guard must read protected extension state through the supplied transaction and throw an error to reject deletion; the error propagates so the agreement deletion and every related write roll back together. Do not defer the check or query through a root database client.

Guards should throw localized extension user errors for correctable business conflicts. For the same inputs, guards must produce the same result. They must use the supplied transaction and remain safe when host routes call them outside the extension UI.

## Assets and i18n

**Assets** are files shipped with the extension, such as images or model files. **I18n** means internationalization: supplying the right language and number formatting. Officers must receive understandable labels and errors in both English and French.

| Feature | Manifest field | Guidance |
| --- | --- | --- |
| Static extension assets | `assets` | Mount only files needed at runtime; choose a unique `baseURL`. |
| Package assets | `assets.package` and `packagePath` | Useful for model files or bundled third-party assets. |
| Bilingual messages | Package-owned catalogue | Define matching English/French keys with `defineGcsExtensionMessages`; import the catalogue into the extension. |
| CSS | `css` | Keep styles scoped and avoid overriding host design tokens globally. |

### Extension-owned messages

```ts
import { defineGcsExtensionMessages } from '@gcs-ssc/extensions'
import { useExtensionI18n } from '@gcs-ssc/extensions/ui'

const messages = defineGcsExtensionMessages({
  en: { 'files.count': '{count} files' },
  fr: { 'files.count': '{count} fichiers' }
})
const { t, locale, n } = useExtensionI18n(messages)
const label = t('files.count', { count: 3 })
```

The SDK checks that both languages have exactly the same message keys and placeholders, such as `{count}`. It makes an independent, unchangeable copy of the catalogue and looks up only that catalogue’s keys. Missing keys or interpolation values throw; there is no fallback to host translation keys, linked messages, or host-wide message registration. Use the reactive locale for localized display and `n` for number formatting. Server `createGcsExtensionUserError` messages and detail messages should supply `{ en, fr }`; plain strings are already resolved text, not host i18n keys.

## Bounded external operations

The host sets a time limit for selected extension operations, including Proponent profile-update hooks, storage configuration validation, provider-metadata updates, and metadata restoration. `GCS_EXTENSION_OPERATION_TIMEOUT_MS` defaults to 10,000 ms with a minimum of 100 ms. Provider-managed metadata reads and updates receive the optional `signal` in their operation context. The callback receives an `AbortSignal`; pass it to cancellable downstream work and stop when aborted. The deadline rejects the host wait, but cannot forcibly undo an external side effect from a callback that ignores the signal.

Keep transactional guards on the supplied transaction, make remote work idempotent (repeating the same request must not create a duplicate effect), and distinguish a failed database write from a provider operation whose result is uncertain. A Proponent update timeout returns `EXTENSION_OPERATION_TIMEOUT` (503). Reload the record and reconcile any external effect before retrying; a timeout alone is not proof that a remote service did nothing. Storage metadata recovery uses the compensation path described in [Attachments](../concepts/attachments.md). This limit does not apply universally to every extension handler or document-rendering operation.

## Agency workspaces and detail pages

An Agency workspace groups extension screens for an Agency. A detail page shows one record selected from an Agreement tab, such as an allocation. These screens must keep the same owner and access rules as the records they display.

Declare `agency-workspace` and `agency-workspace-navigation` with `admin.agencyWorkspace` and an `admin.agency` component. Supply a bilingual workspace label, nonempty tabs with unique lowercase IDs and bilingual labels, and `navigation: { category: 'management', order: 40 }`. The category must be `management` or `administration`, and the order must be a signed safe integer. Lower orders appear first within the category. Equal orders use the stable destination ID `extension:<extension-key>`, independent of language or discovery order. Missing navigation is a build error. The host exposes authorized Agency choices and preserves the selected workspace across locale changes; installation, enablement and configuration access still apply. Concrete connector screens own their implementation documentation.

The host also wraps Agency form details at `/en/extension/[id]/agencies/[agencyId]/forms/[formId]` and `/fr/extension/[id]/agences/[agencyId]/formulaires/[formId]`. Their `/flow` and `/parcours` child routes select the flow view. `ExtensionsAgencyFormPage` requires an accessible Agency workspace, an enabled extension with a `forms` tab, and its registered Agency component. Failed workspace or registry requests show **Retry**. A missing accessible workspace, enabled forms tab, or component shows **Not available**.

The wrapper passes `section="forms"`, `detail-form-id`, `form-flow-only`, and `form-editor-view` to the extension component, along with Agency, extension, configuration, and read-only context. The `view` query accepts `test` or `publish`; all other values select `edit`. The flow route sets `form-flow-only` to true. `form-flow` events navigate between these views, `close-form` returns to the workspace’s `forms` section, and `form-collection-label` sets its breadcrumb label. A `formId` of `new` redirects to that collection. The extension owns form editing, testing, publication, and their server authorization. These routes do not define a host-owned form model.

An Agreement tab may declare `detailPage: { path: './components/AllocationDetail.vue' }` and `entity-detail-pages`. The host registers the component and supplies Agreement context and record permissions within its shared detail workspace. Other tab targets cannot declare a detail page. Optional `agencyConfigVisibility` is a configuration filter, not server authorization. Preserve owner resolution, loading/retry and URL section state when navigating between list and detail.

## Scoped bilingual fields and payment evidence

These two integrations serve different officer tasks: proposing text in the other language and explaining a saved payment calculation. A proposed translation remains a draft for review. Payment evidence remains a record of the saved calculation even if budgets later change.

Declare `bilingual-field-slots` for `bilingual-field.after` and use the SDK’s typed bilingual field context. Fields retain separate English/French live models, labels, multiline/length and disabled/read-only constraints. A contributed translation action updates the form draft; the user still reviews and saves. The host resolves `agency`, `transfer_payment`, `agreement` or `applicant_recipient` authority explicitly. Do not borrow Agreement authority for an unrelated Agency field or pass an arbitrary Agency to a Proponent slot; the latter receives the authorized Agency configurations as an array.

Declare `payment-evidence` for `payment.evidence`. The evidence slot renders the saved Payment calculation contract; it does not silently recalculate history from live budgets or catalogs. The host exposes core financial inputs and retained calculation details separately. Show readable bilingual sections and exact monetary amounts. Do not show raw technical data in their place. Machine translation provider, glossary behavior and calculator formulas belong to their respective extensions.

## Shared financial reads and coding allocation

**Coding allocation** splits a financial amount among eligible accounting lines. The extension can propose the split, but the host checks the total, available capacity and amounts already paid. A paid floor is the minimum amount a line must retain to cover existing payments; a pool is shared available capacity.

Declare `agreement-payment-capacity` and use `requireGcsExtensionAgreementFinancials(context)`. The host binds the service to the authorized Agreement and active database/transaction. It exposes Payment calculation inputs, recorded paid projections, Claim recovery, effective accounting, allocation context, exact-line paid coverage, allocation validation and commitment capacity. It refreshes route authority before reads and rejects a currency mismatch or an excluded Payment/Commitment line from another Agreement. Missing capability fails; there is no extension-local capacity fallback. Reading projections grants no source-record access, assignment or write authority.

Declare `coding-allocator` with `codingAllocator: { path: './server/coding.ts' }`. Its default allocator receives an exact amount, output kind (Commitment, Payment, Receivable or Credit Memo), Stream catalog, retained/current coding context, existing paid floors and available pools. Return exact `{ codingLineId, amount }` lines, an envelope with `lines` and retained `policy`, or `null` for manual coding. The host validates catalog membership, unique coding IDs, sum equality, exact paid floors and applicable shared capacity before saving in the transaction. An `accountCatalog` override is rejected: accounts must be available on the Stream. Configuration guards can query the host’s active Agency `codingAccounts.list` by kind, currency and optional fiscal year.

For example, a two-line allocation of `600.00` and `400.00` for a `1000.00` Payment must both reference eligible coding and fit the shared pools. A result totaling `999.99`, selecting an unavailable account or reducing retained paid coverage fails; correct configuration and retry rather than editing immutable evidence. Extension-specific weighting algorithms stay in the owning extension’s guide.

## Opportunity exchange and Intake import

A connector can publish a funding Opportunity to another system and import a submitted application as an Intake. Importing places the Intake in a group’s work queue; a user must later claim it to become assigned. The contracts below prevent an import from bypassing permissions or creating the same submission twice.

Authenticated RBAC-declared routes receive `GcsExtensionWriteAuthorization`. Call `lockAuthState(trx)` on the owning transaction before extension lifecycle locks, then refresh the current route authority. The callbacks below reject a different transaction or missing locked actor context. They do not authorize an arbitrary Agency or Program just because its ID was submitted.

`projectFundingOpportunity(trx, opportunityId)` refreshes route authority and independently requires `transfer_payment:update` at the owning Program. An Opportunity-bound route must request that same ID; an Agency/Stream route must match its current owner and selected Streams. An unavailable/mismatched Opportunity returns `null`. The projection contains exact string IDs, bilingual Agency/Program/Stream names, all selected Streams, Opportunity names/objectives, start/end dates and whole-day times, plus `active` and `editable`. The host output also includes external attachment-type metadata. `active` describes eligible status flags; new Intake creation separately enforces the inclusive date window. The route callback may return inactive metadata so a connector can disable a previously published call.

`createFundingCaseIntake(trx, input)` additionally requires `funding_case:create` at the current Opportunity scope and rechecks the owner after locking the Opportunity. Supply canonical IDs for Opportunity, Proponent, group and application; optional `intakeId` identifies a retained host receipt. `application` and `sourceExport` are JSON objects; `sourceSystem` is trimmed nonempty text of at most 100 characters and `sourceSubmissionId` at most 255. New imports require an eligible non-Draft/writable/nonterminal Agency status, inclusive current-date window, readable Proponent, assignable same-Agency group and Agency Draft status. The created Intake is group-only queued work; later claiming establishes user assignment.

Handle typed results deliberately: `created` returns `intakeId`/`draftStatusId`, while `already_imported` returns the retained `intakeId`. Unavailable results are `opportunity_unavailable`, `recipient_unavailable`, `group_unavailable` and `draft_status_unavailable`; identity conflicts are `intake_id_conflict`, `source_conflict` and `application_id_conflict`. A denied domain action throws `FUNDING_CASE_EXCHANGE_FORBIDDEN`. Do not turn a conflict into another insertion.

For example, if a remote submission was imported but its acknowledgement was lost, retry with its same source identity/export and retained host ID when available. The host verifies the receipt’s Opportunity, Proponent, application and unchangeable source history and returns the existing ID even after the call closes. It does not overwrite the retained application or reopen workflow history. Scheduled Agency-service imports use the separately capability-bound L1 authorization and its active recipient affiliation checks; do not substitute staff-route grants for that service boundary. See [Portal](../intake/portal.md).

## Shared diagram rendering

Use this component to show officers the steps and choices in a process. It draws the diagram and offers downloads; it does not run the process or decide whether a record can move to its next step.

Extensions import `ExtensionFlowDiagram` and `FlowDiagramDefinition` from `@gcs-ssc/extensions/ui`; host code uses `CommonFlowDiagram` backed by `@gcs-ssc/diagrams`. Supply already-localized ordered nodes with unique IDs and explicit valid route targets. Node kinds are `start`, `step`, `decision` and `end`; routes are `direct`, `conditional`, `default` or `failure`. Only nodes with `selectLabel` emit selection; `selectedNodeId` marks the selected node.

The renderer provides responsive layout, connections, accessible controls, theming, and local downloads. SVG preserves native shapes, searchable text, and the complete canvas. PNG uses four times the CSS width and height, with an opaque background. If export fails, the diagram remains available with a localized retry action. The renderer does not execute form rules or workflow transitions. Keep business state and translation outside it.

## Scheduled imports and L1 handlers

L1 is the host’s background-work execution context. A scheduled handler performs recurring work without an officer pressing a button. For example, it may import new submissions as drafts. A run can happen more than once, so the extension must keep the request and its duplicate-prevention key for safe retries.

Declare `scheduled-agreement-import` or `scheduled-intake-import` for the corresponding host import boundary, and `l1-queue` when registering recurring work with `registerGcsExtensionL1QueueHandler`. Supply a stable `<extension-key>:<handler-name>` identity, `extensionKey`, an integer interval from 1000 to 2147483647 milliseconds, and a bounded async `run`. The host rejects duplicate IDs and mismatched namespaces and dispatches only currently enabled extensions after their migrations and Audit readiness. Scheduled plugins are lazily activated once per Nitro app; failed activation can retry.

The L1 context supplies the host database, `createWriteAuthorization(extensionKey, agencyId)` and Agency Audit execution through `runForAgency`. Use the transaction-bound authorization callbacks before creating an imported Intake, Claim or Forecast. Agreement imports recheck Agency, Stream, linked recipient where required, active primary user, status and Closeout boundary. They create drafts, not approvals. A handler may run more than once for the same work. Persistent business queues must preserve the exact request to retry and its idempotency key, which identifies repeated requests for the same operation. See [Background work](../operator/background-work.md) for leases, failure delays and monitoring.

### Imported forecast versions

SDK 0.3.18 changes `createAgreementForecast(trx, input)`: the host assigns the version to the Forecast record. Remove `version` from each monthly line. Supply `agreementId`, `streamId`, `fiscalYearId`, `applicantRecipientId` and `lineItems`. Each line contains `budgetLineItemId`, `month` (0–11), exact `amount` and `currency`. Use current budget line identities from the selected Agreement fiscal year and the Agreement currency. The host requires 1–2400 lines, nonnegative amounts and no repeated budget-line/month pair.

The import creates an inactive Draft, assigns its primary user, and returns `{ status: 'created', forecastId, version, lineItemIds, draftStatusId }`. `version` is an exact integer string: numbering starts at `'0'` for each Agreement/fiscal year and includes deleted history, so old numbers are never reused. Preserve that returned value; do not calculate a monthly version or activate the imported record yourself. Completion and approval control activation.

For example, if versions `'0'` and `'1'` already exist for an Agreement's 2026–2027 year, importing twelve monthly lines of `'1000.00'` creates version `'2'`, a separate inactive Draft totalling `'12000.00'`. It does not replace the active Forecast. Shared payment calculations use the active Forecast record and its complete monthly breakdown, even while a higher-numbered draft exists.

Handle `agreement_unavailable`, `recipient_unavailable`, `fiscal_year_unavailable` and `draft_status_unavailable` before reporting success. Refresh the Agreement, recipient link, current budget or Agency Draft status as appropriate, then retry through the same authorization boundary. If the transaction fails, it rolls back the Forecast and its lines. Every successful create call produces another version. Retain the result and check an uncertain response before issuing another create request.

## Testing checklist

Check both what officers see and what the server enforces. For example, a hidden button must not be the only thing preventing an unauthorized save. Use the checklist below to test configuration, permissions, record protection and bilingual behaviour.

Use `installExtensionTestUiRuntime` from `@gcs-ssc/extensions/testing` for standalone component tests that need host UI wrappers.

| Test | Expected result |
| --- | --- |
| Manifest import | `extension.config.ts` imports and validates without host internals. |
| Capability declarations | Every used host feature is listed in `requiredHostCapabilities`. |
| Agency enablement | Extension appears on the agency Extensions tab and migrations run. |
| Stream config | Modal or full-page config saves valid JSON and rejects invalid combinations. |
| Runtime slots/tabs | Components render only when agency/stream enablement and RBAC allow them. |
| Server handlers | Ownership, enablement, RBAC or manual authorization, and validation are enforced. |
| API clients | `useExtensionApi` and `useHostApi` build expected paths and handle errors. |
| Secret handling | Secrets are encrypted/decrypted server-side and never returned to browser config. |
| Transaction contract | Lifecycle helpers receive a `Transaction`, not a root database client. |
| Concurrent lifecycle writes | Config changes, disablement, and generated work serialize in canonical lock order. |
| Stale authorization | A request that loses access while waiting is rejected by the second `writeAuthorization` phase after lifecycle locks. |
| Lifecycle guards | Disable, agreement move, and payment mutations cannot invalidate extension-owned records. |
| Agreement deletion guard | Deletion is rejected in the host transaction when extension-owned history or generated provenance still requires the agreement. |
| Create action conflicts | Duplicate replacement actions are detected. |
| Payment calculator conflicts | Duplicate calculators are detected. |
| Bilingual UI | English and French labels, errors, and tab names are present. |
| Soft deletion | Extension-owned deletes preserve historical data where required. |
