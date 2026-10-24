# Data model and integrity

This page describes the database rules that keep funding records consistent and preserve evidence behind decisions and payments. It includes exact table names, constraints and maintenance commands. The linked user guides explain the steps in the application.

A schema defines the database structure. Integrity rules prevent inconsistent records, such as a Claim linked to the wrong Agreement. Immutable records cannot be rewritten. A transaction saves a group of changes together or rolls them all back. A lock prevents competing writes while checks run.

`server/database/production-core-migrations.ts` defines the fresh schema. `shared/types/database.d.ts` describes application types; database constraints, functions and triggers remain authoritative for persisted integrity. Ordinary schema changes edit the owning baseline and require a clean database rebuild. They do not upgrade an earlier schema or preserve its migration journal. The explicit incremental commitment-budget hotfix below is the sole current exception. See [Database lifecycle](../operator/deployment.md) for the supported deployment procedure.

## Ordered schema

| Migration | Owned schema and contract |
| --- | --- |
| `0010_enums` | Shared enum types and database extensions, including text-search support. |
| `0020_users` | Better Auth users, sessions, accounts and verification; active-session user protection. |
| `0030_rbac` | Roles, cumulative role permissions, assignments and scope validation. |
| `0040_agency` | Agency profile, bilingual catalogs, custom fields, templates, fiscal years, funding sources and receivable types. |
| `0050_common` | Contacts, addresses, attachments, notes, groups, typed entities, publication, runtime, review, recommendation, approval, Data Collection, Completion and Workflow graphs. |
| `0060_transfer_payment` | Programs, Streams, budgets and eligible Agency catalog links. |
| `0070_applicant_recipient` | Proponent profiles, financial IDs, funding history, contacts and relationships. |
| `0080_funding_opportunity` | Opportunities, selected Streams, review/workflow links and attachment associations. |
| `0090_funding_case_agreement` | Agreement revisions, snapshots, budgets, financial transactions, recoveries, monitoring and documents. |
| `0100_funding_case_intake` | Intake profile, imported-source evidence, group claims and exact assignments. |
| `0110_extensions` | Enablement, configuration, KV and encrypted secrets. |
| `0120_storage` | Durable storage cleanup and compensation outbox. |
| `0125_background_queue` | Shared queue-level schedules and independently leased handlers. |
| `0130_integrity` | Installs subject-owned functions, foreign keys and triggers after all referenced tables exist. |
| `0140_audit` | Change/access/security evidence and ownership attribution. |
| `9999_z_commitment_budget_payment_hold` | Explicit incremental hotfix: removes the two obsolete budget-side commitment triggers/functions after existing demo seeds, preserving business data. |

Demo-only `9999_seed` loads the final demo fixtures and document templates; it is excluded from the production registry. Schema helpers in `server/database/schema/` install receivable reductions, Credit Memo and commitment-coding mechanisms through the Agreement baseline and are included in the coverage inventory.

## Ownership and identifiers

An Agency owns Programs, each Program owns Streams, and each Stream owns Agreements. An Opportunity selects one or more eligible Streams of its Program. Intake belongs to the Opportunity. Proponent business visibility follows effective Proponent grants rather than the lead-Agency field alone. Financial accounts and notes still have explicit Agency ownership.

Core bigint IDs pass between the API and Kysely as decimal strings. `Common_Entity` gives supported business records a shared typed identity. Composite foreign keys bind `(id, entity type)`; propagated type fields are integrity values, not editable user fields. Owner-resolution functions reject wrong-parent, wrong-Stream and wrong-Agency references.

Most business deletion sets `_deleted`. Immutable submissions, versions, transitions and accounting evidence have stronger update/delete guards. Explicitly confirmed removal of disposable Draft Amendment scope physically discards the corresponding draft snapshots; that exception does not authorize deleting approved history. See [Amendments](../agreements/amendments.md).

## Persisted names and current contracts

Business columns use the owning table's prefix, even for references to another subject. The prefixes are `egcs_ay_`, `egcs_ar_`, `egcs_tp_`, `egcs_fo_`, `egcs_fi_`, `egcs_fc_`, and `egcs_cn_`. `id` and `_deleted` are standard exceptions. Authentication, RBAC, storage, queue, `audit`, and `extensions` retain their infrastructure contracts.

