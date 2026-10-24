# Incremental application review

This run reviews application `main` from `dcbe779afa3c89adb9f0f798dd1b274e92a50939` exclusive to `51ba383408ba6cd5eab40d55c9504af50916e2b6` inclusive, committed `2026-10-23T19:14:04-04:00`. All 13 commits and 124 net paths without rename detection have dispositions in [incremental changes](./incremental-changes.json) and [source dispositions](./changed-source-dispositions.json).

The documentation started at `668abb6b48b5e06f0ce69fc315171bc91416091f` with a clean worktree. The ignored reference clone had the expected origin and no local changes before fetching. Baseline existence and ancestry passed. All twelve initialized gitlinks now match the detached target. The sibling application workspace was untouched.

## Final behavior

- Agreement guides explain per-version financial limits, linked Proponents, source editing, monthly forecast drafts, and Amendment scope requirements. The worked example separates support, stacking, and the per-Proponent cap.
- The new queue administration guide explains global system access, read-only state, leases, retries, stale snapshots, and recovery. Operator and SDK guides describe fixed levels and the replacement queue API.
- Audit guides describe independent access storage, shared filters, seven-day default searches, cursor navigation, persistence limits, and unavailable-history recovery.
- Deployment guides cover separate database storage and backups, preserved companion services, and the source-attributed October 23 release. Source-owned setup workbooks and concrete extension internals have supported omissions.

Independent financial and queue reviewers had exclusive page ownership. The coordinator reviewed access, infrastructure, generated coverage, and the combined result. Every revised passage received the requested bro plain-language pass, plus technical-writing and unslop review. Exact API identifiers, amounts, limits, and errors remain intact in both languages.

## Coverage and verification

All 2,950 entries have source-backed terminal dispositions, with zero remaining items: 443 page/component, 706 API, 1768 data, 20 domain, 12 configuration, and one extension entry. New rows were reviewed against current source; unchanged mechanisms in large baseline files keep their prior evidence. Historical audit-impact remains empty; runtime Audit remains documented.

The inventory now discovers shared root `*-schema.ts` files. An isolated fixture passed schema and SQL table/function discovery, curated-evidence preservation, deterministic regeneration, and removed-source cleanup. Existing scheduler source paths were replaced. Generators passed. The documentation checker, whitespace verification, deployment-base build, and source-drift comparison passed. The first repeat normalized the queue configuration source list; the next repeat preserved all 29 generator-owned coverage/reference artifacts byte-for-byte. Both builds emitted the existing nonfatal chunk-size warning. The marker advanced after these checks; the post-marker documentation checker, whitespace verification, and deployment-base build passed again.

Application regression files were inspected only. No application unit, runtime, PostgreSQL, browser, CodeRabbit, or live-application checks ran. Screenshots were not regenerated. See the three `sync-oct23-*.json` receipts and [coverage](./sync-coverage.json).
