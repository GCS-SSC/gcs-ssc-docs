# Schémas d’évaluation {#schemas-d-evaluation}

Un schéma d’évaluation est un formulaire d’examen réutilisable accompagné de ses règles de pointage. Il indique aux agents les questions à répondre, la contribution des réponses au pointage et les résultats associés. Les administrateurs l’ouvrent depuis un membre d’ensemble d’examens d’agence, dans les paiements de transfert.

Par exemple, un programme peut évaluer la capacité de réalisation d’un demandeur : les agents répondent aux questions sur le personnel et les projets antérieurs, puis utilisent le pointage et le résultat configurés pour appuyer leur examen. Les questions et les règles doivent être configurées; cet exemple n’est pas une évaluation intégrée.

Le schéma appartient à l’agence. Un volet peut l’utiliser seulement s’il appartient à la même agence et correspond au genre de dossier examiné, appelé type d’entité.

## Prérequis dans une installation vide {#prerequis-dans-une-installation-vide}

Avant qu’un volet puisse utiliser des schémas d’évaluation pour les examens, configurez :

- Agence et programme de paiement de transfert.
- Volet.
- Schémas d’examen communs pour l’agence et le type d’entité, avec le type d’examen Évaluation.
- Ensemble d’examens d’agence qui référence ces schémas; liez l’ensemble publié au volet.
- Modèles d’approbation si l’achèvement de l’évaluation ou les étapes d’examen exigent un parcours d’approbation.
- Utilisateurs disposant des rôles de portée et des affectations exactes d’entité ou de flux nécessaires pour lire, enregistrer, terminer et approuver le travail généré.

## Où ouvrir les schémas {#ou-ouvrir-les-schemas}

Ouvrez un schéma depuis un ensemble d’examens d’agence. Le fil d’Ariane retourne au catalogue d’agence. L’éditeur affiche :

- Agence et ensemble d’examens propriétaires.
- Schéma d’évaluation.
- Contenu du schéma utilisé et matrice de pointage.
- Champs d’aide disponibles pour le type d’entité du schéma.

Le sommaire en haut de page peut être replié. La barre latérale gauche contient les commandes d’enregistrement et les liens vers les sections de l’éditeur.

## Importer une définition JSON

Dans l’éditeur, choisissez **Importer** et collez une définition JSON d’évaluation. L’éditeur vérifie sa syntaxe et sa structure avant de remplacer votre brouillon local. Vérifiez les sections, les calculs et le texte bilingue, puis utilisez séparément **Enregistrer** et **Publier**. Si le JSON ou ses champs sont invalides, corrigez-les dans la fenêtre d’importation. L’importation seule n’enregistre pas le schéma et ne change pas les examens existants.

## États de publication

Les schémas utilisent le cycle partagé de publication :

- **Brouillon** (`draft`) : contenu de conception modifiable, sans version publiée.
- **Publié** (`published`) : instantané publié immuable disponible; les enregistrements suivants préparent une publication ultérieure.
- **Retiré** (`retired`) : configuration historique conservée, indisponible pour de nouvelles sélections et non modifiable ni publiable.

Le sommaire affiche l’état de publication, la version et la présence de changements non publiés. Ce ne sont pas des statuts métier d’organisme.

## Première publication

Enregistrez un schéma valide, puis choisissez **Publier**. La première publication crée une version fixe `1` contenant le texte bilingue, la matrice, la définition et les réglages. Le système conserve l’identité de la personne qui publie.

Publiez ensuite la configuration d’examen avec cette version du schéma pour créer des examens qui conserveront cette version. Publier le schéma ne démarre pas une évaluation.

## Modifications publiées et retrait

Enregistrez les modifications, consultez l’indicateur de changements, puis publiez la définition prête. Chaque publication modifiée incrémente la version entière : corriger un libellé ou modifier la structure fait passer `1` à `2`. Publier de nouveau le même contenu conserve la version actuelle.

Par exemple, changer le texte d’une question et publier la version `2` laisse un examen version `1` avec son texte original. Modifiez et publiez la configuration d’examen qui utilise le schéma pour que les travaux futurs utilisent le nouveau schéma. Renommer une clé exige aussi de corriger toutes les dépendances qui la nomment.

