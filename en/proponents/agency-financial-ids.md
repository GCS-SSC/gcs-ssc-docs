# Proponent Agency Financial IDs

The **Agency Financial IDs** tab maps an existing Proponent to an integer identifier used by an agency financial or grants system. Open **Proponents**, select a profile, and choose **Agency Financial IDs**. The table supports search, pagination, create, edit, and soft deletion according to the parent profile's permissions.

## Fields

| Field | Rule |
| --- | --- |
| Agency | Optional. When supplied, it must reference an active agency. The lookup lists active agencies after authorizing the requested create or update action on the parent Proponent. |
| Financial system ID | Required safe integer. It is stored in a PostgreSQL `bigint`; the current UI uses a numeric input. |

Because Agency is optional in the current source contract, an unscoped financial ID can be recorded. Prefer selecting an agency whenever the identifier is agency-owned so its provenance remains clear.

## Uniqueness and lifecycle

For rows with an agency, the active `(agency, Proponent, financial system ID)` tuple is unique. PostgreSQL treats `NULL` values as distinct in this index, so the database constraint does not prevent duplicate active tuples whose Agency is blank. Avoid such ambiguous duplicates operationally.

The agency is not required to be the Proponent's lead agency. Access is enforced against the exact parent Proponent, not inferred from the selected agency. Create and update reject a supplied deleted or unknown agency. Updates merge and validate the complete row; deletion sets `_deleted = true`. A soft-deleted row disappears from active search and no longer participates in the partial uniqueness index, while historical data remains.

Every mutation rechecks the parent Proponent and the requested child permission inside a fresh-authorized transaction. The child id must belong to the parent id in the URL. `read_only` Team access reads, `contributor` creates and updates, and `full_access` can also delete.

## Search and recovery

Search matches the financial system ID and either localized agency name. A deleted agency is not displayed as an active list row. If the selector is empty or a save fails, confirm that the parent Proponent still exists, your Team/direct permission permits the action, and the agency is active. If the identifier is genuinely agency-owned, do not work around an invalid agency by clearing the field; restore or select the correct agency.

Use [Registries](./registries.md) for business numbers, CRA program accounts, NAICS, and other external registry identifiers.
