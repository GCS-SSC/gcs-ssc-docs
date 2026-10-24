# Volets

Un volet est la voie de financement choisie pour travailler sur une entente. Par exemple, le programme « Amélioration des installations communautaires » peut avoir un volet « Petits projets communautaires », avec son allocation annuelle, ses types de destinataires admissibles et ses coûts permis.

Le volet regroupe les types d'entente, budgets, lignes de coûts, engagements, examens, approbations, recommandations, cotes de risque, types de surveillance, modèles de documents, domaines d'expertise, limites financières et extensions nécessaires à cette voie. Un programme peut être enregistré sans volet, mais un flux d'entente de production en exige normalement un.

Commencez par l'identité du volet, son budget, ses destinataires et ses types d'entente. Configurez ensuite les éléments utilisés par les agents, comme les réclamations, examens et documents. Enregistrer le volet ne signifie pas que tous ces éléments sont prêts.

## Liste des volets et navigation

Ouvrez le programme, puis sélectionnez **Volets**. Le tableau montre les volets de ce programme. Si vous pouvez modifier sa configuration, vous pouvez créer, modifier ou supprimer des volets, ou utiliser l’assistant de volet.

Ouvrez un volet pour voir son sommaire repliable, son fil de navigation et ses onglets de configuration. Votre accès au volet découle de son programme parent et de son agence.

## Modale rapide de volet

La modale standard crée ou modifie seulement l’enregistrement de volet. Elle contient :

- Nom anglais et nom français.
- Abréviation anglaise et abréviation française.
- Volet parent optionnel dans le même programme.
- Objectif anglais et objectif français.
- Indicateur "permet la redistribution".
- Description anglaise et description française.
- Actif, désactivé par défaut.

Le volet parent doit appartenir au même programme. Utilisez les volets parents pour représenter la structure du programme. Configurez les ententes et examens sur le volet où les agents les créeront.

## Assistant de volet

Utilisez l’assistant pour enregistrer ensemble le volet et ses réglages de base. Il vérifie leur compatibilité avant l’enregistrement. Une soumission qui échoue ne laisse donc pas de configuration partielle.

Les étapes de l’assistant sont :

- Général : identité du volet, volet parent, descriptions, objectifs, indicateur de redistribution et indicateur actif.
- Bases de retenue : base de retenue de l'agence et libellé bilingue propre au volet.
- Budgets : budgets de volet liés aux budgets d’exercice financier du programme.
- Destinataires : sous-types de destinataires demandeurs admissibles.
- Lignes de coûts : éléments de ligne de catégorie de coûts de l’agence et ratios de partage des coûts du volet.
- Types de modification : catégorie modifiée et nom bilingue du type.
- Sous-types de modification : nom et description liés à un type de modification de l’assistant.
- Sous-types d’entente : types d’entente de l’agence permis pour le volet.
- Plan comptable : entrées de codage financier admissibles de l’agence. Ajoutez les budgets de volet avant de sélectionner ces entrées.
- Types d’engagement : classifications d’engagement disponibles déjà créées à l’agence.
- Types de surveillance : types admissibles déjà créés à l’agence.
- Domaines : domaines d’expertise bilingues pour l’affectation d’examens/évaluations.
- Limites financières : montant maximal par destinataire, pourcentage de soutien, limite de cumul et statut. Le contrôle des coûts rétroactifs est indisponible.
- Révision : sommaire de la configuration du volet.

L’assistant couvre la configuration de base du volet. Après l’enregistrement, liez les ensembles d’examens et les flux et configurez les extensions depuis les onglets de détail. Créez et publiez les définitions de recommandation, modèles d’approbation et schémas d’évaluation à l’agence avant de les utiliser dans ces définitions partagées.

## Validation de l assistant

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

## Onglets de detail du volet

La page de détail du volet présente ces onglets :

- Général.
- Bases de retenue.
- Budgets.
- Destinataires admissibles.
- Éléments de ligne de catégorie de coûts.
- Sous-types de financement.
- Types de modification.
- Sous-types de modification.
- Sous-types d’entente.
- Plan comptable.
- Types d’engagement.
- Types de surveillance.
- Cotes de risque.
- Champs personnalisés.
- Domaines d’expertise.
- Limites financières.
- Configurations d’examen.
- Modèles de documents.
- Configurations de flux de travail.
- Extensions.

