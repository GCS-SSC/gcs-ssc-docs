# Authoring Extensions

Extensions are installed code packages that the GCS-SSC host discovers at startup. Author extensions when a business process needs local behaviour without changing the core agreement, proponent, program, or admin screens for every deployment.

Use this page for developer implementation. Operators should use [Concepts: Extensions](../concepts/extensions.md) and the agency/stream extension tabs.

## Authoring Contract

Import SDK contracts from `@gcs-ssc/extensions`, server helpers from `@gcs-ssc/extensions/server`, UI wrappers from `@gcs-ssc/extensions/ui`, and test helpers from `@gcs-ssc/extensions/testing`. Do not import host internals such as `~~/server`, `~~/shared`, `~/`, or `#imports` for extension-owned contracts.

| Contract | Use |
| --- | --- |
| `defineGcsExtension` | Defines the extension manifest. |
| `GCS_EXTENSION_SDK_VERSION` | Current host SDK version for manifest compatibility. |
| `GcsExtensionJsonConfig` | Stream configuration JSON shape. |
| `ExtensionEntityTabContext` | Props for entity tab components. |
| `defineGcsExtensionMigration` | Wraps Kysely migrations owned by the extension. |
| `defineGcsExtensionRouteHandler` | Wraps extension server handlers with stable route context. |
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
| `requiredHostCapabilities` | Required list of host capabilities used by the manifest or code. The host rejects missing or unknown capabilities. |
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

Declare every capability the extension depends on:

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

The stable route context contains `db`, `params`, `auth`, `config`, `entity`, `stream`, `agency`, `authorizedScope`, `readBody`, and `getHeader`. `context.event` remains available as an escape hatch, but normal handlers should not read host H3 internals directly.

| Rule | Behaviour |
| --- | --- |
| Declare RBAC for entity data | The host resolves the entity from the route param, checks extension enablement, passes config/context, and enforces the declared subject/action. |
| Keep route params explicit | The `entity.param`, `stream.param`, or `agency.param` value must match a route param name. |
| Use `auth: "manual"` only deliberately | Manual handlers must perform their own domain authorization; they cannot combine `auth: "manual"` with `rbac`. |
| Throw `GcsExtensionUserError` for user-facing failures | Use localized extension messages so the UI can translate them. |
| Validate all input | Extension handlers are responsible for request validation. |
| Do not bypass host ownership | Always resolve agreement, proponent, claim, monitor, stream, and agency ownership before writing when the host has not already done so. |

## UI Runtime

`@gcs-ssc/extensions/ui` exposes host-provided wrappers and composables. Use these instead of importing Nuxt UI or host `Common*` components directly.

Common exports include `ExtensionButton`, `ExtensionFormField`, `ExtensionInput`, `ExtensionSelect`, `ExtensionTable`, `ExtensionResourceLayoutCard`, `ExtensionSection`, `ExtensionSaveButton`, `ExtensionStatusBadge`, `useExtensionI18n`, `useExtensionToast`, `useExtensionFetch`, `useExtensionApi`, `useHostApi`, and `useExtensionGroupedTableExpansion`.

Use `useExtensionApi(extensionKey)` for extension-owned routes under `/api/extensions/{extensionKey}`. Use `useHostApi()` only for stable host API routes and declare `host-api-client` when doing so.

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
import { registerGcsExtensionCreateOperationHandler } from '@gcs-ssc/extensions/server'

export default defineNitroPlugin(nitroApp => {
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
| Create action conflicts | Duplicate replacement actions are detected. |
| Payment calculator conflicts | Duplicate calculators are detected. |
| Bilingual UI | English and French labels, errors, and tab names are present. |
| Soft deletion | Extension-owned deletes preserve historical data where required. |
