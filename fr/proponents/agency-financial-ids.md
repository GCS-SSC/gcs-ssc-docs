# Identifiants financiers d'agence du promoteur

L'onglet **Identifiants financiers d'agence** associe un promoteur existant à l'identifiant entier utilisé par un système financier ou de subventions d'une agence. Ouvrez **Promoteurs**, choisissez un profil, puis **Identifiants financiers d'agence**. Le tableau permet la recherche, la pagination, la création, la modification et la suppression logique selon les permissions du profil parent.

## Champs

| Champ | Règle |
| --- | --- |
| Agence | Facultative. Lorsqu'elle est fournie, elle doit référencer une agence active. La recherche liste les agences actives après avoir autorisé l'action de création ou de modification sur le promoteur parent. |
| Identifiant du système financier | Entier sûr obligatoire. Il est stocké dans un `bigint` PostgreSQL; l'interface actuelle utilise un champ numérique. |

Puisque l'agence est facultative dans le contrat source actuel, un identifiant sans portée peut être enregistré. Sélectionnez de préférence une agence lorsque l'identifiant lui appartient afin de préserver clairement sa provenance.

## Unicité et cycle de vie

Pour les lignes qui ont une agence, le triplet actif `(agence, promoteur, identifiant du système financier)` est unique. PostgreSQL considère les valeurs `NULL` comme distinctes dans cet index; la contrainte n'empêche donc pas les doublons actifs lorsque le champ Agence est vide. Évitez ces doublons ambigus dans les opérations.

L'agence ne doit pas nécessairement être l'agence principale du promoteur. L'accès est imposé sur le promoteur parent exact et n'est pas déduit de l'agence choisie. La création et la modification refusent une agence fournie qui est supprimée ou inconnue. Une modification fusionne et valide la ligne complète; une suppression fixe `_deleted = true`. La ligne supprimée disparaît de la recherche active et ne participe plus à l'index d'unicité partiel, mais les données historiques demeurent.

La lecture exige le plafond Lecteur du promoteur. Chaque mutation revérifie le parent et son affectation exacte dans une transaction à autorisation actualisée : Contributeur crée ou modifie et Gestionnaire supprime. L’identifiant de l’enfant doit appartenir au parent indiqué dans l’URL.

## Recherche et rétablissement

La recherche porte sur l’identifiant financier et les deux noms localisés de l’agence. Une agence supprimée n’est pas affichée comme ligne active. Si le sélecteur est vide ou qu’un enregistrement échoue, confirmez que le promoteur existe toujours, que votre plafond de rôle et votre affectation exacte permettent la mutation et que l’agence est active. Si l’identifiant appartient réellement à une agence, ne contournez pas une agence invalide en vidant le champ; restaurez ou choisissez la bonne agence.

Utilisez [Registres](./registries.md) pour les numéros d'entreprise, les comptes de programme de l'ARC, le SCIAN et les autres identifiants de registre externes.
