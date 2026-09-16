# Source verification receipt

The authoritative continuation marker is maintained only in `.agents/skills/gcs-docs-sync/SKILL.md`. This receipt records the completed synchronization and its verification evidence; `AGENTS.md` contains repository rules and a skill reference, not a duplicate marker.

- Verified at: `2026-09-16T01:17:45-04:00`
- Application repository: `https://github.com/GCS-SSC/gcs-ssc.git`
- Application branch: `main`
- Verified application commit: `395a5c7e62f982ce71b4390fe33fa1dd04480d6b`
- Application committer datetime: `2026-09-15T20:19:52-04:00`
- Previous verified source: `ea20230fe4d61bbb3214879b7b881f5317773d02`
- Incremental review: 231 commit records, reconciled against final behavior; see `incremental-changes.json` and [review scope](./sync-review.md).
- Isolated source checkout: `.reference-repos/gcs-ssc`
- Source worktree: clean; initialized submodules match the recorded gitlinks.
- Final fetched `origin/main`: same as the verified application commit; no remaining drift.
- Documentation starting HEAD: `7e72fa232232d92c15dba85486f7084b3f834e2a`
- Documentation branch: `main`; synchronization changes intentionally uncommitted.
- Sibling `../gcs-ssc`: untouched.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `b77331de9a0c34c16d3720bf7f3cecbb6ac98849` |
| `extensions/gcs-automated-payments` | `edd99ef095eb3e8f196670a42cdc55e677ec7fdf` |
| `extensions/gcs-gcforms-integration` | `195a1a6aad33edae3ea0a9840f3db88c3ae7060c` |
| `extensions/gcs-narrative-quality` | `bb0f2225950d172c82085cd8e0d561b8d7142f1a` |
| `extensions/gcs-narrative-tags` | `4fdc61f535b11fc61973653cb0a6184da344f2d6` |
| `extensions/gcs-outcome-cost-allocation` | `6f80f1b036593b61a958e70bfffb1b0125cfc894` |
| `extensions/gcs-storage-local` | `edb1afed57d6e13143610e5a8b20e6f0340d2291` |
| `extensions/gcs-storage-s3` | `883098eb41f4a3d9dac5a725e4ae55264590d98a` |
| `packages/gcs-ssc-extensions` | `cf3d67196498657f80c7f42f1b9e8e026894b812` |
| `tooling/gcs-ssc` | `6ebb194a6dd13614569ea980daeaf2b7d8abcf2c` |

Concrete extension pins make this source snapshot reproducible; their independent product/implementation documentation remains outside the host documentation scope. The public SDK and host integration contracts are covered.

## Verification results

Bun version: `1.3.13`. Source-dependent commands used `GCS_SSC_SOURCE=.reference-repos/gcs-ssc`.

| Command or check | Result |
| --- | --- |
| `bun run docs:inventory` | Passed; current-source inventory regenerated, including raw-SQL declarations. |
| `bun run docs:references` | Passed; 507 routes in ten bilingual API groups. |
| `bun run docs:audit-impact` | Passed; zero historical dossier entries; runtime Audit remains covered separately. |
| `bun run docs:check` | Passed; terminal coverage, paired structure, source paths/discovery, links, anchors, navigation, redirect, and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed with the deployment base. |
| Repeat generation | Passed; all generated reference and inventory files remained byte-for-byte stable, including curated evidence and statuses. |
| Inventory regression checks | Passed for raw-SQL custom-field/runtime/audit tables, removed generic administration handlers, absent historical dossiers, and retained current Audit routes. |
| Skill-creator `quick_validate.py` | Passed using an isolated PyYAML dependency; no documentation dependency was added. |

The production builds report the existing non-fatal warning for chunks larger than 500 kB. Application runtime/unit/PostgreSQL/browser suites were not run; documentation coverage statuses do not claim that they were. The initial final-pass build caught the internal skill link in the published AGENTS page, and the whitespace check caught an empty-register trailing blank line; both were corrected before the successful runs above.

## Coverage totals

| Ledger | Entries |
| --- | --- |
| `api-coverage.json` | 507 |
| `audit-impact-coverage.json` | 0 |
| `config-coverage.json` | 10 |
| `data-coverage.json` | 497 |
| `domain-coverage.json` | 17 |
| `extension-coverage.json` | 1 |
| `page-coverage.json` | 329 |

All 1361 entries have a current source-backed documentation disposition. Remaining application limitations are explicitly documented in `documentation-findings.md`; there are no unresolved documentation synchronization items.
