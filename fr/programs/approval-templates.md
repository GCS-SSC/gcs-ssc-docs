# Modeles d approbation

Un modèle d'approbation est une liste réutilisable des personnes qui doivent approuver un dossier, de leur ordre d'intervention et des éléments à confirmer. Un administrateur de l'agence configure les noms bilingues, les approbateurs, les titres, les règles d'ajout d'approbations et les certifications. Ces certifications sont les énoncés à cocher que les approbateurs doivent confirmer. Au démarrage du processus sur un dossier, le système copie le modèle dans une feuille d'acheminement. Celle-ci conserve les approbations de ce dossier. Les agents et les approbateurs travaillent sur cette copie.

Par exemple, une réclamation de contribution pourrait nécessiter l'approbation du gestionnaire de programme, puis celle d'un agent des finances. Une certification obligatoire pourrait dire « J'ai comparé la réclamation aux dépenses admissibles de l'entente. » Utilisez des énoncés adaptés à votre processus; cet exemple n'impose aucune route d'approbation.

Créez les modèles dans le catalogue de l'agence, puis sélectionnez-les dans les configurations d'examen ou de recommandation, les membres d'évaluation ou les flux. Ces processus utilisent les modèles pour approuver les ententes, réclamations, prévisions, paiements, suivis, demandeurs ou destinataires et travaux connexes.

## Prerequis dans une installation vide

Avant de créer des modèles opérationnels, configurez :

- Utilisateurs communs qui peuvent être sélectionnés comme approbateurs par défaut.
- Types d'approbation "au nom de" de l'agence si les utilisateurs peuvent approuver au nom d'autres personnes.
- Ensemble d'examens, ensemble de recommandations, flux ou autre configuration d'exécution d'agence qui référencera le modèle.
- Permissions pour les utilisateurs qui gèrent les modèles et ceux qui agiront sur les approbations d'exécution.

Un modèle peut être sauvegardé sans étapes, mais un modèle sans étapes produit une feuille d'acheminement vide et ne peut pas recueillir d'approbations utiles.

## Emplacement des modèles

Gérez les modèles dans **Modèles d'approbation** de l'agence. Chaque modèle appartient à cette agence et peut servir à ses configurations admissibles liées aux volets. Chaque ligne montre le nom bilingue et le nombre d'étapes et de certifications.

Le rôle Lecteur de l'agence permet de consulter les modèles. Contributeur permet de les créer, de les modifier et de les publier. Gestionnaire permet de supprimer les modèles admissibles à la suppression. La permission de configurer un volet ne permet pas, à elle seule, de modifier le modèle d'agence.

## Cibles d'exécution

Le modèle appartient à une agence. Son en-tête ne choisit pas s'il servira à approuver une réclamation, une recommandation ou un autre type de dossier. Ce choix se fait dans la configuration publiée du flux, de l'examen ou de la recommandation qui utilise le modèle. Le système vérifie que le modèle appartient à la bonne agence. Ajouter un modèle ne donne pas au dossier des actions que son processus ne prend pas en charge.

Par exemple, une agence peut réutiliser « Signature du gestionnaire » dans un flux de réclamation et dans l'approbation d'un membre de recommandation. Chaque feuille d'acheminement conserve ses étapes, ses preuves et son état. Modifier le modèle ne change aucune des deux feuilles.

## Liste des modeles

La liste des modèles prend en charge :

- Recherche et pagination.
- Actions ajouter, modifier, ouvrir et supprimer selon les permissions de modification ou de suppression.
- Pastilles indiquant le nombre d'étapes et de certifications.

La fenêtre d'ajout ou de modification contient seulement les champs d'en-tête du modèle :

- Nom anglais et nom français.
- Description anglaise et description française.

Les étapes et certifications sont gérées depuis la page de détail du modèle.

## Page de detail du modele

L'ouverture d'un modèle affiche une page de détail avec :

- Fil d'Ariane vers le catalogue de l'agence.
- Sommaire repliable avec le nom, la description, l'état et la version de publication, le nombre d'étapes et le nombre de certifications.
- Barre latérale avec sections General et Etapes d approbation.
- Action de sauvegarde pour tout le modèle.

La section General contient :

- Nom anglais et nom français.
- Description anglaise et description française.

La section Approbations additionnelles détermine si les utilisateurs peuvent ajouter des étapes à une feuille d'acheminement déjà créée. Sa configuration comprend :

- Une bascule **Permettre les approbations additionnelles**, désactivée par défaut.
- Le nom anglais et le nom français par défaut de chaque étape ajoutée.
- La permission pour l'utilisateur qui ajoute l'étape de modifier ces noms bilingues.
- Une liste ordonnée d'énoncés de certification bilingues par défaut, chacun obligatoire ou facultatif.
- La permission pour l'utilisateur qui ajoute l'étape d'ajouter, modifier, retirer ou réordonner les certifications, ou d'en changer le caractère obligatoire.

