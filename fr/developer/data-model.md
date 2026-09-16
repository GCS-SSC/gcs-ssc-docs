# Modèle de données et intégrité

Les migrations ordonnées enregistrées dans `server/database/production-core-migrations.ts` font autorité. `shared/types/database.d.ts` constitue le contrat Kysely de l’application, mais ne remplace ni les contraintes, ni les fonctions, ni les déclencheurs de la base.

## Schéma ordonné

| Migration | Domaine |
| --- | --- |
| `0001_common` | Énumérations, contacts, adresses et base des modèles d’approbation |
| `0002_users` | Utilisateurs, sessions, comptes et vérification Better Auth |
| `0003_rbac` | Rôles, permissions cumulatives, attributions utilisateur-rôle et événements d’audit |
| `0004_agency` | Profil d’agence et ressources appartenant à l’agence |
| `0005_common_agency` | Clé étrangère du rôle vers l’organisme |
| `0006_transfer_payment` | Programmes, volets, configuration, schémas, budgets et paramètres |
| `0007_polymorphic_common_tp` | Registre d’entités typé, exécution des examens, recommandations, approbations et flux, contraintes et déclencheurs |
| `0008_applicant_recipient` | Profil de promoteur et dossiers enfants/de liaison |
| `0009_funding_case_agreement` | Agrégat d’entente, cycle de vie, données financières, contraintes de propriété et déclencheurs d’état |
| `0010_extensions` | Activation par agence/volet, configuration, paires clé-valeur et secrets chiffrés |
| `0011_storage_cleanup_outbox` | Suppression et restauration de métadonnées durables, baux, reprises et conservation |
| `0012_recommendation_revision` | Révision entière de réponse pour concurrence optimiste |
| `0013_audit` | Preuves de changement/accès/sécurité, capture, rétention protégée et permissions |
| `0014_program_terms_links` | URL française/anglaise obligatoires, reprise des données et compatibilité d’insertion |
| `0015_cost_category_availability` | Indicateurs Actif des catégories, lignes et correspondances du volet |

La migration de démonstration `9999_seed` ne fait pas partie de ce registre de production.

## Propriété et identifiants

La hiérarchie principale est Agence → Profil de paiements de transfert → Volet → Entente de financement. Un bénéficiaire demandeur possède une agence responsable et se lie séparément aux ententes. L’autorisation résout ces relations actives dans la base; une propriété fournie par l’appelant ne fait jamais autorité.

Les identifiants principaux sont des `bigserial`/`bigint`. PostgreSQL/Kysely les expose sous forme de chaînes aux frontières de l’application. Les entités et liaisons principales utilisent généralement `_deleted`; la suppression active cet indicateur et les requêtes actives l’excluent. Vérifiez chaque table, car certains enfants d’approbation à ajout seulement n’offrent intentionnellement aucune suppression logique.

## Polymorphisme typé

`Common_Entity` possède un identifiant globalement unique et une clé de type varchar référençant `Common_Entity_Type`. Les consommateurs polymorphes référencent la paire `(id, type)`; un identifiant existant du mauvais type est donc refusé. Des déclencheurs d’inscription attribuent l’identité partagée aux volets, promoteurs, ententes, modifications, prévisions, rapprochements de réclamation, engagements, paiements, surveillances, examens et recommandations.

Les chaînes paramètre/membre/exécution propagent les colonnes de type par des clés étrangères composées. Ces valeurs sont des champs d’intégrité, non des données métier modifiables indépendamment. Des contraintes limitent aussi les types acceptés par chaque moteur d’examen, d’approbation, d’achèvement, de recommandation, de flux ou d’affectation.

## Cycles distincts d’état opérationnel, de publication et d’exécution

`Common_Status`, appartenant à l’agence, constitue le catalogue configurable des états opérationnels. Les états stables de publication `draft`, `published` et `retired`, ainsi que les états stables d’exécution `pending`, `active`, `awaiting_action`, `paused`, `succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled` et `failed`, sont des constantes système et jamais des lignes d’état d’agence.

