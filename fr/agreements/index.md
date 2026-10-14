# Ententes de financement

Une entente de financement est le dossier principal pour administrer le financement d’un ou de plusieurs promoteurs. Elle appartient à un volet de paiements de transfert qui fournit les paramètres et choix disponibles. Utilisez l’entente pour indiquer qui reçoit le financement, les travaux prévus, la période d’aide et les dossiers financiers et d’approbation qui appuient la réalisation.

Par exemple, un agent administrant une contribution pour de la formation communautaire peut créer l’entente, lier le bénéficiaire, décrire les ateliers dans **Activités** et inscrire le budget. Les paiements, réclamations et dossiers de surveillance sont ensuite gérés à partir des onglets de l’entente. Certains onglets ouvrent des dossiers distincts avec leurs propres utilisateurs affectés; consultez [Flux enfants d’entente](./child-workflows.md).

## Modèle d’accès

La liste montre les ententes actives que vous pouvez lire. L’accès Lecteur ou supérieur pour `agreement` peut s’appliquer globalement, à un organisme ou à un programme. Vous n’avez pas besoin d’être affecté à une entente pour la lire. Pour la modifier, vous avez besoin du rôle approprié et d’une affectation à cette entente précise.

Cherchez par numéro d’entente, titre anglais ou français, organisme, programme, volet ou nom du type d’entente. Choisissez **Mes ententes** pour afficher les ententes qui vous sont directement affectées, ou utilisez une vue par organisme ou un filtre d’agence pour réduire la liste. Ces filtres n’accordent pas l’accès à d’autres ententes. Les commandes de modification et de suppression sont vérifiées séparément : l’une peut être disponible et l’autre désactivée.

| Combinaison requise | Actions sur l’entente |
| --- | --- |
| Accès Lecteur | Lire l’entente et ses enfants ordinaires. |
| Accès Contributeur + affectation à cette entente | Modifier l’entente et créer/modifier les enfants ordinaires. |
| Accès Gestionnaire + affectation à cette entente | Actions du contributeur et suppression logique. |

Vous avez besoin de l’accès Contributeur ou supérieur pour `agreement` dans la portée d’organisme et de programme du volet choisi pour utiliser **Nouvelle entente**. Aucune affectation n’est nécessaire à un dossier qui n’existe pas encore : l’enregistrement crée l’entente et fait de vous son utilisateur principal affecté. Les changements ultérieurs d’utilisateurs affectés exigent la permission distincte `manage_assignments`.

## Configuration préalable

Vérifiez que les choix suivants sont disponibles avant de créer une entente. S’il en manque, demandez à l’administrateur du programme ou de l’organisme de les configurer :

- une agence, un programme de paiements de transfert et un volet actifs;
- au moins un sous-type d’entente associé à ce volet;
- au moins une base de retenue active du volet;
- une cote de risque facultative si une valeur de risque doit être choisie;
- au moins un promoteur actif que la personne responsable de la création peut lire.

Les onglets ultérieurs exigent les exercices, catégories de coûts, résultats, types de surveillance, engagements, modèles, configurations d’examen ou de flux de travail et autres données de référence correspondants. Une valeur configurée peut disparaître d’une recherche si elle est supprimée, appartient à un autre volet ou se trouve hors de la portée de création ou de modification demandée.

## Créer une entente

1. Sélectionnez **Nouvelle entente** dans la liste des ententes.
2. Choisissez le programme, puis son volet. Vérifiez ces choix : le volet et la devise ne peuvent plus changer après la création.
3. Remplissez les champs obligatoires ci-dessous, y compris les deux versions linguistiques du titre et de la description.
4. Sélectionnez au moins un promoteur actif que vous pouvez lire, avec son sous-type de bénéficiaire admissible et son identifiant financier d’agence.
5. Remplissez les champs personnalisés obligatoires, puis enregistrez. Examinez tout avertissement de similarité de numéro avant de confirmer.

