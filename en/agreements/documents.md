# Agreement documents

The **Documents** tab generates files from the agreement stream's templates, lists earlier generated artifacts, downloads their stored bytes, and logically deletes them. Generated documents are snapshots: later agreement or template changes do not update an existing file.

## Required setup and access

| Requirement | Current contract |
| --- | --- |
| Stream template | It must be active, non-deleted, target `fundingcaseagreement`, belong to the agreement's current stream, and have active English and French source attachments. |
| Template kind | `docx` or `html`. The configured output list can include the native kind and `pdf`; incompatible native formats are rejected. |
| Conversion tools | DOCX-to-PDF requires LibreOffice. HTML-to-PDF requires Puppeteer's browser. See [Document generation](../developer/document-generation.md). |
| Persistent storage | The local attachment root must be durable and backed up with the database. See [Operator configuration](../operator/configuration.md). |
| Agreement authorization | Viewer lists templates/files and downloads; Contributor plus the exact Agreement assignment generates; Manager plus that assignment removes an artifact. |

If no eligible template exists, the modal has no template to select and generation remains disabled. Template availability is not cached permanently: the tab loads it when mounted, while every generation request revalidates the template against the agreement stream.

## Generate a document

Select **Generate**, then choose:

| Field | Behaviour |
| --- | --- |
| Template | Defaults to the first eligible template returned by ID. Names and descriptions follow the interface language. |
| Language | `eng` or `fra`; defaults from the current interface locale and selects the matching source attachment. |
| Output format | Resets to the first format allowed by the selected template if the previous choice is incompatible. DOCX can produce `docx` or `pdf`; HTML can produce `html` or `pdf` when configured. |

The server refreshes `create` authorization inside a transaction. It reads the selected source file, builds a current agreement context, renders the requested format, stores a new common attachment, and inserts a generated-document row. The saved filename combines the agreement number, localized template name, language code, and extension; unsafe filename characters are replaced.

Generation is not a legal-readiness or data-completeness check. Missing and empty values render as `To be confirmed` in English and `A confirmer` in French. Review every artifact before use.

::: warning Department fields are not agency-derived
The current built-in `department.name`, `department.legalName`, and `department.address` values are fixed Health Canada text. They do not follow the agreement's configured agency. For another agency, do not issue a generated document that uses these tags until the content has been independently corrected or a supported integration supplies an appropriate replacement context.
:::

## Data captured in the snapshot

The built-in context includes localized agreement, agency, program and stream data; the first linked recipient and its first active address; all recipients; current activities, responsible parties and outcomes; current budget years and lines with formatted totals; commitments; payments; claims; and forecasts. It also provides schedule-style budget summaries and CAD formatting.

“Primary recipient” means the first active agreement-recipient link by database ID; it is not selected through a separate primary-recipient field. Current activity and budget versions are used, while operational collections such as commitments, payments, claims, and forecasts include non-deleted records without filtering them to terminal status.

DOCX sources support dotted Docxtemplater tags and array sections. HTML sources support `&#123;&#123; dotted.path &#125;&#125;` and `&#123;&#123;# collection&#125;&#125;...&#123;&#123;/ collection&#125;&#125;`; substituted values are HTML-escaped. HTML-to-PDF disables JavaScript and blocks network requests other than `data:` and `about:` resources. Native HTML output preserves trusted template markup and is downloaded as HTML.

## List and download

The newest generated document appears first. The table displays the localized saved template name, requested language, output format, generation timestamp, and actions. It is a client-filtered list rather than a paginated server query.

Download rechecks agreement `read` access and requires the generated row and attachment to be active and belong to the requested agreement. The response uses the stored MIME type, byte length, and attachment filename in a safe `Content-Disposition` header. The local provider rejects absolute/traversal paths, symbolic links, wrong ownership, and unsafe POSIX permissions before reading bytes.

## Delete and recovery

Deletion refreshes agreement `delete` authorization, then atomically marks both the generated-document row and its common attachment `_deleted = true`. It never deletes the stream template. After the database transaction commits, the server attempts to delete the backing object. A missing object is tolerated; another cleanup failure is logged as `storage_cleanup_failed`, while the API still returns success because the metadata is already deleted.

::: warning Backing-file cleanup is best effort
A successful delete can therefore leave orphaned bytes in the private storage tree. They are no longer listable or downloadable through the document routes. Operators should monitor cleanup errors and reconcile storage against active attachment metadata using an approved administrative procedure; do not restore access by manually clearing `_deleted` flags.
:::

There is no restore action in the core interface. After an uncertain generation result, refresh the list before retrying to avoid creating another snapshot. After an uncertain deletion result, refresh before repeating the action.

## API summary

| Route | Permission and result |
| --- | --- |
| `GET /api/agreements/{id}/document-templates` | `read`; active compatible stream templates and both attachment summaries. |
| `GET /api/agreements/{id}/documents` | `read`; all active generated rows for the agreement. |
| `POST /api/agreements/{id}/documents/generate` | `create`; localized validation of `templateId`, `language`, and `outputFormat`, then a freshly authorized snapshot. |
| `GET /api/agreements/{id}/documents/{documentId}/download` | `read`; stored bytes only when both row and attachment are active and agreement-owned. |
| `DELETE /api/agreements/{id}/documents/{documentId}` | `delete`; transactional metadata soft deletion followed by best-effort object cleanup. |

Failures include localized missing-ID, agreement/template/document-not-found, disallowed-output, validation, storage, rendering, and `LIBREOFFICE_UNAVAILABLE` responses. A generation or download failure does not produce a success toast; correct the source data, template, storage permissions, or converter dependency before retrying.
