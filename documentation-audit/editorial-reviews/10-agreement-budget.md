# Agreement budget review

Reviewed every assigned page in full after synchronization. Applied the unslop, bro and technical-writing skills to both languages.

| Page | Disposition |
| --- | --- |
| `en/agreements/budget.md` | edited |
| `fr/agreements/budget.md` | edited |
| `en/agreements/commitments.md` | edited |
| `fr/agreements/commitments.md` | edited |
| `en/agreements/financial-summary.md` | edited |
| `fr/agreements/financial-summary.md` | edited |

The budget guide now states assignment requirements directly, removes repeated amount and currency instructions, and explains calculation groups without compressed identifiers. It retains the percentage calculations, capacity example, historical restrictions, linked-record safeguards and recovery steps.

The commitment guide now gives creation steps in their actual order, explains the difference between completion and activation, and describes replacement coverage using money already paid. It retains exact assignment requirements, coding rules, paid floors, activation limits and worked amounts.

The financial summary guide separates grid controls from measure selection and presents recovery actions as a short list. It retains the measures, month allocation, progress calculations, accounting effects and examples. Both languages preserve the same link destinations and heading levels. No section headings were renamed, apart from replacing typographic apostrophes with straight apostrophes in the French commitment page.

Source inspected in `.reference-repos/gcs-ssc`:

- `server/utils/agreement-commitment-completion.ts` confirms completion checks an active user record, balanced coding, exact assignment and prior paid coverage.
- `server/utils/workflow-runtime.ts`, completion transition, confirms completion resolves the configured approval-submission workflow rather than asking the completing user to select one. Without a workflow it applies completion effects immediately.
- `app/components/Agreement/AgreementFinancialSummaryTab.vue` confirms the initial All filter and collapsed quarters, plus quarter toggling and measure selection.

Verification performed:

- Scoped `git diff --check` for all six assigned paths passed.
- A Python check confirmed identical paired link destinations and heading levels for all three page pairs.
- Read the resulting English diff and checked the paired financial examples and recovery wording. Source tests were not run.

No unresolved questions, blockers, cross-batch changes or generator requests. Full repository checks and release belong to the coordinator.
