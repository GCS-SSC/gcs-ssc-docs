# Agreement records editorial review

Reviewed every assigned page in full in both languages. Applied unslop, plain-language instructions from bro, and technical-writing guidance. All ten pages were edited. No headings, anchors, URLs, examples, numeric limits, error codes, or recovery rules were removed.

| Page | Disposition |
| --- | --- |
| `en/agreements/index.md` | edited |
| `fr/agreements/index.md` | edited |
| `en/agreements/team.md` | edited |
| `fr/agreements/team.md` | edited |
| `en/agreements/addresses.md` | edited |
| `fr/agreements/addresses.md` | edited |
| `en/agreements/applicant-recipients.md` | edited |
| `fr/agreements/applicant-recipients.md` | edited |
| `en/agreements/activities.md` | edited |
| `fr/agreements/activities.md` | edited |

Replaced internal action names in the proponent access table with the roles and assignments a reader needs. Explained saved language fields, agreement-number confirmation, numbering extensions, deletion history, and independent assignments in direct language. Replaced terms such as ordinary children, roster mutations, projections, and promotion with the records or actions they describe. Preserved the permission distinctions, required fields, worked examples, historical references, transaction behavior, and recovery instructions.

Corrected the French Activities instructions to direct readers to **Promoteurs**, matching the actual agreement tab, and aligned surrounding terminology. Confirmed the table's financial-ID editing description against the source. The existing statement that editing changes the profile or recipient subtype omitted the financial ID, which is also editable.

Source inspected in the pinned `.reference-repos/gcs-ssc` clone:

- `app/pages/agreements/[id].vue` and `i18n/locales/fr.json` confirm the proponent tab uses `agreement.applicant_recipients.title`, translated as `Promoteurs`.
- `app/components/Agreement/AgreementApplicantRecipientsTab.vue` confirms the financial-ID field is part of the edit form.
- `server/api/agreements/[id]/applicant-recipients/[childId].patch.ts` confirms financial-ID validation and updates, preservation of an unchanged saved ID, and status 409 when replacing an in-use profile.

Verification performed:

- `git diff --check --` with the ten assigned paths passed.
- A local Python comparison confirmed matching heading counts and table-row counts in all five English/French pairs.
- Read the edited proponent guides and French activities guide again to check the instructions and paired examples.

Source searches, file reads, and local editorial scripts also ran. One initial source search named an absent `apps` directory; the subsequent search used the actual `app` directory. No application tests, generators, global checks, commits, or publication commands ran in this batch. Full repository verification belongs to the coordinator.

No unresolved questions or cross-batch requests.
