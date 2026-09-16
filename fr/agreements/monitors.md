# Surveillance des ententes

Les surveillances d'entente regroupent un exercice de surveillance : son calendrier, ses objectifs, ses éléments de travail, ses constatations, ses suivis, ses mises à jour, ses pratiques prometteuses, son achèvement et tout flux de travail configuré. Ouvrez **Ententes**, sélectionnez une entente, puis choisissez **Surveillances**. Sélectionnez le type de surveillance pour ouvrir son espace de travail.

## Avant de créer une surveillance

L'entente doit déjà être rattachée à un volet de paiement de transfert et à une agence. Les administrateurs doivent configurer les données de référence suivantes :

| Dépendance | Portée appliquée |
| --- | --- |
| Type de surveillance | Type non supprimé appartenant au volet actuel de l'entente. |
| Exercice provisoire | Exercice non supprimé appartenant à l'agence de l'entente. |
| Modèle d'approbation de surveillance | Facultatif et distinct de l'achèvement direct; il doit viser le volet et le type d'entité `fundingcasemonitor`. |
| Configuration de flux de travail | Facultative; l'achèvement lance le flux d'achèvement applicable lorsqu'il est configuré. |

Lecteur Entente consulte les surveillances. La création exige Contributeur et l’affectation exacte à l’entente, puis rend le créateur principal. Les mutations suivantes exigent Contributeur ou Gestionnaire et l’affectation exacte à la surveillance. Les recherches reprennent le plafond du formulaire et les écritures revérifient portée et affectation côté serveur.

## Créer et gérer l'en-tête

La liste affiche le type, l'exercice, le trimestre provisoire, l'indicateur sur place, le statut et les actions. La recherche porte sur les deux langues du type, le libellé de l'exercice, le trimestre et la valeur Oui/Non localisée.

| Champ | Règle |
| --- | --- |
| Type | Obligatoire. Le serveur rejette un type hors du volet de l'entente même si un appelant contourne le sélecteur. Les noms bilingues résident dans le dossier de référence du volet. |
| Exercice provisoire | Obligatoire. Le serveur rejette un exercice hors de l'agence de l'entente. Son libellé d'affichage est identique dans les réponses des deux langues. |
| Trimestre provisoire | Petit entier obligatoire de 1 à 4; la validation et PostgreSQL appliquent tous deux cette plage. |
| Sur place | Valeur vrai/faux obligatoire. |

Une nouvelle surveillance reçoit le statut Brouillon de l’organisme. Son ouverture affiche Planification, Éléments, Constatations, Suivis, Pratiques prometteuses et Flux de travail, puis les onglets d'extension activés qui ciblent `monitor`. Tant que la surveillance est modifiable, les quatre champs d'en-tête peuvent être changés.

Les modifications ordinaires de l’en-tête et des enfants conservent le statut métier. Son libellé ne mesure pas la quantité de travail de planification ou de surveillance saisie.

## Consigner le travail de surveillance

Toute création, modification ou suppression d'un sous-dossier exige la permission correspondant à l'opération, renouvelle l'autorisation dans une transaction, verrouille l'agrégat de surveillance et rejette une surveillance à l'état un état protégé par le statut métier, Achèvement ou le flux. Le lien parent-enfant est revérifié avant la mutation.

| Espace | Contenu obligatoire et comportement |
| --- | --- |
| Planification | Un ou plusieurs objectifs en texte libre. Aucune règle d'unicité ni de nombre minimal ne s'applique. |
| Éléments | Nom (maximum de 255 caractères), détail, dates de début et de fin prévues, indicateur de surveillance et dates réelles facultatives. La fin prévue ne peut précéder le début prévu. Lorsque **Surveillé** est vrai, les deux dates réelles sont obligatoires; lorsqu'elles existent toutes deux, la fin réelle ne peut précéder le début réel. |
| Constatations | Nom (maximum de 255 caractères), type d'action, partie responsable et détail. Les types d'action sont `amendment`, `mandatoryaction`, `suggestedaction` et `none`. |
| Suivis | Nom (maximum de 255 caractères), partie responsable et date d'échéance. La création enregistre toujours le statut `open`; le formulaire de suivi ne permet pas de modifier directement ce statut. |
| Mises à jour de suivi | Texte, statut et date de mise à jour. Le statut est `open`, `onhold`, `completed`, `cancelled` ou `unabletocomplete`. La visionneuse des mises à jour permet l'ajout, la modification et la suppression lorsque l'utilisateur est autorisé. |
| Pratiques prometteuses | Un ou plusieurs dossiers de pratique en texte libre. |

