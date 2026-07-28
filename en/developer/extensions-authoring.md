# Authoring Extensions

Extensions are installed code packages that the GCS-SSC host discovers at startup. Author extensions when a business process needs local behaviour without changing the core agreement, proponent, program, or admin screens for every deployment.

Use this page for developer implementation. Operators should use [Concepts: Extensions](../concepts/extensions.md) and the agency/stream extension tabs.

## Authoring Contract

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

## Package Shape

A typical extension has:

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

## Manifest Fields

```ts
import { defineGcsExtension } from '@gcs-ssc/extensions'

export default defineGcsExtension({
  key: 'gcs-example',
  sdkVersion: '^0.1.0',
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
| `sdkVersion` | Required compatible SDK version range, such as `^0.1.0`. The host rejects unsupported versions. |
| `requiredHostCapabilities` | Required list of host capabilities used by the manifest or implementation. Use an empty list only when none are needed. See the startup-inference limits below. |
| `name` | Required bilingual display name. |
| `description` | Optional bilingual description for admin screens. |
| `admin` | Agency config, stream config modal, or stream config page components. |
| `client` | Runtime slots, entity tabs, create actions, and payment calculators. |
| `css`, `i18n`, `assets` | Optional client styling, localized messages, and static assets. |
| `serverHandlers` | Authenticated extension routes exposed through the host dispatcher. |
| `migrations` | Kysely migrations run when the extension is enabled or migrations are requested. |
| `runtime` | Optional resolver for slot enablement and config resolution. |
| `nitroPlugin` | Optional server plugin for hooks such as create-operation interception. |

The host validates component, handler, asset, and migration paths so they stay inside the extension package.

## Supported Capabilities

Declare every capability the extension depends on. At startup, the host infers capabilities represented directly by `admin`, `client`, `serverHandlers`, `migrations`, `runtime`, `assets`, and `nitroPlugin` manifest fields; it rejects inferred-but-undeclared and unknown capabilities. The host does not inspect implementation imports or calls, so authors must separately audit code-only dependencies such as API clients, KV helpers, secret helpers, and create-operation hooks.

| Capability | Use |
| --- | --- |
| `agency-config` | Agency admin configuration component. |
| `stream-config-modal` | Stream configuration rendered in the stream Extensions modal. |
| `stream-config-page` | Full-page stream configuration route through `admin.streamConfigPage`. |
| `entity-tabs` | Agreement, proponent, claim, or monitor tabs. |
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

## Stream Configuration

Use `admin.agency` when the extension needs agency-wide non-secret settings:

```ts
admin: {
  agency: {
    path: './components/ExampleAgencyConfig.vue'
  }
}
```

Agency config components receive the current JSON config with `v-model`, plus `extension` and `agencyId` props. Store sensitive values through extension server handlers and encrypted secret helpers instead of putting them in agency config.

Use `admin.streamConfig` when the extension needs a modal-based stream configuration component:

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

## Runtime Slots

Slots render extension components inside existing host pages. Supported slot names are:

| Slot | Host area |
| --- | --- |
| `textarea.after` | Generic text-area after-slot. |
| `agreement.descriptions.after` | Agreement English/French description area. |
| `agreement.profile.classification.fields` | Agreement classification section. |
| `agreement.profile.profile.fields` | Agreement profile section. |
| `agreement.profile.risk-management.fields` | Agreement risk management section. |
| `agreement.profile.sections.after` | After agreement profile sections. |
| `proponent.descriptions.after` | Proponent English/French description area. |

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

## Entity Tabs

Entity tabs can target `agreement`, `proponent`, `claim`, or `monitor`.

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
| `context` | Target, agency, stream/agreement/proponent/claim/monitor ids, owner type, owner id, scope, and RBAC requirement. |
| `config` | Resolved stream or agency extension config. |
| `rbac` | The tab's declared RBAC requirement. |

| Rule | Behaviour |
| --- | --- |
| Tab ids are unique per target | Use lowercase kebab-case ids. |
| Tabs require enablement | Agreement, claim, and monitor tabs require agency and stream enablement; proponent tabs require agency enablement. |
| Tabs require RBAC | The host checks the declared subject/action before rendering. |
| Proponents without lead agency do not show tabs | Proponent tabs resolve enablement through the lead agency. |

## SDK UI Boundary

Import host-provided wrappers and composables from `@gcs-ssc/extensions/ui`. Do not import `~/`, `~~/`, `#imports`, `#app`, or `#gcs-*`, and do not use host component names directly in an extension template. Wrappers such as `ExtensionButton`, `ExtensionFormField`, `ExtensionSaveButton`, and `ExtensionTable` preserve host behaviour behind a versioned contract.

Common exports include `ExtensionButton`, `ExtensionFormField`, `ExtensionInput`, `ExtensionSelect`, `ExtensionTable`, `ExtensionResourceLayoutCard`, `ExtensionSection`, `ExtensionSaveButton`, and `ExtensionStatusBadge`.

Use `useExtensionApi(extensionKey)` for extension routes and `useHostApi()` for stable host routes. Declare `extension-api-client` or `host-api-client` in `requiredHostCapabilities` as applicable; do not assemble `/api` URLs or call `fetch` directly from components. The UI entry point also provides typed host integrations:

