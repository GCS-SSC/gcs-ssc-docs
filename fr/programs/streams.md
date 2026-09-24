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
- Modeles de documents.
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

Ces correspondances fournissent le sous-type requis sur chaque lien entente–promoteur. Le profil du promoteur ne conserve plus de sous-type. Le réglage **Exiger un type de promoteur cohérent** fixe le type d’un promoteur qui revient dans ce volet à son sous-type admissible précédent; sinon, le type peut être choisi pour chaque entente. Le profil exige toujours une lecture autorisée et peut relever d’une agence différente. Cette correspondance seule ne prouve pas toute l’admissibilité au programme.

Les correspondances historiques conservent le libellé du sous-type après son retrait. La même référence peut être gardée; son remplacement doit être un sous-type actuellement admissible de l’organisme. Les références conservées de relation d’entente ou d’admissibilité peuvent bloquer la suppression ou le retrait d’un sous-type d’organisme.

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

Définissez les entrées bilingues du plan comptable sur la page Agence, avec exercice et dimensions comptables ordonnées. L’onglet **Plan comptable** du volet lie ensuite une entrée d’agence admissible. La recherche couvre l’exercice et le texte des dimensions. Le retrait du lien est une suppression logique, refusée tant qu’une ligne d’engagement active de l’entente le référence. Le retrait d’une définition d’agence peut laisser les liens historiques visibles; corrigez l’entrée d’agence plutôt que de réutiliser son identifiant pour une autre classification.

Définissez les types d’engagement bilingues sur la page Agence. L’onglet **Types d’engagement** du volet sélectionne un type d’agence disponible pour les nouveaux engagements. Le retrait d’un lien utilisé ou la suppression d’un type d’agence référencé est refusé. Contributeur du volet peut ajouter un lien; un retrait admissible exige Gestionnaire. Le serveur revérifie l’agence, le programme, le volet et les références actuelles sous verrou.

## Onglet Types De Surveillance

Créez les types de surveillance bilingues sur la page Agence, puis associez ici les types admissibles. La sélection du volet détermine les types offerts aux nouvelles surveillances. Les dossiers existants conservent leur référence lorsque le type d’agence ou le lien est retiré. Si un type manque au sélecteur, rechargez les deux catalogues et vérifiez la propriété d’agence et l’état actif avant de réessayer.

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

Cet onglet liste les ensembles d’examens appartenant à l’agence et liés au volet. Utilisez **Ajouter** pour choisir un ensemble publié admissible de la même agence. Ouvrez une ligne pour modifier sa définition d’agence, ses schémas membres, sa publication et son comportement d’examen direct ou à l’achèvement. Retirer le lien du volet ne supprime ni l’ensemble d’agence ni les examens historiques. Une définition peut être liée à plusieurs volets de l’agence; chaque examen d’exécution conserve la publication utilisée lors de sa création. Consultez [Examens en exécution](../concepts/runtime-reviews.md).

## Onglet Configurations De Recommandation

Les schémas et ensembles de recommandations sont créés sur la page **Agence**. Ils sont référencés par les flux d’agence et leurs membres publiés; le volet n’a plus d’onglet distinct de configuration des recommandations. La définition contient des questions bilingues, une question décisive, des membres ordonnés, des étapes d’approbation facultatives et la politique d’échec. Consultez [Schémas et ensembles de recommandations](./recommendations.md).

## Onglet Modeles D Approbation

Les modèles d’approbation sont créés et publiés sur la page **Agence**. Le volet n’a plus d’onglet distinct Modèles d’approbation. Les ensembles d’examens, ensembles de recommandations et flux référencent un modèle d’agence admissible; chaque bordereau d’exécution conserve ses étapes et attestations figées. Consultez [Modèles d’approbation](./approval-templates.md).

## Onglet Configurations De Flux De Travail

Cet onglet liste les flux d’agence publiés liés au volet. La commande d’ajout choisit un flux de la même agence; la ligne ouvre l’éditeur détaillé de l’agence. Retirer le lien empêche un nouvel usage dans ce volet sans supprimer la définition partagée ni les tentatives historiques. La définition d’agence précise le type d’entité, l’objet, les états de départ, les membres d’examen, recommandation et approbation ordonnés, les conditions et la reprise. Son déploiement dans le volet résout les valeurs locales comme les cotes de risque; des champs requis manquants ou des références locales incompatibles bloquent l’usage au lieu d’ignorer une étape. Consultez [Flux de travail](../concepts/workflows.md) et [Catalogues d’agence](../admin/agency-catalogs.md).

## Onglet Modeles De Documents

Créez les modèles sources bilingues DOCX ou HTML dans **Modèles de documents** de l’agence, puis liez un modèle admissible ici. Retirer le lien du volet conserve la source d’agence et les documents historiques générés. Un modèle enregistre sa cible, ses noms et descriptions bilingues, ses formats de sortie, son état actif et ses fichiers sources. Les deux fichiers linguistiques sont requis à la création; chaque fichier est limité à 10 Mio et la requête à 21 Mio. DOCX permet DOCX/PDF et HTML permet HTML/PDF. Le type du modèle ne peut plus changer après création. L’extension du nom détermine la validation du type de fichier; la création de modèles exige donc un accès fiable. Consultez [Documents](../agreements/documents.md) et [Génération de documents](../developer/document-generation.md).

## Schémas d’évaluation

Les schémas d’évaluation et de liste de vérification sont créés depuis l’éditeur d’ensemble d’examens de l’agence et publiés à cet endroit. Ils définissent les questions, calculs, dépendances, résultats et règles figés utilisés par les examens d’exécution. Consultez [Schémas d’évaluation](./assessment-schemas.md) et [Schémas de listes de vérification](./checklist-schemas.md).

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
