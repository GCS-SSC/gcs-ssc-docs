# Utilisateurs

La zone Utilisateurs gere les identites de l application et leurs attributions de roles. Un utilisateur seul ne donne aucun acces; l acces provient des attributions actives et des capacites contenues dans ces roles.

## Liste des utilisateurs

La page Utilisateurs prend en charge recherche, pagination et statistiques. Les lecteurs racine ou globaux voient tous les utilisateurs actifs. Les lecteurs limites a une agence voient eux-memes, les utilisateurs attribues aux agences autorisees et les utilisateurs ayant des attributions d entite dans ces agences. Les utilisateurs supprimes sont exclus des listes normales.

La table affiche avatar, nom, courriel et actions. Creer apparait seulement avec `user:create`. Supprimer apparait seulement avec `user:delete`. La suppression est logique.

## Detail utilisateur

Le detail utilisateur contient :

- General, avec nom, courriel, etat de verification du courriel, image et horodatages.
- Attributions, avec les attributions actives de role et les libelles localises de role et d agence.

Le sommaire affiche nom, courriel, avatar et statut verifie/non verifie. La modification d identite est separee de l attribution de roles.

## Attribuer des roles

Ouvrez l onglet Attributions et utilisez Ajouter. Le selecteur de role offre seulement les roles visibles par l administrateur courant. Les libelles incluent le nom du role et le contexte de portee, comme global, agence ou programme, afin de distinguer les doublons de nom.

Lorsqu un role est attribue :

| Regle | Comportement |
| --- | --- |
| L utilisateur cible doit etre actif | Les utilisateurs supprimes ne peuvent pas recevoir de nouvelles attributions actives. |
| Le role doit etre actif | Les roles supprimes ne peuvent pas etre attribues. |
| Les roles globaux exigent la mise a jour globale des utilisateurs | Les administrateurs sans cet acces ne peuvent pas attribuer de roles globaux. |
| Les roles d agence ou programme exigent l acces a l agence du role | L administrateur doit pouvoir mettre a jour les utilisateurs dans l agence visee. |
| Les doublons actifs ne sont pas crees | Enregistrer la meme paire utilisateur-role reutilise l attribution existante. |

Supprimer une attribution la supprime logiquement. Les permissions changent apres actualisation des permissions de session ou apres reconnexion de l utilisateur.

## Gestion du compte racine

Gardez l attribution racine limitee et auditable. La racine sert a la configuration systeme, Commun, l activation des extensions et les reparations d urgence. Les operations quotidiennes de programme, entente et promoteur devraient utiliser des roles portes.

## Depannage de l acces

Si un utilisateur ne voit pas une page :

1. Verifiez que l utilisateur n est pas supprime.
2. Verifiez que l attribution est active.
3. Verifiez que le role n est pas supprime.
4. Verifiez que le role a la bonne action et le bon sujet.
5. Verifiez que la portee du role couvre l agence, le programme ou l entite.
6. Demandez a l utilisateur de se deconnecter puis reconnecter si les permissions visibles semblent encore anciennes.

![Onglet Attributions utilisateur](/screenshots/fr/user-assignments.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
