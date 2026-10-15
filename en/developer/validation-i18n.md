# Validation, localization, and API errors

This page explains how developers make forms and errors usable in English and French. For an officer, the practical result is a form that identifies required fields, explains a rejected value in the selected interface language and preserves the meaning of bilingual business information.

Interface localization means translating buttons, labels and messages. Bilingual business data means separately entered content such as an Opportunity’s English and French names. Request validation checks whether a submitted value is allowed. These are separate contracts.

Nuxt uses locale-prefixed English and French routes. The detector selects the locale cookie first, then the highest-quality supported `Accept-Language` entry (header order breaks ties), then English. Interface keys live in both `i18n/locales/en.json` and `fr.json` with identical placeholders. Persisted values such as `name_en`/`name_fr` are user-managed data and are rendered with bilingual helpers rather than copied into locale files.

Shared Zod schemas emit stable `validation.*` keys. Use Zod 4 `{ error: 'validation.key' }` for rules and `message: 'validation.key'` for `ctx.addIssue`. Refined schemas keep an unrefined base before deriving create and partial patch contracts.

Client forms bind `useZodI18n().createValidator(schema)` to `UForm`. The async validator translates issues and returns `{ name, message }`, where `name` is the dot-joined field path. Bilingual issue parameters such as `question_en`/`question_fr` are selected for the active locale.

Server handlers validate untrusted input with `readValidatedBodyI18n`, `getValidatedQueryI18n`, or `parseI18n`. A Zod failure returns HTTP 400, machine code `VALIDATION_FAILED`, and localized `data.details` entries containing path, message, and issue code. Other expected failures use localized helpers with stable machine codes. `useApiErrorToast` displays the already-localized server message; clients must not translate it again.

Every new key must exist in both locales with the same interpolation placeholders. Tests must cover the machine code, status, field path, parameters, and both locale results where locale affects behaviour.

## Text, identifiers and partial updates

Validate storage limits before writing. Agency labels, Workflow names, Attachment Type names, Recommendation Schema names, and Program outcome/indicator names accept at most 255 Unicode code points where their schemas apply that limit. Count with `Array.from(value).length`; JavaScript string length counts UTF-16 units. The affected text schemas and shared pagination searches reject NUL (`\u0000`) with `validation.invalid_text_character`. Do not strip invalid characters silently. Attachment Type names reject whitespace-only input while preserving nonblank authored spacing.

Use canonical positive PostgreSQL bigint IDs for selections such as approval-step default users/groups and an applicant/recipient financial ID’s optional Agency. Keep IDs as decimal text. Opportunity setup lookup validates every ID in its comma-separated `stream_ids`; a valid-looking picker label does not validate an API payload.

Review and recommendation authoring order must fit a signed `smallint` (−32,768 through 32,767). Blank, null and fractional supplied orders are invalid. Inline Recommendation Schema creation keeps its narrower range of 1 through 32,767. Publication still requires its own consecutive sequence from 1; accepting a draft order does not make that plan publishable.

PATCH omission must preserve saved values. Remove create defaults before making defaulted booleans optional: Program Active, Stream financial-limit Active, amendment-type subtype requirements, Review member failure policy, and Funding Type stacking/cost-sharing flags must change only when supplied. Explicit `false` remains a real update. A Workflow patch containing only allowed start statuses updates those relations without issuing an empty header update. Clients must send editable Review member fields only, keeping the saved default group and excluding response metadata.

Approval Template updates reject repeated supplied row IDs within steps, each step’s certifications, and additional-approval certifications, including rows marked deleted. Supplied certification IDs must belong to active rows of that parent step. Reordering or swapping names preserves retained row IDs; omitted certifications become soft-deleted history. The full-template transaction rolls back all changes on failure.

Agency catalog mutations translate `PublicationLifecycleConflictError` only after the transaction rejects, returning a localized HTTP 409 with the stable publication code. Preserve unrelated database and authorization errors. Workflow metadata remains readable when its working definition has a recognized publication validation error, so administrators can correct and republish it.

## Required fields and accessible controls

For example, an officer entering an Opportunity needs to know that both language names are required before saving. A required label should describe the actual name field; typing into the search box of a Stream selector does not make that search text a required business value. The implementation below keeps those requirements consistent with validation.

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

## Exact currency controls and proposed translations

For example, an officer entering a claim amount of 1,250.50 must save that exact monetary value, even when the French interface displays different grouping and decimal separators. When a translation is proposed for a bilingual description, the officer still reviews the draft and saves it; the proposal is not an approved or saved business change.

Use `CommonCurrencyInput` and string-safe `formatMoneyText` with the owning currency. Preserve blank/invalid drafts, exact decimal payloads, localized grouping and two fractional digits. Do not coerce authoritative money with `Number` or a number-only widget. Saved financial children must match the immutable Agreement denomination.

Scoped bilingual extension fields receive explicit subject/action and live language models. A translation proposal updates draft text; it does not bypass requiredness, maximum length, access checks or Save. Questionnaire controls preserve zero/false and validate the pinned definition at final submission. See [Bilingualism](../concepts/bilingualism.md) and [Data Collections](../concepts/data-collections.md).
