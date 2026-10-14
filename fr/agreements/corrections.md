# Corrections d’entente

Utilisez **Corrections** dans une entente pour modifier les montants payés comptabilisés tout en conservant les paiements d’origine. Utilisez cette fonction lorsque le total payé comptabilisé doit être ajusté. Une correction ne verse pas d’argent au bénéficiaire et ne consigne pas de remboursement; utilisez les paiements et les créances pour ces opérations.

Une correction possède une référence permanente telle que `AGR-2026-001-COR-1`, une date demandée, des descriptions française/anglaise, des paiements finalisés sélectionnés et des ajustements sur les lignes de l’engagement actif choisi. Un ajustement positif augmente le montant payé comptabilisé; un ajustement négatif le diminue.

## Préparer une correction

Pour créer une correction, vous devez avoir la permission `correction` de création pour l’entente et être affecté à cette entente précise. Le créateur devient le responsable principal de la correction. Pour poursuivre le travail, vous devez avoir la permission nécessaire et être affecté à cette correction précise. Les approbateurs doivent avoir leur affectation d’approbation distincte. Être affecté à une correction ne donne pas le droit d’ouvrir les paiements utilisés.

Avant la création, résolvez les paiements inachevés, le travail d’engagement, les pièces de journal et les flux financiers actifs. Une seule correction ouverte est permise par entente. Choisissez un engagement actif et un ou plusieurs paiements finalisés admissibles (au plus 500 paiements distincts), puis saisissez la date demandée et les descriptions (au plus 10 000 caractères chacune). Les sources ne changent plus après création. Pour une correction ultérieure, liez-la à une correction de la même entente dont le flux est terminé. Cela crée un nouveau dossier sans rouvrir l’ancien.

## Examiner et enregistrer les ajustements

Examinez dans l’espace les paiements d’origine et les effets des pièces de journal réussies, des corrections déjà comptabilisées et des recouvrements de créances. L’espace conserve aussi l’exercice et les codes comptables utilisés pour calculer ces montants. Saisissez un ajustement positif ou négatif pour chaque ligne d’engagement. Le montant payé corrigé est le total existant de ces composantes, plus votre ajustement proposé. Il doit rester entre zéro et le montant engagé de cette ligne. L’ensemble doit aussi respecter le montant disponible sous les codes comptables partagés de l’organisme. D’autres dossiers peuvent utiliser ce même solde : une ligne peut respecter sa propre limite et échouer à ce contrôle partagé.

Par exemple, une ligne engagée de 10 000 comporte 7 000 payés à l’origine et une correction comptabilisée antérieure de −500. Un ajustement de −1 000 produit 5 500 payés corrigés et 4 500 de capacité restante. Le paiement d’origine demeure de 7 000. Un ajustement de −7 000 rendrait le montant corrigé négatif et est refusé. Incluez les effets de journal et de recouvrement affichés pour votre dossier réel.

Enregistrez toutes les lignes ensemble, puis examinez les détails actualisés de la correction. Un brouillon peut contenir des ajustements nuls; Achèvement exige au moins un ajustement non nul et une justification non vide en français ou en anglais. Saisissez les montants à deux décimales. À la soumission et à la comptabilisation, l’application recalcule les totaux à partir des sources conservées et vérifie de nouveau les limites des lignes et les soldes partagés.

## Soumettre, annuler et reprendre

Achèvement soumet la correction au flux d’approbation publié obligatoire `fundingcasecorrection`. Un administrateur doit configurer ses étapes d’examen et d’approbation et ses résultats finaux avant votre soumission. Une correction ouverte bloque les changements ordinaires au budget, aux paiements, aux engagements, aux pièces de journal et à la clôture de l’entente. Les montants examinés restent ainsi stables. Poursuivez le travail dans l’espace de la correction et les étapes d’approbation qui vous sont affectées.

La comptabilisation réussie enregistre des ajustements distincts qui ne peuvent plus être modifiés. Les corrections refusées, en échec et annulées conservent leur historique sans comptabiliser d’ajustements. Achèvement ne peut pas être répété sur la même correction. Pour annuler une correction ouverte, saisissez un motif non vide (au plus 10 000 caractères); le flux d’approbation actif est annulé, ou le brouillon non soumis reçoit le statut final d’annulation configuré. L’annulation sans configuration obligatoire est refusée.

Vous pouvez supprimer uniquement un dossier ouvert à l’état Brouillon de l’organisme sans Achèvement ni décision enregistrés. Après la fin du flux, son historique reste consultable; la correction ne peut être ni restaurée ni modifiée. Créez une nouvelle correction liée pour le travail suivant.

Si la création est bloquée, terminez le dossier non résolu indiqué par le serveur au lieu d’ouvrir une autre correction. Si un contrôle de solde ou de source échoue, actualisez et comparez les paiements d’origine, les ajustements précédents, les recouvrements et les soldes disponibles sous les codes comptables partagés. Après un résultat réseau incertain, rechargez avant de resoumettre. Les exports conservent la référence, les sources et les ajustements comptables positifs ou négatifs; exporter ne comptabilise rien.

Consultez [Paiements](./payments.md), [Pièces de journal](./journal-vouchers.md), [Créances](./receivables.md) et [Clôtures](./closeouts.md).
