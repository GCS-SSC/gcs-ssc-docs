# Agreement Payments

Payments record reimbursement or advance requests against an eligible Agreement commitment. A payment header defines the period and requested amount; its lines allocate that amount to the commitment's financial coding.

## Before you begin

Open an Agreement and select **Payments**. The following setup must already exist:

| Dependency | Verified requirement |
| --- | --- |
| Agreement budget | The payment uses a stable fiscal-year identity from the current Agreement budget version. |
| Commitment | Creation ultimately requires an active, non-deleted commitment of the selected type with completion evidence or an approved approval runtime. |
| Commitment lines | Coding lines must belong to that exact commitment and map to the payment's current Agreement fiscal year. |
| Optional workflow setup | Completion starts the selected approval-submission workflow for `fundingcasepayment` when configured. |
| Optional approval template | Include the published approval template in the approval-submission workflow; a template alone does not create a route. See [Completion, approval, and workflow](#completion-approval-and-workflow). |

Agreement Viewer reads the tab/detail. Creating a payment requires Contributor plus the exact Agreement assignment and makes the creator primary. Later payment/line updates and completion require Contributor plus the exact payment assignment; deletion requires Manager plus that assignment. A related stream, commitment, or Agreement does not broaden the boundary. Missing/inaccessible records do not disclose cross-scope data.

## Browse payments

The tab lists payment type, status, current fiscal-year label, April-to-March period, comment, amount, and line count. Search is client-side over all loaded rows and matches the localized payment type and status, fiscal year, comment, amount, or line count. The table paginates 25 filtered rows at a time.

Select the payment type to open its detail page. The header there shows the amount, status, and the raw stored period indexes; use the localized April-to-March period shown on the Payments tab when confirming dates.

## Create or edit a payment

| Field | Rule |
| --- | --- |
| Commitment type | Required. The form stores a type, while the server resolves an eligible active commitment of that type. |
| Fiscal year | Required. It is the stable identity of an active row in the current Agreement budget version, not the version-specific row ID. |
| Payment type | Required: `reimbursement` or `advance`. |
| Period start and end | Required integer indexes from `0` (April) through `11` (March); end must be at or after start. |
| Payment amount | Required, finite, positive money value within the shared request limit; persisted as `numeric(19,2)`. |
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
| Exact parent | The payment must belong to this Agreement and the line must belong to the payment's selected commitment. Composite database foreign keys preserve that relationship. |
| Fiscal-year match | The commitment line's stream budget must map to the payment's stable current Agreement fiscal year. |
| One coding line per payment | Only one active line may reference a particular commitment line within the same payment. |
| Remaining balance | Across all active, non-denied payments, the sum assigned to a commitment line plus the proposed amount cannot exceed that commitment line's amount. A patch excludes the line being changed. |

Here, “non-denied” means the payment’s latest exact target approval runtime is not `denied`. A draft or a payment without approval evidence still consumes the balance. A configurable business-status name such as “Denied” does not itself release money.

The balance check locks the commitment line, serializing competing host writes to the same balance. Parent payments are locked in deterministic ID order before a moved child line is locked; a detected scope change is retried up to three times. A line PATCH API can move a line to another editable payment in the same Agreement, although the mounted detail modal keeps the current payment selected. The destination commitment, fiscal year, uniqueness, and balance are all revalidated.

Deleting a line soft-deletes it. Deleting a payment locks its active lines and soft-deletes the lines and header together. Deleted records no longer appear or count toward balances; database history remains. Deletion and edits are refused once the payment is locked.

## Completion, approval, and workflow

The detail page presents Completion and the shared Workflow section. Complete only after saving all coding allocations. The server locks the payment and active lines, refreshes Contributor access and the exact payment assignment, and requires no earlier completion, at least one active line, a positive line total, and exact equality between that total and the header amount.

Completion atomically records its comment/user and either starts the selected `fundingcasepayment` approval-submission workflow or records `no_workflow`. The hook is emitted after commit. The workflow can contain published reviews, recommendations, and approvals; its controls appear in the shared section. A configured template by itself does not create this sequence. An active workflow blocks Completion, and completion evidence locks ordinary editing.

For example, a payment of `"1250.00"` allocated as `"1000.00"` and `"250.00"` can satisfy the equality check. An allocation total of `"1249.99"` cannot. Correct the amounts before completing; later approval is not a way to waive the financial check.

Completing or approving a payment is not proof that an external financial system disbursed it. The core host does not implement an automatic banking/payment-processing pipeline. Business status labels are Agency-configured; interpret them with the configured workflow and the owning integration's evidence.

## Lifecycle and recovery

Agency read-only/terminal status, completion evidence, and protected runtime work lock header and line changes. The server repeats those checks inside the authorized transaction, including when a previously opened modal still offers Save.

For a total mismatch, compare the header with the full unfiltered line total. For a balance failure, inspect other payments consuming the same commitment line and their current runtime evidence. A display label alone is not the balance policy. Correct editable allocations before retrying. If a save succeeded but refresh failed, reload the current record before issuing another mutation. Follow workflow recovery for a failed approval attempt; Completion cannot be repeated or undone.

If an extension refuses a mutation, retain its provenance and follow the owning extension's recovery guidance without bypassing the host route.

## Extension effects

The create surface supports append or replacement actions and one payment-amount calculator. Conflicting replacement actions or multiple calculators disable core creation and show a conflict warning.

## Developer contract

The payment family contains 11 Agreement-scoped handlers: overview; header create, detail, patch, and delete; line create, patch, and delete; and commitment, fiscal-year, and commitment-line lookups. Bodies use the shared localized Zod schemas and standard localized validation response. Bigint identities accept the shared external ID forms and are returned as strings by the PostgreSQL/Kysely contract.

Header ownership is derived from its commitment by a database trigger. A line's commitment is derived from its payment, with composite foreign keys proving both payment-to-commitment and line-to-commitment membership. The core database enforces positive `numeric(19,2)` amounts and active per-payment coding uniqueness; the cross-payment remaining-balance rule and completion total equality are transactional application rules rather than database aggregate constraints.

See [Commitments](./commitments.md), [Agreement Budget](./budget.md), [Approvals and Completions](../concepts/approvals-completions.md), and [Workflows](../concepts/workflows.md).
