# Agency setup editorial review

Reviewed every assigned English and French page after synchronization. Applied the unslop, bro, and technical-writing instructions. Changes preserve the paired examples, financial amounts, permissions, publication rules, and recovery steps.

| Page | Disposition | Changes |
| --- | --- | --- |
| `en/admin/agencies.md` | edited | Replaced database and request terminology with user actions. Clarified saved inactive selections, deletion, financial settings, and extension setup. Corrected cost-category and line-item uniqueness wording. |
| `fr/admin/agencies.md` | edited | Applied the equivalent changes. Used agence consistently in the body. |
| `en/admin/agency-catalogs.md` | edited | Separated access levels for scanning. Clarified review-member settings, Data Collection publication and retirement, and recovery instructions. Replaced implementation terms with direct instructions. |
| `fr/admin/agency-catalogs.md` | edited | Applied the equivalent changes and replaced compressed French instructions with complete sentences. |
| `en/admin/common-admin.md` | edited | Clarified row IDs versus organization numbers, navigation, the visible result of saving, and failed-load recovery. |
| `fr/admin/common-admin.md` | edited | Applied equivalent changes and used agence consistently in the workspace link. |

## Source checks

Inspected the pinned reference clone only:

- `tooling/gcs-ssc/architecture/cost-category-availability.md` confirms that category, line-item, and Stream availability are separate from deletion, and existing budget references remain saved.
- `server/database/migrations/0040_agency.ts` confirms that normalized cost-category and line-item name uniqueness applies to nondeleted records, including inactive records. Changed the table's misleading "active" wording to agree with the following explanation.
- `server/api/agency/cost-categories/[id].patch.ts` confirms the nondeleted-record and owning-Agency checks for edits.

The source was read, not modified. No application tests were run.

## Verification and coordination

- Read all six complete pages, repository instructions, the review brief and assignment manifest, and the three writing skills.
- Inspected the scoped diff and manually checked equivalent examples, permissions, and recovery guidance.
- A local Python check confirmed that all relative page links in the six assigned pages resolve and that no em dashes remain.
- `git diff --check -- en/admin/agencies.md fr/admin/agencies.md en/admin/agency-catalogs.md fr/admin/agency-catalogs.md en/admin/common-admin.md fr/admin/common-admin.md` passed.
- No headings were renamed. Existing links were preserved, with one paired link to the existing Extensions guide added for details removed from the introductory paragraph.
- No unresolved questions, cross-batch requests, or generator changes. The coordinator owns full verification and release.
