# Agreement amendments

Use the agreement's **Amendments** tab to propose changes to funding, project dates or activities and send them for approval. Prepare the changes in a separate draft. The current agreement stays unchanged until approval succeeds. The amendment keeps the reason for the change, proposed details, approval history and resulting Agreement revision.

For example, a recipient needs three more months to finish delivery. Create a duration amendment, explain the reason, enter the proposed dates and check whether the budget also needs to change before submitting.

## Setup and access

Before you begin, your administrator must configure active amendment types for the Agreement's stream. Each type permits changes to the budget, duration, or activities and may require a subtype. Submission also needs a published amendment approval workflow with at least one approval stage and a configured successful outcome. If the needed type or approval setup is unavailable, ask your administrator to configure it.

Viewer access lets you read amendments. Contributor access lets you create and edit them. Deletion requires Manager access. You must be assigned to this Agreement to create an amendment, and assigned to the amendment itself to work on it afterward. Its creator becomes the primary assigned user. The system checks your access again whenever you save and verifies that the amendment belongs to the Agreement you opened.

Only one open amendment may exist for an agreement. A denied approval does not necessarily close the amendment. Resolve or cancel that open work before creating another.

## List and create

The list shows the newest amendment numbers first. Search finds an exact amendment number or text in the English or French name across all pages. It does not search status or type names. Type badges and snapshot indicators show what each amendment includes.

Creation requires:

- at least one of the English or French names;
- at least one unique active amendment type from the agreement's current stream; and
- for every selected type marked as requiring a subtype, at least one active selected subtype linked to that same type and stream.

Subtypes outside the selected types, inactive records, duplicates, and records from another stream are rejected. A duration type initializes the proposed dates from the agreement's current authorized-assistance dates. The new amendment starts in the Agency's Draft status with the next amendment number. This identifier is distinct from the Agreement revision written after approval.

## Detail workspace and scope

Use **General** for the proposal's name and scope, **Budget** and **Activities** for draft changes, and **Recommendation** to complete and submit it. The workspace also has **Workflows**, **Attachments** and **Assigned users**. **Documents** requires parent Agreement read access; Risk Rating appears when configured or when earlier risk work exists. You can edit General only in the Agency's Draft status, before completion and while the Agreement and amendment remain unlocked. Finished records retain their type and subtype badges and assigned-user history.

In General, you can change the bilingual name, types, and subtypes. When you select a duration type, you can also change both proposed authorized-assistance dates. At least one language and one type remain required. Both duration dates are required together and end must be on or after start.

Before removing amendment types, check which draft copies you still need. Removing all budget and duration types discards the draft budget. Removing the last activities type discards the draft activities. Before saving, a confirmation names the affected areas. Confirming permanently removes the draft budget years, lines and funding sources, or draft activities, outcomes and responsible-party links, together with the type change. Current Agreement data stays intact. Cancelling saves nothing. Adding the type again requires a new copy of current data; the discarded draft edits cannot be restored. Removing budget while keeping duration keeps the budget copy, whose active fiscal years must still overlap the proposed dates.

Removing the final duration type clears its proposed dates, even when a budget type retains the budget snapshot. For example, an amendment contains budget and activities types with both snapshots. Remove activities and confirm the named area: its proposed activities are discarded, but its budget edits remain. Add activities again only if you intend to recopy the current activities and redo those draft changes.

## Budget snapshot

Creating either snapshot requires Contributor access, assignment to this amendment, an editable Agency Draft status, and no recorded completion or existing snapshot for that area. The application checks these conditions again when you choose to copy. If it reports a missing prerequisite, refresh the page and confirm your amendment assignment, status, and selected types before trying again.

Select a budget or duration type, then copy the current budget into the draft once. This snapshot is a separate working copy of all active fiscal years and lines. You can prepare changes without altering the current budget, and existing claim links remain traceable.

Choose the types that match the changes you need:

| Selected type | Permitted snapshot changes |
| --- | --- |
| budget | Create, edit, and delete budget lines while retaining their history. |
| duration | Create, change, and delete fiscal-year groups within the proposed dates. Deleting a year also removes its copied lines from use while retaining their history. |
| both | Both sets of controls. |