Configurez les [Champs personnalisés](./custom-fields.md) pour les données additionnelles d’entente et le routage conditionnel.

Utilisez chaque onglet pour ajouter, modifier ou retirer les dossiers que vos permissions permettent de gérer.

## Onglet general

L’onglet Général affiche l’identité et les champs descriptifs du volet :

- Volet parent.
- Nom anglais et nom français.
- Abréviation anglaise et abréviation française.
- Objectif anglais et objectif français.
- Permet la redistribution.
- Description anglaise et description française.
- Indicateur Actif.

Modifiez ces champs depuis l’action de la page de volet ou depuis l’onglet Volets du programme parent.

## Onglet bases de retenue

Cet onglet rend une base de retenue active de l'agence disponible dans le volet et lui donne des libellés français et anglais. La base doit appartenir à l'agence du programme. Une seule association active est permise par base dans le volet. Configurez-la avant qu'une entente ait besoin d'une règle de retenue.

Par exemple, choisissez la base d'agence appropriée à la politique de retenue du programme et donnez-lui un libellé que les agents reconnaîtront. Le libellé décrit le choix; il ne crée pas la règle de retenue de l'entente.

Vous pouvez corriger le libellé bilingue d'une association. Vous ne pouvez pas changer sa base d'agence tant qu'une entente non supprimée l'utilise. Le code de la base d'agence est aussi protégé tant qu'il est référencé. Réglez la dépendance avant de changer la base; les nouveaux choix doivent appartenir à l'agence courante.

## Onglet budgets

Un budget de volet attribue à ce volet une partie de l'enveloppe annuelle du programme. Créez d'abord le budget de programme, puis ajoutez une ligne de budget de volet avec :

- Budget de programme : le budget du programme pour l'exercice concerné.
- Budget total : le montant alloué à ce volet.
- Seuil de surengagement : la marge configurée au-dessus du budget du volet, affichée en pourcentage. La valeur enregistrée est un ratio : `0.10` signifie 10 % et `0` signifie aucune marge de surengagement. Utilisez le pourcentage affiché dans le formulaire.

Le financement des ententes et les engagements exigent cette structure d'exercice. Le sélecteur recherche uniquement les budgets du programme courant et affiche leur libellé d'exercice. Une ligne existante conserve le libellé de son budget enregistré même hors de la page de résultats courante.

La somme des allocations aux volets pour l'exercice cible doit respecter le budget de programme sélectionné. Par exemple, un budget de programme de 100 000 $, dont 70 000 $ sont déjà alloués aux autres volets, laisse 30 000 $ pour ce volet. Enregistrer 35 000 $ est refusé. Saisissez le montant dans le champ monétaire du formulaire.

Par exemple, un budget de volet de 100 000 $ avec un seuil de 10 % permet jusqu’à 110 000 $ de financement de programme des ententes. Cela n’augmente ni l’enveloppe de programme disponible pour les allocations aux volets ni la capacité réelle de paiement des engagements.

Une nouvelle allocation exige un budget de programme admissible dont l'exercice n'est pas retiré. Une ligne existante peut conserver sa référence originale à un exercice retiré pendant la correction d'autres valeurs. Changer la référence exige un budget actuellement admissible.

Si l'enregistrement réussit, mais que le rafraîchissement du tableau échoue, rechargez le tableau avant de soumettre une autre allocation. Un échec de rafraîchissement ne signifie pas que l'enregistrement a échoué.

## Sous-types de financement et ventilations obligatoires

Utilisez **Sous-types de financement** pour choisir les sources d'autre financement que les agents peuvent sélectionner dans ce volet. Créez d'abord les types de financement et leurs sous-types sur la page Agence. Liez ensuite un sous-type actif de la même agence dont le type parent est aussi actif.

Par exemple, créez « Autre financement public », inclus dans le cumul, et le sous-type « Contribution municipale ». Liez ce sous-type au volet pour que les agents puissent le choisir en enregistrant une source municipale. Ce lien rend la source disponible; il ne saisit aucun montant de financement d'entente. Le tableau montre les classifications de cumul et de partage des coûts du parent. Les dossiers d'approbation conservent leur classification capturée. Les limites du budget courant utilisent les réglages courants du type de financement.

