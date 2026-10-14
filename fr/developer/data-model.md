# Modèle de données et intégrité

Cette page explique comment la base de données relie correctement les dossiers de financement et conserve les preuves des décisions et des paiements. Pour un agent, cela signifie qu’une entente utilise son propre organisme, volet et devise, que l’historique approuvé est conservé et qu’une affectation à un dossier ne permet pas automatiquement de travailler sur tous les dossiers liés. Consultez les guides opérationnels liés pour les étapes dans l’application.

Les sections suivantes conservent les noms exacts des tables, les contraintes et les commandes utiles aux développeurs. Le **schéma** est la structure de la base de données. L’**intégrité** désigne les règles qui empêchent les dossiers incohérents, comme une réclamation liée à la mauvaise entente. **Immuable** signifie qu’un dossier enregistré ne peut pas être réécrit. Une **transaction** enregistre ensemble plusieurs changements ou les annule tous; un **verrou** empêche les écritures concurrentes pendant les vérifications.

`server/database/production-core-migrations.ts` définit le schéma neuf. `shared/types/database.d.ts` décrit les types applicatifs; contraintes, fonctions et déclencheurs en base font autorité pour l’intégrité persistée. Il s’agit de bases initiales propres par sujet, pas de mises à niveau incrémentales d’un ancien journal.

## Schéma ordonné

| Migration | Schéma possédé et contrat |
| --- | --- |
| `0010_enums` | Énumérations partagées et extensions de base, dont la recherche textuelle. |
| `0020_users` | Utilisateurs, sessions, comptes et vérification Better Auth; protection des utilisateurs de session actifs. |
| `0030_rbac` | Rôles, permissions cumulatives, affectations et validation des portées. |
| `0040_agency` | Organisme, catalogues bilingues, champs, modèles, exercices, sources de financement et types de créance. |
| `0050_common` | Contacts, adresses, pièces jointes, notes, groupes, entités typées, publication, exécution, examen, recommandation, approbation, collecte de données, achèvement et flux. |
| `0060_transfer_payment` | Programmes, volets, budgets et liens admissibles vers les catalogues d’organisme. |
| `0070_applicant_recipient` | Promoteurs, identifiants financiers, historique, contacts et relations. |
| `0080_funding_opportunity` | Possibilités, volets sélectionnés, liens d’examen et de flux et associations de pièces jointes. |
| `0090_funding_case_agreement` | Révisions d’entente, instantanés, budgets, transactions financières, recouvrements, surveillance et documents. |
| `0100_funding_case_intake` | Profil de réception, preuves de source importée, réclamations de groupe et affectations exactes. |
| `0110_extensions` | Activation, configuration, stockage KV et secrets chiffrés. |
| `0120_storage` | File durable de nettoyage et de compensation du stockage. |
| `0125_l1_queue` | Horaires récurrents et baux d’exécution expirants. |
| `0130_integrity` | Installe fonctions, clés étrangères et déclencheurs des sujets après création de toutes les tables référencées. |
| `0140_audit` | Preuves de changement, d’accès et de sécurité et attribution de propriété. |

La migration de démonstration `9999_seed` charge les données finales et modèles documentaires; elle est exclue du registre de production. Les aides `server/database/schema/` installent les réductions de créance, les notes de crédit et les mécanismes d’imputation des engagements par la base d’entente et figurent dans l’inventaire.

## Propriété et identifiants

Organisme → programme → volet → entente constitue la chaîne de propriété financière. Une possibilité sélectionne un ou plusieurs volets admissibles de son programme; la réception appartient à la possibilité. La visibilité métier du promoteur suit les permissions effectives de promoteur plutôt que le seul organisme responsable. Comptes financiers et notes conservent leur organisme explicite.

Les identifiants bigint traversent les frontières API/Kysely comme chaînes décimales. `Common_Entity` donne une identité typée partagée aux dossiers pris en charge. Les clés composites lient `(id, type d’entité)`; les types propagés sont des valeurs d’intégrité, pas des champs modifiables. Les fonctions de résolution refusent les références au mauvais parent, volet ou organisme.

