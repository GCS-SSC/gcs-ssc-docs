# Permissions de rôle et affectations exactes

Si vous pouvez consulter un dossier sans pouvoir le modifier, vérifiez votre rôle et votre affectation. Votre rôle définit vos permissions. Votre affectation désigne le dossier précis sur lequel vous travaillez. Il s’agit du contrôle d’accès fondé sur les rôles, ou RBAC.

1. Une permission de rôle fixe les actions permises pour une catégorie de dossiers, appelée le sujet. Elle s’applique dans toute l’application ou dans une agence ou un programme. Le niveau auquel elle s’applique est appelé la portée. Ce maximum est appelé le plafond du rôle ci-dessous.
2. Une **affectation à une entité exacte** désigne le promoteur, l’entente, l’examen, la recommandation, la réclamation, le rapprochement, le paiement, la prévision, la surveillance, la modification ou l’engagement enregistré sur lequel l’utilisateur peut travailler.

Lecteur permet de consulter les dossiers dans la portée de votre rôle sans affectation à chacun. Pour modifier ou supprimer un dossier existant qui possède sa propre liste d’affectations, vous devez normalement avoir la permission de rôle appropriée et une affectation à ce dossier. Une affectation n’augmente jamais vos permissions de rôle. Un rôle couvrant tout un programme ne place pas tous ses dossiers dans votre file de travail.

Les affectations d’approbateur et de réviseur sont des responsabilités de flux distinctes. Elles peuvent autoriser l’action d’approbation ou d’examen attribuée sans donner un accès général au dossier propriétaire. Une affectation à une approbation précise peut aussi permettre de consulter les preuves nécessaires à cette approbation. Les affectations de travail ordinaires exigent toujours la permission de lecture du propriétaire. Les examens de dossiers de financement conservent aussi cette exigence. Consultez [Approbations et achèvements](approvals-completions.md).

## Niveaux d’accès

Chaque permission de rôle possède un niveau d’accès cumulatif :

| Niveau | Actions permises |
| --- | --- |
| Lecteur | Lecture. |
| Contributeur | Lecture, création et modification. |
| Gestionnaire | Lecture, création, modification et suppression. |

`Aucun` signifie que le rôle ne donne aucun accès à cette catégorie. Les permissions de création, lecture, modification et suppression sont regroupées dans les niveaux ci-dessus; elles ne peuvent pas être activées séparément. Gestionnaire n’inclut pas automatiquement les capacités distinctes, comme la gestion des affectations.

## Sujets et portées

Les sujets pris en charge sont `system`, `audit`, `guided_help`, `group`, `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction` et `journal_voucher`.

| Sujet | Rôle global | Rôle d’agence | Rôle de programme |
| --- | :---: | :---: | :---: |
| `system` | Oui | Non | Non |
| `audit` | Oui | Oui | Non |
| `guided_help` | Oui | Oui | Non |
| `group` | Oui | Oui | Non |
| `agency` | Oui | Oui | Non |
| `transfer_payment` | Oui | Oui | Oui |
| `role` | Oui | Oui | Non |
| `user` | Oui | Oui | Non |
| `agreement` | Oui | Oui | Oui |
| `funding_case` | Oui | Oui | Oui |
| `account_receivable` | Oui | Oui | Oui |
| `correction` | Oui | Oui | Oui |
| `journal_voucher` | Oui | Oui | Oui |
| `applicant_recipient` | Oui | Oui | Non |

Un rôle global n’a pas d’agence. Un rôle d’agence est lié à une agence et n’a aucun lien de programme. Un rôle de programme est lié à une agence et à un ou plusieurs programmes actifs de cette agence. Des contraintes de base de données rejettent les combinaisons incompatibles de permissions et de portées.

Le dossier détermine la portée applicable. Une entente utilise son volet et son programme. Un dossier de financement utilise sa possibilité et son programme. Les promoteurs forment un catalogue partagé. Une permission Promoteur globale, ou une permission pour l’action dans une agence active, s’applique à tous les profils de promoteur. L’agence principale permet de suivre la responsabilité, mais ne limite pas l’accès au profil. Les notes d’agence conservent leurs règles de visibilité distinctes.

L’administration de l’aide guidée utilise `guided_help` à la portée globale ou d’agence. Un rôle de programme ne peut pas l’accorder, et elle n’exige aucune affectation exacte à un dossier.

La lecture Audit et la gestion des groupes administratifs utilisent leurs propres sujets plutôt que les affectations exactes aux ententes. Les valeurs d’entrée d’audit exigent aussi `audit:view_audit_inputs`; l’appartenance à un groupe ne donne pas accès aux dossiers métier. Consultez [Audit](../admin/audit.md) et [Groupes](../admin/groups.md).

