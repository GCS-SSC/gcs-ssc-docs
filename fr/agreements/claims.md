# Réclamations et rapprochement d’entente

Utilisez une réclamation pour consigner les coûts soumis par un promoteur pour une période de l’entente. Utilisez un rapprochement pour consigner votre examen : le montant accepté par rapprochement, le montant échantillonné pour examen et toute explication. Un rapprochement possède ses propres examinateurs affectés et peut être désigné comme examen final de la réclamation.

## Avant de commencer

Ouvrez une entente, puis sélectionnez **Réclamations**. L’entente doit posséder une version budgétaire courante avec au moins un exercice et une ligne budgétaire. Les références de la réclamation et de ses lignes utilisent les identités budgétaires stables; une modification peut donc remplacer la version courante sans changer leurs identifiants logiques.

| Action | Accès requis |
| --- | --- |
| Parcourir les réclamations, ouvrir les détails et consulter les soumissions ou les rapprochements | Accès Lecteur Entente; aucune affectation exacte. |
| Créer une réclamation | Accès Contributeur et affectation à l’entente; le créateur devient principal de la réclamation. |
| Créer ou modifier des lignes; attribuer, soumettre, retirer, annuler ou modifier une réclamation | Accès Contributeur et affectation à la réclamation. |
| Créer un rapprochement | Accès Contributeur et affectation à la réclamation; le créateur devient principal du rapprochement. |
| Créer ou modifier des lignes de rapprochement; achever ou changer l’indicateur final | Accès Contributeur et affectation à ce rapprochement. |
| Supprimer une réclamation ou une ligne par son API | Accès Gestionnaire et affectation à la réclamation. |
| Supprimer un rapprochement ou une ligne de rapprochement par son API | Accès Gestionnaire et affectation à ce rapprochement. |

Lecteur Entente consulte les réclamations. La création d’une réclamation exige Contributeur et l’affectation à l’entente, puis rend le créateur principal.

La création d’un rapprochement exige Contributeur et l’affectation à la réclamation, puis rend le créateur principal du rapprochement. Les mutations suivantes exigent l’affectation à la réclamation ou au rapprochement et Contributeur ou Gestionnaire.

L’accès à un volet, un budget, une soumission ou une entente liés ne donne pas le droit de modifier la réclamation ou le rapprochement. Le serveur revérifie vos permissions à l’enregistrement et verrouille les dossiers liés dans un ordre constant pour éviter les modifications concurrentes.

## Parcourir et créer des réclamations

La liste regroupe les réclamations par exercice et affiche leur identifiant, période d’avril à mars, statut, total soumis et montants rapprochés avec succès. Le travail de rapprochement en brouillon ou infructueux ne compte pas comme rapprochement terminé. La recherche couvre les libellés et totaux affichés.

Les actions de modification et suppression visent la réclamation individuelle. Développez le groupe et confirmez son identifiant avant d’agir; plusieurs réclamations peuvent appartenir au même exercice.

| Champ de la réclamation | Règle |
| --- | --- |
| Promoteur | Promoteur actif obligatoire lié à cette entente. Le serveur revérifie ce lien à la création ou au remplacement. |
| Exercice | Identité stable obligatoire d’un exercice de la version courante du budget de l’entente. |
| Date de réception | Date et heure obligatoires; le formulaire recueille une date civile. |
| Début et fin de la période | Indices obligatoires de `0` (avril) à `11` (mars); la fin ne peut précéder le début. |
| Finale pour l’exercice | Indicateur booléen obligatoire et descriptif; la base de données ne limite pas un exercice à une seule réclamation ainsi marquée. |

Une réclamation reçoit le statut métier Brouillon protégé de l’organisme. Les modifications ordinaires conservent ce statut. La suppression autorisée reste logique et retire ses lignes et rapprochements dans la même transaction, sans effacer l’historique.

Un changement d’exercice est refusé lorsque des lignes actives attribuées référencent encore un autre exercice. Le serveur valide la destination dans le budget courant de l’entente et la paire de dates résultante lors d’une modification partielle. Corrigez l’allocation ou préparez la réclamation voulue avant l’achèvement; changer l’en-tête ne déplace pas les lignes.

## Préparer la soumission

L’onglet **Soumission** regroupe les lignes budgétaires de l’exercice courant selon la catégorie de coûts bilingue et la sous-section. Il affiche les montants soumis, rapprochés et le solde. La recherche porte sur la catégorie, la sous-section, le nom bilingue de la ligne ou sa description.

