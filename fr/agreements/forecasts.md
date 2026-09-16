# Prévisions d’entente

Les prévisions répartissent les dépenses attendues de l’entente entre les lignes du budget courant, les mois de l’exercice et des numéros de version choisis par l’utilisateur. Ouvrez une entente et sélectionnez **Prévisions**; l’onglet regroupe les versions affichées par exercice budgétaire de l’entente.

## Avant de commencer

| Exigence | Comportement vérifié |
| --- | --- |
| Budget courant de l’entente | Un en-tête de prévision doit faire référence à l’identité stable d’un exercice présente dans la version budgétaire courante. Sa grille modifiable utilise les lignes de la version courante ayant la même identité stable d’exercice. |
| Autorisation | Lecteur Entente consulte. La création d’une prévision exige Contributeur et l’affectation exacte à l’entente, puis rend le créateur principal. Les modifications ou l’achèvement exigent Contributeur et l’affectation exacte à la prévision; la suppression exige Gestionnaire et cette affectation. |
| Dossier d’utilisateur commun | L’achèvement exige que le compte connecté corresponde à un `Common_User` actif. |
| Soumission d’approbation facultative | L’achèvement démarre atomiquement le flux publié `approval_submission` configuré avec le déclencheur `on_completion` pour `fundingcaseforecast`, ou consigne `no_workflow`. Les transitions du flux appliquent les statuts d’organisme configurés. |

Les écritures répètent l’autorisation sur l’entente dans une transaction après avoir verrouillé l’entente et chaque agrégat de prévision touché. Les identités d’une autre entente, supprimées ou absentes du budget courant sont refusées.

## Créer et parcourir les prévisions

Choisissez **Ajouter une prévision** et sélectionnez un exercice dérivé des lignes du budget courant. Le serveur crée un en-tête inactif avec le statut Brouillon de l’organisme. La base de données n’exige pas qu’une prévision contienne des lignes et n’impose pas un seul en-tête inactif par entente et par exercice.

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
| Montant | Valeur `numeric(19,2)` obligatoire, comportant au plus deux décimales et dont la valeur absolue ne dépasse pas `99999999999999999.99`, transmis en texte décimal exact. L’interface fixe un minimum de zéro, mais la validation du serveur et la base de données n’imposent pas une valeur non négative. |
| Devise | Valeur d’énumération de devise obligatoire. La grille actuelle crée toujours `cad`; elle n’offre ni choix ni conversion de devise. |
| Version | Entier non négatif obligatoire, normalisé en texte décimal pour l’API et stocké comme bigint. |

L’action **Enregistrer la ventilation** traite les cellules séquentiellement. Elle applique PATCH à une ligne existante modifiée lorsque l’utilisateur possède `update`, et POST à une ligne manquante non nulle lorsqu’il possède `create`. Une cellule manquante à zéro ne crée rien; le passage d’une cellule existante à zéro conserve une ligne de valeur nulle. Aucune transaction globale ne couvre toute la grille : une erreur survenant après des requêtes réussies peut laisser les premières cellules enregistrées. Actualisez, corrigez la cellule signalée et enregistrez de nouveau.

Les écritures ordinaires de lignes conservent le statut métier de l’organisme. L’API peut supprimer logiquement des lignes individuelles, mais la grille actuelle n’offre aucune action de suppression de ligne. La suppression d’un en-tête modifiable supprime logiquement celui-ci et toutes ses lignes actives de façon atomique.

L’exercice de l’en-tête ne peut pas changer tant qu’une ligne active existe. Le serveur vérifie l’exercice courant cible et refuse le déplacement; il ne masque pas silencieusement les anciennes lignes. Choisissez le bon exercice avant la saisie.

## Cycle de vie et achèvement

Le statut en lecture seule ou terminal, la preuve d’achèvement et le travail d’exécution protégé déterminent la possibilité de modifier une prévision. Le statut métier n’est pas déduit de noms fixes tels que `inprogress` ou `approved`.

Achèvement exige Contributeur et l’affectation exacte, un en-tête modifiable, aucun achèvement antérieur et au moins une ligne active, toutes versions confondues. Un flux actif le bloque. L’action consigne l’utilisateur et le commentaire facultatif puis démarre atomiquement la soumission d’approbation configurée, ou consigne `no_workflow`. Le crochet s’exécute après validation.

L’action couvre tout l’en-tête, non seulement la version dans l’URL. Elle ne copie pas de version et n’exige pas une ligne pour chaque coordonnée mensuelle visible. À sa terminaison positive, cette prévision devient active et les autres prévisions actives de la même entente et identité d’exercice sont désactivées. Sans flux, c’est immédiat; avec un flux, cela attend sa réussite.

## Approbation et exemple de remplacement

Publiez un flux de soumission pour `fundingcaseforecast` afin d’exiger examen ou approbation à l’achèvement. Incluez le modèle ou plan publié; un modèle seul ne relie pas le parcours. Suivez les étapes dans la section Flux. Les flux standard sont choisis explicitement et ne remplacent pas Achèvement.

Par exemple, conservez la prévision active pendant la préparation d’un nouvel en-tête. Saisissez et enregistrez ses lignes mensuelles, achevez-le puis terminez son approbation. La réussite remplace l’en-tête actif de cette entente/exercice; un échec ou une annulation ne l’active pas. Puisque plusieurs en-têtes inactifs sont permis, identifiez soigneusement le dossier voulu plutôt que traiter chaque version affichée comme une prévision approuvée indépendante.

Consultez [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).

## Rétablissement

- L’achèvement ne peut pas être répété ni annulé à partir de cette page. Créez une prévision de remplacement seulement après avoir vérifié s’il existe déjà un en-tête pour cet exercice.
- Les prévisions verrouillées ne peuvent pas être modifiées ni supprimées par ces routes. La suppression d’une prévision modifiable est logique plutôt que physique.
- Si le sélecteur d’exercice est vide, ajoutez des lignes actives au [Budget](budget.md) courant de l’entente; l’interface n’offre pas un exercice sans ligne budgétaire courante, même si le serveur valide le dossier d’exercice lui-même.
- Lorsqu’un amendement budgétaire remplace les rangées courantes tout en préservant la filiation stable, la prévision suit les identités d’exercice et de ligne correspondantes. Une ligne courante supprimée ou sans correspondance disparaît de la grille modifiable.
