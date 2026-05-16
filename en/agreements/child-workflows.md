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

All agreement child records are scoped to the current agreement. Users need agreement read access to view child records and agreement update access to create, update, delete, select related values, or move records through workflow steps unless a shared approval action requires a more specific permission.

Most destructive actions are soft deletes. Deleted child records disappear from normal lists and selectors but remain available for historical integrity.

## Status and workflow pattern

The complex execution records use common status rules:

| Record | Draft/edit statuses | Locked statuses |
| --- | --- | --- |
| Commitment | `draft`, `inprogress` | `complete`, `pendingapproval`, `approved`, `denied` |
| Payment | `draft`, `inprogress` | `complete`, `pendingapproval`, `approved`, `denied`, `pay`, `wait`, `processed`, `paid` |
| Forecast lines | `draft`, `inprogress` | `complete`, `pendingapproval`, `approved`, `denied` |
| Claim submission | `draft` | `submitted`, `inreview`, `reviewed`, `withdrawn`, `cancelled` |
| Claim reconcile | `draft`, `inprogress`, `complete` while the claim is ready and no approved final reconcile exists | `pendingapproval`, `approved`, `denied` |
| Monitor | `draft`, `inprogress` | `complete`, `pendingapproval`, `approved`, `denied` |

Completion writes a `Common_Completion` record. When a valid stream-scoped approval template exists for the entity type, completion moves the execution record to `pendingapproval` and materializes or enables the approval routing slip. Without an approval template, completion leaves the record at `complete`.

Approval sections use the common routing-slip actions. Approving every current step moves the target to `approved`; any denial moves it to `denied`; otherwise it stays `pendingapproval`. Denied records may allow a new routing slip depending on workflow configuration.
