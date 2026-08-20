# Incremental GCS-SSC Documentation Synchronization

Use this prompt to synchronize this documentation repository with every application change made after the application baseline recorded in `AGENTS.md`.

## Role

Act as the documentation owner for GCS-SSC. Work autonomously and make the in-scope local documentation changes. Be exact, skeptical, and source-driven. Write documentation that is useful to end users, administrators and program designers, operators, developers, integrators, support staff, and auditors without mixing those audiences into an unreadable page.

This is an implementation task, not a review-only task. Inspect the application deeply, update the documentation and coverage records, run the required generators and checks, and advance the synchronization baseline only when the entire target application range is documented and verified.

## Invocation

No argument is required. By default, synchronize through the latest fetched commit on the GCS-SSC application's `origin/main`.

If the caller explicitly supplies a target commit, use that exact full commit after verifying that it belongs to application `main`. Never silently substitute an older commit. Do not use a moving branch name as the final recorded baseline: resolve and retain a full 40-character target SHA and its committer datetime.

## Success criteria

Do not report completion until all of the following are true:

- Every commit reachable from the baseline-exclusive/target-inclusive range has been inventoried, including commits merged through a non-first-parent branch.
- The final executable application state has been traced across every affected layer, not inferred from commit subjects or the aggregate diff.
- Every affected current business rule, field constraint, permission boundary, lifecycle transition, side effect, limitation, failure mode, and recovery path is accurately documented for its applicable audiences.
- Added, changed, renamed, and removed behavior has been reconciled. Superseded behavior and fixed limitations are no longer described as current.
- English and French pages are semantically equivalent and structurally aligned.
- Generated references and all seven coverage ledgers match the target application tree.
- Every new or affected ledger row has a source-backed terminal disposition. No row is marked terminal merely because it existed before or was generated.
- The required Bun commands pass against `.reference-repos/gcs-ssc`, and the final application drift check is clean.
- Only after those conditions pass, `AGENTS.md` records the target application's full SHA and exact committer datetime. The audit baseline/status files agree with it.
- The sibling `../gcs-ssc` repository has not been modified in any way.

If required evidence is unavailable or a final check fails, leave the baseline unchanged and report the precise blocker. A partial documentation update is not a completed synchronization.

## Authority and safety boundaries

Read this repository's `AGENTS.md` first and obey it throughout the task. After preparing the reference clone, read the application clone's `AGENTS.md`, its `architecture/README.md`, and any more specific `AGENTS.md` that governs an affected path.

Use this evidence order when sources disagree:

1. Final executable source and runtime wiring at the target commit.
2. Registered migrations, database constraints/triggers, shared schemas/types, package manifests, and deployment configuration at the target commit.
3. Tests that exercise the current path. Tests express intent and regression coverage, but they do not override contradictory executable behavior.
4. Current application architecture documents and application `AGENTS.md` invariants.
5. Commit messages, PR-oriented notes, application `content/`, READMEs, audit records, generated reports, and existing site documentation as navigation leads only.

The application source of truth is its final state at the target commit. Earlier commits are still mandatory reading because they reveal intent, intermediate migrations, renamed concepts, iterative fixes, and tests that an aggregate diff can obscure. When an early commit adds a behavior and a later commit changes or removes it, document only the final current contract while recording that the entire sequence was reviewed.

Do not change application code, application tests, migrations, submodules, branches, or commits. Do not attempt to fix an application defect found during documentation work. Document the safe current behavior, its user or operational consequence, and a supported mitigation or recovery path. Avoid credentials, secrets, raw sensitive diagnostics, exploit instructions, and obsolete unsafe behavior.

Do not fetch, pull, switch, checkout, reset, clean, commit, or otherwise modify the sibling `../gcs-ssc` working repository. Do not even use it as the source for generators. Work only against the ignored clone at `.reference-repos/gcs-ssc`.

Editing files in this documentation repository and running non-destructive validation are authorized. Do not stage, commit, push, publish, open a pull request, or perform another external write unless the caller separately requests it. Preserve unrelated pre-existing work in the documentation worktree.

## Phase 1: Establish a reproducible source range

