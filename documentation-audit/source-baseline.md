# Source verification receipt

The authoritative continuation marker is in `.agents/skills/gcs-docs-sync/SKILL.md`.

- Verified at `2026-11-19T02:49:45+00:00`.
- Application repository `https://github.com/GCS-SSC/gcs-ssc.git`, branch `main`.
- Verified application commit `878cfb0d326f9a1d2efa8159afaeb08833d9f062`, committed `2026-11-18T21:36:46-05:00`.
- Previous verified source `9ad3ead3fc391576028906b55b634ebaf4a92ae2`.
- Range of four commits and 86 net changed paths. See the [source review and dispositions](./sync-nov18-stream-risk.md).
- Isolated checkout `.reference-repos/gcs-ssc`, clean and detached. The baseline is an ancestor of the target, all 13 initialized gitlinks match, and the final fetch confirmed that `origin/main` still matched the target.
- Documentation checkout started with the verified uncommitted coding lookup update at `bf4165e5a44b91380efe7521eeaae9e922ddf181`.

## Source gitlinks

| Workspace | Commit |
| --- | --- |
| `extensions/gcs-agreement-number` | `5820c69b1cbc1be7f56471d1bb4d60b443e1b09e` |
| `extensions/gcs-automated-payments` | `ed1c74e0642965666c7f24cb0cde0febe68a35d3` |
| `extensions/gcs-gcforms-integration` | `a42f0288d9d4377d106017800bd6e52b363d9f8d` |
| `extensions/gcs-machine-translation` | `b2851d8832294197f1ccd4f2542ba5ae325d671a` |
| `extensions/gcs-narrative-quality` | `3763ddeb60701b44df0e59c8141b8804bac787b2` |
| `extensions/gcs-narrative-tags` | `393f304413603635f74e2c5695f1222f1f2aafe2` |
| `extensions/gcs-outcome-cost-allocation` | `48fd4f2d26f6e0cadadc2125e2d7eddb56ccd5a6` |
| `extensions/gcs-ssc-gcnotify` | `e17b6db228dde4f716eaa63206f39de4046814e5` |
| `extensions/gcs-ssc-portal-connector` | `f13f27fb43bb0ec73e8325167cbd635d442c16f6` |
| `extensions/gcs-storage-local` | `7f46dc38d004462d2e8282932054550935a810ef` |
| `extensions/gcs-storage-s3` | `4a428601472a912f0760fd5bf9a2f4bd6495f845` |
| `packages/gcs-ssc-extensions` | `c0b12fd3445e3a9a3adb35a35e5f0a57a4e95326` |
| `tooling/gcs-ssc` | `a0c3eb89c2292b18b2dd8a3e06582043c61913ef` |

## Executed verification

Source-dependent commands used `GCS_SSC_SOURCE=.reference-repos/gcs-ssc` with Bun 1.3.13.

| Command or check | Result |
| --- | --- |
| `bun run docs:inventory` | Passed. 448 page/component, 743 API, 1,857 data, 20 domain, 12 configuration, one extension, and zero historical audit-impact entries. |
| `bun run docs:references` | Passed. 743 routes in ten bilingual groups. |
| `bun run docs:audit-impact` | Passed. Zero historical dossier rows. |
| `bun run docs:check` | Passed. Coverage, parity, navigation, links, anchors, redirects, source reconciliation, and production build. |
| `git diff --check` | Passed. |
| `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` | Passed. |
| Final application fetch | Passed. The reviewed target still matched `origin/main`. |

Both builds emitted a nonfatal warning for chunks larger than 500 kB. Application tests and live deployment checks were not run.

See [status](./status.md).
