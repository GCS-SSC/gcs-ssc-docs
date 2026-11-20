# November 19 clause groups and casework review

Reviewed application `561ff6c12a482cdc082a42ca64216d7e006b4e29..96a5d0a6361b1ac1890f08da284173e98985ae7d` (ten commits, 96 net changed paths). Preserved the verified uncommitted bulk reconciliation and cost-visibility updates.

| Commit | Disposition |
| --- | --- |
| `96a5d0a6` | Agency draft, publication and retirement routes, Stream links, and Agreement pin updates define the Clause Groups workflow. Baseline constraints and audit mappings protect scope and identity. Document context and initial approval evidence use pinned wording. Updated the corresponding bilingual guides. |
| `69939ad2` | Claim edit preserves the funding gap by adjusting manual Total Cost by the change in Program Funding. Clarified the paired Claim guides. Guided Help target repairs retain the documented tasks. |
| `dcfd418a`, `4ed93a04` | Inverse role columns were renamed and Claim budget label reads now carry owning Agency attribution. Role presentation remains the same. Rollout notes identify the schema rename. |
| `41623d4d` | Named budget mode constraints map to localized conflicts. Existing Stream guidance explains the same valid combinations and recovery. |
| `23fd83bc`, `ff558347` | Field Help clears stale filters on Agency changes and the concrete translation extension retains its success indication. Existing guided-help and translation tasks still apply. |
| `a544219b`, `6da324d1`, `589ec4ea` | Build export and modal type fixes, test runner and fixtures, validation metadata, seed changes and extension pins. Reviewed the final public configuration and existing code-format guidance. The concrete extension packages own their behavior. |

The tooling gitlink includes Clause Groups and catalog code validation regression coverage. Application tests were not executed.
