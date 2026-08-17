# Agreement budget

The **Budget** tab records the agreement's fiscal years and detailed cost lines. Forecasts and claims select from these stable budget coordinates; commitments are limited by current program funding; and payments use agreement fiscal years. Configure the budget before downstream financial work.

## Prerequisites and access

Configure the following in order:

1. agency fiscal years;
2. program fiscal-year budgets;
3. stream budgets, including total budget and overcommit threshold;
4. active stream cost-category line items; and
5. the saved agreement and its authorized-assistance dates.

`agreement:read` displays the budget. Adding a fiscal year or line uses `agreement:create`; editing uses `agreement:update`; deleting uses `agreement:delete`. A scoped role or exact Agreement Team may supply these actions. Lookup routes require the same create/update action as the form that opened them.

Writes use the established agreement transaction: the server locks the agreement and scope chain, rebuilds authorization, resolves the current stream, and then mutates only the current working budget version.

## Fiscal years

Select a fiscal year backed by an active budget on the agreement's current stream. The create picker returns only years whose date range overlaps the agreement's authorized-assistance period. An active fiscal year may appear only once in the current budget version.

The table preserves a fiscal-year group even when it has no lines. From that group, authorized users can add a line, change the fiscal year, or delete the group when the interface considers deletion safe.

Deletion is soft and is refused when the fiscal year has active budget lines, claims, payments, or claim-line use. The main tab therefore shows its fiscal-year delete action only for an empty group. There is no restore control.

::: warning Current fiscal-year update limitation
The normal edit picker offers only overlapping stream-budget years, but the PATCH API itself verifies stream membership without repeating the authorized-duration overlap check. It also does not block a populated year from being changed or recalculate its existing lines against the destination year's stream capacity. Use only the supplied picker, and do not change a fiscal-year group after claims or payments exist. If an incorrect change occurs, stop downstream work and have an authorized administrator reconcile the budget and affected financial records.
:::

## Budget lines

The full-screen line form contains:

| Field | Rule |
| --- | --- |
| Budget fiscal year | Required current-version fiscal-year group on this agreement. |
| Cost line | Required active stream cost-category line item. Its English/French configured name is displayed. |
| Cost subsection | Required non-empty text, maximum 255 characters. |
| Description | Required non-empty text; this agreement-specific description is not bilingual. |
| Total amount | Required finite amount with at most two decimals. |
| Program funding | Required finite amount with at most two decimals. |
| Other federal, other government, other funding | Optional finite amounts with at most two decimals; blank values become absent values. |
| Currency | Required configured `currency_codes` value; new forms default to `cad`. |

Supported request amounts have an absolute maximum of 90 trillion. Amounts are persisted as `numeric(19,2)`. The current schema does not require budget amounts to be non-negative; operational budgets should nevertheless use valid non-negative financial values.

The total amount must be at least program funding plus the three optional funding amounts. On a partial update, that cross-field rule runs only when the request contains both total amount and program funding; the database constraint still evaluates the complete stored row.

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
