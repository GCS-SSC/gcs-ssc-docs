# Examens en cours d'exécution

Un **examen en cours d’exécution** est l’évaluation ou la liste de vérification que vous remplissez pour un dossier précis, comme une réclamation. Un administrateur publie la configuration d’examen qui définit ce travail. Un **ensemble d’examens** regroupe les examens requis pour ce dossier. Chaque examen conserve les versions publiées du questionnaire, ou schéma, et de la configuration utilisées à sa création. Ce sont ses **versions figées**. Les examens peuvent aussi faire partie d’un [flux de travail](workflows.md). Ce guide explique comment faire l’examen; les administrateurs conçoivent les questionnaires dans [Schémas d’évaluation](../programs/assessment-schemas.md) et [Schémas de listes de vérification](../programs/checklist-schemas.md).

## Ouvrir et parcourir un examen

Ouvrez un examen dans la zone Examens ou Flux de travail de l'enregistrement source. Les évaluations utilisent `/assessments/{reviewId}` et les listes de vérification, `/checklists/{reviewId}`. La page affiche le nom localisé du schéma, le nom de l'enregistrement source, le statut de l'examen et la version figée du schéma. La barre latérale indique l'avancement de chaque section et offre les éléments Examinateurs additionnels et Achèvement.

L’accès à un examen dépend du dossier propriétaire de son ensemble, comme un promoteur ou un dossier lié à une entente. Pour lire un examen, vous devez avoir l'accès Lecteur dans sa portée propriétaire. Une affectation à l'examen ou à son dossier source ne remplace pas cet accès. Une affectation d'approbation peut permettre de lire l'examen précis nécessaire à la décision, sans donner accès au parent ni aux autres travaux. Les examens d'admission exigent toujours la lecture des dossiers de financement. L'enregistrement exige la permission Contributeur applicable et l'affectation au travail précis.

Un examen d'entente vous ramène à son entente propriétaire. Si le lien de retour conservé vise un autre dossier ou manque, le retour ouvre la section Cote de risque de cette entente. Le changement de langue conserve la destination dans la langue choisie.

Le serveur répond introuvable lorsque l'identifiant manque, est supprimé, correspond au mauvais type d'examen ou ne se résout plus par un propriétaire valide. Les règles d’autorisation peuvent aussi masquer les dossiers que vous n’avez pas la permission de lire.

## Créer et gérer les ensembles d'examens

Pour commencer un examen direct, ouvrez la zone Examens du dossier et choisissez une configuration publiée disponible. Par exemple, une réclamation peut nécessiter une liste d’admissibilité suivie d’une évaluation financière. Un ensemble séquentiel rend le deuxième examen disponible après la réussite du premier; un ensemble parallèle rend les examens admissibles disponibles ensemble. Vous devez avoir la permission de modifier le dossier source. Les choix disponibles dépendent du dossier, de son agence et de votre accès.

Les examens directs sont disponibles sur les promoteurs, les ententes, les dossiers liés aux ententes comme les réclamations et clôtures, ainsi que les dossiers d'extension qui les prennent en charge. Le tableau présente chaque ensemble et ses examens. Recherchez par identifiant d'ensemble ou par nom anglais ou français conservé de la configuration.

Seules les configurations actives et publiées sont proposées. Elles doivent viser ce type de dossier, s'appliquer à sa portée actuelle et contenir des questionnaires actifs de l'agence propriétaire. Vous devez aussi pouvoir modifier le dossier source.

Pour un promoteur, les configurations peuvent être liées à son profil ou aux volets atteints par ses ententes actives. Pour un dossier lié à une entente, elles peuvent être liées à cette entente ou à son volet actif actuel. L'accès aux examens d'un promoteur et le choix de configuration utilisent le contexte d'agence pertinent. Un accès dans une autre agence ne rend donc pas tous les ensembles disponibles.

Le démarrage conserve ensemble les versions publiées de la configuration et des questionnaires. Vous ne pouvez pas démarrer un autre ensemble pour la même configuration et le même dossier tant qu'une tentative antérieure bloque le nouveau travail. Les ensembles séquentiels activent le prochain examen admissible. Les ensembles parallèles activent les examens admissibles ensemble.

Utilisez **Annuler** pour terminer un ensemble inachevé. L'annulation termine ses examens inachevés et conserve l'historique. Un ensemble terminé, sans succès, refusé, annulé ou échoué ne peut pas être annulé de nouveau.