1. Inspect and record the documentation repository's branch, HEAD, short status, and pre-existing diffs. Do not overwrite unrelated changes.
2. Parse the current application baseline SHA and committer datetime from the `## Application sync baseline` section of this repository's `AGENTS.md`. The SHA must be a full 40-character commit.
3. Prepare `.reference-repos/gcs-ssc`:
   - If it does not exist, clone only application `main` from `https://github.com/GCS-SSC/gcs-ssc.git` into that exact path with recursive submodules initialized.
   - If it exists, first verify that it is the intended GCS-SSC clone and that its superproject and initialized submodules are clean. Stop rather than erase unexplained local changes.
   - Fetch application `origin/main` in this reference clone. Fast-forward its local `main` to `origin/main`; do not create a merge commit.
   - Synchronize submodule URLs and run the recursive submodule initialization/update so every target gitlink is checked out.
   - Confirm that the reference superproject and all initialized submodules are clean after preparation.
4. Resolve the target to the fetched full SHA. Capture its exact committer datetime with `%cI`, not the author date or the current wall-clock time.
5. Verify that the baseline commit exists in the clone and is an ancestor of the target. If it is not, stop: do not guess a range or advance the baseline across rewritten/nonlinear history.
6. Verify that the checked-out reference clone is exactly at the resolved target. Keep the target fixed during analysis.
7. If baseline and target are identical, confirm there is no unfinished prior synchronization in the documentation worktree, run the appropriate consistency checks, and report that no application delta exists. Do not rewrite the baseline just to change its date.

Useful read-only range views include:

```sh
git -C .reference-repos/gcs-ssc log --reverse --topo-order --date=iso-strict --format='%H%x09%P%x09%cI%x09%s' BASE..TARGET
git -C .reference-repos/gcs-ssc diff --find-renames --find-copies --name-status BASE TARGET
git -C .reference-repos/gcs-ssc diff --stat BASE TARGET
git -C .reference-repos/gcs-ssc diff --submodule=log BASE TARGET
```

Substitute the captured full SHAs for `BASE` and `TARGET`; do not rely on shell variables that were not explicitly set and verified.

## Phase 2: Build a complete commit and impact ledger

Enumerate every commit in `BASE..TARGET` exactly once with its SHA, parents, committer datetime, subject, and changed paths. Do not use `--first-parent` as the only history view. For each commit:

- Inspect its patch and full changed-file list.
- For a merge commit, inspect its parents, the integrated change relative to the first parent, and any merge-resolution delta. Do not assume that the merge subject describes all merged behavior.
- Classify its documentation impact even when it is labeled refactor, fix, test, build, deployment, cleanup, or documentation. Those changes can alter permissions, error behavior, defaults, runtime availability, or supported operations.
- Link iterative commits that modify the same feature so the final rule is derived from the complete sequence.
- Record whether the commit adds, changes, removes, restores, renames, or only verifies behavior.

Also inspect the final aggregate diff with rename/copy detection. Use history to avoid omissions and the final diff to see net behavior; neither view replaces the other.

Build a working impact matrix with at least these columns:

| Area | Required contents |
| --- | --- |
| Commits | Every related SHA, including follow-up fixes and merges |
| Entry points | Pages, components, composables, middleware, API handlers, workers, CLI/build/runtime entry points |
| Business implementation | Domain helpers, authorization package/policies, transactions, locks, state machines, extension hooks |
| Contracts | Schemas, shared types/enums, request/response/error shapes, i18n keys |
| Persistence | Registered migrations, tables, columns, types, indexes, checks, foreign keys, triggers, precision, soft deletion |
| Tests | Unit, route, component, integration, concurrency, migration, E2E, fixtures, and negative cases |
| Audiences | End user, administrator/program designer, operator, developer/integrator, support/audit implications |
| Documentation | Existing English/French destinations, navigation, redirects, generated references, ledger rows, known findings |

Do not start writing from the commit subject alone. Complete enough of this matrix to trace the affected executable paths first.

### Submodule changes

For every changed application gitlink, compare the old and new submodule SHAs. Inspect every submodule commit in that exact range plus its final source, migrations, manifests, tests, and user/admin/operator/developer consequences. An unchanged gitlink is pinned evidence; do not update it merely because the submodule's remote branch moved.

