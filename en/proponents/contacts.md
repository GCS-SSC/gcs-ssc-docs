# Proponent Contacts

Use **Contacts** for people associated with a proponent. A proponent contact is a common contact record linked to the selected profile; it is not automatically an application login or Team member.

Open **Proponents**, select a saved profile, and choose **Contacts**. The active table shows name, email, and English job title. Search matches name, email, or either language’s job title.

## Access and actions

| Effective access to the proponent | Available actions |
| --- | --- |
| Read-only access | View, search, and page through active contacts. |
| Contributor access | View and add contacts. |
| Full access | View, add, edit, and delete contacts. |
| No access | The server refuses the request. |

Global proponent privileges and an exact Proponent Team assignment can provide access. The server authorizes each child action against its parent profile. Writes lock the profile and rebuild authorization in the transaction.

## Fields and validation

| Field | Rule |
| --- | --- |
| Name | Required. |
| Email | Required. Active common contacts use a case-insensitive globally unique email address. |
| General language preference | Required value from the supported language-preference list. |
| English and French job titles | Both are required persisted values. |
| Primary account | Required yes/no value. The application does not enforce that only one contact per proponent is primary. |
| Title | Optional. |
| Business phone and extension | Optional numeric values. |

The language preference records a service preference; it does not translate the stored name or replace either required job-title value.

## Record ownership and shared contacts

Adding a contact creates the common contact and its proponent link in one transaction. The email uniqueness rule applies across all active common contacts, not just within this proponent. Use a genuinely distinct address for a different person; a duplicate email cannot be saved.

A common contact can also be referenced by another proponent or by completion and approval configuration. The server locks the contact before checking those references. It refuses an edit when another active reference exists so the change cannot silently affect another record.

Deleting a contact soft-deletes this proponent’s link. The common contact is soft-deleted only when no other active proponent, completion, or approval-step reference remains. There is no restore action in this tab. Deleting a link does not remove an application user account, Team membership, or another record’s live reference.

## Recovery

Correct missing required values or a duplicate email and retry. If the contact is reported as shared, update the owning/shared context or create a distinct contact instead. Refresh after a concurrent edit or a not-found response.

## Related guides

- [Proponent profiles](./index.md)
- [Addresses](./addresses.md)
- [Proponent Teams](./team.md)