Lorsque les approbations additionnelles sont permises, les noms d'étape bilingues par défaut sont obligatoires. La liste des certifications par défaut peut être vide. Le système copie la politique et ses valeurs par défaut dans chaque feuille d'acheminement lors de sa création. Les modifications ultérieures du modèle s'appliquent donc seulement aux nouvelles feuilles et ne modifient pas silencieusement une route déjà en cours.

## Cycle de vie et publication du modèle

Un nouveau modèle est un brouillon. **Enregistrer** conserve vos changements; **Publier** rend une copie fixe disponible, à partir de la version `1`. Une publication modifiée augmente le numéro de version. Enregistrer des changements à un modèle publié prépare une version future et conserve sa copie publiée. Publier de nouveau la même définition garde sa version. **Retirer** empêche définitivement les nouvelles sélections et modifications tout en conservant l'historique.

Par exemple, ajouter l'approbation d'un directeur et publier la version `2` change les futures feuilles d'acheminement. Une réclamation utilisant déjà la version `1` conserve sa route initiale.

Chaque copie publiée comprend le modèle, les règles et certifications par défaut des approbations additionnelles, les étapes ordonnées et leurs approbateurs par défaut, ainsi que les règles de certification de chaque étape. Les feuilles d'acheminement utilisent cette copie et conservent leur route initiale après une publication ultérieure.

## Etapes d approbation

Les étapes d'approbation sont les actions ordonnées d'une feuille d'acheminement. Chaque étape contient :

- Ordre dans la séquence.
- Titre d'approbateur.
- Nom anglais et nom français.
- Description anglaise et description française.
- Utilisateur ou groupe par défaut.
- Zéro ou plusieurs certifications.

L'ordre des étapes doit être unique dans le modèle. La page de détail trie les étapes par séquence avant la sauvegarde.

Choisissez un utilisateur commun par défaut ou un groupe administratif actif de la même agence pour chaque étape. Une étape de groupe peut exiger des détails du groupe. Les membres prennent en charge les étapes de groupe en attente depuis l'accueil. Ils doivent être admissibles au moment de la prise en charge et de l'action. Consultez [Groupes](../admin/groups.md). Les feuilles d'acheminement conservent le choix d'affectation publié, sauf si une action autorisée réattribue l'étape.

## Editeur d etape

Ajoutez ou modifiez une étape dans l'éditeur plein écran. Saisissez ses détails et ouvrez la section des certifications pour modifier sa liste de vérification. Enregistrer ici ajoute les changements au modèle affiché. Vous devez aussi enregistrer la page principale du modèle pour les conserver.

Fermer l'éditeur d'étape sans enregistrer abandonne ses changements.

## Certifications

Les certifications sont des énoncés de vérification qu'un approbateur doit traiter lors d'une approbation ou d'un refus. Chaque certification contient :

- Ordre.
- Indicateur du caractère facultatif.
- Nom anglais et nom français.
- Description anglaise et description française.
- Texte de certification anglais et français.

L'ordre des certifications doit être unique dans une étape. Les noms bilingues des certifications doivent aussi être uniques dans une étape.

Pour échanger deux certifications, changez leur ordre dans l'éditeur d'étape, enregistrez l'étape, puis le modèle complet. Chaque certification enregistrée garde son identité. Si vous retirez la première certification et déplacez la seconde à l'ordre 1, la seconde reste la même certification. La certification retirée reste dans l'historique. Un échec d'enregistrement du modèle complet conserve le modèle, les étapes et les certifications précédemment enregistrés; corrigez l'erreur et réessayez. Publiez le modèle modifié lorsqu'il est prêt pour le travail futur.

Comportement d'exécution :

| Règle | Comportement |
| --- | --- |
| Les certifications obligatoires doivent être cochées | L'approbation est désactivée jusqu'à ce qu'elles soient cochées. |
| Les certifications optionnelles peuvent rester non cochées | Elles ne bloquent pas l'approbation. |
| Le texte suit la langue de l'utilisateur | Le texte est affiché dans la langue de l'approbateur lorsque possible. |

## Regles de validation

La validation du modèle applique les règles suivantes :

| Règle | Comportement |
| --- | --- |
| Le texte du modèle est bilingue | Nom et description anglais/français sont obligatoires. |
| Les champs d'étape sont complets | Chaque étape exige séquence, nom bilingue, description bilingue, exactement un utilisateur ou groupe par défaut et titre d'approbateur. |
| La séquence d'étape est unique | Les étapes non supprimées ne peuvent pas partager la même séquence. |
| Les champs de certification sont complets | Chaque certification exige un ordre, un nom bilingue, une description bilingue, un indicateur du caractère facultatif si utilisé et un texte bilingue. |
| L'ordre de certification est unique | Les certifications non supprimées d'une même étape ne peuvent pas partager l'ordre. |
| Les noms de certification sont uniques | Les certifications non supprimées d'une même étape ne peuvent pas partager le même nom bilingue. |

