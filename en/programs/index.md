# Programs

Programs are transfer payment profiles. A program belongs to one agency, holds the program-level terms and conditions, and groups the streams that drive agreement intake, agreement setup, reviews, approvals, claims, forecasts, payments, monitoring, and amendments.

Programs are not just labels. The agency, date range, status, budgets, outcomes, objectives, and performance indicators entered here become reference data for downstream stream setup and runtime agreement work.

## Empty-System Prerequisites

Before creating production programs, configure the owning agency and the agency reference data that program and stream forms depend on:

| Setup | Why it matters |
| --- | --- |
| Agency profile and structural role permissions | Program administrators need an agency context and a scoped `transfer_payment` role permission. Teams do not attach to Programs. |
| Agency fiscal years | Program budgets are tied to agency fiscal-year rows. |
| Applicant recipient subtypes, agreement types, cost categories, and cost category line items | Streams consume those agency records. |
| Common users, behalf types, review schemas, recommendation schemas, and approval templates | Required when the first stream will also generate runtime reviews, recommendations, or approvals. |

If an administrator works inside an active agency context, the agency selector is locked to that agency. Otherwise, the create flow allows selecting any agency the user is authorized to administer.

## List Page

The Programs page shows only records the current user can read through a global, agency, or linked-program structural role permission. Proponent and Agreement Teams do not grant Program access.

The list supports:

- Search across English and French program name, English and French abbreviation, agency name, and program ID.
- Status filtering, including all statuses.
- Pagination and table column controls.
- Hero counts for total programs and active programs when active-count data is available.
- Create, edit, delete, and wizard actions when the user has the corresponding transfer payment permission.

Deleting a program uses the shared confirmation flow and soft-deletes the profile. Administrators should treat deletion as a setup correction, not as a normal end-of-life action for a program with operational history.

## Quick Create Modal

The standard program modal creates or edits only the transfer payment profile record. It is useful when the administrator wants to create the shell first and configure outcomes, objectives, budgets, indicators, and streams later.

The profile fields are:

- Agency: required, and used for permission scope and reference-data filtering.
- Start date and end date: required. The end date must be on or after the start date.
- English and French name.
- English and French abbreviation.
- Terms and conditions link: required and must be a valid URL.
- English and French description.
- English and French purpose.
- Status: defaults to draft on create.

All bilingual fields are required. A program with missing French or English text will not validate.

## Program Wizard

The wizard creates the profile and selected child records together. If any required field, duplicate rule, or reference-data rule fails, the whole wizard submission fails and no partial program is created.

The wizard steps are:

- General: agency, dates, bilingual names, abbreviations, terms link, descriptions, purposes, and status.
- Outcomes: zero or more bilingual outcomes.
- Objectives: zero or more bilingual objective statements.
- Budgets: zero or more program fiscal-year budgets. Each row chooses one agency fiscal year, total budget, and overcommit threshold.
- Performance: zero or more performance indicators, each linked to one wizard outcome.
- Review: read-only summary of the entries that will be submitted.

## Wizard Business Rules

| Rule | Behaviour |
| --- | --- |
| Outcome names must be unique | The same English/French outcome name combination cannot appear twice in the wizard. |
| Objective text must be unique | The same English/French objective text combination cannot appear twice in the wizard. |
| Program budgets are one row per fiscal year | Each fiscal year can appear only once in the budget step. |
| Performance indicators must stay linked to an outcome | Removing an outcome also removes performance indicators linked to that outcome. |
| Indicator names must be unique within an outcome | Duplicate indicator names are blocked within the selected outcome. |
| Agency changes reset agency-scoped budget choices | Changing the selected agency after budgets were added clears budget rows because fiscal years are agency-scoped. |
| Fiscal years must belong to the selected agency | A program budget can only use fiscal years from the selected agency. |

On submit, the wizard creates the profile, outcomes, objectives, budgets, and performance indicators linked to the created outcomes.

## Detail Page

Opening a program displays a collapsible hero with the bilingual program name and description. The edit button opens the same profile modal used from the list, with date values normalized for date inputs.

The detail page uses six linkable vertical tabs: General, Streams, Outcomes, Objectives, Budgets, and Performance Indicators. The selected tab is stored in the `section` query parameter, so administrators can bookmark a specific configuration area.

## General Tab

The General tab is read-only display of the profile fields:

- Agency-scoped transfer payment profile identity.
- Start and end date.
- English and French name.
- English and French abbreviation.
- English and French description.
- English and French purpose.
- Terms and conditions link.
- Status.

