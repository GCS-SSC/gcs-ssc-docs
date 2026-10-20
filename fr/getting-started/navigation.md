# Navigation

Utilisez la barre latérale pour ouvrir un espace de travail, comme Ententes ou Promoteurs. Dans un dossier, utilisez les onglets pour passer des renseignements au travail connexe. Le fil d'Ariane indique où vous êtes et permet de revenir aux pages précédentes. Vous pouvez réduire ou redimensionner la barre latérale, passer de l'anglais (`en-CA`) au français (`fr-CA`) et suivre l'indicateur de chargement pendant l'ouverture d'une page.

## Trouver un espace de travail

Accueil, Ententes, Promoteurs, Réceptions de dossiers de financement, Possibilités de financement et Programmes apparaissent au premier niveau lorsque vous y avez accès. Développez **Gestion** pour Agences, Rôles, Aide guidée et Pièces de journal. Développez **Administration** pour Gestion des affectations, Utilisateurs, Groupes, Audit et GWCOA. Les espaces d'extension apparaissent dans leur groupe configuré. Les groupes vides sont masqués. La recherche propose les mêmes pages autorisées.

## Destinations de la barre latérale

| Destination | Condition d'affichage |
| --- | --- |
| Accueil | Toujours après l'authentification. |
| Agences | Avec un accès Lecteur Agence actif ou supérieur. |
| Programmes | Avec un accès Lecteur Programme actif ou supérieur. |
| Possibilités de financement | Avec un accès Lecteur Programme actif ou supérieur. |
| Réceptions de dossiers de financement | Avec un accès Lecteur Dossier de financement actif ou supérieur. |
| Pièces de journal | Avec un accès Lecteur Pièce de journal actif ou supérieur. |
| Ententes | Avec un accès Lecteur Entente actif ou supérieur à une portée quelconque. |
| Promoteurs | Avec un accès Lecteur Promoteur actif ou supérieur à une portée prise en charge. |
| Gestion des affectations | Avec une permission active de gestion des affectations pour Ententes, Promoteurs, Dossiers de financement, Pièces de journal ou Corrections. |
| Groupes | Avec un accès Lecteur Groupe actif ou supérieur. |
| Rôles | Avec un accès Lecteur Rôle actif ou supérieur. |
| Utilisateurs | Avec un accès Lecteur Utilisateur actif ou supérieur. |
| Aide guidée | Avec un accès Lecteur Aide guidée actif ou supérieur, globalement ou pour une agence. |
| GWCOA | Avec un accès Lecteur Système global ou supérieur. |
| Audit | Avec un accès Lecteur Audit explicite ou supérieur, globalement ou pour une agence. |

Une **affectation à un dossier** nomme le personnel responsable de ce dossier précis. Un **rôle** fournit les permissions, et sa **portée** les limite au système entier, à une agence ou à un programme. Pour les actions exigeant du travail affecté, il faut les permissions et l'affectation appropriées. Être affecté à une entente ou à un promoteur ne fait pas apparaître une destination manquante. De même, voir une destination ne signifie pas que tous les dossiers y seront affichés ou vous seront affectés. Le serveur vérifie l'accès à chaque ouverture ou modification d'un dossier.

## Page d'accueil

Commencez à l'accueil pour voir le travail qui vous est affecté. **Mon travail ouvert** compte vos affectations ouvertes à des dossiers précis. Les listes distinguent le travail direct et partagé, les promoteurs et les ententes. Chaque section propose des liens et sa propre pagination. Les listes chargent d'autres affectations au besoin. Le total comprend le travail au-delà des cinq lignes visibles.

Si vous appartenez à un groupe administratif actif, **Disponible à réclamer** présente les examens, recommandations, collectes de données, demandes de réviseur supplémentaire et étapes d'approbation non réclamés de ses groupes. Réclamer un élément actualise la file du groupe et le travail affecté. L'appartenance au groupe ne donne pas à elle seule accès au dossier ni le droit de réclamer le travail : le serveur vérifie l'admissibilité actuelle. Si vous n'appartenez à aucun groupe, le deuxième sommaire indique plutôt le nombre de vos ententes affectées. Consultez [Groupes](../admin/groups.md).

Si une file ne charge pas, utilisez Réessayer. Un échec de réclamation laisse l'élément disponible; actualisez puis vérifiez l'appartenance, la portée du rôle et l'état du travail avant de réessayer. Les administrateurs peuvent utiliser `/api/health` pour vérifier si l'application fonctionne.

## Chercher des pages, des dossiers et votre travail

