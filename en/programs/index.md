# Programs

A program is the overall funding initiative, such as “Community Facilities Improvement.” It belongs to one agency and records the dates, terms and conditions, yearly funding, objectives, and expected results for that initiative.

A **stream** is a funding route within the program, such as “Small Community Projects.” It supplies the choices and rules officers use for intake, agreements, reviews, approvals, claims, forecasts, payments, monitoring, and amendments. Set up the program first, then its streams. The program's agency, dates, Active setting, budgets, outcomes, objectives, and indicators provide the starting information for that work.

## Empty-System Prerequisites

Before creating production programs, configure the owning agency and the agency reference data that program and stream forms depend on:

| Setup | Why it matters |
| --- | --- |
| Agency profile and structural role permissions | Program administrators need an agency context and a scoped `transfer_payment` role permission. Exact assignments apply only to the 11 assignable runtime casework types; they do not attach to agency, Program, or stream configuration records. |
| Agency fiscal years | Program budgets are tied to agency fiscal-year rows. |
| Applicant recipient subtypes, agreement types, cost categories, and cost category line items | Streams consume those agency records. |
| Common users, behalf types, review schemas, recommendation schemas, and approval templates | Required when the first stream will also generate runtime reviews, recommendations, or approvals. |

If an administrator works inside an active agency context, the agency selector is locked to that agency. Otherwise, the create flow allows selecting any agency the user is authorized to administer.

## List Page

The Programs page shows only records the current user can read through a global, agency, or linked-program structural `transfer_payment` role permission. Exact Proponent and Agreement assignments do not grant Program access, and configuration access never derives from another runtime assignment.

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
- English and French terms-and-conditions links: both required and each must be a valid URL.
- English and French description.
- English and French purpose.
- Active flag: defaults to false on create.

All bilingual fields are required. A program with missing French or English text will not validate. Two active, non-deleted Programs in the same Agency cannot share the same English/French name combination. If creating, renaming, or activating a Program reports a duplicate, check existing active Programs and correct the names before retrying. Editing another field preserves the saved Active setting.

## Program Wizard

The wizard creates the profile and selected child records together. If any required field, duplicate rule, or reference-data rule fails, the whole wizard submission fails and no partial program is created.

The wizard steps are:

- General: agency, dates, bilingual names, abbreviations, English/French terms links, descriptions, purposes, and active flag.
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
- English and French terms and conditions links.
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

Outcome names are required, trimmed and limited to 255 Unicode characters in each language. Both descriptions are required and trimmed. If pasted text contains an invalid hidden character, retype the affected text and save again.

Performance indicators are linked to outcomes, so changing or deleting outcomes can affect the options available when configuring indicators.

For example, use “Improved access to community facilities” as an outcome and describe the change the program aims to achieve. Add the measures used to track that change under Performance Indicators.

## Objectives Tab

Objectives capture bilingual objective statements for the program. Each row stores:

- English objective text.
- French objective text.

Objectives are program-level statements. They do not replace stream-level objectives, which are configured on each stream.

For example, “Support renovations to accessible community spaces” states what the program intends to support. A stream may have a narrower objective, such as supporting small renovation projects.

## Budgets Tab

Create a program budget for each agency fiscal year the streams will use. Each row contains:

- Fiscal year: choose a year from the program's agency reference data.
- Total budget: the funding pool available for that year.
- Overcommit threshold: the configured allowance above the budget, shown as a percentage. The stored value is a ratio: `0.10` means 10%, and `0` means no overcommit allowance. Use the percentage shown in the form.

Create these rows before stream budgets, commitments, or agreement setup that needs a fiscal year. Stream budget rows then reference the appropriate program budget.

For example, if active stream allocations total $700,000, reducing the program budget to $650,000 is refused. You also cannot delete the program budget while active stream allocations reference it. Review allocations first and reload if another administrator changed them.

You can keep a saved fiscal year after the agency retires it, allowing an amount correction without changing the year. To choose another year, select an active year from the same agency. The change is blocked if it would move existing Agreement funding-year dependencies to another year.

The selector searches the agency's fiscal years and keeps the saved year's label visible even when it is outside the current results page. It never permits a year from another agency. In a new-program wizard, changing agency clears incompatible budgets. If a choice fails, reload the options before retrying instead of submitting an old identifier.

## Performance Indicators Tab

Performance indicators are created under outcomes. Each indicator has:

- Outcome.
- English and French name.
- English and French description.

Indicator names follow the same 255-character limit as outcome names. Both names and descriptions are required and trimmed; invalid hidden characters are rejected.

The indicator create form preselects an available outcome when possible. If there are no outcomes, create at least one outcome before adding indicators.

For the outcome “Improved access to community facilities,” an indicator could be “Number of facilities improved.” Use the description to explain what counts as an improved facility. This creates the indicator definition; it does not record a measured result.

## Status and Lifecycle

Program availability uses the Boolean **Active** flag and starts inactive. It is separate from the Agency business statuses used by Agreements. Activating a program does not automatically activate its streams or publish runtime configuration; complete each dependency deliberately.

## Permission and Scope Behavior

Program read, create, update, and delete actions are authorized through the `transfer_payment` role subject. Scope is derived from the role structure and is global, agency-wide, or limited to the role's linked Programs:

- Create checks the selected agency and therefore requires applicable global or agency `transfer_payment:create` access.
- List visibility is resolved from global access, agency access, and the Programs linked to program-scoped roles.
- Detail and child actions check the owning agency and Program against the requested CRUD action.
- Stream and child setup pages remain under the owning Program's derived role scope.
- Exact entity assignments are never evaluated for agencies, Programs, or streams.

If a user can read a program but cannot update it, the detail page still loads but edit and add actions are hidden or disabled.

## Deletion, Failure, and Recovery

Deletion removes a program from normal use without physically erasing its streams or historical setup. Pages that require a non-deleted profile will no longer show those records. Use deletion to correct setup mistakes; consider the program's history before deleting it.

The system checks current delete permission and locks the program and its active streams while it checks dependencies. Registered extensions can block deletion to protect work attached to a stream. If streams keep changing during these checks, deletion stops with a localized scope-change error. Reload and review the current streams before trying again.

Every save, wizard submission, and child-record change checks permission and the current agency/program ownership together in a transaction. You cannot change the agency of an existing program. A missing record and one you cannot access may produce similar errors: check the identifier and your global, agency, or linked-program permission scope.

For a validation error, correct the field identified in the message. Common causes are duplicate bilingual values, invalid dates or URLs, a fiscal year from another agency, or unsafe financial values. After another administrator changes the setup, reload before resubmitting. Ordinary API failures leave the modal's entered values available.

## Operational Setup Order

A practical empty-system setup order is:

1. Create or verify the agency and its reference data.
2. Create the program profile, preferably with the wizard if outcomes, objectives, budgets, and indicators are already known.
3. Add program budgets for every fiscal year that streams will use.
4. Create one or more streams.
5. Configure stream budget, recipient, cost line, agreement subtype, commitment, risk, review, recommendation, approval, document template, and extension settings.
6. Publish assessment schemas and approval templates used by runtime workflows.
7. Create production agreements only after the target stream is complete enough for the agreement workflow being used.