1. Sélectionnez l’action de modification de la ligne budgétaire voulue. La boîte **Modifier le montant soumis** affiche son montant enregistré.
2. Saisissez le montant demandé au programme et sélectionnez **Enregistrer**. Utilisez la devise de l’entente et des montants de zéro ou plus. Seule cette ligne est modifiée. Un nouveau montant nul ne crée aucune ligne; une ligne existante peut être mise à zéro.
3. Après une erreur, corrigez le montant dans la boîte. Si la réponse ou l’actualisation est incertaine, rechargez et vérifiez la ligne enregistrée avant de réessayer.

**Détails techniques pour les intégrations :** l’API hôte prend aussi en charge la description, la devise, les libellés soumis facultatifs de catégorie, sous-section et ligne, le déplacement vers une autre réclamation modifiable et la suppression logique. Ces commandes supplémentaires de création, de modification et de suppression sont disponibles par l’API plutôt que dans la grille actuelle. La base dérive l’entente de chaque ligne à partir de sa réclamation et utilise des clés étrangères composites pour garder toute ligne budgétaire sélectionnée dans cette entente.

Les lignes importées en double s’affichent séparément, même dans une réclamation modifiable. Confirmez la ligne précise avant de la modifier. Chaque doublon compte encore dans les totaux; modifier une ligne ne change pas les autres. Corrigez les doublons involontaires pendant que la réclamation est modifiable.

**Détail technique :** aucune contrainte d’unicité active n’existe pour `(réclamation, ligne budgétaire)`. Les requêtes API directes et les importations peuvent donc créer des doublons.

### Lignes importées non attribuées

Les lignes importées peuvent arriver sans ligne budgétaire correspondante. Si vous avez l’accès Contributeur et êtes affecté à la réclamation, liez chacune de ces lignes à une ligne compatible du budget courant pendant que la réclamation est modifiable.

Terminez ces attributions avant Achèvement. La réclamation doit avoir au moins une ligne et aucune ligne non attribuée. L’attribution ne peut pas déverrouiller une réclamation achevée ou dont le statut métier est en lecture seule.

## Soumettre, retirer ou annuler

Utilisez Achèvement après avoir enregistré et vérifié les lignes. L’action exige l’affectation à la réclamation, le niveau Contributeur, un statut modifiable, aucun achèvement antérieur, au moins une ligne active et aucune ligne non attribuée. Un flux actif bloque également l’action.

Achèvement consigne `no_workflow` ou `workflow_started`. Si une soumission d’approbation est configurée, suivez ses examens et approbations. La réclamation devient admissible au rapprochement seulement après une **issue réussie de l’achèvement** : immédiatement sans flux, ou après sa réussite. Un libellé de statut ne prouve pas cette admissibilité. Les flux standard se choisissent explicitement et ne remplacent pas Achèvement.

Le retrait et l’annulation agissent sur le flux actif; ils n’attribuent pas de codes métier fixes `withdrawn` ou `cancelled`. Le retrait est refusé dès qu’un historique de rapprochement existe. Sans flux actif, ces actions n’ont aucun flux à annuler. Le statut d’annulation publié détermine la transition. Achèvement demeure une preuve historique et ne s’annule pas en soumettant de nouveau le formulaire.

## Créer et comparer les rapprochements

La réclamation doit avoir atteint une issue réussie de l’achèvement, toutes ses lignes actives doivent être attribuées et aucun rapprochement final terminé avec succès ne doit exister. La création exige Contributeur et l’affectation à la réclamation; le créateur devient principal dans le registre indépendant du rapprochement.

Un seul rapprochement peut être ouvert à la fois. L’historique terminé ou annulé reste consultable. Le nouveau rapprochement reçoit le statut Brouillon de l’organisme. Si configuré, son démarrage applique à la réclamation le statut de début de rapprochement de l’organisme.

Le marqueur final désigne le rapprochement destiné à terminer la réclamation; l’unicité finale ouverte est protégée en base.

| Champ | Contrat |
| --- | --- |
| Montant rapproché | Montant exact `numeric(19,2)` obligatoire, stocké et transmis en texte décimal. |
| Montant échantillonné | Montant exact facultatif. |
| Justification | Texte facultatif expliquant l’évaluation de la ligne. |

