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

Tous les dossiers enfants sont portes par l entente courante. Les utilisateurs doivent pouvoir lire l entente pour consulter les enfants et pouvoir la mettre a jour pour creer, modifier, supprimer, selectionner des valeurs liees ou faire avancer un workflow, sauf lorsqu une action d approbation commune exige une permission plus precise.

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

La completion ecrit un enregistrement `Common_Completion`. Lorsqu un modele d approbation valide et porte par le volet existe pour le type d entite, la completion place le dossier en `pendingapproval` et materialise ou active la feuille d approbation. Sans modele d approbation, le dossier passe a `complete`.

Les sections d approbation utilisent les actions communes de feuille de route. Si toutes les etapes courantes sont approuvees, la cible passe a `approved`; si une etape est refusee, elle passe a `denied`; sinon elle demeure `pendingapproval`. Les dossiers refuses peuvent permettre une nouvelle feuille de route selon la configuration du workflow.
