# Administration du GWCOA

Ouvrez **Administration**, puis **GWCOA** à `/fr/admin/gwcoa` pour gérer la liste d'organisations utilisée par les profils d'agence. GWCOA désigne le plan comptable pangouvernemental. Cette page gère ses numéros d'organisation et ses noms bilingues.

Utilisez cette page pour corriger le nom d'une organisation dans le sélecteur d'agence. Pour ajouter un exercice ou une catégorie de coûts, ouvrez la page de l'[agence](./agencies.md).

## Permissions

Le GWCOA est partagé entre agences. Il faut `system:read` global pour le consulter, `system:create` global pour ajouter une organisation et `system:update` global pour la modifier, la retirer ou la restaurer. Les permissions d'agence seules ne donnent pas accès. Le serveur vérifie de nouveau vos permissions actuelles à l'enregistrement.

## Rechercher et consulter

Recherchez par identifiant de ligne, numéro d'organisation ou nom anglais ou français. La recherche traite `%` et `_` comme des caractères ordinaires. Filtrez les entrées actives ou supprimées, puis parcourez les pages de résultats. Le total du tableau compte les résultats filtrés. Le sommaire en haut compte tout le catalogue et ses entrées actives. Réduisez le sommaire pour masquer ces statistiques.

Ouvrez une ligne pour la consulter ou la modifier. L'identifiant de ligne désigne une entrée du catalogue. Le numéro GWCOA désigne l'organisation sélectionnée dans un profil d'agence. Ce sont deux numéros distincts.

## Créer ou modifier une organisation

| Champ | Règle |
| --- | --- |
| Numéro | Entier obligatoire de 0 à 32 767; unique dans le catalogue. |
| Nom anglais | Texte obligatoire, de 1 à 255 caractères Unicode. Les caractères nuls sont interdits. |
| Nom français | Texte obligatoire, de 1 à 255 caractères Unicode. Les caractères nuls sont interdits. |
| Supprimé | Cochez en modification pour retirer l'entrée. Décochez pour la restaurer. La ligne reste dans le catalogue. |

1. Recherchez d'abord l'organisation pour éviter un doublon sous un autre libellé linguistique.
2. Choisissez **Ajouter** et saisissez le numéro et les deux noms.
3. Enregistrez et vérifiez que la ligne affiche le numéro et les deux noms.
4. Utilisez le sélecteur GWCOA du profil d'agence pour lui associer l'organisation.

Par exemple, corriger l'orthographe française est une modification du nom, non une raison d'attribuer un nouveau numéro. Si une agence utilise le numéro, le changer produit `GWCOA_NUMBER_IN_USE`; corrigez le libellé en conservant ce numéro. Un doublon produit `GWCOA_DUPLICATE_NUMBER`, y compris avec des entrées conservées.

Le retrait d'une organisation conserve les références des agences existantes et les noms affichés. Vous pouvez enregistrer d'autres changements à une agence sans remplacer son organisation retirée. Les nouvelles agences et les sélections de remplacement doivent utiliser une organisation active. Examinez la référence existante avant de la changer.

## Où effectuer les autres tâches

| Tâche | Espace |
| --- | --- |
| Exercices, coûts, types d'adresse et de pièce jointe, sous-types de destinataire, types d'entente et statuts | Onglets de référence de l'[agence](./agencies.md) |
| Approbations, examens, recommandations, flux, documents et champs personnalisés | [Catalogues d'agence](./agency-catalogs.md) pour les définitions partagées; [Volet](../programs/streams.md) pour les sélections et réglages locaux |
| Contacts et adresses | Espace du promoteur ou de l'entente propriétaire |
| Effectuer les examens, recommandations, approbations et l'achèvement | Dossier métier et flux correspondants |
| Preuves de changements et de requêtes entre agences | [Audit](./audit.md), avec permission Audit globale explicite |

Utilisez l'espace indiqué ci-dessus pour modifier une définition ou traiter un dossier. Chaque espace applique les permissions et les règles de la tâche.

## Échecs et reprise

Si la liste ou une organisation ne se charge pas, réessayez avant de modifier. Une erreur de chargement ne signifie pas que le catalogue est vide.

Si l'enregistrement échoue, conservez le brouillon, corrigez les champs ou le numéro en conflit, puis réessayez. Après un changement de permissions, rechargez la page. Si l'enregistrement a réussi mais que le tableau ne se recharge pas, rechargez la liste avant de créer une autre entrée.
