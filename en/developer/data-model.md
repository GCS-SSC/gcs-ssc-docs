# Data model and integrity

The ordered migrations registered in `server/database/production-core-migrations.ts` are authoritative. `shared/types/database.d.ts` is the Kysely application contract, but it does not replace database constraints, functions, or triggers.

## Ordered schema

| Migration | Area |
| --- | --- |
| `0001_common` | Common enums, metadata, attachments, entities, review/approval/completion foundations |
| `0002_users` | Better Auth users, sessions, accounts, and verification |
| `0003_rbac` | Roles, abilities, assignments, and security audit events |
| `0004_agency` | Agency profile and agency-owned resources |
| `0005_common_agency` | Shared agency reference relationships |
| `0006_transfer_payment` | Programs, streams, configuration, schemas, budgets, and setups |
| `0007_polymorphic_common_tp` | Typed entity registry, review/recommendation/approval/workflow runtime, constraints, and triggers |
| `0008_applicant_recipient` | Proponent profile and child/link records |
| `0009_funding_case_agreement` | Agreement aggregate, lifecycle, financial records, ownership constraints, and state triggers |
| `0010_extensions` | Agency/stream enablement, configuration, KV, and encrypted secret records |

The demo-only `9999_seed` migration is not in this production registry.

## Ownership and identifiers

The principal hierarchy is Agency → Transfer Payment Profile → Stream → Funding Agreement. Applicant recipients have a lead agency and link independently to agreements. Authorization resolves these current active relationships from the database; caller-supplied ownership is never authoritative.

Core identifiers are `bigserial`/`bigint`. PostgreSQL/Kysely exposes them as strings at application boundaries. Core entities and links generally use `_deleted`; deletion sets the flag and active queries filter it. Check each table because some append-only approval children intentionally do not expose soft deletion.

## Typed polymorphism

`Common_Entity` owns a globally unique ID and `Entity_Type`. Polymorphic consumers reference the composite `(id, type)`, so an existing ID with the wrong type is rejected. Registration triggers allocate the shared identity for streams, proponents, agreements, amendments, forecasts, claim reconciliations, commitments, payments, monitors, reviews, and recommendations.

Setup/member/runtime chains propagate type columns through composite foreign keys. Those propagated values are integrity fields, not independently editable business data. Narrow check constraints further limit which types each review, approval, completion, recommendation, workflow, or Team engine accepts.

## Versions and lifecycle enforcement

Published review, approval, recommendation, and workflow configurations are immutable snapshots. Runtime rows pin the published version/configuration so later edits or soft deletion of authoring rows do not rewrite an in-flight process. Agreement budgets and activities also use versions associated with amendments.

PostgreSQL triggers enforce approval sequencing, immutable decisions, required certifications, active routing-slip uniqueness, allowed terminal transitions, workflow/setup agreement, and financial/lifecycle invariants. Application validation improves localized errors but is not a substitute for these constraints.

## Financial precision and concurrency

Numeric values are parsed through the fail-closed safe-decimal contract. Public money schemas use the repository’s precision bounds and financial migrations preserve declared `numeric(p,s)` scales. Calculations must not silently coerce unsafe PostgreSQL numeric values into JavaScript numbers.

Sensitive writes lock and rebuild authorization before locking business aggregates. Agreement, transfer-payment, extension, approval, review, and workflow helpers encode stable lock ordering. PostgreSQL integration tests—not PGlite mocks—are the authority for independent-session races, constraint behaviour, and deadlock prevention.

PGlite supports local/demo operation and most schema behaviour but uses one embedded backend. It cannot prove multi-connection PostgreSQL locking. PostgreSQL 18 may provide native `uuidv7()`; the migration path adapts when the older extension implementation is absent.

The exhaustive table/constraint/function/trigger disposition is maintained in `documentation-audit/data-coverage.json` and must be terminal before this reference is considered complete.

## Migration-by-migration entity reference

The following inventory is grouped by aggregate. Names are physical table names unless described as a function, trigger, constraint, or relationship. Foreign keys use `RESTRICT` for domain records unless a cascade is stated explicitly; active-row uniqueness normally means a partial unique index with `_deleted = false`.

