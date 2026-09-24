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

Reading links requires Agreement Viewer. Adding/replacing requires Contributor plus the exact Agreement assignment; removal requires Manager plus that assignment. The selected Proponent is a separate boundary and must be readable through `applicant_recipient` Viewer. An Agreement assignment does not grant Proponent access.

## Create-time selection

The new-Agreement form requires at least one Proponent and rejects duplicate IDs. Its selector exposes only active profiles readable through the caller's global or lead-agency Proponent Viewer scope. Selected IDs are hydrated separately so labels survive paging/search; an unresolved saved profile is marked unavailable.

Creation locks every selected profile and rechecks read access in the same transaction that inserts the agreement and links. If any profile becomes inactive or inaccessible, the entire creation fails.

Each Agreement–Proponent link also requires a recipient subtype from the Agreement Stream’s eligible recipient mappings. This classification belongs to the relationship, not to the Proponent profile. When the same Proponent has a prior active link in this Stream, the lookup suggests that saved type. The Stream’s **Require consistent Proponent type** setting fixes the type to that previous eligible choice; otherwise an authorized user can choose another eligible type. A single eligible type is suggested when there is no previous choice. The server checks the selected type again on creation or replacement. A deleted or no-longer-eligible type is not offered for new work; resolve the Stream mapping rather than editing the Proponent profile.

## Add, replace, and remove links

On a saved agreement, **Add** uses a lookup filtered by both the requested agreement action and the caller’s current Proponent read visibility. Editing can change the linked profile, its recipient subtype, or both; the server rechecks a changed subtype against the Stream's eligible mappings and consistency setting. Every write locks the agreement, rebuilds agreement authorization, then locks and revalidates a newly selected proponent. A link ID from another agreement is treated as not found.

Removing a link soft-deletes the relationship; it does not delete the agreement or proponent. The tab has no restore action. Add a new link after an accidental removal.

## Retained references and activity protection

An existing link retains its saved Proponent label even when the Proponent’s lead Agency is later deleted. Saving the same reference is a no-op; it does not require replacing historical context with a currently eligible candidate. Choosing a different Proponent rechecks the new profile, its owner and your read scope.

The Proponent’s lead Agency does not need to match the Agreement’s owning Agency. For example, a program can fund a readable Proponent led by another Agency; each record keeps its own authorization boundary.

An active activity responsible-party link protects the Agreement–Proponent relationship. Replacing or deleting that relationship returns `AGREEMENT_APPLICANT_RECIPIENT_IN_USE` (409); first resolve the activity’s responsible-party reference through the appropriate current or Amendment workspace. Duplicate active Agreement–Proponent pairs are rejected by database uniqueness.

There is no last-link guard after creation. Although the wizard requires at least one Proponent, an authorized deletion can leave no links when none are in use. Do not remove the last meaningful Proponent unless an unlinked Agreement is intentional.


## Downstream effects

Agreement activities use active linked proponents as responsible-party choices. The proponent’s Funding History and Agreements views also derive system relationships from active links. Removing a link can therefore remove those projections and lookup choices, while historical agreement child records remain subject to their own constraints.

## Related guides

- [Agreement overview](./index.md)
- [Activities](./activities.md)
- [Proponent profiles](../proponents/index.md)
