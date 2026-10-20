# Agreement claims and reconciliation

Use a claim to record the costs a proponent submits for a period of an agreement. Reconcile the claim to record the amounts you accept, the amounts you sample for review, and your explanations. Each reconciliation has its own assigned reviewers. You can mark it as the final review of the claim.

## Before you begin

Open an agreement and select **Claims**. The agreement needs a current budget with at least one fiscal year and budget line. Existing claims keep their links to matching budget lines after an amendment.

| Action | Required access |
| --- | --- |
| Browse claims, open details, and view submissions or reconciliations | Agreement Viewer access. No assignment to the claim is required. |
| Create a claim | Contributor access plus the assignment to that Agreement; the creator becomes the claim's primary user. |
| Create or update claim lines; allocate, submit, withdraw, cancel, or edit a claim | Contributor access plus the assignment to that claim. |
| Create a reconciliation | Contributor access plus the assignment to that claim; the creator becomes the reconciliation's primary user. |
| Create or update reconciliation lines; complete or change the final designation | Contributor access plus the assignment to that reconciliation. |
| Delete a claim or claim line through its API | Manager access plus the assignment to that claim. |
| Delete a reconciliation or reconciliation line through its API | Manager access plus the assignment to that reconciliation. |

Access to the agreement does not grant permission to edit its claims or reconciliations. Check your assignment to the record you want to change. The system checks your access again when you save.

## Browse and create claims

Select **Add Claim**, complete the fields below, and save. Then open the claim to enter its submitted amounts.

The Claims tab groups claims by fiscal year. It shows each claim ID, April-to-March period, status, submitted total, and successful reconciled amounts. Draft or unsuccessful reconciliation work is not treated as completed reconciliation. Search matches the fiscal year, claim ID, localized period and status, or either displayed total.

Edit and delete actions identify the individual claim row. Expand the fiscal-year group and confirm the claim identifier before acting; several claims can belong to one year.

| Claim field | Rule |
| --- | --- |
| Proponent | Required active proponent linked to this agreement. The server rechecks that relationship on creation or replacement. |
| Fiscal year | Select a year from the current agreement budget. |
| Received date | Enter the date you received the claim. |
| Period start and end | Select the first and last months of the claim period, within April through March. The end cannot precede the start. |
| Final for year | Indicates that this is intended to be the last claim for the year. More than one claim can have this marker. |

A new claim receives the agency's Draft status. Editing its details does not change that status.

Deleting an editable claim removes it, its lines, and its reconciliations from normal lists. The system retains their history.

A fiscal-year change is refused when active allocated claim lines still reference another fiscal year. Choose a year in the current agreement budget and keep the period start before or equal to the period end. Correct the allocations before completing the claim. Changing the claim year does not move its lines.

## Build the submission

The **Submission** tab groups the current fiscal year's budget lines by bilingual cost category and cost subsection. It shows submitted, reconciled, and balance amounts. Search matches category, subsection, bilingual line-item name, or description.

1. Select the edit action on the budget line you want to change. The **Edit submitted amount** dialog opens with its saved amount.
2. Enter the amount requested from the program and select **Save**. Use the Agreement currency and amounts of zero or more. Saving changes only this row. A new zero amount creates no line; an existing line can be set to zero.
3. After an error, correct the amount in the dialog. If the response or refresh is uncertain, reload and check the saved row before retrying.

After a budget amendment, a claim for a retired fiscal year cannot be edited. Lines absent from the current budget remain visible as read-only history. Their submitted amounts, total costs, and other funding remain available, and their amounts still count in totals. To enter or change amounts, use a line available in the current budget. Ask the agreement manager to review a missing budget line.

Changing a submitted program amount preserves the other-source allocations and recalculates total cost as program funding plus those allocations.

Imported duplicate lines appear separately, including on editable claims. Confirm the individual row before editing. Each duplicate still contributes to totals; changing one does not change the others. Resolve unintended duplicates while the claim remains editable.

