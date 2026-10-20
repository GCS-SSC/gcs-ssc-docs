# Contrats de l'aide guidée

L'hôte gère la publication, la diffusion par agence, l'autorisation, les commandes prises en charge et le contexte du processus. `@gcs-ssc/guided-help` gère la validation des documents, le rendu sûr des instructions, la navigation et le lecteur dans le navigateur. Consultez [Publier de l'aide guidée](../admin/guided-help.md) pour les procédures de rédaction et de publication.

## Documents et commandes prises en charge

`GuideDraftSchema` accepte les ébauches bilingues incomplètes. `GuideDocumentSchema` exige des titres, descriptions, titres d'étape et instructions non vides en anglais et en français, ainsi qu'au moins une étape. Les documents utilisent `formatVersion: 1`, contiennent au plus 100 étapes et occupent au plus 256 000 caractères dans leur représentation JSON. Chaque étape possède un identifiant unique, une vue, une cible, un type et du contenu bilingue. Les paramètres de présentation, de progression et de parcours sont facultatifs.

`shared/guided-help/catalog.ts` déclare les vues, cibles, types, choix structurés et règles d'achèvement pris en charge. `discoverable: false` empêche de choisir une vue comme écran de départ. Elle peut néanmoins faire partie d'un guide. Le catalogue définit la compatibilité. Il n'accorde aucun accès.

`checkGuideCompatibility` vérifie les identités des vues et cibles, les types et les conditions de branche typées. L'hôte ajoute les vérifications des parcours enregistrés avec `checkHostGuideCompatibility`. L'hôte vérifie le document lors de l'aperçu, de la publication source, de la publication d'agence et du lancement. La découverte exclut les versions incompatibles.

Les instructions utilisent le moteur Markdown limité du paquet. Il échappe le contenu rédigé et accepte la mise en évidence, le code en ligne, les liens sûrs et les sauts de ligne. Les schémas refusent le contenu exécutable et les expressions de modèle. Les guides ne peuvent fournir de sélecteurs, scripts ou adaptateurs de processus arbitraires.

## Publication et paramètres d'agence

`Common_Guided_Help` conserve le document de travail et son propriétaire. `Common_Publication`, `Common_Publication_Version` et les enregistrements de cycle de vie conservent l'état et les versions immuables. La publication source exige `guided_help:update` pour le propriétaire global ou d'agence résolu. Le retrait exige la permission de suppression. Une référence d'agence empêche aussi la suppression d'une ébauche.

`Agency_Guided_Help` relie une agence à un guide source et à une version immuable choisie. Ses paramètres ont leur propre publication, qui conserve la version source, les écrans de découverte et les rôles du public. La découverte lit les paramètres publiés plutôt que les colonnes de l'ébauche courante. `egcs_ay_enabled` arrête les nouvelles découvertes après dépublication.

L'adoption exige une source appartenant à l'agence ou une source partagée actuellement publiée. Les entrées d'agence existantes conservent les versions référencées par leurs paramètres courants ou leur historique lorsque la source n'est plus partagée ou est retirée. L'agence destinataire peut consulter ces versions sans lire l'ébauche de travail d'un autre propriétaire. La copie crée un guide privé d'agence et enregistre la version source.

Chaque écriture de gestion revérifie l'autorisation courante dans une transaction. La transaction verrouille le propriétaire et les rôles concernés, puis enregistre l'acteur. Les portées prises en charge sont globale et agence. La portée de programme et `manage_assignments` ne sont pas disponibles pour `guided_help`.

## Autorisation de découverte et de lancement

La découverte d'agence exige l'accès à l'écran métier réel et un rôle structurel actif dans le public publié. Le serveur vérifie le propriétaire de l'examen, celui de l'entente et la permission de lecture courante selon le cas. La liste des ententes vérifie les agences visibles et identifie l'agence de chaque entrée correspondante. Le lancement répète les vérifications et retourne le document source immuable choisi ainsi que les identités de publication.

Une vue enregistrée n'autorise jamais à elle seule un écran. `authorizeScreen` contient la correspondance explicite approuvée. Une nouvelle vue exige une déclaration au catalogue et une correspondance d'autorisation côté serveur avant de devenir un écran de découverte.

## Progression et branches

`advanceOn` vaut `completion` par défaut. `manual` conserve la navigation explicite Suivant pour les instructions, tandis que les actions obligatoires dépendent toujours de leur contrat d'achèvement. `appearance` vaut `spotlight` par défaut. `anchor-only` conserve l'accès normal à la page près de la fenêtre d'aide.

L'achèvement utilise les signaux d'action fiables de l'hôte et les faits de navigation chargés. Un clic seul ne prouve pas un enregistrement réussi. Les signaux appartiennent à la cible, à la visite et à la tentative exactes. Annuler une fenêtre invalide la preuve de son ouverture. Un chargement ou une fenêtre d'aide sans rapport suspend la présentation sans perdre l'ébauche métier ni les preuves d'action acceptées.

Les parcours standards comparent dans l'ordre les valeurs booléennes des cases ou les valeurs des sélecteurs déclarés. Si aucune condition ne correspond, ils utilisent la destination par défaut. Les destinations sont des identifiants d'étapes ultérieures ou `null` pour terminer. Les conditions répétées, routes vers l'arrière, conditions manquantes et commandes de condition masquées ne peuvent choisir silencieusement une branche valide. Précédent suit le parcours réellement visité.

`createGuideSession` utilise le `sessionStorage` de l'onglet pour conserver le document figé, l'utilisateur, l'agence, la publication, la version source et l'étape courante. Il conserve aussi le parcours ou le curseur du processus. Il ne conserve pas les valeurs des champs de branche. La restauration refuse les sessions d'un autre utilisateur, le contenu mal formé et les parcours invalides. Si le stockage échoue, la session reste en mémoire. Quitter, se déconnecter ou changer d'utilisateur efface la session. Restaurer les instructions ne donne aucune permission métier.

## Parcours de processus et contexte

`shared/guided-help/journeys.ts` enregistre le parcours d'évaluation du risque d'une entente. Les étapes ordonnées choisissent une entente, démarrent son processus de risque, guident ses tâches et montrent le résultat. Les modèles de tâche Évaluation et Liste de contrôle limitent les écrans pris en charge. Chaque instruction appartient à une seule étape ou à un seul modèle. Chaque étape exige des instructions générales. Un guide ne peut combiner des branches standards avec un parcours de processus.

L'hôte lie le parcours à une entente vérifiée de l'agence de lancement et lit son exécution de processus autorisée. Les tâches métier fournissent leurs identités d'exécution et de tâche courantes. Le chargement, un autre dossier ou une tâche voisine produit des instructions d'attente ou de récupération sans changer le travail choisi. Une nouvelle exécution remet la progression des tâches à zéro. Terminer le guide ne termine jamais la tâche métier.

## Diagrammes partagés

`@gcs-ssc/diagrams` gère `FlowDiagramDefinition`, la disposition, les connexions mesurées, la sélection, le clavier et l'exportation. `CommonFlowDiagram` fournit les traductions de l'hôte. L'éditeur de guide utilise `layout="branches"`. Les routes alternatives occupent des colonnes et les étapes communes suivantes apparaissent une seule fois. Les processus ordonnés gardent la disposition ordonnée par défaut.

Seuls les nœuds avec `selectLabel` émettent une sélection. L'édition facultative émet `add-node` et `add-branch`. Les appelants modifient les documents. `branchNodeIds` limite les commandes de branche. Les commandes offrent un zoom de 25 % à 200 % et un espace en pleine fenêtre. Échap ferme une fenêtre enfant avant de quitter cet espace, puis rétablit le focus.

L'exportation capture le diagramme complet à 100 %, indépendamment de la zone visible, du défilement ou du zoom. Le SVG conserve le texte recherchable et les couleurs du thème résolues. Le PNG utilise ce SVG avec des dimensions quadruplées et un fond opaque. Les commandes d'édition et le décor sont exclus. Le diagramme public des extensions reste en lecture seule avec son contrat SDK existant.

## Références du code et des régressions

L'implémentation hôte se trouve dans `server/utils/guided-help.ts`, `app/components/GuidedHelp/` et `app/plugins/guided-help-actions.ts`. Les tests de régression du paquet comprennent `contracts.test.ts`, `flow.test.ts`, `native-runtime.test.ts`, `session.test.ts`, `journey-reader.test.ts` et `journey-session.test.ts`. Ils distinguent les actions réussies des clics, valident les parcours et la restauration liée à l'utilisateur, et conservent le contexte exact des tâches pendant le chargement et la récupération.
