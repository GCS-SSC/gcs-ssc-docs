# Equipe de promoteur

L onglet Equipe affecte des utilisateurs directement a un promoteur enregistre. L appartenance a l equipe constitue une exception d acces independante et propre a l entite : elle peut donner acces meme si l utilisateur ne possede aucune capacite de role de promoteur ni aucun indicateur global direct de promoteur.

## Dependances

| Dependence | Pourquoi c est important |
| --- | --- |
| Compte utilisateur | Un membre d equipe doit etre un utilisateur de l application. |
| Profil de promoteur | Les enregistrements d equipe appartiennent a un promoteur sauvegarde. |
| Acces effectif de mise a jour | Requis pour gerer les appartenances `read_only` et `contributor`. |
| Acces effectif de suppression | Requis en plus de la mise a jour pour gerer les appartenances `full_access`. |

## Champs

| Champ | Regle |
| --- | --- |
| Membre d equipe | Utilisateur obligatoire. Les doublons actifs sont interdits. |
| Niveau d acces | Obligatoire : `read_only`, `contributor` ou `full_access`. |

## Regles metier

| Regle | Comportement |
| --- | --- |
| `read_only` | Lire le promoteur selectionne et ses enregistrements enfants pris en charge. |
| `contributor` | Lire et modifier le promoteur selectionne; lire, creer et modifier ses enregistrements enfants pris en charge. |
| `full_access` | Lire, modifier et supprimer logiquement le promoteur selectionne; lire, creer, modifier et supprimer logiquement ses enregistrements enfants pris en charge. |
| L appartenance est exacte | Elle s applique au promoteur selectionne, et non a un autre promoteur, a son agence principale, a un programme, a une entente ou a un enregistrement frere. |
| La creation de premier niveau n est pas heritee | La creation d un nouveau promoteur exige toujours l indicateur global direct Promoteur `create`. |
| Les doublons actifs sont bloques | N ajoutez pas deux fois le meme utilisateur. |
| La gestion respecte une limite | La mise a jour sans suppression permet de gerer jusqu a `contributor`; la mise a jour avec suppression permet de gerer jusqu a `full_access`. Un gestionnaire ne peut ni modifier ni retirer une appartenance au-dessus de cette limite. |
| Le retrait est une suppression logique | Retirer un membre masque l attribution active mais conserve son historique. |

## Conseils

Utilisez l equipe pour les agents responsables, examinateurs ou employes qui ont besoin d acceder a un promoteur precis. Utilisez les quatre indicateurs directs de l utilisateur seulement pour les fonctions qui exigent vraiment un acces interagences global aux promoteurs. Retirez les membres lorsque les responsabilites changent.
