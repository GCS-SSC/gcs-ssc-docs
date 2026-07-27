# Programmes

Les programmes sont des profils de paiements de transfert. Un programme appartient a une agence, contient les modalites generales du programme et regroupe les volets qui pilotent l admission, les ententes, les examens, les approbations, les reclamations, les previsions, les paiements, la surveillance et les modifications.

Un programme n est pas seulement une etiquette. L agence, la periode, le statut, les budgets, les resultats, les objectifs et les indicateurs de rendement saisis ici deviennent des donnees de reference pour les volets et pour le travail d execution.

## Prerequis Dans Une Installation Vide

Avant de creer des programmes de production, configurez l agence proprietaire et les donnees de reference dont les formulaires de programme et de volet dependent:

| Configuration | Utilite |
| --- | --- |
| Profil d agence et permissions des utilisateurs/equipes | Les administrateurs de programme ont besoin d un contexte d agence et de permissions de paiement de transfert. |
| Exercices financiers de l agence | Les budgets de programme sont lies a ces enregistrements. |
| Sous-types de destinataires demandeurs, types d entente, categories de couts et elements de ligne de couts | Les volets consomment ces donnees d agence. |
| Utilisateurs communs, types "au nom de", schemas d examen, schemas de recommandation et modeles d approbation | Requis lorsque le premier volet doit generer des examens, recommandations ou approbations. |

Si l administrateur travaille dans un contexte d agence actif, le choix de l agence est verrouille. Sinon, le flux de creation permet de choisir une agence que l utilisateur est autorise a administrer.

## Page De Liste

La page Programmes affiche seulement les enregistrements que l utilisateur courant peut lire par permission globale, agence, equipe ou entite.

La liste prend en charge:

- Recherche dans les noms anglais et francais du programme, les abreviations anglaise et francaise, le nom de l agence et l identifiant du programme.
- Filtrage par statut, y compris tous les statuts.
- Pagination et controle des colonnes du tableau.
- Compteurs de sommaire pour le total des programmes et les programmes actifs lorsque la donnee est disponible.
- Actions creer, modifier, supprimer et assistant lorsque l utilisateur a la permission de paiement de transfert correspondante.

La suppression utilise le flux commun de confirmation et un comportement de suppression logique. Les administrateurs devraient l utiliser comme correction de configuration, non comme action normale de fin de vie pour un programme qui a deja des volets ou des ententes d execution.

## Modale De Creation Rapide

La modale standard cree ou modifie seulement le profil de paiement de transfert. Elle est utile lorsque l administrateur veut creer la coquille du programme d abord, puis configurer les resultats, objectifs, budgets, indicateurs et volets plus tard.

Les champs du profil sont:

- Agence: obligatoire, utilisee pour la portee des permissions et le filtrage des donnees de reference.
- Date de debut et date de fin: obligatoires. La date de fin doit etre egale ou posterieure a la date de debut.
- Nom anglais et nom francais.
- Abreviation anglaise et abreviation francaise.
- Lien des modalites: obligatoire et doit etre une URL valide.
- Description anglaise et description francaise.
- Objectif anglais et objectif francais.
- Statut: brouillon par defaut a la creation.

Tous les champs bilingues sont obligatoires. Un programme sans texte anglais ou francais ne valide pas.

## Assistant De Programme

L assistant cree le profil et les enregistrements enfants selectionnes ensemble. Si un champ obligatoire, une regle de doublon ou une regle de donnees de reference echoue, toute la soumission echoue et aucun programme partiel n est cree.

Les etapes de l assistant sont:

- General: agence, dates, noms bilingues, abreviations, lien des modalites, descriptions, objectifs et statut.
- Resultats: zero ou plusieurs resultats bilingues.
- Objectifs: zero ou plusieurs enonces d objectif bilingues.
- Budgets: zero ou plusieurs budgets d exercice financier. Chaque ligne choisit un exercice financier de l agence, un budget total et un seuil de surengagement.
- Rendement: zero ou plusieurs indicateurs de rendement, chacun lie a un resultat de l assistant.
- Revision: sommaire en lecture seule des donnees qui seront soumises.

## Regles De L Assistant

| Regle | Comportement |
| --- | --- |
| Les noms de resultat doivent etre uniques | La meme combinaison de nom anglais/francais ne peut pas apparaitre deux fois. |
| Les objectifs doivent etre uniques | La meme combinaison de texte anglais/francais ne peut pas apparaitre deux fois. |
| Les budgets sont un exercice par ligne | Chaque exercice financier ne peut apparaitre qu une fois. |
| Les indicateurs doivent rester lies a un resultat | Supprimer un resultat supprime aussi les indicateurs lies. |
| Les noms d indicateur doivent etre uniques dans un resultat | Les doublons sont bloques dans le resultat selectionne. |
| Changer l agence reinitialise les budgets | Les budgets sont effaces parce que les exercices financiers sont propres a l agence. |
| Les exercices doivent appartenir a l agence choisie | Un budget de programme peut seulement utiliser les exercices de l agence selectionnee. |

