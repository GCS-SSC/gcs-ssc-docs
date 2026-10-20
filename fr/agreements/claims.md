# Réclamations et rapprochement d’entente

Utilisez une réclamation pour consigner les coûts soumis par un promoteur pour une période de l’entente. Rapprochez la réclamation pour consigner les montants acceptés, les montants échantillonnés pour examen et vos explications. Chaque rapprochement a ses propres examinateurs affectés. Vous pouvez le désigner comme examen final de la réclamation.

## Avant de commencer

Ouvrez une entente, puis sélectionnez **Réclamations**. L’entente doit avoir un budget courant avec au moins un exercice et une ligne budgétaire. Les réclamations existantes gardent leurs liens avec les lignes budgétaires correspondantes après une modification.

| Action | Accès requis |
| --- | --- |
| Parcourir les réclamations, ouvrir les détails et consulter les soumissions ou les rapprochements | Accès Lecteur Entente. Aucune affectation à la réclamation n’est requise. |
| Créer une réclamation | Accès Contributeur et affectation à l’entente; le créateur devient principal de la réclamation. |
| Créer ou modifier des lignes; attribuer, soumettre, retirer, annuler ou modifier une réclamation | Accès Contributeur et affectation à la réclamation. |
| Créer un rapprochement | Accès Contributeur et affectation à la réclamation; le créateur devient principal du rapprochement. |
| Créer ou modifier des lignes de rapprochement; achever ou changer l’indicateur final | Accès Contributeur et affectation à ce rapprochement. |
| Supprimer une réclamation ou une ligne par son API | Accès Gestionnaire et affectation à la réclamation. |
| Supprimer un rapprochement ou une ligne de rapprochement par son API | Accès Gestionnaire et affectation à ce rapprochement. |

L’accès à l’entente ne donne pas le droit de modifier ses réclamations ou rapprochements. Vérifiez votre affectation au dossier à modifier. Le système revérifie votre accès à l’enregistrement.

## Parcourir et créer des réclamations

Sélectionnez **Ajouter une réclamation**, remplissez les champs ci-dessous et enregistrez. Ouvrez ensuite la réclamation pour saisir les montants soumis.

La liste regroupe les réclamations par exercice et affiche leur identifiant, période d’avril à mars, statut, total soumis et montants rapprochés avec succès. Le travail de rapprochement en brouillon ou infructueux ne compte pas comme rapprochement terminé. La recherche couvre les libellés et totaux affichés.

Les actions de modification et suppression visent la réclamation individuelle. Développez le groupe et confirmez son identifiant avant d’agir; plusieurs réclamations peuvent appartenir au même exercice.

| Champ de la réclamation | Règle |
| --- | --- |
| Promoteur | Promoteur actif obligatoire lié à cette entente. Le serveur revérifie ce lien à la création ou au remplacement. |
| Exercice | Choisissez un exercice du budget courant de l’entente. |
| Date de réception | Saisissez la date de réception de la réclamation. |
| Début et fin de la période | Choisissez le premier et le dernier mois de la période, entre avril et mars. La fin ne peut précéder le début. |
| Finale pour l’exercice | Indique que cette réclamation est prévue comme la dernière de l’exercice. Plusieurs réclamations peuvent porter cet indicateur. |

Une nouvelle réclamation reçoit le statut Brouillon de l’organisme. Modifier ses détails ne change pas ce statut.

Supprimer une réclamation modifiable la retire des listes normales avec ses lignes et ses rapprochements. Le système conserve leur historique.

Un changement d’exercice est refusé lorsque des lignes actives attribuées référencent encore un autre exercice. Choisissez un exercice du budget courant et gardez le début de la période avant sa fin ou au même mois. Corrigez les attributions avant l’achèvement. Changer l’exercice de la réclamation ne déplace pas ses lignes.

## Préparer la soumission

L’onglet **Soumission** regroupe les lignes budgétaires de l’exercice courant selon la catégorie de coûts bilingue et la sous-section. Il affiche les montants soumis, rapprochés et le solde. La recherche porte sur la catégorie, la sous-section, le nom bilingue de la ligne ou sa description.