Un Contributeur `transfer_payment` à la portée du programme peut ajouter un lien; son retrait exige Gestionnaire. Les doublons actifs sont refusés. Ajouter un sous-type déjà retiré rétablit son association. Retirer un lien empêche les nouveaux choix et conserve les preuves de financement enregistrées. Vous ne pouvez pas supprimer le type ou sous-type d'agence tant qu'un lien actif de volet reste.

Le volet possède aussi **Exiger une ventilation du financement des prévisions** et **Exiger une ventilation du financement des réclamations**, désactivés par défaut. Général affiche les réglages enregistrés; les utilisateurs autorisés à modifier le volet peuvent les changer. Ils exigent une ventilation à la soumission finale, mais les agents peuvent encore enregistrer un travail inachevé. Rendez les sous-types admissibles disponibles avant d'activer ces réglages et vérifiez la validation des prévisions et réclamations avant la production.

Si un sous-type manque, rechargez les catalogues d'agence et de volet. Vérifiez son agence, sa disponibilité et celle de son parent, puis s'il est déjà lié avant de tenter un nouvel ajout.

## Admissibilité des évaluations de possibilité et de dossier

Une [Possibilité](../intake/opportunities.md) peut utiliser ce volet et d'autres volets actifs du même programme. Pour offrir un ensemble d'examens ou un flux de dossier, liez d'abord une définition d'agence publiée visant `fundingcaseintake` par au moins un volet sélectionné. Sélectionnez ensuite cette définition dans la possibilité elle-même.

Par exemple, lier un ensemble d'examens d'admission à « Petits projets communautaires » le rend admissible pour une possibilité qui utilise ce volet. La possibilité doit encore faire son propre choix avant l'utilisation de l'ensemble. Retirer ces liens ne change pas les preuves d'évaluation déjà créées.

## Onglet destinataires admissibles

Choisissez les sous-types de destinataires demandeurs de l'agence que les agents peuvent utiliser dans ce volet. Chaque ligne rend un sous-type disponible sur le lien entre une entente et un promoteur. Le profil du promoteur ne conserve pas lui-même de sous-type.

Par exemple, si le volet soutient les municipalités et les organismes sans but lucratif, liez les sous-types d'agence correspondants. Les agents choisissent alors le sous-type approprié en reliant un promoteur à une entente. Ce choix seul ne confirme pas tous les critères d'admissibilité au programme.

Si **Exiger un type de promoteur cohérent** est activé, un promoteur qui revient doit conserver le sous-type admissible déjà utilisé dans ce volet. Sinon, les agents peuvent choisir le type séparément pour chaque entente. Ils doivent toujours avoir la permission actuelle de lire le profil du promoteur; son agence principale peut différer de celle de l'entente.

Les associations historiques conservent le libellé du sous-type après son retrait par l'agence. Vous pouvez conserver la même référence, mais un remplacement doit être actuellement admissible et appartenir à l'agence. Les références conservées dans les relations d'entente ou l'admissibilité peuvent bloquer la suppression ou le retrait d'un sous-type d'agence.

## Onglet elements de ligne de categorie de couts

Utilisez cet onglet pour rendre les lignes de coûts de l’agence disponibles dans le volet. Chaque ligne contient :

- Élément de ligne de catégorie de coûts de l’agence.
- Ratio de partage des coûts.

L’élément sélectionné doit appartenir à une catégorie de coûts de l’agence du programme. Recherchez son nom français ou anglais dans le sélecteur s’il manque à la première page. Ces lignes contrôlent les éléments de coûts utilisables dans les budgets d’entente et les réclamations du volet.

La correspondance du volet, la ligne source et sa catégorie possèdent des indicateurs Actif distincts. Le tableau expose les sources inactives pour diagnostiquer la disponibilité; une correspondance existante ne contourne pas une source désactivée. Les lignes d’entente enregistrées conservent leurs références et leurs paramètres de calcul. Activez les niveaux sources nécessaires avant d’ajouter des lignes budgétaires.

Par exemple, liez la ligne d’agence « Matériaux de construction » pour que les agents puissent la sélectionner pour les coûts du volet. Si elle manque pour une nouvelle ligne budgétaire d’entente, vérifiez les trois réglages Actif : l’association au volet, la ligne d’agence et sa catégorie de coûts.

## Types et sous-types de modification

Un type de modification identifie la catégorie de dossier modifié et donne un nom bilingue à ce genre de changement. Choisissez une catégorie de dossier disponible; un sous-type décrit un changement plus précis dans cette catégorie.

