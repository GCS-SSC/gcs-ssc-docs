# Adresses du promoteur

Utilisez l’onglet **Adresses** pour les emplacements postaux, opérationnels, du siège social ou autres du promoteur. Les adresses propres à une entente sont gérées séparément dans l’entente.

Ouvrez **Promoteurs**, sélectionnez un profil enregistré, puis choisissez **Adresses**. La liste active présente la première ligne de rue, la ville et le code postal ou ZIP. La recherche porte sur la ville, la subdivision, le code postal ou ZIP et chacune des trois lignes de rue.

## Accès et actions

| Accès effectif au promoteur | Actions disponibles |
| --- | --- |
| Lecteur | Consulter et rechercher les adresses actives, et parcourir les pages; aucune affectation exacte n’est requise. |
| Contributeur et affectation exacte au promoteur | Consulter, ajouter et modifier des adresses. |
| Gestionnaire et affectation exacte au promoteur | Consulter, ajouter, modifier et supprimer des adresses. |
| Aucun accès | Le serveur refuse la demande. |

Lecteur consulte les adresses. La création ou modification exige Contributeur et l’affectation exacte au parent; la suppression exige Gestionnaire et cette affectation. Une écriture verrouille le promoteur et réévalue l’autorisation dans la transaction.

## Champs et validation

| Champ | Règle |
| --- | --- |
| Première ligne de rue | Obligatoire; les deuxième et troisième lignes sont facultatives. |
| Ville | Obligatoire. |
| Pays | Valeur obligatoire de la liste des pays. |
| Province, territoire, État ou subdivision | Obligatoire. Pour le Canada (`ca`), sélectionnez une province ou un territoire valide; pour un autre pays, saisissez du texte libre. La base de données applique aussi la règle canadienne. |
| Code postal ou ZIP | Obligatoire. |
| Téléphone principal | Valeur numérique obligatoire; le poste est un entier facultatif. |
| Identifiant de circonscription fédérale | Entier obligatoire. |
| Identifiant d’adresse du GC | Identifiant numérique facultatif. |

Le contrat de service accepte aussi une latitude et une longitude facultatives, bien que le formulaire actuel de l’onglet n’affiche pas ces deux champs.

## Propriété de l’enregistrement et adresses partagées

L’ajout crée une adresse commune et un lien vers le promoteur dans une seule transaction. Un lien appartient toujours à un seul profil parent, et seuls les liens actifs vers des adresses communes actives sont affichés.

Une adresse peut également être référencée par un autre promoteur ou une entente. Pour éviter de modifier silencieusement un autre dossier, le serveur refuse une modification lorsqu’une autre référence active existe. Examinez l’autre dossier et séparez les adresses avant de réessayer.

La suppression marque toujours comme supprimé le lien de ce promoteur. L’adresse commune est elle aussi supprimée logiquement seulement si aucun autre promoteur ni aucune entente active ne la référence. Cet onglet n’offre aucune commande de restauration; ajoutez l’adresse de nouveau après une suppression accidentelle. Sa suppression ici ne supprime ni une entente ni le lien d’un autre promoteur.

## Rétablissement

Les erreurs de validation sont retournées dans la langue de la demande. Corrigez les champs obligatoires manquants ou une subdivision canadienne non valide, puis réessayez. Si le système indique que l’adresse est partagée, ne tentez pas de l’écraser à répétition; corrigez l’autre référence active ou ajoutez une adresse distincte. Actualisez après une modification simultanée ou une réponse indiquant que l’élément est introuvable.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Contacts](./contacts.md)
- [Ententes](./agreements.md)
