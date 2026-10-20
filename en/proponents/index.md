# Proponents

Use **Proponents** to find or create the organization applying for or receiving funding. Keep its names, contact details and identifiers in one profile, then link that profile to each relevant Agreement. You can create the profile before an Agreement exists and review it separately.

For example, a community association receiving funding under two Streams can use one profile linked to two Agreements. Choose its recipient type separately on each Agreement.

An assignment to this profile means you are listed under **Assigned users**. Assignment to one of its Agreements does not give you permission to edit the profile.

## Setup dependencies

| Dependency | Why it matters |
| --- | --- |
| Lead agency | New profiles require an active lead Agency for tracking. Profile access uses the shared Proponent catalog; notes have their own Agency boundary. |
| Agreement classification | Choose the recipient type when linking the Proponent to an Agreement, using the types allowed by that Agreement's Stream. The profile itself has no subtype field. |
| Scoped role permission | Creating a profile requires Proponent Contributor access globally or in any active Agency. That Agency need not be the selected lead Agency. |
| Exact assignment | Editing or deleting a saved profile requires assignment to that profile and the appropriate role. The creator becomes its primary assigned user. |
| Review setups | Reviews appear only when eligible review-set setups exist for proponent records. |
| Agreement setup | The Agreements tab becomes useful after programs, streams, agreement subtypes, and agreement permissions exist. |

## List page

The Proponents page supports search, status filtering, pagination, column controls, and row actions. A global Proponent Viewer grant or Proponent Viewer in any active Agency gives access to the shared profile catalog; reading does not require an exact assignment. Search matches identifiers, legal and operating names, and lead agency.

Create appears when you have Contributor access globally or in an active Agency. Edit and Delete can appear when your role permits them. Opening an edit or confirming deletion checks your current assignment to this profile. Editing requires Contributor plus that assignment; deletion requires Manager plus that assignment. Deletion removes the Proponent from ordinary active lists while preserving history. A profile still linked to an agreement or external funding record cannot be deleted. Review those links in **Agreements** and **Funding History**. Remove only links that no longer belong on the file, then retry.

Use the list's **All**, **Mine**, or Agency view to narrow the same authorized records. Mine requires an exact Proponent assignment. An Agency view includes profiles with an active, non-deleted Agency Financial ID for that Agency and requires the corresponding user Agency scope; it is not simply a filter on lead Agency. These views never grant additional reading rights.

For example, a profile led by Agency A can appear in an authorized Agency B view after it has a B financial ID. You still need Proponent read permission to see the profile. A link to a B Agreement alone does not make the profile appear in the B view.

## Create profile

The create page starts with **Active** off. Choose the lead Agency, then enter legal, operating, and research organization names and descriptions in both languages. After saving, enter registry identifiers and the North American Industry Classification System code, or NAICS code, in **Registries**.

| Rule | Behaviour |
| --- | --- |
| Lead agency is required | New profile creation requires an active tracking Agency; this field does not limit shared-catalog permissions. |
| Each main bilingual value requires at least one language | Legal name, operating name, and description each require an English or French value; supplying both supports full bilingual display. |
| Active flag | Defaults to false. Activate the profile when it is ready for operational selection; availability is separate from deletion. |
| Bilingual fields should be maintained together | Legal names, operating names, research organization names, and descriptions are displayed in the active language. |

## Detail workspace

The detail page has a collapsible summary and these tabs:

| Tab | Purpose |
| --- | --- |
| General | Core profile, identifiers, agency, status, names, and descriptions. |
| [Agency Financial IDs](./agency-financial-ids.md) | Agency-specific financial identifiers. |
| Registries | Business, charity, provincial, Indigenous, NAICS, and other registry identifiers with type-specific validation. |
| [Other Names](./other-names.md) | Alternate legal, operating, historical, or informal names. |
| [Addresses](./addresses.md) | Physical or mailing addresses. |
| [Contacts](./contacts.md) | People and communication details. |
| [Reviews](./reviews.md) | Review sets and assessment work. |
| [Agreements](./agreements.md) | Agreements linked to the proponent. |
| Notes | Agency-scoped bilingual working notes. |
| [Funding History](./funding-history.md) | GCS-SSC Agreements and summaries of external funding for the Proponent. |
| [Attachments](../concepts/attachments.md) | Supporting files owned by this exact Proponent. |
| [Assigned users](./team.md) | Users assigned to this profile. Changes require the assignment-management permission. |

Extension tabs can also appear when an enabled extension contributes a proponent tab.

## Proponent notes

The **Notes** tab holds bilingual working notes. Each note belongs to one Agency as well as this Proponent. Choose an active Agency for which you have Proponent create permission; the list shows only notes in Agencies you can currently read, even when the Proponent is linked to several Agencies. A note needs a subject and body in at least one language each, and subjects have a 255-character limit. Use both languages where needed. Readers can search the visible notes; creating, editing, and deleting require the corresponding Proponent permission and exact assignment plus the note Agency permission. The original Agency cannot be changed on edit.

For example, a Proponent led by Agency A may also have an Agency B financial ID. An Agency B user with suitable Proponent access can create a B note without exposing Agency A notes to B-only readers. If a note is missing, check the Agency grant before recreating it. If a save fails, preserve the draft, reload current permissions and profile state, and retry. Deletion removes the note from active lists while retaining historical audit evidence.

## General tab

The General tab shows or edits:

| Field group | Contents |
| --- | --- |
| Agency and classification | Lead agency and status. |
| Bilingual names | Legal, operating, and research organization names in English and French. |
| Bilingual descriptions | English and French profile descriptions. |

General shows an edit form when your role permits updates, even if you are not currently assigned to this profile. Saving checks your current assignment again. If you see a warning that the action is unavailable, ask an assignment manager to assign you to the profile, then retry. Users without an update role see read-only values. The profile has no subtype selection. Classify the Proponent when linking it to an Agreement; that relationship may use a different eligible type in another Stream. Retry a failed lead-Agency lookup before treating an unresolved label as a missing record.

## Operational flow

| Step | Action |
| --- | --- |
| 1 | Configure the lead agency. Set up eligible recipient types on the Agreement Stream before linking the Proponent. |
| 2 | Create the proponent profile and set its Active flag deliberately. |
| 3 | Add registry identifiers, other names, addresses, and contacts. |
| 4 | Use Assigned users or Assignment Management to allocate the profile to eligible users. |
| 5 | Run reviews when the business process requires a proponent assessment. |
| 6 | Link the proponent to agreements during agreement creation or from the agreement Proponents tab. |