If a new extension or SDK workspace appears, verify host discovery, required capabilities, enablement scopes, dispatch authorization, lifecycle hooks, migration ownership, packaging, storage/secrets, failure isolation, and its owning tests. Never treat an extension README as stronger evidence than the mounted host path.

## Phase 3: Regenerate discovery artifacts and reopen affected coverage

Read `package.json`, all scripts under `scripts/`, `.vitepress/config.mts`, `documentation-audit/status.md`, `documentation-audit/source-baseline.md`, `documentation-audit/documentation-findings.md`, and the schemas/content of all seven `documentation-audit/*-coverage.json` ledgers before changing them.

Run the inventory once against the target early in the task to discover added and removed source surfaces:

```sh
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory
```

The inventory generator deliberately preserves manually curated fields and terminal statuses for stable IDs. Therefore, a regenerated ledger can look complete even when an existing source file changed. You must explicitly reopen affected stable rows by setting them to `IN_PROGRESS` before re-verification.

Reopen all directly or transitively affected rows, including:

- rows whose `source` or `evidence` names a changed file or symbol;
- page/component rows for changed user flows and all shared components whose changed behavior affects their consumers;
- API rows for changed handlers and for handlers delegating to changed schemas, helpers, policies, transactions, or middleware;
- migration/data rows for changed migrations, registry wiring, database mechanisms, generated types, or runtime assumptions;
- extension rows for changed host, SDK, manifest, capability, gitlink, handler, hook, migration, storage, packaging, or lifecycle behavior;
- configuration rows for package, environment, database mode, auth, storage, worker, health, Docker/Railway, CI, demo, build, or deployment changes;
- historical audit-impact rows whose source or final disposition changed;
- the applicable umbrella domain rows;
- rows mapped to pages containing a warning, limitation, or workflow that the new application range fixes or invalidates.

New rows begin as `IN_PROGRESS`. Deleted source rows may disappear during regeneration, but that does not complete the work: search the site and remove or rewrite stale promises, routes, screenshots, links, warnings, and business rules related to the deleted behavior.

For every affected row:

- Keep `audience`, `en`, and `fr` accurate; correct heuristic destinations when needed.
- Expand `evidence` to the exact final files needed to prove the behavior, including delegated helpers, schemas, migrations, tests, runtime wiring, or submodule sources—not only the top-level route.
- Make `notes` a concise source-backed disposition, not a generic assertion.
- Use `DOCUMENTED_VERIFIED` only after the final contract is present in both locale destinations and the evidence has been traced.
- Use `NOT_APPLICABLE_VERIFIED` only after a source-wide check proves why the surface has no current mounted/runtime documentation impact; state that reason in `notes`.
- Never mark a row terminal from a filename, generated route table, passing build, commit message, or test name alone.

If a new source family maps poorly in `generate-documentation-inventory.ts`, update the generator's durable mapping/classification logic rather than relying only on a one-time ledger edit.

## Phase 4: Trace the final executable behavior

For every affected feature or operational surface, follow the real call path as far as it applies:

1. Navigation visibility, route middleware, page/layout, component state, shared controls, and localized labels.
2. Form/client validation, lookup hydration, serialized request payload, pending/disabled state, and error presentation.
3. API authentication, authorization target and scope, exact assignment/approval/reviewer checks, validation, and localized error mapping.
4. Delegated domain helpers, extension dispatch/hooks, transaction boundaries, fresh authorization, lock order, idempotency, and after-commit work.
5. Queries and persistence: ownership, active/deleted filters, unique rules, foreign keys, checks, triggers, numeric/date limits, version/publication snapshots, and PostgreSQL/PGlite differences.
6. Response shape, client refresh/navigation, downstream consumers, background jobs, generated documents, notifications if actually mounted, and history/audit effects.
7. Focused tests for success, denial, validation, missing/deleted records, state conflicts, concurrency, retries, rollback/partial persistence, English/French behavior, and deployment/runtime wiring.

Inspect actual callers and consumers. A helper, enum value, schema, or API route existing in source does not prove that the core UI invokes it. Conversely, a hidden or absent control does not prove that an API/integration capability is unsupported. Explicitly distinguish:

