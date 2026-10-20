# Publish guided help

Use **Management > Guided Help** to write instructions that appear beside application controls. You can create a guide for the System or an Agency, reuse a shared guide, and choose which Agency staff can open it.

Publish the guide to save a version of its content. Then publish the Agency settings to make that version available to readers. Complete both steps.

## Check access

Your role needs Guided Help permissions for the System or Agency that owns the guide. System guides require global scope. Agency guides and their publication settings require the relevant Agency scope. Program scope and record assignments do not grant guide management access.

- Read lets you view guides and publication settings.
- Create lets you create a guide, add a published guide to an Agency catalog, or make an Agency copy.
- Update lets you edit and publish guides or Agency settings, and unpublish Agency settings.
- Delete lets you retire a guide or delete an unreferenced draft.

Readers do not need guide management permission. They need an active role included in the Agency's published audience. They also need permission to read the screen or record where the guide starts. The guide does not grant permission to change business data.

## Write a guide

1. Open **Guided Help** and expand the System or Agency group you manage.
2. Select **Create guide**. In **General**, enter the English and French title and description.
3. Leave **Workflow journey** as **Standard guide** for a sequence of instructions. For a risk workflow, see [Guide an Agreement risk workflow](#guide-an-agreement-risk-workflow).
4. Open **Flow** and add a step. Choose its **Screen** and **Control**. Enter a title and instructions in both languages.
5. Choose **Highlight the control** to draw attention to it, or **Popover only** to keep the whole page available beside the instructions.
6. Choose how the reader advances. **After completing the action** advances after a supported action succeeds. **Next button only** lets the reader advance through explanations. Required actions, such as opening a dialog or saving, must finish before the reader can continue.
7. Save the step dialog, then select the guide's **Save** button to save the working draft.
8. Preview the complete guide, correct any errors, and select **Publish**.

You can save an incomplete draft. To preview or publish it, complete both languages and include at least one step with a valid screen and control. In each language, titles allow 255 characters, descriptions 4,000, and step instructions 8,000. A guide allows at most 100 steps.

Instructions support bold, italic, inline code, links, and line breaks. Do not insert HTML, scripts, or template expressions. Write one clear action per step and use the control's visible label.

**Select on screen** lets you open the intended screen and select a supported control. Return to the editor, review the selection, and save the guide. Picking a control does not publish or save the guide to the server.

Preview uses real application controls. Entering data, saving, or completing work in preview can change live records. Use an appropriate test record when checking instructions.

## Add choices to a standard guide

In **Flow**, select a step's branch control to open **Manage branches**. Choose a supported choice field or checkbox on that screen, its value, and the later step to open. Add conditions in the order to evaluate them. Set **Otherwise, go to** for an unmatched value, or select **End guide**.

Branches can lead only to later steps or the end. The same field and value cannot appear twice in one decision. If an incoming branch uses a step you want to remove, change that branch first. Update the branches before moving a step if the move would send a branch backwards.

For example, branch on **Agreement type** after the reader selects a type. Route **Repayable** to repayment instructions, then to the final Save step. Route the other types directly to Save. Include both language versions of the repayment instructions and test both paths. The branch changes the instructions shown, not the Agreement type rules.

## Make the guide available to an Agency

1. Publish the source guide. Enable **Offer published versions to all agencies** if other Agencies may reuse it.
2. In the receiving Agency group, select **Add to agency** for the source guide.
3. In **Agency publication settings**, select the **Source version**, **Discovery screens**, and **Audience roles**.
4. Select **Save**, review the selected version, then select **Publish**.
5. Ask a staff member with a selected active role and screen access to open that screen and select **Guide**.

Select at least one discovery screen and one audience role. Audience roles must be active global roles or roles belonging to that Agency. Available starting screens include Agency General, Address types, Agreement types, the Agreements list, Agreement Risk Rating, and Assessment work. Some screens are available only inside a running guide and cannot be starting screens.

For example, publish an **Add an address type** guide with steps for Add, English name, French name, and Save. Add it to your Agency with Address types as the discovery screen and your configuration staff role as the audience. Staff see **Guide** on that screen after you publish the Agency settings.

The Agency settings select a specific published source version. A later source publication does not update readers automatically. Select the new version, save the settings, and publish them when ready. Saving changes alone leaves the previous published settings in use.

Use **Make a copy** when your Agency needs different instructions. The copy is a separate private Agency draft with the source owner and version recorded. Edit and publish it, then publish its Agency settings. Changing the original does not change the copy.

## Guide an Agreement risk workflow

Choose **Assess an agreement's risk** under **Workflow journey**. Write instructions for each stage in this order:

1. Choose your Agreement.
2. Start the risk workflow.
3. Complete the workflow tasks.
4. Confirm the final result.

Write general instructions for the workflow task list. Add **Assessment walkthrough** or **Checklist walkthrough** instructions for those task types. The editor limits each stage and task type to its supported screens. Every stage needs instructions before publication. Remove standard branching routes before selecting a workflow journey.

Publish the guide and its Agency settings with the Agreements list as a discovery screen. A reader selects an Agreement from that Agency and follows the current risk workflow. The guide follows that Agreement and its specific workflow tasks. A task can remain pending until another assigned person completes their work. Reaching the end of the guide does not approve or complete the underlying workflow.

## Update or withdraw guidance

**Published version history** preserves each published guide, its version, publisher, and publication time. Saving edits creates unpublished changes beside the current version. Publish again to release those changes.

Use **Unpublish** in the Agency publication settings to stop offering that Agency entry to new readers. Save pending settings changes before this action. You can publish the settings again later.

Use **Retire** on a source guide to stop editing it and prevent Agencies from adding it to their catalogs. Existing Agency entries keep their selected published versions. Review and unpublish those entries separately if readers must stop launching them. A retired guide cannot be edited. Delete is available only for a draft with no Agency reference.

A running guide keeps the version it launched. When browser-tab storage is available, it remembers your position for the same signed-in user. Exiting clears the guide. Logging out or changing users clears the session. Launch the guide again to use newly published content.

## Resolve publication and reader problems

| Problem | What to do |
| --- | --- |
| You cannot see an owner group or action. | Check your active Guided Help role and its System or Agency scope. |
| Preview or publication reports incomplete content. | Fill both languages and check every step's screen and control. |
| A control or branch is incompatible. | Open the indicated step, select a supported control or choice, then preview and republish. Agency entries need the corrected source version and another publication. |
| A save or publication reports a conflict. | Reload, review the saved draft and current version, then apply your changes again. |
| An audience role cannot be selected or saved. | Check that it is active and belongs to the Agency or global scope. |
| Readers cannot see Guide. | Check Agency publication, selected version, discovery screen, active audience role, and screen access. Retrying the page does not grant access. |
| A journey is waiting or shows the wrong record or task. | Wait for loading to finish. Return to the selected Agreement and exact task. Check assignments and the current workflow state if work is blocked. |
| A shared guide is no longer offered. | Keep the Agency's retained version, or make a copy of that retained version. New source versions are not automatically available. |

For the reader's controls and recovery steps, see [Navigation](../getting-started/navigation.md#use-a-guide).
