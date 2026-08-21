# Repository guidance

This is the bilingual VitePress documentation for GCS-SSC. Keep equivalent English and French pages aligned. Use Bun 1.3.13. Against the ignored clone described below, run `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory`, `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references`, and `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check` after application-driven updates.

## Application sync baseline

The documentation is synchronized through GCS-SSC `main` commit `bfbbf18dd3218e7669d45c42cc4f26431a1325aa` (committed `2026-08-20T15:52:41-04:00`). The original baseline was determined from the latest application `main` commit preceding documentation commit `1284a85816e327518905cf5a7536c689781311cc` (`2026-08-17T00:24:35-04:00`); subsequent baselines are advanced through verified incremental synchronization.

For every subsequent sync, review application changes incrementally from the recorded commit through the target `main` commit. After the documentation and generated inventories are synchronized and checks pass, replace the application commit hash and datetime above with that target commit's full hash and committer datetime.

Never modify or switch branches in the sibling `../gcs-ssc` working repository; it may contain active work. Do not fetch, pull, checkout, switch, reset, clean, or commit there. If a working copy of the application is needed, clone its `main` branch into `.reference-repos/` in this repository, which is git-ignored, and operate only on that clone.
