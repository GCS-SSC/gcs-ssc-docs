# Source verification receipt

The authoritative continuation marker is in `.agents/skills/gcs-docs-sync/SKILL.md`.

- Verified at: `2026-10-24T00:31:40+00:00`.
- Application repository: `https://github.com/GCS-SSC/gcs-ssc.git`.
- Branch: `main`.
- Verified application commit: `51ba383408ba6cd5eab40d55c9504af50916e2b6`.
- Application committer datetime: `2026-10-23T19:14:04-04:00`.
- Previous verified source: `dcbe779afa3c89adb9f0f798dd1b274e92a50939`.
- Range: 13 commits and 124 net paths without rename detection, including the deleted and replacement scheduler files. All have reviewed dispositions.
- Isolated checkout: `.reference-repos/gcs-ssc`, clean and detached at the target. Baseline existence and ancestry passed. All twelve initialized gitlinks match.
- Final fetched `origin/main`: `51ba383408ba6cd5eab40d55c9504af50916e2b6`, with no drift.
- Documentation starting HEAD: `668abb6b48b5e06f0ce69fc315171bc91416091f`, clean worktree.
- Sibling `../gcs-ssc`: untouched.

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
| `extensions/gcs-ssc-portal-connector` | `7138854311346212686910a3335ec4b785f7a507` |
| `extensions/gcs-storage-local` | `a34e36a5fcd9dd6c4b02028ffa664ada83531dfc` |
| `extensions/gcs-storage-s3` | `c2b7a74a0cca68b6e794e709f509a1ae994375ae` |
| `packages/gcs-ssc-extensions` | `7e0113c8be319f769a928dbf75faba590ebef8ef` |
| `tooling/gcs-ssc` | `e16792bada568099a7f87f4ba48964b2369a9ece` |

Concrete extensions own their implementation documentation. Their pins identify this snapshot. This repository covers host behavior and the public SDK boundary.

## Executed verification

Bun version was `1.3.13`. Source-dependent commands used `GCS_SSC_SOURCE=.reference-repos/gcs-ssc` from the documentation root.

| Command or check | Actual result |
| --- | --- |
| `bun run docs:inventory` | Passed: 443 page/component, 706 API, 1,768 data, 20 domain, 12 configuration, one extension, and zero historical audit-impact rows. |
| `bun run docs:references` | Passed: 706 routes in ten bilingual groups. |
| `bun run docs:audit-impact` | Passed: no historical dossier rows. Runtime Audit remains documented. |
| `bun run docs:check` | Passed: source coverage, locale parity, navigation, destinations, links, anchors, redirects, reconciliation, and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed. |
| Generator fixture | `python /tmp/gcs-docs-oct23-generator-fixture.py` passed shared-schema discovery, raw-SQL table/function discovery, curated-evidence preservation, deterministic output, and removed-source cleanup in an isolated temporary fixture. |
| Repeat generators and SHA-256 comparison | Passed: 29 generator-owned coverage/reference artifacts unchanged after the first repeat normalized the queue configuration source list. |
| Final source fetch | Passed: still matches the reviewed target. |

Both builds emitted the existing nonfatal warning for chunks larger than 500 kB. The marker advanced only after successful checks. The post-marker documentation checker, whitespace verification, and deployment-base build passed again.

All 2,950 coverage entries have terminal source-backed dispositions, with zero remaining items. New shared schema declarations, queue tables, financial constraints, API routes, and components were reviewed. Unchanged mechanisms in large baseline files retain prior evidence. `DOCUMENTED_VERIFIED` describes documentation coverage.

All revised passages received the requested bro plain-language review. Paired examples and recovery instructions were checked for meaning, amounts, identifiers, and sequence. Application runtime, unit, PostgreSQL, and browser tests, CodeRabbit, and live application deployment checks were not run. Source deployment receipts are attributed historical evidence. Screenshots were not regenerated.

See [review scope](./sync-review.md), [status](./status.md), [findings](./documentation-findings.md), and [coverage](./sync-coverage.json). Publication to documentation `main` and GitHub Pages is authorized. Deployment results are reported separately from source synchronization.