Retirez un schéma publié pour empêcher les nouvelles sélections. Le retrait est permanent; les versions historiques restent disponibles aux tentatives d’examen qui utilisent déjà ces versions. Modifier le schéma courant ne doit pas modifier les réponses historiques.

## Comportement de sauvegarde

Une seule action d’enregistrement valide et enregistre à la fois les renseignements généraux et la définition de l’évaluation :

| Zone | Contenu enregistré |
| --- | --- |
| Général | Noms du schéma, noms de résultat et indicateurs de désactivation. |
| Définition | Matrice de pointage globale et définition d’évaluation. |

Si une zone contient une erreur, l’éditeur affiche la première erreur sans enregistrer. Corrigez-la et réessayez. Les noms français et anglais du schéma et du résultat sont obligatoires et limités à 255 caractères Unicode. Pour un même type de dossier dans l’agence, chaque nom de schéma doit être unique dans sa langue. Si un nom existe déjà, changez-le ou utilisez le schéma existant.

## Section Général {#section-general}

La section Général contient :

- Nom anglais et nom français du schéma.
- Nom anglais et nom français du résultat.
- Désactiver les résultats personnalisés.
- Désactiver l’alignement.
- Désactiver les examinateurs.

Ces options modifient le comportement de l’évaluation pendant l’examen :

- Désactiver les résultats personnalisés limite la possibilité de créer des résultats autres que ceux du schéma.
- Désactiver l’alignement retire cette fonction lorsqu’elle est prise en charge.
- Désactiver les examinateurs retire la fonction d’examinateurs additionnels lorsqu’elle est prise en charge.

## Matrices de pointage

La section Matrices contient :

- Matrice de pointage globale.
- Matrice de pointage par section.

Chaque ligne de matrice contient :

- Seuil de pointage maximal.
- Libellé anglais et français.
- Couleur de l’indicateur, validée comme couleur hexadécimale.

Une matrice transforme le pointage numérique d’une évaluation ou d’une section en libellé et en couleur, par exemple une cote de risque. Classez les seuils maximaux en ordre pour associer chaque pointage au libellé et à la couleur prévus. Chaque ligne définit un pointage maximal, et non une plage complète.

## Sections

Les sections sont les groupes de premier niveau de l’évaluation. Chaque section contient :

- Ordre/numéro.
- Code indépendant de la langue.
- Libellé anglais et français.
- Icône.
- Poids.
- Une ou plusieurs sous-sections.

Un code indépendant de la langue est un identifiant interne identique en français et en anglais. Les conditions et les calculs utilisent les codes de section, de sous-section et de question pour retrouver la bonne réponse. Renommer un code dans un schéma publié modifie sa structure et peut rendre les références invalides si les éléments qui l’utilisent ne sont pas mis à jour.

## Sous-sections

Les sous-sections regroupent les questions d’une section. Chaque sous-section contient :

- Ordre/numéro.
- Code indépendant de la langue.
- Libellé anglais et français.
- Poids.
- Dépendances facultatives.
- Questions d’évaluation et éléments calculés.

Les dépendances d’une sous-section sont des conditions qui déterminent si elle apparaît ou contribue à l’évaluation. Elles utilisent les réponses précédentes ou des valeurs d’aide : des renseignements déjà disponibles dans le dossier examiné. Les poids de sous-section peuvent être fixes, ajustables ou définis par un tableau de scénarios ajustables.

## Éléments d’évaluation {#elements-d-evaluation}

Les éléments d’évaluation peuvent être des questions directes ou des éléments calculés.

Une question contient :

- Code indépendant de la langue.
- Texte anglais et français de la question.
- Poids.
- Dépendances facultatives.
- Seuil de commentaire avec minimum et maximum.
- Type d’assistance facultatif. La valeur actuellement prise en charge est l’historique de financement.
- Options de réponse.
- Texte d’aide.

Chaque option de réponse contient :

- Valeur numérique.
- Libellé anglais et français.
- Description anglaise et française.

Les lignes d’aide contiennent :

- Titre anglais et français.
- Description anglaise et française.

## Éléments calculés {#elements-calcules}

Un élément calculé contient :

- Code indépendant de la langue.
- Libellé anglais et français.
- Poids.
- Dépendances facultatives.
- Texte d’aide.
- Formule.

