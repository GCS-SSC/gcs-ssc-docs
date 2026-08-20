# Examens du promoteur

L’onglet **Examens** regroupe les évaluations et listes de contrôle d’exécution créées pour un promoteur. Il sert de point de départ des ensembles d’examens; les réponses, le calcul des résultats, l’achèvement, les approbations et les reprises suivent le processus d’examen commun.

## Accès et comportement de la page

L’accès Lecteur au promoteur énumère ses ensembles d’examens actifs et leurs enfants. La création d’un ensemble exige le plafond Contributeur et l’affectation exacte au promoteur; le créateur devient principal des examens d’exécution affectés indépendamment. L’annulation ou le clonage du travail suivant exige l’affectation exacte pertinente et Contributeur. L’affectation à une approbation est une exigence décisionnelle supplémentaire qui n’accorde jamais l’accès au promoteur.

Le tableau regroupe les examens par ensemble et développe initialement chaque groupe. Un groupe présente le nom épinglé de la configuration, l’agence, le nombre d’examens, l’état de l’ensemble, le résultat de réussite lorsqu’il est connu et les indicateurs **À l’achèvement** ou **Séquentiel** saisis lors de la création. Chaque enfant présente son nom bilingue épinglé, son type et son état. La recherche de ce point d’accès porte sur l’identifiant de l’ensemble et son nom épinglé anglais ou français.

Ouvrez une évaluation ou une liste de contrôle à partir de son nom ou de la flèche. La destination applique de nouveau l’accès au promoteur propriétaire.

## Recherche des configurations admissibles

Sélectionnez **Ajouter** pour rechercher les configurations d’ensemble actives, publiées et admissibles, plutôt que toutes les configurations existantes. Une configuration est admissible seulement lorsque :

- son type d’entité cible est `applicantrecipient`;
- sa portée vise exactement ce promoteur, ou vise un volet de paiements de transfert atteint par l’un des liens d’entente actifs de ce promoteur;
- l’agence du programme lié correspond à l’agence responsable du promoteur dans le cas d’une portée de volet;
- chaque schéma membre actif est actif et appartient à l’agence responsable du promoteur.

La description du résultat indique l’agence propriétaire et, pour une portée de volet, le volet. Si la liste est vide, vérifiez la publication et l’activation, le type d’entité, la portée exacte, le lien d’entente actif, l’agence responsable et chacun des schémas membres. Aucun chemin d’admissibilité fondé sur une demande n’est mis en œuvre.

## Créer et exécuter un ensemble

La sélection d’une configuration crée transactionnellement l’ensemble et ses évaluations ou listes de contrôle à partir de la configuration publiée. Le serveur verrouille le promoteur et le graphe de propriété applicable, reconstruit l’autorisation et revalide la portée et l’agence propriétaire avant la matérialisation. Un deuxième ensemble de la même configuration est refusé tant qu’un ensemble antérieur demeure dans un état bloquant en cours.

Un ensemble séquentiel progresse selon l’ordre configuré des membres. Un ensemble « à l’achèvement » interagit avec le processus d’achèvement ou de flux de travail propriétaire défini par sa configuration. Les lignes d’exécution conservent les versions et la configuration épinglées; les changements administratifs ultérieurs touchent les futurs ensembles plutôt que de réécrire les travaux existants.

Pour les réponses, le calcul des résultats, les examinateurs supplémentaires, l’achèvement strict, le transfert vers l’approbation et les états verrouillés, consultez [Examens d’exécution](../concepts/runtime-reviews.md). Pour les décisions d’approbation, consultez [Approbations et achèvements](../concepts/approvals-completions.md).

## Annuler et reprendre

Une personne autorisée à modifier peut annuler un ensemble sauf si son état est `complete`, `approved`, `denied`, `withdrawn` ou `cancelled`. L’annulation est un résultat historique terminal, et non une suppression.

Dans un ensemble non terminal, un examen enfant refusé ou annulé peut être cloné pour reprise. Le clone commence comme nouveau brouillon dans le même ensemble et conserve la version de schéma, la configuration d’approbation, le mode liste de contrôle ou évaluation et les indicateurs de comportement épinglés de l’examen source. L’original demeure dans l’historique. La commande de reprise est masquée dès que l’ensemble devient terminal.

Si une action échoue parce que la cible ou l’autorisation a changé simultanément, actualisez l’onglet et réévaluez l’état courant. Ne créez pas un ensemble distinct uniquement pour contourner une transition bloquée ou terminale.

## Guides connexes

- [Examens d’exécution](../concepts/runtime-reviews.md)
- [Schémas d’évaluation et configuration des examens](../programs/assessment-schemas.md)
- [Profils des promoteurs](./index.md)
