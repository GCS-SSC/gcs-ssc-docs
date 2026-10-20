# Navigation

Use the sidebar to open a work area, such as Agreements or Proponents. Within a record, use the tabs to move between its details and related work. Breadcrumbs show where you are and provide links back to earlier pages. You can collapse or resize the sidebar, switch between English (`en-CA`) and French (`fr-CA`), and watch the loading indicator while a page opens.

## Find a work area

Home, Agreements, Proponents, Funding Case Intakes, Funding Opportunities, and Programs appear at the top level when you have access. Expand **Management** for Agencies, Roles, Guided Help, and Journal Vouchers. Expand **Administration** for Assignment Management, Users, Groups, Audit, and GWCOA. Extension workspaces appear in their configured group. Empty groups are hidden. Search offers the same permitted pages.

## Sidebar destinations

| Destination | When it is shown |
| --- | --- |
| Home | Always after authentication. |
| Agencies | With active Agency Viewer access or higher. |
| Programs | With active Program Viewer access or higher. |
| Funding Opportunities | With active Program Viewer access or higher. |
| Funding Case Intakes | With active Funding Case Viewer access or higher. |
| Journal Vouchers | With active Journal Voucher Viewer access or higher. |
| Agreements | With active Agreement Viewer access or higher at any scope. |
| Proponents | With active Proponent Viewer access or higher at a supported scope. |
| Assignment Management | With active assignment-management permission for Agreements, Proponents, Funding Cases, Journal Vouchers or Corrections. |
| Groups | With active Group Viewer access or higher. |
| Roles | With active Role Viewer access or higher. |
| Users | With active User Viewer access or higher. |
| Guided Help | With active Guided Help Viewer access or higher, globally or for an Agency. |
| GWCOA | With global System Viewer access or higher. |
| Audit | With explicit Audit Viewer access or higher, globally or for an Agency. |

A **record assignment** names the staff responsible for a particular record. A **role** supplies permissions, and its **scope** limits those permissions to the whole system, an Agency or a Program. You need both the relevant permissions and assignment for actions that require assigned work. Being assigned to an Agreement or Proponent does not make a missing sidebar destination appear. Likewise, seeing a destination does not mean every record will be listed or assigned to you. The server checks access whenever you open or change a record.

## Home page

Start on Home to see the work assigned to you. **My Open Work** counts your open assignments to specific records; the lists separate direct and shared work, Proponents, and Agreements. Each section links to its records and has its own pager. The lists load more assigned work as needed. The total includes work beyond the five rows currently visible.

If you belong to an active administrative group, **Available to Claim** lists unclaimed group reviews, recommendations, Data Collections, additional-reviewer requests, and approval steps. Claiming refreshes both the group queue and assigned work. Group membership alone does not grant access to the business record or make a claim valid: the server checks current eligibility. If you do not belong to a group, the second summary shows your assigned Agreement count instead. See [Groups](../admin/groups.md).

If a queue cannot load, use its Retry action. A failed claim leaves the item unclaimed; refresh and confirm membership, role scope, and current work state before trying again. Administrators can use `/api/health` to check whether the application is running.

## Search pages, records and your work

Select the search button to find **Pages**, **My work**, and **Records** together. Pages follow the same visibility rules as navigation. Before you enter search text, the search panel shows pages and a short list of your open assigned work; it does not search all records. Enter up to 200 characters to search stable IDs, references and bilingual names. For a short search, exact references and IDs appear first. Enter a more specific name to narrow broad matches. Percent signs, underscores and backslashes are treated literally.

My work shows tasks that your current permissions and assignments let you access. These include reviews, recommendations and Data Collections assigned to you separately from the main record. The search hides the main record's name if you cannot read it. Records shows work you can currently read. It excludes deleted or finished work where applicable. Unfinished work can still appear when its status allows reading but prevents changes. A result grants no new assignment or action permission. Collections open their exact questionnaire in Home rather than a separate detail page.

Use arrow keys and Enter to select a result, or Escape to close. The search panel shows up to five personal items and twelve records. Refine your search or open the relevant list to find more. If the application cannot load search results, Pages remain usable and **Retry** repeats the search. A stale result can become unavailable after permissions or a record's status change. Refresh and ask your assignment coordinator to check your record assignment and role scope.

For example, to find Agreement AG-2026-014:

1. Select the search button and enter `AG-2026-014`.
2. Select the matching result with the arrow keys and Enter, or select it directly.
3. Open the tab for the work you need to do. If the record is unavailable, refresh and ask your assignment coordinator to check your permissions and record assignment. A search result does not grant editing access.

## Navbar and user menu

Use the EN/FR switch to change language. When an equivalent page exists, the switch keeps the selected record and URL options. Page URLs begin with `/en/` or `/fr/`. Some French URLs also use translated page names.

