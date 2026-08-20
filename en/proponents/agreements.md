# Proponent Agreements

The **Agreements** tab is a relationship view of active GCS-SSC agreements linked to the selected proponent. Use it to find and open an agreement; manage recipients and agreement lifecycle data in the agreement workspace.

## Visibility and navigation

Opening the tab requires Proponent Viewer access. The server then applies Agreement visibility independently and returns only linked Agreements covered by the user's global, agency, or program Viewer scope; inaccessible records are omitted rather than masked.

The table shows agreement number, bilingual title, program, stream, agreement type, and an open action. Search matches agreement number; English or French title; program, stream, or agency name; and agreement-type name. Results include only active links and active agreement, stream, program, agency, subtype, and agreement-type records.

Select the bilingual title or arrow action to open the agreement. Access is checked again by the destination API; visibility on this tab does not grant broader agreement rights.

## Create an agreement from the tab

The **New agreement** button appears when the client reports agreement-create permission in at least one scope. It opens the regular agreement wizard with the current proponent supplied as a preselected query value. This is a convenience, not an authorization shortcut: the chosen agency, program, and stream must still be within your create scope, and every server step validates the agreement contract.

Before creating an agreement, configure the agency, transfer-payment program and stream, agreement subtype, fiscal and reference data, and any required templates. A proponent may be linked to many agreements, and an agreement may have several proponents.

## Update or remove a relationship

This tab does not edit or delete agreements and does not remove recipient links. Open the agreement and use its **Proponents** area with the required agreement permissions. Removing a link does not delete the proponent profile or agreement; agreement deletion follows its own lifecycle and dependency rules.

If an expected Agreement is absent, confirm that the link and configuration records are active and that the `agreement` Viewer scope covers it. A Proponent assignment does not expand Agreement scope.

## Related guides

- [Proponent profiles](./index.md)
- [Funding history](./funding-history.md)
- [Proponent assigned users](./team.md)
