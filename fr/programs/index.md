# Programmes

Les programmes sont des profils de paiements de transfert. Un programme appartient a une agence, contient les modalites generales du programme et regroupe les volets qui pilotent l admission, les ententes, les examens, les approbations, les reclamations, les previsions, les paiements, la surveillance et les modifications.

Un programme n est pas seulement une etiquette. L agence, la periode, le statut, les budgets, les resultats, les objectifs et les indicateurs de rendement saisis ici deviennent des donnees de reference pour les volets et pour le travail d execution.

## Prerequis Dans Une Installation Vide

Avant de creer des programmes de production, configurez l agence proprietaire et les donnees de reference dont les formulaires de programme et de volet dependent:

| Configuration | Utilite |
| --- | --- |
| Profil d’agence et permissions structurelles de rôle | Les administrateurs de programme ont besoin d’un contexte d’agence et d’une permission de rôle `transfer_payment` de portée appropriée. Les équipes ne s’attachent pas aux programmes. |
| Exercices financiers de l agence | Les budgets de programme sont lies a ces enregistrements. |
| Sous-types de destinataires demandeurs, types d entente, categories de couts et elements de ligne de couts | Les volets consomment ces donnees d agence. |
| Utilisateurs communs, types "au nom de", schemas d examen, schemas de recommandation et modeles d approbation | Requis lorsque le premier volet doit generer des examens, recommandations ou approbations. |

Si l administrateur travaille dans un contexte d agence actif, le choix de l agence est verrouille. Sinon, le flux de creation permet de choisir une agence que l utilisateur est autorise a administrer.

## Page De Liste

La page Programmes affiche seulement les enregistrements que l’utilisateur courant peut lire grâce à une permission structurelle de rôle globale, propre à une agence ou limitée aux programmes liés. Les équipes de promoteur et d’entente ne donnent aucun accès aux programmes.

La liste prend en charge:

- Recherche dans les noms anglais et francais du programme, les abreviations anglaise et francaise, le nom de l agence et l identifiant du programme.
- Filtrage par statut, y compris tous les statuts.
- Pagination et controle des colonnes du tableau.
- Compteurs de sommaire pour le total des programmes et les programmes actifs lorsque la donnee est disponible.
- Actions creer, modifier, supprimer et assistant lorsque l utilisateur a la permission de paiement de transfert correspondante.

La suppression utilise le flux commun de confirmation et supprime logiquement le profil. Les administrateurs devraient l'utiliser comme correction de configuration, et non comme action normale de fin de vie pour un programme ayant un historique opérationnel.

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

La page de détail utilise six onglets verticaux pouvant être liés directement : Général, Volets, Résultats, Objectifs, Budgets et Indicateurs de rendement. L'onglet sélectionné est conservé dans le paramètre de requête `section`; un administrateur peut donc ajouter une zone de configuration précise à ses favoris.

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

Un budget de programme ne peut pas être réduit sous la somme de ses affectations actives aux budgets de volet, ni être supprimé tant que de telles affectations le référencent. Rechargez la page avant de réessayer si un autre administrateur a modifié les affectations simultanément.

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

Les actions lire, créer, modifier et supprimer sont autorisées par le sujet de rôle `transfer_payment`. La portée est dérivée de la structure du rôle et est globale, propre à une agence ou limitée aux programmes liés au rôle :

- La création vérifie l’agence sélectionnée et exige donc un accès global ou d’agence `transfer_payment:create` applicable.
- La visibilité de la liste est résolue par un accès global, un accès d’agence et les programmes liés aux rôles à portée de programme.
- Le détail et les actions sur les enfants évaluent l’action CRUD demandée par rapport à l’agence et au programme propriétaires.
- Les pages de volet et de configuration enfant demeurent dans la portée dérivée du rôle qui couvre le programme propriétaire.
- Les équipes ne sont jamais évaluées pour les agences, les programmes ou les volets.

Si un utilisateur peut lire un programme sans pouvoir le modifier, la page de detail charge quand meme, mais les actions de modification et d ajout sont masquees ou desactivees.

## Suppression, Échec Et Reprise

Les suppressions du profil et de ses enfants sont logiques plutôt que physiques. Supprimer un profil ne supprime pas physiquement ses volets ni ses anciennes configurations, mais les chemins exigeant un profil actif ne les exposent plus. Avant la suppression, le serveur verrouille le profil et l'ensemble courant de volets actifs, vérifie de nouveau l'accès précis de suppression et demande à chaque extension enregistrée de protéger la portée de chaque volet. Une règle de cycle de vie d'extension peut bloquer l'opération. Si l'ensemble de volets actifs change à répétition pendant l'acquisition des verrous, la requête produit une erreur localisée de changement de portée au lieu de supprimer selon un état périmé.

Les créations, modifications, assistants et mutations d'enfants revérifient l'autorisation et la propriété active dans des transactions. L'agence d'un profil existant est immuable. Une ressource absente et une ressource inaccessible sont volontairement difficiles à distinguer; vérifiez l'identifiant ainsi que la portée globale, d'agence ou de programme lié de l'utilisateur. Les valeurs bilingues en double, les dates ou URL invalides, les exercices d'une autre agence et les valeurs financières non sûres produisent des erreurs localisées de validation ou de conflit. Rechargez après un changement simultané, corrigez le champ indiqué et soumettez de nouveau; les valeurs de la fenêtre demeurent disponibles après une erreur d'API ordinaire.

## Ordre De Configuration Operationnelle

Un ordre pratique dans une installation vide est:

1. Creer ou verifier l agence et ses donnees de reference.
2. Creer le profil de programme, idealement avec l assistant si les resultats, objectifs, budgets et indicateurs sont deja connus.
3. Ajouter les budgets du programme pour chaque exercice financier utilise par les volets.
4. Creer un ou plusieurs volets.
5. Configurer les budgets de volet, destinataires, lignes de couts, sous-types d entente, engagements, risques, examens, recommandations, approbations, modeles de documents et extensions.
6. Activer ou publier les schemas d evaluation et modeles d approbation utilises par les flux d execution.
7. Creer des ententes de production seulement lorsque le volet cible est assez complet pour le flux d entente utilise.
