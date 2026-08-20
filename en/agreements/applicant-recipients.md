# Agreement Proponents

The **Proponents** tab links saved applicant-recipient profiles to one agreement. The database and API call these records agreement applicant recipients; the agreement workspace presents them as proponents.

## Access and list behaviour

Agreement read access lists active links to active proponent profiles. The table shows the profile’s bilingual legal name, falling back to operating name, and its active lead agency when available. Search matches the link ID, legal or operating name in either language, and lead-agency name.

| Agreement access | Available actions |
| --- | --- |
| `read` | View, search, and page through links. |
| `create` | Add a link. |
| `update` | Replace the profile on an existing link. |
| `delete` | Remove a link by soft deletion. |

Reading links requires Agreement Viewer. Adding/replacing requires Contributor plus the exact Agreement assignment; removal requires Manager plus that assignment. The selected Proponent is a separate boundary and must be readable through `applicant_recipient` Viewer. An Agreement assignment does not grant Proponent access.

## Create-time selection

The new-Agreement form requires at least one Proponent and rejects duplicate IDs. Its selector exposes only active profiles readable through the caller's global or lead-agency Proponent Viewer scope. Selected IDs are hydrated separately so labels survive paging/search; an unresolved saved profile is marked unavailable.

Creation locks every selected profile and rechecks read access in the same transaction that inserts the agreement and links. If any profile becomes inactive or inaccessible, the entire creation fails.

## Add, replace, and remove links

On a saved agreement, **Add** uses a lookup filtered by both the requested agreement action and the caller’s current Proponent read visibility. Editing changes only the profile referenced by that link. Every write locks the agreement, rebuilds agreement authorization, then locks and revalidates a newly selected proponent. A link ID from another agreement is treated as not found.

Removing a link soft-deletes the relationship; it does not delete the agreement or proponent. The tab has no restore action. Add a new link after an accidental removal.

::: warning Post-creation cardinality
The create wizard requires one or more unique proponent IDs, but later child routes do not preserve that invariant. The current source has no last-link guard and no active unique constraint on agreement-plus-proponent. An authorized user can remove the final link or add the same proponent more than once. Check the table before adding, and do not remove the last meaningful proponent unless an unlinked agreement is intentional.
:::

## Downstream effects

Agreement activities use active linked proponents as responsible-party choices. The proponent’s Funding History and Agreements views also derive system relationships from active links. Removing a link can therefore remove those projections and lookup choices, while historical agreement child records remain subject to their own constraints.

## Related guides

- [Agreement overview](./index.md)
- [Activities](./activities.md)
- [Proponent profiles](../proponents/index.md)
