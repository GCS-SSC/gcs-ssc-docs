# Validation, localization, and API errors

Interface localization, bilingual business data, and request validation are separate contracts.

Nuxt uses locale-prefixed English and French routes. The detector selects the locale cookie first, then the highest-quality supported `Accept-Language` entry (header order breaks ties), then English. Interface keys live in both `i18n/locales/en.json` and `fr.json` with identical placeholders. Persisted values such as `name_en`/`name_fr` are user-managed data and are rendered with bilingual helpers rather than copied into locale files.

Shared Zod schemas emit stable `validation.*` keys. Use Zod 4 `{ error: 'validation.key' }` for rules and `message: 'validation.key'` for `ctx.addIssue`. Refined schemas keep an unrefined base before deriving create and partial patch contracts.

Client forms bind `useZodI18n().createValidator(schema)` to `UForm`. The async validator translates issues and returns `{ name, message }`, where `name` is the dot-joined field path. Bilingual issue parameters such as `question_en`/`question_fr` are selected for the active locale.

Server handlers validate untrusted input with `readValidatedBodyI18n`, `getValidatedQueryI18n`, or `parseI18n`. A Zod failure returns HTTP 400, machine code `VALIDATION_FAILED`, and localized `data.details` entries containing path, message, and issue code. Other expected failures use localized helpers with stable machine codes. `useApiErrorToast` displays the already-localized server message; clients must not translate it again.

Every new key must exist in both locales with the same interpolation placeholders. Tests must cover the machine code, status, field path, parameters, and both locale results where locale affects behaviour.
