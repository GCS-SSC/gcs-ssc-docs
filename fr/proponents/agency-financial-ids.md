# Identifiants financiers d'agence du promoteur

Utilisez **Identifiants financiers d’agence** lorsqu’une agence attribue au bénéficiaire un numéro dans son système financier ou de subventions. Ouvrez **Promoteurs**, choisissez le profil, puis **Identifiants financiers d’agence**. Ajoutez l’agence et son numéro pour pouvoir les sélectionner lors du lien du promoteur à une entente. Le tableau permet la recherche, la pagination, la création, la modification et la suppression selon vos permissions sur le profil.

Par exemple, la même association peut avoir le numéro `12345` à l’agence A et `67890` à l’agence B. Enregistrez deux identifiants distincts. Pour une entente de B, choisissez celui de B. L’identifiant financier est distinct du numéro d’entreprise, qui se trouve dans **Registres**.

Une **affectation exacte** signifie que vous figurez dans **Utilisateurs affectés** pour ce profil. Le **plafond du rôle** est l’action la plus élevée permise par votre rôle. La **suppression logique** retire un dossier des listes courantes tout en conservant son historique.

## Champs

| Champ | Règle |
| --- | --- |
| Agence | Facultative. Lorsqu'elle est fournie, elle doit référencer une agence active. La recherche liste les agences actives après avoir autorisé l'action de création ou de modification sur le promoteur parent. |
| Actif | Activé par défaut. Seuls les identifiants actifs non supprimés sont proposés aux nouvelles relations d’entente. |
| Identifiant du système financier | Texte entier canonique obligatoire dans la plage `bigint` PostgreSQL, de `-9223372036854775808` à `9223372036854775807`. L’interface utilise un champ texte pour préserver la précision; les clients API devraient transmettre une chaîne. Une valeur JSON numérique n’est acceptée que si elle est un entier sûr. |

Puisque l'agence est facultative dans le contrat source actuel, un identifiant sans portée peut être enregistré. Sélectionnez de préférence une agence lorsque l'identifiant lui appartient afin de préserver clairement sa provenance.

Par exemple, transmettez exactement `"9007199254740993"`; le convertir en nombre JavaScript perd de la précision. Ce champ identifie un dossier externe et n’hérite pas de la règle de positivité des identifiants d’entités de l’application. Une référence inchangée à une agence non supprimée peut être conservée après sa désactivation; choisir une autre agence exige qu’elle soit active.

Saisissez le numéro exactement comme il a été attribué, sans espaces ni séparateurs. « Texte entier canonique » signifie une chaîne représentant un nombre entier dans le format standard exigé. La grande plage ci-dessus permet de conserver les identifiants des systèmes externes; il ne s’agit pas d’un montant de financement.

## Unicité et cycle de vie

Pour un même promoteur et une même agence, vous ne pouvez pas enregistrer deux fois le même identifiant financier actif. Si Agence est vide, la base permet les doublons, car elle traite les valeurs d’agence vides (`NULL`) comme distinctes. Évitez ces doublons : ils compliquent le choix du bon dossier.

L'agence ne doit pas nécessairement être l'agence principale du promoteur. L'accès est imposé sur le promoteur parent exact et n'est pas déduit de l'agence choisie. La création et la modification refusent une agence fournie qui est supprimée ou inconnue. Une modification fusionne et valide la ligne complète; une suppression fixe `_deleted = true`. La ligne supprimée disparaît de la recherche active et ne participe plus à l'index d'unicité partiel, mais les données historiques demeurent.

L’accès Lecteur au promoteur permet de consulter ses identifiants. Contributeur avec une affectation à ce profil précis permet de les ajouter ou modifier; Gestionnaire avec cette affectation permet de les supprimer. Le serveur revérifie ces permissions pendant l’enregistrement. Changer l’URL ne permet pas de modifier un identifiant d’un autre profil.

## Sélections d’entente et avertissements de retrait

Chaque [Relation entente–promoteur](../agreements/applicant-recipients.md) exige un identifiant financier actif du promoteur appartenant à l’agence de l’entente. Un identifiant sans agence peut être enregistré ici, mais ne satisfait pas cette relation. L’identifiant source choisi est conservé indépendamment du numéro externe affiché.

Dès qu’une relation référence l’identifiant, son agence, son promoteur et son numéro externe ne peuvent changer tant que la référence reste, y compris les relations historiques. Créez un remplacement et déplacez les sélections admissibles plutôt que de réutiliser l’identité. Un choix conservé peut rester lisible après désactivation ou suppression logique de la source.

Désactiver ou supprimer charge d’abord les utilisations par des ententes non terminales et présente un avertissement. Examinez-les avant de confirmer. Ce n’est pas une interdiction absolue : confirmer peut retirer la source en conservant les relations. L’avertissement ne garantit pas atomiquement qu’aucun nouvel usage n’apparaît avant l’enregistrement. Une entente inaccessible fournit seulement numéro/titre minimal, sans identifiant ni lien de détail. Si la lecture des usages échoue, réessayez plutôt que de conclure à leur absence. Annuler laisse l’identifiant inchangé.

Par exemple, retirer l’identifiant B `"9007199254740993"` l’enlève des nouveaux choix B, mais une relation B enregistrée conserve sa sélection. Modifier le numéro réécrirait l’identité et est refusé; créez une autre source si le numéro change réellement.

## Recherche et rétablissement

La recherche porte sur l’identifiant financier et les deux noms localisés de l’agence. Une agence supprimée n’est pas affichée comme ligne active. Si le sélecteur est vide ou qu’un enregistrement échoue, confirmez que le promoteur existe toujours, que votre plafond de rôle et votre affectation exacte permettent la mutation et que l’agence est active. Si l’identifiant appartient réellement à une agence, ne contournez pas une agence invalide en vidant le champ; restaurez ou choisissez la bonne agence.

Utilisez [Registres](./registries.md) pour les numéros d'entreprise, les comptes de programme de l'ARC, le SCIAN et les autres identifiants de registre externes.
