# Validation, localization, and API errors

This page describes form validation, bilingual data and API error contracts. Forms identify required fields and explain rejected values in the selected interface language.

Interface localization means translating buttons, labels and messages. Bilingual business data means separately entered content such as an Opportunity's English and French names. Request validation checks whether a submitted value is allowed. These are separate contracts.

Nuxt uses locale-prefixed English and French routes. The detector selects the locale cookie first, then the highest-quality supported `Accept-Language` entry, then English. Header order breaks ties. Interface keys live in both `i18n/locales/en.json` and `fr.json` with identical placeholders. Persisted values such as `name_en` and `name_fr` are user-managed data and are rendered with bilingual helpers rather than copied into locale files.

Shared Zod schemas emit stable `validation.*` keys. Use Zod 4 `{ error: 'validation.key' }` for rules and `message: 'validation.key'` for `ctx.addIssue`. Refined schemas keep an unrefined base before deriving create and partial patch contracts.

Client forms bind `useZodI18n().createValidator(schema)` to `UForm`. The async validator translates issues and returns `{ name, message }`, where `name` is the dot-joined field path. Bilingual issue parameters such as `question_en` and `question_fr` are selected for the active locale.

Server handlers validate untrusted input with `readValidatedBodyI18n`, `getValidatedQueryI18n`, or `parseI18n`. A Zod failure returns HTTP 400, machine code `VALIDATION_FAILED`, and localized `data.details` entries containing path, message, and issue code. Other expected failures use localized helpers with stable machine codes. The localized server message remains the display-ready fallback. Host errors can also include validated `translation` metadata with a catalogue key and scalar parameters. `useApiErrorToast` renders that metadata in the current interface language when the key exists, including after a language change. Its `resolveDetails` helper does the same for field details. Keep arbitrary server and extension prose as supplied. Do not treat that prose as a translation key.

Every new key must exist in both locales with the same interpolation placeholders. Tests must cover the machine code, status, field path, parameters, and both locale results where locale affects behaviour.

## Text, identifiers and partial updates

Validate storage limits before writing. Agency labels, Workflow names, Attachment Type names, Recommendation Schema names, and Program outcome and indicator names accept at most 255 Unicode code points where their schemas apply that limit. Count with `Array.from(value).length`; JavaScript string length counts UTF-16 units. The affected text schemas and shared pagination searches reject NUL (`\u0000`) with `validation.invalid_text_character`. Do not strip invalid characters silently. Attachment Type names reject whitespace-only input while preserving nonblank authored spacing.

Use canonical positive PostgreSQL bigint IDs for selections such as approval-step default users and groups, or the optional Agency on an applicant or recipient financial ID. Keep IDs as decimal text. Opportunity setup lookup validates every ID in its comma-separated `stream_ids`; a valid-looking picker label does not validate an API payload.

Review and recommendation authoring order must fit a signed `smallint` (−32,768 through 32,767). Blank, null and fractional supplied orders are invalid. Inline Recommendation Schema creation keeps its narrower range of 1 through 32,767. Publication still requires its own consecutive sequence from 1; accepting a draft order does not make that plan publishable.

PATCH omission must preserve saved values. Remove create defaults before making defaulted booleans optional. The following values must change only when supplied:

- Program Active.
- Stream financial-limit Active.
- Amendment-type subtype requirements.
- Review member failure policy.
- Funding Type stacking and cost-sharing flags.

Explicit `false` remains a real update. A Workflow patch containing only allowed start statuses updates those relations without issuing an empty header update. Clients must send editable Review member fields only, keeping the saved default group and excluding response metadata.

Approval Template updates reject repeated supplied row IDs within steps, each step's certifications, and additional-approval certifications, including rows marked deleted. Supplied certification IDs must belong to active rows of that parent step. Reordering or swapping names preserves retained row IDs; omitted certifications become soft-deleted history. The full-template transaction rolls back all changes on failure.

