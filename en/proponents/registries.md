# Proponent Registries

The **Registries** tab stores external identifiers for an existing Proponent. Open **Proponents**, select a profile, and choose **Registries**. The table supports search, pagination, create, edit, and soft deletion according to the profile permissions returned by the server.

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

## Uniqueness and lifecycle

An active `(registry type, number)` pair is unique across all Proponents, not only within one profile. A duplicate returns a localized conflict instead of disclosing or overwriting the other record. Soft-deleting a row removes it from active lists and from the partial uniqueness index, so the same pair can later be used by another active row. Historical deleted data remains stored.

Create, update, and delete first authorize the requested action against the exact parent Proponent. The write transaction then reloads and locks the parent authorization context before changing a child that must belong to that same Proponent. Moving a child by changing URL ids is not supported. A partial update is merged and revalidated as a complete registry record, so changing the type can also make the existing number or comment invalid.

## Search and recovery

Search matches number, registry type, and the Other comment. If an action is hidden, check your direct Proponent permission or exact Team level: `read_only` reads, `contributor` creates and updates, and `full_access` can also soft-delete. If a save fails, verify the type-specific format, supply an Other comment where required, and confirm that the active type/number pair is not already registered.

See [Proponents](./index.md), [Agency Financial IDs](./agency-financial-ids.md), and [Team](./team.md).
