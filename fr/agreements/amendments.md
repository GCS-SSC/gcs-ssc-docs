# Modifications d'une entente

Utilisez l'onglet **Modifications** de l'entente pour proposer des changements au financement, aux dates du projet ou aux activités et les soumettre à l'approbation. Préparez les changements dans un brouillon distinct. L'entente courante reste inchangée jusqu'à la réussite de l'approbation. La modification conserve le motif, les détails proposés, l'historique d'approbation et la révision de l'entente qui en résulte.

Par exemple, un bénéficiaire a besoin de trois mois supplémentaires pour terminer ses activités. Créez une modification de durée, expliquez le motif, saisissez les dates proposées et vérifiez si le budget doit aussi changer avant la soumission.

## Configuration et accès

Avant de commencer, votre administrateur doit configurer des types de modification actifs pour le volet de l'entente. Chaque type permet de changer le budget, la durée ou les activités et peut exiger un sous-type. La soumission exige aussi un flux d'approbation publié pour les modifications, avec au moins une étape d'approbation et une issue de réussite configurée. Si le type ou la configuration d'approbation requis manque, demandez à votre administrateur de le configurer.

L'accès Lecteur permet de consulter les modifications. L'accès Contributeur permet de les créer et de les modifier. La suppression exige l'accès Gestionnaire. Vous devez être affecté à cette entente pour créer une modification, puis à la modification elle-même pour y travailler. Son créateur devient l'utilisateur affecté principal. Le système revérifie votre accès à chaque enregistrement et confirme que la modification appartient à l'entente ouverte.

Une entente ne peut avoir qu'une modification ouverte. Un refus d'approbation ne ferme pas nécessairement la modification. Résolvez ou annulez ce travail avant d'en créer une autre.

## Liste et création

La liste affiche les numéros de modification les plus récents en premier. La recherche trouve un numéro exact ou du texte dans le nom anglais ou français, dans toutes les pages. Elle ne recherche pas les états ou les noms de types. Les pastilles de types et les indicateurs d'instantané montrent le contenu de chaque modification.

La création exige :

- au moins un nom en anglais ou en français;
- au moins un type de modification actif et unique du volet courant de l'entente;
- pour chaque type sélectionné qui exige un sous-type, au moins un sous-type actif sélectionné et lié à ce même type et volet.

Un sous-type extérieur aux types sélectionnés, une fiche inactive, un doublon ou une fiche d'un autre volet est rejeté. Un type de durée initialise les dates proposées à partir des dates courantes d'aide autorisée de l'entente. La nouvelle modification commence à l'état Brouillon de l'organisme, avec le prochain numéro de modification. Cet identifiant est distinct de la révision d'entente écrite après approbation.

## Espace de détail et portée

Utilisez **Général** pour le nom et la portée de la proposition, **Budget** et **Activités** pour les changements de brouillon, et **Recommandation** pour l'achever et la soumettre. L'espace comprend aussi **Flux de travail**, **Pièces jointes** et **Utilisateurs affectés**. **Documents** exige la lecture de l'entente parente; Cote de risque apparaît si elle est configurée ou si un travail de risque antérieur existe. Général est modifiable seulement à l'état Brouillon de l'organisme, avant l'achèvement et tant que l'entente et la modification restent déverrouillées. Les dossiers terminés conservent leurs pastilles de types et sous-types et l'historique des utilisateurs affectés.

Dans Général, vous pouvez changer le nom bilingue, les types et les sous-types. Si vous sélectionnez un type de durée, vous pouvez aussi changer les deux dates proposées d'aide autorisée. Au moins une langue et un type demeurent obligatoires. Les deux dates de durée sont exigées ensemble et la fin doit être égale ou postérieure au début.

Avant de retirer des types, vérifiez les copies de travail à conserver. Retirer tous les types budget et durée élimine le budget proposé. Retirer le dernier type activités élimine les activités proposées. Avant l'enregistrement, une confirmation nomme les domaines touchés. Confirmer retire définitivement les exercices, lignes et sources de financement du budget proposé, ou les activités, résultats et liens de responsables proposés, avec le changement de type. Les données courantes de l'entente restent intactes. Annuler n'enregistre rien. Rétablir le type exige une nouvelle copie des données courantes; les changements de brouillon éliminés ne sont pas récupérables. Retirer budget en conservant durée conserve la copie budgétaire, dont les exercices actifs doivent toujours chevaucher les dates proposées.

