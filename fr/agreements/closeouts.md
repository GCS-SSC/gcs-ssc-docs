# Clôture d'une entente

Utilisez **Clôtures** pour vérifier que les travaux financiers, les suivis de surveillance et les approbations d'une entente sont terminés, puis soumettre sa fermeture à l'approbation. Une clôture réussie met l'entente en lecture seule et conserve l'historique justificatif. Vous pouvez préparer un brouillon pendant que des travaux restent en cours, mais vous devez résoudre les obstacles du rapport de préparation avant de l'achever.

## Accès et préalables

L'entente doit permettre les modifications et ne pas avoir un état métier terminal. Un état terminal indique que l'entente est terminée. Sa date de fin ne change pas automatiquement son état métier. Le volet doit fournir un flux `approval_submission` actif et publié pour `fundingcaseagreementcloseout`. L'achèvement de la clôture démarre ce flux; un flux standard ne peut pas le remplacer. L'issue positive configurée doit utiliser un état terminal de l'organisme.

| Opération | Accès effectif |
| --- | --- |
| Lire clôtures, préparation, instantanés, modèles, aperçus et téléchargements | Accès Lecteur pour l'organisme ou le programme responsable de l'entente. Aucune affectation à la clôture n'est requise. |
| Créer | Accès Contributeur pour cet organisme ou programme et affectation à l'entente. La personne qui crée la clôture devient son utilisateur affecté principal à l'enregistrement. |
| Démarrer, reprendre, annuler, exécuter le travail ou enregistrer un document produit | Accès Contributeur et affectation à la clôture, sauf travail d'examen, de recommandation ou d'approbation affecté séparément. |
| Supprimer un brouillon | Accès Gestionnaire et affectation à la clôture. |
| Gérer l'équipe de clôture | `agreement:manage_assignments`, affectation active à la clôture, accès Contributeur effectif et état permettant les changements d'équipe. |

L'affectation à une clôture ne donne pas accès à son entente, à une autre clôture ni aux autres dossiers liés. L'affectation à une approbation n'accorde que le pouvoir d'approbation. Conservez au moins un utilisateur affecté actif et exactement un principal. Tous les utilisateurs affectés actifs ont les mêmes droits de travail. Le rôle principal ne donne aucun droit supplémentaire.

## Créer et préparer

Ouvrez une entente et sélectionnez **Clôtures**. La liste conserve les clôtures numérotées achevées et annulées. Une seule clôture peut être ouverte à la fois. Chaque nouvelle clôture reçoit le numéro suivant. Une nouvelle clôture commence à l'état Brouillon de l'organisme, même si la préparation comporte des obstacles.

Utilisez le rapport de préparation pour vérifier les montants financiers, les suivis de surveillance en suspens et chaque dossier bloquant. Suivez les liens fournis pour corriger ces dossiers. Produisez ou prévisualisez les documents de clôture au besoin. Votre programme peut aussi exiger une liste de vérification, une évaluation, une recommandation ou une approbation dans son flux configuré; ces exigences s'ajoutent aux contrôles de préparation ci-dessous.

Par exemple, le rapport indique un suivi ouvert du bénéficiaire concernant un rapport final. Ouvrez le suivi lié, vérifiez la réception du rapport et consignez la mise à jour appropriée. Actualisez la préparation pour voir s'il reste d'autres travaux.

## Règles de préparation

Consultez le rapport de préparation, suivez le lien de chaque obstacle et terminez les travaux en suspens. Le système revérifie la préparation au démarrage : un rapport auparavant sans obstacle peut ne plus être à jour. Si une condition échoue, `AGREEMENT_CLOSEOUT_NOT_READY` empêche le démarrage.

La préparation exige toutes les conditions suivantes :

