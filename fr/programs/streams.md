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
- Indicateur Actif, faux initialement.

Le volet parent doit appartenir au meme programme. Utilisez les volets parents pour modeliser la structure du programme; les configurations d execution restent configurees sur le volet ou les ententes et examens seront crees.

## Assistant De Volet

L assistant de volet cree le volet et plusieurs collections de configuration enfant ensemble. Il est utile pour une premiere configuration, car il applique les regles entre enregistrements avant toute sauvegarde partielle.

Les etapes de l assistant sont:

- General: identite du volet, volet parent, descriptions, objectifs, indicateur de redistribution et indicateur actif.
- Bases de retenue : base de retenue de l'agence et libellé bilingue propre au volet.
- Budgets: budgets de volet lies aux budgets d exercice financier du programme.
- Destinataires: sous-types de destinataires demandeurs admissibles.
- Lignes de couts: elements de ligne de categorie de couts de l agence et ratios de partage des couts du volet.
- Types de modification: categorie modifiee et nom bilingue du type.
- Sous-types de modification: nom et description lies a un type de modification de l assistant.
- Sous-types d entente: types d entente de l agence permis pour le volet.
- Plan comptable : dimensions financières bilingues ordonnées liées à un budget temporaire de volet.
- Types d’engagement : classifications bilingues des engagements.
- Types de surveillance: types de dossiers de surveillance bilingues.
- Domaines: domaines d expertise bilingues pour l affectation d examens/evaluations.
- Limites financieres: montant maximal par destinataire, pourcentage de soutien, pourcentage de couts retroactifs, limite de cumul et statut.
- Revision: sommaire de la configuration du volet.

Le schema de l assistant initialise aussi des tableaux pour les configurations d examen et de recommandation, mais les etapes visibles se concentrent sur les donnees de base du volet. Configurez les examens, recommandations, modeles d approbation, schemas d evaluation et extensions dans les onglets de detail apres la creation du volet.

## Validation De L Assistant

L’assistant empêche les conflits courants :

| Règle | Comportement |
| --- | --- |
| Un seul budget de volet par budget de programme | Un budget de programme ne peut être sélectionné qu’une fois. |
| Les bases de retenue doivent être uniques et appartenir à l'agence | Une base de retenue de l'agence ne peut apparaître qu'une fois et doit appartenir à l'agence du programme. |
| Les sous-types de destinataire doivent être uniques | Les doublons de sous-types de destinataire admissible sont bloqués. |
| Les éléments de ligne de catégorie de coûts doivent être uniques | Les doublons de lignes de coûts du volet sont bloqués. |
| L’unicité d’un type de modification repose sur sa catégorie et son nom bilingue | Deux types de modification ne peuvent partager la même catégorie modifiée et la même combinaison de noms bilingues. |
| Un sous-type de modification doit viser un type actuel | La suppression d’un type de modification invalide ses sous-types. |
| Les noms de sous-type doivent être uniques dans leur type | Un même type de modification ne peut contenir deux sous-types du même nom. |
| Les sous-types d’entente doivent être uniques | Les doublons d’association de sous-types d’entente sont bloqués. |
| Les noms de types de surveillance doivent être uniques | Les doublons de noms bilingues sont bloqués. |
| Les domaines d’expertise doivent être uniques | Les doublons de noms bilingues sont bloqués. |
| Les configurations d’examen et de recommandation ne doivent pas se contredire | Une configuration active ne peut répéter l’ordre ou le nom bilingue dans un même type d’entité. |
| Les dossiers choisis doivent appartenir au bon parent | Les volets parents et budgets appartiennent au programme; les choix appartenant à l’agence appartiennent à l’agence du programme. |

## Onglets De Detail Du Volet

La page de detail du volet expose ces onglets:

- General.
- Bases de retenue.
- Budgets.
- Destinataires admissibles.
- Elements de ligne de categorie de couts.
- Types de modification.
- Sous-types de modification.
- Sous-types d entente.
- Plan comptable.
- Types d’engagement.
- Types de surveillance.
- Cotes de risque.
- Champs personnalisés.
- Domaines d expertise.
- Limites financieres.
- Configurations d examen.
- Modeles d approbation.
- Modeles de documents.
- Configurations de recommandation.
- Configurations de flux de travail.
- Extensions.

