# Proponent Reviews

Reviews capture structured assessment or checklist work for a proponent. They are generated from configured review set setups and can include assessment schemas, completion, and approvals.

## Setup Dependencies

| Dependency | Why It Matters |
| --- | --- |
| Review schema | Defines the checklist or assessment content. |
| Review set setup | Groups one or more reviews for proponent records. |
| Review setup order | Controls the order of reviews inside the set. |
| Approval template | Required when completed reviews need routing and certifications. |
| Reviewer permissions | Users need review access to create sets, answer assessments, complete, approve, deny, or reassign. |

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
| Review sets group related reviews | A set can contain one or more review rows depending on setup. |
| Sequential setups should be followed in order | Users should complete earlier configured reviews before relying on later review conclusions. |
| Terminal statuses protect history | Completed, approved, denied, withdrawn, or cancelled sets should not be edited as ordinary drafts. |
| Approval templates add routing | Completed reviews can require approver decisions and certifications. |
| Schema changes affect future work | Existing review responses preserve their runtime context; update setup intentionally before creating new sets. |

## Operating Guidance

Use proponent reviews before agreement creation when the organization must assess eligibility, financial capacity, risk, or readiness. If reviews are required by policy, document which setup applies to each proponent class.
