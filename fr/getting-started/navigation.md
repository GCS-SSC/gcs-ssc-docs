# Navigation

Utilisez la barre latérale pour ouvrir un espace de travail, comme Ententes ou Promoteurs. Dans un dossier, utilisez les onglets pour passer des renseignements au travail connexe. Le fil d’Ariane indique où vous êtes et permet de revenir aux pages précédentes. Vous pouvez réduire ou redimensionner la barre latérale, passer de l’anglais (`en-CA`) au français (`fr-CA`) et suivre l’indicateur de chargement pendant l’ouverture d’une page.

## Destinations de la barre latérale

| Destination | Condition d’affichage |
| --- | --- |
| Accueil | Toujours après l’authentification. |
| Agences | Lorsqu’un rôle actif peut lire `agency`. |
| Programmes | Lorsqu’un rôle actif peut lire `transfer_payment`. |
| Possibilités de financement | Lorsqu’un rôle actif peut lire `transfer_payment`. |
| Réceptions de dossiers de financement | Lorsqu’un rôle actif peut lire `funding_case`. |
| Pièces de journal | Lorsqu’un rôle actif peut lire `journal_voucher`. |
| Ententes | Lorsqu’un rôle actif peut lire `agreement` à une portée quelconque. |
| Promoteurs | Lorsqu’un rôle actif peut lire `applicant_recipient` à une portée prise en charge. |
| Gestion des affectations | Lorsqu’une permission active `agreement`, `applicant_recipient`, `funding_case`, `journal_voucher` ou `correction` comporte `manage_assignments`. |
| Groupes | Lorsqu’un rôle actif permet de lire `group`. |
| Rôles | Lorsqu’un rôle actif peut lire `role`. |
| Utilisateurs | Lorsqu’un rôle actif peut lire `user`. |
| GWCOA | Seulement avec Lecteur ou un niveau supérieur global pour `system`. |
| Audit | Avec Lecteur ou un niveau supérieur explicite, global ou pour une agence, pour `audit`. |

Une **affectation à un dossier** nomme le personnel responsable de ce dossier précis. Un **rôle** fournit les permissions, et sa **portée** les limite au système entier, à une agence ou à un programme. Pour les actions exigeant du travail affecté, il faut les permissions et l’affectation appropriées. Être affecté à une entente ou à un promoteur ne fait pas apparaître une destination manquante. De même, voir une destination ne signifie pas que tous les dossiers y seront affichés ou vous seront affectés. Le serveur vérifie l’accès à chaque ouverture ou modification d’un dossier.

## Page d’accueil

Commencez à l’accueil pour voir le travail qui vous est affecté. **Mon travail ouvert** compte vos affectations ouvertes à des dossiers précis. Les listes distinguent le travail direct et partagé, les promoteurs et les ententes. Chaque section propose des liens et sa propre pagination. Le tableau charge d’autres affectations au besoin; le total provient du serveur et ne se limite pas aux cinq lignes visibles.

Si l’utilisateur appartient à un groupe administratif actif, **Disponible à réclamer** présente les examens, recommandations, collectes de données, demandes de réviseur supplémentaire et étapes d’approbation non réclamés de ses groupes. Réclamer un élément actualise la file du groupe et le travail affecté. L’appartenance au groupe ne donne pas à elle seule accès au dossier ni le droit de réclamer le travail : le serveur vérifie l’admissibilité actuelle. Sans appartenance à un groupe, le deuxième sommaire montre plutôt le nombre d’ententes affectées. Consultez [Groupes](../admin/groups.md).

Si une file ne charge pas, utilisez Réessayer. Un échec de réclamation laisse l’élément disponible; actualisez puis vérifiez l’appartenance, la portée du rôle et l’état du travail avant de réessayer. L’API publique `/api/health` demeure le contrôle de santé opérationnel.

## Chercher des pages, des dossiers et votre travail

Ouvrez le bouton de recherche pour consulter ensemble **Pages**, **Mon travail** et **Dossiers**. Les pages suivent les mêmes règles de visibilité que la navigation. Sans texte, la palette propose les pages et quelques travaux ouverts affectés; elle ne recherche pas tous les dossiers. Saisissez au plus 200 caractères pour chercher des identifiants stables, références et noms bilingues. Les recherches courtes favorisent les références/identifiants exacts; un nom précis aide pour les correspondances larges. Les signes pourcentage, soulignements et barres obliques inverses sont littéraux.

Mon travail provient des affectations à des dossiers précis et des permissions courantes, y compris les examens enfants, recommandations et collectes de données affectés indépendamment. Les libellés du parent sont omis si vous ne pouvez le lire. Les résultats de dossiers exigent l’accès courant en lecture et excluent les travaux supprimés ou terminaux selon le cas; un état inachevé en lecture seule peut apparaître. Un résultat ne fournit aucune nouvelle affectation ni permission d’action. Les collectes ouvrent leur questionnaire exact à l’accueil plutôt que dans une page distincte.

Utilisez les flèches et Entrée pour choisir, ou Échap pour fermer. La palette présente un aperçu limité (cinq éléments personnels et douze dossiers au plus); précisez le texte ou ouvrez la liste appropriée si d’autres résultats existent. Si la recherche distante échoue, Pages reste utilisable et **Réessayer** relance la recherche. Un résultat peut devenir indisponible après un changement d’accès ou de cycle de vie; actualisez et vérifiez l’affectation au dossier précis et la portée du propriétaire.

