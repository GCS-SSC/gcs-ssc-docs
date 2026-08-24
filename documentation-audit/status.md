# Documentation synchronization status

## Current phase

`COMPLETE` — the incremental bilingual synchronization through application `main` commit `ea20230fe4d61bbb3214879b7b881f5317773d02` is complete. Every inventory has zero remaining items and every required documentation gate passes.

## Baseline and scope

- Previous application baseline: `bfbbf18dd3218e7669d45c42cc4f26431a1325aa`
- Final application target: `ea20230fe4d61bbb3214879b7b881f5317773d02` (`2026-08-24T09:49:52-04:00`)
- Increment reviewed: 9 application commits, previous baseline exclusive and target inclusive
- Documentation starting HEAD: `c407eb23b5d66aaacad3c08f0567c471b407f5fa`
- Reference source: clean ignored clone at `.reference-repos/gcs-ssc`; the sibling application working repository was not accessed or changed
- Final drift check: application `HEAD` and fetched `origin/main` match the target; all six recorded gitlinks are checked out cleanly

## Synchronized changes

- Replaced fixed stream commitment coding guidance with paired Chart of Accounts and bilingual Commitment Types guidance, including ordered dimensions, uniqueness, authorization, in-use deletion blocks, Agreement lookup rules, and wizard dependencies.
- Documented Agency-owned business statuses, protected Draft status, read-only/terminal semantics, permissions, deletion/restoration constraints, and the separation from stable publication/runtime state.
- Reworked lifecycle and data-model guidance for shared publication identities/versions, terminal retirement, immutable runtime attempts/items/transitions, Completion dispositions, retry pins, and core entity transition modes.
- Added paired Form Schema publication and public extension-SDK lifecycle-entity contracts, including authorization, typed identity registration, completion/workflow behavior, and positive-terminus hooks.
- Added the bounded `data-model:sheet:authorize` OAuth reauthorization procedure and secret-handling cautions.
- Removed all concrete-extension product, operator, developer, navigation, redirect, finding, generated audit-impact, and coverage documentation. The site retains only the host extension framework and `packages/gcs-ssc-extensions` SDK contract; each concrete extension owns its documentation.

## Final inventories

| Ledger | Rows | Non-terminal |
| --- | ---: | ---: |
| Pages, layouts, middleware, and components | 312 | 0 |
| API handlers | 468 | 0 |
| Data and migration mechanisms | 378 | 0 |
| Host extension framework and public SDK | 1 | 0 |
| Domains | 16 | 0 |
| Configuration | 10 | 0 |
| Historical audit impact | 94 | 0 |

Concrete `extensions/*` implementations are deliberately absent from the extension and audit ledgers. Host discovery, enablement, dispatch, security, lifecycle handoff, packaging, and SDK surfaces remain covered.

## Verification evidence

- Exact isolated Bun runtime: `.reference-repos/tools/bun-1.3.13/bun-linux-x64/bun --version` returned `1.3.13`.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory` generated 312/468/378/1/16/10/94 rows.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references` generated 468 route rows in ten bilingual groups.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:audit-impact` generated 94 bilingual historical dispositions after excluding concrete-extension findings.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check` passed coverage, locale parity, navigation, links, anchors, redirects, source reconciliation, and the production build.
- `git diff --check` and `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` passed; the build emitted only VitePress's non-fatal large-chunk advisory.

No application test suite was run: final executable source, registered migrations, architecture contracts, focused source-owned tests, and generated route references provided the documentation evidence. PostgreSQL, browser, OAuth, and external-service flows were not executed. The available system Bun was `1.3.14`, so final documentation gates used the isolated exact `1.3.13` binary.

## Blockers

None.

## Exact next action

None. Publication remains a separately authorized commit/push action.
