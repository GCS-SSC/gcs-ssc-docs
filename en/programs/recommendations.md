# Recommendation schemas and setups

A recommendation records whether an officer recommends proceeding with a file. An Agency administrator sets up two reusable parts: a **schema**, which is the bilingual form officers answer, and a **Recommendation Set**, which puts those forms in order and controls approvals and what happens after a Not Recommended result.

For example, a set could ask a program officer for a funding recommendation, then a finance officer for a financial recommendation. Each form has one question that decides its Recommended/Not Recommended result. The administrator decides whether a Not Recommended result stops the set and whether approvals are needed. This is an example to adapt to your program’s process.

## Navigation and access

Open **Agencies**, choose the Agency, then **Recommendation Sets**. The grouped list organizes sets by runtime entity type. A set detail page manages identity, final approval, and ordered members; a schema detail page edits the questions. Agency Viewer reads, Contributor creates, edits, and publishes, and Manager performs eligible deletion. A Program Stream references these Agency designs through a linked Agency Workflow; exact work assignments do not grant catalog access.

## Recommendation schema

The schema is the form design, not an officer’s completed recommendation. It stores the kind of record it applies to, bilingual name, Agency, status, version, questions, and result rules. A schema created from a set belongs to that set’s Agency.

The editor contains General and Form Sections. A valid definition needs at least one section, one subsection per section, and one question per subsection. Keys identify sections, subsections, questions, options, and help regardless of the displayed language. Keep them unique where required so the system can match answers to the correct question.

| Type | Fields and rules |
| --- | --- |
| `radio` | Bilingual question, at least two uniquely keyed bilingual options, optional descriptions, and optional outcome mappings. |
| `text` | Bilingual question, optional description, and maximum length from 1 through 10,000. |

Either type can be required and can provide bilingual help. Exactly one question is the deciding result question. It must be a required radio question and every option on it must map to `recommended` or `not_recommended`. Selecting a new deciding question clears result mappings from the former one.

Radio questions can also allow an optional or required comment, including for the deciding question. Set the comment policy when authoring the Agency schema; at submission the pinned schema decides whether a missing comment blocks the response. A comment does not change the Recommended/Not Recommended mapping of the selected option.

## Create a schema while configuring a setup

On an Agency set detail page, **Create schema** opens a short modal for member order, optional same-Agency recommendation approval template, and **Fail set on Not Recommended**. Continue creates a draft, agency-owned schema with a minimal bilingual deciding question, associates it to the setup in one transaction, and opens the schema editor.

The order must be a positive integer unused by an active member. The approval template, when supplied, must be a valid template owned by that Agency. A failure creates neither a partial member nor an orphaned schema.

Use **Associate schema** instead when the agency schema already exists.

## Schema publication

**Save** checks and stores the form you are editing. **Publish** checks your Agency permissions again and makes a fixed, numbered copy available for use.

A recommendation already started keeps the exact published form version it was given. For example, adding a required rationale question and publishing a new version does not add that question to an officer’s existing recommendation. The new form applies to future work.

## Recommendation setup

The setup defines the sequence of recommendations for a kind of record. It stores a bilingual name and description, an optional final approval, status and version, and ordered members. A **member** is one form in that sequence. Each member selects a schema from the same Agency, a unique integer order, an optional approval for that recommendation, and **Fail set on Not Recommended** (off by default).

Before publishing, include at least one member and number the members consecutively from 1 (for example, 1, 2, 3, with no gaps). Every schema and every selected approval template must already be published. The set and all dependencies must match the Agency and entity context.

Publish creates version 1 and makes the setup eligible. Editing a published setup creates pending content; Publish snapshots the next plan only after full validation. The immutable plan includes each member's schema version, failure flag, and approval configuration plus the final approval.

While configuring the setup, you can edit or remove members. Removing a member takes it out of the active setup, but keeps its reusable schema and the history of recommendations already created.

## Runtime consequences

When a workflow starts, the system creates a recommendation set using the fixed published plan selected for that workflow. It starts the next recommendation and assigns its primary officer using the workflow’s saved owner mapping. Later recommendations are created one at a time as earlier ones finish.

The Recommendation page shows the form version fixed for this recommendation and its saved answers. Saving or submitting requires the exact recommendation assignment, Contributor for the resolved owner, and an `active` runtime item. Submission validates required responses, option keys, and text lengths, then derives the result from the deciding question.

If a recommendation has an approval route, that approval must finish successfully before the set can move on. Without an approval, or after its success, Not Recommended fails the set only when that member's published failure flag is true. Otherwise the next recommendation or optional final approval begins. Cancelling the set retires its pending recommendations and approvals without changing the published setup.

For example, if the program officer selects Not Recommended and that member has **Fail set on Not Recommended** enabled, the set stops after any required member approval succeeds. If the switch is off, the set can continue to the finance recommendation; the officer’s answer is still recorded as Not Recommended.

An approval-submission workflow for an Agreement or amendment must reference a published recommendation plan and contain at least one approval stage. Its recommendation detail can also show the immutable, hashed approval packet to an authorized Agreement reader or assigned approver. See [Workflows](../concepts/workflows.md).

## Concurrent edits

Each save or submission sends the displayed integer `revision`. The server locks the current recommendation, compares that value, and increments it on success. A stale value returns `409 RECOMMENDATION_REVISION_CONFLICT`; it does not overwrite another user’s responses.

For example, two assignees open revision 3. One saves and creates revision 4. The second user’s revision-3 submission is rejected. Keep a copy of the intended changes, reload revision 4, reconcile the responses, and submit again. This response revision is separate from the pinned schema publication version.

## Failure and recovery

- Publication rejects empty or non-contiguous members, unpublished schemas, invalid scope/entity references, and unpublished approval templates.
- Schema validation rejects duplicate keys, invalid question structures, and anything other than one valid deciding question.
- Runtime saves reject non-active or unassigned work and responses outside the pinned definition.
- Concurrent configuration changes are rechecked in a fresh-authorized transaction.
- Historical plans and runtime responses are never rewritten by repairing a working setup; save and publish a future version.

See [Streams](./streams.md), [Approval templates](./approval-templates.md), [Workflows](../concepts/workflows.md), and [Role permissions and exact assignments](../concepts/rbac.md).
