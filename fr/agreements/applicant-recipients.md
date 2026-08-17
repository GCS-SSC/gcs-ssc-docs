# Promoteurs de l’entente

L’onglet **Promoteurs** lie des profils de demandeur-bénéficiaire enregistrés à une entente. La base de données et l’API nomment ces enregistrements « demandeurs-bénéficiaires de l’entente »; l’espace de travail les présente comme promoteurs.

## Accès et comportement de la liste

L’accès en lecture à l’entente permet d’énumérer les liens actifs vers des profils de promoteur actifs. Le tableau présente le nom légal bilingue du profil, avec repli sur son nom d’exploitation, ainsi que son agence responsable active lorsqu’elle existe. La recherche porte sur l’identifiant du lien, le nom légal ou d’exploitation dans l’une ou l’autre langue et le nom de l’agence responsable.

| Accès à l’entente | Actions disponibles |
| --- | --- |
| `read` | Consulter et rechercher les liens, et parcourir les pages. |
| `create` | Ajouter un lien. |
| `update` | Remplacer le profil d’un lien existant. |
| `delete` | Retirer un lien par suppression logique. |

L’accès exact par l’équipe de l’entente fournit ces actions selon son niveau. Le promoteur sélectionné constitue une limite d’autorisation distincte : l’ajout ou le remplacement exige aussi un accès effectif en lecture à ce promoteur actif. Une équipe d’entente n’accorde pas l’accès aux promoteurs.

## Sélection lors de la création

Le formulaire de nouvelle entente exige au moins un promoteur et refuse les identifiants en double dans le tableau soumis. Son sélecteur consultable présente seulement les profils actifs que l’utilisateur peut lire grâce à des privilèges globaux relatifs aux promoteurs ou à une équipe exacte du promoteur. Les identifiants sélectionnés sont hydratés séparément afin que leurs libellés survivent à la pagination et à la recherche; le formulaire signale un profil sélectionné comme indisponible s’il ne peut plus être résolu.

La création verrouille chaque profil sélectionné et revérifie l’accès en lecture dans la transaction qui insère l’entente et les liens. Si un profil devient inactif ou inaccessible, toute la création échoue.

## Ajouter, remplacer et retirer des liens

Dans une entente enregistrée, **Ajouter** utilise une recherche filtrée selon l’action demandée sur l’entente et la visibilité courante des promoteurs. La modification change seulement le profil référencé par ce lien. Chaque écriture verrouille l’entente, reconstruit son autorisation, puis verrouille et revalide un promoteur nouvellement sélectionné. Un identifiant de lien provenant d’une autre entente est traité comme introuvable.

Le retrait supprime logiquement la relation; il ne supprime ni l’entente ni le promoteur. Cet onglet n’offre aucune commande de restauration. Ajoutez un nouveau lien après un retrait accidentel.

::: warning Cardinalité après la création
L’assistant de création exige au moins un identifiant de promoteur unique, mais les routes enfants ultérieures ne maintiennent pas cette règle. Le code actuel ne comporte ni protection du dernier lien ni contrainte d’unicité active sur la paire entente-promoteur. Une personne autorisée peut retirer le dernier lien ou ajouter le même promoteur plus d’une fois. Vérifiez le tableau avant l’ajout et ne retirez pas le dernier promoteur utile, sauf si une entente sans promoteur est voulue.
:::

## Effets en aval

Les activités de l’entente utilisent les promoteurs actifs liés comme choix de parties responsables. Les vues Historique du financement et Ententes du promoteur déduisent également les relations système à partir des liens actifs. Le retrait peut donc faire disparaître ces projections et choix, tandis que les enregistrements enfants historiques de l’entente demeurent soumis à leurs propres contraintes.

## Guides connexes

- [Vue d’ensemble des ententes](./index.md)
- [Activités](./activities.md)
- [Profils des promoteurs](../proponents/index.md)
