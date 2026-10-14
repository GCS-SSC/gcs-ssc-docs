# Source-to-documentation review

The pinned final application target is `4ccf2f7880349aa3eb94a46c74f591c42a4bb73b` (`2026-10-14T07:06:18-04:00`), after verified baseline `c02d847de7078a2110f54c298ed3ef7f3e1b620b`. The skill’s Source and baseline record is the authoritative continuation marker.

## Method and evidence scope

The docs started at `f8052ab4cd62bf5847075340eba39e25f3caa682` with a clean worktree. The existing ignored clone had the correct GitHub origin and a clean worktree before fetching; the baseline exists and is an ancestor of the pinned target. The sibling application workspace was untouched. All initialized gitlinks match the target, including the public SDK and private architecture/regression resources.

This review enumerated all 145 baseline-exclusive commits and the 825 net changed paths. [Commit dispositions](./incremental-changes.json), [changed-path dispositions](./changed-source-dispositions.json) and [review groups](./review-groups.json) record the mapping to final behavior. Later fixes and consolidation supersede earlier commit messages. Image/seed changes, merge history and private review/test pins are distinguished from user features. Concrete extensions retain their own implementation guides; this repository documents host/public SDK boundaries.

The application’s canonical agent guide explicitly requested independent agent scopes. Financial guides, Opportunity/Intake administration and Workflow/document/search guides were authored in separate exclusive scopes, then integrated with the primary review of schema, SDK, operations, navigation and coverage. Both existing locales were read before edits. Examples and failure recovery were checked against the pinned UI, handlers, shared schemas, domain helpers, migrations and relevant regression bodies.

## Final contract dispositions

| Area | Final source and paired documentation |
| --- | --- |
| Opportunity and Intake | Multi-Stream eligibility, Program and `funding_case` authority, Agency status/attachment configuration, manual/group/external creation, immutable submitted application and staged upload recovery. Dates or approval do not automatically create an Agreement; ordinary Opportunity UI has no status editor. |
| Portal host boundary | Authorized Agency workspace, Opportunity forms/contribution scope, immutable imports and transaction/capability-bound drafts. Connector/provider implementation and companion form rules remain extension-owned. |
| Data Collection | Published Agency questionnaire, repeated inline/Home work, exact/group ownership, saved revisions, submission, optional approval and cancellation/retry. |
| Risk and Amendment | Explicit risk-assessment occurrence and readiness, retained schema-v3 proposals, user/group owners and confirmed physical disposal of disposable draft snapshots. Promotion checks the same Agreement’s annual usage; the separate cross-Agreement Stream/overcommit gap remains documented. |
| Documents | Generic renderer, scalar Word conditions, localized custom-field values, Amendment context and search/pagination. Built-in hard-coded department values are removed; the event-local context-provider seam remains internal. |
| Financial configuration and budgets | Immutable denomination, required Agreement Financial IDs, Agency-defined other-funding types/subtypes, exact balanced breakdowns and annual Forecast/Claim/reconciliation usage revalidation. Nonnegative submitted/Forecast values are distinguished from signed reconciliation/draft coding. |
| Payment and commitment | Positive active commitment, shared coding capacity and paid floors, core calculation inputs and saved evidence, recovery wizard/coding and cash versus accounting projections. |
| Corrections and Journal vouchers | Independent roles/assignments, protected source reads, signed/balanced accounting, immutable posting, cancellation and voucher reversal/replacement sequence. JV-open is a workflow input, not a universal source eligibility rule. |
| Receivables and Credit Memos | Claim/paid-Advance source eligibility, monitor linkage, posted originals/adjustments, exact recovery pools/reservations, direct holds, manual/retained coding and cash versus offsets. Claim reductions apply only when the posted debt is fully cleared. |
| Financial summary | Read-only exact monthly budget/active Forecast/Claim/reconciliation/paid projections and pacing; received-month recovery differs from calculator source-year policy. |
| Shared authorization and navigation | Shared Proponent catalog visibility from effective global/active Agency grants, required lead Agency tracking, preserved primary rosters on group claims, permission-filtered search and masked parent labels, detail workspace URL/focus/recovery and accessible currency controls. |
| Schema and Audit | Fresh subject baselines, post-table integrity install, raw SQL schema helpers and named inline constraints, typed ownership and evidence guards. New financial/Intake/Collection tables have explicit Audit attribution; L1 is global infrastructure. |
| SDK and scheduling | Public SDK 0.3.17, Agency/Agreement workspaces, Opportunity/Payment targets, bilingual/evidence slots, bound financial reads and host-validated Stream coding catalogs. L1 offers recurring at-least-once work after readiness, including storage drain. |
| Operations | Bundled diagram/survey packages, preserved companion services/persistence, clean demo cutover boundary, same-origin development previews, Nitro cache reset and serial managed PGlite shards. No live deployment inspection is claimed. |

The final parallel consistency pass rechecked paired examples and corrected additional guards: Opportunity deletion with live Intake, Intake deletion with retained runtime history, immutable Budget currency, required Claim Proponent, Correction narratives/budget locks, all thirteen permission subjects and six assignment-management capabilities. It also documented the actual five-subject sidebar gate and direct route for an Account-Receivable-only coordinator. SDK exchange callbacks and shared diagram contracts were expanded against final source; build dependencies are explicitly part of the runtime image. These corrections passed the final verification rerun.

## Coverage and tooling verification

All 2,880 ledger entries have terminal source-backed documentation dispositions, with zero remaining items. Coverage includes 421 pages/components/shells, 677 routes, 1,749 schema mechanisms, 20 domains, 12 configuration surfaces and one host extension platform row. There are no historical audit dossier rows; current runtime Audit remains documented independently.

Regeneration preserves curated destinations, evidence, notes and statuses rather than certifying them. Affected source groups were reopened and reconciled, obsolete evidence paths/test claims removed and new surfaces mapped to paired audience guides. Unchanged entries retain the previous verified source review; terminal coverage does not imply application test execution.

Inventory tooling now includes `server/database/schema` helpers, inline named constraints and the new scheduling/domain/configuration surfaces. Its fixture check (`python3 /tmp/check-gcs-inventory.py`) passed curated evidence/status/destination preservation, removed-entry elimination, raw SQL table/function/constraint-trigger and inline-constraint discovery, exclusion of the `CONSTRAINT TRIGGER` keyword as a false mechanism, distinct quoted SQL enum names differing only by case, and repeat determinism. These are documentation-tool checks, not executed application migrations.

The first repository checker found a case-sensitive enum ID collision and missing status-command label. Both were corrected without weakening the checker. A repeat generation initially normalized inherited JSON Unicode escaping; after serialization normalization all 29 generated ledgers/reference pages were byte-for-byte stable. Final `docs:check`, whitespace and deployment-base build checks passed. The builds emitted only the existing nonfatal chunk-size warning above 500 kB.

## Regression evidence and limitations

[Review groups](./review-groups.json) list the precise source and regression files inspected. Application runtime/unit/PostgreSQL/browser suites, CodeRabbit and live deployments were not run. Source-contract uncertainty was resolved by tracing final executable paths; no application source was patched. Existing limitations and their recovery guidance are retained in [findings](./documentation-findings.md), especially the cross-Agreement Amendment Stream capacity gap, duplicate logical forecast/claim coordinates and generated-object cleanup/internal context-provider boundaries.

See [verification receipt](./source-baseline.md) and [current status](./status.md) for exact executed commands and source provenance. Edits are intentionally uncommitted.
