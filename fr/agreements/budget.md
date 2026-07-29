# Budget d entente

L onglet Budget enregistre le budget par exercice et les lignes budgetaires de l entente. Il est la base des previsions, reclamations, engagements et paiements parce que ces flux choisissent leurs exercices et lignes de cout a partir du budget de l entente.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Exercices de l agence | Les budgets de volet et les exercices d entente se resolvent vers les exercices de l agence. |
| Budgets du volet | Le selecteur d exercice lit la liste de budgets du volet pour le programme et le volet de l entente. |
| Totaux et seuil de surengagement du volet | Le financement de programme des lignes budgetaires ne peut pas depasser la capacite du volet pour l exercice. |
| Categories de cout et lignes de cout | Les valeurs de ligne budgetaire viennent des categories de cout configurees pour le contexte de l entente. |
| Profil d entente | Les dossiers de budget peuvent seulement etre ajoutes apres la creation de l entente et lorsque l utilisateur peut la modifier. |

## Flux de page

L interface regroupe les lignes par exercice, categorie de cout et sous-section. Les exercices sans lignes sont affiches comme groupes vides pour permettre l ajout direct d une ligne.

Le selecteur d exercice offre seulement les exercices configures sur le volet de l entente. Le selecteur de categorie de cout offre seulement les categories valides pour le contexte de l entente.

## Dossiers

| Dossier | Champs requis |
| --- | --- |
| Exercice budgetaire | Exercice |
| Ligne budgetaire | Exercice budgetaire, categorie de cout, sous-section, description, montant total, financement du programme, devise |

Les lignes acceptent aussi le financement federal autre, le financement gouvernemental autre et l autre financement. Les champs d argent facultatifs vides sont normalises en valeurs vides. La devise par defaut du formulaire est CAD, mais l enum de devise configuree est acceptee.

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| L exercice doit venir de la liste de budgets du volet | Les exercices invalides ou non lies sont rejetes. |
| La categorie de cout doit etre valide pour l entente | Les utilisateurs peuvent seulement enregistrer les categories configurees pour le contexte du programme et du volet de l entente. |
| Le montant total doit couvrir les parts de financement | Le total doit etre superieur ou egal au financement du programme plus tous les autres champs de financement. |
| La capacite de financement est portee par le volet | La capacite disponible est basee sur le budget du volet pour l exercice, le seuil de surengagement et les autres lignes budgetaires d entente qui utilisent deja cette capacite. |
| Les mises a jour recalculent la capacite | La ligne courante est exclue du montant deja alloue avant de tester le nouveau financement de programme. |
| La suppression d exercice est limitee dans l UI | Le bouton de suppression apparait seulement lorsque le groupe d exercice n a aucune ligne. |

## Comportement de table

| Niveau | Affichage | Actions |
| --- | --- | --- |
| Groupe exercice | Libelle d exercice, nombre de lignes, totaux groupes | Ajouter une ligne, modifier l exercice, supprimer si vide |
| Groupe categorie | Categorie bilingue, nombre de lignes, totaux groupes | Ajouter une ligne avec categorie pre-remplie et verrouillee |
| Groupe sous-section | Texte de sous-section, nombre de lignes, totaux groupes | Ajouter une ligne avec categorie et sous-section pre-remplies et verrouillees |
| Ligne | Nom bilingue, description, total, financement du programme, total des autres financements | Modifier ou supprimer |

Le pied de table affiche le nombre de dossiers, le total, le financement du programme et les autres financements. Si toutes les lignes visibles utilisent une seule devise, les totaux utilisent cette devise; les devises mixtes affichent des nombres decimaux.

## Dependances

Les previsions et reclamations utilisent les exercices et lignes budgetaires comme lignes de ventilation. Les paiements utilisent les exercices budgetaires pour contraindre les exercices et les lignes d engagement admissibles. Les engagements comparent leurs lignes au financement de programme du budget d entente.

La modification du budget après le début de l’exécution en aval peut modifier les choix disponibles et la capacité restante. Finalisez le budget avant de créer des engagements, des prévisions, des réclamations ou des paiements.