Retirer le dernier type durée efface ses dates proposées, même si un type budget conserve l'instantané budgétaire. Par exemple, une modification possède les types budget et activités et leurs deux instantanés. Retirez activités et confirmez ce domaine : les activités proposées sont éliminées, mais les changements budgétaires restent. Rétablissez activités seulement pour recopier les activités courantes et refaire ces changements de brouillon.

## Instantané du budget

La création de chaque instantané exige l'accès Contributeur, une affectation à cette modification, un état Brouillon modifiable de l'organisme, aucun achèvement enregistré et aucun instantané existant pour ce domaine. L'application revérifie ces conditions lorsque vous demandez la copie. Si elle signale un prérequis manquant, actualisez la page et confirmez votre affectation à la modification, son état et les types sélectionnés avant de réessayer.

Sélectionnez un type budget ou durée, puis copiez une fois le budget courant dans le brouillon. Cet instantané est une copie de travail distincte de tous les exercices et lignes actifs. Vous pouvez préparer les changements sans modifier le budget courant, tout en conservant la traçabilité des liens aux réclamations.

Choisissez les types correspondant aux changements nécessaires :

| Type sélectionné | Changements permis dans l'instantané |
| --- | --- |
| budget | Créer, modifier et supprimer des lignes budgétaires tout en conservant leur historique. |
| durée | Créer, changer et supprimer des groupes d'exercice dans les dates proposées. Supprimer un exercice retire aussi ses lignes copiées de l'utilisation normale, tout en conservant leur historique. |
| les deux | Les deux ensembles de commandes. |

La création ou la modification d'un exercice vérifie son appartenance à un budget actif du volet et son chevauchement avec les dates proposées. Un exercice utilisé par une réclamation, un paiement ou une ligne de réclamation actifs ne peut pas être supprimé. Une ligne budgétaire utilisée par une ligne de réclamation active ne peut être ni déplacée ni supprimée. Ces protections couvrent aussi les réclamations et les paiements liés aux versions approuvées antérieures du même exercice ou de la même ligne budgétaire. Les champs et la validation monétaire correspondent autrement à [Budget de l'entente](./budget.md).

Avant d'appliquer un budget approuvé, le système compare les réclamations comptées et rapprochements réussis au **financement annuel du programme** proposé dans la devise de l'entente. Les réductions de réclamation appliquées diminuent cette utilisation. Les encaissements et compensations comptabilisés d'une créance initiale liée à une réclamation peuvent aussi abaisser le budget minimal, selon la réclamation conservée et son exercice d'origine. Les encaissements en attente et la seule comptabilisation de la dette ne comptent pas. Un encaissement déjà couvert par une réduction appliquée n'est pas compté deux fois. Le crédit ne peut ramener l'utilisation d'une réclamation sous zéro ni couvrir celle d'une autre réclamation.

Par exemple, une réclamation comptée et son rapprochement réussi sont tous deux de 30 000. Une créance initiale comptabilisée liée à la réclamation a recouvré 4 000. Le financement annuel du programme proposé peut descendre à 26 000, même avant l'application du plan de réduction complet; 25 999,99 échoue. Ce crédit supplémentaire d'encaissement sert seulement aux réductions budgétaires. Les nouvelles réclamations et rapprochements gagnent de la capacité par les réductions appliquées, pas par un simple encaissement partiel.

Les prévisions et engagements ne bloquent plus une réduction budgétaire simplement parce qu'ils dépassent le financement proposé. Après l'application du budget approuvé, les paiements restent suspendus jusqu'à ce que la prévision active et l'ensemble des engagements actifs respectent le budget, ou qu'un financement suffisant soit rétabli. Le coût total et les autres types de financement suivent des règles par ligne plutôt que des plafonds annuels distincts. Consultez [Paiements](./payments.md).

Gardez dans le budget proposé chaque exercice ayant un historique de prévision, même si la prévision a été supprimée. Cet exercice ne peut être réaffecté ni retiré. Corrigez la copie avant l'approbation si les identités d'exercice ne correspondent plus.

::: warning La capacité du volet exige encore un rapprochement manuel
Vérifiez vous-même le financement de programme disponible du volet avant l'approbation, en incluant les allocations aux autres ententes et le seuil de surengagement. Enregistrer ou appliquer une modification ne lance pas le contrôle de capacité entre ententes utilisé pour les changements directs du budget courant. Le contrôle annuel ci-dessus protège l'utilisation existante de cette entente; il ne prouve pas que le volet peut financer la proposition.
:::

