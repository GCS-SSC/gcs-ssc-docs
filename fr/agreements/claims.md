# Réclamations et rapprochement d’entente

Les réclamations consignent les coûts reçus pour une période financière de l’entente. Les rapprochements sont des dossiers distincts, attribués à un examinateur, qui évaluent les lignes soumises, consignent les montants rapprochés et échantillonnés et peuvent être désignés comme rapprochement final de la réclamation.

## Avant de commencer

Ouvrez une entente, puis sélectionnez **Réclamations**. L’entente doit posséder une version budgétaire courante avec au moins un exercice et une ligne budgétaire. Les références de la réclamation et de ses lignes utilisent les identités budgétaires stables; une modification peut donc remplacer la version courante sans changer leurs identifiants logiques.

| Action | Accès requis |
| --- | --- |
| Parcourir les réclamations, ouvrir les détails et consulter les soumissions ou les rapprochements | Plafond Entente Lecteur; aucune affectation exacte. |
| Créer une réclamation | Plafond Contributeur et affectation exacte à l’entente; le créateur devient principal de la réclamation. |
| Créer ou modifier des lignes; attribuer, soumettre, retirer, annuler ou modifier une réclamation | Plafond Contributeur et affectation exacte à la réclamation. |
| Créer un rapprochement | Plafond Contributeur et affectation exacte à la réclamation; le créateur devient principal du rapprochement. |
| Créer ou modifier des lignes de rapprochement; achever ou changer l’indicateur final | Plafond Contributeur et affectation exacte au rapprochement. |
| Supprimer une réclamation ou une ligne par son API | Plafond Gestionnaire et affectation exacte à la réclamation. |
| Supprimer un rapprochement ou une ligne de rapprochement par son API | Plafond Gestionnaire et affectation exacte au rapprochement. |

Lecteur Entente consulte les réclamations. La création d’une réclamation exige Contributeur et l’affectation exacte à l’entente, puis rend le créateur principal. La création d’un rapprochement exige Contributeur et l’affectation exacte à la réclamation, puis rend le créateur principal du rapprochement. Les mutations suivantes exigent l’affectation à la réclamation ou au rapprochement et Contributeur ou Gestionnaire. Un volet, budget, une soumission ou une autre entente n’élargit pas la frontière; les écritures prennent des verrous ordonnés et reconstruisent l’autorisation.

## Parcourir et créer des réclamations

L’onglet Réclamations regroupe les lignes selon le libellé de l’exercice courant. Il affiche l’identifiant de chaque réclamation, la période d’avril à mars, l’état, le total soumis et la somme de toutes les lignes de rapprochement actives associées à la réclamation. La recherche porte sur l’exercice, l’identifiant, la période et l’état localisés ou l’un des totaux affichés.

Les boutons de modification et de suppression du groupe agissent actuellement sur la première réclamation du groupe d’exercice. Ouvrez une réclamation précise à partir de sa propre ligne pour travailler sans ambiguïté. Lorsque plusieurs réclamations partagent un exercice, ne supposez pas qu’une action de groupe vise la ligne que vous consultiez.

| Champ de la réclamation | Règle |
| --- | --- |
| Exercice | Identité stable obligatoire d’un exercice de la version courante du budget de l’entente. |
| Date de réception | Date et heure obligatoires; le formulaire recueille une date civile. |
| Début et fin de la période | Indices obligatoires de `0` (avril) à `11` (mars); la fin ne peut précéder le début. |
| Finale pour l’exercice | Indicateur booléen obligatoire et descriptif; la base de données ne limite pas un exercice à une seule réclamation ainsi marquée. |

Une réclamation créée par le noyau commence à l’état `draft`. Son en-tête ne peut être modifié ou supprimé logiquement que pendant qu’il est modifiable. Sa suppression marque aussi logiquement ses lignes, ses rapprochements et leurs lignes dans la même transaction; les lignes historiques demeurent dans la base.

Un changement d’exercice valide l’exercice courant de destination, mais ne migre ni ne revérifie les lignes existantes. Des lignes attribuées à l’ancien exercice peuvent disparaître de la grille Soumission tout en restant rattachées à la réclamation et admissibles au rapprochement. Ne changez pas l’exercice après la saisie des lignes. Si cela s’est produit, arrêtez le traitement et rapprochez les lignes masquées au moyen d’un examen de données autorisé avant la soumission.

## Préparer la soumission

L’onglet **Soumission** regroupe les lignes budgétaires de l’exercice courant selon la catégorie de coûts bilingue et la sous-section. Il affiche les montants soumis, rapprochés et le solde. La recherche porte sur la catégorie, la sous-section, le nom bilingue de la ligne ou sa description.

