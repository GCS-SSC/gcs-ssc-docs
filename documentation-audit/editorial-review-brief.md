# Documentation page review brief

Review the files assigned to your batch in `documentation-audit/editorial-review-plan.json`. Read both languages before editing. Read `AGENTS.md`, the `unslop` and `technical-writing` skills, and the relevant application source when a statement needs confirmation. Apply the user's `bro` request by explaining each instruction in plain language that a person can understand on the first read.

## Start after synchronization

Wait for the coordinator to confirm that application synchronization has finished. The reconciled plan records 85 bilingual page pairs and 11 other Markdown files in 22 batches. Batches 21 and 22 cover the new administrator and developer guided-help guides. New synchronization receipts and editorial support records are excluded from product-page assignments. The coordinator must reconcile any further new pages before assigning editors. The pinned application source is `.reference-repos/gcs-ssc`, never the sibling `../gcs-ssc` repository.

## Keep work separate

- Edit only the paths assigned to your batch. Other agents share this checkout.
- Review every assigned page, including pages that need no changes. Read the complete page, not only search matches.
- Keep English and French changes together. Match meaning, examples, headings, tables, links and code blocks.
- Do not edit another batch's file to fix a cross-link or shared term. Record the proposed change in your report and tell the coordinator.
- Do not commit, push, publish, run CodeRabbit, or run the full verification batch. The coordinator owns final checks and release.
- Application synchronization owns existing audit records and the skill's application baseline. Review those records for clarity and contradictions, but report proposed corrections without editing them. Repository guidance is also review-only unless the coordinator assigns a specific necessary correction.

## Write for the reader

Outside Developer Reference, Operations and API Reference, help the person complete work in the application. Put the goal, where to go and required permissions before the steps. Use the actual interface labels. Explain unfamiliar terms when they first matter. Tell the reader what a completed action looks like and how to recover from a failure when the application supports recovery.

Replace dense implementation descriptions with concrete instructions. Keep internal identifiers only when the reader needs them to diagnose a real issue. Preserve meaningful limitations, prerequisites, validation rules, permission distinctions, saved versus draft behavior and financial calculations. Clear wording must not make a promise that the source does not support.

Use short everyday words, direct verbs and sentence case. Remove filler, repeated explanations, generic introductory text, ornamental emphasis and decorative symbols. Avoid em dashes. Split sentences that require rereading, while keeping the condition beside the action it controls. Do not shorten a sentence into fragments that the reader must decode. Preserve exact UI labels and technical strings even when their capitalization or punctuation differs from the surrounding prose.

Technical references still need readable prose. Keep the identifiers, commands, configuration keys, paths, error codes, amounts, limits, formulas and authorization details exact. Do not remove useful technical precision merely to make a page shorter.

## Protect behavior and links

Treat existing source-backed facts as constraints. Check uncertain claims against the final pinned source and record the paths you inspected. Do not infer server permission from a visible button or picker. Do not present tests you read as tests you ran.

Preserve heading anchors where practical. Before renaming a heading, find incoming links and coordinate changes outside your batch. Keep both languages aligned and report anchor changes. Preserve URLs, redirect scripts and code examples unless you have evidence of an error. Legacy redirect pages need a working destination and a clear fallback link.

Generated API and audit-impact pages must be fixed in their generator. Batch 19 owns `scripts/generate-api-reference.ts`; batch 20 sends its API wording findings to that owner. Batch 20 owns `scripts/generate-audit-impact-reference.ts`. Do not hand-edit generated pages. Coordinate regeneration with the coordinator so it does not overlap synchronization or another generator run. Read the TypeScript best-practices skill before editing a generator.

## Leave a concise report

Write your report to the batch's `report_path`. List every assigned page with `edited`, `reviewed unchanged` or `blocked`, and explain any blocker. Summarize the concrete readability changes, any behavior checked against source, and any cross-batch or generator requests. Record commands actually run and their results. Report unresolved questions instead of inventing an answer.

The coordinator reconciles the final page list and reports, checks the paired examples and recovery instructions, runs the repository's required verification, and releases the verified result. The explicit page assignments and reports are the improvement to this review process. No new tooling or recurring schedule is required for this task.
