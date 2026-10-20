# Getting started and entry-page review

Reviewed all 14 assigned pages after the coordinator confirmed synchronization. Applied `unslop`, `bro` and `technical-writing` to both languages together.

| Page | Disposition | Result |
| --- | --- | --- |
| `en/index.md` | edited | Shortened introductory text, clarified setup actions and terms URLs, and replaced implementation language in the documentation map. |
| `fr/index.md` | edited | Matched the English changes and clarified the actions in natural French. |
| `en/getting-started/login.md` | edited | Put the supplied account and sign-in steps first. Kept sample credentials separate, preserved recovery and access rules, and removed the authentication-library name from user instructions. |
| `fr/getting-started/login.md` | edited | Matched account, session, GitHub and access explanations. |
| `en/getting-started/navigation.md` | edited | Replaced authorization subject identifiers with readable permission names in the destination table. Explained search, language switching, forms, saved choices, direct links and permission changes as observable behaviour and user actions. |
| `fr/getting-started/navigation.md` | edited | Matched the English changes, including search limits, save failures, guided help and recovery instructions. |
| `en/getting-started/empty-system-setup.md` | edited | Removed repeated root-access warnings, put GWCOA before Agency creation, clarified publication and completion prerequisites, corrected the Guided Help scope omission, and turned compressed intake/finance text into instructions. |
| `fr/getting-started/empty-system-setup.md` | edited | Matched the setup corrections, improved French headings and expanded compressed instructions. |
| `README.md` | edited | Used sentence case and clarified the bilingual check description. Commands and release behaviour remain intact. |
| `agreements/commitments.md` | reviewed unchanged | Redirect and English fallback link point to the current guide. |
| `agreements/payments.md` | reviewed unchanged | Redirect and English fallback link point to the current guide. |
| `concepts/extensions.md` | reviewed unchanged | Redirect and English fallback link point to the current guide. |
| `developer/extensions-authoring.md` | reviewed unchanged | Redirect and English fallback link point to the current guide. |
| `index.md` | edited | Used sentence case. Preserved the automatic English redirect and both language links. |

Preserved examples, exact amounts and search/export limits, role-versus-record assignment distinctions, API identifiers needed for setup, screenshots, and failure recovery. The guide and flow-diagram additions from synchronization remain covered in both languages.

Checked the Agency-scope omission against `.reference-repos/gcs-ssc/packages/gcs-ssc-authorization/src/role-scopes.ts`, which permits `guided_help` globally and for an Agency. The same source confirms the six assignment-management subjects. Read the re-export in `shared/utils/role-scope.ts`. Checked workflow terminology against `i18n/locales/en.json` and `app/components/Agency/AgencyWorkflowSetupDetailPage.vue`; kept ordered workflow members rather than inventing a different form label.

Renamed the setup-order headings and corrected French headings while retaining their old anchors through explicit IDs: `root-first-order`, `systeme-vide`, `ordre-racine`, `configuration-minimale-d-agence`, `preparation-minimale-aux-ententes` and `verification`. No cross-batch changes are needed.

Verification performed:

- Read every assigned file and inspected the edited diffs.
- `git diff --check -- en/index.md fr/index.md en/getting-started fr/getting-started README.md index.md agreements/commitments.md agreements/payments.md concepts/extensions.md developer/extensions-authoring.md` passed.
- Ran a local Python comparison of heading, table-row, numbered-step and Markdown-link counts for the four locale pairs. All matched.

No application tests, generators, CodeRabbit, whole-site checks, commits or publication were run by this batch. Final site verification belongs to the coordinator. No unresolved questions remain.
