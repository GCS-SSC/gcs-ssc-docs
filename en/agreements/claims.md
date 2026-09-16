# Agreement Claims and Reconciliation

Claims record costs received for an Agreement fiscal period. Reconciliations are separate reviewer-owned records that assess those submitted lines, record reconciled and sampled amounts, and may be designated as the final reconciliation for the claim.

## Before you begin

Open an Agreement and select **Claims**. The Agreement needs a current budget version with at least one fiscal year and budget line. Claim and line references use stable budget identities, so an amendment can replace the current version without changing their logical IDs.

| Action | Required access |
| --- | --- |
| Browse claims, open details, and view submissions or reconciliations | Agreement Viewer ceiling; no exact assignment. |
| Create a claim | Contributor ceiling plus the exact Agreement assignment; the creator becomes the claim's primary user. |
| Create or update claim lines; allocate, submit, withdraw, cancel, or edit a claim | Contributor ceiling plus the exact claim assignment. |
| Create a reconciliation | Contributor ceiling plus the exact claim assignment; the creator becomes the reconciliation's primary user. |
| Create or update reconciliation lines; complete or change the final designation | Contributor ceiling plus the exact reconciliation assignment. |
| Delete a claim or claim line through its API | Manager ceiling plus the exact claim assignment. |
| Delete a reconciliation or reconciliation line through its API | Manager ceiling plus the exact reconciliation assignment. |

Agreement Viewer reads claims. Creating a claim requires Contributor plus the exact Agreement assignment and makes the creator primary. Creating a reconciliation requires Contributor plus the exact claim assignment and makes the creator primary on the reconciliation. Later mutations require the matching claim/reconciliation assignment and Contributor or Manager. A related stream, budget, submission, or Agreement does not broaden the boundary; writes take ordered locks and rebuild authorization.

## Browse and create claims

The Claims tab groups rows by current fiscal-year display. It shows each claim ID, April-to-March period, status, submitted total, and successful reconciled amounts. Draft or unsuccessful reconciliation work is not treated as completed reconciliation. Search matches the fiscal year, claim ID, localized period and status, or either displayed total.

Edit and delete actions identify the individual claim row. Expand the fiscal-year group and confirm the claim identifier before acting; several claims can belong to one year.

| Claim field | Rule |
| --- | --- |
| Fiscal year | Required stable fiscal-year identity from the current Agreement budget. |
| Received date | Required date/time; the form captures a calendar date. |
| Period start and end | Required indexes from `0` (April) through `11` (March); end cannot precede start. |
| Final for year | Required boolean marker. It is descriptive: the database does not restrict a fiscal year to one claim with this marker. |

A core-created claim receives the Agency’s protected Draft business status. Ordinary edits preserve that status; they do not invent a fixed `inprogress` transition. The header may be edited or soft-deleted only while editable. Deleting it soft-deletes its claim lines, reconciliations, and reconciliation lines in the same transaction; the historical rows remain in the database.

A fiscal-year change is refused when active allocated claim lines still reference another fiscal year. The server validates the destination against the current Agreement budget and validates the merged period start/end on partial updates. Correct the allocation or prepare the intended claim before completing it; a header change does not migrate lines.

## Build the submission

The **Submission** tab groups the current fiscal year's budget lines by bilingual cost category and cost subsection. It shows submitted, reconciled, and balance amounts. Search matches category, subsection, bilingual line-item name, or description.

Enter a submitted amount against each required budget line and select **Save submission**. New zero-value cells are skipped; a non-zero cell creates a claim line in CAD. Existing cells are patched when their amount changes. The page sends one request per changed line, in sequence, rather than one bulk transaction. If a later request fails, earlier rows remain saved; refresh, compare every row, and retry only the missing corrections.

The host API also supports line description, currency, optional submitted category/subsection/line labels, reassignment to another editable claim, and soft deletion. Those full CRUD controls are not mounted in the current grid. The database derives each line's Agreement from its claim and uses composite foreign keys to keep any selected budget line in that Agreement.

There is no active uniqueness constraint for `(claim, budget line)`. Direct API or imported data can therefore create duplicates. While a claim is editable the grid uses the first matching line; once locked it displays multiple lines separately. Avoid duplicate logical lines and reconcile them before submission.

### Imported unallocated lines

An assigned claim Contributor can allocate an imported unallocated line to a compatible current budget line while the claim remains editable. Allocation does not bypass Completion or read-only business-status locks. Complete allocation before completing the claim: the server requires at least one line and rejects any remaining unallocated line.

## Submit, withdraw, or cancel

Use the claim's Completion controls after saving and checking its lines. Completion requires the exact claim assignment, Contributor access, an editable business status, no prior completion, at least one active line, and no unallocated lines. An active workflow also blocks completion.

Completion records either `no_workflow` or `workflow_started`. If an approval-submission workflow is configured, follow its review and approval steps. The claim becomes ready for reconciliation only at a **positive completion terminus**: immediately when no approval workflow applies, or after that workflow succeeds. A status label alone is not proof of readiness. Standard workflows are explicitly selected and do not replace Completion.

