# Agreement Forecasts

Forecasts distribute expected agreement spending across current budget lines, fiscal months, and user-selected version numbers. Open an agreement and select **Forecasts**; the tab groups displayed versions by agreement budget fiscal year.

## Before you begin

| Requirement | Verified behaviour |
| --- | --- |
| Current agreement budget | A forecast header must reference a stable fiscal-year identity present in the current budget version. Its editable grid uses current-version budget lines with that same stable fiscal-year identity. |
| Agreement access | `read` loads the overview. `create` creates headers and missing monthly lines; `update` changes headers and existing lines and completes a forecast; `delete` soft-deletes headers or lines. Exact Agreement Team access can grant these child-record actions. |
| Common user record | Completion requires the signed-in account to resolve to an active `Common_User`. |
| Optional completion workflow | A published workflow setup for `fundingcaseforecast` can start after completion and may later set its configured success or failure status. |

Writes repeat Agreement authorization inside a transaction after locking the agreement and every affected forecast aggregate. Cross-agreement, deleted, and non-current budget identities are rejected.

## Create and browse forecasts

Choose **Add forecast** and select one of the fiscal years derived from current budget lines. The server creates an inactive `draft` header. The database does not require a forecast to contain lines and does not enforce one inactive header per agreement/fiscal year.

The tab derives its rows rather than storing separate version records:

| Display | Source |
| --- | --- |
| Fiscal-year group | The forecast header's stable budget fiscal-year identity and current fiscal-year label. |
| Version | Each distinct `egcs_fc_version` found on that header's active monthly lines. A header with no lines is represented as version `0`. |
| Status | The single status on the forecast header; all displayed versions therefore have the same lifecycle status. |
| Lines and total | Count and sum of active lines for that header and version. Totals are formatted as CAD without converting stored currencies. |

Search matches fiscal year, version, localized status, line count, or total. Filtering, grouping, sorting, and pagination occur in the browser after the full overview loads.

**Add version** does not copy data or create a version entity. It opens the same forecast header with the next numeric version in the URL. Saving non-zero cells creates lines tagged with that number.

::: warning Header and version uniqueness
The API permits multiple inactive forecast headers for the same agreement/fiscal year. It also permits duplicate active lines with the same forecast, budget line, month, and version. The grouped UI assumes a single header per fiscal-year group for group edit/delete/add-version actions, and the detail grid keeps only one duplicate in its in-memory cell map. Create one header per fiscal year and one line per budget-line/month/version coordinate.
:::

## Edit the monthly breakdown

The detail route accepts a `version` query value; an absent value defaults to `0`. The grid groups current budget lines by bilingual cost category and cost subsection. It initially shows quarterly totals from April through March; select a quarter heading to expose its three monthly inputs. Search matches category, subsection, both language line-item names, or description.

| Line field | Rule |
| --- | --- |
| Forecast | Required editable header in this agreement. A direct PATCH can move a line to another editable forecast in the same agreement. |
| Budget line | Required stable line identity from the current budget version, the same agreement, and the target forecast's fiscal year. |
| Month | Integer `0` through `11`: April through March. |
| Amount | Required `numeric(19,2)` value, at most two decimals and at most 90 trillion in absolute value. The UI sets a minimum of zero, but server validation and the database do not enforce non-negative values. |
| Currency | Required currency enum. The current grid always creates `cad`; it does not expose currency selection or conversion. |
| Version | Required non-negative integer, normalized to decimal text for the API and stored as bigint. |

**Save breakdown** processes cells sequentially. It PATCHes a changed existing line when the user has `update`, and POSTs a missing non-zero line when the user has `create`. A zero in a missing cell creates nothing; changing an existing cell to zero preserves a zero-valued line. No bulk transaction spans the whole grid, so an error after earlier requests can leave those earlier cells saved. Refresh, correct the reported cell, and save again.

The first created line changes a `draft` forecast to `inprogress`; later line edits do not otherwise change its header status. The API can soft-delete individual lines, but the current grid offers no line-delete action. Deleting an editable header soft-deletes that header and all its active lines atomically.

::: warning Changing the fiscal year after lines exist
The header PATCH validates the new fiscal year but does not validate, move, or delete existing lines. Lines tied to the former fiscal year's budget coordinates can disappear from the new grid while still counting as forecast lines and completion evidence. Do not change a forecast fiscal year after entering breakdown data. If it happened, stop completion and use authorized API/data reconciliation to remove or correctly reassign the stale lines.
:::

## Lifecycle and completion

The header statuses `complete`, `pendingapproval`, `approved`, and `denied` are locked. A completion record or an active `draft`, `pendingapproval`, or `approved` routing slip also blocks header and line mutation even if the header status appears editable.

Completion requires Agreement `update`, an editable header, no previous completion, and at least one active line across any version. Comments are optional. In one fresh-authorized transaction it creates the common completion, sets the header to `complete`, and starts any published `fundingcaseforecast` completion workflow; the completion hook is emitted after commit.

Completion applies to the entire forecast header, not only the version selected in the URL. It does not set `egcs_fc_active`, clone a version, or validate that every visible budget coordinate has a line. A completed forecast therefore remains inactive unless a separate approval runtime later approves it.

## Approval runtime limitation

The server has generic forecast approval support. An explicit caller can use a valid stream-scoped `fundingcaseforecast` approval template to create a routing slip for a `complete` or `denied` forecast with lines. Sequential approval, denial, reassignment, and additional-approval rules then operate through the common runtime. Final approval sets the header to `approved` and active and deactivates other headers for the same agreement and fiscal-year identity; denial sets `denied` and inactive.

Core completion does **not** inspect the template or create that routing slip, and the forecast detail page mounts completion and workflow sections but no approval component. Configuring the template alone therefore does not add approval to this screen. Treat approval as an API/integration capability until a supported host or extension flow invokes it. See [Approvals and completions](../concepts/approvals-completions.md) and [Workflows](../concepts/workflows.md).

## Recovery

- Completion cannot be repeated or undone from this page. Create a replacement forecast only after checking for an existing header for that fiscal year.
- Locked forecasts cannot be edited or deleted through these routes. Editable deletion is logical rather than physical.
- If the fiscal-year picker is empty, add active lines to the agreement's current [Budget](budget.md); a year with no current budget lines is not offered by the UI even though the server validates the fiscal-year row itself.
- If a budget amendment replaces current rows while preserving stable lineage, the forecast follows matching stable fiscal-year and line identities. A deleted or unmatched current line disappears from the editable grid.
