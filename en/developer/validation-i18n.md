# Validation, localization, and API errors

Interface localization, bilingual business data, and request validation are separate contracts.

Nuxt uses locale-prefixed English and French routes. The detector selects the locale cookie first, then the highest-quality supported `Accept-Language` entry (header order breaks ties), then English. Interface keys live in both `i18n/locales/en.json` and `fr.json` with identical placeholders. Persisted values such as `name_en`/`name_fr` are user-managed data and are rendered with bilingual helpers rather than copied into locale files.

Shared Zod schemas emit stable `validation.*` keys. Use Zod 4 `{ error: 'validation.key' }` for rules and `message: 'validation.key'` for `ctx.addIssue`. Refined schemas keep an unrefined base before deriving create and partial patch contracts.

Client forms bind `useZodI18n().createValidator(schema)` to `UForm`. The async validator translates issues and returns `{ name, message }`, where `name` is the dot-joined field path. Bilingual issue parameters such as `question_en`/`question_fr` are selected for the active locale.

Server handlers validate untrusted input with `readValidatedBodyI18n`, `getValidatedQueryI18n`, or `parseI18n`. A Zod failure returns HTTP 400, machine code `VALIDATION_FAILED`, and localized `data.details` entries containing path, message, and issue code. Other expected failures use localized helpers with stable machine codes. `useApiErrorToast` displays the already-localized server message; clients must not translate it again.

Every new key must exist in both locales with the same interpolation placeholders. Tests must cover the machine code, status, field path, parameters, and both locale results where locale affects behaviour.

## Required fields and accessible controls

The `form-requirements` module wraps the host and SDK Nuxt UI forms and controls. `UForm` retains the Zod schema associated with `createValidator`; `UFormField` resolves its named path and adds a localized required label when the schema proves it is required. Nested forms and array paths must name their real schema path; use `useFormFieldPath` when composing a child editor.

An explicit `:required` overrides inference. Use it for a conditional requirement that cannot be inferred, and keep its condition identical to the validation rule. Optional or defaulted inputs must not be marked required simply because the database column is non-null. Search and filter inputs inside a selector must not inherit the requirement of the actual selection.

```vue
<UForm :state="state" :validate="createValidator(schema)">
  <UFormField name="email" :label="t('common.email')">
    <UInput v-model="state.email" type="email" />
  </UFormField>
</UForm>
```

For a required email schema, this supplies the visible requirement and the interactive control’s semantics. Composite selectors, date segments and groups need the same accessible label and description as the field. Preserve `aria-describedby` for group instructions alongside validation errors; do not communicate a requirement by colour or an asterisk alone. Disabled/read-only controls do not advertise an actionable requirement. The form uses `novalidate` so localized application validation remains authoritative.

`forms:inventory` inventories declarations; `forms:audit` reports inferred and explicit contracts, and `forms:check` rejects unresolved decisions. Document justified exceptions in the private tooling’s `architecture/form-field-contracts` records with a reason and source evidence; do not suppress an entire component because one field is dynamic.

Extension UI messages use package-owned `defineGcsExtensionMessages` catalogues and `useExtensionI18n(messages)`, with matching bilingual keys and interpolation placeholders. They do not gain arbitrary access to host translation keys. See [Authoring Extensions](./extensions-authoring.md#extension-owned-messages).
