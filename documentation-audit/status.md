# Documentation synchronization status

## Current phase

`COMPLETE` — the bilingual documentation is synchronized through application `main` commit `c02d847de7078a2110f54c298ed3ef7f3e1b620b` (`2026-09-24T10:28:18-04:00`). The prior baseline was `395a5c7e62f982ce71b4390fe33fa1dd04480d6b`. All 1,485 coverage rows are terminal, with zero remaining items.

## Verification

- The isolated `.reference-repos/gcs-ssc` clone is clean at the pinned target, with initialized gitlinks; the final fetch found `origin/main` at the same commit. The sibling application working repository was untouched.
- English and French guides cover Agency catalogs, Stream selections, group claimable work, live Home queues, scoped notes, Agreement–Proponent classification, Audit attribution, workflow conditions, checklists and deployment changes. The 51 commits have dispositions in `incremental-changes.json`.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory`, `docs:references` and `docs:audit-impact` passed. Repeat generation left all 27 generated files byte-for-byte stable.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check` passed, including terminal source coverage, locale parity, links and production build. `git diff --check` and `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` passed.
- The builds emitted the existing nonfatal warning for chunks larger than 500 kB. No application runtime tests, browser tests or CodeRabbit review were run or claimed.

See the [verification receipt](./source-baseline.md), [review scope](./sync-review.md) and [findings](./documentation-findings.md). Changes are intentionally uncommitted.
