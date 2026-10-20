# Intake and proponent finance review

Read every assigned English and French page in full. Applied the unslop, bro and technical-writing skills to the synchronized content.

## Page dispositions

- `en/intake/opportunities.md`: edited.
- `fr/intake/opportunities.md`: edited.
- `en/intake/funding-case-intakes.md`: edited.
- `fr/intake/funding-case-intakes.md`: edited.
- `en/intake/portal.md`: edited.
- `fr/intake/portal.md`: edited.
- `en/proponents/index.md`: edited.
- `fr/proponents/index.md`: edited.
- `en/proponents/agency-financial-ids.md`: edited.
- `fr/proponents/agency-financial-ids.md`: edited.
- `en/proponents/credit-memos.md`: edited.
- `fr/proponents/credit-memos.md`: edited.

## Changes

- Made Intake permissions and assignment requirements concrete. Split the assessment sections and Opportunity eligibility conditions into readable lists.
- Explained Portal source evidence as the saved submitted copy and retained the original-identity retry rules. Clarified scheduled imports without relying on “host projection” or “unclaimed group slot.”
- Removed “role ceiling” and “mutation” from Proponent instructions. Explained NAICS and SCIAN, corrected missing French accents and apostrophes, and replaced the developer term “hero” with “summary.”
- Explained the Financial ID retirement warning, including restricted Agreement information and the possibility of a concurrent selection. Preserved number limits and replacement-ID guidance.
- Converted credit-memo creation fields into ordered steps. Kept the coding totals, examples, recovery capacity and distinction between Completion and posting. Used “agence” consistently in the French finance guide.

## Source checks

Inspected the pinned ignored clone only:

- `server/utils/funding-case-exchange.ts`: scheduled import requires an active Proponent and lead-Agency association or non-deleted linked Agreement, relationship, Stream and Program. Retained exact source identity and import retry behavior.
- `server/utils/extension-scheduled-import.ts`: scheduled Intake import is a separate capability and delegates to the group-only import function.
- `app/pages/funding-case-intakes/[id].vue`: Supplementary Information displays workflow-collected information. Approval Submission uses its dedicated workflow purpose.
- `app/components/ApplicantRecipient/ApplicantRecipientAgencyFinancialIdsTab.vue` and `server/api/applicant-recipients/[id]/agency-financial-ids/[childId]/uses.get.ts`: only nonterminal Agreement uses trigger the additional retirement warning. An unreadable Agreement has limited metadata and no internal ID or detail link.

## Links and validation

Corrected French Proponent heading accents and wording while preserving all previous heading anchors with explicit IDs. English heading changes only use sentence case and retain their generated anchors. No cross-batch changes or generator requests.

Ran scoped `git diff --check` over all assigned paths. Passed. Read the final changed paragraphs and checked paired examples and recovery instructions. No application runtime tests, generators, global checks, CodeRabbit or commits ran in this batch. Final site and locale checks remain with the coordinator.

No unresolved questions or blockers.
