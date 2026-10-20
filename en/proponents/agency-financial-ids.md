# Proponent Agency Financial IDs

Use **Agency Financial IDs** when an agency gives the recipient a number in its financial or grants system. Open **Proponents**, select the profile, then choose **Agency Financial IDs**. Add the agency and its number here so they can be selected when linking this Proponent to an Agreement. The table supports search, pagination, create, edit and deletion according to your profile permissions.

For example, the same association can have number `12345` at Agency A and `67890` at Agency B. Record them as separate IDs. For an Agency B Agreement, select the B ID. A financial ID is separate from a business number, which belongs under **Registries**.

An **exact assignment** means you are listed under **Assigned users** for this profile. **Soft deletion** removes a record from current lists while keeping its history.

## Fields

| Field | Rule |
| --- | --- |
| Agency | Optional. When supplied, it must reference an active agency. The selector lists active Agencies if you have permission to add or edit an ID for this Proponent. |
| Active | On by default. Only active, non-deleted IDs are available for new Agreement selections. |
| Financial system ID | Required whole number between `-9223372036854775808` and `9223372036854775807`. Enter digits without spaces or separators, and include a minus sign only if it is part of the issued number. |

You can save an ID without an Agency. Select the Agency when it issued the identifier so staff can identify its source.

For example, enter `9007199254740993` exactly. This is an external system identifier, so negative values are also accepted. An unchanged, non-deleted Agency reference may be retained after that Agency becomes inactive; selecting a different Agency requires an active one.

Enter the number exactly as issued. This field records an identifier, not an amount of funding.

## Uniqueness and lifecycle

For one Proponent and Agency, you cannot save the same active financial system ID twice. When Agency is blank, duplicate IDs are allowed. Avoid them so staff can identify the correct record.

The agency is not required to be the Proponent's lead agency. Your access depends on your permissions and assignment to this Proponent, regardless of the selected Agency. Create and update reject a supplied deleted or unknown agency. An update validates all saved fields together. Deletion removes the ID from active search and allows the same combination to be used again, while preserving history.

Viewer access to the Proponent allows you to read its IDs. Contributor plus assignment to this exact profile allows you to add or edit them; Manager plus that assignment allows deletion. The server checks these permissions again while saving. You cannot edit an ID belonging to a different profile by changing the URL.

## Agreement selections and retirement warnings

Each [Agreement–Proponent relationship](../agreements/applicant-recipients.md) must select an active saved Financial ID of that Proponent belonging to the Agreement Agency. A blank-Agency ID can be stored here but cannot satisfy that relationship. The selected source ID is retained, independently of the external number displayed to staff.

Once an Agreement relationship references an ID, its Agency, Proponent and external financial-system number cannot change while the reference remains, including historical relationships. Create a replacement ID and move eligible Agreement selections instead of repurposing an identity. A retained selection can remain readable after disabling or logically deleting its source.

Before you disable or delete an ID, GCS-SSC checks which Agreements still use it and have not reached a final state. If any exist, a warning lists them. Review those uses before confirming. You can confirm retirement while keeping the existing Agreement relationships. Another Agreement may select the ID between the warning and your save. If you cannot read an Agreement, the warning shows only limited number and title information, without its internal ID or a detail link. If loading uses fails, retry rather than treating it as no uses. Cancel leaves the ID unchanged.

For example, retiring Agency B's ID `"9007199254740993"` removes it from new B Agreement choices, while a saved B relationship still shows its retained selection. Changing that ID's number would rewrite identity and is rejected; create a separate source record when the number truly changes.

## Search and recovery

Search matches the financial system ID and either localized agency name. In the Agency selector, you can also search by the exact Agency ID. Add, edit, and delete actions may appear based on your role. Opening or saving an action checks your current profile assignment again. A deleted agency is not displayed as an active list row. If the selector is empty or a save fails, confirm that the parent Proponent still exists, your role and assignment to this profile allow the change, and the agency is active. If the identifier is genuinely agency-owned, do not work around an invalid agency by clearing the field; restore or select the correct agency.

Use [Registries](./registries.md) for business numbers, CRA program accounts, NAICS, and other external registry identifiers.
