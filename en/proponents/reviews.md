# Proponent Reviews

Reviews capture structured assessment or checklist work for a proponent. They are generated from configured review set setups and can include assessment schemas, completion, and approvals.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| Review schema | Defines the checklist or assessment content. |
| Review set setup | Groups one or more reviews for proponent records. |
| Review setup order | Controls the order of reviews inside the set. |
| Approval template | Required when completed reviews need routing and certifications. |
| Proponent access and workflow assignment | Proponent read access opens reviews. Update access creates sets, answers assessments, completes, cancels, clones, or reassigns. An approval action additionally requires assignment to that approval step; assignment alone never grants Proponent access. |

## Page Flow

The Reviews tab groups review rows by review set. Users with update access can create a review set from eligible setups. Each individual review row can be opened in the assessment workspace.

| Action | Result |
| --- | --- |
| Create review set | Generates the configured review rows for the proponent. |
| Open review | Opens the assessment or checklist page for that review. |
| Cancel review set | Stops a non-terminal set when the process should not continue. |
| Clone review | Creates a new review from a denied or cancelled review when rework is needed. |

## Business Rules

| Rule | Behaviour |
| --- | --- |
| Review setup must match proponents | Only setups configured for proponent records are eligible. |
| Setup scope must apply to the proponent | A stream-scoped setup is currently eligible only when the proponent is linked to an agreement under that transfer payment stream. A setup scoped directly to the proponent is also eligible. |
| Agency ownership must match | Every active assessment schema in the setup must belong to the proponent's lead agency. |
| Review sets group related reviews | A set can contain one or more review rows depending on setup. |
| Sequential setups should be followed in order | Users should complete earlier configured reviews before relying on later review conclusions. |
| Terminal statuses protect history | Completed, approved, denied, withdrawn, or cancelled sets should not be edited as ordinary drafts. |
| Approval templates add routing | Completed reviews can require approver decisions and certifications. |
| Schema changes affect future work | Existing review responses preserve their runtime context; update setup intentionally before creating new sets. |

## Why the Setup List Can Be Empty

The Add dialog is an eligibility lookup, not a list of every review set setup configured in the system. It is empty when no active assessment setup satisfies the proponent type, scope, and lead-agency rules. In the current implementation, a stream-scoped setup does not appear unless the proponent is already associated with an agreement under that stream.

## Planned Intake-Based Eligibility

Funding Case Intake is planned but not yet implemented. Once available, a stream-scoped review set setup will be eligible through either of these paths:

1. The proponent is associated with an agreement under the transfer payment stream.
2. The proponent is associated with a funding case intake whose funding opportunity profile belongs to the transfer payment stream.

The intake path is therefore `Proponent -> Funding Case Intake -> Funding Opportunity Profile -> Transfer Payment Stream`. The same active-status, soft-deletion, entity-type, assessment-schema, and lead-agency checks will continue to apply. This planned path expands how a stream becomes applicable; it does not make every stream setup globally available.

## Operating Guidance

Use proponent reviews to assess eligibility, financial capacity, risk, or readiness. Until intake-based eligibility is implemented, a stream-scoped setup requires an agreement association. If reviews are required before agreement creation, use a setup scoped directly to the proponent or account for this current limitation in the operating process.
