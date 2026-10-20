# Adresses de l'entente

L'onglet **Adresses** conserve les emplacements utilisés expressément par une entente. Par exemple, consignez le lieu du projet financé et choisissez le type d'adresse approprié configuré par votre agence. Chaque ligne contient un type et les coordonnées de l'adresse; l'adresse sous-jacente peut aussi servir à une autre entente ou à un promoteur.

## Accès et liste

L'accès Lecteur à l'entente permet de voir ses adresses actives, y compris le libellé enregistré d'un type retiré. Pour ajouter ou modifier une adresse, vous avez besoin de l'accès Contributeur et d'une affectation à cette entente. Pour la supprimer, vous avez besoin de l'accès Gestionnaire et de la même affectation.

Le tableau présente le type d'adresse bilingue, la première ligne de rue, la ville et le code postal ou ZIP. La recherche porte aussi sur la subdivision, les trois lignes de rue et le type d'adresse dans l'une ou l'autre langue.

La liste des types d'adresse contient seulement les types actifs de l'agence de l'entente que vous pouvez utiliser pour cette action.

## Champs et validation

| Champ | Règle |
| --- | --- |
| Type d'adresse | Type obligatoire appartenant à l'agence; les nouveaux choix doivent être actifs. |
| Première ligne de rue | Obligatoire; les deuxième et troisième lignes sont facultatives. |
| Ville | Obligatoire. |
| Pays | Valeur de pays prise en charge obligatoire. |
| Province, territoire, État ou subdivision | Obligatoire. Pour le Canada (`ca`), il faut choisir une juridiction canadienne configurée; pour un autre pays, la saisie est libre. |
| Code postal ou ZIP | Obligatoire. |
| Téléphone principal | Valeur numérique obligatoire; le poste est un entier facultatif. |
| Identifiant de circonscription fédérale | Entier obligatoire. |
| Identifiant d'adresse du GC | Identifiant numérique facultatif. |

## Créer et modifier

Pour ajouter une adresse, choisissez un type disponible, remplissez les champs obligatoires et enregistrez. Pour la modifier, ouvrez sa ligne et corrigez le type, les coordonnées ou les deux. L'application vérifie votre affectation actuelle et l'état de l'entente avant d'ouvrir le formulaire, puis avant l'enregistrement. Un échec ne laisse pas d'adresse partiellement créée. Si votre affectation ou l'état a changé, rechargez l'entente avant de réessayer.

Une adresse commune peut être référencée par une autre entente ou un promoteur. Lorsqu'une autre référence active existe, le serveur refuse la modification des champs d'adresse partagés afin de ne pas changer silencieusement un autre dossier. Une modification limitée au type demeure permise puisqu'elle ne touche que le lien de cette entente.

## Suppression et rétablissement

La suppression retire l'adresse de la liste de cette entente, mais conserve son historique. Une adresse utilisée par une autre entente ou un promoteur y reste disponible.

Il n'existe aucune commande de restauration. Ajoutez l'adresse de nouveau après une suppression accidentelle. Si une modification signale que l'adresse est partagée, corrigez seulement le type ou créez une adresse distincte plutôt que de tenter de l'écraser.

Vérifiez la liste avant d'ajouter un emplacement, car les liens d'adresse en double sont permis.

## Guides connexes

- [Vue d'ensemble des ententes](./index.md)
- [Adresses des promoteurs](../proponents/addresses.md)
- [Administration des agences](../admin/agencies.md)

## Valeurs exactes et modifications partielles

Limitez chaque champ de rue, ville, subdivision et code postal à 255 caractères. Si vous copiez un long numéro de téléphone ou identifiant d'adresse GC d'un tableur, vérifiez que chaque chiffre reste inchangé.

Lorsque vous changez le pays pour le Canada, choisissez une province ou un territoire valide avant d'enregistrer.

Un type d'adresse retiré inchangé peut être conservé en corrigeant d'autres champs. Son remplacement doit être actif et appartenir à l'organisme de l'entente. Un type d'adresse ne peut pas être supprimé tant que des adresses d'entente y font référence. Le libellé enregistré d'un type retiré ne le rend pas disponible pour une nouvelle adresse.
