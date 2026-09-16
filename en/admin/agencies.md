# Agencies

Agencies are the administrative root for programs and most business reference data. Agency scope is also an authorization boundary: seeing an agency identifier in another record does not grant access to it.

## Access and permissions

The server enforces every operation. Navigation visibility and client-side controls are conveniences, not authorization.

| Operation | Required scope |
| --- | --- |
| List or read agencies and agency-owned reference data | An applicable `agency:read` grant |
| Create an agency | Global `agency:create` |
| Edit or delete an agency | `agency:update` or `agency:delete` for that exact agency |
| Create, edit, or delete agency-owned reference data | The corresponding permission for that exact agency |
| Create a program from the Programs tab | `transfer_payment:create` for that exact agency |

Missing and inaccessible child records normally produce the same not-found response. This prevents an identifier from revealing data across agency boundaries.

## List and agency profile

The Agencies page provides literal-text search, status filtering, pagination, column controls, row selection, and create, edit, and delete actions. `%` and `_` are searched as ordinary characters, not SQL wildcards. The summary reports all and active agencies within the caller's scope.

The agency form contains:

| Field | Rule |
| --- | --- |
| GWCOA organization | Required server-backed lookup; creation requires global create access and editing requires access to the exact agency |
| Financial-system ID | Required positive PostgreSQL bigint identifier; preserve it as a decimal string |
| English and French names | Required, trimmed, maximum 255 Unicode characters each |
| English and French abbreviations | Required, trimmed, maximum 255 Unicode characters each |
| Active | Boolean availability flag; initially inactive |

The General tab displays those values. Agency profile edits replace only submitted fields. The active profile tuple of financial-system ID, both names, and active flag must be unique.

## Detail navigation

The detail page has twelve linkable tabs:

1. General
2. Statuses
3. Programs
4. Cost Categories
5. Fiscal Years
6. Holdback Bases
7. Address Types
8. Attachment Types
9. Applicant/Recipient Subtypes
10. Approval Behalf
11. Agreement Types
12. Extensions

Each reference-data tab supports literal search, status filtering, pagination, and agency-wide summary counts. Search and status filters change the displayed rows and paginated total, while the summary remains an agency-wide total.

## Programs

Programs lists transfer-payment profiles owned by the agency. Authorized users can create a profile directly or start the program wizard; the current agency is fixed as the owner. A locked active-state check prevents a concurrent agency deletion from accepting a new program.

Programs contain streams. Configure the agency's fiscal years, cost categories, and other required lookups before opening a program for operational use.

## Agency reference data

| Tab | Stored values and constraints | Supported actions | Principal use |
| --- | --- | --- | --- |
| Cost Categories | Required English and French names, each unique among active categories in the agency | List, create, edit, soft-delete | Financial grouping for program, agreement, claim, payment, and allocation records |
| Cost-category line items | Required English and French names, each unique among active items in its category | List, create, edit, soft-delete | Detailed budget and expenditure classification |
| Fiscal Years | Display label (maximum 9 characters), year from 1900 through 2100, start date, and end date not before start | List, create, edit, soft-delete | Budgets, forecasts, commitments, payments, claims, and monitoring periods |
| Holdback Bases | Required code plus English and French names; active code is unique in the agency | List, create, edit, soft-delete | Agreement holdback configuration |
| Address Types | Required English and French names, each unique among active values in the agency | List, create, edit, soft-delete | Classification of proponent and agreement addresses |
| Applicant/Recipient Subtypes | Applicant/recipient type plus required bilingual name and description; names are unique for the active agency/type combination | List, create, edit, soft-delete | Classification available to proponents whose lead agency owns the subtype |
| Approval Behalf | Required English and French names plus `require actual`; names are unique among active values in the agency | List, create, edit, soft-delete | Delegated approval rules and whether actual-approver details are required |
| Agreement Types | Agreement-type enum plus required English and French names; names are unique for the active agency/type combination | List, create, edit, soft-delete | Classification of agreements created for the agency |

Reference rows can be edited in place. Use **Edit** to correct a label while preserving the identifier used by existing records; use deletion only to retire the value. Fiscal-year edits validate the merged start/end dates, including a PATCH that changes only one date. A duplicate or stale selection leaves the form available for correction.

### Availability and calculation defaults

Cost categories and their line items have an **Active** switch separate from deletion. Stream cost-line mappings also have their own availability switch. All required levels must be available for a new Agreement budget selection. Existing saved references can remain visible even when no longer offered for new work; do not replace them merely because a search omits them.

A cost line can define an Agreement-budget calculation default:

