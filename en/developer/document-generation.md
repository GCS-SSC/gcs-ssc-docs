# Document generation

Agreement document generation joins stream-scoped bilingual templates, live agreement data, provider-backed attachment storage, and a generated-document snapshot row. The user workflow and five route contracts are documented in [Agreement documents](../agreements/documents.md).

## Runtime pipeline

The generate route captures an authorized database snapshot, resolves the exact active template and requested format, and loads its language-specific source through the attachment’s recorded storage provider. It hydrates the localized context and performs rendering outside the Agreement write transaction.

A process-local admission limit permits two concurrent renders per Agency/user pair; further requests return `429 DOCUMENT_RENDER_BUSY`. After rendering, a short fresh-authorized Agreement write rechecks scope, assignment, lifecycle, and a SHA-256 hash of the current core context. Changed input returns `409 DOCUMENT_RENDER_INPUT_CHANGED` instead of saving output made from stale core data. Refresh and generate again after the source work settles.

Persistence writes a provider object, a common attachment, and a generated-document record. A metadata failure attempts object cleanup; a generated-record failure retires and cleans up its attachment. External storage and database commit are not one atomic transaction. Generated-document/template cleanup uses best-effort compensation and logs failures; do not assume every such failure has a job in the shared-upload cleanup outbox.

## Rendering and trust boundary

DOCX processing normalizes double-brace tags in `word/*.xml`, then uses Docxtemplater with paragraph loops, line breaks, parent-scope lookup, and localized null fallback. HTML processing supports dotted substitutions and one collection-loop form and escapes every substituted value.

HTML-to-PDF starts a shared headless Puppeteer browser, disables page JavaScript, and aborts requests except `data:` and `about:`. DOCX-to-PDF uses `libreoffice-convert`; `LIBREOFFICE_SOFFICE_PATH` overrides the repository `scripts/soffice-flatpak` wrapper. Conversion failure becomes localized `LIBREOFFICE_UNAVAILABLE`. LibreOffice conversion has a 30-second deadline. Chromium uses one 30-second render budget across its stages and a separate two-second cleanup bound, rather than granting every stage a fresh full timeout.

Template authors are privileged content authors. Native HTML retains template markup, and Puppeteer launches with `--no-sandbox`; deploy the service in the documented non-root/container boundary and permit only trusted administrators to manage templates.

## Context contract

Stable top-level keys currently include `agreement`, `agency`, `department`, `program`, `stream`, `recipient`, `budget`, `activities`, `outcomes`, `expectedOutcomes`, `commitments`, `payments`, `claims`, and `forecasts`. Missing values use `To be confirmed` or `A confirmer`; dates become ISO `YYYY-MM-DD` and money uses localized CAD formatting.

The built-in `department` object is hard-coded Health Canada data, not agency configuration. `recipient.primary` is the first linked recipient by ID, with the first active address found for it. Template authors must account for both boundaries.

The helper sequentially deep-merges functions found in `event.context.documentGenerationContextProviders`. No current host plugin, module, or installed extension registers that property. Treat it as an event-local internal integration seam, not as a declared extension SDK capability. If an authorized host integration supplies providers, later providers replace scalar/array values and recursively merge object values; providers hydrate the render input outside the final Agreement write transaction and may fail the request.

## Storage and records

`writeStoredFile` sanitizes proposed object-name segments, creates or reuses an Agency attachment type, and delegates bytes to the Agency’s selected provider. The attachment stores the provider ID, opaque object identity, server-only JSON locator, MIME type, size, original filename, bilingual metadata, and creation time. `Funding_Case_Agreement_Generated_Document` links the Agreement, template, generated attachment, language, and output format.

Reads and deletion use the saved provider, not the Agency’s current selection for new files. No local-provider fallback exists. Provider credentials, object durability, and infrastructure belong to the provider’s configuration. Preserve all referenced provider implementations and objects with the database backup.

Generated-document deletion retires its row and attachment, then attempts external cleanup. Cleanup failure is logged and does not restore metadata. Downloads require the exact accessible active relationship and return stored MIME/name/length headers. These generated records are separate from the manually uploaded [Attachments](../concepts/attachments.md) list.

## Local tools

On Linux or WSL, install repository-local conversion tools from the application root:

```bash
bun run bun:docgen:install
bun run dev
```

The installer updates `LIBREOFFICE_SOFFICE_PATH` and `PUPPETEER_CACHE_DIR` in the regular Nuxt `.env`. Set `DOCGEN_ENV_FILE=.env.production` only when intentionally targeting another environment file. See [Developer startup](./startup.md) and [Operator deployment](../operator/deployment.md).