1. Sélectionnez l’action de modification de la ligne budgétaire voulue. La boîte **Modifier le montant soumis** affiche son montant enregistré.
2. Saisissez le montant demandé au programme et sélectionnez **Enregistrer**. Utilisez la devise de l’entente et des montants de zéro ou plus. Seule cette ligne est modifiée. Un nouveau montant nul ne crée aucune ligne; une ligne existante peut être mise à zéro.
3. Après une erreur, corrigez le montant dans la boîte. Si la réponse ou l’actualisation est incertaine, rechargez et vérifiez la ligne enregistrée avant de réessayer.

Après une modification budgétaire, une réclamation liée à un exercice retiré ne peut être modifiée. Les lignes absentes du budget courant restent visibles en lecture seule. Les montants soumis, les coûts totaux et les autres sources restent consultables et comptent dans les totaux. Pour saisir ou modifier des montants, utilisez une ligne du budget courant. Demandez au gestionnaire de l’entente de revoir une ligne budgétaire manquante.

Modifier le montant soumis du programme conserve les allocations des autres sources et recalcule le coût total comme la somme du programme et de ces allocations.

Les lignes importées en double s’affichent séparément, même dans une réclamation modifiable. Confirmez la ligne précise avant de la modifier. Chaque doublon compte encore dans les totaux; modifier une ligne ne change pas les autres. Corrigez les doublons involontaires pendant que la réclamation est modifiable.

### Lignes importées non attribuées

Les lignes importées peuvent arriver sans ligne budgétaire correspondante. Si vous avez l’accès Contributeur et êtes affecté à la réclamation, liez chacune de ces lignes à une ligne compatible du budget courant pendant que la réclamation est modifiable.

Liez toutes les lignes importées à des lignes budgétaires avant de sélectionner **Achever**. La réclamation doit avoir au moins une ligne et aucune ligne non attribuée. L’attribution ne peut pas déverrouiller une réclamation achevée ou dont le statut métier est en lecture seule.

## Soumettre, retirer ou annuler

Après avoir enregistré et vérifié les lignes, utilisez les commandes d’achèvement de la réclamation. Vous devez avoir l’accès Contributeur et être affecté à cette réclamation. Elle doit être modifiable, avoir au moins une ligne active et aucune ligne non attribuée. Vous ne pouvez pas l’achever de nouveau ni pendant qu’un flux est actif.

Sélectionnez **Achever** pour soumettre la réclamation. Si un flux d’approbation est configuré, suivez ses étapes d’examen et d’approbation. La réclamation devient admissible au rapprochement lorsque ce flux réussit, ou immédiatement sans flux d’approbation. Vérifiez le résultat de l’achèvement avant de commencer le rapprochement. Démarrer un flux standard ne soumet pas la réclamation.

Le retrait et l’annulation agissent sur le flux actif. Le retrait est refusé dès qu’un historique de rapprochement existe. Sans flux actif, ces actions n’ont aucun flux à annuler. Le statut d’annulation publié détermine la transition. Achèvement demeure une preuve historique et ne s’annule pas en soumettant de nouveau le formulaire.

## Créer et comparer les rapprochements

La réclamation doit avoir un résultat d’achèvement réussi. Toutes ses lignes actives doivent être attribuées et aucun rapprochement final terminé avec succès ne doit exister.

Pour créer un rapprochement, vous devez avoir l’accès Contributeur et être affecté à la réclamation. Vous devenez l’affectataire principal du rapprochement. Ses affectations sont distinctes de celles de la réclamation.

Un seul rapprochement peut être ouvert à la fois. L’historique terminé ou annulé reste consultable. Le nouveau rapprochement reçoit le statut Brouillon de l’organisme. Si configuré, son démarrage applique à la réclamation le statut de début de rapprochement de l’organisme.

Désignez comme final le rapprochement qui doit terminer l’examen de la réclamation. Un seul rapprochement final peut être ouvert à la fois.

