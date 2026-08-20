# Schemas D Evaluation

Les schemas d evaluation definissent les questions structurees, matrices de pointage, dependances, valeurs calculees, resultats et facteurs d impact utilises par les examens d evaluation en execution. Dans les paiements de transfert, les administrateurs ouvrent l editeur depuis les configurations d examen de volet ou les lignes d ensemble d evaluation qui referencent un schema d evaluation.

Le schema lui-meme est porte par l agence. Un schema utilise par un volet doit appartenir a l agence du volet et correspondre au type d entite d execution configure.

## Prerequis Dans Une Installation Vide

Avant qu un volet puisse utiliser des schemas d evaluation en operation, configurez:

- Agence et programme de paiement de transfert.
- Volet.
- Schemas d examen communs pour l agence et le type d entite, avec type d examen evaluation.
- Configurations d examen de volet ou ensembles d evaluation qui referencent ces schemas.
- Modeles d approbation si la completion de l evaluation ou les etapes d examen exigent une route d approbation.
- Utilisateurs disposant des rôles de portée et des affectations exactes d’entité ou de flux nécessaires pour lire, enregistrer, terminer et approuver le travail généré.

## Ou Ouvrir Les Schemas

Un schema est ouvert dans un contexte de volet, habituellement depuis les configurations d examen ou une surface de gestion des ensembles d evaluation. Le fil d Ariane retourne par le programme et le volet. L editeur charge:

- Profil de paiement de transfert parent.
- Volet parent.
- Schema d evaluation.
- Contenu effectif du schema et matrice de pointage.
- Champs d aide disponibles pour le type d entite du schema.

L editeur a un sommaire repliable et une barre laterale avec controles de sauvegarde et navigation par section.

## Etats Du Cycle De Vie

Les schemas d evaluation utilisent ces etats:

- Brouillon: etat modifiable avant activation. Un brouillon peut etre active.
- Actif: etat courant utilisable. Les schemas actifs peuvent recevoir des modifications de copie de travail et etre publies lorsqu il y a un changement en attente.
- Inactif: conserve mais non courant pour modification/utilisation.

Le sommaire affiche le nom du schema, le type d entite, la version, le statut et la presence de contenu en attente de publication.

## Activation

L activation est permise seulement pour un schema brouillon. Activer un brouillon:

- Met le statut a actif.
- Met la version a `1`.
- Copie la matrice de pointage et la definition effectives dans les champs publies.
- Efface la matrice et la definition de copie de travail.

Apres activation, les nouveaux travaux d evaluation peuvent utiliser la version publiee du schema.

## Publication

La publication est permise seulement pour un schema actif avec une copie de travail differente de la copie publiee. Publier:

- Calcule si le changement est majeur, mineur ou nul.
- Met a jour la matrice de pointage publiee et la definition publiee.
- Efface la copie de travail.
- Met a jour la version lorsque le contenu a change.

Comportement de version:

- Les changements structurels sont majeurs. Ajouter, supprimer ou renommer des sections, sous-sections, questions, resultats ou cibles de facteurs d impact change la signature structurelle.
- Les changements non structurels sont mineurs. Exemples: libelles, descriptions, pointages, seuils, aide, poids et options lorsque les noms et nombres structurels restent les memes.
- Une publication sans changement garde la meme version, mais les utilisateurs ne peuvent normalement pas publier lorsqu il n y a rien a publier.

Implication d execution: les evaluations d execution devraient utiliser le contenu publie. Modifier un schema actif cree ou met a jour une copie de travail jusqu a sa publication.

## Comportement De Sauvegarde

L editeur a une action de sauvegarde qui valide et sauvegarde a la fois les metadonnees generales et le contenu de definition:

| Zone | Contenu sauvegarde |
| --- | --- |
| General | Noms du schema, noms de resultat et indicateurs de desactivation. |
| Definition | Matrice de pointage globale et definition d evaluation. |

Si l une des zones echoue la validation, la sauvegarde est arretee et la premiere erreur est affichee. Si les deux sont valides, l editeur enregistre le schema et rafraichit les donnees.

## Section General

La section General capture:

- Nom anglais et nom francais du schema.
- Nom anglais et nom francais du resultat.
- Desactiver les resultats personnalises.
- Desactiver l alignement.
- Desactiver les examinateurs.

Les indicateurs de desactivation affectent l evaluation en execution:

- Desactiver les resultats personnalises limite la capacite de creer des resultats hors des resultats configures.
- Desactiver l alignement retire le comportement d alignement lorsque supporte.
- Desactiver les examinateurs retire le comportement d examinateurs additionnels lorsque supporte.

## Matrices De Pointage