- core UI behavior;
- server/API behavior;
- extension or integration behavior;
- database-enforced behavior;
- operational policy that is recommended but not enforced.

Resolve and document negative space. Search for declared-but-unmounted controls, writers for lifecycle states, callers of runtime helpers, registration of providers/hooks, and consumers of config. Do not promise a workflow merely because types, templates, or generic runtime support exist.

### Required business-rule checklist

For each affected domain, determine and document every applicable item below:

- Who can list, read, create, associate, update, delete, activate, publish, complete, submit, review, recommend, approve, deny, reassign, cancel, retry, restore, download, or administer it.
- The exact authorization root and scope; whether role ceiling, exact entity assignment, roster-management permission, reviewer assignment, or approval assignment is required; and where fresh authorization is repeated.
- Preconditions, lookup eligibility, ownership/parent-child boundaries, active/deleted requirements, and dependency/setup order.
- Every visible/editable field, required/optional/null behavior, bilingual fields, enum choices, lengths, ranges, formats, numeric precision/scale/sign, date ordering, uniqueness, and cross-field rules.
- Initial state, editable and locked states, every reachable transition, the actor/action that causes it, side effects, terminal states, activation rules, and whether reversal exists.
- Versioning, snapshots, pinned runtime definitions, publication, replacement, amendment lineage, and historical-record behavior.
- Atomic versus multi-request behavior, transaction scope, lock/concurrency behavior, idempotency, partial-success risk, and rollback guarantees.
- Soft deletion, cascade/retention behavior, dependency blocks, historical visibility, cleanup, and restore limitations.
- Search semantics, filters, sorting, pagination, grouping, totals, localized display, empty/loading/error states, responsive/accessibility behavior, and ambiguity in group actions.
- Downstream effects on financial capacity, payments, claims, commitments, forecasts, reviews, workflows, approvals, documents, workers, extensions, audit, and reporting.
- Expected localized errors and safe recovery steps for validation, conflict, stale state, missing access, unavailable dependencies, background failure, or external-service failure.
- Known implementation limitations or UI/API/database mismatches. State their precise consequence and safe workaround without presenting unsafe behavior as supported.

Use migrations and tests to discover boundary conditions that are easy to miss in UI code. Use final source to verify that every tested or described rule is still connected to a real path.

### Configuration and operations checklist

For application/configuration changes, verify and document as applicable:

- exact environment variable names, required/optional/default behavior, accepted values, and interactions without including real secret values;
- Bun/package/workspace commands and the target manifest's actual aliases;
- local versus PostgreSQL database behavior, migration ordering/registration, clean-start/demo behavior, and seed asset dependencies;
- Docker, Railway, WebContainer/demo, CI, build artifact, extension packaging, health/readiness, worker startup, and runtime filesystem behavior;
- storage and document-generation paths, backup/restore coupling, secret/key dependencies, cleanup/reconciliation, and failure monitoring;
- concurrency or deployment ordering requirements, rollback/recovery limits, and checks an operator can safely perform.

Do not describe a package script, health endpoint, worker, workaround, or deployment mode until its target-commit consumers and packaging path have been traced.

### Tests as evidence

Find focused tests through changed symbols, routes, helpers, schema names, migration names, and UI components. Read both positive and negative cases. Run focused non-destructive tests in the reference clone when they resolve an important ambiguity or verify a documentation claim and the environment supports them.

Inspect the target application's current `package.json` and `AGENTS.md` before choosing a command because test aliases may change. Use managed test commands where the application requires them. Do not edit the application to make a test pass. Record exact commands, results, source-defined skips, warnings, and unavailable PostgreSQL/external-service prerequisites. A skipped or blocked test is not proof of behavior.

## Phase 5: Author layered bilingual documentation

Read every affected English page, its French counterpart, relevant neighboring/cross-linked pages, and the associated sidebar entries before editing. Preserve the established VitePress information architecture and terminology, but improve detail wherever the source evidence supports it.

Integrate behavior into the durable task, concept, operator, and developer pages. Do not produce only a release note or commit-by-commit changelog. A reader should be able to operate the final application without knowing which commit introduced a rule.

