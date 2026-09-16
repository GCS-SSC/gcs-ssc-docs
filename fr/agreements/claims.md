# Réclamations et rapprochement d’entente

Les réclamations consignent les coûts reçus pour une période financière de l’entente. Les rapprochements sont des dossiers distincts, attribués à un examinateur, qui évaluent les lignes soumises, consignent les montants rapprochés et échantillonnés et peuvent être désignés comme rapprochement final de la réclamation.

## Avant de commencer

Ouvrez une entente, puis sélectionnez **Réclamations**. L’entente doit posséder une version budgétaire courante avec au moins un exercice et une ligne budgétaire. Les références de la réclamation et de ses lignes utilisent les identités budgétaires stables; une modification peut donc remplacer la version courante sans changer leurs identifiants logiques.

| Action | Accès requis |
| --- | --- |
| Parcourir les réclamations, ouvrir les détails et consulter les soumissions ou les rapprochements | Plafond Entente Lecteur; aucune affectation exacte. |
| Créer une réclamation | Plafond Contributeur et affectation exacte à l’entente; le créateur devient principal de la réclamation. |
| Créer ou modifier des lignes; attribuer, soumettre, retirer, annuler ou modifier une réclamation | Plafond Contributeur et affectation exacte à la réclamation. |
| Créer un rapprochement | Plafond Contributeur et affectation exacte à la réclamation; le créateur devient principal du rapprochement. |
| Créer ou modifier des lignes de rapprochement; achever ou changer l’indicateur final | Plafond Contributeur et affectation exacte au rapprochement. |
| Supprimer une réclamation ou une ligne par son API | Plafond Gestionnaire et affectation exacte à la réclamation. |
| Supprimer un rapprochement ou une ligne de rapprochement par son API | Plafond Gestionnaire et affectation exacte au rapprochement. |

Lecteur Entente consulte les réclamations. La création d’une réclamation exige Contributeur et l’affectation exacte à l’entente, puis rend le créateur principal. La création d’un rapprochement exige Contributeur et l’affectation exacte à la réclamation, puis rend le créateur principal du rapprochement. Les mutations suivantes exigent l’affectation à la réclamation ou au rapprochement et Contributeur ou Gestionnaire. Un volet, budget, une soumission ou une autre entente n’élargit pas la frontière; les écritures prennent des verrous ordonnés et reconstruisent l’autorisation.

## Parcourir et créer des réclamations

La liste regroupe les réclamations par exercice et affiche leur identifiant, période d’avril à mars, statut, total soumis et montants rapprochés avec succès. Le travail de rapprochement en brouillon ou infructueux ne compte pas comme rapprochement terminé. La recherche couvre les libellés et totaux affichés.

Les actions de modification et suppression visent la réclamation individuelle. Développez le groupe et confirmez son identifiant avant d’agir; plusieurs réclamations peuvent appartenir au même exercice.

| Champ de la réclamation | Règle |
| --- | --- |
| Exercice | Identité stable obligatoire d’un exercice de la version courante du budget de l’entente. |
| Date de réception | Date et heure obligatoires; le formulaire recueille une date civile. |
| Début et fin de la période | Indices obligatoires de `0` (avril) à `11` (mars); la fin ne peut précéder le début. |
| Finale pour l’exercice | Indicateur booléen obligatoire et descriptif; la base de données ne limite pas un exercice à une seule réclamation ainsi marquée. |

Une réclamation reçoit le statut métier Brouillon protégé de l’organisme. Les modifications ordinaires conservent ce statut. La suppression autorisée reste logique et retire ses lignes et rapprochements dans la même transaction, sans effacer l’historique.

Un changement d’exercice est refusé lorsque des lignes actives attribuées référencent encore un autre exercice. Le serveur valide la destination dans le budget courant de l’entente et la paire de dates résultante lors d’une modification partielle. Corrigez l’allocation ou préparez la réclamation voulue avant l’achèvement; changer l’en-tête ne déplace pas les lignes.

## Préparer la soumission

L’onglet **Soumission** regroupe les lignes budgétaires de l’exercice courant selon la catégorie de coûts bilingue et la sous-section. Il affiche les montants soumis, rapprochés et le solde. La recherche porte sur la catégorie, la sous-section, le nom bilingue de la ligne ou sa description.

