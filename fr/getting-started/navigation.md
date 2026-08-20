# Navigation

GCS-SSC utilise une interface de tableau de bord adaptative avec une barre latérale réductible et redimensionnable, une barre de page, des fils d’Ariane localisés et des onglets dans les dossiers complexes. Le client suit l’anglais (`en-CA`) ou le français (`fr-CA`) et affiche un indicateur de chargement pendant la navigation.

## Destinations de la barre latérale

| Destination | Condition d’affichage |
| --- | --- |
| Accueil | Toujours après l’authentification. |
| Agences | Lorsqu’un rôle actif peut lire `agency`. |
| Programmes | Toujours affiché; les API imposent tout de même la portée `transfer_payment`. |
| Ententes | Lorsqu’un rôle actif peut lire `agreement` à une portée quelconque. |
| Promoteurs | Lorsqu’un rôle actif peut lire `applicant_recipient` à une portée globale ou d’agence. |
| Gestion des affectations | Lorsqu’une permission Entente ou Promoteur active comporte `manage_assignments`. |
| Rôles | Toujours affiché; les API imposent tout de même la portée `role`. |
| Utilisateurs | Lorsqu’un rôle actif peut lire `user`. |
| Administration commune | Seulement avec Lecteur ou un niveau supérieur global pour `system`. |

Les affectations à une entité exacte ne font pas apparaître Ententes ou Promoteurs puisqu’une affectation ne fournit jamais le plafond de rôle manquant. Inversement, une destination visible n’affecte pas tous les dossiers et ne garantit pas une liste non vide. La visibilité de la barre latérale est seulement un repère d’utilisation; chaque API impose indépendamment l’autorisation courante.

## Page d’accueil

La page d’accueil contient une file **Travail affecté** en direct. Elle présente seulement les affectations exactes de l’utilisateur connecté qui sont encore ouvertes et pour lesquelles le graphe de rôles courant fournit au moins Lecteur. Les affectations principales sont triées en premier. La recherche, le filtre de type, les liens directs et la pagination couvrent les promoteurs, ententes, examens, recommandations, réclamations, rapprochements, paiements, prévisions, surveillances, modifications et engagements.

::: warning Éléments fictifs du tableau de bord
Les quatre totaux de Vue d’ensemble du système (`54`, `116`, `950` et `100`), leurs graphiques de tendance et de progression et le message « Tous les systèmes sont opérationnels » sont des valeurs de présentation codées en dur, non des comptes ou des résultats d’état en direct. Activité récente, Approbations en attente et Paramètres du système sont des cartes statiques dont les boutons n’ont aucune destination ni aucun gestionnaire. Le bouton Documentation de l’en-tête n’a pas non plus de destination. N’utilisez pas ces éléments pour les rapports, la surveillance, les approbations, les journaux, la configuration ou les décisions d’incident. Utilisez plutôt les listes autorisées sous-jacentes, Travail affecté, les pages de flux et la réponse publique de `/api/health`.
:::

L’action Voir les agences de l’en-tête apparaît seulement lorsque l’utilisateur peut lire les agences et mène à leur liste.

## Barre de navigation et menu utilisateur

Le commutateur EN/FR mène à la route équivalente préfixée par la langue et conserve les paramètres et la requête lorsqu’une route localisée sœur existe. Les URL des pages utilisent `/en/...` ou `/fr/...`; plusieurs chemins français de l’application emploient des segments traduits.

Le bouton de cloche est présent, mais l’interface actuelle ne fournit aucun panneau de notification ni file de notification ou de courriel. Ne l’utilisez pas pour les alertes de flux.

Le menu utilisateur présente le nom et le courriel de l’utilisateur connecté et Déconnexion. Les utilisateurs possédant Lecteur ou un niveau supérieur global pour `system` voient aussi Télécharger le vidage SQL. La déconnexion invalide la session Better Auth avant de rediriger vers la page localisée; un échec laisse l’utilisateur sur la page courante et affiche une erreur localisée.

## Comportement des pages et des tableaux

Les listes de gestion utilisent la recherche et la pagination du serveur. Un changement de recherche ou de filtre réinitialise la page; les générations de requêtes empêchent une ancienne réponse de remplacer une recherche plus récente. Les comptes de l’en-tête représentent le total du serveur, non seulement la page courante.

Les tableaux peuvent offrir la visibilité des colonnes, la sélection, des filtres d’état et des actions autorisées. Les états vide, chargement et erreur sont localisés. Une suppression confirmée est normalement logique, actualise la liste et corrige une dernière page hors limites. Si l’actualisation échoue après une mutation validée, l’interface conserve son état de rapprochement local et signale l’erreur d’actualisation.

## Formulaires, fenêtres et sélecteurs

Les indices de permission du client déterminent les actions de création et de modification affichées, mais le serveur revérifie chaque requête. Les formulaires communs utilisent la validation localisée, les commandes d’enregistrement, les messages d’erreur serveur et la confirmation des actions destructrices. La fermeture d’une fenêtre efface son état; des jetons de requête empêchent un ancien enregistrement de fermer une nouvelle fenêtre.

Les sélecteurs bilingues appuyés par le serveur effectuent une recherche distante et hydratent séparément une valeur sélectionnée hors page. Les états de chargement et d’indisponibilité sont explicites au lieu d’effacer silencieusement une relation. Les dates sont stockées sous `YYYY-MM-DD` sans heure. Les badges localisés d’état ou de type et les cartes récapitulatives affichent les données du parent; ils n’accordent aucun accès et ne modifient rien.

Les formulaires en plusieurs étapes présentent les directives de l’étape courante. Précédent et Suivant naviguent; seule l’action finale soumet. Les résumés de validation comptent les erreurs par étape et mènent à la section touchée.

## Onglets de détail et liens directs

Les pages de détail contiennent généralement un en-tête réductible, un fil d’Ariane, des onglets verticaux et un espace de travail. Les onglets de route communs enregistrent la sélection dans le paramètre `section` et reviennent à la valeur par défaut pour une valeur inconnue. Les sections actuelles accessibles par lien comprennent Permissions du rôle et Utilisateurs affectés du promoteur ou de l’entente.

Sur petit écran, la navigation verticale se replie derrière une commande étiquetée. Sur grand écran, elle demeure à côté du contenu. L’état de réduction de l’en-tête est stocké localement sous une clé stable et est réduit par défaut sous le point de rupture `sm`.

## Dépannage

Si une destination manque, confirmez les attributions utilisateur-rôle actives, le niveau d’accès du sujet et la portée globale, d’agence ou de programme. Pour Gestion des affectations, vérifiez la capacité indépendante `manage_assignments`. Si une destination est visible, mais qu’un dossier manque ou est refusé, vérifiez aussi la racine d’affectation exacte et l’état courant. L’affectation d’approbateur ou de réviseur est une exigence de flux distincte.

Rechargez la page ou reconnectez-vous après les changements de permission pour actualiser les indices du client. Les écritures serveur reconstruisent toujours l’autorisation courante; une commande visible périmée ne peut pas conserver l’accès révoqué.

Si le changement de langue ne conserve pas une section, ouvrez la destination dans la langue choisie et resélectionnez l’onglet. Ajoutez l’URL préfixée par la langue aux favoris.

![Navigation et sélecteur de langue](/screenshots/fr/navigation.png)

_Exemple de l’environnement de développement initial. Les valeurs de Vue d’ensemble du système et les cartes récapitulatives affichées sont fictives et non des données opérationnelles._
