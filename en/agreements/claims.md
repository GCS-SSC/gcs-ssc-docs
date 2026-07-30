# Agreement Claims

Claims capture submitted amounts against agreement budget lines and support one or more reconciliation records. The claim workflow has two major surfaces: the claim submission and reconciliation worklist.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Agreement budget fiscal years and line items | Claims are created for agreement budget fiscal years and submission rows come from budget lines. |
| Common users | Reconcile records store the current common user as reviewer. |
| Approval template for `fundingclaimreconcile` | Required when reconciliations need approval routing. |
| Agreement CRUD permissions | `create` creates claims, missing submission lines, reconciliations, and missing reconcile lines; `update` changes existing records and mutable workflow state; `delete` soft-deletes claims and child records. Approval actions additionally require ordinary read access and assignment. |

## Tab flow

The Claims tab groups claims by fiscal year and shows claim id, period, status, submitted amount, and reconciled amount.

Creating a claim captures:

| Field | Rule |
| --- | --- |
| Fiscal year | Required agreement budget fiscal year. |
| Received date | Required date. |
| Period start/end | Fiscal-year months April through March, encoded 0 to 11. End cannot be before start. |
| Final for year | Required boolean. |

New claims start as `draft`.

Creating a claim requires `agreement:create`, editing its existing header requires `agreement:update`, and deleting it requires `agreement:delete`.

## Detail page

The claim detail page uses the shared detail hero. The hero title is the claim id and the metadata includes agreement number, agreement title, claim fiscal year, claim period, and status.

The detail page has a vertical tab set:

| Tab | Purpose |
| --- | --- |
| Submission | Enter submitted amounts by budget line, view imported or unallocated submitted lines, allocate those lines to agreement budget lines, and mark the claim ready for review. |
| Reconciliation | Start or select reconcile records, enter reconciled and sampled amounts, mark a reconcile as final, complete reconcile records, and view approvals. |
| Extension tabs | Optional claim tabs supplied by extensions. |

## Submission lines

The Submission tab builds editable draft rows from budget lines in the claim fiscal year. Saving creates or updates claim line items:

| Field | Rule |
| --- | --- |
| Claim | Set by the current claim detail page. |
| Budget line item | Usually set to an agreement budget line in the claim fiscal year; can be temporarily null for imported or external lines. |
| Submitted cost category, subsection, line item | Optional external labels used while a line is unallocated. |
| Description | Inherited from the selected budget line for UI-entered rows, or supplied by the import/source for unallocated rows. |
| Amount | Required money value. |
| Currency | Required; the detail editor writes CAD. |

Unallocated lines appear in the submission table with an Unallocated badge and their submitted labels. Users with `agreement:update` can allocate an unallocated line to a budget line while the claim is `draft` or `submitted`.

The claim can be marked ready for review only when it is still `draft`, has at least one claim line, and has no unallocated lines. Ready for review changes status to `submitted`.

## Multiple lines per budget line

External sources can create more than one claim line for the same agreement budget line. In read-only and submitted contexts, the Submission tab shows each submitted claim line separately so imported detail is not collapsed. In editable draft context, the normal budget-line editor shows one amount input per budget line.

## Claim actions

| Action | Allowed when | Result |
| --- | --- | --- |
| Save submission | Claim is `draft`; `agreement:create` for missing lines and `agreement:update` for existing lines | Creates or updates only the UI-entered rows allowed by the user's corresponding action. |
| Allocate unallocated line | Claim is `draft` or `submitted`, line is unallocated, and user has `agreement:update` | Sets the line's budget line item after validating it belongs to the Agreement and fiscal year. |
| Ready for review | Draft claim has at least one line, no unallocated lines, and user has `agreement:update` | Sets claim status to `submitted`. |
| Withdraw | Claim is `submitted`, no reconcile exists, and user has `agreement:update` | Sets claim status to `withdrawn`. |
| Cancel | Claim is not `draft`, `withdrawn`, or `cancelled`, and user has `agreement:update` | Sets claim status to `cancelled`. |