La racine d’une formule doit être une opération. Les opérateurs pris en charge comprennent add, subtract, multiply, divide, sum, average, min, max, round, clamp, coalesce, if, eq, ne, gt, gte, lt, lte, and, or et not.

Les valeurs utilisées dans une opération (opérandes) peuvent être :

- Valeur littérale numérique.
- Valeur littérale booléenne (vrai ou faux).
- Référence à une réponse, avec les codes de section, de sous-section et de question.
- Référence à un champ d’aide.
- Opération imbriquée.

La validation rejette les formules qui référencent des éléments inexistants, les champs d’aide invalides et les cycles de calcul entre éléments calculés.

## Poids

Les poids déterminent la contribution d’une réponse ou d’un groupe de réponses au pointage. Ils peuvent être :

- Fixes : un poids numérique.
- Ajustables : un champ d’aide ou une réponse cible, avec une correspondance entre chaque clé de pointage et un poids.
- Tableau de scénarios ajustables : un poids de base et plusieurs scénarios de dépendance, chacun associant des clés de pointage à des poids.

Les conditions peuvent cibler des champs d’aide ou des réponses. Un champ d’aide doit figurer dans la liste des champs disponibles pour le type d’entité. Une réponse est désignée par les codes de section, de sous-section et de question.

Pour les poids ajustables, si aucune correspondance ne s’applique pendant l’examen, le calcul utilise le premier élément disponible. La contribution peut alors être nulle selon les valeurs configurées. Définissez une correspondance explicite pour chaque réponse ou valeur d’aide attendue.

## Dépendances {#dependances}

Les dépendances sont des règles qui affichent ou appliquent une partie de l’évaluation seulement lorsqu’une condition est remplie. Par exemple, une question sur la gestion des partenaires peut dépendre d’une réponse précédente indiquant que des partenaires réaliseront le projet. Une règle peut être une condition simple ou un groupe de conditions. Chaque condition contient :

- Type de dépendance: champ d’aide ou réponse.
- Champ d’aide cible ou chemin de réponse.
- Type de valeur: booléen, nombre ou texte.
- Valeur attendue.

Une condition sur un champ d’aide doit utiliser le type de valeur prévu pour ce champ. Pour les évaluations de demandeur ou de destinataire, les champs disponibles comprennent les identifiants, les numéros d’entreprise, le sous-type, l’agence responsable, l’agent responsable, les noms légaux, les noms d’organisme de recherche, le SCIAN et le statut.

Les dépendances sur réponse utilisent les codes indépendants de la langue de section, sous-section et question. Renommez ces codes avec prudence.

## Résultats et stratégies {#resultats-et-strategies}

Les résultats d’évaluation sont configurés dans la section Résultats. Chaque résultat contient :

- Code indépendant de la langue.
- Libellé anglais et français.
- Une ou plusieurs stratégies.

Chaque stratégie contient :

- Code indépendant de la langue.
- Libellé anglais et français.
- Options.

Chaque option de stratégie contient :

- Seuil maximal de pointage.
- Valeur stockée.
- Libellé anglais et français.

Les résultats et les stratégies relient le pointage aux décisions ou aux choix de suivi configurés par le programme. Par exemple, les administrateurs peuvent définir des libellés pour les niveaux de suivi nécessaires après un examen de capacité. Le réglage de la section Général permet de désactiver les résultats personnalisés pendant l’examen.

## Facteurs d’impact {#facteurs-d-impact}

Les facteurs d’impact ajustent ou classent les résultats selon des valeurs d’aide ou de réponse. Chaque facteur contient :

- Poids.
- Libellé anglais et français facultatif.
- Cible de dépendance.
- Lignes de matrice de pointage.

Chaque ligne de pointage contient un seuil maximal et une valeur numérique. Changer une cible modifie la définition publiée et exige une nouvelle version entière.

## Déroulement de l’évaluation {#flux-d-evaluation-en-execution}

Lorsqu’un examen est créé à partir de la configuration du volet, sa page d’évaluation présente le contenu publié du schéma. Les examinateurs répondent aux questions. Les éléments calculés utilisent les réponses ou les champs d’aide; les dépendances déterminent les parties applicables; les matrices et les résultats résument l’évaluation.

Les pages d’évaluation en exécution peuvent inclure :

