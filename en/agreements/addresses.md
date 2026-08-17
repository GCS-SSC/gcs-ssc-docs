# Agreement Addresses

The **Addresses** tab stores locations used specifically by an agreement. Each row links the agreement and an agency-owned address type to a common address record.

## Access and list

Agreement `read` access lists active links whose common address and address type are also active. `create`, `update`, and `delete` independently expose Add, Edit, and Delete. Exact Agreement Team levels supply the corresponding actions.

The table shows bilingual address type, street line 1, city, and postal or ZIP code. Search also matches subdivision, all three street lines, and either language of the address type.

The address-type lookup contains only active types owned by the agreement’s current agency and authorized for the requested create or update action. The server repeats that agency check when saving; a type from another agency is invalid even if its ID is submitted directly.

## Fields and validation

| Field | Rule |
| --- | --- |
| Address type | Required active type owned by the agreement’s agency. |
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