Use the persisted column names in request schemas, responses, form state, and validation paths. For example, Agency uses `egcs_ay_gwcoanumber` and `egcs_ay_requireactual`, Common users use `egcs_cn_authuserid`, and addresses use `egcs_cn_gcaddressid`. Do not add aliases for superseded names. Immutable publication and approval JSON has its own versioned field names. A column rename does not permit rewriting saved evidence or hashes.

The current receivable ledger uses Proponent credit pools, Credit Memo lines, and Offset Memo lines. Each Payment recovery belongs to a pool and a required Payment. An Offset Memo application references a required recovery and positive amount. The old `Funding_Case_Account_Receivable_Allocation` and `Funding_Case_Account_Receivable_Posting` tables, `egcs_fc_ledgerkind`, and recovery-to-Credit-Memo fallback are absent. Payment Proponent attribution is required. Integrations must use the current schema rather than infer missing attribution or read an older ledger.

Constraint names use explicit subject prefixes and compact identifiers, such as `cn_chk_pub_version_hash` and `fc_fk_agreement_forecast_lineitem_forecast`. The Agreement baseline owns Forecast-line parent, Budget-line, and funding-subtype foreign keys. It removes redundant duplicate declarations while retaining these ownership checks. Raw SQL constraints and helper-owned schema belong to the same coverage review as Kysely declarations. Review renames against the current owning baseline rather than treating each newly discovered name as a new business rule.

## Publication, runtime and assignments

When a questionnaire published as version 1 is revised to version 2, existing work keeps the version it started with. This preserves the questions the applicant answered. Pinned means fixed to a saved version. Runtime is the work performed using a published design.

Agency designs use `Common_Publication`, immutable hashed `Common_Publication_Version` and typed version references. Published parents pin exact child versions and status definitions. Retirement is terminal; historical runtime retains its pins. Data Collection setups participate in the same publication graph as review, recommendation, approval and workflow designs.

`Common_Runtime` records an exact target, purpose, version pins, initiator, attempt and predecessor. Its `Common_Runtime_Item` hierarchy includes Data Collections alongside reviews, recommendations and approval steps. Transition insertion validates and changes state; direct state patches are unsupported. Retry creates a successor and retains version pins, while capturing current routing values for the new attempt.

`Common_Completion` freezes `not_applicable`, `no_workflow` or `workflow_started`. Required missing workflows roll back completion. A no-workflow completion does not acquire a workflow later. Approval submissions capture schema-versioned JSON and a canonical hash; revision promotion verifies the packet and applies approved domains atomically. Risk-assessment selection, risk rating and mitigation proposals are governed by readiness and retained evidence, not a free-standing mutable score.

`Common_Entity_Assignment` stores exact typed targets and Common users. Nonempty active rosters have exactly one primary; creator-primary creation and replacement are transactional. Unclaimed group-backed Reviews, Recommendations, Data Collections and Intake can have zero users. Group membership permits the eligible claim path but does not grant business-data access. Deferred roster/claim guards and soft-delete triggers enforce the boundary. Independent children require their own assignment; assignment to an Agreement does not automatically assign every child.

## Configuration and questionnaire integrity

Agency field and option IDs remain stable; Stream assignment defines placement, requiredness and active availability. Agreement custom values are validated against the exact Stream. Published conditions retain dependencies and immutable capture, including classification and selected risk source. Catalog retirement cannot silently invalidate active references.

Agency funding types and subtypes replace fixed other-funding columns. Budget-line and fiscal-year funding-source rows retain selected subtype and exact amounts; Stream selection controls future eligibility while saved history keeps its reference. Chart accounts distinguish commitment, receivable and Credit Memo kinds and owning currency/fiscal year; Stream links provide the available coding catalog.

Data Collection definitions contain ordered typed questions and bilingual text. Runtime response saves check the expected revision and pinned definition; `DATA_COLLECTION_REVISION_CONFLICT` requires reloading before deliberate reapplication. Final submission checks required answers. Submitted Intake stores application data plus immutable imported source system, external ID and source export; imported provenance cannot be rewritten through ordinary updates. See [Data Collections](../concepts/data-collections.md) and [Intake](../intake/funding-case-intakes.md).

