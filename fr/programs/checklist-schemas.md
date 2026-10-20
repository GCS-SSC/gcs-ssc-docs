# Schémas de listes de vérification

Un schéma de liste de vérification est un formulaire d’examen réutilisable contenant des questions bilingues de réussite ou d’échec et des règles pour le résultat global. Il permet aux agents de vérifier les exigences de manière uniforme. Il appartient à l’agence; les administrateurs l’ouvrent depuis un membre d’ensemble d’examens d’agence. Il doit correspondre au genre de dossier que la configuration d’examen évaluera, appelé type d’entité.

Par exemple, une liste d’admissibilité peut demander si le demandeur est admissible et si les documents requis sont présents. L’agent indique Réussite ou Échec pour chaque question et ajoute les explications obligatoires. Les règles configurées déterminent le résultat global; cet exemple n’est pas une liste intégrée.

## Préalables et navigation

Créez d’abord l’ensemble d’examens de l’agence. Dans son éditeur, associez un schéma de liste de vérification de la même agence ou créez un membre. Sélectionnez-le pour ouvrir l’éditeur; le fil d’Ariane retourne aux ensembles d’examens de l’agence. Liez l’ensemble publié à un volet admissible pour créer les examens du volet.

L’utilisateur doit pouvoir lire l’agence pour consulter le schéma et modifier l’agence pour l’enregistrer, le publier ou le retirer. Les noms français et anglais du schéma et du résultat sont obligatoires et limités à 255 caractères Unicode. Chaque nom de schéma doit être unique dans l’agence pour le même type de dossier dans cette langue, y compris parmi les schémas d’évaluation. Si un nom existe déjà, changez-le ou associez le schéma existant.

## Sections de l'éditeur

Utilisez les liens de section de l’éditeur pour accéder aux éléments suivants :

1. Général : nom bilingue du schéma, nom bilingue du résultat affiché pendant l’examen et option de désactivation des examinateurs additionnels.
2. Sections : sections, sous-sections et questions ordonnées.
3. Règles de résultat : politique d'échec par défaut et groupes conditionnels imbriqués.

Le sommaire affiche le genre de dossier examiné, l’état de publication, la version et la présence de changements non publiés. L’état de publication est Brouillon, Publié ou Retiré. Enregistrer valide toute la définition. L'action de publication enregistre d'abord, puis publie le premier brouillon ou les changements d’un schéma déjà publié.

## Sections et questions

Chaque section possède une clé unique, identique dans les deux langues, et un libellé français et anglais. Elle doit contenir au moins une question directe ou une sous-section. Chaque sous-section possède aussi une clé unique, un libellé bilingue et au moins une question.

Chaque question contient :

| Champ | Règle |
| --- | --- |
| Clé indépendante de la langue | Obligatoire et unique dans tout le schéma |
| Question en français et en anglais | Les deux langues sont obligatoires |
| Obligatoire | Détermine si une réponse est nécessaire pour terminer l’examen |
| Politique de commentaire | `optional`, `required`, `required_on_fail`, `required_on_not_applicable` ou `required_on_fail_or_not_applicable` |
| Options de réponse | Réussite et Échec sont toujours présents; Sans objet est facultatif. Chaque option exige une description bilingue. |
| Aide | Zéro ou plusieurs éléments d'aide bilingues |

Les clés sont des identifiants internes identiques dans les deux langues. Les réponses enregistrées et les règles les utilisent pour identifier les questions. Traitez leur modification comme un changement structurel et mettez à jour toutes les règles qui les ciblent avant l'enregistrement.

## Importer une définition JSON

L’action **Importer** accepte une définition JSON collée. L’éditeur valide la syntaxe et toutes les règles de la définition, puis remplace seulement le brouillon local. Vérifiez les questions bilingues, les réponses Sans objet et les règles avant **Enregistrer** et **Publier**. Une importation refusée conserve le brouillon; l’importation seule ne change ni les publications ni les examens en cours.

## Politique de résultat

Activez `anyFailureFails` lorsque toute réponse en échec doit faire échouer la liste. Utilisez des groupes de conditions pour attribuer `pass`, `pass_with_considerations` ou `fail` lorsque certaines questions reçoivent la réponse Échec. Les groupes peuvent contenir d’autres groupes. Vous pouvez les utiliser avec ou sans `anyFailureFails`.