`Common_Publication` donne aux modèles d’approbation, schémas d’examen, configurations d’ensembles d’examens, schémas de recommandation, configurations d’ensembles de recommandations et configurations de flux une identité typée partagée. La publication hache une définition de travail canonique et ajoute une `Common_Publication_Version` immuable seulement si le contenu a changé. Une publication parente épingle les versions enfants exactes et une publication de flux prend un instantané de chaque état d’agence référencé. Le retrait est terminal; seul un brouillon non référencé peut être supprimé logiquement.

`Common_Runtime` représente une tentative immuable dont la racine est un flux ou un ensemble d’examens lancé directement. Elle épingle ses versions publiées, sa cible typée exacte, son but, l’initiateur, le numéro de tentative et le prédécesseur. Une reprise crée un successeur avec les mêmes versions; elle ne rouvre jamais une tentative terminale et n’adopte pas une configuration plus récente. `Common_Runtime_Item` forme la hiérarchie ordonnée des ensembles d’examens, examens, ensembles de recommandations, recommandations, bordereaux et étapes d’approbation. Seule l’insertion d’un historique de transition immuable change l’état; les déclencheurs valident et appliquent la transition, puis figent les preuves terminales.

`Common_Completion` consigne une disposition ponctuelle `not_applicable`, `no_workflow` ou `workflow_started`. Une entité pilotée par l’achèvement crée sa première tentative de flux applicable dans la même transaction, consigne définitivement qu’aucun flux ne s’appliquait, ou annule la transaction si sa déclaration exige un flux. Les ententes démarrent leurs flux explicitement sans achèvement racine; les modifications et clôtures exigent un flux d’achèvement; les réclamations, rapprochements, engagements, paiements, prévisions et surveillances permettent l’achèvement avec ou sans flux. L’état d’exécution n’accorde jamais d’accès et ne remplace pas les contrôles existants de rôle, d’affectation exacte et d’état d’agence.

Les soumissions d’approbation d’entente sont des dossiers JSON immuables, versionnés par schéma et munis d’un hachage canonique SHA-256. Une exécution possède au plus un dossier; chaque révision persistée est liée à exactement une soumission. Le hachage est vérifié et les domaines de modification sont promus avant la réussite terminale.

## Champs personnalisés et routage conditionnel

`0006` crée `Transfer_Payment_Stream_Field_Section`, `Transfer_Payment_Stream_Field` et `Transfer_Payment_Stream_Field_Option`. Les clés composites gardent les sections et champs dans un même volet et les options dans leur champ propriétaire. Le volet et le type d’un champ sont immuables; la sélection multiple ne peut redevenir simple. Seuls les champs relationnels peuvent être des discriminants ou permettre une sélection multiple.

Les valeurs d’entente se trouvent dans la colonne JSON objet `Funding_Case_Agreement_Profile.egcs_fc_customfields`. La validation applique la définition du volet, la propriété des options, les exigences et les formats exacts. Ce JSON ne remplace pas librement la configuration typée des champs.

`Common_Workflow_Member_Condition` relie un membre de configuration à des conditions de champ/option du même volet. `Common_Workflow_Publication_Condition` conserve les références publiées immuables et `Common_Workflow_Run.egcs_cn_routing` fige les valeurs et admissibilités capturées. La configuration de travail et les preuves historiques ont donc des gardes distinctes. Consultez [Champs personnalisés](../programs/custom-fields.md) pour les règles, les exemples ET/OU et le retrait.

## Intégrité des affectations exactes

`Common_Entity_Assignment` stocke les lignes exactes `(type d’entité, identifiant, utilisateur commun)` et un indicateur principal informatif. L’unicité active empêche les doublons. Des déclencheurs différés exigent au moins une affectation active et exactement un principal pour chaque entité active pouvant être affectée. Les déclencheurs de suppression logique retirent les affectations lorsque l’entité est supprimée.

Les promoteurs, ententes, examens, recommandations, réclamations, rapprochements, paiements, prévisions, surveillances, modifications et engagements enregistrent leurs déclencheurs de registre et de suppression. Les noms générés par programmation pour les enfants d’entente sont développés explicitement dans `documentation-audit/data-coverage.json` afin qu’aucun mécanisme ne soit caché dans une interpolation.

