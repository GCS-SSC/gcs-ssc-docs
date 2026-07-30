# Proponents and Applicant-Recipients

The Proponents tab links applicant/recipient profiles to an agreement. The source model calls these records agreement applicant recipients; the user interface labels them as proponents in the agreement workspace.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Applicant/recipient profiles | Agreement creation requires at least one applicant/recipient id, and the tab can add more links later. |
| Lead agency data | The table displays the linked profile's lead agency when available. |
| Agreement CRUD permissions | `create` adds a Proponent link, `update` changes an existing link, and `delete` removes it by soft delete. The selector also requires read access to each Proponent it exposes. |

## Page flow

The tab lists proponents linked to the agreement. The selector offers proponent profiles the user is allowed to attach.

Search results can change without removing the current selection. Selected or preselected proponents are resolved separately and keep their bilingual display labels even when they are outside the current result page. If a saved profile can no longer be resolved, the selection remains visible as unavailable so the user can remove it deliberately.

The table shows:

| Column | Source |
| --- | --- |
| Applicant/recipient | Bilingual legal/display name from the applicant/recipient profile. |
| Lead agency | Bilingual agency name from the applicant/recipient profile. |
| Actions | Edit with `agreement:update`; remove with `agreement:delete`. |

## Business rules

| Rule | Behaviour |
| --- | --- |
| Agreement creation needs at least one applicant recipient | The create schema rejects an empty `applicant_recipient_ids` array. |
| Duplicate applicant recipient ids are rejected on agreement create | The create schema reports duplicate selections by index. |
| Child links must point to valid profiles | Users can only save links to existing proponent profiles. |
| Responsible-party dependency | Agreement activities use these linked records as responsible party lookup values. |
| Detail context | Commitment detail pages list agreement applicant recipients for context. |

## Operational notes

Create or import applicant/recipient profiles before creating agreements. If users start agreement creation from a proponent page, the create form can preselect that proponent and cancel returns to that proponent's Agreements section.