Sélectionnez le bouton de recherche pour consulter ensemble **Pages**, **Mon travail** et **Dossiers**. Les pages suivent les mêmes règles de visibilité que la navigation. Avant la saisie de texte, le panneau de recherche présente les pages et quelques travaux ouverts affectés; elle ne recherche pas tous les dossiers. Saisissez au plus 200 caractères pour chercher des identifiants stables, références et noms bilingues. Pour une recherche courte, les références et identifiants exacts apparaissent en premier. Saisissez un nom plus précis pour limiter les résultats. Les signes pourcentage, soulignements et barres obliques inverses sont littéraux.

Mon travail présente les tâches auxquelles vos permissions et affectations actuelles donnent accès. Cela comprend les examens, recommandations et collectes de données qui vous sont affectés séparément du dossier principal. La recherche masque le nom du dossier principal si vous ne pouvez pas le lire. Dossiers présente le travail que vous pouvez lire actuellement. Les travaux supprimés ou terminés sont exclus selon le cas. Le travail inachevé peut apparaître même si son statut permet la lecture, mais empêche les modifications. Un résultat ne fournit aucune nouvelle affectation ni permission d'action. Les collectes ouvrent leur questionnaire exact à l'accueil plutôt que dans une page distincte.

Utilisez les flèches et Entrée pour choisir, ou Échap pour fermer. Le panneau de recherche présente au plus cinq éléments personnels et douze dossiers. Précisez la recherche ou ouvrez la liste appropriée pour en trouver d'autres. Si l'application ne peut pas charger les résultats, Pages reste utilisable et **Réessayer** relance la recherche. Un résultat peut devenir indisponible après un changement de permissions ou de statut du dossier. Actualisez et demandez au coordonnateur des affectations de vérifier votre affectation au dossier et la portée de votre rôle.

Par exemple, pour trouver l'entente AG-2026-014 :

1. Sélectionnez le bouton de recherche et saisissez `AG-2026-014`.
2. Choisissez le résultat avec les flèches et Entrée, ou sélectionnez-le directement.
3. Ouvrez l'onglet du travail à effectuer. Si le dossier est indisponible, actualisez et demandez au coordonnateur des affectations de vérifier vos permissions et votre affectation au dossier. Un résultat de recherche n'accorde pas le droit de modifier.

## Barre de navigation et menu utilisateur

Utilisez le commutateur EN/FR pour changer de langue. Si une page équivalente existe, le commutateur conserve le dossier choisi et les options de l'URL. Les URL commencent par `/en/` ou `/fr/`. Certaines URL françaises utilisent aussi des noms de page traduits.

Utilisez le bouton soleil ou lune pour passer du mode clair au mode sombre. Consultez l'accueil pour voir votre travail affecté.

Le menu utilisateur présente votre nom, votre courriel et **Déconnexion**. Les utilisateurs ayant un accès Lecteur Système global ou supérieur voient aussi **Télécharger le vidage SQL**. La déconnexion termine votre session et ouvre la page de connexion dans votre langue. En cas d'échec, vous restez sur la page courante et voyez une erreur.

## Utiliser un guide

Sur les écrans pris en charge, sélectionnez **Guide** pour ouvrir les instructions près des commandes concernées. Si plusieurs guides sont disponibles, choisissez-en un dans la liste. Les guides de la liste des ententes peuvent indiquer le nom de l'agence pour les distinguer.

Suivez les instructions et utilisez les commandes habituelles de l'application. Un guide peut avancer après une action réussie, comme ouvrir une fenêtre ou enregistrer. **Suivant** fait avancer les instructions manuelles lorsque permis. **Précédent** revient sur le parcours visité, y compris vos choix. Un enregistrement échoué ne compte pas comme une action terminée.

Un guide de processus suit l'entente choisie et ses tâches exactes. Attendez le travail d'une autre personne affectée lorsque nécessaire. Ouvrir une autre entente ou une tâche voisine ne change pas le travail choisi dans le guide. Retournez au dossier ou à la tâche indiqués pour continuer. Terminer les instructions ne termine ni n'approuve le travail métier.

Vous pouvez changer de langue sans perdre votre place. Le guide retient sa position dans l'onglet courant lorsque le stockage est disponible. Quittez pour le fermer, puis relancez-le pour utiliser la version publiée courante. Fermer un guide n'enregistre ni n'annule votre formulaire. Utilisez les commandes du formulaire.

Si les instructions attendent le chargement d'une page ou d'une fenêtre, attendez la fin. Fermez une fenêtre d'aide sans rapport pour reprendre. Si une commande est indisponible, vérifiez le dossier ouvert et vos permissions pour l'action. Demandez à la personne responsable de la publication de vérifier la version choisie si les instructions ne correspondent plus à l'écran.

