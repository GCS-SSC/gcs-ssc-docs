# Attachments

Use **Attachments** to upload supporting files to a proponent, an Agreement, or an individual amendment, Claim, reconciliation, Commitment, Forecast, Monitor, Payment, Closeout, or Funding Case Intake. Each attachment belongs to that exact record. An attachment on a Claim is not an Agreement-wide attachment and does not automatically appear on another Claim.

Generated documents have their own [Documents](../agreements/documents.md) workflow. Uploading a file does not generate a document, complete work, or approve its contents.

## Access and setup

| Action | Required access |
| --- | --- |
| List and download | Viewer access to the target’s owning Proponent, Agreement or Funding Case scope; no work assignment is required. |
| Upload or edit metadata | Contributor/update access plus assignment to the exact target record. Parent Agreement assignment does not replace a child assignment. |
| Delete | Manager/delete access plus assignment to the exact target. |

The record’s status can prevent changes even when you have the required access. Agreement-wide locks can also protect the Agreement and its related records. For example, being able to read a completed record does not mean you can add a file to it. The Agency needs an enabled, configured storage provider selected for new files and at least one active **Attachment Type**. Administrators manage types in [Agencies](../admin/agencies.md); operators manage the provider’s storage infrastructure.

The table shows bilingual name and description, original filename, type, MIME type (the reported file format), size, uploader, and upload time. Names, descriptions and types are metadata: information describing the file, rather than its contents. Search and pagination apply to the current target. A failed list request shows a retry action; it is not an empty attachment list, and write controls remain unavailable until a successful load.

## Upload a supporting file

1. Open the exact record’s **Attachments** tab and choose **Upload**.
2. Select one file, no larger than **10 MiB**. The file and its form fields are sent together (a multipart request); their combined limit is 10 MiB plus 512 KiB.
3. Select an active Attachment Type from the owning Agency.
4. Enter an English and French name (each at most 255 characters) and description (each at most 10,000 characters). All four values are required and trimmed.
5. Complete any additional fields supplied by the selected storage provider, then save.
6. Confirm the new row and download it to check that you attached the intended file.

For example, on Claim 42, upload `receipts-march.pdf`, choose the Agency’s “Receipts / Reçus” type, and enter “March receipts / Reçus de mars” with descriptions identifying the reporting period. The file remains evidence on Claim 42; its upload does not submit or reconcile the Claim.

A filename must be nonempty, at most 255 characters, and contain no control characters. There is no general host file-extension allowlist in this upload contract. MIME metadata is not a certification of file safety or content. Apply the organization’s handling rules for uploaded documents.

## Intake files and Opportunity types

For a [Funding Case Intake](../intake/funding-case-intakes.md), attachment rights use `funding_case` at its Opportunity's Program scope. Upload, metadata changes and deletion require that exact Intake assignment and a workable status. An Agreement or Proponent assignment does not grant access. New uploads can use only active Agency Attachment Types currently associated with the Intake's Opportunity; configure those associations on the [Opportunity](../intake/opportunities.md), not by uploading a file there. Its Internal flag is association configuration, not a staff assignment or server permission.

The manual Intake dialog may stage several files before an Intake ID exists. Each file has the same 10 MiB and 255-character filename limits and required bilingual metadata as ordinary uploads. Staging appears only if the Agency provider is available and contributes no extra provider metadata. Changing Opportunity clears the staged files. If the provider needs metadata or is unavailable, save the Intake first and use its Attachments tab with the full form.

Save creates the Intake first, then uploads the staged files in sequence. Upload stops at the first failure, so earlier files can remain saved and later files may not have been attempted. Open the saved Intake, inspect its attachment list and upload the missing files. Keep the host Intake ID; a file error is not a reason to create another Intake. Intake dates/status and exact authorization are checked again at save/upload, even after a successful capability lookup.

## Edit, download, or delete

**Edit** changes the type, bilingual names, descriptions, and eligible provider fields. It does not change the contents of the uploaded file. To supply a revised file, upload a new attachment with a clear version description; delete the obsolete attachment only when authorized by the business process. The effective Attachment Type must still be active in the Agency when metadata is saved; if its old type was retired, select an active replacement.

Provider fields may be upload-only or editable. Existing files retain the provider that stored them, even after the Agency selects a different provider for new uploads. Consequently, the fields shown while editing an old attachment can differ from those on a new upload.

The file information held by GCS-SSC (the host) and the extra information held by the storage service (the provider) can require two separate saves. If the host fields save but the provider update fails, the form reopens with the saved host values and the unsaved provider draft, and displays a partial-update warning. Correct or retry the remaining provider fields; do not assume that the earlier label changes rolled back.

**Download** checks access to the exact target and retrieves the file from the storage provider recorded for that attachment. **Delete** asks for confirmation, removes the attachment from active use, and queues removal of the stored file for background processing. A successful deletion does not promise that the file has already disappeared from external storage. There is no user restore action.

## Failure and recovery

| Symptom | What to check |
| --- | --- |
| Upload is unavailable | Refresh the list; check exact assignment, update access, business status, and Agency storage setup. |
| Type is missing or rejected | Confirm it belongs to this Agency and remains active; select it again after a concurrent change. |
| File is too large | Reduce the file below 10 MiB and keep the whole request within its metadata allowance. |
| Provider changed during upload | Reload and retry using the newly selected configuration. The server will not finish saving an upload against an out-of-date provider selection. |
| Storage provider unavailable | Ask the operator to check provider registration, enablement, configuration, credentials, and service availability. Repeated uploads are not a repair for missing storage. |
| Metadata partially saved | Keep the saved host fields, correct the remaining provider draft, and retry. |
| Deleted file still exists in storage | Operators should inspect the durable cleanup queue; see [Background work](../operator/background-work.md). |

The server rechecks authorization, assignment, target lifecycle, type, and provider selection after the external upload, before committing attachment metadata. If finalization fails, it attempts to remove the new object and records deferred cleanup when possible. If the cleanup request itself could not be saved, operators must investigate the logged failure and check whether a file remains in external storage. Officers should report the record and upload error rather than repeatedly adding the same file.
