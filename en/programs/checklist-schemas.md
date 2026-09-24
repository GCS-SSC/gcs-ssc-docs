# Checklist Schemas

Checklist schemas define bilingual pass/fail questions and deterministic result rules for runtime reviews. They are agency-owned review schemas, opened from an Agency Review Set member, and must match the setup's runtime entity type.

## Prerequisites And Navigation

Create the Agency Review Set first. In its detail editor, associate an existing same-Agency checklist schema or create a checklist member. Selecting the member opens the checklist editor; its breadcrumb returns to the Agency Review Sets tab. Link the published Review Set to an eligible Stream for runtime use.

Users need Agency read access to view the schema and Agency update access to save, publish, or retire it. Client controls mirror those permissions, while the server independently resolves the active Agency and schema chain.

## Editor Sections

The editor has three anchored sections:

1. General: bilingual schema name, bilingual runtime outcome name, and the option to disable additional reviewers.
2. Sections: ordered sections, subsections, and questions.
3. Result Rules: the default failure policy and nested conditional result groups.

The hero shows entity type, draft/published/retired publication state, version, and whether unpublished changes exist. Save validates the whole definition. The publish action first saves, then publishes the first draft or pending changes to an already published schema.

## Sections And Questions

Every section has a unique language-independent key and English/French label. It must contain at least one direct question or a subsection. Every subsection also has a unique key, bilingual label, and at least one question.

Every question contains:

| Field | Rule |
| --- | --- |
| Language-independent key | Required and unique across the complete schema |
| English/French question | Both required |
| Required | Controls whether completion requires an answer |
| Comment policy | `optional`, `required`, `required_on_fail`, `required_on_not_applicable`, or `required_on_fail_or_not_applicable` |
| Pass/fail options | Pass and Fail are always present; an optional Not applicable choice may be added, each with a required bilingual description |
| Help | Zero or more bilingual help entries |

Keys are runtime identities used by saved responses and result rules. Treat a key change as a structural change and update every rule that targets it before saving.

## Import a JSON definition

The editor's **Import** action accepts a pasted JSON checklist definition. It validates syntax and the full definition contract, then replaces only the local draft. Inspect the bilingual questions, optional Not applicable answers, and result rules before **Save** and **Publish**. A failed import leaves the current draft intact; import alone does not alter published or runtime snapshots.

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

## Publication and snapshots

A draft has no published version. Publishing a valid definition creates immutable version `1`; each changed publication increments the integer version by one. Saving after publication changes authoring content only. Identical canonical content keeps the current published version. Retiring a published schema is permanent and prevents new selection, edits and publication.

Runtime reviews retain the exact schema and setup publication versions that generated them. For example, publishing a new required question does not insert that question into an already generated checklist. Publish the consuming Review Setup before expecting future work to use the new schema. Historical attempts retain their own answers and rules.

## Runtime Checklist Behaviour

Runtime reviewers answer pass or fail, add comments according to each question's policy, and can inspect how configured groups produced the current result. Saving validates unique known question keys. Completion additionally requires every required question and every required comment. The result is derived server-side from the pinned definition; clients do not submit an authoritative result.

The result-rules help button opens a side panel that explains the currently effective policy. It shows whether any failed answer fails the checklist; when that shortcut is off, it renders every configured group recursively, including its localized label, matching mode and threshold, resulting status, nested groups, and the localized names of targeted questions. Missing question references are displayed by their stored key, which is a signal to correct and republish the schema. The panel also explains parent-group gating, result severity, and that comments do not determine the result.

Review access, assigned-reviewer rules, completion, approvals, cancellation, and retry are covered by the runtime review workflow. Disabling additional reviewers on the schema removes that capability for work generated from it.

## Failure And Recovery

- Duplicate or missing keys, empty sections/subsections, missing answer options, unknown rule targets, invalid thresholds, or excessive nesting produce localized validation errors.
- Publication requires valid authoring content and a non-retired publication.
- A missing or inaccessible schema is masked consistently; verify the identifier and exact program scope.
- Save and publication recheck fresh authorization and ownership in a transaction. Reload after a concurrent lifecycle change, correct the definition, save, and retry.
- Do not remove or rename questions from published schemas without considering pinned historical responses and future rule behaviour.

See [Streams](./streams.md) for Review Setup generation and [Assessment Schemas](./assessment-schemas.md) for the assessment-style editor.
