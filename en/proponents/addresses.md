# Proponent addresses

Use the **Addresses** tab for the proponent's mailing, operating, headquarters, or other organizational locations. Agreement-specific address records are managed separately on an agreement.

Open **Proponents**, select a saved profile, and choose **Addresses**. The active list shows street line 1, city, and postal or ZIP code. Search matches city, subdivision, postal or ZIP code, and any of the three street lines.

## Access and actions

| Effective access to the proponent | Available actions |
| --- | --- |
| Viewer | View, search, and page through active addresses; no exact assignment is required. |
| Contributor plus exact Proponent assignment | View, add, and edit addresses. |
| Manager plus exact Proponent assignment | View, add, edit, and delete addresses. |
| No access | The server refuses the request. |

To add or change an address, you need Contributor access and an assignment to this specific Proponent. To delete an address, you need Manager access and that assignment. The application checks your current permissions again when saving.

## Fields and validation

| Field | Rule |
| --- | --- |
| Street line 1 | Required; lines 2 and 3 are optional. |
| City | Required. |
| Country | Required value from the country list. |
| Province, territory, state, or subdivision | Required. For Canada (`ca`), select a valid province or territory; for other countries, enter free text. The database also enforces the Canadian rule. |
| Postal or ZIP code | Required. |
| Main phone | Required numeric value; extension is an optional integer. |
| Federal riding ID | Required whole-number identifier for the federal electoral district. Use the district identifier supplied for the file. |
| GC address ID | Optional Government of Canada address identifier, if one has been supplied. |

You do not enter latitude or longitude in this tab. Integrations can supply those optional coordinates through the API.

## Record ownership and shared addresses

Saving a new address saves both its details and its connection to this Proponent together. The list shows only active addresses with an active connection to this profile.

An address may also be referenced by another proponent or an agreement. If another active record uses the address, the application blocks edits to protect that record. Review the other record and separate the addresses before trying again.

Deleting an address removes its connection to this Proponent from the active list while preserving history. The address itself is marked deleted only when no other active Proponent or agreement still uses it. There is no restore control in this tab; add the address again after an accidental deletion. Deleting it here does not delete an agreement or another proponent's link.

For example, record Harbour Community Services' mailing address as `125 Harbour Road`, `Halifax`, country Canada, province Nova Scotia, and postal code `B3H 2Y5`. Enter the main phone as digits, such as `9025550142`, and the federal riding identifier supplied for the file. If the organization later moves, edit this address; if an agreement also uses the same address record, the application blocks the edit until the shared address issue is resolved.

## Recovery

The application shows validation errors in the request language. Correct missing required fields or an invalid Canadian subdivision and retry. If the address is reported as shared, do not repeatedly overwrite it; resolve the other active reference or add a distinct address. Refresh after a concurrent change or a not-found response.

## Related guides

- [Proponent profiles](./index.md)
- [Contacts](./contacts.md)
- [Agreements](./agreements.md)

## Exact values and partial updates

Each street, city, subdivision, and postal field accepts up to 255 characters and rejects the NUL control character. When copying a long phone number or GC address ID, preserve every digit. A spreadsheet can round long numbers.

For integrations, the main phone and optional GC address ID are decimal strings that preserve signed PostgreSQL bigint values. Do not convert them to JavaScript numbers. The phone extension is a signed small integer and the riding ID is a signed 32-bit integer. API coordinates must fit `numeric(10,7)`.

When you change the country or subdivision, the application checks that the two values are valid together. For example, changing the country to Canada while retaining an invalid subdivision fails until a valid province or territory is supplied. Sending unchanged physical values does not count as modifying a shared address.
