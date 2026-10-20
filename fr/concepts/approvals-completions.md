# Approbations et achèvements

Utilisez **Achever** après avoir saisi et vérifié les renseignements d’un dossier. L’achèvement conserve la preuve de qui a terminé le travail et bloque les modifications ordinaires. L’**approbation** est une décision distincte. Les approbateurs affectés examinent le dossier dans l’ordre et confirment les certifications requises. Les deux peuvent faire avancer un [flux de travail](workflows.md). L’accès est vérifié pour le dossier précis traité; une affectation ou un bouton visible ne donne pas à lui seul accès à ce dossier.

## Enregistrements d'exécution pris en charge

Ici, **exécution** désigne le travail créé pour un dossier, plutôt que le modèle conçu par un administrateur. Par exemple, une liste de vérification publiée est un modèle; celle que vous remplissez pour une réclamation précise est un examen d’exécution.

L’achèvement prend en charge les examens d’exécution, réclamations, rapprochements, engagements, prévisions, paiements, surveillances, modifications, clôtures, comptes débiteurs et ajustements, notes de crédit, corrections et pièces de journal. La soumission d’approbation d’une entente est démarrée explicitement; l’entente elle-même n’a pas d’action Achever. Les promoteurs acceptent des examens directs, mais aucun achèvement racine ni flux standard.

| Cible | Effet de l’achèvement |
| --- | --- |
| Réclamation, rapprochement, engagement, prévision, paiement, surveillance, pièce de journal | Valide la cible et consigne l’achèvement. Démarre le flux publié `approval_submission` applicable, sinon consigne `no_workflow`. |
| Modification, clôture, compte débiteur/ajustement, note de crédit, correction | Exige un flux publié de soumission d’approbation. Son absence fait rejeter l’achèvement; la réussite doit mener à un état terminal configuré de l’organisme. |
| Examen d’exécution | Valide les réponses requises et les examinateurs additionnels, consigne l’achèvement et fait progresser son moteur d’examen et d’approbation. |

Pour lire les renseignements d’achèvement ou d’approbation, vous devez avoir la permission de lecture pertinente pour le dossier propriétaire. Pour achever un examen, vous devez avoir la permission d’enregistrer son évaluation. Pour achever un dossier lié à une entente, vous devez avoir la permission Contributeur et une affectation à ce dossier précis; ses renseignements métier requis doivent aussi être prêts.

Pour approuver ou refuser, vous devez avoir la permission d’agir sur l’approbation. Créer un circuit, réaffecter une étape ou effectuer d’autres actions administratives exige la permission de gérer les approbations. Avant toute modification sensible, l’application vérifie à nouveau le propriétaire actuel et vos permissions, puis verrouille les dossiers concernés dans la transaction.

## Achever le travail

La section Achèvement affiche l'achèvement conservé ou les exigences actuelles :

- L’utilisateur, la date et les commentaires enregistrés pour le travail achevé.
- Un champ de commentaire et l'action **Achever** lorsque votre rôle permet l'achèvement. L'action peut rester visible lorsqu'un autre prérequis manque.
- Une explication de verrouillage ou d'indisponibilité lorsqu'un statut, une permission ou une autre règle métier empêche l'achèvement. Choisir une action visible dont un prérequis manque affiche un avertissement sans achever le dossier.

La soumission enregistre un achèvement figé pour ce dossier et votre compte utilisateur Common. L’application vérifie de nouveau les renseignements métier obligatoires avant l’enregistrement. Pour un examen, elle vérifie toutes les réponses et tous les commentaires obligatoires de l’évaluation ou de la liste. Les examinateurs additionnels doivent avoir terminé leur travail ou avoir été retirés. Leur historique reste disponible.

Pour les dossiers liés à une entente, l’achèvement et la réussite de l’approbation sont distincts. Sans flux facultatif applicable, les changements découlant d’un achèvement réussi sont immédiats. Lorsqu’un flux d’approbation démarre, ce qui est consigné par `workflow_started`, ces changements attendent sa réussite. Par exemple, un engagement de remplacement achevé reste inactif pendant l’approbation; la réussite l’active et désactive l’ancien engagement actif du même type. Un refus ne l’active pas.

Les modifications ordinaires préservent l’état métier de l’organisme. Les transitions de flux appliquent les identifiants configurés; aucune règle universelle ne donne un état métier nommé `complete` à l’achèvement ou `approved` à l’approbation. La preuve d’achèvement, l’état d’exécution, l’état métier et la version active sont des faits distincts.

