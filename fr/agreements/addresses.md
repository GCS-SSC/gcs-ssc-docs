# Adresses de l’entente

L’onglet **Adresses** conserve les emplacements utilisés expressément par une entente. Chaque ligne lie l’entente et un type d’adresse appartenant à l’agence à un enregistrement d’adresse commune.

## Accès et liste

Le plafond Lecteur de l’entente énumère les liens actifs vers une adresse non supprimée, y compris le libellé enregistré d’un type retiré. La création ou modification exige Contributeur et l’affectation exacte à l’entente; la suppression exige Gestionnaire et cette affectation. Les adresses emploient l’entente comme racine d’affectation.

Le tableau présente le type d’adresse bilingue, la première ligne de rue, la ville et le code postal ou ZIP. La recherche porte aussi sur la subdivision, les trois lignes de rue et le type d’adresse dans l’une ou l’autre langue.

La recherche des types d’adresse contient seulement les types actifs appartenant à l’agence courante de l’entente et autorisés pour l’action de création ou de modification demandée. Le serveur répète cette vérification d’agence lors de l’enregistrement; un type d’une autre agence est invalide même si son identifiant est soumis directement.

## Champs et validation

| Champ | Règle |
| --- | --- |
| Type d’adresse | Type obligatoire appartenant à l’agence; les nouveaux choix doivent être actifs. |
| Première ligne de rue | Obligatoire; les deuxième et troisième lignes sont facultatives. |
| Ville | Obligatoire. |
| Pays | Valeur de pays prise en charge obligatoire. |
| Province, territoire, État ou subdivision | Obligatoire. Pour le Canada (`ca`), il faut choisir une juridiction canadienne configurée; pour un autre pays, la saisie est libre. La base de données applique aussi la règle canadienne. |
| Code postal ou ZIP | Obligatoire. |
| Téléphone principal | Valeur numérique obligatoire; le poste est un entier facultatif. |
| Identifiant de circonscription fédérale | Entier obligatoire. |
| Identifiant d’adresse du GC | Identifiant numérique facultatif. |

Le schéma d’API accepte aussi une latitude et une longitude facultatives, bien que la fenêtre actuelle ne les affiche pas.

## Créer et modifier

La création insère atomiquement l’adresse commune et le lien à l’entente après une nouvelle vérification de l’autorisation. La modification peut changer le type, les détails de l’adresse ou les deux. L’identifiant enfant doit appartenir à l’entente indiquée dans l’adresse URL.

Une adresse commune peut être référencée par une autre entente ou un promoteur. Lorsqu’une autre référence active existe, le serveur refuse la modification des champs d’adresse partagés afin de ne pas changer silencieusement un autre dossier. Une modification limitée au type demeure permise puisqu’elle ne touche que le lien de cette entente.

## Suppression et rétablissement

La suppression verrouille le lien et l’adresse commune, puis supprime logiquement le lien de cette entente. L’adresse commune est supprimée logiquement seulement lorsqu’aucun autre lien actif d’entente ou de promoteur ne la référence. Cette action ne supprime jamais les autres liens.

Il n’existe aucune commande de restauration. Ajoutez l’adresse de nouveau après une suppression accidentelle. Si une modification signale que l’adresse est partagée, corrigez seulement le type ou créez une adresse distincte plutôt que de tenter de l’écraser.

L’index actuel de la base de données accélère la recherche par entente et adresse, mais n’est pas unique; le service n’impose donc pas un seul lien actif par identifiant d’adresse commune. Vérifiez la liste avant de créer des emplacements répétés.

## Guides connexes

- [Vue d’ensemble des ententes](./index.md)
- [Adresses des promoteurs](../proponents/addresses.md)
- [Administration des agences](../admin/agencies.md)

## Valeurs exactes et modifications partielles

Rue, ville, subdivision et code postal acceptent au plus 255 caractères Unicode et refusent NUL. Le téléphone principal et l’identifiant d’adresse GC facultatif conservent les bigint PostgreSQL signés sous forme de chaînes décimales; n’arrondissez pas un long identifiant dans un tableur ou un nombre JavaScript. Le poste est un petit entier signé et l’identifiant de circonscription un entier signé de 32 bits. Les coordonnées fournies par API doivent tenir dans `numeric(10,7)`.

Une modification partielle valide la paire pays/subdivision résultante, pas seulement le champ transmis. Par exemple, changer le pays pour le Canada en conservant une subdivision invalide échoue jusqu’à la saisie d’une province ou d’un territoire valide. Renvoyer les mêmes valeurs physiques ne constitue pas une modification d’adresse partagée.

Un type d’adresse retiré inchangé peut être conservé en corrigeant d’autres champs. Son remplacement doit être actif et appartenir à l’organisme de l’entente. Les références d’adresse conservées bloquent la suppression du type; son libellé historique ne le rend pas disponible pour une nouvelle adresse.