Les étapes ou certifications retirées sont appliquées lorsque le modèle complet est sauvegardé. Jusque-là, ces changements restent dans l'éditeur.

## Reference des modeles dans le volet

Les modèles deviennent opérationnels seulement lorsqu'ils sont référencés par une autre configuration ou un processus d'exécution. Les références courantes du volet comprennent :

- Configuration d'examen : un modèle facultatif peut être attaché à tout l'ensemble d'examen.
- Membre de configuration d'examen : un modèle facultatif peut être attaché à un membre spécifique de schéma d'évaluation/examen.
- Configuration de recommandation : un modèle facultatif peut être attaché aux recommandations générées.
- Membres de flux publiés et configurations d'examen ou de recommandation qui référencent un modèle de leur volet.

Un changement au modèle publié touche les futures feuilles d'acheminement. Celles déjà créées conservent leurs étapes et décisions; modifier le modèle ne réécrit donc pas l'historique d'approbation.

## Feuilles d'acheminement en exécution {#feuilles-de-route-en-execution}

Ouvrez la section d'approbation du dossier pour consulter ses feuilles d'acheminement et étapes. Si le processus n'a pas encore créé de feuille, la section indique un état en attente. Certains dossiers ne nécessitent aucune approbation.

Les feuilles d'acheminement sont groupées dans le tableau d'approbation. Chaque feuille contient :

- Nom bilingue.
- Statut.
- Indicateur courant.
- Indicateur aperçu.
- Étapes.

Chaque étape affiche :

- Nom bilingue de l'étape.
- Approbateur par défaut.
- Approbateur assigné.
- Statut d'approbation.
- Date de décision et personne ayant pris la décision lorsque l'étape est terminée.
- Commentaire.
- Certifications.
- Si l'étape est courante.
- Si l'utilisateur courant peut agir ou réattribuer.
- Si l'utilisateur courant peut ajouter une étape immédiatement avant ou après.

## Ajout d etapes d approbation

Lorsque la politique copiée dans la feuille permet les approbations additionnelles, la colonne d'actions propose **Ajouter avant** et **Ajouter apres** sur les étapes admissibles. Sélectionnez l'étape avant ou après laquelle insérer la nouvelle approbation. Les autres étapes conservent leur ordre et leur historique de décision.

La fenêtre exige un approbateur de la même agence. Cet utilisateur devient à la fois l'approbateur par défaut et l'approbateur assigné de la nouvelle étape. La fenêtre reprend les noms bilingues et les certifications du modèle. Les noms sont en lecture seule sauf si le modèle permet leur modification. Lorsque la modification des certifications est permise, l'utilisateur peut les ajouter, modifier, retirer, réordonner ou changer leur caractère obligatoire ou facultatif; une liste vide est valide.

Un utilisateur peut ajouter une étape dans l'un des cas suivants :

- Il possède la permission de gérer le flux d'approbation propriétaire; ou
- Il possède l'accès ordinaire en lecture au dossier propriétaire et est assigné à une étape non résolue de la feuille d'acheminement courante.

L'assignation seule ne donne jamais accès au dossier propriétaire. À l'enregistrement, le serveur vérifie de nouveau votre permission et votre affectation, la feuille courante, le point d'insertion, l'agence de l'approbateur choisi et les règles copiées dans la feuille.

Une approbation peut être ajoutée avant une étape non résolue, mais jamais avant une étape déjà traitée. Tant que la feuille demeure active, vous pouvez ajouter une étape après les étapes terminées. Aucune étape ne peut être ajoutée à une feuille approuvée ou refusée. Une étape ajoutée par un utilisateur ne peut plus être modifiée ni retirée après sa création; un gestionnaire peut toutefois la réattribuer par l'action habituelle.

## Reprendre après un refus

Une feuille d'acheminement refusée reste dans l'historique et ne peut pas être modifiée. La section d'approbation ne permet pas de rouvrir un ensemble terminé ni de remplacer une feuille refusée.

Pour réessayer, utilisez l'action de reprise du flux. Pour un ensemble d'examens autonome, utilisez son action de tentative suivante. Votre accès et l'état du processus doivent permettre cette action. La nouvelle tentative conserve les définitions publiées initiales. Modifier le modèle ne change pas la feuille refusée.