Use the page-level edit action to change these fields.

## Streams Tab

The Streams tab lists the operational streams under the program. Agreements and most runtime setup are stream-driven, so at least one stream is normally required before production agreements can be created.

The stream table supports create, edit, delete, and a stream setup wizard when the user can update child records. Stream records include bilingual name, bilingual abbreviation, bilingual description, bilingual objective, optional parent stream, further-distribution flag, and status.

Open a stream to configure budgets, eligible recipients, cost lines, agreement subtypes, commitments, risk ratings, review setups, recommendation setups, approval templates, document templates, and extensions.

## Outcomes Tab

Outcomes define the result areas used by program performance tracking. Each outcome has:

- English and French name.
- English and French description.

Performance indicators are linked to outcomes, so changing or deleting outcomes can affect the options available when configuring indicators.

## Objectives Tab

Objectives capture bilingual objective statements for the program. Each row stores:

- English objective text.
- French objective text.

Objectives are program-level statements. They do not replace stream-level objectives, which are configured on each stream.

## Budgets Tab

Program budgets allocate funding by agency fiscal year. Each row has:

- Fiscal year from the agency fiscal-year reference data.
- Total budget.
- Overcommit threshold.

Each program budget can later be referenced by stream budget rows. Configure program budgets before configuring stream budgets, commitments, or fiscal-year-driven agreement setup.

A program budget cannot be reduced below the sum of its active stream-budget allocations, and it cannot be deleted while active stream allocations still reference it. Reload before retrying if another administrator changed allocations concurrently.

The fiscal-year selector searches the fiscal years available from the program's agency. When editing a budget, the saved fiscal year is resolved to its display label even when it is not on the current results page; records outside the program's agency scope cannot be selected.

## Performance Indicators Tab

Performance indicators are created under outcomes. Each indicator has:

- Outcome.
- English and French name.
- English and French description.

The indicator create form preselects an available outcome when possible. If there are no outcomes, create at least one outcome before adding indicators.

## Status and Lifecycle

Program status uses the base status enum and defaults to draft. Active status is counted by the list page and is the expected state for program configurations that are ready for operational use. The application does not automatically activate streams or runtime setup when a program is activated; administrators must configure each stream and dependent setup record deliberately.

## Permission and Scope Behavior

Program read, create, update, and delete actions are authorized through the `transfer_payment` role subject. Scope is derived from the role structure and is global, agency-wide, or limited to the role's linked Programs:

- Create checks the selected agency and therefore requires applicable global or agency `transfer_payment:create` access.
- List visibility is resolved from global access, agency access, and the Programs linked to program-scoped roles.
- Detail and child actions check the owning agency and Program against the requested CRUD action.
- Stream and child setup pages remain under the owning Program's derived role scope.
- Teams are never evaluated for agencies, Programs, or streams.

If a user can read a program but cannot update it, the detail page still loads but edit and add actions are hidden or disabled.

## Deletion, Failure, and Recovery

Profile and child deletes are logical rather than physical. Deleting a profile does not physically delete its streams or historical setup rows, but active-profile paths no longer expose them. Before deletion, the server locks the current profile and active stream set, freshly checks exact delete access, and asks every registered extension to guard each stream scope. An extension lifecycle guard can block the operation. If the active stream set changes repeatedly while locks are acquired, the request fails with a localized scope-change error instead of deleting against stale state.

Create, update, wizard, and child mutations recheck authorization and active ownership inside transactions. The agency on an existing profile is immutable. A missing and an inaccessible resource are deliberately difficult to distinguish; confirm both the identifier and the user's global, agency, or linked-program scope. Duplicate bilingual values, invalid dates or URLs, out-of-agency fiscal years, and unsafe financial values return localized validation or conflict errors. Reload after a concurrent change, correct the indicated field, and resubmit; modal values remain available after ordinary API failures.

## Operational Setup Order

A practical empty-system setup order is:

1. Create or verify the agency and its reference data.
2. Create the program profile, preferably with the wizard if outcomes, objectives, budgets, and indicators are already known.
3. Add program budgets for every fiscal year that streams will use.
4. Create one or more streams.
5. Configure stream budget, recipient, cost line, agreement subtype, commitment, risk, review, recommendation, approval, document template, and extension settings.
6. Activate or publish assessment schemas and approval templates used by runtime workflows.
7. Create production agreements only after the target stream is complete enough for the agreement workflow being used.
