# Proponent funding history

The **Funding History** tab combines two sources:

- **System** rows are live GCS-SSC agreements linked to the proponent. Manage them in the agreement workspace.
- **External** rows are manually recorded funding from outside GCS-SSC. They provide history without creating an agreement, budget workflow, review, or payment record.

Open **Proponents**, select a profile, and choose **Funding History**. Search covers agency and program names in both languages, agreement number, and title, where your permissions allow you to read them. The combined results are sorted and paginated after both sources are loaded.

## Visibility and actions

Reading the tab requires read access to the current proponent. A linked system agreement is evaluated separately against agreement scope. If you cannot read it, the row remains visible only as a restricted funding relationship; its names, number, dates, amount, and link are masked. Search never reveals restricted details.

| Record and access | Available action |
| --- | --- |
| Readable system agreement | Open the agreement. Its amount is the sum of active line-item program funding in the current budget version, grouped by currency. |
| Restricted system agreement | See a restricted placeholder only. |
| External record and read-only proponent access | View the row. |
| Contributor access to the current proponent | Add an external record. |
| Update access to every linked proponent | Edit the external details and recipient set. |
| Delete access to the current proponent | Unlink the external record from this proponent. |

Permissions are checked for each affected proponent. Viewer access lets you read its history. To add or edit history, your role must allow Contributor actions; to unlink history, it must allow Manager actions. You also need an assignment to each proponent affected by the action. The recipient selector shows only active profiles you can use for that action. Before saving, the system locks the profiles and checks your permissions again.

Actions may remain visible because your role permits them. Before opening a form or unlinking a record, the application checks your current assignments and permissions again. If the action is unavailable, check the assignments for all affected recipients before retrying.

The Agreement view selector appears only when you have Agreement read permission. **All** combines both sources and preserves restricted relationship placeholders. **Mine** includes only readable system Agreements with your exact Agreement assignment. An **Agency** view includes readable system Agreements owned by that program Agency. External records appear only in All because their agency/program names are free text, not ownership links. Switching to Mine or an Agency view also removes restricted placeholders.

For example, use All to compare an external award with an existing Agreement before adding a duplicate. Use Mine to focus on Agreements assigned to you; an external award disappearing from that view has not been deleted.

The list loads both sources together with your current permissions. Each source allows up to 5,000 records before search and pagination. If this limit is exceeded, loading stops with `FUNDING_HISTORY_TOO_LARGE` (413). A narrower system view can help, but changing the page size or search text cannot bypass this candidate limit.

## Add external funding

Select **Add external funding**. The full-screen wizard has five steps: recipients, agency, program, agreement, and review.

The profile from which you opened the wizard is the primary recipient and cannot be removed. You may add other active proponents only when you have create access to all of them. Select each recipient only once.

| Field | Rule |
| --- | --- |
| Agency name | Provide at least one of English or French; each value is limited to 255 characters. These are text fields, not configured-agency selections. |
| Program name | Provide at least one of English or French; each value is limited to 255 characters. |
| Agreement number | Required and limited to 255 characters. The application removes leading and trailing spaces. |
| Title | Provide at least one language; each value is limited to 255 characters. |
| Description | Provide at least one language. |
| Start and end dates | Both required; the end cannot precede the start. These are calendar dates and do not shift with your time zone. |
| Funding amount | Required, non-negative exact decimal text, at most two decimal places, and no greater than `99999999999999999.99`. Enter the amount without currency symbols or grouping separators. |
| Currency | Required supported currency code; new records default to CAD in the wizard. |

The review step summarizes the entry before save. User-facing validation and API errors follow the request language.

For example, record a previous CAD 25,000 municipal award for a community centre when it was administered outside GCS-SSC. Select the recipients, enter the municipality and program names, copy the agreement number and dates from the award documents, and enter `25000.00` with CAD. Review the summary and duplicate warnings before saving. This adds a history entry; it does not authorize a payment.

## Duplicate and similarity checks

The system compares standardized versions of agency names, program names, and agreement numbers. When the agency and program names match the same comparison scope, it blocks an agreement number already used by an active external record or a live system agreement. You cannot confirm a warning to bypass this exact duplicate.

The wizard also checks for:

- agency or program names similar to configured records;
- a near agreement number in the same identity scope; and
- a readable or restricted matching candidate.

Similarity is a warning, not an automatic merge. Review the warning, go back to correct the entry, or explicitly confirm it. Restricted candidates are labelled without disclosing their details. Your confirmation applies only to the names and number you reviewed. Changing those values clears the confirmation. The system checks the warnings again when you save.

## Edit recipients or details

Editing loads the external row and all active linked recipients. You must have update access to every currently linked proponent. Adding a recipient also requires create access to that profile; removing one requires delete access to it. The proponent whose profile you opened must remain linked during an edit.

Every edit must leave a valid complete record. For example, moving the start date after the saved end date fails unless you also correct the end date. You cannot clear the only populated language of a required bilingual field. Changes to agency names, program names, or agreement number rerun duplicate and similarity checks. Details and recipient changes are committed together. Concurrent deletion, an inactive recipient, lost permission, or a duplicate recipient causes the whole transaction to fail rather than partially updating the record.

## Unlink and soft deletion

**Unlink** removes only the active link between the external history and the current proponent. It does not remove links held by other proponents. When you remove the last active recipient link, the application also removes the funding-history record from active lists and keeps its history.

There is no restore command in this tab. If the wrong link was removed and the history still exists through another recipient, an authorized editor can add the recipient again. If the last link was removed, create a new external record. System agreement rows cannot be edited or unlinked here.

## Related guides

- [Proponent profiles](./index.md)
- [Agreements](./agreements.md)
- [Proponent assigned users](./team.md)