| Helper | Contract |
| --- | --- |
| `useExtensionConfirmDialog` | Typed asynchronous confirmation options and boolean result. |
| `useExtensionFetch<T>` | Reactive data, status, pending, error, and refresh refs. |
| `useExtensionGroupedTableExpansion<Row>` | Shared grouping, expansion, row, and visibility state. |
| `useExtensionI18n` / `useExtensionToast` | Stable host localization and notification boundaries. |

The host installs the concrete UI runtime. Standalone tests can install SDK test stubs instead of mounting host internals.

## Server Handlers

Use `serverHandlers` for authenticated extension endpoints:

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
| Throw `GcsExtensionUserError` for user-facing failures | Use localized extension messages so the UI can translate them. |
| Validate all input | Extension handlers are responsible for request validation. |
| Do not bypass host ownership | Always resolve agreement, proponent, claim, monitor, stream, and agency ownership before writing when the host has not already done so. |

Manual handlers that resolve stream ownership must call `resolveExtensionStreamContext(db, streamId)` to resolve the active ownership chain. It returns `agencyId`, `profileId`, `streamId`, and the canonical entity scope only when the stream, its transfer payment profile, and its owning agency are all active; treat `null` as unavailable and stop the operation.

Protected extension writes use the host-provided `writeAuthorization` protocol. It separates fresh authorization into two phases so authorization-table locks are never acquired after extension or entity locks. A write handler must reject a missing protocol before entering transactional business logic:

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

Routes that expose agreement choices must call `context.agreementAccess.listVisibleOptions(db, { streamId, action })`; the host applies agreement role and team visibility and returns active agreements only. When a transaction writes an agreement-owned record selected through such a route, require `writeAuthorization.lockAndAuthorizeAgreement` and call it after lifecycle locks and current-route authorization. A missing callback is fatal. The host locks the agreement, re-resolves its active stream, and performs fresh agreement authorization in the same transaction. A `false` result means that the agreement is inactive or no longer belongs to the requested stream; authorization denial is thrown.

## Create Actions

Extensions can add or replace create actions for:

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
      label: { en: 'Generate payments', fr: 'Generer les paiements' },
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

Server-side create hooks belong in a Nitro plugin:

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

## Payment Amount Calculators

Payment calculators can provide a suggested amount, ceiling amount, currency, explanation details, loading state, and extension data for `agreement.payments.create`. Only one enabled calculator can apply to the payment creation surface at a time.

| Rule | Behaviour |
| --- | --- |
| Calculator must match the operation | The current host supports agreement payment creation. |
| Calculator must be unique for the operation | Conflicting enabled calculators block the host form. |
| Ceiling is enforced in the form | The user cannot save an amount above the calculator ceiling. |
| Server validation is still required | Recheck generated amounts before writing records. |

## Migrations, KV, And Secrets

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

## Lifecycle Locks And Guards

Extensions that generate durable records from configuration must coordinate with host lifecycle changes. All lifecycle helpers require an active Kysely `Transaction`; passing a root `Kysely` client is intentionally a type error because transaction advisory locks would be released after each statement.

After `writeAuthorization.lockAuthState(trx)`, call `lockGcsExtensionLifecycleScope(trx, extensionKey, agencyId, streamId)` before extension/entity locks. The canonical domain order is agency scope, stream scope, then extension-specific or entity locks. Re-read configuration after locking, call `authorizeCurrentScope(trx)` or its `authorizeCurrentEntity` compatibility fallback, and only then read or mutate protected state.

Register lifecycle hooks from `defineGcsExtensionNitroPlugin`:

| Registration | Use |
| --- | --- |
| `registerGcsExtensionDisableGuard` | Veto agency or stream disablement when extension-owned state still requires runtime support. |
| `registerGcsExtensionAgreementLifecycleLock` | Acquire extension agreement locks before the host agreement row lock. |
| `registerGcsExtensionAgreementStreamChangeGuard` | Reject a stream move that would invalidate extension-owned state. |
| `registerGcsExtensionAgreementDeleteGuard` | Reject agreement deletion while extension-owned history or generated provenance must be preserved. |
| `registerGcsExtensionAgreementPaymentMutationGuard` | Validate payment and payment-line updates, deletes, and status changes inside host transactions. |

The host runs an agreement-delete guard after extension lifecycle locks are acquired and before it deletes the agreement, inside the same host transaction. The guard must read protected extension state through the supplied transaction and throw to veto deletion; the error propagates so the agreement deletion and every related write roll back together. Do not defer the check or query through a root database client.

Guards should throw localized extension user errors for correctable business conflicts. They must be deterministic, transaction-bound, and safe when host routes invoke them outside the extension UI.

## Assets And I18n

| Feature | Manifest field | Guidance |
| --- | --- | --- |
| Static extension assets | `assets` | Mount only files needed at runtime; choose a unique `baseURL`. |
| Package assets | `assets.package` and `packagePath` | Useful for model files or bundled third-party assets. |
| Bilingual messages | `i18n` | Provide English and French message files for UI labels and errors. |
| CSS | `css` | Keep styles scoped and avoid overriding host design tokens globally. |

## Testing Checklist

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
