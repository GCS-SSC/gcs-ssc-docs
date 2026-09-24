# Recommendation schemas and setups

Recommendation configuration has two layers. An Agency-owned schema defines bilingual questions and the canonical Recommended/Not Recommended result. An Agency Recommendation Set orders published schemas, chooses per-member failure policy, and can attach member or final approval routes.

## Navigation and access

Open **Agencies**, choose the Agency, then **Recommendation Sets**. The grouped list organizes sets by runtime entity type. A set detail page manages identity, final approval, and ordered members; a schema detail page edits the questions. Agency Viewer reads, Contributor creates, edits, and publishes, and Manager performs eligible deletion. A Program Stream references these Agency designs through a linked Agency Workflow; exact work assignments do not grant catalog access.

## Recommendation schema

A schema records entity type, bilingual name, agency, status/version, result metadata, and a definition. Creation from a set uses its Agency.

The editor contains General and Form Sections. A valid definition needs at least one section, one subsection per section, and one question per subsection. Section, subsection, question, option, and help keys are language-independent runtime identities and must be unique where required.

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

Save validates the working schema. Publish freshly authorizes the Agency operation, creates an immutable schema-version row, marks its publication published, and advances its immutable publication version.

Runtime recommendations point to an exact schema-version row. Editing and republishing therefore affects future work only.

## Recommendation setup

A setup stores runtime entity type, bilingual name/description, optional final approval, lifecycle/version state, and ordered members. Each member selects one same-agency schema, a unique integer order, an optional member approval, and **Fail set on Not Recommended** (off by default).

A publishable plan requires at least one member, contiguous orders beginning at 1, a published version for every schema, and a published configuration for every approval template. The set and all dependencies must match the Agency and entity context.

Publish creates version 1 and makes the setup eligible. Editing a published setup creates pending content; Publish snapshots the next plan only after full validation. The immutable plan includes each member's schema version, failure flag, and approval configuration plus the final approval.

Members can be edited or soft-deleted while configuring the setup. Soft deletion removes the active association without deleting the reusable schema or historical runtime lineage.

## Runtime consequences

Starting a workflow materializes a recommendation set from its pinned published plan and activates the next recommendation member. Its primary exact assignee comes from the workflow’s pinned owner mapping. Later members are created one at a time as preceding members finish.

The direct Recommendation page loads the pinned bilingual schema and responses. Saving or submitting requires the exact recommendation assignment, Contributor for the resolved owner, and an `active` runtime item. Submission validates required responses, option keys, and text lengths, then derives the result from the deciding question.

An attached member approval runs before progression. Without an approval, or after its success, Not Recommended fails the set only when that member's published failure flag is true. Otherwise the next recommendation or optional final approval begins. Cancellation retires pending runtime children without changing the published setup.

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
