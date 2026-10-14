# Flux de travail

Un **flux de travail** est un processus ordonné pour un dossier : par exemple, un examen d’admissibilité, une recommandation, puis une approbation. Il utilise les examens, recommandations, collectes de données et approbations publiés par l’agence. Une **configuration** est le modèle du processus; une **exécution** ou **tentative** est le processus démarré pour un dossier précis. Chaque exécution conserve les versions publiées utilisées au démarrage, sa **configuration figée**.

Choisissez explicitement un flux `standard` pour un processus facultatif. Utilisez `approval_submission` pour l’approbation du dossier ou `risk_rating` pour calculer le risque d’une entente. La clôture utilise la soumission d’approbation, sans objet distinct `close_out`. Le statut métier du dossier, l’état brouillon/publié de la configuration et l’avancement de l’exécution décrivent des éléments différents.

## Configurer un flux

Cette section s’adresse aux administrateurs qui conçoivent le processus. Les agents utilisant un processus existant peuvent consulter [Travailler avec une exécution](#travailler-avec-une-exécution). Un **membre** est une étape du processus; une **transition** est un changement configuré du statut métier du dossier au démarrage, à la réussite ou à l’échec de cette étape.

Ouvrez une agence et choisissez **Configurations de flux** pour créer et publier la définition. Ouvrez ensuite le volet du programme et ajoutez le flux d’agence publié dans **Configurations de flux**. L’éditeur regroupe l’identité, l’acheminement, les transitions et le comportement. Le lien au volet résout les valeurs locales, notamment les cotes de risque et la disponibilité des champs. Consultez [Catalogues d’agence](../admin/agency-catalogs.md).

| Champ | Signification |
| --- | --- |
| Identité anglaise et française | Nom et description administratifs. |
| Type d’entité | Catégorie de dossier traité, comme une entente ou une réclamation. |
| Démarrage | Dépend des capacités de la cible : sélection explicite d’un flux standard, approbation explicite de l’entente et soumission d’approbation des enfants par Achèvement. |
| Objet | `standard`, `approval_submission` ou `risk_rating` pour les ententes/modifications. |
| États de départ permis | États sources à partir desquels le flux peut commencer. |
| État d’annulation/d’échec d’exécution | Transition de repli globale en cas d’annulation ou d’échec déterministe du moteur. |
| Membres ordonnés | Toute séquence linéaire d’ensembles d’examens, d’ensembles de recommandations, de collectes de données et de modèles d’approbation racine. Chacun a ses transitions de matérialisation, réussite et échec. |
| Propriétaires par défaut | Une correspondance par membre d’examen/recommandation imbriqué et au plus une par collecte; utilisateur ou groupe admissible par défaut, avec réacheminement facultatif. |
| Permettre la reprise | Autorise la dernière tentative échouée à reprendre sa configuration figée. |

Une définition appartient à l’agence exacte de son URL. La création et la publication exigent le niveau de rôle d’agence correspondant; l’ajout ou le retrait du lien au volet exige le niveau `transfer_payment` correspondant; les affectations exactes aux dossiers métier n’accordent pas l’accès à la configuration.

Démarrez explicitement la soumission d’approbation d’une entente. Pour une modification ou une clôture, Achever exige un flux publié de soumission d’approbation dont le parcours de réussite mène à un statut métier terminal de l’agence. Les réclamations, rapprochements, engagements, prévisions, paiements et surveillances peuvent s’achever avec un flux d’approbation facultatif. Les administrateurs doivent fournir des numéros de séquence et des correspondances de responsables par défaut complets et uniques pour les examens et recommandations des ensembles. Les changements de statut utilisent les identifiants configurés de l’agence; ils ne supposent pas des noms comme `inreview` ou `complete`.

## Publier et retirer

Les nouvelles configurations sont des brouillons. La publication vérifie les configurations liées et conserve la version 1, qui ne peut pas être modifiée. Enregistrer des changements à une configuration publiée modifie seulement la copie de travail. Publier ces changements conserve la version figée suivante; publier sans changement ne crée aucune nouvelle version.

La publication échoue lorsqu’un ensemble d’examens ou de recommandations, une collecte de données ou un modèle d’approbation lié, n’est pas publié ou a été retiré. Une configuration publiée épingle le plan d’examen, le plan de recommandation, les approbations des membres et l’approbation finale exacts des prochaines tentatives. Les tentatives existantes demeurent figées lorsque les administrateurs modifient ou republient la configuration.

Le retrait d’une configuration publiée est permanent et empêche toute nouvelle sélection. Les tentatives historiques conservent leur configuration et leurs liens avec les versions et tentatives précédentes. Seul un brouillon non référencé peut être supprimé logiquement.

## Séquence d’exécution composable

Plusieurs flux standard publiés peuvent coexister pour une portée et un type d’entité. L’utilisateur choisit explicitement une configuration admissible; l’API exige `workflowSetupId` pour `purpose: "standard"`. La soumission d’approbation et l’Évaluation du risque utilisent chacune leur publication sélectionnée. Une seule exécution peut être active par cible, tous objets confondus. Une tentative terminale libère cette contrainte; un autre flux standard admissible peut commencer, même après Achèvement si le statut métier n’est pas terminal. Achèvement ne choisit ni ne démarre jamais un flux standard.

Les étapes suivent leur ordre configuré. Chacune possède un numéro de séquence unique supérieur à zéro :

1. L’application crée le prochain ensemble d’examens, ensemble de recommandations, collecte de données ou circuit issu d’un modèle d’approbation racine. Si cela est configuré, elle change le statut métier du dossier lors de cette création.
2. Dans un ensemble, les examens ou recommandations suivent toujours leurs propres règles séquentielles ou parallèles et leurs approbations. Un utilisateur par défaut reçoit le travail seulement s’il conserve l’admissibilité Contributeur pour le dossier propriétaire.
3. Lorsque toute l’étape réussit, l’application applique le changement de statut de réussite configuré et crée l’étape suivante dans une transaction. Si l’étape échoue, elle applique le changement de statut d’échec configuré et fait échouer l’exécution.
4. Après la dernière étape, l’exécution se termine. L’annulation et un échec détecté par le moteur utilisent les changements de statut de repli configurés du flux.

Un résultat Non recommandé fait échouer l’ensemble seulement lorsque l’option publiée **Faire échouer l’ensemble si Non recommandé** de ce membre est vraie. Sinon, le moteur passe au membre suivant ou à l’étape finale. Cette politique est figée avec le plan.

Les états d’exécution sont `pending`, `active`, `awaiting_action`, `paused`, `succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled` et `failed`. Ces états système ne sont pas les statuts métier configurables de l’organisme. Les éléments et l’historique non modifiable des transitions montrent le membre figé courant et chaque changement d’état de la cible.

## Achèvement et exemple de séquence

Achèvement constate la fin de l’édition ordinaire; ce n’est pas un statut métier modifiable. Un flux actif bloque Achèvement. Pour un enfant pris en charge, l’action démarre la soumission d’approbation sélectionnée ou consigne `no_workflow`, dans une seule transaction. Les modifications et clôtures refusent l’achèvement sans leur flux obligatoire. Si sa création échoue, l’achèvement est aussi annulé.

Sans flux applicable, les effets positifs sont immédiats. Avec un flux, ils attendent sa terminaison positive. Un engagement réussi devient actif pour son entente/type et remplace le précédent; une prévision devient active pour son entente/exercice. Un rapprochement réussi ferme son travail ouvert; s’il est final, il empêche tout rapprochement supplémentaire et peut appliquer le statut final de réclamation configuré par l’organisme. Un échec ou une annulation ne produit pas ces effets. Ajouter une configuration plus tard ne modifie pas rétroactivement un achèvement `no_workflow`.

Par exemple, configurez un flux d’approbation d’engagement avec un ensemble d’examens suivi d’un modèle d’approbation racine. Le responsable enregistre les lignes et achève l’engagement. L’action verrouille l’édition ordinaire et démarre l’examen publié. L’examen terminé transmet le travail à l’approbateur affecté. Sa dernière approbation active le nouvel engagement et désactive l’ancien du même type. Si le travail est refusé, examinez la tentative et utilisez sa reprise autorisée; ne tentez pas d’achever le même dossier une deuxième fois.

## Conditions et Évaluation du risque

Les conditions des membres peuvent utiliser les options des champs personnalisés de l’agence ainsi que les valeurs du profil d’entente : sous-type d’entente, redistribution (oui/non) et sous-type de bénéficiaire. Choisissez **Un des** ou **Tous** pour comparer les sous-types de bénéficiaire sélectionnés. Les conditions de champs différents se combinent par ET; les options d’un même champ se combinent par OU. L’éditeur présente les conditions dans une fenêtre dédiée et conserve leurs libellés. Le démarrage capture les valeurs d’entente et l’admissibilité des membres; les membres ignorés gardent leur position publiée sans créer de tâche. Une nouvelle tentative conserve les publications initiales, mais capture les valeurs courantes pour sa propre exécution sans modifier les preuves de la tentative précédente. Un champ requis manquant ou une valeur indisponible dans le volet bloque un nouveau déploiement. Consultez les [champs personnalisés](../programs/custom-fields.md) pour les exemples et contraintes de retrait.

Le flux d’Évaluation du risque se sélectionne indépendamment de l’approbation. Sa configuration publiée désigne une seule évaluation comme source et associe chaque maximum de note ordonné à une cote de risque active du volet. Une exécution réussie associe la note au premier maximum applicable et applique la cote capturée. Une preuve invalide ou périmée suit le parcours d’échec sans remplacer l’ancienne cote. Le parcours conditionnel choisi doit conserver cette évaluation.

Les flux de modification peuvent aussi conditionner une étape aux sous-types de modification sélectionnés, avec correspondance Un des/Tous. Par exemple, dirigez seulement les modifications de sous-type Urgence vers une approbation supplémentaire. Le sélecteur regroupe les choix par programme/volet dans l’agence; un choix d’un autre volet ne rend pas cette route applicable à la cible. Les conditions publiées et les identifiants/libellés capturés restent les preuves de la tentative.

## Désigner les preuves de risque et les responsables

Un flux de risque prend en charge les ententes et les modifications. Dans son membre ensemble d’examens, activez **Définit la cote de risque** et choisissez explicitement l’évaluation du plan publié de cet ensemble. Un seul membre de flux et une seule évaluation imbriquée fournissent le score; ce n’est pas nécessairement la première évaluation. Une collecte de données, une liste de contrôle ou une autre occurrence du même schéma ne peut la remplacer. Publiez la conception avec des bandes de score ordonnées valides, puis liez-la au volet et au type d’entité exacts. Activez l’option de risque obligatoire seulement si un flux de risque réussi de la cible exacte doit précéder la soumission d’approbation; l’option est facultative par défaut.

Par exemple, un ensemble contient Admissibilité en premier et Risque financier en deuxième. Désignez Risque financier et associez ses scores maximaux aux cotes du volet. Achever Admissibilité ne produit aucun résultat de risque. Même achever Risque financier n’applique pas son score avant la réussite de tout le flux. L’absence de l’évaluation désignée ou une route conditionnelle qui l’omet bloque le calcul plutôt que d’utiliser Admissibilité. Pour une modification, le résultat actualise seulement sa proposition; l’approbation applique ensuite la proposition capturée à l’entente. Consultez [Risque de modification](../agreements/amendments.md).

Les affectations de responsables d’examen, de recommandation et de collecte de données peuvent choisir un utilisateur admissible ou un groupe de l’agence. Une occurrence de groupe commence sans réclamation ni affectation automatique de l’initiateur. Un membre admissible doit la réclamer avant de modifier; l’appartenance ne fournit pas le plafond de rôle du propriétaire. Un responsable indisponible met le flux en pause selon le mécanisme de reprise. Le choix de reprise doit identifier l’occurrence imbriquée exacte; des définitions répétées restent des travaux indépendants.

## Membres Collecte de données

Ajoutez directement une collecte de données publiée de l’agence comme membre ordonné de tout type de flux. Son questionnaire recueille des renseignements sans produire de recommandation. Son modèle d’approbation figé facultatif compte parmi les étapes d’approbation obligatoires de la route. Choisir deux fois la même définition crée des réponses, révisions et registres indépendants. Sélectionnez sa ligne pour répondre dans la section Flux. Consultez [Collectes de données](data-collections.md) pour la configuration, l’enregistrement, la soumission et la reprise.

## Soumission d’approbation d’une entente

Pour une entente, démarrez explicitement la soumission d’approbation; pour une modification, l’achèvement démarre la soumission obligatoire dans la même transaction. La section Flux présente la tentative obtenue. L’application conserve un dossier d’approbation : une copie figée des renseignements soumis, pour que les approbateurs voient exactement ce sur quoi ils décident.

Détails techniques : le démarrage verrouille la source actuelle, crée l’exécution et conserve un seul dossier non modifiable `Funding_Case_Agreement_Approval_Submission` dans une transaction. Le dossier consigne la version de schéma 3, l’heure de soumission et un hachage canonique SHA-256 en minuscules (une empreinte servant à vérifier que son contenu n’a pas changé).

Le dossier d’une entente comprend son profil avec les libellés de référence bilingues résolus, les promoteurs liés et leurs registres, le budget courant et les activités courantes. Sa section de risque de version 3 conserve les décisions enabled/apply, le score, les libellés bilingues de cote, la source exacte du calcul et la préparation. Le dossier d’une modification comprend aussi les types et sous-types choisis et seulement les domaines modifiés : budget pour une modification budgétaire, activités pour une modification d’activités et dates proposées pour une modification de durée. Le profil d’entente et les données de promoteurs inchangés sont omis du dossier d’une modification.

Le dossier conserve les identifiants des versions du budget et des activités utilisées. Il conserve aussi les noms bilingues des valeurs référencées afin qu’un changement de nom ultérieur ne modifie pas ce que les approbateurs ont vu. L’interface présente le dossier enregistré dans des sections groupées et repliables sans le reconstruire à partir des valeurs courantes.

Pendant une soumission d’approbation active, vous ne pouvez pas apporter de changements incompatibles au profil, au budget, aux activités, à la suppression ou au cycle de vie de l’entente ou de la modification. Une exécution annulée ou échouée applique le statut d’échec configuré et n’applique pas les changements soumis à l’entente.

## Fin de l’approbation et révisions

Avant la réussite finale du processus d’approbation, l’application verrouille l’entente et vérifie à nouveau l’empreinte du dossier enregistré. Si elle ne correspond plus, les renseignements soumis ne peuvent pas être appliqués. Sinon, l’application :

1. l’application des seuls changements de modification approuvés dans le dossier;
2. la fermeture de la modification et l’attribution de son numéro, s’il y a lieu;
3. l’écriture d’une seule `Funding_Case_Agreement_Revision` liée à la soumission;
4. l’application de l’état de réussite configuré et l’achèvement de l’exécution.

L’approbation initiale de l’entente écrit la révision 0. Les modifications approuvées utilisent le numéro suivant la dernière révision. Le lien unique à la soumission d’approbation empêche une nouvelle tentative de progression de créer une autre révision.

Avant d’appliquer le budget approuvé, l’application vérifie à nouveau l’utilisation annuelle des prévisions, réclamations et rapprochements réussis de cette entente par rapport au budget proposé. Elle ne vérifie pas le plafond distinct de financement du volet pour l’ensemble des ententes ni si ce plafond serait dépassé. Avant l’approbation finale de la modification, rapprochez manuellement le financement proposé et cette capacité du volet, en incluant les autres ententes. La réussite du contrôle annuel ou de la vérification de l’empreinte du dossier ne prouve pas que la proposition respecte le plafond de financement du volet. Consultez [Protections du budget de modification](../agreements/amendments.md).

## Travailler avec une exécution

Pour le travail quotidien, ouvrez la section Flux du dossier source et vérifiez l’étape courante. Ouvrez l’examen, la recommandation ou la collecte de données qui vous est affecté et terminez le travail requis. Si l’étape est une approbation, l’approbateur affecté prend la décision. Revenez à la section Flux pour voir si le processus est passé à l’étape suivante, attend une personne ou nécessite un rétablissement.

Par exemple, si une réclamation attend un examen financier affecté à un collègue, votre affectation à la réclamation ne vous permet pas d’achever son examen. Vérifiez l’affectation distincte de l’examen. Si le réviseur configuré est indisponible et que l’exécution est en pause, utilisez l’action de rétablissement du responsable permise, décrite ci-dessous.

La section Flux de la source montre les actions démarrer/reprendre/annuler, la séquence figée, les états, les questions de recommandation, les étapes d’approbation, les tentatives précédentes échouées et tout dossier d’approbation non modifiable. L’enregistrement d’une recommandation conserve son état d’exécution modifiable; sa soumission valide les réponses requises et dérive le résultat de la question décisive publiée.

Vous pouvez ouvrir une recommandation directement depuis Travail affecté. Pour la modifier, vous devez être activement affecté à cette recommandation précise, avoir la permission Contributeur actuelle pour son dossier propriétaire et son élément de flux doit être actif et modifiable. Un approbateur affecté peut lire le dossier de soumission nécessaire à sa décision, même sans accès ordinaire en lecture à l’entente.

Les affectations exactes aux recommandations, examens et approbations sont distinctes. Elles n’accordent ni le parent ni les dossiers frères. Consultez [Permissions de rôle et affectations exactes](./rbac.md).

## Annuler, reprendre et récupérer

Choisissez l’action adaptée : l’annulation met fin à une exécution active; la reprise crée une nouvelle tentative après une exécution sans succès; le rétablissement continue un travail en pause après la résolution du problème d’affectation. Ces actions dépendent de votre accès actuel et des règles ci-dessous. Un état **terminal** signifie que la tentative est terminée, par réussite, échec ou annulation. Il est distinct du statut métier du dossier et de l’achèvement.

L’annulation est disponible seulement pour une exécution active. Elle annule les enfants et éléments de flux actifs, marque l’exécution annulée et applique l’état d’échec configuré dans une transaction.

La reprise crée une nouvelle tentative et conserve les preuves de la tentative originale. Elle est disponible seulement si toutes les conditions suivantes sont respectées :

- Vous reprenez la dernière tentative `unsuccessful`, `denied`, `cancelled` ou `failed`.
- La configuration conservée pour cette tentative permet la reprise et aucune tentative suivante n’a déjà été créée.
- Vos permissions s’appliquent au propriétaire actuel du dossier. L’applicabilité de la configuration reste vérifiée selon la configuration originale.
- Le dossier a un statut métier non terminal (qui permet de poursuivre le travail), un statut de départ permis par la configuration conservée et aucune autre exécution active incompatible.

La reprise utilise les mêmes versions publiées que la tentative originale, même si un administrateur a modifié ou retiré la configuration depuis. Les règles actuelles de sélection s’appliquent à une nouvelle exécution, plutôt que de remplacer les versions conservées pour une reprise.

Si la configuration ne désigne aucun utilisateur ou groupe par défaut, la personne qui a démarré le flux reste affectée au travail. Si elle désigne un utilisateur supprimé, inactif ou qui n’a plus la permission Contributeur pour le dossier propriétaire à la création d’un examen ou d’une autre tâche, le flux passe en pause (`paused`). Il consigne le problème d’affectation sans créer de travail partiellement affecté.

Pour rétablir le travail en pause :

1. Si la configuration permet un remplaçant, la personne qui a démarré le flux ou déclenché la création de la tâche peut le choisir. Un gestionnaire d’affectations possédant la permission distincte requise peut aussi rétablir le travail.
2. Choisissez un utilisateur actif ayant actuellement la permission Contributeur pour le dossier précis propriétaire de la tâche. Fournissez un remplaçant pour chaque problème d’affectation non résolu, exactement une fois.
3. Continuez le flux. L’application vérifie votre accès actuel, verrouille le dossier, vérifie chaque problème et remplaçant, enregistre les choix et poursuit le travail. Elle ne recrée pas un ensemble d’examens ou de recommandations déjà créé.

Les utilisateurs sans le lien requis avec ce travail ne peuvent consulter les remplaçants possibles ni continuer le flux. Si personne n’est admissible, demandez à l’administrateur de corriger les permissions de rôle ou de portée, ou de changer le responsable par défaut des configurations futures. Annulez l’exécution active lorsque le rétablissement ne convient pas.

Si vous ne pouvez pas démarrer un flux, vérifiez :

- Le statut métier actuel du dossier permet-il le démarrage de ce flux?
- L’objet du flux et le volet de programme correspondent-ils au dossier? Toutes les configurations liées sont-elles publiées?
- Êtes-vous affecté au dossier requis et avez-vous la permission Contributeur dans sa portée actuelle?
- Un autre flux actif ou un ensemble d’examens bloquant est-il déjà présent?

Les dossiers d’approbation et tentatives historiques ne peuvent pas être modifiés. Corrigez le dossier ou la configuration pour une prochaine exécution, ou utilisez l’action de reprise prise en charge.

Consultez [Schémas et configurations de recommandation](../programs/recommendations.md), [Modèles d’approbation](../programs/approval-templates.md), [Modifications d’entente](../agreements/amendments.md) et [Approbations et achèvements](approvals-completions.md).