## La règle des deux clés

Par exemple, un agent de subventions ayant le niveau Contributeur pour les ententes d’un programme peut consulter ces ententes. Pour modifier les lignes budgétaires de l’entente A, il doit aussi être affecté à l’entente A. Cette affectation ne lui permet pas de modifier la réclamation B liée à cette entente : la réclamation B exige sa propre affectation. L’entente parente détermine toujours la portée du rôle applicable.

La **racine d’affectation** est le dossier dont la liste d’affectations est vérifiée. Une adresse utilise la liste de son promoteur; une réclamation utilise sa propre liste. Les règles ci-dessous concernent ce dossier.

Pour une entité racine d’affectation existante :

| Opération | Plafond du rôle | Affectation exacte |
| --- | --- | --- |
| Lire | Lecteur ou niveau supérieur | Non requise |
| Créer une ligne enfant ordinaire | Contributeur ou niveau supérieur sur le sujet parent | Requise sur la racine d’affectation parente |
| Modifier | Contributeur ou niveau supérieur | Requise |
| Supprimer | Gestionnaire | Requise |

La création de premier niveau est la principale exception puisque le nouvel enregistrement n’a pas encore d’affectation. Créer une entente exige Contributeur à sa portée propriétaire; créer un promoteur exige Contributeur Promoteur global ou dans toute agence active. La transaction crée l’entité et affecte son créateur comme utilisateur principal. La création d’un dossier de traitement affecté indépendamment suit le même modèle pour cet enfant.

Une ligne enfant ordinaire, telle qu’une adresse ou une ligne budgétaire, emploie son promoteur ou son entente propriétaire comme racine d’affectation. Un dossier de traitement affecté indépendamment s’emploie lui-même comme racine. L’affectation au parent n’accorde pas l’accès à un enfant affecté indépendamment; l’affectation à l’enfant n’accorde ni le parent ni un dossier frère.

## Entités pouvant être affectées

Le registre d’affectation exacte s’applique aux éléments suivants :

- promoteurs et ententes;
- examens et recommandations communs;
- réclamations et rapprochements de réclamation;
- paiements, prévisions et surveillances;
- modifications et engagements;
- dossiers de financement et collectes de données des flux;
- comptes débiteurs, corrections et pièces de journal sous leurs sujets financiers indépendants.

Un dossier ordinaire actif pouvant être affecté exige au moins un utilisateur actif affecté, dont exactement un utilisateur principal. Un examen, une recommandation, une collecte ou un dossier de financement affecté à un groupe et non réclamé peut n’avoir aucun utilisateur. Dès que des utilisateurs sont affectés, exactement un doit être principal. L’utilisateur principal dirige le travail sans avoir de permissions supplémentaires. Chaque utilisateur affecté reste limité par ses propres permissions de rôle.

Vous pouvez modifier les affectations seulement si le dossier permet encore le travail. Un promoteur doit être actif. Le travail d’entente exige un état métier normal de l’agence et aucun achèvement. Un examen ou une recommandation doit être actif ou en pause, sans être achevé. Les dossiers en lecture seule, dans un état final, achevés ou supprimés sont protégés. Voir [Gestion des affectations](../admin/assignments.md).

Supprimer un dossier ayant des affectations marque aussi ses affectations actives comme supprimées, tout en conservant leur historique. Les changements de liste sont traités un à la fois. La base de données exige une liste non vide avec un seul principal à la fin de la transaction, sous réserve de l’exception des groupes non réclamés ci-dessus.

## Gérer les affectations

`manage_assignments` est une capacité de rôle indépendante disponible pour exactement six sujets : `agreement`, `applicant_recipient`, `funding_case`, `account_receivable`, `correction` et `journal_voucher`. Elle peut être accordée sans Lecteur et n’est pas comprise dans Gestionnaire. Elle permet au gestionnaire d’affectations de voir les renseignements limités nécessaires pour identifier les dossiers et modifier leurs listes d’utilisateurs affectés, pour cette catégorie dans la portée du rôle.

Elle **n’accorde pas** l’accès au contenu métier, personnel, financier, documentaire ou de flux. Elle n’affecte pas non plus l’administrateur à l’entité. Consultez [Gestion des affectations](../admin/assignments.md) pour le déroulement de la tâche.