Withdrawal and cancellation act on the active claim workflow; they do not assign fixed `withdrawn` or `cancelled` business-status codes. Withdrawal is refused after reconciliation history exists. With no active workflow there is no workflow to cancel through these actions. The workflow's published cancellation status determines the business transition. Completion remains historical evidence and cannot be undone by resubmitting the form.

## Create and compare reconciliations

A claim must have reached a positive completion terminus, all active lines must be allocated, and no successfully completed final reconciliation may exist. Creating a reconciliation requires Contributor access and the exact claim assignment; it makes the creator primary on the new independent reconciliation roster.

Only one reconciliation may be open for the claim at a time. Completed and cancelled history remains available for comparison. A new reconciliation receives the Agency Draft status. If configured, starting reconciliation applies the Agency's reconciliation-start status to the claim. The final marker identifies the reconciliation intended to finish the claim; open-final uniqueness is protected in the database.

| Field | Contract |
| --- | --- |
| Reconciled amount | Required exact `numeric(19,2)` money; persisted and transported as decimal text. |
| Sampled amount | Optional exact money. |
| Rationale | Optional free text recording the assessment of the line. |

The reconciliation editor saves the complete line set through one bulk transaction, optionally with the final marker. Every current claim line must appear exactly once and saved reconciliation-line IDs must still match. A stale line set rejects the entire save; reload and compare the draft with the current data. Individual row editing uses this same complete-set persistence contract, not a separate partial grid commit.

The shared money schemas accept signed values. Saving or completing does not establish that sampled amounts are bounded by reconciled amounts, that reconciled totals equal the submission, or that the claim fits the Agreement budget. Apply the Agency's review policy and explain differences. The UI displays submitted, successful prior reconciliation, current reconciliation, and balance information to support that judgment; calculations use exact money.

For example, a claim line submitted at `"1000.00"` with `"600.00"` successfully reconciled earlier has `"400.00"` remaining before the current reconciliation. A draft amount is not a successful historical reconciliation. Check the displayed scope before treating totals as cumulative, and document why the current decision differs from the remaining amount.

Cancellation closes the current reconciliation, clears its final marker, and cancels its active workflow when present. Without an active workflow, a configured approval-submission cancellation status is applied when available; without such configuration, the draft can still be closed. It does not delete evidence and releases the open slot for a new reconciliation.

## Completion, approval, and workflow

Save the reconciliation before selecting Complete. Completion requires its own exact assignment and Contributor ceiling, a writable open record, no prior completion, no successfully completed final reconciliation for the claim, and at least one active reconciliation line. Comments are optional. These checks do not imply financial equality or a mandatory rationale.

The common Completion transaction starts the selected `fundingclaimreconcile` approval-submission workflow when configured; otherwise it records `no_workflow`. Approval templates take effect through that published workflow. The shared Workflow section exposes its review, recommendation, approval, cancellation, and recovery actions. Configuring a template without wiring it into the workflow is insufficient.

At a positive completion terminus, the reconciliation closes. If it is final, the claim can receive the Agency's configured final-reconciliation business status, and later reconciliation creation or editing is blocked. The status is not hard-coded to `reviewed`. A failed or cancelled attempt does not confer successful finality. Inspect the attempt and its available retry/cancel actions rather than completing the same record again.

## Locked states and recovery

Agency read-only or terminal statuses, completion evidence, closed reconciliation state, and successful final reconciliation govern editing. The server also checks the owning Agreement and active workflow boundaries; a visible button is not authority to bypass a later state change.

For a submission-grid failure, reload because earlier per-line writes may have committed. For a bulk reconciliation failure, the transaction rolls back; correct validation errors or reload a stale line set before retrying. If a read refresh fails after a successful write, retry that read before resubmitting. When completion is unavailable, check allocation, saved lines, the independent assignment, business status, and active workflows. Cancel an unwanted open reconciliation through its supported action instead of creating competing open records.

## Developer contract

Agreement-scoped routes own claim and financial mutations. `/api/claim-reconciliations/{id}` provides the independently assigned detail projection; `/api/claim-reconciliations/{id}/lines/bulk` provides atomic complete-set editing. Completion and Workflow use the shared typed-entity APIs. The removed ready-for-review transition is not the current submission contract.

All public claim, reconciliation, and stable budget identifiers are decimal bigint strings. Reconciliation identities use `fundingclaimreconcile`; claims use `fundingcaseagreementclaim`. Parent/child ownership is enforced by typed identities and composite foreign keys, and fresh-authorized aggregate locks serialize writes. Bodies use localized Zod validation and exact-money strings; failures use the standard API error envelope.

See [Agreement Budget](./budget.md), [Forecasts](./forecasts.md), [Payments](./payments.md), [Approvals and Completions](../concepts/approvals-completions.md), and [Workflows](../concepts/workflows.md).
