# Installed Extensions

GCS-SSC ships with optional extensions for specialized financial and narrative workflows. An installed extension does nothing until it is enabled for an agency and, where applicable, a transfer payment stream.

| Extension                                             | Purpose                                                                                   | Configuration scope                    |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- |
| [Automated Payments](automated-payments.md)           | Calculates a payment amount and ceiling from agreement financial data and holdback rules. | Stream                                 |
| [GC Forms Integration](gc-forms.md)                   | Maps GC Forms submissions into supported GCS records.                                     | Agency credentials and stream mappings |
| [Narrative Quality](narrative-quality.md)             | Scores configured narrative fields in the browser.                                        | Stream and target field                |
| [Narrative Tags](narrative-tags.md)                   | Suggests and stores predefined or dynamic tags for agreement and proponent descriptions.  | Stream and target field                |
| [Outcome Cost Allocation](outcome-cost-allocation.md) | Allocates agreement funding by outcome and generates managed commitments and payments.    | Stream and agreement                   |

Administrators should read [Extensions](../concepts/extensions.md) before enabling a package. Developers extending or integrating these packages should use [Authoring Extensions](../developer/extensions-authoring.md) and the public `@gcs-ssc/extensions` SDK.

## Operating principles

- Enable an extension at the agency before configuring a stream.
- Run its migrations before using features that store extension-owned data.
- Treat stream configuration as business configuration: review it before changing an active workflow.
- Keep credentials in encrypted extension secret storage, never in stream JSON.
- Test the affected agreement, payment, claim, or narrative workflow after an extension update.
