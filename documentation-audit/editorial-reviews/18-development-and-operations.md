# Development and operations editorial review

Read all 12 assigned pages in full, including both languages before editing. Applied the unslop, bro, and technical-writing guidance. Synchronization changes already present were preserved.

## Page dispositions

| Page | Disposition | Change |
| --- | --- | --- |
| `en/developer/startup.md` | edited | Shortened the introduction and explained package scripts and extension metadata directly. |
| `fr/developer/startup.md` | edited | Matched the English introduction and metadata explanation; removed an unsupported exclusivity implication from the seed-account wording. |
| `en/developer/routes.md` | edited | Replaced compressed route terminology with full sentences and listed extension handler context. |
| `fr/developer/routes.md` | edited | Matched the route explanation and replaced fragmentary financial-domain prose with full sentences. |
| `en/developer/testing.md` | edited | Shortened the introduction and made the required local checks and optional suites easier to distinguish. |
| `fr/developer/testing.md` | edited | Matched the introduction and check list; preserved test-selection requirements. |
| `en/operator/background-work.md` | edited | Shortened the introduction and lease explanation; clarified that the SQL export contains no live business records. |
| `fr/operator/background-work.md` | edited | Matched the cleanup and export explanations; repaired the attachment-deletion sentence and incomplete L1 field list. |
| `en/operator/configuration.md` | edited | Split authentication and setup paragraphs; clarified which workflow publishes the WebContainer demo. |
| `fr/operator/configuration.md` | edited | Matched the authentication, setup, packaging, and workflow explanations. |
| `en/operator/deployment.md` | edited | Shortened the introduction and SQL-export explanation; turned the database-cutover sequence into numbered steps. |
| `fr/operator/deployment.md` | edited | Matched the introduction, SQL-export limits, and numbered cutover steps. |

## Contract and link review

Preserved commands, identifiers, limits, destructive-reset warnings, examples, recovery instructions, and existing headings. Added locale-specific links from background work to the existing backup-and-restore section. No heading anchors changed. No cross-batch changes or generator requests.

Confirmed the migration-only SQL export against these pinned application files, without running application tests:

- `server/api/admin/dump.get.ts`
- `server/workers/admin-sql-dump.ts`
- `server/utils/admin-sql-generator.ts`

Read `server/plugins/storage-cleanup.ts` to confirm the existing five-second single-operation schedule and hourly retention schedule.

## Checks performed

- Read assigned pages, repository guidance, editorial brief, and the actual skills with `cat`.
- Inspected the assigned-file diff and targeted wording with `git diff` and `rg`.
- Ran a Python structural check. All six locale pairs have matching heading and code-fence counts, the new link target headings exist, and assigned pages contain no em dashes.
- Ran `git diff --check` restricted to the 12 assigned pages. Passed.

Global documentation checks, source generators, commits, and release are owned by the coordinator. No unresolved questions or blockers.
