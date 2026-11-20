# Source verification receipt

The authoritative continuation marker is in `.agents/skills/gcs-docs-sync/SKILL.md`.

- Verified at `2026-11-20T06:37:17+00:00`.
- Application repository `https://github.com/GCS-SSC/gcs-ssc.git`, branch `main`.
- Verified application commit `aa0d4642d055166485687733e701e5020571ec49`, committed `2026-11-19T23:42:27-05:00`.
- Previous verified source `7a5aaa27d820460f0e340c8d36db8e03552b12c4`.
- Range of five commits and 55 net changed paths since the verified checkpoint. The broader business-rule review covers 53 commits from `8bf5109f`. See the [source review](./sync-nov20-business-rules.md).
- Isolated checkout `.reference-repos/gcs-ssc`, clean and detached. The baseline is an ancestor of the target, all 14 initialized gitlinks match, and the final fetch confirmed that `origin/main` still matched the target.
- Documentation checkout started at `8c0f84f6c0f9a673f344ead65c512842f8200edf` with the verified uncommitted bulk reconciliation, cost-visibility, clause-group, and review and extension updates.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `74c8bfd60c0ef91517a8cc5d7694aa4d9d1e11dd` |
| `extensions/gcs-automated-payments` | `8cc5b5aa73a6fef6d8130db7a51330819d13b11d` |
| `extensions/gcs-feedback` | `95b1735dea81cca50e0f4805575c925b4b1cefc9` |
| `extensions/gcs-gcforms-integration` | `daf35cb61ff2cd19a7630ea3802da8a0f5a4e320` |
| `extensions/gcs-machine-translation` | `e69302dda77193c0cf44bcd5573d98ca455ff69e` |
| `extensions/gcs-narrative-quality` | `3763ddeb60701b44df0e59c8141b8804bac787b2` |
| `extensions/gcs-narrative-tags` | `393f304413603635f74e2c5695f1222f1f2aafe2` |
| `extensions/gcs-outcome-cost-allocation` | `1abc9e0cd6669ec0fc04ae066b027e34db1781d9` |
| `extensions/gcs-ssc-gcnotify` | `e17b6db228dde4f716eaa63206f39de4046814e5` |
| `extensions/gcs-ssc-portal-connector` | `f13f27fb43bb0ec73e8325167cbd635d442c16f6` |
| `extensions/gcs-storage-local` | `7f46dc38d004462d2e8282932054550935a810ef` |
| `extensions/gcs-storage-s3` | `4a428601472a912f0760fd5bf9a2f4bd6495f845` |
| `packages/gcs-ssc-extensions` | `4b42db8a98608a9f0ad00639197650b6362bb66b` |
| `tooling/gcs-ssc` | `7698d8c1582ec2bd36f00f56f306b4a2999e6af6` |

## Executed verification

Source-dependent commands used `GCS_SSC_SOURCE=.reference-repos/gcs-ssc` with Bun 1.3.13.

| Command or check | Result |
| --- | --- |
| `bun run docs:inventory` | Passed. 464 page/component, 774 API, 1,892 data, 20 domain, 12 configuration, one extension, and zero historical audit-impact entries. |
| `bun run docs:references` | Passed. 774 routes in ten bilingual groups. |
| `bun run docs:audit-impact` | Passed. Zero historical dossier rows. |
| `bun run docs:check` | Passed. Coverage, parity, navigation, links, anchors, redirects, source reconciliation, and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed. |
| Final application fetch | Passed. The reviewed target still matched `origin/main`. |

Both builds emitted a nonfatal warning for chunks larger than 500 kB. Application tests and live deployment checks were not run.

See [status](./status.md).