Les sous-types de modification sont liés à un type de modification et ajoutent :

- Nom anglais et nom français.
- Description anglaise et description française.

Créez le type de modification avant d’ajouter ses sous-types. Dans l’assistant, supprimer un type de modification supprime aussi ses sous-types temporaires.

## Onglet sous-types d entente

Les sous-types d’entente associent les types d’entente de l’agence au volet. Chaque ligne sélectionne un type d’entente de l’agence.

Ces liens déterminent les types d’entente d’agence que les agents peuvent choisir en créant des ententes dans ce volet. Créez les types d’entente d’agence avant d’ajouter des liens ici.

Changer le type d’entente d’agence associé à un sous-type doit préserver la classification des ententes existantes. Le serveur refuse un remplacement incompatible avec leur type enregistré. Corrigez les libellés ou créez une configuration distincte au lieu de reclasser silencieusement les ententes.

## Plan comptable et types d’engagement

Configurez le codage financier sur la page Agence avant de le lier au volet. Une entrée du plan comptable d'agence contient du texte bilingue, un exercice, une devise, un genre et des dimensions comptables dans un ordre défini. Par exemple, l'équipe des finances peut fournir les dimensions de fonds, de centre de responsabilité et de compte nécessaires aux engagements d'entente.

Utilisez l'onglet **Plan comptable** du volet pour lier une entrée d'agence admissible. Sa devise doit correspondre au budget de programme qui soutient le volet. Recherchez par libellé d'exercice ou texte de dimension. L'exercice, la devise et le genre de l'entrée ne peuvent pas changer à l'agence. Les plans Engagement, Compte débiteur et Note de crédit ont des usages distincts; choisissez le genre correspondant au travail à configurer.

Retirer un lien de volet est une suppression logique, refusée tant qu'une ligne d'engagement active de l'entente le référence. Le retrait de la définition d'agence peut laisser les liens historiques visibles. Corrigez l'entrée d'agence plutôt que de réutiliser un identifiant référencé pour une autre classification.

Créez les types d'engagement bilingues sur la page Agence, puis choisissez un type disponible dans **Types d'engagement** du volet. Il devient disponible pour les nouveaux engagements d'entente. Un Contributeur du volet peut ajouter un lien; un retrait admissible exige Gestionnaire. Vous ne pouvez pas retirer un lien utilisé ni supprimer un type d'agence référencé. Le serveur verrouille et revérifie l'agence, le programme, le volet et les références actuelles avant l'enregistrement.

## Onglet types de surveillance

Créez les types de surveillance bilingues sur la page Agence, puis associez ici les types admissibles. La sélection du volet détermine les types offerts aux nouvelles surveillances. Les dossiers existants conservent leur référence lorsque le type d’agence ou le lien est retiré. Si un type manque au sélecteur, rechargez les deux catalogues et vérifiez la propriété d’agence et l’état actif avant de réessayer.

## Onglet cotes de risque

Les cotes de risque définissent les libellés et pointages disponibles pour le volet. Chaque ligne contient :

- Pointage de risque numérique. Le pointage doit être fini et non négatif.
- Nom anglais et nom français.

Ces cotes servent à un flux de cote de risque d’entente. À sa publication, les valeurs maximales des résultats d’évaluation sont associées aux cotes actives du volet. Terminer ce flux avec succès applique le score obtenu à l’entente. Les agents ne définissent pas ce score dans la modification ordinaire du profil d’entente. Consultez [Flux de travail](../concepts/workflows.md) pour ordonner les bandes et reprendre le travail après un changement de configuration.

## Onglet domaines d expertise

Les domaines d’expertise aident à affecter et à classer le travail d’examen. Chaque ligne contient :

- Nom anglais et nom français.
- Description anglaise et description française.

Ajoutez des domaines lorsque les agents doivent affecter les examens par spécialité ou préciser l’expertise requise pour une évaluation.

## Onglet limites financieres

Configurez le montant maximal par destinataire, le pourcentage maximal de soutien, la limite de cumul et le réglage Actif. Le montant doit être non négatif, avec au plus deux décimales. Le soutien et le cumul utilisent des ratios de `0` à `1`, avec au plus deux décimales : `0.50` signifie 50 %. Zéro est une vraie limite. Le montant s'applique dans la devise de chaque entente, sans devise CAD fixe ni conversion.

