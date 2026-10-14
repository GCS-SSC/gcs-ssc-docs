# Document generation

Document generation fills a Stream’s English or French template with agreement data and saves the resulting file. Officers choose the template, language, and output format; trusted administrators prepare the templates. Developers maintain the rendering and storage services described below. The user steps and five API route contracts are documented in [Agreement documents](../agreements/documents.md).

For example, an officer can generate a contribution agreement after checking its recipient and budget. The saved file reflects the data used for that generation; later agreement edits do not update it automatically. If the agreement changes, generate a new document when the process permits it.

## Runtime pipeline

The generation route first checks access and captures the agreement data. It finds the exact active template and requested format, then loads the template file for the chosen language from its recorded storage provider. It prepares the data in that language and fills the template (rendering). Rendering happens outside the Agreement write transaction so document conversion does not hold that transaction open.

A process-local admission limit permits two concurrent renders per Agency/user pair; further requests return `429 DOCUMENT_RENDER_BUSY`. After rendering, a short Agreement write transaction checks access again, including scope, assignment, and lifecycle. It compares a SHA-256 hash (a fingerprint) of the current core data with the data used for rendering. If that data changed, the request returns `409 DOCUMENT_RENDER_INPUT_CHANGED` and does not save the outdated output. Refresh and generate again once edits are finished.

For example, if someone changes the budget while a PDF is being generated, this check prevents the system from saving a document based on the previous budget.

Persistence writes a provider object, a common attachment, and a generated-document record. A metadata failure attempts object cleanup; a generated-record failure retires and cleans up its attachment. External storage and database commit are not one atomic transaction. Generated-document/template cleanup uses best-effort compensation and logs failures; do not assume every such failure has a job in the shared-upload cleanup outbox.

## Rendering and trust boundary

DOCX processing normalizes double-brace tags in `word/*.xml`, then uses Docxtemplater with paragraph loops, line breaks, parent-scope lookup, and localized null fallback. HTML processing supports dotted substitutions and one collection-loop form and escapes every substituted value.

HTML-to-PDF starts a shared headless Puppeteer browser, disables page JavaScript, and aborts requests except `data:` and `about:`. DOCX-to-PDF uses `libreoffice-convert`; `LIBREOFFICE_SOFFICE_PATH` overrides the repository `scripts/soffice-flatpak` wrapper. Conversion failure becomes localized `LIBREOFFICE_UNAVAILABLE`. LibreOffice conversion has a 30-second deadline. Chromium uses one 30-second render budget across its stages and a separate two-second cleanup bound, rather than granting every stage a fresh full timeout.

Template authors are privileged content authors. Native HTML retains template markup, and Puppeteer launches with `--no-sandbox`; deploy the service in the documented non-root/container boundary and permit only trusted administrators to manage templates.

## Context contract

The **context** is the set of named values a template can insert. A dotted path identifies a value inside it; for example, `budget.fiscalYearCount` is the number of funded fiscal years in the budget. Stable top-level keys currently include `agreement`, `agency`, `program`, `stream`, `recipient`, `budget`, `activities`, `outcomes`, `expectedOutcomes`, `commitments`, `payments`, `claims`, and `forecasts`. Missing values use `To be confirmed` or `A confirmer`; dates become ISO `YYYY-MM-DD` and money uses localized CAD formatting.

The built-in context does not supply a `department` object; unresolved department paths receive the localized missing-value fallback. `recipient.primary` is the first linked recipient by ID, with the first active address found for it. Template authors must account for both boundaries.

The helper sequentially deep-merges functions found in `event.context.documentGenerationContextProviders`. No current host plugin, module, or installed extension registers that property. Treat it as an event-local internal integration seam, not as a declared extension SDK capability. If an authorized host integration supplies providers, later providers replace scalar/array values and recursively merge object values; providers hydrate the render input outside the final Agreement write transaction and may fail the request.

## Word conditions and custom fields

A Word condition includes a passage only when its test is true. For example, the first block below adds annual-report wording only when the budget spans more than one fiscal year; the second lists proposed budget items only when the amendment has a budget snapshot. DOCX supports single- or double-brace conditional sections, including tags split across Word formatting runs. Use `#if expression` and `/if`; conditions can appear in document body and headers and inside existing array loops.

Numeric comparisons support `=`, `!=`, `>`, `>=`, `<`, `<=`; equality also accepts matching string or boolean types. Combine comparisons with `and`, `or` and parentheses (`and` binds first).

Conditions require scalar paths and literals: no JavaScript, array-membership operator, coercion, `==`, nested condition blocks or `else`. Missing/null operands produce false; incompatible types produce an error. Expressions cannot cross lines and are limited to 2,048 characters.

