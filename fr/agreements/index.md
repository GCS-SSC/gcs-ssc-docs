# Ententes de financement

Les ententes de financement sont des dossiers d’exécution appartenant à un volet de paiements de transfert. Une entente relie la configuration du volet aux promoteurs, adresses, budgets, activités, modifications, engagements, prévisions, paiements, réclamations, surveillances, documents, examens, soumissions d’approbation, flux et affectations exactes.

## Modèle d’accès

La liste retourne les dossiers actifs couverts par la permission de rôle `agreement` au moins Lecteur de l’utilisateur à portée globale, d’agence ou de programme. La lecture n’exige pas d’affectation exacte. La recherche porte sur le numéro; le titre anglais ou français; le nom de l’agence, du programme ou du volet; et le type d’entente. Le sélecteur propose toutes les ententes accessibles, **Mes ententes** (vos affectations exactes) et des vues par organisme. Ces filtres restreignent la portée de lecture existante; une affectation ne l’élargit pas. Un filtre d’agence peut encore restreindre la liste. Chaque ligne indique ses capacités de modification et de suppression; les commandes sont activées séparément.

| Combinaison requise | Actions sur l’entente |
| --- | --- |
| Plafond Lecteur | Lire l’entente et ses enfants ordinaires. |
| Plafond Contributeur + affectation exacte | Modifier l’entente et créer/modifier les enfants ordinaires. |
| Plafond Gestionnaire + affectation exacte | Actions du contributeur et suppression logique. |

L’action **Nouvelle entente** exige un plafond Contributeur pour `agreement`; le serveur vérifie la portée exacte d’agence et de programme du volet choisi. Comme aucune affectation n’existe encore, la création enregistre atomiquement l’entente et rend son créateur principal. L’administration du registre exige ensuite la capacité `manage_assignments` distincte.

## Configuration préalable

Avant de créer une entente, configurez :

- une agence, un programme de paiements de transfert et un volet actifs;
- au moins un sous-type d’entente associé à ce volet;
- au moins une base de retenue active du volet;
- une cote de risque facultative si une valeur de risque doit être choisie;
- au moins un promoteur actif que la personne responsable de la création peut lire.

Les onglets ultérieurs exigent les exercices, catégories de coûts, résultats, types de surveillance, engagements, modèles, configurations d’examen ou de flux de travail et autres données de référence correspondants. Une valeur configurée peut disparaître d’une recherche si elle est supprimée, appartient à un autre volet ou se trouve hors de la portée de création ou de modification demandée.

## Créer une entente

Le formulaire initialise **Redistribution** à non et **Retenue** à 10 %. Il contient trois sections principales, les sections personnalisées du volet et les emplacements des extensions activées. Choisissez le programme avant le volet; changer de programme efface les sélections dépendantes. Les promoteurs se sélectionnent indépendamment parmi les profils actifs lisibles.

| Champ | Règle |
| --- | --- |
| Programme et volet | Choisissez le programme, puis un volet disponible dans la portée de création. Le volet est immuable après la création. |
| Sous-type d’entente | Sous-type actif obligatoire appartenant exactement au volet. Le type d’entente est dérivé du sous-type et n’est pas modifiable séparément. |
| Numéro d’entente | En mode manuel, numéro élagué obligatoire d’au plus 15 caractères. Avec un fournisseur activé, la création génère le numéro et refuse un numéro fourni manuellement. |
| Numéro du système financier | Identifiant de type entier non négatif obligatoire; les grands identifiants de base de données sont transmis sous forme de chaînes. |
| Dates d’aide autorisée | Toutes deux obligatoires; la fin ne peut pas précéder le début. |
| Redistribution | Valeur oui-non obligatoire. |
| Titres anglais et français | Tous deux obligatoires et limités à 255 caractères chacun. |
| Descriptions anglaise et française | Toutes deux obligatoires. |
| Retenue | Pourcentage obligatoire de 0 à 100 inclusivement, enregistré à deux décimales. |
| Base de retenue | Base active obligatoire configurée pour le volet. Elle n’est pas limitée à deux libellés codés en dur. |
| Cote de risque | Sélection manuelle facultative sans flux publié d’Évaluation du risque; sinon, gestion par flux et modification interdite dans le profil. |
| Promoteurs | Au moins un profil actif et lisible sans doublon. Choisissez un sous-type de bénéficiaire admissible pour chaque lien entente–promoteur; le type appartient à cette relation. Consultez [Promoteurs de l’entente](./applicant-recipients.md). |

Le changement de volet dans le formulaire efface le sous-type, la base de retenue et la cote de risque, puisque ces valeurs appartiennent au volet. La création verrouille les portées d’extension et le volet sélectionné, reconstruit l’autorisation, verrouille chaque promoteur choisi, valide les références entre volets, insère l’entente et ses liens, enregistre l’entité typée et crée atomiquement l’affectation principale du créateur.

## Correspondance des numéros d’entente

La règle d’unicité active de la base de données interdit le même numéro d’entente dans un volet. De plus, la création et les modifications d’identité comparent le numéro système proposé aux enregistrements externes lisibles de l’Historique du financement dans la même portée de noms d’agence et de programme. Une correspondance proche exige une empreinte de confirmation au serveur.

Les formulaires de création et de modification présentent maintenant une boîte de confirmation des similarités. Examinez la correspondance possible : annulez pour corriger le brouillon, ou confirmez les avertissements puis soumettez de nouveau. Les correspondances restreintes ne dévoilent pas leurs libellés protégés. La confirmation vise le couple volet/numéro proposé; le modifier invalide la confirmation précédente. Une nouvelle correspondance apparue avant la fin de la transaction rouvre la boîte avec les avertissements actuels. Confirmer ne contourne pas un conflit d’unicité exacte.

