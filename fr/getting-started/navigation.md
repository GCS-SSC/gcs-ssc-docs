# Navigation

GCS-SSC utilise une interface adaptative avec une barre latérale repliable et redimensionnable, une barre supérieure par page, des fils d’Ariane localisés dans les pages de détail et des onglets dans les dossiers complexes. L’interface est rendue côté client. Un indicateur apparaît pendant la navigation, tandis que la langue du document et celle de Nuxt UI suivent l’anglais (`en-CA`) ou le français (`fr-CA`).

## Destinations de la barre latérale

| Destination | Condition d’affichage |
| --- | --- |
| Accueil | Toujours après l’authentification. Son raccourci vers les agences apparaît seulement avec un accès en lecture aux agences. |
| Agences | Lorsqu’une permission statique `agency:read` existe dans une portée quelconque. |
| Programmes | Toujours affiché dans l’interface actuelle. Le serveur limite ou refuse indépendamment l’accès aux données. |
| Ententes | Avec une permission `agreement:read` dans une portée quelconque ou au moins une appartenance lisible à l’équipe exacte d’une entente. |
| Promoteurs | Avec l’indicateur global direct `applicant_recipient:read` ou au moins une appartenance lisible à l’équipe exacte d’un promoteur. |
| Rôles | Toujours affiché dans l’interface actuelle. Les API des rôles appliquent indépendamment les portées et peuvent refuser l’accès. |
| Utilisateurs | Lorsqu’une permission statique `user:read` existe dans une portée quelconque. |
| Administration commune | Seulement avec `system:read` global explicite. |

La vérification de navigation des équipes ne renvoie que deux booléens : l’existence d’une équipe lisible de promoteur ou d’entente. Elle ne divulgue aucun identifiant d’entité. Si ce chargement échoue, les destinations accessibles seulement par équipe demeurent masquées; utilisez un lien direct autorisé ou réessayez après le rétablissement du service.

La visibilité de la barre latérale est une aide ergonomique, non une autorisation. Une destination visible peut quand même produire une liste vide ou un refus localisé, et un contrôle client masqué ne remplace jamais la vérification de l’API.

## Barre supérieure et menu de l’utilisateur

Le commutateur EN/FR mène à la route équivalente préfixée par la langue et conserve les paramètres de route/requête lorsque Nuxt i18n peut résoudre le chemin frère. Les URL commencent toujours par `/en/...` ou `/fr/...`; plusieurs segments français sont traduits, notamment `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs` et `/fr/admin/commun`.

Le bouton de cloche est présent dans la barre supérieure, mais l’interface actuelle n’affiche aucun panneau de notifications et aucun système de notification, de courriel ou de file d’attente n’est câblé. Ne vous y fiez pas pour les alertes de flux.

Le menu affiche le nom et le courriel de l’utilisateur actif ainsi que Déconnexion. Les utilisateurs ayant `system:read` global voient aussi Télécharger le vidage SQL. Une déconnexion réussie invalide la session Better Auth avant de mener à la page de connexion localisée. Si l’invalidation échoue, l’application reste sur la page actuelle et affiche une erreur générique localisée.

## Comportement des pages et tableaux

Les listes de gestion utilisent la recherche distante et une pagination d’interface fondée sur zéro, reliée à la pagination serveur. Une recherche ou un filtre remet la page au début. Des générations de requête empêchent une ancienne réponse de remplacer une recherche plus récente. Le total du sommaire provient de l’ensemble du résultat serveur, non de la seule page affichée.

Les tableaux peuvent offrir la visibilité des colonnes, la sélection, des filtres d’état facultatifs et les actions de ligne permises. Les états vide, chargement et erreur communs sont localisés. Une suppression confirmée active normalement la suppression logique; après réussite, la liste est actualisée et une dernière page devenue hors limites est corrigée. Si l’actualisation échoue après la validation de la mutation, l’interface conserve son état local de rapprochement et affiche l’erreur sans prétendre que la suppression a échoué.

## Formulaires, fenêtres modales et recherches

Les contrôles de création/modification apparaissent selon les indices de permission du client, puis le serveur les vérifie de nouveau. Les formulaires partagés emploient la validation Zod localisée, `CommonSaveButton`, les messages d’erreur localisés du serveur et une confirmation pour les actions destructrices. La fermeture d’une fenêtre efface son état; les aides CRUD conscientes des sessions empêchent une ancienne sauvegarde asynchrone de fermer une nouvelle fenêtre.