When you create or update a fiscal year, it must belong to an active stream budget and overlap the proposed amendment dates. A fiscal year used by an active claim, payment, or claim line cannot be deleted. A budget line used by an active claim line cannot be moved or deleted. These protections also cover claims and payments linked to earlier approved versions of the same fiscal year or budget line. Line fields and monetary validation otherwise match [Agreement budget](./budget.md).

Before applying an approved budget, the system checks counted claims and successful reconciliations against the proposed annual **program funding** in the Agreement currency. Applied claim reductions reduce this usage. Posted cash collections and posted offsets on an original claim-related receivable can also lower the minimum budget, using its retained claim and original fiscal year. Pending receipts and posting the debt alone do not count. Collections already covered by an applied reduction are not counted twice. Credit cannot reduce a claim's usage below zero or cover another claim's usage.

For example, a counted claim and its successful reconciliation are both 30,000. A posted original claim-related receivable has collected 4,000. The proposed annual program funding can fall to 26,000 even before the full reduction plan applies; 25,999.99 fails. This extra collection credit is for budget reductions only. New claims and reconciliations gain capacity from applied reductions, not from a partial receipt alone.

Forecasts and commitments no longer block the budget reduction just because they exceed the proposed funding. After approval applies the budget, payments stay on hold until the active forecast and combined active commitments fit, or sufficient funding is restored. Total cost and other-funding types have line-level rules rather than separate annual ceilings. See [Payments](./payments.md).

Keep every fiscal year that has forecast history in the proposed budget, even when that forecast was deleted. Such a year cannot be reassigned or removed. Correct the snapshot before approval if its year identities no longer match.

::: warning Stream capacity still requires manual reconciliation
Check the Stream's available program funding yourself before approval, including allocations to other Agreements and the overcommit threshold. Saving or applying an amendment does not run the cross-Agreement capacity check used for direct changes to the current budget. The annual usage check above protects this Agreement's existing usage; it does not prove that the Stream can fund the proposal.
:::

