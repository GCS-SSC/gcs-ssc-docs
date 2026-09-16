# Data model and integrity

The ordered migrations registered in `server/database/production-core-migrations.ts` are authoritative. `shared/types/database.d.ts` is the Kysely application contract, but it does not replace database constraints, functions, or triggers.

## Ordered schema

| Migration | Area |
| --- | --- |
| `0001_common` | Common enums, contacts, addresses, and approval-template foundation |
| `0002_users` | Better Auth users, sessions, accounts, and verification |
| `0003_rbac` | Roles, cumulative permissions, user-role assignments, and security audit events |
| `0004_agency` | Agency profile and agency-owned resources |
| `0005_common_agency` | Role-to-Agency foreign key |
| `0006_transfer_payment` | Programs, streams, configuration, schemas, budgets, and setups |
| `0007_polymorphic_common_tp` | Typed entity registry, review/recommendation/approval/workflow runtime, constraints, and triggers |
| `0008_applicant_recipient` | Proponent profile and child/link records |
| `0009_funding_case_agreement` | Agreement aggregate, lifecycle, financial records, ownership constraints, and state triggers |
| `0010_extensions` | Agency/stream enablement, configuration, KV, and encrypted secret records |
| `0011_storage_cleanup_outbox` | Durable object deletion and metadata-restoration jobs, leases, retries, and retention |
| `0012_recommendation_revision` | Integer response revision for optimistic concurrency |
| `0013_audit` | Change/access/security evidence, capture policy, protected retention, and audit permissions |
| `0014_program_terms_links` | Required English/French terms URLs, backfill, and legacy-insert compatibility |
| `0015_cost_category_availability` | Active flags for categories, Agency cost lines, and stream cost-line mappings |

The demo-only `9999_seed` migration is not in this production registry.

## Ownership and identifiers

The principal hierarchy is Agency → Transfer Payment Profile → Stream → Funding Agreement. Applicant recipients have a lead agency and link independently to agreements. Authorization resolves these current active relationships from the database; caller-supplied ownership is never authoritative.

Core identifiers are `bigserial`/`bigint`. PostgreSQL/Kysely exposes them as strings at application boundaries. Core entities and links generally use `_deleted`; deletion sets the flag and active queries filter it. Check each table because some append-only approval children intentionally do not expose soft deletion.

## Typed polymorphism

`Common_Entity` owns a globally unique ID and a varchar type key referencing `Common_Entity_Type`. Polymorphic consumers reference the composite `(id, type)`, so an existing ID with the wrong type is rejected. Registration triggers allocate the shared identity for streams, proponents, agreements, amendments, forecasts, claim reconciliations, commitments, payments, monitors, reviews, and recommendations.

Setup/member/runtime chains propagate type columns through composite foreign keys. Those propagated values are integrity fields, not independently editable business data. Narrow check constraints further limit which types each review, approval, completion, recommendation, workflow, or entity-assignment engine accepts.

## Separate business, publication, and runtime lifecycles

Agency-owned `Common_Status` is the configurable business-status catalogue. The stable publication states `draft`, `published`, and `retired`, and the stable runtime states `pending`, `active`, `awaiting_action`, `paused`, `succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled`, and `failed`, are system constants and never Agency status rows.

`Common_Publication` gives Approval Templates, Review Schemas, Review Set Setups, Recommendation Schemas, Recommendation Set Setups, and Workflow Setups a shared typed identity. Publishing hashes a canonical working definition and appends an immutable `Common_Publication_Version` only when content changed. Parent publications pin exact child versions, and Workflow publications snapshot every referenced Agency status. Retiring is terminal; only an unreferenced draft can be soft-deleted.

`Common_Runtime` is one immutable attempt rooted at a Workflow or directly started Review Set. It pins its publication versions, exact typed target, purpose, initiator, attempt number, and predecessor. Retry creates a successor with the same pins; it never reopens a terminal attempt or adopts newer configuration. `Common_Runtime_Item` forms the ordered Review Set, Review, Recommendation Set, Recommendation, Routing Slip, and Approval Step hierarchy. Only immutable transition-history insertion changes runtime/item state; triggers validate and apply the transition and freeze terminal evidence.

