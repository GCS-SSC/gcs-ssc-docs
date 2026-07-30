# Proponent Team

The Team tab assigns users directly to one saved Proponent. Team membership is an independent exact-entity access exception: it can grant access even when the user has no Proponent role ability or direct global Proponent flag.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| User account | A team member must be an application user. |
| Proponent profile | Team records belong to a saved proponent. |
| Effective update access | Required to manage `read_only` and `contributor` memberships. |
| Effective delete access | Required in addition to update access to manage `full_access` memberships. |

## Fields

| Field | Rule |
| --- | --- |
| Team member | Required user selection. Duplicate active team members are not allowed. |
| Access level | Required: `read_only`, `contributor`, or `full_access`. |

## Business Rules

| Rule | Behaviour |
| --- | --- |
| `read_only` | Read the selected Proponent and its supported child records. |
| `contributor` | Read and update the selected Proponent; read, create, and update its supported child records. |
| `full_access` | Read, update, and soft-delete the selected Proponent; read, create, update, and soft-delete its supported child records. |
| Team membership is exact | It applies to the selected Proponent, not another Proponent, its lead agency, a program, an Agreement, or a sibling record. |
| Top-level creation is not inherited | Creating a new Proponent still requires the direct global Proponent `create` flag. |
| Duplicate active members are blocked | Do not add the same user twice to the same proponent team. |
| Management is ceiling-limited | Update without delete can manage up to `contributor`; update plus delete can manage up to `full_access`. A manager cannot change or remove a membership above that ceiling. |
| Membership removal is a soft delete | Removing a team member hides the active assignment but preserves its history. |

## Operating Guidance

Use Team membership for account officers, reviewers, or program staff who need access to one specific Proponent. Use the four direct user flags only for duties that genuinely require global cross-agency Proponent access. Remove Team members when responsibilities change.
