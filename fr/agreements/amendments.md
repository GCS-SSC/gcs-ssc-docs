# Modifications d'une entente

Utilisez l'onglet **Modifications** de l'entente pour préparer un changement contrôlé sans modifier directement le budget ou les activités courants. Une modification consigne son objet bilingue, les types et sous-types configurés, la durée proposée facultative, les instantanés isolés, l'historique d'approbation et la filiation des versions.

## Configuration et accès

Le volet de l'entente doit comporter des types de modification actifs. Chaque type indique la partie modifiée—par exemple `budget`, `duration` ou `activities`—et si au moins un sous-type associé est obligatoire. Pour soumettre une modification à l'approbation au moyen de l'API d'exécution, le volet doit aussi avoir un modèle d'approbation actif et valide pour `fundingcaseamendment`.

Les permissions `read`, `create`, `update` et `delete` sur l'entente régissent les actions correspondantes sur la modification. Une équipe exacte d'entente peut les fournir. Chaque écriture résout de nouveau et verrouille la portée de l'entente dans la transaction à autorisation renouvelée; l'identifiant de la modification doit appartenir à l'entente dans l'URL.

Une entente ne peut avoir qu'une seule modification active à l'état `draft` ou `pendingapproval`. Une modification approuvée, refusée, annulée ou supprimée logiquement n'empêche pas la création d'un nouveau brouillon.

## Liste et création

La liste est paginée côté serveur et triée par numéro de modification, puis par identifiant, du plus récent au plus ancien. L'interface recherche localement dans la page chargée selon le numéro, le nom anglais ou français, l'état et les noms de types. Elle affiche les pastilles de types et la présence d'instantanés de budget ou d'activités.

La création exige :

- au moins un nom en anglais ou en français;
- au moins un type de modification actif et unique du volet courant de l'entente;
- pour chaque type sélectionné qui exige un sous-type, au moins un sous-type actif sélectionné et lié à ce même type et volet.

Un sous-type extérieur aux types sélectionnés, une fiche inactive, un doublon ou une fiche d'un autre volet est rejeté. Un type de durée initialise les dates proposées à partir des dates courantes d'aide autorisée de l'entente. La nouvelle modification commence à l'état `draft`, sans numéro.

## Espace de détail et portée

La page de détail comporte les onglets **Général**, **Budget**, **Activités** et **Recommandation**. Général est modifiable uniquement à l'état `draft`; les fiches terminales conservent leurs pastilles de types et de sous-types comme historique.

Dans Général, vous pouvez changer le nom bilingue, les types, les sous-types et—lorsqu'un type de durée est sélectionné—les deux dates proposées d'aide autorisée. Au moins une langue et un type demeurent obligatoires. Les deux dates de durée sont exigées ensemble et la fin doit être égale ou postérieure au début.

Après la création d'un instantané, son type habilitant ne peut pas être retiré : un instantané de budget exige un type `budget` ou `duration`, et un instantané d'activités exige `activities`. Les changements de durée proposés doivent continuer de chevaucher chaque exercice actif de l'instantané budgétaire de la modification.

## Instantané du budget

Un brouillon doté de la capacité `budget` ou `duration` peut copier une fois le budget courant. La copie contient tous les exercices et lignes actifs et conserve les identités logiques stables tout en recevant des lignes physiques distinctes.

Les capacités demeurent distinctes :

| Capacité sélectionnée | Changements permis dans l'instantané |
| --- | --- |
| `budget` | Créer, modifier et supprimer logiquement des lignes budgétaires. |
| `duration` | Créer, changer et supprimer logiquement des groupes d'exercice dans les dates proposées. Supprimer un exercice supprime aussi logiquement ses lignes copiées. |
| les deux | Les deux ensembles de commandes. |

La création ou la modification d'un exercice vérifie son appartenance à un budget actif du volet et son chevauchement avec les dates proposées. Un exercice utilisé par une réclamation, un paiement ou une ligne de réclamation actifs ne peut pas être supprimé. Une ligne stable utilisée par une ligne de réclamation active ne peut être ni déplacée ni supprimée. Les champs et la validation monétaire correspondent autrement à [Budget de l'entente](./budget.md).

