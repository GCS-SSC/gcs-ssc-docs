# Source verification receipt

The authoritative continuation marker is maintained only in `.agents/skills/gcs-docs-sync/SKILL.md`. This receipt records the completed synchronization and evidence.

- Verified at: `2026-10-14T15:20:51+00:00`
- Application repository: `https://github.com/GCS-SSC/gcs-ssc.git`
- Branch: `main`
- Verified application commit: `4ccf2f7880349aa3eb94a46c74f591c42a4bb73b`
- Application committer datetime: `2026-10-14T07:06:18-04:00`
- Previous verified source: `c02d847de7078a2110f54c298ed3ef7f3e1b620b`
- Review range: 145 commits and 825 net changed paths; all have dispositions in `incremental-changes.json` and `changed-source-dispositions.json`, with source contracts in `review-groups.json`.
- Isolated checkout: `.reference-repos/gcs-ssc`, clean and detached at the target. Initialized submodules match the gitlinks below. Baseline existence and ancestry passed.
- Final fetched `origin/main`: `4ccf2f7880349aa3eb94a46c74f591c42a4bb73b`; no drift.
- Docs starting HEAD: `f8052ab4cd62bf5847075340eba39e25f3caa682`; starting worktree clean. Final edits intentionally uncommitted.
- Sibling `../gcs-ssc`: untouched.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `854531d05c1a43881073ce8e42297eab0e398c5d` |
| `extensions/gcs-automated-payments` | `836c8bcb62abe8c3207298dba487272db6bc09bc` |
| `extensions/gcs-gcforms-integration` | `bf6402a9777da62eef32af18a50f19b424ee38d5` |
| `extensions/gcs-machine-translation` | `c1819d3353041455cad0081bfb011b480f828f05` |
| `extensions/gcs-narrative-quality` | `1fcd7329ab0e5ae3bdf77da8f72b8d5729de643e` |
| `extensions/gcs-narrative-tags` | `b2b1e897d2f880a8585a6a3446600f0086996982` |
| `extensions/gcs-outcome-cost-allocation` | `69d5af19451dfe6f9fab7a1a7aa5470abec0bebe` |
| `extensions/gcs-ssc-portal-connector` | `1eb39bd659b2273980c90a80d93273607d833b59` |
| `extensions/gcs-storage-local` | `933e55267a04ab757e472831b373a21f9a693f1d` |
| `extensions/gcs-storage-s3` | `7f021314c9d430f2ed831c5cfe5cd3ac98cc714d` |
| `packages/gcs-ssc-extensions` | `38d2dbaf5d0ca94a7e8be94de22a323dd059add0` |
| `tooling/gcs-ssc` | `9eff17dad86db6560cc6ac9ccc75b5da9c7e132d` |

Concrete extension pins make the snapshot reproducible. Their independent implementation guidance remains outside host-documentation scope.

## Verification results

Bun version: `1.3.13`. Source-dependent commands ran from the docs root against the pinned ignored clone.

| Executed command/check | Actual result |
| --- | --- |
| `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory` | Passed; 421 page/shell/component, 677 API, 1,749 data, 1 extension, 20 domain, 12 configuration and 0 historical audit-impact rows. |
| `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references` | Passed; 677 handlers in ten paired API groups. |
| `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:audit-impact` | Passed; zero historical dossier entries; runtime Audit covered separately. |
| `python3 /tmp/check-gcs-inventory.py` | Passed isolated scanner/merger fixtures: preserved curated metadata/status, removed source entries, raw SQL helper and inline constraint discovery, no keyword pseudo-row, distinct case-sensitive enums, deterministic repeat generation. |
| `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check` | Passed after correcting initial SQL enum ID collision/status-command-label failures; terminal coverage, parity, destinations, links, anchors, navigation, redirects, source reconciliation and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed with the deployment base. |
| Repeat all three generators plus SHA-256 comparison | Passed; all 29 generated coverage/API/audit-reference files were byte-for-byte stable after evidence reconciliation and serialization normalization. |
| `git -C .reference-repos/gcs-ssc fetch origin main` and target comparison | Passed; `origin/main` remains the verified target. |

Metadata was advanced after these successful checks. The required checker, whitespace check and deployment-base build passed again after the marker/receipt edits; final generator output remained stable. Builds emit the existing nonfatal warning for chunks larger than 500 kB. Application runtime/unit/PostgreSQL/browser suites and CodeRabbit were not executed. The listed application test bodies were inspected as source evidence only. No live deployment or external service mutation was performed.

## Coverage totals

| Ledger | Entries |
| --- | ---: |
| api | 677 |
| audit-impact | 0 |
| config | 12 |
| data | 1749 |
| domain | 20 |
| extension | 1 |
| page | 421 |

All 2,880 entries have terminal source-backed documentation dispositions, with zero remaining items. Nine new bilingual guide pairs cover Opportunity, Intake, Portal host boundary, Data Collection, financial summary, Corrections, Journal vouchers, Receivables and Credit Memos. Existing application limitations remain in [findings](./documentation-findings.md), including the cross-Agreement Amendment Stream capacity gap. See [review scope](./sync-review.md).