`Common_Completion` records a point-in-time disposition of `not_applicable`, `no_workflow`, or `workflow_started`. A completion-driven entity either creates its first applicable Workflow attempt in the same transaction, records permanently that no Workflow applied, or rolls back when its registry declaration requires a Workflow. Funding Agreements start workflows explicitly and have no root completion; Amendments and Closeouts require a completion Workflow; Claims, Claim Reconciliations, Commitments, Payments, Forecasts, and Monitors allow completion with or without one. Runtime state never grants access or replaces the existing role, exact-assignment, and Agency-status checks.

Agreement approval submissions are immutable schema-versioned JSON packets with a canonical SHA-256 hash. Each workflow run has at most one packet; each persisted Agreement revision links to exactly one approval submission. Hash verification and amendment-domain promotion happen before the run reaches successful terminal state.

## Custom fields and conditional routing

`0006` creates `Transfer_Payment_Stream_Field_Section`, `Transfer_Payment_Stream_Field`, and `Transfer_Payment_Stream_Field_Option`. Composite keys keep sections and fields in one stream and options in their owning field. A field’s stream and kind are immutable; multiple selection cannot be changed back to single selection. Relational fields alone can be discriminators or allow multiple selection.

Agreement values live in the object-valued `Funding_Case_Agreement_Profile.egcs_fc_customfields` JSON column. Runtime validation applies the stream definition, selected option ownership, requiredness, and exact value formats. This JSON is not a free-form substitute for typed field configuration.

`Common_Workflow_Member_Condition` links a setup member to field/option conditions in the same stream. `Common_Workflow_Publication_Condition` retains immutable published references, and `Common_Workflow_Run.egcs_cn_routing` freezes the captured routing values and eligibility. Working configuration and historical evidence therefore have separate reference guards. See [Custom fields](../programs/custom-fields.md) for editing rules, AND/OR examples, and retirement behavior.

## Exact assignment integrity

`Common_Entity_Assignment` stores exact `(entity type, entity ID, Common user)` rows and an informational primary flag. Active-row uniqueness prevents duplicate assignees. Deferred roster triggers require every active assignable entity to have at least one active assignment and exactly one primary at commit. Soft-delete lifecycle triggers retire assignments when their entity is deleted.

Proponents, Agreements, reviews, recommendations, claims, claim reconciliations, payments, forecasts, monitors, amendments, and commitments each register the appropriate roster and soft-delete triggers. The trigger names generated programmatically for Agreement children are expanded explicitly in `documentation-audit/data-coverage.json` so no material mechanism is hidden behind a template literal.

Role access is stored in `role_permission`, one active row per role/subject. `access_level` is nullable or `viewer`, `contributor`, `manager`; `can_manage_assignments` is independent and allowed only for persisted subjects `agreement` and `applicant_recipient` (labelled Agreement and Proponent in the UI). Deferred scope triggers reject permissions that are incompatible with the role's global, agency, or program structure.

## Financial precision and concurrency

Public money uses canonical two-decimal strings and exact integer-cent arithmetic. A `numeric(19,2)` row can represent up to `99999999999999999.99` in magnitude; a domain may impose additional sign or aggregate rules. Do not convert IDs or money to JavaScript `Number` for convenience. For example, preserve `"9007199254740993"` as an identifier and `"10000000000000000.01"` as money rather than losing precision in JSON numbers.

Percentage-derived budget amounts use captured mode/source/percentage settings and round to a whole dollar before returning two-decimal money. Recalculation groups by budget version, fiscal year, and currency, validates affected totals, and rolls the mutation back on failure. The supported user calculation examples are in [Budget](../agreements/budget.md).

Sensitive writes lock and rebuild authorization before locking business aggregates. Agreement, transfer-payment, extension, approval, review, and workflow helpers encode stable lock ordering. PostgreSQL integration tests—not PGlite mocks—are the authority for independent-session races, constraint behaviour, and deadlock prevention.

PGlite supports local/demo operation and most schema behaviour but uses one embedded backend. It cannot prove multi-connection PostgreSQL locking.

The exhaustive table/constraint/function/trigger disposition is maintained in `documentation-audit/data-coverage.json` and must be terminal before this reference is considered complete.

## Migration-by-migration entity reference

