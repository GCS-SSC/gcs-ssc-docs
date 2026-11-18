# November 18 Profile placement source review

Reviewed application `ee54af9e338162e2d0f3d717ab231f307504d354..d9bc9540dcc31c699aa3e2913529cdc174b8b817` (two commits, five net changed paths).

| Application commit | Evidence and disposition |
| --- | --- |
| `49176193c7ac4398c8a60db3bcfa55ddb1bbed95` | `FieldHelp/Tooltip.vue` requests top placement and uses available width, wrapping, and padding to improve readability. The existing navigation guidance still describes the same help trigger and interaction. No guide edit was needed. |
| `d9bc9540dcc31c699aa3e2913529cdc174b8b817` | `AgreementProfileFields.vue` and `AgreementGeneralTab.vue` render unsectioned custom fields in Profile and named sections after the built-in sections. `CustomFields.vue` selects the correct group in each placement. Both Agreement and Stream custom-field guides now describe this placement. Activity callers keep the default shared layout. |

The tooling gitlink updates the architecture, field inventory, and regression coverage for both changes. Application tests were not executed.
