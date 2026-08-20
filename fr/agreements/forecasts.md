# Prévisions d’entente

Les prévisions répartissent les dépenses attendues de l’entente entre les lignes du budget courant, les mois de l’exercice et des numéros de version choisis par l’utilisateur. Ouvrez une entente et sélectionnez **Prévisions**; l’onglet regroupe les versions affichées par exercice budgétaire de l’entente.

## Avant de commencer

| Exigence | Comportement vérifié |
| --- | --- |
| Budget courant de l’entente | Un en-tête de prévision doit faire référence à l’identité stable d’un exercice présente dans la version budgétaire courante. Sa grille modifiable utilise les lignes de la version courante ayant la même identité stable d’exercice. |
| Autorisation | Lecteur Entente consulte. La création d’une prévision exige Contributeur et l’affectation exacte à l’entente, puis rend le créateur principal. Les modifications ou l’achèvement exigent Contributeur et l’affectation exacte à la prévision; la suppression exige Gestionnaire et cette affectation. |
| Dossier d’utilisateur commun | L’achèvement exige que le compte connecté corresponde à un `Common_User` actif. |
| Flux de travaux d’achèvement facultatif | Un flux de travaux publié pour `fundingcaseforecast` peut démarrer après l’achèvement et appliquer plus tard son état de réussite ou d’échec configuré. |

Les écritures répètent l’autorisation sur l’entente dans une transaction après avoir verrouillé l’entente et chaque agrégat de prévision touché. Les identités d’une autre entente, supprimées ou absentes du budget courant sont refusées.

## Créer et parcourir les prévisions

Choisissez **Ajouter une prévision** et sélectionnez un exercice dérivé des lignes du budget courant. Le serveur crée un en-tête `draft` inactif. La base de données n’exige pas qu’une prévision contienne des lignes et n’impose pas un seul en-tête inactif par entente et par exercice.

L’onglet calcule ses rangées plutôt que de stocker des dossiers de version distincts :

| Affichage | Source |
| --- | --- |
| Groupe d’exercice | L’identité stable de l’exercice budgétaire de l’en-tête et le libellé de l’exercice courant. |
| Version | Chaque valeur `egcs_fc_version` distincte trouvée dans les lignes mensuelles actives de cet en-tête. Un en-tête sans ligne est représenté comme version `0`. |
| État | L’unique état de l’en-tête de prévision; toutes les versions affichées ont donc le même état de cycle de vie. |
| Lignes et total | Nombre et somme des lignes actives de cet en-tête et de cette version. Les totaux sont présentés en dollars canadiens sans convertir les devises stockées. |

La recherche correspond à l’exercice, à la version, à l’état localisé, au nombre de lignes ou au total. Le filtrage, le regroupement, le tri et la pagination se font dans le navigateur après le chargement du résumé complet.

**Ajouter une version** ne copie aucune donnée et ne crée aucune entité de version. L’action ouvre le même en-tête de prévision avec le prochain numéro de version dans l’URL. L’enregistrement de cellules non nulles crée des lignes portant ce numéro.

::: warning Unicité des en-têtes et des versions
L’API permet plusieurs en-têtes de prévision inactifs pour la même entente et le même exercice. Elle permet aussi des lignes actives en double ayant la même prévision, la même ligne budgétaire, le même mois et la même version. L’interface groupée suppose un seul en-tête par groupe d’exercice pour les actions de modification, de suppression et d’ajout de version; la grille de détails ne conserve qu’un doublon dans sa correspondance en mémoire. Créez un seul en-tête par exercice et une seule ligne par coordonnée ligne budgétaire-mois-version.
:::

## Modifier la ventilation mensuelle

La route de détails accepte une valeur `version` dans la requête; en son absence, la valeur par défaut est `0`. La grille regroupe les lignes du budget courant par catégorie de coûts bilingue et par sous-section de coûts. Elle montre d’abord les totaux trimestriels d’avril à mars; sélectionnez l’en-tête d’un trimestre pour afficher ses trois champs mensuels. La recherche correspond à la catégorie, à la sous-section, aux noms de ligne dans les deux langues ou à la description.

| Champ de ligne | Règle |
| --- | --- |
| Prévision | En-tête modifiable obligatoire de cette entente. Une requête PATCH directe peut déplacer une ligne vers une autre prévision modifiable de la même entente. |
| Ligne budgétaire | Identité stable obligatoire d’une ligne de la version budgétaire courante, de la même entente et du même exercice que la prévision cible. |
| Mois | Entier de `0` à `11`, soit d’avril à mars. |
| Montant | Valeur `numeric(19,2)` obligatoire, comportant au plus deux décimales et dont la valeur absolue ne dépasse pas 90 billions. L’interface fixe un minimum de zéro, mais la validation du serveur et la base de données n’imposent pas une valeur non négative. |
| Devise | Valeur d’énumération de devise obligatoire. La grille actuelle crée toujours `cad`; elle n’offre ni choix ni conversion de devise. |
| Version | Entier non négatif obligatoire, normalisé en texte décimal pour l’API et stocké comme bigint. |

