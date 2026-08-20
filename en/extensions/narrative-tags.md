# Narrative Tags

Narrative Tags suggests and stores tags derived from bilingual agreement or proponent descriptions.

## Configure targets and vocabulary

Agreement and proponent description targets can be enabled and tuned independently. A stream shares one predefined vocabulary, whose tag definitions may include bilingual labels and aliases. Each target controls whether custom tags are allowed and exposes predefined and dynamic thresholds, phrase size, semantic and lexical weights, alias boost, negation handling, and browser or embedding cache settings.

For agreement descriptions, the browser extractor ranks predefined tags and can propose dynamic tags when enabled. If its model cannot initialize, the extension falls back to keyword overlap against tag labels and aliases. Proponent suggestions always use keyword overlap against the available predefined definitions; dynamic-tag and embedding settings do not affect that path. Suggestions are never saved automatically; the user selects or removes tags.

## Provenance and validation

Agreement tags use the agreement stream configuration, so their provenance is implicit. Proponent tags are source-aware: definitions may come from the lead agency or from enabled streams on linked agreements. Sourced selections include the agency and, when available, stream that supplied their definition; source-less stored values use the first available source configuration. The server revalidates a requested source, target configuration, aliases, custom-tag permission, and duplicates before persistence.

When available definitions or sources change, invalid stale tags are filtered rather than being presented as current choices. Stored provenance lets the UI and downstream consumers distinguish identically named tags supplied by different sources.

## Transactional write authorization

Agreement-tag writes resolve enough initial context to reject malformed requests, then perform all protected work in one transaction. The route locks the caller’s current authorization graph first, acquires the extension’s agency and stream lifecycle locks, freshly authorizes the current entity, and then re-resolves the agreement and current extension configuration. Tag validation and the upsert use that locked current scope, so an agency, stream, configuration, agreement lifecycle, role, or exact-assignment change cannot race a stale write. Hosts must provide `writeAuthorization`; the current-scope callback is preferred and the current-entity callback remains the compatibility fallback.

## Current Proponent resolver limitation

The intended resolver collects a lead-agency source plus enabled streams from linked agreements the caller can read. The current host skips the resolver unless Narrative Tags is enabled for the Proponent's lead agency, and once that agency is enabled it renders the registered slot even when the resolver returns null. A linked agreement in another enabled agency therefore cannot by itself make the slot appear, while an enabled lead agency can produce an empty slot when no valid source remains. The Proponent GET route still filters actual readable sources before returning tags. This impact is tracked as `DOC-034`.

## Persistence and browser behaviour

Agreement GET/PATCH requires both extension switches. GET uses scoped `agreement:read`; PATCH requires the scoped Contributor-or-higher ceiling plus exact agreement assignment, then locks authorization and the extension lifecycle, reauthorizes, re-resolves current config, validates `{ tags }`, and upserts extension KV. Proponent GET uses scoped `applicant_recipient:read` and removes stored tags whose source is no longer visible. Proponent writes—and field-keyed agreement writes—are persisted by the corresponding core profile-update hooks inside the already-authorized host profile transaction; suggestions only update the form payload and are not saved until the surrounding profile save succeeds.

KV owners are `fundingcaseagreement` and `applicantrecipient`; keys are `agreement-description-tags` and `text-field-tags`. Predefined selections must match the applicable current definition. Custom tags require permission on that exact target. Proponent source provenance must match a currently available agency/stream source, and duplicates are removed by source plus tag identity. The extension has no migration or secret store; preserve KV in database backups.

Agreement text uses the same-origin worker/model under `/extensions/gcs-narrative-tags/client` and `/extensions/gcs-narrative-tags/models`. It applies configured semantic/lexical weights, aliases, negation, thresholds, limits, dynamic phrases, and caches. Worker failure falls back to keyword/alias ranking and resets the shared worker. Proponent suggestions always use source-aware keyword ranking; dynamic and embedding settings do not govern that path. Narrative text stays in the browser; the server receives selected tags and provenance, not embeddings.
