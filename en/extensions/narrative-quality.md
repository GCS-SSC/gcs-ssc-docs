# Narrative Quality

Narrative Quality displays a lightweight score beside configured text areas. Scoring runs in the browser; the extension does not send narrative text to its server route.

## Configure targets and prompts

Stream configuration can enable agreement narrative fields and comments for individual assessment-schema questions. Each target has its own bilingual prompt, weighted criteria, status bands, and request settings. Assessment targets are discovered from the stream schemas so administrators can configure the exact question comment being scored.

The refinement policy can be `always`, `adaptive`, or `never`. Adaptive refinement uses configured low- and high-stop gates; comparison, planning, or constraint-sensitive prompts can be forced through the full scoring pass. Treat prompts and thresholds as business rules and test representative English and French narratives before enabling them.

## Browser runtime

All mounted meters on a page share one worker and one loaded model. Identical in-flight requests reuse a promise, while distinct work is serialized through a single queue. When text changes quickly, an older pending request for the same target is replaced and a stale response is ignored. This prevents competing model instances and ensures only the newest text updates the meter.

The meter is guidance, not an approval decision. Users remain responsible for the accuracy, completeness, and bilingual quality of the narrative.
+
## Enablement and exact targets

Enable the package for the agency, then enable it on the stream. The host normalizes a newly enabled empty row by turning on the agreement-level profile so at least one meter can render. Assessment profiles and individual question-comment profiles remain disabled until explicitly enabled.

The sole server route, `GET /api/extensions/gcs-narrative-quality/streams/{streamId}/assessment-targets`, requires exact stream read access. Through the public catch-all it also requires both extension switches; the extension README/test's claim that the handler needs no enablement rows applies only when calling the handler directly and is not the externally reachable contract (`DOC-033`).

The route reads active review-set setups scoped directly to the stream, their active review setups, and active assessment review schemas. It uses working assessment content when present, otherwise published content, parses valid question nodes, de-duplicates schemas by id, and returns schema id/version, bilingual name, and keys formed as `section::subsection::question`. No assessment set returns an empty list; malformed effective assessment content returns the schema with no questions.

At runtime the generic `textarea.after` slot receives a host-owned target context. The extension currently maps these contexts to:

- English and French top-level agreement descriptions;
- an assessment schema's review-alignment narrative;
- one exact assessment question comment, keyed by schema and the three-part question key.

A profile renders only when it is enabled, the context resolves to that exact target, and scoreable text is non-blank. Stale configuration for a removed schema/question has no mounted target. The configuration UI shows loading, no-schema, no-question, and catalog-error states rather than inventing choices.

## Scoring configuration

Each profile stores a bilingual prompt and bilingual weighted criteria. Empty criterion labels are removed; if none remain, defaults are restored. Weights are clamped from `0.1` to `10`. Numeric request values are normalized into their documented percentage or `0..1` ranges, unknown policies/tones fall back to defaults, and legacy target-bucket config is upgraded in memory into per-assessment profiles.

Presentation bands use configurable mixed/strong thresholds and one of `error`, `warning`, or `success` per band. These settings affect guidance colour and labels, not authorization, validation, workflow, review scores, or persisted host decisions.

## Browser assets, privacy, and failures

The worker and ONNX runtime are served from `/extensions/gcs-narrative-quality/client`; packaged model files are served from `/extensions/gcs-narrative-quality/models`. Production packaging strips source-like files from staged public assets. Scoring requests send text, locale, prompt, criteria, and normalized request settings only to the same-origin browser worker. The extension server route reads assessment definitions but never receives the narrative being scored.

Blank text or a prompt with no criteria returns an empty result without model work. `never` uses only the fast pass; `always` runs fast and full passes; `adaptive` applies the configured low/high gates and may force refinement for constraint, comparison, or planning questions. All slots share one browser-global worker and model promise. Identical in-flight work is reused, distinct requests are serialized, and newer text drops stale queued work for the same target group.

If worker construction, asset/model loading, or scoring fails, the slot shows a localized unavailable/error state and resets the shared failed worker so a later request can retry. The score is not stored in core or extension tables and does not block saving. Operators must serve both public asset namespaces with the same release, allow the browser to load WASM/model assets under the deployment content-security policy, and test lower-power supported browsers before broad enablement.

The extension declares no migrations, KV, encrypted secrets, Nitro hook, entity tab, create action, or external network service.