La copie conserve le promoteur choisi sur chaque ligne budgétaire. Les [limites financières](./budget.md#limites-financières-du-volet) actives du volet s'appliquent à toute la version de brouillon à l'enregistrement, à la soumission et à l'application de l'approbation. Si une limite change pendant l'approbation, l'application peut échouer même après une soumission réussie. Vérifiez la configuration courante et l'historique d'approbation avant de réessayer. Ces limites ne remplacent pas la vérification manuelle de capacité décrite plus haut.

Si une action de copie indique que le budget ou les activités ne sont pas activés, ouvrez Général et sélectionnez le type de modification correspondant. La copie du budget exige un type budget ou durée; celle des activités exige un type activités. Enregistrez la portée, puis réessayez la copie.

## Instantané des activités

Sélectionnez un type activités, puis copiez une fois les activités courantes, y compris leurs résultats et responsables. L'onglet Activités de la modification offre ensuite les mêmes champs bilingues obligatoires, la même plage de dates, les mêmes résultats actifs du programme et les mêmes responsables disponibles de l'entente que ceux décrits dans [Activités de l'entente](./activities.md), mais tous les changements demeurent dans l'instantané. Si vous changez une seule date, comparez-la à l'autre date enregistrée. La fin doit rester égale ou postérieure au début.

Copiez les activités avant d'en ajouter ou d'en modifier dans la modification. La création et la modification exigent l'accès Contributeur et une affectation à cette modification; la suppression exige Gestionnaire et la même affectation. Supprimer une activité copiée retire aussi ses sélections de résultats et de responsables du brouillon, sans changer les activités courantes de l'entente.

## Proposition de risque et préparation

Les changements de risque sont disponibles pour toute modification, indépendamment des types budget, activités et durée. La création copie le score courant de l'entente comme proposition; **Changer le risque** est désactivé par défaut si aucun flux ne le gère. Activez-le et choisissez une cote active du volet pour un changement manuel. Zéro est un score valide; effacer la proposition n'efface pas le risque de l'entente. Désactiver le commutateur conserve la proposition, mais empêche son application.

Lorsqu'un flux de risque publié est lié aux modifications, ou qu'un flux de risque de cette modification reste actif, le commutateur est activé et en lecture seule et la cote ne peut être modifiée manuellement. Exécutez le flux **Cote de risque** : toutes les étapes, y compris les approbations, doivent réussir avant que son évaluation désignée actualise la proposition. Le score du parent reste inchangé jusqu'à l'approbation réussie de la modification.

Si la configuration publiée sélectionnée exige l'achèvement du risque, **Achever** reste bloqué jusqu'à la réussite d'un flux pour cette modification exacte et cette configuration. Une version publiée antérieure de la même configuration suffit; le score courant de l'entente, le flux d'une autre modification, un examen autonome ou un flux actif/échoué ne suffit pas. Un flux facultatif peut être omis, mais un score copié ne constitue pas son résultat et ne sera pas appliqué. Un changement manuel activé exige une cote sélectionnée valide.

Par exemple, une entente cotée 2 exige une prolongation et une cote proposée de 0. Exécutez toutes les étapes du flux de risque obligatoire de la modification; la proposition devient 0, mais l'entente conserve 2. Achevez puis approuvez la modification. L'approbation réussie applique ensemble les dates et le score capturé 0; un refus ou une annulation laisse les valeurs courantes intactes.

L'achèvement enregistre la décision de risque, les libellés de cote, les preuves de calcul et le résultat de préparation dans le dossier d'approbation. Les examinateurs et toute reprise utilisent ces preuves enregistrées même si la configuration change ensuite. Les anciens dossiers conservent leurs contrôles d'intégrité et ne reçoivent pas de section risque. Si l'achèvement signale `RISK_WORKFLOW_REQUIRED` ou `RISK_SCORE_REQUIRED`, terminez le flux requis pour cette modification ou corrigez sa cote de brouillon, puis réessayez. Une soumission rejetée ne laisse ni achèvement ni nouveau dossier d'approbation.

## Approuver et appliquer la modification

Utilisez l'onglet **Recommandation** pour vérifier la modification préparée et l'achever une seule fois. L'achèvement exige un flux d'approbation publié pour les modifications. Il enregistre l'achèvement et l'heure de soumission, démarre l'approbation et conserve une copie fixe de la proposition pour les examinateurs. Si le flux requis manque, aucune de ces étapes n'est enregistrée. Le dossier d'approbation contient l'identité bilingue, les types et sous-types et seulement le budget, les activités ou les dates proposés qui changent. Il ne duplique pas les renseignements inchangés du profil de l'entente ou du bénéficiaire.

Par exemple, une modification de durée seulement peut proposer une nouvelle fin d'aide sans remplacer les activités courantes. Vérifiez que les exercices de l'entente chevauchent les dates proposées, puis achevez. Incluez le type budgétaire et son instantané si le changement approuvé doit aussi remplacer le budget. Les dates de l'entente restent inchangées pendant l'approbation et changent seulement à la réussite de l'approbation. Les flux standards de l'onglet distinct **Flux de travail** ne soumettent pas ce dossier.

Les examinateurs utilisent les instructions publiées conservées au démarrage du travail d'approbation, avec approbation de membre ou finale selon la configuration. Le dossier d'approbation apparaît dans des sections regroupées et repliables. Les noms et libellés sont enregistrés à la soumission : un renommage ultérieur ne change pas ce que les examinateurs ont vu.

Pendant l'approbation, vous ne pouvez pas apporter de changements incompatibles à l'entente, à la modification ou aux copies de travail, ni les supprimer. Vous pouvez annuler le flux actif et son travail enfant dans **Flux de travail** sans changer la proposition soumise. Une autre approbation active de l'entente peut bloquer l'annulation de la modification. Résolvez cette approbation avant de réessayer. L'échec ou le refus applique l'état d'échec configuré et laisse l'entente courante inchangée. La réussite vérifie la proposition enregistrée, applique seulement les changements inclus et les dates proposées, ferme la modification, conserve son numéro et crée la révision liée de l'entente. Les changements et la création de la révision sont enregistrés ensemble, avec l'état de réussite configuré.

Un approbateur affecté peut lire le dossier exact requis pour sa décision. La modification du dossier ou de la recommandation exige toujours l'affectation au dossier concerné et l'accès Contributeur; l'affectation à l'approbation n'accorde pas l'accès général à l'entente.

## Générer un document de modification

Utilisez **Documents** pour générer un fichier à partir d'un modèle disponible pendant que la modification est un brouillon modifiable. Vous devez avoir accès à l'entente parente ainsi que la permission et l'affectation requises pour la modification. La génération revérifie l'entente courante, la proposition et le modèle avant d'enregistrer le fichier. Si l'un de ces éléments change pendant la génération, actualisez, examinez les renseignements à jour et relancez la génération. Si le service est occupé, attendez puis réessayez. Après un résultat réseau incertain, vérifiez la liste des documents avant de répéter la demande.

## Annulation, suppression et reprise

**Annuler** ferme une modification ouverte. Si un flux de soumission d'approbation est actif, l'action annule l'exécution et ses enfants actifs. Sinon, elle utilise la configuration publiée et applique son état d'annulation configuré. Sans exécution active ni changement d'état applicable, l'annulation est rejetée. Aucun état d'annulation fixe ne remplace la configuration. Le dossier et ses instantanés restent conservés; un remplacement est possible lorsqu'aucune modification ouverte ne subsiste.

Pour supprimer une modification, vous devez avoir l'accès Gestionnaire et être affecté à cette modification. La suppression est offerte seulement à l'état Brouillon de l'organisme lorsque les protections d'achèvement et d'entente le permettent. Elle retire ensemble de l'utilisation normale la modification, son budget et ses activités copiés, les liens de sélection et les liens de types et sous-types. Le libellé de l'issue ne détermine pas à lui seul si la suppression est permise.

Il n'existe aucune commande de rétablissement. Après une annulation ou une suppression accidentelle, conservez la piste d'audit et demandez à une personne autorisée d'évaluer la reprise plutôt que de recréer l'historique sous la même identité.

## Guides connexes

- [Ententes de financement](./index.md)
- [Budget de l'entente](./budget.md)
- [Activités de l'entente](./activities.md)
- [Approbations et réalisations](../concepts/approvals-completions.md)
- [Modèles d'approbation](../programs/approval-templates.md)
