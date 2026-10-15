# Prévisions d’entente

Utilisez les prévisions pour indiquer quand les dépenses de l’entente devraient avoir lieu. Ouvrez une entente et sélectionnez **Prévisions**. Chaque version numérotée est une prévision distincte avec ses montants mensuels, ses utilisateurs affectés, son achèvement et son historique d’approbation.

## Avant de commencer

| Exigence | Points à vérifier |
| --- | --- |
| Budget courant de l’entente | L’exercice doit appartenir au budget courant. Le sélecteur propose les exercices ayant des lignes budgétaires courantes. |
| Accès | Lecteur Entente consulte. La création exige Contributeur et une affectation à l’entente; le créateur devient le responsable principal de la prévision. La modification et l’achèvement exigent Contributeur et une affectation à cette prévision. La suppression exige Gestionnaire et cette affectation. |
| Dossier d’utilisateur | L’achèvement exige un dossier d’utilisateur actif pour le compte connecté. |
| Flux d’approbation facultatif | Un flux publié de soumission d’approbation pour les prévisions démarre à l’achèvement s’il est configuré. Le remplacement devient actif seulement après la réussite. |

Le serveur vérifie de nouveau votre accès courant et les verrous de l’entente à l’enregistrement. Les lignes budgétaires doivent appartenir à cette entente, à l’exercice choisi et au budget courant.

## Créer et parcourir les prévisions

Choisissez **Ajouter une prévision**, sélectionnez l’exercice et enregistrez. La nouvelle prévision est un brouillon inactif. Le système attribue le prochain numéro de version pour cette entente et cet exercice, à partir de 0. Les versions supprimées réservent encore leur numéro.

Développez un groupe d’exercice pour voir chaque version, son statut, son indicateur actif, le nombre de lignes et son total dans la devise de l’entente. Le total et le statut du groupe proviennent de la version active, ou de la dernière version si aucune n’est active. Ils ne sont pas la somme des différentes estimations. La recherche porte sur l’exercice, la version, le statut, le nombre de lignes ou le total; le filtrage et la pagination suivent le chargement du résumé.

Sélectionnez **Ajouter une version** dans un groupe d’exercice pour créer et ouvrir un brouillon distinct. Normalement, il copie les montants mensuels, les coûts totaux et les allocations d’autres fonds de la prévision active. Sans prévision active, il est vide. Si la prévision active dépasse le budget annuel courant du programme, il est aussi vide afin de préparer un remplacement qui respecte le budget. Les versions précédentes gardent leur historique et leurs affectations.

Par exemple, la version active 0 prévoit 2 000 en avril et 3 000 en mai. Ajoutez la version 1, puis changez les montants copiés à 1 000 et 4 000. Les deux totalisent 5 000. La version 0 reste active pendant que la version 1 est en brouillon ou en attente d’approbation.

## Modifier la ventilation mensuelle

Ouvrez la version à modifier. Son exercice et son numéro de version ne sont pas modifiables. La grille regroupe les lignes du budget courant par catégorie et sous-section de coûts, avec des totaux trimestriels d’avril à mars. Sélectionnez l’en-tête d’un trimestre pour afficher ses champs mensuels. La recherche porte sur la catégorie, la sous-section, le nom bilingue ou la description.

1. Saisissez les montants attendus du programme, de zéro ou plus, dans la devise de l’entente, avec au plus deux décimales.
2. Sélectionnez **Enregistrer la ventilation**. Une nouvelle cellule à zéro ne crée aucune ligne. Mettre une cellule existante à zéro conserve sa ligne avec un montant nul.
3. Si l’enregistrement échoue, actualisez et comparez toutes les cellules enregistrées aux montants voulus. Les cellules sont enregistrées dans l’ordre; les premiers changements peuvent déjà être conservés. Corrigez la cellule signalée et enregistrez le reste.

Une requête de ligne refusée annule cette requête. Aucune transaction unique ne couvre la grille entière. La grille peut masquer des montants importés en double pour la même ligne budgétaire et le même mois; les intégrations devraient envoyer un montant par cellule et vérifier les lignes enregistrées avant l’achèvement.

Les changements ordinaires conservent le statut métier de l’organisme. Supprimer une prévision modifiable la retire des listes normales avec ses lignes actives, tout en conservant l’historique. Aucune commande de rétablissement n’est offerte.

## Cycle de vie et achèvement