## Reconciliations

Reconciliation is shown when the claim is ready for reconciliation or when reconcile records already exist. Claims with status `submitted`, `inreview`, `reviewed`, or `complete` can show and start reconciliation work when they have no unallocated lines and no approved final reconciliation.

Starting a reconciliation requires `agreement:create`, creates a draft reconcile for the current user, and moves the claim to `inreview`. Changing an existing reconciliation or its final flag requires `agreement:update`. Starting or editing from a submitted, reviewed, or complete claim can return it to `inreview`.

Reconcile line items are saved against the active reconcile:

| Field | Rule |
| --- | --- |
| Reconcile | Set by the selected reconciliation record. |
| Claim line item | Required and must belong to the claim. |
| Reconciled amount | Required money value. |
| Sampled amount | Optional money value. |
| Rationale | Optional text; blank values normalize to null. |

The worklist shows every reconcile for the claim, latest first, with reviewer, status, final flag, reconciled total, sampled total, and balance. Selecting a reconcile changes the editable or read-only detail panel below the worklist. Saving uses `agreement:update` for existing reconcile lines and `agreement:create` for missing lines.

## Final reconciliation

Each claim can have only one final reconciliation. The selected reconcile panel includes a final checkbox when the reconcile is editable. Users can mark the active reconcile final only when no other reconcile for the claim is already final.

Completing a final reconcile shows an additional warning and confirmation. After an approved final reconcile exists, the claim is locked against new reconcile work, reconcile edits, and reconcile completion. This prevents later reconciliation records from changing a finalized claim.

If a final reconciliation approval is denied, the reconcile is set to `denied`, its final flag is cleared, and the claim returns to `inreview`.

## Business rules

| Rule | Behaviour |
| --- | --- |
| Draft claims are editable only before submission | `submitted`, `inreview`, `reviewed`, `withdrawn`, and `cancelled` lock normal submission edits. |
| Unallocated lines must be allocated before workflow advances | Ready for review and new reconciliation are blocked while any claim line lacks a budget line item. |
| Allocation has a wider window than submission editing | Unallocated lines can be allocated while the claim is `draft` or `submitted`; other line edits still require `draft`. |
| Reconcile start requires an eligible claim | New reconciles require `submitted`, `inreview`, `reviewed`, or `complete`, no unallocated lines, and no approved final reconcile. |
| Reconcile edits require a ready claim | Reconcile line editing requires a reconciliation-ready claim and no approved final reconcile. |
| Reconcile locked statuses block edits | `pendingapproval`, `approved`, and `denied` reconciles are locked. |
| Reconcile completion requires lines | Completing an empty reconcile is rejected. |
| Only one final reconcile is allowed | Creating or marking a second final reconcile is rejected. |
| Approved final reconcile locks the claim | New reconcile work and completion are rejected after a final reconcile is approved. |
| Approval updates claim status | Approved final reconcile moves the claim to `reviewed`; approved non-final reconcile keeps the claim `inreview`; denied reconcile clears final and leaves the claim `inreview`. |

## Completion and approval

Completion entity type: `fundingclaimreconcile`.

Completion is attached to the selected reconcile, not the claim header, and requires `agreement:update`. The completion section appears when a reconcile exists. Completing a final reconcile shows an extra confirmation because it can close the claim review path. With a valid approval template, completion creates or materializes the routing slip and sets the reconcile to `pendingapproval`; otherwise it sets the reconcile to `complete`.

When there is no approval template, completing a final reconcile moves the claim to `reviewed`; completing a non-final reconcile leaves the claim `inreview`. The approval section appears for `pendingapproval`, `approved`, and `denied` reconciles. Acting on an approval requires ordinary Agreement or exact-Team read access as well as assignment to the approval step; assignment alone does not grant access.
