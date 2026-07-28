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

Materialization failures remain visible in the stream configuration. Mapping failures contribute to the sync failure count but are not listed in the manual recovery table. Manual recovery accepts only a row whose current status is exactly `materialization_failed`. Agreement choices are filtered by the host’s agreement role and team visibility. The write renews authorization, takes the stream lifecycle lock, freshly locks and authorizes `agreement:update` for the selected agreement in its current stream, locks the submission through its historical connection, and uses the submission’s persisted integration version. Recovery cannot write an override or claim after agreement deletion, scope drift, access revocation, or a concurrent status change. When it creates a claim, it follows the historical integration version’s confirmation policy: confirmation-enabled recovery commits a pending marker and reconciles through the historical connection; confirmation-disabled recovery commits directly as imported.

Agency or stream disablement and deletion are blocked while the affected historical scope contains an `imported_pending_confirm` or `materialization_failed` row. These lifecycle guards share the same ordered locks as import and reconciliation, so they wait for in-flight recovery and observe recoverable work committed immediately before them. Credential authentication changes and credential deletion use the agency lifecycle lock and enforce the same historical-row protections.

The submission-list endpoint is strictly read-only. It queries the already-persisted connection version that matches the current configuration and returns an empty list when setup has not created that version. Reads never create or update connections, integrations, or mappings.

The GC Forms tab on a claim shows the source submission linked to that generated claim. Proponent and monitor tabs are installed but remain empty until the materializer supports those destinations.