Budget lines require `egcs_fc_applicantrecipient` referencing a linked proponent. Database guards reject an unlinked selection and prevent removal or replacement of a relationship used by an active budget line in any version. Budget amounts are nonnegative. `Transfer_Payment_Financial_Limits` requires a nonnegative maximum and support and stacking ratios from zero to one. The host applies these limits after recalculation within the owning transaction. See [Budget](../agreements/budget.md#stream-financial-limits).

## Exact financial boundaries

Money uses canonical decimal text and exact integer-cent arithmetic. `numeric(19,2)` supports magnitude up to `99999999999999999.99`. For example, retain ID `"9007199254740993"` and amount `"10000000000000000.01"` as strings. Sign and aggregate limits are domain-specific; a generic money parser is not a positive-business-amount guarantee. Agreement currency is immutable and all financial children must match it. UI controls use that denomination and locale with two fraction digits.

Current annual program funding governs Forecast and Claim writes and completion under the Agreement write lock. Total cost and other-funding types retain line-level rules, without separate annual ceilings.

Budget reductions recheck counted Claims and successful reconciliations, crediting applied reductions and eligible posted Claim AR collections without double counting. Forecast or Commitment excess instead holds Payment completion, workflow start, positive approval and successful processing. Forecast holds use the payment year; Commitment holds require a current selected Commitment and sum the larger declared/live-line amount of every active type across all years. Amendment promotion enforces the three per-version Stream financial limits. Shared Stream capacity across Agreements still needs separate review. See [Budget](../agreements/budget.md), [Forecasts](../agreements/forecasts.md), [Claims](../agreements/claims.md) and [Payments](../agreements/payments.md).

Forecast `egcs_fc_version` is a nonnegative bigint on the header, unique by Agreement/year/version and immutable together with Agreement/year identity. Allocation follows stable year lineage under the Agreement lock and includes deleted history. Lines no longer have a version. New versions have independent assignments and lifecycle; copies retain active monthly amounts and funding. Budget years with any Forecast history must survive reassignment/deletion and Amendment promotion checks. Commitment-line amounts are nonnegative in the request schema and fresh baseline check constraint.

Commitment coding protects both exact-line paid floors and shared Agency coding pools. `fc_payment_counts_for_coding`, `fc_positive_coding_completion`, `fc_commitment_line_gross_paid`, coding-credit/net-paid/available helpers and completed-coding/paid-floor triggers enforce retained accounting effects. Duplicate coding rows do not multiply shared capacity. A Payment's cash amount, signed accounting allocation and recovery amounts are separate projections; successful workflow termination controls their effective posting.

## Financial evidence entities

| Aggregate | Retained evidence and integrity |
| --- | --- |
| Agreement | Current and historical Budget/Activity versions, stable line/year identities, immutable approval submissions and revisions, Financial ID choice and risk evidence. |
| Journal Voucher | Balanced signed accounting allocations on eligible source Payments; positive Completion/approval effect, reversal linkage and the fiscal-year JV-open workflow condition. It changes coding, not cash paid. |
| Correction | Signed financial lines, eligible source Payments, immutable posting and cancellation/approval boundaries; effective accounting differs from gross cash. |
| Account Receivable | Typed Claim or paid-Advance source, Proponent/Agency, lines and coding, workflow completion, Claim reductions, Credit Memo repayments and Payment offset evidence. Source and recovered balances are checked under locks. |
| Claim reduction | `Funding_Case_Account_Receivable_Claim_Reduction` stores a positive amount and exact source Claim line; `trg_fn_validate_ar_claim_reduction` protects ownership, remaining source capacity and completed evidence. |
| Credit Memo | Proponent credit pool and receivable lines, matching Agency/currency/accounting dimensions, signed accounting and retained completion effects. Pool/line validators reject mismatched or overallocated credits. |
| Closeout | One open Closeout per Agreement, immutable readiness snapshot per approval attempt and parent write boundary; financial/recovery and child-work readiness participate. |

The workflows and recovery procedures are in [Journal vouchers](../agreements/journal-vouchers.md), [Corrections](../agreements/corrections.md), [Receivables](../agreements/receivables.md), [Payments](../agreements/payments.md) and [Closeouts](../agreements/closeouts.md).

## Storage, scheduling and audit

Attachments retain provider identity, object ID, opaque locator and typed target association. Opportunity attachment definitions may associate an Agency attachment type without owning its bytes. Intake staging validates the provider and file limits before final associations. Database rollback and remote storage are different transaction boundaries; `storage_cleanup_outbox` retains compensating delete/restore work.

`background_queue_schedule` stores each level’s current cycle and next-run time. `background_queue_handler` stores a unique `handler_id`, level reference, consumed and claimed cycles, failure count, retry deadline, lease owner and expiry, and last error. A lease requires owner, expiry, and claimed cycle together. Infrastructure columns have no business prefix and use global Audit ownership. These tables replace `l1_queue` in the fresh baseline, without an incremental migration of existing schedules. Process-local access maintenance keeps its schedule in memory. Business queues retain their own payloads and evidence. See [Background work](../operator/background-work.md).

`audit` change and security evidence remains transactional in the business database, with append-only and retention guards. `server/database/access-log-schema.ts` owns the separate access-history schema and its indexes. Access events use a bounded memory buffer before persistence in an independent store; saturation or process loss can lose buffered events. `audit-ownership-registry.ts` defines concrete business ownership, including Opportunity, Intake, Data Collection, and recovery. Agency visibility follows that attribution rather than URL nesting. Captured input values require the separate Audit input permission. See [Audit](../admin/audit.md).

The independent access store checks schema version 1, its expiry function, and both protection triggers before use. `audit.protect_access_event` blocks updates, ordinary deletes, and truncation. `audit.expire_access_events` permits bounded deletion of expired rows under an advisory lock. Access IDs remain UUIDs; captured inputs are limited to 32 KiB, and Agency attribution must agree with scope. Initialization does not copy old business-store access rows.

## Verification and engine differences

The canonical-schema tests enumerate fresh PGlite tables, enums, indexes, constraints, functions and triggers. PostgreSQL suites exercise independent-session locks and reauthorization. PGlite uses one embedded backend and cannot verify those concurrent-write scenarios. Sensitive writes refresh grants, owner scope, assignment and lifecycle after acquiring the established ordered locks.

`documentation-audit/data-coverage.json` records discovered subject and raw-SQL helper mechanisms. A completed documentation status records reviewed coverage. It does not confirm that application regression suites ran. See the synchronization receipt for commands actually run.

## Manual spreadsheet maintenance

The private `$gcs-ssc workbook` workflow owns workbook reconciliation and its checkpoint in `tooling/gcs-ssc/workbook-sync-state.json`. Ordinary sync is incremental; `workbook sync full` requests a full review. A recorded workbook checkpoint is not a database migration or proof that this documentation was verified.

The public application retains the bounded Google Sheets commands. The external data-model workbook is no longer maintained by wholesale normalize/diff/sync scripts. The model owner compares source and workbook evidence and uses bounded commands only: `data-model:sheet:read`, `data-model:sheet:cell:update`, and `data-model:sheet:row:read|update|insert|delete|color|move`.

Before first use or when Google access must be renewed, place an installed or web OAuth client document at `~/.config/gcs-ssc/google-oauth-client.json`, then run `bun run data-model:sheet:authorize` in an interactive local terminal. Open the printed Google URL and complete consent; the command listens only on a temporary `127.0.0.1` callback, verifies the random OAuth state, requires both access and refresh tokens, and writes `~/.config/gcs-ssc/google-sheets-token.json` with owner-only permissions. It times out after ten minutes. Never paste either file, URL parameters, authorization code, or tokens into documentation, logs, issues, or source control.

Every write names the sheet and row and supplies an expected current cell value; a guard mismatch aborts. Cell/row content comes from an explicit file, formulas remain user-entered formulas, and the command rereads surrounding rows after a mutation. Do not recreate a whole-workbook reconciliation script or treat this manual external workflow as a migration source.

When authorizing from a remote terminal, the browser may fail to reach that terminal's loopback listener. Paste the **entire callback URL into the still-running authorization command**, not into an issue or chat. It validates the expected origin/path, a single matching state, and a single authorization code before exchange. The same ten-minute deadline applies.

For a small prepared block, invoke `bun run scripts/data-model-spreadsheet-row.ts fill-blank --sheet "Sheet title" --row 100 --count 2 --expected-first-cell-empty --values-file /path/to/rows.json`. Replace the example sheet and rows after reading the destination. The file must contain exactly two equally sized arrays of strings, for example `[["Field A", "text"], ["Field B", "bigint"]]`. This value-only operation supports 1–32 rows within the existing grid, refuses any destination row containing a value, formula, or note, and preserves formatting. It does not insert rows or permit overwriting populated rows. Moves separately guard the destination's expected first cell, including an explicitly empty destination.

For an exact bounded read, use `bun run data-model:sheet:row:read -- --sheet "Common" --row 10 --count 3`. Inspect entered formulas as well as effective values. The `format` subcommand accepts an explicit format file for at most 32 rows and preserves values and formulas. Use it only for requested formatting work. The legacy `color` command requires a separate colour request. Neither command chooses reconciliation edits.