1. L'état métier de l'entente n'est pas terminal.
2. Les paiements dont l'état métier est terminal et les rapprochements finaux approuvés s'équilibrent à zéro pour chaque devise au total de l'entente.
3. Aucun suivi de surveillance n'est `open` ou `onhold`, peu importe le responsable.
4. Chaque dossier directement lié à l'entente a terminé le travail requis et possède un état terminal configuré.
5. Ni l'entente ni ses dossiers liés n'ont de flux actif, d'ensemble d'examens actif, d'ensemble de recommandations actif ni de feuille d'acheminement active.

Le rapport compte les paiements finalisés seulement si leur état courant de l'organisme est configuré comme **terminal** et que leur preuve de paiement est résolue et positive. Il compte les lignes de rapprochement final seulement si le rapprochement possède la preuve d'approbation requise. Achever un rapprochement sans flux d'approbation peut terminer ce travail, mais ne fournit **pas** la preuve d'approbation nécessaire à la clôture.

Le système utilise des montants décimaux exacts pour le calcul. Il les regroupe par exercice et devise, puis totalise chaque devise séparément. Une variance négative (`paiements − réclamations approuvées`) signifie un paiement en suspens; une variance positive, une avance en suspens. Les différences entre exercices peuvent se compenser dans une même devise, jamais entre devises. Une entente sans montant compté est financièrement prête, mais doit encore satisfaire aux autres contrôles.

Par exemple, des paiements comptés de 12 000,00 CAD contre des rapprochements finaux approuvés de 11 500,00 CAD produisent une avance en suspens de 500,00 CAD. Un manque de 500,00 USD ne compense pas cette avance. Suivez les liens du rapport pour corriger les dossiers sources, puis actualisez.

Les réclamations, rapprochements, paiements, prévisions, surveillances et engagements doivent chacun avoir un état terminal de l'organisme. Les modifications doivent également être fermées. Chaque rapprochement final doit posséder une preuve d'approbation. Il s'agit d'indicateurs de configuration et de contrôles de preuve, et non de comparaisons avec des libellés comme « Révisé » ou « Payé ». Le travail actif de flux, d'examen, de recommandation ou de feuille d'acheminement et les suivis de surveillance ouverts ou en attente restent bloquants même si le libellé du dossier semble définitif.

## Achèvement, annulation et verrouillage de l'entente

| Situation | Comportement pris en charge |
| --- | --- |
| Clôture brouillon | Préparer la preuve, gérer l'équipe, produire des documents ou supprimer si la protection Brouillon le permet. Des obstacles peuvent subsister. |
| Prête à achever | Achever une seule fois. Le système vérifie la préparation, enregistre l'achèvement, démarre le flux obligatoire et conserve une copie fixe des preuves de préparation. Ces actions réussissent ou échouent ensemble. Une configuration absente ou des obstacles empêchent l'achèvement. |
| Flux d'approbation actif | Les modifications ordinaires de l'entente et de ses dossiers liés sont bloquées. Effectuez le travail de clôture affecté et les opérations documentaires permises. |
| Exécution sans succès | Examinez l'issue et l'état configuré. Réessayez seulement si la configuration de flux enregistrée et votre accès courant le permettent; n'achevez pas une deuxième fois. |
| Issue terminale positive | Le système revérifie la préparation et l'intégrité des preuves enregistrées, ferme la clôture et donne à l'entente le même état terminal configuré. L'historique reste lisible. |
| Annuler une exécution active | L'annulation exige un flux actif de clôture. Elle annule l'exécution et ferme la clôture sans appliquer la transition positive qui ferme l'entente. |

La suppression logique est limitée à l'état Brouillon de l'organisme. L'annulation est une action de flux : aucune opération générique « annuler le brouillon » n'est offerte sans exécution active. Après annulation, une autre clôture numérotée peut être créée seulement si l'entente reste modifiable et qu'aucune clôture ouverte ne subsiste.

Avant la fermeture finale, le système vérifie que les preuves de préparation enregistrées n'ont pas changé et qu'aucun nouvel obstacle n'existe. Sinon, la fermeture échoue avec `closeout_packet_changed`. Actualisez le rapport et vérifiez les dossiers sources modifiés avant d'utiliser l'action de reprise permise. Une fois l'entente dans un état terminal, ses dossiers liés et leurs actions de flux sont protégés contre les changements; renommer cet état ne la rouvre pas.

