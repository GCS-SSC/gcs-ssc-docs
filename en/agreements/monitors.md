# Agreement monitoring

Agreement monitors organize a monitoring exercise: its schedule, objectives, work items, findings, follow-ups, progress updates, promising practices, completion record, and any configured workflow. Open **Agreements**, select an agreement, and choose **Monitors**. Select the monitor type to open its workspace.

## Before creating a monitor

The agreement must already point to a transfer-payment stream and agency. Administrators must configure the following reference data:

| Dependency | Enforced scope |
| --- | --- |
| Monitor type | A non-deleted type belonging to the agreement's current stream. |
| Tentative fiscal year | A non-deleted fiscal year belonging to the agreement's agency. |
| Monitor approval template | Optional published template used by the stream’s `fundingcasemonitor` approval-submission workflow. |
| Workflow setup | Optional approval submission at Completion; standard workflows require explicit selection. |

Agreement Viewer reads Monitors. Creating a monitor requires Contributor plus the exact Agreement assignment and makes the creator primary. Later monitor mutations require Contributor or Manager plus the exact monitor assignment. Lookup requests repeat the ceiling required by the form, and writes recheck scope/assignment on the server.

## Create and manage the monitor header

The list shows type, fiscal year, tentative quarter, onsite indicator, status, and actions. Search matches either language of the monitor type, the fiscal-year label, quarter, and localized Yes/No value.

| Field | Rule |
| --- | --- |
| Type | Required. The server rejects a type outside the agreement stream even if a caller bypasses the picker. Names are stored bilingually on the stream reference record. |
| Tentative fiscal year | Required. The server rejects a fiscal year outside the agreement agency. Its display label is the same in both locale responses. |
| Tentative quarter | Required small integer from 1 through 4; both validation and PostgreSQL enforce the range. |
| Onsite | Required true/false value. |

A new monitor receives the Agency Draft business status. Opening it exposes Planning, Items, Findings, Follow-ups, Promising practices, and Workflow, followed by any enabled extension tabs targeting `monitor`. Header edits can change all four fields while the monitor is editable.

Ordinary header and child edits preserve the Agency business status. The status label is not a measure of how many planning or monitoring records have been entered.

## Record the monitoring work

All child creates, updates, and deletes use the permission matching the operation, refresh authorization inside a transaction, lock the monitor aggregate, and reject ordinary mutations when business-status, completion, or workflow protections lock the monitor. The parent/child relationship is rechecked before mutation.

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

After an update is created, changed, or soft-deleted, the parent follow-up takes the status of the non-deleted update with the highest database ID. If none remains, it returns to `open`. This is insertion order, not the user-entered update date: backdating a newer record still makes its status authoritative. Editing a follow-up itself does not change that derived status.

## Complete a monitor

Use the Workflow/Completion controls while the monitor is editable. Completion requires Contributor access, the exact monitor assignment, no prior completion, no active workflow, and at least one non-deleted monitor item. It does not require planning objectives, every item to be marked monitored, actual dates on unmonitored items, findings, resolved follow-ups, or promising practices.

The transaction rechecks those conditions, records the completing Common User and optional comments, and starts the selected approval-submission workflow if configured; otherwise it records `no_workflow`. A failure to start a required selected workflow rolls back Completion. The hook is emitted after commit. Completion freezes ordinary monitor and child edits without assigning a fixed `complete` business status.

For example, an unmonitored item with valid planned dates can satisfy the presence requirement, but completing that monitor is not evidence that the visit occurred. Apply your program's review requirements before the irreversible Completion action. Outstanding follow-ups can still block Agreement Closeout even though monitor Completion did not require their resolution.

## Approval and workflow boundary

To require approval, configure a published `fundingcasemonitor` approval-submission workflow with its review, recommendation, or approval members. Completion starts that workflow and its materialized approval steps appear in the shared Workflow section. A template alone is insufficient.

Standard workflows are explicitly chosen and may run when the target's state permits; Completion never starts one automatically. Business status changes follow the published transitions. Use owner-blocker recovery or the allowed retry/cancellation controls for the attempt. See [Workflows](../concepts/workflows.md) and [Approvals and completions](../concepts/approvals-completions.md).

## Delete and recover safely

Deleting a child record sets its `_deleted` flag. Deleting a follow-up also soft-deletes its updates. Deleting an editable monitor atomically soft-deletes the monitor, planning objectives, items, findings, promising practices, follow-ups, and follow-up updates. Database foreign keys use restricted physical deletion; the supported routes use logical deletion instead.

Deletion is unavailable when business status, completion evidence, or protected runtime work locks the monitor. Confirm the exact monitor before deleting; there is no restore action in the core interface. If a request fails, no success toast is shown and the modal remains available for correction. Refresh after an uncertain network result before retrying, because the server may already have committed the write.

## API contract summary

| Route group | Contract |
| --- | --- |
| `GET /api/agreements/{id}/monitors-overview` | Authorized list with bilingual type names and fiscal-year display. |
| `POST /api/agreements/{id}/monitors` | Validated, freshly authorized `draft` creation. |
| `GET/PATCH/DELETE /api/agreements/{id}/monitors/{monitorId}` | Full aggregate read, editable header patch, or transactional soft-delete cascade. |
| `GET /api/agreements/{id}/monitors/lookups/*` | Paginated, searchable stream monitor types or agency fiscal years; authorization follows `permission_action`. |
| `/monitor-planning`, `/monitor-items`, `/monitor-findings`, `/monitor-followups`, `/monitor-followup-updates`, `/monitor-promising-practices` | Each exposes POST plus child-ID PATCH and DELETE; there are no separate child GET routes because the aggregate detail response supplies all rows. |

Validation errors use the request locale and the standard `VALIDATION_FAILED` response. A missing or cross-agreement monitor/child is rejected; authorization is not inferred from an identifier supplied in the request body.
