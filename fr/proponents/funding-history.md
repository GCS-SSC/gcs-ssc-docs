# Historique du financement du promoteur

L'onglet **Historique du financement** regroupe deux sources :

- Les lignes **Système** sont les ententes GCS-SSC actives liées au promoteur. Gérez-les dans l'espace de travail de l'entente.
- Les lignes **Externe** sont des financements provenant de l'extérieur de GCS-SSC et saisis manuellement. Elles consignent l'historique sans créer d'entente, de processus budgétaire, d'examen ni de paiement.

Ouvrez **Promoteurs**, sélectionnez un profil, puis choisissez **Historique du financement**. La recherche porte sur les noms de l'agence et du programme dans les deux langues, le numéro d'entente et le titre, selon vos permissions de lecture. Les résultats combinés sont triés et paginés après le chargement des deux sources.

## Visibilité et actions

La consultation de l'onglet exige un accès en lecture au promoteur courant. Chaque entente système liée est évaluée séparément selon la portée de l'entente. Si vous ne pouvez pas la consulter, la ligne demeure visible uniquement comme relation de financement restreinte; ses noms, son numéro, ses dates, son montant et son lien sont masqués. La recherche ne révèle jamais les détails restreints.

| Enregistrement et accès | Action disponible |
| --- | --- |
| Entente système lisible | Ouvrir l'entente. Son montant est la somme du financement de programme des postes actifs de la version budgétaire courante, regroupée par devise. |
| Entente système restreinte | Voir uniquement un indicateur de restriction. |
| Enregistrement externe et accès en lecture seule au promoteur | Consulter la ligne. |
| Accès de contributeur au promoteur courant | Ajouter un enregistrement externe. |
| Accès de modification à tous les promoteurs liés | Modifier les détails externes et l'ensemble des bénéficiaires. |
| Accès de suppression au promoteur courant | Dissocier l'enregistrement externe de ce promoteur. |

Les permissions sont vérifiées pour chaque promoteur touché. L'accès Lecteur permet de consulter son historique. Pour ajouter ou modifier l'historique, votre rôle doit permettre les actions de Contributeur; pour le dissocier, il doit permettre les actions de Gestionnaire. Vous devez aussi être affecté à chaque promoteur touché par l'action. Le sélecteur de bénéficiaires montre seulement les profils actifs utilisables pour cette action. Avant l'enregistrement, le système verrouille les profils et revérifie vos permissions.

Les actions peuvent rester visibles parce que votre rôle les permet. Avant d'ouvrir un formulaire ou de dissocier un dossier, l'application revérifie vos affectations et permissions actuelles. Si l'action est indisponible, vérifiez les affectations de tous les bénéficiaires touchés avant de réessayer.

Le sélecteur de vue des ententes apparaît seulement avec une permission de lecture des ententes. **Tous** combine les deux sources et conserve les indicateurs de relations restreintes. **Les miens** inclut seulement les ententes système lisibles avec votre affectation exacte à l'entente. Une vue **Agence** inclut les ententes système lisibles appartenant à l'agence du programme. Les enregistrements externes apparaissent seulement dans Tous, car leurs noms d'agence et de programme sont du texte libre, non des liens de propriété. Les autres vues retirent aussi les indicateurs restreints.

Par exemple, utilisez Tous pour comparer un financement externe à une entente existante avant de créer un doublon. Utilisez Les miens pour travailler sur vos ententes affectées; un financement externe absent de cette vue n'a pas été supprimé.

La liste charge les deux sources avec vos permissions actuelles. Chaque source permet jusqu'à 5 000 dossiers avant la recherche et la pagination. Si cette limite est dépassée, le chargement s'arrête avec `FUNDING_HISTORY_TOO_LARGE` (413). Une vue système plus étroite peut aider, mais changer la taille de page ou le texte de recherche ne contourne pas cette limite.

## Ajouter un financement externe

Sélectionnez **Ajouter un financement externe**. L'assistant plein écran comporte cinq étapes : bénéficiaires, agence, programme, entente et révision.

Le profil depuis lequel l'assistant a été ouvert est le bénéficiaire principal et ne peut pas être retiré. Vous pouvez ajouter d'autres promoteurs actifs seulement si vous avez l'accès de création à chacun d'eux. Sélectionnez chaque bénéficiaire une seule fois.

