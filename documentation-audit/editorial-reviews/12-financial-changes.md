# Financial changes editorial review

Read every assigned English and French page in full. All 10 pages were edited. The review follows the editorial brief, repository guidance, and the unslop, bro, and technical-writing skills.

| Page | Disposition |
| --- | --- |
| `en/agreements/amendments.md` | Edited. Split access rules, explain draft removal, and replace technical shorthand with user actions. |
| `fr/agreements/amendments.md` | Edited. Match the English changes and replace the internal cancellation-state explanation. |
| `en/agreements/forecasts.md` | Edited. Clarify access, version totals, and annual checks. |
| `fr/agreements/forecasts.md` | Edited. Match the English changes. |
| `en/agreements/corrections.md` | Edited. Turn creation into numbered steps and simplify cancellation instructions. |
| `fr/agreements/corrections.md` | Edited. Match the English changes. |
| `en/agreements/receivables.md` | Edited. Explain the reduction total as the original debt amount, clarify submission checks, and correct the language requirement for a recovery-method override. |
| `fr/agreements/receivables.md` | Edited. Match the English changes. |
| `en/agreements/journal-vouchers.md` | Edited. Use plain permission wording and clarify adjustment entry and recovery checks. |
| `fr/agreements/journal-vouchers.md` | Edited. Match the English changes. |

## Behavior and examples

Preserved financial amounts, worked examples, validations, assignments, approval requirements, historical records, and recovery instructions. The editorial changes retain the headings and link destinations present when this batch began. Straight apostrophes replace typographic apostrophes.

Confirmed amendment scope removal against the pinned application's `server/api/agreements/[id]/amendments/[amendmentId].patch.ts`, `app/utils/agreement-amendment-scope.ts`, and `tooling/gcs-ssc/architecture/amendment-scope-removal.md`. Removing the last type that enables an area requires confirmation and removes that area's draft copy. Current agreement data remains unchanged.

Confirmed the recovery-method override rule against `server/utils/account-receivable.ts`, lines 138 to 141. When the chosen method differs from the recorded preference, submission requires an explanation in at least one language. Replaced wording that could imply both languages were required. Read `server/utils/journal-voucher.ts` while checking allocation terminology. No application tests were executed.

## Verification

- Scoped `git diff --check` for all 10 assigned files passed.
- Read the edited page text and reviewed the paired financial examples and recovery instructions.
- Two exploratory Python comparisons with `HEAD` could not certify unchanged headings or links because application synchronization had already changed those pages before this editorial batch. For example, synchronization added the amendment document section and renamed the approval section. The editorial changes themselves add no headings or links. These comparisons were not product checks and do not indicate a new editorial failure.
- Initial source searches used a nonexistent `apps` path and an unmatched schema glob. Corrected the paths and inspected the relevant source files.
- Did not run generators, global checks, CodeRabbit, commits, or publication commands.

No cross-batch changes or unresolved behavior questions remain. The coordinator owns the final site and locale checks.
