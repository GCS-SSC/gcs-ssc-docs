# Approbations et achèvements

Les achèvements consignent que le traitement d'une entité est terminé. Les approbations acheminent un enregistrement matérialisé dans une suite ordonnée d'approbateurs assignés et de certifications. Les deux résolvent l'accès depuis l'enregistrement propriétaire exact et peuvent faire avancer un [flux de travail](workflows.md); ni une attribution ni une action visible ne donnent accès au propriétaire.

## Enregistrements d'exécution pris en charge

Le service commun d'achèvement prend en charge les examens, les engagements d'entente, les prévisions, les surveillances, les paiements et les rapprochements de réclamation. Le service d'approbation prend en charge ces enregistrements ainsi que les recommandations et les modifications. Chaque adaptateur applique ses propres règles de statut et règles métier tout en partageant les contrats d'autorisation, de feuille de route et d'interface.

La lecture d'un achèvement ou d'une approbation exige la permission correspondante sur le propriétaire. L'achèvement exige la permission d'enregistrer les évaluations. Une décision exige la permission d'agir sur une approbation; la création d'un circuit, la réattribution et les autres actions administratives exigent celle de gérer les approbations. Chaque écriture sensible résout de nouveau le propriétaire et la permission, puis verrouille les enregistrements pertinents dans la transaction.

## Achever le travail

La section Achèvement affiche l'un des trois états suivants :

- Les métadonnées d'un achèvement existant : utilisateur, date et commentaires.
- Un champ de commentaire et l'action **Achever** lorsque l'entité est admissible et que l'utilisateur peut agir.
- Une explication de verrouillage ou d'indisponibilité lorsqu'un statut, une permission ou une autre règle métier empêche l'achèvement.

La soumission crée un seul enregistrement d'achèvement et applique les effets de l'adaptateur de l'entité. Un examen d'exécution est revalidé en mode strict, y compris les réponses et commentaires obligatoires de l'évaluation ou de la liste; toutes les lignes d'examinateurs additionnels doivent être terminées ou supprimées logiquement. L'examen devient terminé et son approbation ou la progression de son ensemble commence. Les adaptateurs d'enfants d'entente valident et font évoluer leur propre cycle de vie et peuvent démarrer un flux au point d'entrée d'achèvement.

Un achèvement n'est pas une note modifiable. Une seconde tentative est refusée et l'enregistrement historique demeure lié à l'entité exacte et à l'utilisateur Common qui l'a créé.

## Matérialiser un circuit d'approbation

Un modèle d'approbation n'est qu'une configuration. La matérialisation crée une feuille de route, copie les étapes ordonnées, les certifications, la politique d'étapes additionnelles, les noms bilingues et les valeurs par défaut du modèle publié, puis fait évoluer le circuit entre `draft`, `pendingapproval`, `approved` et `denied`. Une modification ultérieure du modèle ne réécrit pas cette feuille.

Certains flux matérialisent automatiquement le circuit. Lorsque l'interface affiche **Ajouter**, une personne ayant la permission de gérer les approbations peut créer manuellement le circuit applicable. Un modèle absent, inactif, non publié, de mauvaise portée ou de mauvais type d'entité empêche la matérialisation. Le tableau groupe les étapes par feuille de route, conserve les feuilles antérieures comme historique lorsque l'adaptateur le permet et indique le circuit courant.

Un flux de soumission d’approbation d’entente ou de modification crée aussi un paquet d’approbation immuable. Le paquet d’une entente initiale fige le profil complet, les promoteurs, le budget courant et les activités courantes. Le paquet d’une modification consigne les types et sous-types sélectionnés et contient seulement les domaines d’instantané choisis — budget, activités ou dates de durée proposées. Le flux conserve l’empreinte SHA-256 du paquet, et la vue d’approbation la vérifie avant d’afficher le paquet bilingue. Une approbation réussie promeut le paquet en révision immuable de l’entente : révision `0` pour la soumission initiale et prochain numéro positif pour une modification. Le démarrage d’une autre soumission pendant qu’une exécution est active, la modification des données couvertes durant cette exécution ainsi que la réécriture ou la suppression d’un paquet conservé sont bloqués.

