# Engagements d’entente

Les engagements regroupent les lignes de codage financier que les paiements peuvent utiliser. Ouvrez une entente et sélectionnez **Engagements** pour voir le type, l’état, le nombre de lignes et le total en dollars canadiens de chaque engagement; sélectionnez le type pour ouvrir sa page de détails.

## Avant de commencer

| Exigence | Comportement vérifié |
| --- | --- |
| Autorisation | Lecteur Entente consulte. La création d’un engagement exige Contributeur et l’affectation exacte à l’entente, puis rend le créateur principal. Les mutations suivantes de l’engagement ou de ses lignes exigent Contributeur ou Gestionnaire et l’affectation exacte à l’engagement. |
| Budget courant de l’entente | Le total des lignes actives de chaque engagement est plafonné par le financement de programme total de la version budgétaire courante de l’entente. |
| Plan comptable | Le volet de l’entente doit comporter des entrées de plan comptable liées à ses budgets. Le sélecteur recherche l’exercice affiché et les dimensions comptables conservées, et ne permet pas de choisir la configuration d’un autre volet. |
| Dossier d’utilisateur commun | L’achèvement exige que le compte connecté corresponde à un `Common_User` actif. |
| Flux de travaux d’achèvement facultatif | Le flux publié de soumission d’approbation sélectionné démarre à l’achèvement, s’il existe; sinon les effets positifs sont immédiats. |

Les écritures s’exécutent dans une transaction qui verrouille l’entente et l’agrégat d’engagement touché, recharge la portée de l’entente et répète l’autorisation avant la modification. Un dossier absent, supprimé, rattaché à une autre entente ou non autorisé n’est pas révélé comme une ressource enfant utilisable.

## Créer et trouver des engagements

Choisissez **Ajouter un engagement**, sélectionnez un des types bilingues configurés pour le volet de l’entente, puis enregistrez. Un engagement créé par le noyau reçoit le statut Brouillon de l’organisme, est inactif et n’a aucun numéro de système financier. L’interface principale modifie uniquement le type; le numéro de système financier est exposé par les API, mais n’est pas modifiable ici.

La recherche de l’onglet correspond au libellé localisé du type ou de l’état, au nombre de lignes ou au total affiché. Les résultats sont filtrés et paginés dans le navigateur après le chargement du résumé complet.

Une extension activée peut ajouter une action de création ou remplacer l’action principale. Des actions de remplacement en conflit désactivent la création et affichent un avertissement. Consultez la documentation de l’extension responsable pour connaître tout processus de création ajouté et la provenance conservée.

## Gérer les lignes d’engagement

La page de détails affiche le fil d’Ariane de l’entente et l’état, puis les sections des lignes, de l’achèvement et du flux de travaux. Elle n’affiche aucune section d’approbation d’engagement.

| Champ | Règle |
| --- | --- |
| Numéro de ligne d’engagement | Nombre entier obligatoire de 1 à 32 767. Dans un engagement, la combinaison active du numéro de ligne et de l’entrée du plan comptable doit être unique. |
| Entrée du plan comptable | Obligatoire. Elle doit être active et appartenir au volet exact de l’entente. Son exercice et ses dimensions comptables ordonnées et localisées figurent dans le sélecteur et le tableau. |
| Montant | Valeur monétaire `numeric(19,2)` obligatoire, comportant au plus deux décimales et dont la valeur absolue ne dépasse pas `99999999999999999.99`, transmis en texte décimal exact. Le validateur actuel n’exige pas un montant positif ou non négatif. |

La recherche de la page de détails correspond au numéro de ligne, à l’exercice, à chaque composante de codage affichée ou au montant. La carte de total additionne toutes les lignes non filtrées et présente le résultat en dollars canadiens; aucune conversion de devise n’est effectuée.

Les changements ordinaires de lignes conservent le statut métier de l’organisme. Une requête PATCH peut déplacer une ligne vers un autre engagement modifiable de la même entente, même si le formulaire actuel la conserve dans l’engagement affiché. La suppression logique masque une ligne; la suppression d’un engagement modifiable supprime logiquement celui-ci et toutes ses lignes actives dans la même transaction.

## Mesures de protection financière

