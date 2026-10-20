# Pièces de journal

Ouvrez **Pièces de journal** depuis la navigation principale pour corriger la répartition comptable d'un paiement finalisé. Une pièce change les comptes ou les autres codes comptables servant à classer le paiement, tout en conservant le paiement et son montant décaissé. Utilisez une [Correction d'entente](./corrections.md) pour changer le montant payé comptabilisé lui-même.

## Source et accès

Pour créer une pièce, vous devez avoir la permission de créer des pièces de journal pour l'entente concernée, l'affectation requise à cette entente et le droit de lire le paiement choisi. Le créateur devient le responsable principal de la pièce. La modification, Achèvement et le travail d'équipe exigent l'affectation et la permission propres à la pièce. Cela ne donne pas le droit de lire le paiement source. Le sélecteur présente les paiements finalisés admissibles et impose la devise de l'entente.

Choisissez un paiement, une date demandée et les explications facultatives en français et en anglais, jusqu'à 10 000 caractères chacune. La création conserve une copie des montants répartis et des codes comptables du paiement d'origine. Le paiement source ne change plus ensuite. L'exercice de l'organisme possède un paramètre **JV ouvert** que le flux d'approbation peut vérifier. Les flux configurés peuvent aussi vérifier que la source est finalisée et qu'une justification est présente. Voir un paiement dans le sélecteur ne garantit pas que le flux d'approbation l'acceptera.

## Corriger le codage

Examinez les allocations d'origine puis saisissez les allocations corrigées avec une ligne d'engagement, un code comptable admissible du plan comptable et un montant de zéro ou plus, saisi à deux décimales. Au plus 500 allocations corrigées peuvent être soumises. Leur somme doit correspondre au montant d'origine **pour chaque ligne d'engagement**, et pas seulement pour toute la pièce. Une ligne d'engagement absente des sources ne peut être ajoutée. L'application calcule les lignes d'ajustement positives et négatives à partir de vos allocations. Vous ne saisissez pas ces ajustements manuellement.

Par exemple, 1 000 sur la ligne d'engagement 1 entièrement codés au compte A peuvent être corrigés en 600 sur A et 400 sur B. L'ajustement calculé est −400 sur A et +400 sur B, sans changement du décaissement. Déplacer ces 400 sur la ligne d'engagement 2 échoue même si le total global reste identique.

Enregistrez la date demandée, les explications et les allocations corrigées avant Achèvement. L'enregistrement remplace toutes les allocations corrigées ensemble et conserve les détails du paiement d'origine. Un brouillon peut être inchangé, mais Achèvement exige un véritable changement non nul et des ajustements calculés dont les augmentations et les diminutions s'équilibrent. Des totaux invalides, un codage manquant ou des montants hors plage laissent l'enregistrement inchangé.

## Achever, contrepasser et remplacer

Achèvement n'est pas disponible si des modifications restent à enregistrer, si un enregistrement est en cours ou si les détails n'ont pas été chargés avec succès. Si la page demande d'enregistrer d'abord, retournez à l'écriture comptable et enregistrez-la. Utilisez ensuite Achèvement dans l'espace de la pièce auquel vous êtes affecté, puis suivez son flux d'approbation configuré. L'édition ordinaire est verrouillée après Achèvement. Les ajustements changent les totaux comptables de l'application uniquement lorsque la réussite de l'achèvement est enregistrée. Un simple statut affiché ne suffit pas à établir que les ajustements ont pris effet.

Une contrepassation n'est permise que pour la dernière pièce ordinaire achevée avec succès de ce paiement. Elle échange les allocations d'origine et corrigées conservées pour annuler exactement les changements de codage précédents. La contrepassation est un nouveau dossier avec sa propre affectation et doit elle-même réussir. Une contrepassation utilise les détails conservés avec la pièce sans élargir l'accès au paiement source. Pour le transfert de 400 ci-dessus, une contrepassation réussie remet 400 au compte A et retire 400 du compte B.

Un remplacement suit la dernière contrepassation achevée avec succès ou la dernière pièce ordinaire dont l'achèvement n'a pas réussi. Choisissez l'action prise en charge sur ce dernier dossier. Ne créez pas de pièces ordinaires simultanées pour contourner la séquence. L'historique terminé ne peut pas être modifié. Supprimer un brouillon modifiable le retire du travail actif tout en conservant son dossier enregistré; cela ne contrepassera pas une pièce réussie.

Si l'achèvement échoue, comparez les totaux d'origine et corrigés de chaque ligne d'engagement. Vérifiez qu'au moins une allocation corrigée diffère de l'original. Si une action de séquence manque, examinez la dernière pièce et son issue courante.

Si un enregistrement échoue, le formulaire conserve vos changements pour que vous puissiez les corriger et réessayer. Une actualisation en arrière-plan conserve aussi les changements non enregistrés tant que la pièce reste modifiable. Si les droits ou le statut la rendent non modifiable, la page affiche l'écriture enregistrée. Après un enregistrement incertain, rechargez la pièce et comparez les montants enregistrés avant de réessayer. Consultez [Paiements](./payments.md) et [Clôtures](./closeouts.md).
