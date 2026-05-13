# Approvals and Completions

Approvals and completions are runtime controls built from administrative setup data. They are not just display sections: they determine when workflow records can progress, who is expected to act, what certification text appears, and how completion state is stored.

## Approval configuration

Approval Templates define the workflow for a scope and entity type. Approval Steps define sequence, description, default user, and approver title. Certifications can attach to approval steps and can be optional or required. Approval Behalf Types are configured by agency and describe cases where someone approves for another person.

Routing Slips are runtime approval records. They point at an entity, an approval template, and an approval status such as draft, pending approval, approved, or denied.

## Completion configuration

Completions store the completion value for an entity, comments, completing user, and completed date. Supported entity types include common review and recommendation records plus funding case agreement workflows such as intakes, amendments, monitors, claims, forecasts, payments, and recommendations.

Completion records are generic so multiple workflow surfaces can share one pattern. A missing completion setup can prevent a runtime section from appearing or can block expected progression.

## Runtime behavior

Runtime approval and completion components read setup data, current entity id, status, and current user permissions. Typical actions include approve, deny, reassign, view approval state, mark complete, and store completion comments. The exact action set depends on the entity and configured template.

## Setup dependency

Before production use, confirm:

- Users exist for default approval routing.
- Approval templates match the right scope and entity type.
- Approval steps are sequenced and have bilingual labels/descriptions where applicable.
- Certifications are attached to the correct approval steps.
- Completion records use the correct entity type and id.
- Agency approval behalf types exist if delegated approval is part of the business process.

## Operational caution

Changing approval templates or review/completion setup after runtime records exist affects future runtime behavior. Historical routing slips and completions may still point to the older setup. Prefer creating a new template or setup version when the business process changes.