Saisissez le montant soumis de chaque ligne requise, puis sélectionnez **Enregistrer la soumission**. Une nouvelle cellule à zéro est ignorée; une cellule non nulle crée une ligne de réclamation en dollars canadiens. Une cellule existante est modifiée lorsque son montant change. La page envoie une requête par ligne modifiée, en séquence, plutôt qu’une transaction globale. Si une requête tardive échoue, les lignes précédentes restent enregistrées; actualisez la page, comparez chaque ligne et ne reprenez que les corrections manquantes.

L’API hôte prend aussi en charge la description, la devise, les libellés soumis facultatifs de catégorie, sous-section et ligne, le déplacement vers une autre réclamation modifiable et la suppression logique. Ces commandes CRUD complètes ne sont pas montées dans la grille actuelle. La base dérive l’entente de chaque ligne à partir de sa réclamation et utilise des clés étrangères composites pour garder toute ligne budgétaire sélectionnée dans cette entente.

Aucune contrainte d’unicité active n’existe pour `(réclamation, ligne budgétaire)`. Une API directe ou une importation peut donc créer des doublons. Pendant que la réclamation est modifiable, la grille utilise la première ligne correspondante; une fois verrouillée, elle affiche séparément les lignes multiples. Évitez les lignes logiques en double et rapprochez-les avant la soumission.

### Lignes importées non attribuées

L’extension [Intégration de GC Forms](../extensions/gc-forms.md) peut matérialiser atomiquement une réclamation et zéro ou plusieurs lignes. Elle crée directement la réclamation à l’état `submitted`, consigne un UUID unique de la soumission source et des liens de destination, puis empêche une seconde matérialisation. Une ligne source qui ne peut correspondre à une ligne budgétaire courante peut rester non attribuée avec ses libellés soumis.

La page principale affiche ces lignes et permet à un utilisateur ayant le plafond de rôle Entente Contributeur et l’affectation exacte à la réclamation d’attribuer chacune à une ligne budgétaire courante compatible pendant que la réclamation est `draft` ou `submitted`. Pour une réclamation soumise, cette attribution unique de la valeur nulle vers une ligne budgétaire est la seule modification permise. Le rapprochement ne peut commencer tant que toutes les lignes actives ne sont pas attribuées.

## Soumettre, retirer ou annuler

Sélectionnez **Prête pour l’examen** pour faire passer une réclamation en brouillon à `submitted`. Le serveur exige au moins une ligne active et aucune ligne non attribuée. Il n’impose aucun maximum par rapport au budget, aucun total positif et aucune ligne unique par coordonnée budgétaire.

Une réclamation `submitted` peut être retirée seulement avant la création de tout rapprochement actif. Le retrait écrit `withdrawn`; il ne ramène pas la réclamation en brouillon. Une réclamation qui n’est plus en brouillon et qui n’est pas déjà `withdrawn` ou `cancelled` peut être annulée, même après le début du rapprochement. L’annulation écrit `cancelled`. Ces deux états sont terminaux et verrouillés dans la page principale.

Le cycle de vie reconnu par cette fonction est :

`draft` → `submitted` → `inreview` → `reviewed`

Une réclamation `submitted` peut plutôt devenir `withdrawn`; la plupart des états autres que brouillon peuvent devenir `cancelled`. La création ou la modification d’un rapprochement fait passer les états parents admissibles à `inreview`. L’approbation d’un rapprochement final fait passer la réclamation à `reviewed`; l’approbation d’un rapprochement non final et le refus la laissent à `inreview`.

## Créer et comparer les rapprochements

L’onglet **Rapprochement** devient accessible lorsque la réclamation est `submitted`, `inreview`, `reviewed` ou `complete`, ou lorsqu’un historique de rapprochement existe déjà. La création exige que toutes les lignes soient attribuées et qu’aucun rapprochement final approuvé n’existe. Le serveur inscrit l’utilisateur commun courant comme examinateur, crée un rapprochement `draft` et fait passer la réclamation à `inreview`.

Plusieurs rapprochements actifs peuvent exister. La page les classe du plus récent au plus ancien et affiche l’examinateur, l’état, l’indicateur final, le total rapproché, le total échantillonné et le solde soumis moins rapproché. Sélectionnez une ligne pour la consulter et la modifier. Un seul rapprochement actif par réclamation peut avoir `isfinal = true`; la validation de l’application et un index unique partiel de la base l’imposent. Lorsqu’un rapprochement final est refusé, le moteur d’approbation efface son indicateur final afin qu’un autre puisse être désigné.

Pour chaque ligne de réclamation, une ligne de rapprochement contient :

| Champ | Contrat |
| --- | --- |
| Montant rapproché | Valeur `numeric(19,2)` obligatoire. |
| Montant échantillonné | Valeur `numeric(19,2)` facultative; la grille envoie zéro lorsqu’elle conserve sa valeur par défaut. |
| Justification | Texte libre facultatif. |