| Protection | Portée exacte |
| --- | --- |
| Plafond du financement de programme courant | Pour l’engagement visé, les lignes actives existantes plus le montant nouveau ou de remplacement ne peuvent pas dépasser la somme du `financement de programme` de la version budgétaire courante de l’entente. Il s’agit d’un plafond par engagement, et non d’un plafond partagé entre tous les types ou toutes les versions d’engagement. |
| Contrôle par la base de données | PostgreSQL répète cette règle au moyen de déclencheurs de contrainte différés après les écritures de lignes d’engagement, les changements aux lignes du budget courant et les changements de version courante. La transaction ne peut donc pas être validée si un engagement actif dépasse le financement de programme courant total. |
| Plancher du montant payé | Une modification ne peut réduire le montant sous les allocations de paiement rattachées à cette ligne exacte. Les paiements non supprimés comptent sauf si leur dernière preuve d’approbation cible est `denied`; un libellé métier ne définit pas le refus. Toute référence active de ligne de paiement empêche aussi de changer l’engagement ou l’entrée comptable de la ligne, même après un refus d’approbation. |
| Cycle de vie verrouillé | La preuve d’achèvement, un flux protégé et les statuts en lecture seule ou terminaux verrouillent les mutations ordinaires de l’engagement et de ses lignes. |

Si une réduction budgétaire place un engagement au-dessus du nouveau financement de programme courant, PostgreSQL refuse la transaction. Rétablissez un financement courant suffisant ou réduisez d’abord les lignes d’un engagement encore modifiable. Les échecs de validation ou de contrainte ne laissent aucune modification partielle.

::: warning Le signe du montant n’est pas contrôlé
L’application accepte actuellement les montants nuls et négatifs dans les lignes d’engagement. L’écran ne doit pas être considéré comme imposant un engagement financier positif; appliquez les contrôles d’examen de l’agence avant l’achèvement.
:::

## Achever un engagement

Achèvement exige Contributeur et l’affectation exacte à l’engagement, un dossier modifiable, aucun achèvement antérieur et au moins une ligne active. Les commentaires sont facultatifs. Le serveur verrouille et revérifie l’agrégat, l’utilisateur et les permissions; un flux actif bloque l’action.

La transaction consigne Achèvement et démarre la soumission d’approbation sélectionnée si elle existe; sinon elle consigne `no_workflow`. Le crochet d’achèvement est émis après validation. L’action verrouille l’édition ordinaire sans attribuer un statut métier codé en dur `complete`.

À la terminaison positive — immédiate sans flux, sinon après sa réussite — l’engagement devient actif et les autres engagements actifs de la même entente et du même type sont désactivés. La base impose aussi un seul engagement actif non supprimé par entente/type. Un échec ou une annulation n’active pas le remplacement.

Par exemple, conservez l’engagement actif pendant la préparation de son remplacement. Achevez le remplacement et terminez son approbation. Seule la réussite l’active. Vérifiez l’engagement actif avant un paiement; le sélecteur peut afficher un historique avec preuve d’achèvement qui n’est plus actif.

## Configuration de l’approbation

Pour exiger une approbation, publiez un flux `approval_submission` pour `fundingcaseagreementcommitment` et incluez le modèle, plan d’examen ou de recommandation publié approprié. Un modèle seul est une configuration, non la garantie d’un parcours. Achèvement démarre maintenant ce flux par le moteur partagé; suivez ses approbations dans la section Flux.

Un flux standard reste un choix explicite facultatif et ne démarre jamais du seul fait de l’achèvement. Pour une tentative refusée, échouée, suspendue ou annulée, utilisez les actions de reprise et la politique figée. Consultez [Flux de travail](../concepts/workflows.md) et [Approbations et achèvements](../concepts/approvals-completions.md).

## Rétablissement et suppression

- Un achèvement ne peut pas être répété ni annulé à partir de la page d’engagement. Créez un nouvel engagement lorsqu’un remplacement est nécessaire.
- Les engagements verrouillés et leurs lignes ne peuvent pas être supprimés par ces routes. La suppression d’un engagement modifiable est logique plutôt que physique et retire ses lignes des listes normales.
- Si une entrée du plan comptable manque dans le sélecteur, vérifiez que l’entrée, le budget du volet, le budget d’exercice du programme et l’exercice de l’organisme sont actifs et appartiennent au volet de l’entente.
- Si l’achèvement signale un état non valide, vérifiez que le dossier demeure modifiable, qu’il comporte au moins une ligne active et qu’il n’a pas déjà été achevé.
