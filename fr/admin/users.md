# Utilisateurs

La zone Utilisateurs gere les identites de l application et leurs attributions de roles. Un utilisateur seul ne donne aucun acces; l acces provient des attributions actives et des capacites contenues dans ces roles.

## Liste des utilisateurs

La page Utilisateurs prend en charge recherche, pagination et statistiques. Les lecteurs racine ou globaux voient tous les utilisateurs actifs. Les lecteurs limites a une agence voient eux-memes, les utilisateurs attribues aux agences autorisees et les utilisateurs ayant des attributions d entite dans ces agences. Les utilisateurs supprimes sont exclus des listes normales.

La table affiche avatar, nom, courriel et actions. Créer apparaît seulement avec `user:create`. La mise à jour et la suppression dépendent aussi des portées actives de l’utilisateur cible : un administrateur limité à des agences doit couvrir chaque agence représentée par les attributions actives de rôle et d’entité de la cible. Une cible ayant un rôle global actif ne peut être modifiée ou supprimée qu’avec l’accès global pour l’action correspondante. Une ligne peut donc être visible sans être modifiable ni supprimable. La suppression est logique.

## Detail utilisateur

Le detail utilisateur contient :

- General, avec nom, courriel, etat de verification du courriel, image et horodatages.
- Attributions, avec les attributions actives de role et les libelles localises de role et d agence.

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

## Gestion du compte racine

Gardez l attribution racine limitee et auditable. La racine sert a la configuration systeme, Commun, l activation des extensions et les reparations d urgence. Les operations quotidiennes de programme, entente et promoteur devraient utiliser des roles portes.

## Depannage de l acces

Si un utilisateur ne voit pas une page :

1. Verifiez que l utilisateur n est pas supprime.
2. Verifiez que l attribution est active.
3. Vérifiez que le rôle, son agence parente et les programmes sélectionnés sont actifs.
4. Vérifiez que la structure du rôle est valide : un rôle global n’a pas d’agence, un rôle d’agence n’a pas de lien de programme et un rôle de programme a au moins un programme actif dans son agence.
5. Vérifiez que le rôle a la bonne action et le bon sujet.
6. Vérifiez que la portée du rôle couvre l’agence, le programme ou l’entité.
7. Demandez à l’utilisateur de se déconnecter puis se reconnecter si les permissions visibles semblent encore anciennes.

![Onglet Attributions utilisateur](/screenshots/fr/user-assignments.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
