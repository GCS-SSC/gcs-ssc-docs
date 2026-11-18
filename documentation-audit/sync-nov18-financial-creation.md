# November 18 incremental source review

Reviewed application `af5d8a67df7c6266e1d34641a44b8a4935ac4f09..9252d8fbe5b947161b7ecd3345c08a67d391151e` in the isolated reference clone. The range contains six commits and 13 net changed paths.

| Application commit | Source evidence and disposition |
| --- | --- |
| `8bf5109f041ab6434bab690e935a35cf7dc57fff`, `9252d8fbe5b947161b7ecd3345c08a67d391151e` | The host `AGENTS.md` points to shared commit guidance. Tooling commits `809612f1` and `4e82150b` establish and clarify it. No product or public SDK behavior changed. |
| `bb53465523017a99299d7d2db9bcb3e2a85278af` | The Claim and Payment POST handlers enforce the initial-approval prerequisite within authorized writes. `agreement-approval-submission.ts` checks revision zero and the linked successful workflow. The shared Claim aggregate applies the same rule to interactive and scheduled extension calls. Both locale files provide the localized API error. SDK gitlink `84978d5` adds the Claim result variant, and GC Forms gitlink `6d97d82` maps it to an Agreement-number diagnostic before persisting any Claim or lines. The Dockerfile updates its remote build pins for both workspaces. Updated the paired Claim and Payment guides, API contracts, and extension authoring guides. |
| `dd14b912fc54035aeffe9c28399c6dbe3d299c4a` | Tooling pins workbook checkpoint `3f069fd7` and artifact-list formatting `a53c937d`. Neither changes the public workbook contract or the artifact contents. The preceding tooling commit `9d42c1c2` includes architecture notes, regression tests, and fixtures for the financial prerequisite covered above. |
| `81185871b6acfd0db534e430348306d1cdc1933f` | `infra/aws/src/demo-refresh.ts` resolves `pg` from the built server entry point. Both deployment guides describe what to check if the candidate image cannot load the driver. |
| `02ca1d35cb01495fa72b18a85c1236ac02548b5b` | The shared image digest in `deployment/demo-image.json` was refreshed in both deployment guides. Deployment state was not queried. |

Inspected the pre-approval 409 and empty-list assertions in `tooling/gcs-ssc/tests/e2e/agreement-payments.spec.ts`, the no-write assertions in `tooling/gcs-ssc/tests/integration/financial-create-boundaries-postgres.test.ts`, and the failure result in `extensions/gcs-gcforms-integration/tests/unit/gcforms-claim-materialization.test.ts`. Application tests were not executed.
