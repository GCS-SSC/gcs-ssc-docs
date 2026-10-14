# Agreement monitoring

Use **Monitors** to plan and record a site visit, file review or other monitoring exercise. Keep objectives, scheduled checks, findings, required follow-ups and useful practices together so another officer can see what was checked and what still needs action. Open **Agreements**, select an agreement, choose **Monitors**, then select the monitor type to open its workspace.

For example, for a site visit, add an objective to verify project delivery, an Item for the visit dates, a Finding for missing attendance records and a Follow-up asking the recipient to provide them by a due date.

## Before creating a monitor

The agreement must already point to a transfer-payment stream and agency. Administrators must configure the following reference data:

| Dependency | Enforced scope |
| --- | --- |
| Monitor type | A non-deleted type belonging to the agreement's current stream. |
| Tentative fiscal year | A non-deleted fiscal year belonging to the agreement's agency. |
| Monitor approval template | Optional published template used by the stream’s `fundingcasemonitor` approval-submission workflow. |
| Workflow setup | Optional approval submission at Completion; standard workflows require explicit selection. |

Viewer access lets you read Monitors. To create one, you need Contributor access and assignment to this Agreement; you become its primary assigned user. To work on it afterward, you need assignment to the monitor itself and Contributor or Manager access for the operation. The system checks the required access when loading form choices and again when saving.

## Create and manage the monitor header

The list shows type, fiscal year, tentative quarter, onsite indicator, status, and actions. Search matches either language of the monitor type, the fiscal-year label, quarter, and localized Yes/No value.

| Field | Rule |
| --- | --- |
| Type | Required. The server rejects a type outside the agreement stream even if a caller bypasses the picker. Names are stored bilingually on the stream reference record. |
| Tentative fiscal year | Required. The server rejects a fiscal year outside the agreement agency. Its display label is the same in both locale responses. |
| Tentative quarter | Required quarter number from 1 through 4. |
| Onsite | Required true/false value. |

A new monitor receives the Agency Draft business status. Opening it exposes Planning, Items, Findings, Follow-ups, Promising practices, and Workflow, followed by any enabled extension tabs targeting `monitor`. Header edits can change all four fields while the monitor is editable.

Ordinary header and child edits preserve the Agency business status. The status label is not a measure of how many planning or monitoring records have been entered.

## Record the monitoring work

Add or change monitoring records while the monitor is editable and you have the required permission and assignment. Its status, completion or an active protected workflow can prevent changes. The system checks access and confirms that each record belongs to this monitor when you save.

| Workspace | Required content and behaviour |
| --- | --- |
| Planning | One or more free-text objectives. There is no uniqueness or minimum-count rule. |
| Items | Name (maximum 255 characters), detail, planned start/end, monitored flag, and optional actual start/end. Planned end cannot precede planned start. When **Monitored** is true, both actual dates are required; when both exist, actual end cannot precede actual start. |
| Findings | Name (maximum 255 characters), action type, responsible party, and detail. Action types are `amendment`, `mandatoryaction`, `suggestedaction`, and `none`. |
| Follow-ups | Name (maximum 255 characters), responsible party, and due date. Creation always stores status `open`; the status is not directly editable on the follow-up form. |
| Follow-up updates | Update text, status, and update date. Status is `open`, `onhold`, `completed`, `cancelled`, or `unabletocomplete`. The Updates viewer supports add, edit, and delete when authorized. |
| Promising practices | One or more free-text practice records. |

Responsible-party values used by findings and follow-ups are `applicantrecipient`, `organization`, and `joint`. The interface localizes enum labels; free-text monitor content is stored as entered rather than as paired English/French fields.

### Follow-up status and history

The follow-up status comes from the most recently added update that has not been deleted. It uses the highest database ID, not the date you entered. Editing or deleting an update recalculates that status; deleting every update returns it to `open`. Editing the Follow-up form itself does not change the status.

For example, you add a `completed` update today but date it last week. It still becomes the follow-up’s current status. If you delete it, the previous remaining update determines the status again.

## Complete a monitor

Use the Workflow/Completion controls while the monitor is editable. Completion requires Contributor access, the exact monitor assignment, no prior completion, no active workflow, and at least one non-deleted monitor item. It does not require planning objectives, every item to be marked monitored, actual dates on unmonitored items, findings, resolved follow-ups, or promising practices.

