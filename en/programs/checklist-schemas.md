# Checklist Schemas

Checklist schemas define bilingual pass/fail questions and deterministic result rules for runtime reviews. They are agency-owned review schemas, opened from a stream Review Setup member, and must match the setup's runtime entity type.

## Prerequisites And Navigation

Create the agency, program, stream, and Review Setup first. In the Review Setup detail editor, either associate an existing same-agency checklist schema or create a checklist member. Selecting the member opens the checklist editor; its breadcrumb returns to the stream's Review Setups tab.

Users need `transfer_payment:read` for the exact program to view the schema and `transfer_payment:update` to save, activate, or publish it. Client controls mirror those permissions, while every server request independently resolves the active agency/program/stream/schema chain.

## Editor Sections

The editor has three anchored sections:

1. General: bilingual schema name, bilingual runtime outcome name, and the option to disable additional reviewers.
2. Sections: ordered sections, subsections, and questions.
3. Result Rules: the default failure policy and nested conditional result groups.

The hero shows entity type, draft/active/inactive status, version, and whether unpublished changes exist. Save validates the whole definition. The publish action first saves, then activates a draft or publishes pending changes to an active schema.

## Sections And Questions

Every section has a unique language-independent key and English/French label. It must contain at least one direct question or a subsection. Every subsection also has a unique key, bilingual label, and at least one question.

Every question contains:

| Field | Rule |
| --- | --- |
| Language-independent key | Required and unique across the complete schema |
| English/French question | Both required |
| Required | Controls whether completion requires an answer |
| Comment policy | `optional`, `required`, or `required_on_fail` |
| Pass/fail options | Both options are always present and each has a required bilingual description |
| Help | Zero or more bilingual help entries |

Keys are runtime identities used by saved responses and result rules. Treat a key change as a structural change and update every rule that targets it before saving.

## Result Policy

When `anyFailureFails` is enabled, any failed answer produces a failing baseline. Additional nested groups can instead or additionally map configured failure conditions to `pass`, `pass_with_considerations`, or `fail`.

A group has a unique key, bilingual label, result, one or more conditions, and a mode:

| Mode | Meaning |
| --- | --- |
| `any` | At least one child condition matches |
| `all` | Every child condition matches |
| `at_least_count` | At least the configured whole-number count matches; the threshold is 1 through the number of items |
| `at_least_rate` | At least the configured percentage matches; the threshold is greater than 0 and at most 100 |

Conditions can target a failed question or contain another group. Group keys are unique, a question cannot be repeated directly within one group, every referenced question must exist, and groups can be at most three levels deep (a root plus two nested levels).

## Activation, Publication, And Snapshots

A draft uses version 0. Activating a valid draft copies the effective definition to the published field, clears the working copy, marks the schema active, records version 1, and inserts an immutable version record. Editing an active schema writes a working copy without changing its published runtime content. Publishing valid pending content increments the version and records a new immutable version.

Runtime reviews are materialized from published setup/schema snapshots. Existing reviews continue to use their pinned checklist definition and setup lineage after an administrator publishes a newer version.

## Runtime Checklist Behaviour

Runtime reviewers answer pass or fail, add comments according to each question's policy, and can inspect how configured groups produced the current result. Saving validates unique known question keys. Completion additionally requires every required question and every required comment. The result is derived server-side from the pinned definition; clients do not submit an authoritative result.

The result-rules help button opens a side panel that explains the currently effective policy. It shows whether any failed answer fails the checklist; when that shortcut is off, it renders every configured group recursively, including its localized label, matching mode and threshold, resulting status, nested groups, and the localized names of targeted questions. Missing question references are displayed by their stored key, which is a signal to correct and republish the schema. The panel also explains parent-group gating, result severity, and that comments do not determine the result.

Review access, assigned-reviewer rules, completion, approvals, cancellation, and retry are covered by the runtime review workflow. Disabling additional reviewers on the schema removes that capability for work generated from it.

## Failure And Recovery

- Duplicate or missing keys, empty sections/subsections, missing answer options, unknown rule targets, invalid thresholds, or excessive nesting produce localized validation errors.
- Activation fails unless the schema is a valid draft. Publication fails unless it is active and has valid pending content.
- A missing or inaccessible schema is masked consistently; verify the identifier and exact program scope.
- Save and publication recheck fresh authorization and ownership in a transaction. Reload after a concurrent lifecycle change, correct the definition, save, and retry.
- Do not remove or rename questions from published schemas without considering pinned historical responses and future rule behaviour.

See [Streams](./streams.md) for Review Setup generation and [Assessment Schemas](./assessment-schemas.md) for the assessment-style editor.
