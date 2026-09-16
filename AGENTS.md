# Repository guidance

This is the bilingual VitePress documentation for GCS-SSC. Keep equivalent English and French pages aligned. Use Bun 1.3.13. Against the ignored clone described below, run `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory`, `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references`, and `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check` after application-driven updates.

Run CodeRabbit only when the user explicitly requests it. Routine documentation updates and verification do not require CodeRabbit.

For incremental application synchronization, use the repository skill `$gcs-docs-sync` at `.agents/skills/gcs-docs-sync/SKILL.md`. That skill owns the authoritative application commit marker.

## Application source workspace

Never modify or switch branches in the sibling `../gcs-ssc` working repository; it may contain active work. Do not fetch, pull, checkout, switch, reset, clean, or commit there. If a working copy of the application is needed, clone its `main` branch into `.reference-repos/` in this repository, which is git-ignored, and operate only on that clone.
