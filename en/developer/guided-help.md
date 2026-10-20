# Guided help contracts

The host manages guide publication, Agency distribution, authorization, supported controls, and workflow context. `@gcs-ssc/guided-help` validates documents, safely renders instructions, and provides guide navigation and the browser reader. See [Publish guided help](../admin/guided-help.md) for authoring and publication procedures.

## Documents and supported controls

`GuideDraftSchema` accepts incomplete bilingual drafts. `GuideDocumentSchema` requires nonblank English and French titles, descriptions, step titles, and instructions, plus at least one step. Documents have `formatVersion: 1`, at most 100 steps, and at most 256,000 characters in their JSON representation. Each step has a unique ID, a view, a target, a kind, and bilingual content. Appearance, progression, and flow settings are optional.

`shared/guided-help/catalog.ts` declares supported views, targets, kinds, structured choices, and completion rules. `discoverable: false` prevents a view from being selected as a launch screen. It can still participate in a guide. The catalogue defines compatibility. It does not grant access.

`checkGuideCompatibility` checks view and target identity, kind, and typed branch conditions. The host adds registered-journey checks through `checkHostGuideCompatibility`. The host checks the document during preview, source publication, Agency publication, and launch. Discovery excludes incompatible versions.

Instructions use the package's limited Markdown renderer. It escapes authored content and supports emphasis, inline code, safe links, and line breaks. Schemas reject executable or template content. Guides cannot supply arbitrary selectors, scripts, or workflow adapters.

## Publication and Agency settings

`Common_Guided_Help` stores the working document and owner. `Common_Publication`, `Common_Publication_Version`, and lifecycle records preserve publication state and immutable versions. Source publication requires `guided_help:update` for the resolved global or Agency owner. Retirement requires delete permission. An Agency reference also prevents draft deletion.

`Agency_Guided_Help` links an Agency to a source guide and selected immutable version. Its settings have a separate publication that preserves the source version, discovery screens, and audience roles. Runtime discovery reads the published settings rather than current draft columns. `egcs_ay_enabled` stops new discovery after unpublication.

Adoption requires an owned or currently published shared source. Existing Agency entries retain versions referenced by their current settings or publication history when a source stops being shared or is retired. The receiving Agency can inspect those retained versions without reading another owner's working draft. Cloning creates a private Agency guide and records the source version.

Each management write rechecks current authorization within a transaction. The transaction locks the owner and relevant role records and records the actor. Supported scopes are global and Agency. Program scope and `manage_assignments` are unavailable for `guided_help`.

## Discovery and launch authorization

Agency discovery requires both access to the actual business screen and an active structural role in the published audience. The server verifies review ownership, Agreement ownership, and the current read permission where relevant. The Agreements collection checks visible Agencies and labels matching entries with their Agency. Launch repeats eligibility checks and returns the selected immutable source document and publication identities.

A registered view alone never authorizes a screen. `authorizeScreen` contains the explicit trusted mapping. New views need both a catalogue declaration and a server authorization mapping before they can be discovery screens.

## Progress and branching

`advanceOn` defaults to `completion`. `manual` retains explicit Next navigation for instructions, while required action gates still depend on their completion contract. `appearance` defaults to `spotlight`. `anchor-only` preserves normal page access beside the popover.

Completion uses trusted host action signals and facts about the loaded location. A click alone does not prove a successful save. Signals belong to the exact target, visit, and attempt. A canceled modal invalidates the opening evidence. Loading or an unrelated Help dialog suspends presentation without losing the business draft or accepted action evidence.

Standard flows compare declared checkbox booleans or select values in order. If no condition matches, they use the fallback destination. Destinations are later step IDs or `null` for termination. Duplicate conditions, backwards routes, missing conditions, and hidden condition controls cannot silently choose a valid branch. Previous follows the actual visited path rather than an unvisited branch.

`createGuideSession` uses the tab's `sessionStorage` to store the pinned document, user, Agency, publication, source version, and current step. It also stores the path or journey cursor. It does not store branch field values. Restore rejects sessions for another user, malformed content, and invalid paths. Storage failure falls back to memory. Exit, logout, and user changes clear the session. Restoring instructions does not grant business permissions.

## Workflow journeys and context

`shared/guided-help/journeys.ts` registers the Agreement risk-assessment journey. The ordered stages select an Agreement, start its risk workflow, guide its tasks, and show the result. Assessment and Checklist task templates restrict their supported screens. Every step belongs to exactly one stage or template. Every stage needs generic instructions. A guide cannot combine standard branching with a journey.

The host binds the journey to a verified Agreement in the launch Agency and reads its authorized workflow runtime. Business tasks supply their current execution and task identities. Loading, a different record, or a sibling task produces waiting or recovery instructions without rebinding the selected work. A new workflow execution resets task progress. Completing the guide never completes the business task.

## Shared diagrams

`@gcs-ssc/diagrams` provides `FlowDiagramDefinition`, layout, measured connections, selection, keyboard behavior, and export. `CommonFlowDiagram` supplies host translations. Guide authoring uses `layout="branches"`. Alternative routes occupy columns and shared successors appear once. Ordered workflows keep the default ordered layout.

Only nodes with `selectLabel` emit selection. Opt-in editing emits `add-node` and `add-branch`. Callers update the document. `branchNodeIds` restricts branch controls. Diagram controls support 25% to 200% zoom and a full-window workspace. Escape closes a child dialog before leaving the workspace and restores focus afterward.

Exports capture the complete diagram at 100% independent of viewport, pan, or zoom. SVG preserves searchable text and resolved theme colours. PNG uses the same SVG at four times its dimensions with an opaque background. Editor controls and canvas decoration are excluded. The public extension diagram remains read-only, with its existing SDK contract.

## Source and regression references

The host implementation is in `server/utils/guided-help.ts`, `app/components/GuidedHelp/`, and `app/plugins/guided-help-actions.ts`. The package's regression tests include `contracts.test.ts`, `flow.test.ts`, `native-runtime.test.ts`, `session.test.ts`, `journey-reader.test.ts`, and `journey-session.test.ts`. These distinguish successful actions from clicks, validate real paths and user-bound restore, and preserve exact task context through loading and recovery.