Configurez les [Champs personnalisés](./custom-fields.md) pour les données additionnelles d’entente et le routage conditionnel.

Chaque onglet utilise le meme patron: tableau de ressources, modale ou editeur, validation et suppression logique lorsque la suppression est permise.

## Onglet General

L onglet General affiche l identite et les champs descriptifs du volet:

- Volet parent.
- Nom anglais et nom francais.
- Abreviation anglaise et abreviation francaise.
- Objectif anglais et objectif francais.
- Permet la redistribution.
- Description anglaise et description francaise.
- Indicateur Actif.

Modifiez ces champs depuis l action de la page de volet ou depuis l onglet Volets du programme parent.

## Onglet Bases De Retenue

Bases de retenue associe au volet les bases de retenue actives de l'agence et donne à chaque association un nom français et anglais. La base choisie doit appartenir à l'agence du programme et ne peut apparaître qu'une fois dans une association active du volet. Configurez ces associations avant que les règles de retenue d'une entente en aient besoin.

Le libellé bilingue d’une base de retenue peut être corrigé, mais sa base d’organisme ne peut changer tant qu’une entente non supprimée la référence. Un code de base d’organisme référencé ne peut pas non plus être changé. Les nouveaux choix doivent appartenir à l’organisme courant. Réglez la dépendance plutôt que de réutiliser un identifiant employé.

## Onglet Budgets

Les budgets de volet allouent une partie d un budget d exercice financier du programme au volet. Chaque ligne contient:

- Budget de programme.
- Budget total.
- Seuil de surengagement.

Configurez les budgets du programme avant les budgets de volet. Le financement des ententes et la configuration des engagements dependent de la structure d exercice financier.

Le selecteur de budget de programme recherche les budgets du programme courant et affiche leur libelle d’exercice financier. Lors de la modification d’un budget de volet, son budget de programme enregistre est resolu par identifiant afin que le libelle reste visible meme s’il ne figure pas sur la page de resultats courante.

Une nouvelle allocation exige un budget de programme admissible dont l’exercice n’est pas retiré. Un budget de volet existant peut conserver sa référence originale à un exercice retiré tout en corrigeant d’autres valeurs; un changement de référence exige une destination actuellement admissible. Les allocations des volets pour l’exercice cible ne peuvent dépasser le budget de programme sélectionné. Par exemple, pour `"100000.00"` au programme et `"70000.00"` déjà alloués aux autres volets, il reste `"30000.00"`; un montant supérieur est refusé. Les montants sont des chaînes décimales exactes. Un échec de lecture après un enregistrement validé exige de recharger avant de soumettre une autre allocation.

## Onglet Destinataires Admissibles

Les destinataires admissibles definissent quels sous-types de destinataires demandeurs de l agence peuvent etre utilises pour le volet. Chaque ligne selectionne un sous-type de destinataire demandeur.

Ces correspondances décrivent les catégories prévues par le volet. La sélection des promoteurs d’une entente vérifie séparément le profil actif et la portée de lecture et permet un organisme principal distinct. La configuration seule ne prouve pas l’admissibilité d’un destinataire au programme.

Les correspondances historiques conservent le libellé du sous-type après son retrait. La même référence peut être gardée; son remplacement doit être un sous-type actuellement admissible de l’organisme. Les références conservées de profil ou d’admissibilité peuvent bloquer la suppression ou le retrait d’un sous-type d’organisme.

## Onglet Elements De Ligne De Categorie De Couts

Les elements de ligne de categorie de couts exposent les lignes de couts de l agence au volet. Chaque ligne contient:

- Element de ligne de categorie de couts de l agence.
- Ratio de partage des couts.

L element selectionne doit appartenir a une categorie de couts de l agence du programme. Ces lignes controlent les elements de couts utilisables dans les budgets d entente et les reclamations du volet.

