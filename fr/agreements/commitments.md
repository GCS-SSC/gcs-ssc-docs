# Engagements d’entente

Un engagement réserve un montant pour un type de financement de l’entente et le répartit selon le codage financier. Les demandes de paiement utilisent ces lignes, selon le solde disponible. Ouvrez une entente et sélectionnez **Engagements** pour voir le type, l’état, le nombre de lignes et le total déclaré dans la devise de l’entente de chaque engagement; sélectionnez le type pour ouvrir sa page de détails.

## Avant de commencer

| Exigence | Comportement vérifié |
| --- | --- |
| Autorisation | Lecteur Entente permet la consultation. Pour créer, vous devez avoir le niveau Contributeur et être affecté à cette entente précise; vous devenez l’affectataire principal. Pour modifier ensuite l’engagement ou ses lignes, vous devez avoir le niveau Contributeur ou Gestionnaire et être affecté à cet engagement précis. |
| Budget courant de l’entente | Le total des lignes actives de chaque engagement est plafonné par le financement de programme total de la version budgétaire courante de l’entente. |
| Plan comptable | Le volet de l’entente doit comporter des entrées de plan comptable liées à ses budgets. Le sélecteur recherche l’exercice affiché et les dimensions comptables conservées, et ne permet pas de choisir la configuration d’un autre volet. |
| Dossier d’utilisateur commun | Votre compte connecté doit avoir un dossier d’utilisateur actif (`Common_User`) avant de pouvoir achever. |
| Flux de travaux d’achèvement facultatif | Achèvement démarre le flux publié de soumission d’approbation sélectionné s’il est configuré. Sinon, sa réussite active immédiatement l’engagement. Identifiants techniques : `approval_submission`, `fundingcaseagreementcommitment`. |

Avant d’enregistrer, le serveur verrouille l’entente et l’engagement touché avec ses lignes, vérifie encore leur appartenance et vos permissions. Les changements sont tous enregistrés ou aucun ne l’est. Un dossier absent, supprimé, rattaché à une autre entente ou hors de votre accès ne peut pas être utilisé par cette entente.

## Créer et trouver des engagements

Choisissez **Ajouter un engagement**, sélectionnez un des types bilingues configurés pour le volet de l’entente, puis enregistrez. Un engagement créé par le noyau reçoit le statut Brouillon de l’organisme, est inactif et n’a aucun numéro de système financier. L’interface principale modifie le type et le total déclaré dans la devise de l’entente; le numéro de système financier est exposé par les API, mais n’est pas modifiable ici.

La recherche de l’onglet correspond au libellé localisé du type ou de l’état, au nombre de lignes ou au total affiché. Les résultats sont filtrés et paginés dans le navigateur après le chargement du résumé complet.

Une extension activée peut ajouter une action de création ou remplacer l’action principale. Des actions de remplacement en conflit désactivent la création et affichent un avertissement. Consultez la documentation de l’extension responsable pour connaître tout processus de création ajouté et la provenance conservée.

## Gérer les lignes d’engagement

Utilisez une ligne pour chaque allocation comptable requise. Par exemple, pour un engagement déclaré de 10 000 CAD, saisissez 6 000 CAD sur une entrée du plan comptable et 4 000 CAD sur une autre. Vérifiez que les deux entrées appartiennent au volet de l’entente et à l’exercice voulu. Les lignes totalisent 10 000 CAD; le financement de programme courant doit aussi atteindre au moins 10 000 CAD.

La page de détails affiche le fil d’Ariane de l’entente et l’état, puis les sections des lignes, de l’achèvement et du flux de travaux. Les approbations créées par un flux configuré apparaissent dans la section partagée Flux de travail.

| Champ | Règle |
| --- | --- |
| Numéro de ligne d’engagement | Nombre entier obligatoire de 1 à 32 767. Dans un engagement, la combinaison active du numéro de ligne et de l’entrée du plan comptable doit être unique. |
| Entrée du plan comptable | Obligatoire. Elle doit être active et appartenir au volet exact de l’entente. Son exercice et ses dimensions comptables ordonnées et localisées figurent dans le sélecteur et le tableau. |
| Montant | Valeur monétaire `numeric(19,2)` obligatoire, comportant au plus deux décimales et dont la valeur absolue ne dépasse pas `99999999999999999.99`, transmis en texte décimal exact. Le validateur actuel n’exige pas un montant positif ou non négatif. |

