# Programs

A program is the overall funding initiative, such as "Community Facilities Improvement." It belongs to one agency and records the dates, terms and conditions, yearly funding, objectives, and expected results for that initiative.

A stream is a funding route within the program, such as "Small Community Projects." It supplies the choices and rules officers use for intake, agreements, reviews, approvals, claims, forecasts, payments, monitoring, and amendments. Set up the program first, then its streams. The program's agency, dates, Active setting, budgets, outcomes, objectives, and indicators provide the starting information for that work.

## Empty-system prerequisites

Before creating production programs, configure the owning agency and the agency reference data that program and stream forms depend on:

| Setup | Why it matters |
| --- | --- |
| Agency profile and structural role permissions | Program administrators need access to the owning agency and permission to manage its programs. Assignment to an Agreement or other casework does not grant program setup access. |
| Agency fiscal years | Program budgets are tied to agency fiscal-year rows. |
| Applicant recipient subtypes, agreement types, cost categories, and cost category line items | Streams use these agency records. |
| Common users, behalf types, review schemas, recommendation schemas, and approval templates | Required when the first stream will also generate runtime reviews, recommendations, or approvals. |

If an administrator works inside an active agency context, the agency selector is locked to that agency. Otherwise, the create flow allows selecting any agency the user is authorized to administer.

## List page

Open **Programs** to find the programs you can read. Your role must grant program access globally, within an agency, or for specific linked programs. An assignment to a Proponent, Agreement, or other case does not grant access to program setup. See [Roles](../admin/roles.md) for role configuration.

The list supports:

- Search across English and French program name, English and French abbreviation, agency name, and program ID.
- Status filtering, including all statuses.
- Pagination and table column controls.
- Summary counts for all programs and, when available, active programs.
- Create, edit, delete, and wizard actions when the user has the corresponding transfer payment permission.

Deleting a program asks for confirmation and hides the profile from normal use. Use deletion to correct setup mistakes. Review the program's history before deleting it.

## Quick create modal

Use the program form to save the profile first, then add outcomes, objectives, budgets, indicators, and streams.

The profile fields are:

- Agency: required, and used for permission scope and reference-data filtering.
- Start date and end date: required. The end date must be on or after the start date.
- English and French name.
- English and French abbreviation.
- English and French terms-and-conditions links: both required and each must be a valid URL.
- English and French description.
- English and French purpose.
- Active: off by default for a new program.

All bilingual fields are required. Names and abbreviations can contain up to 255 characters per language. Terms-and-conditions links can contain up to 2,000 characters each. The form removes leading and trailing spaces. If pasted text contains an invalid hidden character, retype the affected field and save again. Two active, non-deleted programs in the same agency cannot share the same combination of English and French names. If creating, renaming, or activating a program reports a duplicate, check existing active programs and correct the names before retrying. Editing another field preserves the saved Active setting.

## Program wizard

The wizard saves the profile and the outcomes, objectives, budgets, and indicators you enter together. If any required field, duplicate rule, or reference-data rule fails, the whole wizard submission fails and no partial program is created.

The wizard steps are:

- General: agency, dates, bilingual names, abbreviations, English/French terms links, descriptions, purposes, and active flag.
- Outcomes: zero or more bilingual outcomes.
- Objectives: zero or more bilingual objective statements.
- Budgets: zero or more program fiscal-year budgets. Each row chooses one agency fiscal year, total budget, and overcommit threshold.
- Performance: zero or more performance indicators, each linked to one wizard outcome.
- Review: read-only summary of the entries that will be submitted.

## Wizard business rules

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

## Detail page

Open a program to see a collapsible summary with its bilingual name and description. The edit button opens the same profile modal used from the list, with the saved calendar dates.

The detail page uses six linkable vertical tabs: General, Streams, Outcomes, Objectives, Budgets, and Performance Indicators. Bookmark the selected tab to return to that configuration area.

## General tab

The General tab shows these profile fields in read-only form:

- The program's agency and identity.
- Start and end date.
- English and French name.
- English and French abbreviation.
- English and French description.
- English and French purpose.
- English and French terms and conditions links.
- Status.

Use the page-level edit action to change these fields.

## Streams tab

The Streams tab lists the operational streams under the program. Agreements use the stream's settings, so normally you need at least one stream before creating production agreements.

The stream table supports create, edit, delete, and a stream setup wizard when the user can update child records. Stream records include bilingual name, bilingual abbreviation, bilingual description, bilingual objective, optional parent stream, further-distribution flag, and status.

Open a stream to configure budgets, eligible recipients, cost lines, agreement subtypes, commitments, risk ratings, reviews, workflows, document templates, and extensions. Create shared recommendations and approval templates on the Agency page, then reference them in the relevant reviews and workflows.

## Outcomes tab

Outcomes describe the changes the program aims to achieve. Each outcome has:

- English and French name.
- English and French description.

Outcome names are required and limited to 255 Unicode characters in each language. Both descriptions are required. The form removes leading and trailing spaces from names and descriptions. If pasted text contains an invalid hidden character, retype the affected text and save again.

Performance indicators are linked to outcomes, so changing or deleting outcomes can affect the options available when configuring indicators.

For example, use "Improved access to community facilities" as an outcome and describe the change the program aims to achieve. Add the measures used to track that change under Performance Indicators.

## Objectives tab

Objectives state what the program aims to do. Each row has:

- English objective text.
- French objective text.

Objectives are program-level statements. They do not replace stream-level objectives, which are configured on each stream.

For example, "Support renovations to accessible community spaces" states what the program intends to support. A stream may have a narrower objective, such as supporting small renovation projects.

## Budgets tab

Create a program budget for each agency fiscal year the streams will use. Each row contains:

- Fiscal year: choose a year from the program's agency reference data.
- Total budget: the funding pool available for that year.
- Overcommit threshold: the configured allowance above the budget, shown as a percentage. The stored value is a ratio: `0.10` means 10%, and `0` means no overcommit allowance. Use the percentage shown in the form.

Create these rows before stream budgets, commitments, or agreement setup that needs a fiscal year. Stream budget rows then reference the appropriate program budget.

For example, if active stream allocations total $700,000, reducing the program budget to $650,000 is refused. You also cannot delete the program budget while active stream allocations reference it. Review allocations first and reload if another administrator changed them.

You can keep a saved fiscal year after the agency retires it, allowing an amount correction without changing the year. To choose another year, select an active year from the same agency. The change is blocked if it would move existing Agreement funding-year dependencies to another year.

The selector searches the agency's fiscal years and keeps the saved year's label visible even when it is outside the current results page. It never permits a year from another agency. In a new-program wizard, changing agency clears incompatible budgets. If a choice fails, reload the options before retrying instead of submitting an old identifier.

## Performance indicators tab

Performance indicators are created under outcomes. Each indicator has:

- Outcome.
- English and French name.
- English and French description.

Indicator names follow the same 255-character limit as outcome names. Both names and descriptions are required. The form removes leading and trailing spaces and rejects invalid hidden characters.

The indicator create form preselects an available outcome when possible. If there are no outcomes, create at least one outcome before adding indicators.

For the outcome "Improved access to community facilities," an indicator could be "Number of facilities improved." Use the description to explain what counts as an improved facility. This creates the indicator definition; it does not record a measured result.

## Status and lifecycle

A new program starts with **Active** off. This setting is separate from the agency business statuses used by Agreements. Activating a program does not activate its streams or publish their configuration. Complete the stream setup separately.

## Permission and scope behavior

Your role controls whether you can read, create, update, or delete programs. Administrators configure these permissions under `transfer_payment`. Access can cover all programs, one agency, or programs linked to the role:

- To create a program, you need `transfer_payment:create` access globally or for the selected agency.
- The list shows programs covered by your global, agency, or linked-program access.
- Each action on a program or its setup checks your permission for that action in the owning agency and program.
- Your access to streams and their setup comes from the owning program.
- Assignments to individual cases do not grant access to agencies, programs, or streams.

If a user can read a program but cannot update it, the detail page still loads but edit and add actions are hidden or disabled.

## Deletion, failure, and recovery

Deletion removes a program from normal use without physically erasing its streams or historical setup. Pages that require a non-deleted profile will no longer show those records. Use deletion to correct setup mistakes; consider the program's history before deleting it.

The system checks current delete permission and locks the program and its active streams while it checks dependencies. Registered extensions can block deletion to protect work attached to a stream. If streams keep changing during these checks, deletion stops with a localized scope-change error. Reload and review the current streams before trying again.

Every save, wizard submission, and setup change checks your current permissions and the owning program and agency together before saving. The edit form keeps the program's agency locked. A missing record and one you cannot access may produce similar errors: check the identifier and your global, agency, or linked-program permission scope.

For a validation error, correct the field identified in the message. Common causes are duplicate bilingual values, invalid dates or URLs, a fiscal year from another agency, or unsafe financial values. After another administrator changes the setup, reload before resubmitting. If a save request fails, the form normally keeps your entered values so you can correct them or try again.

## Operational setup order

A practical empty-system setup order is:

1. Create or verify the agency and its reference data.
2. Create the program profile, preferably with the wizard if outcomes, objectives, budgets, and indicators are already known.
3. Add program budgets for every fiscal year that streams will use.
4. Create one or more streams.
5. Configure stream budget, recipient, cost line, agreement subtype, commitment, risk, review, recommendation, approval, document template, and extension settings.
6. Publish assessment schemas and approval templates used by runtime workflows.
7. Create production agreements only after the target stream is complete enough for the agreement workflow being used.
