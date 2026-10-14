# Modeles D Approbation

Un modèle d’approbation est une liste réutilisable des personnes qui doivent approuver un dossier, de leur ordre d’intervention et des éléments à confirmer. Un administrateur de l’agence configure les noms bilingues, les approbateurs, les titres, les énoncés à cocher (certifications) et les règles d’ajout d’approbations. Au démarrage du processus sur un dossier, le système copie le modèle dans une feuille de route : le dossier d’approbation propre à ce dossier. Les agents et les approbateurs travaillent sur cette copie.

Par exemple, une réclamation de contribution pourrait nécessiter l’approbation du gestionnaire de programme, puis celle d’un agent des finances. Une certification obligatoire pourrait dire « J’ai comparé la réclamation aux dépenses admissibles de l’entente. » Utilisez des énoncés adaptés à votre processus; cet exemple n’impose aucune route d’approbation.

Dans la configuration des paiements de transfert, les modèles sont configurés dans le catalogue de l’agence puis référencés par les configurations d’examen, configurations de recommandation, membres d’évaluation ou flux d’exécution pour ententes, réclamations, prévisions, paiements, surveillance, demandeurs/destinataires et travaux connexes.

## Prerequis Dans Une Installation Vide

Avant de créer des modèles opérationnels, configurez :

- Utilisateurs communs qui peuvent être sélectionnés comme approbateurs par défaut.
- Types d’approbation "au nom de" de l’agence si les utilisateurs peuvent approuver au nom d’autres personnes.
- Ensemble d’examens, ensemble de recommandations, flux ou autre configuration d’exécution d’agence qui référencera le modèle.
- Permissions pour les utilisateurs qui gèrent les modèles et ceux qui agiront sur les approbations d’exécution.

Un modèle peut être sauvegardé sans étapes, mais un modèle sans étapes produit une feuille de route vide et ne peut pas recueillir d’approbations utiles.

## Emplacement des modèles

Gérez les modèles dans **Modèles d’approbation** de l’agence. Chaque modèle appartient à l’agence exacte et peut servir aux configurations d’agence admissibles liées à ses volets. Chaque ligne montre le nom bilingue et les nombres d’étapes et d’attestations. Lecteur consulte, Contributeur crée et publie, et Gestionnaire effectue les suppressions admissibles. La permission de configurer un volet ne permet pas, à elle seule, de modifier le modèle d’agence.

## Cibles d’exécution

Le modèle appartient à une agence. Son en-tête ne choisit pas s’il servira à approuver une réclamation, une recommandation ou un autre type de dossier. Ce choix se fait dans la configuration publiée du flux, de l’examen ou de la recommandation qui utilise le modèle. Le système vérifie que le modèle appartient à la bonne agence. Ajouter un modèle ne donne pas au dossier des actions que son processus ne prend pas en charge.

Par exemple, une agence peut réutiliser « Signature du gestionnaire » dans un flux de réclamation et dans l’approbation d’un membre de recommandation. Chaque bordereau possède ses étapes, preuves et cycle propres; modifier le modèle ne réécrit aucun des deux.

## Liste Des Modeles

La liste des modèles prend en charge :

- Recherche et pagination.
- Actions ajouter, modifier, ouvrir et supprimer selon les permissions de modification ou de suppression.
- Pastilles indiquant le nombre d’étapes et de certifications.

La fenêtre d’ajout ou de modification contient seulement les champs d’en-tête du modèle :

- Nom anglais et nom français.
- Description anglaise et description française.

Les étapes et certifications sont gérées depuis la page de détail du modèle.

## Page De Detail Du Modele

L’ouverture d’un modèle affiche une page de détail avec :

- Fil d’Ariane vers le catalogue de l’agence.
- Sommaire repliable avec nom, description, état/version de publication, nombre d’étapes et nombre de certifications.
- Barre latérale avec sections General et Etapes d approbation.
- Action de sauvegarde pour tout le modèle.

La section General contient :

- Nom anglais et nom français.
- Description anglaise et description française.

La section Approbations additionnelles détermine si les utilisateurs peuvent prolonger une feuille de route matérialisée. Sa configuration comprend :

- Une bascule **Permettre les approbations additionnelles**, désactivée par défaut.
- Le nom anglais et le nom français par défaut de chaque étape ajoutée.
- La permission pour l’utilisateur qui ajoute l’étape de modifier ces noms bilingues.
- Une liste ordonnée d’énoncés de certification bilingues par défaut, chacun obligatoire ou facultatif.
- La permission pour l’utilisateur qui ajoute l’étape d’ajouter, modifier, retirer ou réordonner les certifications, ou d’en changer le caractère obligatoire.