- Questions du schéma et options de réponse.
- Sommaires de pointage.
- Sélection d’un résultat ou affichage du résultat calculé.
- Commentaires d’examinateur.
- Gestion d’examinateurs additionnels sauf si désactivée par le schéma.
- Alignement sauf si désactivé par le schéma.
- Parcours d’approbation lorsque l’examen créé utilise un modèle d’approbation.
- Action permettant de terminer l’examen.

![Éditeur de schéma d’évaluation](/screenshots/fr/assessment-schema-editor.png)

_Capture réelle de l’environnement de développement avec des données de démonstration. Les dossiers affichés sont des exemples; ils ne sont pas créés dans une nouvelle installation._

![Flux d’évaluation d’exécution](/screenshots/fr/runtime-assessment.png)

_Capture réelle de l’environnement de développement avec des données de démonstration. Les dossiers affichés sont des exemples; ils ne sont pas créés dans une nouvelle installation._

## Terminer l’examen {#comportement-de-completion}

Utilisez la section d’achèvement pour terminer l’examen ou vérifier s’il est déjà terminé. Elle affiche :

- Renseignements sur l’achèvement : personne ayant terminé l’examen, date et commentaire.
- Zone de commentaire et action permettant de terminer l’examen lorsque l’utilisateur y est autorisé et que le dossier n’est pas verrouillé.
- Message de verrouillage lorsque l’état de la page empêche de terminer l’examen.

Terminer l’examen enregistre vos commentaires. Pour un examen commun, cette action peut aussi enregistrer les réponses de l’évaluation. Vous devez avoir la permission d’enregistrer l’évaluation pour terminer l’examen.

## Approbations {#comportement-d-approbation}

Lorsqu’une évaluation ou un examen a un modèle d’approbation, terminer l’examen ou atteindre l’étape pertinente du flux crée la feuille d'acheminement selon les versions déjà retenues pour cet examen. La feuille d'acheminement énumère les étapes d’approbation; la section d’approbation consigne les décisions par feuille d'acheminement et par étape.

Les approbateurs peuvent :

- Voir les feuilles d'acheminement courantes et précédentes.
- Réattribuer une étape courante avec la permission de gestion d’approbation.
- Approuver ou refuser une étape courante sur laquelle ils peuvent agir.
- Remplir les certifications requises pendant l’approbation.
- Fournir un commentaire obligatoire lors d’un refus.
- Agir au nom d’un autre utilisateur lorsque l’approbateur affecté diffère de l’approbateur par défaut ou lorsqu’un type « au nom de » est sélectionné.

Si un type « au nom de » exige les détails de l’approbation réelle, l’approbateur doit saisir le titre de poste réel et la date de décision.

## Conseils pratiques {#conseils-operationnels}

Vous devez avoir la permission de modifier l’agence active pour enregistrer, publier ou retirer ses schémas. Si vous ne pouvez pas accéder au schéma, l’application répond comme s’il n’existait pas. Vérifiez votre accès à l’agence avant de réessayer.

Si la validation signale une dépendance brisée, un champ d’aide inconnu, un code en double, un cycle de calcul ou un état de publication invalide, corrigez l’élément indiqué et enregistrez avant de publier. Un schéma retiré ne peut plus être modifié ni publié. Si l’ouverture ou la publication signale `ASSESSMENT_DEFINITION_INVALID`, demandez à un administrateur de réparer la définition enregistrée. Réessayer sans correction ne résout pas le problème.

Utilisez ces pratiques pour des schémas stables :

- Traitez les codes indépendants de la langue comme des identifiants durables.
- Publiez les changements de schéma avant d’attendre que les nouveaux travaux d’exécution les utilisent.
- Évitez de supprimer ou renommer des codes que des réponses d’exécution existantes pourraient référencer.
- Gardez les valeurs d’option, seuils de matrice, cotes de risque et seuils de résultat cohérents.
- Configurez les dépendances d’aide seulement avec des champs disponibles pour le type d’entité du schéma.
- Testez les éléments calculés après l’ajout de dépendances, car les références manquantes et les cycles sont des erreurs de validation.
- Configurez les modèles d’approbation et les utilisateurs par défaut avant d’associer les modèles aux membres de la configuration d’examen.
