# November 18 Stream risk and Proponent relationship review

Reviewed application `9ad3ead3fc391576028906b55b634ebaf4a92ae2..878cfb0d326f9a1d2efa8159afaeb08833d9f062` (four commits, 86 net paths). The verified uncommitted [coding lookup update](./sync-nov18-coding-lookups.md) was preserved.

| Commit | Evidence and disposition |
| --- | --- |
| `06aa394d` | Stream Risk Management form, risk schema and locked Stream writes select linked published workflows independently for Agreements and Amendments. Readiness and schema-version-4 packet evidence preserve selected policy and amendment application intent. Publication/link protection, amendment-type routing and seeded setup changes were reviewed with the workflow and Stream guides. |
| `863be914` | Financial Summary reads localized risk labels with distinct unavailable and unassessed display. Updated both summary guides. |
| `9e548ac1` | Workflow availability and start handlers permit eligible reassessment, explicitly choose an optional workflow when needed, and enforce target state. Risk readiness and provenance distinguish successful workflow, amendment promotion and manual values. Updated Agreement and Amendment recovery and reassessment guidance. |
| `878cfb0d` | Agency type CRUD and shared relationship handlers enforce Agency scope, distinct profiles, active link uniqueness and retirement guards. Updated Agency and Proponent guides, plus document template context, empty role lists and Closeout boundary. The SQL and audit ownership changes are covered by rollout guidance. |

The tooling gitlink adds related architecture and regression changes. Application tests were not executed.
