# Recommendation schemas and setups

Recommendation configuration has two layers. An agency-owned schema defines bilingual questions and the canonical Recommended/Not Recommended result. A stream setup orders published schemas, chooses per-member failure policy, and can attach member or final approval routes.

## Navigation and access

Open a program and stream, then select **Recommendation Setups**. The grouped list organizes setups by runtime entity type. A setup detail page manages its identity, final approval, and ordered members; a schema detail page edits the questions.

Viewer for `transfer_payment` reads configuration in the exact program. Contributor creates and updates; Manager deletes. Activate and Publish are update operations. Server routes rebuild the active agency/program/stream chain and mask inaccessible records. Exact work assignments do not grant stream-configuration access.

## Recommendation schema

A schema records entity type, bilingual name, agency, status/version, result metadata, and a definition. Creation from a stream always uses that stream's agency.

The editor contains General and Form Sections. A valid definition needs at least one section, one subsection per section, and one question per subsection. Section, subsection, question, option, and help keys are language-independent runtime identities and must be unique where required.

| Type | Fields and rules |
| --- | --- |
| `radio` | Bilingual question, at least two uniquely keyed bilingual options, optional descriptions, and optional outcome mappings. |
| `text` | Bilingual question, optional description, and maximum length from 1 through 10,000. |

Either type can be required and can provide bilingual help. Exactly one question is the deciding result question. It must be a required radio question and every option on it must map to `recommended` or `not_recommended`. Selecting a new deciding question clears result mappings from the former one.

## Create a schema while configuring a setup

On a setup detail page, **Create schema** opens a short modal for member order, optional same-stream recommendation approval template, and **Fail set on Not Recommended**. Continue creates a draft, agency-owned schema with a minimal bilingual deciding question, associates it to the setup in one transaction, and opens the schema editor.

The order must be a positive integer unused by an active member. The approval template, when supplied, must be valid for `commonrecommendation` in that stream. A failure creates neither a partial member nor an orphaned schema.

Use **Associate schema** instead when the agency schema already exists.

## Schema publication

Save validates the working schema. Publish freshly authorizes the stream operation, creates an immutable schema-version row, marks the schema active, and advances its numeric version by `0.01`, rounded to two decimal places.

Runtime recommendations point to an exact schema-version row. Editing and republishing therefore affects future work only.

## Recommendation setup

A setup stores runtime entity type, bilingual name/description, optional final approval, lifecycle/version state, and ordered members. Each member selects one same-agency schema, a unique integer order, an optional member approval, and **Fail set on Not Recommended** (off by default).

A publishable plan requires at least one member, contiguous orders beginning at 1, a published version for every schema, and a published configuration for every approval template. The setup and all dependencies must match the stream and entity context.

Activate publishes version 1 and makes the setup eligible. Editing an active setup creates pending content; Publish snapshots the next plan only after full validation. The immutable plan includes each member's schema version, failure flag, and approval configuration plus the final approval.

Members can be edited or soft-deleted while configuring the setup. Soft deletion removes the active association without deleting the reusable schema or historical runtime lineage.

## Runtime consequences

Starting a workflow materializes a recommendation set from its pinned published plan and creates only the next member's draft recommendation. The run initiator becomes that recommendation's primary exact assignee. Later members are created one at a time as preceding members finish.

The direct Recommendation page loads the pinned bilingual schema and responses. Saving or submitting requires the exact recommendation assignment, Contributor for the resolved owner, and `draft` status. Submission validates required responses, option keys, and text lengths, then derives the result from the deciding question.

An attached member approval runs before progression. Without an approval, or after its success, Not Recommended fails the set only when that member's published failure flag is true. Otherwise the next recommendation or optional final approval begins. Cancellation retires pending runtime children without changing the published setup.

An approval-submission workflow for an Agreement or amendment must reference a published recommendation plan and contain at least one approval stage. Its recommendation detail can also show the immutable, hashed approval packet to an authorized Agreement reader or assigned approver. See [Workflows](../concepts/workflows.md).

## Failure and recovery

- Publication rejects empty or non-contiguous members, unpublished schemas, invalid scope/entity references, and unpublished approval templates.
- Schema validation rejects duplicate keys, invalid question structures, and anything other than one valid deciding question.
- Runtime saves reject non-draft or unassigned work and responses outside the pinned definition.
- Concurrent configuration changes are rechecked in a fresh-authorized transaction.
- Historical plans and runtime responses are never rewritten by repairing a working setup; save and publish a future version.

See [Streams](./streams.md), [Approval templates](./approval-templates.md), [Workflows](../concepts/workflows.md), and [Role permissions and exact assignments](../concepts/rbac.md).
