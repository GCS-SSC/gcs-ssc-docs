# GWCOA administration

Open **Administration**, then **GWCOA** at `/en/admin/gwcoa` to maintain the organization list used by Agency profiles. GWCOA means Government-Wide Chart of Accounts. This page manages its organization numbers and bilingual names.

Use this page to correct an organization's name in the Agency lookup. To add an Agency fiscal year or cost category, open the [Agency](./agencies.md) page.

## Permissions

GWCOA is shared across Agencies. You need global `system:read` to view it, global `system:create` to add an organization, and global `system:update` to edit, retire, or restore one. Agency permissions alone do not give access. The server checks your current permissions again when saving.

## Search and inspect

Search by row ID, organization number, or English or French name. Search treats `%` and `_` as ordinary characters. Filter by active or deleted entries, then use pagination to browse the results. The table total counts your filtered results. The summary at the top counts the whole catalogue and its active entries. Collapse the summary to hide those statistics.

Open a row to inspect or edit it. The row ID identifies an entry in this catalogue. The GWCOA number identifies the organization selected in an Agency profile. These are different numbers.

## Create or update an organization

| Field | Rule |
| --- | --- |
| Number | Required integer from 0 through 32,767; unique across the catalogue. |
| English name | Required text, 1 to 255 Unicode characters. Null characters are not allowed. |
| French name | Required text, 1 to 255 Unicode characters. Null characters are not allowed. |
| Deleted | Select when editing to retire the entry. Clear it to restore the entry. The row remains in the catalogue. |

1. Search first to avoid creating an organization already present under another language label.
2. Select **Add** and enter the number and both names.
3. Save and check that the row shows the number and both names.
4. Use the Agency profile's GWCOA lookup to associate the organization with the Agency.

For example, correcting the French spelling of an existing organization is a name edit, not a reason to allocate a new organization number. If an Agency references that number, attempting to change it returns `GWCOA_NUMBER_IN_USE`; correct the label while preserving the referenced number. A duplicate number returns `GWCOA_DUPLICATE_NUMBER`, including conflicts with retained catalogue records.

Retiring an organization keeps existing Agency references and their displayed names. You can save other changes to an Agency without replacing its retired organization. New Agencies and replacement selections must use an active organization. Review the existing reference before changing it.

## Where other administration belongs

| Task | Workspace |
| --- | --- |
| Fiscal years, cost definitions, address types, attachment types, recipient subtypes, agreement types, statuses | [Agency](./agencies.md) reference tabs |
| Approval, review, recommendation, workflow, document, and custom-field configuration | [Agency catalogs](./agency-catalogs.md) for shared definitions; [Stream](../programs/streams.md) for selections and local settings |
| Contacts and addresses | The owning Proponent or Agreement workspace |
| Carry out reviews, recommendations, approvals, and completion | The relevant casework record and workflow |
| Evidence of changes and queries across Agencies | [Audit](./audit.md), requiring an explicit global Audit grant |

Use the workspace listed above to change a definition or work on a case. Each workspace applies the permissions and rules for that task.

## Failure and recovery

If the list or an organization fails to load, retry loading before editing. A loading error does not mean the catalogue is empty.

If saving fails, keep the draft, correct the field errors or conflicting number, and save again. After a permissions change, reload the page. If saving succeeded but the table failed to refresh, reload the list before creating another entry.
