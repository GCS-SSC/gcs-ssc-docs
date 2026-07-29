# Equipe de promoteur

L’onglet Équipe affecte des utilisateurs directement à un promoteur enregistré. L’appartenance à l’équipe constitue une exception d’accès indépendante et propre à l’entité : elle peut donner accès même si l’utilisateur ne possède aucune capacité de rôle de promoteur ni aucun indicateur global direct de promoteur.

## Dépendances

| Dépendance | Pourquoi c’est important |
| --- | --- |
| Compte utilisateur | Un membre d’équipe doit être un utilisateur de l’application. |
| Profil de promoteur | Les enregistrements d’équipe appartiennent à un promoteur sauvegardé. |
| Accès effectif permettant la mise à jour | Requis pour gérer les appartenances `read_only` et `contributor`. |
| Accès effectif permettant la suppression | Requis, en plus de l’accès effectif permettant la mise à jour, pour gérer les appartenances `full_access`. |

## Champs

| Champ | Regle |
| --- | --- |
| Membre d equipe | Utilisateur obligatoire. Les doublons actifs sont interdits. |
| Niveau d’accès | Obligatoire : `read_only`, `contributor` ou `full_access`. |

## Regles metier

| Regle | Comportement |
| --- | --- |
| `read_only` | Lire le promoteur sélectionné et ses enregistrements enfants pris en charge. |
| `contributor` | Lire et modifier le promoteur sélectionné ; lire, créer et modifier ses enregistrements enfants pris en charge. |
| `full_access` | Lire, modifier et supprimer logiquement le promoteur sélectionné ; lire, créer, modifier et supprimer logiquement ses enregistrements enfants pris en charge. |
| L’appartenance est exacte | Elle s’applique au promoteur sélectionné, et non à un autre promoteur, à son agence principale, à un programme, à une entente ou à un enregistrement frère. |
| La création de premier niveau n’est pas héritée | La création d’un nouveau promoteur exige toujours l’indicateur global direct Promoteur `create`. |
| Les doublons actifs sont bloques | N ajoutez pas deux fois le meme utilisateur. |
| La gestion respecte une limite | La mise à jour sans suppression permet de gérer jusqu’à `contributor` ; la mise à jour avec suppression permet de gérer jusqu’à `full_access`. Un gestionnaire ne peut ni modifier ni retirer une appartenance au-dessus de cette limite. |
| Le retrait est une suppression logique | Retirer un membre masque l’attribution active, mais conserve son historique. |

## Conseils

Utilisez l’équipe pour les agents responsables, les examinateurs ou les employés qui ont besoin d’accéder à un promoteur précis. Utilisez les quatre indicateurs directs de l’utilisateur seulement pour les fonctions qui exigent vraiment un accès global interagences aux promoteurs. Retirez les membres lorsque les responsabilités changent.
