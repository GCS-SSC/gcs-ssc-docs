# Notes de crédit du promoteur

Ouvrez l'onglet **Notes de crédit** d'un promoteur pour consigner l'argent reçu contre des [Créances d'entente](../agreements/receivables.md) comptabilisées. L'onglet **Comptes débiteurs** présente les dettes et soldes associés. Un encaissement consigne l'argent reçu. Une note de compensation consigne plutôt un recouvrement effectué au moyen d'un paiement. Chacun garde sa propre origine et son historique : ne consignez donc pas une référence de compensation comme nouvel argent reçu.

## Créer une note de crédit reçue

Le promoteur doit être actif. Pour créer la note :

1. Sélectionnez une agence active et ce promoteur.
2. Choisissez la devise et une ou plusieurs créances initiales comptabilisées.
3. Saisissez la date de réception et un total positif.
4. Ajoutez un motif au besoin, limité à 10 000 caractères.

Vous pouvez sélectionner, ou étiqueter, au plus 100 créances distinctes. Une étiquette identifie une dette à laquelle l'encaissement peut être appliqué. Toutes doivent appartenir à la même agence, au même promoteur et à la même devise; sélectionnez les dossiers de dette initiaux, et non leurs ajustements liés. Le serveur vérifie l'appartenance indépendamment des pages d'entente choisies. Les numéros de notes à l'échelle de l'agence demeurent stables.

La création exige la permission `account_receivable` de création à la portée de l'agence choisie. Le créateur devient principal de la note. Les permissions et les affectations propres à la note contrôlent sa modification, son codage, son achèvement et la gestion de ses affectations. Une note à portée d'agence peut recouvrer des dettes de plusieurs ententes sans vous donner accès à leurs paiements sources. Les liens vers les ententes ou les paiements exigent la permission de lecture correspondante; une référence conservée peut rester du texte si sa source ne peut être ouverte.

Les actions de création et de suppression peuvent apparaître lorsque votre rôle les permet. Avant d'ouvrir le formulaire de création ou de confirmer une suppression, l'application revérifie les conditions actuelles. Si une action est indisponible, vérifiez que le promoteur est actif ainsi que les permissions, l'affectation et l'état de la note avant de réessayer.

## Examiner le codage et les soldes

Les lignes de codage indiquent la répartition de l'encaissement entre les dettes et les écritures comptables. L'allocation automatique utilise la politique configurée de l'application ou de son extension et les comptes admissibles des dettes sélectionnées. La note conserve cette politique et ses listes de comptes lorsque vous modifiez ensuite un montant encore modifiable. Si aucune allocation automatique ne s'applique, ajoutez des lignes manuelles. Chaque ligne exige une créance étiquetée, un numéro de 1 à 32 767, une entrée admissible du plan de notes de crédit et un montant exact positif. Le total codé complet doit égaler le total reçu avant Achèvement. Les allocations automatiques conservées sont protégées contre les changements manuels.

Vérifiez le total reçu et les lignes de codage, puis les soldes. Les montants recouvrés ont déjà été appliqués; les montants réservés sont retenus pour des applications en attente; les montants disponibles restent utilisables pour un autre recouvrement. Les montants ne peuvent utiliser plus de capacité que la dette et l'ensemble des recouvrements de cette agence, de ce promoteur et de cette devise permettent. Par exemple, un encaissement de 500 étiqueté à des dettes ayant 300 et 400 disponibles peut affecter 300 à la première et 200 à la deuxième. Un encaissement de 750 ne peut être entièrement appliqué à cette capacité de 700. Vérifiez les lignes produites et leurs références d'entente et de système financier. Sélectionner une dette ne lui affecte pas un montant.

Par exemple, lorsqu'un bénéficiaire rembourse 500 CAD par virement bancaire, consignez la date de réception et le total de 500 CAD pour les dettes comptabilisées admissibles. Vérifiez que les lignes de codage totalisent aussi 500 CAD. Après l'achèvement, suivez l'état de l'approbation et confirmez la comptabilisation avant de considérer la dette comme réduite.

## Achever et reprendre

Enregistrez la note, puis achevez-la. Vous devez avoir les permissions et l'affectation propres à cette note, indépendamment de son promoteur ou de ses ententes. Un flux publié de soumission `fundingcaseaccountreceivablecreditmemo` est obligatoire; il revérifie le codage complet et la base de recouvrement. La comptabilisation applique le crédit à l'ensemble comptable. Achever une note dont l'approbation est encore en attente ne comptabilise pas l'encaissement. Les applications en attente réservent la capacité de recouvrement. Une issue finale négative libère cette réservation sans appliquer d'encaissement.

Les notes modifiables et lignes manuelles peuvent être changées ou supprimées logiquement seulement si leur cycle de vie et les contrôles d'allocation conservée le permettent. Une preuve comptabilisée ou autrement terminale est immuable. Utilisez une récupération comptable autorisée au lieu de doubler un encaissement pour corriger une erreur comptabilisée. Pour un problème de montant ou de codage, examinez les dettes étiquetées, toutes les lignes, réservations, comptes disponibles et total enregistré. Sans parcours d'approbation, demandez à un administrateur de publier le bon flux. Rechargez après un enregistrement incertain avant de créer une autre note.

Les notes produites par paiement présentent le paiement et la référence d'origine si vos permissions le permettent, la date d'effet, le codage et l'historique d'application. Suivez le flux du paiement pour une compensation non comptabilisée; ne la recréez pas ici. Consultez [Paiements](../agreements/payments.md) et [Créances](../agreements/receivables.md).