Lorsque les approbations additionnelles sont permises, les noms d’étape bilingues par défaut sont obligatoires. La liste des certifications par défaut peut être vide. La politique et ses valeurs par défaut sont copiées dans chaque feuille de route au moment de sa matérialisation. Les modifications ultérieures du modèle s’appliquent donc seulement aux nouvelles feuilles et ne modifient pas silencieusement une route déjà en cours.

## Cycle De Vie Et Publication Du Modèle

Un nouveau modèle est un brouillon. **Enregistrer** conserve vos changements; **Publier** rend une copie fixe disponible, à partir de la version `1`. Une publication modifiée augmente le numéro de version. Enregistrer des changements à un modèle publié prépare une version future et conserve sa copie publiée. Publier de nouveau la même définition garde sa version. **Retirer** empêche définitivement les nouvelles sélections et modifications tout en conservant l’historique.

Par exemple, ajouter l’approbation d’un directeur et publier la version `2` change les futures feuilles de route. Une réclamation utilisant déjà la version `1` conserve sa route initiale.

L'instantané publié contient l'identité du modèle, la politique et les certifications par défaut des approbations additionnelles, les identités, séquences et utilisateurs par défaut des étapes ordonnées ainsi que la politique de certification de chaque étape. Les feuilles de route d'exécution copient cet instantané. Une feuille existante conserve donc sa route d'origine après une publication ultérieure.

## Etapes D Approbation

Les étapes d’approbation sont les actions ordonnées d’une feuille de route. Chaque étape contient :

- Ordre / séquence.
- Titre d’approbateur.
- Nom anglais et nom français.
- Description anglaise et description française.
- Utilisateur par défaut.
- Zéro ou plusieurs certifications.

L’ordre des étapes doit être unique dans le modèle. La page de détail trie les étapes par séquence avant la sauvegarde.

Choisissez un utilisateur commun par défaut ou un groupe administratif actif de la même agence pour chaque étape. Une étape de groupe peut exiger des détails du groupe. Les membres prennent en charge les étapes de groupe en attente depuis l’accueil; ils doivent encore être admissibles pour les prendre en charge et agir. Consultez [Groupes](../admin/groups.md). Les feuilles de route conservent le choix d’affectation publié, sauf si une action autorisée réattribue l’étape.

## Editeur D Etape

Ajoutez ou modifiez une étape dans l’éditeur plein écran. Saisissez ses détails et ouvrez la section des certifications pour modifier sa liste de vérification. Enregistrer ici ajoute les changements au modèle affiché. Vous devez aussi enregistrer la page principale du modèle pour les conserver.

Utilisez cette distinction avec prudence : fermer l’éditeur d’étape ne sauvegarde pas le modèle. Il faut aussi enregistrer la page de détail du modèle.

## Certifications

Les certifications sont des énoncés de vérification qu’un approbateur doit traiter lors d’une approbation ou d’un refus. Chaque certification contient :

- Ordre.
- Indicateur du caractère facultatif.
- Nom anglais et nom français.
- Description anglaise et description française.
- Texte de certification anglais et français.

L’ordre des certifications doit être unique dans une étape. Les noms bilingues des certifications doivent aussi être uniques dans une étape.

Comportement d’exécution :

| Règle | Comportement |
| --- | --- |
| Les certifications obligatoires doivent être cochées | L’approbation est désactivée jusqu’à ce qu’elles soient cochées. |
| Les certifications optionnelles peuvent rester non cochées | Elles ne bloquent pas l’approbation. |
| Le texte suit la langue de l’utilisateur | Le texte est affiché dans la langue de l’approbateur lorsque possible. |

## Regles De Validation

La validation du modèle applique les règles suivantes :

| Règle | Comportement |
| --- | --- |
| Le type d’entité est obligatoire | Le type doit être un type d’entité d’exécution pris en charge. |
| Le texte du modèle est bilingue | Nom et description anglais/français sont obligatoires. |
| Les champs d’étape sont complets | Chaque étape exige séquence, nom bilingue, description bilingue, utilisateur par défaut et titre d’approbateur. |
| La séquence d’étape est unique | Les étapes non supprimées ne peuvent pas partager la même séquence. |
| Les champs de certification sont complets | Chaque certification exige un ordre, un nom bilingue, une description bilingue, un indicateur du caractère facultatif si utilisé et un texte bilingue. |
| L’ordre de certification est unique | Les certifications non supprimées d’une même étape ne peuvent pas partager l’ordre. |
| Les noms de certification sont uniques | Les certifications non supprimées d’une même étape ne peuvent pas partager le même nom bilingue. |

