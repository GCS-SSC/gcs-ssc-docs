# Document generation

Agreement document generation joins stream-scoped bilingual templates, live agreement data, local attachment storage, and a generated-document snapshot row. The user workflow and five route contracts are documented in [Agreement documents](../agreements/documents.md).

## Runtime pipeline

`generateAgreementDocument` in `server/utils/document-generation.ts` performs this sequence inside the caller's freshly authorized agreement-create transaction:

1. resolve an active `fundingcaseagreement` template on the agreement's current stream;
2. confirm that the requested output occurs in `egcs_tp_outputformats`;
3. read the English or French source attachment through the local provider;
4. build the localized context from current agreement relationships;
5. render native DOCX/HTML or convert it to PDF;
6. write a private common attachment; and
7. insert `Funding_Case_Agreement_Generated_Document`.

An attachment-metadata insert failure removes the newly written object. A generated-row insert failure soft-deletes the attachment and removes its object. Because filesystem bytes are not transactional with PostgreSQL/PGlite, operators must still detect storage/database drift around process or commit failures.

## Rendering and trust boundary

DOCX processing normalizes double-brace tags in `word/*.xml`, then uses Docxtemplater with paragraph loops, line breaks, parent-scope lookup, and localized null fallback. HTML processing supports dotted substitutions and one collection-loop form and escapes every substituted value.

HTML-to-PDF starts a shared headless Puppeteer browser, disables page JavaScript, and aborts requests except `data:` and `about:`. DOCX-to-PDF uses `libreoffice-convert`; `LIBREOFFICE_SOFFICE_PATH` overrides the repository `scripts/soffice-flatpak` wrapper. Conversion failure becomes localized `LIBREOFFICE_UNAVAILABLE`.

Template authors are privileged content authors. Native HTML retains template markup, and Puppeteer launches with `--no-sandbox`; deploy the service in the documented non-root/container boundary and permit only trusted administrators to manage templates.

## Context contract

Stable top-level keys currently include `agreement`, `agency`, `department`, `program`, `stream`, `recipient`, `budget`, `activities`, `outcomes`, `expectedOutcomes`, `commitments`, `payments`, `claims`, and `forecasts`. Missing values use `To be confirmed` or `A confirmer`; dates become ISO `YYYY-MM-DD` and money uses localized CAD formatting.

The built-in `department` object is hard-coded Health Canada data, not agency configuration. `recipient.primary` is the first linked recipient by ID, with the first active address found for it. Template authors must account for both boundaries.

The helper sequentially deep-merges functions found in `event.context.documentGenerationContextProviders`. No current host plugin, module, or installed extension registers that property. Treat it as an event-local internal integration seam, not as a declared extension SDK capability. If an authorized host integration supplies providers, later providers replace scalar/array values and recursively merge object values; providers execute inside the generation transaction and may fail the request.

## Storage and records

`writeStoredFile` sanitizes filename/folder segments, creates or reuses the agency attachment type, writes under bucket `local-document-templates`, and stores provider, object key, MIME type, size, names, descriptions, and creation time. `Funding_Case_Agreement_Generated_Document` references the agreement, template, and generated attachment and checks output format against `docx`, `html`, and `pdf`.

The local storage implementation rejects absolute and traversal paths, symlinks, non-regular objects, wrong POSIX ownership, group/other access, and unsafe ancestor namespaces. It writes an exclusive mode-0600 temporary file and renames it atomically. Configure `GCS_LOCAL_FILE_STORAGE_DIR` as a service-owned durable path and back it up with the database.

Deletion soft-deletes the generated row and attachment transactionally, then deletes bytes after commit. Non-ENOENT cleanup failure is logged but does not reverse metadata deletion. Downloads require agreement ownership plus active row and attachment, then return stored MIME/name/length headers.

## Local tools

On Linux or WSL, install repository-local conversion tools from the application root:

```bash
bun run bun:docgen:install
bun run dev
```

The installer updates `LIBREOFFICE_SOFFICE_PATH` and `PUPPETEER_CACHE_DIR` in the regular Nuxt `.env`. Set `DOCGEN_ENV_FILE=.env.production` only when intentionally targeting another environment file. See [Developer startup](./startup.md) and [Operator deployment](../operator/deployment.md).
