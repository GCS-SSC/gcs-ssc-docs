# Contacts du promoteur

Utilisez **Contacts** pour les personnes associées à un promoteur. Un contact désigne une personne à joindre au sujet de l’organisme, par exemple son agent des finances. L’enregistrement du contact ne lui donne ni compte de connexion ni permission de travailler sur le dossier.

Ouvrez **Promoteurs**, sélectionnez un profil enregistré, puis choisissez **Contacts**. Le tableau actif présente le nom, le courriel et le titre de poste anglais. La recherche porte sur le nom, le courriel et le titre de poste dans l’une ou l’autre langue.

## Accès et actions

| Accès effectif au promoteur | Actions disponibles |
| --- | --- |
| Lecteur | Consulter et rechercher les contacts actifs, et parcourir les pages; aucune affectation exacte n’est requise. |
| Contributeur et affectation exacte au promoteur | Consulter, ajouter et modifier des contacts. |
| Gestionnaire et affectation exacte au promoteur | Consulter, ajouter, modifier et supprimer des contacts. |
| Aucun accès | Le serveur refuse la demande. |

Pour ajouter ou modifier un contact, vous devez avoir l’accès Contributeur et être affecté à ce promoteur précis. Pour le supprimer, il faut l’accès Gestionnaire et cette affectation. L’application revérifie ces permissions à l’enregistrement, y compris les changements survenus pendant que votre page était ouverte.

## Champs et validation

| Champ | Règle |
| --- | --- |
| Nom | Obligatoire. |
| Courriel | Obligatoire. L’adresse doit être différente de celle de tout autre contact actif dans l’application. Les majuscules et les minuscules désignent la même adresse. |
| Préférence linguistique générale | Choisissez une préférence linguistique prise en charge pour communiquer avec cette personne. |
| Titres de poste anglais et français | Saisissez les deux versions, par exemple « Finance officer » et « Agent des finances ». Les deux sont enregistrées. |
| Compte principal | Choisissez oui ou non pour indiquer un contact principal. Plusieurs contacts peuvent être principaux. |
| Titre | Facultatif. |
| Téléphone professionnel et poste | Valeurs numériques facultatives. |

La préférence linguistique consigne une préférence de service; elle ne traduit pas le nom enregistré et ne remplace aucun des deux titres de poste obligatoires.

## Propriété de l’enregistrement et contacts partagés

L’enregistrement d’un nouveau contact sauvegarde ensemble ses coordonnées et son association à ce promoteur. La règle d’unicité du courriel s’applique à tous les contacts communs actifs, et non seulement à ceux de ce promoteur. Utilisez une adresse véritablement distincte pour une autre personne; un courriel en double ne peut pas être enregistré.

Un contact commun peut également être référencé par un autre promoteur ou par une configuration d’achèvement ou d’approbation. Si un autre dossier actif utilise le même contact, l’application refuse les modifications ici pour éviter de changer les coordonnées utilisées par cet autre dossier.

La suppression retire le contact de la liste active de ce promoteur tout en conservant l’historique. Le contact lui-même est marqué supprimé seulement si aucun autre promoteur, achèvement ou étape d’approbation actif ne l’utilise encore. Cet onglet n’offre aucune restauration. La suppression d’un lien ne supprime ni un compte utilisateur, ni une affectation exacte, ni la référence active d’un autre dossier.

Par exemple, avant de préparer une entente de contribution pour Services communautaires du Havre, recherchez son agente des finances, Maya Chen, avant de l’ajouter. Saisissez son nom, `maya.chen@example.org`, les deux titres de poste et sa préférence linguistique. Si ce courriel appartient déjà à un contact actif ailleurs, l’enregistrement échoue; vérifiez quel dossier existant l’utilise avant de créer un contact distinct avec une autre adresse.

## Rétablissement

Corrigez les valeurs obligatoires manquantes ou un courriel en double, puis réessayez. Si le système indique que le contact est partagé, mettez-le à jour dans son contexte propriétaire ou partagé, ou créez plutôt un contact distinct. Actualisez après une modification simultanée ou une réponse indiquant que l’élément est introuvable.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Adresses](./addresses.md)
- [Utilisateurs affectés aux promoteurs](./team.md)
