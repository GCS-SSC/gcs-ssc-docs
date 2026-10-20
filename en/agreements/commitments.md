# Agreement commitments

A commitment sets aside an amount for a type of agreement funding and assigns it to financial coding. Payment requests use those coding lines, subject to the available balance. Open an agreement and select **Commitments**. The tab shows each commitment's type, status, line count, and declared total in the agreement currency. Select the type to open its detail page.

## Before you begin

| Requirement | Rule |
| --- | --- |
| Authorization | Agreement Viewer lets you read. To create, you need Contributor access and an assignment to this exact agreement; you become the primary assignee. To change the commitment or its lines later, you need Contributor or Manager access and an assignment to this exact commitment. |
| Current agreement budget | Each individual commitment's active line total is capped by total program funding across the agreement's current budget version. |
| Chart of accounts | The Agreement's stream must have chart-of-account entries attached to stream budgets. The picker searches the fiscal-year display and stored accounting dimensions and cannot select another stream's configuration. |
| Common user record | Your signed-in account must have an active user record before you can complete. |
| Optional completion workflow | Completion starts the selected published approval-submission workflow if configured. Otherwise, successful Completion activates the commitment immediately. |

Before opening an edit form or deleting, the application checks your current assignment, permissions and the agreement and commitment status. It checks again when you save. If an action is refused, refresh the page and confirm your assignment and whether the record is locked. A failed save leaves the commitment unchanged.

## Create and find commitments

Choose **Add commitment**. Select a commitment type configured for the agreement's stream and enter the declared total in the agreement currency, then save. A new commitment starts in the Agency Draft status and is inactive. The financial-system number is not editable here.

Search on the tab matches the localized type or status label, line count, or displayed total. Results are filtered and paginated in the browser after the complete overview is loaded.

An enabled extension may append a creation action or replace the core action. Conflicting replacement actions disable creation and show a warning. Consult the owning extension's documentation for any contributed creation workflow and saved evidence.

## Manage commitment lines

Use one line for each required coding allocation. For example, for a declared commitment of 10,000 CAD, enter 6,000 CAD on one chart-of-account entry and 4,000 CAD on another. Check that both entries belong to the agreement's stream and intended fiscal year. The two lines total 10,000 CAD; the current program funding must also be at least 10,000 CAD.

The detail page displays the agreement breadcrumb and status, then the commitment's lines, completion, and workflow sections. Approvals created by a configured workflow appear in the **Workflow** section.

| Field | Rule |
| --- | --- |
| Commitment line number | Required integer from 1 through 32,767. Within one commitment, the active combination of line number and chart-of-account entry must be unique. |
| Chart-of-account entry | Required. It must be active and belong to the Agreement's exact stream. Its fiscal year and ordered localized accounting dimensions appear in the picker and table. |
| Amount | Required amount of zero or more, with at most two decimal places. |

The detail search matches the line number, fiscal year, every displayed coding component, or amount. Review the declared total against all unfiltered coding lines in the agreement currency; no conversion occurs.

Ordinary line changes preserve the Agency business status. The detail form keeps each line on the displayed commitment. Deleting a line hides it while retaining its history. Deleting an editable commitment removes it and all its active lines from normal lists together.

## Financial safeguards

| Guard | Exact scope |
| --- | --- |
| Current program-funding ceiling | For the target commitment, existing active lines plus the new or replacement amount cannot exceed the sum of `program funding` in the agreement's current budget version. This is a per-commitment ceiling, not a shared ceiling across all commitment types or versions. |
| Budget reductions | A budget reduction can leave an active commitment above budget and place payments on hold. |
| Paid-amount floor | You cannot reduce a line below the payment amounts allocated to it. Payments not deleted count unless their latest approval decision is a denial; changing a status label is not enough. If any active payment line refers to this line, you also cannot change its commitment or chart entry, even after approval denial. |
| Locked lifecycle | You cannot make ordinary changes to a commitment or its lines after Completion, during protected workflow work, or when the Agency's status makes it read-only or final. |

You can reduce the budget even when an active commitment is above the new funding. Payments then check the combined active commitments of all types against current program funding across all years in the same currency. For each commitment, the check uses the larger of its declared total and active line total. Equality is allowed; historical inactive commitments do not supply capacity.

