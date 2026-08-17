# Common Administration

Common Administration is the global, configuration-driven resource manager at `/en/admin/common`. It requires an explicit global `system:read` grant. The client middleware redirects to Home when that grant is absent or the permission check fails, but every API route independently enforces authorization.

## Resource order and ownership

The route-addressable tabs appear in this exact order:

1. GWCOA
2. Entities
3. Contacts
4. Addresses
5. Form Schemas
6. Attachment Types
7. Review Schemas
8. Review Set Setups
9. Review Setups
10. Completions
11. Review Sets
12. Reviews
13. Approval Templates
14. Approval Steps
15. Certifications
16. Routing Slips
17. Recommendation Schemas
18. Recommendation Setups
19. Recommendations

These records are global Common tables, although some carry an agency or stream scope. The standard page still requires global system access. Agency-filtered attachment types and review/recommendation schemas can also be read through their authorized scoped lookup uses; that does not grant access to the Common Administration page.

## Use the shared manager

Choose a tab in the left navigation or use its `section` query value. The default tab is Contacts. The hero reports total and active counts for the selected resource. Each table supports pagination, search across the resource's configured columns plus its id, and a deleted filter for all, active, or deleted rows.

Select **Add** to open a generated form, or open an existing row to edit it. Fields can be text, number, date, multiline text, JSON, boolean, enum, or a server-backed lookup. Bilingual name and description columns render in the current locale with fallback. Lookup controls fetch labels and hydrate the selected value in edit mode, including a deleted referenced value when the field contract permits it.

For Canadian addresses, subdivision uses the jurisdiction list; another country changes it to free text and clears the incompatible Canadian value. Recommendation Schema content uses the structured editor when present. Other JSON fields use a JSON text area and must remain valid for the selected schema.

Existing mutable rows expose **Deleted**. Turning it on soft-deletes the row; turning it off attempts restoration. Nothing in this page physically deletes a Common row.

## Read-only resources

The following tabs are deliberately read-only in this generic manager:

- Entities, which is the polymorphic identity registry populated by domain records.
- Approval Templates, Approval Steps, and Certifications, which are managed through the stream approval-template editor.
- Routing Slips, which are runtime approval records managed through approval actions.

The server rejects create or patch requests for these resources even if a client attempts them directly.

## Mutable resource groups

| Group | Resources | Important contract |
| --- | --- | --- |
| Reference | GWCOA, Contacts, Addresses, Form Schemas, Attachment Types | Create these before records that look them up. Agency-linked resources must reference a valid owner. Names/descriptions that have EN/FR columns require both values. |
| Review design | Review Schemas, Review Set Setups, Review Setups | Schemas are created as version-0 drafts. Setups establish exact scope/entity type, member order, optional approval, sequential behaviour, completion trigger, and active state. Prefer the dedicated stream editors for published production configuration. |
| Review runtime | Review Sets, Reviews | Runtime records point to exact source entities and setup/schema rows. A new review snapshots the active schema's custom-outcome, alignment, and reviewer flags. Changing schema refreshes those flags; restoring requires an active referenced schema, while restoring with the same schema preserves the existing snapshot. |
| Completion | Completions | Stores typed entity identity, value, comments, Common user, and completion date. Normal business completion should use the source record's runtime action. |
| Recommendation design | Recommendation Schemas, Recommendation Setups | Schemas carry bilingual identity, entity type, status, result, and structured definition. Setups bind a schema and optional approval template to an exact scope/entity type. |
| Recommendation runtime | Recommendations | Stores setup, typed entity identity, recommendation value, and response data. Normal work should use the source workflow. |

## Authorization and validation

Listing and reading normally require global `system:read`; creating requires `system:create`; patching, soft deletion, and restoration require `system:update`. Create and patch operations validate with the resource's Zod schema, then rebuild global authorization inside a transaction before mutation. Patch locks the target row or uses the resource's stronger lock path. Unknown resource names, missing ids, read-only mutation, invalid references, invalid JSON, and localized validation failures return the standard API error envelope.

Search escapes SQL wildcard characters. Bigint ids enter contracts as strings or numbers where supported and are returned as strings by PostgreSQL/Kysely-facing APIs. Updates are partial but the merged record must remain valid.

Two shared lookup routes sit beside the generic manager:

| Route | Access and shape |
| --- | --- |
| `GET /api/admin/agency/approval-behalf-types` | Requires global `system:read`. Returns a paginated cross-agency list with bilingual behalf-type and agency names, `egcs_ay_require_actual`, deletion state, filtered `total`, and unfiltered global `stats.total`/`stats.active`. Search treats `%`, `_`, and escape characters literally and also matches the numeric ID. An explicit `deleted` query takes precedence over `status=active|deleted`. |
| `GET /api/metadata/enums?name=...` | Intentionally public so sign-in and shared controls can load allow-listed option values. Returns a plain ordered string array; it never accepts an arbitrary PostgreSQL type name. `ability` returns the static ability catalogue, several application enums come from static constants, and the remaining allow-listed enums are read in PostgreSQL sort order. Invalid names return localized `ENUM_INVALID`. |

The approval-behalf route is an administrative inventory, not the scoped agency picker. Its statistics describe the whole table even when the item list is searched or filtered. Enum labels shown in controls are translated client-side from these stable codes; this endpoint does not return localized display text.

## Dependency and recovery guidance

Build reference data before setup data, and setup data before runtime records. In particular, create active users and agency/stream scope records before approval or review setups; publish production schemas/templates in their dedicated editors before materializing runtime work.

If a lookup is empty, verify the referenced resource exists, is not soft-deleted, matches the required agency/entity filters, and that you have its scoped read permission. If restoration fails, restore or replace required active dependencies first. If a save reports a concurrent permission or ownership change, reload instead of resubmitting stale form state.

Common Administration is an expert repair/configuration surface, not a substitute for normal runtime pages. Direct changes to active setup or runtime records can produce different behaviour for new and historical work. Preserve pinned history and use a new published version when a business process changes.

![Common Administration resources](/screenshots/en/common-admin.png)

_The screenshot uses seeded development data. A fresh installation does not contain those example rows._
