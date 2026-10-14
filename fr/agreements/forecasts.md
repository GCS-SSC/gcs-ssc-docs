# Prévisions d’entente

Utilisez les prévisions pour indiquer quand les dépenses de l’entente devraient avoir lieu. Saisissez les montants attendus par ligne budgétaire et par mois; les numéros de version permettent de conserver plusieurs estimations dans la même prévision. Ouvrez une entente et sélectionnez **Prévisions**; l’onglet regroupe les versions affichées par exercice budgétaire de l’entente.

## Avant de commencer

| Exigence | Comportement vérifié |
| --- | --- |
| Budget courant de l’entente | Choisissez un exercice du budget courant de l’entente. La prévision conserve une référence stable à cet exercice et affiche ses lignes budgétaires courantes, même lorsqu’une modification remplace la version du budget. |
| Autorisation | Lecteur Entente consulte. La création d’une prévision exige Contributeur et l’affectation à l’entente, puis rend le créateur principal. Les modifications ou l’achèvement exigent Contributeur et l’affectation à la prévision; la suppression exige Gestionnaire et cette affectation. |
| Dossier d’utilisateur commun | L’achèvement exige que le compte connecté corresponde à un `Common_User` actif. |
| Soumission d’approbation facultative | L’achèvement démarre atomiquement le flux publié `approval_submission` configuré avec le déclencheur `on_completion` pour `fundingcaseforecast`, ou consigne `no_workflow`. Les transitions du flux appliquent les statuts d’organisme configurés. |

Le serveur revérifie vos permissions sur l’entente à l’enregistrement et verrouille l’entente et les prévisions touchées pour éviter les modifications concurrentes. Vous ne pouvez pas utiliser un exercice ou une ligne budgétaire d’une autre entente, d’un dossier supprimé ou d’une ancienne version du budget.

## Créer et parcourir les prévisions

Choisissez **Ajouter une prévision** et sélectionnez un exercice dérivé des lignes du budget courant. La nouvelle prévision est inactive et porte le statut Brouillon de l’organisme. « Inactive » signifie qu’elle n’a pas remplacé la prévision active de cet exercice. La base de données n’exige pas qu’une prévision contienne des lignes et n’impose pas un seul en-tête inactif par entente et par exercice.

Un dossier de prévision peut contenir plusieurs versions numérotées des montants mensuels. Le tableau les affiche sur des rangées distinctes, mais elles partagent un seul dossier de prévision :

| Affichage | Source |
| --- | --- |
| Groupe d’exercice | L’identité stable de l’exercice budgétaire de l’en-tête et le libellé de l’exercice courant. |
| Version | Chaque valeur `egcs_fc_version` distincte trouvée dans les lignes mensuelles actives de cet en-tête. Un en-tête sans ligne est représenté comme version `0`. |
| État | L’unique état de l’en-tête de prévision; toutes les versions affichées ont donc le même état de cycle de vie. |
| Lignes et total | Nombre et somme des lignes actives de cet en-tête et de cette version. Les totaux utilisent la devise de l’entente sans conversion. |

La recherche correspond à l’exercice, à la version, à l’état localisé, au nombre de lignes ou au total. Le filtrage, le regroupement, le tri et la pagination se font dans le navigateur après le chargement du résumé complet.

Sélectionnez **Ajouter une version** pour saisir une nouvelle estimation dans le même dossier de prévision. L’action ouvre le prochain numéro de version dans l’URL; elle ne copie pas les montants précédents et ne crée pas de dossier distinct. Les cellules non nulles enregistrées portent le nouveau numéro. Par exemple, la version 0 peut prévoir 2 000,00 en avril et 3 000,00 en mai, soit 5 000,00. Pour montrer un retard dans la version 1, saisissez 1 000,00 en avril et 4 000,00 en mai. Le total reste 5 000,00; les deux versions partagent le statut de la prévision.

::: warning Unicité des en-têtes et des versions
Pour la saisie normale, conservez un dossier de prévision par exercice et un montant par ligne budgétaire, mois et version. Confirmez le dossier voulu avant de le modifier, de le supprimer ou d’ajouter une version depuis un groupe d’exercice.

**Détail technique pour les importations et intégrations :** l’API permet plusieurs dossiers de prévision inactifs pour la même entente et le même exercice, ainsi que des lignes actives en double pour une même prévision, ligne budgétaire, mois et version. Les actions de groupe supposent un dossier par exercice; la correspondance en mémoire de la grille de détails ne conserve qu’un doublon. La grille affichée peut donc masquer des montants importés en double.
:::

