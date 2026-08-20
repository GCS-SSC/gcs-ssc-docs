# Permissions de rôle et affectations exactes

L’autorisation de GCS-SSC comporte deux couches indépendantes :

1. Une **permission de rôle** fournit le niveau d’accès maximal pour un sujet à portée globale, d’agence ou de programme.
2. Une **affectation à une entité exacte** désigne le promoteur, l’entente, l’examen, la recommandation, la réclamation, le rapprochement, le paiement, la prévision, la surveillance, la modification ou l’engagement enregistré sur lequel l’utilisateur peut travailler.

Lecteur permet les lectures dans la portée sans affectation. Pour les mutations d’une entité pouvant être affectée existante, les deux clés sont normalement requises. Une affectation n’élève jamais le plafond du rôle et une permission étendue ne place pas tous les dossiers correspondants dans la file de travail de l’utilisateur.

Les affectations d’approbateur et de réviseur sont des responsabilités de flux distinctes. Elles peuvent autoriser l’action d’approbation ou d’examen attribuée, mais elles ne remplacent pas l’accès ordinaire à l’entité métier propriétaire.

## Niveaux d’accès

Chaque permission de rôle possède un niveau d’accès cumulatif :

| Niveau | Actions permises |
| --- | --- |
| Lecteur | Lecture. |
| Contributeur | Lecture, création et modification. |
| Gestionnaire | Lecture, création, modification et suppression. |

`Aucun` signifie que le rôle ne fournit aucun plafond d’accès pour ce sujet. Il n’existe pas de commutateurs CRUD indépendants et Gestionnaire n’est pas un caractère générique pour les capacités distinctes.

## Sujets et portées

Les sujets pris en charge sont `system`, `agency`, `transfer_payment`, `role`, `user`, `agreement` et `applicant_recipient`.

| Sujet | Rôle global | Rôle d’agence | Rôle de programme |
| --- | :---: | :---: | :---: |
| `system` | Oui | Non | Non |
| `agency` | Oui | Oui | Non |
| `transfer_payment` | Oui | Oui | Oui |
| `role` | Oui | Oui | Non |
| `user` | Oui | Oui | Non |
| `agreement` | Oui | Oui | Oui |
| `applicant_recipient` | Oui | Oui | Non |

Un rôle global n’a pas d’agence. Un rôle d’agence est lié à une agence et n’a aucun lien de programme. Un rôle de programme est lié à une agence et à un ou plusieurs programmes actifs de cette agence. Des contraintes de base de données rejettent les combinaisons incompatibles de permissions et de portées.

La ressource détermine la portée utilisée par la vérification. Une entente est résolue par son volet et son programme; un promoteur, par son agence principale. Une permission de promoteur limitée à une agence est donc possible sans accorder un accès interagences.

## La règle des deux clés

Pour une entité racine d’affectation existante :

| Opération | Plafond du rôle | Affectation exacte |
| --- | --- | --- |
| Lire | Lecteur ou niveau supérieur | Non requise |
| Créer une ligne enfant ordinaire | Contributeur ou niveau supérieur sur le sujet parent | Requise sur la racine d’affectation parente |
| Modifier | Contributeur ou niveau supérieur | Requise |
| Supprimer | Gestionnaire | Requise |

La création de premier niveau est la principale exception puisque le nouvel enregistrement n’a pas encore d’affectation. La création d’un promoteur ou d’une entente exige Contributeur à la portée propriétaire choisie. La transaction crée l’entité et affecte son créateur comme utilisateur principal. La création d’un dossier de traitement affecté indépendamment suit le même modèle pour cet enfant.

Une ligne enfant ordinaire, telle qu’une adresse ou une ligne budgétaire, emploie son promoteur ou son entente propriétaire comme racine d’affectation. Un dossier de traitement affecté indépendamment s’emploie lui-même comme racine. L’affectation au parent n’accorde pas l’accès à un enfant affecté indépendamment; l’affectation à l’enfant n’accorde ni le parent ni un dossier frère.

## Entités pouvant être affectées

Le registre d’affectation exacte s’applique aux éléments suivants :

- promoteurs et ententes;
- examens et recommandations communs;
- réclamations et rapprochements de réclamation;
- paiements, prévisions et surveillances;
- modifications et engagements.

Une entité active pouvant être affectée doit compter au moins un utilisateur affecté actif et exactement un utilisateur principal. Le marqueur principal désigne le responsable; il ne confère pas de permissions métier supplémentaires. Tous les utilisateurs affectés actifs partagent la même frontière d’entité et demeurent limités par leur propre plafond de rôle.

Seuls les états permettant le travail acceptent les changements de registre. Par exemple, les affectations de promoteur sont modifiables aux états `draft` et `active`; celles d’entente aux états `draft`, `pendingapproval` et `active`; les examens et la plupart des dossiers financiers suivent leurs propres politiques d’état ouvert; les recommandations et modifications n’acceptent les changements qu’à l’état `draft`. Les dossiers terminaux peuvent demeurer visibles dans Gestion des affectations, mais leur registre est verrouillé.

