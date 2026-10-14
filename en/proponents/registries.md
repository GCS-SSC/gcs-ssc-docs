# Proponent Registries

Use **Registries** to record identifiers issued by an external registry, such as a business number, or an industry classification code. Open **Proponents**, select the profile, then choose **Registries**. Choose the type that matches the identifier before entering its value. The table supports search, pagination, create, edit and deletion according to your profile permissions.

## Fields and formats

| Field | Rule |
| --- | --- |
| Registry type | Required. Choose the external registry represented by the value. |
| Number | Required text. Leading and trailing whitespace is removed. |
| Other comment | Shown and required only when Registry type is `other`; use it to identify the otherwise unnamed registry. |

Three registry types have exact numeric formats enforced in both request validation and PostgreSQL:

| Registry type | Required format |
| --- | --- |
| `federalbusinessnumber` | Exactly 9 digits |
| `craprogramaccountnumber` | Exactly 15 digits |
| `naics` | 2 to 6 digits |

Other enumerated registry types accept non-empty text without an additional pattern in the current contract. Do not add punctuation to one of the three numeric formats above.

For example, a federal business number such as `123456789` meets the nine-digit format; `123-456-789` does not. NAICS means North American Industry Classification System: a classification of the organization’s industry. A value such as `62` meets the allowed length. These examples illustrate format only; enter the organization’s actual identifier. For `other`, explain the registry in **Other comment**, such as “Municipal community organization register”.

## Uniqueness and lifecycle

The same registry type and number cannot be active on two Proponents. If you receive a duplicate error, check whether you chose the correct profile and identifier. The error does not reveal the other record or replace it. Deleting a row removes it from current lists and allows that type/number pair to be used again; the deleted history remains stored.

Your permission is checked against the Proponent whose profile you opened, and checked again while the server saves the change. The registry row must belong to that profile; changing URL identifiers cannot move it to another profile. When you edit the registry type, check the number and comment too: the system validates all the fields together, even if you changed only one. For example, changing a nine-digit business number to the CRA program account type requires a 15-digit value.

## Search and recovery

Search matches number, registry type, and the Other comment. Viewer reads; Contributor plus the exact Proponent assignment creates or updates; Manager plus that assignment can soft-delete. If a save fails, verify the role scope and assignment, the type-specific format, the required Other comment, and that the active type/number pair is not already registered.

See [Proponents](./index.md), [Agency Financial IDs](./agency-financial-ids.md), and [Assigned users](./team.md).
