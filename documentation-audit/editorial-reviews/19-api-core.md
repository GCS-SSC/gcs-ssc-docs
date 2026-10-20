# Core API editorial review

Reviewed all assigned pages in English and French, including all handler rows. Compared the complete bilingual tables to confirm that routes, methods, authorization names, validation names and source paths match. All changes originate in `scripts/generate-api-reference.ts`.

| Page | Disposition | Result |
| --- | --- | --- |
| `en/developer/api/agencies.md` | edited | Shorter introduction and table explanation, concrete column names, clearer example wording. |
| `fr/developer/api/agencies.md` | edited | Equivalent French introduction, table explanation and column names. |
| `en/developer/api/agreements.md` | edited | Shorter introduction and table explanation, concrete column names, clearer example wording. |
| `fr/developer/api/agreements.md` | edited | Equivalent French introduction, table explanation and column names. |
| `en/developer/api/platform.md` | edited | Shared prose improvements. Removed the irrelevant numeric-ID instruction from the health example. |
| `fr/developer/api/platform.md` | edited | Equivalent French changes, including the health example. |

The introduction now explains what the index does without repeating an elementary API definition. The column explanation uses complete sentences and replaces "landmarks" with "names". It retains the warning that source-name matches cannot establish authorization or validation behavior. The ID reminder now appears only when the example route contains a record parameter. This also removes the irrelevant reminder from both identity pages.

Batch 20 reviewed the specialized API pages and requested the same shared improvements. Regeneration updates all 20 API pages. Every handler row and existing heading remains unchanged. No links or anchors changed.

Read the pinned source handlers `server/api/agency/[agencyId].get.ts`, `server/api/agreements/[id].get.ts` and `server/api/health.get.ts` to confirm the examples. Agency reads require authentication and agency read access. Agreement reads use fresh authorization and include status and program information. The public health handler checks migration readiness and database connectivity and returns `{ "status": "ok" }` on success. These are source inspections, not executed application tests.

Commands and checks actually run:

- `bun --version` returned `1.3.13`.
- `GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references` passed twice. Each run generated 703 route rows in 10 bilingual API groups.
- A Python comparison against pre-edit snapshots confirmed that every handler row and heading remains unchanged in all 20 pages, that each English table matches its French table, and that the ID reminder appears only in parameterized examples.
- SHA-256 comparisons confirmed that the second generation produced byte-identical content for all 20 API pages.
- `git diff --check -- scripts/generate-api-reference.ts en/developer/api fr/developer/api` passed.

No unresolved questions or cross-batch requests remain. Full repository checks and publication belong to the coordinator. No CodeRabbit run, application runtime tests, commit or push was performed by this batch.
