# Pièces de journal

Ouvrez **Pièces de journal** depuis la navigation principale pour corriger la répartition comptable d’un paiement finalisé. Une pièce change les comptes ou les autres codes comptables servant à classer le paiement, tout en conservant le paiement et son montant décaissé. Utilisez une [Correction d’entente](./corrections.md) pour changer le montant payé comptabilisé lui-même.

## Source et accès

Pour créer une pièce, vous devez avoir la permission `journal_voucher` de création pour l’entente propriétaire, l’affectation requise à cette entente et le droit de lire le paiement choisi. Le créateur devient le responsable principal de la pièce. La modification, Achèvement et le travail d’équipe exigent l’affectation et la permission propres à la pièce. Cela ne donne pas le droit de lire le paiement source. Le sélecteur présente les paiements finalisés admissibles et impose la devise de l’entente.

Choisissez un paiement, une date demandée et les descriptions facultatives française/anglaise (maximum de 10 000 caractères chacune). La création conserve une copie des montants répartis et des codes comptables du paiement d’origine. Le paiement source ne change plus ensuite. L’exercice de l’organisme possède un paramètre **JV ouvert** que le flux d’approbation peut vérifier. Les flux configurés peuvent aussi vérifier que la source est finalisée et qu’une justification est présente. Voir un paiement dans le sélecteur ne garantit pas que le flux d’approbation l’acceptera.

## Corriger le codage

Examinez les allocations d’origine puis saisissez les allocations corrigées avec une ligne d’engagement, une entrée admissible du plan comptable (le code comptable) et un montant de zéro ou plus, saisi à deux décimales. Au plus 500 allocations corrigées peuvent être soumises. Leur somme doit correspondre au montant d’origine **pour chaque ligne d’engagement**, et pas seulement pour toute la pièce. Une ligne d’engagement absente des sources ne peut être ajoutée. L’application calcule les lignes d’ajustement positives et négatives à partir de vos allocations; ne les saisissez pas manuellement.

Par exemple, 1 000 sur la ligne d’engagement 1 entièrement codés au compte A peuvent être corrigés en 600 sur A et 400 sur B. L’ajustement calculé est −400 sur A et +400 sur B, sans changement du décaissement. Déplacer ces 400 sur la ligne d’engagement 2 échoue même si le total global reste identique.

L’enregistrement remplace toutes les allocations corrigées ensemble et conserve les détails du paiement d’origine. Un brouillon peut être inchangé, mais Achèvement exige un véritable changement non nul et des ajustements calculés dont les augmentations et les diminutions s’équilibrent. Des totaux invalides, un codage manquant ou des montants hors plage laissent l’enregistrement inchangé.

## Achever, contrepasser et remplacer

Utilisez Achèvement dans l’espace de la pièce auquel vous êtes affecté, puis suivez son flux d’approbation configuré. L’édition ordinaire est verrouillée après Achèvement. Les ajustements changent les totaux comptables de l’application uniquement lorsque la réussite de l’achèvement est enregistrée. Un simple statut affiché ne suffit pas à établir que les ajustements ont pris effet.

Une contrepassation n’est permise que pour la dernière pièce ordinaire achevée avec succès de ce paiement. Elle échange les allocations d’origine et corrigées conservées pour annuler exactement les changements de codage précédents. La contrepassation est un nouveau dossier avec sa propre affectation et doit elle-même réussir. Une contrepassation utilise les détails conservés avec la pièce sans élargir l’accès au paiement source. Pour le transfert de 400 ci-dessus, une contrepassation réussie remet 400 au compte A et retire 400 du compte B.

Un remplacement suit la dernière contrepassation achevée avec succès ou la dernière pièce ordinaire dont l’achèvement n’a pas réussi. Choisissez l’action prise en charge sur ce dernier dossier. Ne créez pas de pièces ordinaires simultanées pour contourner la séquence. L’historique terminé ne peut pas être modifié. Supprimer un brouillon modifiable le retire du travail actif tout en conservant son dossier enregistré; cela ne contrepassera pas une pièce réussie.

Si Achèvement échoue, comparez les totaux d’origine et corrigés de chaque ligne d’engagement et vérifiez qu’un changement de codage existe. Si une action de séquence manque, examinez la dernière pièce et son issue courante. Actualisez après un enregistrement incertain avant de réessayer. Consultez [Paiements](./payments.md) et [Clôtures](./closeouts.md).
