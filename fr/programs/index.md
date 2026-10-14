# Programmes

Un programme est l'initiative globale de financement, par exemple « Amélioration des installations communautaires ». Il appartient à une agence et précise les dates, les modalités, le financement annuel, les objectifs et les résultats attendus de cette initiative.

Un **volet** est une voie de financement du programme, par exemple « Petits projets communautaires ». Il fournit les choix et les règles utilisés pour l'admission, les ententes, les examens, les approbations, les réclamations, les prévisions, les paiements, la surveillance et les modifications. Configurez le programme, puis ses volets. L'agence, les dates, le réglage Actif, les budgets, les résultats, les objectifs et les indicateurs du programme servent de point de départ.

## Prerequis Dans Une Installation Vide

Avant de créer des programmes de production, configurez l’agence propriétaire et les données de référence dont les formulaires de programme et de volet dépendent :

| Configuration | Utilité |
| --- | --- |
| Profil d’agence et permissions structurelles de rôle | Les administrateurs de programme ont besoin d’un contexte d’agence et d’une permission de rôle `transfer_payment` de portée appropriée. Les affectations exactes visent seulement les 11 types de dossiers d’exécution attribuables; elles ne s’attachent pas aux dossiers de configuration d’agence, de programme ou de volet. |
| Exercices financiers de l’agence | Les budgets de programme sont liés à ces enregistrements. |
| Sous-types de destinataires demandeurs, types d’entente, catégories de coûts et éléments de ligne de coûts | Les volets utilisent ces données d’agence. |
| Utilisateurs communs, types "au nom de", schémas d’examen, schémas de recommandation et modèles d’approbation | Requis lorsque le premier volet doit générer des examens, recommandations ou approbations. |

Si l’administrateur travaille dans un contexte d’agence actif, le choix de l’agence est verrouillé. Sinon, le flux de création permet de choisir une agence que l’utilisateur est autorisé à administrer.

## Page De Liste

La page Programmes affiche seulement les enregistrements que l’utilisateur courant peut lire grâce à une permission structurelle de rôle `transfer_payment` globale, propre à une agence ou limitée aux programmes liés. Les affectations exactes de promoteur ou d’entente ne donnent aucun accès aux programmes, et l’accès à la configuration ne découle jamais d’une autre affectation d’exécution.

La liste prend en charge :

- Recherche dans les noms anglais et français du programme, les abréviations anglaise et française, le nom de l’agence et l’identifiant du programme.
- Filtrage par statut, y compris tous les statuts.
- Pagination et contrôle des colonnes du tableau.
- Compteurs de sommaire pour le total des programmes et les programmes actifs lorsque la donnée est disponible.
- Actions créer, modifier, supprimer et assistant lorsque l’utilisateur a la permission de paiement de transfert correspondante.

La suppression utilise le flux commun de confirmation et supprime logiquement le profil. Les administrateurs devraient l'utiliser comme correction de configuration, et non comme action normale de fin de vie pour un programme ayant un historique opérationnel.

## Modale De Creation Rapide

La modale standard crée ou modifie seulement le profil de paiement de transfert. Elle est utile lorsque l’administrateur veut créer le profil du programme d’abord, puis configurer les résultats, objectifs, budgets, indicateurs et volets plus tard.

Les champs du profil sont :

- Agence : obligatoire, utilisée pour la portée des permissions et le filtrage des données de référence.
- Date de début et date de fin : obligatoires. La date de fin doit être égale ou postérieure à la date de début.
- Nom anglais et nom français.
- Abréviation anglaise et abréviation française.
- Liens français et anglais des modalités : les deux sont obligatoires et doivent être des URL valides.
- Description anglaise et description française.
- Objectif anglais et objectif français.
- Indicateur Actif : faux par défaut à la création.

Tous les champs bilingues sont obligatoires. Le formulaire refuse un programme dont le texte français ou anglais manque.

## Assistant De Programme

L’assistant crée le profil et les enregistrements enfants sélectionnés ensemble. Si un champ obligatoire, une règle de doublon ou une règle de données de référence échoue, toute la soumission échoue et aucun programme partiel n’est créé.

Les étapes de l’assistant sont :

- Général : agence, dates, noms bilingues, abréviations, liens français et anglais des modalités, descriptions, objectifs et indicateur actif.
- Résultats : zéro ou plusieurs résultats bilingues.
- Objectifs : zéro ou plusieurs énoncés d’objectif bilingues.
- Budgets : zéro ou plusieurs budgets d’exercice financier. Chaque ligne choisit un exercice financier de l’agence, un budget total et un seuil de surengagement.
- Rendement : zéro ou plusieurs indicateurs de rendement, chacun lié à un résultat de l’assistant.
- Révision : sommaire en lecture seule des données qui seront soumises.

## Regles De L Assistant

