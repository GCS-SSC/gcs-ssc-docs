# Workflows, approvals and running reviews

Reviewed all six assigned pages in full after synchronization. Applied the unslop, bro and technical-writing guidance to paired English and French passages.

| Page | Disposition | Changes |
| --- | --- | --- |
| `en/concepts/workflows.md` | edited | Clarified setup permissions, status changes, successful completion, group ownership, approval packets and recovery actions. Preserved examples, risk designation rules and financial warnings. |
| `fr/concepts/workflows.md` | edited | Matched the English changes, replaced unnatural translations about group claims and pinned plans, and repaired the approval-completion list so its items form grammatical instructions. |
| `en/concepts/approvals-completions.md` | edited | Explained completion checks, approval routes, risk evidence, group claims and insertion limits in everyday language. Kept approval and completion distinct. |
| `fr/concepts/approvals-completions.md` | edited | Matched the English changes and replaced dense implementation phrasing with concrete actions and consequences. |
| `en/concepts/runtime-reviews.md` | edited | Clarified access, saved scoring rules, saving versus completion, group claims and retry behavior. Preserved historical-definition errors and recovery instructions. |
| `fr/concepts/runtime-reviews.md` | edited | Matched the English changes and replaced engine vocabulary with direct explanations of review work. |

Section headings, anchors, links, examples, state identifiers and permission boundaries remain intact. Two English page titles now use sentence case without changing their generated anchors. Following batch 06's source terminology check, both French review and approval guides now use `feuille d'acheminement`, matching the `assessment.approvals.routing_slip` interface label. No cross-batch edits or generator requests were needed.

## Source inspection

Inspected the pinned clone's `server/utils/workflow-routing-capture.ts` and relevant search results in `workflow-runtime.ts`, `workflow-conditions.ts`, `workflow-routing.ts` and `workflow-setup-versioning.ts`. Routing capture retains published conditions and saved values. Missing or inactive custom-field assignments can evaluate false rather than invalidate the packet. Accordingly, the existing statement about unavailable fields blocking deployment remains about deployment of a new configuration, not a claim that every existing run fails to start.

No application tests were executed. This was an editorial review; it preserves the synchronized behavior and its limitations.

## Verification

- Read the complete assigned English and French pages and reviewed the edited approval-guide diff.
- Ran `git diff --check --` with all six assigned page paths. Passed.
- Ran a focused Python comparison of paired section counts and link destinations. Counts match for every pair: workflows has 11 sections and 11 links, approvals/completions has 7 sections and 11 links, and runtime reviews has 9 sections and 6 links. All non-anchor link destinations match across each language pair. The workflow's localized internal anchor remains in each language.
- Searched the six pages for em dashes, en dashes and curly double quotes. None remain.

Final site, inventory and repository-wide checks belong to the coordinator. No commits, publishing, generators or CodeRabbit runs were performed by this batch.
