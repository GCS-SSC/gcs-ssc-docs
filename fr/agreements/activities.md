# Activités de l'entente

Utilisez l'onglet **Activités** d'une entente pour décrire les travaux, l'échéancier, les résultats attendus, les résultats de programme connexes et les bénéficiaires responsables. Les activités sont des fiches intégrées à l'entente; elles n'ont pas de page de détail distincte.

## Accès et préalables

L'entente doit exister et être visible dans votre portée exacte sur l'entente. L'action `read` permet d'afficher les activités, `create` de les ajouter, `update` de les modifier et `delete` de les retirer. Le serveur vérifie l'action demandée sur l'entente et renvoie volontairement la même réponse d'introuvable lorsque l'entente est absente ou inaccessible.

Avant de créer une activité :

- configurez les résultats dans le programme de paiements de transfert de l'entente;
- liez chaque bénéficiaire responsable voulu dans l'onglet **Bénéficiaires** de l'entente;
- vérifiez que votre équipe d'entente ou votre rôle général accorde l'action requise.

Les recherches de résultats et de responsables utilisent la même action `create` ou `update` que le formulaire ouvert. Elles ne permettent pas de contourner l'autorisation sur l'entente.

## Ajouter ou modifier une activité

L'onglet ouvre un formulaire plein écran. Tous les champs ci-dessous sont obligatoires.

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
| Responsables | Au moins un lien actif et unique entre l'entente et un bénéficiaire lui-même actif. |

Les sélecteurs de résultats et de responsables offrent une recherche côté serveur et la sélection multiple. Si un seul responsable est disponible au chargement d'un nouveau formulaire, l'interface le sélectionne automatiquement; vous pouvez tout de même modifier ce choix. Lorsqu'une recherche est vide, son bouton de sélection est désactivé et l'interface indique qu'aucun choix n'est disponible.

Changer la langue de l'interface change les noms affichés, et non les valeurs anglaises et françaises enregistrées. Chaque champ linguistique doit être rempli séparément.

## Liste et recherche

Le tableau présente le nom et la description dans la langue active, les dates de début et de fin, les résultats attendus dans la langue active ainsi que les pastilles de résultats et de responsables. Il est paginé. La recherche porte sur l'identifiant de l'activité; le nom, la description ou les résultats attendus en anglais ou en français; les noms des résultats; ainsi que les dénominations sociales ou noms commerciaux des bénéficiaires. Elle ne porte **pas** sur les dates affichées.

Les liens de résultat inactifs, les liens inactifs entre l'entente et un bénéficiaire et les bénéficiaires supprimés sont omis des résultats et des pastilles.

## Validation, concurrence et reprise

Dans la transaction d'écriture, le serveur verrouille les lignes établies de portée et d'entente, puis revérifie la portée exacte. Il confirme ensuite que chaque résultat appartient toujours au programme de l'entente et que chaque identifiant de responsable appartient toujours à cette entente. Un choix périmé, supprimé, rattaché à un autre programme ou à une autre entente est rejeté au moyen d'une erreur d'API ou de validation localisée.

Les changements de sélection sont synchronisés dans la même transaction. Les liens retirés sont supprimés logiquement; sélectionner de nouveau le même résultat ou responsable restaure le lien existant lorsque c'est possible. Une défaillance partielle annule ensemble l'activité et ses sélections. La base de données impose aussi la plage de dates, l'appartenance à l'entente et à la version ainsi qu'un seul lien actif pour chaque paire activité-résultat et activité-responsable.

Si un autre auteur modifie l'accès ou la configuration connexe avant l'enregistrement, rechargez l'entente et rouvrez le formulaire. Une mise à jour vide ne change pas l'activité et renvoie ses valeurs courantes.

## Suppression et versions

La suppression d'une activité demande une confirmation, puis supprime logiquement l'activité et ses liens de résultat. Les liens de responsables deviennent invisibles parce que leur activité parente est supprimée, mais la route principale de suppression ne marque pas séparément ces lignes comme supprimées. L'onglet Activités n'offre aucune restauration; la reprise exige une intervention administrative ou sur les données autorisée.

L'onglet Activités ordinaire lit et modifie uniquement l'unique version de travail courante des activités de l'entente. La création d'une entente crée automatiquement cette version. La préparation d'une modification emploie un instantané et des routes d'activités propres à la modification; elle ne modifie pas silencieusement les lignes de l'onglet courant. Les points de contrôle des révisions approuvées conservent la provenance de leur version. Consultez [Ententes de financement](./index.md) pour la carte des onglets.

Une activité ne lance pas elle-même une approbation, une évaluation, une réalisation ni un flux de travail.

## Guides connexes

- [Ententes de financement](./index.md)
- [Bénéficiaires de l'entente](./applicant-recipients.md)
- [Programmes et résultats](../programs/index.md)
