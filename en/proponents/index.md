# Proponents

Proponents are applicant/recipient profiles. They can be created before Agreements, reviewed independently, assigned to exact work rosters, and linked to one or more Agreements.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| Lead agency | Every Proponent is led by one agency. The agency supplies reference data such as the available Proponent subtypes. |
| Proponent subtype | The subtype must be configured under the lead agency before the profile can be created. |
| Scoped role permission | Top-level creation requires a Contributor `applicant_recipient` ceiling globally or at the selected lead agency. |
| Exact assignment | Mutating a saved Proponent requires its exact assignment in addition to the role ceiling. The creator becomes primary automatically. |
| Review setups | Reviews appear only when eligible review-set setups exist for proponent records. |
| Agreement setup | The Agreements tab becomes useful after programs, streams, agreement subtypes, and agreement permissions exist. |

## List Page

The Proponents page supports search, status filtering, pagination, column controls, and row actions. It returns profiles covered by the user's global or lead-agency Viewer ceiling; reading does not require an exact assignment. Search matches identifiers, legal/operating names, subtype, and lead agency.

Create appears with a Contributor ceiling in an available scope. Edit requires Contributor plus the exact assignment; Delete requires Manager plus the assignment. Deletion is logical and removes the Proponent from ordinary active lists without erasing historical references.

Use the list’s **All**, **Mine**, or Agency view to narrow the same authorized records. Mine requires an exact Proponent assignment. An Agency view includes profiles with a non-deleted Agency Financial ID for that Agency and requires the corresponding user Agency scope; it is not simply a filter on lead Agency. These views never grant additional reading rights.

For example, a profile led by Agency A can appear in an authorized Agency B view after it has a B financial ID. It still needs to be readable through the caller’s Proponent permissions. Being linked to a B Agreement alone is not this view’s financial-ID criterion.

## Create Profile

The create page starts with **Active** off. Users choose the lead agency and proponent subtype, then enter bilingual legal, operating, and research-organization names and bilingual descriptions. Registry identifiers and NAICS belong on the separate Registries tab after creation.

| Rule | Behaviour |
| --- | --- |
| Lead agency is required | A proponent cannot exist without an agency owner. |
| Subtype is required | The subtype classifies the proponent and must belong to the lead agency. |
| Each main bilingual value requires at least one language | Legal name, operating name, and description each require an English or French value; supplying both supports full bilingual display. |
| Agency and subtype must match | The selected subtype must be active, belong to the selected lead agency, and is cleared in the form when the agency changes. |
| Active flag | Defaults to false. Activate the profile when it is ready for operational selection; availability is separate from deletion. |
| Bilingual fields should be maintained together | Legal names, operating names, research organization names, and descriptions are displayed in the active language. |

## Detail Workspace

The detail page contains a collapsible hero and route tabs:

| Tab | Purpose |
| --- | --- |
| General | Core profile, identifiers, agency, subtype, status, names, and descriptions. |
| [Agency Financial IDs](./agency-financial-ids.md) | Agency-specific financial identifiers. |
| Registries | Business, charity, provincial, Indigenous, NAICS, and other registry identifiers with type-specific validation. |
| [Other Names](./other-names.md) | Alternate legal, operating, historical, or informal names. |
| [Addresses](./addresses.md) | Physical or mailing addresses. |
| [Contacts](./contacts.md) | People and communication details. |
| [Reviews](./reviews.md) | Runtime review sets and assessment work. |
| [Agreements](./agreements.md) | Agreements linked to the proponent. |
| [Funding History](./funding-history.md) | System agreements and lightweight external funding records associated with the proponent. |
| [Attachments](../concepts/attachments.md) | Supporting files owned by this exact Proponent. |
| [Assigned users](./team.md) | Exact work roster; changes require `manage_assignments`. |

Extension tabs can also appear when an enabled extension contributes a proponent tab.

## General Tab

The General tab shows or edits:

| Field Group | Contents |
| --- | --- |
| Agency and classification | Lead agency, proponent subtype, and status. |
| Bilingual names | Legal, operating, and research organization names in English and French. |
| Bilingual descriptions | English and French profile descriptions. |

When the current user can update the proponent, General is an inline edit form. Otherwise it renders read-only profile values. Existing retired subtype references can be retained for unrelated edits; changing classification requires currently eligible Agency-owned values. Selected labels are hydrated by exact ID, independently of the current search page. Retry a failed lookup before treating an unresolved label as a missing record.

## Operational Flow

| Step | Action |
| --- | --- |
| 1 | Configure the lead agency and subtype reference data. |
| 2 | Create the proponent profile and set its Active flag deliberately. |
| 3 | Add registry identifiers, other names, addresses, and contacts. |
| 4 | Use Assigned users or Assignment Management to allocate the profile to eligible users. |
| 5 | Run reviews when the business process requires a proponent assessment. |
| 6 | Link the proponent to agreements during agreement creation or from the agreement Proponents tab. |