La recherche de la page de détails correspond au numéro de ligne, à l’exercice, à chaque composante de codage affichée ou au montant. Comparez le total déclaré à toutes les lignes de codage non filtrées dans la devise de l’entente; aucune conversion n’est effectuée.

Les changements ordinaires de lignes conservent le statut métier de l’organisme. Une requête PATCH peut déplacer une ligne vers un autre engagement modifiable de la même entente, même si le formulaire actuel la conserve dans l’engagement affiché. La suppression logique masque une ligne; la suppression d’un engagement modifiable supprime logiquement celui-ci et toutes ses lignes actives dans la même transaction.

## Mesures de protection financière

| Protection | Portée exacte |
| --- | --- |
| Plafond du financement de programme courant | Pour l’engagement visé, les lignes actives existantes plus le montant nouveau ou de remplacement ne peuvent pas dépasser la somme du `financement de programme` de la version budgétaire courante de l’entente. Il s’agit d’un plafond par engagement, et non d’un plafond partagé entre tous les types ou toutes les versions d’engagement. |
| Contrôle par la base de données | La base vérifie le plafond après les changements aux lignes d’engagement, aux lignes budgétaires courantes ou à la version budgétaire courante. Elle refuse l’enregistrement si un engagement actif dépasse le financement de programme courant. Mécanisme technique : déclencheurs de contrainte différés PostgreSQL. |
| Plancher du montant payé | Vous ne pouvez pas réduire une ligne sous les montants de paiement qui lui sont affectés. Les paiements non supprimés comptent sauf si leur dernière preuve d’approbation est `denied`; changer un libellé d’état ne suffit pas. Si une ligne de paiement active vise cette ligne, vous ne pouvez pas non plus changer son engagement ou son entrée comptable, même après un refus d’approbation. |
| Cycle de vie verrouillé | Vous ne pouvez pas modifier normalement un engagement ou ses lignes après Achèvement, pendant le travail protégé d’un flux, ou lorsque le statut de l’organisme le rend en lecture seule ou final. |

Si une réduction budgétaire place un engagement au-dessus du nouveau financement de programme courant, PostgreSQL refuse la transaction. Rétablissez un financement courant suffisant ou réduisez d’abord les lignes d’un engagement encore modifiable. Les échecs de validation ou de contrainte ne laissent aucune modification partielle.

::: warning Les lignes brouillons signées exigent un examen
Le schéma des lignes d’engagement permet des montants nuls et signés dans les brouillons; cela n’autorise pas l’achèvement d’une allocation déséquilibrée. Le total déclaré doit être non négatif, Achèvement exige son égalité exacte avec le total des lignes, et un remplacement doit préserver la couverture des montants déjà payés par codage. Ces contrôles agrégés n’imposent pas une règle universelle de positivité à chaque ligne brouillon. Examinez chaque allocation avant l’achèvement.
:::

## Achever un engagement

Pour achever, vous devez avoir le niveau Contributeur et être affecté à cet engagement précis. Il doit encore être modifiable, comporter au moins une ligne active et n’avoir aucun achèvement antérieur. Les commentaires sont facultatifs. Le serveur revérifie l’engagement, ses lignes, votre dossier d’utilisateur et vos permissions avant l’enregistrement. Un flux actif empêche Achèvement.

Achèvement consigne l’action et démarre le flux de soumission d’approbation sélectionné s’il est configuré. Sans flux d’approbation, il consigne `no_workflow`. L’engagement devient verrouillé pour l’édition ordinaire. Son statut métier suit la configuration de l’organisme plutôt que de toujours passer à un statut nommé `complete`.

::: info Note technique
Le dossier d’achèvement et le démarrage du flux sont enregistrés dans une transaction. Le crochet d’achèvement est émis après validation.
:::

