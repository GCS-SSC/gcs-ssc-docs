# Independent editorial quality review

The final selected English and French user journeys have no unresolved findings from this review. Three cross-page inconsistencies were reported to the coordinator, corrected by the owning editors, and checked again in both languages.

This review follows the 22 page-review batches in [the assignment plan](./editorial-review-plan.json). All 22 reports exist and explicitly mention every assigned path. Each editor remains responsible for the complete-page review recorded in that batch's report. This independent pass samples linked user journeys rather than repeating the entire site review.

## Journeys checked

| Journey | Final documentation inspected | Result |
| --- | --- | --- |
| Prepare an installation and delegate work | Paired empty-system setup, Roles, Assignment Management, RBAC and Navigation guides | Root has no bypass. Scope, cumulative permission, exact assignment and assignment management remain distinct. Shared Proponent access differs from Agency-owned tasks. Account-Receivable-only assignment management retains its documented direct-link limitation. |
| Prepare funding, reconcile claims and request payment | Paired Budget, Commitments, Claims, Payments and Financial summary guides | Examples and monetary conditions agree across locales. Claim annual capacity, per-commitment ceilings and combined payment holds describe different checks. Gross payment, offset and net payable remain distinct. Saved evidence is not presented as today's balance. Uncertain-save recovery requires checking the saved record before repeating a request. |
| Complete or recover assigned work | Paired Workflows, Approvals and completions, Agreement child workflows and Closeout completion/readiness passages | Optional and mandatory approval workflows remain distinct. Templates alone do not start approval. Completion cannot be repeated to repair a failed run. Recovery requires current work authority. Exact approval evidence does not grant general parent-record access. |
| Publish and use guided help | Paired administrator Guided Help and Navigation guides | Both publications are required. Source versions remain pinned in Agency settings and running sessions. Audience membership does not replace record permissions. Preview can change real records. Retiring a source guide does not withdraw existing Agency entries. |

Arithmetic was checked directly while reading the paired examples. Examples include 10% of 1,005 rounded to 101; the 11,550 calculated budget; 110,000 Stream capacity less 90,000 leaving 20,000; 120,000 less adjusted Claim usage of 20,000 leaving 100,000; gross 1,250 less a 300 offset giving 950; 2,400 divided by 12,000 giving 20%; and a 500 October credit reducing annual Payments from 3,000 to 2,500 without moving the original June payment.

The reviewed recovery instructions preserve current versus historical records, separate currencies, missing evidence versus zero amounts, approval evidence versus business-status labels, and the limits on editing completed work. The French approval and Closeout passages use the corrected interface term `feuille d'acheminement`.

## Findings corrected and checked again

| Finding | Correction in final pages | Source evidence inspected |
| --- | --- | --- |
| RBAC described an obsolete Home table with search, type filtering and ten assigned rows. Navigation described the current five-row sections. | Both RBAC pages now describe separate primary, shared, Proponent and Agreement lists with five rows per section page, and distinguish the ten-row group queue. | `app/components/home/HomeWorkDashboard.vue`, especially `sectionPageSize = 5`, `groupPageSize = 10`, section filtering and `visibleItems`. `app/pages/index.vue` renders this component. |
| The RBAC introduction stated that ordinary owner access was always required, despite the exact-approval evidence exception documented in the workflow guides. | Both RBAC introductions now distinguish ordinary work from exact approval-evidence access and retain the Funding Case Intake review read requirement. | `server/api/recommendations/[recommendationId].get.ts` bypasses ordinary runtime reading for `hasExactApprovalAccess`. `server/utils/review-runtime-access.ts` accepts inherited owner-read authority or exact approval authority, while preserving the Intake restriction. |
| Agreement child workflows grouped reconciliation creation and configured reviews with directly created Agreement children, implying Agreement assignment and automatic creator assignment for all of them. | Both child-workflow pages now require Claim assignment to create its reconciliation, and explain that configured group-owned reviews and recommendations start unclaimed. Direct Agreement-child creation remains separate. | `server/api/agreements/[id]/claim-reconciles/index.post.ts` authorizes the exact Claim and assigns the creator to the new reconciliation. The final Workflows guide supplies the configured-owner and claim instructions. |

All application paths above refer to the pinned ignored clone `.reference-repos/gcs-ssc` at `dcbe779afa3c89adb9f0f798dd1b274e92a50939`. The sibling application workspace was not used.

## Verification limits

This pass read the final documentation, inspected the source paths listed above, checked the worked arithmetic and checked report-path coverage with a local Python script. It ran no application tests, browser tests, global documentation checks, generators, CodeRabbit or publication commands. The coordinator owns the final mechanical checks and release. The prior source-synchronization receipt records that earlier phase, not verification of subsequent editorial changes.