The following inventory is grouped by aggregate. Names are physical table names unless described as a function, trigger, constraint, or relationship. Foreign keys use `RESTRICT` for domain records unless a cascade is stated explicitly; active-row uniqueness normally means a partial unique index with `_deleted = false`.

| Migration | Persisted entities | Material integrity contract |
| --- | --- | --- |
| `0001_common` | `Common_Contact`, `Common_Address`, `Common_Approval_Template` | Shared enums and `citext`; active contact email uniqueness; Canadian subdivision validation; `numeric(10,7)` coordinates. Later migrations add the typed publication/runtime and attachment structures. |
| `0002_users` | `user`, `session`, `account`, `verification` | Installs `plpgsql` when absent so PostgreSQL and PGlite can compile procedural functions. Better Auth owns these shapes. User email and session token are unique; sessions/accounts cascade with the user. `enforce_active_session_user()` and its trigger reject a session whose user is soft-deleted. |
| `0003_rbac` | `role`, `role_permission`, `user_role_assignment`, `security_audit_event` (moved to `audit` by `0013`) | Permission subject, access level, effective-row, assignment-management subject, and active uniqueness constraints enforce the cumulative model. Role and assignment children cascade; audit actors are restricted. `prevent_security_audit_event_mutation()` plus its trigger reject audit updates/deletes. |
| `0004_agency` | `Agency_Profile`, `Common_Status`, `Agency_Cost_Category`, `Agency_Cost_Category_Line_Item`, `Agency_Holdback_Basis`, `Agency_Fiscal_Year`, `Agency_Address_Type`, `Agency_Applicant_Recipient_Subtype`, `Agency_Approval_Behalf_Type`, `Agency_Agreement_Type` | All reference rows belong to an agency and carry bilingual values and soft deletion. Active bilingual names/codes are unique inside their owner; line items belong to a category; fiscal-year date ranges and profile uniqueness are database constrained. |
| `0005_common_agency` | `role.agency_id` relationship | Adds `role_agency_fk` to `Agency_Profile` with restricted deletion, after the Agency table exists. |
| `0006_transfer_payment` | `Transfer_Payment_Profile`, fiscal-year and stream budgets, stream setup/reference tables, `Transfer_Payment_Stream_Chart_of_Account`, `Transfer_Payment_Stream_Commitment_Type`, and `role_transfer_payment_scope` | Program/stream ownership and financial precision are constrained. Chart entries carry ordered bilingual JSON dimensions, belong to a same-stream budget, and are unique by active budget/dimensions. Commitment types are bilingual same-stream references. Ownership-protection and deferred permission/scope triggers reject cross-owner changes and incompatible permission graphs. |
| `0008_applicant_recipient` | `Applicant_Recipient_Profile`, `Applicant_Recipient_Registry`, `Applicant_Recipient_Agency_Financial_Id`, `Applicant_Recipient_Other_Name`, `Applicant_Recipient_Address`, `Applicant_Recipient_Contact`, `Applicant_Recipient_Funding_History`, `Applicant_Recipient_Funding_History_Recipient` | The profile has a registered typed identity and lead agency. Active child relationships are owner-scoped and unique. Funding amount is `numeric(19,2)`. Funding-history cleanup retires an unlinked record. Proponent roster/soft-delete triggers enforce its exact assignments. |
| `0010_extensions` | `extensions.agency_enablement`, `extensions.agency_storage_selection`, `extensions.stream_configuration`, `extensions.kv_entry`, `extensions.secret_entry` | Enablement/configuration is unique per extension and agency/stream and uses restricted host foreign keys. KV uniqueness is `(extension_id, owner_type, owner_id, key)`. Secret uniqueness is scoped similarly; ciphertext, IV, authentication tag, and key version are stored, never plaintext. Extension migrations run through the host transaction described in the extension architecture guide. |

## Polymorphic review, approval, recommendation, and workflow engine (`0007`)

`0007_polymorphic_common_tp` creates `Common_Entity`, `Common_Entity_Type`, `register_entity()`, composite typed foreign keys, and the review/recommendation/approval/completion/workflow authoring and runtime graphs. `Common_Entity_Assignment` replaces entity-specific Team rows with an exact, no-access-level roster. Review and recommendation lifecycle triggers enforce non-empty one-primary rosters. Recommendation setup members include the snapshotted fail-on-Not-Recommended policy.