| Règle | Comportement |
| --- | --- |
| Les noms de résultat doivent être uniques | La même combinaison de nom anglais/français ne peut pas apparaître deux fois. |
| Les objectifs doivent être uniques | La même combinaison de texte anglais/français ne peut pas apparaître deux fois. |
| Un seul budget par exercice | Chaque exercice financier ne peut apparaître qu’une fois. |
| Les indicateurs doivent rester liés à un résultat | Supprimer un résultat supprime aussi les indicateurs liés. |
| Les noms d’indicateur doivent être uniques dans un résultat | Les doublons sont bloqués dans le résultat sélectionné. |
| Changer l’agence réinitialise les budgets | Les budgets sont effacés parce que les exercices financiers sont propres à l’agence. |
| Les exercices doivent appartenir à l’agence choisie | Un budget de programme peut seulement utiliser les exercices de l’agence sélectionnée. |

À la soumission, l’assistant crée le profil, les résultats, les objectifs, les budgets et les indicateurs de rendement liés aux résultats créés.

## Page De Detail

L’ouverture d’un programme affiche un sommaire repliable avec le nom et la description bilingues. Le bouton de modification ouvre la même modale de profil que la liste, avec les dates normalisées pour les champs de date.

La page de détail utilise six onglets verticaux pouvant être liés directement : Général, Volets, Résultats, Objectifs, Budgets et Indicateurs de rendement. L'onglet sélectionné est conservé dans le paramètre de requête `section`; un administrateur peut donc ajouter une zone de configuration précise à ses favoris.

## Onglet General

L’onglet Général affiche les champs du profil en lecture seule :

- Identité du profil de paiement de transfert portée par l’agence.
- Date de début et date de fin.
- Nom anglais et nom français.
- Abréviation anglaise et abréviation française.
- Description anglaise et description française.
- Objectif anglais et objectif français.
- Liens français et anglais des modalités.
- Statut.

Utilisez l’action de modification au niveau de la page pour changer ces champs.

## Onglet Volets

L’onglet Volets liste les volets opérationnels du programme. Les ententes et la plupart des configurations d’exécution sont pilotées par le volet; au moins un volet est donc normalement requis avant la création d’ententes de production.

Le tableau des volets permet la création, la modification, la suppression et l’utilisation d’un assistant de configuration lorsque l’utilisateur peut modifier les enregistrements enfants. Un volet contient un nom, une abréviation, une description et un objectif bilingues, ainsi qu’un volet parent facultatif, un indicateur de redistribution et un statut.

Ouvrez un volet pour configurer les budgets, destinataires admissibles, lignes de coûts, sous-types d’entente, engagements, cotes de risque, configurations d’examen, configurations de recommandation, modèles d’approbation, modèles de documents et extensions.

## Onglet Resultats

Les résultats décrivent les changements attendus qui servent au suivi du rendement du programme. Chaque résultat contient :

- Nom anglais et nom français.
- Description anglaise et description française.

Les indicateurs de rendement sont liés aux résultats; modifier ou supprimer des résultats peut donc changer les options disponibles lors de la configuration des indicateurs.

Par exemple, utilisez « Meilleur accès aux installations communautaires » comme résultat et décrivez le changement attendu. Ajoutez les mesures de ce changement dans Indicateurs de rendement.

## Onglet Objectifs

Les objectifs décrivent en français et en anglais ce que le programme vise à accomplir. Chaque ligne contient :

- Texte d’objectif anglais.
- Texte d’objectif français.

Les objectifs sont au niveau du programme. Ils ne remplacent pas les objectifs de volet, qui sont configurés sur chaque volet.

Par exemple, « Soutenir la rénovation d'espaces communautaires accessibles » décrit ce que le programme vise à soutenir. Un volet peut avoir un objectif plus précis, comme soutenir les petits projets de rénovation.

## Onglet Budgets

Créez un budget de programme pour chaque exercice financier d'agence utilisé par les volets. Chaque ligne contient :

- Exercice financier : choisissez un exercice dans les données de référence de l'agence du programme.
- Budget total : l'enveloppe de financement disponible pour cet exercice.
- Seuil de surengagement : la marge configurée au-dessus du budget, affichée en pourcentage. La valeur enregistrée est un ratio : `0.10` signifie 10 % et `0` signifie aucune marge de surengagement. Utilisez le pourcentage affiché dans le formulaire.

Créez ces lignes avant les budgets de volet, les engagements ou la configuration d'entente qui exige un exercice. Les budgets de volet référencent ensuite le budget de programme approprié.

Par exemple, si les allocations actives aux volets totalisent 700 000 $, une réduction du budget de programme à 650 000 $ est refusée. Vous ne pouvez pas non plus supprimer le budget tant que des allocations actives de volet le référencent. Examinez d'abord les allocations et rechargez si un autre administrateur les a modifiées.

