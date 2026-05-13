# Equipe de promoteur

L onglet Equipe affecte des utilisateurs directement a un promoteur. L appartenance a l equipe delegue l acces lorsque la portee d agence ou de programme n est pas assez precise.

## Dependances

| Dependence | Pourquoi c est important |
| --- | --- |
| Compte utilisateur | Un membre d equipe doit etre un utilisateur de l application. |
| Profil de promoteur | Les enregistrements d equipe appartiennent a un promoteur sauvegarde. |
| Permissions de promoteur | L administrateur a besoin de la permission de gestion d equipe. |
| Role de soutien | L equipe fonctionne avec les roles; elle ne remplace pas les capacites utilisateur. |

## Champs

| Champ | Regle |
| --- | --- |
| Membre d equipe | Utilisateur obligatoire. Les doublons actifs sont interdits. |

## Regles metier

| Regle | Comportement |
| --- | --- |
| L appartenance est propre au profil | Elle s applique au promoteur selectionne, pas a tous les promoteurs de l agence. |
| Les doublons actifs sont bloques | N ajoutez pas deux fois le meme utilisateur. |
| L equipe complete les roles | L utilisateur a toujours besoin des capacites pertinentes; l equipe aide a porter ces capacites sur ce profil. |
| Les suppressions sont logiques | Retirer un membre masque l attribution active mais conserve l historique. |

## Conseils

Utilisez l equipe pour les agents responsables, examinateurs ou employes qui ont une responsabilite directe sur un promoteur precis. Retirez les utilisateurs lorsque les responsabilites changent.
