# Source verification receipt

The authoritative continuation marker is in `.agents/skills/gcs-docs-sync/SKILL.md`. This receipt records the completed source synchronization and its executed checks.

- Verified at: `2026-10-20T14:30:00+00:00`.
- Application repository: `https://github.com/GCS-SSC/gcs-ssc.git`.
- Branch: `main`.
- Verified application commit: `dcbe779afa3c89adb9f0f798dd1b274e92a50939`.
- Application committer datetime: `2026-10-20T09:13:18-04:00`.
- Previous verified source: `a50e1429bf634145a6a933f0faa3d20907a7ca6b`.
- Range: 89 commits, 677 net paths without rename detection, or 675 paths in the rename-collapsed summary. All have reviewed dispositions. Fifty-eight current groups have final source contracts and paired destinations.
- Isolated checkout: `.reference-repos/gcs-ssc`, clean and detached at the exact target. Baseline existence and ancestry passed. All initialized gitlinks match.
- Final fetched `origin/main`: `dcbe779afa3c89adb9f0f798dd1b274e92a50939`, with no drift.
- Documentation starting HEAD: `7090538257d74a1a1cfdde3a4382204b77ae903a`, clean worktree.
- Sibling `../gcs-ssc`: untouched.
- Scope: source synchronization and the completed whole-site editorial review. Publication follows this receipt.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `41721b21f970cc68ad8b1de299ae5f0d6e07ff15` |
| `extensions/gcs-automated-payments` | `4f807d4346a4b5a87d9e61965bc3be2d52f9dbd9` |
| `extensions/gcs-gcforms-integration` | `6997fcd7a668b9532b46d53d8562b7c072fc0b03` |
| `extensions/gcs-machine-translation` | `c2e07936bd727815a1dbf613df53eff8cb606cd0` |
| `extensions/gcs-narrative-quality` | `562115bd7e175fbd592ff8b85b5dd923d004e4a8` |
| `extensions/gcs-narrative-tags` | `d0be536d3f9d5c8219a013c8289dfb48bc9887bd` |
| `extensions/gcs-outcome-cost-allocation` | `e1cc5fde944a21797b8190370dd5889ab776c87a` |
| `extensions/gcs-ssc-portal-connector` | `92bab8b2be225a0c6af034d05801a132c8ba7be2` |
| `extensions/gcs-storage-local` | `933e55267a04ab757e472831b373a21f9a693f1d` |
| `extensions/gcs-storage-s3` | `24a878177c1cf746eca49fec3f264fc6a5dae9ea` |
| `packages/gcs-ssc-extensions` | `b955ba5dde9097e69127e172343ee2aa4eade91f` |
| `tooling/gcs-ssc` | `17d95e682b74de3364ead5e1afd7392daa064767` |

Concrete extensions own their implementation documentation. Their pins identify the inspected snapshot. Host behavior and the public SDK boundary are documented here.

## Executed verification

Bun version was `1.3.13`. Source-dependent commands ran from the documentation root with `GCS_SSC_SOURCE=.reference-repos/gcs-ssc`.

| Command or check | Actual result |
| --- | --- |
| `bun run docs:inventory` | Passed. Generated 438 page/component, 703 API, 1,753 data, 20 domain, 12 configuration, one extension, and zero historical audit-impact rows. |
| `bun run docs:references` | Passed. Generated 703 routes in ten bilingual groups. |
| `bun run docs:audit-impact` | Passed. No historical dossier rows. Runtime Audit remains documented. |
| `bun run docs:check` | Passed after pending status wording included the required command name. Source coverage, locale structure, navigation, destinations, links, anchors, redirects, reconciliation, and production build passed. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed with the deployment base. |
| Repeat generators and SHA-256 comparison | Passed. All 30 compared coverage/reference artifacts unchanged after evidence reconciliation. |
| Final source fetch | Passed. `origin/main` still matches the reviewed target. |

The marker advanced only after the commands above succeeded. The post-marker documentation checker passed again. Both builds emitted the existing nonfatal warning about chunks larger than 500 kB.

All 2,927 coverage entries have terminal source-backed dispositions, with zero remaining items. The review includes 27 new API rows, 20 new page/component rows, and 238 new SQL declaration IDs. Unchanged evidence retains its earlier baseline review. `DOCUMENTED_VERIFIED` describes documentation coverage.

Documentation scripts were unchanged during source synchronization. The editorial phase later changed prose rendering in the API and historical-impact generators. Application runtime, unit, PostgreSQL and browser tests, CodeRabbit, and live deployment checks were not executed during source synchronization. Regression files listed in area receipts were inspected only. Source deployment receipts are historical evidence rather than tests executed by this run. See [review scope](./sync-review.md), [status](./status.md), [findings](./documentation-findings.md), and [coverage receipt](./sync-coverage.json).

## Final editorial verification

All 22 editorial batches completed, covering 175 product pages plus README and five maintenance records. Final corrections align Home dashboard page sizes and distinct Claim reconciliation and workflow-owner assignments with current source. The source marker remains unchanged because the final fetched `origin/main` still matches the verified target.

With Bun `1.3.13`, inventory, API reference, and audit-impact generation passed again. All 29 generator-owned artifacts were unchanged, preserving curated source evidence and terminal statuses. The final `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check`, `git diff --check`, and `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` passed after the editorial content changes. The builds retained the existing nonfatal chunk-size warning. A separate actual-file check found no trailing whitespace, including in newly added pages.

Independent temporary fixtures compared the original and edited API generators against identical source. All 703 handler rows matched in each locale. Added and removed route and historical-finding fixtures verified discovery and removal behavior. No application tests ran. Exact boundaries and results are in [final verification](./final-verification.md). No commit, push, or deployment was performed by the verification phase.