La correspondance du volet, la ligne source et sa catégorie possèdent des indicateurs Actif distincts. Le tableau expose les sources inactives pour diagnostiquer la disponibilité; une correspondance existante ne contourne pas une source désactivée. Les lignes d’entente enregistrées conservent leurs références et leurs paramètres de calcul. Activez les niveaux sources nécessaires avant d’ajouter des lignes budgétaires.

## Types Et Sous-Types De Modification

Les types de modification definissent la categorie d entite modifiee et un nom bilingue. La categorie modifiee utilise l enum des types modifies de paiement de transfert.

Les sous-types de modification sont lies a un type de modification et ajoutent:

- Nom anglais et nom francais.
- Description anglaise et description francaise.

Les sous-types ne peuvent pas etre configures utilement avant leur type parent. Dans l assistant, supprimer un type de modification supprime aussi ses sous-types temporaires.

## Onglet Sous-Types D Entente

Les sous-types d entente associent les types d entente de l agence au volet. Chaque ligne selectionne un type d entente de l agence.

Cette configuration classe les ententes du volet et limite les types d entente valides dans la creation d ententes. Les types d entente de l agence doivent exister avant de remplir cet onglet.

Changer le type d’entente d’organisme derrière un sous-type doit préserver la classification des ententes existantes. Le serveur refuse un remplacement incompatible avec leur type enregistré. Corrigez les libellés ou créez une configuration distincte au lieu de reclasser silencieusement les ententes.

## Plan comptable et types d’engagement

L’onglet **Plan comptable** définit le codage financier que les lignes d’engagement d’une entente peuvent sélectionner. Créez d’abord les budgets du volet : chaque entrée du plan appartient à un budget actif de ce volet exact et, par conséquent, à un exercice. Chaque entrée contient une ou plusieurs dimensions ordonnées; chaque dimension exige un libellé anglais, un libellé français et une valeur. Les libellés anglais doivent être uniques dans l’entrée, tout comme les libellés français. Un même budget d’exercice ne peut pas contenir deux entrées actives dont le JSON ordonné des dimensions est identique.

La recherche correspond à l’exercice affiché ou au texte de toute dimension conservée. La création et la modification exigent l’accès de création ou de modification au programme de paiements de transfert dans la portée résolue; la suppression exige l’accès de suppression de niveau Gestionnaire. Les écritures répètent l’autorisation après avoir verrouillé le programme, le volet et l’organisme actifs. La suppression est logique et est refusée tant qu’une ligne d’engagement d’entente active référence l’entrée.

L’onglet **Types d’engagement** définit les types bilingues proposés lors de la création d’un engagement d’entente. Les deux noms sont obligatoires et la paire active de noms anglais et français doit être unique dans le volet. Un type peut être modifié, mais ne peut plus être retiré dès qu’un engagement d’entente l’a référencé. L’assistant de volet peut créer les budgets, les entrées du plan comptable et les types d’engagement ensemble; toute entrée temporaire du plan doit pointer vers un budget temporaire de la même charge utile.

## Onglet Types De Surveillance

Les types de surveillance classent les dossiers de surveillance du volet. Chaque ligne contient un nom anglais et francais. Ces valeurs deviennent des options de reference pour les flux de surveillance rattaches aux ententes du volet.

## Onglet Cotes De Risque

Les cotes de risque definissent les libelles et pointages disponibles pour le volet. Chaque ligne contient:

- Pointage de risque numerique. Le pointage doit etre fini et non negatif.
- Nom anglais et nom francais.

Les cotes fournissent les bandes du flux explicite `risk_rating` de l’entente. Sa publication associe les maxima des résultats d’évaluation aux cotes actives du volet; la réussite applique le score obtenu. La modification ordinaire du profil ne définit pas manuellement ce score. Voir [Flux de travail](../concepts/workflows.md) pour les bandes ordonnées, la configuration périmée et la reprise.

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
- Indicateur Actif.

L assistant traite les limites financieres comme optionnelles. Si le volet n a aucune ligne de limites financieres, les processus qui dependent de ces controles n auront pas de valeurs propres au volet.

## Onglet Configurations D Examen

Les configurations d examen definissent comment les evaluations sont generees pour les entites d execution. Une configuration contient:

- Type d entite.
- Indicateur "a la completion".
- Nom anglais et nom francais.
- Ordre.
- Indicateur sequentiel.
- Modele d approbation optionnel.
- Statut du cycle de vie, version et état de publication en attente.
- Un ou plusieurs membres de configuration.

Chaque membre est lie a un schema d evaluation, a un ordre et a un modele d approbation optionnel. Les lignes affichent aussi les metadonnees du schema comme le nom, le nom du resultat, la version et le statut.

Regles metier:

- Les membres d une meme configuration doivent utiliser des schemas d examen uniques.
- Les membres d une meme configuration doivent utiliser des ordres uniques.
- La generation a la completion n est pas permise pour les types d entite qui supportent seulement la creation manuelle: admission de dossier de financement, entente de dossier de financement et demandeur/destinataire.
- Les configurations actives ne peuvent pas dupliquer type d entite plus ordre ou type d entite plus nom bilingue.
- Les schemas d examen doivent appartenir a l agence du volet et correspondre au type d entite configure.

Implication d execution: lorsque la configuration est activee pour des entites supportees, elle peut generer du travail d examen commun. Les configurations sequentielles controlent si les membres s executent en sequence ou en parallele.

Une nouvelle configuration commence à l’état d’ébauche. La publication d’une ébauche valide crée la version immuable 1. Modifier une configuration publiée crée du contenu de travail en attente; Publier est offert seulement si ce contenu est valide et différent. Une configuration publiée peut être retirée définitivement. Les examens d’exécution demeurent liés aux versions de publication exactes de la configuration et du schéma qui les ont générés; une modification ultérieure ne réécrit donc pas le travail existant. L’éditeur détaillé peut associer un schéma existant de la même agence ou créer un schéma d’évaluation ou de liste de vérification, puis ouvrir son éditeur.

Le code source conserve aussi les contrats d'API d'ensembles d'évaluation propres au volet et un composant Ensembles d'évaluation non monté. Celui-ci n'est inscrit dans aucune page ni dans la carte d'onglets courante et n'a donc aucun chemin de navigation utilisateur pris en charge. Les intégrations qui utilisent ces API doivent quand même respecter la propriété du volet, les membres d'évaluation seulement, l'autorisation actualisée, l'unicité et la suppression logique; les administrateurs doivent utiliser Configurations d'examen dans l'interface courante.

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

Les modeles d approbation de volet definissent les routes d approbation portees par le volet. Les modèles sont réutilisables dans le volet et contiennent des étapes et attestations; la configuration consommatrice fournit la cible d’exécution.

Utilisez cet onglet lorsque les routes d approbation doivent varier selon le volet. Des modeles communs/globaux peuvent exister ailleurs, mais les modeles de volet sont ceux qui sont generalement references par les flux d examen, recommandation, entente, reclamation, prevision, paiement, surveillance et demandeur/destinataire.

Voir [Modeles d approbation](./approval-templates.md) pour le comportement complet des modeles et de l approbation en execution.

## Onglet Configurations De Flux De Travail

Les configurations définissent l’orchestration du volet. Un flux standard démarre explicitement depuis le catalogue de la cible; la soumission d’approbation démarre explicitement pour l’entente et par achèvement pour les enfants pris en charge. La cotation du risque démarre explicitement sur l’entente. L’en-tête conserve la cible, l’objet, les états de départ permis, les replis d'annulation/échec d'exécution, l'état actif et la politique de reprise. La page de détail construit une séquence positive unique d'ensembles d'examens, d'ensembles de recommandations et de modèles d'approbation racine. Chaque membre peut appliquer un état cible à la matérialisation, à la réussite ou à l'échec. Les membres d'examen/recommandation exigent exactement un utilisateur actif par défaut pour chaque membre imbriqué; **Permettre le réacheminement du propriétaire** autorise le rétablissement si cet utilisateur n'est plus admissible à l'exécution. La publication revalide ressources, propriétaires, cible et portée. Les exécutions publiées conservent la séquence, les transitions, les correspondances et la filiation immuables. Consultez [Flux de travail](../concepts/workflows.md).

## Onglet Modeles De Documents