### Imported unallocated lines

Imported lines may arrive without a matching budget line. If you have Contributor access and are assigned to the claim, link each such line to a compatible line in the current budget while the claim is editable.

Link all imported lines to budget lines before selecting **Complete**. The claim must have at least one line and no unallocated lines. Allocation cannot unlock a completed claim or a claim whose business status is read-only.

## Submit, withdraw, or cancel

After saving and checking the claim lines, use the claim's Completion controls. You need Contributor access and an assignment to that claim. The claim must be editable, have at least one active line, and have no unallocated lines. You cannot complete it again or while a workflow is active.

Select **Complete** to submit the claim. If an approval workflow is configured, follow its review and approval steps. The claim is ready for reconciliation when that workflow succeeds, or immediately if no approval workflow applies. Check the completion outcome before starting reconciliation. Starting a standard workflow does not submit the claim.

Withdrawal and cancellation act on the active claim workflow. Withdrawal is refused after reconciliation history exists. With no active workflow there is no workflow to cancel through these actions. The workflow's published cancellation status determines the business transition. Completion remains historical evidence and cannot be undone by resubmitting the form.

## Create and compare reconciliations

A claim must have reached a successful completion outcome, all active lines must be allocated, and no successfully completed final reconciliation may exist.

To create a reconciliation, you need Contributor access and an assignment to the claim. You become the reconciliation's primary assignee. Its assignments are separate from the claim's.

Only one reconciliation may be open for the claim at a time. Completed and cancelled history remains available for comparison. A new reconciliation receives the Agency Draft status. If configured, starting reconciliation applies the Agency's reconciliation-start status to the claim.

Mark a reconciliation as final when it is intended to finish review of the claim. Only one final reconciliation can be open at a time.

| Field | What to enter |
| --- | --- |
| Reconciled amount | Required amount in the agreement currency, with at most two decimal places. |
| Sampled amount | Optional amount in the agreement currency, with at most two decimal places. |
| Rationale | Optional free text recording the assessment of the line. |

Saving a reconciliation saves all its lines together. If a save fails, none of that save's changes are kept. If the claim’s lines changed while you were reviewing them, reload and compare your draft with the current claim before retrying. This applies even when you edit only one row.

Reconciled and sampled amounts can be negative adjustments. This does not apply to submitted claim program amounts or total costs, which must be nonnegative.

The system does not require sampled amounts to be below reconciled amounts or reconciled totals to equal the submission.

Annual budget controls do apply as described below. Apply the Agency's review policy and explain differences. Compare the displayed submission, successful earlier reconciliations, current reconciliation, and balance. The system uses exact monetary calculations.

For example, a proponent submits 1,000.00 for training. An earlier successful reconciliation accounted for 600.00. This leaves 400.00 before your current review, calculated as 1,000.00 − 600.00. A draft amount is not a successful historical reconciliation. Check the displayed scope before treating totals as cumulative, and document why the current decision differs from the remaining amount.

Cancellation closes the current reconciliation, clears its final marker, and cancels its active workflow when present.

Without an active workflow, a configured approval-submission cancellation status is applied when available; without such configuration, the draft can still be closed. It does not delete evidence and releases the open slot for a new reconciliation.

## Completion, approval, and workflow

Save the reconciliation before selecting **Complete**. You need Contributor access and an assignment to that reconciliation. The record must be open and editable, with at least one active line. It cannot already be completed, and the claim cannot have a successfully completed final reconciliation. Comments are optional. Completion does not require the reconciliation total to equal the submission or require a rationale.

Completion starts the configured reconciliation approval workflow. Without an approval workflow, completion takes effect immediately. Approval templates take effect through that published workflow. Use the shared Workflow section for review, recommendation, approval, cancellation, and recovery actions. An administrator must include the approval template in the published workflow. Creating the template alone is not enough.

