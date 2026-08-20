# Agreement Payments

Payments record reimbursement or advance requests against an eligible Agreement commitment. A payment header defines the period and requested amount; its lines allocate that amount to the commitment's financial coding.

## Before you begin

Open an Agreement and select **Payments**. The following setup must already exist:

| Dependency | Verified requirement |
| --- | --- |
| Agreement budget | The payment uses a stable fiscal-year identity from the current Agreement budget version. |
| Commitment | Creation ultimately requires an active, non-deleted commitment of the selected type whose status is `complete` or `approved`. |
| Commitment lines | Coding lines must belong to that exact commitment and map to the payment's current Agreement fiscal year. |
| Optional workflow setup | Completion can start an applicable workflow for `fundingcasepayment`. |
| Optional approval template | The server has a separate payment-approval runtime, but core completion and the current detail page do not invoke it. See [Completion, approval, and workflow](#completion-approval-and-workflow). |

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

A core-created payment starts as `draft`. Editing its header or changing its lines moves a draft to `inprogress`. The API response also presents a draft header as `inprogress` after an edit.

The commitment picker currently includes all `complete` commitments, even inactive ones, and active `approved` commitments. Saving is stricter: it resolves only an active `complete` or `approved` commitment by type. A displayed inactive completed option can therefore fail at save, or resolve another active commitment of the same type. Do not treat picker presence as proof of eligibility; verify the active commitment on the Commitments tab.

Changing the commitment or fiscal year is refused once the payment has any active line. Remove or reconcile the lines first. Other header edits remain subject to the lifecycle lock below. The server rechecks authorization and Agreement scope inside the write transaction before mutation.

The tab shows edit and delete controls from the caller's broad permissions, even for a locked row. If an action is rejected, refresh the page and use the status returned by the server rather than retrying the stale modal.

## Allocate payment lines

The detail page lists the commitment line number, fiscal year, fund, optional GL and description, fund centre, internal order, functional area, cost centre, and allocated amount. Search matches those displayed coding values. The total below the table compares all active lines with the payment header amount.

| Rule | Behaviour |
| --- | --- |
| Positive amount | Each line must be greater than zero and is stored at two-decimal precision. Both request validation and the database enforce positivity. |
| Exact parent | The payment must belong to this Agreement and the line must belong to the payment's selected commitment. Composite database foreign keys preserve that relationship. |
| Fiscal-year match | The commitment line's stream budget must map to the payment's stable current Agreement fiscal year. |
| One coding line per payment | Only one active line may reference a particular commitment line within the same payment. |
| Remaining balance | Across all active, non-denied payments, the sum assigned to a commitment line plus the proposed amount cannot exceed that commitment line's amount. A patch excludes the line being changed. |

The balance check locks the commitment line, serializing competing host writes to the same balance. Parent payments are locked in deterministic ID order before a moved child line is locked; a detected scope change is retried up to three times. A line PATCH API can move a line to another editable payment in the same Agreement, although the mounted detail modal keeps the current payment selected. The destination commitment, fiscal year, uniqueness, and balance are all revalidated.

Deleting a line soft-deletes it. Deleting a payment locks its active lines and soft-deletes the lines and header together. Deleted records no longer appear or count toward balances; database history remains. Deletion and edits are refused once the payment is locked.

## Completion, approval, and workflow

The core detail page has **Completion** and **Workflow** sections; it has no payment approval section.

Completion is transactional. It locks the payment and its active lines, rechecks the Contributor Agreement role ceiling and exact payment assignment, refuses a second completion, and requires:

- at least one active line and a positive line total; and
- an exact PostgreSQL numeric sum equal to the payment header amount.

On success it records the common completion comment and user, changes the payment directly to `complete`, starts any applicable `fundingcasepayment` workflow, commits, and then emits the completion hook. It does not inspect a payment approval template or create a routing slip.

A generic payment approval API does exist for authorized integrations. An explicit caller can materialize the stream's `fundingcasepayment` template, move the payment to `pendingapproval`, and process assigned approvals to `approved` or `denied`. Assigned approvers still need ordinary access to the exact Agreement. That API is not called by the core completion button and its controls are not mounted on the payment page. Consequently, configuring a payment approval template alone does not put a core-UI payment into approval.

The schema also defines `pay`, `wait`, `processed`, and `paid`. They are locked if encountered, but no current core route or installed extension advances a payment into those four operational states. Do not describe them as an automated processing pipeline.

## Lifecycle and recovery

`draft` and `inprogress` are editable. `complete`, `pendingapproval`, `approved`, `denied`, `pay`, `wait`, `processed`, and `paid` are locked against header and line mutation.

If completion reports a total mismatch, compare the header amount with the full unfiltered line total, then correct the editable header or lines. If a balance error occurs, inspect other non-denied payments against the same commitment line. A denied payment no longer consumes that balance. If an extension refuses a mutation, preserve its generated provenance and follow the extension-specific recovery guidance rather than bypassing the host route.

## Extension effects

The create surface supports append or replacement actions and one payment-amount calculator. Conflicting replacement actions or multiple calculators disable core creation and show a conflict warning.

### Automated Payments

When enabled for the stream, [Automated Payments](../extensions/automated-payments.md) calculates a CAD suggested amount and ceiling from claims, forecasts, earlier non-denied payments, remaining approved commitment lines, and configured holdback rules. The calculator appears only during creation, recalculates as fields change, and may collect a holdback release. The UI copies the suggestion into the amount and blocks values above the ceiling; the server recalculates and enforces the ceiling in the creation transaction, then stores normalized holdback metadata. It does not create lines or advance payment statuses.

### Outcome Cost Allocation

When [Outcome Cost Allocation](../extensions/outcome-cost-allocation.md) manages the selected commitment, its post-create hook calculates allocation-derived payment lines in the same transaction and moves the new payment from `draft` to `inprogress`. Generated lines must exactly fit the managed commitment coordinates and remaining coverage. The extension then prevents changing or deleting those lines and protects sensitive header fields, while still allowing ordinary non-sensitive edits and valid status changes. It can also prevent resurrecting a denied generated payment when current allocation coverage is insufficient. Keep the extension enabled while generated provenance exists.

## Developer contract

The payment family contains 11 Agreement-scoped handlers: overview; header create, detail, patch, and delete; line create, patch, and delete; and commitment, fiscal-year, and commitment-line lookups. Bodies use the shared localized Zod schemas and standard localized validation response. Bigint identities accept the shared external ID forms and are returned as strings by the PostgreSQL/Kysely contract.

Header ownership is derived from its commitment by a database trigger. A line's commitment is derived from its payment, with composite foreign keys proving both payment-to-commitment and line-to-commitment membership. The core database enforces positive `numeric(19,2)` amounts and active per-payment coding uniqueness; the cross-payment remaining-balance rule and completion total equality are transactional application rules rather than database aggregate constraints.

See [Commitments](./commitments.md), [Agreement Budget](./budget.md), [Approvals and Completions](../concepts/approvals-completions.md), and [Workflows](../concepts/workflows.md).