L’engagement devient actif lorsque l’achèvement réussit : immédiatement sans flux d’approbation, ou après la réussite du flux configuré. Tout engagement auparavant actif du même type dans cette entente devient inactif. Un seul engagement non supprimé de chaque type peut être actif, et la base impose cette limite. Un échec ou une annulation d’approbation laisse le remplacement inactif.

Par exemple, conservez l’engagement actif pendant la préparation de son remplacement. Achevez le remplacement et terminez son approbation. Seule la réussite l’active. Vérifiez l’engagement actif avant un paiement; le sélecteur peut afficher un historique avec preuve d’achèvement qui n’est plus actif.

## Configuration de l’approbation

Pour exiger une approbation, publiez un flux `approval_submission` pour `fundingcaseagreementcommitment` et incluez le modèle, plan d’examen ou de recommandation publié approprié. Un modèle seul est une configuration, non la garantie d’un parcours. Achèvement démarre maintenant ce flux par le moteur partagé; suivez ses approbations dans la section Flux.

Un flux standard reste un choix explicite facultatif et ne démarre jamais du seul fait de l’achèvement. Pour une tentative refusée, échouée, suspendue ou annulée, utilisez les actions de reprise et la politique figée. Consultez [Flux de travail](../concepts/workflows.md) et [Approbations et achèvements](../concepts/approvals-completions.md).

## Rétablissement et suppression

- Un achèvement ne peut pas être répété ni annulé à partir de la page d’engagement. Créez un nouvel engagement lorsqu’un remplacement est nécessaire.
- Les engagements verrouillés et leurs lignes ne peuvent pas être supprimés par ces routes. La suppression d’un engagement modifiable est logique plutôt que physique et retire ses lignes des listes normales.
- Si une entrée du plan comptable manque dans le sélecteur, vérifiez que l’entrée, le budget du volet, le budget d’exercice du programme et l’exercice de l’organisme sont actifs et appartiennent au volet de l’entente.
- Si l’achèvement signale un état non valide, vérifiez que le dossier demeure modifiable, qu’il comporte au moins une ligne active et qu’il n’a pas déjà été achevé.

## Total déclaré et couverture de remplacement

Le total déclaré est le montant que vous souhaitez engager. Les lignes de codage précisent sa répartition comptable. Un remplacement change l’engagement utilisé pour les paiements futurs; il doit encore couvrir les sommes déjà payées.

Saisissez un total déclaré exact non négatif lors de la création ou modification. Sa devise doit correspondre à l’entente. Les lignes de codage ne peuvent dépasser ce total ni le financement courant du programme dans la même devise. Achèvement exige aussi que leur total actif égale exactement la déclaration. Une déclaration de 10 000 avec 9 999,99 codés ne peut être achevée; enregistrez le cent manquant ou corrigez la déclaration avant soumission.

Un remplacement doit conserver la couverture de l’argent déjà payé sous l’engagement actif du même type et de la même devise. Le serveur vérifie les planchers payés par codage à Achèvement et à l’activation positive. Il comprend les effets de journal réussis, les corrections comptabilisées et les recouvrements effectifs. Un refus de couverture laisse l’engagement existant actif; remplacer son en-tête ne fournit pas une nouvelle capacité inutilisée.

Par exemple, si les montants payés effectifs sont de 3 000 CAD sur le codage A et de 1 000 CAD sur le codage B, le remplacement doit préserver au moins ces montants sur les codages correspondants. Un remplacement totalisant 10 000 CAD peut quand même échouer s’il affecte seulement 2 500 CAD au codage A. Examinez les montants payés effectifs, pas seulement le total du remplacement.

Une modification ordinaire ne peut réduire une ligne sous son plancher payé effectif ni déplacer un codage déjà utilisé par des paiements/effets comptables. Examinez les soldes des [Paiements](./payments.md) et l’historique avant de réduire un engagement. Une [Correction](./corrections.md) ouverte bloque le travail ordinaire d’engagement jusqu’à résolution de son issue.
