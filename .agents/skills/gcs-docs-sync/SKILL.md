---
name: gcs-docs-sync
description: Synchronize this repository's English and French GCS-SSC documentation incrementally from its recorded application commit to application main, verify the completed update, and advance the baseline marker. Use for application-driven documentation updates, not isolated copy edits.
---

# Incremental GCS-SSC documentation sync

Run from the documentation repository. Read its `AGENTS.md`, `package.json`, `documentation-audit/status.md`, and `documentation-audit/source-baseline.md` first. The Source and baseline record below is the authoritative last verified baseline. Resolve a fresh target from the application branch on every run; do not assume that the recorded baseline is still its latest commit.

## Source and baseline record

- Application repository: `https://github.com/GCS-SSC/gcs-ssc.git`
- Branch: `main`
- Ignored reference clone: `.reference-repos/gcs-ssc`
- Baseline commit: `395a5c7e62f982ce71b4390fe33fa1dd04480d6b`
- Baseline committer datetime: `2026-09-15T20:19:52-04:00`
- Authoritative marker: this skill’s Source and baseline record.
- Verification receipt: `documentation-audit/source-baseline.md`.

Update this record only after successful synchronization. `AGENTS.md` links to this skill and does not duplicate the marker. The source-baseline receipt records the evidence for a completed run; if it conflicts with this record, investigate the discrepancy before selecting the range. The GitHub repository above is the source for normal future incremental updates.

The original baseline was determined from the latest application `main` commit preceding documentation commit `1284a85816e327518905cf5a7536c689781311cc` (`2026-08-17T00:24:35-04:00`); subsequent baselines advance through verified incremental synchronization.

The deliverable is detailed, useful bilingual documentation of the **final application behavior**, followed by verified inventories and an updated marker. Users and administrators are primary readers of their guides. Developer references complement those guides; generated route lists alone do not document a feature.

## Capture an isolated source target

- Preserve unrelated documentation work. Record the starting docs HEAD and dirty state.
- Never operate on the sibling `../gcs-ssc` repository, including fetching or changing its branches. Work only in the git-ignored `.reference-repos/gcs-ssc` clone of `https://github.com/GCS-SSC/gcs-ssc.git`.
- Create that clone from `main` if absent. For an existing clone, inspect its origin and worktree before fetching; preserve unexpected local work. Do not reset or clean an existing dirty clone. Use another ignored clone when necessary and consistently substitute its path in commands.
- Fetch application `main`, pin a target full SHA and committer datetime, and work from that exact revision. Record `git show -s --format='%H %cI'` and initialized gitlinks. Initialize only the source workspaces needed to understand the change, following the application's own instructions for private tooling or generated bridges.
- Confirm that the recorded baseline exists and is an ancestor of the target. If not, investigate the source provenance; do not invent a merge base, rewrite history, or silently treat the whole application as new. A missing inaccessible baseline is a real blocker to an incremental claim.

## Review the range, then author final behavior

Read the existing relevant English **and** French pages before editing. Enumerate commits from baseline exclusive to target inclusive, examine the net diff and changed files, and keep a review disposition for each change group in the audit records. Trace significant features and fixes through final UI, routes, schemas, domain helpers, migrations, permissions, and relevant regression evidence.

A commit message or historical finding is a lead, not the final contract. Follow later changes, reversions, and fixes before writing. Replace contradictory paragraphs and remove resolved warnings rather than appending another explanation underneath them. Private review checkpoints, tests-only commits, and concrete extension changes may have no host documentation impact; record that reason rather than inventing user-facing features. Concrete extensions own their implementation documentation; this repository covers the host and public SDK boundary.

For each affected audience, document the relevant parts of:

- Where to go, prerequisites, setup order, and permissions or exact assignments.
- Fields, defaults, validation, saved versus draft behavior, and historical references.
- A realistic worked example for a substantial feature or calculation.
- What happens on completion, approval, cancellation, retry, or retirement.
- Failure symptoms, partial saves, and an actionable recovery path.

Use interface labels and plain language in user guides. Keep internal function names, schemas, and integration details in developer/operator sections unless they help a user resolve an actual problem. Do not mistake a visible button or picker option for server authorization or business eligibility.

Keep equivalent locale pages aligned in meaning, examples, links, headings, tables, and code blocks. Translate prose and interface descriptions, while preserving exact API identifiers, amounts, limits, and error codes. Update sidebars and cross-links for new pages; follow existing navigation structure. Treat screenshots as illustrative evidence only when they still match the documented behavior.

Complete the planned content changes before running the final verification batch. If the user asks to defer tests, finish authoring and accurately leave verification and marker advancement pending. Do not run CodeRabbit unless the user explicitly requests it.

## Reconcile evidence and verify

Use Bun 1.3.13. From the docs root, against the pinned ignored clone:

```sh
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:audit-impact
```

Read the generated changes. Inventory merging retains existing destinations, notes, evidence, and statuses: regeneration does **not** certify old rows. Reopen affected entries, replace obsolete source paths and prior-run test claims, and map new components/routes/data mechanisms to the right bilingual guides. Include raw-SQL schema declarations, shared infrastructure, and new configuration surfaces. An absent historical audit dossier directory does not imply the runtime Audit feature is absent.

Resolve findings and ledger statuses from actual source-to-documentation evidence. `DOCUMENTED_VERIFIED` describes documentation coverage, not a claim that application regression tests ran. Distinguish tests inspected from tests executed, record exact commands/results, and do not mass-label rows verified just to satisfy the checker. Explain supported omissions with `NOT_APPLICABLE_VERIFIED`.

Run the final checks after content and evidence reconciliation:

```sh
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check
git diff --check
VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build
```

`docs:check` also builds the site and checks locale structure, destinations, links, anchors, discovered source coverage, and terminal ledger status. Its status-file requirement includes the literal phrase `zero remaining items`; record that only after coverage work is complete, and clearly distinguish a pending command from its later successful result. Do not weaken verification to hide missing coverage. Fix failures and rerun the affected checks. App runtime tests are not automatically required for a documentation-only update; use them when a material source-contract uncertainty needs executable verification and the environment permits it.

Inspect paired user-facing examples and recovery instructions in addition to mechanical parity. Record any build warnings accurately. If documentation-tooling scripts changed, review their behavior and verify meaningful cases such as deterministic generation, removed source entries, and preserved curated evidence.

## Advance the marker only after success

Fetch `main` once more in the isolated clone and compare it with the pinned target. If new commits appeared, reconcile them incrementally and reverify affected work, or explicitly retain and report the already verified target when the user requested that fixed revision. Never advance the marker to unseen changes.

After the documentation, generated records, and required checks pass:

1. Replace the baseline SHA and committer datetime in this skill's Source and baseline record with the verified target's full values. Keep the marker here only; do not add it back to `AGENTS.md`.
2. Update `documentation-audit/source-baseline.md` with source repository, target, previous baseline, source/gitlink state, and the actual verification results. Keep `documentation-audit/status.md` and findings consistent with completion.
3. Rerun any affected final checks after these metadata edits. Ensure generators produce no unexpected further changes and no audit record claims a test that was not run.
4. Report completion, the full application SHA, checks passed, and material limitations. Mention whether edits are uncommitted. Do not commit, push, deploy, or publish without authorization.

If a required step cannot be completed, leave the marker at its last verified baseline and state the specific outstanding work. Written content alone is not a completed synchronization.
