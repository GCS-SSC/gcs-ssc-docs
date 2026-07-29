# Agreement Addresses

The Addresses tab links agreement-specific address types to common address records. Each address row is an agreement child record plus a linked `Common_Address` record.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Agency address types | The address type lookup returns active address types available to the agreement context. |
| Country and jurisdiction enums | Canadian addresses require a valid jurisdiction enum value. Non-Canadian subdivisions are free text. |
| Agreement CRUD permissions | `create` adds an address and loads create lookups, `update` edits an existing address and its lookups, and `delete` soft-deletes it. |

## Page flow

The tab shows agreement addresses and opens a modal for create and edit. The address type field only offers active address types that are valid for the agreement.

The list shows address type, street line 1, city, and postal or ZIP code. Address type is bilingual.

## Fields

| Field | Notes |
| --- | --- |
| Address type | Required. Must be a configured agency address type valid for the agreement. |
| Street 1 | Required common address field. |
| Street 2 and street 3 | Optional common address fields. |
| City | Required. |
| Country | Required country enum. |
| Subdivision | Required. For Canada, it must be one of the jurisdiction enum values. For other countries, it is entered as text. |
| GC address id | Optional numeric field. |
| Federal riding id | Optional numeric field. |
| Main phone and extension | Optional numeric fields. |
| Postal code or ZIP code | Required. |

## Business rules

| Rule | Behaviour |
| --- | --- |
| Address type is validated before save | Users can only save an address type that is valid for the agreement. |
| Address details and agreement link are saved together | A new row creates both the address details and the agreement-specific address link. |
| Updates can change both address type and address details | Editing an address can update the agreement address type and the address fields. |
| Delete is a soft delete | Deleted agreement addresses disappear from normal lists but remain available for historical integrity. |
| Canadian subdivisions are constrained | Canadian addresses require a valid province or territory. |

## Dependencies

Addresses do not drive the financial child workflows directly. They depend on agency reference data and the common address schema. They are useful for agreement administration, correspondence, and reporting where the implementation reads agreement addresses.