L’action **Enregistrer la ventilation** traite les cellules séquentiellement. Elle applique PATCH à une ligne existante modifiée lorsque l’utilisateur possède `update`, et POST à une ligne manquante non nulle lorsqu’il possède `create`. Une cellule manquante à zéro ne crée rien; le passage d’une cellule existante à zéro conserve une ligne de valeur nulle. Aucune transaction globale ne couvre toute la grille : une erreur survenant après des requêtes réussies peut laisser les premières cellules enregistrées. Actualisez, corrigez la cellule signalée et enregistrez de nouveau.

La première ligne créée fait passer une prévision `draft` à `inprogress`; les modifications ultérieures de lignes ne changent pas autrement l’état de l’en-tête. L’API peut supprimer logiquement des lignes individuelles, mais la grille actuelle n’offre aucune action de suppression de ligne. La suppression d’un en-tête modifiable supprime logiquement celui-ci et toutes ses lignes actives de façon atomique.

::: warning Changement d’exercice après la saisie de lignes
La requête PATCH de l’en-tête valide le nouvel exercice, mais elle ne valide, ne déplace et ne supprime aucune ligne existante. Les lignes liées aux coordonnées budgétaires de l’ancien exercice peuvent disparaître de la nouvelle grille tout en continuant de compter comme lignes de prévision et comme preuve exigée pour l’achèvement. Ne changez pas l’exercice d’une prévision après avoir saisi sa ventilation. Si cela s’est produit, arrêtez l’achèvement et utilisez une intervention autorisée par API ou sur les données afin de supprimer ou de réattribuer correctement les lignes périmées.
:::

## Cycle de vie et achèvement

Les états d’en-tête `complete`, `pendingapproval`, `approved` et `denied` sont verrouillés. Un dossier d’achèvement ou une feuille d’acheminement active à l’état `draft`, `pendingapproval` ou `approved` bloque aussi toute modification de l’en-tête et des lignes, même si l’état de l’en-tête semble modifiable.

L’achèvement exige un plafond de rôle Entente Contributeur et l’affectation exacte à la prévision, un en-tête modifiable, aucun achèvement antérieur et au moins une ligne active, peu importe sa version. Les commentaires sont facultatifs. Dans une transaction avec autorisation actualisée, il crée l’achèvement commun, fait passer l’en-tête à `complete` et lance tout flux de travaux d’achèvement `fundingcaseforecast` publié; le point d’extension d’achèvement est émis après la validation de la transaction.

L’achèvement s’applique à tout l’en-tête de prévision, et non à la seule version sélectionnée dans l’URL. Il ne règle pas `egcs_fc_active`, ne copie aucune version et ne vérifie pas que chaque coordonnée budgétaire visible comporte une ligne. Une prévision achevée demeure donc inactive à moins qu’un moteur d’approbation distinct ne l’approuve plus tard.

## Limite du moteur d’approbation

Le serveur offre un moteur générique d’approbation des prévisions. Un appelant explicite peut utiliser un modèle `fundingcaseforecast` valide associé au volet pour créer une feuille d’acheminement visant une prévision `complete` ou `denied` qui comporte des lignes. L’approbation séquentielle, le refus, la réattribution et les règles d’approbation supplémentaire utilisent ensuite le moteur commun. L’approbation finale fait passer l’en-tête à `approved`, l’active et désactive les autres en-têtes de la même entente et de la même identité d’exercice; le refus le fait passer à `denied` et le rend inactif.

L’achèvement principal ne consulte **pas** le modèle et ne crée pas cette feuille d’acheminement. La page de détails monte les sections d’achèvement et de flux de travaux, mais aucun composant d’approbation. La seule configuration du modèle n’ajoute donc pas l’approbation à cet écran. Considérez l’approbation comme une capacité d’API ou d’intégration jusqu’à ce qu’un flux hôte ou d’extension pris en charge l’appelle. Consultez [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travaux](../concepts/workflows.md).

## Rétablissement

- L’achèvement ne peut pas être répété ni annulé à partir de cette page. Créez une prévision de remplacement seulement après avoir vérifié s’il existe déjà un en-tête pour cet exercice.
- Les prévisions verrouillées ne peuvent pas être modifiées ni supprimées par ces routes. La suppression d’une prévision modifiable est logique plutôt que physique.
- Si le sélecteur d’exercice est vide, ajoutez des lignes actives au [Budget](budget.md) courant de l’entente; l’interface n’offre pas un exercice sans ligne budgétaire courante, même si le serveur valide le dossier d’exercice lui-même.
- Lorsqu’un amendement budgétaire remplace les rangées courantes tout en préservant la filiation stable, la prévision suit les identités d’exercice et de ligne correspondantes. Une ligne courante supprimée ou sans correspondance disparaît de la grille modifiable.
