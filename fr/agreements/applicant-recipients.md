# Promoteurs de l'entente

Utilisez **Promoteurs** pour lier des profils de promoteur enregistrés à une entente.

## Accès et comportement de la liste

Avec l'accès en lecture à l'entente, vous pouvez voir ses profils de promoteur liés, y compris ceux devenus inactifs. Les liens et profils supprimés ne s'affichent pas. Le tableau présente le nom légal bilingue de chaque profil, ou son nom d'exploitation en l'absence de nom légal. Il affiche aussi le nom enregistré de l'organisme principal lorsqu'il est disponible. La recherche porte sur l'identifiant du lien, le nom légal ou d'exploitation dans l'une ou l'autre langue et le nom de l'agence responsable.

| Accès requis à l'entente | Actions disponibles |
| --- | --- |
| Lecteur | Consulter et rechercher les profils liés. |
| Contributeur et affectation à cette entente | Ajouter un lien ou modifier son profil, son sous-type de bénéficiaire ou son identifiant financier. |
| Gestionnaire et affectation à cette entente | Retirer un lien en conservant son historique. |

Vous devez aussi disposer d'un accès Lecteur distinct aux promoteurs pour consulter le profil choisi. L'affectation à l'entente n'accorde pas cet accès.

## Sélection lors de la création

À la création d'une entente, sélectionnez au moins un promoteur. Vous ne pouvez pas sélectionner le même profil deux fois. Le sélecteur présente seulement les profils actifs que vous pouvez lire avec l'accès Lecteur global aux promoteurs ou l'accès Lecteur dans un organisme actif. Les profils choisis conservent leurs libellés affichés quand vous cherchez ou changez de page. Un profil enregistré que le système ne peut plus charger est indiqué comme indisponible.

À l'enregistrement, l'application revérifie votre accès en lecture et empêche les autres changements aux profils choisis jusqu'à la fin de l'opération. Elle enregistre l'entente et ses liens ensemble. Si un profil est devenu inactif ou inaccessible, aucune partie de la nouvelle entente n'est enregistrée.

Pour chaque promoteur lié, choisissez un sous-type de bénéficiaire permis par le volet de l'entente. Il décrit le rôle du promoteur dans cette entente. Il ne modifie pas le profil du promoteur. Si le même promoteur possède déjà un lien actif dans ce volet, la recherche suggère le type enregistré. Le réglage **Exiger un type de promoteur cohérent** du volet fixe le type au choix antérieur admissible; sinon, une personne autorisée peut choisir un autre type admissible. S'il n'y a aucun choix antérieur et un seul type admissible, celui-ci est suggéré. Le serveur revérifie le type à la création ou au remplacement. Un type supprimé ou devenu inadmissible n'est pas proposé pour le nouveau travail; corrigez la correspondance du volet plutôt que le profil du promoteur.

## Identifiant financier d'agence obligatoire

Pour chaque promoteur lié, sélectionnez un **Identifiant financier d'agence** enregistré du promoteur lié et de l'agence propriétaire de l'entente. Un nouveau choix ou remplacement doit être actif et non supprimé; un identifiant sans agence ou d'une autre agence est invalide. Le choix enregistré reste lisible et peut être conservé après le retrait de sa source. Changer de promoteur exige un identifiant du nouveau profil.

Par exemple, un promoteur suivi par A peut être lié à une entente B avec son identifiant financier B actif. L'identifiant A ne satisfait pas la relation B. Si aucun choix n'apparaît, un travailleur affecté au promoteur doit créer ou activer l'identifiant B, puis rechargez le sélecteur d'entente. L'affectation à l'entente ne permet pas de modifier ces identifiants. Les dossiers financiers connexes utilisent cet identifiant enregistré. Corrigez un identifiant invalide à sa source plutôt que d'en choisir un autre pour contourner l'erreur.

## Ajouter, remplacer et retirer des liens

Par exemple, pour ajouter un deuxième partenaire de réalisation, sélectionnez son profil actif accessible en lecture, un sous-type de bénéficiaire admissible et son identifiant financier pour l'agence de cette entente. Enregistrez et vérifiez que les deux partenaires figurent dans la liste. Chaque profil ne peut avoir qu'un seul lien actif à cette entente.

Dans une entente enregistrée, **Ajouter** présente les profils que vos permissions sur l'entente et votre accès en lecture aux promoteurs permettent de sélectionner. La modification peut changer le profil lié, son sous-type de bénéficiaire ou son identifiant financier; le serveur revérifie un sous-type modifié selon les correspondances admissibles et le réglage de cohérence du volet. L'application vérifie votre affectation actuelle, l'état de l'entente et le promoteur choisi avant l'enregistrement. Si votre accès ou l'état change, rechargez l'entente et vérifiez que vous pouvez encore la modifier.

Le retrait du lien conserve son historique. Il ne supprime ni l'entente ni le promoteur. Cet onglet n'offre aucune commande de restauration. Ajoutez un nouveau lien après un retrait accidentel.

## Références conservées et protection des activités

Un lien conserve le libellé enregistré du promoteur même si son organisme principal est ensuite supprimé. Vous pouvez conserver ce choix enregistré pendant d'autres modifications. Choisir un autre promoteur revérifie le nouveau profil, son propriétaire et votre portée de lecture.

L'organisme principal du promoteur peut différer de l'organisme de l'entente. Par exemple, un programme peut financer un promoteur lisible dirigé par un autre organisme. Vous devez toujours avoir accès à l'entente et y être affecté, en plus de pouvoir lire le promoteur dans le catalogue partagé.

Vous ne pouvez pas remplacer ou retirer un promoteur lié tant que des lignes budgétaires actives dans une version quelconque, des activités, des réclamations, des paiements ou des comptes débiteurs utilisent le lien. L'application retourne `AGREEMENT_APPLICANT_RECIPIENT_IN_USE` avec le statut 409. Vérifiez les dossiers qui utilisent le lien avant de réessayer. Modifiez la partie responsable d'une activité dans l'entente courante ou la modification, selon le cas. Vous ne pouvez pas ajouter le même promoteur deux fois à une entente.

Après la création, le système n'exige pas de conserver un lien. Bien que l'assistant exige au moins un promoteur, une suppression autorisée peut ne laisser aucun lien si aucun n'est utilisé. Ne retirez pas le dernier promoteur utile sauf si une entente sans lien est intentionnelle.

Avant de retirer un promoteur utilisé par le budget, vérifiez le budget courant et les copies de modification. Réattribuez ou retirez ses lignes actives seulement si le financement proposé et les références en aval le permettent. Changer uniquement le sous-type de bénéficiaire ne remplace pas le promoteur lié.

## Effets en aval

Les activités de l'entente utilisent les promoteurs actifs liés comme choix de parties responsables. Les vues Historique du financement et Ententes du promoteur déduisent également les relations système à partir des liens actifs. Le retrait peut faire disparaître le promoteur de ces vues et choix. Les dossiers historiques conservent leurs propres règles sur les liens conservés.

## Guides connexes

- [Vue d'ensemble des ententes](./index.md)
- [Activités](./activities.md)
- [Profils des promoteurs](../proponents/index.md)
