# Agreement documents

Use **Documents** to produce an Agreement file from a stream template, then review and download it for use. The tab also keeps previously generated files. Each file is a snapshot of the data at generation: correcting the Agreement or changing the template does not update it. Generate a new file after corrections.

## Required setup and access

| Requirement | What you need |
| --- | --- |
| Stream template | It must be active, non-deleted, target `fundingcaseagreement`, belong to the agreement's current stream, and have active English and French source attachments. |
| Template kind | `docx` or `html`. The configured output list can include the native kind and `pdf`; incompatible native formats are rejected. |
| Conversion tools | DOCX-to-PDF requires LibreOffice. HTML-to-PDF requires Puppeteer's browser. See [Document generation](../developer/document-generation.md). |
| Persistent storage | The Agency must select a registered storage provider. Back up its objects and the database metadata needed to locate them. See [Operator configuration](../operator/configuration.md). |
| Agreement authorization | Viewer lists templates/files and downloads; Contributor plus the exact Agreement assignment generates; Manager plus that assignment removes an artifact. |

If the Generate window offers no template, generation is disabled. Ask your administrator to check the template’s stream, target, active status and English/French source attachments. The tab loads available templates when opened, and generation checks that the selected template is still eligible.

## Generate a document

Select **Generate**, then choose:

| Field | Behaviour |
| --- | --- |
| Template | Defaults to the first eligible template returned by ID. Names and descriptions follow the interface language. |
| Language | `eng` or `fra`; defaults from the current interface locale and selects the matching source attachment. |
| Output format | Resets to the first format allowed by the selected template if the previous choice is incompatible. DOCX can produce `docx` or `pdf`; HTML can produce `html` or `pdf` when configured. |

Generation uses the Agreement and template as they stood when the request began. Before saving the file, the system checks your access and whether the source data changed. If someone changed those inputs during generation, `DOCUMENT_RENDER_INPUT_CHANGED` (409) prevents saving an outdated file. Reload the Agreement and generate again. The filename includes the Agreement number, localized template name, language and extension, with unsafe characters replaced.

At most two renders per Agency/user can run concurrently in one server process. If generation returns `DOCUMENT_RENDER_BUSY` (429), wait for an existing request to finish before retrying. Browser and office conversions also have time limits; a timeout does not mean a usable document was saved. Refresh the list before repeating an uncertain request.

Review every generated document before using it. Generation does not check legal readiness or whether you completed every field. Missing or empty values appear as `To be confirmed` in English and `A confirmer` in French.

For example, generate an English PDF for a contribution agreement. Check the recipient’s address, authorized dates and budget totals. If an address is missing, correct the source record and generate a replacement; the earlier PDF keeps its original contents.

Check any department name, legal name and address in the result. The built-in data does not supply invented values for `department.name`, `department.legalName` or `department.address`; without data from an authorized integration, those fields show the missing-value text. Ask your template administrator to include the correct legal wording or arrange for the integration to supply it before issuing the document.

## Data captured in the snapshot

The built-in context includes localized agreement, agency, program and stream data; the first linked recipient and its first active address; all recipients; current activities, responsible parties and outcomes; current budget years and lines with formatted totals; commitments; payments; claims; and forecasts. It also provides schedule-style budget summaries and CAD formatting.

“Primary recipient” means the first active agreement-recipient link by database ID; it is not selected through a separate primary-recipient field. Current activity and budget versions are used, while operational collections such as commitments, payments, claims, and forecasts include non-deleted records without filtering them to terminal status.

DOCX sources support dotted Docxtemplater tags and array sections. HTML sources support `&#123;&#123; dotted.path &#125;&#125;` and `&#123;&#123;# collection&#125;&#125;...&#123;&#123;/ collection&#125;&#125;`; substituted values are HTML-escaped. HTML-to-PDF disables JavaScript and blocks network requests other than `data:` and `about:` resources. Native HTML output preserves trusted template markup and is downloaded as HTML.

## Amendment documents

Open a draft amendment’s **Documents** tab to generate an amendment-specific artifact. The tab requires parent Agreement read access because the document includes parent business data. Generation requires Contributor plus the exact amendment assignment; deletion requires Manager plus that assignment. Only a draft amendment whose parent remains amendable accepts generation/deletion. Historical files remain readable and downloadable with parent Viewer access.

Configure an active Stream-linked template targeting `fundingcaseamendment`, with both language attachments. The same Generate dialog, native/PDF formats and converter requirements apply. Its parent Agreement fields continue to describe the current Agreement. The separate `amendment` fields describe the proposal, selected types/subtypes, proposed dates, snapshot budget/activities and captured risk. Before completion, risk is the draft proposal; after completion it comes from the immutable submission packet. If no domain snapshot exists, the corresponding amendment budget/activity context falls back to the current parent domain.

For example, a draft proposes a later end date and a new budget. Generate using the amendment template, check both proposed dates and proposed line amounts, and compare them with the current Agreement fields. Save corrections in the draft and generate a new artifact; existing files never update. If the source changes during rendering, `DOCUMENT_RENDER_INPUT_CHANGED` rejects saving the stale result: reload both parent and amendment and generate again. Agreement and Closeout templates/files are excluded from this list.

## List and download

The newest generated document appears first. The table displays the localized saved template name, requested language, output format, generation timestamp, and actions. Search and pagination run on the server; searching either saved bilingual document name resets the page. Agreement, amendment and Closeout lists remain separate, and an artifact from another scope cannot be downloaded by changing its URL.

You need Agreement read access to download an active file belonging to that Agreement. The download returns the saved contents and filename, not a newly generated version. Files stay in their original storage location even if the Agency changes the provider used for new files. If an older file cannot be downloaded, ask your administrator to check access to that storage.

## Delete and recovery

Deleting a generated document removes it and its attachment from normal lists and downloads (`_deleted = true`). It never deletes the stream template. The system also attempts to remove the stored file. If storage cleanup fails, deletion can still succeed in the application; the failure is logged as `storage_cleanup_failed` for operators to investigate.

::: warning Backing-file cleanup is best effort
A successful delete can therefore leave orphaned bytes in the provider’s storage. They are no longer listable or downloadable through the document routes. Operators should monitor cleanup errors and reconcile storage against active attachment metadata using an approved administrative procedure; do not restore access by manually clearing `_deleted` flags.
:::

There is no restore action in the core interface. After an uncertain generation result, refresh the list before retrying to avoid creating another snapshot. After an uncertain deletion result, refresh before repeating the action.

## API summary

This section is for integrations and support. Use **Generate** and the document list for ordinary document work.

| Route | Permission and result |
| --- | --- |
| `GET /api/agreements/{id}/document-templates` | `read`; active compatible stream templates and both attachment summaries. |
| `GET /api/agreements/{id}/documents` | `read`; paginated active Agreement-only rows, with literal-safe bilingual saved-name search. |
| `POST /api/agreements/{id}/documents/generate` | `create`; localized validation of `templateId`, `language`, and `outputFormat`, then a freshly authorized snapshot. |
| `GET /api/agreements/{id}/documents/{documentId}/download` | `read`; stored bytes only when both row and attachment are active and agreement-owned. |
| `DELETE /api/agreements/{id}/documents/{documentId}` | `delete`; transactional metadata soft deletion followed by best-effort object cleanup. |

Failures include localized missing-ID, agreement/template/document-not-found, disallowed-output, validation, storage, rendering, and `LIBREOFFICE_UNAVAILABLE` responses. A generation or download failure does not produce a success toast; correct the source data, template, storage permissions, or converter dependency before retrying.
