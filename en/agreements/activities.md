# Agreement activities

Use the **Activities** tab on an agreement to describe the work, schedule, expected results, related program outcomes, and responsible proponents. Activities are records inside the agreement. They do not have separate detail pages.

## Access and prerequisites

You must be able to read the agreement to see its activities. Contributor access plus assignment to this agreement allows you to add or edit activities; Manager access plus that assignment is required to delete them. The agreement must also allow changes. A read-only or terminal status, completion, or approval protection can block an action.

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

For example, for a community training project, an activity could be "Deliver six workshops" / "Offrir six ateliers". Describe the sessions and participants, set the delivery dates, and enter a measurable expected result such as "60 participants complete training" / "60 participants terminent la formation". Select an available program outcome and the linked proponent delivering the workshops.

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
| Responsible parties | At least one proponent linked to this agreement. Neither the link nor the proponent can be deleted. The proponent profile can be inactive. |

The outcome and responsible-party pickers support search and multiple selection. If there is exactly one available responsible party when a new form loads, the interface selects it automatically; you can still change the selection. An empty lookup disables its selection button and indicates that no choice is available.

Changing the interface language changes the names you see. It does not translate the saved text. Complete each English and French field separately.

## Listing and search

The table shows the activity name, description, and expected results in the current language. It also shows start and end dates and labels for outcomes and responsible parties. It is paginated. Search matches the activity ID; English or French name, description, or expected results; outcome names; and proponent legal or operating names. It does not search the displayed dates.

The list and labels exclude deleted outcome links, deleted agreement-proponent links, and deleted proponents.

## Validation, concurrency, and recovery

When you save, the application checks your agreement access again and verifies your selections. Each outcome must still belong to the agreement's program, and each responsible party must still be linked to this agreement. A deleted choice or one belonging to another program or agreement is rejected with an error in the current language.

For example, if a colleague removes a proponent link while you are entering an activity, saving with that responsible party can fail. Keep your draft text, reload the agreement, and choose a currently available responsible party.

The activity and all its selections are saved together. If part of the save fails, none of those changes is saved. Removing a selected outcome or responsible party preserves the old link in history; selecting it again restores that link when possible. Checks also prevent invalid date ranges, links to another agreement or activity version, and duplicate active links to the same outcome or responsible party.

If someone changes your access or the available choices before you save, reload the agreement and reopen the form. Saving without changing any fields leaves the activity unchanged. When you change only one date, the other saved date still applies. The start cannot be later than the existing end.

## Delete and version behaviour

Confirm deletion to remove the activity and its outcome and responsible-party links from normal lists. The application keeps their history. There is no restore action in the Activities tab. If you delete an activity by mistake, contact an administrator.

The normal Activities tab shows the agreement's current working version, created automatically with the agreement. Changes prepared within an amendment use a separate saved copy and amendment activity controls. They do not immediately change the ordinary Activities tab. Approved revisions keep a record of which version they came from. See [Funding agreements](./index.md) for the agreement tab map.

Saving an activity does not start an approval, review, completion, or workflow.

## Related guides

- [Funding agreements](./index.md)
- [Agreement proponents](./applicant-recipients.md)
- [Programs and outcomes](../programs/index.md)