La suppression métier utilise généralement `_deleted`. Soumissions, versions, transitions et preuves comptables immuables ont des protections plus fortes. Le retrait explicitement confirmé d’une portée de modification brouillon supprime physiquement ses instantanés jetables; cette exception ne permet pas d’effacer l’historique approuvé. Voir [Modifications](../agreements/amendments.md).

## Publication, exécution et affectations

Par exemple, si un questionnaire publié en version 1 est ensuite révisé en version 2, le travail déjà commencé conserve sa version initiale. On garde ainsi les questions auxquelles le demandeur a réellement répondu. Dans les sections suivantes, une version **figée** est la version enregistrée qui reste utilisée; l’**exécution** est le travail réel effectué à partir d’une conception publiée.

Les conceptions d’organisme utilisent `Common_Publication`, `Common_Publication_Version` immuable avec empreinte et références de version typées. Les parents publiés fixent les versions enfants et statuts exacts. Le retrait est terminal; l’exécution historique conserve ses versions. Les configurations de collecte participent au même graphe que les examens, recommandations, approbations et flux.

`Common_Runtime` conserve cible exacte, but, versions, initiateur, tentative et prédécesseur. Sa hiérarchie `Common_Runtime_Item` comprend les collectes, examens, recommandations et approbations. L’insertion d’une transition valide et change l’état; les modifications directes ne sont pas prises en charge. Une reprise crée un successeur avec les mêmes versions et capture les valeurs actuelles de routage de cette tentative.

`Common_Completion` fige `not_applicable`, `no_workflow` ou `workflow_started`. Un flux obligatoire absent annule l’achèvement. Un achèvement sans flux n’en acquiert pas ultérieurement. Les soumissions d’approbation capturent du JSON versionné et une empreinte canonique; la promotion vérifie le dossier et applique atomiquement les domaines approuvés. Sélection d’évaluation des risques, cote et propositions d’atténuation suivent les règles de préparation et preuves retenues, pas un score librement modifiable.

`Common_Entity_Assignment` conserve les cibles typées exactes et utilisateurs communs. Un registre actif non vide possède exactement un principal; création et remplacement sont transactionnels. Examens, recommandations, collectes et réceptions de groupe non réclamés peuvent n’avoir aucun utilisateur. L’appartenance permet la réclamation admissible mais ne donne aucun accès métier. Les protections différées de registre/réclamation et les déclencheurs de suppression imposent cette frontière. Un enfant indépendant exige sa propre affectation; être affecté à l’entente n’affecte pas automatiquement tous ses enfants.

## Intégrité de configuration et de questionnaire

Les identifiants de champ et d’option d’organisme restent stables; l’affectation du volet définit placement, obligation et disponibilité active. Les valeurs d’entente sont validées contre son volet exact. Les conditions publiées conservent dépendances et capture immuable, dont classification et source de risque sélectionnée. Le retrait du catalogue ne peut invalider silencieusement les références actives.

Types et sous-types de financement remplacent les colonnes fixes d’autre financement. Les lignes de sources budgétaires et d’exercice conservent sous-type et montants exacts; le volet contrôle les choix futurs et l’historique conserve sa référence. Les comptes distinguent engagement, créance et note de crédit, avec devise et exercice propriétaires; les liens du volet fournissent le catalogue d’imputation.

Les définitions de collecte contiennent des questions typées ordonnées et du texte bilingue. Une sauvegarde vérifie la révision attendue et la définition figée; `DATA_COLLECTION_REVISION_CONFLICT` exige de recharger avant de réappliquer volontairement les changements. La soumission vérifie les réponses obligatoires. La réception conserve la demande et sa provenance importée immuable : système, identifiant externe et export. Une modification ordinaire ne réécrit pas cette provenance. Voir [Collectes de données](../concepts/data-collections.md) et [Réception](../intake/funding-case-intakes.md).

## Frontières financières exactes

