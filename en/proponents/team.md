# Proponent Team

The Team tab assigns users directly to a proponent. Team membership is used to delegate access where agency or program scope alone is not specific enough.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| User account | A team member must be an application user. |
| Proponent profile | Team records belong to a saved proponent. |
| Proponent permissions | The administrator needs team-management permission for the profile. |
| Supporting role | Team membership works with roles; it does not replace the need for user abilities. |

## Fields

| Field | Rule |
| --- | --- |
| Team member | Required user selection. Duplicate active team members are not allowed. |

## Business Rules

| Rule | Behaviour |
| --- | --- |
| Team membership is profile-specific | It applies to the selected proponent, not all proponents in the same agency. |
| Duplicate active members are blocked | Do not add the same user twice to the same proponent team. |
| Team access complements roles | A user still needs the relevant proponent abilities; team membership helps scope those abilities to this profile. |
| Deletes are soft deletes | Removing a team member hides the active assignment but preserves the history. |

## Operating Guidance

Use team membership for account officers, reviewers, or program staff who need direct responsibility for a particular proponent. Remove users when responsibilities change.
