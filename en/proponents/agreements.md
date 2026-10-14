# Proponent Agreements

Use the **Agreements** tab to find the active GCS-SSC agreements linked to a proponent. Open **Proponents**, select the profile, and choose **Agreements**. Open an agreement from this list to work on its recipients or move it through its lifecycle.

## Visibility and navigation

You need Proponent Viewer access to open the tab. You also need Agreement Viewer access for each agreement you want to see, through your global, agency, or program permissions. Agreements outside that access are left out of this list. An assignment to the proponent alone does not give you access to all its agreements.

The table shows agreement number, bilingual title, program, stream, agreement type, and an open action. Search matches agreement number; English or French title; program, stream, or agency name; and agreement-type name. Results include only active links and active agreement, stream, program, agency, subtype, and agreement-type records.

Select the bilingual title or arrow action to open the agreement. Access is checked again by the destination API; visibility on this tab does not grant broader agreement rights.

The list supports **All**, **Mine** and Agency views. Mine filters by your exact Agreement assignments; an Agency view filters by the Agreement’s program-owning Agency. Neither view widens Agreement read access. This differs from the Proponent list’s Agency view, which follows Agency financial-ID relationships.

For example, a community organization may have one agreement for youth programming and another for building repairs. Search its profile’s Agreements tab by the project title or agreement number, then open the correct agreement. If you are assigned only to the youth agreement, **Mine** helps you focus on that file; **All** still shows only agreements you are allowed to read.

## Create an agreement from the tab

The **New agreement** button appears when the client reports agreement-create permission in at least one scope. It opens the regular agreement wizard with this proponent already selected. This is a convenience, not an authorization shortcut: the chosen agency, program, and stream must still be within your create scope, and every server step validates the agreement contract.

Before creating an agreement, configure the agency, transfer-payment program and stream, agreement subtype, fiscal and reference data, and any required templates. A proponent may be linked to many agreements, and an agreement may have several proponents.

## Update or remove a relationship

This tab does not edit or delete agreements and does not remove recipient links. Open the agreement and use its **Proponents** area with the required agreement permissions. Removing a link does not delete the proponent profile or agreement; agreement deletion follows its own lifecycle and dependency rules.

If an expected Agreement is absent, confirm that the link and configuration records are active and that the `agreement` Viewer scope covers it. A Proponent assignment does not expand Agreement scope.

## Related guides

- [Proponent profiles](./index.md)
- [Funding history](./funding-history.md)
- [Proponent assigned users](./team.md)
