# Documentation synchronization status

## Current phase

`COMPLETE` — bilingual documentation is synchronized to pinned application `main` commit `a50e1429bf634145a6a933f0faa3d20907a7ca6b` (`2026-10-15T13:08:07-04:00`), after baseline `4ccf2f7880349aa3eb94a46c74f591c42a4bb73b`. All 2,880 coverage entries have reviewed terminal dispositions, with zero remaining items. The authoritative marker has advanced after successful verification.

## Verification

- The isolated reference clone is clean and detached at the target; baseline ancestry and initialized gitlinks passed. The sibling application repository was untouched.
- All 43 commits and 134 net changed paths have review dispositions. Both locales retain the simpler guide language.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory`, `docs:references` and `docs:audit-impact` passed. Removed API/schema entries and six new data entries were reconciled.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check`, `git diff --check` and `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` passed. Builds emitted the existing nonfatal warning for chunks larger than 500 kB.
- Repeat generation left all 29 generated files byte-for-byte stable. Final fetch still matches the target.
- Application runtime/unit/PostgreSQL/browser tests, CodeRabbit and live deployments were not run. Application regression bodies were inspected only.

See [review scope](./sync-review.md), [review groups](./review-groups.json), [findings](./documentation-findings.md) and [verification receipt](./source-baseline.md). The separate cross-Agreement Amendment Stream capacity gap remains documented. Changes are uncommitted.
