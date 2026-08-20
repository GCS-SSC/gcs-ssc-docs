# GC Forms Integration

The GC Forms Integration extension connects a GC Forms template and its submissions to reviewed GCS field mappings.

## Credentials and connection

Create credentials at agency scope, then select a credential in stream configuration. The browser receives credential metadata only. Private API keys are encrypted in host-managed secret storage and stream configuration stores only the credential reference. Production requires `GCS_EXTENSION_SECRETS_KEY`, a base64-encoded 32-byte key.

In agency configuration, set the API base URL, identity-provider URL, and default confirmation behavior. Create a credential with a bilingual name, key id, user id, form id, and private key. In stream configuration, select that credential, then choose **Refresh template**. Review and map the discovered questions, save the configuration, and run **Sync submissions**. Use **Download claim form** when an administrator needs a copy of the current claim template.

GC Forms encrypted submission payloads are authenticated before use. AES-GCM authentication tags must be exactly 16 bytes; invalid or tampered payloads are rejected. Structured templates, answers, mapped values, and issues are written as PostgreSQL `jsonb`, preserving JSON types rather than storing serialized JSON strings.

A connection is an immutable version of its complete remote identity: stream, credential and authentication revision, encrypted-secret identity and version, form, API endpoint, identity-provider endpoint, and project. Rotating any value creates or reuses another version; submissions awaiting recovery retain their historical connection. Credential labels may be edited safely, but authentication material cannot be changed and a credential cannot be deleted while any historical connection that uses it has an `imported_pending_confirm` or recoverable `materialization_failed` submission. Repeating the current authentication values does not advance the revision or rewrite the encrypted secret.

## Configure and review mappings

Refresh the form template, map source questions to supported destinations, and save only after review. Sync compares the live template shape with the saved reviewed shape before fetching submissions. If it changed, refresh and review the mappings again.

Integration records and their field mappings are immutable configuration versions selected by a normalized full-config fingerprint. Concurrent creation of the same version is idempotent, and its mappings are published in the same transaction. Every submission retains the exact integration and mapping version used for its import or failure, so later mapping edits cannot rewrite its retry context.

The current materializer supports:

- a submitted agreement claim; and
- optional submitted claim line items when all required line-item values are present.

Imported line items without a valid budget-line match remain unallocated. Users can assign those lines to a compatible agreement budget line while the claim is submitted.

Agreement, proponent, monitor, attachment, and general update/upsert destinations are not materialized yet. Unsupported destinations are handled for each submission, not by aborting the entire run before submissions are fetched. Sync fetches and decrypts the submission first, verifies it, and then checks its configured destinations. If a mapping is unsupported, sync stores a stable `unsupported_destination` issue for that mapping together with the normalized answers and attachments, but does not create or link a claim, create claim lines, or confirm that submission. The run continues with the remaining submissions.

## Sync, confirmation, and recovery

Sync decrypts, maps, validates, materializes, links, and then optionally confirms each submission. Confirmation is off by default and happens only after successful materialization. An active destination link makes repeat sync idempotent, preventing another claim for the same submission. When the same historical connection already has a durable pending marker, retry discovery queues it for reconciliation without repeating checksum verification, mapping, materialization, or attachment replacement.

Remote preparation is bounded and does not hold database locks: template discovery, new and historical-pending listing, and submission decryption all use request timeouts. Sync captures the active configuration, connection, credential authentication revision, and encrypted-secret identity, then renews host authorization and agency/stream lifecycle locks for each short local batch. A concurrent change causes `GCS_GCFORMS_CONFIG_CHANGED` before materialization.

Local materialization commits in one short transaction protected by fresh authorization and agency/stream lifecycle locks. When confirmation is enabled, that transaction records `imported_pending_confirm`; when confirmation is disabled, it records the submission as imported without creating a pending marker. Reconciliation reconstructs the client from the pending row’s historical connection and performs at most one bounded remote confirmation call after releasing all database locks. It then opens a second short transaction, renews authorization and lifecycle locks, and durably finalizes the local status. Revocation or disablement between the remote call and that second transaction can defer finalization, but the pending marker remains durable so a later authorized recovery can reconcile it. If confirmation is disabled, a lifecycle-locked preflight finalizes all pending rows for the stream before any current or historical remote client is created; this local recovery does not need an old credential or endpoint. If confirmation remains enabled, retries continue across every historical connection and use the credential, form, API, identity-provider, and project version attached to each pending row.

Materialization failures remain visible in the stream configuration. Mapping failures contribute to the sync failure count but are not listed in the manual recovery table. Manual recovery accepts only a row whose current status is exactly `materialization_failed`. Agreement choices are filtered by the host’s scoped Agreement Viewer access. Picker visibility is advisory: it can show a readable Agreement that the user cannot recover into, so selection does not prove update eligibility. The write renews authorization, takes the stream lifecycle lock, freshly locks and requires both the exact Agreement assignment and a Contributor role ceiling for the selected Agreement in its current stream, locks the submission through its historical connection, and uses the submission’s persisted integration version; save rejects a choice that lacks either write key. Recovery cannot write an override or claim after Agreement deletion, scope drift, access revocation, or a concurrent status change. When it creates a claim, it follows the historical integration version’s confirmation policy: confirmation-enabled recovery commits a pending marker and reconciles through the historical connection; confirmation-disabled recovery commits directly as imported.

