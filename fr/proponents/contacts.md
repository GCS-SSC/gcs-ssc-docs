# Contacts du promoteur

Utilisez **Contacts** pour les personnes associées à un promoteur. Un contact est une fiche commune liée au profil sélectionné; il ne devient pas automatiquement un compte de connexion ni un utilisateur affecté.

Ouvrez **Promoteurs**, sélectionnez un profil enregistré, puis choisissez **Contacts**. Le tableau actif présente le nom, le courriel et le titre de poste anglais. La recherche porte sur le nom, le courriel et le titre de poste dans l’une ou l’autre langue.

## Accès et actions

| Accès effectif au promoteur | Actions disponibles |
| --- | --- |
| Lecteur | Consulter et rechercher les contacts actifs, et parcourir les pages; aucune affectation exacte n’est requise. |
| Contributeur et affectation exacte au promoteur | Consulter, ajouter et modifier des contacts. |
| Gestionnaire et affectation exacte au promoteur | Consulter, ajouter, modifier et supprimer des contacts. |
| Aucun accès | Le serveur refuse la demande. |

Lecteur consulte les contacts. La création ou modification exige Contributeur et l’affectation exacte au parent; la suppression exige Gestionnaire et cette affectation. Le serveur autorise chaque action enfant par rapport au promoteur et reconstruit l’autorisation après l’avoir verrouillé pour une écriture.

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

La suppression marque comme supprimé le lien de ce promoteur. Le contact commun est supprimé logiquement seulement lorsqu’il ne reste aucune référence active provenant d’un autre promoteur, d’un achèvement ou d’une étape d’approbation. Cet onglet n’offre aucune restauration. La suppression d’un lien ne supprime ni un compte utilisateur, ni une affectation exacte, ni la référence active d’un autre dossier.

## Rétablissement

Corrigez les valeurs obligatoires manquantes ou un courriel en double, puis réessayez. Si le système indique que le contact est partagé, mettez-le à jour dans son contexte propriétaire ou partagé, ou créez plutôt un contact distinct. Actualisez après une modification simultanée ou une réponse indiquant que l’élément est introuvable.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Adresses](./addresses.md)
- [Utilisateurs affectés aux promoteurs](./team.md)
