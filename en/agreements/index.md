# Funding Agreements

Funding Agreements are execution records owned by a transfer-payment stream. An agreement connects its stream configuration to proponents, addresses, budgets, activities, amendments, commitments, forecasts, payments, claims, monitoring, documents, reviews, approvals, workflows, and an exact Agreement Team.

## Access model

The Agreements list returns only active records the user can read through a global, agency, transfer-payment, or exact Agreement Team grant. Search matches agreement number; English or French title; agency, program, or stream name; and agreement-type name. An optional agency filter further narrows the list. Each row carries its own update, delete, Team level, and Team-management ceiling; edit and delete controls are disabled independently.

| Exact Team level | Agreement actions |
| --- | --- |
| `read_only` | Read this agreement and supported children. |
| `contributor` | Read and update this agreement; read, create, and update supported children. |
| `full_access` | Contributor actions plus soft deletion. |

Team access never grants creation of a new agreement. The **New agreement** button requires `agreement:create` in some static scope, and the server verifies the selected stream’s exact agency/program scope.

## Configuration prerequisites

Before creating an agreement, configure:

- an active agency, transfer-payment program, and stream;
- at least one agreement subtype mapped to that stream;
- at least one active stream holdback basis;
- an optional risk rating if a risk score will be selected; and
- at least one active proponent that the creator can read.

Later tabs require their corresponding stream fiscal years, cost categories, outcomes, monitor types, commitments, templates, review/workflow setups, and other reference data. A configured value may disappear from a lookup when it is deleted, belongs to another stream, or falls outside the requested create/update scope.

## Create an agreement

The create form starts **Further distribution** as false and **Holdback** at 10%. It contains three core sections plus any enabled extension slots.

| Field | Rule |
| --- | --- |
| Stream | Required active stream within create scope. |
| Agreement subtype | Required active subtype belonging to that exact stream. Agreement type is derived from the subtype and is not independently editable. |
| Agreement number | Required, trimmed, at most 15 characters, and unique among active agreements in the stream. |
| Financial system number | Required non-negative integer-like identifier; large database IDs are sent as strings. |
| Assistance dates | Both required; end cannot precede start. |
| Further distribution | Required yes/no value. |
| English and French title | Both required, each at most 255 characters. |
| English and French description | Both required. |
| Holdback | Required percentage from 0 through 100, stored to two decimal places. |
| Holdback basis | Required active basis configured for the stream. It is not limited to two hard-coded labels. |
| Risk score | Optional non-negative score; when supplied it must match an active rating on the stream. |
| Proponents | At least one unique active profile, and the creator must be able to read every selection. See [Agreement Proponents](./applicant-recipients.md). |

Changing the stream in the form clears subtype, holdback basis, and risk score because each is stream-owned. Creation locks extension scopes and the selected stream, rebuilds authorization, locks every selected proponent, validates all cross-stream references, inserts the agreement and recipient links atomically, and registers the agreement’s typed common entity.

## Agreement-number matching

The active database uniqueness rule blocks the same agreement number in one stream. In addition, agreement create and identity-changing updates compare the proposed system number with accessible external Funding History records in the same agency/program name scope. Near matches require a server confirmation fingerprint.

::: warning Current confirmation limitation
The core Agreement form does not currently render the similarity-review dialog or submit confirmation fingerprints. If a near external-history match triggers `FUNDING_HISTORY_SIMILARITY_CONFIRMATION_REQUIRED`, the save fails and the standard API error is shown; there is no supported confirmation action in this form. Verify whether the entry is a duplicate and correct the number where appropriate. This is recorded as a current application limitation, not as a successful save path.
:::

## Detail workspace

The detail route first resolves the agreement’s agency, program, and stream scope. Readers see General in display mode; updaters get the inline form. Child create, update, and delete controls are derived independently. The vertical workspace contains:

| Tab | Purpose |
| --- | --- |
| General | Classification, identifiers, bilingual profile, assistance dates, holdback, risk, and extension profile slots. |
| Addresses | [Agreement addresses](./addresses.md) |
| Proponents | [Agreement Proponents](./applicant-recipients.md) |
| Budget | [Agreement budget](./budget.md) |
| Commitments | [Commitments](./commitments.md) |
| Payments | [Payments](./payments.md) |
| Forecasts | [Forecasts](./forecasts.md) |
| Claims | [Claims and Reconciliation](./claims.md) |
| Claims | [Claims](./claims.md) |
| Monitors | [Monitoring](./monitors.md) |
| Documents | [Documents](./documents.md) |
| Activities | [Activities](./activities.md) |
| Amendments | Amendment creation, snapshots, approvals, cancellation, and application. |
| Team | Exact Agreement Team membership and management ceilings. |

Enabled extensions may append additional tabs and profile fields. Child detail routes replace the parent tab workspace while retaining agreement context.

## Update safeguards

Profile updates re-read and validate the localized partial payload, then lock extension scopes, involved streams, extension lifecycle state, and the agreement in a fixed transaction. Authorization and scope are rebuilt after locking. If ownership changes while locks are acquired, the server retries up to three times and then reports a scope conflict.

A stream move is restricted to another stream under the same transfer-payment program. It also requires update access to the target stream, a valid target subtype, holdback basis, and risk rating, and approval from every enabled extension stream-change guard. Stream-owned fields must be selected again. Existing typed child relationships and extension data may prevent the move.

Shortening or moving the assistance period is refused when an active agreement budget fiscal year would no longer overlap the proposed dates. Changing agreement number or stream reruns Funding History similarity checks. A successful update invokes the host agreement-profile-updated hook inside the transaction.

## Delete and recovery

Delete requires effective `agreement:delete`, asks for confirmation on the list, then locks and reauthorizes the agreement. Every enabled extension agreement-delete guard runs before the profile is soft-deleted. A guard or database dependency can refuse the operation; no partial deletion is committed.

Soft-deleted agreements disappear from active lists and relationship projections. The application has no agreement restore control. Correct dependent state or extension configuration before retrying a refused delete; after an accidental successful deletion, recovery requires database-level operational intervention rather than recreating child history manually.

![Agreement detail and child workflow](/screenshots/en/agreement-child-workflow.png)

_Example from the seeded development environment; a fresh installation does not contain these records._
