# Navigation

GCS-SSC uses a responsive dashboard shell with a collapsible/resizable sidebar, page navbar, localized breadcrumbs on detail pages, and tabs inside complex records. The interface is client-rendered. A loading indicator appears during navigation, and the document language and Nuxt UI locale follow English (`en-CA`) or French (`fr-CA`).

## Sidebar destinations

| Destination | When it is shown |
| --- | --- |
| Home | Always after authentication. Its agency shortcut appears only with agency read access. |
| Agencies | When any static `agency:read` grant exists. |
| Programs | Always listed in the current shell. The server independently limits or rejects data access. |
| Agreements | With any scoped `agreement:read` grant or at least one readable exact Agreement Team membership. |
| Proponents | With the direct global `applicant_recipient:read` flag or at least one readable exact Proponent Team membership. |
| Roles | Always listed in the current shell. Role APIs independently enforce scope and may deny access. |
| Users | When any static `user:read` grant exists. |
| Common Admin | Only with explicit global `system:read`. |

Team navigation checks return only two booleans—whether some readable Proponent or Agreement Team exists. They do not disclose entity identifiers. If that hint fails to load, Team-only destinations remain hidden; use a direct authorized link or retry after the service recovers.

Sidebar visibility is a usability hint, not authorization. A visible destination can still return an empty list or a localized denial, and a hidden client control never replaces the API’s authorization check.

## Navbar and user menu

The EN/FR switch navigates to the equivalent locale-prefixed route and carries route parameters/query state where Nuxt i18n can resolve the sibling path. Page URLs always use `/en/...` or `/fr/...`; several French segments are translated, including `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs`, and `/fr/admin/commun`.

The bell button is present in the navbar, but the current shell does not render a notification panel and no notification/email/queue subsystem is wired. Do not rely on it for workflow alerts.

The user menu shows the active user’s name/email and Logout. Users with global `system:read` also see Download SQL dump. A successful logout invalidates the Better Auth session before navigation to the localized login page. If invalidation fails, the app stays on the current page and displays a generic localized error.

## Page and table behaviour

Management lists use remote search and zero-based UI pagination backed by server pagination. Search or filters reset the page. Request generations prevent an older response from replacing a newer search. The hero count represents the server’s full result, not only the current page.

Tables can expose column visibility, selection, optional status filters, and permitted row actions. Common empty/loading/error behaviour is localized. Confirmed deletes normally soft-delete records; after a successful delete, the list refreshes and corrects an out-of-range final page. If refresh fails after the mutation committed, the UI retains local reconciliation state and shows the error rather than pretending the delete failed.

## Forms, modals, and lookups

Create/update controls appear according to client permission hints and are rechecked by the server. Shared forms use localized Zod validation, `CommonSaveButton`, localized server-error toasts, and confirmation for destructive actions. Closing a modal clears its selected/form state; session-aware CRUD helpers prevent an older asynchronous save from closing a newly opened modal.

Server-backed bilingual selects search remotely and separately hydrate a saved off-page value. While hydration is pending they show loading; an unavailable saved value is labelled unavailable rather than silently cleared. Retry the lookup or correct the referenced record before saving dependent changes.

Other shared controls follow the same locale and error conventions:

- Selects backed by a complete local list display the English or French label for the current interface language. Multi-selects show the chosen values as removable items; an empty option set and selection changes are announced accessibly.
- Remote command-palette lookups fetch an initial page, wait briefly after typing before searching, show a localized empty state, and report request failures through the standard error toast. Selecting a result closes or advances the containing interaction; the exact record types and permissions come from that feature's API.
- Date controls store a calendar date as `YYYY-MM-DD`, without a time of day. Clearing the control stores no date. Domain validation still determines whether a date is required and which ranges are allowed.
- Status badges, entity-type badges, bilingual name cells, summary/value cards, section headers, and detail heroes present information supplied by their parent page; they do not grant access or independently change records. A bilingual name cell emphasizes the active language and shows the other-language value secondarily.
- Shared text areas can render an enabled extension contribution beneath the field when the page supplies agency/stream context, a supported slot, and an action. Extension enablement and server authorization still decide whether any contribution is returned.

Multi-step forms show localized guidance beside the active step. Previous and Next only move between steps; the final action submits. When validation fails, the summary counts errors by step, lets the user jump to an affected step, and lists errors for the current step. Cancel exits through the containing feature's confirmation or close behaviour.

## Detail tabs and direct links

Detail pages typically provide a collapsible hero, breadcrumbs, vertical section tabs, and a content workspace. The selected tab is stored in the `section` query parameter where the page uses the shared route-tab helper. Unknown sections fall back to the page default. This supports direct links to sections such as Agency Fiscal Years, Role Abilities, and Proponent Team.

On smaller screens, shared vertical section navigation collapses behind a labelled toggle and normally closes after a selection. On larger screens it remains visible beside the editor workspace. These presentation components do not add routes of their own; the parent page owns the available sections, permission checks, save behaviour, and direct-link semantics.

Hero collapse state is saved in browser local storage by a stable page key. It defaults to collapsed below the `sm` breakpoint and expanded on larger screens until the user chooses otherwise.

## Troubleshooting

If a destination is missing, verify the active user, structural role assignments, direct Proponent flags, and exact Team membership. If a destination is visible but its API denies the request, verify the required action/subject and current agency/program/entity scope; Programs and Roles being visible does not prove access. Reload after static permissions change. Team access is resolved on demand.

If language switching does not land on the expected section, open the destination in the chosen locale and reselect its tab. Bookmark the locale-prefixed URL.

![Navigation and language switcher](/screenshots/en/navigation.png)

_Actual screenshot from the seeded development environment. Example records are not created by a clean production installation._
