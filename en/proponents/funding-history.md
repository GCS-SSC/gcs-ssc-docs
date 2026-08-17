# Proponent Funding History

The **Funding History** tab combines two sources:

- **System** rows are live GCS-SSC agreements linked to the proponent. Manage them in the agreement workspace.
- **External** rows are manually recorded funding from outside GCS-SSC. They provide history without creating an agreement, budget workflow, review, or payment record.

Open **Proponents**, select a profile, and choose **Funding History**. Search covers readable agency and program names in both languages, agreement number, and title. The combined results are sorted and paginated after both sources are loaded.

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

Global Proponent permissions and exact Proponent Team assignments are evaluated for each affected profile. Recipient choices list only active profiles available for the requested create or update action. Every multi-recipient write locks the active profiles in stable order and rechecks authorization in the transaction.

## Add external funding

Select **Add external funding**. The full-screen wizard has five steps: recipients, agency, program, agreement, and review.

The profile from which you opened the wizard is the primary recipient and cannot be removed. You may add other active proponents only when you have create access to all of them. Recipient IDs must be unique.

| Field | Rule |
| --- | --- |
| Agency name | Provide at least one of English or French; each value is limited to 255 characters. These are text fields, not configured-agency selections. |
| Program name | Provide at least one of English or French; each value is limited to 255 characters. |
| Agreement number | Required, trimmed, and limited to 255 characters. |
| Title | Provide at least one language; each value is limited to 255 characters. |
| Description | Provide at least one language. |
| Start and end dates | Both required; the end cannot precede the start. |
| Funding amount | Required, non-negative, at most two decimal places, and no greater than 90 trillion. It is stored as `numeric(19,2)`. |
| Currency | Required supported currency code; new records default to CAD in the wizard. |

The review step summarizes the entry before save. User-facing validation and API errors follow the request language.

## Duplicate and similarity checks

Agency names, program names, and agreement numbers are normalized for comparison. Within the same overlapping agency-and-program name scope, an exact normalized agreement number already used by an active external record or a live system agreement is blocked. It cannot be overridden.

The wizard also checks for:

- agency or program names similar to configured records;
- a near agreement number in the same identity scope; and
- a readable or restricted matching candidate.

Similarity is a warning, not an automatic merge. Review the warning, go back to correct the entry, or explicitly confirm it. Restricted candidates are labelled without disclosing their details. Confirmations are fingerprints of the reviewed values; changing identity text clears them, and the server recomputes warnings during the final transaction.

## Edit recipients or details

Editing loads the external row and all active linked recipients. You must have update access to every currently linked proponent. Adding a recipient also requires create access to that profile; removing one requires delete access to it. The proponent in the current URL must remain linked during an edit.

Identity changes rerun exact-conflict and similarity checks. Details and recipient changes are committed together. Concurrent deletion, an inactive recipient, lost permission, or a duplicate recipient causes the whole transaction to fail rather than partially updating the record.

## Unlink and soft deletion

**Unlink** removes only the active link between the external history and the current proponent. It does not remove links held by other proponents. When the last active recipient link is soft-deleted, a database trigger also soft-deletes the now-unlinked funding-history row.

There is no restore command in this tab. If the wrong link was removed and the history still exists through another recipient, an authorized editor can add the recipient again. If the last link was removed, create a new external record. System agreement rows cannot be edited or unlinked here.

## Related guides

- [Proponent profiles](./index.md)
- [Agreements](./agreements.md)
- [Proponent Teams](./team.md)
