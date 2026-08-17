# Proponent Other Names

Use **Other Names** to record a trade name, former name, acronym, or other alternate name for a saved proponent profile. The values support profile interpretation and can be searched within this tab.

Open **Proponents**, select a profile, and choose **Other Names**. The table lists active names in creation order and supports search and pagination.

## Access and actions

| Effective access to the proponent | Available actions |
| --- | --- |
| Read-only access | View, search, and page through active names. |
| Contributor access | View and add names. |
| Full access | View, add, edit, and delete names. |
| No access | The server refuses the request even if a URL is entered directly. |

Global proponent privileges and an exact-entity Proponent Team assignment can provide access. Every server request rechecks the action against the parent profile. Writes run in a transaction, lock the profile, and rebuild authorization before changing data.

## Field and validation

An other-name record contains one required **Other name** value. It is trimmed and cannot be blank. It is not a bilingual English/French pair and has no description field.

The same active name cannot be added twice to one proponent. A name used by a different proponent is allowed. After a name has been deleted, the same value can be added again because uniqueness applies only to active rows.

## Add, edit, and delete

Select **Add**, enter the alternate name, and save. Use the row actions to edit or delete it. An edit or delete must identify an active child row belonging to the profile in the URL; a row from another proponent is treated as not found.

Deletion is logical: the link row is marked deleted and disappears from the active list. There is no restore control in this tab. If deletion was accidental, add the name again. Existing agreements and historical records are not changed.

If saving fails, keep the modal open, correct a blank or duplicate value, and retry. Refresh the profile if another user changed the record concurrently.

## Related guides

- [Proponent profiles](./index.md)
- [Registries](./registries.md)
- [Contacts](./contacts.md)