L’accès d’un rôle est stocké dans `role_permission`, une ligne active par rôle et sujet. `access_level` est nul ou `viewer`, `contributor`, `manager`; `can_manage_assignments` est indépendant et permis seulement pour les sujets persistés `agreement` et `applicant_recipient` (étiquetés Entente et Promoteur dans l’interface). Des déclencheurs différés rejettent les permissions incompatibles avec la structure globale, d’agence ou de programme du rôle.

## Précision financière et concurrence

Les montants publics sont des chaînes canoniques à deux décimales, calculées en cents entiers exacts. Une ligne `numeric(19,2)` représente jusqu’à `99999999999999999.99` en valeur absolue; un domaine peut imposer d’autres règles de signe ou de total. Ne convertissez pas les identifiants ou montants en `Number` JavaScript. Conservez par exemple `"9007199254740993"` comme identifiant et `"10000000000000000.01"` comme montant, sans perte par nombre JSON.

Les budgets calculés capturent mode, source et pourcentage et arrondissent au dollar avant de retourner deux décimales. Le recalcul groupe par version, exercice et devise, valide les totaux touchés et annule la mutation en cas d’échec. Voir les exemples de [Budget](../agreements/budget.md).

Une écriture sensible verrouille et reconstruit l’autorisation avant de verrouiller les agrégats métier. Les aides pour les ententes, paiements de transfert, extensions, approbations, examens et flux codent un ordre de verrouillage stable. Les tests d’intégration PostgreSQL — et non les simulations PGlite — font autorité pour les courses entre connexions, le comportement des contraintes et la prévention des interblocages.

PGlite convient au fonctionnement local/de démonstration et reproduit la plupart du schéma, mais utilise un seul moteur intégré. Il ne peut prouver le verrouillage PostgreSQL entre plusieurs connexions.

La disposition exhaustive des tables, contraintes, fonctions et déclencheurs se trouve dans `documentation-audit/data-coverage.json` et doit être terminale avant que cette référence soit considérée comme complète.

## Référence des entités par migration

L’inventaire suivant est regroupé par agrégat. Les noms désignent des tables physiques, sauf lorsqu’ils sont qualifiés de fonction, déclencheur, contrainte ou relation. Les clés étrangères des dossiers métier utilisent `RESTRICT`, sauf indication explicite d’une cascade; l’unicité des dossiers actifs désigne normalement un index unique partiel avec `_deleted = false`.