L’enregistrement d’un rapprochement diffère de celui d’une soumission : toutes les lignes sont enregistrées ensemble. Si l’enregistrement échoue, aucune de ses modifications n’est conservée. Si les lignes de la réclamation ont changé pendant votre examen, rechargez et comparez votre brouillon à la réclamation courante avant de réessayer. Cela s’applique même si vous modifiez une seule rangée.

**Contrat technique :** la transaction groupée enregistre toutes les lignes et, facultativement, le marqueur final. Chaque ligne courante de réclamation doit figurer exactement une fois et les identifiants enregistrés des lignes de rapprochement doivent encore correspondre. Un ensemble périmé ou non concordant fait échouer toute la transaction.

Les montants rapprochés et échantillonnés utilisent le format monétaire qui permet les ajustements négatifs. Cela ne s’applique pas aux montants soumis du programme ni aux coûts totaux, qui doivent être non négatifs.

Enregistrer ou achever ne prouve pas que l’échantillon est inférieur au rapprochement ni que le total correspond à la soumission.

Les contrôles budgétaires annuels décrits ci-dessous s’appliquent. Appliquez la politique de l’organisme et expliquez les écarts. L’interface présente les montants soumis, rapprochements antérieurs réussis, rapprochement courant et solde pour soutenir le jugement; les calculs monétaires sont exacts.

Par exemple, un promoteur soumet 1 000,00 pour de la formation. Un rapprochement antérieur réussi a comptabilisé 600,00, ce qui laisse 400,00 avant votre examen courant (1 000,00 − 600,00). Un montant en brouillon n’est pas un rapprochement historique réussi. Vérifiez la portée affichée avant d’interpréter un total cumulatif et expliquez tout écart par rapport au montant restant.

L’annulation ferme le rapprochement, retire son marqueur final et annule son flux actif.

Sans flux actif, un statut d’annulation de soumission configuré s’applique lorsqu’il existe; sans configuration, le brouillon peut quand même être fermé. La preuve est conservée et la place ouverte libérée pour un nouveau rapprochement.

## Achèvement, approbation et flux de travail

Enregistrez avant de choisir Achever. L’action exige l’affectation propre au rapprochement et le accès Contributeur, un dossier ouvert modifiable, aucun achèvement antérieur, aucun rapprochement final réussi et au moins une ligne active. Les commentaires sont facultatifs. Ces contrôles n’imposent ni égalité financière ni justification obligatoire.

La transaction commune démarre le flux de soumission `fundingclaimreconcile` sélectionné lorsqu’il existe; sinon elle consigne `no_workflow`. Les modèles d’approbation prennent effet par ce flux publié. La section Flux partagée expose examens, recommandations, approbations, annulation et reprise. Un modèle configuré sans intégration au flux ne suffit pas.

À l’issue réussie de l’achèvement, le rapprochement ferme. S’il est final, la réclamation peut recevoir le statut final configuré par l’organisme et tout rapprochement ultérieur est bloqué. Le statut n’est pas fixé à `reviewed`. Un échec ou une annulation ne constitue pas une finalité réussie. Examinez la tentative et ses actions de reprise ou d’annulation au lieu d’achever deux fois le même dossier.

## États verrouillés et reprise

Les statuts en lecture seule ou terminaux, la preuve d’achèvement, la fermeture et le rapprochement final réussi régissent l’édition. Le serveur vérifie aussi l’entente propriétaire et les flux actifs; un bouton visible ne permet pas de contourner un changement d’état ultérieur.

Après un échec d’enregistrement du montant soumis, vérifiez la ligne choisie et rechargez après une réponse incertaine. Les autres lignes sont enregistrées séparément.

Après un échec groupé de rapprochement, la transaction est annulée; corrigez les champs ou rechargez l’ensemble périmé.

Si une lecture échoue après une écriture réussie, reprenez la lecture avant de soumettre à nouveau.

Si Achèvement est indisponible, vérifiez attribution, lignes, affectation indépendante, statut et flux actifs. Annulez un rapprochement ouvert inutile par l’action prévue au lieu de créer des dossiers concurrents.

## Contrat de développement

Les routes sous l’entente gèrent les mutations financières et de réclamation. `/api/claim-reconciliations/{id}` fournit le détail affecté indépendamment; `/api/claim-reconciliations/{id}/lines/bulk` fournit l’édition atomique de l’ensemble complet. Achèvement et Flux utilisent les API typées partagées. L’ancienne transition ready-for-review retirée n’est plus le contrat de soumission.

