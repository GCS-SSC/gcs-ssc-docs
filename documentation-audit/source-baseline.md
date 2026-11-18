# Source verification receipt

The authoritative continuation marker is in `.agents/skills/gcs-docs-sync/SKILL.md`.

- Verified at `2026-11-18T13:32:21+00:00`.
- Application repository `https://github.com/GCS-SSC/gcs-ssc.git`, branch `main`.
- Verified application commit `af5d8a67df7c6266e1d34641a44b8a4935ac4f09`, committed `2026-11-18T02:21:27-05:00`.
- Previous verified source `51ba383408ba6cd5eab40d55c9504af50916e2b6`.
- Range of 44 commits and 1,504 net changed paths. See the [source review and dispositions](./sync-nov18-progress.json).
- Isolated checkout `.reference-repos/gcs-ssc`, clean and detached. Baseline ancestry passed and all 13 initialized gitlinks match. The final fetch confirmed that `origin/main` still matched the reviewed target. The sibling repository was untouched.
- Documentation continuation started at `15964125e522b0050eaa09e3a29bd70b89530e13` with existing uncommitted sync work preserved.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `5820c69b1cbc1be7f56471d1bb4d60b443e1b09e` |
| `extensions/gcs-automated-payments` | `d29149d7c7ffd2319eaad051ade25acce82f6985` |
| `extensions/gcs-gcforms-integration` | `f4d9b5b9fcf3a73cc5037066787493e7e5c77183` |
| `extensions/gcs-machine-translation` | `b2851d8832294197f1ccd4f2542ba5ae325d671a` |
| `extensions/gcs-narrative-quality` | `3763ddeb60701b44df0e59c8141b8804bac787b2` |
| `extensions/gcs-narrative-tags` | `393f304413603635f74e2c5695f1222f1f2aafe2` |
| `extensions/gcs-outcome-cost-allocation` | `86dc64c1db134308f18c57e41d53521f297ab8eb` |
| `extensions/gcs-ssc-gcnotify` | `fa63e42dbd8d42998a690b9a4afb2c13e59e9279` |
| `extensions/gcs-ssc-portal-connector` | `34f76433b0e1a3baec1b7ba518d766e2606d89bd` |
| `extensions/gcs-storage-local` | `7f46dc38d004462d2e8282932054550935a810ef` |
| `extensions/gcs-storage-s3` | `4a428601472a912f0760fd5bf9a2f4bd6495f845` |
| `packages/gcs-ssc-extensions` | `ee1e2f4758501204ea60eb43a5f7df3cd79788e9` |
| `tooling/gcs-ssc` | `7664e0b7cf156cbf54a33afebb3d5673dddc2ca4` |


## Executed verification

Source-dependent commands used `GCS_SSC_SOURCE=.reference-repos/gcs-ssc` with Bun 1.3.13.

| Command or check | Actual result |
| --- | --- |
| `bun run docs:inventory` | Passed. 441 page/component, 725 API, 1,825 data, 20 domain, 12 configuration, one extension, and zero historical audit-impact entries. |
| `bun run docs:references` | Passed. 725 routes in ten bilingual groups. |
| `bun run docs:audit-impact` | Passed. Zero historical dossier rows. |
| `bun run docs:check` | Passed. Coverage, parity, navigation, links, anchors, redirects, source reconciliation, and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed. |
| Repeated generators and SHA-256 comparison | Passed. No changes to generated coverage or API references. |
| Skill validation | Passed. |
| Final application fetch | Passed. No drift. |

Both builds emitted a nonfatal warning for chunks larger than 500 kB. Coverage dispositions record source-to-documentation review. Application tests, live deployment checks, and CodeRabbit were not run. Screenshots were not regenerated. Changes are uncommitted.

See [status](./status.md) and [findings](./documentation-findings.md).