Un flux actif sur la cible bloque un autre flux et l’achèvement. Les flux standards sont choisis explicitement dans **Flux de travail** et ne démarrent pas avec Achever. Après achèvement, les données sont figées et une répétition est rejetée. Si l’approbation échoue, utilisez la reprise prise en charge; ne soumettez pas un second achèvement. Voir [Flux de travail](workflows.md) et le guide de la cible pour les limites de reprise et d’annulation.

Les comptes débiteurs, ajustements, notes de crédit et corrections exigent une approbation avant que leurs changements comptables prennent effet. Les pièces de journal suivent leur processus d’approbation facultatif configuré. Consultez les guides financiers pour la validation du dossier, les prérequis de source/comptabilité et l’annulation : [Comptes débiteurs](../agreements/receivables.md), [Notes de crédit](../proponents/credit-memos.md), [Corrections](../agreements/corrections.md) et [Pièces de journal](../agreements/journal-vouchers.md). L’autorité d’une note de crédit suit son propriétaire agence/compte plutôt que l’affectation du parent entente.

## Matérialiser un circuit d'approbation

Un modèle d’approbation définit le processus d’approbation. L’application crée une feuille d'acheminement pour votre dossier, une liste enregistrée des étapes et décisions d’approbation. La création de ce circuit à partir du modèle s’appelle la **matérialisation**. Elle copie les étapes ordonnées, les certifications, les règles d’étapes additionnelles, les noms bilingues et les valeurs par défaut du modèle publié. Le circuit passe ensuite par des états comme l’attente d’action, l’approbation ou le refus. Modifier le modèle plus tard ne change pas cette feuille d'acheminement.

Les flux et les processus d’achèvement d’examen pris en charge créent le circuit d’approbation à partir de leur configuration conservée. Utilisez la section d’approbation pour consigner les décisions et ajouter des étapes lorsque cela est permis. Elle n’offre pas d’action générale pour créer manuellement un circuit racine de remplacement.

Pour une nouvelle configuration, les administrateurs doivent choisir des modèles publiés admissibles du même volet. Un circuit existant conserve la version du modèle utilisée à sa création, même si le modèle est modifié ou retiré plus tard. Le tableau groupe les étapes par feuille d'acheminement, affiche le circuit courant et conserve les feuilles d'acheminement précédentes comme historique lorsque cela est pris en charge.

Un flux de soumission d’approbation d’entente ou de modification crée aussi un paquet d’approbation non modifiable. Le paquet d’une entente initiale fige le profil complet, les promoteurs, le budget courant et les activités courantes. Le paquet d’une modification consigne les types et sous-types sélectionnés et contient seulement les renseignements modifiés, comme le budget, les activités ou les dates de durée proposées. Le flux conserve l’empreinte SHA-256 du paquet, et la vue d’approbation la vérifie avant d’afficher le paquet bilingue. Une approbation réussie promeut le paquet en révision non modifiable de l’entente : révision `0` pour la soumission initiale et prochain numéro positif pour une modification. Le démarrage d’une autre soumission pendant qu’une exécution est active, la modification des données couvertes durant cette exécution ainsi que la réécriture ou la suppression d’un paquet conservé sont bloqués.

## Approbations de risque et de collecte

Les dossiers d’approbation d’entente et de modification utilisent le schéma version 3. Ils conservent le choix de risque, les libellés de cote, le calcul réussi utilisé et la preuve du respect des exigences de risque. Si le risque est obligatoire, le flux de risque publié sélectionné doit réussir pour ce dossier précis avant le premier enregistrement du dossier d’approbation. Si cet enregistrement échoue, la modification n’est pas achevée et son flux d’approbation n’est pas créé. Omettre le risque facultatif n’applique pas à l’entente une proposition de risque copiée dans la modification. Une reprise d’approbation conserve la section de risque originale, même si les exigences ont changé depuis. Consultez [Modifications](../agreements/amendments.md).

Une [collecte de données](data-collections.md) soumet directement ses réponses à son modèle d’approbation facultatif figé. Elle n’utilise aucune action Achever indépendante. Les réponses et les affectations sont figées pendant l’approbation. L’approbation termine la collecte avec succès et fait avancer le flux. Le refus suit la règle d’échec configurée. L’approbateur affecté peut lire les preuves de cette collecte exacte sans recevoir le dossier du flux parent ni d’autres travaux.

