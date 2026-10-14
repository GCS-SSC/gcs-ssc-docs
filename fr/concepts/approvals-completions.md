# Approbations et achèvements

Utilisez **Achever** après avoir saisi et vérifié les renseignements d’un dossier. L’achèvement conserve la preuve de qui a terminé le travail et bloque les modifications ordinaires. L’**approbation** est une décision distincte : les approbateurs affectés examinent le dossier dans l’ordre et confirment les certifications requises. Les deux peuvent faire avancer un [flux de travail](workflows.md). L’accès est vérifié pour le dossier précis traité; une affectation ou un bouton visible ne donne pas à lui seul accès à ce dossier.

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

La section Achèvement affiche l'un des trois états suivants :

- Les métadonnées d'un achèvement existant : utilisateur, date et commentaires.
- Un champ de commentaire et l'action **Achever** lorsque l'entité est admissible et que l'utilisateur peut agir.
- Une explication de verrouillage ou d'indisponibilité lorsqu'un statut, une permission ou une autre règle métier empêche l'achèvement.

La soumission crée un achèvement non modifiable lié à l’entité exacte et à l’utilisateur Common. Les données métier obligatoires sont revérifiées dans la transaction. Un examen est validé en mode strict, y compris les réponses et commentaires obligatoires d’évaluation ou de liste; les examinateurs additionnels doivent avoir terminé ou être supprimés logiquement.

Pour les enfants d’entente, l’achèvement et la réussite de l’approbation sont distincts. Sans flux facultatif applicable, les effets positifs sont immédiats. Avec `workflow_started`, ils attendent une issue terminale positive de cette exécution. Par exemple, un engagement de remplacement achevé reste inactif pendant l’approbation; la réussite l’active et désactive l’ancien engagement actif du même type. Un refus ne l’active pas.

Les modifications ordinaires préservent l’état métier de l’organisme. Les transitions de flux appliquent les identifiants configurés; aucune règle universelle ne donne un état métier nommé `complete` à l’achèvement ou `approved` à l’approbation. La preuve d’achèvement, l’état d’exécution, l’état métier et la version active sont des faits distincts.

Un flux actif sur la cible bloque un autre flux et l’achèvement. Les flux standards sont choisis explicitement dans **Flux de travail** et ne démarrent pas avec Achever. Après achèvement, les données sont figées et une répétition est rejetée. Si l’approbation échoue, utilisez la reprise prise en charge; ne soumettez pas un second achèvement. Voir [Flux de travail](workflows.md) et le guide de la cible pour les limites de reprise et d’annulation.

Les comptes débiteurs, ajustements, notes de crédit et corrections exigent une approbation avant leurs effets comptables positifs; les pièces de journal suivent leur chemin configuré facultatif. Consultez les guides financiers pour la validation du dossier, les prérequis de source/comptabilité et l’annulation : [Comptes débiteurs](../agreements/receivables.md), [Notes de crédit](../proponents/credit-memos.md), [Corrections](../agreements/corrections.md) et [Pièces de journal](../agreements/journal-vouchers.md). L’autorité d’une note de crédit suit son propriétaire agence/compte plutôt que l’affectation du parent entente.

## Matérialiser un circuit d'approbation

Un modèle d’approbation définit le processus d’approbation. Lorsque l’application crée ce processus pour votre dossier (la **matérialisation**), elle crée une feuille de route : la liste enregistrée des étapes et décisions d’approbation. Elle copie les étapes ordonnées, les certifications, les règles d’étapes additionnelles, les noms bilingues et les valeurs par défaut du modèle publié. Le circuit passe ensuite par des états comme l’attente d’action, l’approbation ou le refus. Modifier le modèle plus tard ne change pas cette feuille de route.

Les flux et les processus d’achèvement d’examen pris en charge créent le circuit d’approbation à partir de leur configuration conservée. Utilisez la section d’approbation pour consigner les décisions et ajouter des étapes lorsque cela est permis. Elle n’offre pas d’action générale pour créer manuellement un circuit racine de remplacement.

Pour une nouvelle configuration, les administrateurs doivent choisir des modèles publiés admissibles du même volet. Un circuit existant conserve la version du modèle utilisée à sa création, même si le modèle est modifié ou retiré plus tard. Le tableau groupe les étapes par feuille de route, affiche le circuit courant et conserve les feuilles précédentes comme historique lorsque cela est pris en charge.

Un flux de soumission d’approbation d’entente ou de modification crée aussi un paquet d’approbation non modifiable. Le paquet d’une entente initiale fige le profil complet, les promoteurs, le budget courant et les activités courantes. Le paquet d’une modification consigne les types et sous-types sélectionnés et contient seulement les domaines d’instantané choisis — budget, activités ou dates de durée proposées. Le flux conserve l’empreinte SHA-256 du paquet, et la vue d’approbation la vérifie avant d’afficher le paquet bilingue. Une approbation réussie promeut le paquet en révision non modifiable de l’entente : révision `0` pour la soumission initiale et prochain numéro positif pour une modification. Le démarrage d’une autre soumission pendant qu’une exécution est active, la modification des données couvertes durant cette exécution ainsi que la réécriture ou la suppression d’un paquet conservé sont bloqués.

## Approbations de risque et de collecte

