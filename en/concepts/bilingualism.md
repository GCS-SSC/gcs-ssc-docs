# Bilingualism

GCS-SSC is bilingual at the route, label, validation, and data levels. English content lives under `/en/...`; French content lives under `/fr/...`; many business records store paired English and French fields.

## Routes

Nuxt i18n uses prefix routing. The default locale is English, but URLs still use `/en`. French pages use `/fr` and several translated path segments, such as `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs`, and `/fr/admin/commun`.

Operators should share the localized URL they expect users to open.

## Labels and UI text

Application labels come from `i18n/locales/en.json` and `i18n/locales/fr.json`. Nuxt UI locale data is selected in `app/app.vue`. The lint configuration expects user-facing Vue text to be internationalized.

## Business data

Many records use paired fields, for example:

- `name_en` and `name_fr`
- `description_en` and `description_fr`
- `egcs_ay_name_en` and `egcs_ay_name_fr`
- `egcs_ar_legalname_en` and `egcs_ar_legalname_fr`
- `egcs_cn_name_en` and `egcs_cn_name_fr`

Tables often render `CommonBilingualName`, which displays the active locale value while keeping both values available. Enter both languages during setup to avoid blank labels after users switch language.

## Validation and Errors

Validation failures and toast messages should be understandable in the user's active locale. If an error appears in the wrong language, capture the page, active locale, and action being attempted.

## Runtime schemas

Review schemas, recommendation schemas, assessment labels, outcome labels, approval text, and certification text can carry bilingual values inside JSON. Treat JSON schema content as bilingual business content, not only technical configuration.

## Documentation parity

The English and French documentation pages should mirror structure. A user switching language should land in the same conceptual section, not a shorter summary.
