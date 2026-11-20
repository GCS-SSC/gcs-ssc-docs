# November 19 Stream cost visibility review

Reviewed application `70048fb6b890012aefe53d5e178c577c1b921845..561ff6c12a482cdc082a42ca64216d7e006b4e29` (one commit, eleven net changed paths). Preserved the preceding verified bulk reconciliation changes.

- Agreement and Amendment budget overviews expose cost visibility separately from editable budget settings. The Budget tab reads those flags for locked and editable views.
- Claim, standalone reconciliation and Forecast views use Stream flags for display even when the record is historical or read-only.
- Approval submission captures budget visibility once. Retries carry the captured value forward, and the packet view defaults missing flags to visible.
- Updated both Stream and approval guides. The test runner and tooling gitlink add visibility coverage. Application tests were not executed.