| Migration | Persisted entities | Material integrity contract |
| --- | --- | --- |
| `0001_common` | `Common_Contact`, `Common_Address`, `Common_Completion`, `Common_Certification`, `Common_Approval_Template`, `Common_Approval_Step`, `Common_Routing_Slip`, `Common_Form_Schema`, `Common_Attachment_Type` | Establishes shared enums and `citext`; active contact email is unique. Canadian addresses require a valid `Jurisdiction`; coordinates are `numeric(10,7)`. Approval steps reference a certification, template, and default contact. Form-schema versions are `numeric(10,2)` and payloads are JSONB. |
| `0002_users` | `user`, `session`, `account`, `verification` | Better Auth owns these shapes. User email and session token are unique; sessions/accounts cascade with the user. `enforce_active_session_user()` and `trg_enforce_active_session_user` reject a session whose user is soft-deleted, locking the active user row for the check. Provider tokens/password material belongs only in the account store and must never be exposed in documentation or logs. |
| `0003_rbac` | `role`, `role_ability`, `user_role_assignment`, `security_audit_event` | Ability actions and subjects are closed check-constrained vocabularies. Active abilities and user/role assignments are unique. Role and assignment children cascade; audit actors are restricted. `prevent_security_audit_event_mutation()` plus `security_audit_event_append_only` reject audit updates and deletes, while event/target types are check constrained. |
| `0004_agency` | `Agency_Profile`, `Agency_Cost_Category`, `Agency_Cost_Category_Line_Item`, `Agency_Holdback_Basis`, `Agency_Fiscal_Year`, `Agency_Address_Type`, `Agency_Applicant_Recipient_Subtype`, `Agency_Approval_Behalf_Type`, `Agency_Agreement_Type` | All reference rows belong to an agency and carry bilingual values and soft deletion. Active bilingual names/codes are unique inside their owner; line items belong to a category; fiscal-year date ranges and profile uniqueness are database constrained. |
| `0005_common_agency` | Relationships added from common setup records to `Agency_Profile` | Makes certifications, approval templates, attachment types, and form schemas agency-owned through restricted foreign keys, completing the dependency introduced in `0004`. |
| `0006_transfer_payment` | `Transfer_Payment_Profile`, `Transfer_Payment_Fiscal_Year_Budget`, `Transfer_Payment_Stream`, `Transfer_Payment_Objective`, `Transfer_Payment_Outcome`, `Transfer_Payment_Outcome_Performance_Indicator`, `Transfer_Payment_Stream_Outcome`, `Transfer_Payment_Stream_Budget`, `Transfer_Payment_Stream_Eligible_Recipient`, `Transfer_Payment_Stream_Cost_Category_Line_Item`, `Transfer_Payment_Stream_Holdback_Basis`, `Transfer_Payment_Agreement_Subtype`, `Transfer_Payment_Amendment_Type`, `Transfer_Payment_Amendment_Subtype`, `Transfer_Payment_Amendment_Subtype_Type`, `Transfer_Payment_Stream_Commitment`, `Transfer_Payment_Monitor_Type`, `Transfer_Payment_Stream_Area_of_Expertise`, `Transfer_Payment_Stream_Risk_Rating`, `Transfer_Payment_Financial_Limits`, `role_transfer_payment_scope` | Program dates are ordered; active program/stream and owned-reference names are unique. Budgets and maximum amounts use `numeric(19,2)`, percentages `numeric(5,2)`, and risk scores `numeric(8,2)` with non-negative risk. Composite ownership binds a commitment to a budget in the same stream. `trg_fn_enforce_amendment_subtype_type_stream_scope` and its trigger require an active amendment type and subtype from the same stream. |
| `0008_applicant_recipient` | `Applicant_Recipient_Profile`, `Applicant_Recipient_Registry`, `Applicant_Recipient_Agency_Financial_Id`, `Applicant_Recipient_Other_Name`, `Applicant_Recipient_Address`, `Applicant_Recipient_Contact`, `Applicant_Recipient_Funding_History`, `Applicant_Recipient_Funding_History_Recipient` | The profile has a registered typed identity and an optional lead agency. Active registry, agency-financial-ID, alternate-name, address, and contact relationships are owner-scoped and unique. Funding amount is `numeric(19,2)`; funding history can link multiple recipients. `trg_fn_soft_delete_unlinked_funding_history` and its trigger soft-delete a history record after its last active recipient link is removed. `ar_ref_profileid` and the registration trigger preserve the shared identity. |
| `0010_extensions` | `extensions.agency_enablement`, `extensions.stream_configuration`, `extensions.kv_entry`, `extensions.secret_entry` | Enablement/configuration is unique per extension and agency/stream and uses restricted host foreign keys. KV uniqueness is `(extension_id, owner_type, owner_id, key)`. Secret uniqueness is scoped similarly; ciphertext, IV, authentication tag, and key version are stored, never plaintext. Extension migrations run through the host transaction described in the extension architecture guide. |

## Polymorphic review, approval, recommendation, and workflow engine (`0007`)

`0007_polymorphic_common_tp` creates `Common_Entity`, the `Entity_Type` vocabulary, `register_entity()`, registration triggers for streams/reviews/recommendations, and the composite foreign keys that bind an ID to its exact type. It also materializes the review authoring/runtime graph (`Common_Review_Schema`, checklist/assessment schemas and versions, review-set setup/member rows, runtime review sets/reviews, subtype response/outcome rows and additional reviewers), recommendation schemas/versions/setups/runtime rows, approval templates/routing slips/approval decisions/certifications, completions, workflows, and exact-entity Team assignments. `copy_legacy_rows` migrates the pre-polymorphic common records into the typed structures; it is migration-time data movement, not a runtime API.

