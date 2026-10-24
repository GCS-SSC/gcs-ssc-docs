# Prévisions d'entente

Utilisez les prévisions pour indiquer quand les dépenses de l'entente devraient avoir lieu. Ouvrez une entente et sélectionnez **Prévisions**. Chaque version numérotée est une prévision distincte avec ses montants mensuels, ses utilisateurs affectés, son achèvement et son historique d'approbation.

## Avant de commencer

| Exigence | Points à vérifier |
| --- | --- |
| Budget courant de l'entente | L'exercice doit appartenir au budget courant. Le sélecteur propose les exercices ayant des lignes budgétaires courantes. |
| Accès | L'accès Lecteur permet de consulter les prévisions. La création exige Contributeur et une affectation à l'entente. Le créateur devient le responsable principal de la prévision. La modification et l'achèvement exigent Contributeur et une affectation à cette prévision. La suppression exige Gestionnaire et cette affectation. |
| Dossier d'utilisateur | L'achèvement exige un dossier d'utilisateur actif pour le compte connecté. |
| Flux d'approbation facultatif | Un flux publié de soumission d'approbation pour les prévisions démarre à l'achèvement s'il est configuré. Le remplacement devient actif seulement après la réussite. |

Le serveur vérifie de nouveau votre accès courant et les verrous de l'entente à l'enregistrement. Les lignes budgétaires doivent appartenir à cette entente, à l'exercice choisi et au budget courant.

## Créer et parcourir les prévisions

Choisissez **Ajouter une prévision**, sélectionnez l'exercice et enregistrez. La nouvelle prévision est un brouillon inactif. Le système attribue le prochain numéro de version pour cette entente et cet exercice, à partir de 0. Les versions supprimées réservent encore leur numéro.

Développez un groupe d'exercice pour voir chaque version, son statut, son indicateur actif, le nombre de lignes et son total dans la devise de l'entente. Le total et le statut du groupe proviennent de la version active, ou de la dernière version si aucune n'est active. Le total du groupe représente une seule version. Il n'additionne pas les différentes estimations. La recherche porte sur l'exercice, la version, le statut, le nombre de lignes ou le total. Le filtrage et la pagination suivent le chargement du résumé.

Sélectionnez **Ajouter une version** dans un groupe d'exercice pour créer et ouvrir un brouillon distinct. Normalement, il copie les montants mensuels, les coûts totaux et les allocations d'autres fonds de la prévision active. Sans prévision active, il est vide. Si la prévision active dépasse le budget annuel courant du programme, il est aussi vide afin de préparer un remplacement qui respecte le budget. Les versions précédentes gardent leur historique et leurs affectations.

Par exemple, la version active 0 prévoit 2 000 en avril et 3 000 en mai. Ajoutez la version 1, puis changez les montants copiés à 1 000 et 4 000. Les deux totalisent 5 000. La version 0 reste active pendant que la version 1 est en brouillon ou en attente d'approbation.

## Modifier la ventilation mensuelle

Ouvrez la version à modifier. Son exercice et son numéro de version ne sont pas modifiables. La grille regroupe les lignes du budget courant par catégorie et sous-section de coûts, avec des totaux trimestriels d'avril à mars. Sélectionnez l'en-tête d'un trimestre pour afficher ses montants mensuels. Développez une ligne pour voir le programme et ses autres sources séparément. La recherche porte sur la catégorie, la sous-section, le nom bilingue ou la description.

1. Sélectionnez l'action de modification de la ligne pour ouvrir ses douze montants mensuels du programme, regroupés par trimestre.
2. Saisissez des montants de zéro ou plus dans la devise de l'entente, avec au plus deux décimales.
3. Sélectionnez **Mettre à jour** pour reporter les montants sur la page. Cela ne les enregistre pas sur le serveur. **Annuler** abandonne les changements de la boîte de dialogue.
4. Sélectionnez **Enregistrer la ventilation** pour enregistrer toutes les cellules modifiées ensemble. Une nouvelle cellule à zéro ne crée aucune ligne, sauf si vous saisissez aussi un autre financement. Une cellule existante mise à zéro conserve sa ligne.
5. Vérifiez les montants enregistrés après l'actualisation de la page. Si la validation échoue, aucun des changements soumis n'est enregistré.

Vous pouvez déplacer un montant entre deux mois en un seul enregistrement. Par exemple, avec un budget annuel de 5 000, passez avril de 5 000 à zéro et mai de zéro à 5 000, puis enregistrez une seule fois. Le système vérifie le total annuel final.

Si un autre utilisateur modifie une cellule que vous enregistrez, l'enregistrement est refusé pour protéger son travail. La page recharge les montants enregistrés et conserve vos différences non enregistrées. Comparez ces différences avant d'enregistrer à nouveau. Après une réponse perdue ou une actualisation échouée, rechargez et vérifiez ce qui a été enregistré avant de réessayer.

Chaque ligne budgétaire ne peut avoir qu'un montant enregistré par mois dans une version de prévision. Modifier le montant mensuel du programme conserve les allocations des autres sources et recalcule le coût total comme la somme du programme et de ces allocations.

