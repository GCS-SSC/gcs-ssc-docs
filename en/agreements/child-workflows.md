# Agreement Child Workflows

An agreement is the main funding file. Its tabs hold related records, such as a budget, payment, claim, or monitoring visit. These related records are called **children** in this guide. Some, such as addresses and activities, are edited directly in the agreement tab. Others open their own workspace, where you manage their lines, attachments, assigned users, and approval steps.

For example, open **Payments** on an agreement to find a payment, then open that payment to work on its payment lines. You are still working under the same agreement, but the payment has its own record and access checks.
## Workflow pages

| Workflow | Documentation |
| --- | --- |
| Budget fiscal years and budget line items | [Budget](./budget.md) |
| Agreement addresses | [Addresses](./addresses.md) |
| Proponent/applicant-recipient links | [Proponents and applicant-recipients](./applicant-recipients.md) |
| Agreement activities, outcomes, and responsible parties | [Activities](./activities.md) |
| Commitments and commitment lines | [Commitments](./commitments.md) |
| Payments and payment lines | [Payments](./payments.md) |
| Monthly financial pacing and accounting projections | [Financial summary](./financial-summary.md) |
| Signed corrections and balanced coding transfers | [Corrections](./corrections.md), [Journal vouchers](./journal-vouchers.md) |
| Receivables, adjustments and recoveries | [Receivables](./receivables.md) |
| Forecasts, versions, and monthly forecast lines | [Forecasts](./forecasts.md) |
| Claims, claim lines, reconciliations, and reconciliation approvals | [Claims](./claims.md) |
| Monitors, findings, follow-ups, updates, and promising practices | [Monitors](./monitors.md) |
| Generated agreement documents | [Documents](./documents.md) |

## Shared behaviour

Your role determines which actions you may perform within the agency or program. Your assignment identifies the particular file you work on. Both are needed to make changes:

- Viewer access lets you read records within your permitted scope without being assigned.
- For ordinary records such as addresses or activities, Contributor access plus assignment to the agreement lets you create or edit. Manager access plus that assignment is required to delete.
- Claims, reconciliations, payments, forecasts, monitors, amendments, commitments, reviews, and recommendations have their own assigned users. For business records created from the agreement, the required parent assignment allows creation and the creator becomes the child's primary user. Later changes require assignment to that particular child as well as the applicable role. Runtime review and recommendation work follows its own owner rules; see [Assigned users](./team.md).

For example, being assigned to an agreement lets an eligible officer add an activity. It does not automatically let that officer edit a payment created by a colleague: check the payment's own assigned users.

Selection lists respect the access required by the open create or edit form. Being named as a reviewer or approver allows the assigned workflow action; it does not give ordinary read access to the underlying file.

Most deletes remove the record from normal lists and selection lists while preserving its history. This is called a soft delete.

## Business status, completion, and workflow

The Agency defines business statuses, such as draft or approved. Saving your edits normally keeps the current status. A status marked read-only or terminal, a completed record, an active workflow, or protection on the parent agreement can prevent editing. An “Approved” label alone does not prove that the approval steps succeeded.

To submit a supported record for completion:

1. Open that record's workspace and check its required information using the linked guide above.
2. Use **Complete** when the record is ready. The application checks the record and starts its published approval-submission workflow when configured.
3. Follow the workflow to its outcome. When approval is required, wait for successful completion before treating the record as effective. For example, a replacement Forecast or Commitment becomes active only after the workflow succeeds.

Amendments, Closeouts, Corrections, Receivables, receivable adjustments, and Credit Memos require an approval-submission workflow. Other supported records use their configured optional workflow. Corrections and recoveries also have their own role permissions and assignments. Saving completion is not the same as receiving approval.

Use **Workflows** to choose and start a standard workflow explicitly. Only one workflow can be active on the same record at a time, regardless of its purpose. Completing a record, submitting the main agreement for approval, starting a standard workflow, and requesting a direct review are different actions. Consult the record's guide and [Approvals and completions](../concepts/approvals-completions.md) before choosing an action.

Add supporting files to the particular record's [Attachments](../concepts/attachments.md) tab. For example, attach evidence for a claim to the claim, rather than assuming an agreement attachment will serve the same purpose. [Amendments](./amendments.md) and [Closeouts](./closeouts.md) have additional rules for completion, saved snapshots, and locking related records.
