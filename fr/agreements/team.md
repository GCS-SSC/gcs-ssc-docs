# Équipe de l'entente

L'onglet **Équipe** accorde à des utilisateurs de l'application un accès à une seule entente enregistrée précise. Utilisez-le lorsqu'une personne doit travailler sur cette entente sans obtenir de privilèges plus larges sur l'agence, le programme, le volet ou les ententes.

Une affectation à l'équipe d'une entente ne s'étend ni à une autre entente ni à un bénéficiaire lié. Elle ne permet pas de créer une nouvelle entente. Une affectation à une approbation ou à une évaluation ne remplace pas non plus l'accès ordinaire en lecture à l'entente.

## Niveaux d'accès

| Niveau | Actions sur cette entente précise |
| --- | --- |
| `read_only` | Lire l'entente, ses fiches enfants prises en charge et la liste de l'équipe. |
| `contributor` | Lire et modifier l'entente; lire, créer et modifier ses fiches enfants prises en charge. |
| `full_access` | Actions de contribution, plus la suppression logique de l'entente et de ses fiches enfants prises en charge. |

Toute personne ayant un accès effectif en lecture peut consulter la liste active. La recherche porte sur le nom ou le courriel des utilisateurs actifs; les résultats sont paginés et triés par nom. Les affectations et les comptes d'utilisateur supprimés sont omis.

## Plafond de gestion

Les actions de ligne et les niveaux pouvant être accordés dépendent de vos permissions effectives sur l'entente :

- l'accès de modification permet de gérer les affectations `read_only` et `contributor`;
- l'accès de modification et de suppression permet aussi de gérer les affectations `full_access`;
- un niveau existant ou demandé supérieur à votre plafond ne peut être ni modifié ni retiré.

Ces permissions peuvent provenir d'un rôle à portée déterminée ou de votre propre affectation exacte à l'équipe de l'entente.

## Ajouter, modifier ou retirer un membre

Sélectionnez **Ajouter un membre**, choisissez un niveau dans votre plafond, puis recherchez un utilisateur. La recherche contient les utilisateurs actifs de l'application qui n'ont pas déjà une affectation active à cette entente précise. Elle n'est pas limitée à l'agence de l'entente.

L'utilisateur et le niveau d'accès sont obligatoires. Le serveur rejette un utilisateur inactif, une affectation active en double, un niveau inconnu et les champs supplémentaires. La modification change uniquement le niveau d'accès. Le retrait demande une confirmation et supprime logiquement l'affectation; un utilisateur retiré peut être ajouté de nouveau.

Selon l'opération, les écritures verrouillent l'utilisateur visé, l'entente et l'affectation existante, reconstruisent l'autorisation dans la transaction, puis réappliquent le plafond aux niveaux existant et demandé. Un identifiant d'équipe appartenant à une autre entente ou à un autre type d'entité est traité comme introuvable. Une entente absente et une entente inaccessible ne sont pas distinguées pour l'appelant.

::: warning Protection contre la perte d'accès
Il n'existe aucune protection spéciale contre le retrait du dernier gestionnaire ou son propre retrait. Rétrograder ou retirer la seule affectation qui donne l'accès de modification peut empêcher immédiatement toute autre gestion de l'équipe. Confirmez qu'une autre personne autorisée demeure en place. La reprise exige une autre personne suffisamment autorisée; l'onglet Équipe n'offre aucun rétablissement autonome.
:::

## Guides connexes

- [Ententes de financement](./index.md)
- [Bénéficiaires de l'entente](./applicant-recipients.md)
- [Rôles et permissions](../admin/roles.md)
- [Équipe du promoteur](../proponents/team.md)