**Ajouter** et **Annuler** peuvent rester visibles si votre rôle les permet alors qu'un autre prérequis manque. L'action explique alors le blocage, par exemple une affectation manquante ou un dossier verrouillé. Corrigez la condition et rechargez avant de réessayer.

## Remplir une évaluation

Une évaluation affiche la version publiée du questionnaire conservée à la création de votre examen. Parcourez ses sections et sous-sections :

- Répondez aux questions numériques applicables et ajoutez des commentaires lorsque la politique configurée l'exige.
- Les dépendances déterminent les questions et calculs applicables. L’application calcule les valeurs dérivées au lieu d’utiliser des valeurs saisies par l’utilisateur.
- Le sommaire utilise les règles de notation conservées pour afficher les notes de section, la note pondérée, le résultat global et les résultats générés. Il indique aussi si l’examen est prêt à être achevé.
- Pour les résultats générés, acceptez la stratégie recommandée ou choisissez une autre stratégie configurée. Une stratégie différente exige une justification; un commentaire peut aussi être ajouté.
- Ajoutez des résultats personnalisés seulement si la configuration les permet.
- Consignez l'alignement de l'examen, son résultat numérique et son texte seulement si l'alignement est activé.

**Enregistrer** vérifie la section active et conserve votre réponse complète après avoir vérifié de nouveau votre permission actuelle. Vous pouvez enregistrer le travail en cours même si des réponses obligatoires sont incomplètes. Lorsque l’examen ou son ensemble est terminé, refusé ou annulé, la page est verrouillée et vous ne pouvez plus modifier les réponses.

## Remplir une liste de vérification

Par exemple, pour vérifier si une réclamation contient les pièces justificatives requises, choisissez **Réussite** si l’exigence est respectée ou **Échec** sinon. Ajoutez l’explication exigée par la règle de commentaire de cette question. Utilisez **Enregistrer** pour conserver le travail en cours; utilisez Achèvement seulement lorsque les questions, commentaires et demandes aux examinateurs additionnels requis sont terminés. Utilisez **Expliquer** pour comprendre comment vos réponses ont produit le résultat global.

Une liste de vérification présente les questions bilingues figées, groupées par section et sous-section. Choisissez **Réussite** ou **Échec**, ou **Sans objet** lorsque la question le propose. Un commentaire peut être facultatif, toujours obligatoire, obligatoire en cas d’échec, obligatoire pour Sans objet ou obligatoire dans ces deux derniers cas. La barre latérale affiche le nombre de réponses et le résultat courant. Une question obligatoire exige toujours une des réponses configurées; Sans objet est une réponse explicite, pas une question laissée vide.

Le résultat est toujours évalué par le serveur à partir de l'arbre de règles figé. Il peut être `pass`, `fail` ou `pass_with_considerations`. **Expliquer** montre les groupes correspondants et les questions déclencheuses; vous pouvez consulter le calcul, mais vous ne pouvez pas modifier son résultat. L’enregistrement vérifie que les réponses correspondent à des questions connues et sans doublons, mais permet un travail obligatoire incomplet. L'achèvement applique les règles plus strictes sur les réponses et commentaires obligatoires.

## Examinateurs additionnels

Lorsque le schéma n'a pas désactivé les examinateurs, la section Examen peut suivre leur intervention :

1. Une personne ayant la permission d'enregistrer les évaluations ajoute un responsable parmi les utilisateurs Common actifs de l'agence du schéma. La création commence toujours avec un commentaire vide.
2. Seul l'utilisateur affecté peut modifier le commentaire de sa demande, la réaffecter à un autre utilisateur admissible de l'agence ou la terminer. Il doit toujours pouvoir lire l'examen. La demande doit être incomplète et l'examen déverrouillé. Les listes de remplaçants sont disponibles pendant la modification de cette demande. Une affectation ne donne pas accès au catalogue général des examinateurs.
3. Une personne ayant la permission de supprimer un enfant d'évaluation peut supprimer logiquement une ligne pendant que l'examen est déverrouillé.

La liste affiche le total et les lignes actives. L'achèvement de l'examen principal est bloqué tant que chaque ligne non supprimée n'est pas terminée ou retirée. Une affectation permet au réviseur d’agir seulement s’il a aussi accès au dossier source. Avant d’enregistrer un changement, l’application vérifie de nouveau le propriétaire actuel, les permissions, l’affectation et l’état de verrouillage.

