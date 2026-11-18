# November 18 Financial System Number source review

The on-disk skill marker still named `af5d8a67df7c6266e1d34641a44b8a4935ac4f09`. Documentation HEAD `a7046ab3d752ec7ec5dab17927894739e870926e` contains the paired pages, coverage, and verification receipt through `9252d8fbe5b947161b7ecd3345c08a67d391151e`. The [previous source review](./sync-nov18-financial-creation.md) accounts for the six commits between those revisions. This review carries that coverage forward and reconciles the one remaining commit, `f527ab30d089877809379dc8854df80c3ba13467` (23 net changed paths).

| Change group | Source evidence and disposition |
| --- | --- |
| Optional profile field | The create and detail pages pass the resolved policy into `AgreementProfileFormPage.vue` and `AgreementProfileFields.vue`. The schema accepts omitted or null input, the write paths re-resolve the policy, and the detail mapper preserves a null value. Updated the paired Agreement and API guides. |
| Agency provider and approval | The module registry and SDK expose the provider, the Agency extension write rejects a second enabled provider, and the approval runtime applies the policy only during initial promotion. Successful same-run collection answers are available to the provider. The live value is saved in the workflow transaction while the packet stays frozen. Updated the paired administrator, approval, and extension-authoring guides. |
| Database and build | The database type and baseline Agreement migration allow null. The Dockerfile pins the updated SDK to match the gitlink. Paired deployment guides cover the schema check for existing databases. |
| Tooling | The tooling gitlink adds architecture notes, field contracts, and regression coverage. Inspected the PostgreSQL same-run approval regression for successful, missing, and invalid values, including rollback and packet preservation. Application tests were not executed. |
