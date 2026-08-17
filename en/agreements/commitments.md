# Agreement Commitments

Commitments group financial-coding lines that payments can consume. Open an agreement and select **Commitments** to see every commitment's type, status, line count, and total in Canadian dollars; select the type to open its detail page.

## Before you begin

| Requirement | Verified behaviour |
| --- | --- |
| Agreement access | Reading uses Agreement `read`. Creating a commitment or line uses `create`; editing uses `update`; deleting uses `delete`. Exact Agreement Team access can grant the corresponding child-record action. |
| Current agreement budget | Each individual commitment's active line total is capped by total program funding across the agreement's current budget version. |
| Stream commitments | The agreement's stream must have fiscal-year stream commitments with financial coding. The picker searches GL description or fiscal-year display and cannot select another stream's configuration. |
| Common user record | Completion requires the signed-in account to resolve to an active `Common_User`. |
| Optional completion workflow | A published workflow setup for `fundingcaseagreementcommitment` can start after completion. Its configured terminal result may subsequently change the commitment status. |

Writes run in a transaction that locks the agreement and affected commitment aggregate, reloads the Agreement scope, and repeats authorization before mutation. A missing, deleted, cross-agreement, or unauthorized record is not exposed as a usable child resource.

## Create and find commitments

Choose **Add commitment**, select a type, and save. Supported types are `commitment`, `paye`, `paye2`, and `pyp`. A core-created commitment starts as `draft`, inactive, with no financial-system number. The core UI only edits the type; the financial-system number is displayed by APIs but is not editable here.

Search on the tab matches the localized type or status label, line count, or displayed total. Results are filtered and paginated in the browser after the complete overview is loaded.

An enabled extension may append a creation action or replace the core action. Conflicting replacement actions disable creation and show a warning. In particular, [Outcome Cost Allocation](../extensions/outcome-cost-allocation.md) can replace creation, produce an `inprogress` commitment, generate lines from the active allocation and stream mappings, and retain provenance. If its configuration does not apply, its server hook lets core creation continue.

## Manage commitment lines

The detail page displays the agreement breadcrumb and status, then the commitment's lines, completion, and workflow sections. It does not display a commitment-approval section.

| Field | Rule |
| --- | --- |
| Commitment line number | Required integer from 1 through 32,767. Within one commitment, the active combination of line number and stream commitment must be unique. |
| Stream commitment | Required. It must be active and belong to the agreement's exact stream. Its fiscal year, fund, GL and description, fund centre, internal order, functional area, and cost centre appear in the table. |
| Amount | Required `numeric(19,2)` money value, at most two decimal places and no more than 90 trillion in absolute value. The current validator does not require a positive or non-negative amount. |

The detail search matches the line number, fiscal year, every displayed coding component, or amount. The total card sums all unfiltered lines and formats the result as CAD; no currency conversion occurs.

Creating, editing, moving, or deleting a line changes every affected editable commitment to `inprogress`. A PATCH can move a line to another editable commitment in the same agreement, although the current detail form keeps it on the displayed commitment. Soft deletion hides a line; deleting an editable commitment soft-deletes it and all its active lines in the same transaction.

## Financial safeguards

| Guard | Exact scope |
| --- | --- |
| Current program-funding ceiling | For the target commitment, existing active lines plus the new or replacement amount cannot exceed the sum of `program funding` in the agreement's current budget version. This is a per-commitment ceiling, not a shared ceiling across all commitment types or versions. |
| Database enforcement | PostgreSQL repeats that rule with deferred constraint triggers after commitment-line writes, current-budget line changes, and current-version changes. The transaction therefore cannot commit with any active commitment over the current program-funding total. |
| Paid-amount floor | On line create or patch, the submitted amount must be at least the sum of all non-denied active payment lines in this agreement whose commitment lines use the same stream commitment. The comparison is aggregated by stream commitment, not limited to the edited line. |
| Locked lifecycle | `complete`, `pendingapproval`, `approved`, and `denied` commitments cannot be edited or deleted and their lines cannot be changed. |

If a budget reduction would put a commitment over the new current program-funding total, PostgreSQL rejects the transaction. Restore sufficient current program funding or reduce editable commitment lines first. Validation and constraint failures leave the transaction unchanged.

::: warning Amount sign is not enforced
The application currently accepts zero and negative commitment-line amounts. The screen should not be treated as enforcing a positive financial commitment; apply agency review controls before completion.
:::

## Complete a commitment

Completion is available only while the user has Agreement `update`, the commitment is editable, no earlier completion exists, and at least one active line remains. Comments are optional.

Completion is atomic and performs these actions:

1. locks and revalidates the commitment, lines, user, scope, and authorization;
2. deactivates any other active commitment of the same agreement and type;
3. sets this commitment to `complete` and active;
4. creates its one common completion record and emits the completion hook after commit; and
5. starts any published completion workflow configured for `fundingcaseagreementcommitment`.

The database also permits only one active, undeleted commitment per agreement and type. A completed commitment is eligible in the payment commitment picker; an approved commitment is eligible only while active. See [Payments](payments.md) for downstream balance rules and [Workflows](../concepts/workflows.md) for workflow status effects.

## Approval runtime limitation

The server contains generic commitment-approval runtime support for a stream-scoped `fundingcaseagreementcommitment` approval template, routing-slip creation, sequential decisions, reassignment, additional approvals, and final `approved` or `denied` status. Final approval activates the selected commitment and deactivates every other commitment of the same agreement and type.

However, core commitment completion does **not** inspect that template or create a routing slip: it always completes and activates the commitment directly. The current detail page also mounts no approval component. Therefore, configuring a commitment approval template alone does not make the core Commitments screen submit for approval. Treat the approval runtime as an API/integration capability until a host or extension flow explicitly invokes it; do not promise end users an approval step from this screen. The general runtime contract is described in [Approvals and completions](../concepts/approvals-completions.md).

## Recovery and deletion

- A completion cannot be repeated or undone from the commitment page. Use a new commitment record when a replacement is required.
- Locked commitments and their lines cannot be deleted through these routes. Editable commitment deletion is logical rather than physical and removes its lines from normal lists.
- If a stream commitment is missing from the picker, verify that its stream budget, transfer-payment fiscal-year budget, agency fiscal year, and stream commitment are all active and belong to the agreement's stream.
- If completion reports an invalid status, verify that the record is still editable, has at least one active line, and has not already been completed.