Les valeurs de partie responsable utilisées par les constatations et les suivis sont `applicantrecipient`, `organization` et `joint`. L'interface localise les libellés d'énumération; le texte libre de surveillance est enregistré tel qu'il est saisi plutôt que dans des champs français et anglais jumelés.

### Statut et historique d'un suivi

Après la création, la modification ou la suppression logique d'une mise à jour, le suivi parent prend le statut de la mise à jour non supprimée ayant le plus grand identifiant de base de données. S'il n'en reste aucune, il revient à `open`. Il s'agit de l'ordre d'insertion, et non de la date de mise à jour saisie : antidater un nouveau dossier ne l'empêche pas de devenir la source du statut. La modification du suivi lui-même ne change pas ce statut dérivé.

## Achever une surveillance

Utilisez Flux/Achèvement tant que la surveillance est modifiable. L’action exige Contributeur, l’affectation exacte, aucun achèvement antérieur, aucun flux actif et au moins un élément non supprimé. Elle n’exige pas d’objectifs, que tous les éléments soient surveillés, de dates réelles pour les éléments non surveillés, de constats, de suivis résolus ou de pratiques prometteuses.

La transaction revérifie ces conditions, consigne l’utilisateur Common et les commentaires facultatifs, puis démarre la soumission d’approbation sélectionnée ou consigne `no_workflow`. L’échec du démarrage du flux sélectionné requis annule Achèvement. Le crochet est émis après validation. L’action fige l’édition ordinaire sans attribuer un statut fixe `complete`.

Par exemple, un élément non surveillé avec des dates prévues valides satisfait la présence requise, mais l’achèvement ne prouve pas que la visite a eu lieu. Appliquez les exigences d’examen avant cette action irréversible. Des suivis ouverts peuvent encore bloquer la clôture de l’entente même si Achèvement n’exigeait pas leur résolution.

## Limite entre approbation et flux de travail

Pour exiger l’approbation, configurez un flux publié de soumission `fundingcasemonitor` avec ses membres d’examen, recommandation ou approbation. Achèvement le démarre et les étapes matérialisées apparaissent dans la section Flux partagée. Un modèle seul ne suffit pas.

Les flux standard se choisissent explicitement lorsque l’état le permet; Achèvement n’en démarre jamais automatiquement. Les statuts suivent les transitions publiées. Utilisez la résolution de propriétaire ou les commandes de reprise/annulation autorisées. Consultez [Flux de travail](../concepts/workflows.md) et [Approbations et achèvements](../concepts/approvals-completions.md).

## Supprimer et récupérer prudemment

La suppression d'un sous-dossier active son indicateur `_deleted`. La suppression d'un suivi supprime aussi logiquement ses mises à jour. La suppression d'une surveillance modifiable supprime logiquement, dans une seule transaction, la surveillance, ses objectifs, ses éléments, ses constatations, ses pratiques prometteuses, ses suivis et leurs mises à jour. Les clés étrangères interdisent la suppression physique; les routes prises en charge utilisent plutôt la suppression logique.

La suppression n'est plus offerte après un état protégé par le statut métier, Achèvement ou le flux. Confirmez la surveillance exacte avant de la supprimer; l'interface principale n'offre aucune restauration. En cas d'échec, aucun message de réussite n'est affiché et la fenêtre demeure ouverte pour correction. Après un résultat réseau incertain, actualisez avant de réessayer, car le serveur pourrait déjà avoir validé l'écriture.

## Résumé du contrat d'API

| Groupe de routes | Contrat |
| --- | --- |
| `GET /api/agreements/{id}/monitors-overview` | Liste autorisée avec noms de type bilingues et libellé d'exercice. |
| `POST /api/agreements/{id}/monitors` | Création `draft` validée avec autorisation renouvelée. |
| `GET/PATCH/DELETE /api/agreements/{id}/monitors/{monitorId}` | Lecture de l'agrégat complet, modification de l'en-tête modifiable ou cascade transactionnelle de suppressions logiques. |
| `GET /api/agreements/{id}/monitors/lookups/*` | Types de surveillance du volet ou exercices de l'agence, paginés et interrogeables; l'autorisation suit `permission_action`. |
| `/monitor-planning`, `/monitor-items`, `/monitor-findings`, `/monitor-followups`, `/monitor-followup-updates`, `/monitor-promising-practices` | Chaque groupe offre POST ainsi que PATCH et DELETE par identifiant de sous-dossier; aucune route GET distincte n'est nécessaire puisque la réponse de détail de l'agrégat fournit toutes les lignes. |

Les erreurs de validation utilisent la langue de la requête et la réponse normalisée `VALIDATION_FAILED`. Une surveillance ou un sous-dossier absent ou rattaché à une autre entente est rejeté; l'autorisation n'est jamais déduite d'un identifiant fourni dans le corps de la requête.
