# Agreement budget

The **Budget** tab records the agreement's fiscal years and detailed cost lines. Forecasts and claims select from these stable budget coordinates; commitments are limited by current program funding; and payments use agreement fiscal years. Configure the budget before downstream financial work.

## Prerequisites and access

Configure the following in order:

1. agency fiscal years;
2. program fiscal-year budgets;
3. stream budgets, including total budget and overcommit threshold;
4. active stream cost-category line items; and
5. the saved agreement and its authorized-assistance dates.

Agreement Viewer displays the budget. Adding or editing fiscal years/lines requires Contributor plus the exact Agreement assignment; deleting requires Manager plus that assignment. Budget rows use the Agreement assignment root. Lookup routes require the same create/update ceiling as the form that opened them.

Writes use the established agreement transaction: the server locks the agreement and scope chain, rebuilds authorization, resolves the current stream, and then mutates only the current working budget version.

## Fiscal years

Select a fiscal year backed by an active budget on the agreement's current stream. The create picker returns only years whose date range overlaps the agreement's authorized-assistance period. An active fiscal year may appear only once in the current budget version.

The table preserves a fiscal-year group even when it has no lines. From that group, authorized users can add a line, change the fiscal year, or delete the group when the interface considers deletion safe.

Deletion is soft and is refused when the fiscal year has active budget lines, claims, payments, or claim-line use. The main tab therefore shows its fiscal-year delete action only for an empty group. There is no restore control.

Changing a fiscal-year group repeats the authorized-assistance overlap check on the server. A group with active budget lines cannot be reassigned. An unchanged saved year can still be retained when its reference is retired; that does not make the retired year available for new allocations. Review claims and payments before any reassignment: the current reassignment guard checks active budget lines, while deletion has its own downstream-use checks.

## Budget lines

The full-screen line form contains:

| Field | Rule |
| --- | --- |
| Budget fiscal year | Required current-version fiscal-year group on this agreement. |
| Cost line | Required active stream cost-category line item. Its English/French configured name is displayed. |
| Cost subsection | Required non-empty text, maximum 255 characters. |
| Description | Required non-empty text; this agreement-specific description is not bilingual. |
| Total amount | Required finite amount with at most two decimals. |
| Program funding | Enter an exact amount for manual lines. For percentage lines, the server calculates it; do not submit a replacement amount. |
| Other federal, other government, other funding | Optional finite amounts with at most two decimals; blank values become absent values. |
| Currency | Required configured `currency_codes` value; new forms default to `cad`. |

Agreement money is transported as exact decimal text, such as `"1250.00"`, and persisted as `numeric(19,2)`. The absolute per-row maximum is `99999999999999999.99`. Decimal strings are authoritative; the compatibility path accepts JSON numbers only when their serialized cents are safe integers. Exponent notation, surrounding whitespace, leading zeroes, excess decimal places, and out-of-range amounts are rejected. Signed amounts remain supported where the domain schema permits them; do not assume a positive-only business rule from the display control.

The total must cover program funding plus all three other-funding amounts. Percentage recalculation checks the complete affected rows and rolls back the initiating change if any line becomes underfunded. Total amount and other funding remain manually entered even on calculated lines.

## Percentage-based lines

Agency cost-line definitions select one of three calculation modes. The stream exposes eligible definitions to Agreements. A new budget line captures the definition's mode, source category, default percentage, and override permission. Later Agency default changes do not rewrite saved lines; amendment copies retain their saved calculation settings.

| Mode | Program-funding base | Editable values |
| --- | --- | --- |
| Manual | No calculation; enter program funding directly. | Program funding, total, and other funding. |
| Percentage of a category (`category`) | Program funding of manual lines in the configured source category. | Total and other funding; percentage only if overrides were allowed when this line was created. |
| Percentage of all other items (`all_other`) | Program funding of every other line in the same calculation group, including calculated category charges. | Total and other funding; percentage only if the saved definition allows it. |

Calculations group by budget version, Agency fiscal year, and currency, across subsections. Other federal, other government, and other funding never enter the percentage base. Category charges are calculated before all-other charges. Only one active all-other charge is allowed per version/year/currency. Percentage values range from 0 through 100 with at most two decimal places.

The result is rounded once to the nearest **whole dollar**, with an exact half rounded away from zero, then stored as two-decimal money. For example, 10% of `"1005.00"` is `"101.00"`, not `"100.50"`. Browser previews use the same exact arithmetic, but the server reloads saved settings and validates the final transaction.

