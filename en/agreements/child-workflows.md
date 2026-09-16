# Agreement Child Workflows

Agreement child workflows are reached from the agreement detail tabs. Some are inline CRUD tables; others have their own detail pages with sub-records, workflow status, completion, and approval routing.

## Workflow pages

| Workflow | Documentation |
| --- | --- |
| Budget fiscal years and budget line items | [Budget](./budget.md) |
| Agreement addresses | [Addresses](./addresses.md) |
| Proponent/applicant-recipient links | [Proponents and applicant-recipients](./applicant-recipients.md) |
| Agreement activities, outcomes, and responsible parties | [Activities](./activities.md) |
| Commitments and commitment lines | [Commitments](./commitments.md) |
| Payments and payment lines | [Payments](./payments.md) |
| Forecasts, versions, and monthly forecast lines | [Forecasts](./forecasts.md) |
| Claims, claim lines, reconciliations, and reconciliation approvals | [Claims](./claims.md) |
| Monitors, findings, follow-ups, updates, and promising practices | [Monitors](./monitors.md) |
| Generated agreement documents | [Documents](./documents.md) |

## Shared behaviour

All child records resolve the current Agreement scope. Viewer reads. Ordinary children require Contributor plus the exact Agreement assignment for create/update and Manager plus that assignment for soft deletion. Independently assigned claims, reconciliations, payments, forecasts, monitors, amendments, commitments, reviews, and recommendations use the parent assignment for creation, create a creator-primary child roster, and require that child's assignment for later mutations. Related-value lookups use the ceiling of the form that opened them. Reviewer/approver assignment determines who may perform an assigned workflow action but never replaces ordinary owner reading.

Most destructive actions are soft deletes. Deleted child records disappear from normal lists and selectors but remain available for historical integrity.

## Business status, completion, and workflow

Agreement children use the Agency’s configurable business statuses. Ordinary saves preserve status. Read-only and terminal flags, completion evidence, active workflow locks, and the parent Agreement’s protection determine whether work can be edited. Labels such as “Approved” do not independently establish approval evidence.

Complete validates the record and starts its published approval-submission workflow when configured. Amendments and Closeouts require that workflow; the other supported children can complete without one. Positive completion effects—such as activating a replacement Forecast or Commitment—wait for successful workflow termination when a run exists. A saved completion alone does not prove that approval succeeded.

The **Workflows** tab starts a selected standard workflow explicitly. At most one workflow is active on an exact target across all purposes. Completion, root approval submission, standard workflow, and direct review are distinct actions; use the entity guide and [Approvals and completions](../concepts/approvals-completions.md) for their prerequisites.

Supporting files belong to the exact child’s [Attachments](../concepts/attachments.md) tab. [Amendments](./amendments.md) and [Closeouts](./closeouts.md) have their own completion, snapshot, and aggregate-lock rules.
