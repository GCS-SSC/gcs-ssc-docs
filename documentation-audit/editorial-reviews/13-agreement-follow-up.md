# Agreement follow-up editorial review

All eight assigned pages were read in full, with each English and French pair reviewed together. Applied `unslop`, `bro`, and `technical-writing` to the user instructions. No page is blocked.

| Page | Disposition |
| --- | --- |
| `en/agreements/documents.md` | edited |
| `fr/agreements/documents.md` | edited |
| `en/agreements/monitors.md` | edited |
| `fr/agreements/monitors.md` | edited |
| `en/agreements/closeouts.md` | edited |
| `fr/agreements/closeouts.md` | edited |
| `en/agreements/child-workflows.md` | edited |
| `fr/agreements/child-workflows.md` | edited |

Document instructions now explain saved files and amendment data in ordinary language. A paired list replaces the dense snapshot-data paragraph. Generation errors retain their codes and recovery steps. French access requirements now match the English distinction between reading, generation, and deletion.

Monitoring instructions state what to choose, what completion requires, and how to resolve a missing linked receivable. The French deletion restriction now includes protected review and approval work, matching English. Closeout instructions explain terminal statuses, access scope, readiness, and the saved evidence check. Related-record instructions avoid describing an assigned user's file as a child.

All examples, financial amounts, limits, error codes, API tables, and link targets remain. No headings or anchors were changed by this editorial pass. No cross-batch edits or generator changes are requested.

## Source evidence inspected

Read the pinned ignored application clone only. Checked these existing contracts without running application tests:

- `server/utils/agreement-monitor.ts`, the latest follow-up update determines status and a required receivable must be a posted, non-deleted original receivable.
- `server/api/agreements/[id]/amendments/[amendmentId]/documents/generate.post.ts`, generation rechecks authorization and rejects changed source or template input with `DOCUMENT_RENDER_INPUT_CHANGED`.
- `server/utils/workflow-runtime.ts`, final closeout checks saved evidence and current readiness, and records `closeout_packet_changed` on failure.

## Verification

- A targeted Python check compared link targets and heading-level sequences for all four locale pairs. All matched.
- `git diff --check -- en/agreements/documents.md fr/agreements/documents.md en/agreements/monitors.md fr/agreements/monitors.md en/agreements/closeouts.md fr/agreements/closeouts.md en/agreements/child-workflows.md fr/agreements/child-workflows.md` passed.
- Reviewed the assigned files and their diff. No generators, global checks, CodeRabbit, commits, pushes, or publishing were run by this batch. Final site verification belongs to the coordinator.

## Final terminology correction

Replaced the three French references to routing slips in `fr/agreements/closeouts.md` with the interface term "feuille d'acheminement". Adjusted "active" to agree with "feuille". Headings and anchors are unchanged. The scoped whitespace check passed after this correction.

## Creation and assignment correction

The independent review found that the shared-behaviour creation rule included records that are not created directly from the agreement. Corrected both child-workflow guides to list only directly created claims, payments, forecasts, monitors, amendments, and commitments in that rule. A separate bullet now states that reconciliation creation requires assignment to the claim and assigns the creator to the reconciliation. Another bullet explains configured review and recommendation owners, including group-owned work that must be claimed before editing.

Inspected `server/api/agreements/[id]/claim-reconciles/index.post.ts`, which checks exact claim assignment and creates the reconciliation's primary assignment. Inspected `server/utils/workflow-runtime.ts`, `server/utils/review-runtime.ts`, and `server/utils/recommendation-runtime.ts`, which select configured user or group owners and omit an automatic user assignment for group-owned tasks. Also inspected claim creation in `server/api/agreements/[id]/claims/index.post.ts`.

The scoped whitespace check and paired heading/link-target checks passed after this correction. Headings and anchors remain unchanged. No application tests or global verification commands were run.