Saisissez le montant soumis de chaque ligne requise, puis sélectionnez **Enregistrer la soumission**. Une nouvelle cellule à zéro est ignorée; une cellule non nulle crée une ligne de réclamation en dollars canadiens. Une cellule existante est modifiée lorsque son montant change. La page envoie une requête par ligne modifiée, en séquence, plutôt qu’une transaction globale. Si une requête tardive échoue, les lignes précédentes restent enregistrées; actualisez la page, comparez chaque ligne et ne reprenez que les corrections manquantes.

L’API hôte prend aussi en charge la description, la devise, les libellés soumis facultatifs de catégorie, sous-section et ligne, le déplacement vers une autre réclamation modifiable et la suppression logique. Ces commandes CRUD complètes ne sont pas montées dans la grille actuelle. La base dérive l’entente de chaque ligne à partir de sa réclamation et utilise des clés étrangères composites pour garder toute ligne budgétaire sélectionnée dans cette entente.

Aucune contrainte d’unicité active n’existe pour `(réclamation, ligne budgétaire)`. Une API directe ou une importation peut donc créer des doublons. Pendant que la réclamation est modifiable, la grille utilise la première ligne correspondante; une fois verrouillée, elle affiche séparément les lignes multiples. Évitez les lignes logiques en double et rapprochez-les avant la soumission.

### Lignes importées non attribuées

Un contributeur affecté à la réclamation peut attribuer une ligne importée à une ligne budgétaire courante compatible tant que la réclamation reste modifiable. L’attribution ne contourne ni Achèvement ni un statut en lecture seule. Terminez avant l’achèvement : le serveur exige au moins une ligne et aucune ligne non attribuée.

## Soumettre, retirer ou annuler

Utilisez Achèvement après avoir enregistré et vérifié les lignes. L’action exige l’affectation exacte à la réclamation, le niveau Contributeur, un statut modifiable, aucun achèvement antérieur, au moins une ligne active et aucune ligne non attribuée. Un flux actif bloque également l’action.

Achèvement consigne `no_workflow` ou `workflow_started`. Si une soumission d’approbation est configurée, suivez ses examens et approbations. La réclamation devient admissible au rapprochement seulement après une **terminaison positive de l’achèvement** : immédiatement sans flux, ou après sa réussite. Un libellé de statut ne prouve pas cette admissibilité. Les flux standard se choisissent explicitement et ne remplacent pas Achèvement.

Le retrait et l’annulation agissent sur le flux actif; ils n’attribuent pas de codes métier fixes `withdrawn` ou `cancelled`. Le retrait est refusé dès qu’un historique de rapprochement existe. Sans flux actif, ces actions n’ont aucun flux à annuler. Le statut d’annulation publié détermine la transition. Achèvement demeure une preuve historique et ne s’annule pas en soumettant de nouveau le formulaire.

## Créer et comparer les rapprochements

La réclamation doit avoir atteint une terminaison positive de l’achèvement, toutes ses lignes actives doivent être attribuées et aucun rapprochement final terminé avec succès ne doit exister. La création exige Contributeur et l’affectation exacte à la réclamation; le créateur devient principal dans le registre indépendant du rapprochement.

Un seul rapprochement peut être ouvert à la fois. L’historique terminé ou annulé reste consultable. Le nouveau rapprochement reçoit le statut Brouillon de l’organisme. Si configuré, son démarrage applique à la réclamation le statut de début de rapprochement de l’organisme. Le marqueur final désigne le rapprochement destiné à terminer la réclamation; l’unicité finale ouverte est protégée en base.

| Champ | Contrat |
| --- | --- |
| Montant rapproché | Montant exact `numeric(19,2)` obligatoire, stocké et transmis en texte décimal. |
| Montant échantillonné | Montant exact facultatif. |
| Justification | Texte facultatif expliquant l’évaluation de la ligne. |

L’éditeur enregistre l’ensemble complet des lignes dans une transaction groupée, éventuellement avec le marqueur final. Chaque ligne actuelle doit figurer exactement une fois et les identifiants des lignes de rapprochement enregistrées doivent encore correspondre. Un ensemble périmé rejette tout l’enregistrement; rechargez et comparez le brouillon. La modification d’une ligne utilise ce même contrat complet, non une validation partielle de grille.