| Mode | Configuration |
| --- | --- |
| Manual | Enter the supported amount directly. No source category, percentage, or percentage override is allowed. |
| Category | Select another category in the same Agency containing only manual lines; enter a percentage from 0 through 100 with at most two decimal places. |
| All other | Calculate a percentage over the other eligible lines; leave source category empty. |

A category used as a calculation source cannot itself acquire calculated lines. A line cannot depend on its own category or another Agency’s category. **Allow percentage override** controls whether the Agreement user may change the captured default percentage. Changing the Agency default does not rewrite existing Agreement rows.

For example, configure “Employer benefits” as 10% of the manual “Salaries” category, then make it available through the stream’s Cost Category Line Items. A supported salary of 10,000.00 produces 1,000.00 of benefits. See [Budget](../agreements/budget.md) for grouping, whole-dollar rounding, all-other calculations, and transactional capacity checks.

### Attachment Types

Create the bilingual classifications users select when uploading [attachments](../concepts/attachments.md). These belong to the Agency, not to a global Common administration catalogue. Create, edit, and delete require the corresponding exact-Agency permission. Retired types are excluded from new choices; historical attachment metadata remains linked to its saved type.

## Business statuses

Each Agency owns its configurable business-status catalogue. A new Agency receives one protected Draft status. The Statuses tab shows active and deleted definitions with their localized badge, colour, Lucide icon, and lifecycle class: normal, read-only, or terminal.

Agency update access can create a normal status and change bilingual presentation. Setting read-only or terminal flags, deleting, or restoring requires Agency delete access. Draft cannot be edited, deleted, or restored. Once a status becomes terminal it cannot be changed back to normal or read-only. Names are required in both languages, colours must be six-digit hexadecimal values, icons must be permitted Lucide identifiers, and active names are case-insensitively unique within the Agency.

Deletion is blocked when current business records, workflow configuration/publications, or a registered host integration still reference the status. Restore only after resolving an active-name conflict. Read-only and terminal definitions freeze the applicable business record mutations; they do not replace the separate stable publication/runtime state engines.

### Claim reconciliation transitions

The Statuses tab also configures two optional Claim transitions. The **start** status is applied to the Claim when reconciliation begins; it must be a normal, non-read-only, nonterminal status from this Agency. The **final** status is applied when a final reconciliation reaches a positive completion outcome; it must be terminal and belong to this Agency. Leaving either selection empty disables that transition.

For example, select “Under reconciliation” as start and “Claim closed” as final. An unfinished or denied final reconciliation does not close the Claim merely because its final flag is checked. Saving this configuration requires Agency update access. It does not grant permission to act on a Claim or rewrite already completed work.

## Lifecycle, concurrency, and deletion

Agency and child deletions are logical (`_deleted = true`), not physical. Deleted values disappear from active lookups while historical foreign keys remain intact.

Sensitive writes re-resolve authorization and ownership inside lock-protected transactions. The operation fails safely if the user's grant, the agency, or an ownership chain changed concurrently. Child lookups and mutations also confirm that the owning agency remains active.

Deleting an agency requires exact-agency delete access and a fresh view of its grant graph. The operation is blocked when extension state prevents deletion. A successful deletion also retires the agency-owned roles, role-permission rows, program-scope grants, and user-role assignments that could otherwise preserve access. Other historical child records are not physically removed; they become unavailable through active-agency paths.

## Extensions

The Extensions tab shows registered extensions and agency enablement state. Only extensions enabled for the agency can be configured at stream scope. Disabling an agency extension disables its stream-level enablement for every stream under that agency. Extension availability, authorization, configuration, storage, and migrations remain governed by the host extension lifecycle.

## Setup order

For a new agency, a practical dependency order is:

1. Complete the General profile.
2. Add Fiscal Years.
3. Add Cost Categories and line items.
4. Add Holdback Bases, Address Types, Applicant/Recipient Subtypes, Approval Behalf types, and Agreement Types required by the business process.
5. Enable required Extensions at agency scope.
6. Create Programs.
7. Add program streams and complete stream-level setup.

## Failure and recovery

- A duplicate active value returns a localized conflict message; change the conflicting field or retire the existing value.
- An invalid date range, year, identifier, or missing bilingual field returns field-level localized validation errors.
- A missing or inaccessible agency or child resource returns not found; confirm both the identifier and the caller's exact scope.
- A concurrent authorization or lifecycle change can reject an otherwise valid submission; reload the page before retrying.
- If a selected GWCOA item cannot be hydrated, confirm that it still exists and that the current create/update permission allows the lookup.
- Save buttons remain disabled while a request is pending. After an API failure, the modal stays available so the values can be corrected and resubmitted.

![Agency programs tab](/screenshots/en/agency-program-setup.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._
