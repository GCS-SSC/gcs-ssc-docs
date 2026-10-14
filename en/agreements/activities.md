# Agreement activities

Use the **Activities** tab on an agreement to describe the work, schedule, expected results, related program outcomes, and responsible proponents. Activities are records inside the agreement; they do not have separate detail pages.

## Access and prerequisites

You must be able to read the agreement to see its activities. Contributor access plus assignment to this agreement allows you to add or edit activities; Manager access plus that assignment is required to delete them. The permissions are called `read`, `create`, `update`, and `delete`. If the agreement does not exist or you cannot access it, the application gives the same not-found response.

Before creating an activity:

- configure the outcomes on the agreement's transfer payment program;
- link every intended responsible proponent on the agreement's **Proponents** tab; and
- make sure you have Contributor or higher access and are assigned to this agreement.

The available outcomes and responsible parties are checked using the same create or edit permission as the form. If a choice is missing, confirm that it is configured or linked to this agreement and that you have the required access.

## Add or edit an activity

1. Open **Activities** on the agreement and choose to add an activity or edit an existing one.
2. Describe the work and expected results in both languages, and enter its start and end dates.
3. Select the program outcomes this work supports and the agreement proponents responsible for it.
4. Save, then check the activity in the list.

For example, for a community training project, an activity could be “Deliver six workshops” / “Offrir six ateliers”. Describe the sessions and participants, set the delivery dates, and enter a measurable expected result such as “60 participants complete training” / “60 participants terminent la formation”. Select an available program outcome and the linked proponent delivering the workshops.

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
| Responsible parties | At least one unique, non-deleted Agreement–Proponent link whose Proponent has not been deleted. This reference check does not require the profile’s Active flag to remain on. |

The outcome and responsible-party pickers support server-side search and multiple selection. If there is exactly one available responsible party when a new form loads, the interface selects it automatically; you can still change the selection. An empty lookup disables its selection button and indicates that no choice is available.

Changing the locale changes displayed names, not the stored English and French values. Both language fields must be supplied independently.

## Listing and search

The table shows the localized activity name and description, start and end dates, localized expected results, outcome badges, and responsible-party badges. It is paginated. Search matches the activity ID; English or French name, description, or expected results; outcome names; and proponent legal or operating names. It does **not** search the displayed dates.

Deleted outcome links, deleted Agreement–Proponent links, and deleted Proponents are omitted from list results and badges.

## Validation, concurrency, and recovery

When you save, the application checks your agreement access again and verifies your selections. Each outcome must still belong to the agreement’s program, and each responsible party must still be linked to this agreement. A deleted choice or one belonging to another program or agreement is rejected with an error in the current language.

For example, if a colleague removes a proponent link while you are entering an activity, saving with that responsible party can fail. Keep your draft text, reload the agreement, and choose a currently available responsible party.

The activity and all its selections are saved together. If part of the save fails, none of those changes is saved. Removing a selected outcome or responsible party preserves the old link in history; selecting it again restores that link when possible. Checks also prevent invalid date ranges, links to another agreement or activity version, and duplicate active links to the same outcome or responsible party.

If someone changes your access or the available choices before you save, reload the agreement and reopen the form. Saving no field changes leaves the activity unchanged. When you change only one date, the other saved date still applies: the start cannot be later than the existing end. The activity information and its outcome and responsible-party labels are read together so the list is consistent.

## Delete and version behaviour

Deleting an activity asks for confirmation and soft-deletes the activity plus its outcome links. Responsible-party links become invisible because their parent activity is deleted, but the core delete route does not separately mark those rows deleted. There is no restore action in the Activities tab; recovery requires an authorized administrative/data operation.

The normal Activities tab shows the agreement’s current working version, created automatically with the agreement. Changes prepared within an amendment use a separate saved copy and amendment activity controls. They do not immediately change the ordinary Activities tab. Approved revisions keep a record of which version they came from. See [Funding agreements](./index.md) for the agreement tab map.

Activities do not themselves start an approval, review, completion, or workflow.

## Related guides

- [Funding agreements](./index.md)
- [Agreement proponents](./applicant-recipients.md)
- [Programs and outcomes](../programs/index.md)