Ajouter une étape à une feuille inachevée change seulement cette route active, selon ses règles copiées. Cela ne peut pas annuler un refus. Voir [Examens en cours d'exécution](../concepts/runtime-reviews.md) et [Flux de travail](../concepts/workflows.md).

## Actions approuver et refuser

La fenêtre d'action s'ouvre depuis l'étape courante sur laquelle vous pouvez agir. Elle affiche :

- Certifications obligatoires et optionnelles.
- Approbateur par défaut.
- Approbateur assigné.
- Bascule "au nom de" optionnelle lorsque l'approbateur assigné diffère de l'approbateur par défaut.
- Sélecteur de type "au nom de" lors d'une action au nom d'autrui.
- Titre de poste.
- Date de décision lorsque le type "au nom de" exige les détails réels.
- Commentaire.

L'approbation est désactivée lorsque :

- Une certification obligatoire n'est pas cochée.
- L'utilisateur agit au nom d'autrui sans sélectionner un type "au nom de".
- Les détails réels sont requis mais le titre ou la date de décision manque.

Le refus est désactivé lorsque :

- Le commentaire est vide.
- L'utilisateur agit au nom d'autrui sans sélectionner un type "au nom de".
- Les détails réels sont requis mais le titre ou la date de décision manque.

Les certifications obligatoires n'ont pas à être cochées pour refuser une étape. Un refus marque immédiatement toute la feuille d'acheminement comme refusée, empêche les étapes suivantes de cette feuille d'être traitées ou ajoutées et conserve la feuille comme historique immuable. Une nouvelle feuille d'acheminement exige l'action de reprise prise en charge par le processus propriétaire; consultez **Reprendre après un refus** ci-dessus.

L'action d'approbation enregistre la décision, les certifications, les données "au nom de", les détails réels lorsque fournis et le commentaire. Approuver et refuser exigent la permission d'action sur approbation d'examen.

## Reattribution

La fenêtre de réattribution permet à un gestionnaire de changer l'utilisateur assigné à une étape. Elle contient :

- Recherche d'approbateur assigné.
- Type "au nom de" lorsque l'utilisateur assigné diffère de l'utilisateur par défaut.

Si l'utilisateur assigné redevient l'utilisateur par défaut, la valeur "au nom de" est effacée. La réattribution exige la permission de gestion d'approbation d'examen.

## Relation entre completion et approbation

Les modèles d'approbation et les enregistrements de complétion sont distincts mais apparaissent souvent ensemble dans les pages d'examen d'exécution :

- Les approbations conservent les décisions ordonnées et les certifications.
- Les enregistrements de complétion conservent la valeur finale, l'utilisateur, l'horodatage et les commentaires.
- Une page peut verrouiller la complétion jusqu'à ce que les conditions d'évaluation ou d'approbation soient satisfaites.

Les administrateurs doivent configurer à la fois la route du modèle et la configuration d'exécution qui décide quand la route est requise.

## Conseils operationnels

Vous devez avoir la permission de modifier l'agence active pour enregistrer ses modèles. Si un modèle est absent ou si vous ne pouvez pas y accéder, le système le signale comme introuvable. Des étapes, certifications, utilisateurs par défaut ou états de publication invalides peuvent bloquer l'enregistrement ou la publication. Un modèle retiré ne peut être republié. Conservez une copie des changements souhaités avant de recharger après un changement concurrent. Corrigez la dépendance indiquée, enregistrez le modèle complet et réessayez. Si un message indique que l'enregistrement a réussi mais que la page n'a pas pu se recharger, rechargez pour vérifier le modèle enregistré avant de le modifier de nouveau.

Utilisez ces pratiques :

- Créez des modèles distincts lorsque les étapes ou règles de certification diffèrent.
- Gardez les numéros de séquence simples et uniques.
- Activez les approbations additionnelles seulement lorsque le processus exige de prolonger une route active et fournissez des valeurs bilingues claires.
- La copie du modèle enregistrée dans la feuille détermine les règles de la route en cours; modifiez le modèle seulement pour changer les routes futures.
- Choisissez des utilisateurs communs actifs qui sont responsables du travail à approuver.
- Rédigez le texte de certification comme l'énoncé exact que l'approbateur doit reconnaître.
- Marquez une certification optionnelle seulement lorsqu'elle est informative ou conditionnelle.
- Associez les modèles aux configurations d'examen ou de recommandation seulement après avoir terminé les étapes et certifications.
- Testez une feuille d'acheminement d'exécution avant l'utilisation en production, surtout lorsque l'approbation au nom d'autrui est prévue.

![Détail du modèle d'approbation](/screenshots/fr/approval-template-detail.png)

_Capture réelle de l'environnement de développement avec données initialisées. Les enregistrements montrés sont seulement des exemples et ne sont pas créés dans une installation fraîche._
