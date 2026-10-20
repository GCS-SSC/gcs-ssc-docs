# Proponent contacts

Use **Contacts** for people associated with a Proponent. A contact records someone you can reach about the organization, such as its finance officer. Saving a contact does not give that person a login or permission to work on the file.

Open **Proponents**, select a saved profile, and choose **Contacts**. The active table shows name, email, and English job title. Search matches name, email, or either language's job title.

## Access and actions

| Effective access to the proponent | Available actions |
| --- | --- |
| Viewer | View, search, and page through active contacts; no exact assignment is required. |
| Contributor plus exact Proponent assignment | View, add, and edit contacts. |
| Manager plus exact Proponent assignment | View, add, edit, and delete contacts. |
| No access | The server refuses the request. |

To add or change a contact, you need both Contributor access and an assignment to this specific Proponent. To delete one, you need Manager access and that assignment. The application checks these permissions again when saving, including any changes made while your page was open.

## Fields and validation

| Field | Rule |
| --- | --- |
| Name | Required. |
| Email | Required. The address must be different from every other active contact's address throughout the application. Uppercase and lowercase letters count as the same address. |
| General language preference | Choose a supported language preference for communication with this person. |
| English and French job titles | Enter both versions, for example "Finance officer" and "Agent des finances". Both are saved. |
| Primary account | Choose yes or no to indicate a primary contact. More than one contact may be marked primary. |
| Title | Optional. |
| Business phone and extension | Optional numeric values. |

The language preference records a service preference; it does not translate the stored name or replace either required job-title value.

## Record ownership and shared contacts

Saving a new contact saves both the person's details and their connection to this Proponent together. The email uniqueness rule applies across all active common contacts, not just within this proponent. Use a different email address for a different person. You cannot save a duplicate address.

A common contact can also be referenced by another proponent or by completion and approval configuration. If another active record uses the same contact, the application refuses changes here to prevent you from changing that other record's contact details.

Deleting a contact removes it from this Proponent's active contact list while preserving history. The contact itself is marked deleted only if no other active Proponent, completion, or approval step still uses it. There is no restore action in this tab. Deleting a link does not remove an application user account, exact assignment, or another record's live reference.

For example, when preparing a contribution agreement for Harbour Community Services, search for its finance officer, Maya Chen, before adding her. Enter her name, `maya.chen@example.org`, both job titles, and her language preference. If that email already belongs to an active contact elsewhere, saving fails; confirm which existing record uses it before creating a separate contact with a different address.

## Recovery

Correct missing required values or a duplicate email and retry. If the application reports a shared contact, update it from the record that manages it or create a separate contact. Refresh after a concurrent edit or a not-found response.

## Related guides

- [Proponent profiles](./index.md)
- [Addresses](./addresses.md)
- [Proponent assigned users](./team.md)