Les modeles de documents de volet definissent les fichiers sources utilises par la generation de documents d entente. L onglet affiche le type d entite, le nom anglais, le genre de modele, les formats de sortie, l etat actif, les pieces jointes bilingues et les actions de ligne.

Chaque modele stocke :

| Champ | Regle |
| --- | --- |
| Type d entite | Utilise actuellement par la generation d entente comme `fundingcaseagreement`. |
| Nom anglais/francais | Nom d affichage bilingue requis. |
| Description anglaise/francaise | Description bilingue requise affichee lorsque les utilisateurs choisissent un modele sur une entente. |
| Genre de modele | `docx` ou `html`. |
| Formats de sortie | Un ou plusieurs formats compatibles : les modèles DOCX permettent `docx` et/ou `pdf`; les modèles HTML permettent `html` et/ou `pdf`. |
| Fichier anglais/francais | Requis a la creation. Les modeles DOCX acceptent `.docx`; les modeles HTML acceptent `.html` ou `.htm`. |
| Actif | Seuls les modeles actifs d entente sont disponibles dans l onglet Documents d une entente. |

La création utilise des données multiparties et exige les deux fichiers linguistiques. Chaque fichier est limité à 10 Mio et la requête complète à 21 Mio. La validation du genre de fichier repose actuellement sur l'extension du nom (`.docx`, ou `.html`/`.htm`); les opérateurs doivent donc traiter la permission de téléversement comme un accès fiable de création de contenu. Le genre de modèle devient immuable après la création.

La modification peut mettre à jour les métadonnées, les formats compatibles, l'état actif et l'un ou l'autre fichier linguistique. Le remplacement stocke une nouvelle pièce jointe puis nettoie l'ancienne après la mise à jour de la base; une mise à jour échouée nettoie les nouvelles pièces créées. La suppression logique retire le modèle et ses pièces jointes sources de l'utilisation active. Les documents d'entente déjà générés demeurent des dossiers distincts. Un téléchargement autorise la relation précise entre le volet actif et le modèle, puis retourne la pièce jointe source française ou anglaise demandée.

Note operationnelle : la generation PDF depuis DOCX utilise LibreOffice, et HTML vers PDF utilise Puppeteer. Le developpement local peut installer ces outils avec la commande de generation de documents decrite dans [Demarrage local](../developer/startup.md).

## Schemas D Evaluation

Les schemas d evaluation sont accessibles depuis les lignes de configuration d examen ou d ensemble d evaluation qui referencent un schema. L editeur permet de maintenir la matrice de pointage, les sections, questions, questions calculees, dependances, resultats et facteurs d impact utilises par les evaluations d execution.

Voir [Schemas d evaluation](./assessment-schemas.md) pour le cycle de vie et le comportement complet de l editeur.

## Onglet Extensions

Les extensions controlent les parametres d extension propres au volet. La configuration des extensions est separee de la configuration de base des paiements de transfert, mais elle herite du meme contexte volet, programme et agence.

![Configuration des extensions de volet](/screenshots/fr/stream-extensions.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._

## Cycle De Vie, Échec Et Reprise

Les suppressions de volets et de configurations sont logiques, sauf indication contraire dans une section spécialisée. La suppression d'un volet verrouille le volet courant et les portées d'entente appartenant aux extensions, revérifie l'accès précis de suppression dans la chaîne active programme-agence et permet aux extensions enregistrées de bloquer la suppression. Une portée de propriété qui change à répétition échoue de façon sûre plutôt que d'utiliser une autorisation périmée. Les anciennes configurations enfants ne sont pas effacées physiquement, mais les chemins exigeant un volet actif ne les exposent plus.

Les écritures du volet et de ses enfants utilisent des transactions avec autorisation actualisée et recalculent leur chaîne de parents canonique. Un volet parent doit être un volet frère actif du même programme, et un volet ne peut être son propre parent. Les choix appartenant à l'agence, les budgets de programme et les configurations imbriquées doivent appartenir à la chaîne courante. Les ressources absentes et inaccessibles sont volontairement masquées de façon semblable. Après un conflit localisé, une sélection invalide, un dépassement de capacité ou une erreur de portée simultanée, rechargez l'onglet, corrigez le dossier référencé et réessayez.

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