## Modifier la ventilation mensuelle

La route de détails accepte une valeur `version` dans la requête; en son absence, la valeur par défaut est `0`. La grille regroupe les lignes du budget courant par catégorie de coûts bilingue et par sous-section de coûts. Elle montre d’abord les totaux trimestriels d’avril à mars; sélectionnez l’en-tête d’un trimestre pour afficher ses trois champs mensuels. La recherche correspond à la catégorie, à la sous-section, aux noms de ligne dans les deux langues ou à la description.

Le tableau suivant comprend les formats techniques de l’API utilisés par les importations et les intégrations.

| Champ de ligne | Règle |
| --- | --- |
| Prévision | En-tête modifiable obligatoire de cette entente. Une requête PATCH directe peut déplacer une ligne vers une autre prévision modifiable de la même entente. |
| Ligne budgétaire | Identité stable obligatoire d’une ligne de la version budgétaire courante, de la même entente et du même exercice que la prévision cible. |
| Mois | Entier de `0` à `11`, soit d’avril à mars. |
| Montant | Valeur `numeric(19,2)` obligatoire, comportant au plus deux décimales et dont la valeur absolue ne dépasse pas `99999999999999999.99`, transmis en texte décimal exact. Le schéma de requête impose des montants non négatifs pour le programme et le coût total. |
| Devise | Valeur d’énumération de devise obligatoire. Les nouvelles lignes héritent de la devise de l’entente portée par la ligne budgétaire; aucune conversion de devise n’est effectuée. |
| Version | Entier non négatif obligatoire, normalisé en texte décimal pour l’API et stocké comme bigint. |

1. Saisissez les montants du programme attendus par mois, avec des montants de zéro ou plus. Sélectionnez l’en-tête d’un trimestre pour ouvrir ses champs mensuels.
2. Sélectionnez **Enregistrer la ventilation**. Une nouvelle cellule à zéro ne crée aucune ligne. Mettre une cellule existante à zéro conserve cette ligne avec un montant nul.
3. Si l’enregistrement échoue, actualisez la page et comparez les cellules enregistrées à la prévision voulue. Les premières cellules peuvent déjà être enregistrées. Corrigez la cellule signalée et les modifications non enregistrées, puis enregistrez de nouveau.

**Contrat technique :** les cellules sont enregistrées dans l’ordre, sans transaction couvrant toute la grille. Une ligne existante modifiée utilise PATCH et exige `update`; une ligne manquante non nulle utilise POST et exige `create`.

Les écritures ordinaires de lignes conservent le statut métier de l’organisme. L’API peut supprimer logiquement des lignes individuelles, mais la grille actuelle n’offre aucune action de suppression de ligne. La suppression d’un en-tête modifiable supprime logiquement celui-ci et toutes ses lignes actives de façon atomique.

L’exercice de l’en-tête ne peut pas changer tant qu’une ligne active existe. Le serveur vérifie l’exercice courant cible et refuse le déplacement; il ne masque pas silencieusement les anciennes lignes. Choisissez le bon exercice avant la saisie.

## Cycle de vie et achèvement

Vous ne pouvez pas modifier une prévision lorsque l’organisme a rendu son statut en lecture seule ou terminal, lorsqu’un achèvement a été consigné ou lorsque du travail de flux protégé empêche les changements. Le statut métier n’est pas déduit de noms fixes tels que `inprogress` ou `approved`.

Achèvement exige Contributeur et l’affectation à cette prévision, un en-tête modifiable, aucun achèvement antérieur et au moins une ligne active, toutes versions confondues. Un flux actif le bloque. L’action consigne l’utilisateur et le commentaire facultatif puis démarre atomiquement la soumission d’approbation configurée, ou consigne `no_workflow`. Le crochet de suivi de l’application s’exécute après la validation de la transaction en base de données.

Achèvement couvre tout le dossier de prévision, y compris chaque version, plutôt que seulement celle que vous consultez. Elle ne copie pas de version et n’exige pas une ligne pour chaque coordonnée mensuelle visible. À l’issue réussie de l’achèvement, cette prévision devient active et les autres prévisions actives de la même entente et identité d’exercice sont désactivées. Sans flux, c’est immédiat; avec un flux, cela attend sa réussite.

## Approbation et exemple de remplacement