### Audience layers

- **End users/caseworkers:** where to go, prerequisites, what controls and fields mean, exact steps, allowed states/actions, outcomes, warnings, errors, and recovery.
- **Administrators/program designers:** setup order, reference dependencies, RBAC/assignment boundaries, schema/template/workflow design, activation/publication/versioning, extension enablement, lifecycle governance, and safe change management.
- **Operators:** environment/runtime modes, startup, migrations, health, workers, storage, secrets, deployment, backups/restores, monitoring, failure isolation, and recovery.
- **Developers/integrators:** architecture, routes and payloads, validation/error contracts, authorization, transactions/locks, data integrity, extension/SDK boundaries, runtime hooks, i18n, and test expectations.
- **Support/audit readers:** observable symptoms, decision points, current limitations, safe diagnostics, recovery, and retained/historical effects without exposing sensitive internals.

Keep deep implementation detail in developer/operator pages when it would distract an end user, and cross-link from the task page. Do not omit a user-visible consequence simply because its enforcement is implemented in a migration or helper.

### Page quality standard

Use the sections that fit the feature; do not add empty boilerplate. A detailed feature page will commonly cover:

- purpose and navigation;
- access and prerequisites;
- list/search/filter/table behavior;
- create/edit field rules;
- exact business rules and calculations;
- lifecycle, approvals/reviews/workflows, and side effects;
- concurrency, integrity, deletion, and history;
- limitations or UI/API distinctions;
- failure messages, troubleshooting, and recovery;
- downstream effects and related-page links.

Use tables for exact matrices and field/state rules, ordered lists for workflows, and VitePress warning/danger callouts for consequential limitations. Keep technical identifiers in backticks. Do not fabricate examples, screenshots, labels, endpoints, defaults, or capabilities.

If a rendered UI materially changed, review referenced screenshots. Update screenshots only when you can capture the actual target application in both locales with representative non-sensitive data. Keep English/French screenshots paired and retain the seeded-example disclaimer. If capture is not possible, do not create a mock image; state the limitation in the task report and avoid leaving a materially false screenshot.

### English/French parity

- Every current `en/<path>.md` page must have `fr/<path>.md`, and every French page must have its English counterpart.
- Author the pair together. Preserve the same heading levels/order, table row counts, list meaning, callouts, code-fence count, warnings, caveats, links, and factual depth.
- Use clear Canadian French and the application's established French terminology. Derive UI labels and validation vocabulary from `i18n/locales/fr.json`; do not guess by literally translating an English label.
- Preserve exact identifiers, enum values, environment variables, route paths, payload keys, commands, and code in both languages.
- Localize prose and link destinations to the matching locale. Verify heading anchors separately because translated headings produce different anchors.
- Structural parity is only the minimum machine check. Semantically compare the pair before marking its ledger rows terminal.

When adding a page, update `.vitepress/config.mts` with matched English/French sidebar labels and the correct ordered location. Add or update redirects only where the repository's existing redirect convention requires them. Add reciprocal local cross-links and verify there is no duplicate documentation route.

### Generated files

Treat these as generated surfaces:

- `en/developer/api/*.md` and `fr/developer/api/*.md` from `scripts/generate-api-reference.ts`;
- `en/developer/audit-impact.md` and `fr/developer/audit-impact.md` from `scripts/generate-audit-impact-reference.ts`;
- the seven `documentation-audit/*-coverage.json` ledgers from `scripts/generate-documentation-inventory.ts`, with curated fields preserved by stable ID.

Do not place hand-authored content in a generated page if the final generator will erase it. Change the appropriate generator for generated structure/content, or put explanatory business guidance in a durable hand-authored page and cross-link it. If new route groups, classifications, destinations, or audit prefixes appear, update generator logic and bilingual labels/summaries together.

Generated route tables are exhaustive navigation indexes, not proof that a route contract has been traced and documented.

### Existing findings and status records

Review every relevant entry in `documentation-audit/documentation-findings.md`. If the target fixes, changes, or supersedes a recorded discrepancy, update the finding and every page that described it. If the discrepancy remains, reverify it against the target before retaining it. Add a new source-backed documentation finding when final behavior has a consequential application limitation that readers must understand; do not use the file for speculative defects or style preferences.

