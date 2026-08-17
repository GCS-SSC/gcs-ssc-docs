# Agencies

Agencies are the administrative root for programs and most business reference data. Agency scope is also an authorization boundary: seeing an agency identifier in another record does not grant access to it.

## Access and permissions

The server enforces every operation. Navigation visibility and client-side controls are conveniences, not authorization.

| Operation | Required scope |
| --- | --- |
| List or read agencies and agency-owned reference data | An applicable `agency:read` grant |
| Create an agency | Global `agency:create` |
| Edit or delete an agency | `agency:update` or `agency:delete` for that exact agency |
| Create or delete agency-owned reference data | The corresponding permission for that exact agency |
| Create a program from the Programs tab | `transfer_payment:create` for that exact agency |

Missing and inaccessible child records normally produce the same not-found response. This prevents an identifier from revealing data across agency boundaries.

## List and agency profile

The Agencies page provides literal-text search, status filtering, pagination, column controls, row selection, and create, edit, and delete actions. `%` and `_` are searched as ordinary characters, not SQL wildcards. The summary reports all and active agencies within the caller's scope.

The agency form contains:

| Field | Rule |
| --- | --- |
| GWCOA organization | Required server-backed lookup; creation requires global create access and editing requires access to the exact agency |
| Financial-system ID | Required numeric identifier |
| English and French names | Required, maximum 100 characters each |
| English and French abbreviations | Required, maximum 10 characters each |
| Status | Draft, active, or inactive |

The General tab displays those values. Agency profile edits replace only submitted fields. The active profile tuple of financial-system ID, both names, and status must be unique.

## Detail navigation

The detail page has ten linkable tabs:

1. General
2. Programs
3. Cost Categories
4. Fiscal Years
5. Holdback Bases
6. Address Types
7. Applicant/Recipient Subtypes
8. Approval Behalf
9. Agreement Types
10. Extensions

Each reference-data tab supports literal search, status filtering, pagination, and agency-wide summary counts. Search and status filters change the displayed rows and paginated total, while the summary remains an agency-wide total.

## Programs

Programs lists transfer-payment profiles owned by the agency. Authorized users can create a profile directly or start the program wizard; the current agency is fixed as the owner. A locked active-state check prevents a concurrent agency deletion from accepting a new program.

Programs contain streams. Configure the agency's fiscal years, cost categories, and other required lookups before opening a program for operational use.

## Agency reference data

| Tab | Stored values and constraints | Supported actions | Principal use |
| --- | --- | --- | --- |
| Cost Categories | Required English and French names, each unique among active categories in the agency | List, create, soft-delete | Financial grouping for program, agreement, claim, payment, and allocation records |
| Cost-category line items | Required English and French names, each unique among active items in its category | List, create, soft-delete | Detailed budget and expenditure classification |
| Fiscal Years | Display label (maximum 9 characters), year from 1900 through 2100, start date, and end date not before start | List, create, soft-delete | Budgets, forecasts, commitments, payments, claims, and monitoring periods |
| Holdback Bases | Required code plus English and French names; active code is unique in the agency | List, create, edit, soft-delete | Agreement holdback configuration |
| Address Types | Required English and French names, each unique among active values in the agency | List, create, soft-delete | Classification of proponent and agreement addresses |
| Applicant/Recipient Subtypes | Applicant/recipient type plus required bilingual name and description; names are unique for the active agency/type combination | List, create, soft-delete | Classification available to proponents whose lead agency owns the subtype |
| Approval Behalf | Required English and French names plus `require actual`; names are unique among active values in the agency | List, create, soft-delete | Delegated approval rules and whether actual-approver details are required |
| Agreement Types | Agreement-type enum plus required English and French names; names are unique for the active agency/type combination | List, create, soft-delete | Classification of agreements created for the agency |

These lists do not offer a general rename/edit action. Create a corrected value and retire the obsolete value when a resource supports only create and delete. Holdback Bases is the exception and has an edit action.

## Lifecycle, concurrency, and deletion

Agency and child deletions are logical (`_deleted = true`), not physical. Deleted values disappear from active lookups while historical foreign keys remain intact.

Sensitive writes re-resolve authorization and ownership inside lock-protected transactions. The operation fails safely if the user's grant, the agency, or an ownership chain changed concurrently. Child lookups and mutations also confirm that the owning agency remains active.

Deleting an agency requires exact-agency delete access and a fresh view of its grant graph. The operation is blocked when extension state prevents deletion. A successful deletion also retires the agency-owned roles, role abilities, program-scope grants, and user-role assignments that could otherwise preserve access. Other historical child records are not physically removed; they become unavailable through active-agency paths.

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