Les montants sont du texte décimal canonique et des calculs exacts en cents; `numeric(19,2)` accepte une valeur absolue maximale de `99999999999999999.99`. Conservez par exemple l’identifiant `"9007199254740993"` et le montant `"10000000000000000.01"` comme chaînes. Signes et limites de total dépendent du domaine; un analyseur monétaire générique ne garantit pas un montant métier positif. La devise de l’entente est immuable et les enfants financiers doivent la respecter. Les contrôles utilisent cette devise et la langue avec deux décimales.

Les budgets annuels actuels gouvernent écritures et achèvements des prévisions et réclamations. Les contrôles utilisent identités stables d’exercice/poste, versions courantes et preuves effectives et se répètent sous verrou. Un budget courant ne peut sous-financer les preuves engagées ou consommées. La promotion revérifie l’usage annuel de la même entente; le contrôle distinct de capacité interententes du volet et de surengagement reste une limite documentée dans le guide de modification. Voir [Budget](../agreements/budget.md), [Prévisions](../agreements/forecasts.md) et [Réclamations](../agreements/claims.md) pour calculs et reprises partielles.

L’imputation protège planchers payés des lignes exactes et bassins partagés des comptes d’organisme. `fc_payment_counts_for_coding`, `fc_positive_coding_completion`, `fc_commitment_line_gross_paid`, les aides de crédit/net/disponibilité et les déclencheurs de plancher et d’imputation achevée imposent les effets retenus. Dupliquer un compte ne multiplie pas la capacité. Montant comptant, imputation signée et recouvrements du paiement sont des projections distinctes; le succès du flux gouverne leur inscription effective.

## Entités de preuve financière

| Agrégat | Preuve retenue et intégrité |
| --- | --- |
| Entente | Versions actuelles/historiques de budget et activité, identités stables, soumissions et révisions immuables, choix d’identifiant financier et preuve de risque. |
| Pièce de journal | Imputations signées équilibrées sur paiements admissibles; effet positif d’achèvement/approbation, lien de contrepassation et condition de flux d’exercice ouvert aux pièces. Modifie l’imputation, pas le comptant payé. |
| Correction | Lignes financières signées, paiements sources admissibles, inscription immuable et frontières d’annulation/approbation; comptabilité effective distincte du comptant brut. |
| Créance | Source typée réclamation ou avance payée, promoteur/organisme, lignes et imputation, achèvement, réductions, remboursements par note de crédit et compensations de paiement. Sources et soldes sont contrôlés sous verrou. |
| Réduction de réclamation | `Funding_Case_Account_Receivable_Claim_Reduction` conserve montant positif et ligne source exacte; `trg_fn_validate_ar_claim_reduction` protège propriétaire, capacité restante et preuves achevées. |
| Note de crédit | Bassin du promoteur et lignes de créance, organisme/devise/dimensions concordants, comptabilité signée et effets d’achèvement retenus. Les validateurs refusent les crédits incompatibles ou suraffectés. |
| Clôture | Une clôture ouverte par entente, instantané immuable par tentative et frontière d’écriture parente; préparation financière, recouvrements et travail enfant. |

Les flux et reprises figurent dans [Pièces de journal](../agreements/journal-vouchers.md), [Corrections](../agreements/corrections.md), [Créances](../agreements/receivables.md), [Paiements](../agreements/payments.md) et [Clôtures](../agreements/closeouts.md).

## Stockage, ordonnancement et audit

Les pièces conservent fournisseur, objet, localisateur opaque et association typée. Une définition de possibilité peut associer un type de pièce d’organisme sans posséder ses octets. La préparation de réception vérifie fournisseur et limites avant l’association finale. Annulation en base et stockage distant ont des frontières distinctes; `storage_cleanup_outbox` conserve suppression/restauration compensatoire.

`l1_queue` contient un `handler_id` unique, prochaine exécution, tentatives, propriétaire/expiration du bail et dernière erreur. Ses colonnes d’infrastructure sont volontairement sans préfixe; sa propriété Audit est globale et elle n’a aucune charge utile métier. Les files métier conservent leurs propres preuves. Voir [Travail en arrière-plan](../operator/background-work.md).

