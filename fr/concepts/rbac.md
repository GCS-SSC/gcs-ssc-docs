# Contrôle d'accès fondé sur les rôles (RBAC)

GCS-SSC combine trois mécanismes d'accès explicites :

1. **Les rôles** fournissent des permissions délimitées pour l'administration du système, les agences, les programmes et les ententes.
2. **L'accès aux promoteurs** conserve quatre permissions globales propres à l'utilisateur pour l'exception interagences liée aux promoteurs.
3. **Les équipes** donnent à certains utilisateurs un accès à un promoteur ou à une entente précise.

L'accès correspond à l'union des mécanismes applicables à l'action et à la ressource demandées. Une attribution d'équipe peut donc donner accès à son entité précise même si les rôles de l'utilisateur ne le permettent pas. Les attributions de flux de travail, comme celles de réviseur ou d'approbateur, demeurent des responsabilités de processus distinctes; elles ne sont ni des rôles RBAC ni des appartenances à une équipe.

## Actions

Chaque permission utilise l'une des quatre actions suivantes :

| Action | Signification |
| --- | --- |
| `create` | Créer le sujet ou, lorsqu'une équipe d'entité l'autorise, créer un enregistrement enfant. |
| `read` | Consulter ou énumérer les enregistrements couverts par le mécanisme d'accès. |
| `update` | Modifier un enregistrement existant couvert par le mécanisme d'accès. |
| `delete` | Supprimer logiquement un enregistrement couvert par le mécanisme d'accès. |

Le serveur autorise chaque opération. Les liens, les onglets et les boutons reflètent les capacités fournies par le serveur, mais le masquage d'un contrôle est seulement une mesure de convivialité et non la frontière de sécurité.

## Rôles

Un rôle est une collection bilingue et nommée de paires action-sujet. Sa portée est dérivée de sa structure plutôt que conservée comme une valeur modifiable séparément.

| Structure du rôle | Portée effective |
| --- | --- |
| Aucune agence | Globale |
| Une agence et aucun lien de programme | Agence |
| Une agence et un ou plusieurs liens de programme | Programme |

Un rôle à portée de programme peut être lié à plusieurs programmes, mais chaque programme lié doit appartenir à l'agence du rôle. Les rôles, les attributions, les agences, les programmes ou les liens interagences supprimés ne donnent aucun accès. Un rôle dont la structure est invalide ne donne aucun accès non plus.

### Matrice exacte des sujets de rôle

Les rôles contiennent uniquement les six sujets suivants. Chaque combinaison sujet-portée disponible prend en charge les actions `create`, `read`, `update` et `delete`.

| Sujet du rôle | Rôle global | Rôle d'agence | Rôle de programme |
| --- | :---: | :---: | :---: |
| `system` | Oui | Non | Non |
| `agency` | Oui | Oui | Non |
| `transfer_payment` | Oui | Oui | Oui |
| `role` | Oui | Oui | Non |
| `user` | Oui | Oui | Non |
| `agreement` | Oui | Oui | Oui |

La correspondance de portée suit exactement la structure :

- Une permission globale couvre toutes les agences et tous les programmes pour ce sujet.
- Une permission d'agence couvre son agence et les enregistrements du sujet qui relèvent de cette agence.
- Une permission de programme couvre uniquement les programmes liés et les ententes qui relèvent de ces programmes.

Il n'existe aucun sujet générique. Plus précisément, `all` n'est pas un sujet de rôle et aucun chemin de code propre à l'utilisateur racine ne contourne l'autorisation normale. Le rôle racine initial reçoit les 24 paires action-sujet explicites de la colonne globale de la matrice.

## Accès direct d'un utilisateur aux promoteurs

Les promoteurs ne constituent volontairement pas un sujet de rôle. La cible d'autorisation interne `applicant_recipient` sert aux vérifications visant les utilisateurs et les équipes, mais elle ne peut pas être sélectionnée comme capacité d'un rôle. Le travail interagences lié aux promoteurs ne correspond pas à un rôle professionnel délimité par agence ou par programme; il est donc représenté par quatre indicateurs indépendants conservés directement sur l'utilisateur :

| Attribution de l'utilisateur | Effet |
| --- | --- |
| Promoteur `create` | Créer des promoteurs dans n'importe quelle agence. |
| Promoteur `read` | Consulter et énumérer les promoteurs de toutes les agences. |
| Promoteur `update` | Modifier tout promoteur et ses enregistrements enfants pris en charge. |
| Promoteur `delete` | Supprimer logiquement tout promoteur et ses enregistrements enfants pris en charge. |