Pour une étape d’approbation de groupe, réclamez l’étape courante non résolue avant de décider. L’appartenance active et l’inscription admissible à l’agence sont revérifiées. La réclamation crée votre affectation d’approbation personnelle. Pour une collecte, elle permet de lire et d’approuver cette collecte même sans affectation au dossier parent. Elle ne permet pas de modifier les réponses ni de gérer les affectations. L’appartenance au groupe seule ne donne pas accès en lecture avant de réclamer l’étape.

## Traiter une étape

Par exemple, un gestionnaire de programme puis un approbateur financier doivent approuver un engagement. Si vous êtes l’approbateur financier, vous attendez l’approbation de l’étape du gestionnaire. Lorsque votre étape devient courante, lisez les preuves, confirmez les certifications requises et choisissez **Approuver** ou **Refuser**. En cas de refus, expliquez le motif dans le commentaire obligatoire afin que l’agent comprenne pourquoi le circuit s’est arrêté.

Seule la première étape non résolue est courante. **Approuver** ou **Refuser** est offert uniquement à l'utilisateur Common qui y est assigné, tant que le propriétaire demeure accessible et que le circuit n'est pas verrouillé. Dans la boîte de décision :

- Chaque certification obligatoire doit être acceptée avant l'approbation. Une certification facultative peut rester sans réponse.
- Un refus exige un commentaire.
- Lorsque l'approbateur assigné diffère de l'approbateur par défaut, un type d'approbation au nom d'autrui est obligatoire.
- Si ce type exige les valeurs réelles, le titre du poste et la date de décision sont aussi obligatoires; autrement, le titre stocké de l'utilisateur et l'heure courante sont utilisés.
- Les commentaires et décisions de certification sont enregistrés avec la décision.

Une approbation passe à l'étape non résolue suivante; la dernière marque la feuille d'acheminement comme approuvée. Un refus la marque comme refusée. L'examen, la recommandation, l'enfant d'entente, l'ensemble d'examens et le flux propriétaires sont synchronisés selon le cas. Répéter la progression ne duplique pas ses effets. Même lorsqu’une décision répétée est rejetée, le circuit essaie de progresser à nouveau. Cela rétablit sans danger une décision enregistrée avant l’échec d’une tentative de progression précédente.

## Réattribuer et insérer des étapes

Une personne gestionnaire peut réattribuer une étape non résolue à un utilisateur Common actif et admissible de l'agence propriétaire. Le choix d'une personne autre que l'approbateur par défaut exige un type d'approbation au nom d'autrui. La réattribution efface les métadonnées de décision précédentes. Vous ne pouvez pas modifier une étape déjà décidée. La réattribution d’une étape historique non résolue dans un circuit terminé est disponible seulement pour les types de dossiers qui la prennent explicitement en charge.

Si la version du modèle conservée pour ce circuit permet des approbations additionnelles, un gestionnaire ou une personne assignée à une étape non résolue peut insérer une étape avant ou après une étape admissible. Le travail terminé conserve son ordre. Vous ne pouvez pas insérer une étape avant du travail résolu ni à une position antérieure à la dernière étape déjà traitée.

La nouvelle étape exige un responsable admissible et un nom bilingue. Son nom bilingue et ses certifications par défaut proviennent de la feuille d'acheminement. Les noms ou certifications sont modifiables uniquement si la politique figée le permet; chaque certification ajoutée exige un nom, une description et un texte de certification bilingues. L’interface ne peut pas remplacer ces règles conservées.

## Consulter et rétablir

L'action de consultation affiche les noms bilingues de l'étape, les approbateurs par défaut et assigné, le statut, la date de décision, le titre du poste, le type d'approbation au nom d'autrui, le commentaire et les décisions de certification. Les états vide, aperçu, courant et historique sont volontairement distincts.

Si une action est indisponible, vérifiez l'accès ordinaire au propriétaire, la permission d'approbation requise, l'attribution de l'étape courante, le statut du circuit et de l'entité ainsi que le dossier Common de l'utilisateur. Pour agir au nom d'autrui, choisissez un type valide de l'agence et fournissez le titre et la date réels s'ils sont exigés. Si aucun circuit n'existe, confirmez que le bon modèle publié est configuré pour cette portée et ce type d'entité. Rechargez après la décision ou la réattribution d'une autre personne. Ne modifiez pas un modèle pour réparer un circuit existant; résolvez l'état d'exécution par les actions prises en charge ou créez un futur circuit à partir d'une configuration publiée corrigée.

Consultez [Modèles d'approbation](../programs/approval-templates.md), [Examens en cours d'exécution](runtime-reviews.md) et [RBAC](rbac.md).