| Champ | Valeur à saisir |
| --- | --- |
| Montant rapproché | Montant obligatoire dans la devise de l’entente, avec au plus deux décimales. |
| Montant échantillonné | Montant facultatif dans la devise de l’entente, avec au plus deux décimales. |
| Justification | Texte facultatif expliquant l’évaluation de la ligne. |

Enregistrer un rapprochement enregistre toutes ses lignes ensemble. Si l’enregistrement échoue, aucune de ses modifications n’est conservée. Si les lignes de la réclamation ont changé pendant votre examen, rechargez et comparez votre brouillon à la réclamation courante avant de réessayer. Cela s’applique même si vous modifiez une seule rangée.

Les montants rapprochés et échantillonnés peuvent être des ajustements négatifs. Cela ne s’applique pas aux montants soumis du programme ni aux coûts totaux, qui doivent être non négatifs.

Le système n’exige pas que les montants échantillonnés soient inférieurs aux montants rapprochés ni que le total rapproché égale la soumission.

Les contrôles budgétaires annuels décrits ci-dessous s’appliquent. Appliquez la politique de l’organisme et expliquez les écarts. Comparez les montants affichés de la soumission, des rapprochements antérieurs réussis, du rapprochement courant et du solde. Le système utilise des calculs monétaires exacts.

Par exemple, un promoteur soumet 1 000,00 pour de la formation. Un rapprochement antérieur réussi a comptabilisé 600,00. Il reste donc 400,00 avant votre examen courant, soit 1 000,00 − 600,00. Un montant en brouillon n’est pas un rapprochement historique réussi. Vérifiez la portée affichée avant d’interpréter un total cumulatif et expliquez tout écart par rapport au montant restant.

L’annulation ferme le rapprochement, retire son marqueur final et annule son flux actif.

Sans flux actif, un statut d’annulation de soumission configuré s’applique lorsqu’il existe; sans configuration, le brouillon peut quand même être fermé. La preuve est conservée et la place ouverte libérée pour un nouveau rapprochement.

## Achèvement, approbation et flux de travail

Enregistrez le rapprochement avant de sélectionner **Achever**. Vous devez avoir l’accès Contributeur et être affecté à ce rapprochement. Le dossier doit être ouvert et modifiable, avec au moins une ligne active. Il ne doit pas déjà être achevé et la réclamation ne doit pas avoir de rapprochement final terminé avec succès. Les commentaires sont facultatifs. L’achèvement n’exige ni un total égal à la soumission ni une justification.

L’achèvement démarre le flux d’approbation configuré pour les rapprochements. Sans flux d’approbation, il prend effet immédiatement. Les modèles d’approbation prennent effet par ce flux publié. Utilisez la section partagée Flux de travail pour les examens, les recommandations, les approbations, l’annulation et la reprise. Un administrateur doit inclure le modèle d’approbation dans le flux publié. Créer le modèle ne suffit pas.

À l’issue réussie de l’achèvement, le rapprochement ferme. S’il est final, la réclamation peut recevoir le statut final configuré par l’organisme et tout rapprochement ultérieur est bloqué. Un échec ou une annulation ne rend pas le rapprochement final. Examinez la tentative et utilisez ses actions de reprise ou d’annulation. N’achevez pas le même dossier de nouveau.

## États verrouillés et reprise

Vous ne pouvez pas modifier un dossier dont le statut est en lecture seule ou final, qui a été achevé, dont le rapprochement est fermé ou dont le rapprochement final a réussi. Le système vérifie aussi si l’entente ou un flux actif bloque la modification. Si le dossier a changé pendant que le formulaire était ouvert, un bouton visible peut ne plus être disponible pour vous.

Après un échec d’enregistrement du montant soumis, vérifiez la ligne choisie et rechargez après une réponse incertaine. Les autres lignes sont enregistrées séparément.

Si l’enregistrement des lignes de rapprochement échoue, aucune modification de cet enregistrement n’est conservée. Corrigez les champs invalides ou rechargez les lignes modifiées avant de réessayer.

Si la page ne s’actualise pas après un enregistrement réussi, rechargez-la et vérifiez le dossier enregistré avant de soumettre de nouveau.