Les administrateurs modifient ces indicateurs dans l'onglet **Attributions** de l'utilisateur. Seuls les utilisateurs qui possèdent l'autorisation globale `user:update` peuvent les modifier; la gestion des utilisateurs limitée à une agence ou à un programme ne peut pas déléguer cette exception interagences globale. Comme chaque indicateur donne un accès interagences, l'interface affiche un avertissement clair et demande une confirmation avant l'enregistrement.

Ces indicateurs ne sont ni un rôle, ni une permission délimitée, ni un enregistrement d'attribution distinct. Ils sont inclus avec les permissions de rôle lorsque le client charge les permissions statiques de l'utilisateur. Les quatre indicateurs de l'utilisateur racine initial sont explicitement activés.

## Équipes rattachées à une entité précise

Une équipe est disponible uniquement pour un **promoteur** ou une **entente** déjà enregistré. Elle ajoute un utilisateur à cette seule entité précise avec un niveau d'accès :

| Niveau d'accès de l'équipe | Entité précise | Enfants de cette entité |
| --- | --- | --- |
| `read_only` | Lecture | Lecture |
| `contributor` | Lecture et mise à jour | Lecture, création et mise à jour |
| `full_access` | Lecture, mise à jour et suppression | Lecture, création, mise à jour et suppression |

L'accès d'équipe a volontairement des limites étroites :

- Il s'applique au promoteur ou à l'entente sélectionné ainsi qu'aux enfants pris en charge dans ce même domaine.
- Il ne s'applique pas à un autre promoteur ou à une autre entente, à des enregistrements frères, à une agence, à un programme ou à l'autre domaine d'entité.
- Il n'est pas hérité par la hiérarchie d'agence ou de programme.
- Il ne permet pas la création de premier niveau. La création d'un nouveau promoteur exige l'indicateur direct Promoteur `create` de l'utilisateur. La création d'une nouvelle entente exige un rôle délimité comprenant `agreement:create`.
- Il n'exige pas de permission de rôle correspondante. L'appartenance à l'équipe constitue elle-même l'exception visant l'entité précise.
- Il est évalué à la demande pour l'entité visée au lieu d'être ajouté à la liste statique des permissions de rôle de l'utilisateur.

Les utilisateurs qui ont un accès en lecture à l'entité peuvent consulter la liste des membres de son équipe, y compris ceux dont l'accès provient d'une appartenance `read_only`. La modification de l'équipe exige un accès effectif de mise à jour à l'entité et est limitée par l'accès propre du gestionnaire :

| Accès effectif du gestionnaire à l'entité | Niveau d'équipe maximal qu'il peut gérer |
| --- | --- |
| Mise à jour sans suppression | `contributor` |
| Mise à jour et suppression | `full_access` |

Le niveau actuel du membre et le niveau demandé doivent tous deux respecter la limite du gestionnaire. Ainsi, un contributeur ne peut ni modifier ni retirer un membre ayant l'accès complet, y compris en modifiant sa propre appartenance. Les appartenances actives en double sont refusées et le retrait est une suppression logique.

## Résolution de l'accès effectif

Pour chaque requête au serveur, GCS-SSC évalue uniquement les mécanismes pertinents pour la cible :

- Les capacités de rôle sont comparées à la portée globale, d'agence ou de programme dérivée du rôle.
- Les actions sur les promoteurs vérifient l'indicateur global correspondant de l'utilisateur ou une attribution d'équipe visant exactement ce promoteur.
- Les actions sur les ententes vérifient les capacités de rôle délimitées ou une attribution d'équipe visant exactement cette entente.
- Les routes enfants qui prennent en charge les équipes utilisent le niveau exact de l'équipe de l'entité parente et l'action effectuée sur l'enfant.

Le serveur renvoie des capacités propres à l'entité pour les écrans dont les contrôles tiennent compte des équipes. Les opérations qui modifient les permissions sont vérifiées par rapport à l'état actuel de la base de données afin qu'un état client ou une session périmés ne puissent préserver un accès retiré.

## Éléments volontairement exclus du modèle

Le modèle d'autorisation n'utilise pas :

- de sujet générique ou `all`;
- de contournement spécial de l'autorisation pour l'utilisateur racine;
- de champ de portée du rôle conservé indépendamment de l'agence et des liens de programme du rôle;
- de capacités de rôle pour les promoteurs;
- de table générale de permissions par attribution d'entité;
- d'équipes sur les agences ou les programmes de paiements de transfert;
- d'héritage d'équipe entre entités, enregistrements frères, agences, programmes ou domaines;
- d'attributions de réviseur ou d'approbateur comme permissions d'accès.

Cette séparation maintient les accès courants dans les rôles, rend visible l'unique exception interagences sur l'utilisateur et conserve un accès collaboratif aux entités qui est précis et vérifiable.
