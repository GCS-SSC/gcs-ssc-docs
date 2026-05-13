# Proponent Agency Financial IDs

Agency Financial IDs store the identifier that a specific agency uses for the proponent in its financial or grants system. A single proponent can have multiple agency-specific identifiers.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| Proponent profile | Financial IDs are child records of an existing proponent. |
| Agency access | Users can add identifiers only for agencies they are allowed to manage. |
| Financial-system convention | The agency should define the format and meaning of the identifier before users enter values. |

## Fields

| Field | Rule |
| --- | --- |
| Agency | Required. Select the agency whose financial system owns the identifier. |
| Financial ID | Required. Enter the identifier exactly as used by that agency. |

## Business Rules

| Rule | Behaviour |
| --- | --- |
| Agency must be valid for the user | The agency selector only offers agencies the user can work with. |
| Identifier belongs to one proponent | Do not use this tab to create cross-proponent aliases. |
| Existing records can be updated | Update the identifier when an agency replaces its local financial-system value. |
| Deletes are soft deletes | Removing an identifier hides it from active use while preserving historical context. |

## Operating Guidance

Use this tab when agreements, payments, claims, or reporting need to reconcile a GCS-SSC proponent to an agency-owned financial identifier. Avoid entering global identifiers here; business number and charity number belong on the General tab.
