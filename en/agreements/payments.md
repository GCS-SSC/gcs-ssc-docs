# Agreement payments

Use a payment to request a reimbursement or advance against an eligible agreement commitment. Enter the period and requested amount in the payment header, then divide that amount among the commitment's accounting codes.

## Before you begin

Open an Agreement and select **Payments**. The following setup must already exist:

| Dependency | Requirement |
| --- | --- |
| Agreement budget | The fiscal year must exist in the current agreement budget. |
| Commitment | An active commitment of the selected type must exist and not be deleted. It must have a recorded Completion or a successful approval decision. |
| Commitment lines | Coding lines must belong to that exact commitment and map to the payment's current Agreement fiscal year. |
| Optional workflow setup | Completion starts the selected approval workflow when configured. |
| Optional approval template | Include the published approval template in the approval-submission workflow; a template alone does not create a route. See [Completion, approval, and workflow](#completion-approval-and-workflow). |

Agreement Viewer lets you read the tab and detail page. To create a payment, you need Contributor access and an assignment to this exact agreement; you become the payment’s primary assignee. To edit its header or lines, or complete it, you need Contributor access and an assignment to that payment. Deleting it requires Manager access and the same payment assignment. Access to a related stream, commitment or another agreement does not give access to this payment.

## Browse payments

The tab lists payment type, status, current fiscal-year label, April-to-March period, comment, amount, and line count. Search covers all loaded rows and matches the localized payment type and status, fiscal year, comment, amount, or line count. The table paginates 25 filtered rows at a time.

Select the payment type to open its detail page. Review the saved payment details, recovery summary, calculation evidence, and April-to-March period.

## Create or edit a payment

Prepare the request in this order:

1. Confirm the active commitment.
2. Select the payee and fiscal year.
3. Enter the payment type and April-to-March period.
4. Enter the requested amount and save the header.
5. Add the coding lines that divide the amount among the commitment’s accounting codes.
6. Review any calculator preview and recovery checks described below before completing the payment.

| Field | Rule |
| --- | --- |
| Commitment type | Required. The form stores a type, while the server resolves an eligible active commitment of that type. |
| Fiscal year | Required. Choose a fiscal year from the current agreement budget. |
| Payment type | Choose reimbursement or advance. |
| Period start and end | Choose months from April through March. The end cannot be before the start. |
| Payment amount | Required positive amount, with no more than two decimal places. |
| Payee | Required active proponent linked to this agreement; recovery controls use this recipient. |
| Currency | Required agreement currency; it must match the selected commitment. |
| Comment | Optional. |

A new payment receives the Agency Draft business status. Header and line edits preserve that status; its status changes through the configured workflow.

Before creating a payment, check the active commitment on the **Commitments** tab. The picker can also show inactive commitments that were completed. When you save, the system uses an eligible active commitment of the selected type. Choosing an old option may therefore select the current active commitment of that type or fail to save.

Changing the commitment or fiscal year is refused once the payment has any active line. Resolve and remove the active lines before changing either field. Other header edits remain subject to the lifecycle lock below. Your access and the agreement are checked again when you save.

Edit and delete actions check your current assignment, permissions and the record's status before proceeding. A visible button does not guarantee that the action is allowed. If you receive a warning, refresh the page and check your assignment and whether the agreement or payment is locked.

## Allocate payment lines

The detail page lists the commitment line number, fiscal year, accounting codes in their configured order and language, and allocated amount. Search matches the displayed coding values. The total below the table compares all active allocations with the payment header amount.

| Rule | Behaviour |
| --- | --- |
| Positive amount | Each line must be greater than zero, with no more than two decimal places. |
| Exact parent | The payment must belong to this agreement and the coding line must belong to its selected commitment. |
| Fiscal-year match | The commitment line and payment must use the same fiscal year in the current agreement budget. |
| One coding line per payment | Only one active line may reference a particular commitment line within the same payment. |
| Remaining balance | Across all active, non-denied payments, the sum assigned to a commitment line plus the proposed amount cannot exceed that commitment line's amount. An edit replaces the old amount rather than adding to it. |

A payment counts against the balance unless its latest recorded approval decision is a denial. Drafts and payments with no approval decision also count. Changing the status label to "Denied" does not release the balance.

For example, a commitment line of 6,000 CAD with 2,000 CAD already allocated to a non-denied payment has 4,000 CAD left before other accounting effects. A new allocation of 4,500 CAD fails by 500 CAD. A draft allocation also uses the balance, so look for other drafts before relying on the displayed cash paid to determine the available balance.

The server prevents two simultaneous saves from using the same remaining balance. The detail form keeps a line on the payment you are viewing. If a line is moved through an integration, the destination payment must still be editable and belong to the same agreement; its commitment, fiscal year, coding uniqueness and balance are checked again.

Deleting a line removes it from normal lists and balance calculations while retaining its history. Deleting a payment removes its header and active lines together. A locked payment cannot be edited or deleted.

## Completion, approval, and workflow

Use Completion on the detail page after saving all coding allocations. You must have Contributor access and be assigned to this payment. The payment must not already be completed, and it must have at least one active line. The line total must be positive and equal the requested amount exactly. The server checks these conditions, your access and the current lines again before saving.

Completion saves who completed the payment and their comment, then starts the selected approval-submission workflow if one is configured. Without one, Completion records the action without starting an approval workflow. Follow any published reviews, recommendations and approvals in the shared Workflow section. An approval template alone does not start a route. You cannot complete while a workflow is active, and completing locks ordinary editing.

For example, a payment of 1,250.00 allocated as 1,000.00 and 250.00 meets the total requirement. An allocation total of 1,249.99 does not. Correct the amounts before completing. Later approval does not waive the financial check.

Completing or approving a payment is not proof that an external financial system disbursed it. The application does not itself send money to a bank. The agency configures status labels. Check the workflow and any connected financial system’s evidence to confirm disbursement.

## Lifecycle and recovery

You cannot change the header or lines after Completion, while protected workflow work is in progress, or when the Agency’s status makes the record read-only or final. The server checks the current restrictions whenever you save, even if an older open form still shows Save.

If the totals do not match, compare the requested amount with all active lines, including lines hidden by a search. If the remaining balance is insufficient, inspect other payments using the same commitment line and their current approval evidence. The displayed status label alone does not determine which amounts count. Correct allocations while the record is editable, then try again.

While a request is pending, its save or delete control is disabled. Closing the form does not undo a save already sent. If you close it during a request, or the page fails to refresh afterward, reload the payment list and check the existing record before trying again.

For failed approval, follow the workflow’s recovery actions; Completion cannot be repeated or undone.

If an extension refuses a change, keep its error details and follow that extension's recovery instructions.

## Extensions

An extension can add or replace the creation action and supply one payment-amount calculator. Conflicting creation actions or multiple calculators block creation and show a warning. If calculator loading fails, select **Retry**. Wait for loading to finish before saving. Resolve a reported extension conflict with your administrator.

See [Commitments](./commitments.md), [Agreement budget](./budget.md), [Approvals and completions](../concepts/approvals-completions.md), and [Workflows](../concepts/workflows.md).

## Preview, recovery and retained evidence

Select the payee, commitment type, fiscal year and period before reviewing **Financial inputs** and the commitment-line balances. The financial inputs use the agreement currency, current budget, the monthly amounts of active forecast versions, eligible final reconciliations and accounting effects. Later claims beyond the selected period are excluded. The last budget year still counts when calculating holdbacks, even if it has no lines. The enabled calculator extension determines the payment entitlement, the holdback to reserve or release, and the payment amount. Review its breakdown and saved calculation details.

Payments-to-date inputs include cash and effective journal-voucher and correction amounts, with their positive or negative signs. Credits are separate. The inputs distinguish posted credits from credits attributed to source periods with successful final reconciliation. A credit received later can still belong to its retained source fiscal year. Do not subtract the same recovery twice or infer converted totals from another currency.

The preview checks the recipient’s Agency recovery controls. A direct-repayment hold applies across agreements and currencies in that Agency; checks for pending recoveries or adjustments use the payment currency. Outstanding direct repayment can return `AR_DIRECT_REPAYMENT_HOLD`; pending recovery or adjustment returns `AR_RECOVERY_UNRESOLVED` or `AR_ADJUSTMENT_UNRESOLVED`. Resolve that work through [Receivables](./receivables.md). Selecting another period does not clear the hold.

When offset is allowed, the wizard shows gross amount, offset and net payable. For example, gross 1,250 with 300 eligible offset gives net 950. Confirm the effective date and the required credit-memo coding for each proposed offset. Saving checks the reviewed plan and effective date against the current balance. `AR_OFFSET_CODING_REQUIRED` needs completed coding. `AR_OFFSET_PLAN_CHANGED`, `AR_OFFSET_PLAN_STALE` or `AR_OFFSET_BASIS_CHANGED` require a fresh preview and review, before saving again. Do not manually change the gross request to its net value.

An offset reserves the recovery amount when you save the payment and takes effect when the payment process succeeds. If an attempt is denied or cancelled, use its available recovery actions before applying that balance elsewhere. After saving and before Completion, check the payment’s credit-memo references, gross amount, offset, and net payable.

Use **Evidence** to see the information used when the payment was saved: your selections, fiscal-year label, capture time, exact financial inputs and commitment coding balances in both languages. Saving an edit recalculates those inputs and excludes the current payment from its own totals, so it is not counted twice. This saved evidence describes that calculation; it is not today’s available balance. Older records may have no evidence. Reload or retry an extension evidence panel that fails; missing evidence does not mean zero.

## Accounting capacity

Remaining balances include successful journal-voucher coding changes, posted corrections and effective receivable recovery. Direct paid allocations stay attached to their exact commitment lines. Coding balances are shared across records using the same Agency accounting codes. A recovery does not free the same amount on every duplicate coding line. Replacing a commitment also does not reset the amounts already used under that type. Inspect both the selected line and other records using its coding when a save reports insufficient balance.

## Holds after a budget or commitment change

Before Completion, workflow start, positive approval or successful processing, the server checks the current active forecast and commitments again. A saved payment or earlier approval step does not bypass a later funding reduction.

| Hold | How to resolve it |
| --- | --- |
| Forecast revision required | The active forecast’s program amount exceeds current annual program funding for the payment’s year. Create a replacement in **Forecasts**, complete its approval and confirm it is active, or restore sufficient authorized funding. A draft replacement does not clear the hold. |
| Commitment revision required | The selected commitment is inactive, or the combined active commitments exceed current program funding across all Agreement years in this currency. Activate valid replacements without reducing any accounting code below the amount already paid against it. Then select the current commitment on an editable payment. Alternatively, restore sufficient authorized funding. |

The commitment check adds every active type and uses the larger of each declared total and active line total. For example, 6,000 plus 4,000 in active commitments exceeds a reduced budget of 9,000 even though each commitment alone is below 9,000. Equality is allowed. A payment for another year can still be held by this Agreement-wide commitment total; the forecast hold uses the payment’s own year.

After resolving the hold, refresh and retry the existing payment action. If the payment is locked, follow its available workflow recovery actions rather than trying to edit its history. Recovery debts and coding limits remain additional checks. See [Forecasts](./forecasts.md) and [Commitments](./commitments.md).
