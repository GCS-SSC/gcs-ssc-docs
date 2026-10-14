# Proponent Agency Financial IDs

Use **Agency Financial IDs** when an agency gives the recipient a number in its financial or grants system. Open **Proponents**, select the profile, then choose **Agency Financial IDs**. Add the agency and its number here so they can be selected when linking this Proponent to an Agreement. The table supports search, pagination, create, edit and deletion according to your profile permissions.

For example, the same association can have number `12345` at Agency A and `67890` at Agency B. Record them as separate IDs. For an Agency B Agreement, select the B ID. A financial ID is separate from a business number, which belongs under **Registries**.

An **exact assignment** means you are listed under **Assigned users** for this profile. A **role ceiling** is the highest action your role permits. **Soft deletion** removes a record from current lists while keeping its history.

## Fields

| Field | Rule |
| --- | --- |
| Agency | Optional. When supplied, it must reference an active agency. The lookup lists active agencies after authorizing the requested create or update action on the parent Proponent. |
| Active | On by default. Only active, non-deleted IDs are available for new Agreement selections. |
| Financial system ID | Required canonical integer text in the PostgreSQL `bigint` range, `-9223372036854775808` through `9223372036854775807`. The UI uses text input to preserve precision; API clients should send a string. Numeric JSON input is accepted only when it is a safe integer. |

Because Agency is optional in the current source contract, an unscoped financial ID can be recorded. Prefer selecting an agency whenever the identifier is agency-owned so its provenance remains clear.

For example, send `"9007199254740993"` exactly; converting it to a JavaScript number loses precision. This field identifies an external system record and does not inherit the positive-only rule for application entity IDs. An unchanged, non-deleted Agency reference may be retained after that Agency becomes inactive; selecting a different Agency requires an active one.

Enter the number exactly as issued, without spaces or separators. “Canonical integer text” means a whole-number string in the required standard format. The large range above allows IDs used by external systems; it is not an amount of funding.

## Uniqueness and lifecycle

For one Proponent and Agency, you cannot save the same active financial system ID twice. If Agency is blank, the database does allow duplicates because it treats blank (`NULL`) Agency values as distinct. Avoid these duplicates: they make it harder to identify the correct record.

The agency is not required to be the Proponent's lead agency. Access is enforced against the exact parent Proponent, not inferred from the selected agency. Create and update reject a supplied deleted or unknown agency. Updates merge and validate the complete row; deletion sets `_deleted = true`. A soft-deleted row disappears from active search and no longer participates in the partial uniqueness index, while historical data remains.

Viewer access to the Proponent allows you to read its IDs. Contributor plus assignment to this exact profile allows you to add or edit them; Manager plus that assignment allows deletion. The server checks these permissions again while saving. You cannot edit an ID belonging to a different profile by changing the URL.

## Agreement selections and retirement warnings

Each [Agreement–Proponent relationship](../agreements/applicant-recipients.md) must select an active saved Financial ID of that Proponent belonging to the Agreement Agency. A blank-Agency ID can be stored here but cannot satisfy that relationship. The selected source ID is retained, independently of the external number displayed to staff.

Once an Agreement relationship references an ID, its Agency, Proponent and external financial-system number cannot change while the reference remains, including historical relationships. Create a replacement ID and move eligible Agreement selections instead of repurposing an identity. A retained selection can remain readable after disabling or logically deleting its source.

Disabling or deleting an ID first loads its nonterminal Agreement uses and shows a warning. Review those uses before confirming. The warning is not an absolute deletion prohibition: confirmation may retire the source while preserving relationships. It is not an atomic promise that no new use can appear between the warning and save. An unreadable Agreement supplies minimal number/title context but no detail link or ID. If loading uses fails, retry rather than treating it as no uses. Cancel leaves the ID unchanged.

For example, retiring Agency B's ID `"9007199254740993"` removes it from new B Agreement choices, while a saved B relationship still shows its retained selection. Changing that ID's number would rewrite identity and is rejected; create a separate source record when the number truly changes.

## Search and recovery

Search matches the financial system ID and either localized agency name. A deleted agency is not displayed as an active list row. If the selector is empty or a save fails, confirm that the parent Proponent still exists, your role ceiling and exact assignment permit the mutation, and the agency is active. If the identifier is genuinely agency-owned, do not work around an invalid agency by clearing the field; restore or select the correct agency.

Use [Registries](./registries.md) for business numbers, CRA program accounts, NAICS, and other external registry identifiers.