| Migration | Entités persistées | Contrat d’intégrité important |
| --- | --- | --- |
| `0001_common` | `Common_Contact`, `Common_Address`, `Common_Approval_Template` | Énumérations et `citext`; unicité du courriel actif; subdivision canadienne valide; coordonnées `numeric(10,7)`. Les migrations suivantes ajoutent publications, exécutions et pièces jointes typées. |
| `0002_users` | `user`, `session`, `account`, `verification` | Installe `plpgsql` s’il manque afin que PostgreSQL et PGlite compilent les fonctions procédurales. Better Auth possède ces formes. Courriel et jeton sont uniques; sessions/comptes suivent l’utilisateur. `enforce_active_session_user()` et son déclencheur refusent la session d’un utilisateur supprimé. |
| `0003_rbac` | `role`, `role_permission`, `user_role_assignment`, `security_audit_event` | Les contraintes de sujet, niveau, ligne effective, sujet de gestion et unicité imposent le modèle cumulatif. Les enfants suivent le rôle; les acteurs d’audit sont restreints. `prevent_security_audit_event_mutation()` et son déclencheur refusent les modifications/suppressions d’audit. |
| `0004_agency` | `Agency_Profile`, `Common_Status`, `Agency_Cost_Category`, `Agency_Cost_Category_Line_Item`, `Agency_Holdback_Basis`, `Agency_Fiscal_Year`, `Agency_Address_Type`, `Agency_Applicant_Recipient_Subtype`, `Agency_Approval_Behalf_Type`, `Agency_Agreement_Type` | Toutes les références appartiennent à une agence, sont bilingues et supprimables logiquement. Noms/codes bilingues actifs sont uniques dans leur propriétaire; un poste appartient à une catégorie; les plages d’exercice et l’unicité du profil sont contraintes en base. |
| `0005_common_agency` | Relation `role.agency_id` | Ajoute `role_agency_fk` vers `Agency_Profile` avec suppression restreinte, après la création de la table d’organisme. |
| `0006_transfer_payment` | `Transfer_Payment_Profile`, budgets d’exercice et de volet, tables de configuration et de référence du volet, `Transfer_Payment_Stream_Chart_of_Account`, `Transfer_Payment_Stream_Commitment_Type` et `role_transfer_payment_scope` | La propriété programme/volet et la précision financière sont contraintes. Les entrées du plan portent des dimensions JSON bilingues ordonnées, appartiennent à un budget du même volet et sont uniques par budget/dimensions actifs. Les types d’engagement sont des références bilingues du même volet. Les déclencheurs de protection de propriété et les déclencheurs différés de permission/portée refusent les changements de propriétaire et graphes incompatibles. |
| `0008_applicant_recipient` | `Applicant_Recipient_Profile`, `Applicant_Recipient_Registry`, `Applicant_Recipient_Agency_Financial_Id`, `Applicant_Recipient_Other_Name`, `Applicant_Recipient_Address`, `Applicant_Recipient_Contact`, `Applicant_Recipient_Funding_History`, `Applicant_Recipient_Funding_History_Recipient` | Le profil possède une identité typée et une agence principale. Les relations actives sont uniques dans leur propriétaire. Le financement est `numeric(19,2)`. Le nettoyage retire un historique sans lien. Les déclencheurs du registre de promoteur imposent ses affectations exactes. |
| `0010_extensions` | `extensions.agency_enablement`, `extensions.agency_storage_selection`, `extensions.stream_configuration`, `extensions.kv_entry`, `extensions.secret_entry` | Activation/configuration est unique par extension et agence/volet. La clé KV est unique sur `(extension_id, owner_type, owner_id, key)`. Le secret est pareillement délimité; texte chiffré, IV, étiquette d’authentification et version de clé sont stockés, jamais le texte clair. |

## Moteurs polymorphes (`0007`)

`0007_polymorphic_common_tp` crée `Common_Entity`, `Common_Entity_Type`, `register_entity()`, les clés typées et les graphes de conception/exécution des examens, recommandations, approbations, achèvements et flux. `Common_Entity_Assignment` remplace les lignes propres aux équipes par un registre exact sans niveau d’accès. Les déclencheurs des examens et recommandations imposent un registre non vide avec un principal. Les membres de recommandation incluent la politique figée d’échec sur Non recommandé.

Les contraintes `ay_ref_profilegwcoanumber`, `tp_ref_streamid` et `cn_ref_*` lient les identités d’agence/programme et les chaînes typées. Les contraintes `cn_chk_*` restreignent les types légaux et les noms d’approbations supplémentaires. `Common_Review_Setup` doit reprendre le type de son ensemble et l’exécution épingle la version du schéma.

Les preuves d’approbation sont liées aux éléments d’exécution canoniques. `trg_fn_enforce_approval_sequence`, `trg_fn_lock_actioned_approval`, `trg_fn_require_certifications` et `trg_fn_require_actual_delegation_detail` imposent ordre, immutabilité, attestations et preuve de délégation. `trg_fn_validate_approval_runtime_item`, `trg_fn_enforce_approval_runtime_state` et les verrous de preuve lient les décisions à l’exécution courante. `trg_fn_validate_added_approval_runtime_step` encadre les étapes ajoutées sans réécrire le préfixe résolu.

Versions, références et transitions de publication sont des preuves scellées. Le validateur de références vérifie le graphe typé; les protections de conception empêchent de modifier une configuration retirée. Les validateurs d’insertion et de hiérarchie imposent l’identité et la structure parent-enfant. Un changement d’état exige l’insertion d’une transition; modifier directement l’état d’exécution n’est pas un mécanisme pris en charge.

