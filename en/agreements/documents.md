# Agreement documents

Use **Documents** to generate an agreement file from a stream template, then review and download it. The tab also keeps previously generated files. Each file keeps the data used to generate it. Correcting the agreement or changing the template does not update an existing file. Generate a new file after corrections.

## Required setup and access

| Requirement | What you need |
| --- | --- |
| Stream template | Your administrator must assign an active agreement template to the stream, with English and French source files. |
| Template kind | `docx` or `html`. The configured output list can include the native kind and `pdf`; incompatible native formats are rejected. |
| Conversion tools | DOCX-to-PDF requires LibreOffice. HTML-to-PDF requires Puppeteer's browser. See [Document generation](../developer/document-generation.md). |
| File storage | Your administrator must configure storage for generated files. See [Operator configuration](../operator/configuration.md). |
| Agreement access | Viewer can list and download files. Contributor plus assignment to this agreement can generate files. Manager plus that assignment can delete files. |

If the **Generate** window offers no template, you cannot generate a document. Ask your administrator to check that the template is active, belongs to the stream, targets agreements, and has both language attachments. The tab loads available templates when opened, and generation checks that the selected template is still eligible.

## Generate a document

The application checks your current assignment and the agreement status before opening **Generate** and again before saving. If the agreement becomes read-only or you lose your assignment, the dialog keeps your choices. Ask the responsible manager to resolve the restriction before trying again.

Select **Generate**, then choose:

| Field | Behaviour |
| --- | --- |
| Template | Defaults to the first eligible template returned by ID. Names and descriptions follow the interface language. |
| Language | `eng` or `fra`; defaults from the current interface locale and selects the matching source attachment. |
| Output format | Resets to the first format allowed by the selected template if the previous choice is incompatible. DOCX can produce `docx` or `pdf`; HTML can produce `html` or `pdf` when configured. |

Generation uses the agreement and template as they stood when the request began. Before saving, the system checks your access and whether the source data or template changed. If either changed, `DOCUMENT_RENDER_INPUT_CHANGED` (409) prevents saving an outdated file. Reload the agreement and generate again. The filename includes the Agreement number, localized template name, language and extension, with unsafe characters replaced.

You can have at most two document generations running at once for the same agency. If generation returns `DOCUMENT_RENDER_BUSY` (429), wait for an existing request to finish before retrying. Browser and office conversions also have time limits; a timeout does not mean a usable document was saved. Refresh the list before repeating an uncertain request.

Review every generated document before using it. Generation does not check legal readiness or whether you completed every field. Missing or empty values appear as `To be confirmed` in English and `A confirmer` in French.

For example, generate an English PDF for a contribution agreement. Check the recipient's address, authorized dates and budget totals. If an address is missing, correct the source record and generate a replacement; the earlier PDF keeps its original contents.

Check any department name, legal name and address in the result. If the template or an integration does not supply the department details, those fields show the missing-value text. Ask your template administrator to include the correct legal wording or arrange for the integration to supply it before issuing the document.

## Data captured in the snapshot

Templates can use the following data in the selected language:

- Agreement, agency, program, and stream details.
- All linked recipients, with the first recipient and its first active address used as the primary recipient.
- Current activities, responsible parties, and outcomes.
- Current budget years and lines, formatted totals, and budget summaries for schedules.
- Commitments, payments, claims, and forecasts.

Amounts can use Canadian dollar formatting.

The document uses the first saved active recipient link as its primary recipient. There is no separate primary-recipient selector. The document uses current activity and budget versions. Commitments, payments, claims, and forecasts include all records that have not been deleted, including records still in progress.

For template syntax and integration fields, see [Document generation](../developer/document-generation.md).

## Amendment documents

Open a draft amendment's **Documents** tab to generate a document for that amendment. You need read access to the agreement because the document includes its data. To generate a file, you need Contributor access and assignment to the amendment. To delete one, you need Manager access and the same assignment. Both actions require a draft amendment whose agreement still allows amendments. Viewer access to the agreement lets you read and download historical files.

Ask your administrator to configure an active template for the stream that targets `fundingcaseamendment` and has both language attachments. The same Generate dialog, output formats, and conversion requirements apply.

Agreement fields describe the current agreement. The separate `amendment` fields describe the proposed changes, selected types and subtypes, proposed dates, saved budget and activity copies, and risk. Before completion, risk comes from the draft proposal. After completion, it comes from the fixed submission record. If the amendment has no saved budget or activity copy, the document uses the corresponding current agreement data.

For example, a draft proposes a later end date and a new budget. Generate using the amendment template, check both proposed dates and proposed line amounts, and compare them with the current Agreement fields. Save corrections in the draft and generate a new document; existing files never update. If the source changes during rendering, `DOCUMENT_RENDER_INPUT_CHANGED` prevents saving the outdated result. Reload both the agreement and amendment, then generate again. This list excludes agreement and closeout templates and files.

## List and download

The newest generated document appears first. The table displays the localized saved template name, requested language, output format, generation timestamp, and actions. Search either saved English or French document name. A new search starts at the first page. Agreement, amendment and closeout documents have separate lists.

You need Agreement read access to download an active file belonging to that Agreement. The download returns the saved contents and filename, not a newly generated version. Files stay in their original storage location even if the Agency changes the provider used for new files. If an older file cannot be downloaded, ask your administrator to check access to that storage.

## Delete and recovery

Deleting a generated document removes it and its attachment from normal lists and downloads. It never deletes the stream template. The system also attempts to remove the stored file. If storage cleanup fails, deletion can still succeed in the application; the failure is logged as `storage_cleanup_failed` for operators to investigate.

There is no restore action in the core interface. After an uncertain generation result, refresh the list before retrying to avoid creating another snapshot. After an uncertain deletion result, refresh before repeating the action.

For generation errors, ask your administrator to check the source data, template, storage access, and conversion tools. Integration routes and rendering details are described in [Document generation](../developer/document-generation.md).
