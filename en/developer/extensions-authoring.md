# Authoring Extensions

Extensions are installed code packages that the GCS-SSC host discovers at startup. Author extensions when a business process needs local behaviour without changing the core agreement, proponent, program, or admin screens for every deployment.

Use this page for developer implementation. Operators should use [Concepts: Extensions](../concepts/extensions.md) and the agency/stream extension tabs.

## Authoring Contract

Import SDK contracts from `@gcs-ssc/extensions` and server helpers from `@gcs-ssc/extensions/server`. Do not import host internals such as `~~/server`, `~~/shared`, `~/`, or `#imports` for extension-owned contracts.

| Contract | Use |
| --- | --- |
| `defineGcsExtension` | Defines the extension manifest. |
| `GcsExtensionJsonConfig` | Stream configuration JSON shape. |
| `ExtensionEntityTabContext` | Props for entity tab components. |
| `defineGcsExtensionMigration` | Wraps Kysely migrations owned by the extension. |
| `registerGcsExtensionCreateOperationHandler` | Hooks core commitment/payment create operations. |
| `createGcsExtensionUserError` | Raises localized, user-facing extension errors from server code. |
| KV helpers | Store extension-owned state by owner type, owner id, and key. |

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
| `tests/` | Unit tests for config parsing, route helpers, and business logic. |

## Manifest Fields

```ts
import { defineGcsExtension } from '@gcs-ssc/extensions'

export default defineGcsExtension({
  key: 'gcs-example',
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
| `name` | Required bilingual display name. |
| `description` | Optional bilingual description for admin screens. |
| `admin` | Agency and stream configuration components. |
| `client` | Runtime slots, entity tabs, create actions, and payment calculators. |
| `css`, `i18n`, `assets` | Optional client styling, localized messages, and static assets. |
| `serverHandlers` | Authenticated extension routes exposed through the host dispatcher. |
| `migrations` | Kysely migrations run when the extension is enabled or migrations are requested. |
| `runtime` | Optional resolver for slot enablement and config resolution. |
| `nitroPlugin` | Optional server plugin for hooks such as create-operation interception. |

The host validates component, handler, asset, and migration paths so they stay inside the extension package.

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

Use `admin.streamConfig` when the extension needs stream-level options:

```ts
admin: {
  streamConfig: {
    path: './components/ExampleStreamConfig.vue'
  }
}
```

The component receives the current JSON config with `v-model` and stream context props:

```vue
<script setup lang="ts">
import type { GcsExtensionJsonConfig, GcsResolvedExtension } from '@gcs-ssc/extensions'

defineProps<{
  extension: GcsResolvedExtension
  streamId: string
  transferPaymentId?: string
  agencyId?: string
}>()

const config = defineModel<GcsExtensionJsonConfig>({ required: true })
</script>
```

| Rule | Behaviour |
| --- | --- |
| Config must be JSON-safe | Store primitives, arrays, and objects only. |
| Agency enablement comes first | Stream config is unavailable until the extension is enabled for the agency. |
| Components must tolerate optional IDs | Older host contexts may omit `transferPaymentId` or `agencyId`. |
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

| Rule | Behaviour |
| --- | --- |
| Declare RBAC for entity data | The host resolves the entity from the route param, checks extension enablement, and enforces the declared subject/action. |
| Keep route params explicit | The `entity.param` value must match a route param name. |
| Throw `GcsExtensionUserError` for user-facing failures | Use localized English/French messages for extension-owned failures so the API can return the right language. |
| Validate all input | Extension handlers are responsible for their own request validation. |
| Do not bypass host ownership | Always resolve agreement, proponent, claim, monitor, stream, and agency ownership before writing. |

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

```ts
client: {
  paymentAmountCalculators: [
    {
      operation: 'agreement.payments.create',
      id: 'automated-payment-amount',
      label: { en: 'Automated payment amount', fr: 'Montant de paiement automatise' },
      path: './components/AutomatedPaymentAmountCalculator.vue',
      rbac: { subject: 'agreement', action: 'update' }
    }
  ]
}
```

| Rule | Behaviour |
| --- | --- |
| Calculator must match the operation | The current host supports agreement payment creation. |
| Calculator must be unique for the operation | Conflicting enabled calculators block the host form. |
| Ceiling is enforced in the form | The user cannot save an amount above the calculator ceiling. |
| Server validation is still required | Recheck generated amounts before writing records. |

## Migrations And Data

```ts
import { defineGcsExtensionMigration } from '@gcs-ssc/extensions/server'

export default defineGcsExtensionMigration({
  async up(db) {
    await db.schema.withSchema('extensions').createTable('gcs_example_note').addColumn('id', 'uuid').execute()
  },
  async down(db) {
    await db.schema.withSchema('extensions').dropTable('gcs_example_note').execute()
  }
})
```

| Rule | Behaviour |
| --- | --- |
| Migrations are extension-owned | Use the `extensions` schema and extension-specific table names. |
| Migration paths are listed in the manifest | The host runs listed migrations for enabled extensions. |
| Standard package imports are allowed | Migration files can import runtime dependencies such as `kysely`; the host resolves them from the application install. |
| Migration history is per extension | Each extension uses its own migration history and lock tables, so pending migrations are tracked independently. |
| KV entries are useful for simple state | Store owner type, owner id, config key, JSON value, and soft-delete state. |
| Secrets use encrypted secret storage | Use SDK secret helpers for private keys, tokens, and API credentials; do not store them in config or KV JSON. |
| Prefer explicit tables for complex workflows | Use migrations when the extension needs reporting, relationships, workflow states, or large records. |

Encrypted secret helpers are exposed from `@gcs-ssc/extensions/server`: `setEncryptedExtensionSecret`, `getEncryptedExtensionSecret`, and `deleteEncryptedExtensionSecret`. Production deployments must provide `GCS_EXTENSION_SECRETS_KEY` as a base64-encoded 32-byte key.

## Assets And I18n

| Feature | Manifest field | Guidance |
| --- | --- | --- |
| Static extension assets | `assets` | Mount only files needed at runtime; choose a unique `baseURL`. |
| Package assets | `assets.package` and `packagePath` | Useful for model files or bundled third-party assets. |
| Bilingual messages | `i18n` | Provide English and French message files for UI labels and errors. |
| CSS | `css` | Keep styles scoped and avoid overriding host design tokens globally. |

## Testing Checklist

| Test | Expected result |
| --- | --- |
| Manifest import | `extension.config.ts` imports and validates without host internals. |
| Agency enablement | Extension appears on the agency Extensions tab and migrations run. |
| Stream config | Config component saves valid JSON and rejects invalid combinations. |
| Runtime slots/tabs | Components render only when agency/stream enablement and RBAC allow them. |
| Server handlers | Ownership, enablement, RBAC, and validation are enforced. |
| Create action conflicts | Duplicate replacement actions are detected. |
| Payment calculator conflicts | Duplicate calculators are detected. |
| Bilingual UI | English and French labels, errors, and tab names are present. |
| Soft deletion | Extension-owned deletes preserve historical data where required. |
