# Agencies

An Agency groups its programs and the shared choices staff use in their work, such as fiscal years, cost categories, and agreement types. These shared choices are called reference data. Configure them here before staff use them in agreements, claims, and payments.

For example, if an officer cannot select a cost category in an Agreement budget, check both the Agency category and the Stream selection. Access is also specific to each Agency: seeing its identifier in another record does not give you permission to open it.

## Access and permissions

Your permissions determine which Agencies you can open and which changes you can make. The server checks every request, even when a button or link is visible. In the table below, a grant means a permission assigned to your account.

| Operation | Required scope |
| --- | --- |
| List or read agencies and agency-owned reference data | An applicable `agency:read` grant |
| Create an agency | Global `agency:create` |
| Edit or delete an agency | `agency:update` or `agency:delete` for that exact agency |
| Create, edit, or delete agency-owned reference data | The corresponding permission for that exact agency |
| Create a program from the Programs tab | `transfer_payment:create` for that exact agency |

Missing and inaccessible child records normally produce the same not-found response. This prevents an identifier from revealing data across agency boundaries.

## List and agency profile

Use the Agencies page to find an Agency, open its profile, or create, edit, and delete one if you have permission. You can search text, filter by status, move between pages of results, choose columns, and select rows. Search treats `%` and `_` as ordinary characters. The summary counts all Agencies and active Agencies you are allowed to see.

The agency form contains:

| Field | Rule |
| --- | --- |
| GWCOA organization | Required server-backed lookup; creation requires global create access and editing requires access to the exact agency |
| Financial-system ID | Required positive whole-number ID from the financial system; PostgreSQL stores it as `bigint`. Keep it as decimal text so a long ID is not rounded |
| English and French names | Required, trimmed, maximum 255 Unicode characters each |
| English and French abbreviations | Required, trimmed, maximum 255 Unicode characters each |
| Active | On/off availability setting; a new Agency starts inactive |

The General tab displays those values. Agency profile edits replace only submitted fields. The combination of financial-system ID, both names, and active flag must be unique among profiles that have not been deleted. Name comparisons ignore case and surrounding spaces.

## Detail navigation

The Agency detail page has 24 linkable tabs: General; Statuses; Custom Fields; Approval Templates; Workflow Setups; Review Sets; Recommendation Sets; Data Collections; Programs; Cost Categories; Funding Types; Fiscal Years; Chart of Accounts; Commitment Types; Account Receivable Types; Document Templates; Holdback Bases; Monitor Types; Address Types; Attachment Types; Applicant/Recipient Subtypes; Approval Behalf; Agreement Types; and Extensions.

The design and financial catalogs are Agency-owned. Author a reusable design here, then link or assign it on each applicable Program Stream. See [Agency catalogs and Stream selections](./agency-catalogs.md) for permissions, setup order, publication, and recovery.

Each reference-data tab supports literal search, status filtering, pagination, and agency-wide summary counts. Search and status filters change the displayed rows and paginated total, while the summary remains an agency-wide total.

## Programs

Programs lists transfer-payment profiles owned by the agency. Authorized users can create a profile directly or start the program wizard; the current agency is fixed as the owner. If another user deletes the Agency while you create a program, the server rejects the creation.

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

Names for cost categories, cost lines, approval behalf types, and business statuses are trimmed and limited to 255 Unicode characters. Cost-category, cost-line, and approval-behalf names must remain unique in their existing scope even when only case or surrounding spaces differ. Deactivating a cost category or line does not free its name; deletion and availability are separate settings.

Reference rows can be edited in place. Use **Edit** to correct a label while preserving the identifier used by existing records; use deletion only to retire the value. When you change only one fiscal-year date, the application checks it against the other saved date. For example, a new start date cannot be later than the saved end date. A duplicate or stale selection leaves the form available for correction.

### Availability and calculation defaults

Cost categories and their line items have an **Active** switch separate from deletion. The Stream links that make cost lines available also have their own availability switch. All required levels must be available for a new Agreement budget selection. Existing saved references can remain visible even when no longer offered for new work; do not replace them merely because a search omits them.

A cost line can define an Agreement-budget calculation default:

| Mode | Configuration |
| --- | --- |
| Manual | Enter the supported amount directly. No source category, percentage, or percentage override is allowed. |
| Category | Select another category in the same Agency containing only manual lines; enter a percentage from 0 through 100 with at most two decimal places. |
| All other | Calculate a percentage over the other eligible lines; leave source category empty. |

A category used as a calculation source cannot itself acquire calculated lines. You also cannot delete it while a retained cost line uses it as a source, even if that line is inactive. Change or remove the dependent calculation first; switching its Active setting off does not release the reference. A line cannot depend on its own category or another Agency’s category. **Allow percentage override** controls whether the Agreement user may change the captured default percentage. Changing the Agency default does not rewrite existing Agreement rows.

For example, configure “Employer benefits” as 10% of the manual “Salaries” category, then make it available through the stream’s Cost Category Line Items. A supported salary of 10,000.00 produces 1,000.00 of benefits. See [Budget](../agreements/budget.md) for grouping, whole-dollar rounding, all-other calculations, and transactional capacity checks.

### Attachment Types

Create the bilingual classifications users select when uploading [attachments](../concepts/attachments.md). These belong to the Agency, not to a global Common administration catalogue. Create, edit, and delete require the corresponding exact-Agency permission. Names are required in both languages, limited to 255 Unicode characters and cannot contain only spaces. Retired types are excluded from new choices; historical attachment metadata remains linked to its saved type.

### Funding Types and Subtypes

