# Utilisateurs

La zone Utilisateurs gère les identités de l’application, les attributions structurelles de rôles et les quatre indicateurs directs CRUD de promoteur. Les rôles fournissent l’accès ordinaire selon leur portée ; les indicateurs directs constituent l’exception globale d’accès interagences voulue pour les promoteurs. L’appartenance à une équipe exacte de promoteur ou d’entente est gérée sur l’entité enregistrée plutôt que sur cette page.

## Liste des utilisateurs

La page Utilisateurs prend en charge la recherche, la pagination et les statistiques. Les utilisateurs disposant de la permission globale `user:read` voient tous les utilisateurs actifs. Les lecteurs limités à une agence voient leur propre compte, les utilisateurs attribués aux agences autorisées et les utilisateurs membres d’équipes exactes dans ces agences. Les utilisateurs supprimés sont exclus des listes normales.

La table affiche avatar, nom, courriel et actions. Créer apparaît seulement avec `user:create`. La mise à jour et la suppression dépendent aussi des portées actives de l’utilisateur cible : un administrateur limité à des agences doit couvrir chaque agence représentée par les attributions actives de rôle et les appartenances d’équipe de la cible. Une cible ayant un rôle global actif ne peut être modifiée ou supprimée qu’avec l’accès global pour l’action correspondante. Une ligne peut donc être visible sans être modifiable ni supprimable. La suppression de l’utilisateur est logique et entraîne aussi la suppression logique de ses attributions actives.

## Detail utilisateur

Le detail utilisateur contient :

- General, avec nom, courriel, etat de verification du courriel, image et horodatages.
- Attributions, avec les attributions structurelles actives de rôle et les indicateurs directs Promoteur Créer, Lire, Mettre à jour et Supprimer.

Le sommaire affiche nom, courriel, avatar et statut verifie/non verifie. La modification d identite est separee de l attribution de roles.

## Attribuer des roles

Ouvrez l’onglet Attributions et utilisez Ajouter. Le sélecteur charge, pour l’utilisateur affiché, les rôles structurellement valides qui se trouvent dans la portée d’attribution de l’administrateur. Cette opération exige `user:update`, mais pas une capacité `role:read` sans rapport. Les libellés incluent le nom du rôle et le contexte de portée, comme global, agence ou programme, afin de distinguer les doublons de nom.

Lorsqu un role est attribue :

| Regle | Comportement |
| --- | --- |
| L utilisateur cible doit etre actif | Les utilisateurs supprimes ne peuvent pas recevoir de nouvelles attributions actives. |
| Le role doit etre actif | Les roles supprimes ne peuvent pas etre attribues. |
| Les roles globaux exigent la mise a jour globale des utilisateurs | Les administrateurs sans cet acces ne peuvent pas attribuer de roles globaux. |
| Les roles d agence ou programme exigent l acces a l agence du role | L administrateur doit pouvoir mettre a jour les utilisateurs dans l agence visee. |
| Les doublons actifs ne sont pas crees | Enregistrer la meme paire utilisateur-role reutilise l attribution existante. |

Supprimer une attribution la supprime logiquement. L’autorisation côté serveur reflète le changement lors des requêtes suivantes. Les contrôles côté client sont mis à jour après une nouvelle récupération des permissions côté client, par exemple après le rechargement de la page ou une nouvelle connexion.

## Accès direct aux promoteurs

L’onglet Attributions expose aussi quatre indicateurs indépendants de promoteur :

| Indicateur | Effet |
| --- | --- |
| `create` | Créer des promoteurs dans n’importe quelle agence. |
| `read` | Énumérer et lire les promoteurs de toutes les agences. |
| `update` | Modifier tout promoteur et ses enregistrements enfants pris en charge. |
| `delete` | Supprimer logiquement tout promoteur et ses enregistrements enfants pris en charge. |