Agency or stream disablement and deletion are blocked while the affected historical scope contains an `imported_pending_confirm` or `materialization_failed` row. These lifecycle guards share the same ordered locks as import and reconciliation, so they wait for in-flight recovery and observe recoverable work committed immediately before them. Credential authentication changes and credential deletion use the agency lifecycle lock and enforce the same historical-row protections.

The submission-list endpoint is strictly read-only. It queries the already-persisted connection version that matches the current configuration and returns an empty list when setup has not created that version. Reads never create or update connections, integrations, or mappings.

The GC Forms tab on a claim shows the source submission linked to that generated claim. Proponent and monitor tabs are installed but remain empty until the materializer supports those destinations.

## Route and permission reference

Every route is reached through the authenticated host dispatcher and then repeats its extension-specific scope check. Agency credential listing requires `agency:read`; create, patch, and delete require `agency:update`. Template and submission listing, claim-template download, failure listing, and entity source tabs require read on the exact agency, stream, Proponent, or owning agreement. Template refresh, sync, and manual failure recovery require stream update.

The preview manifest declares stream read, but `preview.post.ts` additionally calls `authorizeGcFormsStream(..., 'update')`; effective preview access is therefore `transfer_payment:update`, not read. This mismatch is tracked as `DOC-032`.

| Operation | Behaviour |
| --- | --- |
| Credential list/create/patch/delete | Returns metadata only; validates bilingual labels, remote identity fields and PEM private keys. Authentication changes increment `revision`; repeating the current values or changing labels does not. Delete is idempotent for an absent row and soft-deletes metadata plus the encrypted secret when safe. |
| Stored template / refresh | GET is local. POST obtains the remote form, requires the claim question shape, normalizes a field catalog, stores it for the immutable connection, and returns bilingual title/catalog data. |
| Claim-template download | Generates the current stream claim form contract; it is not a remote-submission export. |
| Preview | Normalizes supplied answers and applies supplied mappings without persistence. Despite the manifest read declaration, the handler requires stream update. |
| Submission list | Reads only the current already-persisted connection; response metadata is unpaginated. |
| Sync | Performs local pending-confirmation preflight, remote preparation, short authorized materialization batches, and post-commit confirmation reconciliation. The response reports run id and discovered/imported/skipped/problem counts; individual failures do not necessarily fail the whole run. |
| Failure list/recovery | Lists only recoverable claim materialization failures and host-filtered agreement options. Recovery accepts `{ agreementId }`, freshly authorizes that agreement for update, and rejects stale status or scope. |
| Entity source | Lists active destination links newest-first. The current tab deliberately shows stored status, received value, and raw JSON-stringified mapped values; fetch errors collapse to the same empty state rather than exposing details. |

## External-service security

API and identity-provider base URLs must use HTTPS, cannot contain credentials, query strings, or fragments, and reject literal localhost, private, link-local, documentation, multicast, and reserved IP ranges. Redirects are disabled. Deployments must additionally control DNS and egress because the schema validates the configured hostname text and does not pin DNS resolution.

The client signs a 60-second RS256 JWT assertion, exchanges it for a bearer token, caches the token per client, and retries one request after a 401 with a fresh token. Token and API calls default to a 15-second timeout. Error text records only HTTP status, not tokens, keys, or remote response bodies.

Submission envelopes use RSA-OAEP/SHA-256 to unwrap the AES-256-GCM key, nonce, and 16-byte authentication tag. The decrypted JSON must pass its schema and the answer text must match the supplied MD5 integrity checksum before mapping. MD5 here is an interoperability checksum after authenticated decryption, not the confidentiality/authenticity primitive. Attachments are represented by metadata (`source_url`, checksum, malicious flag, optional storage path); the current claims-first materializer does not download or attach them to host claims.

## Extension data and integrity

The two migrations create credential, immutable connection, template, immutable integration/mapping, submission, attachment, import-run, destination-link, and manual-override tables in the `extensions` schema, then add nullable `Funding_Case_Agreement_Claim.egcs_fc_gcformssubmissionuuid` with an active unique index. Bigserial ids cross the application boundary as strings.

Partial unique indexes enforce one active connection per complete remote identity, one template per connection, one integration per connection/fingerprint, one mapping key per integration, one submission name per connection, one manual override per submission/destination, and one active claim per GC Forms submission UUID. Foreign keys use restrict deletion and extension rows use `_deleted`; the extension has no physical-delete workflow. The schema intentionally stores destination owner type/id as a generic link rather than a core polymorphic composite foreign key, so host authorization and materializers must validate ownership before writing.

Back up the application database and encrypted-secret root together. Restoring tables without the matching `GCS_EXTENSION_SECRETS_KEY` leaves credential ciphertext unusable; restoring only secrets or only extension tables breaks immutable connection identities and historical confirmation recovery.
