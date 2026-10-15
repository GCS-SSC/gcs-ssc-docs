# Incremental application review

The review covers application `main` from baseline `4ccf2f7880349aa3eb94a46c74f591c42a4bb73b` exclusive to pinned target `a50e1429bf634145a6a933f0faa3d20907a7ca6b` inclusive (`2026-10-15T13:08:07-04:00`): 43 commits and 134 net changed paths. Every commit and changed path has a disposition in [incremental changes](./incremental-changes.json) and [source dispositions](./changed-source-dispositions.json). [Review groups](./review-groups.json) give final source contracts, paired destinations and inspected regression evidence.

## Source and method

Documentation started at `9640482faf57ed6bdcf011ba2a60ef6d1828bade` with a clean worktree. The ignored clone had the expected GitHub origin and a clean worktree before fetching. The baseline exists and is an ancestor of the target. The checkout is detached at the exact target and initialized submodules match its gitlinks. The sibling application workspace was untouched.

The application’s canonical agent guide asks for independent scopes. Separate agents handled nonfinancial forms/catalogs and operator/SDK guidance; the primary agent handled financial guides and evidence reconciliation. An independent read-only financial consistency pass checked final source, paired examples and recovery. Both locales were read before editing, and the simpler language of the latest documentation commit was retained. No application behavior was changed.

## Final behavior reviewed

| Group | Documentation result |
| --- | --- |
| Forecast versions | Separate numbered records with their own assignments, Completion and approvals; immutable year/version; copied active breakdowns; empty replacement when active forecast is above budget; retained deleted numbering/history. |
| Annual budget and recovery | Program-only annual ceilings; applied reductions free Claim/reconciliation capacity; posted original-claim AR collections additionally reduce budget floors without double counting or transferring excess credit. Claim-related original debt requires a full-principal reduction plan before Completion. |
| Payment holds | Funding reduction can succeed above active Forecast/Commitment amounts. Payment Completion, workflow start, positive approval and successful processing recheck the active forecast by payment year and combined active commitments across Agreement years. Guides explain replacement, activation and retry. Nonnegative commitment lines and existing paid floors remain. |
| Claim and summary UI | Per-row submitted amount dialog, visible duplicate claim rows and atomic reconciliation bulk editing; Forecast initially selected in summary and active header version used. |
| Exact permissions and inputs | Amendment writes use the amendment assignment; canonical identifiers and empty patches fail before SQL; omitted monitor flags remain unchanged. Existing permissions/ownership rules are reinforced rather than new access being inferred. |
| Administration and authoring | Bilingual text/storage validation, omitted settings retained, deleted-Agency group/Opportunity/Intake exclusions, saved Review groups, publication-error recovery, safe certification reorder and localized duplicate names. Calculation-source references block category deletion even when an item is inactive. |
| Operations and SDK | Image publishing/latest, AWS preview/preserve/reset/SSO recovery, optional Portal source provenance, explicit data-preserving incremental hotfix and SDK 0.3.18 forecast imports. Concrete extension internals remain in their own repositories. Source deployment receipts are historical evidence, not a live check by this run. |

The cross-Agreement Amendment Stream-capacity gap is still documented. Independent forecast records resolve the old header/version ambiguity, but duplicate imported monthly coordinates remain possible; Claim duplicates are now visible while editing. Old warnings and contradictory financial rules were replaced in the findings ledger and audience guides.

## Coverage reconciliation

Generated inventory contains 421 page/shell/component rows, 676 API rows, 1,750 data rows, 20 domain rows, 12 configuration rows and one host extension row: 2,880 entries, with zero remaining items. The removed Forecast header PATCH and old schema mechanisms disappear from generated coverage. Six new schema/migration entries have source-backed dispositions. Unchanged declarations in the edited Agreement baseline retain their prior review; new and materially changed declarations were checked against the net SQL diff.

Affected page/API/configuration/domain evidence was reopened and reconciled against the final source and paired guides. Obsolete paths and prior-run test execution claims were removed from those entries. Generators preserve curated evidence and status, so regeneration alone is not treated as verification. Documentation tooling scripts were unchanged in this run.

## Verification scope

Inventory, API reference and audit-impact generation completed. `bun run docs:check`, whitespace and deployment-base build checks passed, with only the existing nonfatal chunk-size warning. Repeat generation left all 29 generated files byte-for-byte stable, and a fresh fetch still matches the target. Exact commands are recorded in the verification receipt. Runtime/unit/PostgreSQL/browser suites, CodeRabbit and live-deployment checks were not executed. The application test bodies listed in review groups were inspected as source evidence only.

See [status](./status.md), [verification receipt](./source-baseline.md) and [findings](./documentation-findings.md). Changes remain uncommitted.