Les nouveaux dossiers d’approbation d’entente et de modification utilisent le schéma version 3, avec choix de risque capturé, libellés de cote, calcul réussi exact et preuves de préparation. Un flux de risque publié obligatoire doit réussir pour la cible exacte et la configuration sélectionnée avant la première capture. Le rejet annule ensemble l’achèvement de modification et la création du flux. Omettre un risque facultatif n’applique pas une proposition copiée. Une reprise d’approbation conserve la section de risque originale sans recapturer les exigences modifiées. Consultez [Modifications](../agreements/amendments.md).

Une [collecte de données](data-collections.md) soumet directement ses réponses à son modèle d’approbation facultatif figé. Elle n’utilise aucune action Achever indépendante. Réponses et registre sont figés pendant l’approbation; l’approbation réussit la collecte et avance le flux, et le refus suit la règle d’échec. L’approbateur affecté peut lire les preuves de cette collecte exacte sans recevoir le dossier du flux parent ni d’autres travaux.

Pour une étape d’approbation de groupe, réclamez l’étape courante non résolue avant de décider. L’appartenance active et l’inscription admissible à l’agence sont revérifiées. La réclamation crée l’affectation d’approbation personnelle; pour une collecte, elle permet son contexte exact d’approbation/lecture même sans affectation au parent, mais aucune modification des réponses ni gestion du registre. Avant la réclamation, l’appartenance seule ne donne aucun accès métier en lecture.

## Traiter une étape

Par exemple, un gestionnaire de programme puis un approbateur financier doivent approuver un engagement. Si vous êtes l’approbateur financier, vous attendez l’approbation de l’étape du gestionnaire. Lorsque votre étape devient courante, lisez les preuves, confirmez les certifications requises et choisissez **Approuver** ou **Refuser**. En cas de refus, expliquez le motif dans le commentaire obligatoire afin que l’agent comprenne pourquoi le circuit s’est arrêté.

Seule la première étape non résolue est courante. **Approuver** ou **Refuser** est offert uniquement à l'utilisateur Common qui y est assigné, tant que le propriétaire demeure accessible et que le circuit n'est pas verrouillé. Dans la boîte de décision :

- Chaque certification obligatoire doit être acceptée avant l'approbation. Une certification facultative peut rester sans réponse.
- Un refus exige un commentaire.
- Lorsque l'approbateur assigné diffère de l'approbateur par défaut, un type d'approbation au nom d'autrui est obligatoire.
- Si ce type exige les valeurs réelles, le titre du poste et la date de décision sont aussi obligatoires; autrement, le titre stocké de l'utilisateur et l'heure courante sont utilisés.
- Les commentaires et décisions de certification sont enregistrés avec la décision.

Une approbation passe à l'étape non résolue suivante; la dernière marque la feuille comme approuvée. Un refus la marque comme refusée. L'examen, la recommandation, l'enfant d'entente, l'ensemble d'examens et le flux propriétaires sont synchronisés selon le cas. Répéter la progression ne duplique pas ses effets. Même lorsqu’une décision répétée est rejetée, le circuit essaie de progresser à nouveau. Cela rétablit sans danger une décision enregistrée avant l’échec d’une tentative de progression précédente.

## Réattribuer et insérer des étapes

Une personne gestionnaire peut réattribuer une étape non résolue à un utilisateur Common actif et admissible de l'agence propriétaire. Le choix d'une personne autre que l'approbateur par défaut exige un type d'approbation au nom d'autrui. La réattribution efface les métadonnées de décision précédentes. Une étape terminale ou déjà décidée ne peut pas être modifiée, sauf lorsqu'un adaptateur autorise explicitement la réattribution terminale d'une étape historique non résolue.

Si le modèle matérialisé permet des approbations additionnelles, un gestionnaire ou une personne assignée à une étape non résolue peut insérer une étape avant ou après un point d'ancrage admissible. L'insertion utilise une séquence fractionnaire afin de préserver l'ordre déjà traité. Une étape ne peut pas être insérée avant du travail résolu, et une insertion après ne peut pas précéder la plus grande séquence déjà traitée.

La nouvelle étape exige un responsable admissible et un nom bilingue. Son nom bilingue et ses certifications par défaut proviennent de la feuille. Les noms ou certifications sont modifiables uniquement si la politique figée le permet; chaque certification ajoutée exige un nom, une description et un texte de certification bilingues. Le client ne peut pas élargir cette politique.

## Consulter et rétablir

L'action de consultation affiche les noms bilingues de l'étape, les approbateurs par défaut et assigné, le statut, la date de décision, le titre du poste, le type d'approbation au nom d'autrui, le commentaire et les décisions de certification. Les états vide, aperçu, courant et historique sont volontairement distincts.

Si une action est indisponible, vérifiez l'accès ordinaire au propriétaire, la permission d'approbation requise, l'attribution de l'étape courante, le statut du circuit et de l'entité ainsi que le dossier Common de l'utilisateur. Pour agir au nom d'autrui, choisissez un type valide de l'agence et fournissez le titre et la date réels s'ils sont exigés. Si aucun circuit n'existe, confirmez que le bon modèle publié est configuré pour cette portée et ce type d'entité. Rechargez après la décision ou la réattribution d'une autre personne. Ne modifiez pas un modèle pour réparer un circuit existant; résolvez l'état d'exécution par les actions prises en charge ou créez un futur circuit à partir d'une configuration publiée corrigée.

Consultez [Modèles d'approbation](../programs/approval-templates.md), [Examens en cours d'exécution](runtime-reviews.md) et [RBAC](rbac.md).
