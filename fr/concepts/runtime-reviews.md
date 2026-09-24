# Examens en cours d'exécution

Les examens en cours d'exécution sont les évaluations et les listes de vérification créées à partir d'une configuration d'examen publiée. Ils appartiennent à un ensemble d'examens d'un enregistrement source, utilisent des versions figées du schéma et de la configuration et peuvent faire partie d'un [flux de travail](workflows.md). Ce guide décrit le traitement; les administrateurs conçoivent les modèles dans [Schémas d'évaluation](../programs/assessment-schemas.md) et [Schémas de listes de vérification](../programs/checklist-schemas.md).

## Ouvrir et parcourir un examen

Ouvrez un examen dans la zone Examens ou Flux de travail de l'enregistrement source. Les évaluations utilisent `/assessments/{reviewId}` et les listes de vérification, `/checklists/{reviewId}`. La page affiche le nom localisé du schéma, le nom de l'enregistrement source, le statut de l'examen et la version figée du schéma. La barre latérale indique l'avancement de chaque section et offre les éléments Examinateurs additionnels et Achèvement.

L'accès est résolu de l'examen à son ensemble, puis à l'entité propriétaire exacte : promoteur, enfant d'entente ou autre entité d'exécution prise en charge. La lecture exige la permission applicable de lire les évaluations; l'enregistrement exige celle de sauvegarder les évaluations. L'attribution d'un examen ou d'une approbation détermine l'admissibilité à agir, mais ne donne pas accès à l'enregistrement source.

Le serveur répond introuvable lorsque l'identifiant manque, est supprimé, correspond au mauvais type d'examen ou ne se résout plus par un propriétaire valide. Les ressources inaccessibles sont masquées selon les règles d'autorisation établies.

## Créer et gérer les ensembles d'examens

Le registre des entités déclare la prise en charge des examens directs, résolue depuis le propriétaire exact. Les routes `/api/review-sets` couvrent les promoteurs, ententes et enfants pris en charge, dont les réclamations et clôtures. Les entités qualifiées d’extensions enregistrées peuvent participer si leur capacité de cycle de vie déclare les examens directs. La capacité ne contourne ni la résolution du propriétaire ni les permissions ou protections; une cible non prise en charge produit `UNSUPPORTED_REVIEW_ENTITY_TYPE`.

Le tableau des ensembles de l'enregistrement source utilise `GET /api/review-sets` avec `entityType`, `entityId`, la pagination et une recherche facultative protégée comme texte littéral dans l'identifiant et le nom anglais ou français figé de la configuration. Chaque ligne est reconstruite à partir de l'instantané d'exécution et comprend ses examens enfants non supprimés; l'agence affichée provient du premier examen matérialisé.

Avant la création, `GET /api/review-sets/lookups/setups` retourne seulement les configurations actives et publiées qui :

- visent le type d'entité demandé;
- correspondent à la portée exacte applicable;
- contiennent uniquement des schémas actifs d'évaluation ou de liste de vérification appartenant à l'agence propriétaire de la cible;
- demeurent accessibles avec la permission de mise à jour de l'entité source.

Pour un promoteur, les portées applicables sont son profil exact et les volets atteints par des ententes actives de son agence responsable. Pour un enfant d'entente, elles sont l'entente parente exacte et le volet actif actuel de cette entente. La recherche porte sur les noms bilingues de configuration, d'agence et de volet.

`POST /api/review-sets` exige l'accès de mise à jour de la source, puis renouvelle l'autorisation et verrouille le graphe actuel de propriété et de portée ainsi que l'instantané de configuration. Il rejette une configuration inadmissible ou non publiée et n'autorise qu'un ensemble non supprimé pour la même configuration et la même cible tant qu'un ensemble antérieur possède un statut non terminal bloquant. La création consigne atomiquement la configuration et les versions de schéma publiées dans le moteur canonique et ses éléments. Un plan séquentiel active le prochain membre admissible; un plan parallèle active ses membres admissibles ensemble. Les membres en attente et le travail actif ont des états distincts.

Un utilisateur autorisé à mettre à jour peut annuler un ensemble non terminal au moyen de `POST /api/review-sets/{reviewSetId}/cancel`. La route résout la cible à partir de l'ensemble, renouvelle l'autorisation de propriété dans la transaction protégée, annule l’exécution et ses enfants inachevés. Elle ne supprime pas les dossiers historiques. Les états d’exécution terminaux (`succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled`, `failed`) refusent l’annulation.

## Remplir une évaluation

Une évaluation affiche la définition publiée qui a été figée lors de sa matérialisation. Parcourez ses sections et sous-sections :

- Répondez aux questions numériques applicables et ajoutez des commentaires lorsque la politique configurée l'exige.
- Les dépendances déterminent les questions et calculs applicables. Les valeurs calculées sont dérivées et ne sont pas acceptées comme saisie utilisateur faisant autorité.
- Le sommaire d'exécution calcule les notes de section, la note pondérée, le résultat global, les résultats générés et l'état de préparation à l'achèvement à partir de la matrice et des aides figées.
- Pour les résultats générés, acceptez la stratégie recommandée ou choisissez une autre stratégie configurée. Une stratégie différente exige une justification; un commentaire peut aussi être ajouté.
- Ajoutez des résultats personnalisés seulement si la configuration les permet.
- Consignez l'alignement de l'examen, son résultat numérique et son texte seulement si l'alignement est activé.

**Enregistrer** valide la section active et conserve la réponse normalisée complète dans une transaction dont l'autorisation est réévaluée. Enregistrer ne signifie pas achever : les réponses obligatoires incomplètes peuvent demeurer en cours. Lorsque l'examen ou son ensemble est terminé, refusé ou annulé, la page est verrouillée et aucune autre modification des réponses n'est acceptée.

## Remplir une liste de vérification

Une liste de vérification présente les questions bilingues figées, groupées par section et sous-section. Choisissez **Réussite** ou **Échec**, ou **Sans objet** lorsque la question le propose. Un commentaire peut être facultatif, toujours obligatoire, obligatoire en cas d’échec, obligatoire pour Sans objet ou obligatoire dans ces deux derniers cas. La barre latérale affiche le nombre de réponses et le résultat courant. Une question obligatoire exige toujours une des réponses configurées; Sans objet est une réponse explicite, pas une question laissée vide.

Le résultat est toujours évalué par le serveur à partir de l'arbre de règles figé. Il peut être `pass`, `fail` ou `pass_with_considerations`. **Expliquer** montre les groupes correspondants et les questions déclencheuses; cette vue explique le calcul déterministe, elle ne permet pas de modifier le résultat. Un enregistrement normal valide des clés de question connues et uniques, mais permet un travail obligatoire incomplet. L'achèvement applique les règles plus strictes sur les réponses et commentaires obligatoires.

## Examinateurs additionnels

Lorsque le schéma n'a pas désactivé les examinateurs, la section Examen peut suivre leur intervention :

1. Une personne ayant la permission d'enregistrer les évaluations ajoute un responsable parmi les utilisateurs Common actifs de l'agence du schéma. La création commence toujours avec un commentaire vide.
2. Seul l'utilisateur Common assigné peut modifier le commentaire, réattribuer la ligne à un autre utilisateur admissible de l'agence ou la marquer terminée. La ligne doit être incomplète et l'examen parent déverrouillé.
3. Une personne ayant la permission de supprimer un enfant d'évaluation peut supprimer logiquement une ligne pendant que l'examen est déverrouillé.

La liste affiche le total et les lignes actives. L'achèvement de l'examen principal est bloqué tant que chaque ligne non supprimée n'est pas terminée ou retirée. L'attribution demeure une règle d'action, pas une permission sur l'enregistrement source. Toutes les mutations résolvent de nouveau la propriété, la permission, l'attribution et l'état de verrouillage dans la transaction.

## Achever, approuver et faire avancer

Utilisez la section Achèvement seulement lorsque les réponses sont prêtes. L'achèvement revalide l'ensemble de l'évaluation ou de la liste figée avec les règles strictes, refuse les examinateurs additionnels en attente, consigne l'utilisateur Common, l'heure et les commentaires, puis verrouille l'examen comme terminé dans une seule transaction. Si le membre d'examen possède un modèle d'approbation, sa feuille de route est ensuite traitée dans la section d'approbation ordinaire.

L'ensemble d'examens avance selon l'ordre et la politique de ses membres publiés. La réussite de l'examen et de son approbation passe au membre suivant. Un membre refusé peut terminer ou refuser l'ensemble selon ses règles d'exécution; lorsque l'ensemble appartient à un flux, une réussite terminale fait avancer le flux et un échec le fait échouer. Les enregistrements historiques continuent d'utiliser leurs versions figées.

La reprise crée une tentative suivante sans rouvrir les lignes historiques. La route de clonage direct exige une exécution autonome `review_set` terminale et un examen demandé à l’état `denied`, `cancelled`, `failed` ou `unsuccessful`. Elle copie le plan figé dans un nouvel ensemble, crée des examens et conteneurs de réponses neufs, et conserve la filiation. Une demande concurrente répétée retrouve le même successeur sans multiplier les tentatives. Un examen appartenant à un flux utilise plutôt la reprise de ce flux.

Par exemple, après l’échec d’un ensemble autonome de listes, une personne autorisée peut reprendre l’examen sans succès dans une nouvelle tentative. Les réponses et décisions originales restent historiques; remplissez le successeur au lieu de modifier le dossier échoué. La propriété, l’affectation et les protections d’état du parent restent applicables.

## Définitions historiques invalides

Une exécution utilise sa définition d’évaluation figée. Le serveur accepte une définition réellement non rédigée comme vide et fournit des matrices facultatives vides pour les anciennes définitions compatibles. Il ne remplace pas silencieusement un contenu rédigé mal formé par une évaluation vide : le chargement retourne `ASSESSMENT_DEFINITION_INVALID` (500). Notez l’identifiant de l’examen et signalez le problème au responsable de l’application. N’achevez pas un remplacement apparemment vide et ne modifiez pas le schéma courant en pensant réparer la version historique figée.

## Rétablissement

Si l'enregistrement ou l'achèvement n'est pas offert, vérifiez les permissions et l'état verrouillé de la page, terminez ou retirez les examinateurs additionnels en attente et remplissez chaque réponse, commentaire, justification de résultat et valeur d'alignement obligatoire. Rechargez la page après l'intervention d'un autre examinateur ou approbateur afin d'obtenir les comptes et l'état courants. Ne tentez pas de réparer une réponse historique figée en modifiant son schéma courant; publiez les changements pour les prochains examens et utilisez l'action de reprise prise en charge lorsqu'elle est offerte.

Consultez [Approbations et achèvements](approvals-completions.md), [Flux de travail](workflows.md) et [RBAC](rbac.md).