Publiez un flux de soumission pour `fundingcaseforecast` afin d’exiger examen ou approbation à l’achèvement. Incluez le modèle ou plan publié; un modèle seul ne relie pas le parcours. Suivez les étapes dans la section Flux. Les flux standard sont choisis explicitement et ne remplacent pas Achèvement.

Par exemple, conservez une prévision active de 12 000,00 pendant la préparation d’une prévision de remplacement de 10 000,00 à la suite d’un retard du projet. Saisissez et enregistrez ses lignes mensuelles, achevez-le puis terminez son approbation. La réussite remplace l’en-tête actif de cette entente/exercice; un échec ou une annulation ne l’active pas. Puisque plusieurs en-têtes inactifs sont permis, identifiez soigneusement le dossier voulu plutôt que traiter chaque version affichée comme une prévision approuvée indépendante.

Consultez [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).

## Rétablissement

- L’achèvement ne peut pas être répété ni annulé à partir de cette page. Créez une prévision de remplacement seulement après avoir vérifié s’il existe déjà un en-tête pour cet exercice.
- Les prévisions verrouillées ne peuvent pas être modifiées ni supprimées par ces routes. La suppression d’une prévision modifiable est logique plutôt que physique.
- Si le sélecteur d’exercice est vide, ajoutez des lignes actives au [Budget](budget.md) courant de l’entente; l’interface n’offre pas un exercice sans ligne budgétaire courante, même si le serveur valide le dossier d’exercice lui-même.
- Lorsqu’un amendement budgétaire remplace les rangées courantes tout en préservant la filiation stable, la prévision suit les identités d’exercice et de ligne correspondantes. Une ligne courante supprimée ou sans correspondance disparaît de la grille modifiable.

## Ventilation du financement et contrôles budgétaires annuels

Une ligne financière indique comment un coût sera payé : le montant demandé au programme, le coût total et les montants provenant d’autres sources. Ces sources sont classées selon les sous-types de financement configurés pour le volet.

Enregistrez d’abord la ligne mensuelle ou soumise, puis utilisez son éditeur de financement pour saisir le coût total et les autres sources. Choisissez chaque sous-type une seule fois. Les choix proviennent de ce volet; une allocation existante peut conserver son sous-type retiré.

Le coût total ne peut être inférieur au financement du programme. Dès que des autres sources sont saisies, leur somme avec le programme doit égaler exactement le coût total.

Votre volet peut exiger une ventilation pour les prévisions, les réclamations, les deux ou aucune des deux. Lorsqu’elle l’est, chaque ligne active doit avoir au moins une allocation d’autres fonds enregistrée et une ventilation exactement équilibrée avant Achèvement. Cela comprend toutes les versions de prévision rédigées, pas seulement celle affichée.

Par exemple, un équipement de 1 000,00 peut être financé par 700,00 du programme et 300,00 d’une autre source : 700,00 + 300,00 = 1 000,00. Saisir seulement 250,00 de cette source laisse un écart de 50,00; la ventilation ne peut donc pas être enregistrée comme équilibrée.

Un import de brouillon peut laisser du travail à terminer; examinez les lignes enregistrées avant l’achèvement.

L’enregistrement des lignes et l’achèvement vérifient aussi le budget annuel courant dans la devise de l’entente.

Chaque version de prévision saisie est vérifiée séparément par rapport aux limites annuelles; les versions sont des estimations différentes, dont les montants ne sont pas additionnés entre elles.

Les réclamations partagent la limite annuelle avec les autres réclamations actuellement comptées. Une réclamation cesse d’utiliser cette capacité lorsque son issue courante enregistrée est sans succès, refusée, annulée ou en échec. Modifier seulement le libellé de statut affiché ne libère pas le montant.

Pour les rapprochements, le contrôle comprend votre montant proposé et les rapprochements antérieurs réussis. Les réclamations ou dossiers à issue négative sont exclus.

L’application vérifie des limites annuelles distinctes pour le financement du programme, le coût total et chaque type d’autres fonds. Les montants rapprochés sont comptés dans la limite du financement du programme.

Par exemple, 10 000 de financement annuel du programme avec une réclamation comptée de 6 000 laisse 4 000 pour une autre réclamation. Une proposition de 4 500 échoue même si son promoteur ou sa ligne de coûts diffère.

Actualisez le budget et les dossiers comptés, corrigez le montant ou la source, ou appliquez une modification autorisée. Une requête refusée annule cette requête; les premières requêtes de la grille peuvent déjà être enregistrées.
