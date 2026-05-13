# Agreement Monitors

Monitors record planned monitoring work, monitored items, findings, follow-ups, follow-up updates, promising practices, and workflow completion. Monitors have a tab summary and a detail page.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Transfer payment monitor types | The monitor type lookup is scoped to the agreement stream. |
| Agency fiscal years | Tentative fiscal year lookup is scoped to the agreement agency. |
| Approval template for `fundingcasemonitor` | Required when monitor completion needs approval routing. |
| Agreement update permission | Required for monitor metadata, sub-record edits, completion, and approval management. |

## Tab flow

The Monitors tab shows monitor type, tentative fiscal year, quarter, onsite flag, status, and actions.

Creating a monitor captures:

| Field | Rule |
| --- | --- |
| Type | Required monitor type from the agreement stream. |
| Tentative fiscal year | Required agency fiscal year. |
| Tentative quarter | Required integer 1 to 4. |
| Onsite | Required boolean. |

New monitors start as `draft`.

## Detail page

The monitor detail workspace has these tabs:

| Tab | Records |
| --- | --- |
| Planning | Monitor metadata and planning objectives. |
| Items | Monitoring checklist or work items. |
| Findings | Findings with recommendation/action type and responsible party. |
| Follow-ups | Follow-up actions and update history. |
| Promising practices | Positive practices captured during monitoring. |
| Workflow | Completion and approval. |
| Extension tabs | Optional monitor tabs supplied by extensions. |

## Sub-records

| Record | Required fields | Notes |
| --- | --- | --- |
| Planning objective | Monitor, objective | Captures what the monitoring activity is intended to assess. |
| Monitor item | Monitor id, item name, planned start/end, detail, monitored flag | If monitored is true, actual start and actual end are required. Planned and actual date ranges must be valid. |
| Finding | Monitor id, finding name, recommendation type, responsible party, detail | Recommendation type uses `amendment`, `mandatoryaction`, `suggestedaction`, or `none`. Responsible party uses applicant/recipient, organization, or joint. |
| Follow-up | Monitor id, follow-up name, responsible party, due date | New follow-ups carry a follow-up status managed by updates. |
| Follow-up update | Follow-up id, update text, status, update date | Creating/updating/deleting updates synchronizes the parent follow-up to the latest update status, or `open` when no updates remain. |
| Promising practice | Monitor id, practice text | Free-text record. |

## Business rules

| Rule | Behaviour |
| --- | --- |
| Type must belong to stream | Invalid monitor types are rejected. |
| Tentative fiscal year must belong to agency | Invalid agency fiscal years are rejected. |
| Locked statuses block edits | `complete`, `pendingapproval`, `approved`, and `denied` monitors are read-only. |
| Editing moves status forward | Sub-record edits sync the monitor to `inprogress` unless already in approval statuses. |
| Completion requires monitor content | Completion requires at least one monitor item. |
| Follow-up status is derived from updates | Latest non-deleted follow-up update controls the follow-up status. |

## Completion and approval

Completion entity type: `fundingcasemonitor`.

Completion creates a common completion record. With a valid `fundingcasemonitor` stream approval template, the monitor moves to `pendingapproval`; without one, it moves to `complete`. The approval section appears on the Workflow tab for monitors in `pendingapproval`, `approved`, or `denied`.