Agency catalog mutations translate `PublicationLifecycleConflictError` only after the transaction rejects, returning a localized HTTP 409 with the stable publication code. Preserve unrelated database and authorization errors. Workflow metadata remains readable when its working definition has a recognized publication validation error, so administrators can correct and republish it.

## Invalid saved data

Saved data must satisfy the current contract. Assessment mutations validate the immutable published Review Schema envelope and its authored assessment arrays. Malformed saved definitions return HTTP 500 with `ASSESSMENT_DEFINITION_INVALID`. Explicitly unauthored content can still be empty, but missing arrays in an authored definition are not filled in as compatibility defaults.

Relational Agreement custom-field values must be arrays of selected IDs. A saved scalar value returns HTTP 500 with `AGREEMENT_CUSTOM_FIELDS_INVALID` when projecting Agreement details or document input. Correct the underlying data through the supported maintenance process before retrying. Do not silently wrap a malformed value or substitute an empty selection.

Validation errors without a recognized `validation.*` key use localized fallback messages. Invalid choices use `validation.invalid_selection`; oversized strings and arrays use their dedicated length messages. Translation metadata accepts strings, finite numbers, booleans, or null. It does not expose arbitrary issue objects.

## Required fields and accessible controls

An Opportunity form must mark both language name fields as required. A Stream selector must mark the selection as required when applicable, without marking its search text as required. These indicators must match validation.

The `form-requirements` module wraps the host and SDK Nuxt UI forms and controls. `UForm` retains the Zod schema associated with `createValidator`; `UFormField` resolves its named path and adds a localized required label when the schema proves it is required. Nested forms and array paths must name their real schema path; use `useFormFieldPath` when composing a child editor.

An explicit `:required` overrides inference. Use it for a conditional requirement that cannot be inferred, and keep its condition identical to the validation rule. Optional or defaulted inputs must not be marked required simply because the database column is non-null. Search and filter inputs inside a selector must not inherit the requirement of the actual selection.

```vue
<UForm :state="state" :validate="createValidator(schema)">
  <UFormField name="email" :label="t('common.email')">
    <UInput v-model="state.email" type="email" />
  </UFormField>
</UForm>
```

For a required email schema, this supplies the visible requirement and the interactive control's semantics. Composite selectors, date segments and groups need the same accessible label and description as the field. Preserve `aria-describedby` for group instructions alongside validation errors; do not communicate a requirement by colour or an asterisk alone. Disabled or read-only controls do not advertise an actionable requirement. The form uses `novalidate` so localized application validation remains authoritative.

`forms:inventory` inventories declarations; `forms:audit` reports inferred and explicit contracts, and `forms:check` rejects unresolved decisions. Document justified exceptions in the private tooling's `architecture/form-field-contracts` records with a reason and source evidence; do not suppress an entire component because one field is dynamic.

Extension UI messages use package-owned `defineGcsExtensionMessages` catalogues and `useExtensionI18n(messages)`, with matching bilingual keys and interpolation placeholders. They do not gain arbitrary access to host translation keys. See [Authoring Extensions](./extensions-authoring.md#extension-owned-messages).

## Exact currency controls and proposed translations

For example, an officer entering a claim amount of 1,250.50 must save that exact monetary value, even when the French interface displays different grouping and decimal separators. When a translation is proposed for a bilingual description, the officer still reviews the draft and saves it; the proposal is not an approved or saved business change.

Use `CommonCurrencyInput` and string-safe `formatMoneyText` with the owning currency. Preserve blank or invalid drafts, exact decimal payloads, localized grouping and two fractional digits. Do not coerce authoritative money with `Number` or a number-only widget. Saved financial children must match the immutable Agreement denomination.

Scoped bilingual extension fields receive an explicit subject and action, along with live language models. A translation proposal updates draft text; it does not bypass requiredness, maximum length, access checks or Save. Questionnaire controls preserve zero and false and validate the pinned definition at final submission. See [Bilingualism](../concepts/bilingualism.md) and [Data Collections](../concepts/data-collections.md).
