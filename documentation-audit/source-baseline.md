# Source verification receipt

The authoritative continuation marker is in `.agents/skills/gcs-docs-sync/SKILL.md`.

- Verified at `2026-11-18T15:30:37+00:00`.
- Application repository `https://github.com/GCS-SSC/gcs-ssc.git`, branch `main`.
- Verified application commit `9252d8fbe5b947161b7ecd3345c08a67d391151e`, committed `2026-11-18T10:16:22-05:00`.
- Previous verified source `af5d8a67df7c6266e1d34641a44b8a4935ac4f09`. The [previous source review](./sync-nov18-progress.json) remains available.
- Range of six commits and 13 net changed paths. See the [source review and dispositions](./sync-nov18-financial-creation.md).
- Isolated checkout `.reference-repos/gcs-ssc`, clean and detached. The previous baseline is an ancestor of the target, all 13 initialized gitlinks match, and the final fetch confirmed that `origin/main` still matched the target.
- Documentation checkout started clean at `535c5baea1b331ef13f8047d871561baac81da7b`.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `5820c69b1cbc1be7f56471d1bb4d60b443e1b09e` |
| `extensions/gcs-automated-payments` | `d29149d7c7ffd2319eaad051ade25acce82f6985` |
| `extensions/gcs-gcforms-integration` | `6d97d8298bd9b5bc98d7e8ef0f1bd94605d6377d` |
| `extensions/gcs-machine-translation` | `b2851d8832294197f1ccd4f2542ba5ae325d671a` |
| `extensions/gcs-narrative-quality` | `3763ddeb60701b44df0e59c8141b8804bac787b2` |
| `extensions/gcs-narrative-tags` | `393f304413603635f74e2c5695f1222f1f2aafe2` |
| `extensions/gcs-outcome-cost-allocation` | `86dc64c1db134308f18c57e41d53521f297ab8eb` |
| `extensions/gcs-ssc-gcnotify` | `fa63e42dbd8d42998a690b9a4afb2c13e59e9279` |
| `extensions/gcs-ssc-portal-connector` | `34f76433b0e1a3baec1b7ba518d766e2606d89bd` |
| `extensions/gcs-storage-local` | `7f46dc38d004462d2e8282932054550935a810ef` |
| `extensions/gcs-storage-s3` | `4a428601472a912f0760fd5bf9a2f4bd6495f845` |
| `packages/gcs-ssc-extensions` | `84978d52947b47a2a63b7d4965769aac26e2851f` |
| `tooling/gcs-ssc` | `4e82150bbaef59ccb65200f511be138acd92faaa` |

## Executed verification

Source-dependent commands used `GCS_SSC_SOURCE=.reference-repos/gcs-ssc` with Bun 1.3.13.

| Command or check | Result |
| --- | --- |
| `bun run docs:inventory` | Passed. 441 page/component, 725 API, 1,825 data, 20 domain, 12 configuration, one extension, and zero historical audit-impact entries. |
| `bun run docs:references` | Passed. 725 routes in ten bilingual groups. |
| `bun run docs:audit-impact` | Passed. Zero historical dossier rows. |
| `bun run docs:check` | Passed. Coverage, parity, navigation, links, anchors, redirects, source reconciliation, and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed. |
| Final application fetch | Passed. The reviewed target still matched `origin/main`. |

Both builds emitted a nonfatal warning for chunks larger than 500 kB. Application regression tests were inspected as listed in the source review. Application tests and live deployment checks were not run. The documentation edits are uncommitted.

See [status](./status.md).
