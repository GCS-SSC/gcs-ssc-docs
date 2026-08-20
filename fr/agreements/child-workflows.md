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

## Modele de statut

Les dossiers d execution complexes utilisent ces regles communes :

| Dossier | Etats editables | Etats verrouilles |
| --- | --- | --- |
| Engagement | `draft`, `inprogress` | `complete`, `pendingapproval`, `approved`, `denied` |
| Paiement | `draft`, `inprogress` | `complete`, `pendingapproval`, `approved`, `denied`, `pay`, `wait`, `processed`, `paid` |
| Lignes de prevision | `draft`, `inprogress` | `complete`, `pendingapproval`, `approved`, `denied` |
| Soumission de reclamation | `draft` | `submitted`, `inreview`, `reviewed`, `withdrawn`, `cancelled` |
| Rapprochement de reclamation | `draft`, `inprogress`, `complete` lorsque la reclamation est prete et sans rapprochement final approuve | `pendingapproval`, `approved`, `denied` |
| Surveillance | `draft`, `inprogress` | `complete`, `pendingapproval`, `approved`, `denied` |

L’achèvement écrit un enregistrement `Common_Completion`. L’achèvement principal des engagements, paiements, prévisions, surveillances et rapprochements écrit directement `complete` et peut démarrer un flux d’achèvement publié. Il ne consulte pas un modèle d’approbation autonome et ne matérialise pas sa feuille; ces moteurs d’approbation génériques exigent un appelant explicite d’API ou d’intégration, tandis qu’un flux d’achèvement peut atteindre indépendamment une étape d’approbation source configurée. Consultez le guide de l’entité pour sa frontière exacte.

Les sections d approbation utilisent les actions communes de feuille de route. Si toutes les etapes courantes sont approuvees, la cible passe a `approved`; si une etape est refusee, elle passe a `denied`; sinon elle demeure `pendingapproval`. Les dossiers refuses peuvent permettre une nouvelle feuille de route selon la configuration du workflow.
