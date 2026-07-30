# Agreement Documents

The Agreement Documents tab generates agreement documents from stream-scoped document templates and stores the generated files on the agreement. It is available from the agreement detail workspace and uses the agreement's stream to find eligible templates.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Stream document templates | The Documents tab can generate files only from active `fundingcaseagreement` templates on the agreement stream. |
| Bilingual template files | Each stream template needs English and French source attachments. |
| Local document generation tools | DOCX-to-PDF and HTML-to-PDF generation need LibreOffice/Puppeteer tooling. Local development can use the installer described in [Startup](../developer/startup.md). |
| Agreement CRUD permissions | `create` generates a document, `read` lists and downloads generated documents, and `delete` soft-deletes a generated document. |

## Tab flow

The Documents tab shows generated documents for the current agreement:

| Column | Contents |
| --- | --- |
| Name | Template name in the current UI language. |
| Language | Generated document language, English or French. |
| Output format | `DOCX` or `PDF`. |
| Generated at | Timestamp when the file was created. |
| Actions | Download with `agreement:read`; delete with `agreement:delete`. |

Generated document rows are retained separately from the source template. Deleting a generated document removes it from the normal list without deleting the stream template.

## Generate modal

The Generate action opens a modal with:

| Field | Rule |
| --- | --- |
| Document template | Active template for the agreement stream and entity type `fundingcaseagreement`. |
| Language | English or French. The default follows the current UI locale. |
| Output format | Limited to the selected template's configured output formats. |

DOCX templates can generate DOCX or PDF when those output formats are enabled. HTML templates generate PDF only.

## Template context

Generation builds a document context from the agreement and related records, including agreement, agency, department, program, stream, primary recipient, all recipients, addresses, activities, outcomes, budgets and budget line items, commitments, payments, claims, and forecasts. Missing values render as a language-specific fallback so generation can complete even when optional data is absent.

DOCX templates use docxtemplater-style tags such as `agreement.number` and section loops such as `# activities` and `/ activities`. HTML templates use the same context for field replacements and collection loops before rendering to PDF.

## Download and delete

Download streams the stored generated attachment using the saved filename from generation and requires `agreement:read`. Delete requires `agreement:delete` and soft-deletes the generated document record.