Create Funding Types on the Agency page, then add subtypes under each type. Names in both languages are required and limited to 255 characters. Types start active; **Included in stacking** and **Included in cost sharing** default to off. Editing a Funding Type’s name keeps its saved stacking and cost-sharing settings. Subtypes start active and use their parent type’s stacking and cost-sharing settings. Stacking and cost sharing determine which funding is included in those calculations. Agency Contributor creates/edits; Manager performs eligible deletion.

Open the Stream's **Funding Subtypes** section and link active subtypes whose active parent belongs to the same Agency. Deletion of a type or subtype is blocked while active Stream links use it. Remove those links first; deleting a type logically retires its subtypes as well. Previously captured runtime funding evidence keeps its saved classification. Correct a label in place rather than recreating its identity. See [Streams](../programs/streams.md).

### Account Receivable Types and Monitor Types

A receivable records money to be recovered. Create **Account Receivable Types** with required bilingual names and optional bilingual descriptions (each up to 10,000 characters). Select exactly one source: **Advance payment related** or **Claim related**. Both on or both off are invalid, even when you change only one of these settings. **Monitor required** defaults to off. Once any receivable uses the type, these three policy settings are locked and deletion is blocked, including retained historical references; names and descriptions can still be corrected.

On **Monitor Types**, **Receivable eligible** defaults to off. Enable it for types whose follow-ups may require a receivable. Disabling it is blocked if a follow-up requires a receivable or already has a linked receivable. These are Agency setup permissions, distinct from the exact Agreement assignment required to work on the resulting records.

### Fiscal Years and Journal Voucher eligibility

The fiscal-year **Journal Voucher eligible** switch defaults to off. Agency Contributor may maintain ordinary fiscal-year fields, but creating an eligible year or changing this switch requires Agency Manager (`agency:delete`). An unchanged saved switch does not require an extra grant. Opening a year is a prerequisite for voucher issuance; it does not itself issue a voucher or grant Agreement access.

### Chart of Accounts

Create an Agency chart with required fiscal year, currency and at least one ordered accounting dimension. Its kind defaults to **Commitment**; **Account Receivable** and **Credit Memo** are separate supported kinds. You cannot change the fiscal year, currency or kind after creation. An accounting dimension is one part of the accounting code, such as a fund or account. Correct dimension labels in place; create a separate chart for a different year, currency or purpose.

A Credit Memo chart may link a Commitment chart only from the same Agency, fiscal year and currency. Other kinds cannot carry that link. Stream eligibility also checks that its budget and the Agency chart share currency. If a selector is empty, configure the matching Program and Stream budget, then reload rather than substituting a chart from another currency.

## Business statuses

Business statuses describe where a record is in your process, such as “Under review” or “Closed.” Each Agency owns its list of statuses. A new Agency receives one protected Draft status. The Statuses tab shows active and deleted definitions with their localized badge, colour, Lucide icon, and lifecycle class: normal, read-only, or terminal.

Agency update access can create a normal status and change bilingual presentation. Setting read-only or terminal flags, deleting, or restoring requires Agency delete access. Draft cannot be edited, deleted, or restored. Once a status becomes terminal it cannot be changed back to normal or read-only. Names are required in both languages, colours must be six-digit hexadecimal values, icons must be permitted Lucide identifiers, and active names are case-insensitively unique within the Agency.

Deletion is blocked when current business records, workflow configuration/publications, or a registered host integration still reference the status. Restore only after resolving an active-name conflict. Read-only and terminal statuses prevent the changes covered by those statuses. Terminal means a final status that cannot later become normal or read-only. These business labels are separate from the states used to publish designs and run workflows.

### Claim reconciliation transitions

The Statuses tab also configures two optional Claim transitions. The **start** status is applied to the Claim when reconciliation begins; it must be a normal, non-read-only, nonterminal status from this Agency. The **final** status is applied when a final reconciliation reaches a positive completion outcome; it must be terminal and belong to this Agency. Leaving either selection empty disables that transition.

For example, select “Under reconciliation” as start and “Claim closed” as final. An unfinished or denied final reconciliation does not close the Claim merely because its final flag is checked. Saving this configuration requires Agency update access. It does not grant permission to act on a Claim or rewrite already completed work.

## Lifecycle, concurrency, and deletion

Deleting an Agency or one of its reference values retires it (`_deleted = true`) rather than erasing it from the database. It disappears from active choices, but existing records keep their saved links. This is also called logical deletion or soft deletion.

Before saving a sensitive change, the server checks your current permissions and confirms which Agency owns the record. It protects these checks and the save as one operation. If another user changes your permissions or deletes the Agency at the same time, your save can be rejected. Looking up or changing an Agency’s records also requires that Agency to remain active.

Deleting an Agency requires delete permission for that Agency and a new check of its current role and permission assignments. The operation is blocked when extension state prevents deletion. A successful deletion also retires the agency-owned roles, role-permission rows, program-scope grants, and user-role assignments that could otherwise preserve access. Other historical child records are not physically removed; they become unavailable through active-agency paths.

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
7. Author and publish Agency review, recommendation, approval, workflow, document, and custom-field definitions.
8. Add program streams and assign the required Agency catalog entries alongside Stream-specific setup.

## Failure and recovery

- A duplicate active value returns a localized conflict message; change the conflicting field or retire the existing value.
- An invalid date range, year, identifier, or missing bilingual field returns field-level localized validation errors.
- A missing or inaccessible agency or child resource returns not found; confirm both the identifier and the caller's exact scope.
- A concurrent authorization or lifecycle change can reject an otherwise valid submission; reload the page before retrying.
- If a selected GWCOA item cannot be hydrated, confirm that it still exists and that the current create/update permission allows the lookup.
- Save buttons remain disabled while a request is pending. After an API failure, the modal stays available so the values can be corrected and resubmitted.

![Agency programs tab](/screenshots/en/agency-program-setup.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._
