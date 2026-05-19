# Volets

Les volets sont la couche de configuration operationnelle sous un programme. Un volet relie un programme aux types d entente, destinataires admissibles, budgets de financement, lignes de couts, engagements, generation d examens, routes d approbation, configurations de recommandation, cotes de risque, types de surveillance, modeles de documents, domaines d expertise, limites financieres et extensions propres au volet.

La plupart des comportements d entente et d execution sont pilotes par le volet. Un programme peut exister sans volet, mais un flux d entente de production ne le peut normalement pas.

## Liste Des Volets Et Navigation

Les volets sont geres dans l onglet Volets de la page de detail du programme. Le tableau est porte par le programme courant et prend en charge creer, modifier, supprimer et la creation par assistant lorsque l utilisateur peut modifier la configuration enfant du programme.

Ouvrir un volet mene a une page de detail de volet avec son propre sommaire repliable, son fil d Ariane et ses onglets verticaux. La page de volet herite toujours de la portee du programme parent et de l agence pour l autorisation.

## Modale Rapide De Volet

La modale standard cree ou modifie seulement l enregistrement de volet. Elle capture:

- Nom anglais et nom francais.
- Abreviation anglaise et abreviation francaise.
- Volet parent optionnel dans le meme programme.
- Objectif anglais et objectif francais.
- Indicateur "permet la redistribution".
- Description anglaise et description francaise.
- Statut, brouillon par defaut.

Le volet parent doit appartenir au meme programme. Utilisez les volets parents pour modeliser la structure du programme; les configurations d execution restent configurees sur le volet ou les ententes et examens seront crees.

## Assistant De Volet

L assistant de volet cree le volet et plusieurs collections de configuration enfant ensemble. Il est utile pour une premiere configuration, car il applique les regles entre enregistrements avant toute sauvegarde partielle.

Les etapes de l assistant sont:

- General: identite du volet, volet parent, descriptions, objectifs, indicateur de redistribution et statut.
- Budgets: budgets de volet lies aux budgets d exercice financier du programme.
- Destinataires: sous-types de destinataires demandeurs admissibles.
- Lignes de couts: elements de ligne de categorie de couts de l agence et ratios de partage des couts du volet.
- Types de modification: categorie modifiee et nom bilingue du type.
- Sous-types de modification: nom et description lies a un type de modification de l assistant.
- Sous-types d entente: types d entente de l agence permis pour le volet.
- Engagements: lignes de codage financier liees a un budget d exercice financier du programme.
- Types de surveillance: types de dossiers de surveillance bilingues.
- Domaines: domaines d expertise bilingues pour l affectation d examens/evaluations.
- Limites financieres: montant maximal par destinataire, pourcentage de soutien, pourcentage de couts retroactifs, limite de cumul et statut.
- Revision: sommaire de la configuration du volet.

Le schema de l assistant initialise aussi des tableaux pour les configurations d examen et de recommandation, mais les etapes visibles se concentrent sur les donnees de base du volet. Configurez les examens, recommandations, modeles d approbation, schemas d evaluation et extensions dans les onglets de detail apres la creation du volet.

## Validation De L Assistant

L assistant empeche les conflits courants:

- Un budget de programme ne peut etre selectionne qu une fois dans les budgets de volet.
- Les sous-types de destinataire admissible doivent etre uniques.
- Les elements de ligne de couts doivent etre uniques.
- L unicite d un type de modification repose sur la categorie modifiee et le nom bilingue.
- Les sous-types de modification doivent referencer un type de modification qui existe encore dans l assistant.
- Les noms de sous-type de modification doivent etre uniques dans leur type de modification.
- Les sous-types d entente doivent etre uniques.
- Les noms bilingues des types de surveillance doivent etre uniques.
- Les noms bilingues des domaines d expertise doivent etre uniques.
- Les configurations d examen actives ne doivent pas dupliquer l ordre ou le nom bilingue dans le meme type d entite.
- Les configurations de recommandation actives ne doivent pas dupliquer le nom bilingue dans le meme type d entite.

