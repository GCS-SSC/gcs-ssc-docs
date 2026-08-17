# Recommendation Schemas And Setups

Recommendation configuration has two layers. A schema defines the bilingual questions and the option that produces the canonical `recommended` or `not_recommended` outcome. A stream recommendation setup orders one or more published schemas and optionally wraps member or final results in approval routes.

## Navigation And Access

Open a stream and select Recommendation Setups. The grouped table lists setups by runtime entity type and exposes their ordered schema members. Open a setup to edit its identity and members; open a member schema to use the schema editor.

Reading requires `transfer_payment:read` for the exact program. Creating, updating, deleting, activating, or publishing requires the corresponding exact `transfer_payment` action. Server routes derive the active agency/program/stream chain and mask inaccessible resources like missing ones. Teams do not grant stream-configuration access.

## Recommendation Schema

A schema is agency-owned and has an entity type, bilingual name, status, version, result metadata, and a recommendation definition. Creation from a stream must use the stream's agency.

The editor contains General and Form Sections. A valid definition requires at least one section; every section requires a bilingual label and at least one subsection; every subsection requires a bilingual label and at least one question. Section, subsection, question, option, and help keys are language-independent runtime identities and must be unique where validated.

Questions support:

| Type | Fields and rules |
| --- | --- |
| `radio` | Required bilingual question, at least two uniquely keyed bilingual options, optional bilingual option descriptions, and optional outcome mapping |
| `text` | Required bilingual question, optional bilingual description, and maximum length from 1 through 10,000 |

Either type can be required and can carry bilingual help. Exactly one question must be marked as the deciding result question. It must be a required radio question, and every option on it must map to `recommended` or `not_recommended`. Selecting a different deciding question clears outcome mappings from the former one.

## Schema Publication

Saving validates and updates the working schema. Publish locks the same-agency schema in a fresh-authorized stream transaction, creates an immutable schema-version row from the current definition/result metadata, marks the schema active, and increments its numeric version by `0.01` rounded to two decimal places. Runtime recommendations refer to a specific schema-version row, so later publications do not rewrite existing work.

## Recommendation Setup

A setup stores runtime entity type, bilingual name and description, optional final approval template, active flag, lifecycle status/version/pending-publication state, and ordered members. Each member selects one same-agency recommendation schema, an integer order, and an optional member approval template.

Within a setup, schema selections and order values must be unique. A publishable plan requires at least one member, contiguous ordering beginning at 1, a published version for every member schema, and published configurations for every referenced approval template. The setup and its members must match the stream's agency/entity context.

New setups are drafts. Activate publishes the first immutable configuration snapshot and makes the setup active. Editing an active setup produces pending content; Publish replaces the published plan only after all dependencies validate and advances the setup version. Generated recommendation work remains pinned to the published plan, member schema versions, and approval configurations used at creation.

## Runtime Consequences

Runtime forms validate required responses, radio option keys, and text lengths against their pinned definitions. The server derives the authoritative outcome from the selected option on the single deciding question. Setup order determines recommendation progression; member-level approval can gate an individual result, and the optional final approval can gate the combined recommendation plan.

Workflow setups may use a published recommendation setup as a recommendation entry point. Saving or submitting runtime recommendations does not authorize access to the owning entity by itself; normal exact entity/Team access and assigned workflow rules still apply.

## Deletion, Failure, And Recovery

- Setup and member deletion are soft deletes. Historical runtime lineage remains intact.
- Publication fails for empty or non-contiguous members, an unpublished schema, an invalid entity/agency reference, or an unpublished approval template.
- Schema validation fails for duplicate keys, an invalid question structure, or anything other than exactly one valid deciding question.
- A missing/inaccessible resource returns the masked contract. Confirm the identifier and exact scope rather than probing another agency.
- All mutations recheck current ownership and authorization in a transaction. Reload after a concurrent lifecycle change, repair the highlighted dependency, save, and retry publication.

See [Streams](./streams.md), [Approval Templates](./approval-templates.md), and [Approvals and Completions](../concepts/approvals-completions.md).
