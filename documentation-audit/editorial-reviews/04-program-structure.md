# Programs and streams editorial review

Reviewed both languages in full after application synchronization. Applied the unslop, bro, and technical-writing guidance.

| Page | Disposition |
| --- | --- |
| `en/programs/index.md` | edited |
| `fr/programs/index.md` | edited |
| `en/programs/streams.md` | edited |
| `fr/programs/streams.md` | edited |

The guides now tell administrators where to open programs and streams, explain role access without CRUD or structural-scope jargon, and describe Active as an on/off setting. Replaced implementation terms such as hero, child setup collections, downstream, and exposed with concrete instructions. Kept the financial examples, exact permission identifiers, validation limits, retained references, partial-save distinctions, and recovery instructions. Clarified the minimum stream checklist so it points to financial coding links and published recommendations rather than suggesting a nonexistent stream recommendation editor. No headings or anchors changed during this batch.

Added the missing Funding Subtypes entry to both stream tab lists, after Cost Category Line Items. Confirmed the actual order and tab component in `.reference-repos/gcs-ssc/app/composables/useTransferPaymentStreamDetailState.ts`. Also inspected `.reference-repos/gcs-ssc/app/pages/transfer-payments/[id]/streams/[streamId].vue` for stream navigation, edit permissions, and retained form state. No application runtime tests were run.

Verification completed:

- Read all four assigned files completely.
- Ran a local Python check of paired level-two heading counts and relative-link file destinations. Both page pairs passed.
- Ran `git diff --check -- en/programs/index.md fr/programs/index.md en/programs/streams.md fr/programs/streams.md`. Passed.

No unresolved questions or cross-batch requests. Global checks, generators, release, and final coverage reconciliation remain with the coordinator.