For example, active commitments of 6,000 and 4,000 fit total program funding of 10,000. Reducing funding to 9,000 can succeed, but payments are held until the active commitments together fit 9,000. Prepare and activate a valid replacement, or restore authorized funding, then check the payment's selected commitment before retrying. A payment still linked to an inactive commitment must use the current one.

Commitment-line amounts must be nonnegative, including in drafts. The declared total must also be nonnegative, and Completion requires it to equal all active lines exactly. A replacement must preserve paid coverage by coding; a budget reduction does not erase that floor.

## Complete a commitment

To complete, you need Contributor access and an assignment to this exact commitment. It must still be editable, have at least one active line and have no previous Completion. Comments are optional. The server checks the commitment, its lines, your user record and permissions again before saving. An active workflow prevents Completion.

Completion records the action. If an approval-submission workflow is configured for completion, Completion starts it. Otherwise, it does not start an approval route. The commitment becomes locked for ordinary editing. Its business status follows the Agency's configuration rather than always changing to a status named "Complete".

Without an approval workflow, the commitment becomes active as soon as Completion succeeds. With an approval workflow, it becomes active after that workflow succeeds. Any previously active commitment of the same type in this agreement becomes inactive. Only one undeleted commitment of each type can be active. A failed or cancelled approval attempt leaves the replacement inactive.

For example, keep the currently active commitment while preparing a replacement of the same type. Complete the replacement and finish its configured approval route. Only successful completion activates the replacement. Verify which commitment is active before creating a payment; the payment selector can also show completed commitments that are no longer active.

## Approval configuration

Administrators can require approval by publishing an approval-submission workflow for commitments with the appropriate approval template, review, or recommendation plan. An approval template alone does not start a route. Follow the configured approvals in the **Workflow** section.

A standard workflow remains an explicit optional selection and never starts merely because the commitment was completed. For denied, failed, paused, or cancelled attempts, use the displayed recovery actions and retry policy shown for that attempt. See [Workflows](../concepts/workflows.md) and [Approvals and completions](../concepts/approvals-completions.md).

## Recovery and deletion

While a save or deletion is pending, its control is disabled. Closing the form does not undo a save already sent. After closing during a request or an uncertain response, reload the list and check the existing commitment before trying again.

- A completion cannot be repeated or undone from the commitment page. Use a new commitment record when a replacement is required.
- You cannot delete locked commitments or their lines from these pages. Deleting an editable commitment removes its lines from normal lists while retaining their history.
- If a chart entry is missing from the picker, verify that its chart row, stream budget, transfer-payment fiscal-year budget, and Agency fiscal year are active and belong to the Agreement's stream.
- If completion reports an invalid status, verify that the record is still editable, has at least one active line, and has not already been completed.

## Declared total and replacement coverage

The declared total is the amount you intend to commit. The coding lines explain where that amount belongs. A replacement changes the commitment used for future payments; it must still cover money already paid.

Enter a nonnegative exact declared total when creating or editing the commitment. Its currency must match the agreement. Coding lines cannot exceed that declared total or current program funding in the same currency. Completion also requires the active coding-line total to equal the declaration exactly. A declaration of 10,000 with 9,999.99 coded cannot complete; save the missing cent or correct the declaration before submission.

A replacement must preserve coverage for money already paid under the active commitment of that same type and currency. At Completion and activation after approval, the system checks the minimum coverage required for each financial code. It accounts for successful journal vouchers, posted corrections and effective receivable recoveries. If coverage is insufficient, the existing commitment stays active. Creating a replacement does not reset the amounts already used.

For example, if effective paid amounts are 3,000 CAD on coding A and 1,000 CAD on coding B, a replacement must preserve at least those amounts on the corresponding coding. A replacement totalling 10,000 CAD can still fail if it assigns only 2,500 CAD to coding A. Review the effective paid amounts, not just the replacement's overall total.

Ordinary updates cannot reduce a line below its effective paid floor or move coding already used by payments or accounting adjustments. Inspect the [Payment](./payments.md) balances and accounting history before reducing a commitment. Resolve any open [Correction](./corrections.md) before making ordinary changes to a commitment.