A la soumission, l assistant cree le profil, les resultats, les objectifs, les budgets et les indicateurs de rendement lies aux resultats crees.

## Page De Detail

L ouverture d un programme affiche un sommaire repliable avec le nom et la description bilingues. Le bouton de modification ouvre la meme modale de profil que la liste, avec les dates normalisees pour les champs de date.

La page de detail utilise des onglets verticaux pour General et Volets.

## Onglet General

L onglet General affiche les champs du profil en lecture seule:

- Identite du profil de paiement de transfert portee par l agence.
- Date de debut et date de fin.
- Nom anglais et nom francais.
- Abreviation anglaise et abreviation francaise.
- Description anglaise et description francaise.
- Objectif anglais et objectif francais.
- Lien des modalites.
- Statut.

Utilisez l action de modification au niveau de la page pour changer ces champs.

## Onglet Volets

L onglet Volets liste les volets operationnels du programme. Les ententes et la plupart des configurations d execution sont pilotees par le volet; au moins un volet est donc normalement requis avant la creation d ententes de production.

Le tableau des volets prend en charge creer, modifier, supprimer et un assistant de configuration lorsque l utilisateur peut modifier les enregistrements enfants. Un volet contient nom bilingue, abreviation bilingue, description bilingue, objectif bilingue, volet parent optionnel, indicateur de redistribution et statut.

Ouvrez un volet pour configurer les budgets, destinataires admissibles, lignes de couts, sous-types d entente, engagements, cotes de risque, configurations d examen, configurations de recommandation, modeles d approbation, modeles de documents et extensions.

## Onglet Resultats

Les resultats definissent les secteurs de resultat utilises par le suivi du rendement du programme. Chaque resultat contient:

- Nom anglais et nom francais.
- Description anglaise et description francaise.

Les indicateurs de rendement sont lies aux resultats; modifier ou supprimer des resultats peut donc changer les options disponibles lors de la configuration des indicateurs.

## Onglet Objectifs

Les objectifs capturent les enonces bilingues du programme. Chaque ligne contient:

- Texte d objectif anglais.
- Texte d objectif francais.

Les objectifs sont au niveau du programme. Ils ne remplacent pas les objectifs de volet, qui sont configures sur chaque volet.

## Onglet Budgets

Les budgets de programme repartissent le financement par exercice financier de l agence. Chaque ligne contient:

- Exercice financier provenant des donnees de reference de l agence.
- Budget total.
- Seuil de surengagement.

Chaque budget de programme peut ensuite etre reference par des budgets de volet. Configurez les budgets du programme avant les budgets de volet, les engagements ou toute configuration d entente dependante de l exercice financier.

Le selecteur d’exercice financier recherche les exercices disponibles de l’agence du programme. Lors de la modification d’un budget, l’exercice enregistre est resolu vers son libelle d’affichage meme s’il ne figure pas sur la page de resultats courante; les dossiers hors de la portee de l’agence du programme ne peuvent pas etre selectionnes.

## Onglet Indicateurs De Rendement

Les indicateurs de rendement sont crees sous les resultats. Chaque indicateur contient:

- Resultat.
- Nom anglais et nom francais.
- Description anglaise et description francaise.

Le formulaire de creation preselectionne un resultat disponible lorsque possible. S il n y a aucun resultat, creez au moins un resultat avant d ajouter des indicateurs.

## Statut Et Cycle De Vie

Le statut du programme utilise l enum de statut de base et vaut brouillon par defaut. Le statut actif est compte par la page de liste et correspond a l etat attendu pour une configuration prete a l utilisation operationnelle. L application n active pas automatiquement les volets ou les configurations d execution lorsqu un programme devient actif; chaque volet et chaque dependance doivent etre configures volontairement.

## Permissions Et Portee

Les actions lire, creer, modifier et supprimer sont autorisees par la ressource de paiement de transfert. La portee est globale, par agence ou par entite:

- La creation verifie l agence selectionnee.
- La visibilite de la liste est resolue par acces global, acces agence et acces a des entites de paiement de transfert.
- La lecture du detail et les actions sur les enfants utilisent l agence proprietaire et l identifiant du paiement de transfert.
- Les pages de volet et de configuration enfant heritent de la portee d agence du programme.

Si un utilisateur peut lire un programme sans pouvoir le modifier, la page de detail charge quand meme, mais les actions de modification et d ajout sont masquees ou desactivees.

## Ordre De Configuration Operationnelle

Un ordre pratique dans une installation vide est:

1. Creer ou verifier l agence et ses donnees de reference.
2. Creer le profil de programme, idealement avec l assistant si les resultats, objectifs, budgets et indicateurs sont deja connus.
3. Ajouter les budgets du programme pour chaque exercice financier utilise par les volets.
4. Creer un ou plusieurs volets.
5. Configurer les budgets de volet, destinataires, lignes de couts, sous-types d entente, engagements, risques, examens, recommandations, approbations, modeles de documents et extensions.
6. Activer ou publier les schemas d evaluation et modeles d approbation utilises par les flux d execution.
7. Creer des ententes de production seulement lorsque le volet cible est assez complet pour le flux d entente utilise.