Si **Guide** manque, l'écran peut ne proposer aucun guide publié pour votre agence et vos rôles actifs. La personne responsable de la publication peut vérifier le public et les paramètres. L'accès au guide ne donne pas le droit de lire ou modifier un dossier. Consultez [Publier de l'aide guidée](../admin/guided-help.md).

## Lire et exporter un diagramme de parcours

Les diagrammes de processus et de guides montrent l'ordre des étapes et les routes étiquetées entre elles. Sélectionnez une étape active pour la consulter ou la modifier selon vos permissions. Dans un guide, les parcours alternatifs occupent des colonnes distinctes et les étapes communes suivantes apparaissent une seule fois.

Utilisez le zoom du diagramme pour choisir une valeur entre 25 % et 200 %, ou revenir à 100 %. Faites défiler les grands diagrammes. Le mode pleine fenêtre offre plus d'espace. Échap ferme d'abord une fenêtre ouverte, puis quitte le mode pleine fenêtre.

**Exporter en SVG** et **Exporter en PNG** téléchargent le diagramme complet, y compris le contenu hors de la zone visible. L'exportation utilise le diagramme à 100 %, quel que soit le zoom. Le PNG mesure quatre fois la largeur et la hauteur du diagramme. Si l'exportation échoue, le diagramme reste accessible et vous pouvez réessayer.

## Comportement des pages et des tableaux

Les listes de gestion utilisent la recherche et la pagination du serveur. Changer la recherche ou un filtre vous ramène à la première page. L'application affiche les résultats de votre dernière recherche, même si une recherche précédente prend plus de temps. Les comptes de l'en-tête indiquent tous les dossiers correspondants, pas seulement la page courante.

Les tableaux peuvent offrir la visibilité des colonnes, la sélection, des filtres d'état et des actions autorisées. Les états vide, chargement et erreur sont localisés. Après confirmation de la suppression, le dossier est normalement marqué supprimé plutôt que retiré de la base de données. La liste s'actualise et revient à une page valide si sa dernière page est vide. Si une modification est enregistrée mais que la liste ne s'actualise pas, l'application conserve sa mise à jour locale et signale l'erreur d'actualisation.

## Formulaires, fenêtres et sélecteurs

Vos permissions déterminent les boutons de création et de modification affichés. Le serveur les vérifie de nouveau à l'enregistrement. Les formulaires affichent les erreurs de validation et les commandes d'enregistrement dans la langue choisie, présentent un message si le serveur refuse une modification et demandent confirmation avant une action destructrice. Fermer une fenêtre efface son contenu. Si un enregistrement provenant d'une ancienne fenêtre se termine plus tard, il ne ferme pas une nouvelle fenêtre que vous avez ouverte.

Les champs de sélection bilingues recherchent les choix correspondants sur le serveur. Un choix enregistré reste affiché même s'il ne figure pas dans la page actuelle des résultats. Si les choix chargent ou sont indisponibles, le champ indique cet état et conserve le choix enregistré. Les dates utilisent `YYYY-MM-DD` sans heure. Les badges d'état ou de type et les cartes récapitulatives décrivent le dossier. Ils ne le modifient pas et ne donnent aucun accès.

Les formulaires en plusieurs étapes présentent les directives de l'étape courante. **Précédent** et **Suivant** changent d'étape. Seule l'action finale soumet le formulaire. Les résumés de validation comptent les erreurs par étape et mènent à la section touchée.

## Onglets de détail et liens directs

Une page de dossier comprend généralement un en-tête récapitulatif que vous pouvez réduire, un fil d'Ariane, des onglets verticaux et un espace de travail. Certains onglets conservent votre sélection dans l'option `section` de l'URL pour que vous puissiez l'ajouter aux favoris ou la partager. Une valeur inconnue ouvre l'onglet par défaut. Les sections prises en charge comprennent Permissions du rôle et Utilisateurs affectés du promoteur ou de l'entente.

Sur petit écran, la navigation verticale se replie derrière une commande étiquetée. Sur grand écran, elle demeure à côté du contenu. Le navigateur retient si vous avez réduit l'en-tête de cette page. Sur petit écran, l'en-tête récapitulatif est réduit au départ.

## Dépannage

Si une destination manque, demandez à votre administrateur de vérifier vos rôles actifs, le niveau d'accès pour ce travail et si le rôle couvre le système, l'agence ou le programme. Pour Gestion des affectations, vérifiez la capacité indépendante `manage_assignments`. Si une destination est visible, mais qu'un dossier manque ou est refusé, vérifiez aussi le dossier auquel vous êtes affecté et l'état courant. L'affectation d'approbateur ou de réviseur est une exigence de flux distincte.

Rechargez la page ou reconnectez-vous après un changement de permissions. Le serveur vérifie les permissions actuelles à chaque enregistrement, même si un ancien bouton reste visible.

Si le changement de langue ne conserve pas une section, ouvrez la destination dans la langue choisie et resélectionnez l'onglet. Ajoutez l'URL préfixée par la langue aux favoris.

![Navigation et sélecteur de langue](/screenshots/fr/navigation.png)

_Exemple de l'environnement de développement initial; les dossiers illustrés sont fictifs._
