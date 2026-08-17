# Autres noms du promoteur

Utilisez **Autres noms** pour consigner un nom commercial, un ancien nom, un acronyme ou un autre nom secondaire d’un profil de promoteur enregistré. Ces valeurs facilitent l’interprétation du profil et peuvent être recherchées dans cet onglet.

Ouvrez **Promoteurs**, sélectionnez un profil, puis choisissez **Autres noms**. Le tableau présente les noms actifs selon leur ordre de création et offre la recherche et la pagination.

## Accès et actions

| Accès effectif au promoteur | Actions disponibles |
| --- | --- |
| Accès en lecture seule | Consulter et rechercher les noms actifs, et parcourir les pages. |
| Accès de contributeur | Consulter et ajouter des noms. |
| Accès complet | Consulter, ajouter, modifier et supprimer des noms. |
| Aucun accès | Le serveur refuse la demande, même si l’adresse URL est saisie directement. |

Les privilèges globaux relatifs aux promoteurs et une affectation exacte à l’équipe du promoteur peuvent donner accès. Chaque demande au serveur revérifie l’action par rapport au profil parent. Une écriture s’exécute dans une transaction, verrouille le profil et reconstruit l’autorisation avant de modifier les données.

## Champ et validation

Un enregistrement contient une seule valeur **Autre nom** obligatoire. Elle est élaguée et ne peut pas être vide. Il ne s’agit pas d’une paire bilingue anglais-français et il n’y a aucun champ de description.

Un même nom actif ne peut pas être ajouté deux fois au même promoteur. Un autre promoteur peut toutefois utiliser ce nom. Après la suppression d’un nom, la même valeur peut être ajoutée de nouveau, car l’unicité ne vise que les lignes actives.

## Ajouter, modifier et supprimer

Sélectionnez **Ajouter**, saisissez l’autre nom, puis enregistrez. Utilisez les actions de la ligne pour le modifier ou le supprimer. Une modification ou une suppression doit viser une ligne enfant active qui appartient au profil indiqué dans l’adresse URL; une ligne d’un autre promoteur est traitée comme introuvable.

La suppression est logique : la ligne de liaison est marquée comme supprimée et disparaît de la liste active. Cet onglet n’offre aucune commande de restauration. En cas de suppression accidentelle, ajoutez de nouveau le nom. Les ententes existantes et les dossiers historiques ne sont pas modifiés.

Si l’enregistrement échoue, gardez la fenêtre ouverte, corrigez une valeur vide ou en double, puis réessayez. Actualisez le profil si une autre personne a modifié l’enregistrement en même temps.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Registres](./registries.md)
- [Contacts](./contacts.md)