### Worked budget example

Suppose all these lines use CAD and the same fiscal year and budget version:

| Line | Configuration | Program funding |
| --- | --- | ---: |
| Salaries | Manual, source category Personnel | 10,000.00 |
| Benefits | 10% of Personnel | 1,000.00 |
| Administration | 5% of all other items | 550.00 |
| Total | 10,000 + 1,000 + 550 | 11,550.00 |

The Administration base is 11,000. Adding 2,000 of other funding to Salaries does not change either percentage charge. A salary increase to 12,000 changes Benefits to 1,200 and Administration to 660. Before saving that increase, ensure the manually entered totals of Benefits and Administration can cover their new program funding plus their own other funding. Otherwise the entire save fails, including the salary change.

### Create and edit a calculated line

1. Select the budget fiscal year and configured cost line.
2. Read the captured mode and source category. For a category charge, verify that the intended manual source rows exist in this year and currency.
3. Accept the default percentage or change it if the form permits an override.
4. Enter total amount, description, subsection, currency, and any other funding. Leave calculated program funding to the preview and server.
5. Save, then review the refreshed whole-budget totals; changes to a source can affect other lines.

Creating, editing, moving, or deleting a line recalculates the affected version inside the same authorized Agreement transaction. An invalid dependency, duplicate all-other charge, insufficient line total, numeric overflow, or current-version stream-capacity failure rolls back both the initiating mutation and its derived changes. Changing currency or fiscal year also changes the calculation group. Amendment versions remain isolated from the current version until their application workflow.

## Retired cost definitions

Agency categories, Agency line items, and stream mappings each have an availability flag separate from deletion. Disabling any part of that chain prevents a new selection through it. Existing budget references and their saved calculation settings remain readable; editing an existing line can retain its original inactive selection. A replacement must be currently eligible. Stream setup shows mapping, category, and Agency line-item availability separately, so an active mapping alone does not prove that its source is available.

## Program-funding capacity

For the chosen fiscal year, maximum program funding is:

`stream budget total × (1 + overcommit threshold)`

The capacity check sums program funding from active lines in the current budget versions of **all active agreements in the same stream and fiscal year**. Creation locks the stream-budget row before checking and inserting. An update excludes the line being edited, locks the target stream budget, then tests its proposed program-funding amount. A missing/deleted current fiscal year or stream budget is rejected.

Changing a line's fiscal year is refused while an active claim line references that stable budget line. Deleting a line is also refused while an active claim line references it. Other successful line deletions are soft deletions and have no tab-level restore action.

## Grouped table and search

Rows are grouped by fiscal year, organization cost category, and free-text subsection. Add actions on category/subsection groups prefill and lock those grouping values for the new form. Leaf rows show the bilingual configured cost-line name, agreement description, total, program funding, and combined other funding.

Search is client-side over the loaded overview and matches fiscal-year display, English/French category and line names, subsection, and description. The view loads the complete overview rather than a server-paginated search; the table's local page size starts at 50.

Group and footer totals sum the displayed numeric values. A single currency is formatted using that currency (`cad` receives currency formatting); mixed currencies are deliberately shown as plain decimal sums and are **not** converted. Do not interpret a mixed-currency total as a converted financial total.

## Versions and downstream records

Agreement creation automatically creates one current working budget version. The ordinary Budget tab reads and writes only that version. Amendment preparation copies fiscal years and lines into a separate amendment version while retaining stable public identities; approved revisions preserve the selected version as provenance. Historical copies do not count toward current stream-capacity calculations.

Stable identities allow forecasts, claims, extensions, and revision snapshots to follow a logical fiscal year or line across version copies. Database constraints bind physical lines to a fiscal year, budget version, and agreement and prevent duplicate active stable identities within one version.

Before reducing or deleting budget data, review [Commitments](./commitments.md), [Forecasts](./forecasts.md), [Claims](./claims.md), and [Payments](./payments.md). Downstream constraints can refuse a change even when its button is available.

## Recovery

If save fails, reload the agreement and verify your permission, the current stream configuration, the agreement dates, the selected stable fiscal year, the cost line, and remaining capacity. Do not create replacement rows to bypass an in-use error. Soft-deleted data or an incorrect fiscal-year move requires an authorized administrative/data recovery operation.
