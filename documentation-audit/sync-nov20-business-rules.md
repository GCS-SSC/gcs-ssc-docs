# Business-rule review since 8bf5109f

Reviewed the application range from `8bf5109f041ab6434bab690e935a35cf7dc57fff` (exclusive) to `aa0d4642d055166485687733e701e5020571ec49` (inclusive). The range has 53 commits. The last five commits changed 55 paths after the verified local checkpoint `7a5aaa27d820460f0e340c8d36db8e03552b12c4`.

| Source range | Business rules and guide evidence |
| --- | --- |
| `8bf5109f..9252d8fb` | Initial approval before Claim and Payment creation, including imported Claims. [Earlier review](./sync-nov18-financial-creation.md) |
| `9252d8fb..70499a29` | Optional Financial System Number, provider ownership and approval. Separate bilingual pairs and document display rules for Activities and budget lines. [Number](./sync-nov18-financial-system-number.md), [bilingual entry](./sync-nov18-bilingual-entry.md) |
| `70499a29..d9bc9540` | Activity custom fields, inclusive number limits, decimal places and Profile placement. [Field rules](./sync-nov18-activity-fields.md), [placement](./sync-nov18-profile-placement.md) |
| `d9bc9540..9ad3ead3` | Funding modes, pending lines, CAD default, table preferences, recent records and coding picker labels. [Budget rules](./sync-nov18-budget-management.md), [coding](./sync-nov18-coding-lookups.md) |
| `9ad3ead3..878cfb0d` | Stream risk selection and reassessment, amendment promotion, Agency-scoped relationships. [Earlier review](./sync-nov18-stream-risk.md) |
| `878cfb0d..561ff6c1` | Direct Forecast saves, cancellation after completion or on read-only Intakes, bulk reconciliation and cost visibility. [Workflow controls](./sync-nov19-workflow-controls.md), [reconciliation](./sync-nov19-bulk-reconciliation.md), [visibility](./sync-nov19-cost-visibility.md) |
| `561ff6c1..7a5aaa27` | Pinned and review-driven clauses, preserved Claim totals, answer copying, approval attachments, debt override and system extensions. Added the missing draft attachment disposal rule. [Clause groups](./sync-nov19-clause-groups.md), [review and extensions](./sync-nov19-review-and-extensions.md) |
| `54bd4ae0` | The shared matcher and execution planner evaluate preceding results from the same attempt, record decisions, and skip unmatched work. The simulation route requires Agency and setup read access and uses the saved setup. Added paired routing and simulation guidance with a threshold example. |
| `0a9f91c7` | Role editor help explains permissions by scope. Updated paired role guides with Debt Management and its existing create and assignment requirements. |
| `127a66e4`, `2772afa8` | PostgreSQL demo fixture encoding and stable identity during translation form rerenders. The user-facing restore and translation steps still apply. |
| `aa0d4642` | Health Canada demo seed accounts and catalogs expanded. Outcome Cost Allocation is disabled with configuration retained. Updated paired operator guides. |

Application tests and live deployment checks were not run.