Les sélecteurs bilingues alimentés par le serveur font une recherche distante et hydratent séparément une valeur enregistrée hors de la page courante. Ils affichent le chargement pendant l’hydratation et marquent une valeur enregistrée indisponible au lieu de l’effacer silencieusement. Réessayez la recherche ou corrigez le dossier référencé avant d’enregistrer une modification dépendante.

Les autres contrôles partagés suivent les mêmes conventions de langue et d’erreur :

- Les sélecteurs alimentés par une liste locale complète affichent le libellé anglais ou français selon la langue de l’interface. Les sélecteurs multiples présentent les valeurs choisies sous forme d’éléments amovibles; l’absence d’options et les changements de sélection sont annoncés de façon accessible.
- Les palettes de commandes à recherche distante chargent une première page, attendent brièvement après la saisie avant de chercher, affichent un état vide localisé et signalent les échecs au moyen du message d’erreur standard. Le choix d’un résultat ferme ou fait progresser l’interaction qui contient la palette; les types de dossiers et les permissions exactes proviennent de l’API de la fonction concernée.
- Les contrôles de date enregistrent une date civile sous la forme `YYYY-MM-DD`, sans heure. Effacer le contrôle n’enregistre aucune date. La validation du domaine détermine toujours si la date est obligatoire et quelles plages sont permises.
- Les pastilles d’état ou de type d’entité, les cellules de noms bilingues, les cartes de sommaire ou de valeur, les en-têtes de section et les sommaires de détail présentent les renseignements fournis par la page parente; ils n’accordent aucun accès et ne modifient aucun dossier indépendamment. Une cellule de nom bilingue met en évidence la langue active et affiche l’autre valeur en second plan.
- Une zone de texte partagée peut afficher sous le champ une contribution d’extension activée lorsque la page fournit le contexte d’agence ou de volet, un point d’insertion pris en charge et une action. L’activation de l’extension et l’autorisation serveur déterminent toujours si une contribution est retournée.

Les formulaires en plusieurs étapes affichent des indications localisées à côté de l’étape active. Précédent et Suivant ne font que changer d’étape; l’action finale soumet le formulaire. En cas d’échec de validation, le sommaire compte les erreurs par étape, permet d’aller à une étape touchée et énumère les erreurs de l’étape active. Annuler suit le comportement de confirmation ou de fermeture de la fonction qui contient le formulaire.

## Onglets de détail et liens directs

Une page de détail fournit généralement un sommaire repliable, des fils d’Ariane, des onglets verticaux et un espace de contenu. L’onglet choisi est conservé dans le paramètre `section` lorsque la page utilise l’aide partagée. Une section inconnue revient à l’onglet par défaut. On peut ainsi créer des liens directs vers Exercices de l’agence, Capacités du rôle ou Équipe du promoteur.

Sur les écrans plus petits, la navigation verticale partagée se replie derrière un bouton doté d’un libellé et se referme normalement après un choix. Sur les grands écrans, elle demeure visible à côté de l’espace d’édition. Ces composants de présentation n’ajoutent aucune route : la page parente détermine les sections offertes, les contrôles de permission, l’enregistrement et les liens directs.

L’état replié du sommaire est conservé dans le stockage local du navigateur sous une clé stable. Par défaut, il est replié sous le point de rupture `sm` et déployé sur les écrans plus larges, jusqu’à ce que l’utilisateur choisisse autrement.

## Dépannage

Si une destination manque, vérifiez l’utilisateur actif, ses affectations structurelles, ses indicateurs directs de promoteur et ses équipes exactes. Si une destination est visible mais que l’API refuse la requête, vérifiez l’action, le sujet et la portée actuelle d’agence, de programme ou d’entité; la visibilité de Programmes ou Rôles ne prouve aucun accès. Rechargez la page après une modification des permissions statiques. L’accès d’équipe est résolu sur demande.

Si le changement de langue ne mène pas à la section attendue, ouvrez la destination dans la langue choisie et resélectionnez l’onglet. Ajoutez l’URL préfixée par la langue aux favoris.

![Navigation et sélecteur de langue](/screenshots/fr/navigation.png)

_Capture réelle de l’environnement de développement avec données de démonstration. Les exemples ne sont pas créés dans une installation de production vierge._
