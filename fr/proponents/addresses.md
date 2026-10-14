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

Pour ajouter ou modifier une adresse, vous devez avoir l’accès Contributeur et être affecté à ce promoteur précis. Pour supprimer une adresse, il faut l’accès Gestionnaire et cette affectation. L’application revérifie vos permissions actuelles à l’enregistrement.

## Champs et validation

| Champ | Règle |
| --- | --- |
| Première ligne de rue | Obligatoire; les deuxième et troisième lignes sont facultatives. |
| Ville | Obligatoire. |
| Pays | Valeur obligatoire de la liste des pays. |
| Province, territoire, État ou subdivision | Obligatoire. Pour le Canada (`ca`), sélectionnez une province ou un territoire valide; pour un autre pays, saisissez du texte libre. La base de données applique aussi la règle canadienne. |
| Code postal ou ZIP | Obligatoire. |
| Téléphone principal | Valeur numérique obligatoire; le poste est un entier facultatif. |
| Identifiant de circonscription fédérale | Identifiant entier obligatoire de la circonscription électorale fédérale. Utilisez l’identifiant fourni pour le dossier. |
| Identifiant d’adresse du GC | Identifiant d’adresse du gouvernement du Canada facultatif, s’il vous a été fourni. |

Vous ne saisissez ni latitude ni longitude dans cet onglet. Les intégrations peuvent fournir ces coordonnées facultatives par l’API.

## Propriété de l’enregistrement et adresses partagées

L’enregistrement d’une nouvelle adresse sauvegarde ensemble ses coordonnées et son association à ce promoteur. La liste affiche seulement les adresses actives dont l’association à ce profil est active.

Une adresse peut également être référencée par un autre promoteur ou une entente. Pour éviter de modifier silencieusement un autre dossier, le serveur refuse une modification lorsqu’une autre référence active existe. Examinez l’autre dossier et séparez les adresses avant de réessayer.

La suppression retire l’association de l’adresse à ce promoteur de la liste active tout en conservant l’historique. L’adresse elle-même est marquée supprimée seulement si aucun autre promoteur ni aucune entente active ne l’utilise encore. Cet onglet n’offre aucune commande de restauration; ajoutez l’adresse de nouveau après une suppression accidentelle. Sa suppression ici ne supprime ni une entente ni le lien d’un autre promoteur.

Par exemple, saisissez l’adresse postale de Services communautaires du Havre : `125 Harbour Road`, `Halifax`, pays Canada, province Nouvelle-Écosse et code postal `B3H 2Y5`. Saisissez le téléphone principal en chiffres, par exemple `9025550142`, et l’identifiant de circonscription fédérale fourni pour le dossier. Si l’organisme déménage, modifiez cette adresse; si une entente utilise aussi la même fiche d’adresse, l’application bloque la modification jusqu’à la résolution du partage.

## Rétablissement

Les erreurs de validation sont retournées dans la langue de la demande. Corrigez les champs obligatoires manquants ou une subdivision canadienne non valide, puis réessayez. Si le système indique que l’adresse est partagée, ne tentez pas de l’écraser à répétition; corrigez l’autre référence active ou ajoutez une adresse distincte. Actualisez après une modification simultanée ou une réponse indiquant que l’élément est introuvable.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Contacts](./contacts.md)
- [Ententes](./agreements.md)

## Valeurs exactes et modifications partielles

Pour les agents qui saisissent une adresse, la principale limite est de 255 caractères par champ de rue, ville, subdivision ou code postal. Ces champs refusent le caractère de contrôle NUL. Les détails de stockage suivants s’adressent aux développeurs et aux intégrations. Le téléphone principal et l’identifiant d’adresse GC facultatif conservent les bigint PostgreSQL signés sous forme de chaînes décimales; n’arrondissez pas un long identifiant dans un tableur ou un nombre JavaScript. Le poste est un petit entier signé et l’identifiant de circonscription un entier signé de 32 bits. Les coordonnées fournies par API doivent tenir dans `numeric(10,7)`.

Une modification partielle valide la paire pays/subdivision résultante, pas seulement le champ transmis. Par exemple, changer le pays pour le Canada en conservant une subdivision invalide échoue jusqu’à la saisie d’une province ou d’un territoire valide. Renvoyer les mêmes valeurs physiques ne constitue pas une modification d’adresse partagée.