Update `documentation-audit/status.md` to describe this synchronization rather than leaving stale claims, counts, commands, or baselines from a prior run. Keep evidence concise enough to audit: range, affected domains, important source/test traces, generated counts, validation outcomes, environmental limitations, blockers, and exact next action.

## Phase 6: Regenerate and validate sequentially

Use Bun 1.3.13 as required by this repository. Check `bun --version` before the final gate. Do not update `bun.lock` merely because the available Bun version differs; report an environment mismatch if exact-version execution cannot be arranged.

After authoring and ledger reconciliation, run the required application-driven commands against the reference clone in this order:

```sh
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check
```

If application audit findings/investigations/personas or their classification changed, also run this before `docs:check`:

```sh
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:audit-impact
```

Run generators again even if they were run during discovery. Inspect their diffs. Confirm that regenerated files did not erase required content or restore stale statuses.

Also run:

```sh
git diff --check
VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build
```

The checker already performs the normal production build, but the deployed base-path build catches different link/asset mistakes. Run VitePress builds sequentially, never concurrently, because they share temporary/output directories.

Before considering the gate passed, verify manually that:

- all seven ledgers contain only `DOCUMENTED_VERIFIED` or `NOT_APPLICABLE_VERIFIED`;
- every changed/new source surface is present and every deleted source surface is absent;
- all affected stable rows were actually reverified after being reopened;
- English/French page paths and semantic content match;
- navigation, redirects, Markdown links, anchors, tables, code fences, and images are valid;
- no generated API/audit page contains hand edits that will disappear;
- documentation and reference clone diffs contain no accidental dependency/generated application changes;
- the application reference superproject and submodules remain clean at the target.

Do not weaken the checker, mark rows terminal without evidence, delete coverage rows by hand, or remove documentation merely to make the gate pass.

## Phase 7: Final drift check and transactional baseline update

The baseline is a completion marker, not a forecast. Do not edit it early.

1. After all content and checks pass, fetch application `origin/main` again in the reference clone.
2. If `origin/main` advanced beyond the captured target, keep the old baseline in `AGENTS.md`, fast-forward the reference clone, treat the old target-to-new-target range as an additional incremental batch, and repeat impact analysis, documentation, ledger reconciliation, and validation. Continue until the final fetched target is stable.
3. If history was rewritten or the captured target is no longer an ancestor, stop and report the divergence instead of guessing.
4. Once stable, capture the final target's full SHA and `%cI` committer datetime again and confirm the reference clone/submodule gitlinks exactly match it.
5. Update the single application SHA and datetime in this repository's `AGENTS.md` sync-baseline paragraph. Preserve the explanation of how the original baseline was established unless it becomes factually misleading; make clear that later baselines are advanced by verified incremental synchronization.
6. Update `documentation-audit/source-baseline.md` so its application target, capture/final verification time, reference-clone path, cleanliness, and every application gitlink reflect the same final target. Record the documentation starting HEAD accurately; do not invent a documentation commit that has not been made.
7. Finish `documentation-audit/status.md` with `COMPLETE`, zero remaining items, the same application target, accurate generated counts, the final checker result, environmental test limitations, and no blockers only when that is true.
8. Re-run `git diff --check` and the final `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check` after these metadata edits.

If the post-baseline check fails, restore only the baseline/status completion metadata to its prior not-complete values while preserving the documentation work, and report the failure. Never leave `AGENTS.md` advanced past content that has not passed the final gate.

## Completion report

Return a concise but evidence-rich report containing:

- old baseline and final target SHA/datetime;
- number of commits reviewed and the affected functional/operational domains;
- English/French pages added, rewritten, or removed;
- generator, navigation, coverage-ledger, findings, and screenshot changes;
- important final business rules or limitations documented;
- exact validation/test commands and outcomes, including skips or environment blockers;
- confirmation that every ledger is terminal, the drift check is stable, the reference clone is clean, and `AGENTS.md` was advanced only after success;
- any remaining work. If remaining work exists, state that synchronization is incomplete and confirm that the baseline was not advanced.

Do not commit or push unless separately instructed.