## Traiter une étape

Seule la première étape non résolue est courante. **Approuver** ou **Refuser** est offert uniquement à l'utilisateur Common qui y est assigné, tant que le propriétaire demeure accessible et que le circuit n'est pas verrouillé. Dans la boîte de décision :

- Chaque certification obligatoire doit être acceptée avant l'approbation. Une certification facultative peut rester sans réponse.
- Un refus exige un commentaire.
- Lorsque l'approbateur assigné diffère de l'approbateur par défaut, un type d'approbation au nom d'autrui est obligatoire.
- Si ce type exige les valeurs réelles, le titre du poste et la date de décision sont aussi obligatoires; autrement, le titre stocké de l'utilisateur et l'heure courante sont utilisés.
- Les commentaires et décisions de certification sont enregistrés avec la décision.

Une approbation passe à l'étape non résolue suivante; la dernière marque la feuille comme approuvée. Un refus la marque comme refusée. L'examen, la recommandation, l'enfant d'entente, l'ensemble d'examens et le flux propriétaires sont synchronisés selon le cas. La progression est idempotente : le circuit la tente même après le refus d'une décision répétée afin de réparer sans danger une décision validée avant l'échec d'une progression antérieure.

## Réattribuer et insérer des étapes

Une personne gestionnaire peut réattribuer une étape non résolue à un utilisateur Common actif et admissible de l'agence propriétaire. Le choix d'une personne autre que l'approbateur par défaut exige un type d'approbation au nom d'autrui. La réattribution efface les métadonnées de décision précédentes. Une étape terminale ou déjà décidée ne peut pas être modifiée, sauf lorsqu'un adaptateur autorise explicitement la réattribution terminale d'une étape historique non résolue.

Si le modèle matérialisé permet des approbations additionnelles, un gestionnaire ou une personne assignée à une étape non résolue peut insérer une étape avant ou après un point d'ancrage admissible. L'insertion utilise une séquence fractionnaire afin de préserver l'ordre déjà traité. Une étape ne peut pas être insérée avant du travail résolu, et une insertion après ne peut pas précéder la plus grande séquence déjà traitée.

La nouvelle étape exige un responsable admissible et un nom bilingue. Son nom bilingue et ses certifications par défaut proviennent de la feuille. Les noms ou certifications sont modifiables uniquement si la politique figée le permet; chaque certification ajoutée exige un nom, une description et un texte de certification bilingues. Le client ne peut pas élargir cette politique.

## Consulter et rétablir

L'action de consultation affiche les noms bilingues de l'étape, les approbateurs par défaut et assigné, le statut, la date de décision, le titre du poste, le type d'approbation au nom d'autrui, le commentaire et les décisions de certification. Les états vide, aperçu, courant et historique sont volontairement distincts.

Si une action est indisponible, vérifiez l'accès ordinaire au propriétaire, la permission d'approbation requise, l'attribution de l'étape courante, le statut du circuit et de l'entité ainsi que le dossier Common de l'utilisateur. Pour agir au nom d'autrui, choisissez un type valide de l'agence et fournissez le titre et la date réels s'ils sont exigés. Si aucun circuit n'existe, confirmez que le bon modèle publié est configuré pour cette portée et ce type d'entité. Rechargez après la décision ou la réattribution d'une autre personne. Ne modifiez pas un modèle pour réparer un circuit existant; résolvez l'état d'exécution par les actions prises en charge ou créez un futur circuit à partir d'une configuration publiée corrigée.

Consultez [Modèles d'approbation](../programs/approval-templates.md), [Examens en cours d'exécution](runtime-reviews.md) et [RBAC](rbac.md).
