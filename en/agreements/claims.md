# Agreement Claims and Reconciliation

Use a claim to record the costs a proponent submits for a period of an Agreement. Use a reconciliation to record your review of those costs: the amount accepted through reconciliation, the amount sampled for review, and any explanation. A reconciliation has its own assigned reviewers and can be marked as the final review of the claim.

## Before you begin

Open an Agreement and select **Claims**. The Agreement needs a current budget version with at least one fiscal year and budget line. Claim and line references use stable budget identities, so an amendment can replace the current version without changing their logical IDs.

| Action | Required access |
| --- | --- |
| Browse claims, open details, and view submissions or reconciliations | Agreement Viewer access; no exact assignment. |
| Create a claim | Contributor access plus the assignment to that Agreement; the creator becomes the claim's primary user. |
| Create or update claim lines; allocate, submit, withdraw, cancel, or edit a claim | Contributor access plus the assignment to that claim. |
| Create a reconciliation | Contributor access plus the assignment to that claim; the creator becomes the reconciliation's primary user. |
| Create or update reconciliation lines; complete or change the final designation | Contributor access plus the assignment to that reconciliation. |
| Delete a claim or claim line through its API | Manager access plus the assignment to that claim. |
| Delete a reconciliation or reconciliation line through its API | Manager access plus the assignment to that reconciliation. |

Agreement Viewer reads claims. Creating a claim requires Contributor plus the assignment to that Agreement and makes the creator primary.

Creating a reconciliation requires Contributor plus the assignment to that claim and makes the creator primary on the reconciliation. Later mutations require the matching claim/reconciliation assignment and Contributor or Manager.

Access to a related stream, budget, submission, or Agreement does not grant permission to edit the claim or reconciliation. The server checks your current permissions again when saving and locks related records in a consistent order to prevent conflicting changes.

## Browse and create claims

The Claims tab groups rows by current fiscal-year display. It shows each claim ID, April-to-March period, status, submitted total, and successful reconciled amounts. Draft or unsuccessful reconciliation work is not treated as completed reconciliation. Search matches the fiscal year, claim ID, localized period and status, or either displayed total.

Edit and delete actions identify the individual claim row. Expand the fiscal-year group and confirm the claim identifier before acting; several claims can belong to one year.

| Claim field | Rule |
| --- | --- |
| Proponent | Required active proponent linked to this agreement. The server rechecks that relationship on creation or replacement. |
| Fiscal year | Required stable fiscal-year identity from the current Agreement budget. |
| Received date | Required date/time; the form captures a calendar date. |
| Period start and end | Required indexes from `0` (April) through `11` (March); end cannot precede start. |
| Final for year | Required boolean marker. It is descriptive: the database does not restrict a fiscal year to one claim with this marker. |

A core-created claim receives the Agency’s protected Draft business status. Ordinary edits preserve that status; they do not invent a fixed `inprogress` transition.

The header may be edited or marked as deleted only while editable. Deleting it also marks its claim lines, reconciliations, and reconciliation lines as deleted in the same transaction; the historical rows remain in the database.

A fiscal-year change is refused when active allocated claim lines still reference another fiscal year. The server validates the destination against the current Agreement budget and validates the merged period start/end on partial updates. Correct the allocation or prepare the intended claim before completing it; a header change does not migrate lines.

## Build the submission

The **Submission** tab groups the current fiscal year's budget lines by bilingual cost category and cost subsection. It shows submitted, reconciled, and balance amounts. Search matches category, subsection, bilingual line-item name, or description.

1. Select the edit action on the budget line you want to change. The **Edit submitted amount** dialog opens with its saved amount.
2. Enter the amount requested from the program and select **Save**. Use the Agreement currency and amounts of zero or more. Saving changes only this row. A new zero amount creates no line; an existing line can be set to zero.
3. After an error, correct the amount in the dialog. If the response or refresh is uncertain, reload and check the saved row before retrying.

**Technical details for integrations:** the host API also supports line description, currency, optional submitted category/subsection/line labels, reassignment to another editable claim, and soft deletion. These additional create, edit and delete controls are available through the API, rather than the current grid. The database derives each line's Agreement from its claim and uses composite foreign keys to keep any selected budget line in that Agreement.

Imported duplicate lines appear separately, including on editable claims. Confirm the individual row before editing. Each duplicate still contributes to totals; changing one does not change the others. Resolve unintended duplicates while the claim remains editable.

