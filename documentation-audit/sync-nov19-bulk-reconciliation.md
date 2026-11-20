# November 19 bulk reconciliation source review

Reviewed application `b7a11770a2978187468e7286531798adc76c2dd1..70048fb6b890012aefe53d5e178c577c1b921845` (two commits, eleven net changed paths).

- `efcba911` enables sole-option selection on Claim and Payment create forms. Edited the paired guides. Existing-record pickers retain their saved selection behavior.
- `70048fb6` adds the bulk action in both reconciliation workspaces. The shared client submits the confirmation token only after consent. The route and schema pass it to the locked reconciliation mutation, which applies successful historical offsets, confirms replacements against fresh amounts, and preserves sampling and rationale. Updated paired Claim guides and API contracts.

The tooling gitlink contains picker and reconciliation regression changes, including PostgreSQL bulk-save coverage. Application tests were not executed.