Les choix selectionnes doivent appartenir au bon parent: les volets parents et budgets de programme au programme courant; les sous-types de destinataire, lignes de couts, types d entente, schemas d examen et schemas de recommandation a l agence du programme.

## Onglets De Detail Du Volet

La page de detail du volet expose ces onglets:

- General.
- Budgets.
- Destinataires admissibles.
- Elements de ligne de categorie de couts.
- Types de modification.
- Sous-types de modification.
- Sous-types d entente.
- Engagements.
- Types de surveillance.
- Cotes de risque.
- Domaines d expertise.
- Limites financieres.
- Configurations d examen.
- Modeles d approbation.
- Modeles de documents.
- Configurations de recommandation.
- Extensions.

Chaque onglet utilise le meme patron: tableau de ressources, modale ou editeur, validation et suppression logique lorsque la suppression est permise.

## Onglet General

L onglet General affiche l identite et les champs descriptifs du volet:

- Volet parent.
- Nom anglais et nom francais.
- Abreviation anglaise et abreviation francaise.
- Objectif anglais et objectif francais.
- Permet la redistribution.
- Description anglaise et description francaise.
- Statut.

Modifiez ces champs depuis l action de la page de volet ou depuis l onglet Volets du programme parent.

## Onglet Budgets

Les budgets de volet allouent une partie d un budget d exercice financier du programme au volet. Chaque ligne contient:

- Budget de programme.
- Budget total.
- Seuil de surengagement.

Configurez les budgets du programme avant les budgets de volet. Le financement des ententes et la configuration des engagements dependent de la structure d exercice financier.

## Onglet Destinataires Admissibles

Les destinataires admissibles definissent quels sous-types de destinataires demandeurs de l agence peuvent etre utilises pour le volet. Chaque ligne selectionne un sous-type de destinataire demandeur.

Cet onglet agit comme barriere d execution: il limite les types de promoteurs/destinataires qui devraient etre disponibles dans les flux d entente ou d admission du volet.

## Onglet Elements De Ligne De Categorie De Couts

Les elements de ligne de categorie de couts exposent les lignes de couts de l agence au volet. Chaque ligne contient:

- Element de ligne de categorie de couts de l agence.
- Ratio de partage des couts.

L element selectionne doit appartenir a une categorie de couts de l agence du programme. Ces lignes controlent les elements de couts utilisables dans les budgets d entente et les reclamations du volet.

## Types Et Sous-Types De Modification

Les types de modification definissent la categorie d entite modifiee et un nom bilingue. La categorie modifiee utilise l enum des types modifies de paiement de transfert.

Les sous-types de modification sont lies a un type de modification et ajoutent:

- Nom anglais et nom francais.
- Description anglaise et description francaise.

Les sous-types ne peuvent pas etre configures utilement avant leur type parent. Dans l assistant, supprimer un type de modification supprime aussi ses sous-types temporaires.

## Onglet Sous-Types D Entente

Les sous-types d entente associent les types d entente de l agence au volet. Chaque ligne selectionne un type d entente de l agence.

Cette configuration classe les ententes du volet et limite les types d entente valides dans la creation d ententes. Les types d entente de l agence doivent exister avant de remplir cet onglet.

## Onglet Engagements

Les engagements definissent les lignes de codage financier utilisees par les engagements d entente. Chaque ligne contient:

- Exercice financier / budget de volet.
- Fonds.
- GL.
- Description GL.
- Centre de fonds.
- Ordre interne.
- Domaine fonctionnel.
- Centre de couts.

Creez les budgets de volet avant les engagements afin que les lignes puissent pointer vers le bon budget d exercice financier.

## Onglet Types De Surveillance

Les types de surveillance classent les dossiers de surveillance du volet. Chaque ligne contient un nom anglais et francais. Ces valeurs deviennent des options de reference pour les flux de surveillance rattaches aux ententes du volet.