Les changements ordinaires conservent le statut métier de l'organisme. Supprimer une prévision modifiable la retire des listes normales avec ses lignes actives, tout en conservant l'historique. Aucune commande de rétablissement n'est offerte.

## Cycle de vie et achèvement

Enregistrez la ventilation et les détails de financement requis avant de sélectionner Achever. Il faut une affectation à cette version, le niveau Contributeur, au moins une ligne active, aucun achèvement antérieur et un dossier modifiable. Un statut d'organisme en lecture seule ou terminal, un flux actif ou une entente protégée peut bloquer les changements.

L'achèvement consigne l'utilisateur et le commentaire facultatif. Il démarre le flux configuré de soumission d'approbation, ou consigne un achèvement sans flux. La réussite active cette version et remplace la prévision active de la même entente et du même exercice. Sans flux d'approbation, c'est immédiat; sinon, cela attend sa réussite. Un échec ou une annulation laisse l'ancienne prévision active. Un brouillon portant un numéro plus élevé ne la remplace pas.

L'achèvement ne peut être répété ni annulé ici. Utilisez une nouvelle version pour remplacer une prévision achevée. Les flux standard se choisissent séparément et ne remplacent pas l'achèvement. Consultez [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).

## Ventilation du financement et contrôles budgétaires annuels

Développez la ligne de coûts et sélectionnez l'action de modification d'une autre source pour saisir ses douze montants mensuels. Les sources proviennent de la ligne budgétaire courante et des allocations enregistrées de la prévision. Pour offrir une nouvelle source ici, ajoutez-la d'abord au budget de l'entente. Une allocation enregistrée peut conserver son sous-type retiré. Sélectionnez **Mettre à jour**, puis **Enregistrer la ventilation**, pour enregistrer ensemble le programme et les autres sources. La page calcule le coût total mensuel comme leur somme. La sous-ligne du programme affiche le même montant que la ligne principale; utilisez l'action de modification de la ligne principale pour le changer.

Si le volet exige des détails de financement pour les prévisions, chaque ligne active de cette version doit avoir au moins une allocation d'autres fonds enregistrée et une ventilation équilibrée avant l'achèvement. Pour un équipement de 1 000, saisissez 700 du programme et 300 d'une autre source. Avec seulement 250 de cette source, la page calcule un coût total de 950. Saisissez les 300 prévus avant d'enregistrer si le coût prévu est de 1 000.

Lorsque vous enregistrez ou achevez une prévision, l'application compare son montant annuel du programme au financement courant du même exercice et de la même devise. Les versions sont vérifiées séparément. Le coût total et les autres sources doivent respecter les règles de ligne, mais n'ont pas de plafonds budgétaires annuels distincts.

## Remplacer une prévision après une réduction du financement

Une réduction budgétaire peut être enregistrée même si une prévision active est trop élevée. L'onglet Prévisions signale l'exercice et la version touchés. Les paiements de cet exercice sont suspendus jusqu'à ce que la prévision active respecte le nouveau budget du programme.

Par exemple, réduire le financement annuel du programme de 12 000 à 10 000 laisse une prévision active de 12 000 au-dessus du budget. Choisissez **Ajouter une version** pour cet exercice, saisissez un remplacement de 10 000 ou moins, enregistrez et terminez son approbation. Ce brouillon est vide au départ au lieu de copier les montants trop élevés. Les paiements restent suspendus jusqu'à l'activation du remplacement. Rétablir un financement budgétaire autorisé suffisant résout aussi l'écart.

Supprimer la prévision active trop élevée ne permet pas de lever cette suspension. Terminez le remplacement, puis réessayez l'action de paiement. Un exercice sans prévision active n'a pas cette suspension pour écart de prévision; les autres contrôles de paiement s'appliquent toujours.

## Rétablissement

- Si aucun exercice n'est proposé, ajoutez des lignes courantes au [Budget](budget.md) de l'entente.
- Si un enregistrement échoue après un changement budgétaire, actualisez le budget et vérifiez le montant annuel du programme avant de réessayer.
- Après une modification budgétaire, les montants enregistrés restent liés aux lignes budgétaires correspondantes. Les lignes absentes du budget courant restent visibles en lecture seule et comptent dans les totaux. Leurs montants mensuels et leurs détails de financement ne sont pas modifiables. Demandez au gestionnaire de l'entente de revoir le budget avant de préparer un remplacement.
- Un exercice ayant un historique de prévision ne peut être réaffecté ni retiré, même après la suppression de la prévision. Gardez cet exercice dans le budget proposé d'une modification.
- Si la page ne charge pas, utilisez Réessayer avant de saisir le même travail. Après une réponse incertaine, vérifiez la version enregistrée et l'historique du flux.

## Contrat de développement

Pour les identifiants API, les formats monétaires exacts et les importations, consultez [Création d'extensions](../developer/extensions-authoring.md) et la [Référence API](../developer/api/agreements.md).
