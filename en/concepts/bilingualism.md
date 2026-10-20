# Bilingualism

You can work in English or French in GCS-SSC. The language applies to page addresses, labels, error messages and many saved business fields. Changing the interface language does not translate text you have entered. English content lives under `/en/...`; French content lives under `/fr/...`; many business records store paired English and French fields.

## Routes

Page addresses include a language prefix. The application uses Nuxt i18n, its language-routing tool, to select the corresponding page. The default locale is English, but URLs still use `/en`. French pages use `/fr` and several translated path segments, such as `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs`, and `/fr/admin/gwcoa`.

When sharing a link, use the address in the language your colleague needs.

## Labels and UI text

Buttons, menus and other interface labels use shared translations. For developers, these labels come from `i18n/locales/en.json` and `i18n/locales/fr.json`. Nuxt UI locale data is selected in `app/app.vue`. The lint configuration expects user-facing Vue text to be internationalized.

## Business data

Many records use paired fields, for example:

- `name_en` and `name_fr`
- `description_en` and `description_fr`
- `egcs_ay_name_en` and `egcs_ay_name_fr`
- `egcs_ar_legalname_en` and `egcs_ar_legalname_fr`
- `egcs_cn_name_en` and `egcs_cn_name_fr`

Tables usually show the name in your selected language while keeping both saved values available. Developers use the shared `CommonBilingualName` component for this display. Enter both languages during setup to avoid blank labels after users switch language.

For example, enter “Community outreach” in the English name and “Sensibilisation communautaire” in the French name. A colleague working in French sees the French name for the same record. Check both fields before saving: changing the interface to French does not fill the French field for you.

## Validation and errors

Error messages should use your selected language. If a message appears in the wrong language, record the page, language and action you attempted when reporting the problem.

## Runtime schemas

A schema is a saved definition of a form or its questions. Review and recommendation schemas, assessment and outcome labels, approval text, and certification text can contain bilingual values in JSON, a structured configuration format. For example, an assessment question needs both language versions so officers reviewing the same case see equivalent instructions. Check the English and French content in this JSON as you would check the text in any other form.

## Documentation parity

The English and French documentation should have the same structure and information. When you switch languages, you should reach the corresponding guide section.

Program terms and conditions have separate required English and French URLs. Extensions supply their own translations. They use the SDK to select messages in the current application language rather than using GCS-SSC translation keys. See [Validation and localization](../developer/validation-i18n.md).

## Translation proposals

A translation extension is an optional add-on that can suggest text in the other language. When an enabled translation extension contributes an action beside paired fields, choose which language to translate into and review the proposed text in that language’s draft field. Save the form to keep the translation. A configured Agency or Stream glossary can guide the proposal; administrators manage credentials and provider settings in the extension. If the translation action is missing, ask an administrator to check your permissions and whether the extension is enabled. If a request fails, retain the current draft, resolve the reported provider/access issue and retry; do not assume either language was saved.

Money displays follow the owning currency and active locale. Financial controls preserve exact two-decimal values across language changes; translated labels do not change denomination or calculation rules.
