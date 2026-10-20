# Agreement addresses

The **Addresses** tab stores locations used specifically by an agreement. For example, record the location where the funded project takes place and select the appropriate address type configured by your agency. Each row has an address type and address details; the underlying address record may also be used by another agreement or proponent.

## Access and list

Viewer access to the agreement lets you see its active addresses, including the saved label of a retired address type. To add or edit an address, you need Contributor access and assignment to this agreement. To delete one, you need Manager access and the same assignment.

The table shows bilingual address type, street line 1, city, and postal or ZIP code. Search also matches subdivision, all three street lines, and either language of the address type.

The address-type list contains only active types from the agreement's agency that you can use for this action.

## Fields and validation

| Field | Rule |
| --- | --- |
| Address type | Required type from the agreement's agency. New selections must be active. |
| Street line 1 | Required; lines 2 and 3 are optional. |
| City | Required. |
| Country | Required supported country value. |
| Province, territory, state, or subdivision | Required. For Canada (`ca`), it must be a configured Canadian jurisdiction; for other countries it is free text. |
| Postal or ZIP code | Required. |
| Main phone | Required numeric value; extension is an optional integer. |
| Federal riding ID | Required integer. |
| GC address ID | Optional numeric identifier. |

## Create and edit

To add an address, choose an available address type, complete the required fields, and save. To edit one, open its existing row and correct the type, address details, or both. The application checks your current assignment and agreement status before opening the form and before saving. A failed save does not leave a partly created address. If your assignment or the status has changed, reload the agreement before trying again.

A common address can be referenced by another agreement or a proponent. If another active reference exists, the server refuses changes to the shared address fields so another record cannot be changed silently. A type-only edit remains allowed because it changes only this agreement link.

## Delete and recovery

Deleting removes the address from this agreement's list but preserves its history. An address used by another agreement or proponent remains available there.

There is no restore control. Re-add an address after an accidental deletion. If an edit reports that the address is shared, correct only the type or create a distinct address instead of retrying an overwrite.

Check the list before adding a business location because duplicate address links are allowed.

## Related guides

- [Agreement overview](./index.md)
- [Proponent addresses](../proponents/addresses.md)
- [Agency administration](../admin/agencies.md)

## Exact values and partial updates

Keep each street, city, subdivision and postal field within 255 characters. When copying a long phone number or GC address ID from a spreadsheet, check that every digit remains unchanged.

When you change the country to Canada, select a valid province or territory before saving.

An unchanged retired address type can be retained while correcting other fields. A replacement must be an active type from the Agreement's Agency. An address type cannot be deleted while agreement addresses still reference it. A retired type's saved label does not make the type available for a new address.
