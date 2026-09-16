# Flux enfants d entente

Les flux enfants sont atteints depuis les onglets de detail d une entente. Certains sont des tables CRUD integrees; d autres ont leurs propres pages de detail avec sous-dossiers, statut de flux, completion et feuilles d approbation.

## Pages de flux

| Flux | Documentation |
| --- | --- |
| Exercices budgetaires et lignes budgetaires | [Budget](./budget.md) |
| Adresses d entente | [Adresses](./addresses.md) |
| Liens promoteur/demandeur-beneficiaire | [Promoteurs et demandeurs-beneficiaires](./applicant-recipients.md) |
| Activites, resultats et responsables | [Activites](./activities.md) |
| Engagements et lignes d engagement | [Engagements](./commitments.md) |
| Paiements et lignes de paiement | [Paiements](./payments.md) |
| Previsions, versions et lignes mensuelles | [Previsions](./forecasts.md) |
| Reclamations, lignes, rapprochements et approbations | [Reclamations](./claims.md) |
| Surveillances, constatations, suivis, mises a jour et pratiques prometteuses | [Surveillances](./monitors.md) |
| Documents d entente generes | [Documents](./documents.md) |

## Comportement commun

Tous les enfants résolvent la portée de l’entente courante. Lecteur consulte. Les enfants ordinaires exigent Contributeur et l’affectation exacte à l’entente pour créer ou modifier, puis Gestionnaire et cette affectation pour la suppression logique. Les réclamations, rapprochements, paiements, prévisions, surveillances, modifications, engagements, examens et recommandations affectés indépendamment emploient l’affectation parente pour la création, créent un registre enfant dont le créateur est principal et exigent l’affectation à cet enfant pour les mutations suivantes. Les recherches emploient le plafond du formulaire. L’affectation d’un réviseur ou approbateur détermine l’action de flux, sans remplacer la lecture ordinaire du propriétaire.

La plupart des suppressions sont logiques. Les enfants supprimes disparaissent des listes et selecteurs normaux mais restent disponibles pour l integrite historique.

## État métier, achèvement et flux

Les enfants d’entente utilisent les états métier configurables de l’organisme. Les enregistrements ordinaires préservent l’état. Les indicateurs lecture seule et terminal, la preuve d’achèvement, les verrous de flux actif et la protection de l’entente parente déterminent la possibilité de modifier le travail. Un libellé comme « Approuvé » ne constitue pas à lui seul une preuve d’approbation.

Achever valide le dossier et démarre son flux publié de soumission d’approbation si configuré. Les modifications et clôtures exigent ce flux; les autres enfants pris en charge peuvent être achevés sans flux. Les effets positifs, comme l’activation d’une prévision ou d’un engagement de remplacement, attendent la réussite du flux lorsqu’une exécution existe. Un achèvement enregistré ne prouve pas à lui seul la réussite de l’approbation.

L’onglet **Flux de travail** démarre explicitement un flux standard sélectionné. Une seule exécution peut être active sur une cible exacte, tous objets confondus. Achèvement, soumission d’approbation racine, flux standard et examen direct sont des actions distinctes; consultez le guide de l’entité et [Approbations et achèvements](../concepts/approvals-completions.md) pour leurs préalables.

Les justificatifs appartiennent à l’onglet [Pièces jointes](../concepts/attachments.md) de l’enfant exact. Les [Modifications](./amendments.md) et [Clôtures](./closeouts.md) ont leurs propres règles d’achèvement, d’instantané et de verrouillage d’agrégat.