Une personne admissible doit être un utilisateur actif qui possède la permission Contributeur ou Gestionnaire pour le sujet propriétaire à la portée actuelle de l’entité. Pour un profil de promoteur partagé, une permission globale ou dans toute agence active suffit. Pour un examen ou une recommandation de promoteur associé à une agence, la permission doit couvrir cette agence. Un utilisateur devenu inactif ou inadmissible demeure visible dans le registre historique, mais ne peut être ajouté, promu ni servir à satisfaire une nouvelle écriture. Les changements de rôle ne réécrivent pas silencieusement l’historique des affectations.

## Visibilité et mutations du registre

Pour consulter l’onglet **Utilisateurs affectés** d’un promoteur ou d’une entente, vous devez avoir l’accès Lecteur à ce propriétaire. Les gestionnaires d’affectations peuvent aussi consulter une liste limitée grâce à leur permission de gestion distincte. Une affectation seule ne donne pas l’accès Lecteur.

Les actions du registre exigent la permission `manage_assignments` actuelle; l’accès métier ordinaire Contributeur ou Gestionnaire ne la remplace pas. Le serveur résout à nouveau le graphe des rôles et la portée de l’entité dans la transaction d’écriture.

| Action | Règle |
| --- | --- |
| Ajouter | L’utilisateur est actif, admissible et pas déjà affecté activement. |
| Rendre principal | L’utilisateur est déjà affecté activement et admissible; l’ancien principal perd ce marqueur dans la même transaction. |
| Retirer | L’utilisateur principal et la dernière affectation active ne peuvent être retirés. |

## Travail affecté

L’accueil affiche vos affectations exactes encore ouvertes selon les règles d’état de chaque dossier et pour lesquelles vous conservez au moins la permission Lecteur. **Travail attribué** présente les dossiers dont vous êtes le responsable principal. **Affectations partagées** présente ceux auxquels vous êtes affecté comme responsable supplémentaire. Les promoteurs et les ententes attribués figurent dans des listes distinctes. Chaque liste affiche cinq dossiers par page, possède ses propres commandes de pagination et donne accès au dossier correspondant.

Si vous appartenez à un groupe administratif, **Travail de groupe disponible** présente le travail que vous pouvez réclamer, à raison de dix éléments par page. L’appartenance au groupe ne remplace pas les permissions nécessaires pour réclamer une tâche. Consultez [Navigation](../getting-started/navigation.md) pour le tableau de bord d’accueil et [Groupes](../admin/groups.md) pour la réclamation du travail.

## Vérifications d’accès avant l’enregistrement

Par exemple, si votre affectation est retirée pendant que vous modifiez une réclamation, garder la page ouverte ne conserve pas votre permission d’enregistrer. Rechargez la page et demandez au gestionnaire d’affectations de vérifier votre accès actuel.

Avant d’enregistrer une modification protégée, l’application vérifie à nouveau vos rôles, la portée, l’affectation, le statut et le propriétaire actuels du dossier. Elle verrouille les renseignements concernés et vérifie quelle liste d’affectations s’applique dans la même transaction. Une page ouverte avant un changement d’accès ne conserve pas une permission retirée depuis.

## Éléments affichés dans la navigation

- Ententes et Promoteurs apparaissent lorsque l’utilisateur possède une permission de rôle pouvant lire ce sujet; l’affectation seule n’accorde pas la navigation.
- La navigation Gestion des affectations vérifie `manage_assignments` sur Entente, Promoteur, Dossier de financement, Pièce de journal ou Correction. Une permission de gestion uniquement Compte débiteur est acceptée par l’API, sans cette entrée latérale; ouvrez directement `/assignment-management` si c’est votre seule permission.
- Les programmes, rôles, utilisateurs, agences et l’administration Commune utilisent leurs propres sujets et portées; les affectations exactes ne s’y étendent pas.
- Les tâches d’approbation et d’examen demeurent affectées séparément et n’élargissent pas la barre latérale.

## Options d’accès non offertes par l’application

L’application ne fournit pas :

- de commutateurs indépendants de création, lecture, modification et suppression pour les rôles;
- d’indicateurs d’accès direct aux promoteurs stockés sur l’utilisateur;
- de niveaux d’équipe comme `read_only`, `contributor` ou `full_access`;
- d’affectations aux agences ou aux programmes;
- d’héritage d’un parent vers les enfants affectés indépendamment ou les dossiers frères;
- de contournement d’autorisation pour un utilisateur initial ou racine.

Les anciennes routes et les anciens onglets Équipe ont été retirés. En cas de refus d’accès, vérifiez la permission de rôle, la portée et l’état du dossier, l’affectation requise et toute affectation de flux distincte.
