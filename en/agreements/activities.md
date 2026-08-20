# Agreement activities

Use the **Activities** tab on an agreement to describe the work, schedule, expected results, related program outcomes, and responsible proponents. Activities are records inside the agreement; they do not have separate detail pages.

## Access and prerequisites

The agreement must exist and be visible through your exact Agreement scope. `read` lists activities, `create` adds them, `update` changes them, and `delete` removes them. The server checks the requested permission against the agreement and deliberately returns the same not-found response when the agreement is absent or inaccessible.

Before creating an activity:

- configure the outcomes on the agreement's transfer payment program;
- link every intended responsible proponent on the agreement's **Proponents** tab; and
- make sure your Agreement role ceiling and exact Agreement assignment permit the mutation.

Outcome and responsible-party lookups use the same `create` or `update` action as the form being opened. They cannot be used to bypass the agreement permission check.

## Add or edit an activity

The tab opens a full-screen form. Every field below is required.

| Field | Rule |
| --- | --- |
| English name | Non-empty; maximum 255 characters. |
| French name | Non-empty; maximum 255 characters. |
| Start date | Required date. |
| End date | Required date and must be on or after the start date. |
| English description | Non-empty text. |
| French description | Non-empty text. |
| English expected results | Non-empty text. |
| French expected results | Non-empty text. |
| Related outcomes | At least one unique, active outcome belonging to the agreement's program. |
| Responsible parties | At least one unique, active agreement-proponent link whose proponent is also active. |

The outcome and responsible-party pickers support server-side search and multiple selection. If there is exactly one available responsible party when a new form loads, the interface selects it automatically; you can still change the selection. An empty lookup disables its selection button and indicates that no choice is available.

Changing the locale changes displayed names, not the stored English and French values. Both language fields must be supplied independently.

## Listing and search

The table shows the localized activity name and description, start and end dates, localized expected results, outcome badges, and responsible-party badges. It is paginated. Search matches the activity ID; English or French name, description, or expected results; outcome names; and proponent legal or operating names. It does **not** search the displayed dates.

Inactive outcome links, inactive agreement-proponent links, and deleted proponents are omitted from list results and badges.

## Validation, concurrency, and recovery

The server rechecks the exact agreement scope inside the write transaction after locking the established agreement and scope rows. It then verifies that every selected outcome still belongs to the agreement's program and every responsible-party ID still belongs to this agreement. Stale, deleted, foreign-program, or foreign-agreement choices are rejected with a localized validation/API error.

Selection changes are synchronized transactionally. Removed links are soft-deleted; selecting the same outcome or responsible party later restores its existing link when possible. Partial failures roll back the activity and its selections together. The database also enforces the date range, agreement/version ownership, and one active link per activity/outcome and activity/responsible-party pair.

If another writer changes access or related configuration before save, reload the agreement and reopen the form. An empty patch leaves the activity unchanged and returns its current values.

## Delete and version behaviour

Deleting an activity asks for confirmation and soft-deletes the activity plus its outcome links. Responsible-party links become invisible because their parent activity is deleted, but the core delete route does not separately mark those rows deleted. There is no restore action in the Activities tab; recovery requires an authorized administrative/data operation.

The normal Activities tab reads and edits only the agreement's single current working activity version. Creating an agreement creates that working version automatically. Amendment preparation uses a separate snapshot and amendment-specific activity routes; it does not silently edit the current tab's rows. Approved revision checkpoints retain their version provenance. See [Funding agreements](./index.md) for the agreement tab map.

Activities do not themselves start an approval, review, completion, or workflow.

## Related guides

- [Funding agreements](./index.md)
- [Agreement proponents](./applicant-recipients.md)
- [Programs and outcomes](../programs/index.md)
