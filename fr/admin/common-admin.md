# Administration du GWCOA

Ouvrez **Administration → GWCOA** à `/fr/admin/gwcoa` pour gérer la liste d’organisations utilisée par les profils d’agence. GWCOA désigne le plan comptable pangouvernemental. Cette page gère ses numéros d’organisation et ses noms bilingues.

Par exemple, utilisez cette page pour corriger le nom d’une organisation dans le sélecteur d’agence. Pour ajouter un exercice ou une catégorie de coûts, utilisez plutôt la page de l’agence. L’application possède un gestionnaire GWCOA dédié; les anciens onglets d’administration commune et les routes génériques de création, consultation, modification et suppression ne sont plus l’interface de travail.

## Permissions

Le GWCOA est partagé entre agences; ses permissions s’appliquent donc à tout le système. La lecture exige `system:read` global; la création exige `system:create` global; la modification, suppression logique et restauration utilisent `system:update` global. L’accès à un organisme ne suffit pas. Le serveur vérifie chaque requête et revérifie les permissions actuelles au moment d’enregistrer un changement.

## Rechercher et consulter

Le tableau propose pagination, recherche littérale et filtre actif/supprimé. La recherche couvre l’identifiant de ligne, le numéro d’organisation et les noms anglais/français; `%` et `_` sont ordinaires. Le total filtré décrit les résultats courants, tandis que les comptes total et actif du sommaire en haut couvrent tout le catalogue. Réduire ce sommaire masque ses statistiques.

Ouvrez une ligne pour la consulter ou modifier. L’identifiant de base désigne la ligne; le numéro GWCOA est le numéro d’organisation référencé par les profils d’organisme. Ne confondez pas ces identifiants.

## Créer ou modifier une organisation

| Champ | Règle |
| --- | --- |
| Numéro | Entier obligatoire de 0 à 32 767; unique dans le catalogue. |
| Nom anglais | Texte élagué non vide obligatoire, au plus 255 caractères Unicode. |
| Nom français | Texte élagué non vide obligatoire, au plus 255 caractères Unicode. |
| Supprimé | Disponible en modification pour retrait ou restauration logiques; ne supprime pas physiquement la ligne. |

1. Recherchez d’abord l’organisation pour éviter un doublon sous un autre libellé linguistique.
2. Choisissez Ajouter et saisissez le numéro et les deux noms.
3. Enregistrez et vérifiez la ligne.
4. Utilisez le sélecteur GWCOA du profil d’organisme pour l’y associer.

Par exemple, corriger l’orthographe française est une modification du nom, non une raison d’attribuer un nouveau numéro. Si un organisme référence le numéro, le changer produit `GWCOA_NUMBER_IN_USE`; corrigez le libellé en conservant ce numéro. Un doublon produit `GWCOA_DUPLICATE_NUMBER`, y compris avec des entrées conservées.

Une référence GWCOA retirée inchangée peut rester sur un organisme existant lors d’autres modifications. Son retrait ne la rend pas admissible pour de nouvelles sélections. Examinez la référence avant de la remplacer et choisissez une organisation actuellement admissible pour un remplacement réel.

## Où effectuer les autres tâches

| Tâche | Espace |
| --- | --- |
| Exercices, coûts, types d’adresse et de pièce jointe, sous-types de destinataire, types d’entente et statuts | Onglets de référence de l’[organisme](./agencies.md) |
| Approbations, examens, recommandations, flux, documents et champs personnalisés | [Catalogues d’agence](./agency-catalogs.md) pour les définitions partagées; [Volet](../programs/streams.md) pour les sélections et réglages locaux |
| Contacts et adresses | Espace du promoteur ou de l’entente propriétaire |
| Effectuer les examens, recommandations, approbations et l’achèvement | Dossier métier et flux correspondants |
| Preuves de changements et de requêtes entre agences | [Audit](./audit.md), avec permission Audit globale explicite |

Ne tentez pas de réparer l’historique en recréant l’éditeur générique retiré. Les définitions publiées et preuves d’exécution ont leurs propres règles de cycle de vie et d’autorisation.

## Échecs et reprise

Un chargement échoué est une erreur, non la preuve d’un catalogue vide. Réessayez avant de modifier. Après un échec d’enregistrement, conservez le brouillon, corrigez les champs ou le numéro conflictuel, puis réessayez. Après un changement de permissions, rechargez les capacités. Si l’écriture a réussi mais l’actualisation échoue, reprenez la lecture plutôt que créer un doublon.

Note technique : une énumération est une liste fixe de codes, comme les genres de dossier pris en charge. Les contrôles d’énumération utilisent `GET /api/metadata/enums?name=...`, une route publique volontaire avec noms autorisés et réponse en tableau ordonné de chaînes. Elle fournit des codes stables que le client traduit. Distincte du GWCOA, elle ne consulte pas des types arbitraires de base. Même ces métadonnées publiques attendent la fin du démarrage et la disponibilité de l’audit.
