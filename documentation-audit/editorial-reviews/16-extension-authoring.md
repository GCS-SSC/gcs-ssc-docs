# Extension authoring editorial review

Read both assigned pages in full after synchronization. Applied the unslop, bro, and technical-writing guidance while retaining the developer contracts.

| Page | Disposition |
| --- | --- |
| `en/developer/extensions-authoring.md` | edited |
| `fr/developer/extensions-authoring.md` | edited |

The introduction now states what an extension is and directs configuration readers to the application guide. Replaced the dense lifecycle declaration sentence with matching field lists. Separated lifecycle record permissions, assignment models, and Manager roster administration into readable paragraphs. Changed English headings to sentence case without changing their anchor text after normalization.

Clarified that `configuration-access` sets a minimum role. The former wording called it a ceiling. Corrected the French unavailable-state sentence, which said an accessible workspace could itself display **Non disponible**. It now states that a missing required workspace, forms tab, or component produces that message.

Removed unnecessary definitions for this developer audience. Rewrote compressed French descriptions of storage ownership, metadata declarations, financial reads, detail-page navigation, and scheduled import checks as complete sentences. Simplified diagram export and Forecast retry explanations in both languages. Aligned the French label in the English create-action example with the French page.

Preserved API names, declarations, lock order, permissions, identifiers, limits, financial examples, recovery instructions, links, and the synchronization additions already present when this batch started. No cross-batch requests or unresolved questions.

Source inspected, not executed:

- `.reference-repos/gcs-ssc/packages/gcs-ssc-extensions/src/index.ts`, the configuration access type and declaration.
- `.reference-repos/gcs-ssc/app/components/Extensions/AgencyFormPage.vue`, workspace, enabled forms tab, component availability, and Retry behavior.
- `.reference-repos/gcs-ssc/tooling/gcs-ssc/tests/unit/extension-configuration-access.test.ts`, minimum-role and scope cases. These tests were read, not run.

Verification performed:

- `git diff --check -- en/developer/extensions-authoring.md fr/developer/extensions-authoring.md` passed.
- A local Python structure check found 30 balanced code fences, 27 top-level or second-level headings, and 6 Markdown links in each page.
- Read the assigned-page diff and checked corresponding examples and recovery prose in both languages. Full repository checks remain with the coordinator.
