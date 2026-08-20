# Registres des promoteurs

L'onglet **Registres** stocke les identifiants externes d'un promoteur existant. Ouvrez **Promoteurs**, choisissez un profil, puis **Registres**. Le tableau permet la recherche, la pagination, la création, la modification et la suppression logique selon les permissions de profil retournées par le serveur.

## Champs et formats

| Champ | Règle |
| --- | --- |
| Type de registre | Obligatoire. Choisissez le registre externe représenté par la valeur. |
| Numéro | Texte obligatoire. Les espaces au début et à la fin sont retirés. |
| Commentaire Autre | Affiché et obligatoire uniquement lorsque le type est `other`; utilisez-le pour nommer le registre qui n'est pas autrement identifié. |

Trois types imposent un format numérique exact dans la validation de la requête et dans PostgreSQL :

| Type de registre | Format obligatoire |
| --- | --- |
| `federalbusinessnumber` | Exactement 9 chiffres |
| `craprogramaccountnumber` | Exactement 15 chiffres |
| `naics` | De 2 à 6 chiffres |

Les autres types énumérés acceptent actuellement tout texte non vide sans motif supplémentaire. N'ajoutez pas de ponctuation aux trois formats numériques ci-dessus.

## Unicité et cycle de vie

Une paire active `(type de registre, numéro)` est unique dans l'ensemble des promoteurs, et non seulement dans un profil. Un doublon produit un conflit localisé sans révéler ni remplacer l'autre enregistrement. La suppression logique retire la ligne des listes actives et de l'index d'unicité partiel; la même paire peut donc être réutilisée plus tard par une autre ligne active. Les données historiques supprimées demeurent stockées.

La création, la modification et la suppression autorisent d'abord l'action sur le promoteur parent exact. La transaction recharge ensuite le contexte d'autorisation et le verrouille avant de modifier un enfant qui doit appartenir à ce même promoteur. Il est impossible de déplacer un enfant en changeant les identifiants de l'URL. Une modification partielle est fusionnée et revalidée comme enregistrement complet; changer le type peut donc rendre le numéro ou le commentaire existant invalide.

## Recherche et rétablissement

La recherche porte sur le numéro, le type de registre et le commentaire Autre. Lecteur permet la lecture; Contributeur et l’affectation exacte au promoteur permettent la création ou modification; Gestionnaire et cette affectation permettent la suppression logique. Si l’enregistrement échoue, vérifiez la portée et l’affectation, le format, le commentaire Autre requis et l’absence d’une paire active type-numéro identique.

Consultez [Promoteurs](./index.md), [Identifiants financiers d’agence](./agency-financial-ids.md) et [Utilisateurs affectés](./team.md).
