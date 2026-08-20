# Documentation synchronization status

## Current phase

`COMPLETE` — the incremental bilingual synchronization through application `main` commit `45222e26c5a98dccb8b4a574571206bbf1f91397` is complete. Every inventory has zero remaining items and every required documentation gate passes.

## Baseline and scope

- Previous application baseline: `debd15e3600e9c140b23756d849dc40964a27910`
- Final application target: `45222e26c5a98dccb8b4a574571206bbf1f91397` (`2026-08-19T14:12:34-04:00`)
- Increment reviewed: 21 application commits, previous baseline exclusive and target inclusive
- Documentation starting HEAD: `ba66e802f1df5f9d08ea4541b5eca3248732d7da`
- Reference source: clean ignored clone at `.reference-repos/gcs-ssc`; the sibling application working repository was not accessed or changed
- Final drift check: application `HEAD` and fetched `origin/main` match the target; all six recorded gitlinks are unchanged and clean

## Synchronized changes

- Replaced direct Team access with exact entity assignments and documented the cumulative Viewer/Contributor/Manager role ceiling, independent `manage_assignments` grant, active roster invariants, creator-primary child creation, and exact-assignment mutation boundary.
- Added paired Assignment Management guidance, navigation, direct Assigned Work/detail routes, eligible-user rules, lifecycle locks, and embedded Agreement/Proponent Assigned users guidance.
- Reconciled all independently assignable Agreement children: claims, claim reconciliations, payments, forecasts, monitors, amendments, commitments, reviews, and recommendations.
- Documented workflow setup resolution, direct recommendation work, immutable Agreement/amendment approval packets, SHA-256 verification, revision promotion, cancellation recovery, and the remaining amendment-capacity limitation.
- Updated operator/developer material for the public Railway health route, Docker workspace ordering, shared demo migration builder, `plpgsql`, guarded manual spreadsheet primitives, removed wholesale reconciliation, authorization package boundaries, data model, tests, and extension behavior.
- Replaced the navigation and role-permission screenshots in both locales from the target application.
- Updated the generator mappings and discovery logic for Assignment Management, Assigned users, claim reconciliations, direct recommendations, inline schema creation, the Home dashboard, and the authorization/domain source move.
- Updated findings DOC-008 and DOC-010 as resolved and added DOC-035 through DOC-037 for dashboard placeholders, overlapping workflow-scope selection, and the active-run amendment cancellation mismatch. DOC-009 remains the source-backed amendment budget-capacity warning.

## Final inventories

| Ledger | Rows | Non-terminal |
| --- | ---: | ---: |
| Pages, layouts, middleware, and components | 296 | 0 |
| API handlers | 432 | 0 |
| Data and migration mechanisms | 255 | 0 |
| Host and installed extensions | 106 | 0 |
| Domains | 16 | 0 |
| Configuration | 10 | 0 |
| Historical audit impact | 102 | 0 |

The sync reopened and reverified 62 page/component, 242 API, 229 data, 106 extension, 12 domain, 9 configuration, and 31 audit-impact rows. It also added and verified eight new page/component rows, 17 new API rows, 44 new data rows, and one new domain row.

## Verification evidence

- Exact Bun runtime: all final commands use `bunx bun@1.3.13` because the system `bun` binary is 1.3.10.
- Focused application unit tests: 29 files and 327 tests passed, covering assignment authorization/management, role permissions, assigned routes, workflow/recommendation runtime, approval packets and revision locking, amendment behavior, claim reconciliation, migrations, health/Railway, Docker/WebContainer preparation, and spreadsheet manual-workflow guards.
- Managed E2E: `assignment-management.spec.ts` passed 1/1 and `role-permissions-lifecycle.spec.ts` passed 1/1.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bunx bun@1.3.13 run docs:inventory` generated 296/432/255/106/16/10/102 rows.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bunx bun@1.3.13 run docs:references` generated 432 route rows in ten bilingual groups.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bunx bun@1.3.13 run docs:audit-impact` generated 102 bilingual dispositions.
- The `bun run docs:check` task, invoked with `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bunx bun@1.3.13 run docs:check`, passed coverage, locale parity, navigation, links, anchors, redirects, source reconciliation, and the production build.
- `VITEPRESS_BASE=/gcs-ssc-docs/ bunx bun@1.3.13 run docs:build` passed; both builds emitted only the existing non-failing chunk-size warning.
- `git diff --check` passed.
- CodeRabbit completed two full review passes. All actionable findings were corrected in both languages; repeated requests for a nonexistent amendment-capacity guard, and suggestions contradicted by exact-approval, role-scope, forecast, document, and payment source were rejected after direct verification. A third review attempt was unavailable because the account's three-review quota was exhausted for 36 minutes.

PostgreSQL-only suites were unavailable because `POSTGRES_TEST_URL`, `DATABASE_URL`, `AGREEMENT_CONCURRENCY_POSTGRES_TEST_URL`, and `OUTCOME_ALLOCATION_POSTGRES_TEST_URL` are not configured. This is an environment limitation, not a failed test; the focused migration/PGlite coverage passed.

## Blockers

None.

## Exact next action

None. The caller-authorized documentation `main` commit and push are the publication step for this completed synchronization.
