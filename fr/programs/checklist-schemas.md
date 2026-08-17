# Schémas De Listes De Vérification

Les schémas de listes de vérification définissent des questions bilingues réussite-échec et des règles de résultat déterministes pour les examens d'exécution. Ces schémas d'examen appartiennent à une agence, s'ouvrent depuis un membre d'une configuration d'examen de volet et doivent correspondre au type d'entité d'exécution de la configuration.

## Préalables Et Navigation

Créez d'abord l'agence, le programme, le volet et la configuration d'examen. Dans l'éditeur détaillé de la configuration, associez un schéma existant de la même agence ou créez un membre de type liste de vérification. Sélectionner le membre ouvre l'éditeur; son fil d'Ariane retourne à l'onglet Configurations d'examen du volet.

L'utilisateur doit posséder `transfer_payment:read` pour le programme précis afin de consulter le schéma et `transfer_payment:update` afin de l'enregistrer, l'activer ou le publier. Les contrôles client reflètent ces permissions, mais chaque requête serveur résout indépendamment la chaîne active agence-programme-volet-schéma.

## Sections De L'Éditeur

L'éditeur comporte trois sections avec ancres :

1. Général : nom bilingue du schéma, nom bilingue du résultat d'exécution et option de désactivation des examinateurs additionnels.
2. Sections : sections, sous-sections et questions ordonnées.
3. Règles de résultat : politique d'échec par défaut et groupes conditionnels imbriqués.

Le sommaire affiche le type d'entité, le statut ébauche-actif-inactif, la version et la présence de changements non publiés. Enregistrer valide toute la définition. L'action de publication enregistre d'abord, puis active une ébauche ou publie les changements en attente d'un schéma actif.

## Sections Et Questions

Chaque section possède une clé indépendante de la langue unique et un libellé français-anglais. Elle doit contenir au moins une question directe ou une sous-section. Chaque sous-section possède aussi une clé unique, un libellé bilingue et au moins une question.

Chaque question contient :

| Champ | Règle |
| --- | --- |
| Clé indépendante de la langue | Obligatoire et unique dans tout le schéma |
| Question française-anglaise | Les deux langues sont obligatoires |
| Obligatoire | Détermine si la complétion exige une réponse |
| Politique de commentaire | `optional`, `required` ou `required_on_fail` |
| Options réussite-échec | Les deux options sont toujours présentes et chacune exige une description bilingue |
| Aide | Zéro ou plusieurs éléments d'aide bilingues |

Les clés sont les identités d'exécution utilisées par les réponses enregistrées et les règles de résultat. Traitez leur modification comme un changement structurel et mettez à jour toutes les règles qui les ciblent avant l'enregistrement.

## Politique De Résultat

Lorsque `anyFailureFails` est activé, toute réponse en échec produit un résultat de base en échec. Des groupes imbriqués additionnels peuvent plutôt, ou aussi, associer les conditions d'échec configurées à `pass`, `pass_with_considerations` ou `fail`.

Un groupe possède une clé unique, un libellé bilingue, un résultat, une ou plusieurs conditions et un mode :

| Mode | Signification |
| --- | --- |
| `any` | Au moins une condition enfant correspond |
| `all` | Toutes les conditions enfants correspondent |
| `at_least_count` | Au moins le nombre entier configuré correspond; le seuil va de 1 au nombre d'éléments |
| `at_least_rate` | Au moins le pourcentage configuré correspond; le seuil est supérieur à 0 et au plus 100 |

Une condition peut cibler une question en échec ou contenir un autre groupe. Les clés de groupe sont uniques, une question ne peut être répétée directement dans un même groupe, chaque question référencée doit exister et les groupes peuvent compter au plus trois niveaux (une racine et deux niveaux imbriqués).

## Activation, Publication Et Instantanés

Une ébauche utilise la version 0. L'activation d'une ébauche valide copie la définition effective dans le champ publié, efface la copie de travail, rend le schéma actif, inscrit la version 1 et crée un enregistrement de version immuable. Modifier un schéma actif écrit une copie de travail sans changer son contenu d'exécution publié. La publication d'un contenu valide en attente incrémente la version et crée une nouvelle version immuable.

Les examens d'exécution sont matérialisés depuis des instantanés publiés de la configuration et du schéma. Les examens existants continuent d'utiliser leur définition de liste de vérification épinglée et leur filiation après la publication d'une version plus récente.

## Comportement De La Liste À L'Exécution

Les examinateurs répondent réussite ou échec, ajoutent les commentaires exigés par la politique de chaque question et peuvent consulter comment les groupes configurés ont produit le résultat courant. L'enregistrement valide des clés de question connues et uniques. La complétion exige en plus chaque question obligatoire et chaque commentaire obligatoire. Le résultat est dérivé côté serveur depuis la définition épinglée; le client ne soumet pas de résultat faisant autorité.

Le bouton d'aide des règles de résultat ouvre un panneau latéral qui explique la politique actuellement en vigueur. Il indique si toute réponse en échec fait échouer la liste; lorsque ce raccourci est désactivé, il présente récursivement chaque groupe configuré, avec son libellé localisé, son mode et son seuil de correspondance, l'état produit, ses groupes imbriqués et le nom localisé des questions ciblées. Une référence à une question manquante est affichée au moyen de sa clé enregistrée, ce qui signale qu'il faut corriger puis republier le schéma. Le panneau explique aussi le contrôle par les groupes parents, la gravité des résultats et le fait que les commentaires ne déterminent pas le résultat.

L'accès à l'examen, les règles d'examinateur assigné, la complétion, les approbations, l'annulation et la reprise relèvent du flux d'examen d'exécution. La désactivation des examinateurs additionnels dans le schéma retire cette capacité du travail qu'il génère.

## Échec Et Reprise

- Les clés absentes ou en double, les sections ou sous-sections vides, les options de réponse manquantes, les cibles de règle inconnues, les seuils invalides ou une imbrication excessive produisent des erreurs de validation localisées.
- L'activation échoue si le schéma n'est pas une ébauche valide. La publication échoue s'il n'est pas actif ou n'a aucun contenu valide en attente.
- Un schéma absent ou inaccessible est masqué de façon uniforme; vérifiez l'identifiant et la portée précise du programme.
- L'enregistrement et la publication revérifient l'autorisation et la propriété actualisées dans une transaction. Rechargez après un changement simultané, corrigez la définition, enregistrez et réessayez.
- Ne retirez ni ne renommez les questions d'un schéma publié sans tenir compte des réponses historiques épinglées et du comportement futur des règles.

Voir [Volets](./streams.md) pour la génération par configuration d'examen et [Schémas d'évaluation](./assessment-schemas.md) pour l'éditeur de type évaluation.
