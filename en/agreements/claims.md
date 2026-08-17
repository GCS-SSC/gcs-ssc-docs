# Agreement Claims and Reconciliation

Claims record costs received for an Agreement fiscal period. Reconciliations are separate reviewer-owned records that assess those submitted lines, record reconciled and sampled amounts, and may be designated as the final reconciliation for the claim.

## Before you begin

Open an Agreement and select **Claims**. The Agreement needs a current budget version with at least one fiscal year and budget line. Claim and line references use stable budget identities, so an amendment can replace the current version without changing their logical IDs.

| Action | Required Agreement action |
| --- | --- |
| Browse claims, open details, view submissions and reconciliations | `agreement:read` |
| Create a claim, claim line, reconciliation, or reconciliation line | `agreement:create` |
| Edit, allocate, submit, withdraw, cancel, complete, or change final status | `agreement:update` |
| Delete a claim, claim line, reconciliation, or reconciliation line through its API | `agreement:delete` |

A role or the exact Agreement Team may supply these actions. Access to a related stream, budget, submission, or another Agreement does not broaden the boundary. Writes re-resolve scope and authorization in the transaction and take ordered Agreement, claim, and reconciliation locks as applicable.

## Browse and create claims

The Claims tab groups rows by current fiscal-year display. It shows each claim ID, April-to-March period, status, submitted total, and the sum of every active reconciliation line associated with that claim. Search matches the fiscal year, claim ID, localized period and status, or either displayed total.

The group-level edit and delete buttons currently operate on the first claim in that fiscal-year group. Open an individual claim from its row for unambiguous work. When several claims share a fiscal year, do not assume a group action targets the row you were viewing.

| Claim field | Rule |
| --- | --- |
| Fiscal year | Required stable fiscal-year identity from the current Agreement budget. |
| Received date | Required date/time; the form captures a calendar date. |
| Period start and end | Required indexes from `0` (April) through `11` (March); end cannot precede start. |
| Final for year | Required boolean marker. It is descriptive: the database does not restrict a fiscal year to one claim with this marker. |

A core-created claim begins as `draft`. The header may be edited or soft-deleted only while editable. Deleting it soft-deletes its claim lines, reconciliations, and reconciliation lines in the same transaction; the historical rows remain in the database.

Changing the fiscal year validates the destination current fiscal year but does not migrate or revalidate existing claim lines. Old-year allocated lines can disappear from the Submission grid while remaining attached to the claim and eligible for reconciliation. Do not change the fiscal year after line entry. If it has changed, stop and reconcile the hidden lines through an authorized data review before submitting.

## Build the submission

The **Submission** tab groups the current fiscal year's budget lines by bilingual cost category and cost subsection. It shows submitted, reconciled, and balance amounts. Search matches category, subsection, bilingual line-item name, or description.

Enter a submitted amount against each required budget line and select **Save submission**. New zero-value cells are skipped; a non-zero cell creates a claim line in CAD. Existing cells are patched when their amount changes. The page sends one request per changed line, in sequence, rather than one bulk transaction. If a later request fails, earlier rows remain saved; refresh, compare every row, and retry only the missing corrections.

The host API also supports line description, currency, optional submitted category/subsection/line labels, reassignment to another editable claim, and soft deletion. Those full CRUD controls are not mounted in the current grid. The database derives each line's Agreement from its claim and uses composite foreign keys to keep any selected budget line in that Agreement.

There is no active uniqueness constraint for `(claim, budget line)`. Direct API or imported data can therefore create duplicates. While a claim is editable the grid uses the first matching line; once locked it displays multiple lines separately. Avoid duplicate logical lines and reconcile them before submission.

### Imported unallocated lines

[GC Forms Integration](../extensions/gc-forms.md) can materialize a claim and zero or more lines atomically. It creates the claim directly as `submitted`, records a unique source-submission UUID and destination links, and prevents duplicate materialization. A source line that cannot be mapped to a current budget line can remain unallocated with its submitted labels.

The core page displays unallocated lines and lets a user with `agreement:update` assign each one to a compatible current budget line while the claim is `draft` or `submitted`. For a submitted claim, this one-time null-to-budget allocation is the only permitted line edit. Reconciliation cannot start until every active line is allocated.

## Submit, withdraw, or cancel

Select **Ready for review** to change a draft claim to `submitted`. The server requires at least one active claim line and no unallocated line. It does not enforce a maximum against the budget, require a positive total, or require one line per budget coordinate.

A `submitted` claim may be withdrawn only before any active reconciliation exists. Withdrawal writes `withdrawn`; it does not return the claim to draft. A non-draft claim other than one already `withdrawn` or `cancelled` may be cancelled, even after reconciliation has started. Cancellation writes `cancelled`. Both are locked terminal states in the core page.

The claim lifecycle recognized by this feature is:

`draft` → `submitted` → `inreview` → `reviewed`

