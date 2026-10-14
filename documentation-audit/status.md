# Documentation synchronization status

## Current phase

`COMPLETE` — bilingual documentation is synchronized through application `main` commit `4ccf2f7880349aa3eb94a46c74f591c42a4bb73b` (`2026-10-14T07:06:18-04:00`), after baseline `c02d847de7078a2110f54c298ed3ef7f3e1b620b`. All 2,880 ledger entries have terminal reviewed dispositions, with zero remaining items. Changes are intentionally uncommitted.

## Verification

- The ignored reference clone is clean at the pinned target with initialized gitlinks. Baseline ancestry passed; the final fetch found no drift. The sibling application working repository was untouched.
- All 145 commits and 825 net changed paths have dispositions. Nine new guide pairs and updated existing pages cover final behavior, permissions, examples and recovery; source/regression evidence is recorded in review groups.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory`, `docs:references` and `docs:audit-impact` passed. Repeat generation left all 29 generated files byte-for-byte stable.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check`, `git diff --check` and `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` passed. Initial inventory collision/status-label issues were fixed; verification was not weakened.
- Inventory fixture checks passed curated evidence preservation, vanished source removal, SQL helpers/inline constraints, constraint-trigger exclusion, distinct case-sensitive enum identities and deterministic generation.
- Builds emitted the existing nonfatal warning for chunks larger than 500 kB. Application runtime/unit/PostgreSQL/browser suites, CodeRabbit and live-deployment checks were not executed or claimed.
- Post-marker checks and the final rerun after independent parallel corrections passed: all three generators, `docs:check`, `git diff --check` and the deployment-base build. All 29 generated files remained stable; the last source fetch still matches the target.

See [verification receipt](./source-baseline.md), [review scope](./sync-review.md), [review groups](./review-groups.json) and [findings](./documentation-findings.md). The separate cross-Agreement Amendment Stream capacity gap remains documented; annual usage checks do not resolve it.
