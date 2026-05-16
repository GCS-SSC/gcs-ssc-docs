# Agreement Documents

The Documents tab generates agreement documents from stream-scoped document templates and stores the generated files on the agreement.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Stream document templates | At least one active template must exist on the agreement's stream before users can generate a document. |
| Template attachments | Templates require English and French source files. |
| Document generation tools | PDF output requires the configured local or deployed document-generation tooling. |
| Agreement update permission | Required to generate or delete generated documents. Agreement read access is enough to view and download existing documents. |

## Generate flow

The generate action captures:

| Field | Rule |
| --- | --- |
| Template | Selected from active templates for the agreement's stream. |
| Language | English or French. Defaults from the current UI language. |
| Output format | Must be one of the selected template's allowed formats. |

Generated records show name, language, output format, generated date, and actions. Download returns the generated attachment. Delete soft-deletes the generated document record and removes it from the normal list.

## Template data

Document templates can use agreement context tags. DOCX templates support normalized double-brace tags such as `agreement.number` and section loops such as `# activities` and `/ activities`. HTML templates use the same tag syntax and render to PDF.

The built-in agreement context includes agreement, agency, department, program, stream, primary recipient, all recipients, budget summaries and line items, activities, outcomes, commitments, payments, claims, and forecasts. Missing values render as a language-specific fallback instead of failing the document.

## Output formats

DOCX templates can generate DOCX or PDF when those formats are enabled on the template. HTML templates generate PDF only.
