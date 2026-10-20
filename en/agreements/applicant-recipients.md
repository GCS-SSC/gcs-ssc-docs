# Agreement proponents

Use **Proponents** to link saved proponent profiles to an agreement.

## Access and list behaviour

With read access to the agreement, you can see its linked proponent profiles, including profiles that have become inactive. Deleted links and deleted profiles do not appear. The table shows each profile's bilingual legal name, or its operating name if no legal name is available. It also shows the saved lead-agency name when available. Search matches the link ID, legal or operating name in either language, and lead-agency name.

| Required agreement access | Available actions |
| --- | --- |
| Viewer | View and search linked profiles. |
| Contributor and assignment to this agreement | Add a link or change its profile, recipient subtype, or financial ID. |
| Manager and assignment to this agreement | Remove a link while preserving its history. |

You also need separate Viewer access to proponents to read the selected profile. An agreement assignment does not grant that access.

## Create-time selection

When creating an agreement, select at least one proponent. You cannot select the same profile twice. The selector shows only active profiles you can read with global Viewer access to proponents or Viewer access in an active agency. Selected profiles keep their displayed labels when you search or change pages. A saved profile that the system can no longer load is marked unavailable.

When you save, the application rechecks your read access and prevents other changes to the selected profiles until the save finishes. It saves the agreement and its links together. If a selected profile has become inactive or inaccessible, none of the new Agreement is saved.

For each linked proponent, choose a recipient subtype allowed by the agreement's stream. This describes the proponent's role in this agreement. It does not change the proponent profile. When the same Proponent has a prior active link in this Stream, the lookup suggests that saved type. The Stream's **Require consistent Proponent type** setting fixes the type to that previous eligible choice; otherwise an authorized user can choose another eligible type. A single eligible type is suggested when there is no previous choice. The server checks the selected type again on creation or replacement. A deleted or no-longer-eligible type is not offered for new work; resolve the Stream mapping rather than editing the Proponent profile.

## Required agency financial ID

For each linked proponent, select a saved **Agency Financial ID** belonging to the linked Proponent and the Agreement's owning Agency. New or replacement selections must be active and not deleted; an ID with no Agency or another Agency is invalid. The saved selection remains readable and may be retained when its source is later retired. Choosing a different Proponent requires an ID belonging to that new profile.

For example, a Proponent tracked by Agency A can link to an Agency B Agreement using its active B Financial ID. An A ID does not satisfy the B relationship. If no choice appears, an assigned Proponent worker must create or activate the correct B ID, then reload the Agreement selector. An Agreement assignment alone cannot edit the Proponent's IDs. Related financial records use this saved financial ID. Correct an invalid ID at its source rather than choosing another ID to bypass the error.

## Add, replace, and remove links

For example, to add a second delivery partner, select its readable active profile, an eligible recipient subtype, and its Agency Financial ID for this Agreement's Agency. Save and check that both partners appear in the list. Each profile can have only one active link to this Agreement.

On a saved agreement, **Add** shows profiles that your agreement permission and current proponent read access allow you to select. Editing can change the linked profile, recipient subtype, or financial ID; the server rechecks a changed subtype against the Stream's eligible mappings and consistency setting. The application checks your current assignment, the agreement status, and the selected proponent before saving. If access or status changes, reload the agreement and check that you can still work on it.

Removing a link preserves its history. It does not delete the agreement or proponent. The tab has no restore action. Add a new link after an accidental removal.

## Retained references and activity protection

An existing link retains its saved Proponent label even when the Proponent's lead Agency is later deleted. You can keep that saved selection during other edits. Choosing a different Proponent rechecks the new profile, its owner and your read scope.

The Proponent's lead Agency does not need to match the Agreement's owning Agency. For example, a program can fund a readable Proponent led by another agency. You still need access and assignment to the agreement, plus permission to read the proponent in the shared catalogue.

You cannot replace or remove a linked proponent while activities, claims, payments, or accounts receivable use the link. The application returns `AGREEMENT_APPLICANT_RECIPIENT_IN_USE` with status 409. Check the records that use the link before retrying. Update an activity's responsible party in the current agreement or amendment, as appropriate. You cannot add the same proponent twice to one agreement.

After creation, the system does not require you to keep one link. Although the wizard requires at least one Proponent, an authorized deletion can leave no links when none are in use. Do not remove the last meaningful Proponent unless an unlinked Agreement is intentional.

## Downstream effects

Agreement activities use active linked proponents as responsible-party choices. The proponent's Funding History and Agreements views also derive system relationships from active links. Removing a link can remove the proponent from these views and choices. Historical records keep their own rules for retained links.

## Related guides

- [Agreement overview](./index.md)
- [Activities](./activities.md)
- [Proponent profiles](../proponents/index.md)
