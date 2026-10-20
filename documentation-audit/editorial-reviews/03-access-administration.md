# Access administration editorial review

Reviewed every assigned page in full. Applied the technical-writing, unslop, and bro instructions to keep the administrator's action and its conditions together.

| Page | Disposition | Result |
| --- | --- | --- |
| `en/admin/assignments.md` | edited | Separated page access from roster actions, listed financial permission subjects, and explained saved-roster rules without transaction jargon. |
| `fr/admin/assignments.md` | edited | Matched the English access, scope, eligibility, and replacement instructions in plain French. |
| `en/admin/groups.md` | edited | Explained group eligibility, claiming, preserved assignments, and deletion restrictions in terms of the user's task. |
| `fr/admin/groups.md` | edited | Matched the English claim and group-management instructions and retained the recovery steps. |
| `en/admin/roles.md` | edited | Defined subject and scope directly, clarified permission levels and saving, and linked the audit explanation. |
| `fr/admin/roles.md` | edited | Matched the English scope, permission, and save instructions without internal database terminology. |
| `en/admin/users.md` | edited | Clarified which permission allows viewing, updating, and deletion, distinguished job roles from work assignments, and made the audit event list readable. |
| `fr/admin/users.md` | edited | Matched the English user-management instructions and corrected troubleshooting wording to check the required scope. |
| `en/admin/audit.md` | edited | Explained evidence, delayed results, expiry, and recovery with direct verbs while preserving limits and access boundaries. |
| `fr/admin/audit.md` | edited | Matched the English evidence and recovery explanations and retained all numeric limits. |

No application behavior was intentionally changed. Retained the synchronized source-backed permission identifiers, eligible scopes, assignment rules, examples, activation restrictions, audit attribution, query limitations, retention periods, queue limits, configuration key, and failure recovery. This editorial batch did not require further source inspection or execute application tests.

No heading was renamed by this batch. Existing links and screenshot destinations remain. No cross-batch changes or unresolved questions are requested.

Verification performed:

- Scoped `git diff --check` for all ten assigned pages passed.
- A local Python comparison passed for each English/French pair's heading structure, link destinations after screenshot-locale normalization, code-fence count, and table-row count.
- Read the changed prose and compared paired examples and recovery instructions. Final repository checks remain the coordinator's responsibility.