Les preuves de changement `audit` sont transactionnelles, à ajout seulement avec rétention protégée; les accès utilisent une file mémoire bornée et peuvent être perdus en cas de saturation ou d’arrêt. `audit-ownership-registry.ts` déclare les chaînes concrètes, dont possibilité, réception, collecte et recouvrement. La visibilité d’organisme suit l’attribution, pas l’imbrication de l’URL. Les entrées assainies exigent la permission Audit supplémentaire. Voir [Audit](../admin/audit.md).

## Vérification et différences de moteur

Les tests de schéma canonique inventorient tables, énumérations, index, contraintes, fonctions et déclencheurs PGlite neufs. Les suites PostgreSQL exercent verrous et nouvelle autorisation entre sessions; PGlite utilise un moteur intégré et ne prouve pas ces courses. Les écritures sensibles renouvellent permissions, propriété, affectation et cycle de vie après les verrous ordonnés établis.

`documentation-audit/data-coverage.json` consigne les mécanismes de sujet et aides SQL brutes découverts. Un statut documentaire terminal décrit la couverture examinée, pas l’exécution des tests applicatifs. Le reçu de synchronisation indique les commandes réellement exécutées.

## Maintenance manuelle du tableur

Le classeur externe du modèle de données n’est plus maintenu par des scripts globaux de normalisation, comparaison ou synchronisation. Le responsable compare les preuves de la source et du classeur, puis utilise seulement les commandes bornées `data-model:sheet:read`, `data-model:sheet:cell:update` et `data-model:sheet:row:read|update|insert|delete|color|move`.

Avant la première utilisation ou lorsque l’accès Google doit être renouvelé, placez un document client OAuth de type installé ou Web dans `~/.config/gcs-ssc/google-oauth-client.json`, puis exécutez `bun run data-model:sheet:authorize` dans un terminal local interactif. Ouvrez l’URL Google affichée et terminez le consentement; la commande écoute seulement sur un rappel temporaire `127.0.0.1`, vérifie l’état OAuth aléatoire, exige les jetons d’accès et d’actualisation, puis écrit `~/.config/gcs-ssc/google-sheets-token.json` avec des permissions réservées au propriétaire. Elle expire après dix minutes. Ne copiez jamais ces fichiers, les paramètres de l’URL, le code d’autorisation ou les jetons dans la documentation, les journaux, les billets ou le contrôle de versions.

Chaque écriture nomme la feuille et la ligne et fournit la valeur courante attendue d’une cellule; une différence interrompt l’opération. Le contenu provient d’un fichier explicite, les formules demeurent saisies comme formules et la commande relit les lignes voisines après la mutation. Ne recréez pas un script de rapprochement du classeur entier et ne traitez pas ce processus externe manuel comme une source de migration.

Lors d’une autorisation depuis un terminal distant, le navigateur peut ne pas atteindre son écouteur local. Collez **l’URL de rappel entière dans la commande d’autorisation toujours ouverte**, jamais dans un billet ou une conversation. Elle valide l’origine et le chemin attendus, un seul état correspondant et un seul code avant l’échange. Le même délai de dix minutes s’applique.

Pour un petit bloc préparé, exécutez `bun run scripts/data-model-spreadsheet-row.ts fill-blank --sheet "Titre de feuille" --row 100 --count 2 --expected-first-cell-empty --values-file /chemin/rows.json`. Remplacez la feuille et les lignes après lecture de la destination. Le fichier doit contenir exactement deux tableaux de chaînes de même largeur, par exemple `[["Champ A", "text"], ["Champ B", "bigint"]]`. Cette écriture de valeurs accepte 1 à 32 lignes dans la grille existante, refuse toute ligne contenant une valeur, formule ou note et conserve la mise en forme. Elle n’insère aucune ligne et n’écrase aucune ligne remplie. Les déplacements vérifient séparément la première cellule attendue de la destination, y compris une destination explicitement vide.
