# Developer guided-help page review

- `en/developer/guided-help.md`: edited.
- `fr/developer/guided-help.md`: edited.

Read both complete pages before editing and inspected both after the first edits. Applied the technical-writing, unslop and bro skills to preserve technical precision while making the prose direct.

Split dense descriptions of optional step settings, authorization transactions, session storage, branching and journey constraints. Clarified that the catalogue defines compatibility without granting access, that Agency references prevent draft deletion, and that finishing a guide never completes the business task. Replaced vague ownership wording and corrected French grammar in the regression-test paragraph. Preserved headings, links, identifiers, examples, limits, publication rules, recovery behavior and authorization requirements. The paired pages remain aligned.

No source-contract changes or new behavior claims were needed. No application-source inspection, application tests, generators, CodeRabbit or global checks were run. No cross-batch requests or unresolved questions remain.

Validation performed:

- Read `AGENTS.md`, the editorial brief, the assignment manifest and the actual technical-writing, unslop and bro skills.
- Read both complete assigned pages with `cat`, then reread the edited pages.
- Ran `git diff --check -- en/developer/guided-help.md fr/developer/guided-help.md`, which returned success. These pages are newly added and untracked, so this command does not validate their additions.
- Ran a Python check on both current files for trailing whitespace and em dashes. Both passed.

The coordinator owns the final locale, reference, build and release checks.
