# Agreement Budget

The Budget tab records the agreement's fiscal-year budget and budget line items. It is the foundation for forecasts, claims, commitments, and payment eligibility because those workflows select their fiscal years and cost lines from the agreement budget.

## Empty installation setup

Configure these records first:

| Configuration | Why it matters |
| --- | --- |
| Agency fiscal years | Stream budgets and agreement budget years resolve to agency fiscal years. |
| Transfer payment stream budgets | The fiscal-year picker reads the stream budget list for the agreement's program and stream. |
| Stream budget totals and overcommit threshold | Program funding on agreement budget lines cannot exceed stream capacity for the fiscal year. |
| Organization cost categories and line items | Budget line item lookup values come from configured organization cost categories for the agreement context. |
| Agreement profile | Budget records can only be added after the agreement exists and the user can update it. |

## Page flow

The Budget tab groups rows by fiscal year, cost category, and cost subsection. Fiscal years with no lines are still shown as empty groups so users can add lines directly under the year.

The fiscal-year picker only offers years configured on the agreement's stream. The cost category picker only offers categories valid for the agreement context.

## Authorization

Viewing the budget requires `agreement:read`. Adding a fiscal year or budget line requires `agreement:create`; editing an existing fiscal year or line requires `agreement:update`; deleting either record requires `agreement:delete`. An exact Agreement Team can supply these actions according to its access level. Related fiscal-year and cost-category lookups use the create or update action of the form that opened them.

## Records

| Record | Required fields |
| --- | --- |
| Budget fiscal year | Fiscal year |
| Budget line item | Budget fiscal year, organization cost category, cost subsection, description, total amount, program funding, currency |

Budget line items also accept optional other federal funding, other government funding, and other funding. Blank optional money fields are normalized to empty values. Currency defaults to CAD in the form but accepts the configured currency enum.

## Business rules

| Rule | Behaviour |
| --- | --- |
| Fiscal year must come from the stream budget list | Invalid or unrelated fiscal years are rejected. |
| Cost category must be valid for the agreement | Users can only save cost categories configured for the agreement's program and stream context. |
| Total amount must cover funding parts | Total amount must be greater than or equal to program funding plus all other funding fields. |
| Program funding capacity is stream-scoped | The available capacity is based on the stream budget for the fiscal year, including its overcommit threshold and other agreement budget lines already using that capacity. |
| Updates recalculate capacity | Updating a line excludes the current line from the already allocated amount before testing the new program funding. |
| Fiscal-year deletion is UI-limited | The tab only exposes delete for a fiscal-year group when it has no line items. |

## Table behaviour

| Level | Display | Actions |
| --- | --- | --- |
| Fiscal year group | Fiscal-year display, line count, grouped totals | Add line, edit fiscal year, delete if empty |
| Cost category group | Bilingual cost category, line count, grouped totals | Add line with cost category prefilled and locked |
| Cost subsection group | Subsection text, line count, grouped totals | Add line with cost category and subsection prefilled and locked |
| Line item | Bilingual line item name, description, total, program funding, other funding total | Edit or delete line |

The table only shows each action when the user has its matching Agreement permission: create for either Add action, update for Edit, and delete for Delete.

The footer shows record count, total amount, total program funding, and total other funding. If all visible rows use one currency, totals use that currency; mixed currencies render decimal totals.

## Dependencies on other workflows

Forecasts and claims use agreement budget fiscal years and budget line items as their editable breakdown rows. Payments use agreement budget fiscal years to constrain payment fiscal years and payment-line commitment-line lookups. Commitments compare total commitment lines against agreement budget program funding.

Changing budget records after downstream execution exists can affect available lookup choices and capacity validations, so operationally budget configuration should be finalized before creating commitments, forecasts, claims, and payments.