## Documents et reprise

Ouvrez **Documents**, choisissez un modèle de clôture actif du volet de l'entente, puis sélectionnez la langue et un format de sortie disponible. Prévisualisez le document pour télécharger une copie sans l'enregistrer dans le système. Produisez et enregistrez le document pour le conserver dans l'historique de la clôture et de l'entente. Toute personne ayant accès à la lecture de l'entente peut prévisualiser les documents et télécharger les fichiers enregistrés.

L'enregistrement exige l'accès Contributeur et une affectation à cette clôture précise. Le système revérifie ces exigences au moment de l'action. La clôture doit être ouverte et ni elle ni l'entente ne doivent avoir un état terminal. Vous pouvez enregistrer des documents pendant le flux d'approbation actif de cette clôture. En dehors de ce flux, un état achevé ou en lecture seule empêche l'enregistrement. Un autre flux de clôture actif empêche aussi l'enregistrement.

Si le système indique `DOCUMENT_RENDER_BUSY`, attendez la fin de la demande de document en cours, puis réessayez. S'il indique `DOCUMENT_RENDER_INPUT_CHANGED`, actualisez la clôture, vérifiez les dossiers sources et le modèle sélectionné, puis produisez le document de nouveau. Cette erreur signifie que le contenu source ou le modèle a changé avant l'enregistrement du fichier. Consultez [Documents](./documents.md) pour les formats et téléchargements, et [Génération de documents](../developer/document-generation.md) pour les exigences de conversion et de stockage.

Si le démarrage échoue, utilisez les obstacles indiqués pour terminer le travail manquant. Si un flux est suspendu parce qu'un responsable affecté n'est plus admissible, l'initiateur ou un gestionnaire d'affectations autorisé peut choisir un remplaçant admissible et reprendre; consultez [Flux de travail](../concepts/workflows.md). Un flux refusé ne peut être repris que si sa configuration enregistrée le permet et demeure valide. Vous ne pouvez pas modifier les instantanés historiques ni les dossiers achevés ou annulés; aucune restauration utilisateur n'existe pour une clôture supprimée.

## Effets comptables et recouvrement non résolu

Lorsqu'il existe des corrections ou des recouvrements de créances, examinez séparément les réclamations approuvées d'origine, les réclamations approuvées ajustées, les décaissements, les corrections comptabilisées et le recouvrement effectif. Les corrections et recouvrements comptabilisés ajustent le solde payé dans **l'exercice source de l'organisme**. Les réductions appliquées ajustent le solde des réclamations approuvées. Les preuves de paiement et de réclamation d'origine restent inchangées afin de retracer chaque ajustement.

Par exemple, 12 000 décaissés et une réclamation approuvée de 11 500 laissent une avance de 500. Un recouvrement encaissé comptabilisé de 500 donne un solde payé effectif de 11 500 et zéro variance. Si cette dette porte aussi une réduction appliquée de 500, les réclamations approuvées effectives deviennent 11 000 et la variance doit encore être résolue. Examinez chaque effet au lieu de supposer que tout encaissement comptabilisé rend l'entente prête.

Les pièces de journal doivent avoir un statut terminal de l'organisme. Les corrections exigent un statut terminal et une issue résolue. Les créances initiales, ajustements liés et notes de crédit incluses ne peuvent avoir une issue ouverte; un recouvrement en attente appliqué au moyen d'une note de compensation bloque aussi la préparation. Leur travail actif de flux, d'examen, de recommandation ou de feuille d'acheminement reste bloquant. Utilisez le lien du rapport pour résoudre le problème puis actualisez. Une correction ouverte empêche aussi le démarrage d'une clôture. Consultez [Corrections](./corrections.md), [Pièces de journal](./journal-vouchers.md) et [Créances](./receivables.md).
