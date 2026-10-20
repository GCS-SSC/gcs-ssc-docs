# Publier de l'aide guidée

Utilisez **Gestion > Aide guidée** pour rédiger des instructions qui s'affichent près des commandes de l'application. Vous pouvez créer un guide pour le système ou une agence, réutiliser un guide partagé et choisir le personnel qui peut l'ouvrir.

Publiez le guide pour enregistrer une version de son contenu. Publiez ensuite les paramètres de l'agence pour rendre cette version accessible au public choisi. Effectuez les deux étapes.

## Vérifier l'accès

Votre rôle doit fournir les permissions d'aide guidée pour le système ou l'agence propriétaire du guide. Les guides du système exigent une portée globale. Les guides et paramètres d'une agence exigent la portée de cette agence. Une portée de programme ou une affectation à un dossier ne donne pas accès à la gestion des guides.

- Lecture permet de consulter les guides et les paramètres de publication.
- Création permet de créer un guide, d'ajouter un guide publié au catalogue d'une agence ou de créer une copie pour l'agence.
- Modification permet de modifier et publier les guides ou paramètres d'agence, et de dépublier ces paramètres.
- Suppression permet de retirer un guide ou de supprimer une ébauche sans référence.

Les lecteurs n'ont pas besoin de permission de gestion des guides. Ils doivent détenir un rôle actif inclus dans le public publié de l'agence. Ils doivent aussi pouvoir lire l'écran ou le dossier de départ. Le guide ne donne pas le droit de modifier les données métier.

## Rédiger un guide

