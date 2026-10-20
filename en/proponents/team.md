# Proponent assigned users

Open a saved Proponent and select **Assigned users** to see who is assigned to work on that specific profile. Users also need the appropriate Proponent role globally or in an active Agency. The lead agency is tracking information and does not determine access to this shared profile. Adding someone to this list does not give them that role.

## Required access

Reading the roster requires either:

- Viewer or higher for `applicant_recipient` globally or in an active Agency; or
- `applicant_recipient` `manage_assignments` globally or in an active Agency.

Adding, promoting, or removing users requires `manage_assignments`. Contributor or Manager business access does not imply roster management, and `manage_assignments` alone does not reveal the Proponent profile.

## Roster rules

Every active Proponent must have at least one active assignment and exactly one primary. The primary user is the work lead, not a more privileged member. An assigned user still needs Viewer access to read the profile. Changing it requires both the appropriate role and an assignment to this specific profile.

The roster remains readable when an existing user becomes inactive or loses Contributor eligibility. This makes an ineligible primary visible for correction; role changes do not silently rewrite assignment history.

## Add an assigned user

Select **Add user** and search the eligible users. A candidate must be active and have Contributor or Manager for `applicant_recipient` globally or in an active Agency. You cannot add an inactive user, a Viewer-only user, someone outside the required scope, or someone already on the active list. The application also rejects unknown fields and malformed identifiers in submitted requests.

The new user is non-primary. Adding the same person to another Proponent creates a separate exact assignment and does not connect the records.

## Change the primary user

Choose **Make primary** on an active eligible assignment. Saving makes that person primary and changes the previous primary to a regular assigned user in the same operation. The application cannot promote an inactive, ineligible, missing, or removed assignment.

If the current primary is ineligible, first add or identify an eligible replacement, promote the replacement, and then remove the old assignment if appropriate.

## Remove an assigned user

A non-primary user can be removed while at least one active assignment remains. The server refuses removal of the primary and of the last assigned user. Removal takes the user off the active list while preserving the history of their assignment.

## Status and scope changes

You can change assignments only while the Proponent is active and has not been deleted. Inactive profiles retain their readable roster but cannot change it. When you save, the application checks your current permissions, eligible users, profile status, and assignments again. A page left open does not preserve permissions that have since been removed.

Changing the lead agency does not transfer profile access or change assignment eligibility. Agency-specific notes and independently assigned reviews still follow their own permission rules.

For example, Alex is the primary officer for Harbour Community Services and is handing the file to Samira. A user with `manage_assignments` first adds Samira, who must already have Contributor or Manager access globally or in an active Agency, then chooses **Make primary** for her. Alex can then be removed if no longer working on the file. Making Samira primary does not grant access to the organization's agreements; check those assignments separately.

## Boundaries

- A Proponent assignment does not grant access to another Proponent, a linked Agreement, an independently assigned review or recommendation, an agency, or a program.
- It does not create top-level Proponent permission. Creating a Proponent requires Contributor access globally or in an active Agency, which can differ from the selected lead agency. The application assigns its creator as primary when it saves the new profile.
- Approval and reviewer assignments remain separate workflow responsibilities.

For cross-entity coordination, use [Assignment Management](../admin/assignments.md). For the authorization model, see [Role permissions and exact assignments](../concepts/rbac.md).
