# Proponent Addresses

The Addresses tab stores address records for the proponent. Use it for mailing, operating, headquarters, or other addresses required by agency process.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| Proponent profile | Addresses belong to a saved profile. |
| Country and province/territory reference data | Canadian addresses use a controlled province/territory selection. |
| Address business convention | Decide when to use mailing, physical, headquarters, or other address types consistently. |

## Fields

| Field | Rule |
| --- | --- |
| Street lines | Street 1 is required; street 2 and street 3 are optional. |
| City | Required. |
| Country | Required. |
| Province, territory, state, or subdivision | Required. Canadian addresses use the controlled Canadian jurisdiction list; other countries use free text. |
| Postal or ZIP code | Required. |
| Phone and extension | Optional. |
| GC address ID and federal riding ID | Optional administrative identifiers. |

## Business Rules

| Rule | Behaviour |
| --- | --- |
| Address belongs to the proponent | Do not enter agreement-specific addresses here unless they identify the proponent itself. |
| Canadian subdivision is controlled | Use the standard province or territory value for Canada. |
| Non-Canadian subdivision is free text | Enter the appropriate state, province, region, or equivalent. |
| Deletes are soft deletes | Removed addresses disappear from active lists but remain available for audit. |

## Operating Guidance

Keep the most current mailing and operating addresses active. If an address changes, update the existing address when it represents a correction; add a new address when it represents a distinct business location.
