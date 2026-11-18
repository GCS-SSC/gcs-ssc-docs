# Source verification receipt

The authoritative continuation marker is in `.agents/skills/gcs-docs-sync/SKILL.md`.

- Verified at `2026-11-18T17:06:57+00:00`.
- Application repository `https://github.com/GCS-SSC/gcs-ssc.git`, branch `main`.
- Verified application commit `70499a295a283d7810d0cd2c0ed6af26d59139d1`, committed `2026-11-18T12:03:38-05:00`.
- Previous verified source `f527ab30d089877809379dc8854df80c3ba13467`.
- Range of two commits and 40 net changed paths. See the [source review and dispositions](./sync-nov18-bilingual-entry.md).
- Isolated checkout `.reference-repos/gcs-ssc`, clean and detached. The baseline is an ancestor of the target, all 13 initialized gitlinks match, and the final fetch confirmed that `origin/main` still matched the target.
- Documentation checkout started clean at `945378f0a3c8bfd55015f40e1aaa83b9f3a99b7a`.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `5820c69b1cbc1be7f56471d1bb4d60b443e1b09e` |
| `extensions/gcs-automated-payments` | `d29149d7c7ffd2319eaad051ade25acce82f6985` |
| `extensions/gcs-gcforms-integration` | `0f5994691481450b18bb146275956905ed85007c` |
| `extensions/gcs-machine-translation` | `b2851d8832294197f1ccd4f2542ba5ae325d671a` |
| `extensions/gcs-narrative-quality` | `3763ddeb60701b44df0e59c8141b8804bac787b2` |
| `extensions/gcs-narrative-tags` | `393f304413603635f74e2c5695f1222f1f2aafe2` |
| `extensions/gcs-outcome-cost-allocation` | `86dc64c1db134308f18c57e41d53521f297ab8eb` |
| `extensions/gcs-ssc-gcnotify` | `fa63e42dbd8d42998a690b9a4afb2c13e59e9279` |
| `extensions/gcs-ssc-portal-connector` | `a20d8e9a1b8cf0878d6bbf3b8734cf369dc9552a` |
| `extensions/gcs-storage-local` | `7f46dc38d004462d2e8282932054550935a810ef` |
| `extensions/gcs-storage-s3` | `4a428601472a912f0760fd5bf9a2f4bd6495f845` |
| `packages/gcs-ssc-extensions` | `6ccc9cafbcd45958dac33d15f6e34028e44787ba` |
| `tooling/gcs-ssc` | `fc62f1127b2691ed5e5d56874e5913f503a3c34a` |

## Executed verification

Source-dependent commands used `GCS_SSC_SOURCE=.reference-repos/gcs-ssc` with Bun 1.3.13.

| Command or check | Result |
| --- | --- |
| `bun run docs:inventory` | Passed. 443 page/component, 725 API, 1,825 data, 20 domain, 12 configuration, one extension, and zero historical audit-impact entries. |
| `bun run docs:references` | Passed. 725 routes in ten bilingual groups. |
| `bun run docs:audit-impact` | Passed. Zero historical dossier rows. |
| `bun run docs:check` | Passed. Coverage, parity, navigation, links, anchors, redirects, source reconciliation, and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed. |
| Final application fetch | Passed. The reviewed target still matched `origin/main`. |

Both builds emitted a nonfatal warning for chunks larger than 500 kB. Application tests and live deployment checks were not run.

See [status](./status.md).