**Technical detail:** there is no active uniqueness constraint for `(claim, budget line)`. Direct API requests and imports can therefore create duplicates.

### Imported unallocated lines

Imported lines may arrive without a matching budget line. If you have Contributor access and are assigned to the claim, link each such line to a compatible line in the current budget while the claim is editable.

Finish these allocations before Completion. The claim must have at least one line and no unallocated lines. Allocation cannot unlock a completed claim or a claim whose business status is read-only.

## Submit, withdraw, or cancel

Use the claim's Completion controls after saving and checking its lines. Completion requires the assignment to that claim, Contributor access, an editable business status, no prior completion, at least one active line, and no unallocated lines. An active workflow also blocks completion.

Completion records either `no_workflow` or `workflow_started`. If an approval-submission workflow is configured, follow its review and approval steps. The claim becomes ready for reconciliation only at a **successful completion outcome**: immediately when no approval workflow applies, or after that workflow succeeds. A status label alone is not proof of readiness. Standard workflows are explicitly selected and do not replace Completion.

Withdrawal and cancellation act on the active claim workflow; they do not assign fixed `withdrawn` or `cancelled` business-status codes. Withdrawal is refused after reconciliation history exists. With no active workflow there is no workflow to cancel through these actions. The workflow's published cancellation status determines the business transition. Completion remains historical evidence and cannot be undone by resubmitting the form.

## Create and compare reconciliations

A claim must have reached a successful completion outcome, all active lines must be allocated, and no successfully completed final reconciliation may exist.

Creating a reconciliation requires Contributor access and the assignment to that claim; it makes the creator primary on the new independent reconciliation roster.

Only one reconciliation may be open for the claim at a time. Completed and cancelled history remains available for comparison. A new reconciliation receives the Agency Draft status. If configured, starting reconciliation applies the Agency's reconciliation-start status to the claim.

Mark a reconciliation as final when it is intended to finish review of the claim. The database prevents competing open final reconciliations.

| Field | Contract |
| --- | --- |
| Reconciled amount | Required exact `numeric(19,2)` money; persisted and transported as decimal text. |
| Sampled amount | Optional exact money. |
| Rationale | Optional free text recording the assessment of the line. |

Reconciliation saves work differently from submission saves: all lines are saved together. If a save fails, none of that save’s changes are kept. If the claim’s lines changed while you were reviewing them, reload and compare your draft with the current claim before retrying. This applies even when you edit only one row.

**Technical contract:** the bulk transaction saves the complete line set and, optionally, the final marker. Each current claim line must appear exactly once, and saved reconciliation-line IDs must still match. A stale or mismatched set rejects the entire transaction.

Reconciled and sampled amounts use the money format that permits negative adjustments. This does not apply to submitted claim program amounts or total costs, which must be nonnegative.

Saving or completing does not establish that sampled amounts are bounded by reconciled amounts or that reconciled totals equal the submission.

Annual budget controls do apply as described below. Apply the Agency's review policy and explain differences. The UI displays submitted, successful prior reconciliation, current reconciliation, and balance information to support that judgment; calculations use exact money.

For example, a proponent submits 1,000.00 for training. An earlier successful reconciliation accounted for 600.00, leaving 400.00 before your current review (1,000.00 − 600.00). A draft amount is not a successful historical reconciliation. Check the displayed scope before treating totals as cumulative, and document why the current decision differs from the remaining amount.

Cancellation closes the current reconciliation, clears its final marker, and cancels its active workflow when present.

Without an active workflow, a configured approval-submission cancellation status is applied when available; without such configuration, the draft can still be closed. It does not delete evidence and releases the open slot for a new reconciliation.

## Completion, approval, and workflow

Save the reconciliation before selecting Complete. Completion requires its own exact assignment and Contributor access, a writable open record, no prior completion, no successfully completed final reconciliation for the claim, and at least one active reconciliation line. Comments are optional. These checks do not imply financial equality or a mandatory rationale.

Completion starts the selected `fundingclaimreconcile` approval-submission workflow when configured; otherwise it records `no_workflow`. Approval templates take effect through that published workflow. The shared Workflow section exposes its review, recommendation, approval, cancellation, and recovery actions. Configuring a template without wiring it into the workflow is insufficient.

At a successful completion outcome, the reconciliation closes. If it is final, the claim can receive the Agency's configured final-reconciliation business status, and later reconciliation creation or editing is blocked. The status is not hard-coded to `reviewed`. A failed or cancelled attempt does not confer successful finality. Inspect the attempt and its available retry/cancel actions rather than completing the same record again.