La suppression d’une entité pouvant être affectée supprime logiquement ses affectations actives. Les changements du registre sont sérialisés et des déclencheurs de base de données imposent l’invariant non vide avec un seul principal à la validation de la transaction.

## Gérer les affectations

`manage_assignments` est une capacité de rôle indépendante disponible seulement pour `agreement` et `applicant_recipient`. Elle peut être accordée sans Lecteur et n’est pas comprise dans Gestionnaire. Elle autorise la projection minimale de gestion et les opérations de registre pour les entités pouvant être affectées qui appartiennent à ce sujet et à la portée du rôle.

Elle **n’accorde pas** l’accès au contenu métier, personnel, financier, documentaire ou de flux. Elle n’affecte pas non plus l’administrateur à l’entité. Consultez [Gestion des affectations](../admin/assignments.md) pour le déroulement de la tâche.

Une personne admissible doit être un utilisateur actif qui possède la permission Contributeur ou Gestionnaire pour le sujet propriétaire à la portée actuelle de l’entité. Un utilisateur devenu inactif ou inadmissible demeure visible dans le registre historique, mais ne peut être ajouté, promu ni servir à satisfaire une nouvelle écriture. Les changements de rôle ne réécrivent pas silencieusement l’historique des affectations.

## Visibilité et mutations du registre

L’onglet Utilisateurs affectés d’un promoteur ou d’une entente accessible peut être lu par une personne qui possède le plafond Lecteur pour ce propriétaire. Les gestionnaires d’affectations peuvent aussi lire le registre minimal grâce à leur capacité de gestion indépendante. Une affectation exacte seule ne suffit pas puisqu’elle ne crée jamais de plafond de rôle.

Les actions du registre exigent la permission `manage_assignments` actuelle; l’accès métier ordinaire Contributeur ou Gestionnaire ne la remplace pas. Le serveur résout à nouveau le graphe des rôles et la portée de l’entité dans la transaction d’écriture.

| Action | Invariant |
| --- | --- |
| Ajouter | L’utilisateur est actif, admissible et pas déjà affecté activement. |
| Rendre principal | L’utilisateur est déjà affecté activement et admissible; l’ancien principal est rétrogradé atomiquement. |
| Retirer | L’utilisateur principal et la dernière affectation active ne peuvent être retirés. |

## Travail affecté

La file Travail affecté de la page d’accueil contient seulement les affectations exactes de l’utilisateur qui sont encore ouvertes selon la politique d’état de chaque entité et pour lesquelles il conserve au moins la permission Lecteur. Elle couvre les onze types d’entités pouvant être affectées, trie d’abord le travail principal et fournit un lien direct vers la page de détail appropriée.

La recherche correspond aux identifiants anglais et français, aux types et états bruts, aux libellés de type et d’état localisés et aux libellés des dossiers. Le filtre de type d’entité et la pagination s’appliquent au jeu complet admissible; le composant d’accueil demande dix lignes à la fois.

## Autorisation actualisée

Les écritures protégées ne font pas confiance à une page ouverte avant un changement de rôle, de portée, d’affectation, d’état ou de propriétaire. Le serveur commence une transaction, verrouille et reconstruit le graphe d’autorisation courant de l’appelant, résout le propriétaire et la racine d’affectation actuels, puis autorise la mutation. Un état client périmé ne peut donc pas conserver un accès révoqué.

## Conséquences pour la navigation

- Ententes et Promoteurs apparaissent lorsque l’utilisateur possède une permission de rôle pouvant lire ce sujet; l’affectation seule n’accorde pas la navigation.
- Gestion des affectations apparaît lorsque l’utilisateur possède une capacité `manage_assignments` active.
- Les programmes, rôles, utilisateurs, agences et l’administration Commune utilisent leurs propres sujets et portées; les affectations exactes ne s’y étendent pas.
- Les tâches d’approbation et d’examen demeurent affectées séparément et n’élargissent pas la barre latérale.

## Non-fonctionnalités délibérées

L’application ne fournit pas :

- de commutateurs indépendants de création, lecture, modification et suppression pour les rôles;
- d’indicateurs d’accès direct aux promoteurs stockés sur l’utilisateur;
- de niveaux d’équipe comme `read_only`, `contributor` ou `full_access`;
- d’affectations aux agences ou aux programmes;
- d’héritage d’un parent vers les enfants affectés indépendamment ou les dossiers frères;
- de contournement d’autorisation pour un utilisateur initial ou racine.

Les anciennes routes et les anciens onglets Équipe ont été retirés. Pour diagnostiquer l’accès à une entité enregistrée, vérifiez le plafond du rôle, la portée de la ressource, la racine d’affectation exacte, l’état de l’entité et toute affectation de flux distincte.