La section Matrices contient:

- Matrice de pointage globale.
- Matrice de pointage par section.

Chaque ligne de matrice contient:

- Seuil de pointage maximal.
- Libelle anglais et francais.
- Couleur d indicateur, validee comme couleur hexadecimale.

Les matrices traduisent les pointages numeriques d evaluation ou de section en libelles et indicateurs visuels. Gardez les seuils ordonnes et sans chevauchement en pratique, meme si le modele stocke des seuils maximaux plutot qu une plage affichee.

## Sections

Les sections sont les groupes de premier niveau de l evaluation. Chaque section contient:

- Ordre/numero.
- Code independant de la langue.
- Libelle anglais et francais.
- Icone.
- Poids.
- Une ou plusieurs sous-sections.

Le code independant de la langue est important parce que les dependances et calculs referencent les codes de section, sous-section et question. Renommer des codes sur un schema actif est un changement structurel et peut briser les references si les elements dependants ne sont pas mis a jour.

## Sous-Sections

Les sous-sections regroupent les questions d une section. Chaque sous-section contient:

- Ordre/numero.
- Code independant de la langue.
- Libelle anglais et francais.
- Poids.
- Dependances optionnelles.
- Questions d evaluation et elements calcules.

Les dependances de sous-section controlent si la sous-section apparait ou participe selon des valeurs d aide ou des reponses precedentes. Les poids de sous-section peuvent etre fixes, ajustables ou un tableau de scenarios ajustables.

## Elements D Evaluation

Les elements d evaluation peuvent etre des questions directes ou des elements calcules.

Une question contient:

- Code independant de la langue.
- Texte anglais et francais de la question.
- Poids.
- Dependances optionnelles.
- Seuil de commentaire avec minimum et maximum.
- Type d assistance optionnel. La valeur actuellement supportee est l historique de financement.
- Options de reponse.
- Texte d aide.

Chaque option de reponse contient:

- Valeur numerique.
- Libelle anglais et francais.
- Description anglaise et francaise.

Les lignes d aide contiennent:

- Titre anglais et francais.
- Description anglaise et francaise.

## Elements Calcules

Un element calcule contient:

- Code independant de la langue.
- Libelle anglais et francais.
- Poids.
- Dependances optionnelles.
- Texte d aide.
- Formule.

La racine d une formule doit etre une operation. Les operateurs supportes comprennent add, subtract, multiply, divide, sum, average, min, max, round, clamp, coalesce, if, eq, ne, gt, gte, lt, lte, and, or et not.

Les operandes peuvent etre:

- Literal numerique.
- Literal booleen.
- Reference de reponse, avec code de section, sous-section et question.
- Reference de champ d aide.
- Operation imbriquee.

La validation rejette les formules qui referencent des elements inexistants, les champs d aide invalides et les cycles de calcul entre elements calcules.

## Poids

Les poids peuvent etre:

- Fixes: un poids numerique.
- Ajustables: une cible de dependance plus des correspondances cle de pointage vers poids.
- Tableau de scenarios ajustables: poids de base plus plusieurs scenarios de dependance, chacun avec des correspondances cle de pointage vers poids.

Les cibles de dependance peuvent etre des champs d aide ou des chemins de reponse. Les cibles d aide sont validees contre le registre du type d entite. Les cibles de reponse utilisent les codes de section, sous-section et question.

Pour les poids ajustables, si aucune correspondance ne s applique en execution, la logique retombe sur le premier element disponible, ce qui peut produire une contribution nulle selon les valeurs configurees. Les administrateurs devraient definir des correspondances explicites pour chaque valeur attendue.

## Dependances

Les dependances controlent la visibilite ou l applicabilite conditionnelle. Une regle peut etre une condition simple ou un groupe de conditions. Chaque condition contient:

- Type de dependance: champ d aide ou reponse.
- Champ d aide cible ou chemin de reponse.
- Type de valeur: booleen, nombre ou texte.
- Valeur attendue.

Les valeurs de dependance sur champ d aide sont typees selon la definition du champ. Pour les evaluations de demandeur/destinataire, les champs disponibles comprennent les identifiants, numeros d entreprise, sous-type, agence responsable, agent responsable, noms legaux, noms d organisme de recherche, SCIAN et statut.

Les dependances sur reponse utilisent les codes independants de la langue de section, sous-section et question. Renommez ces codes avec prudence.

## Resultats Et Strategies

Les resultats d evaluation sont configures dans la section Resultats. Chaque resultat contient:

- Code independant de la langue.
- Libelle anglais et francais.
- Une ou plusieurs strategies.

Chaque strategie contient:

- Code independant de la langue.
- Libelle anglais et francais.
- Options.

Chaque option de strategie contient:

- Seuil maximal de pointage.
- Valeur stockee.
- Libelle anglais et francais.

Les resultats et strategies traduisent les resultats calcules en resultats d affaires. Les resultats personnalises en execution peuvent etre desactives par le reglage general.

## Facteurs D Impact

Les facteurs d impact ajustent ou classent les resultats selon des valeurs d aide ou de reponse. Chaque facteur contient:

- Poids.
- Libelle anglais et francais optionnel.
- Cible de dependance.
- Lignes de matrice de pointage.

Chaque ligne de pointage contient un seuil maximal et une valeur numerique. Les cibles des facteurs d impact font partie de la signature structurelle utilisee pour determiner si une publication est majeure ou mineure.

## Flux D Evaluation En Execution

Lorsque du travail d examen est genere depuis la configuration du volet, la page d evaluation en execution presente le contenu publie du schema. Les examinateurs repondent aux questions, les elements calcules derivent des valeurs des reponses ou champs d aide, les dependances determinent les portions applicables, et les matrices/resultats resumement l evaluation.

Les pages d evaluation en execution peuvent inclure:

- Questions du schema et options de reponse.
- Sommaires de pointage.
- Selection de resultat ou affichage de resultat calcule.
- Commentaires d examinateur.
- Gestion d examinateurs additionnels sauf si desactivee par le schema.
- Alignement sauf si desactive par le schema.
- Route d approbation lorsque l examen genere reference un modele d approbation.
- Action de completion.

![Editeur de schema d evaluation](/screenshots/fr/assessment-schema-editor.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._

![Flux d evaluation d execution](/screenshots/fr/runtime-assessment.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._

## Comportement De Completion

La completion en execution est geree par la section commune de completion. Elle charge l etat pour un type d entite et un identifiant, puis affiche:

- Metadonnees de completion: complete par, complete le et commentaire.
- Zone de commentaire et action de completion lorsque l utilisateur peut completer et que l entite n est pas verrouillee.
- Message verrouille lorsque la completion est bloquee par l etat de la page.

Soumettre la completion enregistre les commentaires et, pour une completion d examen commun, peut inclure la reponse d evaluation. L utilisateur doit pouvoir sauvegarder l evaluation avant que la completion soit enregistree.

## Comportement D Approbation

Lorsqu une evaluation ou un examen a un modele d approbation, la section commune d approbation peut materialiser et gerer des feuilles de route. Les approbations sont groupees par feuille de route et par etape.

Les approbateurs peuvent:

- Voir les feuilles de route courantes et precedentes.
- Creer une nouvelle feuille de route seulement lorsque permis et lorsque toutes les feuilles existantes sont refusees.
- Reattribuer une etape courante avec la permission de gestion d approbation.
- Approuver ou refuser une etape courante actionable.
- Completer les certifications requises pendant l approbation.
- Fournir un commentaire obligatoire lors d un refus.
- Agir au nom d un autre utilisateur lorsque l approbateur affecte differe de l approbateur par defaut ou lorsqu un type "au nom de" est selectionne.

Si un type "au nom de" exige les details reels, l approbateur doit saisir le titre de poste reel et la date de decision.

## Conseils Operationnels

Les opérations d'enregistrement, d'activation et de publication revérifient la chaîne active volet-programme-agence et l'accès précis `transfer_payment:update` dans une transaction actualisée. Un schéma inaccessible est masqué comme un schéma absent. L'activation échoue si le schéma n'est pas une ébauche valide; la publication échoue s'il n'est pas actif ou ne possède aucun contenu valide en attente. Lorsqu'une validation signale une dépendance brisée, un champ d'aide inconnu, un code en double, un cycle de calcul ou un état de publication invalide, gardez l'éditeur ouvert, corrigez la section ou l'élément référencé, enregistrez de nouveau, puis activez ou publiez.

Utilisez ces pratiques pour des schemas stables:

- Traitez les codes independants de la langue comme des identifiants durables.
- Publiez les changements de schema actif avant d attendre que les nouveaux travaux d execution les utilisent.
- Evitez de supprimer ou renommer des codes que des reponses d execution existantes pourraient referencer.
- Gardez les valeurs d option, seuils de matrice, cotes de risque et seuils de resultat coherents.
- Configurez les dependances d aide seulement avec des champs disponibles pour le type d entite du schema.
- Testez les elements calcules apres l ajout de dependances, car les references manquantes et les cycles sont des erreurs de validation.
- Configurez les modeles d approbation et utilisateurs par defaut avant d attacher les modeles aux membres de configuration d examen.