Use the sun or moon button to switch between light and dark mode. Check Home for your assigned work.

The user menu shows your name, email and **Logout**. Users with global System Viewer access or higher also see **Download SQL dump**. Logout ends your session and opens the login page in your chosen language. If logout fails, you stay on the current page and see an error.

## Use a guide

On supported screens, select **Guide** to open instructions beside the relevant controls. If several guides are available, choose one from the list. Guides on the Agreements list can show the Agency name to distinguish them.

Follow the instructions and use the normal application controls. A guide can advance after a successful action, such as opening a dialog or saving. **Next** advances manual instructions when allowed. **Previous** returns through the path you visited, including any choices. A failed Save does not count as a completed action.

A workflow guide follows the Agreement you selected and its exact tasks. Wait for another person's assigned work when required. Opening a different Agreement or sibling task does not change the guide's selected work. Return to the named record or task to continue. Finishing the instructions does not complete or approve business work.

You can switch languages while keeping your place. The guide remembers its position in the current browser tab when storage is available. Exit to close it, then launch it again to start with the current published version. Closing a guide does not save or cancel your form. Use the form's own controls.

If instructions pause while a page or dialog loads, wait for it to finish. Close an unrelated Help dialog to resume. If a control is unavailable, check that you are on the expected record and have permission for the action. Ask your guide publisher to check the selected version if the instructions no longer match the screen.

If **Guide** is missing, the screen may have no published guide for your Agency and active roles. Your Agency's guide publisher can check the audience and publication settings. Guide access does not grant permission to read or edit a record. See [Publish guided help](../admin/guided-help.md).

## Read and export a flow diagram

Workflow and guide diagrams show the order of steps and the labelled routes between them. Select an enabled step to inspect or edit it when your permissions allow. In a guide flow, alternative paths appear in separate columns and shared later steps appear once.

Use the diagram's zoom controls to change the view between 25% and 200%, or reset it to 100%. Scroll to see the rest of a large diagram. Full-window mode provides more space. Escape closes an open dialog first, then leaves full-window mode.

**Export SVG** and **Export PNG** download the complete diagram, including content outside the visible area. Exports use the full diagram at 100% regardless of zoom. PNG has four times the diagram's width and height. If an export fails, the diagram remains available and you can retry.

## Page and table behaviour

Management lists use server search and pagination. Changing a search or filter returns you to the first page. The app shows results for your latest search, even when an earlier search takes longer to finish. Counts in the page header show all matching records, not just the current page.

Tables can expose column visibility, selection, status filters, and authorized row actions. Empty, loading, and error states are localized. After you confirm deletion, the record is normally marked deleted rather than removed from the database. The list refreshes and moves to a valid page if its last page is now empty. If a change saves successfully but the list fails to refresh, the app keeps its local update and reports the refresh error.

## Forms, modals, and lookups

Your permissions determine which create and edit buttons appear. The server checks those permissions again when you save. Forms show validation errors and save controls in your chosen language, display a message if the server rejects a change, and ask for confirmation before destructive actions. Closing a dialog clears its contents. If a save from an earlier dialog finishes later, it does not close a new dialog you have opened.

Bilingual selection fields search the server for matching choices. A saved choice remains displayed even when it is not on the current page of results. If choices are loading or unavailable, the field shows that state and keeps the saved choice. Dates use `YYYY-MM-DD` without a time. Status and type badges and summary cards describe the record. They do not change it or grant access.

Multi-step forms show guidance for the current step. **Previous** and **Next** move between steps. Only the final action submits the form. Validation summaries count errors by step and link to the affected section.

## Detail tabs and direct links

A record page usually has a summary header that you can collapse, breadcrumbs, vertical tabs and a work area. Some tabs keep your selection in the URL's `section` option so you can bookmark or share it. An unrecognized value opens the default tab. Supported sections include Role Permissions and Proponent or Agreement Assigned users.

On small screens, vertical navigation collapses behind a labelled toggle. On larger screens it remains beside the content. The browser remembers whether you collapsed the summary header for that page. On small screens, the summary header starts collapsed.

## Troubleshooting

If a destination is missing, ask your administrator to check your active roles, the access level for that work and whether the role covers the system, Agency or Program. For Assignment Management, check the independent `manage_assignments` capability. If a destination is visible but a record is missing or denied, also check the record to which you are assigned and current status. Approval or reviewer assignment is a separate workflow requirement.

Reload or sign in again after your permissions change. The server checks current permissions whenever you save, even if an old button is still visible.

If language switching does not retain a section, open the destination in the chosen locale and reselect the tab. Bookmark the locale-prefixed URL.

![Navigation and language switcher](/screenshots/en/navigation.png)

_Seeded development-environment example; the records shown are illustrative._