Le champ des coûts rétroactifs est désactivé, car l'application ne calcule pas cette limite. Les requêtes API de création, de modification et d'assistant doivent omettre ce champ, même zéro ou null. Les nouveaux dossiers enregistrent zéro; les lectures peuvent encore retourner une valeur historique.

Le total de la liste comprend les lignes actives et inactives; le nombre actif est distinct. Modifier un montant conserve son réglage Actif, sauf si vous le changez aussi. Sans configuration active, les trois contrôles de limites financières budgétaires ne s'appliquent pas. L'allocation annuelle du volet et le seuil de surengagement restent des contrôles distincts.

Une configuration active limite le programme de chaque promoteur sur une version budgétaire d'entente, le soutien par ligne et le cumul sur la version. Consultez [Budget de l'entente](../agreements/budget.md#limites-financières-du-volet) pour les formules, l'exemple et la reprise. Changer les limites ou les indicateurs des types de financement peut faire échouer le prochain changement ou contrôle d'approbation d'un budget existant. Vérifiez les ententes touchées avant d'activer des limites plus strictes.

## Onglet configurations d examen

Utilisez **Ajouter** pour lier un ensemble d’examens publié admissible de la même agence. Recherchez son nom publié français ou anglais. Le chargement des choix exige la permission de modifier le programme; lire le volet ne suffit pas. Un ensemble regroupe les définitions d'examen utilisées par les agents. Par exemple, l'agence peut publier un ensemble d'évaluation d'entente et le rendre disponible à plusieurs volets qui suivent le même processus d'évaluation.

Ouvrez une ligne pour modifier la définition d'agence, ses schémas membres, sa publication et son comportement d'examen direct ou à l'achèvement. Vous modifiez la définition partagée d'agence, qui peut aussi être liée à d'autres volets de cette agence.

Retirer le lien de volet conserve l'ensemble d'agence et les examens historiques. Chaque examen déjà créé conserve la publication utilisée à sa création. Consultez [Examens en exécution](../concepts/runtime-reviews.md).

## Onglet configurations de recommandation

Les schémas et ensembles de recommandations sont créés sur la page **Agence**. Ils sont référencés par les flux d’agence et leurs membres publiés; le volet n’a pas d’onglet distinct de configuration des recommandations. La définition contient des questions bilingues, une question décisive, des membres ordonnés, des étapes d’approbation facultatives et la politique d’échec. Consultez [Schémas et ensembles de recommandations](./recommendations.md).

## Onglet modeles d approbation

Les modèles d’approbation sont créés et publiés sur la page **Agence**. Le volet n’a pas d’onglet distinct Modèles d’approbation. Les ensembles d’examens, ensembles de recommandations et flux référencent un modèle d’agence admissible; chaque dossier d’approbation conserve les étapes et attestations copiées à sa création. Consultez [Modèles d’approbation](./approval-templates.md).

## Onglet configurations de flux de travail

Cet onglet rend un flux d’agence publié disponible dans le volet. Recherchez son nom publié français ou anglais. Le sélecteur exige la permission de modifier le programme. Ajoutez un flux de la même agence; ouvrez sa ligne pour modifier la définition partagée sur la page Agence.

Par exemple, un flux d'entente peut prévoir un examen, puis une recommandation et une approbation. La définition d'agence précise l'entité visée, l'objet, les états de départ permis, l'ordre des membres, les conditions et la politique de reprise. Le lien au volet fournit les valeurs propres au volet, comme les cotes de risque. Des champs requis ou des références locales manquants ou incompatibles bloquent l'utilisation; le système ne saute pas l'étape concernée.

Retirer le lien empêche les nouveaux usages dans ce volet et conserve la définition partagée et les tentatives historiques. Consultez [Flux de travail](../concepts/workflows.md) et [Catalogues d'agence](../admin/agency-catalogs.md).

## Onglet modeles de documents

Créez un modèle dans **Modèles de documents** de l'agence, puis liez un modèle admissible à ce volet. Par exemple, préparez les fichiers sources français et anglais d'une lettre d'entente à l'agence, puis liez le modèle aux volets qui utilisent cette lettre.

Le modèle précise l'entité visée, le nom et la description bilingues, les formats de sortie, le réglage Actif et les fichiers sources. Les deux fichiers linguistiques sont requis à la création. Chaque fichier peut atteindre 10 Mio; la requête entière peut atteindre 21 Mio. Une source DOCX permet une sortie DOCX/PDF, et HTML permet HTML/PDF. Le genre du modèle ne peut pas changer après sa création.

La validation utilise l'extension du nom du fichier téléversé pour déterminer son genre. La création exige donc un accès fiable. Retirer le lien de volet conserve la source d'agence et les documents déjà générés. Consultez [Documents](../agreements/documents.md) et [Génération de documents](../developer/document-generation.md).

## Schémas d’évaluation

Les schémas d’évaluation et de liste de vérification sont créés depuis l’éditeur d’ensemble d’examens de l’agence et publiés à cet endroit. Ils définissent les questions, calculs, dépendances, résultats et règles publiés qui sont copiés dans chaque examen. Consultez [Schémas d’évaluation](./assessment-schemas.md) et [Schémas de listes de vérification](./checklist-schemas.md).

## Onglet extensions

Utilisez cet onglet pour configurer les extensions du volet. Les réglages des extensions sont distincts des réglages de base du programme et s’appliquent au même volet, programme et agence.

![Configuration des extensions de volet](/screenshots/fr/stream-extensions.png)

_Cette capture montre des données de démonstration. Une nouvelle installation ne contient pas ces dossiers._

## Cycle de vie, échec et reprise

Supprimer un volet ou une ligne de configuration la masque normalement de l'utilisation courante sans l'effacer physiquement. Une section spécialisée peut décrire une exception. Les anciennes configurations enfants restent enregistrées, mais les pages exigeant un volet non supprimé ne les exposent plus.

La suppression exige la permission actuelle de supprimer le volet. Une extension installée peut la bloquer pour protéger le travail associé aux ententes. Si un autre administrateur change la propriété pendant les vérifications, rechargez le volet avant de réessayer.

Chaque enregistrement vérifie vos permissions actuelles ainsi que le programme et l’agence propriétaires du volet. Un volet parent doit être un volet frère actif du même programme; un volet ne peut pas être son propre parent. Les choix d'agence doivent appartenir à l'agence propriétaire, les budgets de programme au programme propriétaire et les réglages du volet au volet courant.

Si un dossier semble absent, vérifiez son identifiant et votre accès : le système donne volontairement des erreurs semblables pour les dossiers absents et inaccessibles. Après un conflit, un choix invalide, une allocation qui dépasse la capacité ou un changement simultané de portée, rechargez l'onglet, corrigez le dossier référencé et réessayez.

## Dependances d execution

Vérifiez ces réglages avant que les agents commencent chaque type de travail :

- La création d’entente dépend des sous-types d’entente, destinataires admissibles, budgets, limites financières et identité du volet.
- Les flux de réclamation et de coûts dépendent des lignes de catégorie de coûts et des ratios de partage.
- Les engagements et paiements dépendent des budgets et lignes de codage financier.
- Les examens dépendent des configurations d’examen actives et des schémas d’évaluation actifs/publiés.
- Les approbations dépendent des modèles d’approbation référencés et de leurs utilisateurs par défaut.
- La génération de documents d’entente dépend des modèles de documents actifs du volet et des outils de génération configurés pour la sortie PDF.
- Les recommandations dépendent des schémas et ensembles publiés référencés par les flux.
- La surveillance dépend des types de surveillance et, si le processus le prévoit, des examens ou approbations.

Vous pouvez enregistrer un volet avant que tous ses réglages soient prêts. Vérifiez le processus complet utilisé par les agents avant de créer des ententes de production.

## Volet minimal utile

Dans une nouvelle installation, un volet minimal pratique contient habituellement :

- Profil général du volet avec statut approprié.
- Au moins un budget de programme et un budget de volet.
- Lignes de sous-types de destinataire admissible.
- Lignes de sous-types d’entente.
- Lignes d’éléments de catégorie de coûts si les coûts ou réclamations sont utilisés.
- Liens de plan comptable et types d’engagement si les engagements ou paiements sont utilisés.
- Cotes de risque si les flux d’entente calculent le risque à partir des évaluations.
- Configurations d’examen et schémas d’évaluation si des examens sont générés.
- Modèles d’approbation si les approbations sont requises.
- Modèles de documents si les utilisateurs généreront des documents d’entente.
- Schémas et ensembles de recommandations publiés liés par les flux si des recommandations sont générées.
- Paramètres d’extension requis par le déploiement.