Les étapes ou certifications retirées sont appliquées lorsque le modèle complet est sauvegardé. Jusque-là, l’éditeur conserve seulement l’état brouillon courant.

## Reference Des Modeles Dans Le Volet

Les modèles deviennent opérationnels seulement lorsqu’ils sont référencés par une autre configuration ou un processus d’exécution. Les références courantes du volet comprennent :

- Configuration d’examen : un modèle facultatif peut être attaché à tout l’ensemble d’examen.
- Membre de configuration d’examen : un modèle facultatif peut être attaché à un membre spécifique de schéma d’évaluation/examen.
- Configuration de recommandation : un modèle facultatif peut être attaché aux recommandations générées.
- Membres de flux publiés et configurations d’examen ou de recommandation qui référencent un modèle de leur volet.

Un changement au modèle publié touche les futures feuilles de route. Celles déjà créées conservent leurs étapes et décisions; modifier le modèle ne réécrit donc pas l’historique d’approbation.

## Feuilles De Route En Execution

En exécution, la section commune d’approbation charge l’état d’approbation pour un type d’entité et un identifiant. Elle peut retourner :

- Aucun mode d’approbation.
- Matérialisation en attente.
- Mode d’exécution avec feuilles de route et étapes.

Les feuilles de route sont groupées dans le tableau d’approbation. Chaque feuille contient :

- Nom bilingue.
- Statut.
- Indicateur courant.
- Indicateur aperçu.
- Étapes.

Chaque étape affiche :

- Nom bilingue de l’étape.
- Approbateur par défaut.
- Approbateur assigné.
- Statut d’approbation.
- Date de décision et personne ayant pris la décision lorsque l’étape est terminée.
- Commentaire.
- Certifications.
- Si l’étape est courante.
- Si l’utilisateur courant peut agir ou réattribuer.
- Si l’utilisateur courant peut ajouter une étape immédiatement avant ou après.

## Ajout D Etapes D Approbation

Lorsque la politique copiée dans la feuille permet les approbations additionnelles, la colonne d’actions propose **Ajouter avant** et **Ajouter apres** sur les étapes admissibles. L’étape sélectionnée sert de point d’ancrage. La nouvelle étape reçoit une séquence décimale entre ses voisines; aucune renumérotation ni réécriture de la route existante n’est nécessaire. Les insertions répétées utilisent des décimales de plus en plus précises tout en conservant un ordre d’affichage sans ambiguïté.

La fenêtre exige un approbateur de la même agence. Cet utilisateur devient à la fois l’approbateur par défaut et l’approbateur assigné de la nouvelle étape. La fenêtre reprend les noms bilingues et les certifications du modèle. Les noms sont en lecture seule sauf si le modèle permet leur modification. Lorsque la modification des certifications est permise, l’utilisateur peut les ajouter, modifier, retirer, réordonner ou changer leur caractère obligatoire ou facultatif; une liste vide est valide.

Un utilisateur peut ajouter une étape dans l’un des cas suivants :

- Il possède la permission de gérer le flux d’approbation propriétaire; ou
- Il possède l’accès ordinaire en lecture au dossier propriétaire et est assigné à une étape non résolue de la feuille de route courante.

L’assignation seule ne donne jamais accès au dossier propriétaire. Au moment de la sauvegarde, le serveur vérifie de nouveau la permission, l’assignation, la feuille courante, le point d’ancrage, l’agence de l’approbateur choisi et la politique copiée.

Une approbation peut être ajoutée avant une étape non résolue, mais jamais avant une étape déjà traitée. Une étape peut être ajoutée après le préfixe déjà traité tant que la feuille demeure active. Aucune étape ne peut être ajoutée à une feuille approuvée ou refusée. Une étape ajoutée par un utilisateur ne peut plus être modifiée ni retirée après sa création; un gestionnaire peut toutefois la réattribuer par l’action habituelle.

## Reprendre après un refus

Les bordereaux refusés constituent un historique d’exécution immuable. La section d’approbation n’offre pas d’opération générale pour rouvrir un ensemble terminal ou remplacer en place un bordereau refusé. Utilisez la reprise du flux propriétaire ou l’opération de tentative suivante d’un ensemble autonome, lorsque l’accès et le cycle de vie le permettent. La nouvelle tentative conserve la filiation publiée figée; modifier le modèle de travail ne réécrit pas la preuve refusée.

