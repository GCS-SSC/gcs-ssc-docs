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
| Groups | When an active role can read `group`. |
| Roles | Always listed; APIs still enforce `role` scope. |
| Users | When an active role can read `user`. |
| GWCOA | Only with global Viewer or higher for `system`. |
| Audit | With explicit global or Agency Viewer or higher for `audit`. |

Exact entity assignments do not make the Agreements or Proponents destination appear because an assignment never supplies its missing role ceiling. Conversely, a visible destination does not assign every record or guarantee a non-empty list. Sidebar visibility is only a usability hint; every API enforces current authorization independently.

## Home page

Home is a live work dashboard. **My Open Work** counts the signed-in user's open exact assignments; the lists separate direct and shared work, Proponents, and Agreements. Each section links to its records and has its own pager. The dashboard loads more assigned work as needed, so an initial section can fill as later batches arrive. Its count is a server result, not a count of the currently visible five rows.

If the user belongs to an active administrative group, **Available to Claim** lists unclaimed group reviews, additional-reviewer requests, and approval steps. Claiming refreshes both the group queue and assigned work. Group membership alone does not grant access to the business record or make a claim valid: the server checks current eligibility. If the user has no group membership, the second summary shows their assigned Agreement count instead. See [Groups](../admin/groups.md).

If a queue cannot load, use its Retry action. A failed claim leaves the item unclaimed; refresh and confirm membership, role scope, and current work state before trying again. The public `/api/health` endpoint remains the operational health check.

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

_Seeded development-environment example; the records shown are illustrative._
