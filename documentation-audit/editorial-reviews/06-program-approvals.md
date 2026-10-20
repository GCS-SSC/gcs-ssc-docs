# Approval templates and recommendations review

Reviewed every assigned page in full, in both languages, after synchronization. Applied the unslop, bro, and technical-writing guidance.

| Page | Disposition |
| --- | --- |
| `en/programs/approval-templates.md` | edited |
| `fr/programs/approval-templates.md` | edited |
| `en/programs/recommendations.md` | edited |
| `fr/programs/recommendations.md` | edited |

Approval-template edits explain certifications, saved publication copies, live-route changes, and denial recovery in plain language. Permission descriptions now name what each role lets the reader do. Both step-field lists include the supported user or group choice. The French guide consistently calls checklist statements certifications and routing slips feuilles d'acheminement.

Recommendation edits turn schema creation and publication into direct instructions. They explain fixed form versions, exact assignment and Contributor requirements, and response conflicts without internal transaction language. Failure lists now tell the reader what to check. Examples, limits, result identifiers, error codes, and recovery conditions remain aligned between languages.

Source inspection found that the set creates its recommendations together, then activates them one at a time. Corrected both guides from saying later recommendations are created one at a time to saying they become active one at a time.

Inspected these pinned-source files, without modifying them:

- `server/utils/recommendation-runtime.ts`, including creation, activation, published member rules, and response revision handling.
- `server/utils/workflow-runtime.ts`, including saved member owner assignments passed to runtime creation.
- `server/utils/authorize.ts`, including fresh exact assignment and owner access checks.
- `server/api/recommendations/[recommendationId].put.ts`, including authorized save and submission.

Checks performed:

- Scoped `git diff --check` passed for all four pages.
- A Python comparison against HEAD confirmed that heading lists differ only in capitalization or apostrophe typography and link destinations are unchanged. The first two comparison attempts were too strict about existing capitalization changes and apostrophe typography; the corrected comparison passed for every page.
- Checked the four pages for em dashes and curly English quotes or apostrophes. None remain.
- Read English and French examples and recovery sections together. They preserve matching conditions and outcomes.

No application tests, generators, global checks, CodeRabbit, or release commands were run. No cross-batch requests or unresolved questions remain.

## Cross-batch terminology correction

The pinned French UI calls a routing slip `Feuille d'acheminement` in `i18n/locales/fr.json` at `assessment.approvals.routing_slip`. The approval section uses that key for its grouping column in `app/components/Common/Approvals/Section.vue`. Its plural table labels also use `Feuilles d'acheminement`.

After the coordinator extended ownership to batches 05 and 06, replaced both `bordereau` and `feuille de route` with this UI term in `fr/programs/assessment-schemas.md` and `fr/programs/approval-templates.md`. These names refer to the same approval record. All other batch 05 and 06 pages have no conflicting term and remain unchanged in this follow-up. The approval-template section heading now uses the UI term and retains its original anchor explicitly as `feuilles-de-route-en-execution`.

Reported matching terms outside these batches to the coordinator for correction in the three concept and agreement guides. A scoped whitespace check passed. Compared link destinations before and after this follow-up; none changed. No global checks or generators ran.