The named constraint rows `ay_ref_profilegwcoanumber`, `tp_ref_streamid`, and `cn_ref_*` bind agency/program identities and typed review/template setup chains. The `cn_chk_*` rows narrow legal approval/review scope and target types and validate additional-approval names. `Common_Review_Setup` must match its `Common_Review_Set_Setup` entity type, and review runtime rows pin the schema version they execute.

Approval evidence is attached to canonical runtime items. `trg_fn_enforce_approval_sequence`, `trg_fn_lock_actioned_approval`, `trg_fn_require_certifications`, and `trg_fn_require_actual_delegation_detail` enforce decision order, immutability, certifications, and delegated-approver evidence. `trg_fn_validate_approval_runtime_item`, `trg_fn_enforce_approval_runtime_state`, and the approval/certification evidence locks bind decisions to the current runtime. Additional steps use `trg_fn_validate_added_approval_runtime_step`; they cannot rewrite a resolved prefix.

Publication versions, references, and transitions are sealed evidence. The publication-reference validator checks the typed dependency graph, and authoring guards prevent edits to retired configuration. Runtime insert and hierarchy validators enforce root/item identity and parent-child structure. State changes require transition insertion; directly patching runtime state is not a supported transition mechanism.

Completion validators enforce one exact target, its registry capability, its disposition, and the related workflow target. `trg_fn_lock_completion` freezes completion evidence. Workflows retain default-owner mappings, status transitions, and owner blockers. Conditional routing additionally retains published discriminator references and immutable per-run captured values and member eligibility. See [Custom fields](../programs/custom-fields.md) for active versus historical reference rules.

## Funding-agreement aggregate (`0009`)

The agreement root is `Funding_Case_Agreement_Profile`. Its children are:

- recipients and addresses: `Funding_Case_Agreement_Applicant_Recipient`, `Funding_Case_Agreement_Address`;
- amendment/versioning: `Funding_Case_Agreement_Amendment`, its type/subtype links, `Funding_Case_Agreement_Budget_Version`, `Funding_Case_Agreement_Activity_Version`, `Funding_Case_Agreement_Approval_Submission`, and `Funding_Case_Agreement_Revision`;
- budgets and activities: `Funding_Case_Agreement_Budget_Fiscal_Year`, `Funding_Case_Agreement_Budget_Line_Item`, `Funding_Case_Agreement_Activity`, outcome/activity and responsible-party/activity links;
- operations: forecast and line items, claim and line items, claim reconciliation and line items, commitment and lines, payment and lines;
- monitoring: monitor, planning, items, findings, follow-ups, follow-up updates, and promising practices.

Agreement, amendment, claim, claim reconciliation, forecast, commitment, payment, monitor, and Closeout rows receive registered `Common_Entity` identities. Their assignment triggers enforce/retire exact rosters. `Funding_Case_Agreement_Closeout` permits one open row per Agreement, constrains status/open combinations, and owns an immutable readiness snapshot per run. Snapshot triggers validate the `approval_submission` run and parent Agreement and reject update/delete. Stable budget identities are PostgreSQL bigint values, exposed as decimal strings. Initial working-version triggers create budget/activity versions. Approval-submission triggers validate run purpose/target and reject packet update/delete. Revision validation requires the submission, optional amendment, and Agreement to agree.

The `trg_fn_resolve_*` family and corresponding triggers derive—not trust—parent identity: current budget/activity version, budget-line item identity, claim-line agreement, forecast-line agreement, reconcile-line claim, commitment-line stream/budget scope, payment agreement, and payment-line commitment. Root-enforcement triggers then reject cross-agreement fiscal years or line items. Amendment type/subtype triggers require configuration from the agreement’s stream.

Money fields for agreement budgets, forecasts, claims, reconciliation, commitments, and payments are `numeric(19,2)`; holdback/percentages are `numeric(5,2)` and risk score is `numeric(8,2)`. `fc_enforce_commitment_program_funding_total` is the shared validation function invoked by the budget-line, budget-version, and commitment-line trigger families: active commitment allocation may not exceed the corresponding program-funding total. These checks execute for both sides of relevant inserts/updates, so a later budget reduction cannot bypass the invariant.

