# Modifications d'une entente

Utilisez l'onglet **Modifications** de l'entente pour préparer un changement contrôlé sans modifier directement le budget ou les activités courants. Une modification consigne son objet bilingue, les types et sous-types configurés, la durée proposée facultative, les instantanés isolés, l'historique d'approbation et la filiation des versions.

## Configuration et accès

Le volet de l’entente doit comporter des types de modification actifs. Chaque type indique la partie modifiée — `budget`, `duration` ou `activities` — et si un sous-type associé est obligatoire. Pour soumettre dans l’interface principale, le volet doit aussi avoir un flux `approval_submission` publié pour `fundingcaseamendment`, un ensemble de recommandations publié et au moins une étape d’approbation publiée.

Les plafonds de rôle Entente Lecteur, Contributeur et Gestionnaire régissent la lecture, la création ou modification et la suppression. L’utilisateur doit aussi posséder l’affectation exacte à l’entente pour créer l’enfant, puis l’affectation propre à la modification pour les actions suivantes; la création rend le créateur principal. Chaque écriture résout et verrouille de nouveau la portée et l’affectation dans une transaction à autorisation actualisée. L’identifiant doit appartenir à l’entente de l’URL.

Une entente ne peut avoir qu'une seule modification active à l'état `draft` ou `pendingapproval`. Une modification approuvée, refusée, annulée ou supprimée logiquement n'empêche pas la création d'un nouveau brouillon.

## Liste et création

La liste est paginée côté serveur et triée par numéro de modification, puis par identifiant, du plus récent au plus ancien. L'interface recherche localement dans la page chargée selon le numéro, le nom anglais ou français, l'état et les noms de types. Elle affiche les pastilles de types et la présence d'instantanés de budget ou d'activités.

La création exige :

- au moins un nom en anglais ou en français;
- au moins un type de modification actif et unique du volet courant de l'entente;
- pour chaque type sélectionné qui exige un sous-type, au moins un sous-type actif sélectionné et lié à ce même type et volet.

Un sous-type extérieur aux types sélectionnés, une fiche inactive, un doublon ou une fiche d'un autre volet est rejeté. Un type de durée initialise les dates proposées à partir des dates courantes d'aide autorisée de l'entente. La nouvelle modification commence à l'état `draft`, sans numéro.

## Espace de détail et portée

La page de détail comporte les onglets **Général**, **Budget**, **Activités**, **Recommandation** et **Utilisateurs affectés**. Général n’est modifiable qu’à l’état `draft`; les dossiers terminaux conservent leurs badges de type et de sous-type et leur registre d’affectation comme historique.

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

Les routes d'activités exigent l'existence de l'instantané brouillon. La création ou la modification exige un plafond de rôle Entente Contributeur et l'affectation exacte à la modification; la suppression exige Gestionnaire et cette même affectation. La suppression est logique et vise l'activité copiée ainsi que les deux familles de liens de sélection.

## Approbation, promotion et révision

L’onglet **Recommandation** affiche maintenant le flux de soumission d’approbation. Son démarrage pendant que la modification est `draft` crée atomiquement l’exécution et un dossier immuable de schéma version 1 avec heure de soumission et hachage canonique SHA-256. Le dossier comprend l’identité bilingue, les types et sous-types choisis et seulement les domaines modifiés : version budgétaire proposée, version d’activités et/ou dates de durée. Le profil d’entente et les promoteurs inchangés ne sont pas dupliqués.

Les membres de recommandation s’exécutent depuis leurs schémas publiés figés et peuvent employer des approbations de membre ou finale. Le dossier est présenté depuis le JSON enregistré dans des sections groupées et repliables; les libellés de référence modifiables sont résolus à la soumission afin qu’un renommage ultérieur ne change pas la preuve.

Pendant l’exécution, les mutations concurrentes sur l’entente, la modification, les instantanés, le cycle de vie et la suppression sont verrouillées. L’annulation du flux lui-même constitue l’exception : la section Flux de travail peut terminer l’exécution active et ses enfants sans changer les données sources du dossier. En cas d’échec ou de refus, l’état d’échec configuré s’applique et aucun instantané n’est promu. En cas de réussite, le moteur recalcule le hachage, promeut seulement les domaines présents dans le dossier approuvé, applique les dates, ferme et numérote la modification, écrit une `Funding_Case_Agreement_Revision` liée de façon unique à la soumission et applique l’état de réussite. La promotion et la révision sont dans la même transaction.

Un approbateur affecté peut lire le dossier exact requis pour sa décision. La modification de l’amendement ou de la recommandation exige toujours l’affectation exacte correspondante et le plafond Contributeur; l’affectation à l’approbation n’accorde pas l’accès général à l’entente.

## Annulation, suppression et reprise

La commande **Annuler** de la modification est affichée tant que celle-ci demeure ouverte, mais le serveur refuse cette demande de cycle de vie pendant une soumission active. Annulez d’abord l’exécution active dans la section Flux de travail; cette action annule ses enfants actifs. Utilisez ensuite **Annuler** sur la modification pour annuler tout bordereau brouillon ou en attente restant, passer la modification à `cancelled` et la fermer sans supprimer le dossier ni les instantanés. L’annulation de la modification est terminale et permet un nouveau brouillon.

La suppression exige un plafond de rôle Entente Gestionnaire et l'affectation exacte à la modification et est permise uniquement à l'état `draft`. Elle supprime logiquement, dans une transaction, les lignes et exercices budgétaires copiés, les activités et leurs liens de sélection, les deux versions d'instantané, les liens de types et de sous-types ainsi que la modification. Une modification approuvée, refusée, annulée ou en attente d'approbation ne peut pas être supprimée par cette route.

Il n'existe aucune commande de rétablissement. Après une annulation ou une suppression accidentelle, conservez la piste d'audit et demandez à une personne autorisée d'évaluer la reprise plutôt que de recréer l'historique sous la même identité.

## Guides connexes

- [Ententes de financement](./index.md)
- [Budget de l'entente](./budget.md)
- [Activités de l'entente](./activities.md)
- [Approbations et réalisations](../concepts/approvals-completions.md)
- [Modèles d'approbation](../programs/approval-templates.md)
