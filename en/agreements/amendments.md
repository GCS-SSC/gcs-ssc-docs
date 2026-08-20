# Agreement amendments

Use the agreement's **Amendments** tab to prepare a controlled change without editing the current budget or activities in place. An amendment records its bilingual purpose, configured amendment types/subtypes, optional proposed duration, isolated snapshots, approval history, and version lineage.

## Setup and access

The agreement's stream must have active amendment types. Each type declares the part it amends—`budget`, `duration`, or `activities`—and whether an associated subtype is required. To submit through the core approval UI, the stream also needs a published `approval_submission` workflow for `fundingcaseamendment`, a published recommendation set, and at least one published approval stage.

Viewer, Contributor, and Manager Agreement role ceilings govern read, create/update, and delete. The user also needs the exact Agreement assignment to create the child and the amendment's own exact assignment for later work; creation makes the creator its primary assigned user. Every write re-resolves and locks the scope and assignment in a fresh-authorized transaction. An amendment ID must belong to the Agreement in the URL.

Only one active `draft` or `pendingapproval` amendment may exist for an agreement. Approved, denied, cancelled, and soft-deleted amendments do not prevent a replacement draft.

## List and create

The list is server-paginated and ordered by amendment number, then ID, newest first. The interface applies its search locally to the loaded page across number, English/French name, status, and type names. It shows type badges and whether budget/activity snapshots exist.

Creation requires:

- at least one of the English or French names;
- at least one unique active amendment type from the agreement's current stream; and
- for every selected type marked as requiring a subtype, at least one active selected subtype linked to that same type and stream.

Subtypes outside the selected types, inactive records, duplicates, and records from another stream are rejected. A duration type initializes the proposed dates from the agreement's current authorized-assistance dates. The new amendment starts in `draft` without a number.

## Detail workspace and scope

The detail page has **General**, **Budget**, **Activities**, **Recommendation**, and **Assigned users** tabs. General is editable only in `draft`; terminal records retain their type/subtype badges and assignment roster as history.

In General, you can change the bilingual name, types, subtypes, and—when a duration type is selected—both proposed authorized-assistance dates. At least one language and one type remain required. Both duration dates are required together and end must be on or after start.

After a snapshot exists, its enabling type cannot be removed: a budget snapshot requires a `budget` or `duration` type, and an activity snapshot requires `activities`. Proposed duration changes must continue to overlap every active fiscal year in the amendment budget snapshot.

## Budget snapshot

A draft with a `budget` or `duration` capability can copy the current budget once. The copy includes every active fiscal year and line and keeps stable logical identities while receiving separate physical rows.

Capabilities remain distinct:

| Selected capability | Permitted snapshot changes |
| --- | --- |
| `budget` | Create, edit, and soft-delete budget lines. |
| `duration` | Create, change, and soft-delete fiscal-year groups within the proposed dates. Deleting a year also soft-deletes its copied lines. |
| both | Both sets of controls. |

Fiscal-year creation/update verifies active stream-budget membership and overlap with the proposed amendment dates. A fiscal year used by an active claim, payment, or claim line cannot be deleted. A stable line used by an active claim line cannot be moved or deleted. Line fields and monetary validation otherwise match [Agreement budget](./budget.md).

::: warning Capacity limitation in amendment snapshots
Amendment-specific budget-line create/update routes validate ownership, type capability, schema totals, and cost-line scope, but they do not run the current-budget cross-agreement stream-capacity check. Promotion also does not add that check. Before approval, manually confirm that proposed program funding remains within the stream budget and overcommit threshold; do not rely on the successful snapshot save as proof of capacity.
:::

## Activity snapshot

A draft with the `activities` capability can copy the current activity version once, including outcome and responsible-party selections. The amendment's Activities tab then supports the same required bilingual fields, date range, active program outcomes, and active agreement-proponent choices described in [Agreement activities](./activities.md), but all changes remain inside the amendment snapshot.

Activity snapshot routes require the draft snapshot to exist. Creating or updating requires a Contributor Agreement role ceiling and the exact amendment assignment; deletion requires Manager plus that same assignment. Deletion soft-deletes the copied activity and both selection-link families.

## Approval, promotion, and revision

The **Recommendation** tab now renders the approval-submission workflow. Starting it while the amendment is `draft` atomically creates the run and an immutable schema-version-1 packet with submission time and SHA-256 canonical hash. The packet includes the amendment's bilingual identity, selected types/subtypes, and only its changed domains: the proposed budget version, activity version, and/or duration dates. Unchanged Agreement profile and Proponent content is not duplicated.

Recommendation members run from their pinned published schemas and can use member or final approval routes. The packet is shown from saved JSON in grouped, collapsible sections; mutable reference labels are resolved at submission so later renames do not change the evidence.

While the run is active, conflicting Agreement/amendment, snapshot, lifecycle, and deletion mutations are locked. Cancelling the workflow itself is the exception: the Workflow section can terminate the active run and its children without changing packet source data. On failure or denial, the configured failure status applies and no snapshot is promoted. On success, the runtime recomputes the packet hash, promotes only the domains present in the approved packet, applies proposed dates, closes and numbers the amendment, writes a `Funding_Case_Agreement_Revision` linked uniquely to the approval submission, and applies the configured success status. Promotion and revision insertion occur in the same transaction.

An assigned approver can read the exact packet required for the decision. Editing the amendment or recommendation still requires the corresponding exact assignment and Contributor ceiling; approval assignment does not grant general Agreement access.

## Cancel, delete, and recover

The amendment's **Cancel** control is displayed while it remains open, but the server rejects that amendment-lifecycle request while an approval submission is active. First cancel the active run from the Workflow section; that cancels its active children. Then use **Cancel** on the amendment to cancel any remaining draft/pending routing slip, set the amendment to `cancelled`, and close it without deleting the record or snapshots. Amendment cancellation is terminal and permits a new draft.

Deletion requires a Manager Agreement role ceiling and the exact amendment assignment and is permitted only in `draft`. It transactionally soft-deletes copied budget lines/years, activities and their selection links, both snapshot versions, type/subtype links, and the amendment. Approved, denied, cancelled, and pending-approval amendments cannot be deleted through this route.

There is no restore control. For an accidental cancellation or deletion, preserve the audit trail and have an authorized administrator assess recovery instead of recreating history under the same identity.

## Related guides

- [Funding agreements](./index.md)
- [Agreement budget](./budget.md)
- [Agreement activities](./activities.md)
- [Approvals and completions](../concepts/approvals-completions.md)
- [Approval templates](../programs/approval-templates.md)
