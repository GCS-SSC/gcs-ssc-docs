# Proponent Funding History

The Funding History tab gives one view of the proponent's funding relationships. It lists full agreements managed in GCS-SSC and lightweight external funding records reported from outside the system.

External records capture an agency, program, agreement number, bilingual title and description, dates, amount, currency, and one or more proponents. They do not create an agreement workspace or child workflows. Open a system agreement to manage its operational details; edit an external record directly from Funding History.

## Adding External Funding

The wizard supports configured and one-off agencies and programs. Select a configured value whenever it exists. A one-off agency cannot use the name of a configured agency, and a one-off program cannot use the name of a configured program in the selected agency.

An external record can be associated with multiple proponents. When the same external funding applies to another proponent, edit the existing record and add that proponent instead of creating a duplicate record.

## Exact Duplicate Rules

An exact duplicate is blocked only against another active external funding record in the same identity scope:

| External identity shape | Duplicate scope |
| --- | --- |
| Configured program | Program and normalized agreement number. |
| Configured agency with a one-off program | Agency, normalized one-off program name, and normalized agreement number. |
| One-off agency with a one-off program | Normalized one-off agency name, normalized one-off program name, and normalized agreement number. |

The same agreement number is allowed in a different scope. Matching ignores letter case, spacing, punctuation, and other non-alphanumeric characters. Soft-deleted external records no longer occupy their duplicate scope.

## Similarity Warnings

Cross-source collisions are warnings, not duplicates. An external record may therefore use the same normalized agreement number as a GCS-SSC agreement in the same program after the user reviews and confirms the warning. Near agreement numbers in the same scope also require confirmation.

One-off agency and program names are compared with configured names so likely matches can be corrected before saving. A warning can identify a restricted match without exposing details the current user cannot read. Changing a value clears earlier confirmations and requires the updated matches to be reviewed again.

Exact duplicates within the external source cannot be overridden. Exact GCS-SSC agreement duplicates are enforced separately within their own agreement stream.