Les schémas monétaires acceptent les valeurs signées. Enregistrer ou achever ne prouve pas que l’échantillon est inférieur au rapprochement, que le total correspond à la soumission ou que la réclamation respecte le budget. Appliquez la politique de l’organisme et expliquez les écarts. L’interface présente les montants soumis, rapprochements antérieurs réussis, rapprochement courant et solde pour soutenir le jugement; les calculs monétaires sont exacts.

Par exemple, une ligne soumise à `"1000.00"` et déjà rapprochée avec succès à `"600.00"` laisse `"400.00"` avant le rapprochement courant. Un montant en brouillon n’est pas un rapprochement historique réussi. Vérifiez la portée affichée avant d’interpréter un total cumulatif et expliquez tout écart par rapport au montant restant.

L’annulation ferme le rapprochement, retire son marqueur final et annule son flux actif. Sans flux actif, un statut d’annulation de soumission configuré s’applique lorsqu’il existe; sans configuration, le brouillon peut quand même être fermé. La preuve est conservée et la place ouverte libérée pour un nouveau rapprochement.

## Achèvement, approbation et flux de travail

Enregistrez avant de choisir Achever. L’action exige l’affectation propre au rapprochement et le plafond Contributeur, un dossier ouvert modifiable, aucun achèvement antérieur, aucun rapprochement final réussi et au moins une ligne active. Les commentaires sont facultatifs. Ces contrôles n’imposent ni égalité financière ni justification obligatoire.

La transaction commune démarre le flux de soumission `fundingclaimreconcile` sélectionné lorsqu’il existe; sinon elle consigne `no_workflow`. Les modèles d’approbation prennent effet par ce flux publié. La section Flux partagée expose examens, recommandations, approbations, annulation et reprise. Un modèle configuré sans intégration au flux ne suffit pas.

À la terminaison positive, le rapprochement ferme. S’il est final, la réclamation peut recevoir le statut final configuré par l’organisme et tout rapprochement ultérieur est bloqué. Le statut n’est pas fixé à `reviewed`. Un échec ou une annulation ne constitue pas une finalité réussie. Examinez la tentative et ses actions de reprise ou d’annulation au lieu d’achever deux fois le même dossier.

## États verrouillés et reprise

Les statuts en lecture seule ou terminaux, la preuve d’achèvement, la fermeture et le rapprochement final réussi régissent l’édition. Le serveur vérifie aussi l’entente propriétaire et les flux actifs; un bouton visible ne permet pas de contourner un changement d’état ultérieur.

Après un échec de grille de soumission, rechargez : des écritures précédentes peuvent être validées. Après un échec groupé de rapprochement, la transaction est annulée; corrigez les champs ou rechargez l’ensemble périmé. Si une lecture échoue après une écriture réussie, reprenez la lecture avant de soumettre à nouveau. Si Achèvement est indisponible, vérifiez attribution, lignes, affectation indépendante, statut et flux actifs. Annulez un rapprochement ouvert inutile par l’action prévue au lieu de créer des dossiers concurrents.

## Contrat de développement

Les routes sous l’entente gèrent les mutations financières et de réclamation. `/api/claim-reconciliations/{id}` fournit le détail affecté indépendamment; `/api/claim-reconciliations/{id}/lines/bulk` fournit l’édition atomique de l’ensemble complet. Achèvement et Flux utilisent les API typées partagées. L’ancienne transition ready-for-review retirée n’est plus le contrat de soumission.

Tous les identifiants publics de réclamation, rapprochement et budget stable sont des chaînes bigint décimales. Le rapprochement utilise `fundingclaimreconcile` et la réclamation `fundingcaseagreementclaim`. Les identités typées et clés composites protègent la propriété; les verrous d’agrégat réautorisés sérialisent les écritures. Les corps utilisent Zod localisé et les chaînes monétaires exactes; les échecs suivent l’enveloppe standard.

Consultez [Budget](./budget.md), [Prévisions](./forecasts.md), [Paiements](./payments.md), [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).
