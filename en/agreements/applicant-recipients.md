# Agreement Proponents

The **Proponents** tab links saved applicant-recipient profiles to one agreement. The database and API call these records agreement applicant recipients; the agreement workspace presents them as proponents.

## Access and list behaviour

Agreement read access lists non-deleted links to non-deleted Proponent profiles, including profiles that have since become inactive. The table shows the profile’s bilingual legal name, falling back to operating name, and its retained lead-agency name when available. Search matches the link ID, legal or operating name in either language, and lead-agency name.

| Agreement access | Available actions |
| --- | --- |
| `read` | View, search, and page through links. |
| `create` | Add a link. |
| `update` | Change the profile or its recipient subtype on an existing link. |
| `delete` | Remove a link by soft deletion. |

Reading links requires Agreement Viewer. Adding/replacing requires Contributor plus the exact Agreement assignment; removal requires Manager plus that assignment. You also need separate Proponent Viewer (`applicant_recipient`) access to read the selected profile. An Agreement assignment does not grant Proponent access.

## Create-time selection

The new-Agreement form requires at least one Proponent and rejects duplicate IDs. Its selector exposes only active profiles readable through the caller's global Proponent Viewer or Proponent Viewer in any active Agency. Selected profiles keep their displayed labels when you search or change pages. A saved profile that the system can no longer load is marked unavailable.

Before saving, the system locks each selected profile against competing changes and rechecks your read access. It saves the Agreement and its links together. If a selected profile has become inactive or inaccessible, none of the new Agreement is saved.

Each Agreement–Proponent link also requires a recipient subtype from the Agreement Stream’s eligible recipient mappings. This describes the Proponent’s role in this Agreement; it does not change the Proponent profile. When the same Proponent has a prior active link in this Stream, the lookup suggests that saved type. The Stream’s **Require consistent Proponent type** setting fixes the type to that previous eligible choice; otherwise an authorized user can choose another eligible type. A single eligible type is suggested when there is no previous choice. The server checks the selected type again on creation or replacement. A deleted or no-longer-eligible type is not offered for new work; resolve the Stream mapping rather than editing the Proponent profile.

## Required Agency Financial ID

Each relationship selects a saved **Agency Financial ID** belonging to the linked Proponent and the Agreement's owning Agency. New or replacement selections must be active and not deleted; an ID with no Agency or another Agency is invalid. The saved selection remains readable and may be retained when its source is later retired. Choosing a different Proponent requires an ID belonging to that new profile.

For example, a Proponent tracked by Agency A can link to an Agency B Agreement using its active B Financial ID. An A ID does not satisfy the B relationship. If no choice appears, an assigned Proponent worker must create or activate the correct B ID, then reload the Agreement selector. An Agreement assignment alone cannot edit the Proponent's IDs. The relationship supplies the retained financial identity for downstream records; do not replace it merely to hide a source validation error.

## Add, replace, and remove links

For example, to add a second delivery partner, select its readable active profile, an eligible recipient subtype, and its Agency Financial ID for this Agreement’s Agency. Save and check that both partners appear in the list. Each profile can have only one active link to this Agreement.

On a saved agreement, **Add** uses a lookup filtered by both the requested agreement action and the caller’s current Proponent read visibility. Editing can change the linked profile, its recipient subtype, or both; the server rechecks a changed subtype against the Stream's eligible mappings and consistency setting. Every write locks the agreement, rebuilds agreement authorization, then locks and revalidates a newly selected proponent. A link ID from another agreement is treated as not found.

Removing a link soft-deletes the relationship; it does not delete the agreement or proponent. The tab has no restore action. Add a new link after an accidental removal.

## Retained references and activity protection

An existing link retains its saved Proponent label even when the Proponent’s lead Agency is later deleted. Saving the same reference is a no-op; it does not require replacing historical context with a currently eligible candidate. Choosing a different Proponent rechecks the new profile, its owner and your read scope.

The Proponent’s lead Agency does not need to match the Agreement’s owning Agency. For example, a program can fund a readable Proponent led by another Agency; Agreement scope and exact assignment still apply, while Proponent profile read access follows the shared catalog rule.

Active activity responsible-party links, Claims, Payments and Account Receivables protect the Agreement–Proponent relationship. Replacing or deleting that relationship returns `AGREEMENT_APPLICANT_RECIPIENT_IN_USE` (409); first resolve the activity’s responsible-party reference through the appropriate current or Amendment workspace. Duplicate active Agreement–Proponent pairs are rejected by database uniqueness.

After creation, the system does not require you to keep one link. Although the wizard requires at least one Proponent, an authorized deletion can leave no links when none are in use. Do not remove the last meaningful Proponent unless an unlinked Agreement is intentional.


## Downstream effects

Agreement activities use active linked proponents as responsible-party choices. The proponent’s Funding History and Agreements views also derive system relationships from active links. Removing a link can therefore remove those projections and lookup choices, while historical agreement child records remain subject to their own constraints.

## Related guides

- [Agreement overview](./index.md)
- [Activities](./activities.md)
- [Proponent profiles](../proponents/index.md)