Enregistrez la ventilation et les détails de financement requis avant de sélectionner Achever. Il faut une affectation à cette version, le niveau Contributeur, au moins une ligne active, aucun achèvement antérieur et un dossier modifiable. Un statut d’organisme en lecture seule ou terminal, un flux actif ou une entente protégée peut bloquer les changements.

L’achèvement consigne l’utilisateur et le commentaire facultatif. Il démarre le flux configuré de soumission d’approbation, ou consigne un achèvement sans flux. La réussite active cette version et remplace la prévision active de la même entente et du même exercice. Sans flux d’approbation, c’est immédiat; sinon, cela attend sa réussite. Un échec ou une annulation laisse l’ancienne prévision active. Un brouillon portant un numéro plus élevé ne la remplace pas.

L’achèvement ne peut être répété ni annulé ici. Utilisez une nouvelle version pour remplacer une prévision achevée. Les flux standard se choisissent séparément et ne remplacent pas l’achèvement. Consultez [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).

## Ventilation du financement et contrôles budgétaires annuels

Enregistrez une ligne mensuelle avant d’ouvrir son éditeur de financement. Saisissez le coût total et les autres sources avec les sous-types configurés du volet. Choisissez chaque sous-type une fois; une allocation existante peut garder son sous-type retiré. Le coût total ne peut être inférieur au financement du programme. Lorsque d’autres sources sont saisies, leur somme avec le programme doit égaler exactement le coût total.

Si le volet exige des détails de financement pour les prévisions, chaque ligne active de cette version doit avoir au moins une allocation d’autres fonds enregistrée et une ventilation équilibrée avant l’achèvement. Pour un équipement de 1 000, saisissez 700 du programme et 300 d’une autre source. Une allocation de seulement 250 laisse un écart de 50 à corriger.

L’enregistrement et l’achèvement comparent le montant annuel du programme de cette prévision au financement courant du même exercice et de la même devise. Les versions sont vérifiées séparément. Le coût total et les autres sources doivent respecter les règles de ligne, mais n’ont pas de plafonds budgétaires annuels distincts.

## Remplacer une prévision après une réduction du financement

Une réduction budgétaire peut être enregistrée même si une prévision active est trop élevée. L’onglet Prévisions signale l’exercice et la version touchés. Les paiements de cet exercice sont suspendus jusqu’à ce que la prévision active respecte le nouveau budget du programme.

Par exemple, réduire le financement annuel du programme de 12 000 à 10 000 laisse une prévision active de 12 000 au-dessus du budget. Choisissez **Ajouter une version** pour cet exercice, saisissez un remplacement de 10 000 ou moins, enregistrez et terminez son approbation. Ce brouillon est vide au départ au lieu de copier les montants trop élevés. Les paiements restent suspendus jusqu’à l’activation du remplacement. Rétablir un financement budgétaire autorisé suffisant résout aussi l’écart.

Supprimer la prévision active trop élevée ne permet pas de lever cette suspension. Terminez le remplacement, puis réessayez l’action de paiement. Un exercice sans prévision active n’a pas cette suspension pour écart de prévision; les autres contrôles de paiement s’appliquent toujours.

## Rétablissement

- Si aucun exercice n’est proposé, ajoutez des lignes courantes au [Budget](budget.md) de l’entente.
- Si un enregistrement échoue après un changement budgétaire, actualisez le budget et vérifiez le montant annuel du programme avant de réessayer.
- Une modification budgétaire conserve les identités d’exercice et de ligne correspondantes. Une ligne courante retirée ou sans correspondance peut disparaître de la grille modifiable; vérifiez les lignes conservées avant d’achever un remplacement.
- Un exercice ayant un historique de prévision ne peut être réaffecté ni retiré, même après la suppression de la prévision. Gardez cet exercice dans le budget proposé d’une modification.
- Si la page ne charge pas, utilisez Réessayer avant de saisir le même travail. Après une réponse incertaine, vérifiez la version enregistrée et l’historique du flux.

## Contrat de développement

Les versions appartiennent à `Funding_Case_Agreement_Forecast.egcs_fc_version`; les lignes n’ont pas de champ de version. Le serveur attribue le numéro sous le verrou de l’entente. La création accepte l’identifiant d’exercice et `egcs_fc_copyfromactive` facultatif; le PATCH d’en-tête est retiré. Les schémas de ligne refusent les champs inconnus, dont l’ancienne version de ligne. Les mois restent des entiers de `0` à `11`, d’avril à mars, et les montants sont transmis en texte décimal exact. Les importations SDK renvoient la version créée. Consultez [Création d’extensions](../developer/extensions-authoring.md).