`submitted` may instead become `withdrawn`; most non-draft states may become `cancelled`. Creating or editing a reconciliation changes eligible parent states to `inreview`. Approval of a final reconciliation changes the claim to `reviewed`; approval of a non-final reconciliation and denial leave it `inreview`.

## Create and compare reconciliations

The **Reconciliation** tab becomes available for claims in `submitted`, `inreview`, `reviewed`, or `complete`, or whenever reconciliation history already exists. Creating one requires every claim line to be allocated and no approved final reconciliation. The server records the current Common User as reviewer, creates a `draft` reconciliation, and changes the claim to `inreview`.

Multiple active reconciliations may exist and the page lists newest first with reviewer, status, final marker, reconciled total, sampled total, and submitted-minus-reconciled balance. Select a row to view and edit it. Only one active reconciliation per claim may have `isfinal = true`; both application validation and a partial unique database index enforce this. If a final reconciliation is denied, the approval runtime clears its final marker so another can be designated.

For every claim line, a reconciliation line contains:

| Field | Contract |
| --- | --- |
| Reconciled amount | Required `numeric(19,2)`. |
| Sampled amount | Optional `numeric(19,2)`; the grid sends zero when left at its default. |
| Rationale | Optional free text. |

Only one active reconciliation line may reference a particular claim line within the same reconciliation. Composite foreign keys ensure that both belong to the same claim. The grid creates or patches every claim line sequentially when **Save reconciliation** is selected. A late failure can leave a partial reconciliation, so refresh and compare all rows before completion.

The UI inputs have a minimum of zero, but the shared API schemas use signed money validators and the database has no non-negative check for submitted, reconciled, or sampled amounts. The server also does not require the reconciled total to equal the submitted total, limit sampled to reconciled, require a rationale, or cap a claim against the budget. Treat the displayed balance as information, not an enforced completion rule.

Header/line edits move an unlocked reconciliation to `inprogress` and eligible parent claims to `inreview`. The API can move a reconciliation line to another editable reconciliation and can soft-delete reconciliation records and lines; the current detail page exposes neither delete operation.

## Completion, approval, and workflow

The selected reconciliation has Completion and Workflow controls. Completion requires `agreement:update`, an editable reconciliation, no already approved final reconciliation for the claim, no existing completion, and at least one active reconciliation line. It does not validate totals or the final marker.

On success the transaction records the common completion comment and user, writes the reconciliation directly to `complete`, starts any applicable `fundingclaimreconcile` workflow, commits, and emits the completion hook. The parent claim remains `inreview`. Completion does not inspect an approval template or create a routing slip.

A separate generic approval API exists for authorized integrations. An explicit caller can materialize the stream's valid `fundingclaimreconcile` approval template and move a completed or otherwise editable reconciliation to `pendingapproval`. Assigned approvers need ordinary access to the exact Agreement. Approval produces `approved`; denial produces `denied`, clears `isfinal`, and leaves the claim `inreview`. Approving a final reconciliation changes the claim to `reviewed` and blocks further reconciliation creation, editing, completion, or final designation.

The current claim detail page mounts no approval section and completion does not call that API. Configuring a claim-reconciliation approval template alone therefore does not submit core-UI reconciliations for approval.

## Locked states and recovery

Claim header and ordinary line edits are locked at `submitted`, `inreview`, `reviewed`, `withdrawn`, and `cancelled`, except for the one-time allocation of an unallocated line while `submitted`. Reconciliations are locked at `complete`, `pendingapproval`, `approved`, and `denied`, and a stored completion also prevents edits.

If a save fails, refresh before retrying because grid writes are not atomic. If submission is refused, ensure at least one line exists and every imported line is allocated. If final designation is refused, inspect the other reconciliation carrying the final marker. If an approved final reconciliation exists, treat the claim as closed; there is no core reopening action.

## Developer contract

The core family has 16 Agreement-scoped handlers: overview; claim create, patch, delete, ready-for-review, withdraw, and cancel; claim-line create, patch, and delete; reconciliation create, patch, and delete; and reconciliation-line create, patch, and delete. Detail data is supplied by the overview endpoint rather than a separate claim GET route. Bodies use the shared localized Zod schemas and standard `VALIDATION_FAILED` response.

Claim IDs and child IDs are PostgreSQL bigint values returned as strings; stable budget references are UUIDs. Claim-reconciliation IDs are registered polymorphic `Common_Entity` identities of type `fundingclaimreconcile`, allowing common completion, approval, workflow, and extension-tab dispatch. Soft deletion is used throughout. Aggregate locks are ordered by Agreement, claim, and reconciliation identity to serialize mutations and final-marker checks.

See [Agreement Budget](./budget.md), [Forecasts](./forecasts.md), [Payments](./payments.md), [Approvals and Completions](../concepts/approvals-completions.md), and [Workflows](../concepts/workflows.md).
