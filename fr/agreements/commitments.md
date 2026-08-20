# Engagements d’entente

Les engagements regroupent les lignes de codage financier que les paiements peuvent utiliser. Ouvrez une entente et sélectionnez **Engagements** pour voir le type, l’état, le nombre de lignes et le total en dollars canadiens de chaque engagement; sélectionnez le type pour ouvrir sa page de détails.

## Avant de commencer

| Exigence | Comportement vérifié |
| --- | --- |
| Autorisation | Lecteur Entente consulte. La création d’un engagement exige Contributeur et l’affectation exacte à l’entente, puis rend le créateur principal. Les mutations suivantes de l’engagement ou de ses lignes exigent Contributeur ou Gestionnaire et l’affectation exacte à l’engagement. |
| Budget courant de l’entente | Le total des lignes actives de chaque engagement est plafonné par le financement de programme total de la version budgétaire courante de l’entente. |
| Engagements du volet | Le volet de l’entente doit comporter des engagements par exercice avec leur codage financier. Le sélecteur recherche la description du grand livre ou l’exercice et ne permet pas de choisir la configuration d’un autre volet. |
| Dossier d’utilisateur commun | L’achèvement exige que le compte connecté corresponde à un `Common_User` actif. |
| Flux de travaux d’achèvement facultatif | Un flux de travaux publié pour `fundingcaseagreementcommitment` peut démarrer après l’achèvement. Son résultat terminal configuré peut ensuite modifier l’état de l’engagement. |

Les écritures s’exécutent dans une transaction qui verrouille l’entente et l’agrégat d’engagement touché, recharge la portée de l’entente et répète l’autorisation avant la modification. Un dossier absent, supprimé, rattaché à une autre entente ou non autorisé n’est pas révélé comme une ressource enfant utilisable.

## Créer et trouver des engagements

Choisissez **Ajouter un engagement**, sélectionnez un type, puis enregistrez. Les types pris en charge sont `commitment`, `paye`, `paye2` et `pyp`. Un engagement créé par le noyau commence à l’état `draft`, est inactif et n’a aucun numéro de système financier. L’interface principale modifie uniquement le type; le numéro de système financier est exposé par les API, mais n’est pas modifiable ici.

La recherche de l’onglet correspond au libellé localisé du type ou de l’état, au nombre de lignes ou au total affiché. Les résultats sont filtrés et paginés dans le navigateur après le chargement du résumé complet.

Une extension activée peut ajouter une action de création ou remplacer l’action principale. Des actions de remplacement en conflit désactivent la création et affichent un avertissement. En particulier, [Répartition des coûts par résultat](../extensions/outcome-cost-allocation.md) peut remplacer la création, produire un engagement `inprogress`, générer des lignes à partir de la répartition active et des correspondances du volet, puis conserver la provenance. Si sa configuration ne s’applique pas, son point d’extension côté serveur laisse la création principale se poursuivre.

## Gérer les lignes d’engagement

La page de détails affiche le fil d’Ariane de l’entente et l’état, puis les sections des lignes, de l’achèvement et du flux de travaux. Elle n’affiche aucune section d’approbation d’engagement.

| Champ | Règle |
| --- | --- |
| Numéro de ligne d’engagement | Nombre entier obligatoire de 1 à 32 767. Dans un engagement, la combinaison active du numéro de ligne et de l’engagement du volet doit être unique. |
| Engagement du volet | Obligatoire. Il doit être actif et appartenir au volet exact de l’entente. Son exercice, son fonds, son grand livre et sa description, son centre financier, son ordre interne, son domaine fonctionnel et son centre de coûts figurent dans le tableau. |
| Montant | Valeur monétaire `numeric(19,2)` obligatoire, comportant au plus deux décimales et dont la valeur absolue ne dépasse pas 90 billions. Le validateur actuel n’exige pas un montant positif ou non négatif. |

La recherche de la page de détails correspond au numéro de ligne, à l’exercice, à chaque composante de codage affichée ou au montant. La carte de total additionne toutes les lignes non filtrées et présente le résultat en dollars canadiens; aucune conversion de devise n’est effectuée.

La création, la modification, le déplacement ou la suppression d’une ligne fait passer chaque engagement modifiable touché à l’état `inprogress`. Une requête PATCH peut déplacer une ligne vers un autre engagement modifiable de la même entente, même si le formulaire actuel la conserve dans l’engagement affiché. La suppression logique masque une ligne; la suppression d’un engagement modifiable supprime logiquement celui-ci et toutes ses lignes actives dans la même transaction.

## Mesures de protection financière