At a successful completion outcome, the reconciliation closes. If it is final, the claim can receive the Agency's configured final-reconciliation business status, and later reconciliation creation or editing is blocked. A failed or cancelled attempt does not make the reconciliation final. Inspect the attempt and use its available retry or cancellation actions. Do not complete the same record again.

## Locked states and recovery

You cannot edit a record when the Agency has made its status read-only or terminal, when Completion has been recorded, when the reconciliation is closed, or when a final reconciliation has succeeded. The system also checks whether the agreement or an active workflow blocks the change. If the record changed while the form was open, a visible button may no longer be available to you.

For a submitted-amount save failure, check the selected row and reload after an uncertain response. Other rows are saved separately.

If saving reconciliation lines fails, none of that save is kept. Correct validation errors or reload changed lines before retrying.

If the page fails to refresh after a successful save, reload it and check the saved record before submitting again.

When completion is unavailable, check allocation, saved lines, the independent assignment, business status, and active workflows. Cancel an unwanted open reconciliation through its supported action instead of creating competing open records.

## Developer contract

For routes, identifiers, and integration rules, see the [Agreement API reference](../developer/api/agreements.md).

See also [Budget](./budget.md), [Forecasts](./forecasts.md), [Payments](./payments.md), [Approvals and completions](../concepts/approvals-completions.md), and [Workflows](../concepts/workflows.md).

## Funding breakdown and annual budget checks

A financial line shows how a cost will be paid: the amount requested from the program, the total cost, and amounts from other sources. The other sources are classified using the stream’s configured funding subtypes.

Save the submitted line first, then use its funding editor to enter total cost and other sources. Select each subtype once. Available choices come from this stream; an existing allocation may retain its retired subtype.

Total cost cannot be below program funding. Once other-source allocations are entered, program funding plus those allocations must equal total cost exactly.

If your stream requires claim funding details, every active claim line needs at least one saved other-source allocation and a balanced breakdown before Completion.

For example, equipment costing 1,000.00 could be funded by 700.00 from the program and 300.00 from another source: 700.00 + 300.00 = 1,000.00. Entering only 250.00 from that source leaves a 50.00 difference, so the breakdown cannot be saved as balanced.

After importing a draft, check the saved rows and finish any missing details before completing the claim.

Saving financial lines and completing records also checks the current annual budget in the agreement currency.

Claims share the annual limit with other claims that currently count against it. A claim stops using that capacity when its current recorded outcome is unsuccessful, denied, cancelled or failed. Changing a displayed status label alone does not release the amount.

For reconciliations, the check includes your proposed amount and successful earlier reconciliations. Claims or records with a negative outcome are excluded.

The annual ceiling is the current program funding for that year and currency. Total cost and other sources still follow their line-level balance rules, but have no separate annual ceilings. Reconciled amounts count against the program-funding ceiling.

For example, annual program funding of 10,000 with an existing counted claim of 6,000 leaves 4,000 for another claim. A 4,500 proposal fails even if it has a different proponent or cost line.

Applied claim reductions free annual capacity for both claims and reconciliations in the original claim’s fiscal year. A draft reduction plan, posting the debt or receiving only part of its repayment does not free this capacity. The reduction applies when the posted receivable is fully cleared, and cannot reduce a claim’s counted usage below zero or transfer surplus credit to another claim.

For example, with annual program funding of 120,000, a counted claim of 30,000 leaves 90,000. A fully cleared receivable with an applied reduction of 10,000 lowers that claim’s counted usage to 20,000, allowing another claim of 100,000. A proposed 100,000.01 still fails. The original submitted claim remains unchanged.

Refresh the current budget, counted records and [Receivables](./receivables.md), correct the amount or apply an authorized amendment before retrying. Budget reductions use an additional rule for posted collections, explained in [Amendments](./amendments.md); it does not free new-claim capacity before the reduction applies.
