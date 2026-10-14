# Promoteurs de l’entente

L’onglet **Promoteurs** lie des profils de demandeur-bénéficiaire enregistrés à une entente. La base de données et l’API nomment ces enregistrements « demandeurs-bénéficiaires de l’entente »; l’espace de travail les présente comme promoteurs.

## Accès et comportement de la liste

L’accès en lecture à l’entente permet d’énumérer les liens non supprimés vers des profils de promoteur non supprimés, y compris ceux devenus inactifs. Le tableau présente le nom légal bilingue du profil, avec repli sur son nom d’exploitation, ainsi que le nom conservé de son agence responsable lorsqu’il existe. La recherche porte sur l’identifiant du lien, le nom légal ou d’exploitation dans l’une ou l’autre langue et le nom de l’agence responsable.

| Accès à l’entente | Actions disponibles |
| --- | --- |
| `read` | Consulter et rechercher les liens, et parcourir les pages. |
| `create` | Ajouter un lien. |
| `update` | Modifier le profil ou son sous-type de bénéficiaire sur un lien existant. |
| `delete` | Retirer un lien par suppression logique. |

La consultation des liens exige l’accès Lecteur de l’entente. L’ajout ou le remplacement exige Contributeur et l’affectation exacte à l’entente; le retrait exige Gestionnaire et cette affectation. Vous devez aussi disposer d’un accès Lecteur Promoteur (`applicant_recipient`) distinct pour consulter le profil choisi. L’affectation à l’entente n’accorde pas l’accès au promoteur.

## Sélection lors de la création

Le formulaire de nouvelle entente exige au moins un promoteur et refuse les identifiants en double. Son sélecteur présente seulement les profils actifs lisibles par Lecteur Promoteur global ou dans toute agence active de l’appelant. Les profils choisis conservent leurs libellés affichés quand vous cherchez ou changez de page. Un profil enregistré que le système ne peut plus charger est indiqué comme indisponible.

Avant l’enregistrement, le système verrouille chaque profil choisi contre les changements concurrents et revérifie votre accès en lecture. Il enregistre l’entente et ses liens ensemble. Si un profil est devenu inactif ou inaccessible, aucune partie de la nouvelle entente n’est enregistrée.

Chaque lien entente–promoteur exige aussi un sous-type de bénéficiaire parmi les correspondances admissibles du volet. Cette classification décrit le rôle du promoteur dans cette entente; elle ne modifie pas son profil. Si le même promoteur possède déjà un lien actif dans ce volet, la recherche suggère le type enregistré. Le réglage **Exiger un type de promoteur cohérent** du volet fixe le type au choix antérieur admissible; sinon, une personne autorisée peut choisir un autre type admissible. S’il n’y a aucun choix antérieur et un seul type admissible, celui-ci est suggéré. Le serveur revérifie le type à la création ou au remplacement. Un type supprimé ou devenu inadmissible n’est pas proposé pour le nouveau travail; corrigez la correspondance du volet plutôt que le profil du promoteur.

## Identifiant financier d’agence obligatoire

Chaque relation choisit un **Identifiant financier d’agence** enregistré du promoteur lié et de l’agence propriétaire de l’entente. Un nouveau choix ou remplacement doit être actif et non supprimé; un identifiant sans agence ou d’une autre agence est invalide. Le choix enregistré reste lisible et peut être conservé après le retrait de sa source. Changer de promoteur exige un identifiant du nouveau profil.

Par exemple, un promoteur suivi par A peut être lié à une entente B avec son identifiant financier B actif. L’identifiant A ne satisfait pas la relation B. Si aucun choix n’apparaît, un travailleur affecté au promoteur doit créer ou activer l’identifiant B, puis rechargez le sélecteur d’entente. L’affectation à l’entente ne permet pas de modifier ces identifiants. La relation fournit l’identité financière conservée aux dossiers en aval; ne la remplacez pas pour masquer une erreur de validation source.

## Ajouter, remplacer et retirer des liens

Par exemple, pour ajouter un deuxième partenaire de réalisation, sélectionnez son profil actif accessible en lecture, un sous-type de bénéficiaire admissible et son identifiant financier pour l’agence de cette entente. Enregistrez et vérifiez que les deux partenaires figurent dans la liste. Chaque profil ne peut avoir qu’un seul lien actif à cette entente.

Dans une entente enregistrée, **Ajouter** utilise une recherche filtrée selon l’action demandée sur l’entente et la visibilité courante des promoteurs. La modification peut changer le profil lié, son sous-type de bénéficiaire ou les deux; le serveur revérifie un sous-type modifié selon les correspondances admissibles et le réglage de cohérence du volet. Chaque écriture verrouille l’entente, reconstruit son autorisation, puis verrouille et revalide un promoteur nouvellement sélectionné. Un identifiant de lien provenant d’une autre entente est traité comme introuvable.

Le retrait supprime logiquement la relation; il ne supprime ni l’entente ni le promoteur. Cet onglet n’offre aucune commande de restauration. Ajoutez un nouveau lien après un retrait accidentel.

## Références conservées et protection des activités

Un lien conserve le libellé enregistré du promoteur même si son organisme principal est ensuite supprimé. Enregistrer la même référence ne la modifie pas et n’oblige pas à remplacer le contexte historique par un choix actuellement admissible. Choisir un autre promoteur revérifie le nouveau profil, son propriétaire et votre portée de lecture.

L’organisme principal du promoteur peut différer de l’organisme de l’entente. Par exemple, un programme peut financer un promoteur lisible dirigé par un autre organisme; la portée et l’affectation exacte de l’entente restent requises, tandis que la lecture du profil suit la règle du catalogue partagé.

Les liens actifs de partie responsable, réclamations, paiements et comptes débiteurs protègent la relation entente–promoteur. La remplacer ou la supprimer retourne `AGREEMENT_APPLICANT_RECIPIENT_IN_USE` (409); réglez d’abord la référence de l’activité dans l’espace courant ou de modification approprié. Une contrainte d’unicité refuse les paires actives entente–promoteur en double.

Après la création, le système n’exige pas de conserver un lien. Bien que l’assistant exige au moins un promoteur, une suppression autorisée peut ne laisser aucun lien si aucun n’est utilisé. Ne retirez pas le dernier promoteur utile sauf si une entente sans lien est intentionnelle.


## Effets en aval

Les activités de l’entente utilisent les promoteurs actifs liés comme choix de parties responsables. Les vues Historique du financement et Ententes du promoteur déduisent également les relations système à partir des liens actifs. Le retrait peut donc faire disparaître ces projections et choix, tandis que les enregistrements enfants historiques de l’entente demeurent soumis à leurs propres contraintes.

## Guides connexes

- [Vue d’ensemble des ententes](./index.md)
- [Activités](./activities.md)
- [Profils des promoteurs](../proponents/index.md)