1. Ouvrez **Aide guidée** et développez le groupe du système ou de l'agence que vous gérez.
2. Sélectionnez **Créer un guide**. Dans **Général**, saisissez le titre et la description en anglais et en français.
3. Laissez **Parcours du processus** à **Guide standard** pour une suite d'instructions. Pour un processus de risque, consultez [Guider un processus de risque d'entente](#guider-un-processus-de-risque-dentente).
4. Ouvrez **Parcours** et ajoutez une étape. Choisissez son **Écran** et sa **Commande**. Saisissez un titre et des instructions dans les deux langues.
5. Choisissez **Mettre le contrôle en évidence** pour attirer l'attention sur la commande, ou **Fenêtre d'aide seulement** pour laisser toute la page accessible.
6. Choisissez comment le lecteur avance. **Après réalisation de l'action** fait avancer le guide lorsqu'une action prise en charge réussit. **Uniquement avec Suivant** laisse le lecteur avancer dans les explications. Les actions obligatoires, comme ouvrir une fenêtre ou enregistrer, doivent se terminer avant de continuer.
7. Enregistrez la fenêtre de l'étape, puis sélectionnez **Enregistrer** dans le guide pour enregistrer l'ébauche de travail.
8. Prévisualisez le guide complet, corrigez les erreurs et sélectionnez **Publier**.

Vous pouvez enregistrer une ébauche incomplète. Pour la prévisualiser ou la publier, remplissez les deux langues et ajoutez au moins une étape avec un écran et une commande valides. Dans chaque langue, les titres acceptent 255 caractères, les descriptions 4 000 et les instructions 8 000. Un guide contient au plus 100 étapes.

Les instructions acceptent le gras, l'italique, le code en ligne, les liens et les sauts de ligne. N'insérez pas de HTML, de scripts ou d'expressions de modèle. Donnez une action claire par étape et utilisez le libellé visible de la commande.

**Sélectionner à l'écran** permet d'ouvrir l'écran voulu et de choisir une commande prise en charge. Retournez à l'éditeur, vérifiez la sélection et enregistrez le guide. Ce choix ne publie ni n'enregistre le guide sur le serveur.

L'aperçu utilise les vraies commandes de l'application. Saisir des données, enregistrer ou terminer du travail dans l'aperçu peut modifier des dossiers réels. Utilisez un dossier de test approprié pour vérifier les instructions.

## Ajouter des choix à un guide standard

Dans **Parcours**, sélectionnez la commande de branche d'une étape pour ouvrir **Gérer les branches**. Choisissez un champ à choix ou une case à cocher pris en charge sur cet écran, sa valeur et l'étape ultérieure à ouvrir. Ajoutez les conditions dans leur ordre d'évaluation. Définissez **Sinon, aller à** pour une valeur sans correspondance, ou choisissez **Fin du guide**.

Les branches mènent seulement à une étape ultérieure ou à la fin. Un même champ et une même valeur ne peuvent apparaître deux fois dans une décision. Avant de supprimer une étape visée par une branche, modifiez cette branche. Modifiez les branches avant de déplacer une étape si le déplacement ferait revenir une branche en arrière.

Par exemple, créez une branche selon **Type d'entente** après le choix du lecteur. Dirigez **Remboursable** vers les instructions de remboursement, puis vers l'étape finale d'enregistrement. Dirigez les autres types directement vers l'enregistrement. Rédigez les instructions de remboursement dans les deux langues et vérifiez les deux parcours. La branche change les instructions présentées, pas les règles du type d'entente.

## Rendre le guide accessible à une agence

1. Publiez le guide source. Activez **Offrir les versions publiées à tous les organismes** si d'autres agences peuvent le réutiliser.
2. Dans le groupe de l'agence destinataire, sélectionnez **Ajouter à l'organisme** pour ce guide.
3. Dans **Paramètres de publication de l'organisme**, choisissez la **Version source**, les **Écrans de découverte** et les **Rôles du public**.
4. Sélectionnez **Enregistrer**, vérifiez la version choisie et sélectionnez **Publier**.
5. Demandez à un membre du personnel ayant un rôle actif choisi et accès à l'écran d'ouvrir cet écran et de sélectionner **Guide**.

Choisissez au moins un écran de découverte et un rôle du public. Les rôles doivent être des rôles globaux actifs ou appartenir à l'agence. Les écrans de départ comprennent Général de l'agence, Types d'adresse, Types d'ententes, la liste des ententes, Évaluation du risque de l'entente et le travail d'évaluation. Certains écrans sont accessibles seulement dans un guide en cours et ne peuvent servir d'écran de départ.

Par exemple, publiez un guide **Ajouter un type d'adresse** avec des étapes pour Ajouter, le nom anglais, le nom français et Enregistrer. Ajoutez-le à votre agence avec Types d'adresse comme écran de découverte et le rôle du personnel de configuration comme public. Le personnel voit **Guide** sur cet écran après la publication des paramètres d'agence.

Les paramètres de l'agence choisissent une version source publiée précise. Une nouvelle publication source ne met pas les lecteurs à jour automatiquement. Choisissez la nouvelle version, enregistrez les paramètres et publiez-les lorsque vous êtes prêt. L'enregistrement seul laisse les anciens paramètres publiés en vigueur.

Utilisez **Créer une copie** si votre agence a besoin d'autres instructions. La copie est une ébauche privée distincte de l'agence qui conserve le propriétaire et la version source. Modifiez-la et publiez-la, puis publiez ses paramètres d'agence. Modifier l'original ne change pas la copie.

## Guider un processus de risque d'entente

Choisissez **Évaluer le risque d'une entente** dans **Parcours du processus**. Rédigez des instructions pour chaque étape dans cet ordre :

1. Choisir votre entente.
2. Démarrer le processus de risque.
3. Terminer les tâches du processus.
4. Confirmer le résultat final.

Rédigez des instructions générales pour la liste des tâches du processus. Ajoutez les instructions **Parcours de l'évaluation** ou **Parcours de la liste de contrôle** pour ces types de tâches. L'éditeur limite chaque étape et type de tâche aux écrans pris en charge. Chaque étape exige des instructions avant publication. Retirez les branches du guide standard avant de choisir un parcours de processus.

Publiez le guide et ses paramètres d'agence avec la liste des ententes comme écran de découverte. Le lecteur choisit une entente de cette agence et suit le processus de risque courant. Le guide suit cette entente et ses tâches précises. Une tâche peut rester en attente du travail d'une autre personne affectée. Atteindre la fin du guide n'approuve ni ne termine le processus sous-jacent.

## Mettre à jour ou retirer un guide

**Historique des versions publiées** conserve chaque guide publié, sa version, la personne qui l'a publié et la date de publication. Enregistrer des modifications crée des changements non publiés à côté de la version courante. Publiez de nouveau pour les diffuser.

Utilisez **Dépublier** dans les paramètres de publication de l'agence pour cesser de proposer cette entrée aux nouveaux lecteurs. Enregistrez d'abord les changements de paramètres en attente. Vous pouvez republier les paramètres plus tard.

Utilisez **Retirer** sur un guide source pour cesser de le modifier et empêcher les agences de l'ajouter à leur catalogue. Les entrées d'agence existantes conservent leurs versions publiées choisies. Vérifiez et dépubliez ces entrées séparément si les lecteurs doivent cesser de les lancer. Un guide retiré ne peut plus être modifié. La suppression est disponible seulement pour une ébauche sans référence d'agence.

Un guide en cours conserve sa version de départ. Lorsque le stockage de l'onglet du navigateur est disponible, il retient votre position pour la même personne connectée. Quitter efface le guide. La déconnexion ou un changement d'utilisateur efface la session. Relancez le guide pour utiliser le nouveau contenu publié.

## Résoudre les problèmes de publication et de lecture

| Problème | Marche à suivre |
| --- | --- |
| Un groupe propriétaire ou une action manque. | Vérifiez votre rôle actif d'aide guidée et sa portée de système ou d'agence. |
| L'aperçu ou la publication signale du contenu incomplet. | Complétez les deux langues et vérifiez l'écran et la commande de chaque étape. |
| Une commande ou une branche est incompatible. | Ouvrez l'étape indiquée, choisissez une commande ou un choix pris en charge, puis prévisualisez et republiez. Les entrées d'agence exigent la version source corrigée et une nouvelle publication. |
| Un enregistrement ou une publication signale un conflit. | Rechargez, vérifiez l'ébauche enregistrée et la version courante, puis appliquez de nouveau vos changements. |
| Un rôle du public ne peut être choisi ou enregistré. | Vérifiez qu'il est actif et appartient à l'agence ou à la portée globale. |
| Les lecteurs ne voient pas Guide. | Vérifiez la publication d'agence, la version choisie, l'écran de découverte, le rôle actif du public et l'accès à l'écran. Actualiser la page ne donne pas accès. |
| Un parcours attend ou montre le mauvais dossier ou la mauvaise tâche. | Attendez la fin du chargement. Retournez à l'entente choisie et à la tâche exacte. Vérifiez les affectations et l'état du processus si le travail est bloqué. |
| Un guide partagé n'est plus offert. | Conservez la version retenue par l'agence ou créez une copie de cette version. Les nouvelles versions source ne deviennent pas accessibles automatiquement. |

Pour les commandes du lecteur et les mesures de récupération, consultez [Navigation](../getting-started/navigation.md#utiliser-un-guide).
