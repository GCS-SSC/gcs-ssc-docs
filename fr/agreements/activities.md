# Activités de l'entente

Utilisez l'onglet **Activités** d'une entente pour décrire les travaux, l'échéancier, les résultats attendus, les résultats de programme connexes et les bénéficiaires responsables. Les activités sont des fiches intégrées à l'entente; elles n'ont pas de page de détail distincte.

## Accès et préalables

Vous devez pouvoir lire l’entente pour voir ses activités. L’accès Contributeur et l’affectation à cette entente permettent d’ajouter ou de modifier une activité; l’accès Gestionnaire et cette affectation sont nécessaires pour la supprimer. Ces permissions s’appellent `read`, `create`, `update` et `delete`. Si l’entente n’existe pas ou vous est inaccessible, l’application donne la même réponse d’introuvable.

Avant de créer une activité :

- configurez les résultats dans le programme de paiements de transfert de l'entente;
- liez chaque bénéficiaire responsable voulu dans l'onglet **Bénéficiaires** de l'entente;
- vérifiez que vous avez l’accès Contributeur ou supérieur et une affectation à cette entente.

Les résultats et responsables disponibles sont vérifiés avec la même permission de création ou de modification que le formulaire. Si un choix manque, confirmez qu’il est configuré ou lié à cette entente et que vous avez l’accès requis.

## Ajouter ou modifier une activité

1. Ouvrez **Activités** dans l’entente et choisissez d’ajouter une activité ou d’en modifier une.
2. Décrivez les travaux et les résultats attendus dans les deux langues, puis entrez les dates de début et de fin.
3. Sélectionnez les résultats de programme auxquels les travaux contribuent et les promoteurs de l’entente qui en sont responsables.
4. Enregistrez, puis vérifiez l’activité dans la liste.

Par exemple, pour un projet de formation communautaire, une activité pourrait être « Deliver six workshops » / « Offrir six ateliers ». Décrivez les séances et les participants, fixez les dates de réalisation et inscrivez un résultat attendu mesurable, comme « 60 participants complete training » / « 60 participants terminent la formation ». Sélectionnez un résultat de programme disponible et le promoteur lié qui offrira les ateliers.

L’onglet ouvre un formulaire plein écran. Tous les champs ci-dessous sont obligatoires.

| Champ | Règle |
| --- | --- |
| Nom anglais | Valeur non vide d'au plus 255 caractères. |
| Nom français | Valeur non vide d'au plus 255 caractères. |
| Date de début | Date obligatoire. |
| Date de fin | Date obligatoire, égale ou postérieure à la date de début. |
| Description anglaise | Texte non vide. |
| Description française | Texte non vide. |
| Résultats attendus en anglais | Texte non vide. |
| Résultats attendus en français | Texte non vide. |
| Résultats connexes | Au moins un résultat actif et unique appartenant au programme de l'entente. |
| Responsables | Au moins un lien unique et non supprimé entre l’entente et un promoteur non supprimé. Cette vérification n’exige pas que l’indicateur Actif du profil soit encore activé. |

Les sélecteurs de résultats et de responsables offrent une recherche côté serveur et la sélection multiple. Si un seul responsable est disponible au chargement d'un nouveau formulaire, l'interface le sélectionne automatiquement; vous pouvez tout de même modifier ce choix. Lorsqu'une recherche est vide, son bouton de sélection est désactivé et l'interface indique qu'aucun choix n'est disponible.

Changer la langue de l'interface change les noms affichés, et non les valeurs anglaises et françaises enregistrées. Chaque champ linguistique doit être rempli séparément.

## Liste et recherche

Le tableau présente le nom et la description dans la langue active, les dates de début et de fin, les résultats attendus dans la langue active ainsi que les pastilles de résultats et de responsables. Il est paginé. La recherche porte sur l'identifiant de l'activité; le nom, la description ou les résultats attendus en anglais ou en français; les noms des résultats; ainsi que les dénominations sociales ou noms commerciaux des bénéficiaires. Elle ne porte **pas** sur les dates affichées.

Les liens de résultat supprimés, les liens entente–promoteur supprimés et les promoteurs supprimés sont omis des résultats et des pastilles.

## Validation, concurrence et reprise

À l’enregistrement, l’application vérifie de nouveau votre accès à l’entente et vos sélections. Chaque résultat doit encore appartenir au programme de l’entente et chaque responsable doit encore être lié à cette entente. Un choix supprimé ou appartenant à un autre programme ou à une autre entente est refusé avec une erreur dans la langue courante.

Par exemple, si un collègue retire un lien de promoteur pendant que vous saisissez une activité, l’enregistrement avec ce responsable peut échouer. Conservez votre brouillon, rechargez l’entente et choisissez un responsable actuellement disponible.

L’activité et toutes ses sélections sont enregistrées ensemble. Si une partie de l’enregistrement échoue, aucun de ces changements n’est enregistré. Retirer un résultat ou un responsable sélectionné conserve l’ancien lien dans l’historique; le sélectionner de nouveau restaure ce lien lorsque c’est possible. Les vérifications empêchent aussi les plages de dates invalides, les liens vers une autre entente ou version d’activité et les liens actifs en double vers le même résultat ou responsable.

Si quelqu’un change votre accès ou les choix disponibles avant l’enregistrement, rechargez l’entente et rouvrez le formulaire. Enregistrer sans changer de champ laisse l’activité inchangée. Lorsque vous changez une seule date, l’autre date enregistrée continue de s’appliquer : le début ne peut pas dépasser la fin existante. Les renseignements de l’activité et les libellés de résultats et de responsables sont lus ensemble pour que la liste reste cohérente.

## Suppression et versions

La suppression d'une activité demande une confirmation, puis supprime logiquement l'activité et ses liens de résultat. Les liens de responsables deviennent invisibles parce que leur activité parente est supprimée, mais la route principale de suppression ne marque pas séparément ces lignes comme supprimées. L'onglet Activités n'offre aucune restauration; la reprise exige une intervention administrative ou sur les données autorisée.

L’onglet Activités ordinaire montre la version de travail courante de l’entente, créée automatiquement avec celle-ci. Les changements préparés dans une modification utilisent une copie enregistrée distincte et les commandes d’activités de la modification. Ils ne changent pas immédiatement l’onglet Activités ordinaire. Les révisions approuvées conservent la provenance de leur version. Consultez [Ententes de financement](./index.md) pour la carte des onglets.

Une activité ne lance pas elle-même une approbation, une évaluation, une réalisation ni un flux de travail.

## Guides connexes

- [Ententes de financement](./index.md)
- [Bénéficiaires de l'entente](./applicant-recipients.md)
- [Programmes et résultats](../programs/index.md)
