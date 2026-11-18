# November 18 bilingual entry source review

Reviewed application `f527ab30d089877809379dc8854df80c3ba13467..70499a295a283d7810d0cd2c0ed6af26d59139d1` (two commits, 40 net changed paths).

| Commit | Evidence and disposition |
| --- | --- |
| `76aa427e47fd57427f156097ab3c70ed25d1e571` | Activity forms and the shared schema enforce at least one language independently for each text pair. Live and Amendment writes validate the effective text, and the table shows the saved entries together. Agreement HTML rendering preserves blank activity fields in the requested language. The shared Either marker also replaces existing paired-field labels in the notes, proponent, and funding-history forms. Updated the paired Activity, Amendment, bilingualism, API, and document guides. Form-field audit and inventory scripts support the same display convention. |
| `70499a295a283d7810d0cd2c0ed6af26d59139d1` | Budget forms, snapshot writes, and SQL store both text versions. Locked PATCH merges existing values before checking a changed pair. Approval packets retain the supplemental fields and default absent historical French entries to empty. Claims, reconciliation, forecasts, summary, receivable reads, and document generation use English-first display text with French fallback. Updated the paired Budget, API, document and deployment guides. GC Forms uses both subsections for matching and Portal displays French-only subsections. The concrete extensions own those implementation details. |

The tooling gitlink contains supporting architecture, form audit and regression updates. Documentation verification was run against the pinned source; application tests were not executed.
