# Proponent Contacts

Contacts record people associated with the proponent. They support communication, review coordination, and agreement administration.

## Fields

| Field | Rule |
| --- | --- |
| Name | Required contact name. |
| Email | Required when the contact should receive operational correspondence. |
| Phone and extension | Optional business phone details. |
| Title and bilingual job title | Use when role context matters to reviews or approvals. |
| Language preference | English or French. |
| Primary account | Indicates the main contact when the proponent has multiple contacts. |

## Business Rules

| Rule | Behaviour |
| --- | --- |
| Contacts belong to the proponent | Do not use proponent contacts as reusable system users. |
| Primary contact should be unique by convention | The UI does not replace business judgment; maintain one current primary contact unless the organization requires otherwise. |
| Language preference drives communication expectations | Keep it current for bilingual service obligations. |
| Deletes are soft deletes | Removed contacts are hidden from active use but preserved for history. |

## Operating Guidance

Create at least one reliable contact before reviews or agreements begin. Update contact information when staff change so reviewers and agreement officers can reach the correct person.