## Onglet Cotes De Risque

Les cotes de risque definissent les libelles et pointages disponibles pour le volet. Chaque ligne contient:

- Pointage de risque numerique. Le pointage doit etre fini et non negatif.
- Nom anglais et nom francais.

Les cotes de risque peuvent etre selectionnees ou derivees par les flux d entente et d evaluation; gardez donc leur echelle coherente avec le pointage d evaluation et les rapports operationnels.

## Onglet Domaines D Expertise

Les domaines d expertise soutiennent l affectation et la classification du travail d examen. Chaque ligne contient:

- Nom anglais et nom francais.
- Description anglaise et description francaise.

Utilisez ces lignes lorsque le volet exige un routage d examen par specialite ou des etiquettes d expertise dans les processus d evaluation.

## Onglet Limites Financieres

Les limites financieres definissent les seuils du volet:

- Montant maximal admissible par destinataire.
- Pourcentage maximal de soutien disponible par destinataire.
- Pourcentage maximal de couts retroactifs admissibles.
- Limite de cumul.
- Statut.

L assistant traite les limites financieres comme optionnelles. Si le volet n a aucune ligne de limites financieres, les processus qui dependent de ces controles n auront pas de valeurs propres au volet.

## Onglet Configurations D Examen

Les configurations d examen definissent comment les evaluations sont generees pour les entites d execution. Une configuration contient:

- Type d entite.
- Indicateur "a la completion".
- Nom anglais et nom francais.
- Ordre.
- Indicateur sequentiel.
- Modele d approbation optionnel.
- Indicateur actif.
- Un ou plusieurs membres de configuration.

Chaque membre est lie a un schema d evaluation, a un ordre et a un modele d approbation optionnel. Les lignes affichent aussi les metadonnees du schema comme le nom, le nom du resultat, la version et le statut.

Regles metier:

- Les membres d une meme configuration doivent utiliser des schemas d examen uniques.
- Les membres d une meme configuration doivent utiliser des ordres uniques.
- La generation a la completion n est pas permise pour les types d entite qui supportent seulement la creation manuelle: admission de dossier de financement, entente de dossier de financement et demandeur/destinataire.
- Les configurations actives ne peuvent pas dupliquer type d entite plus ordre ou type d entite plus nom bilingue.
- Les schemas d examen doivent appartenir a l agence du volet et correspondre au type d entite configure.

Implication d execution: lorsque la configuration est activee pour des entites supportees, elle peut generer du travail d examen commun. Les configurations sequentielles controlent si les membres s executent en sequence ou en parallele.

## Onglet Configurations De Recommandation

Les configurations de recommandation definissent la generation de recommandations pour un volet. Chaque configuration contient:

- Type d entite.
- Nom anglais et nom francais.
- Description anglaise et description francaise.
- Schema de recommandation.
- Modele d approbation optionnel.
- Indicateur actif.

Les configurations actives ne doivent pas dupliquer type d entite plus nom bilingue. Les schemas de recommandation doivent appartenir a l agence et correspondre au type d entite configure.

## Onglet Modeles D Approbation

Les modeles d approbation de volet definissent les routes d approbation portees par le volet. Les modeles sont groupes par type d entite d execution et peuvent contenir des etapes ordonnees et des certifications.

Utilisez cet onglet lorsque les routes d approbation doivent varier selon le volet. Des modeles communs/globaux peuvent exister ailleurs, mais les modeles de volet sont ceux qui sont generalement references par les flux d examen, recommandation, entente, reclamation, prevision, paiement, surveillance et demandeur/destinataire.

Voir [Modeles d approbation](./approval-templates.md) pour le comportement complet des modeles et de l approbation en execution.

## Onglet Modeles De Documents

Les modeles de documents de volet definissent les fichiers sources utilises par la generation de documents d entente. L onglet affiche le type d entite, le nom anglais, le genre de modele, les formats de sortie, l etat actif, les pieces jointes bilingues et les actions de ligne.

