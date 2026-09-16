# Agreement Commitments

Commitments group financial-coding lines that payments can consume. Open an agreement and select **Commitments** to see every commitment's type, status, line count, and total in Canadian dollars; select the type to open its detail page.

## Before you begin

| Requirement | Verified behaviour |
| --- | --- |
| Authorization | Agreement Viewer reads. Creating a commitment requires Contributor plus the exact Agreement assignment and makes the creator primary. Later commitment/line mutations require Contributor or Manager plus the exact commitment assignment. |
| Current agreement budget | Each individual commitment's active line total is capped by total program funding across the agreement's current budget version. |
| Chart of accounts | The Agreement's stream must have chart-of-account entries attached to stream budgets. The picker searches the fiscal-year display and stored accounting dimensions and cannot select another stream's configuration. |
| Common user record | Completion requires the signed-in account to resolve to an active `Common_User`. |
| Optional completion workflow | Completion starts the selected published `approval_submission` workflow for `fundingcaseagreementcommitment`, if configured; otherwise positive completion effects apply immediately. |

Writes run in a transaction that locks the agreement and affected commitment aggregate, reloads the Agreement scope, and repeats authorization before mutation. A missing, deleted, cross-agreement, or unauthorized record is not exposed as a usable child resource.

## Create and find commitments

Choose **Add commitment**, select one of the bilingual commitment types configured for the Agreement's stream, and save. A core-created commitment starts with the Agency Draft business status, inactive, with no financial-system number. The core UI only edits the type; the financial-system number is displayed by APIs but is not editable here.

Search on the tab matches the localized type or status label, line count, or displayed total. Results are filtered and paginated in the browser after the complete overview is loaded.

An enabled extension may append a creation action or replace the core action. Conflicting replacement actions disable creation and show a warning. Consult the owning extension's documentation for any contributed creation workflow and retained provenance.

## Manage commitment lines

The detail page displays the agreement breadcrumb and status, then the commitment's lines, completion, and workflow sections. Approvals materialized by a configured workflow appear within the shared Workflow section.

| Field | Rule |
| --- | --- |
| Commitment line number | Required integer from 1 through 32,767. Within one commitment, the active combination of line number and chart-of-account entry must be unique. |
| Chart-of-account entry | Required. It must be active and belong to the Agreement's exact stream. Its fiscal year and ordered localized accounting dimensions appear in the picker and table. |
| Amount | Required `numeric(19,2)` money value, at most two decimal places and no more than `99999999999999999.99` in absolute value, transmitted as exact decimal text. The current validator does not require a positive or non-negative amount. |

The detail search matches the line number, fiscal year, every displayed coding component, or amount. The total card sums all unfiltered lines and formats the result as CAD; no currency conversion occurs.

Ordinary line changes preserve the Agency business status. A PATCH can move a line to another editable commitment in the same agreement, although the current detail form keeps it on the displayed commitment. Soft deletion hides a line; deleting an editable commitment soft-deletes it and all its active lines in the same transaction.

## Financial safeguards

| Guard | Exact scope |
| --- | --- |
| Current program-funding ceiling | For the target commitment, existing active lines plus the new or replacement amount cannot exceed the sum of `program funding` in the agreement's current budget version. This is a per-commitment ceiling, not a shared ceiling across all commitment types or versions. |
| Database enforcement | PostgreSQL repeats that rule with deferred constraint triggers after commitment-line writes, current-budget line changes, and current-version changes. The transaction therefore cannot commit with any active commitment over the current program-funding total. |
| Paid-amount floor | A line update cannot reduce its amount below payment allocations attached to that exact commitment line. Non-deleted payments count unless their latest target approval evidence is `denied`; a business-status label does not define denial. Any active payment-line reference also prevents changing the commitment or chart entry of that line, even if its approval was denied. |
| Locked lifecycle | Completion evidence, protected workflow state, and Agency read-only/terminal statuses lock ordinary commitment and line mutations. |

If a budget reduction would put a commitment over the new current program-funding total, PostgreSQL rejects the transaction. Restore sufficient current program funding or reduce editable commitment lines first. Validation and constraint failures leave the transaction unchanged.

::: warning Amount sign is not enforced
The application currently accepts zero and negative commitment-line amounts. The screen should not be treated as enforcing a positive financial commitment; apply agency review controls before completion.
:::

## Complete a commitment

Completion requires Contributor access and the exact commitment assignment, an editable record, no earlier completion, and at least one active line. Comments are optional. The server locks and revalidates the aggregate, user, and permissions; an active workflow blocks the action.

The transaction records Completion and starts the selected approval-submission workflow when configured. If no workflow applies, it records `no_workflow`. The completion hook is emitted after commit. Completion locks ordinary editing; it does not assign a hard-coded `complete` business-status value.

At a positive completion terminus—immediate without approval workflow, otherwise after its success—the commitment becomes active and other active commitments of the same Agreement/type become inactive. The database also enforces one active undeleted commitment per Agreement/type. A failed or cancelled approval attempt does not activate the replacement.

For example, keep the currently active commitment while preparing a replacement of the same type. Complete the replacement and finish its configured approval route. Only successful completion activates the replacement. Verify which commitment is active before creating a payment; the payment selector can display completion-bearing history that is not currently active.

## Approval configuration

To require approval, publish an approval-submission workflow for `fundingcaseagreementcommitment` and include the appropriate published approval template, review, or recommendation plan. A standalone template is configuration, not a guarantee of a route. Completion now starts the configured workflow through the shared lifecycle engine; follow its approvals in the Workflow section.

A standard workflow remains an explicit optional selection and never starts merely because the commitment was completed. For denied, failed, paused, or cancelled attempts, use the displayed recovery actions and pinned retry policy. See [Workflows](../concepts/workflows.md) and [Approvals and completions](../concepts/approvals-completions.md).

## Recovery and deletion

- A completion cannot be repeated or undone from the commitment page. Use a new commitment record when a replacement is required.
- Locked commitments and their lines cannot be deleted through these routes. Editable commitment deletion is logical rather than physical and removes its lines from normal lists.
- If a chart entry is missing from the picker, verify that its chart row, stream budget, transfer-payment fiscal-year budget, and Agency fiscal year are active and belong to the Agreement's stream.
- If completion reports an invalid status, verify that the record is still editable, has at least one active line, and has not already been completed.
