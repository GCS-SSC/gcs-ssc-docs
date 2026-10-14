# Examens du promoteur

Utilisez l’onglet **Examens** pour lancer et suivre les évaluations et les listes de contrôle d’un promoteur. Un ensemble d’examens regroupe des examens à traiter ensemble. Par exemple, il peut contenir une liste de contrôle d’admissibilité suivie d’une évaluation des risques. Ouvrez chaque examen pour saisir les réponses, vérifier le résultat et achever le travail requis.

## Accès et comportement de la page

Avec l’accès Lecteur au promoteur, vous pouvez voir les ensembles d’examens actifs et les examens qu’ils contiennent. Pour créer un ensemble, votre rôle doit permettre les actions de Contributeur et vous devez être affecté à ce promoteur précis. Vous devenez la personne principale affectée aux nouveaux examens, qui ont leurs propres affectations. L’annulation ou le clonage exige aussi l’autorité de Contributeur et l’affectation au dossier modifié. Une affectation à une approbation permet de prendre la décision seulement si vous avez aussi l’accès requis au promoteur.

Le tableau regroupe les examens par ensemble et affiche au départ les examens de chaque groupe. Un nom ou une configuration épinglés sont la copie conservée lors de la création de l’ensemble. Un groupe présente le nom épinglé de la configuration, l’agence, le nombre d’examens, l’état de l’ensemble, le résultat de réussite lorsqu’il est connu et les indicateurs **À l’achèvement** ou **Séquentiel** saisis lors de la création. Chaque enfant présente son nom bilingue épinglé, son type et son état. La recherche de ce point d’accès porte sur l’identifiant de l’ensemble et son nom épinglé anglais ou français.

Ouvrez une évaluation ou une liste de contrôle à partir de son nom ou de la flèche. La destination applique de nouveau l’accès au promoteur propriétaire.

## Recherche des configurations admissibles

Sélectionnez **Ajouter** pour rechercher les configurations d’ensemble actives, publiées et admissibles, plutôt que toutes les configurations existantes. Une configuration est admissible seulement lorsque :

- son type d’entité cible est `applicantrecipient`;
- sa portée vise exactement ce promoteur, ou vise un volet de paiements de transfert atteint par l’un des liens d’entente actifs de ce promoteur;
- l’agence du programme lié correspond à l’agence responsable du promoteur dans le cas d’une portée de volet;
- chaque schéma membre actif est actif et appartient à l’agence responsable du promoteur.

La description du résultat indique l’agence propriétaire et, pour une portée de volet, le volet. Si la liste est vide, vérifiez la publication et l’activation, le type d’entité, la portée exacte, le lien d’entente actif, l’agence responsable et chacun des schémas membres. Aucun chemin d’admissibilité fondé sur une demande n’est mis en œuvre.

## Créer et exécuter un ensemble

Sélectionnez la configuration admissible pour créer l’ensemble et toutes ses évaluations ou listes de contrôle. Ils sont enregistrés ensemble à partir de la configuration publiée : si une vérification échoue, le système ne crée pas une partie de l’ensemble. Avant l’enregistrement, il verrouille les dossiers liés et revérifie vos permissions, la portée de la configuration et l’agence propriétaire. Vous ne pouvez pas créer un deuxième ensemble de la même configuration si un ensemble antérieur est encore dans un état en cours qui bloque la création. Ouvrez l’ensemble existant pour voir le travail restant.

Un ensemble séquentiel progresse selon l’ordre configuré des membres. Le promoteur n’a pas d’action générale Achever qui crée ses examens : créez explicitement ses ensembles d’examens directs. Les lignes d’exécution conservent les versions et la configuration épinglées; les changements administratifs ultérieurs touchent les futurs ensembles plutôt que de réécrire les travaux existants.

Pour les réponses, le calcul des résultats, les examinateurs supplémentaires, l’achèvement strict, le transfert vers l’approbation et les états verrouillés, consultez [Examens d’exécution](../concepts/runtime-reviews.md). Pour les décisions d’approbation, consultez [Approbations et achèvements](../concepts/approvals-completions.md).

## Annuler et reprendre

Une personne autorisée peut annuler un ensemble non terminal. Les états terminaux sont `succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled` et `failed`. L’annulation préserve l’historique.

Pour un ensemble autonome terminal, reprendre un examen refusé, annulé, échoué ou sans succès crée une exécution suivante et un nouvel ensemble depuis le plan figé. Les nouveaux examens ont de nouveaux conteneurs de réponses; l’ensemble et les décisions d’origine restent immuables. Aucun brouillon n’est ajouté à l’ancien ensemble et ses lignes terminales ne sont pas rouvertes. Les permissions, l’affectation et l’état actif du promoteur restent applicables. Voir [Examens en cours d’exécution](../concepts/runtime-reviews.md) pour la filiation et les reprises concurrentes.

Si une action échoue parce que la cible ou l’autorisation a changé simultanément, actualisez l’onglet et réévaluez l’état courant. Ne créez pas un ensemble distinct uniquement pour contourner une transition bloquée ou terminale.

Par exemple, après l’annulation d’un examen d’admissibilité, utilisez l’action de reprise prévue si vous avez la permission. Saisissez les réponses dans le nouvel examen et conservez l’ancien comme trace de la tentative annulée.

## Guides connexes

- [Examens d’exécution](../concepts/runtime-reviews.md)
- [Schémas d’évaluation et configuration des examens](../programs/assessment-schemas.md)
- [Profils des promoteurs](./index.md)