Chaque modele stocke :

| Champ | Regle |
| --- | --- |
| Type d entite | Utilise actuellement par la generation d entente comme `fundingcaseagreement`. |
| Nom anglais/francais | Nom d affichage bilingue requis. |
| Description anglaise/francaise | Description bilingue requise affichee lorsque les utilisateurs choisissent un modele sur une entente. |
| Genre de modele | `docx` ou `html`. |
| Formats de sortie | Un ou plusieurs de `docx` et `pdf`; les modeles HTML sont limites a `pdf`. |
| Fichier anglais/francais | Requis a la creation. Les modeles DOCX acceptent `.docx`; les modeles HTML acceptent `.html` ou `.htm`. |
| Actif | Seuls les modeles actifs d entente sont disponibles dans l onglet Documents d une entente. |

Modifier un modele peut mettre a jour les metadonnees, les formats de sortie, l etat actif et l un ou l autre fichier de langue. Remplacer un fichier de langue stocke une nouvelle piece jointe et retire la piece jointe remplacee du stockage normal. Supprimer un modele le supprime logiquement; les documents d entente deja generes restent des enregistrements separes.

Note operationnelle : la generation PDF depuis DOCX utilise LibreOffice, et HTML vers PDF utilise Puppeteer. Le developpement local peut installer ces outils avec la commande de generation de documents decrite dans [Demarrage local](../developer/startup.md).

## Schemas D Evaluation

Les schemas d evaluation sont accessibles depuis les lignes de configuration d examen ou d ensemble d evaluation qui referencent un schema. L editeur permet de maintenir la matrice de pointage, les sections, questions, questions calculees, dependances, resultats et facteurs d impact utilises par les evaluations d execution.

Voir [Schemas d evaluation](./assessment-schemas.md) pour le cycle de vie et le comportement complet de l editeur.

## Onglet Extensions

Les extensions controlent les parametres d extension propres au volet. La configuration des extensions est separee de la configuration de base des paiements de transfert, mais elle herite du meme contexte volet, programme et agence.

![Configuration des extensions de volet](/screenshots/fr/stream-extensions.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._

## Dependances D Execution

Les flux en aval lisent la configuration du volet de differentes facons:

- La creation d entente depend des sous-types d entente, destinataires admissibles, budgets, limites financieres et identite du volet.
- Les flux de reclamation et de couts dependent des lignes de categorie de couts et des ratios de partage.
- Les engagements et paiements dependent des budgets et lignes de codage financier.
- Les examens dependent des configurations d examen actives et des schemas d evaluation actifs/publies.
- Les approbations dependent des modeles d approbation references et de leurs utilisateurs par defaut.
- La generation de documents d entente depend des modeles de documents actifs du volet et des outils de generation configures pour la sortie PDF.
- Les recommandations dependent des configurations actives et des schemas.
- La surveillance depend des types de surveillance et, lorsque configure, des examens ou approbations.

Comme la configuration est modulaire, un volet peut etre sauvegarde avant d etre complet sur le plan operationnel. Les administrateurs devraient valider tout le chemin d execution utilise avant de creer des ententes de production.

## Volet Minimal Utile

Dans une installation fraiche, un volet minimal pratique contient habituellement:

- Profil general du volet avec statut approprie.
- Au moins un budget de programme et un budget de volet.
- Lignes de sous-types de destinataire admissible.
- Lignes de sous-types d entente.
- Lignes d elements de categorie de couts si les couts ou reclamations sont utilises.
- Codage financier des engagements si les engagements ou paiements sont utilises.
- Cotes de risque si le risque ou le pointage d evaluation les utilise.
- Configurations d examen et schemas d evaluation si des examens sont generes.
- Modeles d approbation si les approbations sont requises.
- Modeles de documents si les utilisateurs genereront des documents d entente.
- Configurations de recommandation si des recommandations sont generees.
- Parametres d extension requis par le deploiement.