Un groupe possède une clé unique, un libellé bilingue, un résultat, une ou plusieurs conditions et un mode :

| Mode | Signification |
| --- | --- |
| `any` | Au moins une condition du groupe est remplie |
| `all` | Toutes les conditions du groupe sont remplies |
| `at_least_count` | Au moins le nombre entier configuré de conditions sont remplies; le seuil va de 1 au nombre d'éléments |
| `at_least_rate` | Au moins le pourcentage configuré de conditions sont remplies; le seuil est supérieur à 0 et au plus 100 |

Une condition vérifie si une question a reçu la réponse Échec, ou vérifie un autre groupe de conditions. Par exemple, un groupe `all` ciblant « Le demandeur est admissible » et « Les documents requis sont présents » correspond seulement si les deux réponses sont Échec. Utilisez `any` si un seul échec doit suffire. Donnez une clé unique à chaque groupe et ciblez seulement des questions existantes. Ne répétez pas une question directement dans le même groupe. Les groupes peuvent compter au plus trois niveaux, un groupe racine et deux niveaux imbriqués.

## Publication et instantanés

Un brouillon n’a pas de version publiée. Publier une définition valide crée la version immuable `1`; chaque publication modifiée augmente le numéro de version entier de un. Enregistrer après publication modifie seulement le contenu de conception. Publier de nouveau le même contenu conserve la version actuelle. Retirer un schéma publié est permanent et empêche les nouvelles sélections, modifications et publications.

Les examens conservent les versions exactes du schéma et de la configuration qui les ont générés. Par exemple, publier une nouvelle question requise ne l’insère pas dans une liste déjà générée. Publiez la configuration d’examen qui utilise le schéma pour les futurs travaux. Les tentatives historiques gardent leurs réponses et règles.

## Comportement de la liste à l'exécution

Les examinateurs répondent Réussite ou Échec et ajoutent les commentaires exigés par la politique de chaque question. Ils peuvent aussi voir comment les groupes configurés ont produit le résultat. L’enregistrement vérifie que chaque réponse correspond à une question existante et qu’aucune question n’apparaît deux fois. Pour terminer l’examen, il faut aussi répondre à chaque question obligatoire et fournir chaque commentaire obligatoire. Le serveur calcule le résultat selon la version du schéma conservée par cet examen; l’agent ne choisit pas directement le résultat.

Ouvrez le panneau d’aide des règles de résultat pour comprendre le résultat courant. Il indique si toute réponse en échec fait échouer la liste. Lorsque cette règle est désactivée, le panneau présente chaque groupe configuré et ses groupes imbriqués. Pour chaque groupe, il affiche le libellé, le mode, le seuil, le résultat et les noms des questions ciblées dans la langue choisie. Une référence à une question manquante est affichée au moyen de sa clé enregistrée, ce qui signale qu'il faut corriger puis republier le schéma. Le panneau explique aussi quand un groupe parent permet l’application des résultats imbriqués, comment les résultats plus graves ont priorité et pourquoi les commentaires ne modifient pas le résultat.

L'accès à l'examen, les règles d’affectation des examinateurs, l’achèvement, les approbations, l'annulation et la reprise relèvent du flux utilisé pour réaliser l’examen. La désactivation des examinateurs additionnels dans le schéma retire cette capacité du travail qu'il génère.

## Échec et reprise

- Les clés absentes ou en double, les sections ou sous-sections vides, les options de réponse manquantes, les cibles de règle inconnues, les seuils invalides ou une imbrication excessive produisent des erreurs de validation localisées.
- La publication exige un contenu valide et une publication non retirée.
- Si vous ne pouvez pas accéder au schéma, l’application répond comme s’il n’existait pas. Vérifiez son identifiant et votre accès à l’agence.
- Si le schéma change pendant votre modification, conservez une copie des changements souhaités avant de recharger. Vérifiez la version récente, corrigez la définition, enregistrez et réessayez.
- Ne retirez ni ne renommez les questions d'un schéma publié sans tenir compte des réponses historiques conservées avec leur version du schéma et du comportement futur des règles.

Voir [Volets](./streams.md) pour la génération par configuration d'examen et [Schémas d'évaluation](./assessment-schemas.md) pour l'éditeur de type évaluation.
