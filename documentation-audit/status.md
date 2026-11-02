# Documentation synchronization status

## Current phase

`IN_PROGRESS`. The current draft targets application `7caaabb657ae69039077674d81962e1c622f5bb0`, committed `2026-11-01T13:50:20-05:00`. The last verified baseline remains `51ba383408ba6cd5eab40d55c9504af50916e2b6`. The skill marker and source receipt have not advanced.

## Draft changes

English and French drafts cover field help, approval email, queue level switches, separate Audit and Access pages, removal of SQL dump downloads, the new money format, and Quality CI. Generated inventories and route references use the pinned target. These drafts do not yet establish full coverage of the application range.

## Verification

- Bun 1.3.13. Documentation started clean at `5a82f3222f529793121e44ec04c199eef043ef0c`.
- Baseline ancestry passed. The isolated clone is clean and detached at the target. All thirteen initialized gitlinks match. The sibling application repository was untouched.
- Inventory, API reference, and audit-impact generation passed.
- The first `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check` failed with 65 pending coverage entries. This is an intermediate result, not a successful verification.
- `git diff --check` and `VITEPRESS_BASE=/gcs-ssc-docs/ bun run docs:build` passed before this status edit. The build emitted the existing nonfatal warning for chunks larger than 500 kB.
- Application tests, CodeRabbit, and live application checks were not run.

## Outstanding work

Finish the source review for every commit and changed path, including security fixes, SDK changes, document rendering limits, catalog caching, editing behavior, financial constraints, guided-help controls, and deployment changes. Check relevant user examples and recovery instructions in both languages. Reconcile the 65 new entries and reopen affected existing entries. Then rerun generators and final checks, check source drift, and advance the marker only after success.

See [current progress](./sync-nov01-progress.json). Other completed audit reports and the source receipt describe the previous verified run.
