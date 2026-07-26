# Narrative Quality

Narrative Quality displays a lightweight score beside configured text areas. Scoring runs in the browser; the extension does not send narrative text to its server route.

## Configure targets and prompts

Stream configuration can enable agreement narrative fields and comments for individual assessment-schema questions. Each target has its own bilingual prompt, weighted criteria, status bands, and request settings. Assessment targets are discovered from the stream schemas so administrators can configure the exact question comment being scored.

The refinement policy can be `always`, `adaptive`, or `never`. Adaptive refinement uses configured low- and high-stop gates; comparison, planning, or constraint-sensitive prompts can be forced through the full scoring pass. Treat prompts and thresholds as business rules and test representative English and French narratives before enabling them.

## Browser runtime

All mounted meters on a page share one worker and one loaded model. Identical in-flight requests reuse a promise, while distinct work is serialized through a single queue. When text changes quickly, an older pending request for the same target is replaced and a stale response is ignored. This prevents competing model instances and ensures only the newest text updates the meter.

The meter is guidance, not an approval decision. Users remain responsible for the accuracy, completeness, and bilingual quality of the narrative.