## Storage, audit, and incremental additions

`Common_Attachment_Types` belongs to an Agency. `Common_Attachment` stores host metadata plus a pinned provider/object/locator and optional metadata contract. `Common_Entity_Attachment` binds an upload to an exact typed target. Generated documents instead use their typed generated-document relationship. `extensions.agency_storage_selection` chooses the provider for new writes; it does not relocate existing objects.

`0011` persists `delete_object` and `restore_metadata` operations with pending/processing/completed/dead-letter states, attempt counts, next-attempt time, and lease ownership. External bytes are not part of the database transaction. The outbox enables retry and compensation; it does not make every generated-document cleanup durable. See [Background work](../operator/background-work.md).

`0012` starts recommendation response revision at 1. A save supplies the expected revision, updates under lock, and increments it. This counter is independent of the recommendation schema publication.

`0013` moves security events into `audit.security_audit_event` and adds `audit.change_event`, `audit.access_event`, capture policy, and retention policy. Change capture records exact JSON values and configured redaction. Append-only triggers reject ordinary update/delete/truncate; the expiry function permits only eligible retention deletion. Access capture is buffered outside business transactions and can be delayed or lost. The two evidence streams must not be interpreted as identical guarantees.

`0014` backfills both new terms URL columns from the old destination, including retired programs, and requires both columns. A compatibility insert trigger permits historical seed inserts; current APIs require independently supplied English and French URLs. The migration is intentionally forward-only because merging independently authored URLs would lose information.

`0015` adds availability flags defaulting to true on existing cost categories, line items, and stream mappings. Availability does not remove references or rewrite saved Agreement calculations. Deletion, availability, and the Agency’s business-status catalogue remain separate concepts.

## Manual spreadsheet maintenance

The external data-model workbook is no longer maintained by wholesale normalize/diff/sync scripts. The model owner compares source and workbook evidence and uses bounded commands only: `data-model:sheet:read`, `data-model:sheet:cell:update`, and `data-model:sheet:row:read|update|insert|delete|color|move`.

Before first use or when Google access must be renewed, place an installed or web OAuth client document at `~/.config/gcs-ssc/google-oauth-client.json`, then run `bun run data-model:sheet:authorize` in an interactive local terminal. Open the printed Google URL and complete consent; the command listens only on a temporary `127.0.0.1` callback, verifies the random OAuth state, requires both access and refresh tokens, and writes `~/.config/gcs-ssc/google-sheets-token.json` with owner-only permissions. It times out after ten minutes. Never paste either file, URL parameters, authorization code, or tokens into documentation, logs, issues, or source control.

Every write names the sheet and row and supplies an expected current cell value; a guard mismatch aborts. Cell/row content comes from an explicit file, formulas remain user-entered formulas, and the command rereads surrounding rows after a mutation. Do not recreate a whole-workbook reconciliation script or treat this manual external workflow as a migration source.

When authorizing from a remote terminal, the browser may fail to reach that terminal’s loopback listener. Paste the **entire callback URL into the still-running authorization command**, not into an issue or chat. It validates the expected origin/path, a single matching state, and a single authorization code before exchange. The same ten-minute deadline applies.

For a small prepared block, invoke `bun run scripts/data-model-spreadsheet-row.ts fill-blank --sheet "Sheet title" --row 100 --count 2 --expected-first-cell-empty --values-file /path/to/rows.json`. Replace the example sheet and rows after reading the destination. The file must contain exactly two equally sized arrays of strings, for example `[["Field A", "text"], ["Field B", "bigint"]]`. This value-only operation supports 1–32 rows within the existing grid, refuses any destination row containing a value, formula, or note, and preserves formatting. It does not insert rows or permit overwriting populated rows. Moves separately guard the destination’s expected first cell, including an explicitly empty destination.

## Verification and engine differences

The canonical-schema test migrates a fresh PGlite database and inventories tables, enums, columns, indexes, unique/check/foreign-key constraints, functions, and triggers. Targeted migration tests verify review subtype/version pinning, polymorphic pairs, approval state enforcement, agreement ownership/versioning and financial totals. PostgreSQL integration suites additionally verify independent-session locking and races; they require a configured PostgreSQL test URL and are not implied by a PGlite pass.