```text
{#if budget.fiscalYearCount > 1}
Submit an annual report for each funded year.
{/if}
{#if amendment.hasBudgetSnapshot = true}
{#amendment.budget.lineItems}{description}{/amendment.budget.lineItems}
{/if}
```

Use numeric context values for numeric comparisons, not formatted currency strings. Formatting and numbering properties survive removal of conditional content. HTML retains its existing substitution/loop contract and does not evaluate Word `#if` blocks. Invalid syntax, blocks or runtime types return localized `DOCUMENT_CONDITION_INVALID` with the expression: correct and re-upload both template languages, then regenerate rather than editing stored artifacts.

Saved custom fields appear at `agreement.customFields.{fieldId}` as document-language display text, and in ordered `agreement.customFieldEntries` entries `{ id, name, value }`. `agreement.customFieldValues.{fieldId}` retains raw numeric/text values and relational option IDs (an array for multiple selection), suitable for supported scalar conditions. Empty fields are omitted; saved retained inactive options still resolve their localized labels, and missing option labels use the ordinary fallback. Use stable field IDs, not translated labels, as lookup keys.

```text
{#agreement.customFieldEntries}{name}: {value}
{/agreement.customFieldEntries}
{#if agreement.customFieldValues.42 >= 10}
Additional reporting is required.
{/if}
```

Here 42 is an illustrative Agency number-field ID; replace it with the actual assigned field ID. The condition does not work against a text or multiple-selection field.

## Amendment context and routes

Amendment documents use `/api/agreements/{id}/amendments/{amendmentId}/document-templates`, `/documents`, `/documents/generate` and `/documents/{documentId}` download/delete routes. The generation body remains `{ templateId, language, outputFormat }`. Parent read authorization precedes exact amendment mutation authorization. The final protected transaction rechecks both lifecycle and the complete parent/proposal core-context hash; stale rendering returns `DOCUMENT_RENDER_INPUT_CHANGED`.

For a modification document, keep the existing agreement and the proposed changes distinct. Top-level Agreement context remains current parent data. `amendment` adds `id`, `number`, `name`, `status`, `isOpen`, selected `types`, `subtypes`, `typeIds`, `subtypeIds`, nullable `proposedStartDate`/`proposedEndDate`, `hasBudgetSnapshot`, `hasActivitySnapshot`, and proposal `budget`, `activities`, `outcomes`, `expectedOutcomes`. Risk keys are `changeRisk`, `applyRisk`, `proposedRiskScore`, localized `proposedRiskRating` and versioned `risk`. After submission these use the exact packet’s captured risk, while legacy packets retain an absent risk section.

For example, use `amendment.proposedEndDate` when a template needs the proposed end date; an Agreement-level value still describes the current parent agreement.

The generated-document row carries nullable `egcs_fc_amendment`. Its composite ownership constraint binds it to the same Agreement and excludes simultaneous Closeout scope. Lists and download/delete lookups enforce exact scope. Filename suffixes use the amendment number or stable ID for an unnumbered draft. See [Agreement documents](../agreements/documents.md) for the user journey.

## Storage and records

`writeStoredFile` sanitizes proposed object-name segments, creates or reuses an Agency attachment type, and delegates bytes to the Agency’s selected provider. The attachment stores the provider ID, opaque object identity, server-only JSON locator, MIME type, size, original filename, bilingual metadata, and creation time. `Funding_Case_Agreement_Generated_Document` links the Agreement, template, generated attachment, language, and output format.

Each saved document remembers where its file is stored. Reads and deletion use that saved provider, not the Agency’s current selection for new files. No local-provider fallback exists. Provider credentials, object durability, and infrastructure belong to the provider’s configuration. Preserve all referenced provider implementations and objects with the database backup.

For example, switching the Agency to a new storage provider does not move old documents. The old provider must remain available to download them.

Generated-document deletion retires its row and attachment, then attempts external cleanup. Cleanup failure is logged and does not restore metadata. Downloads require the exact accessible active relationship and return stored MIME/name/length headers. These generated records are separate from the manually uploaded [Attachments](../concepts/attachments.md) list.

## Local tools

On Linux or WSL, install repository-local conversion tools from the application root:

```bash
bun run bun:docgen:install
bun run dev
```

The installer updates `LIBREOFFICE_SOFFICE_PATH` and `PUPPETEER_CACHE_DIR` in the regular Nuxt `.env`. Set `DOCGEN_ENV_FILE=.env.production` only when intentionally targeting another environment file. See [Developer startup](./startup.md) and [Operator deployment](../operator/deployment.md).
