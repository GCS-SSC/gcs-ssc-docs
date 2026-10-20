# Identifiants financiers d'agence du promoteur

Utilisez **Identifiants financiers d'agence** lorsqu'une agence attribue au bénéficiaire un numéro dans son système financier ou de subventions. Ouvrez **Promoteurs**, choisissez le profil, puis **Identifiants financiers d'agence**. Ajoutez l'agence et son numéro pour pouvoir les sélectionner lors du lien du promoteur à une entente. Le tableau permet la recherche, la pagination, la création, la modification et la suppression selon vos permissions sur le profil.

Par exemple, la même association peut avoir le numéro `12345` à l'agence A et `67890` à l'agence B. Enregistrez deux identifiants distincts. Pour une entente de B, choisissez celui de B. L'identifiant financier est distinct du numéro d'entreprise, qui se trouve dans **Registres**.

Une **affectation exacte** signifie que vous figurez dans **Utilisateurs affectés** pour ce profil. La **suppression logique** retire un dossier des listes courantes tout en conservant son historique.

## Champs

| Champ | Règle |
| --- | --- |
| Agence | Facultative. Lorsqu'elle est fournie, elle doit référencer une agence active. Le sélecteur liste les agences actives si vous avez la permission d'ajouter ou de modifier un identifiant pour ce promoteur. |
| Actif | Activé par défaut. Seuls les identifiants actifs non supprimés sont proposés aux nouvelles relations d'entente. |
| Identifiant du système financier | Nombre entier obligatoire de `-9223372036854775808` à `9223372036854775807`. Saisissez les chiffres sans espaces ni séparateurs, avec un signe moins seulement s'il fait partie du numéro attribué. |

Vous pouvez enregistrer un identifiant sans agence. Choisissez l'agence qui a attribué l'identifiant pour que le personnel puisse en reconnaître l'origine.

Par exemple, saisissez exactement `9007199254740993`. Il s'agit d'un identifiant externe, donc les valeurs négatives sont aussi acceptées. Une référence inchangée à une agence non supprimée peut être conservée après sa désactivation; choisir une autre agence exige qu'elle soit active.

Saisissez le numéro exactement comme il a été attribué. Ce champ contient un identifiant, pas un montant de financement.

## Unicité et cycle de vie

Pour un même promoteur et une même agence, vous ne pouvez pas enregistrer deux fois le même identifiant financier actif. Lorsque le champ Agence est vide, les doublons sont permis. Évitez-les pour que le personnel puisse reconnaître le bon dossier.

L'agence ne doit pas nécessairement être l'agence principale du promoteur. Votre accès dépend de vos permissions et de votre affectation à ce promoteur, quelle que soit l'agence choisie. La création et la modification refusent une agence fournie qui est supprimée ou inconnue. Une modification valide tous les champs enregistrés ensemble. La suppression retire l'identifiant de la recherche active et permet de réutiliser la même combinaison, tout en conservant l'historique.

L'accès Lecteur au promoteur permet de consulter ses identifiants. Contributeur avec une affectation à ce profil précis permet de les ajouter ou modifier; Gestionnaire avec cette affectation permet de les supprimer. Le serveur revérifie ces permissions pendant l'enregistrement. Changer l'URL ne permet pas de modifier un identifiant d'un autre profil.

## Sélections d'entente et avertissements de retrait

Chaque [Relation entente–promoteur](../agreements/applicant-recipients.md) exige un identifiant financier actif du promoteur appartenant à l'agence de l'entente. Un identifiant sans agence peut être enregistré ici, mais ne satisfait pas cette relation. L'identifiant source choisi est conservé indépendamment du numéro externe affiché.

Dès qu'une relation référence l'identifiant, son agence, son promoteur et son numéro externe ne peuvent changer tant que la référence reste, y compris les relations historiques. Créez un remplacement et déplacez les sélections admissibles plutôt que de réutiliser l'identité. Un choix conservé peut rester lisible après désactivation ou suppression logique de la source.

Avant la désactivation ou la suppression, GCS-SSC recherche les ententes qui utilisent encore cet identifiant et n'ont pas atteint un état final. Si de telles ententes existent, un avertissement les présente. Examinez-les avant de confirmer. Vous pouvez confirmer le retrait tout en conservant les relations d'entente existantes. Une autre entente peut sélectionner l'identifiant entre l'avertissement et votre enregistrement. Si vous ne pouvez pas consulter une entente, l'avertissement présente seulement des renseignements limités sur son numéro et son titre, sans identifiant interne ni lien de détail. Si la lecture des usages échoue, réessayez plutôt que de conclure à leur absence. Annuler laisse l'identifiant inchangé.

Par exemple, retirer l'identifiant B `"9007199254740993"` l'enlève des nouveaux choix B, mais une relation B enregistrée conserve sa sélection. Modifier le numéro réécrirait l'identité et est refusé; créez une autre source si le numéro change réellement.

## Recherche et rétablissement

La recherche porte sur l'identifiant financier et les deux noms localisés de l'agence. Dans le sélecteur d'agence, vous pouvez aussi chercher l'identifiant exact de l'agence. Les actions d'ajout, de modification et de suppression peuvent apparaître selon votre rôle. Leur ouverture ou leur enregistrement revérifie votre affectation actuelle au profil. Une agence supprimée n'est pas affichée comme ligne active. Si le sélecteur est vide ou qu'un enregistrement échoue, confirmez que le promoteur existe toujours, que votre rôle et votre affectation à ce profil permettent le changement et que l'agence est active. Si l'identifiant appartient réellement à une agence, ne contournez pas une agence invalide en vidant le champ; restaurez ou choisissez la bonne agence.

Utilisez [Registres](./registries.md) pour les numéros d'entreprise, les comptes de programme de l'ARC, le SCIAN et les autres identifiants de registre externes.
