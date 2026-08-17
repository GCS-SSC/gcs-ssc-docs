# Agreement amendments

Use the agreement's **Amendments** tab to prepare a controlled change without editing the current budget or activities in place. An amendment records its bilingual purpose, configured amendment types/subtypes, optional proposed duration, isolated snapshots, approval history, and version lineage.

## Setup and access

The agreement's stream must have active amendment types. Each type declares the part it amends—such as `budget`, `duration`, or `activities`—and whether at least one associated subtype is required. To submit an amendment for approval through the runtime API, the stream must also have an active, valid approval template for `fundingcaseamendment`.

Agreement `read`, `create`, `update`, and `delete` permissions govern the corresponding amendment actions. Exact Agreement Team access can provide them. Every write re-resolves and locks the agreement scope in the fresh-authorized transaction; an amendment ID must belong to the agreement in the URL.

Only one active `draft` or `pendingapproval` amendment may exist for an agreement. Approved, denied, cancelled, and soft-deleted amendments do not prevent a replacement draft.

## List and create

The list is server-paginated and ordered by amendment number, then ID, newest first. The interface applies its search locally to the loaded page across number, English/French name, status, and type names. It shows type badges and whether budget/activity snapshots exist.

Creation requires:

- at least one of the English or French names;
- at least one unique active amendment type from the agreement's current stream; and
- for every selected type marked as requiring a subtype, at least one active selected subtype linked to that same type and stream.

Subtypes outside the selected types, inactive records, duplicates, and records from another stream are rejected. A duration type initializes the proposed dates from the agreement's current authorized-assistance dates. The new amendment starts in `draft` without a number.

## Detail workspace and scope

The detail page has **General**, **Budget**, **Activities**, and **Recommendation** tabs. General is editable only in `draft`; terminal records retain their type/subtype badges as history.

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

Activity snapshot routes require the draft snapshot to exist. Create, update, and delete use their matching Agreement permission. Deletion soft-deletes the copied activity and both selection-link families.

## Approval, promotion, and revision

The approval runtime supports this sequence:

1. materialize the stream's published amendment approval template while the amendment is `draft`;
2. set the amendment and routing slip to `pendingapproval`;
3. process the current assigned step, certifications, reassignment, and any allowed additional approvals through the generalized approval runtime;
4. on denial, set both records to `denied`;
5. on final approval, atomically promote the amendment.

Promotion verifies any proposed duration against the selected snapshot (or current budget when there is no snapshot). It applies proposed dates, assigns the next amendment number, promotes snapshot content into new current working budget/activity versions, preserves the amendment and source-version lineage, and sets the amendment to `approved`. If promotion validation fails, the final approval decision rolls back.

The current promotion path does **not** insert a `Funding_Case_Agreement_Revision` record. Do not use that table as evidence that an approved amendment has a persisted revision checkpoint; use the amendment, routing slip, and budget/activity version lineage that the runtime actually writes.

::: warning Core amendment UI is incomplete
The current **Recommendation** tab renders explanatory text only. It does not render a recommendation form, approval section, or action that materializes the amendment approval chain. The server-side generalized approval runtime supports `fundingcaseamendment`, but the core amendment page cannot submit the draft or display/act on its steps. A draft can therefore be prepared and cancelled in the core UI but cannot be approved there. Do not claim approval is complete based on the placeholder tab; use only an authorized supported integration until the UI is implemented.
:::

## Cancel, delete, and recover

**Cancel** is available for `draft` and `pendingapproval`. It sets the amendment and any draft/pending routing slip to `cancelled`; it does not delete the record or snapshots. Cancellation is terminal and permits a new draft.

Deletion requires Agreement delete access and is permitted only in `draft`. It transactionally soft-deletes copied budget lines/years, activities and their selection links, both snapshot versions, type/subtype links, and the amendment. Approved, denied, cancelled, and pending-approval amendments cannot be deleted through this route.

There is no restore control. For an accidental cancellation or deletion, preserve the audit trail and have an authorized administrator assess recovery instead of recreating history under the same identity.

## Related guides

- [Funding agreements](./index.md)
- [Agreement budget](./budget.md)
- [Agreement activities](./activities.md)
- [Approvals and completions](../concepts/approvals-completions.md)
- [Approval templates](../programs/approval-templates.md)
