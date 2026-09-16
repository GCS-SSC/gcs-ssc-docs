# Attachments

Use **Attachments** to upload supporting files to a proponent, an Agreement, or an individual amendment, Claim, reconciliation, Commitment, Forecast, Monitor, Payment, or Closeout. Each attachment belongs to that exact record. An attachment on a Claim is not an Agreement-wide attachment and does not automatically appear on another Claim.

Generated documents have their own [Documents](../agreements/documents.md) workflow. Uploading a file does not generate a document, complete work, or approve its contents.

## Access and setup

| Action | Required access |
| --- | --- |
| List and download | Viewer access to the target’s owning proponent or Agreement scope; no work assignment is required. |
| Upload or edit metadata | Contributor/update access plus assignment to the exact target record. Parent Agreement assignment does not replace a child assignment. |
| Delete | Manager/delete access plus assignment to the exact target. |

Business-status protection and Agreement aggregate locks also apply to writes. Read access alone does not make a terminal record editable. The Agency needs an enabled, configured storage provider selected for new files and at least one active **Attachment Type**. Administrators manage types in [Agencies](../admin/agencies.md); operators manage the provider’s storage infrastructure.

The table shows bilingual name and description, original filename, type, MIME type, size, uploader, and upload time. Search and pagination apply to the current target. A failed list request shows a retry action; it is not an empty attachment list, and write controls remain unavailable until a successful load.

## Upload a supporting file

1. Open the exact record’s **Attachments** tab and choose **Upload**.
2. Select one file, no larger than **10 MiB**. The complete multipart request, including metadata, is limited to 10 MiB plus 512 KiB.
3. Select an active Attachment Type from the owning Agency.
4. Enter an English and French name (each at most 255 characters) and description (each at most 10,000 characters). All four values are required and trimmed.
5. Complete any additional fields supplied by the selected storage provider, then save.
6. Confirm the new row and download it to check that you attached the intended file.

For example, on Claim 42, upload `receipts-march.pdf`, choose the Agency’s “Receipts / Reçus” type, and enter “March receipts / Reçus de mars” with descriptions identifying the reporting period. The file remains evidence on Claim 42; its upload does not submit or reconcile the Claim.

A filename must be nonempty, at most 255 characters, and contain no control characters. There is no general host file-extension allowlist in this upload contract. MIME metadata is not a certification of file safety or content. Apply the organization’s handling rules for uploaded documents.

## Edit, download, or delete

**Edit** changes the type, bilingual names, descriptions, and eligible provider fields. It does not replace the file bytes. To supply a revised file, upload a new attachment with a clear version description; delete the obsolete attachment only when authorized by the business process. The effective Attachment Type must still be active in the Agency when metadata is saved; if its old type was retired, select an active replacement.

Provider fields may be upload-only or editable. Existing files retain the provider that stored them, even after the Agency selects a different provider for new uploads. Consequently, the fields shown while editing an old attachment can differ from those on a new upload.

Host metadata and provider metadata can require two separate saves. If the host fields save but the provider update fails, the form reopens with the saved host values and the unsaved provider draft, and displays a partial-update warning. Correct or retry the remaining provider fields; do not assume that the earlier label changes rolled back.

**Download** checks access to the exact target and obtains the bytes from the attachment’s saved provider. **Delete** asks for confirmation, removes the attachment from active use, and schedules durable object cleanup. A successful deletion does not promise that the external bytes disappeared immediately. There is no user restore action.

## Failure and recovery

| Symptom | What to check |
| --- | --- |
| Upload is unavailable | Refresh the list; check exact assignment, update access, business status, and Agency storage setup. |
| Type is missing or rejected | Confirm it belongs to this Agency and remains active; select it again after a concurrent change. |
| File is too large | Reduce the file below 10 MiB and keep the whole request within its metadata allowance. |
| Provider changed during upload | Reload and retry using the newly selected configuration. The server rejects stale finalization. |
| Storage provider unavailable | Ask the operator to check provider registration, enablement, configuration, credentials, and service availability. Repeated uploads are not a repair for missing storage. |
| Metadata partially saved | Keep the saved host fields, correct the remaining provider draft, and retry. |
| Deleted file still exists in storage | Operators should inspect the durable cleanup queue; see [Background work](../operator/background-work.md). |

The server rechecks authorization, assignment, target lifecycle, type, and provider selection after the external upload, before committing attachment metadata. If finalization fails, it attempts to remove the new object and records deferred cleanup when possible. Operators must investigate logged cleanup-persistence failures because an external object can then require manual reconciliation.