Ces indicateurs sont stockés directement sur l’utilisateur ; ils ne sont ni des capacités de rôle ni des lignes d’attribution séparées. Seul un utilisateur avec `user:update` global peut les modifier. L’interface avertit que l’accès est interagences et exige une confirmation avant l’enregistrement. Accordez seulement les actions requises ; utilisez plutôt l’équipe exacte d’un promoteur pour donner accès à une seule entité enregistrée.

## Activation d’un utilisateur avec identifiants

La création d’un profil utilisateur ne crée pas de compte avec mot de passe. Un administrateur d’utilisateurs autorisé globalement peut activer un profil non vérifié en définissant son mot de passe initial. L’activation est offerte seulement si l’utilisateur est actif, non vérifié et ne possède aucun compte. Un profil vérifié ou un compte géré par un autre fournisseur est refusé plutôt que remplacé.

Le mot de passe est haché avant que le compte avec identifiants et l’état vérifié soient écrits dans une même transaction. Le mot de passe brut n’est ni renvoyé ni ajouté aux métadonnées d’audit. Communiquez l’identifiant initial par un canal approuvé et exigez que le destinataire respecte la politique de gestion des identifiants de l’organisation.

## Piste d’audit de sécurité

Les mutations de sécurité des rôles et des utilisateurs ajoutent un `security_audit_event` dans la même transaction que la modification. Les événements couvrent la création, le profil, la suppression et les capacités d’un rôle; la création, le profil, la suppression et l’activation d’un utilisateur; les indicateurs directs de promoteur; ainsi que la création et la suppression d’affectations de rôle. Les dossiers identifient l’acteur authentifié, une catégorie d’événement contrainte, le type et l’identifiant de la cible, l’horodatage et des métadonnées structurelles non sensibles. Ils excluent les noms, adresses courriel, images, identifiants, jetons et hachages de mots de passe.

La base de données refuse la modification et la suppression de ces événements à ajout seulement. Une mutation métier échouée ne produit donc aucun événement d’audit, tandis qu’un échec d’insertion de l’audit annule la mutation. L’accès aux données d’audit brutes relève de l’exploitation et de la sécurité; l’interface de gestion des utilisateurs n’offre aucun afficheur général de journal d’audit.

## Gestion du compte racine

Gardez l’attribution racine limitée et facile à auditer. L’utilisateur racine demeure un utilisateur ordinaire avec des capacités globales explicites de rôle et, au besoin, des indicateurs de promoteur activés séparément ; il ne contourne pas l’autorisation. Utilisez des rôles à portée définie pour le travail courant sur les programmes et les ententes, les indicateurs directs seulement pour les tâches liées aux promoteurs qui sont véritablement interagences et les équipes exactes pour collaborer sur un promoteur ou une entente enregistrée.

## Dépannage de l’accès

Si un utilisateur ne voit pas une page :

1. Vérifiez que l’utilisateur n’est pas supprimé.
2. Pour l’accès ordinaire selon la portée, vérifiez que l’attribution de rôle, le rôle, l’agence parente et les programmes sélectionnés sont actifs.
3. Vérifiez que la structure du rôle est valide : un rôle global n’a pas d’agence, un rôle d’agence n’a pas de lien de programme et un rôle de programme a au moins un programme actif dans son agence.
4. Vérifiez que le rôle contient la bonne action et le bon sujet et que sa portée dérivée couvre la ressource demandée.
5. Pour l’accès interagences aux promoteurs, vérifiez l’indicateur CRUD direct correspondant dans Attributions.
6. Pour un promoteur ou une entente enregistrée, vérifiez l’appartenance de l’utilisateur à l’équipe exacte et son niveau d’accès sur cette entité.
7. Demandez à l’utilisateur de se déconnecter puis de se reconnecter si les permissions statiques semblent anciennes. Le serveur résout à la demande l’accès à l’entité accordé par une équipe.

![Onglet Attributions utilisateur](/screenshots/fr/user-assignments.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
