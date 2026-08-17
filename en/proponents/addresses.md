# Proponent Addresses

Use the **Addresses** tab for the proponent’s mailing, operating, headquarters, or other organizational locations. Agreement-specific address records are managed separately on an agreement.

Open **Proponents**, select a saved profile, and choose **Addresses**. The active list shows street line 1, city, and postal or ZIP code. Search matches city, subdivision, postal or ZIP code, and any of the three street lines.

## Access and actions

| Effective access to the proponent | Available actions |
| --- | --- |
| Read-only access | View, search, and page through active addresses. |
| Contributor access | View and add addresses. |
| Full access | View, add, edit, and delete addresses. |
| No access | The server refuses the request. |

Global proponent privileges and an exact Proponent Team assignment can provide access. Child actions use the corresponding `read`, `create`, `update`, or `delete` permission. Writes lock the profile and re-evaluate authorization inside the transaction.

## Fields and validation

| Field | Rule |
| --- | --- |
| Street line 1 | Required; lines 2 and 3 are optional. |
| City | Required. |
| Country | Required value from the country list. |
| Province, territory, state, or subdivision | Required. For Canada (`ca`), select a valid province or territory; for other countries, enter free text. The database also enforces the Canadian rule. |
| Postal or ZIP code | Required. |
| Main phone | Required numeric value; extension is an optional integer. |
| Federal riding ID | Required integer. |
| GC address ID | Optional numeric identifier. |

The service contract also supports optional latitude and longitude, although the current tab form does not expose those two fields.

## Record ownership and shared addresses

Adding an address creates a common address row and a link to the proponent in one transaction. A link always belongs to exactly one parent profile, and only active links to active common addresses appear.

An address may also be referenced by another proponent or an agreement. To avoid silently changing another record, the server refuses an edit when another active reference exists. Review the other record and separate the addresses before trying again.

Deleting an address always soft-deletes this proponent’s link. The common address is also soft-deleted only when no other active proponent or agreement still refers to it. There is no restore control in this tab; add the address again after an accidental deletion. Deleting it here does not delete an agreement or another proponent’s link.

## Recovery

Validation errors are returned in the request language. Correct missing required fields or an invalid Canadian subdivision and retry. If the address is reported as shared, do not repeatedly overwrite it; resolve the other active reference or add a distinct address. Refresh after a concurrent change or a not-found response.

## Related guides

- [Proponent profiles](./index.md)
- [Contacts](./contacts.md)
- [Agreements](./agreements.md)
