# Proponent records editorial review

Reviewed all 16 assigned pages in full, reading both languages before editing. Applied the unslop, bro, and technical-writing guidance. All pages are edited.

## Page dispositions

- `en/proponents/addresses.md`: edited.
- `fr/proponents/addresses.md`: edited.
- `en/proponents/agreements.md`: edited.
- `fr/proponents/agreements.md`: edited.
- `en/proponents/contacts.md`: edited.
- `fr/proponents/contacts.md`: edited.
- `en/proponents/funding-history.md`: edited.
- `fr/proponents/funding-history.md`: edited.
- `en/proponents/other-names.md`: edited.
- `fr/proponents/other-names.md`: edited.
- `en/proponents/registries.md`: edited.
- `fr/proponents/registries.md`: edited.
- `en/proponents/reviews.md`: edited.
- `fr/proponents/reviews.md`: edited.
- `en/proponents/team.md`: edited.
- `fr/proponents/team.md`: edited.

## Changes

- Replaced endpoint, child-row, transaction, and response-container descriptions with user actions and visible results.
- Clarified shared-contact recovery, address precision, recipient selection, registry permissions, and the primary-user change.
- Added the navigation steps for proponent reviews. Kept retry history, terminal states, exact access conditions, financial limits, examples, and recovery instructions.
- Used sentence case for English page titles and straight quotation marks. Existing heading anchors and all link targets remain unchanged.
- Kept equivalent changes in English and French. No edits outside the assigned pages and this report.

## Source evidence

Inspected the pinned reference clone's `shared/types/schemas/applicant-recipient.ts` registry schema and `server/api/applicant-recipients/[id]/registries/index.post.ts`. Confirmed exact 9-digit, 15-digit, and 2-to-6-digit registry formats, text validation, the `other` comment requirement, and fresh authorization on creation. Inspected the funding-history unlink handler `server/api/applicant-recipients/[id]/funding-history/[historyId].delete.ts` when simplifying deletion wording. Other source-backed contracts from synchronization were preserved.

## Verification

- Read the complete assigned English and French pages and inspected the resulting diffs.
- Ran a Python comparison for all eight bilingual pairs. Section counts and ordered Markdown link targets match.
- Ran `git diff --check --` with the 16 assigned paths. Passed.
- No application tests, global documentation checks, generators, or CodeRabbit runs were performed. The coordinator owns final verification.

No blockers or cross-batch changes requested.
