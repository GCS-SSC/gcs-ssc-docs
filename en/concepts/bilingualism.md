# Bilingualism

You can work in English or French in GCS-SSC. The language applies to page addresses, labels, error messages and many saved business fields. Changing the interface language does not translate text you have entered. English content lives under `/en/...`; French content lives under `/fr/...`; many business records store paired English and French fields.

## Routes

Page addresses include a language prefix. The application uses Nuxt i18n, its language-routing tool, to select the corresponding page. The default locale is English, but URLs still use `/en`. French pages use `/fr` and several translated path segments, such as `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs`, and `/fr/admin/gwcoa`.

Operators should share the localized URL they expect users to open.

## Labels and UI text

Buttons, menus and other interface labels use shared translations. For developers, these labels come from `i18n/locales/en.json` and `i18n/locales/fr.json`. Nuxt UI locale data is selected in `app/app.vue`. The lint configuration expects user-facing Vue text to be internationalized.

## Business data

Many records use paired fields, for example:

- `name_en` and `name_fr`
- `description_en` and `description_fr`
- `egcs_ay_name_en` and `egcs_ay_name_fr`
- `egcs_ar_legalname_en` and `egcs_ar_legalname_fr`
- `egcs_cn_name_en` and `egcs_cn_name_fr`

Tables usually show the name in your selected language while keeping both saved values available; the shared display component is `CommonBilingualName`. Enter both languages during setup to avoid blank labels after users switch language.

For example, enter “Community outreach” in the English name and “Sensibilisation communautaire” in the French name. A colleague working in French sees the French name for the same record. Check both fields before saving: changing the interface to French does not fill the French field for you.

## Validation and Errors

Validation failures and toast messages should be understandable in the user's active locale. If an error appears in the wrong language, capture the page, active locale, and action being attempted.

## Runtime schemas

A schema is a saved definition of a form or its questions. Review schemas, recommendation schemas, assessment labels, outcome labels, approval text, and certification text can carry bilingual values inside JSON, a structured configuration format. For example, an assessment question needs both language versions so officers reviewing the same case see equivalent instructions. Treat JSON schema content as bilingual business content, not only technical configuration.

## Documentation parity

The English and French documentation pages should mirror structure. A user switching language should land in the same conceptual section, not a shorter summary.

Program terms and conditions have separate required English and French URLs. Extensions own their message catalogues and resolve them through the SDK using the current host locale; an extension message is not a host translation key. See [Validation and localization](../developer/validation-i18n.md).

## Translation proposals

A translation extension is an optional add-on that can suggest text in the other language. When an enabled translation extension contributes an action beside paired fields, select the intended direction and review the proposed text in the target-language draft. Save the owning form to persist it. A configured Agency or Stream glossary can guide the proposal; credentials and provider settings belong to the extension’s administration. An absent action may reflect permissions or enablement. If a request fails, retain the current draft, resolve the reported provider/access issue and retry; do not assume either language was saved.

Money displays follow the owning currency and active locale. Financial controls preserve exact two-decimal values across language changes; translated labels do not change denomination or calculation rules.
