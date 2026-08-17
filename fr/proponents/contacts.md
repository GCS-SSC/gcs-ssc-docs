# Contacts du promoteur

Utilisez **Contacts** pour les personnes associées à un promoteur. Un contact de promoteur est un contact commun lié au profil sélectionné; il ne devient pas automatiquement un compte de connexion ni un membre de l’équipe.

Ouvrez **Promoteurs**, sélectionnez un profil enregistré, puis choisissez **Contacts**. Le tableau actif présente le nom, le courriel et le titre de poste anglais. La recherche porte sur le nom, le courriel et le titre de poste dans l’une ou l’autre langue.

## Accès et actions

| Accès effectif au promoteur | Actions disponibles |
| --- | --- |
| Accès en lecture seule | Consulter et rechercher les contacts actifs, et parcourir les pages. |
| Accès de contributeur | Consulter et ajouter des contacts. |
| Accès complet | Consulter, ajouter, modifier et supprimer des contacts. |
| Aucun accès | Le serveur refuse la demande. |

Les privilèges globaux relatifs aux promoteurs et une affectation exacte à l’équipe du promoteur peuvent donner accès. Le serveur autorise chaque action sur une ligne enfant par rapport au profil parent. Une écriture verrouille le profil et reconstruit l’autorisation dans la transaction.

## Champs et validation

| Champ | Règle |
| --- | --- |
| Nom | Obligatoire. |
| Courriel | Obligatoire. Les contacts communs actifs utilisent une adresse courriel globalement unique sans égard à la casse. |
| Préférence linguistique générale | Valeur obligatoire de la liste des préférences linguistiques prises en charge. |
| Titres de poste anglais et français | Les deux valeurs enregistrées sont obligatoires. |
| Compte principal | Valeur oui-non obligatoire. L’application n’impose pas un seul contact principal par promoteur. |
| Titre | Facultatif. |
| Téléphone professionnel et poste | Valeurs numériques facultatives. |

La préférence linguistique consigne une préférence de service; elle ne traduit pas le nom enregistré et ne remplace aucun des deux titres de poste obligatoires.

## Propriété de l’enregistrement et contacts partagés

L’ajout crée le contact commun et son lien au promoteur dans une seule transaction. La règle d’unicité du courriel s’applique à tous les contacts communs actifs, et non seulement à ceux de ce promoteur. Utilisez une adresse véritablement distincte pour une autre personne; un courriel en double ne peut pas être enregistré.

Un contact commun peut également être référencé par un autre promoteur ou par une configuration d’achèvement ou d’approbation. Le serveur verrouille le contact avant de vérifier ces références. Il refuse une modification lorsqu’une autre référence active existe afin que le changement ne touche pas silencieusement un autre dossier.

La suppression marque comme supprimé le lien de ce promoteur. Le contact commun est supprimé logiquement seulement lorsqu’il ne reste aucune référence active provenant d’un autre promoteur, d’un achèvement ou d’une étape d’approbation. Cet onglet n’offre aucune commande de restauration. La suppression d’un lien ne supprime ni un compte utilisateur de l’application, ni une appartenance à une équipe, ni la référence active d’un autre dossier.

## Rétablissement

Corrigez les valeurs obligatoires manquantes ou un courriel en double, puis réessayez. Si le système indique que le contact est partagé, mettez-le à jour dans son contexte propriétaire ou partagé, ou créez plutôt un contact distinct. Actualisez après une modification simultanée ou une réponse indiquant que l’élément est introuvable.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Adresses](./addresses.md)
- [Équipes des promoteurs](./team.md)