Completion records who completed the monitor and any comments. It starts the configured approval-submission workflow, or records `no_workflow` when none is configured. If the required selected workflow cannot start, completion is not saved. Ordinary edits to the monitor and its related records stop after completion. Completion does not automatically give it a business status named `complete`.

For example, an unmonitored item with valid planned dates can satisfy the presence requirement, but completing that monitor is not evidence that the visit occurred. Apply your program's review requirements before the irreversible Completion action. Outstanding follow-ups can still block Agreement Closeout even though monitor Completion did not require their resolution.

## Approval and workflow boundary

If your program requires monitor approval, ask your administrator to configure a published `fundingcasemonitor` approval-submission workflow with its review, recommendation or approval steps. Completion starts it and shows those steps in the shared Workflow section. Having an approval template without that workflow does not require approval.

Start a standard workflow separately when the monitor’s state permits it; Completion does not start one automatically. Workflow outcomes change the business status according to the published setup. If work is blocked by an unavailable assigned owner, or fails or is cancelled, use the permitted replacement, retry or cancellation controls. See [Workflows](../concepts/workflows.md) and [Approvals and completions](../concepts/approvals-completions.md).

## Delete and recover safely

Deleting a record hides it from normal use rather than physically removing it (`_deleted`). Deleting a follow-up also deletes its updates. Deleting an editable monitor removes its objectives, items, findings, promising practices, follow-ups and updates together. Check that you intend to remove the whole exercise before deleting the monitor.

Deletion is unavailable when business status, completion evidence, or protected workflow, review or approval work locks the monitor. Confirm the exact monitor before deleting; there is no restore action in the core interface. If a request fails, no success toast is shown and the modal remains available for correction. Refresh after an uncertain network result before retrying, because the server may already have committed the write.

## API contract summary

This section is for integrations and support. Officers normally use the workspace tabs described above.

| Route group | Contract |
| --- | --- |
| `GET /api/agreements/{id}/monitors-overview` | Authorized list with bilingual type names and fiscal-year display. |
| `POST /api/agreements/{id}/monitors` | Validated, freshly authorized `draft` creation. |
| `GET/PATCH/DELETE /api/agreements/{id}/monitors/{monitorId}` | Read the monitor and its related records, edit an unlocked header, or delete the monitor and its related records together. |
| `GET /api/agreements/{id}/monitors/lookups/*` | Paginated, searchable stream monitor types or agency fiscal years; authorization follows `permission_action`. |
| `/monitor-planning`, `/monitor-items`, `/monitor-findings`, `/monitor-followups`, `/monitor-followup-updates`, `/monitor-promising-practices` | Each exposes POST plus child-ID PATCH and DELETE; there are no separate child GET routes because the monitor detail response supplies all rows. |

Validation errors use the request locale and the standard `VALIDATION_FAILED` response. A missing or cross-agreement monitor/child is rejected; authorization is not inferred from an identifier supplied in the request body.

## Follow-ups requiring a receivable

A follow-up can be marked **Requires receivable** only when its Agency monitor type is eligible for receivables. This flag is separate from the follow-up’s responsible party and status. A receivable type that requires monitoring can select eligible follow-ups from the same agreement; its saved link becomes financial evidence.

A required-receivable follow-up cannot become `completed` until a non-deleted **posted original receivable** links to it. A draft, rejected receivable or linked adjustment alone does not satisfy this condition. Creating or editing an update, removing an update that changes the derived status, or changing the requirement rechecks this guard. `AR_MONITOR_RECEIVABLE_REQUIRED` rolls back the change; post the correct linked receivable through its approval route before retrying completion.

For example, record a recovery finding and a required-receivable follow-up. Create the receivable with that follow-up, complete its independent approval and confirm posting. Only then record the completed follow-up update. This completes monitoring evidence; it does not by itself prove that the outstanding debt was collected.

Changing a monitor to an ineligible type is refused while required-receivable follow-ups or retained receivable links depend on it. Deleting or moving financially referenced monitoring evidence can also be refused. Preserve the historical link and use authorized recovery rather than deleting it to bypass a closeout blocker. See [Receivables](./receivables.md).
