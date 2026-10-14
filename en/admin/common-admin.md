# GWCOA administration

Open **Administration → GWCOA** at `/en/admin/gwcoa` to maintain the organization list used by Agency profiles. GWCOA means Government-Wide Chart of Accounts. This page manages its organization numbers and bilingual names.

For example, use this page to correct an organization’s name in the Agency lookup. To add an Agency fiscal year or cost category, use the Agency page instead. The application has a dedicated GWCOA manager; the former Common Administration tabs and generic create, read, update, and delete routes are no longer the working interface.

## Permissions

GWCOA is shared across Agencies, so its permissions apply to the whole system. Reading requires global `system:read`; creating requires global `system:create`; editing, soft deletion, and restoration use global `system:update`. Agency access alone does not authorize this catalogue. The server checks every request and checks current permissions again when saving a change.

## Search and inspect

The table supports pagination, literal-text search, and active/deleted filtering. Search covers row ID, organization number, and English/French names; `%` and `_` are ordinary characters. The filtered total counts your current search results. The summary at the top counts the whole catalogue and its active rows. Collapsing that summary hides its statistics.

Open a row to inspect or edit it. Database IDs identify catalogue rows; the GWCOA number is the organization number that Agency profiles reference. Do not confuse those two identifiers.

## Create or update an organization

| Field | Rule |
| --- | --- |
| Number | Required integer from 0 through 32,767; unique across the catalogue. |
| English name | Required trimmed nonblank text, at most 255 Unicode characters. |
| French name | Required trimmed nonblank text, at most 255 Unicode characters. |
| Deleted | Available on update for logical retirement/restoration; does not physically remove the row. |

1. Search first to avoid creating an organization already present under another language label.
2. Select Add and enter the number and both names.
3. Save and verify the resulting row.
4. Use the Agency profile's GWCOA lookup to associate the organization with the Agency.

For example, correcting the French spelling of an existing organization is a name edit, not a reason to allocate a new organization number. If an Agency references that number, attempting to change it returns `GWCOA_NUMBER_IN_USE`; correct the label while preserving the referenced number. A duplicate number returns `GWCOA_DUPLICATE_NUMBER`, including conflicts with retained catalogue records.

An unchanged retired GWCOA reference can remain on an existing Agency during unrelated profile edits. Retirement does not make it eligible for new Agency selections. Review the existing Agency reference before replacing it, and use a current eligible organization for a genuine replacement.

## Where other administration belongs

| Task | Workspace |
| --- | --- |
| Fiscal years, cost definitions, address/attachment types, recipient subtypes, agreement types, statuses | [Agency](./agencies.md) reference tabs |
| Approval, review, recommendation, workflow, document, and custom-field configuration | [Agency catalogs](./agency-catalogs.md) for shared definitions; [Stream](../programs/streams.md) for selections and local settings |
| Contacts and addresses | The owning Proponent or Agreement workspace |
| Carry out reviews, recommendations, approvals, and completion | The relevant casework record and workflow |
| Evidence of changes and queries across Agencies | [Audit](./audit.md), requiring an explicit global Audit grant |

Do not attempt to repair runtime history by recreating the removed generic editor. Published definitions and runtime evidence have dedicated lifecycle and authorization rules.

## Failure and recovery

A failed list or detail request is an error state, not proof that the catalogue is empty. Retry loading before editing. If a save fails, keep the draft, correct field errors or the conflicting number, and save again. After a permissions change, reload to obtain current capabilities. If the write succeeded but refreshing the table fails, retry the read rather than submitting a duplicate create.

Technical note: an enum is a fixed list of codes, such as the supported kinds of record. Shared enum controls use `GET /api/metadata/enums?name=...`, an intentionally public endpoint with an allow-listed name and ordered string-array response. It supplies stable codes, while the client translates labels. It is separate from GWCOA and cannot query arbitrary database types. Public metadata still waits for completed application startup and audit readiness.