Le formulaire initialise **Redistribution** à non et **Retenue** à 10 %; vérifiez que ces valeurs conviennent à l’entente. Il comporte trois sections principales, les sections personnalisées configurées et les champs des extensions activées. Changer de programme efface les choix de volet dépendants. Les promoteurs sont choisis séparément parmi les profils actifs que vous pouvez lire.

| Champ | Règle |
| --- | --- |
| Programme et volet | Choisissez le programme, puis un volet disponible dans la portée de création. Le volet est immuable après la création. |
| Sous-type d’entente | Sous-type actif obligatoire appartenant exactement au volet. Le type d’entente est dérivé du sous-type et n’est pas modifiable séparément. |
| Numéro d’entente | En mode manuel, numéro élagué obligatoire d’au plus 15 caractères. Avec un fournisseur activé, la création génère le numéro et refuse un numéro fourni manuellement. |
| Devise | Dénomination obligatoire choisie à la création, puis immuable. Les enfants financiers et budgets/plans admissibles doivent y correspondre. |
| Numéro du système financier | Identifiant du système financier obligatoire représentant un nombre entier de zéro ou plus. Les grands identifiants sont traités comme du texte pour préserver tous les chiffres. |
| Dates d’aide autorisée | Toutes deux obligatoires; la fin ne peut pas précéder le début. |
| Redistribution | Valeur oui-non obligatoire. |
| Titres anglais et français | Tous deux obligatoires et limités à 255 caractères chacun. |
| Descriptions anglaise et française | Toutes deux obligatoires. |
| Retenue | Pourcentage obligatoire de 0 à 100 inclusivement, enregistré à deux décimales. |
| Base de retenue | Base active obligatoire configurée pour le volet. Choisissez parmi les valeurs disponibles; l’administrateur peut configurer différents libellés. |
| Cote de risque | Sélection manuelle facultative sans flux publié d’Évaluation du risque; sinon, gestion par flux et modification interdite dans le profil. |
| Promoteurs | Au moins un profil actif et lisible sans doublon. Choisissez un sous-type admissible et un identifiant financier actif du promoteur appartenant à l’agence de l’entente pour chaque lien; le type appartient à cette relation. Consultez [Promoteurs de l’entente](./applicant-recipients.md). |

Changer de volet efface le sous-type, la base de retenue et la cote de risque, car ces choix appartiennent au volet. Sélectionnez-les de nouveau pour le nouveau volet. L’application revérifie votre accès et tous les dossiers sélectionnés à l’enregistrement. Elle crée ensemble l’entente, ses liens de bénéficiaires et votre affectation principale; un échec ne laisse pas de dossier créé en partie.

La devise est aussi fixe après la création (`AGREEMENT_CURRENCY_IMMUTABLE`). Un enfant financier utilisant une autre devise échoue avec `AGREEMENT_CURRENCY_MISMATCH`; corrigez le choix de devise de l’enfant. Si l’identifiant financier d’un bénéficiaire est refusé, demandez un identifiant actif appartenant à ce promoteur et à l’agence de l’entente, puis rechargez le formulaire. Un identifiant sans agence n’est pas admissible.

## Correspondance des numéros d’entente

Deux ententes actives du même volet ne peuvent pas avoir le même numéro. À la création ou au changement du numéro d’identification, l’application cherche aussi des numéros semblables dans les dossiers externes accessibles de l’Historique du financement portant les mêmes noms d’agence et de programme. Une correspondance proche ouvre une boîte de confirmation avant l’enregistrement.

Les formulaires de création et de modification présentent maintenant une boîte de confirmation des similarités. Examinez la correspondance possible : annulez pour corriger le brouillon, ou confirmez les avertissements puis soumettez de nouveau. Les correspondances restreintes ne dévoilent pas leurs libellés protégés. La confirmation vise le couple volet/numéro proposé; le modifier invalide la confirmation précédente. Une nouvelle correspondance apparue avant la fin de la transaction rouvre la boîte avec les avertissements actuels. Confirmer ne contourne pas un conflit d’unicité exacte.

