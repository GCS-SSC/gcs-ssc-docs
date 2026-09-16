# Source-to-documentation review

The application target is `395a5c7e62f982ce71b4390fe33fa1dd04480d6b`. The continuation marker lives only in `.agents/skills/gcs-docs-sync/SKILL.md`; this document describes the review performed for this synchronization.

## Method and evidence scope

The review considered 231 incremental commit records after the previous verified source `ea20230fe4d61bbb3214879b7b881f5317773d02`, then reconciled their effects against the final implementation. `incremental-changes.json` records the commit/date, documentation destinations, and disposition. Later fixes and reversions determine what remains documented. Internal review checkpoints and concrete extension implementation changes do not create independent host user workflows.

The coverage ledgers describe **source-to-documentation coverage**, not application test coverage. API entries point to their explicit generated route rows and named authorization/validation/delegation evidence; page/component entries point to their owning user or shared-behavior guide; schema entries point to their defining migration and the aggregate integrity reference. Related symbols are explained together rather than presented as hundreds of separate user features. Evidence lists refer to current source paths. Prior synchronization test counts and obsolete source claims have been removed.

Application regression suites were not executed for this documentation-only update. Source tests and architecture material can inform interpretation, but no prior run is represented as current execution evidence. Documentation checks, generation consistency, locale parity, links, and production builds are recorded separately in the verification receipt.

## Final contract dispositions

| Area | Final source and documentation reconciliation |
| --- | --- |
| Application shell and identity | Current sidebar and locale routes, session behavior, scoped roles, exact assignments, qualified review ownership, and recoverable lookup states. Dashboard sample totals remain explicitly identified as placeholders. French login uses `/fr/connexion`. |
| Agency administration | Dedicated GWCOA replaces generic administration guidance. Agency-owned statuses, attachment types, editable reference values, retained selections, calculation defaults, availability, and reference deletion guards are documented. Audit has its own explicit global permission and guide. |
| Programs and streams | Bilingual terms URLs and their migration, program/stream budget ownership and capacity, retained retired fiscal years, classification and holdback guards, and available cost mappings. Eligible-recipient configuration is not falsely described as an Agreement creation gate. |
| Custom fields and routing | Section/field/option authoring, active and historical values, sparse PATCH merging, single/multiple selections, AND/OR conditions, captured routing, retries, and working/published/historical reference protections. Numeric answers are distinguished from exact financial amounts. |
| Publication and runtime | Draft/published/retired authoring uses immutable integer versions. Approval templates are reusable within a stream and have no entity-type header. Existing runtime pins survive subsequent authoring changes. Standard workflows require explicit selection; completion-driven approval uses the entity registry. |
| Agreement profile and relationships | Program-first creation, independent readable Proponents, active candidate versus retained reference behavior, similarity confirmations, provider numbering, immutable stream, custom values, and risk workflows. Agreement–Proponent active pairs are unique and activity references protect replacement/deletion. |
| Budget and activities | Bigint stable lineage, exact decimal money, percentage source/group/rounding rules, fiscal-year and duration guards, capacity validation, and current versus Amendment versions. Partial activity date updates validate the effective pair. |
| Financial children | Completion evidence is separate from Agency business status and runtime outcome. Commitment/Forecast activation waits for positive completion effects; payment coverage uses the exact linked Commitment line. Claim submission remains sequential; reconciliation uses an atomic whole-grid write. Forecast/Claim fiscal-year guard warnings are corrected while real duplicate/sign limitations remain documented. |
| Amendments and Closeout | Required approval-submission workflows, selected immutable packet domains, cancellation, revision promotion, readiness financial evidence, per-currency variance, aggregate locks, and final parent closure. A successful reconciliation completion alone is not falsely presented as approved Closeout evidence. |
| Proponent work | Availability, exact rosters, independent lead Agency, address/reference retention, exact financial-ID strings, reviews and successor attempts. Funding History separates All/Mine/Agency system views from free-text external records and documents the candidate-row limit. |
| Shared files and generated documents | Exact typed attachment target, size/metadata requirements, selected provider for new writes and pinned provider for old objects, partial metadata recovery, compensation, and durable cleanup. Generated/template cleanup remains a separate best-effort boundary; it is not falsely guaranteed by the shared-attachment outbox. |
| Operations and Audit | Readiness includes migrations, providers, and audit initialization. Bounded startup retries, access-log buffering/drop limits, redaction, retention, one-shot cleanup worker leases/retries, packaged worker dependencies, and paired provider/database backups. Administrative SQL export is a schema bootstrap, not a live business-data backup. |
| Public SDK and developer contracts | SDK 0.3.1, extension-owned bilingual catalogues, configuration access and Agency-only configuration, numbering/storage providers, bounded extension operations, fresh transaction authorization, required-field accessibility, private tooling ownership, and bounded spreadsheet maintenance. |
| Schema inventory | Raw-SQL tables/types are now inventoried alongside Kysely declarations. Typed entities, publication/runtime tables, custom fields, routing conditions, attachment/provider structures, audit tables, and incremental migrations are represented. |

## Editorial and tooling review

Both locales retain detailed user procedures, examples, prerequisites, permissions, and recovery guidance. Technical API/data/SDK details remain in developer sections, with operational infrastructure in the operator section. The final language pass corrected stale French login text, added matching French persisted-entity names and packaging details, and retained exact code identifiers and numeric boundaries across translations.

Documentation tooling was reviewed for ignored-clone traversal, optional historical dossier directories, new domain mappings, and raw-SQL inventory extraction. The CodeRabbit review completed before the user requested explicit-only invocation and reported one minor issue: Audit needed its own domain entry instead of sharing GWCOA's destination. That change was made and checked locally. No further CodeRabbit run was requested or performed. `AGENTS.md` and the repository skill now explicitly require a user request before using CodeRabbit.

The new skill was validated using the skill-creator validator with an isolated PyYAML dependency. Its workflow keeps the sibling application checkout untouched, treats final behavior as authoritative, finishes authoring before final checks, rejects inherited test claims, and advances its single marker only after verification. No commits, pushes, application changes, or deployments were performed.

## Application limitations

`documentation-findings.md` distinguishes resolved historical claims from remaining source limitations. Documented limitations are not patches to the application. They include amendment capacity reconciliation, signed financial inputs, duplicate logical forecast/claim coordinates, payment picker eligibility, generated-document context/cleanup boundaries, and dashboard placeholders. The user guides explain the applicable operational consequences and recovery paths.