Si Achèvement est indisponible, vérifiez attribution, lignes, affectation indépendante, statut et flux actifs. Annulez un rapprochement ouvert inutile par l’action prévue au lieu de créer des dossiers concurrents.

## Contrat de développement

Pour les routes, les identifiants et les règles d’intégration, consultez la [Référence API des ententes](../developer/api/agreements.md).

Consultez aussi [Budget](./budget.md), [Prévisions](./forecasts.md), [Paiements](./payments.md), [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).

## Ventilation du financement et contrôles budgétaires annuels

Une ligne financière indique comment un coût sera payé : le montant demandé au programme, le coût total et les montants provenant d’autres sources. Ces sources sont classées selon les sous-types de financement configurés pour le volet.

Enregistrez d’abord la ligne soumise, puis utilisez son éditeur de financement pour saisir le coût total et les autres sources. Choisissez chaque sous-type une seule fois. Les choix proviennent de ce volet; une allocation existante peut conserver son sous-type retiré.

Le coût total ne peut être inférieur au financement du programme. Dès que des autres sources sont saisies, leur somme avec le programme doit égaler exactement le coût total.

Si votre volet exige des détails de financement pour les réclamations, chaque ligne active doit avoir au moins une allocation d’autres fonds enregistrée et une ventilation équilibrée avant Achèvement.

Par exemple, un équipement de 1 000,00 peut être financé par 700,00 du programme et 300,00 d’une autre source : 700,00 + 300,00 = 1 000,00. Saisir seulement 250,00 de cette source laisse un écart de 50,00; la ventilation ne peut donc pas être enregistrée comme équilibrée.

Après l’importation d’un brouillon, vérifiez les lignes enregistrées et complétez les détails manquants avant d’achever la réclamation.

L’enregistrement des lignes et l’achèvement vérifient aussi le budget annuel courant dans la devise de l’entente.

Les réclamations partagent la limite annuelle avec les autres réclamations actuellement comptées. Une réclamation cesse d’utiliser cette capacité lorsque son issue courante enregistrée est sans succès, refusée, annulée ou en échec. Modifier seulement le libellé de statut affiché ne libère pas le montant.

Pour les rapprochements, le contrôle comprend votre montant proposé et les rapprochements antérieurs réussis. Les réclamations ou dossiers à issue négative sont exclus.

Le plafond annuel est le financement courant du programme pour cet exercice et cette devise. Le coût total et les autres sources suivent leurs règles d’équilibre par ligne, mais n’ont pas de plafonds annuels distincts. Les montants rapprochés comptent dans le plafond du programme.

Par exemple, 10 000 de financement annuel du programme avec une réclamation comptée de 6 000 laisse 4 000 pour une autre réclamation. Une proposition de 4 500 échoue même si son promoteur ou sa ligne de coûts diffère.

Les réductions de réclamation appliquées libèrent de la capacité annuelle pour les réclamations et rapprochements dans l’exercice de la réclamation d’origine. Un plan en brouillon, la comptabilisation de la dette ou un remboursement partiel ne libère pas cette capacité. La réduction s’applique lorsque la créance comptabilisée est entièrement soldée. Elle ne peut ramener l’utilisation comptée d’une réclamation sous zéro ni transférer un crédit excédentaire à une autre réclamation.

Par exemple, avec un financement annuel du programme de 120 000, une réclamation comptée de 30 000 laisse 90 000. Une créance entièrement soldée avec une réduction appliquée de 10 000 ramène l’utilisation comptée à 20 000 et permet une autre réclamation de 100 000. Une proposition de 100 000,01 échoue encore. La réclamation soumise d’origine reste inchangée.

Actualisez le budget courant, les dossiers comptés et les [Créances](./receivables.md), corrigez le montant ou appliquez une modification autorisée avant de réessayer. Les réductions budgétaires utilisent une règle supplémentaire pour les encaissements comptabilisés, expliquée dans [Modifications](./amendments.md); elle ne libère pas de capacité pour une nouvelle réclamation avant l’application de la réduction.
