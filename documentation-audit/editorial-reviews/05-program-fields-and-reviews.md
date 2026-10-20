# Program fields and review schemas editorial review

Reviewed every assigned page in full, with English and French together. Applied the repository guidance and the unslop, bro, and technical-writing skills.

| Page | Disposition |
| --- | --- |
| `en/programs/custom-fields.md` | edited |
| `fr/programs/custom-fields.md` | edited |
| `en/programs/assessment-schemas.md` | edited |
| `fr/programs/assessment-schemas.md` | edited |
| `en/programs/checklist-schemas.md` | edited |
| `fr/programs/checklist-schemas.md` | edited |

## Changes

- State custom-field permissions as actions and required roles. Explain the difference between unrelated profile saves and saves that must satisfy all active required custom fields.
- Replace references to client contracts, detail heroes, canonical content, server locks, and runtime state loading with the action or result the reader needs.
- Clarify JSON import validation, local drafts, saving, publication, and unchanged existing reviews.
- Split dense checklist rules and help-panel descriptions. Keep the modes, thresholds, nesting limits, historical versions, examples, and recovery instructions.
- Fix accents and wording in French assessment headings. Explicit heading identifiers preserve all previous anchors for those headings. Use the same French term, bordereau, for approval routing slips.
- Preserve bilingual examples, exact technical identifiers, permissions, numerical limits, UI labels, links, and screenshots.

## Evidence and checks

Read the final pinned source components `app/components/Checklist/ChecklistResultRulesHelp.vue` and `app/components/Common/Completions/Section.vue` in `.reference-repos/gcs-ssc`. Confirmed the result-help panel shows configured groups when the any-failure rule is off, and that completion displays saved metadata and submits comments with an optional payload. No application tests were executed.

Ran a scoped `git diff --check` against all six assigned pages. Passed. Ran a local Python comparison of paired heading counts and code fences. All three pairs passed, with 9, 22, and 9 headings respectively. Searched for incoming assessment-heading links with `rg`; none were found. Existing heading identifiers were retained regardless.

No global checks, generators, commits, CodeRabbit, or deployment commands were run. The coordinator owns those checks and publication. No cross-batch changes or unresolved questions remain.