The copy keeps each budget line's selected proponent. The stream's active [financial limits](./budget.md#stream-financial-limits) apply to the whole draft version when you save changes, submit for approval, and apply approval. If a limit changes during approval, application can fail even though submission succeeded. Check the current configuration and approval history before retrying. These limits do not replace the manual stream-capacity review above.

If a copy action warns that the budget or activities are not enabled, open General and select the matching amendment type. Budget copies require a budget or duration type; activity copies require an activities type. Save the scope, then retry the copy.

## Activity snapshot

Select an activities type, then copy the current activities once, including their outcomes and responsible parties. The amendment's Activities tab then supports the same required bilingual fields, date range, active program outcomes, and available responsible proponents described in [Agreement activities](./activities.md), but all changes remain inside the amendment snapshot. When changing one date, check it against the other saved date. The end must remain on or after the start.

Copy the activities before adding or changing them in the amendment. Creating and editing requires Contributor access and assignment to this amendment; deleting requires Manager access and the same assignment. Deleting a copied activity also removes its outcome and responsible-party selections from the draft, without changing current Agreement activities.

## Risk proposal and readiness

Risk changes are available for every amendment, independently of budget, activity and duration types. Creation copies the current Agreement score as a proposal; **Change risk** defaults off when no workflow manages it. Turn it on and select an active Stream rating to apply a manual change. Zero is a valid score; clearing the proposal does not clear the Agreement's risk. Turning the switch off retains the proposal but suppresses application.

When a published risk workflow is linked for amendments, or an exact amendment risk run remains active, the switch is enabled and read-only and manual score editing is unavailable. Run the selected **Risk Rating** workflow: every stage, including approvals, must succeed before its designated assessment updates the amendment proposal. The parent's score remains unchanged until successful amendment approval.

If the selected published setup requires risk completion, **Complete** is blocked until a successful run for this exact amendment and setup exists. An earlier publication version of that same setup qualifies; the Agreement's existing score, another amendment's run, a standalone review or a failed/active run does not. An optional workflow may be skipped, but a copied score is not treated as its result and will not be applied. Manual enabled changes require a valid selected rating.

For example, an Agreement currently rated 2 needs a duration extension and a proposed rating of 0. Run the required amendment risk workflow and finish all of its stages; the proposal becomes 0 while the Agreement stays at 2. Complete and approve the amendment. Successful approval applies its dates and captured score 0 together; denial or cancellation leaves both current values unchanged.

Completion saves the risk decision, rating labels, calculation evidence, and readiness result in the approval record. Reviewers and any approval retry use that saved evidence even if configuration later changes. Older approval records keep their original integrity checks and do not gain a risk section. If completion reports `RISK_WORKFLOW_REQUIRED` or `RISK_SCORE_REQUIRED`, finish the required workflow for this amendment or correct its draft rating, then try again. A rejected submission leaves neither a completion nor a new approval record.

## Approve and apply the amendment

Use the **Recommendation** tab to review the prepared amendment and complete it once. Completion requires a published amendment approval workflow. It saves the completion and submission time, starts approval, and preserves a fixed copy of the proposal for reviewers. If the required workflow is missing, none of these steps is saved. The approval record contains the amendment's English and French names, types and subtypes, and only the proposed budget, activities or dates being changed. It does not duplicate unchanged Agreement or Proponent profile information.

For example, a duration-only amendment can propose a new assistance end date without replacing current activities. Check that the Agreement's budget years overlap the proposed dates, then complete the amendment. Include the budget amendment type and a budget snapshot if the approved change must also replace the budget. The current Agreement dates remain unchanged during approval and change only when approval succeeds. Standard workflows on the separate **Workflows** tab do not submit this approval record.

Reviewers use the published instructions saved when the approval work started, with member or final approval as configured. The approval record appears in grouped, collapsible sections. Names and labels are saved at submission, so a later rename does not change what reviewers saw.

While approval is active, you cannot make conflicting changes to the Agreement, amendment or draft copies, or delete them. You can cancel the active workflow and its child work from **Workflows** without changing the submitted proposal. Another active approval on the agreement can block amendment cancellation. Resolve that approval before retrying. Failure or denial applies the configured failure status and leaves the current Agreement unchanged. Success verifies the saved proposal, applies only its included changes and proposed dates, closes the amendment, keeps its number and creates the linked agreement revision. Applying the changes and creating that revision happen together, and the configured success status is applied.

An assigned approver can read the submitted proposal needed for the decision. Editing the amendment or recommendation still requires assignment to the relevant record and Contributor access; approval assignment does not grant general Agreement access.

## Generate an amendment document

Use **Documents** to generate a file from an available amendment template while the amendment is an editable draft. You need access to the parent agreement as well as permission and assignment for the amendment. Generation checks the current agreement, proposal, and template again before saving the file. If any of them changes during generation, refresh, review the updated information, and generate again. If the service is busy, wait and retry. Check the document list after an uncertain network result before repeating the request.

## Cancel, delete, and recover

**Cancel** closes an open amendment. If it has an active approval-submission workflow, the action cancels that run and its active children. Otherwise, it uses the published approval-submission setup and applies its configured cancellation status. Without an active run or an applicable status change, cancellation is rejected; there is no hard-coded cancellation status. Cancellation preserves the record and snapshots and permits a replacement once no open amendment remains.

To delete an amendment, you need Manager access and assignment to that amendment. Deletion is available only in the Agency's Draft status when completion and Agreement protections allow it. It removes the amendment and its copied budget, activities, selection links and type and subtype links from normal use together. The outcome label alone does not determine whether deletion is allowed.

There is no restore control. For an accidental cancellation or deletion, preserve the audit trail and have an authorized administrator assess recovery instead of recreating history under the same identity.

## Related guides

- [Funding agreements](./index.md)
- [Agreement budget](./budget.md)
- [Agreement activities](./activities.md)
- [Approvals and completions](../concepts/approvals-completions.md)
- [Approval templates](../programs/approval-templates.md)