| Protection | Portée exacte |
| --- | --- |
| Plafond du financement de programme courant | Pour l’engagement visé, les lignes actives existantes plus le montant nouveau ou de remplacement ne peuvent pas dépasser la somme du `financement de programme` de la version budgétaire courante de l’entente. Il s’agit d’un plafond par engagement, et non d’un plafond partagé entre tous les types ou toutes les versions d’engagement. |
| Contrôle par la base de données | PostgreSQL répète cette règle au moyen de déclencheurs de contrainte différés après les écritures de lignes d’engagement, les changements aux lignes du budget courant et les changements de version courante. La transaction ne peut donc pas être validée si un engagement actif dépasse le financement de programme courant total. |
| Plancher du montant payé | Lors de la création ou de la modification d’une ligne, le montant soumis doit être au moins égal à la somme de toutes les lignes de paiement actives et non refusées de cette entente dont les lignes d’engagement utilisent le même engagement du volet. La comparaison est agrégée par engagement du volet; elle ne se limite pas à la ligne modifiée. |
| Cycle de vie verrouillé | Les engagements `complete`, `pendingapproval`, `approved` et `denied` ne peuvent être ni modifiés ni supprimés, et leurs lignes ne peuvent pas être changées. |

Si une réduction budgétaire place un engagement au-dessus du nouveau financement de programme courant, PostgreSQL refuse la transaction. Rétablissez un financement courant suffisant ou réduisez d’abord les lignes d’un engagement encore modifiable. Les échecs de validation ou de contrainte ne laissent aucune modification partielle.

::: warning Le signe du montant n’est pas contrôlé
L’application accepte actuellement les montants nuls et négatifs dans les lignes d’engagement. L’écran ne doit pas être considéré comme imposant un engagement financier positif; appliquez les contrôles d’examen de l’agence avant l’achèvement.
:::

## Achever un engagement

L’achèvement est offert uniquement avec un plafond de rôle Entente Contributeur et l’affectation exacte à l’engagement, si l’engagement demeure modifiable, si aucun achèvement antérieur n’existe et si au moins une ligne active demeure. Les commentaires sont facultatifs.

L’achèvement est atomique et effectue les actions suivantes :

1. il verrouille et revalide l’engagement, les lignes, l’utilisateur, la portée et l’autorisation;
2. il désactive tout autre engagement actif de la même entente et du même type;
3. il fait passer cet engagement à l’état `complete` et l’active;
4. il crée son unique dossier d’achèvement commun et émet le point d’extension d’achèvement après la validation de la transaction;
5. il lance tout flux de travaux d’achèvement publié configuré pour `fundingcaseagreementcommitment`.

La base de données n’autorise aussi qu’un seul engagement actif et non supprimé par entente et par type. Un engagement achevé peut être choisi pour un paiement; un engagement approuvé peut l’être uniquement s’il est actif. Consultez [Paiements](payments.md) pour les règles de solde en aval et [Flux de travaux](../concepts/workflows.md) pour les effets des états du flux de travaux.

## Limite du moteur d’approbation

Le serveur contient un moteur générique d’approbation d’engagement pour un modèle `fundingcaseagreementcommitment` associé au volet : création d’une feuille d’acheminement, décisions séquentielles, réattribution, approbations supplémentaires et état final `approved` ou `denied`. Une approbation finale active l’engagement choisi et désactive tous les autres engagements de la même entente et du même type.

Cependant, l’achèvement principal d’un engagement ne consulte **pas** ce modèle et ne crée aucune feuille d’acheminement : il achève et active toujours l’engagement directement. La page de détails actuelle ne monte non plus aucun composant d’approbation. La seule configuration d’un modèle d’approbation d’engagement ne fait donc pas soumettre l’écran principal des engagements à l’approbation. Considérez ce moteur comme une capacité d’API ou d’intégration jusqu’à ce qu’un flux hôte ou d’extension l’appelle explicitement; ne promettez pas une étape d’approbation aux utilisateurs de cet écran. Le contrat générique est décrit dans [Approbations et achèvements](../concepts/approvals-completions.md).

## Rétablissement et suppression

- Un achèvement ne peut pas être répété ni annulé à partir de la page d’engagement. Créez un nouvel engagement lorsqu’un remplacement est nécessaire.
- Les engagements verrouillés et leurs lignes ne peuvent pas être supprimés par ces routes. La suppression d’un engagement modifiable est logique plutôt que physique et retire ses lignes des listes normales.
- Si un engagement du volet manque dans le sélecteur, vérifiez que son budget de volet, le budget d’exercice du programme de paiements de transfert, l’exercice de l’agence et l’engagement du volet sont tous actifs et appartiennent au volet de l’entente.
- Si l’achèvement signale un état non valide, vérifiez que le dossier demeure modifiable, qu’il comporte au moins une ligne active et qu’il n’a pas déjà été achevé.
