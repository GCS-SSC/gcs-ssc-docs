# Navigation

GCS-SSC uses a responsive dashboard shell with a collapsible/resizable sidebar, page navbar, localized breadcrumbs, and tabs inside complex records. The client follows English (`en-CA`) or French (`fr-CA`) and shows a route-loading indicator during navigation.

## Sidebar destinations

| Destination | When it is shown |
| --- | --- |
| Home | Always after authentication. |
| Agencies | When an active role can read `agency`. |
| Programs | Always listed; APIs still enforce `transfer_payment` scope. |
| Agreements | When an active role can read `agreement` at any scope. |
| Proponents | When an active role can read `applicant_recipient` at global or agency scope. |
| Assignment Management | When any active Agreement or Proponent permission has `manage_assignments`. |
| Roles | Always listed; APIs still enforce `role` scope. |
| Users | When an active role can read `user`. |
| Common Admin | Only with global Viewer or higher for `system`. |

Exact entity assignments do not make the Agreements or Proponents destination appear because an assignment never supplies its missing role ceiling. Conversely, a visible destination does not assign every record or guarantee a non-empty list. Sidebar visibility is only a usability hint; every API enforces current authorization independently.

## Home page

The Home page contains a live **Assigned Work** queue. It shows only the signed-in user's exact assignments that are still open and for which the current role graph supplies at least Viewer. Primary assignments sort first. Search, an entity-type filter, direct links, and pagination cover Proponents, Agreements, reviews, recommendations, claims, claim reconciliations, payments, forecasts, monitors, amendments, and commitments.

::: warning Dashboard placeholders
The four System Overview totals (`54`, `116`, `950`, and `100`), their trend/progress graphics, and the “All systems operational” message are hard-coded presentation values, not live counts or health results. Recent Activity, Pending Approvals, and System Settings are static summary cards whose buttons have no destination or handler. The hero Documentation button also has no destination. Do not use these elements for reporting, monitoring, approvals, logs, configuration, or incident decisions. Use the underlying authorized lists, Assigned Work, workflow pages, and the public `/api/health` response instead.
:::

The View Agencies hero action is shown only when the user can read agencies and links to the agency list.

## Navbar and user menu

The EN/FR switch navigates to the equivalent locale-prefixed route and preserves route parameters/query state when a localized sibling exists. Page URLs use `/en/...` or `/fr/...`; several French application paths use translated segments.

The bell button is present, but the current shell does not provide a notification panel or notification/email queue. Do not rely on it for workflow alerts.

The user menu shows the signed-in user's name/email and Logout. Users with global `system` Viewer or higher also see Download SQL dump. Logout invalidates the Better Auth session before redirecting to the localized login page; a failure leaves the user on the current page and displays a localized error.

## Page and table behaviour

Management lists use server search and pagination. Search and filter changes reset the page; request generations stop an older response from replacing a newer search. Hero counts represent the server result total, not just the current page.

Tables can expose column visibility, selection, status filters, and authorized row actions. Empty, loading, and error states are localized. A confirmed delete normally performs a soft delete, refreshes the list, and corrects an out-of-range last page. If refresh fails after a committed mutation, the UI retains local reconciliation state and reports the refresh error.

## Forms, modals, and lookups

Client permission hints control which create/update actions are displayed, but the server rechecks every request. Shared forms use localized validation, save controls, server-error toasts, and confirmation for destructive actions. Closing a modal clears its state; request tokens prevent an older save from closing a newly opened modal.

Server-backed bilingual selectors search remotely and hydrate an already selected off-page value separately. Loading and unavailable states are explicit rather than silently clearing a saved relation. Date controls store `YYYY-MM-DD` without a time. Localized status/type badges and summary cards display parent-supplied data; they do not grant access or mutate records.

Multi-step forms show guidance for the current step. Previous and Next navigate steps; only the final action submits. Validation summaries count errors by step and link to the affected section.

## Detail tabs and direct links

Detail pages typically contain a collapsible hero, breadcrumbs, vertical tabs, and a workspace. Shared route tabs store the selection in the `section` query parameter and fall back to a default for unknown values. Current direct-link sections include Role Permissions and Proponent or Agreement Assigned users.

On small screens, vertical navigation collapses behind a labelled toggle. On larger screens it remains beside the content. Hero collapse state is stored locally under a stable page key and defaults to collapsed below the `sm` breakpoint.

## Troubleshooting

If a destination is missing, confirm the active user-role assignments, subject access level, and global/agency/program scope. For Assignment Management, check the independent `manage_assignments` capability. If a destination is visible but a record is missing or denied, also check the exact assignment root and current status. Approval or reviewer assignment is a separate workflow requirement.

Reload or sign in again after permission changes to refresh client hints. Server writes always rebuild current authorization, so a stale visible control cannot preserve revoked access.

If language switching does not retain a section, open the destination in the chosen locale and reselect the tab. Bookmark the locale-prefixed URL.

![Navigation and language switcher](/screenshots/en/navigation.png)

_Seeded development-environment example. System Overview values and summary cards shown here are placeholders, not operational data._
