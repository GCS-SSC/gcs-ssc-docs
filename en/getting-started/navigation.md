# Navigation

Use the sidebar to open a work area, such as Agreements or Proponents. Within a record, use the tabs to move between its details and related work. Breadcrumbs show where you are and provide links back to earlier pages. You can collapse or resize the sidebar, switch between English (`en-CA`) and French (`fr-CA`), and watch the loading indicator while a page opens.

## Sidebar destinations

| Destination | When it is shown |
| --- | --- |
| Home | Always after authentication. |
| Agencies | When an active role can read `agency`. |
| Programs | When an active role can read `transfer_payment`. |
| Funding Opportunities | When an active role can read `transfer_payment`. |
| Funding Case Intakes | When an active role can read `funding_case`. |
| Journal Vouchers | When an active role can read `journal_voucher`. |
| Agreements | When an active role can read `agreement` at any scope. |
| Proponents | When an active role can read `applicant_recipient` at a supported scope. |
| Assignment Management | When `agreement`, `applicant_recipient`, `funding_case`, `journal_voucher` or `correction` has an active `manage_assignments` grant. |
| Groups | When an active role can read `group`. |
| Roles | When an active role can read `role`. |
| Users | When an active role can read `user`. |
| GWCOA | Only with global Viewer or higher for `system`. |
| Audit | With explicit global or Agency Viewer or higher for `audit`. |

A **record assignment** names the staff responsible for a particular record. A **role** supplies permissions, and its **scope** limits those permissions to the whole system, an Agency or a Program. You need both the relevant permissions and assignment for actions that require assigned work. Being assigned to an Agreement or Proponent does not make a missing sidebar destination appear. Likewise, seeing a destination does not mean every record will be listed or assigned to you. The server checks access whenever you open or change a record.

## Home page

Start on Home to see the work assigned to you. **My Open Work** counts your open assignments to specific records; the lists separate direct and shared work, Proponents, and Agreements. Each section links to its records and has its own pager. The dashboard loads more assigned work as needed, so an initial section can fill as later batches arrive. Its count is a server result, not a count of the currently visible five rows.

If the user belongs to an active administrative group, **Available to Claim** lists unclaimed group reviews, recommendations, Data Collections, additional-reviewer requests, and approval steps. Claiming refreshes both the group queue and assigned work. Group membership alone does not grant access to the business record or make a claim valid: the server checks current eligibility. If the user has no group membership, the second summary shows their assigned Agreement count instead. See [Groups](../admin/groups.md).

If a queue cannot load, use its Retry action. A failed claim leaves the item unclaimed; refresh and confirm membership, role scope, and current work state before trying again. The public `/api/health` endpoint remains the operational health check.

## Search pages, records and your work

Open the search button to find **Pages**, **My work**, and **Records** together. Pages follow the same visibility rules as navigation. With an empty query, the palette offers pages and a short list of your open assigned work; it does not search all records. Enter up to 200 characters to search stable IDs, references and bilingual names. Short queries favor exact references/IDs; a more specific name helps with broad matches. Percent signs, underscores and backslashes are treated literally.

My work comes from your assignments to specific records and current permissions, including independently assigned child reviews, recommendations and Data Collections. Parent labels are omitted when you cannot read the parent. Record results require current read access and exclude deleted or terminal work as applicable; a read-only unfinished status can still appear. A result grants no new assignment or action permission. Collections open their exact questionnaire in Home rather than a separate detail page.

Use arrow keys and Enter to select a result, or Escape to close. The palette shows a limited preview (up to five personal items and twelve records); refine the query or open the relevant list when more exist. If the remote search fails, Pages remain usable and **Retry** repeats the search. A stale result can become unavailable after permission or lifecycle changes; refresh and verify the exact assignment and owner scope.

For example, to find Agreement AG-2026-014:

1. Open the search button and enter `AG-2026-014`.
2. Select the matching result with the arrow keys and Enter, or select it directly.
3. Open the tab for the work you need to do. If the record is unavailable, refresh and ask your assignment coordinator to check your permissions and record assignment. A search result does not grant editing access.

## Navbar and user menu

The EN/FR switch navigates to the equivalent locale-prefixed route and preserves route parameters/query state when a localized sibling exists. Page URLs use `/en/...` or `/fr/...`; several French application paths use translated segments.

The bell button is present, but the current shell does not provide a notification panel or notification/email queue. Do not rely on it for workflow alerts.

The user menu shows the signed-in user's name/email and Logout. Users with global `system` Viewer or higher also see Download SQL dump. Logout invalidates the Better Auth session before redirecting to the localized login page; a failure leaves the user on the current page and displays a localized error.

## Page and table behaviour

Management lists use server search and pagination. Changing a search or filter returns you to the first page. The app keeps the latest search results even if an earlier search finishes later. Counts in the page header show all matching records, not just the current page.

Tables can expose column visibility, selection, status filters, and authorized row actions. Empty, loading, and error states are localized. After you confirm deletion, the record is normally marked deleted rather than removed from the database. The list refreshes and moves to a valid page if its last page is now empty. If a change saves successfully but the list fails to refresh, the app keeps its local update and reports the refresh error.

## Forms, modals, and lookups

Your permissions determine which create and edit buttons appear. The server checks those permissions again when you save. Forms show validation errors and save controls in your chosen language, display a message if the server rejects a change, and ask for confirmation before destructive actions. Closing a dialog clears its contents; a save from an earlier dialog cannot close one you opened afterward.

Bilingual selection fields search the server for matching choices. A saved choice remains displayed even when it is not on the current page of results. Loading and unavailable states are explicit rather than silently clearing a saved relation. Date controls store `YYYY-MM-DD` without a time. Localized status/type badges and summary cards display parent-supplied data; they do not grant access or mutate records.

Multi-step forms show guidance for the current step. Previous and Next navigate steps; only the final action submits. Validation summaries count errors by step and link to the affected section.

## Detail tabs and direct links

A record page usually has a summary header that you can collapse, breadcrumbs, vertical tabs and a work area. Shared route tabs store the selection in the `section` query parameter and fall back to a default for unknown values. Current direct-link sections include Role Permissions and Proponent or Agreement Assigned users.

On small screens, vertical navigation collapses behind a labelled toggle. On larger screens it remains beside the content. The browser remembers whether you collapsed the summary header for that page. It starts collapsed on screens narrower than the `sm` layout breakpoint (the application’s small-screen threshold).

## Troubleshooting

If a destination is missing, confirm the active user-role assignments, subject access level, and global/agency/program scope. For Assignment Management, check the independent `manage_assignments` capability. If a destination is visible but a record is missing or denied, also check the record to which you are assigned and current status. Approval or reviewer assignment is a separate workflow requirement.

Reload or sign in again after permission changes to refresh client hints. Server writes always rebuild current authorization, so a stale visible control cannot preserve revoked access.

If language switching does not retain a section, open the destination in the chosen locale and reselect the tab. Bookmark the locale-prefixed URL.

![Navigation and language switcher](/screenshots/en/navigation.png)

_Seeded development-environment example; the records shown are illustrative._
