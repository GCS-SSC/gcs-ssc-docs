# Claims and payments editorial review

Reviewed all four assigned pages in full, with English and French changes kept together. Applied the repository brief, `unslop`, `bro` plain-language guidance, and `technical-writing`.

| Page | Disposition |
| --- | --- |
| `en/agreements/claims.md` | Edited. Clarified assigned access, submission, independent reconciliation assignments, completion conditions and recovery. |
| `fr/agreements/claims.md` | Edited. Matched the English changes and replaced database-oriented wording with user actions. |
| `en/agreements/payments.md` | Edited. Turned payment creation into numbered steps and clarified commitment selection, recovery, calculator inputs and paid coding limits. |
| `fr/agreements/payments.md` | Edited. Matched the English changes and replaced dense financial and implementation wording with direct explanations. |

Claims now explain who can complete each record, how reconciliation differs from submission, and what to check after a failed save. Payment instructions distinguish the saved request, its allocations, approval and proof of disbursement. Recovery instructions retain all error codes, financial examples and restrictions. Headings and link destinations are unchanged.

## Source checked

Read `.reference-repos/gcs-ssc/packages/gcs-ssc-extensions/README.md`, including its payment calculation input contract and coding allocator limits. Confirmed that credit inputs distinguish posted credits from credits attributed to successfully finally reconciled source periods, and that commitment replacements preserve paid amounts.

Read relevant excerpts of `.reference-repos/gcs-ssc/server/utils/agreement-commitment-line-balance.ts` and `account-receivable-recovery.ts` to confirm shared coding floors and stale offset-plan checks. Source was inspected, not executed. These checks preserved the existing documented behavior.

## Verification

- Ran `git diff --check -- en/agreements/claims.md fr/agreements/claims.md en/agreements/payments.md fr/agreements/payments.md`. Passed.
- Ran a local Python comparison of paired heading counts, relative Markdown page links and `AR_` recovery error codes. Both page pairs passed.
- Read the four complete assigned pages and reviewed the edited passages. All financial amounts and worked calculations remain intact.
- An initial `rg` source search included the nonexistent `apps` directory and returned exit 2. Repeated the search against the actual repository layout successfully.

No generators, full checks, application tests, CodeRabbit, commits or publishing were run. No cross-batch changes or unresolved questions.
