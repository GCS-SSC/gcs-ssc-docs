# Historique du financement du promoteur

L’onglet **Historique du financement** regroupe deux sources :

- Les lignes **Système** sont les ententes GCS-SSC actives liées au promoteur. Gérez-les dans l’espace de travail de l’entente.
- Les lignes **Externe** sont des financements provenant de l’extérieur de GCS-SSC et saisis manuellement. Elles consignent l’historique sans créer d’entente, de processus budgétaire, d’examen ni de paiement.

Ouvrez **Promoteurs**, sélectionnez un profil, puis choisissez **Historique du financement**. La recherche porte sur les noms lisibles de l’agence et du programme dans les deux langues, le numéro d’entente et le titre. Les résultats combinés sont triés et paginés après le chargement des deux sources.

## Visibilité et actions

La consultation de l’onglet exige un accès en lecture au promoteur courant. Chaque entente système liée est évaluée séparément selon la portée de l’entente. Si vous ne pouvez pas la consulter, la ligne demeure visible uniquement comme relation de financement restreinte; ses noms, son numéro, ses dates, son montant et son lien sont masqués. La recherche ne révèle jamais les détails restreints.

| Enregistrement et accès | Action disponible |
| --- | --- |
| Entente système lisible | Ouvrir l’entente. Son montant est la somme du financement de programme des postes actifs de la version budgétaire courante, regroupée par devise. |
| Entente système restreinte | Voir uniquement un indicateur de restriction. |
| Enregistrement externe et accès en lecture seule au promoteur | Consulter la ligne. |
| Accès de contributeur au promoteur courant | Ajouter un enregistrement externe. |
| Accès de modification à tous les promoteurs liés | Modifier les détails externes et l’ensemble des bénéficiaires. |
| Accès de suppression au promoteur courant | Dissocier l’enregistrement externe de ce promoteur. |

Les autorisations globales relatives aux promoteurs et les affectations exactes aux équipes des promoteurs sont évaluées pour chaque profil touché. Le sélecteur de bénéficiaires ne présente que les profils actifs accessibles pour l’action de création ou de modification demandée. Chaque écriture visant plusieurs bénéficiaires verrouille les profils actifs dans un ordre stable et revérifie l’autorisation dans la transaction.

## Ajouter un financement externe

Sélectionnez **Ajouter un financement externe**. L’assistant plein écran comporte cinq étapes : bénéficiaires, agence, programme, entente et révision.

Le profil depuis lequel l’assistant a été ouvert est le bénéficiaire principal et ne peut pas être retiré. Vous pouvez ajouter d’autres promoteurs actifs seulement si vous avez l’accès de création à chacun d’eux. Les identifiants de bénéficiaire doivent être uniques.

| Champ | Règle |
| --- | --- |
| Nom de l’agence | Fournissez au moins la valeur anglaise ou française; chacune est limitée à 255 caractères. Il s’agit de champs texte, et non de sélections d’agences configurées. |
| Nom du programme | Fournissez au moins la valeur anglaise ou française; chacune est limitée à 255 caractères. |
| Numéro d’entente | Obligatoire, élagué et limité à 255 caractères. |
| Titre | Fournissez au moins une langue; chaque valeur est limitée à 255 caractères. |
| Description | Fournissez au moins une langue. |
| Dates de début et de fin | Toutes deux obligatoires; la fin ne peut pas précéder le début. |
| Montant du financement | Obligatoire, non négatif, limité à deux décimales et à 90 billions au maximum. Il est enregistré sous la forme `numeric(19,2)`. |
| Devise | Code de devise pris en charge obligatoire; l’assistant utilise CAD par défaut pour un nouvel enregistrement. |

L’étape de révision résume la saisie avant l’enregistrement. Les erreurs de validation et d’API destinées à l’utilisateur suivent la langue de la demande.

## Vérification des doublons et des similarités

Les noms d’agence et de programme ainsi que les numéros d’entente sont normalisés aux fins de comparaison. Dans une même portée où les noms d’agence et de programme se chevauchent, un numéro d’entente normalisé identique déjà utilisé par un enregistrement externe actif ou une entente système active est bloqué. Il ne peut pas être contourné.

L’assistant vérifie aussi :

- les noms d’agence ou de programme similaires à des enregistrements configurés;
- un numéro d’entente proche dans la même portée d’identité;
- un candidat correspondant lisible ou restreint.

Une similarité constitue un avertissement, et non une fusion automatique. Examinez l’avertissement, revenez corriger la saisie ou confirmez-le explicitement. Un candidat restreint est signalé sans divulguer ses détails. Les confirmations sont des empreintes des valeurs examinées; la modification du texte d’identité les efface, et le serveur recalcule les avertissements dans la transaction finale.

## Modifier les bénéficiaires ou les détails

La modification charge la ligne externe et tous ses bénéficiaires actifs. Vous devez avoir l’accès de modification à chaque promoteur déjà lié. L’ajout d’un bénéficiaire exige aussi l’accès de création à ce profil; son retrait exige l’accès de suppression. Le promoteur indiqué dans l’adresse URL courante doit demeurer lié pendant une modification.

Une modification de l’identité relance la vérification des conflits exacts et des similarités. Les détails et les changements de bénéficiaires sont enregistrés ensemble. Une suppression simultanée, un bénéficiaire inactif, une perte d’autorisation ou un bénéficiaire en double fait échouer toute la transaction plutôt que de produire une mise à jour partielle.

## Dissociation et suppression logique

L’action **Dissocier** supprime uniquement le lien actif entre l’historique externe et le promoteur courant. Elle ne supprime pas les liens détenus par d’autres promoteurs. Lorsque le dernier lien actif est supprimé logiquement, un déclencheur de base de données supprime aussi logiquement l’enregistrement d’historique désormais sans bénéficiaire.

Cet onglet n’offre aucune commande de restauration. Si le mauvais lien a été retiré et que l’historique existe encore grâce à un autre bénéficiaire, une personne autorisée peut ajouter le bénéficiaire de nouveau. Si le dernier lien a été retiré, créez un nouvel enregistrement externe. Les lignes d’entente système ne peuvent être ni modifiées ni dissociées ici.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Ententes](./agreements.md)
- [Équipes des promoteurs](./team.md)