Tous les identifiants publics de réclamation, rapprochement et budget stable sont des chaînes bigint décimales. Le rapprochement utilise `fundingclaimreconcile` et la réclamation `fundingcaseagreementclaim`. Les identités typées et clés composites protègent la propriété; les verrous d’agrégat réautorisés sérialisent les écritures. Les corps utilisent Zod localisé et les chaînes monétaires exactes; les échecs suivent l’enveloppe standard.

Consultez [Budget](./budget.md), [Prévisions](./forecasts.md), [Paiements](./payments.md), [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).

## Ventilation du financement et contrôles budgétaires annuels

Une ligne financière indique comment un coût sera payé : le montant demandé au programme, le coût total et les montants provenant d’autres sources. Ces sources sont classées selon les sous-types de financement configurés pour le volet.

Enregistrez d’abord la ligne mensuelle ou soumise, puis utilisez son éditeur de financement pour saisir le coût total et les autres sources. Choisissez chaque sous-type une seule fois. Les choix proviennent de ce volet; une allocation existante peut conserver son sous-type retiré.

Le coût total ne peut être inférieur au financement du programme. Dès que des autres sources sont saisies, leur somme avec le programme doit égaler exactement le coût total.

Votre volet peut exiger une ventilation pour les prévisions, les réclamations, les deux ou aucune des deux. Lorsqu’elle l’est, chaque ligne active doit avoir au moins une allocation d’autres fonds enregistrée et une ventilation exactement équilibrée avant Achèvement. Chaque version de prévision a son propre achèvement et est vérifiée séparément.

Par exemple, un équipement de 1 000,00 peut être financé par 700,00 du programme et 300,00 d’une autre source : 700,00 + 300,00 = 1 000,00. Saisir seulement 250,00 de cette source laisse un écart de 50,00; la ventilation ne peut donc pas être enregistrée comme équilibrée.

Un import de brouillon peut laisser du travail à terminer; examinez les lignes enregistrées avant l’achèvement.

L’enregistrement des lignes et l’achèvement vérifient aussi le budget annuel courant dans la devise de l’entente.

Chaque version de prévision saisie est vérifiée séparément par rapport aux limites annuelles; les versions sont des estimations différentes, dont les montants ne sont pas additionnés entre elles.

Les réclamations partagent la limite annuelle avec les autres réclamations actuellement comptées. Une réclamation cesse d’utiliser cette capacité lorsque son issue courante enregistrée est sans succès, refusée, annulée ou en échec. Modifier seulement le libellé de statut affiché ne libère pas le montant.

Pour les rapprochements, le contrôle comprend votre montant proposé et les rapprochements antérieurs réussis. Les réclamations ou dossiers à issue négative sont exclus.

Le plafond annuel est le financement courant du programme pour cet exercice et cette devise. Le coût total et les autres sources suivent leurs règles d’équilibre par ligne, mais n’ont pas de plafonds annuels distincts. Les montants rapprochés comptent dans le plafond du programme.

Par exemple, 10 000 de financement annuel du programme avec une réclamation comptée de 6 000 laisse 4 000 pour une autre réclamation. Une proposition de 4 500 échoue même si son promoteur ou sa ligne de coûts diffère.

Les réductions de réclamation appliquées libèrent de la capacité annuelle pour les réclamations et rapprochements dans l’exercice de la réclamation d’origine. Un plan en brouillon, la comptabilisation de la dette ou un remboursement partiel ne libère pas cette capacité. La réduction s’applique lorsque la créance comptabilisée est entièrement soldée. Elle ne peut ramener l’utilisation comptée d’une réclamation sous zéro ni transférer un crédit excédentaire à une autre réclamation.

Par exemple, avec un financement annuel du programme de 120 000, une réclamation comptée de 30 000 laisse 90 000. Une créance entièrement soldée avec une réduction appliquée de 10 000 ramène l’utilisation comptée à 20 000 et permet une autre réclamation de 100 000. Une proposition de 100 000,01 échoue encore. La réclamation soumise d’origine reste inchangée.

Actualisez le budget courant, les dossiers comptés et les [Créances](./receivables.md), corrigez le montant ou appliquez une modification autorisée avant de réessayer. Les réductions budgétaires utilisent une règle supplémentaire pour les encaissements comptabilisés, expliquée dans [Modifications](./amendments.md); elle ne libère pas de capacité pour une nouvelle réclamation avant l’application de la réduction.