Les validateurs d’achèvement imposent cible exacte, capacité, disposition et cible du flux associé. `trg_fn_lock_completion` fige la preuve. Les flux conservent propriétaires par défaut, transitions et obstacles. Le routage conditionnel conserve aussi les références publiées aux discriminants et les valeurs et admissibilités immuables capturées par exécution. Voir [Champs personnalisés](../programs/custom-fields.md) pour les références actives et historiques.

## Agrégat d’entente (`0009`)

La racine est `Funding_Case_Agreement_Profile`. Ses enfants comprennent :

- promoteurs et adresses : `Funding_Case_Agreement_Applicant_Recipient`, `Funding_Case_Agreement_Address`;
- modifications et versions : `Funding_Case_Agreement_Amendment`, ses liens de type/sous-type, `Funding_Case_Agreement_Budget_Version`, `Funding_Case_Agreement_Activity_Version`, `Funding_Case_Agreement_Approval_Submission` et `Funding_Case_Agreement_Revision`;
- budgets et activités : `Funding_Case_Agreement_Budget_Fiscal_Year`, `Funding_Case_Agreement_Budget_Line_Item`, `Funding_Case_Agreement_Activity`, liens résultat/activité et responsable/activité;
- opérations : prévisions, réclamations, rapprochements de réclamation, engagements et paiements avec leurs lignes;
- surveillance : dossiers, planification, éléments, constatations, suivis, mises à jour de suivi et pratiques prometteuses.

Entente, modification, réclamation, rapprochement, prévision, engagement, paiement, surveillance et clôture reçoivent une identité `Common_Entity`. Leurs déclencheurs d’affectation imposent et retirent les registres exacts. `Funding_Case_Agreement_Closeout` permet une seule ligne ouverte par entente, contraint les combinaisons état/ouverture et possède un instantané immuable de préparation par exécution. Les déclencheurs d’instantané valident l’exécution `approval_submission` et l’entente parente et refusent modification/suppression. Les identités budgétaires stables sont des bigint PostgreSQL exposés comme chaînes décimales. Les déclencheurs de soumission valident le but et la cible du flux et refusent la modification/suppression du dossier. La validation des révisions exige la concordance de la soumission, de la modification facultative et de l’entente.

La famille `trg_fn_resolve_*` et ses déclencheurs dérivent — sans faire confiance à l’appelant — versions courantes, identité du poste budgétaire, entente des lignes de réclamation/prévision, réclamation d’une ligne rapprochée, portée d’une ligne d’engagement, entente du paiement et engagement de sa ligne. Les contrôles de racine refusent les croisements d’entente. Les déclencheurs de modification exigent une configuration du volet de l’entente.

Les montants sont `numeric(19,2)`, retenues/pourcentages `numeric(5,2)` et risque `numeric(8,2)`. `fc_enforce_commitment_program_funding_total`, invoquée par les familles de déclencheurs des postes, versions et engagements, empêche les affectations actives de dépasser le financement de programme correspondant. Un abaissement ultérieur du budget ne contourne donc pas l’invariant.

## Stockage, audit et ajouts incrémentaux

`Common_Attachment_Types` appartient à l’organisme. `Common_Attachment` conserve les métadonnées hôte, le fournisseur/objet/localisateur figé et le contrat facultatif de métadonnées. `Common_Entity_Attachment` lie le téléversement à une cible typée exacte. Les documents générés utilisent leur propre relation typée. `extensions.agency_storage_selection` choisit le fournisseur des nouvelles écritures sans déplacer les objets existants.

`0011` persiste les opérations `delete_object` et `restore_metadata`, leurs états, tentatives, dates de reprise et propriétaires de bail. Les octets externes ne participent pas à la transaction. La file permet reprise et compensation sans rendre durable chaque nettoyage de document généré. Voir [Travail en arrière-plan](../operator/background-work.md).

`0012` commence la révision de réponse de recommandation à 1. Un enregistrement transmet la révision attendue, modifie sous verrou et l’incrémente. Ce compteur est indépendant de la publication du schéma.

