# Source verification receipt

The authoritative continuation marker is in `.agents/skills/gcs-docs-sync/SKILL.md`. This receipt records the completed review and executed checks.

- Verified at: `2026-10-15T22:29:18+00:00`
- Application repository: `https://github.com/GCS-SSC/gcs-ssc.git`
- Branch: `main`
- Verified application commit: `a50e1429bf634145a6a933f0faa3d20907a7ca6b`
- Application committer datetime: `2026-10-15T13:08:07-04:00`
- Previous verified source: `4ccf2f7880349aa3eb94a46c74f591c42a4bb73b`
- Range: 43 commits and 134 net changed paths; all have dispositions in `incremental-changes.json` and `changed-source-dispositions.json`. Final contracts and inspected regression sources are in `review-groups.json`; prior groups remain for unchanged coverage evidence.
- Isolated checkout: `.reference-repos/gcs-ssc`, clean and detached at the exact target. Baseline existence and ancestry passed. Initialized gitlinks match the target below.
- Final fetched `origin/main`: `a50e1429bf634145a6a933f0faa3d20907a7ca6b`; no drift.
- Docs starting HEAD: `9640482faf57ed6bdcf011ba2a60ef6d1828bade`; starting worktree clean. Final edits are uncommitted.
- Sibling `../gcs-ssc`: untouched.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `854531d05c1a43881073ce8e42297eab0e398c5d` |
| `extensions/gcs-automated-payments` | `b22814640292d44169a4068b094306d0bcbc4972` |
| `extensions/gcs-gcforms-integration` | `bf6402a9777da62eef32af18a50f19b424ee38d5` |
| `extensions/gcs-machine-translation` | `c1819d3353041455cad0081bfb011b480f828f05` |
| `extensions/gcs-narrative-quality` | `1fcd7329ab0e5ae3bdf77da8f72b8d5729de643e` |
| `extensions/gcs-narrative-tags` | `b2b1e897d2f880a8585a6a3446600f0086996982` |
| `extensions/gcs-outcome-cost-allocation` | `69d5af19451dfe6f9fab7a1a7aa5470abec0bebe` |
| `extensions/gcs-ssc-portal-connector` | `e0b9f998e23b23c34a331fcd4a5a46111f45098c` |
| `extensions/gcs-storage-local` | `933e55267a04ab757e472831b373a21f9a693f1d` |
| `extensions/gcs-storage-s3` | `7f021314c9d430f2ed831c5cfe5cd3ac98cc714d` |
| `packages/gcs-ssc-extensions` | `940f507a13df41d19324c271d689af00e8917c4a` |
| `tooling/gcs-ssc` | `5c48b96d51aed51aa3d08970ae1c1f66deaa1120` |

Concrete extensions own their implementation documentation. Their pins make the inspected source snapshot reproducible; host/public SDK changes are covered here.

## Executed verification

Bun version: `1.3.13`. All source-dependent commands ran from the documentation root against the pinned ignored clone.

| Command or check | Actual result |
| --- | --- |
| `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory` | Passed: 421 page/shell/component, 676 API, 1,750 data, 1 extension, 20 domain, 12 configuration and 0 historical audit-impact rows. |
| `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references` | Passed: 676 routes in ten bilingual groups; removed Forecast header PATCH and changed validation/authorization references reconciled. |
| `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:audit-impact` | Passed: no historical dossier rows. Runtime Audit remains separately documented. |
| `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check` | Passed: terminal source coverage, locale structure, navigation, destinations, links, anchors, redirects, source reconciliation and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed with the deployment base. |
| Repeat all three generators and SHA-256 comparison | Passed: all 29 generated files unchanged after evidence reconciliation. |
| `git -C .reference-repos/gcs-ssc fetch origin main` and target comparison | Passed: `origin/main` still matches the reviewed target. |

The marker was advanced only after the checks above passed. The post-marker documentation checker, whitespace check and deployment-base build passed again. Final receipt and evidence corrections are included in the concluding verification rerun.

Builds emitted the existing nonfatal warning for chunks larger than 500 kB. Documentation tooling scripts were unchanged. Application runtime/unit/PostgreSQL/browser tests, CodeRabbit and live-deployment checks were not executed. Application test bodies listed in review groups were inspected only. Source deployment receipts are attributed historical evidence, not checks executed by this documentation run.

## Coverage totals

| Ledger | Entries |
| --- | ---: |
| api | 676 |
| audit-impact | 0 |
| config | 12 |
| data | 1750 |
| domain | 20 |
| extension | 1 |
| page | 421 |

All 2,880 entries have terminal source-backed documentation dispositions, with zero remaining items. Six new schema/migration entries were reviewed; removed mechanisms/routes were dropped. Unchanged evidence retains its earlier baseline review. `DOCUMENTED_VERIFIED` describes documentation coverage, not application test execution.

The simpler English and French guide language is preserved. The cross-Agreement Amendment Stream-capacity gap and remaining duplicate-coordinate/import caveats are documented in [findings](./documentation-findings.md). See [review scope](./sync-review.md) and [status](./status.md).