The named constraint rows `ay_ref_profilegwcoanumber`, `tp_ref_streamid`, and `cn_ref_*` bind agency/program identities and typed review/template setup chains. The `cn_chk_*` rows narrow legal approval/review scope and target types and validate additional-approval names. `Common_Review_Setup` must match its `Common_Review_Set_Setup` entity type, and review runtime rows pin the schema version they execute.

The approval trigger family is deliberately redundant across layers: `trg_fn_autopopulate_self_approval`, `trg_fn_enforce_approval_sequence`, `trg_fn_enforce_assigned_user_actions`, `trg_fn_lock_actioned_approval`, `trg_fn_lock_approval_on_terminal_slip`, `trg_fn_require_actual_delegation_detail`, `trg_fn_require_certifications`, `trg_fn_routingslip_forward_status`, both routing-slip snapshot functions, and `trg_fn_validate_added_step_sequence` are each attached by their corresponding `trg_*` trigger. Together they populate self-approval, enforce ordered/assigned action, freeze decided or terminal records, require delegation evidence and certifications, advance the slip, snapshot additional-approval policy/certifications, and constrain inserted steps. `trg_fn_cascade_routingslip_status` propagates terminal slip state.

Review and recommendation integrity uses subtype-check triggers for assessment/checklist schema and runtime rows, immutable published-version triggers, and `trg_fn_reset_additional_reviewer_completion` when an additional-reviewer assignment changes. `trg_fn_enforce_completion_audit_fields` keeps completion value, actor, and timestamp coherent. `trg_fn_validate_workflow_setup` requires referenced approval/review/recommendation setup to agree with workflow scope and target. Every named function is paired with the same-suffix trigger listed in the ledger.

## Funding-agreement aggregate (`0009`)

The agreement root is `Funding_Case_Agreement_Profile`. Its children are:

- recipients and addresses: `Funding_Case_Agreement_Applicant_Recipient`, `Funding_Case_Agreement_Address`;
- amendment/versioning: `Funding_Case_Agreement_Amendment`, its type/subtype links, `Funding_Case_Agreement_Budget_Version`, `Funding_Case_Agreement_Activity_Version`, and `Funding_Case_Agreement_Revision`;
- budgets and activities: `Funding_Case_Agreement_Budget_Fiscal_Year`, `Funding_Case_Agreement_Budget_Line_Item`, `Funding_Case_Agreement_Activity`, outcome/activity and responsible-party/activity links;
- operations: forecast and line items, claim and line items, claim reconciliation and line items, commitment and lines, payment and lines;
- monitoring: monitor, planning, items, findings, follow-ups, follow-up updates, and promising practices.

Agreement, amendment, forecast, claim reconciliation, commitment, payment, and monitor rows receive registered `Common_Entity` identities through the named `trg_register_*` triggers. `uuid_generate_v7` supplies time-ordered revision identifiers where native PostgreSQL support is unavailable. `trg_fn_create_agreement_working_versions` and its trigger create initial working budget/activity versions. `trg_fn_validate_agreement_revision` requires a revision’s amendment, recommendation, budget version, and activity version to belong to the same agreement and valid lifecycle context.

The `trg_fn_resolve_*` family and corresponding triggers derive—not trust—parent identity: current budget/activity version, budget-line item identity, claim-line agreement, forecast-line agreement, reconcile-line claim, commitment-line stream/budget scope, payment agreement, and payment-line commitment. Root-enforcement triggers then reject cross-agreement fiscal years or line items. Amendment type/subtype triggers require configuration from the agreement’s stream.

Money fields for agreement budgets, forecasts, claims, reconciliation, commitments, and payments are `numeric(19,2)`; holdback/percentages are `numeric(5,2)` and risk score is `numeric(8,2)`. `fc_enforce_commitment_program_funding_total` is the shared validation function invoked by the budget-line, budget-version, and commitment-line trigger families: active commitment allocation may not exceed the corresponding program-funding total. These checks execute for both sides of relevant inserts/updates, so a later budget reduction cannot bypass the invariant.

## Verification and engine differences

The canonical-schema test migrates a fresh PGlite database and inventories tables, enums, columns, indexes, unique/check/foreign-key constraints, functions, and triggers. Targeted migration tests verify review subtype/version pinning, polymorphic pairs, approval state enforcement, agreement ownership/versioning and financial totals. PostgreSQL integration suites additionally verify independent-session locking and races; they require a configured PostgreSQL test URL and are not implied by a PGlite pass.