| Champ | Règle |
| --- | --- |
| Nom de l'agence | Fournissez au moins la valeur anglaise ou française; chacune est limitée à 255 caractères. Il s'agit de champs texte, et non de sélections d'agences configurées. |
| Nom du programme | Fournissez au moins la valeur anglaise ou française; chacune est limitée à 255 caractères. |
| Numéro d'entente | Obligatoire et limité à 255 caractères. L'application retire les espaces au début et à la fin. |
| Titre | Fournissez au moins une langue; chaque valeur est limitée à 255 caractères. |
| Description | Fournissez au moins une langue. |
| Dates de début et de fin | Toutes deux obligatoires; la fin ne peut pas précéder le début. Ces dates de calendrier ne changent pas selon votre fuseau horaire. |
| Montant du financement | Texte décimal exact obligatoire, non négatif, limité à deux décimales et à `99999999999999999.99`. Saisissez le montant sans symbole de devise ni séparateur de milliers. |
| Devise | Code de devise pris en charge obligatoire; l'assistant utilise CAD par défaut pour un nouvel enregistrement. |

L'étape de révision résume la saisie avant l'enregistrement. Les erreurs de validation et d'API destinées à l'utilisateur suivent la langue de la demande.

Par exemple, consignez une aide municipale antérieure de 25 000 CAD à un centre communautaire si elle a été administrée hors de GCS-SSC. Sélectionnez les bénéficiaires, saisissez les noms de la municipalité et du programme, copiez le numéro et les dates de l'entente depuis les documents, puis saisissez `25000.00` en CAD. Vérifiez le résumé et les avertissements de doublon avant l'enregistrement. Cela ajoute une entrée historique sans autoriser de paiement.

## Vérification des doublons et des similarités

Le système compare des versions standardisées des noms d'agence et de programme et des numéros d'entente. Lorsque les noms d'agence et de programme correspondent au même périmètre de comparaison, il bloque un numéro déjà utilisé par un enregistrement externe actif ou une entente système active. Confirmer un avertissement ne permet pas de contourner ce doublon exact.

L'assistant vérifie aussi :

- les noms d'agence ou de programme similaires à des enregistrements configurés;
- un numéro d'entente proche dans la même portée d'identité;
- un candidat correspondant lisible ou restreint.

Une similarité constitue un avertissement, et non une fusion automatique. Examinez l'avertissement, revenez corriger la saisie ou confirmez-le explicitement. Un candidat restreint est signalé sans divulguer ses détails. Votre confirmation vaut seulement pour les noms et le numéro examinés. Leur modification efface la confirmation. Le système revérifie les avertissements à l'enregistrement.

## Modifier les bénéficiaires ou les détails

La modification charge la ligne externe et tous ses bénéficiaires actifs. Vous devez avoir l'accès de modification à chaque promoteur déjà lié. L'ajout d'un bénéficiaire exige aussi l'accès de création à ce profil; son retrait exige l'accès de suppression. Le promoteur dont vous avez ouvert le profil doit demeurer lié pendant une modification.

Toute modification doit laisser un dossier complet valide. Par exemple, déplacer la date de début après la date de fin enregistrée échoue si vous ne corrigez pas aussi la date de fin. Vous ne pouvez pas vider la seule langue renseignée d'un champ bilingue obligatoire. Modifier les noms d'agence ou de programme ou le numéro d'entente relance la vérification des doublons et des similarités. Les détails et les changements de bénéficiaires sont enregistrés ensemble. Une suppression simultanée, un bénéficiaire inactif, une perte d'autorisation ou un bénéficiaire en double fait échouer toute la transaction plutôt que de produire une mise à jour partielle.

## Dissociation et suppression logique

L'action **Dissocier** supprime uniquement le lien actif entre l'historique externe et le promoteur courant. Elle ne supprime pas les liens détenus par d'autres promoteurs. Lorsque vous retirez le dernier lien actif de bénéficiaire, l'application retire aussi l'enregistrement de financement des listes actives et conserve son historique.

Cet onglet n'offre aucune commande de restauration. Si le mauvais lien a été retiré et que l'historique existe encore grâce à un autre bénéficiaire, une personne autorisée peut ajouter le bénéficiaire de nouveau. Si le dernier lien a été retiré, créez un nouvel enregistrement externe. Les lignes d'entente système ne peuvent être ni modifiées ni dissociées ici.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Ententes](./agreements.md)
- [Utilisateurs affectés aux promoteurs](./team.md)
