# Agreement Payments

Payments record reimbursement or advance requests against an eligible Agreement commitment. A payment header defines the period and requested amount; its lines allocate that amount to the commitment's financial coding.

## Before you begin

Open an Agreement and select **Payments**. The following setup must already exist:

| Dependency | Verified requirement |
| --- | --- |
| Agreement budget | The payment uses a stable fiscal-year identity from the current Agreement budget version. |
| Commitment | An active commitment of the selected type must exist and not be deleted. It must have a recorded Completion or a successful approval decision. |
| Commitment lines | Coding lines must belong to that exact commitment and map to the payment's current Agreement fiscal year. |
| Optional workflow setup | Completion starts the selected approval-submission workflow for `fundingcasepayment` when configured. |
| Optional approval template | Include the published approval template in the approval-submission workflow; a template alone does not create a route. See [Completion, approval, and workflow](#completion-approval-and-workflow). |

Agreement Viewer lets you read the tab and detail page. To create a payment, you need Contributor access and an assignment to this exact agreement; you become the payment’s primary assignee. To edit its header or lines, or complete it, you need Contributor access and an assignment to that payment. Deleting it requires Manager access and the same payment assignment. Access to a related stream, commitment or another agreement does not give access to this payment. Missing or inaccessible records do not reveal information from another scope.

## Browse payments

The tab lists payment type, status, current fiscal-year label, April-to-March period, comment, amount, and line count. Search is client-side over all loaded rows and matches the localized payment type and status, fiscal year, comment, amount, or line count. The table paginates 25 filtered rows at a time.

Select the payment type to open its detail page. Review its payment packet, recovery summary and retained calculation evidence, including the localized April-to-March period.

## Create or edit a payment

Prepare the request in this order: confirm the active commitment, select the payee and fiscal year, enter the payment type and April-to-March period, then enter the requested amount. Save the header before adding its coding lines. Review any calculator preview and recovery checks described below before completing the payment.

| Field | Rule |
| --- | --- |
| Commitment type | Required. The form stores a type, while the server resolves an eligible active commitment of that type. |
| Fiscal year | Required. It is the stable identity of an active row in the current Agreement budget version, not the version-specific row ID. |
| Payment type | Required: `reimbursement` or `advance`. |
| Period start and end | Choose months from April through March. The end cannot be before the start. Technical month indexes are integers from `0` (April) to `11` (March). |
| Payment amount | Required, finite, positive money value within the shared request limit; persisted as `numeric(19,2)`. |
| Payee | Required active proponent linked to this agreement; recovery controls use this recipient. |
| Currency | Required agreement currency; it must match the selected commitment. |
| Comment | Optional; blank input is stored as `null`. |

A new payment receives the Agency Draft business status. Header and line edits preserve that status; only the configured lifecycle engine applies status transitions.

The commitment picker can include inactive commitments carrying completion evidence. Saving requires an active eligible commitment and resolves it by type. A historical displayed option can therefore fail at save or resolve the current active commitment of the same type. Verify the active commitment on its tab before creating the payment.

Changing the commitment or fiscal year is refused once the payment has any active line. Remove or reconcile the lines first. Other header edits remain subject to the lifecycle lock below. The server rechecks authorization and Agreement scope inside the write transaction before mutation.

The tab shows edit and delete controls from the caller's broad permissions, even for a locked row. If an action is rejected, refresh the page and use the status returned by the server rather than retrying the stale modal.

## Allocate payment lines

The detail page lists the commitment line number, fiscal year, localized ordered accounting dimensions and allocated amount. Search matches the displayed coding values. The total below the table compares all active allocations with the payment header amount.

| Rule | Behaviour |
| --- | --- |
| Positive amount | Each line must be greater than zero and is stored at two-decimal precision. Both request validation and the database enforce positivity. |
| Exact parent | The payment must belong to this agreement and the coding line must belong to its selected commitment. The database also checks these links; see Developer contract. |
| Fiscal-year match | The commitment line's stream budget must map to the payment's stable current Agreement fiscal year. |
| One coding line per payment | Only one active line may reference a particular commitment line within the same payment. |
| Remaining balance | Across all active, non-denied payments, the sum assigned to a commitment line plus the proposed amount cannot exceed that commitment line's amount. A patch excludes the line being changed. |

A payment counts against the balance unless its latest recorded approval decision is a denial. Drafts and payments with no approval decision also count. Changing the business-status label to “Denied” does not release the balance.

::: info Technical note
The precise test is whether the payment’s latest approval runtime for that exact target is `denied`.
:::

For example, a commitment line of 6,000 CAD with 2,000 CAD already allocated to a non-denied payment has 4,000 CAD left before other accounting effects. A new allocation of 4,500 CAD fails by 500 CAD. A draft allocation also uses the balance, so look for other drafts before assuming the displayed cash paid is the only amount consumed.

The server prevents two simultaneous saves from using the same remaining balance. The detail form keeps a line on the payment you are viewing. If a line is moved through an integration, the destination payment must still be editable and belong to the same agreement; its commitment, fiscal year, coding uniqueness and balance are checked again.

Deleting a line removes it from normal lists and balance calculations while retaining its database history. Deleting a payment removes its header and active lines together. A locked payment cannot be edited or deleted.

## Completion, approval, and workflow

Use Completion on the detail page after saving all coding allocations. You must have Contributor access and be assigned to this payment. The payment must not already be completed, and it must have at least one active line. The line total must be positive and equal the requested amount exactly. The server checks these conditions, your access and the current lines again before saving.

Completion saves who completed the payment and their comment, then starts the selected approval-submission workflow if one is configured. Without one, it records `no_workflow`. Follow any published reviews, recommendations and approvals in the shared Workflow section. An approval template alone does not start a route. You cannot complete while a workflow is active, and completing locks ordinary editing.

For example, a payment of `"1250.00"` allocated as `"1000.00"` and `"250.00"` can satisfy the equality check. An allocation total of `"1249.99"` cannot. Correct the amounts before completing; later approval is not a way to waive the financial check.

Completing or approving a payment is not proof that an external financial system disbursed it. The core host does not implement an automatic banking/payment-processing pipeline. Business status labels are Agency-configured; interpret them with the configured workflow and the owning integration's evidence.

## Lifecycle and recovery

You cannot change the header or lines after Completion, while protected workflow work is in progress, or when the Agency’s status makes the record read-only or final. The server checks the current restrictions whenever you save, even if an older open form still shows Save.

If the totals do not match, compare the requested amount with all active lines, including lines hidden by a search. If the remaining balance is insufficient, inspect other payments using the same commitment line and their current approval evidence. The displayed status label alone does not determine which amounts count. Correct allocations while the record is editable, then try again. If saving succeeded but the page failed to refresh, reload the record before saving another change. For failed approval, follow the workflow’s recovery actions; Completion cannot be repeated or undone.

If an extension refuses a mutation, retain its provenance and follow the owning extension's recovery guidance without bypassing the host route.

## Extension effects

The create surface supports append or replacement actions and one payment-amount calculator. Conflicting replacement actions or multiple calculators disable core creation and show a conflict warning.

## Developer contract

The balance check locks the commitment line to serialize competing host writes. Parent payments are locked in deterministic ID order before a moved child line is locked; a detected scope change is retried up to three times. The line PATCH API supports moves between editable payments in the same agreement. Deletion locks active lines and soft-deletes header and lines in one transaction. Completion atomically records comment/user and starts the selected `fundingcasepayment` approval-submission workflow or records `no_workflow`; its hook is emitted after commit. Evidence is captured inside the authorized save transaction.

Agreement-scoped handlers provide payment CRUD, coding lines, eligible lookups, financial inputs and creation/edit previews. Bodies use localized shared schemas and exact money; public bigint IDs are decimal strings.

Header ownership is derived from its commitment by a database trigger. A line's commitment is derived from its payment, with composite foreign keys proving both payment-to-commitment and line-to-commitment membership. The core database enforces positive `numeric(19,2)` amounts and active per-payment coding uniqueness; the cross-payment remaining-balance rule and completion total equality are transactional application rules rather than database aggregate constraints.

See [Commitments](./commitments.md), [Agreement Budget](./budget.md), [Approvals and Completions](../concepts/approvals-completions.md), and [Workflows](../concepts/workflows.md).

## Preview, recovery and retained evidence

Select the payee, commitment type, fiscal year and period before reviewing **Financial inputs** and the commitment-line balances. Host inputs use the agreement currency, current budget, the monthly amounts of active forecast versions, eligible final reconciliations and accounting effects. Later claims beyond the selected period are excluded. An empty final budget fiscal year still belongs to the holdback horizon. Entitlement, holdback reserve/release and the calculated payment amount belong to the enabled calculator extension; inspect its breakdown and retained provenance.

Payments-to-date inputs include cash and effective signed journal-voucher/correction effects separately from credits. Posted credits and credits attributable to fully finally reconciled source periods are separate inputs. A credit received later can still belong to its retained source fiscal year. Do not subtract the same recovery twice or infer converted totals from another currency.

The preview checks the recipient’s Agency recovery controls. A direct-repayment hold applies across agreements and currencies in that Agency; pending recovery/adjustment checks use the payment currency. Outstanding direct repayment can return `AR_DIRECT_REPAYMENT_HOLD`; pending recovery or adjustment returns `AR_RECOVERY_UNRESOLVED` or `AR_ADJUSTMENT_UNRESOLVED`. Resolve that work through [Receivables](./receivables.md). Selecting another period does not clear the hold.

When offset is allowed, the wizard shows gross amount, offset and net payable. For example, gross 1,250 with 300 eligible offset gives net 950. Confirm the effective date and the required credit-memo coding for each proposed offset. The preview supplies the plan and date tokens used by the application to identify the reviewed calculation. Saving checks these again against the current locked balance. `AR_OFFSET_CODING_REQUIRED` needs completed coding. `AR_OFFSET_PLAN_CHANGED`, `AR_OFFSET_PLAN_STALE` or `AR_OFFSET_BASIS_CHANGED` require a fresh preview and review, rather than replaying old tokens. Do not manually change the gross request to its net value.

Offset applications reserve recovery with the payment and become effective through its successful lifecycle. A denied/cancelled attempt must be resolved through the supported lifecycle before another recovery spends that balance. Inspect the packet’s credit-memo references and gross/offset/net values after saving and before Completion.

Use **Evidence** to see the information used when the payment was saved: your selections, fiscal-year label, capture time, exact financial inputs and commitment coding balances in both languages. Saving an edit recalculates those inputs and excludes the current payment from its own totals, so it is not counted twice. This saved evidence describes that calculation; it is not today’s available balance. Older records may have no evidence. Reload or retry an extension evidence panel that fails; missing evidence does not mean zero.

## Accounting capacity

Remaining balances include successful journal-voucher coding changes, posted corrections and effective receivable recovery. Direct paid allocations stay attached to their exact commitment lines. Incoming effects share the Agency coding pool rather than appearing as newly available money on every duplicate coding line. The commitment-type pool also prevents reusing money simply by replacing an active commitment of the same type. Inspect both line and shared coding capacity when a save reports insufficient balance.

## Holds after a budget or commitment change

Before Completion, workflow start, positive approval or successful processing, the server checks the current active forecast and commitments again. A saved payment or earlier approval step does not bypass a later funding reduction.

| Hold | How to resolve it |
| --- | --- |
| Forecast revision required | The active forecast’s program amount exceeds current annual program funding for the payment’s year. Create a replacement in **Forecasts**, complete its approval and confirm it is active, or restore sufficient authorized funding. A draft replacement does not clear the hold. |
| Commitment revision required | The selected commitment is inactive, or the combined active commitments exceed current program funding across all Agreement years in this currency. Activate valid replacements while preserving paid coding floors, then select the current commitment on an editable payment. Alternatively, restore sufficient authorized funding. |

The commitment check adds every active type and uses the larger of each declared total and active line total. For example, 6,000 plus 4,000 in active commitments exceeds a reduced budget of 9,000 even though each commitment alone is below 9,000. Equality is allowed. A payment for another year can still be held by this Agreement-wide commitment total; the forecast hold uses the payment’s own year.

After resolving the hold, refresh and retry the existing payment action. If the payment is locked, follow its available workflow recovery actions rather than trying to edit its history. Recovery debts and coding limits remain additional checks. See [Forecasts](./forecasts.md) and [Commitments](./commitments.md).
