# Narrative Tags

Narrative Tags suggests and stores tags derived from bilingual agreement or proponent descriptions.

## Configure targets and vocabulary

Agreement and proponent description targets can be enabled and tuned independently. A stream shares one predefined vocabulary, whose tag definitions may include bilingual labels and aliases. Each target controls whether custom tags are allowed and exposes predefined and dynamic thresholds, phrase size, semantic and lexical weights, alias boost, negation handling, and browser or embedding cache settings.

For agreement descriptions, the browser extractor ranks predefined tags and can propose dynamic tags when enabled. If its model cannot initialize, the extension falls back to keyword overlap against tag labels and aliases. Proponent suggestions always use keyword overlap against the available predefined definitions; dynamic-tag and embedding settings do not affect that path. Suggestions are never saved automatically; the user selects or removes tags.

## Provenance and validation

Agreement tags use the agreement stream configuration, so their provenance is implicit. Proponent tags are source-aware: definitions may come from the lead agency or from enabled streams on linked agreements. Sourced selections include the agency and, when available, stream that supplied their definition; source-less stored values use the first available source configuration. The server revalidates a requested source, target configuration, aliases, custom-tag permission, and duplicates before persistence.

When available definitions or sources change, invalid stale tags are filtered rather than being presented as current choices. Stored provenance lets the UI and downstream consumers distinguish identically named tags supplied by different sources.

## Transactional write authorization

Agreement-tag writes resolve enough initial context to reject malformed requests, then perform all protected work in one transaction. The route locks the caller’s current authorization graph first, acquires the extension’s agency and stream lifecycle locks, freshly authorizes the current entity, and then re-resolves the agreement and current extension configuration. Tag validation and the upsert use that locked current scope, so an agency, stream, configuration, agreement lifecycle, role, or team-access change cannot race a stale write. Hosts must provide `writeAuthorization`; the current-scope callback is preferred and the current-entity callback remains the compatibility fallback.