Par exemple, un numéro ressemblant à une entrée externe d’Historique du financement peut représenter un doublon ou une entente distincte. Vérifiez le contexte accessible et confirmez explicitement seulement si le nouveau dossier est voulu. Annuler laisse l’entente non enregistrée.

Lorsque la numérotation est gérée par fournisseur, l’hôte résout exactement un fournisseur activé pour l’organisme et le volet et génère le numéro dans la transaction de création. Des fournisseurs concurrents ou un résultat invalide bloquent la création. N’inventez pas de numéro temporaire et ne réessayez pas avec une valeur manuelle; demandez à l’administrateur de corriger la configuration. Le format et les compteurs propres au fournisseur relèvent de la documentation de son extension.

## Espace de détail

Ouvrez une entente pour voir ses onglets. **Général** affiche le profil aux lecteurs et fournit un formulaire intégré lorsque vous pouvez modifier. Les autres onglets ont leurs propres vérifications de création, de modification et de suppression. L’espace contient :

| Onglet | Objet |
| --- | --- |
| Général | Classification, identifiants, profil bilingue, dates d’aide, retenue, risque et emplacements de profil des extensions. |
| Adresses | [Adresses de l’entente](./addresses.md) |
| Promoteurs | [Promoteurs de l’entente](./applicant-recipients.md) |
| Budget | [Budget de l’entente](./budget.md) |
| Engagements | [Engagements](./commitments.md) |
| Paiements | [Paiements](./payments.md) |
| Prévisions | [Prévisions](./forecasts.md) |
| Réclamations | [Réclamations et rapprochement](./claims.md) |
| Surveillances | [Surveillance](./monitors.md) |
| Clôtures | [Clôture d’une entente](./closeouts.md) : préparation, rapprochement financier, preuve du flux, documents et fermeture. |
| Documents | [Documents](./documents.md) |
| Activités | [Activités](./activities.md) |
| Notes | Notes de travail bilingues de cette entente. |
| Recommandation | Flux de soumission publié, dossier immuable, recommandations et approbations. |
| Modifications | Création, instantanés, soumission d’approbation, annulation et promotion. |
| Utilisateurs affectés | Registre exact de l’entente; les mutations exigent `manage_assignments`. |

Les extensions activées peuvent ajouter des onglets et des champs au profil. Ouvrir un paiement, une réclamation ou un autre dossier enfant remplace les onglets de l’entente par l’espace de ce dossier tout en conservant le contexte de l’entente. Vérifiez quel dossier est ouvert avant d’ajouter des pièces jointes ou de changer les utilisateurs affectés.

## Notes de l’entente

Ouvrez **Notes** dans l’entente pour chercher, lire, ajouter, modifier ou retirer des notes de travail. Chaque note exige un objet dans au moins une langue et un corps dans au moins une langue; l’objet est limité à 255 caractères Unicode. Rédigez les deux langues lorsque les deux publics doivent la lire.

La liste indique l’auteur et la dernière personne ayant modifié la note, de la plus récente à la plus ancienne. Les personnes pouvant lire l’entente voient les notes. La création et la modification exigent la permission d’action correspondante sur l’entente et son affectation exacte; la suppression exige le niveau Gestionnaire applicable et l’affectation. Le serveur revérifie la portée et l’état de l’entente à l’écriture. Une note supprimée quitte la liste active, mais demeure dans l’historique.

Par exemple, utilisez une note pour indiquer que vous avez demandé au bénéficiaire de préciser les dates des ateliers, avec la date de votre demande et le suivi requis. Ajoutez plutôt une lettre signée ou une preuve d’approbation dans l’espace approprié de documents ou de pièces jointes.

