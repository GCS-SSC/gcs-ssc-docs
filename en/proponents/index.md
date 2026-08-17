# Proponents

Proponents are applicant/recipient profiles. They can be created before agreements, reviewed independently, assigned to teams, and linked to one or more agreements.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| Lead agency | Every Proponent is led by one agency. The agency supplies reference data such as the available Proponent subtypes. |
| Proponent subtype | The subtype must be configured under the lead agency before the profile can be created. |
| Direct user access | Top-level creation requires the user's global Proponent `create` flag. The four direct CRUD flags are managed in the user's Assignments tab. |
| Exact Team access | A saved Proponent can grant `read_only`, `contributor`, or `full_access` to selected users even when their roles and direct flags do not provide access. |
| Review setups | Reviews appear only when eligible review-set setups exist for proponent records. |
| Agreement setup | The Agreements tab becomes useful after programs, streams, agreement subtypes, and agreement permissions exist. |

## List Page

The Proponents page supports search, status filtering, pagination, column controls, and row actions. Users with the direct Proponent `read` flag see the cross-agency list; Team-only users see only the exact Proponents assigned to them. Search is intended to help users find a visible profile by identifiers, legal names, operating names, subtype, or lead agency.

Create appears with the direct Proponent `create` flag and opens the create page. Edit and Delete depend on the matching direct flag or the selected Proponent's exact Team level. Delete is a soft delete and removes the Proponent from normal active lists without erasing historical references.

## Create Profile

The create page starts a draft profile. Users choose the lead agency and proponent subtype, then enter bilingual legal, operating, and research-organization names and bilingual descriptions. Registry identifiers and NAICS belong on the separate Registries tab after creation.

| Rule | Behaviour |
| --- | --- |
| Lead agency is required | A proponent cannot exist without an agency owner. |
| Subtype is required | The subtype classifies the proponent and must belong to the lead agency. |
| Each main bilingual value requires at least one language | Legal name, operating name, and description each require an English or French value; supplying both supports full bilingual display. |
| Agency and subtype must match | The selected subtype must be active, belong to the selected lead agency, and is cleared in the form when the agency changes. |
| New profiles start as draft | Users can complete supporting tabs before treating the profile as operationally ready. |
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
| [Team](./team.md) | Users directly assigned to the proponent. |

Extension tabs can also appear when an enabled extension contributes a proponent tab.

## General Tab

The General tab shows or edits:

| Field Group | Contents |
| --- | --- |
| Agency and classification | Lead agency, proponent subtype, and status. |
| Bilingual names | Legal, operating, and research organization names in English and French. |
| Bilingual descriptions | English and French profile descriptions. |

When the current user can update the proponent, General is an inline edit form. Otherwise it renders read-only profile values.

## Operational Flow

| Step | Action |
| --- | --- |
| 1 | Configure the lead agency and subtype reference data. |
| 2 | Create the proponent profile as draft. |
| 3 | Add registry identifiers, other names, addresses, and contacts. |
| 4 | Add team members if access should be delegated directly to users. |
| 5 | Run reviews when the business process requires a proponent assessment. |
| 6 | Link the proponent to agreements during agreement creation or from the agreement Proponents tab. |