Une seule ligne active de rapprochement peut viser une ligne de réclamation donnée dans le même rapprochement. Des clés étrangères composites garantissent leur appartenance à la même réclamation. Lorsque l’utilisateur sélectionne **Enregistrer le rapprochement**, la grille crée ou modifie chaque ligne de réclamation en séquence. Une erreur tardive peut produire un rapprochement partiel; actualisez et comparez toutes les lignes avant l’achèvement.

Les champs de l’interface ont un minimum de zéro, mais les schémas d’API partagés emploient des validateurs monétaires signés et la base n’a aucune contrainte de non-négativité pour les montants soumis, rapprochés ou échantillonnés. Le serveur n’exige pas non plus que le total rapproché égale le total soumis, que l’échantillon ne dépasse pas le montant rapproché, qu’une justification soit fournie ou que la réclamation respecte le budget. Le solde affiché est informatif et non une règle d’achèvement.

Les modifications d’en-tête ou de ligne font passer un rapprochement non verrouillé à `inprogress` et les réclamations parentes admissibles à `inreview`. L’API peut déplacer une ligne vers un autre rapprochement modifiable et supprimer logiquement les rapprochements et leurs lignes; la page de détails actuelle n’expose aucune de ces suppressions.

## Achèvement, approbation et flux de travail

Le rapprochement sélectionné présente les commandes Achèvement et Flux de travail. L’achèvement exige le plafond de rôle Entente Contributeur et l’affectation exacte au rapprochement, un rapprochement modifiable, aucun rapprochement final déjà approuvé pour la réclamation, aucun achèvement existant et au moins une ligne active. Il ne valide ni les totaux ni l’indicateur final.

En cas de réussite, la transaction consigne le commentaire et l’utilisateur communs d’achèvement, fait passer directement le rapprochement à `complete`, démarre tout flux `fundingclaimreconcile` applicable, valide la transaction, puis émet le hook d’achèvement. La réclamation parente demeure `inreview`. L’achèvement ne consulte aucun modèle d’approbation et ne crée aucune feuille d’acheminement.

Une API générique d’approbation distincte existe pour les intégrations autorisées. Un appelant explicite peut matérialiser le modèle `fundingclaimreconcile` valide du volet et faire passer un rapprochement achevé ou autrement modifiable à `pendingapproval`. Les approbateurs affectés doivent posséder l’accès ordinaire à l’entente exacte. L’approbation produit `approved`; le refus produit `denied`, efface `isfinal` et laisse la réclamation à `inreview`. L’approbation d’un rapprochement final fait passer la réclamation à `reviewed` et bloque toute nouvelle création, modification, achèvement ou désignation finale de rapprochement.

La page actuelle de la réclamation ne monte aucune section d’approbation et l’achèvement n’appelle pas cette API. La simple configuration d’un modèle d’approbation de rapprochement ne soumet donc pas à l’approbation les rapprochements créés dans l’interface principale.

## États verrouillés et reprise

Les modifications ordinaires de l’en-tête et des lignes de réclamation sont verrouillées aux états `submitted`, `inreview`, `reviewed`, `withdrawn` et `cancelled`, sauf l’attribution unique d’une ligne non attribuée pendant l’état `submitted`. Les rapprochements sont verrouillés à `complete`, `pendingapproval`, `approved` et `denied`; un achèvement conservé interdit aussi les modifications.

En cas d’échec d’un enregistrement, actualisez avant de réessayer, car les écritures des grilles ne sont pas atomiques. Si la soumission est refusée, vérifiez qu’au moins une ligne existe et que toutes les lignes importées sont attribuées. Si la désignation finale est refusée, examinez l’autre rapprochement portant déjà cet indicateur. Lorsqu’un rapprochement final approuvé existe, considérez la réclamation comme fermée; le noyau n’offre aucune action de réouverture.

## Contrat de développement

La famille principale compte 16 gestionnaires limités à l’entente : aperçu; création, modification, suppression, préparation pour l’examen, retrait et annulation d’une réclamation; création, modification et suppression d’une ligne de réclamation; création, modification et suppression d’un rapprochement; création, modification et suppression d’une ligne de rapprochement. Les données de détails proviennent de l’aperçu plutôt que d’une route GET propre à la réclamation. Les corps utilisent les schémas Zod localisés partagés et la réponse normalisée `VALIDATION_FAILED`.

Les identifiants de réclamation et d’enfants sont des valeurs PostgreSQL `bigint` retournées comme chaînes; les références budgétaires stables sont des UUID. Les identifiants de rapprochement sont des identités polymorphes `Common_Entity` enregistrées sous le type `fundingclaimreconcile`, ce qui permet l’acheminement commun des achèvements, approbations, flux de travail et onglets d’extension. La suppression logique est utilisée partout. Les verrous d’agrégat suivent l’ordre des identités de l’entente, de la réclamation et du rapprochement afin de sérialiser les mutations et la vérification de l’indicateur final.

Consultez [Budget de l’entente](./budget.md), [Prévisions](./forecasts.md), [Paiements](./payments.md), [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).
