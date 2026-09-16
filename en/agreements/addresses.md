# Agreement Addresses

The **Addresses** tab stores locations used specifically by an agreement. Each row links the agreement and an agency-owned address type to a common address record.

## Access and list

Agreement Viewer lists active links to non-deleted common addresses, including the saved label of a retired address type. Creating/updating requires Contributor plus the exact Agreement assignment; deleting requires Manager plus that assignment. Addresses use the Agreement as their assignment root.

The table shows bilingual address type, street line 1, city, and postal or ZIP code. Search also matches subdivision, all three street lines, and either language of the address type.

The address-type lookup contains only active types owned by the agreement’s current agency and authorized for the requested create or update action. The server repeats that agency check when saving; a type from another agency is invalid even if its ID is submitted directly.

## Fields and validation

| Field | Rule |
| --- | --- |
| Address type | Required Agency-owned type; new selections must be active. |
| Street line 1 | Required; lines 2 and 3 are optional. |
| City | Required. |
| Country | Required supported country value. |
| Province, territory, state, or subdivision | Required. For Canada (`ca`), it must be a configured Canadian jurisdiction; for other countries it is free text. The database also enforces the Canadian rule. |
| Postal or ZIP code | Required. |
| Main phone | Required numeric value; extension is an optional integer. |
| Federal riding ID | Required integer. |
| GC address ID | Optional numeric identifier. |

The API schema also accepts optional latitude and longitude, although the current modal does not display them.

## Create and edit

Create inserts the common address and agreement link atomically after fresh agreement authorization. Editing may change the address type, address details, or both. The child ID must belong to the agreement in the URL.

A common address can be referenced by another agreement or a proponent. If another active reference exists, the server refuses changes to the shared address fields so another record cannot be changed silently. A type-only edit remains allowed because it changes only this agreement link.

## Delete and recovery

Delete locks the agreement link and common address, then soft-deletes this agreement link. The common address is soft-deleted only when no other active agreement or proponent link refers to it. Other links are never deleted by this action.

There is no restore control. Re-add an address after an accidental deletion. If an edit reports that the address is shared, correct only the type or create a distinct address instead of retrying an overwrite.

The current database index accelerates agreement/address lookup but is not unique, so the service does not enforce one active link per common-address ID. Check the list before creating repeated business locations.

## Related guides

- [Agreement overview](./index.md)
- [Proponent addresses](../proponents/addresses.md)
- [Agency administration](../admin/agencies.md)

## Exact values and partial updates

Street, city, subdivision and postal fields accept at most 255 Unicode characters and reject NUL. Main phone and optional GC address ID preserve signed PostgreSQL bigint values as decimal strings; do not round a long identifier through a spreadsheet or JavaScript number. The phone extension is a signed small integer and the riding ID a signed 32-bit integer. Coordinates, when supplied through the API, must fit `numeric(10,7)`.

A partial update validates the resulting country/subdivision pair, not just the submitted field. For example, changing the country to Canada while retaining an invalid subdivision fails until a valid province or territory is supplied. Sending unchanged physical values does not count as modifying a shared address.

An unchanged retired address type can be retained while correcting other fields. A replacement must be an active type from the Agreement’s Agency. Type deletion is blocked by retained Agreement-address references; a historical label is not an invitation to reuse that type on a new address.
