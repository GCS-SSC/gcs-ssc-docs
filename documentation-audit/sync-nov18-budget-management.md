# November 18 Budget Management source review

Reviewed application `d9bc9540dcc31c699aa3e2913529cdc174b8b817..66c99235e8c3bf824a40efebef5a79d26ea936b3` (three commits, 208 net changed paths). This run started from documentation HEAD `55c3d3523095520f535cd6e4e6071d47c3e745d1` and carried forward the verified uncommitted [Profile placement update](./sync-nov18-profile-placement.md).

| Commit | Evidence and disposition |
| --- | --- |
| `bd2104575f2a5ef06fa0296843f482791102b1ed` | Stream settings, defaults and change guards were traced through the Budget Management form, Stream write transaction and schema. Budget recalculation and reference guards exclude pending funding. Claim and forecast handlers enforce Total Cost by mode. Snapshots, copies and downstream financial, payment, assessment and document reads separate working and historical budget usage. Updated Stream, budget, amendment, forecast, claim, deployment and API guides. The SDK adds forecast import totals and row-specific failures. Docker pins the updated SDK and extensions. Concrete extension adjustments belong to their packages. |
| `adb8d56463b73b159a08cde550b103d86536ffb1` | The new Agreement form starts with CAD. Updated the Agreement creation guidance in both locales. |
| `66c99235e8c3bf824a40efebef5a79d26ea936b3` | Shared resource tables, specialized tables and toolbars opt into per-table preferences. The client session, self-service API, user storage and audit policy were traced. Successfully opened Agreements and Proponents contribute browser-local sort hints to their lists and assigned work. Updated navigation, API and deployment guidance. Individual table opt-ins share that workflow. |

The tooling gitlink updates the corresponding architecture, field contracts, and application regression tests. Application tests were not executed.