::: warning Limitation de capacité dans les instantanés de modification
Les routes propres aux lignes budgétaires d'une modification valident l'appartenance, la capacité de type, les totaux du schéma et la portée de la ligne de coûts, mais n'exécutent pas le contrôle de capacité du volet entre les ententes du budget courant. La promotion n'ajoute pas ce contrôle. Avant l'approbation, confirmez manuellement que le financement de programme proposé respecte le budget du volet et son seuil de surengagement; la réussite de l'enregistrement de l'instantané ne prouve pas la capacité.
:::

## Instantané des activités

Un brouillon doté de la capacité `activities` peut copier une fois la version courante des activités, y compris les sélections de résultats et de responsables. L'onglet Activités de la modification offre ensuite les mêmes champs bilingues obligatoires, la même plage de dates, les mêmes résultats actifs du programme et les mêmes bénéficiaires actifs de l'entente que ceux décrits dans [Activités de l'entente](./activities.md), mais tous les changements demeurent dans l'instantané.

Les routes d'activités exigent l'existence de l'instantané brouillon. La création, la modification et la suppression utilisent la permission correspondante sur l'entente. La suppression est logique et vise l'activité copiée ainsi que les deux familles de liens de sélection.

## Approbation, promotion et révision

Le moteur d'approbation prend en charge la séquence suivante :

1. matérialiser le modèle publié d'approbation des modifications du volet pendant que la modification est `draft`;
2. faire passer la modification et la fiche d'acheminement à `pendingapproval`;
3. traiter l'étape courante affectée, les attestations, la réaffectation et les approbations supplémentaires permises au moyen du moteur d'approbation généralisé;
4. en cas de refus, faire passer les deux fiches à `denied`;
5. à l'approbation finale, promouvoir atomiquement la modification.

La promotion vérifie toute durée proposée par rapport à l'instantané choisi, ou au budget courant en l'absence d'instantané. Elle applique les dates proposées, attribue le prochain numéro de modification, promeut le contenu des instantanés dans de nouvelles versions de travail courantes du budget et des activités, conserve la modification et la filiation des versions sources, puis fait passer la modification à `approved`. Si la validation de promotion échoue, la décision d'approbation finale est annulée.

Le chemin de promotion courant n'insère **pas** de fiche `Funding_Case_Agreement_Revision`. N'utilisez pas cette table comme preuve qu'une modification approuvée possède un point de contrôle de révision persistant; utilisez la modification, la fiche d'acheminement et la filiation des versions de budget et d'activités réellement écrites par le moteur.

::: warning Interface principale des modifications incomplète
L'onglet **Recommandation** courant affiche uniquement un texte explicatif. Il n'affiche ni formulaire de recommandation, ni section d'approbation, ni action qui matérialise la chaîne d'approbation. Le moteur généralisé côté serveur prend en charge `fundingcaseamendment`, mais la page principale ne peut ni soumettre le brouillon ni afficher ou traiter ses étapes. On peut donc préparer et annuler un brouillon dans l'interface principale, mais pas l'y faire approuver. Ne considérez pas l'approbation comme terminée à cause de l'onglet provisoire; utilisez seulement une intégration autorisée et prise en charge jusqu'à la réalisation de l'interface.
:::

## Annulation, suppression et reprise

**Annuler** est disponible pour `draft` et `pendingapproval`. L'action fait passer la modification et toute fiche d'acheminement brouillon ou en attente à `cancelled`; elle ne supprime ni la fiche ni ses instantanés. L'annulation est terminale et permet un nouveau brouillon.

La suppression exige l'accès de suppression sur l'entente et est permise uniquement à l'état `draft`. Elle supprime logiquement, dans une transaction, les lignes et exercices budgétaires copiés, les activités et leurs liens de sélection, les deux versions d'instantané, les liens de types et de sous-types ainsi que la modification. Une modification approuvée, refusée, annulée ou en attente d'approbation ne peut pas être supprimée par cette route.

Il n'existe aucune commande de rétablissement. Après une annulation ou une suppression accidentelle, conservez la piste d'audit et demandez à une personne autorisée d'évaluer la reprise plutôt que de recréer l'historique sous la même identité.

## Guides connexes

- [Ententes de financement](./index.md)
- [Budget de l'entente](./budget.md)
- [Activités de l'entente](./activities.md)
- [Approbations et réalisations](../concepts/approvals-completions.md)
- [Modèles d'approbation](../programs/approval-templates.md)