Ajouter une étape à un bordereau courant inachevé est différent : seule cette route active change dans les limites de sa politique figée. Cela ne peut pas renverser un refus. Voir [Examens en cours d’exécution](../concepts/runtime-reviews.md) et [Flux de travail](../concepts/workflows.md).

## Actions Approuver Et Refuser

La fenêtre d’action s’ouvre depuis l’étape courante sur laquelle vous pouvez agir. Elle affiche :

- Certifications obligatoires et optionnelles.
- Approbateur par défaut.
- Approbateur assigné.
- Bascule "au nom de" optionnelle lorsque l’approbateur assigné diffère de l’approbateur par défaut.
- Sélecteur de type "au nom de" lors d’une action au nom d’autrui.
- Titre de poste.
- Date de décision lorsque le type "au nom de" exige les détails réels.
- Commentaire.

L’approbation est désactivée lorsque :

- Une certification obligatoire n’est pas cochée.
- L’utilisateur agit au nom d’autrui sans sélectionner un type "au nom de".
- Les détails réels sont requis mais le titre ou la date de décision manque.

Le refus est désactivé lorsque :

- Le commentaire est vide.
- L’utilisateur agit au nom d’autrui sans sélectionner un type "au nom de".
- Les détails réels sont requis mais le titre ou la date de décision manque.

Les certifications obligatoires n’ont pas à être cochées pour refuser une étape. Un refus marque immédiatement toute la feuille de route comme refusée, empêche les étapes suivantes de cette feuille d’être traitées ou ajoutées et conserve la feuille comme historique immuable. Une nouvelle feuille de route exige l’action de reprise prise en charge par le processus propriétaire; consultez **Reprendre après un refus** ci-dessus.

L’action d’approbation enregistre la décision, les certifications, les données "au nom de", les détails réels lorsque fournis et le commentaire. Approuver et refuser exigent la permission d’action sur approbation d’examen.

## Reattribution

La fenêtre de réattribution permet à un gestionnaire de changer l’utilisateur assigné à une étape. Elle contient :

- Recherche d’approbateur assigné.
- Type "au nom de" lorsque l’utilisateur assigné diffère de l’utilisateur par défaut.

Si l’utilisateur assigné redevient l’utilisateur par défaut, la valeur "au nom de" est effacée. La réattribution exige la permission de gestion d’approbation d’examen.

## Relation Entre Completion Et Approbation

Les modèles d’approbation et les enregistrements de complétion sont distincts mais apparaissent souvent ensemble dans les pages d’examen d’exécution :

- Les approbations conservent les décisions ordonnées et les certifications.
- Les enregistrements de complétion conservent la valeur finale, l’utilisateur, l’horodatage et les commentaires.
- Une page peut verrouiller la complétion jusqu’à ce que les conditions d’évaluation ou d’approbation soient satisfaites.

Les administrateurs doivent configurer à la fois la route du modèle et la configuration d’exécution qui décide quand la route est requise.

## Conseils Operationnels

Le système vérifie de nouveau le programme et le volet propriétaires ainsi que vos permissions actuelles lors de l’enregistrement. Un modèle absent et un modèle auquel vous n’avez pas accès donnent tous deux une réponse introuvable. Des étapes, attestations, utilisateurs par défaut ou états de publication invalides peuvent bloquer l’enregistrement ou la publication. Un modèle retiré ne peut être republié. Rechargez après un changement concurrent, corrigez la dépendance indiquée, enregistrez le modèle complet et réessayez.

Utilisez ces pratiques :

- Créez des modèles distincts lorsque les étapes ou politiques d’attestation diffèrent.
- Gardez les numéros de séquence simples et uniques.
- Activez les approbations additionnelles seulement lorsque le processus exige de prolonger une route active et fournissez des valeurs bilingues claires.
- La copie du modèle enregistrée dans la feuille détermine les règles de la route en cours; modifiez le modèle seulement pour changer les routes futures.
- Utilisez des utilisateurs par défaut actifs et responsables du point opérationnel.
- Rédigez le texte de certification comme l’énoncé exact que l’approbateur doit reconnaître.
- Marquez une certification optionnelle seulement lorsqu’elle est informative ou conditionnelle.
- Attachez les modèles aux configurations d’examen/recommandation seulement après avoir complété les étapes et certifications.
- Testez une feuille de route d’exécution avant l’utilisation en production, surtout lorsque l’approbation au nom d’autrui est prévue.

![Détail du modèle d’approbation](/screenshots/fr/approval-template-detail.png)

_Capture réelle de l’environnement de développement avec données initialisées. Les enregistrements montrés sont seulement des exemples et ne sont pas créés dans une installation fraîche._
