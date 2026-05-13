# Agreement Forecasts

Forecasts track expected spending by agreement budget line, month, fiscal year, and version. The summary tab groups forecast versions by budget fiscal year; the detail page edits the monthly breakdown.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Agreement budget fiscal years | Forecast records are created for agreement budget fiscal years. |
| Agreement budget line items | The detail page builds its editable rows from budget lines in the forecast fiscal year. |
| Approval template for `fundingcaseforecast` | Required when completed forecasts need approval routing. |
| Agreement update permission | Required to create forecasts, add versions, edit monthly amounts, complete, and manage approvals. |

## Tab flow

The Forecasts tab summarizes forecast headers, budget lines, and forecast line items.

The tab groups by fiscal year. Each row represents a forecast version for that fiscal year:

| Column | Meaning |
| --- | --- |
| Version | Version number from forecast line items. New forecasts with no lines show version `0`. |
| Status | First line status for that version, or `draft` when no lines exist. |
| Lines | Number of forecast line items in the version. |
| Total forecasted | Sum of line amounts in the version. |

Adding a forecast creates a forecast header for a budget fiscal year. Adding a version opens the detail page with the next version selected.

## Detail page

The detail page displays one fiscal year and one selected version at a time. It builds a grid from every agreement budget line in the forecast fiscal year and the twelve fiscal-year months from April through March.

Users can toggle a quarter into its three months. Editing is only available when the forecast is not locked.

## Forecast line items

| Field | Rule |
| --- | --- |
| Forecast | Required forecast id. |
| Budget line item | Required. Must belong to the forecast fiscal year and agreement. |
| Month | Required integer 0 to 11, where 0 is April and 11 is March. |
| Amount | Required money value. |
| Currency | Required currency enum; the detail editor writes CAD. |
| Version | Required non-negative integer normalized to a string. |
| Status | Required status enum. New detail-page lines are created as `inprogress`. |

Saving the breakdown updates existing month lines whose amount changed and creates new month lines only when the draft amount is non-zero.

## Business rules

| Rule | Behaviour |
| --- | --- |
| Forecast fiscal year must belong to the agreement budget | Invalid fiscal-year ids are rejected. |
| Forecast line budget item must belong to the forecast fiscal year | Budget lines from another agreement or fiscal year are rejected. |
| Locked status is line based | If any line for the forecast is `complete`, `pendingapproval`, `approved`, or `denied`, the detail page is locked. |
| Completion requires lines | Completing a forecast with no line items is rejected. |
| Completion locks all lines | Completion updates all line items for the forecast to `complete` or `pendingapproval` depending on approval setup. |
| Approval activates the approved forecast | When approved, the forecast becomes active and other forecasts for the same agreement/fiscal year are deactivated. |

## Completion and approval

Completion entity type: `fundingcaseforecast`.

The completion runtime can complete only when the forecast has line items and no line item is in a locked status. With a valid stream approval template, completion moves lines to `pendingapproval`; without a template, it moves lines to `complete`.

Approval status is aggregated from line statuses. If any line is denied, the forecast reads denied. If all are approved, it reads approved. If any are pending approval, it reads pending approval. If all are complete, it reads complete.
