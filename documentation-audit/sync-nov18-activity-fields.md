# November 18 Activity custom fields review

Reviewed application `70499a295a283d7810d0cd2c0ed6af26d59139d1..ee54af9e338162e2d0f3d717ab231f307504d354` (three commits, 42 net changed paths).

| Commit | Evidence and disposition |
| --- | --- |
| `5a64aef8c2773d8b18ed2b5a4a4359ff5cd6996e` | Reviewed the Stream tab and target-aware assignment routes, authorized Activity definition lookup, Activity CRUD and amendment copy, and packet capture and historical projection. Stream assignment targets and object storage are enforced by the baseline schema. Updated Activity, Stream, custom-field, API and deployment guides. Demo seed and tooling changes exercise the documented behavior. |
| `619a3ef098707bc3d551b9743d1e48385b8f260c` | Agency Number definition and record validation enforce optional inclusive bounds. Updated configuration, example and rollout guidance. |
| `ee54af9e338162e2d0f3d717ab231f307504d354` | Agency definition and database constrain decimal places to 0–324. Record validation counts canonical fractional digits. The Activity and Agreement editor uses the shared settings and hints. Updated the same guides with the final numeric contract. |

Supporting tooling includes Activity route, custom-field schema and numeric value regressions. Application tests were not executed.
