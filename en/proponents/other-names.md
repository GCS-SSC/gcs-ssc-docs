# Proponent other names

Use **Other Names** to record a trade name, former name, acronym, or other alternate name for a saved proponent profile. These names help staff recognize the organization. You can search them within this tab.

Open **Proponents**, select a profile, and choose **Other Names**. The table lists active names in creation order and supports search and pagination.

For example, keep "River Community Association" as the profile's legal name and add "River Centre" here if staff know it by that name. If it previously operated as "River Neighbourhood Group", add that former name as another row. Each row contains one name; enter separate English and French names as separate rows when needed.

An **exact assignment** means you are assigned to this profile through **Assigned users**. A role alone does not allow you to change its names.

## Access and actions

| Effective access to the proponent | Available actions |
| --- | --- |
| Viewer | View, search, and page through active names; no exact assignment is required. |
| Contributor plus exact Proponent assignment | View, add, and edit names. |
| Manager plus exact Proponent assignment | View, add, edit, and delete names. |
| No access | The server refuses the request even if a URL is entered directly. |

The system checks your access to this profile on every request and checks it again while saving a change. The table above applies to the profile you opened.

## Field and validation

An other-name record contains one required **Other name** value. Spaces at the beginning and end are removed. The name cannot be blank or exceed 255 characters. If pasted text contains an invalid control character, remove it and retry. It is not a bilingual English/French pair and has no description field.

The same active name cannot be added twice to one proponent. A name used by a different proponent is allowed. After a name has been deleted, the same value can be added again because uniqueness applies only to active rows.

## Add, edit, and delete

Select **Add**, enter the alternate name, and save. Use the row actions to edit or delete it. You can edit or delete only active names belonging to the profile you opened. A name from another profile is treated as not found.

Deleting a name removes it from the active list and preserves its history. There is no restore control in this tab. If deletion was accidental, add the name again. Existing agreements and historical records are not changed.

If saving fails, keep the modal open, correct a blank or duplicate value, and retry. Refresh the profile if another user changed the record concurrently.

## Related guides

- [Proponent profiles](./index.md)
- [Registries](./registries.md)
- [Contacts](./contacts.md)
