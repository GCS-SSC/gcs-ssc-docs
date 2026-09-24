# Source-to-documentation review

The pinned application target for this run is `c02d847de7078a2110f54c298ed3ef7f3e1b620b`, after the previously verified `395a5c7e62f982ce71b4390fe33fa1dd04480d6b`. The continuation marker remains in `.agents/skills/gcs-docs-sync/SKILL.md` and advances only after the final checks.

## Method and evidence scope

The review covers 51 incremental commits. `incremental-changes.json` records each commit, datetime, disposition and paired destinations. The net diff was reconciled against the pinned final UI, route handlers, schemas, domain helpers and migrations; intermediate plans, tests and image pins are not treated as separate user contracts. Concrete extensions retain ownership of their implementation guides; the host's public boundaries are documented here.

The coverage ledgers track source-to-documentation coverage, not application test execution. Generated API route tables are navigation aids; the ledgers also identify route and direct helper/schema source evidence. Migration rows identify the current ordered files, including raw SQL declarations. The 0001–0013 files were consolidated and renumbered to 0010–0140; byte-identical files were compared directly, and changed migration groups were reviewed against their old versions and current guides. The new notes and administrative group migrations were read directly. No application runtime suite or CodeRabbit review was run for this documentation update.

## Final contract dispositions

| Area | Final source and documentation reconciliation |
| --- | --- |
| Audit and permissions | Global and Agency Audit visibility follows event attribution; sanitized request/query inputs require a separate Audit grant. Extension ownership capture and query-input redaction are covered. `group` is a distinct role subject; membership alone grants no business-data access. |
| Home and navigation | The old static home statistics and inert actions were replaced by live assigned-work and claimable-group queues, with per-section pagination, counts, loading, retry and claim recovery. Sidebar and locale route guidance was updated. |
| Agency setup | Agency detail owns custom-field definitions, approval templates, review/recommendation schemas and sets, workflows, document templates, chart of accounts, commitment types and monitor types. Draft, publish, link, retire and historical-reference behavior is distinguished from Stream selection. |
| Program and Stream | Streams maintain local budgets, risk ratings, statuses and eligible recipients while selecting eligible Agency designs and operational catalog entries. Program terms use bilingual URLs. Financial catalog links retain Agency and fiscal-year guards. |
| Agreement and Proponent | Recipient subtype moved from the Proponent profile to each Agreement–Proponent relationship; Stream mappings and optional future-choice consistency govern it. Agreement notes belong to an exact Agreement; Proponent notes are Agency-scoped. Both have bilingual subject/body requirements and soft deletion. |
| Workflow and reviews | Agency-owned published designs can be linked to eligible Streams. Direct Reviews tabs expose published set selection. Member conditions include custom-field options, Agreement subtype, further distribution and recipient subtype. Each attempt retains its captured routing evidence; a retry keeps version pins and captures current values for its successor. |
| Checklists and recommendations | Optional checklist `not_applicable` answers, comment rules, recommendation radio comments and JSON schema import are documented in both languages. Import updates an editor draft and still requires Save. |
| Data model | Ordered clean-schema migration names, Agency catalog tables and Stream links, exact-Stream Agreement references, scoped Audit fields, notes and group claim/evidence triggers replace the old migration description. The demo seed is outside the production registry. |
| Deployment | The pinned GHCR image, manual image publishing, AWS CDK demo, Railway IaC and current reset helper boundary are described for operators. |

## Editorial and tooling review

The paired guides preserve matching heading/table structure, procedures, examples and recovery paths. Source-aware inventories and API references were regenerated from the ignored clone. This run does not claim that application regression tests, browser tests, or CodeRabbit were executed. The documentation build and repository checks are recorded in the current status and, after completion, the source-baseline receipt.

## Application limitations

`documentation-findings.md` retains independently documented application limitations such as amendment capacity reconciliation, signed financial inputs, duplicate logical forecast/claim coordinates, payment picker eligibility and generated-document context/cleanup boundaries. Its former Home dashboard placeholder finding is resolved by the new live dashboard.
