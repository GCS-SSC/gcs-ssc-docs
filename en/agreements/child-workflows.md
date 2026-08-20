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

Completion writes a `Common_Completion` record. Core completion for commitments, payments, forecasts, monitors, and claim reconciliations writes `complete` directly and can start a published completion workflow. It does not inspect a standalone approval template or materialize its routing slip; those generic approval runtimes require an explicit API/integration caller, while a completion workflow can independently reach a configured source-approval stage. Consult the entity guide for its exact boundary.

Approval sections use the common routing-slip actions. Approving every current step moves the target to `approved`; any denial moves it to `denied`; otherwise it stays `pendingapproval`. Denied records may allow a new routing slip depending on workflow configuration.