Par exemple, pour trouver l’entente AG-2026-014 :

1. Ouvrez le bouton de recherche et saisissez `AG-2026-014`.
2. Choisissez le résultat avec les flèches et Entrée, ou sélectionnez-le directement.
3. Ouvrez l’onglet du travail à effectuer. Si le dossier est indisponible, actualisez et demandez au coordonnateur des affectations de vérifier vos permissions et votre affectation au dossier. Un résultat de recherche n’accorde pas le droit de modifier.

## Barre de navigation et menu utilisateur

Le commutateur EN/FR mène à la route équivalente préfixée par la langue et conserve les paramètres et la requête lorsqu’une route localisée sœur existe. Les URL des pages utilisent `/en/...` ou `/fr/...`; plusieurs chemins français de l’application emploient des segments traduits.

Le bouton de cloche est présent, mais l’interface actuelle ne fournit aucun panneau de notification ni file de notification ou de courriel. Ne l’utilisez pas pour les alertes de flux.

Le menu utilisateur présente le nom et le courriel de l’utilisateur connecté et Déconnexion. Les utilisateurs possédant Lecteur ou un niveau supérieur global pour `system` voient aussi Télécharger le vidage SQL. La déconnexion invalide la session Better Auth avant de rediriger vers la page localisée; un échec laisse l’utilisateur sur la page courante et affiche une erreur localisée.

## Comportement des pages et des tableaux

Les listes de gestion utilisent la recherche et la pagination du serveur. Changer la recherche ou un filtre vous ramène à la première page. L’application conserve les résultats de la recherche la plus récente, même si une recherche précédente se termine ensuite. Les comptes de l’en-tête indiquent tous les dossiers correspondants, pas seulement la page courante.

Les tableaux peuvent offrir la visibilité des colonnes, la sélection, des filtres d’état et des actions autorisées. Les états vide, chargement et erreur sont localisés. Après confirmation de la suppression, le dossier est normalement marqué supprimé plutôt que retiré de la base de données. La liste s’actualise et revient à une page valide si sa dernière page est vide. Si une modification est enregistrée mais que la liste ne s’actualise pas, l’application conserve sa mise à jour locale et signale l’erreur d’actualisation.

## Formulaires, fenêtres et sélecteurs

Vos permissions déterminent les boutons de création et de modification affichés. Le serveur les vérifie de nouveau à l’enregistrement. Les formulaires affichent les erreurs de validation et les commandes d’enregistrement dans la langue choisie, présentent un message si le serveur refuse une modification et demandent confirmation avant une action destructrice. Fermer une fenêtre efface son contenu; un enregistrement provenant d’une ancienne fenêtre ne peut pas fermer celle ouverte ensuite.

Les champs de sélection bilingues recherchent les choix correspondants sur le serveur. Un choix enregistré reste affiché même s’il ne figure pas dans la page actuelle des résultats. Les états de chargement et d’indisponibilité sont explicites au lieu d’effacer silencieusement une relation. Les dates sont stockées sous `YYYY-MM-DD` sans heure. Les badges localisés d’état ou de type et les cartes récapitulatives affichent les données du parent; ils n’accordent aucun accès et ne modifient rien.

Les formulaires en plusieurs étapes présentent les directives de l’étape courante. Précédent et Suivant naviguent; seule l’action finale soumet. Les résumés de validation comptent les erreurs par étape et mènent à la section touchée.

## Onglets de détail et liens directs

Une page de dossier comprend généralement un en-tête récapitulatif que vous pouvez réduire, un fil d’Ariane, des onglets verticaux et un espace de travail. Les onglets de route communs enregistrent la sélection dans le paramètre `section` et reviennent à la valeur par défaut pour une valeur inconnue. Les sections actuelles accessibles par lien comprennent Permissions du rôle et Utilisateurs affectés du promoteur ou de l’entente.

Sur petit écran, la navigation verticale se replie derrière une commande étiquetée. Sur grand écran, elle demeure à côté du contenu. Le navigateur retient si vous avez réduit l’en-tête de cette page. Il est réduit au départ sur les écrans plus étroits que le seuil de mise en page `sm` (le seuil de petit écran de l’application).

## Dépannage

Si une destination manque, confirmez les attributions utilisateur-rôle actives, le niveau d’accès du sujet et la portée globale, d’agence ou de programme. Pour Gestion des affectations, vérifiez la capacité indépendante `manage_assignments`. Si une destination est visible, mais qu’un dossier manque ou est refusé, vérifiez aussi le dossier auquel vous êtes affecté et l’état courant. L’affectation d’approbateur ou de réviseur est une exigence de flux distincte.

Rechargez la page ou reconnectez-vous après les changements de permission pour actualiser les indices du client. Les écritures serveur reconstruisent toujours l’autorisation courante; une commande visible périmée ne peut pas conserver l’accès révoqué.

Si le changement de langue ne conserve pas une section, ouvrez la destination dans la langue choisie et resélectionnez l’onglet. Ajoutez l’URL préfixée par la langue aux favoris.

![Navigation et sélecteur de langue](/screenshots/fr/navigation.png)

_Exemple de l’environnement de développement initial; les dossiers illustrés sont fictifs._