Si l’enregistrement échoue, conservez le brouillon, rechargez l’entente pour vérifier son état et votre affectation, puis réessayez. Une mise à jour partielle conserve les champs de langue omis; effacer le dernier objet ou le dernier corps est refusé. Les notes ne remplacent ni les documents ni les preuves d’approbation.

## Protections lors de la modification

Quand vous enregistrez des changements dans **Général**, l’application vérifie les champs modifiés et votre accès selon l’entente et les paramètres d’extension courants. Si le propriétaire change pendant l’enregistrement, elle réessaie jusqu’à trois fois avant de signaler un conflit de portée. Conservez votre brouillon, rechargez l’entente et vérifiez votre accès avant de réessayer.

Le volet ne peut pas changer après la création, y compris par l’API. Renvoyer son identifiant inchangé est accepté; un remplacement produit `AGREEMENT_STREAM_IMMUTABLE`. Choisissez le bon programme et volet avant d’enregistrer une nouvelle entente. Des références historiques de sous-type, retenue et risque peuvent être conservées lors d’autres modifications; un remplacement doit respecter la propriété et l’admissibilité actuelles.

Vous ne pouvez pas réduire ou déplacer la période d’aide si un exercice budgétaire actif ne la chevaucherait plus. Par exemple, avant d’avancer la date de fin, vérifiez si l’entente a encore un budget pour un exercice ultérieur. Changer le numéro d’entente relance la vérification de similarité avec l’Historique du financement. Un enregistrement réussi exécute aussi le traitement de mise à jour des extensions configurées dans le même enregistrement.

## Champs personnalisés et cote de risque

L’onglet Général ajoute les sections configurées par le volet. Remplissez les champs actifs obligatoires, conservez ou effacez explicitement les valeurs inactives et enregistrez avec le formulaire habituel. Consultez les [champs personnalisés des ententes](../programs/custom-fields.md) pour les types, un exemple de configuration, les mises à jour partielles et l’acheminement conditionnel.

Quand le volet sélectionne un flux publié d’**Évaluation du risque**, la cote est gérée par flux. Utilisez les commandes correspondantes de l’entente pour lancer l’évaluation et suivre ses étapes d’examen et d’approbation.

La dernière évaluation réussie est associée à une cote du volet selon les intervalles de la publication. Une tentative en attente, échouée, refusée ou annulée ne remplace pas à elle seule la cote enregistrée. Un résultat terminé conserve le flux, la note d’évaluation, la cote associée et la preuve de terminaison. Si le mode de gestion ne peut pas être chargé, réessayez avant de modifier le risque.

Sans flux publié d’Évaluation du risque, la sélection manuelle reste possible selon les permissions du profil. Les cotes conservées s’affichent dans la langue courante. Les notes et identités référencées par des publications courantes ou tentatives actives ne peuvent pas être modifiées ou supprimées avant la résolution de ces dépendances.

## Suppression et rétablissement

Pour supprimer une entente, vous avez besoin de l’accès Gestionnaire et d’une affectation à cette entente. Utilisez l’action de suppression dans la liste et examinez la confirmation. L’application revérifie l’accès avant de supprimer. Un flux actif de soumission d’approbation ou une protection d’une extension activée ou d’un dossier connexe peut bloquer la suppression. Si une vérification échoue, aucune suppression partielle n’est enregistrée.

Les ententes supprimées logiquement disparaissent des listes actives et des projections de relations. L’application n’offre aucune commande de restauration d’entente. Corrigez l’état dépendant ou la configuration d’extension avant de réessayer une suppression refusée. Après une suppression accidentelle réussie, le rétablissement exige une intervention opérationnelle au niveau de la base de données plutôt que la recréation manuelle de l’historique enfant.

![Détail de l’entente et processus enfant](/screenshots/fr/agreement-child-workflow.png)

_Exemple tiré de l’environnement de développement avec données de démonstration; une installation neuve ne contient pas ces enregistrements._