## Locked states and recovery

You cannot edit a record when the Agency has made its status read-only or terminal, when Completion has been recorded, when the reconciliation is closed, or when a final reconciliation has succeeded. The server also checks the owning Agreement and active workflow boundaries; a visible button is not authority to bypass a later state change.

For a submitted-amount save failure, check the selected row and reload after an uncertain response. Other rows are saved separately.

For a bulk reconciliation failure, the transaction rolls back; correct validation errors or reload a stale line set before retrying.

If a read refresh fails after a successful write, retry that read before resubmitting.

When completion is unavailable, check allocation, saved lines, the independent assignment, business status, and active workflows. Cancel an unwanted open reconciliation through its supported action instead of creating competing open records.

## Developer contract

Agreement-scoped routes own claim and financial mutations. `/api/claim-reconciliations/{id}` provides the independently assigned detail projection; `/api/claim-reconciliations/{id}/lines/bulk` provides atomic complete-set editing. Completion and Workflow use the shared typed-entity APIs. The removed ready-for-review transition is not the current submission contract.

All public claim, reconciliation, and stable budget identifiers are decimal bigint strings. Reconciliation identities use `fundingclaimreconcile`; claims use `fundingcaseagreementclaim`. Parent/child ownership is enforced by typed identities and composite foreign keys, and fresh-authorized aggregate locks serialize writes. Bodies use localized Zod validation and exact-money strings; failures use the standard API error envelope.

See [Agreement Budget](./budget.md), [Forecasts](./forecasts.md), [Payments](./payments.md), [Approvals and Completions](../concepts/approvals-completions.md), and [Workflows](../concepts/workflows.md).

## Funding breakdown and annual budget checks

A financial line shows how a cost will be paid: the amount requested from the program, the total cost, and amounts from other sources. The other sources are classified using the stream’s configured funding subtypes.

Save the monthly/submitted line first, then use its funding editor to enter total cost and other sources. Select each subtype once. Available choices come from this stream; an existing allocation may retain its retired subtype.

Total cost cannot be below program funding. Once other-source allocations are entered, program funding plus those allocations must equal total cost exactly.

Your stream can require a funding breakdown for forecasts, claims, both, or neither. When required, every active line must have at least one saved other-source allocation and an exact balanced breakdown before Completion. Each forecast version has its own Completion and is checked independently.

For example, equipment costing 1,000.00 could be funded by 700.00 from the program and 300.00 from another source: 700.00 + 300.00 = 1,000.00. Entering only 250.00 from that source leaves a 50.00 difference, so the breakdown cannot be saved as balanced.

A draft import can leave work to finish; inspect the saved rows before completing.

Saving financial lines and completing records also checks the current annual budget in the agreement currency.

Each forecast version you have entered is checked separately against the annual limits; the versions are alternative estimates, not amounts added together.

Claims share the annual limit with other claims that currently count against it. A claim stops using that capacity when its current recorded outcome is unsuccessful, denied, cancelled or failed. Changing a displayed status label alone does not release the amount.

For reconciliations, the check includes your proposed amount and successful earlier reconciliations. Claims or records with a negative outcome are excluded.

The annual ceiling is the current program funding for that year and currency. Total cost and other sources still follow their line-level balance rules, but have no separate annual ceilings. Reconciled amounts count against the program-funding ceiling.

For example, annual program funding of 10,000 with an existing counted claim of 6,000 leaves 4,000 for another claim. A 4,500 proposal fails even if it has a different proponent or cost line.

Applied claim reductions free annual capacity for both claims and reconciliations in the original claim’s fiscal year. A draft reduction plan, posting the debt or receiving only part of its repayment does not free this capacity. The reduction applies when the posted receivable is fully cleared, and cannot reduce a claim’s counted usage below zero or transfer surplus credit to another claim.

For example, with annual program funding of 120,000, a counted claim of 30,000 leaves 90,000. A fully cleared receivable with an applied reduction of 10,000 lowers that claim’s counted usage to 20,000, allowing another claim of 100,000. A proposed 100,000.01 still fails. The original submitted claim remains unchanged.

Refresh the current budget, counted records and [Receivables](./receivables.md), correct the amount or apply an authorized amendment before retrying. Budget reductions use an additional rule for posted collections, explained in [Amendments](./amendments.md); it does not free new-claim capacity before the reduction applies.