`0013` déplace la sécurité dans `audit.security_audit_event` et ajoute `audit.change_event`, `audit.access_event` et les politiques de capture/rétention. Les changements conservent les valeurs JSON exactes et le masquage configuré. Les déclencheurs d’ajout seulement refusent modification, suppression et troncature ordinaires; l’expiration permet seulement les suppressions admissibles. La capture d’accès est mise en mémoire hors transaction métier et peut être retardée ou perdue. Ces preuves n’offrent donc pas les mêmes garanties.

`0014` remplit les deux nouvelles URL depuis l’ancienne, y compris pour les programmes retirés, puis les rend obligatoires. Un déclencheur de compatibilité permet les anciennes insertions de démonstration; les API courantes exigent les URL française et anglaise fournies séparément. La migration est volontairement irréversible, car fusionner deux URL indépendantes perdrait des données.

`0015` ajoute des indicateurs de disponibilité initialement vrais aux catégories, lignes et correspondances existantes. La disponibilité ne retire pas les références et ne réécrit pas les calculs enregistrés. Suppression, disponibilité et catalogue d’états métier restent distincts.

## Maintenance manuelle du tableur

Le classeur externe du modèle de données n’est plus maintenu par des scripts globaux de normalisation, comparaison ou synchronisation. Le responsable compare les preuves de la source et du classeur, puis utilise seulement les commandes bornées `data-model:sheet:read`, `data-model:sheet:cell:update` et `data-model:sheet:row:read|update|insert|delete|color|move`.

Avant la première utilisation ou lorsque l’accès Google doit être renouvelé, placez un document client OAuth de type installé ou Web dans `~/.config/gcs-ssc/google-oauth-client.json`, puis exécutez `bun run data-model:sheet:authorize` dans un terminal local interactif. Ouvrez l’URL Google affichée et terminez le consentement; la commande écoute seulement sur un rappel temporaire `127.0.0.1`, vérifie l’état OAuth aléatoire, exige les jetons d’accès et d’actualisation, puis écrit `~/.config/gcs-ssc/google-sheets-token.json` avec des permissions réservées au propriétaire. Elle expire après dix minutes. Ne copiez jamais ces fichiers, les paramètres de l’URL, le code d’autorisation ou les jetons dans la documentation, les journaux, les billets ou le contrôle de versions.

Chaque écriture nomme la feuille et la ligne et fournit la valeur courante attendue d’une cellule; une différence interrompt l’opération. Le contenu provient d’un fichier explicite, les formules demeurent saisies comme formules et la commande relit les lignes voisines après la mutation. Ne recréez pas un script de rapprochement du classeur entier et ne traitez pas ce processus externe manuel comme une source de migration.

Lors d’une autorisation depuis un terminal distant, le navigateur peut ne pas atteindre son écouteur local. Collez **l’URL de rappel entière dans la commande d’autorisation toujours ouverte**, jamais dans un billet ou une conversation. Elle valide l’origine et le chemin attendus, un seul état correspondant et un seul code avant l’échange. Le même délai de dix minutes s’applique.

Pour un petit bloc préparé, exécutez `bun run scripts/data-model-spreadsheet-row.ts fill-blank --sheet "Titre de feuille" --row 100 --count 2 --expected-first-cell-empty --values-file /chemin/rows.json`. Remplacez la feuille et les lignes après lecture de la destination. Le fichier doit contenir exactement deux tableaux de chaînes de même largeur, par exemple `[["Champ A", "text"], ["Champ B", "bigint"]]`. Cette écriture de valeurs accepte 1 à 32 lignes dans la grille existante, refuse toute ligne contenant une valeur, formule ou note et conserve la mise en forme. Elle n’insère aucune ligne et n’écrase aucune ligne remplie. Les déplacements vérifient séparément la première cellule attendue de la destination, y compris une destination explicitement vide.

## Vérification et différences de moteur

Le test de schéma canonique migre une base PGlite neuve et inventorie tables, énumérations, colonnes, index, contraintes, fonctions et déclencheurs. Les tests ciblés vérifient sous-types/versions de revue, paires polymorphes, états d’approbation, propriété/versionnement d’entente et totaux financiers. Les suites PostgreSQL vérifient en plus les courses et verrous entre connexions; elles exigent une URL de test PostgreSQL et ne sont pas impliquées par une réussite PGlite.
