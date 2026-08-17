# Flux de travail

Les flux de travail relient la configuration publiée des examens, des recommandations et des approbations d'un volet à un enregistrement d'exécution, par exemple un paiement, une prévision, une surveillance, un engagement, une modification, un rapprochement de réclamation ou un examen. Ils modifient le statut de l'enregistrement source pendant le traitement et conservent la configuration exacte de chaque tentative.

## Configurer un flux de travail

Ouvrez **Programmes**, puis un programme et un volet, et choisissez **Configurations de flux de travail**. La liste permet la recherche bilingue, la création, l'ouverture et la suppression selon vos permissions sur le programme de paiements de transfert. La page détaillée regroupe les champs sous Identité, Routage, Transitions et Comportement.

| Champ | Signification |
| --- | --- |
| Nom et description en anglais et en français | Identité administrative bilingue affichée dans la langue courante. |
| Type d'entité | Type d'enregistrement d'exécution auquel la configuration s'applique. |
| Point d'entrée | `completion` démarre lors de l'achèvement d'un enregistrement source; `recommendation` est démarré explicitement dans la section du flux. |
| Statuts de départ permis | Au moins un statut source à partir duquel une exécution peut commencer. |
| Statuts de début, de réussite et d'échec | Statut appliqué à la source au démarrage, à la réussite ou à une fin sans succès. |
| Ensemble d'examens | Plan d'examen publié facultatif exécuté en premier. |
| Ensemble de recommandations | Plan ordonné et publié de recommandations facultatif. |
| Modèle d'approbation de la source | Approbation finale facultative après les examens et les recommandations. |
| Actif | Rend une configuration publiée admissible à la résolution. |
| Permettre la nouvelle tentative | Autorise la reprise d'une tentative échouée avec sa propre configuration. |

Une configuration appartient au volet exact indiqué dans l'URL et la portée stockée. La lecture, la création, la mise à jour, la publication et la suppression imposent la relation programme-volet et la permission sur les paiements de transfert. Les écritures résolvent de nouveau l'autorisation et verrouillent le chemin de propriété dans la transaction; un identifiant connexe n'élargit pas l'accès.

## Activer et publier

Une nouvelle configuration est un brouillon. **Activer** est offert uniquement pour un brouillon et crée la version 1 de la configuration publiée. L'enregistrement d'une configuration active modifie la copie de travail et affiche un état en attente de publication; **Publier** est offert seulement lorsque ces valeurs diffèrent de la configuration publiée et incrémente la version.

L'activation ou la publication échoue si une configuration d'examen, une configuration de recommandation ou un modèle d'approbation lié est inactif ou ne possède pas de version publiée. La publication enregistre un instantané complet du flux et incorpore le plan d'examen publié, le plan de recommandation, les approbations de chaque recommandation et l'approbation finale. Les exécutions existantes ne changent donc pas lorsqu'une personne administratrice modifie ou republie les configurations plus tard.

La suppression est logique et désactive la configuration. Elle n'est plus résolue pour les nouvelles exécutions, tandis que les exécutions historiques conservent leur configuration et leur filiation figées.

## Séquence d'exécution

L'exécution résout une configuration active et publiée selon le type d'entité source, la portée du volet propriétaire, le point d'entrée et le statut courant de la source. Si plusieurs enregistrements correspondent, le code courant choisit le plus petit identifiant de configuration; évitez les configurations actives qui se chevauchent, car l'interface n'offre aucun ordre de priorité.

Les étapes configurées s'exécutent dans cet ordre :

1. L'ensemble d'examens, s'il est configuré. Un ensemble échoué fait échouer le flux; un ensemble réussi le fait avancer. Un autre ensemble bloquant à l'état brouillon, en cours ou en attente d'approbation empêche un démarrage en double.
2. Les membres de recommandation, dans l'ordre configuré. Une réponse brouillon peut être enregistrée. La soumission valide toutes les réponses obligatoires et dérive le résultat de la question décisive. Le circuit d'approbation d'un membre doit se terminer avant la progression. Un résultat final `not_recommended` fait échouer l'exécution; un résultat recommandé passe au membre suivant.
3. Le modèle d'approbation de la source, s'il est configuré, s'exécute après les étapes précédentes. L'approbation termine l'exécution; le refus la fait échouer.
4. Sans autre étape, l'exécution se termine immédiatement.

Le démarrage applique à la source le statut de début configuré. Une exécution terminée applique le statut de réussite. Les exécutions échouées et annulées ont `success = false` et appliquent le statut d'échec. Les statuts présentés par l'interface comprennent le traitement, l'examen en attente, la recommandation en attente, l'approbation de recommandation en attente, l'approbation de la source en attente, terminé, échoué et annulé.

## Traiter une exécution

La section Flux de travail de l'enregistrement source affiche l'action de démarrage applicable, la séquence figée, les statuts courants, les questions de recommandation, les approbations et les tentatives antérieures sans succès. Une configuration au point d'entrée d'achèvement n'affiche pas de bouton de démarrage manuel : terminez l'action source qui possède ce point d'entrée. Une configuration au point d'entrée de recommandation affiche **Démarrer la recommandation** lorsque la modification est permise. Si une approbation a déjà été matérialisée hors d'une exécution active, la section d'approbation demeure accessible.

Sélectionnez un examen pour ouvrir sa liste de vérification ou son évaluation et revenir à la source. Sélectionnez une recommandation pour répondre aux questions bilingues de la version publiée. L'enregistrement conserve le brouillon; la soumission vérifie le schéma publié, puis ouvre son approbation, passe à la recommandation suivante ou met fin à l'exécution. Les approbations finales et de recommandation utilisent les actions ordinaires des feuilles de route et les règles d'attribution.

La lecture de l'exécution exige l'accès ordinaire de lecture des évaluations dans le contexte propriétaire. Le démarrage, l'enregistrement ou la soumission d'une recommandation, l'annulation et la nouvelle tentative exigent l'accès d'enregistrement des évaluations et un utilisateur Common inscrit. L'attribution d'un examen ou d'une approbation détermine qui peut agir; elle ne donne pas accès à l'enregistrement propriétaire.

## Annuler, reprendre et rétablir

L'annulation est permise uniquement pendant une exécution active. Dans une transaction dont l'autorisation est réévaluée, elle annule les recommandations, examens, ensembles d'examens, feuilles de route et éléments de flux actifs, puis marque l'exécution comme annulée et applique le statut d'échec configuré.

**Nouvelle tentative** est offert seulement pour une exécution sans succès dont la configuration figée est toujours active, publiée, dans la même portée valide et autorise les nouvelles tentatives. La reprise utilise la configuration et le point d'entrée de cette exécution échouée; elle ne passe pas silencieusement à une configuration active plus récente. Seule la tentative sans succès la plus récente peut lancer une reprise, et une exécution active est retournée plutôt que d'en créer une en double.

Si le démarrage n'est pas offert, confirmez que la configuration est active et publiée, que le type d'entité et le point d'entrée correspondent, que le statut source est permis, que tous les plans liés sont publiés et qu'aucune exécution ni aucun ensemble d'examens bloquant n'est actif. Corrigez la copie de travail et publiez-la pour les exécutions futures. Une tentative historique ne peut pas être réécrite; consultez-la sous Précédentes et utilisez seulement l'action prise en charge pour démarrer ou reprendre.

Consultez [Schémas et configurations de recommandation](../programs/recommendations.md), [Modèles d'approbation](../programs/approval-templates.md) et [Approbations et achèvements](approvals-completions.md).
