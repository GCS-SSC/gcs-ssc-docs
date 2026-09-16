# Promoteurs de l’entente

L’onglet **Promoteurs** lie des profils de demandeur-bénéficiaire enregistrés à une entente. La base de données et l’API nomment ces enregistrements « demandeurs-bénéficiaires de l’entente »; l’espace de travail les présente comme promoteurs.

## Accès et comportement de la liste

L’accès en lecture à l’entente permet d’énumérer les liens non supprimés vers des profils de promoteur non supprimés, y compris ceux devenus inactifs. Le tableau présente le nom légal bilingue du profil, avec repli sur son nom d’exploitation, ainsi que le nom conservé de son agence responsable lorsqu’il existe. La recherche porte sur l’identifiant du lien, le nom légal ou d’exploitation dans l’une ou l’autre langue et le nom de l’agence responsable.

| Accès à l’entente | Actions disponibles |
| --- | --- |
| `read` | Consulter et rechercher les liens, et parcourir les pages. |
| `create` | Ajouter un lien. |
| `update` | Remplacer le profil d’un lien existant. |
| `delete` | Retirer un lien par suppression logique. |

La lecture des liens exige le plafond Lecteur de l’entente. L’ajout ou le remplacement exige Contributeur et l’affectation exacte à l’entente; le retrait exige Gestionnaire et cette affectation. Le promoteur est une frontière distincte et doit être lisible grâce à Lecteur `applicant_recipient`. L’affectation à l’entente n’accorde pas l’accès au promoteur.

## Sélection lors de la création

Le formulaire de nouvelle entente exige au moins un promoteur et refuse les identifiants en double. Son sélecteur présente seulement les profils actifs lisibles par la portée Lecteur Promoteur globale ou de l’agence principale de l’appelant. Les identifiants choisis sont hydratés séparément afin que leurs libellés survivent à la pagination et à la recherche; un profil enregistré qui ne peut plus être résolu est marqué indisponible.

La création verrouille chaque profil sélectionné et revérifie l’accès en lecture dans la transaction qui insère l’entente et les liens. Si un profil devient inactif ou inaccessible, toute la création échoue.

## Ajouter, remplacer et retirer des liens

Dans une entente enregistrée, **Ajouter** utilise une recherche filtrée selon l’action demandée sur l’entente et la visibilité courante des promoteurs. La modification change seulement le profil référencé par ce lien. Chaque écriture verrouille l’entente, reconstruit son autorisation, puis verrouille et revalide un promoteur nouvellement sélectionné. Un identifiant de lien provenant d’une autre entente est traité comme introuvable.

Le retrait supprime logiquement la relation; il ne supprime ni l’entente ni le promoteur. Cet onglet n’offre aucune commande de restauration. Ajoutez un nouveau lien après un retrait accidentel.

## Références conservées et protection des activités

Un lien conserve le libellé enregistré du promoteur même si son organisme principal est ensuite supprimé. Enregistrer la même référence ne la modifie pas et n’oblige pas à remplacer le contexte historique par un choix actuellement admissible. Choisir un autre promoteur revérifie le nouveau profil, son propriétaire et votre portée de lecture.

L’organisme principal du promoteur peut différer de l’organisme de l’entente. Par exemple, un programme peut financer un promoteur lisible dirigé par un autre organisme; chaque dossier garde sa propre frontière d’autorisation.

Un lien actif de partie responsable d’activité protège la relation entente–promoteur. La remplacer ou la supprimer retourne `AGREEMENT_APPLICANT_RECIPIENT_IN_USE` (409); réglez d’abord la référence de l’activité dans l’espace courant ou de modification approprié. Une contrainte d’unicité refuse les paires actives entente–promoteur en double.

Il n’existe pas de garde du dernier lien après création. Bien que l’assistant exige au moins un promoteur, une suppression autorisée peut ne laisser aucun lien si aucun n’est utilisé. Ne retirez pas le dernier promoteur utile sauf si une entente sans lien est intentionnelle.


## Effets en aval

Les activités de l’entente utilisent les promoteurs actifs liés comme choix de parties responsables. Les vues Historique du financement et Ententes du promoteur déduisent également les relations système à partir des liens actifs. Le retrait peut donc faire disparaître ces projections et choix, tandis que les enregistrements enfants historiques de l’entente demeurent soumis à leurs propres contraintes.

## Guides connexes

- [Vue d’ensemble des ententes](./index.md)
- [Activités](./activities.md)
- [Profils des promoteurs](../proponents/index.md)
