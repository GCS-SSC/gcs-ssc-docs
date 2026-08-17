# Schémas Et Configurations De Recommandation

La configuration des recommandations comporte deux couches. Un schéma définit les questions bilingues et l'option qui produit le résultat canonique `recommended` ou `not_recommended`. Une configuration de recommandation de volet ordonne un ou plusieurs schémas publiés et peut entourer les résultats des membres ou le résultat final de routes d'approbation.

## Navigation Et Accès

Ouvrez un volet et sélectionnez Configurations de recommandation. Le tableau groupé liste les configurations par type d'entité d'exécution et montre leurs membres ordonnés. Ouvrez une configuration pour modifier son identité et ses membres; ouvrez le schéma d'un membre pour utiliser l'éditeur de schéma.

La consultation exige `transfer_payment:read` pour le programme précis. Créer, modifier, supprimer, activer ou publier exige l'action `transfer_payment` précise correspondante. Les routes serveur dérivent la chaîne active agence-programme-volet et masquent une ressource inaccessible comme une ressource absente. Les équipes n'accordent aucun accès à la configuration du volet.

## Schéma De Recommandation

Un schéma appartient à une agence et possède un type d'entité, un nom bilingue, un statut, une version, des métadonnées de résultat et une définition de recommandation. Sa création depuis un volet doit utiliser l'agence du volet.

L'éditeur contient Général et Sections du formulaire. Une définition valide exige au moins une section; chaque section exige un libellé bilingue et au moins une sous-section; chaque sous-section exige un libellé bilingue et au moins une question. Les clés de section, sous-section, question, option et aide sont des identités d'exécution indépendantes de la langue et doivent être uniques là où elles sont validées.

Les questions prennent en charge :

| Type | Champs et règles |
| --- | --- |
| `radio` | Question bilingue obligatoire, au moins deux options bilingues aux clés uniques, descriptions bilingues facultatives des options et association facultative à un résultat |
| `text` | Question bilingue obligatoire, description bilingue facultative et longueur maximale de 1 à 10 000 |

Chaque type peut être obligatoire et contenir de l'aide bilingue. Une seule question doit être désignée comme question de résultat décisive. Elle doit être une question radio obligatoire, et chacune de ses options doit être associée à `recommended` ou `not_recommended`. Choisir une autre question décisive efface les associations de résultat de l'ancienne.

## Publication Du Schéma

L'enregistrement valide et met à jour le schéma de travail. Publier verrouille le schéma de la même agence dans une transaction de volet avec autorisation actualisée, crée une version immuable depuis la définition et les métadonnées de résultat courantes, rend le schéma actif et incrémente sa version numérique de `0.01`, arrondie à deux décimales. Les recommandations d'exécution référencent une version précise du schéma; une publication ultérieure ne réécrit donc pas le travail existant.

## Configuration De Recommandation

Une configuration conserve le type d'entité d'exécution, le nom et la description bilingues, un modèle d'approbation final facultatif, l'indicateur actif, le statut/version/état de publication en attente et des membres ordonnés. Chaque membre choisit un schéma de recommandation de la même agence, un ordre entier et un modèle d'approbation facultatif propre au membre.

Dans une configuration, les schémas choisis et les ordres doivent être uniques. Un plan publiable exige au moins un membre, des ordres contigus commençant à 1, une version publiée de chaque schéma membre et une configuration publiée de chaque modèle d'approbation référencé. La configuration et ses membres doivent correspondre au contexte d'agence et d'entité du volet.

Une nouvelle configuration commence comme ébauche. Activer publie le premier instantané immuable et rend la configuration active. Modifier une configuration active crée du contenu en attente; Publier remplace le plan publié seulement après validation de toutes les dépendances et avance la version. Le travail de recommandation généré demeure épinglé au plan, aux versions de schéma des membres et aux configurations d'approbation utilisés lors de sa création.

## Conséquences À L'Exécution

Les formulaires d'exécution valident les réponses obligatoires, les clés d'option radio et les longueurs de texte selon leur définition épinglée. Le serveur dérive le résultat faisant autorité depuis l'option choisie sur l'unique question décisive. L'ordre de la configuration détermine la progression; une approbation de membre peut bloquer un résultat individuel et l'approbation finale facultative peut bloquer le plan combiné.

Une configuration de flux de travail peut utiliser une configuration de recommandation publiée comme point d'entrée de recommandation. Enregistrer ou soumettre une recommandation d'exécution n'accorde pas à lui seul l'accès à l'entité propriétaire; l'accès précis normal à l'entité ou par équipe et les règles d'assignation du flux continuent de s'appliquer.

## Suppression, Échec Et Reprise

- La suppression d'une configuration ou d'un membre est logique. La filiation historique d'exécution demeure intacte.
- La publication échoue si les membres sont absents ou non contigus, si un schéma n'est pas publié, si une référence d'agence ou d'entité est invalide ou si un modèle d'approbation n'est pas publié.
- La validation du schéma échoue pour des clés en double, une structure de question invalide ou toute situation autre qu'une seule question décisive valide.
- Une ressource absente ou inaccessible produit le contrat masqué. Vérifiez l'identifiant et la portée précise plutôt que de sonder une autre agence.
- Toutes les mutations revérifient la propriété et l'autorisation courantes dans une transaction. Rechargez après un changement simultané, réparez la dépendance indiquée, enregistrez et réessayez la publication.

Voir [Volets](./streams.md), [Modèles d'approbation](./approval-templates.md) et [Approbations et achèvements](../concepts/approvals-completions.md).
