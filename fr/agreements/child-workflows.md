# Flux des dossiers connexes de l'entente

Une entente est le dossier principal de financement. Ses onglets contiennent des dossiers connexes, comme un budget, un paiement, une réclamation ou une visite de surveillance. Certains, comme les adresses et les activités, se modifient directement dans un onglet de l'entente. D'autres ouvrent leur propre espace, où vous gérez leurs lignes, pièces jointes, utilisateurs affectés et étapes d'approbation.

Par exemple, ouvrez **Paiements** dans une entente pour trouver un paiement, puis ouvrez ce paiement pour travailler sur ses lignes. Vous travaillez toujours sous la même entente, mais le paiement a son propre dossier et ses propres vérifications d'accès.

## Pages de flux

| Flux | Documentation |
| --- | --- |
| Exercices budgétaires et lignes budgétaires | [Budget](./budget.md) |
| Adresses d'entente | [Adresses](./addresses.md) |
| Liens avec les demandeurs et bénéficiaires | [Demandeurs et bénéficiaires](./applicant-recipients.md) |
| Activités, résultats et responsables | [Activités](./activities.md) |
| Engagements et lignes d'engagement | [Engagements](./commitments.md) |
| Paiements et lignes de paiement | [Paiements](./payments.md) |
| Rythme mensuel et projections comptables | [Sommaire financier](./financial-summary.md) |
| Corrections signées et transferts comptables équilibrés | [Corrections](./corrections.md), [Pièces de journal](./journal-vouchers.md) |
| Créances, ajustements et recouvrements | [Créances](./receivables.md) |
| Prévisions, versions et lignes mensuelles | [Prévisions](./forecasts.md) |
| Réclamations, lignes, rapprochements et approbations | [Réclamations](./claims.md) |
| Surveillances, constatations, suivis, mises à jour et pratiques prometteuses | [Surveillances](./monitors.md) |
| Documents d'entente générés | [Documents](./documents.md) |

## Comportement commun

Votre rôle détermine les actions permises dans l'organisme ou le programme. Votre affectation désigne le dossier précis dont vous vous occupez. Les deux sont nécessaires pour modifier :

- L'accès Lecteur permet de consulter les dossiers dans votre portée autorisée sans affectation.
- Pour les fiches ordinaires, comme les adresses ou les activités, l'accès Contributeur et l'affectation à l'entente permettent de créer ou de modifier. L'accès Gestionnaire et cette affectation sont nécessaires pour supprimer.
- Pour créer une réclamation, un paiement, une prévision, une surveillance, une modification ou un engagement directement depuis l'entente, vous devez avoir la permission de rôle requise et être affecté à l'entente. Vous devenez l'utilisateur affecté principal du nouveau dossier. Les changements suivants exigent une affectation à ce dossier précis et le rôle applicable.
- Pour créer un rapprochement de réclamation, vous devez avoir l'accès Contributeur et être affecté à la réclamation. Vous devenez l'utilisateur affecté principal du rapprochement. Les changements suivants exigent une affectation au rapprochement. Consultez [Réclamations](./claims.md).
- Les examens et recommandations utilisent leurs responsables configurés. Une tâche affectée à un groupe commence sans être réclamée, et la personne qui a démarré le flux n'y est pas automatiquement affectée. Un membre admissible du groupe doit réclamer la tâche avant de la modifier et doit avoir la permission de rôle requise. Consultez [Flux de travail](../concepts/workflows.md) et [Utilisateurs affectés](./team.md).

Par exemple, une affectation à l'entente permet à un agent admissible d'ajouter une activité. Elle ne lui permet pas automatiquement de modifier un paiement créé par un collègue : vérifiez les utilisateurs affectés au paiement.

Les listes de sélection respectent l'accès requis par le formulaire de création ou de modification ouvert. Une affectation comme réviseur ou approbateur permet l'action de flux attribuée; elle ne donne pas l'accès de consultation ordinaire au dossier.

Avant d'ouvrir un formulaire, d'enregistrer ou de supprimer, l'application vérifie l'affectation actuelle et si l'entente permet l'action. Un bouton disponible à l'ouverture de l'onglet peut devenir indisponible après un changement d'état ou d'affectation. Si une action est refusée, conservez votre brouillon, rechargez le dossier et vérifiez son état et ses utilisateurs affectés.

Pour modifier les activités ou le budget dans une modification, vous devez être affecté à la modification. Elle doit être un brouillon modifiable et inclure le type de changement pertinent. Elle doit aussi posséder une copie enregistrée des activités ou du budget à changer. Utilisez les onglets de la modification pour ces changements. Consultez [Modifications](./amendments.md).

La plupart des suppressions retirent la fiche des listes ordinaires et des listes de sélection tout en préservant son historique. C'est une suppression logique.

## État métier, achèvement et flux

L'organisme définit les états métier, comme brouillon ou approuvé. Enregistrer vos changements conserve normalement l'état courant. Un état marqué en lecture seule ou terminal, un dossier achevé, un flux actif ou une protection de l'entente parente peut empêcher la modification. Le libellé « Approuvé » ne prouve pas à lui seul la réussite des étapes d'approbation.

Pour soumettre un dossier pris en charge à l'achèvement :

1. Ouvrez son espace et vérifiez les renseignements obligatoires à l'aide du guide ci-dessus.
2. Utilisez **Achever** lorsque le dossier est prêt. L'application vérifie le dossier et démarre son flux publié de soumission d'approbation s'il est configuré.
3. Suivez le flux jusqu'à son résultat. Si une approbation est requise, attendez sa réussite avant de considérer le dossier comme effectif. Par exemple, une prévision ou un engagement de remplacement devient actif seulement après la réussite du flux.

Les modifications, clôtures, corrections, créances, ajustements de créance et notes de crédit exigent un flux de soumission d'approbation. Les autres dossiers pris en charge utilisent leur flux facultatif configuré. Les corrections et recouvrements ont aussi leurs propres permissions de rôle et affectations. Enregistrer l'achèvement ne signifie pas obtenir l'approbation.

Utilisez **Flux de travail** pour choisir et démarrer explicitement un flux standard. Un seul flux peut être actif sur le même dossier, quel que soit son objet. Achever un dossier, soumettre l'entente principale à l'approbation, démarrer un flux standard et demander un examen direct sont des actions différentes. Consultez le guide du dossier et [Approbations et achèvements](../concepts/approvals-completions.md) avant de choisir une action.

Ajoutez les justificatifs à l'onglet [Pièces jointes](../concepts/attachments.md) du dossier précis. Par exemple, joignez les preuves d'une réclamation à la réclamation, plutôt que de supposer qu'une pièce jointe à l'entente remplit le même rôle. Les [Modifications](./amendments.md) et [Clôtures](./closeouts.md) ont des règles supplémentaires d'achèvement, d'instantanés enregistrés et de verrouillage des dossiers connexes.