## Responsabilité des examens par groupe

Lorsque la configuration publiée désigne un groupe, l’examen commence sans responsable individuel. La personne qui a démarré le flux n’est pas affectée automatiquement. Réclamez l’examen à l’accueil ou par son action de réclamation. Vous devez être membre actuel du groupe et avoir la permission Contributeur pour le dossier propriétaire précis. La réclamation n’exige aucune affectation personnelle préalable ni `manage_assignments`; elle crée l’affectation exacte au besoin et conserve les personnes affectées et le principal courant. Si le registre est vide, l’intervenant devient principal. Une seconde réclamation est rejetée après la réussite d’un autre membre.

Les demandes de réviseur supplémentaire peuvent aussi être affectées à un groupe admissible. Un membre doit réclamer la demande avant d’agir comme réviseur; les règles habituelles de commentaire et d’achèvement du réviseur affecté s’appliquent. L’appartenance ne donne jamais accès à des sources sans lien. Si la réclamation échoue, rechargez et vérifiez l’appartenance, la portée de rôle courante du propriétaire et l’état actif de l’élément.

## Achever, approuver et faire avancer

Utilisez la section Achèvement seulement lorsque les réponses sont prêtes. L'achèvement revalide l'ensemble de l'évaluation ou de la liste figée avec les règles strictes, refuse les examinateurs additionnels en attente, consigne l'utilisateur Common, l'heure et les commentaires, puis verrouille l'examen comme terminé dans une seule transaction. Si le membre d'examen possède un modèle d'approbation, sa feuille d'acheminement est ensuite traitée dans la section d'approbation ordinaire.

L'ensemble d'examens avance selon l'ordre et la politique de ses membres publiés. La réussite de l'examen et de son approbation passe au membre suivant. Un membre refusé peut terminer ou refuser l'ensemble selon ses règles d'exécution; lorsque l'ensemble appartient à un flux, une réussite terminale fait avancer le flux et un échec le fait échouer. Les enregistrements historiques continuent d'utiliser leurs versions figées.

La reprise crée une tentative suivante sans rouvrir les lignes historiques. Pour reprendre un examen direct, son ensemble autonome `review_set` doit être terminé et l’examen doit être à l’état `denied`, `cancelled`, `failed` ou `unsuccessful`. La reprise copie le plan conservé dans un nouvel ensemble avec de nouveaux examens et réponses. Elle conserve les liens avec les versions et tentatives précédentes. Les demandes répétées pour la même reprise retournent la même nouvelle tentative sans créer de doublons. Un examen appartenant à un flux utilise plutôt la reprise de ce flux.

Par exemple, après l’échec d’un ensemble autonome de listes, une personne autorisée peut reprendre l’examen sans succès dans une nouvelle tentative. Les réponses et décisions originales restent historiques; remplissez le successeur au lieu de modifier le dossier échoué. La propriété, l’affectation et les protections d’état du parent restent applicables.

## Définitions historiques invalides

Une exécution utilise sa définition d’évaluation figée. Le serveur accepte une définition réellement non rédigée comme vide et fournit des matrices facultatives vides pour les anciennes définitions compatibles. Il ne remplace pas silencieusement un contenu rédigé mal formé par une évaluation vide : le chargement retourne `ASSESSMENT_DEFINITION_INVALID` (500). Notez l’identifiant de l’examen et signalez le problème au responsable de l’application. N’achevez pas un remplacement apparemment vide et ne modifiez pas le schéma courant en pensant réparer la version historique figée.

## Rétablissement

Si l'enregistrement ou l'achèvement n'est pas offert, vérifiez les permissions et l'état verrouillé de la page, terminez ou retirez les examinateurs additionnels en attente et remplissez chaque réponse, commentaire, justification de résultat et valeur d'alignement obligatoire. Rechargez la page après l'intervention d'un autre examinateur ou approbateur afin d'obtenir les comptes et l'état courants. Ne tentez pas de réparer une réponse historique figée en modifiant son schéma courant; publiez les changements pour les prochains examens et utilisez l'action de reprise prise en charge lorsqu'elle est offerte.

Consultez [Approbations et achèvements](approvals-completions.md), [Flux de travail](workflows.md) et [RBAC](rbac.md).
