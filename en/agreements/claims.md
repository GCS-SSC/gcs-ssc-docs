# Agreement Claims

Claims capture submitted amounts against agreement budget lines and support one or more reconciliation records. The claim workflow has two major surfaces: the claim submission and reconciliation worklist.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Agreement budget fiscal years and line items | Claims are created for agreement budget fiscal years and submission rows come from budget lines. |
| Common users | Reconcile records store the current common user as reviewer. |
| Approval template for `fundingclaimreconcile` | Required when reconciliations need approval routing. |
| Agreement update permission | Required to edit draft claims, start reconciliations, save reconciliation lines, complete, and manage approvals. |

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

## Detail page

The detail page has a vertical tab set:

| Tab | Purpose |
| --- | --- |
| Submission | Enter submitted amounts by budget line and mark the claim ready for review. |
| Reconciliation | Start or select reconcile records, enter reconciled and sampled amounts, complete reconcile records, and view approvals. |
| Extension tabs | Optional claim tabs supplied by extensions. |

## Submission lines

The Submission tab builds rows from budget lines in the claim fiscal year. Saving creates or updates claim line items:

| Field | Rule |
| --- | --- |
| Claim | Set by the current claim detail page. |
| Budget line item | Must belong to the claim fiscal year and agreement. |
| Description | Inherited from the selected budget line. |
| Amount | Required money value. |
| Currency | Required; the detail editor writes CAD. |

The claim can be marked ready for review only when it is still `draft` and has at least one claim line. Ready for review changes status to `submitted`.

## Claim actions

| Action | Allowed when | Result |
| --- | --- | --- |
| Save submission | Claim status is `draft` and user can update agreement | Creates or updates claim line items. |
| Ready for review | Draft claim has at least one line | Sets claim status to `submitted`. |
| Withdraw | Claim status is `submitted` and no reconcile exists | Sets claim status to `withdrawn`. |
| Cancel | Claim is not `draft`, `withdrawn`, or `cancelled` | Sets claim status to `cancelled`. |

## Reconciliations

Reconciliation is shown when the claim is `submitted` or `inreview`, or when reconcile records already exist. Starting a reconciliation creates a draft reconcile for the current user and moves the claim to `inreview`.

Reconcile line items are saved against the active reconcile:

| Field | Rule |
| --- | --- |
| Reconcile | Set by the selected reconciliation record. |
| Claim line item | Required and must belong to the claim. |
| Reconciled amount | Required money value. |
| Sampled amount | Optional money value. |
| Rationale | Optional text; blank values normalize to null. |

The worklist shows every reconcile for the claim, latest first, with reviewer, status, final flag, reconciled total, sampled total, and balance.

## Business rules

| Rule | Behaviour |
| --- | --- |
| Draft claims are editable only before submission | `submitted`, `inreview`, `reviewed`, `withdrawn`, and `cancelled` lock claim submission edits. |
| Reconcile edits require a ready claim | Reconcile line editing requires claim status `submitted` or `inreview`. |
| Reconcile locked statuses block edits | `complete`, `pendingapproval`, `approved`, and `denied` reconciles are locked. |
| Reconcile completion requires lines | Completing an empty reconcile is rejected. |
| Completing a final reconcile can complete the claim | When the user marks the reconciliation as final during completion, the claim can move to `complete` before approval. |
| Approval updates claim status | Approved reconcile can move the claim to `reviewed`; denied reconcile keeps or returns the claim to `inreview` depending on approval result. |

## Completion and approval

Completion entity type: `fundingclaimreconcile`.

Completion is attached to the selected reconcile, not the claim header. The completion section appears when a reconcile exists. With a valid approval template, completion sets the reconcile to `pendingapproval`; otherwise it sets it to `complete`. The approval section appears for `pendingapproval`, `approved`, and `denied` reconciles.