Vous pouvez conserver un exercice enregistré après son retrait par l'agence, afin de corriger un montant sans changer l'année. Pour choisir un autre exercice, sélectionnez un exercice actif de la même agence. Le changement est bloqué s'il déplacerait les dépendances d'années de financement d'ententes existantes vers un autre exercice.

Le sélecteur recherche les exercices d'agence et garde le libellé de l'exercice enregistré visible même hors de la page de résultats courante. Il ne permet jamais un exercice d'une autre agence. Dans l'assistant d'un nouveau programme, changer l'agence efface les budgets incompatibles. Si un choix échoue, rechargez les options avant de réessayer plutôt que de soumettre un ancien identifiant.

## Onglet Indicateurs De Rendement

Les indicateurs de rendement sont créés sous les résultats. Chaque indicateur contient :

- Résultat.
- Nom anglais et nom français.
- Description anglaise et description française.

Le formulaire de création présélectionne un résultat disponible lorsque possible. S’il n’y a aucun résultat, créez au moins un résultat avant d’ajouter des indicateurs.

Pour le résultat « Meilleur accès aux installations communautaires », un indicateur pourrait être « Nombre d'installations améliorées ». Précisez dans la description ce qui compte comme installation améliorée. Vous créez ainsi la définition de l'indicateur, sans saisir un résultat mesuré.

## Statut Et Cycle De Vie

La disponibilité du programme utilise l’indicateur booléen **Actif**, désactivé initialement. Il est distinct des états métier de l’organisme utilisés par les ententes. Activer le programme n’active pas automatiquement ses volets et ne publie pas leur configuration; terminez chaque dépendance explicitement.

## Permissions Et Portee

Les actions lire, créer, modifier et supprimer sont autorisées par le sujet de rôle `transfer_payment`. La portée est dérivée de la structure du rôle et est globale, propre à une agence ou limitée aux programmes liés au rôle :

- La création vérifie l’agence sélectionnée et exige donc un accès global ou d’agence `transfer_payment:create` applicable.
- La visibilité de la liste est résolue par un accès global, un accès d’agence et les programmes liés aux rôles à portée de programme.
- Le détail et les actions sur les enfants évaluent l’action CRUD demandée par rapport à l’agence et au programme propriétaires.
- Les pages de volet et de configuration enfant demeurent dans la portée dérivée du rôle qui couvre le programme propriétaire.
- Les affectations exactes d’entité ne sont jamais évaluées pour les agences, les programmes ou les volets.

Si un utilisateur peut lire un programme sans pouvoir le modifier, la page de détail reste accessible, mais les actions de modification et d’ajout sont masquées ou désactivées.

## Suppression, Échec Et Reprise

La suppression retire le programme de l'utilisation courante sans effacer physiquement ses volets ni ses anciennes configurations. Les pages qui exigent un profil non supprimé ne montrent plus ces dossiers. Utilisez la suppression pour corriger une erreur de configuration; examinez l'historique du programme avant de le supprimer.

Le système vérifie la permission actuelle de suppression et verrouillé le programme et ses volets actifs pendant la vérification des dépendances. Les extensions enregistrées peuvent bloquer la suppression pour protéger le travail associé à un volet. Si les volets changent à répétition pendant ces vérifications, une erreur localisée de changement de portée arrête la suppression. Rechargez et examinez les volets actuels avant de réessayer.

Chaque enregistrement, soumission d'assistant et modification de dossier enfant vérifie ensemble les permissions et l'agence et le programme propriétaires, dans une transaction. Vous ne pouvez pas changer l'agence d'un programme existant. Un dossier absent et un dossier inaccessible peuvent produire des erreurs semblables : vérifiez l'identifiant et votre portée de permission globale, d'agence ou de programme lié.

En cas d'erreur de validation, corrigez le champ indiqué. Les causes courantes sont les valeurs bilingues en double, les dates ou URL invalides, un exercice d'une autre agence ou des valeurs financières non sûres. Après une modification par un autre administrateur, rechargez avant de soumettre de nouveau. Une erreur d'API ordinaire laisse les valeurs saisies dans la fenêtre disponibles.

## Ordre De Configuration Operationnelle

Un ordre pratique dans une installation vide est :

1. Créer ou vérifier l’agence et ses données de référence.
2. Créer le profil de programme, idéalement avec l’assistant si les résultats, objectifs, budgets et indicateurs sont déjà connus.
3. Ajouter les budgets du programme pour chaque exercice financier utilisé par les volets.
4. Créer un ou plusieurs volets.
5. Configurer les budgets de volet, destinataires, lignes de coûts, sous-types d’entente, engagements, risques, examens, recommandations, approbations, modèles de documents et extensions.
6. Publier les schémas d’évaluation et modèles d’approbation utilisés par les flux d’exécution.
7. Créer des ententes de production seulement lorsque le volet cible est assez complet pour le flux d’entente utilisé.
