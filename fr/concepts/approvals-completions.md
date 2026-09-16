# Approbations et achèvements

Les achèvements consignent que le traitement d'une entité est terminé. Les approbations acheminent un enregistrement matérialisé dans une suite ordonnée d'approbateurs assignés et de certifications. Les deux résolvent l'accès depuis l'enregistrement propriétaire exact et peuvent faire avancer un [flux de travail](workflows.md); ni une attribution ni une action visible ne donnent accès au propriétaire.

## Enregistrements d'exécution pris en charge

L’achèvement prend en charge les examens d’exécution et les enfants d’entente suivants : réclamations, rapprochements, engagements, prévisions, paiements, surveillances, modifications et clôtures. La soumission d’approbation d’une entente est démarrée explicitement; l’entente elle-même n’a pas d’action Achever. Les promoteurs acceptent des examens directs, mais aucun achèvement racine ni flux standard.

| Cible | Effet de l’achèvement |
| --- | --- |
| Réclamation, rapprochement, engagement, prévision, paiement, surveillance | Valide la cible et consigne l’achèvement. Démarre le flux publié `approval_submission` applicable, sinon consigne `no_workflow`. |
| Modification, clôture | Exige un flux publié de soumission d’approbation. Son absence fait rejeter l’achèvement; la réussite doit mener à un état terminal configuré de l’organisme. |
| Examen d’exécution | Valide les réponses requises et les examinateurs additionnels, consigne l’achèvement et fait progresser son moteur d’examen et d’approbation. |

La lecture d'un achèvement ou d'une approbation exige la permission correspondante sur le propriétaire. L’achèvement d’un examen exige la permission d’enregistrer les évaluations. Celui d’un enfant d’entente exige la permission Contributeur et l’affectation exacte, ainsi que les prérequis métier propres à cet enfant. Une décision exige la permission d'agir sur une approbation; la création d'un circuit, la réattribution et les autres actions administratives exigent celle de gérer les approbations. Chaque écriture sensible résout de nouveau le propriétaire et la permission, puis verrouille les enregistrements pertinents dans la transaction.

## Achever le travail

La section Achèvement affiche l'un des trois états suivants :

- Les métadonnées d'un achèvement existant : utilisateur, date et commentaires.
- Un champ de commentaire et l'action **Achever** lorsque l'entité est admissible et que l'utilisateur peut agir.
- Une explication de verrouillage ou d'indisponibilité lorsqu'un statut, une permission ou une autre règle métier empêche l'achèvement.

La soumission crée un achèvement immuable lié à l’entité exacte et à l’utilisateur Common. Les données métier obligatoires sont revérifiées dans la transaction. Un examen est validé en mode strict, y compris les réponses et commentaires obligatoires d’évaluation ou de liste; les examinateurs additionnels doivent avoir terminé ou être supprimés logiquement.

Pour les enfants d’entente, l’achèvement et la réussite de l’approbation sont distincts. Sans flux facultatif applicable, les effets positifs sont immédiats. Avec `workflow_started`, ils attendent une issue terminale positive de cette exécution. Par exemple, un engagement de remplacement achevé reste inactif pendant l’approbation; la réussite l’active et désactive l’ancien engagement actif du même type. Un refus ne l’active pas.

Les modifications ordinaires préservent l’état métier de l’organisme. Les transitions de flux appliquent les identifiants configurés; aucune règle universelle ne donne un état métier nommé `complete` à l’achèvement ou `approved` à l’approbation. La preuve d’achèvement, l’état d’exécution, l’état métier et la version active sont des faits distincts.

Un flux actif sur la cible bloque un autre flux et l’achèvement. Les flux standards sont choisis explicitement dans **Flux de travail** et ne démarrent pas avec Achever. Après achèvement, les données sont figées et une répétition est rejetée. Si l’approbation échoue, utilisez la reprise prise en charge; ne soumettez pas un second achèvement. Voir [Flux de travail](workflows.md) et le guide de la cible pour les limites de reprise et d’annulation.

## Matérialiser un circuit d'approbation

Un modèle d'approbation n'est qu'une configuration. La matérialisation crée une feuille de route, copie les étapes ordonnées, les certifications, la politique d'étapes additionnelles, les noms bilingues et les valeurs par défaut du modèle publié, puis fait progresser le circuit dans les états d’exécution partagés, dont l’attente d’action et les issues approuvée ou refusée. Une modification ultérieure du modèle ne réécrit pas cette feuille.

Les flux et les parcours d’achèvement d’examen pris en charge matérialisent le circuit depuis leur configuration figée. La section d’approbation gère les décisions et les étapes additionnelles permises; elle n’offre pas de création manuelle générale d’un circuit racine de remplacement. Une nouvelle configuration doit référencer des modèles publiés admissibles du même volet. Une exécution existante utilise sa définition de modèle figée; une modification ou un retrait ultérieur ne remplace pas cette définition historique. Le tableau groupe les étapes par feuille de route, conserve les feuilles antérieures comme historique lorsque l'adaptateur le permet et indique le circuit courant.

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
