# Administrator guided-help review

Both pages were read in full and edited together using the unslop, bro, and technical-writing instructions.

| Page | Disposition |
| --- | --- |
| `en/admin/guided-help.md` | edited |
| `fr/admin/guided-help.md` | edited |

The pages now explain the separate guide and Agency publication steps more directly. They name the System or Agency that owns the guide, explain how readers advance, and replace abstract descriptions of branches, workflow tracking, and retirement with concrete actions. The French workflow reference now links to its section. All existing headings, examples, permission distinctions, limits, interface labels, and recovery instructions remain. English and French changes match in meaning.

Source checks confirmed the application labels in `i18n/locales/en.json` and `i18n/locales/fr.json`. `shared/guided-help/catalog.ts` confirms that some screens cannot be discovery screens. `server/utils/guided-help.ts` confirms source publication requirements for new Agency entries and separate Agency publication. The generic package editor has different labels from the application editor, so the application labels were preserved.

Commands run were read-only `cat`, `sed`, `rg`, `ls`, and a scoped `git diff`, plus Python edits to the two assigned pages. The diff had no output because these new synchronized pages were untracked. A focused Python check verified matching heading counts, table row counts, numbered step counts, unchanged numeric limits, and the new local French anchor. No application tests, generators, full site checks, or CodeRabbit were run. Final repository verification belongs to the coordinator.

No unresolved questions or cross-batch requests.
