# Agreement Activities

The Activities tab records bilingual activities, expected results, schedule dates, stream outcomes, and responsible parties. Activities are inline agreement child records; they do not have a separate detail page.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Stream outcomes | The outcomes selector reads active outcomes configured for the agreement's transfer payment stream. |
| Agreement applicant-recipient links | Responsible parties are selected from applicant/recipients already linked to the agreement. |
| Agreement CRUD permissions | `create` adds an activity and loads its create lookups, `update` edits an existing activity and its lookups, and `delete` soft-deletes it. |

## Page flow

The tab lists agreement activities. The modal is fullscreen because activities contain longer bilingual text fields and two multi-select fields.

Lookups:

| Lookup | What users can select |
| --- | --- |
| Outcomes | Active outcomes configured for the agreement's stream. |
| Responsible parties | Proponent/applicant-recipient links already attached to the agreement. |

## Fields

| Field | Rule |
| --- | --- |
| English and French name | Required, maximum 255 characters. |
| English and French description | Required. |
| Start and end date | Required. End date cannot be before start date. |
| English and French expected results | Required. |
| Outcomes | Required array of unique stream outcome ids. |
| Responsible parties | Required array of unique agreement applicant-recipient link ids. |

## Business rules

| Rule | Behaviour |
| --- | --- |
| Outcomes must belong to the stream | Invalid outcome ids are rejected. |
| Responsible parties must belong to the agreement | Invalid responsible party ids are rejected. |
| Duplicate selections are invalid | Both selection arrays reject duplicate ids. |
| Date range is validated on save | If both dates are present, start must be on or before end. |

## Table behaviour

Activities display bilingual name and description, schedule start and end, bilingual expected results, outcome badges, and responsible-party badges. Search covers dates, bilingual names and descriptions, expected results, outcomes, and responsible parties through the resource table.

Activities do not trigger completion or approvals in the current implementation. They can be referenced in agreement narrative, amendments, and extension behaviour when an extension is installed.
