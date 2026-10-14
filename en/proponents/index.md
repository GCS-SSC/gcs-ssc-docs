# Proponents

Use **Proponents** to find or create the organization applying for or receiving funding. Keep its names, contact details and identifiers in one profile, then link that profile to each relevant Agreement. You can create the profile before an Agreement exists and review it separately.

For example, a community association receiving funding under two Streams can use one profile linked to two Agreements. Choose its recipient type separately on each Agreement.

In this guide, a **role ceiling** means the highest action your role permits. An **exact assignment** means you are listed under **Assigned users** for this particular profile; being assigned to one of its Agreements does not count.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| Lead agency | New profiles require an active lead Agency for tracking. Profile access uses the shared Proponent catalog; notes have their own Agency boundary. |
| Agreement classification | A Proponent subtype is chosen on each Agreement–Proponent relationship, from the Agreement Stream’s eligible recipient types. The profile itself has no subtype field. |
| Scoped role permission | Top-level creation requires a Contributor `applicant_recipient` ceiling globally or in any active Agency; it need not be the selected lead Agency. |
| Exact assignment | Mutating a saved Proponent requires its exact assignment in addition to the role ceiling. The creator becomes primary automatically. |
| Review setups | Reviews appear only when eligible review-set setups exist for proponent records. |
| Agreement setup | The Agreements tab becomes useful after programs, streams, agreement subtypes, and agreement permissions exist. |

## List Page

The Proponents page supports search, status filtering, pagination, column controls, and row actions. A global Proponent Viewer grant or Proponent Viewer in any active Agency gives access to the shared profile catalog; reading does not require an exact assignment. Search matches identifiers, legal/operating names, and lead agency.

Create appears with a Contributor ceiling in an available scope. Edit requires Contributor plus the exact assignment; Delete requires Manager plus the assignment. Deletion is logical and removes the Proponent from ordinary active lists without erasing historical references.

Use the list’s **All**, **Mine**, or Agency view to narrow the same authorized records. Mine requires an exact Proponent assignment. An Agency view includes profiles with an active, non-deleted Agency Financial ID for that Agency and requires the corresponding user Agency scope; it is not simply a filter on lead Agency. These views never grant additional reading rights.

For example, a profile led by Agency A can appear in an authorized Agency B view after it has a B financial ID. It still needs to be readable through the caller’s Proponent permissions. Being linked to a B Agreement alone is not this view’s financial-ID criterion.

## Create Profile

The create page starts with **Active** off. Users choose the lead agency, then enter bilingual legal, operating, and research-organization names and bilingual descriptions. Registry identifiers and NAICS belong on the separate Registries tab after creation.

| Rule | Behaviour |
| --- | --- |
| Lead agency is required | New profile creation requires an active tracking Agency; this field does not limit shared-catalog permissions. |
| Each main bilingual value requires at least one language | Legal name, operating name, and description each require an English or French value; supplying both supports full bilingual display. |
| Active flag | Defaults to false. Activate the profile when it is ready for operational selection; availability is separate from deletion. |
| Bilingual fields should be maintained together | Legal names, operating names, research organization names, and descriptions are displayed in the active language. |

## Detail Workspace

The detail page contains a collapsible hero and route tabs:

| Tab | Purpose |
| --- | --- |
| General | Core profile, identifiers, agency, status, names, and descriptions. |
| [Agency Financial IDs](./agency-financial-ids.md) | Agency-specific financial identifiers. |
| Registries | Business, charity, provincial, Indigenous, NAICS, and other registry identifiers with type-specific validation. |
| [Other Names](./other-names.md) | Alternate legal, operating, historical, or informal names. |
| [Addresses](./addresses.md) | Physical or mailing addresses. |
| [Contacts](./contacts.md) | People and communication details. |
| [Reviews](./reviews.md) | Runtime review sets and assessment work. |
| [Agreements](./agreements.md) | Agreements linked to the proponent. |
| Notes | Agency-scoped bilingual working notes. |
| [Funding History](./funding-history.md) | System agreements and lightweight external funding records associated with the proponent. |
| [Attachments](../concepts/attachments.md) | Supporting files owned by this exact Proponent. |
| [Assigned users](./team.md) | Exact work roster; changes require `manage_assignments`. |

Extension tabs can also appear when an enabled extension contributes a proponent tab.

## Proponent notes

The **Notes** tab holds bilingual working notes. Each note belongs to one Agency as well as this Proponent. Choose an active Agency for which you have Proponent create permission; the list shows only notes in Agencies you can currently read, even when the Proponent is linked to several Agencies. A note needs a subject and body in at least one language each, and subjects have a 255-character limit. Use both languages where needed. Readers can search the visible notes; creating, editing, and deleting require the corresponding Proponent permission and exact assignment plus the note Agency permission. The original Agency cannot be changed on edit.

For example, a Proponent led by Agency A may also have an Agency B financial ID. An Agency B user with suitable Proponent access can create a B note without exposing Agency A notes to B-only readers. If a note is missing, check the Agency grant before recreating it. If a save fails, preserve the draft, reload current permissions and profile state, and retry. Deletion removes the note from active lists while retaining historical audit evidence.

## General Tab

The General tab shows or edits:

| Field Group | Contents |
| --- | --- |
| Agency and classification | Lead agency and status. |
| Bilingual names | Legal, operating, and research organization names in English and French. |
| Bilingual descriptions | English and French profile descriptions. |

When the current user can update the proponent, General is an inline edit form. Otherwise it renders read-only profile values. The profile has no subtype selection. Classify the Proponent when linking it to an Agreement; that relationship may use a different eligible type in another Stream. Retry a failed lead-Agency lookup before treating an unresolved label as a missing record.

## Operational Flow

| Step | Action |
| --- | --- |
| 1 | Configure the lead agency. Set up eligible recipient types on the Agreement Stream before linking the Proponent. |
| 2 | Create the proponent profile and set its Active flag deliberately. |
| 3 | Add registry identifiers, other names, addresses, and contacts. |
| 4 | Use Assigned users or Assignment Management to allocate the profile to eligible users. |
| 5 | Run reviews when the business process requires a proponent assessment. |
| 6 | Link the proponent to agreements during agreement creation or from the agreement Proponents tab. |