Par exemple, un numéro ressemblant à une entrée externe d’Historique du financement peut représenter un doublon ou une entente distincte. Vérifiez le contexte accessible et confirmez explicitement seulement si le nouveau dossier est voulu. Annuler laisse l’entente non enregistrée.

Lorsque la numérotation est gérée par fournisseur, l’hôte résout exactement un fournisseur activé pour l’organisme et le volet et génère le numéro dans la transaction de création. Des fournisseurs concurrents ou un résultat invalide bloquent la création. N’inventez pas de numéro temporaire et ne réessayez pas avec une valeur manuelle; demandez à l’administrateur de corriger la configuration. Le format et les compteurs propres au fournisseur relèvent de la documentation de son extension.

## Espace de détail

La route de détail résout d’abord la portée d’agence, de programme et de volet de l’entente. Les lecteurs voient Général en mode consultation; les personnes autorisées à modifier obtiennent le formulaire intégré. Les commandes de création, de modification et de suppression des enfants sont dérivées séparément. L’espace vertical contient :

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

Les extensions activées peuvent ajouter des onglets et des champs au profil. Les routes de détail enfant remplacent l’espace d’onglets parent tout en conservant le contexte de l’entente.

## Notes de l’entente

Ouvrez **Notes** dans l’entente pour chercher, lire, ajouter, modifier ou retirer des notes de travail. Chaque note exige un objet dans au moins une langue et un corps dans au moins une langue; l’objet est limité à 255 caractères Unicode. Rédigez les deux langues lorsque les deux publics doivent la lire. La liste indique l’auteur et la dernière personne ayant modifié la note, de la plus récente à la plus ancienne. Les personnes pouvant lire l’entente voient les notes. La création et la modification exigent la permission d’action correspondante sur l’entente et son affectation exacte; la suppression exige le niveau Gestionnaire applicable et l’affectation. Le serveur revérifie la portée et l’état de l’entente à l’écriture. Une note supprimée quitte la liste active, mais demeure dans l’historique.

Si l’enregistrement échoue, conservez le brouillon, rechargez l’entente pour vérifier son état et votre affectation, puis réessayez. Une mise à jour partielle conserve les champs de langue omis; effacer le dernier objet ou le dernier corps est refusé. Les notes ne remplacent ni les documents ni les preuves d’approbation.

## Protections lors de la modification

Une modification du profil relit et valide la charge utile partielle localisée, puis verrouille les portées d’extension, les volets touchés, l’état du cycle de vie des extensions et l’entente dans une transaction ordonnée. L’autorisation et la portée sont reconstruites après le verrouillage. Si la propriété change pendant l’acquisition des verrous, le serveur fait jusqu’à trois tentatives, puis signale un conflit de portée.

Le volet ne peut pas changer après la création, y compris par l’API. Renvoyer son identifiant inchangé est accepté; un remplacement produit `AGREEMENT_STREAM_IMMUTABLE`. Choisissez le bon programme et volet avant d’enregistrer une nouvelle entente. Des références historiques de sous-type, retenue et risque peuvent être conservées lors d’autres modifications; un remplacement doit respecter la propriété et l’admissibilité actuelles.

La réduction ou le déplacement de la période d’aide est refusé lorsqu’un exercice budgétaire actif de l’entente ne chevaucherait plus les dates proposées. Le changement du numéro d’entente relance la vérification de similarité avec l’Historique du financement. Une modification réussie appelle le crochet hôte de mise à jour du profil dans la transaction.

## Champs personnalisés et cote de risque

L’onglet Général ajoute les sections configurées par le volet. Remplissez les champs actifs obligatoires, conservez ou effacez explicitement les valeurs inactives et enregistrez avec le formulaire habituel. Consultez les [champs personnalisés des ententes](../programs/custom-fields.md) pour les types, un exemple de configuration, les mises à jour partielles et l’acheminement conditionnel.

Quand le volet sélectionne un flux publié d’**Évaluation du risque**, la cote est gérée par flux. Utilisez les commandes correspondantes de l’entente pour lancer l’évaluation et suivre ses étapes d’examen et d’approbation. La dernière évaluation réussie est associée à une cote du volet selon les intervalles de la publication. Une tentative en attente, échouée, refusée ou annulée ne remplace pas à elle seule la cote enregistrée. Un résultat terminé conserve le flux, la note d’évaluation, la cote associée et la preuve de terminaison. Si le mode de gestion ne peut pas être chargé, réessayez avant de modifier le risque.

Sans flux publié d’Évaluation du risque, la sélection manuelle reste possible selon les permissions du profil. Les cotes conservées s’affichent dans la langue courante. Les notes et identités référencées par des publications courantes ou tentatives actives ne peuvent pas être modifiées ou supprimées avant la résolution de ces dépendances.

## Suppression et rétablissement

La suppression exige le plafond Gestionnaire et l’affectation exacte, demande une confirmation dans la liste, puis verrouille et autorise de nouveau l’entente. Une soumission d’approbation active bloque la suppression. Chaque garde de suppression d’une extension s’exécute avant la suppression logique; une garde ou une dépendance peut refuser l’opération et aucune suppression partielle n’est validée.

Les ententes supprimées logiquement disparaissent des listes actives et des projections de relations. L’application n’offre aucune commande de restauration d’entente. Corrigez l’état dépendant ou la configuration d’extension avant de réessayer une suppression refusée. Après une suppression accidentelle réussie, le rétablissement exige une intervention opérationnelle au niveau de la base de données plutôt que la recréation manuelle de l’historique enfant.

![Détail de l’entente et processus enfant](/screenshots/fr/agreement-child-workflow.png)

_Exemple tiré de l’environnement de développement avec données de démonstration; une installation neuve ne contient pas ces enregistrements._
