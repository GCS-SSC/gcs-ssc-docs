# Shared concepts editorial review

Reviewed every assigned page in full, in both languages, after synchronization. Applied the unslop, bro and technical-writing guidance. All twelve pages were edited.

| Page | Disposition | Change |
| --- | --- | --- |
| `en/concepts/rbac.md` | edited | Explained role scope, assignment requirements, primary users and access recovery in direct language. |
| `fr/concepts/rbac.md` | edited | Matched English access explanations and replaced dense assignment terminology. |
| `en/concepts/extensions.md` | edited | Clarified installation and enablement steps, save failures, storage selection and configuration access. Retained technical contracts and error identifiers. |
| `fr/concepts/extensions.md` | edited | Matched English guidance and replaced compressed technical prose with complete instructions. |
| `en/concepts/attachments.md` | edited | Separated storage prerequisites from access checks, clarified bilingual example fields, partial saves and duplicate-Intake recovery. |
| `fr/concepts/attachments.md` | edited | Matched English guidance and corrected the partial-save sentence. Used the same example filename in both languages. |
| `en/concepts/data-collections.md` | edited | Clarified authoring permissions, Save versus Submit and loading/conflict recovery. |
| `fr/concepts/data-collections.md` | edited | Matched English instructions and split dense save and error explanations. |
| `en/concepts/bilingualism.md` | edited | Clarified language switching, error reporting and saving translation drafts. |
| `fr/concepts/bilingualism.md` | edited | Matched English instructions, restored heading accents and expanded compressed financial-display wording. |
| `en/concepts/soft-deletion.md` | edited | Removed repeated uniqueness examples and explained deletion consequences directly. |
| `fr/concepts/soft-deletion.md` | edited | Matched English wording and restored missing accents and apostrophes. |

No unresolved questions or cross-batch edit requests. No links or API identifiers were changed. Existing French heading anchors are retained with explicit IDs where spelling was corrected. English heading case changes preserve their generated anchors.

The attachment recovery table now says a file may be no larger than 10 MiB, matching the upload instructions and the source's strict greater-than rejection. Inspected `.reference-repos/gcs-ssc/shared/utils/attachment-limits.ts` and `.reference-repos/gcs-ssc/server/utils/attachment-upload.ts`. The multipart limit remains 10 MiB plus 512 KiB. No application runtime tests were run.

Commands run included full-page `cat` reads, `rg` searches for incoming heading links and upload limits, source inspection with `sed`, scoped `git diff` review and scoped `git diff --check`. The whitespace check passed. Generators, global checks, CodeRabbit and release actions remain with the coordinator.

A follow-up source check corrected the RBAC Home description. `app/components/home/HomeWorkDashboard.vue` separates primary and shared casework, Proponents and Agreements, with five records per section page. Available group work uses ten items per page. The former search and type-filter description did not match this dashboard and was removed in both languages. Inspected the dashboard, `HomeAssignedWorkList.vue`, `HomeGroupWorkList.vue` and English/French locale labels. Retained both Assigned work heading anchors. The scoped whitespace check passed again.

The same follow-up clarified that an exact approval assignment can expose the specific approval evidence without general read access to its owner. Ordinary work assignments and Funding Case Intake reviews retain owner-read requirements. Checked `server/api/recommendations/[recommendationId].get.ts` and `server/utils/review-runtime-access.ts`. Both introductions now state this distinction and link to the approval guide.
