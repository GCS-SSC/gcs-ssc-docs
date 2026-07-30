# Agreement Payments

Payments record planned or actual payment requests against active approved commitments. Payment lines allocate the payment amount to approved commitment lines.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Agreement budget fiscal years | Payment fiscal years are selected from agreement budget fiscal years. |
| Approved active commitment | Creating a payment requires an active approved commitment of the selected commitment type. |
| Commitment lines | Payment lines select eligible commitment lines for the payment's commitment and fiscal year. |
| Approval template for `fundingcasepayment` | Required when completed payments must go through approval. |
| Optional payment amount calculator extension | Extensions can suggest payment amounts, apply ceilings, or replace create actions. |

## Tab flow

The Payments tab displays payment type, status, fiscal-year schedule, period, comment, amount, and line count. Search includes the visible comment text.

Viewing payments requires `agreement:read`. Creating a payment requires `agreement:create`; editing an existing payment or completing it requires `agreement:update`; deleting a payment requires `agreement:delete`. An exact Agreement Team can supply these actions according to its access level.

Creating a payment captures:

| Field | Rule |
| --- | --- |
| Commitment type | Required. The agreement must have an active approved commitment of this type. |
| Fiscal year | Required. Must be an agreement budget fiscal year. |
| Payment type | `reimbursement` or `advance`. |
| Period start/end | Fiscal-year months, April through March, encoded as 0 to 11. End cannot be before start. |
| Payment amount | Required positive money value. |
| Comment | Optional. Blank comments normalize to null. |

New core payments are created as `draft`. Extension create hooks can replace the core insert after validation succeeds.

## Detail page

The payment detail page shows payment context, payment lines, completion, and approval. Use it to allocate the payment amount to eligible commitment lines before completing the payment.

## Payment lines

| Field | Rule |
| --- | --- |
| Payment | Set by the current payment detail page. |
| Commitment line | Required. The selector only offers commitment lines that match the payment's approved commitment and fiscal year. |
| Amount | Required positive money value. |

The detail table shows the commitment line number, fiscal year, financial coding, and payment-line amount. Financial coding includes the fund as the primary value and GL, fund centre, internal order, functional area, and cost centre when present. The detail total compares payment line total to payment amount.

Adding a payment line requires `agreement:create`, editing an existing line requires `agreement:update`, and deleting a line requires `agreement:delete`. The eligible commitment-line lookup uses the same create or update action as the form that opened it.

## Business rules

| Rule | Behaviour |
| --- | --- |
| Payment creation requires an active approved commitment | If no commitment of the selected type is active and approved, creation is rejected. |
| Fiscal year must belong to the agreement budget | Invalid fiscal years are rejected. |
| Payment line must match the payment commitment and fiscal year | Commitment lines outside the payment context are rejected. |
| Payment line amount cannot exceed commitment balance | The payment line total for a commitment line cannot exceed that commitment line's remaining balance. |
| Locked statuses block edits | `complete`, `pendingapproval`, `approved`, `denied`, `pay`, `wait`, `processed`, and `paid` are read-only. |
| Editing a draft payment moves it to in progress | Line changes sync draft payments to `inprogress`. |
| Completion requires exact line total | The payment cannot complete unless line total is positive and exactly equals payment amount. |

## Completion and approval

Completion entity type: `fundingcasepayment`.

Completing a payment stores the common completion comment. With a valid approval template for `fundingcasepayment`, the payment moves to `pendingapproval`; without one, it moves to `complete`.

The approval section appears for `pendingapproval`, `approved`, and `denied` payments. Approval actions move the payment status through the common routing slip. Later operational payment statuses such as `pay`, `wait`, `processed`, and `paid` are locked in the agreement UI.

An assigned approver must also have ordinary `agreement:read` access through a role or exact Agreement Team. The assignment makes the user eligible for the approval step; it does not grant access to the payment or Agreement.

## Extension points

Payment creation can be replaced or extended by registered extension create actions. A payment amount calculator extension can return a suggested amount, a ceiling amount, currency, calculation details, loading state, errors, and extension-specific data. The form prevents saving when the entered amount exceeds the calculator ceiling.

See [Automated Payments](../extensions/automated-payments.md) for claim-, forecast-, commitment-, and holdback-based ceilings. [Outcome Cost Allocation](../extensions/outcome-cost-allocation.md) can generate payment lines for commitments it manages.
