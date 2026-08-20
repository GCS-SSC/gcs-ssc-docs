# Modèle de données et intégrité

Les migrations ordonnées enregistrées dans `server/database/production-core-migrations.ts` font autorité. `shared/types/database.d.ts` constitue le contrat Kysely de l’application, mais ne remplace ni les contraintes, ni les fonctions, ni les déclencheurs de la base.

## Schéma ordonné

| Migration | Domaine |
| --- | --- |
| `0001_common` | Énumérations communes, métadonnées, pièces jointes, entités et fondements des examens, approbations et achèvements |
| `0002_users` | Utilisateurs, sessions, comptes et vérification Better Auth |
| `0003_rbac` | Rôles, permissions cumulatives, attributions utilisateur-rôle et événements d’audit |
| `0004_agency` | Profil d’agence et ressources appartenant à l’agence |
| `0005_common_agency` | Relations de référence communes de l’agence |
| `0006_transfer_payment` | Programmes, volets, configuration, schémas, budgets et paramètres |
| `0007_polymorphic_common_tp` | Registre d’entités typé, exécution des examens, recommandations, approbations et flux, contraintes et déclencheurs |
| `0008_applicant_recipient` | Profil de promoteur et dossiers enfants/de liaison |
| `0009_funding_case_agreement` | Agrégat d’entente, cycle de vie, données financières, contraintes de propriété et déclencheurs d’état |
| `0010_extensions` | Activation par agence/volet, configuration, paires clé-valeur et secrets chiffrés |

La migration de démonstration `9999_seed` ne fait pas partie de ce registre de production.

## Propriété et identifiants

La hiérarchie principale est Agence → Profil de paiements de transfert → Volet → Entente de financement. Un bénéficiaire demandeur possède une agence responsable et se lie séparément aux ententes. L’autorisation résout ces relations actives dans la base; une propriété fournie par l’appelant ne fait jamais autorité.

Les identifiants principaux sont des `bigserial`/`bigint`. PostgreSQL/Kysely les expose sous forme de chaînes aux frontières de l’application. Les entités et liaisons principales utilisent généralement `_deleted`; la suppression active cet indicateur et les requêtes actives l’excluent. Vérifiez chaque table, car certains enfants d’approbation à ajout seulement n’offrent intentionnellement aucune suppression logique.

## Polymorphisme typé

`Common_Entity` possède un identifiant globalement unique et un `Entity_Type`. Les consommateurs polymorphes référencent la paire `(id, type)`; un identifiant existant du mauvais type est donc refusé. Des déclencheurs d’inscription attribuent l’identité partagée aux volets, promoteurs, ententes, modifications, prévisions, rapprochements de réclamation, engagements, paiements, surveillances, examens et recommandations.

Les chaînes paramètre/membre/exécution propagent les colonnes de type par des clés étrangères composées. Ces valeurs sont des champs d’intégrité, non des données métier modifiables indépendamment. Des contraintes limitent aussi les types acceptés par chaque moteur d’examen, d’approbation, d’achèvement, de recommandation, de flux ou d’affectation.

## Versions et exécution du cycle de vie

Les configurations publiées d’examen, d’approbation, de recommandation et de flux sont des instantanés immuables. Les dossiers d’exécution épinglent la version/configuration publiée; une modification ultérieure ou la suppression logique d’un dossier de conception ne réécrit donc pas un processus en cours. Les budgets et activités d’entente utilisent également des versions liées aux modifications.

Les déclencheurs PostgreSQL imposent la séquence des approbations, l’immuabilité des décisions, les attestations obligatoires, l’unicité du bordereau actif, les transitions terminales permises, la concordance des paramètres de flux et des invariants financiers/de cycle de vie. La validation applicative améliore les erreurs localisées, mais ne remplace pas ces contraintes.

Les soumissions d’approbation d’entente sont des dossiers JSON immuables, versionnés par schéma et munis d’un hachage canonique SHA-256. Une exécution possède au plus un dossier; chaque révision persistée est liée à exactement une soumission. Le hachage est vérifié et les domaines de modification sont promus avant la réussite terminale.

## Intégrité des affectations exactes

`Common_Entity_Assignment` stocke les lignes exactes `(type d’entité, identifiant, utilisateur commun)` et un indicateur principal informatif. L’unicité active empêche les doublons. Des déclencheurs différés exigent au moins une affectation active et exactement un principal pour chaque entité active pouvant être affectée. Les déclencheurs de suppression logique retirent les affectations lorsque l’entité est supprimée.

Les promoteurs, ententes, examens, recommandations, réclamations, rapprochements, paiements, prévisions, surveillances, modifications et engagements enregistrent leurs déclencheurs de registre et de suppression. Les noms générés par programmation pour les enfants d’entente sont développés explicitement dans `documentation-audit/data-coverage.json` afin qu’aucun mécanisme ne soit caché dans une interpolation.

L’accès d’un rôle est stocké dans `role_permission`, une ligne active par rôle et sujet. `access_level` est nul ou `viewer`, `contributor`, `manager`; `can_manage_assignments` est indépendant et permis seulement pour les sujets persistés `agreement` et `applicant_recipient` (étiquetés Entente et Promoteur dans l’interface). Des déclencheurs différés rejettent les permissions incompatibles avec la structure globale, d’agence ou de programme du rôle.

## Précision financière et concurrence

Les valeurs numériques passent par le contrat de décimales sûres qui échoue en cas d’incertitude. Les schémas monétaires publics emploient les limites de précision du dépôt et les migrations financières préservent les échelles `numeric(p,s)` déclarées. Aucun calcul ne doit convertir silencieusement une valeur PostgreSQL non sûre en nombre JavaScript.

Une écriture sensible verrouille et reconstruit l’autorisation avant de verrouiller les agrégats métier. Les aides pour les ententes, paiements de transfert, extensions, approbations, examens et flux codent un ordre de verrouillage stable. Les tests d’intégration PostgreSQL — et non les simulations PGlite — font autorité pour les courses entre connexions, le comportement des contraintes et la prévention des interblocages.

PGlite convient au fonctionnement local/de démonstration et reproduit la plupart du schéma, mais utilise un seul moteur intégré. Il ne peut prouver le verrouillage PostgreSQL entre plusieurs connexions. PostgreSQL 18 peut fournir `uuidv7()` nativement; la migration s’adapte lorsque l’ancienne fonction d’extension est absente.

La disposition exhaustive des tables, contraintes, fonctions et déclencheurs se trouve dans `documentation-audit/data-coverage.json` et doit être terminale avant que cette référence soit considérée comme complète.

## Référence des entités par migration

L’inventaire suivant est regroupé par agrégat. Les noms désignent des tables physiques, sauf lorsqu’ils sont qualifiés de fonction, déclencheur, contrainte ou relation. Les clés étrangères des dossiers métier utilisent `RESTRICT`, sauf indication explicite d’une cascade; l’unicité des dossiers actifs désigne normalement un index unique partiel avec `_deleted = false`.

| Migration | Entités persistées | Contrat d’intégrité important |
| --- | --- | --- |
| `0001_common` | `Common_Contact`, `Common_Address`, `Common_Completion`, `Common_Certification`, `Common_Approval_Template`, `Common_Approval_Step`, `Common_Routing_Slip`, `Common_Form_Schema`, `Common_Attachment_Type` | Établit les énumérations partagées et `citext`; le courriel d’un contact actif est unique. Une adresse canadienne exige une `Jurisdiction` valide; les coordonnées sont `numeric(10,7)`. Une étape d’approbation référence une attestation, un modèle et un contact par défaut. Les versions de schéma sont `numeric(10,2)` et les charges utiles sont JSONB. |
| `0002_users` | `user`, `session`, `account`, `verification` | Installe `plpgsql` s’il manque afin que PostgreSQL et PGlite compilent les fonctions procédurales. Better Auth possède ces formes. Courriel et jeton sont uniques; sessions/comptes suivent l’utilisateur. `enforce_active_session_user()` et son déclencheur refusent la session d’un utilisateur supprimé. |
| `0003_rbac` | `role`, `role_permission`, `user_role_assignment`, `security_audit_event` | Les contraintes de sujet, niveau, ligne effective, sujet de gestion et unicité imposent le modèle cumulatif. Les enfants suivent le rôle; les acteurs d’audit sont restreints. `prevent_security_audit_event_mutation()` et son déclencheur refusent les modifications/suppressions d’audit. |
| `0004_agency` | `Agency_Profile`, `Agency_Cost_Category`, `Agency_Cost_Category_Line_Item`, `Agency_Holdback_Basis`, `Agency_Fiscal_Year`, `Agency_Address_Type`, `Agency_Applicant_Recipient_Subtype`, `Agency_Approval_Behalf_Type`, `Agency_Agreement_Type` | Toutes les références appartiennent à une agence, sont bilingues et supprimables logiquement. Noms/codes bilingues actifs sont uniques dans leur propriétaire; un poste appartient à une catégorie; les plages d’exercice et l’unicité du profil sont contraintes en base. |
| `0005_common_agency` | Relations ajoutées des configurations communes vers `Agency_Profile` | Rend attestations, modèles d’approbation, types de pièces jointes et schémas de formulaire propres à une agence par clés étrangères restrictives. |
| `0006_transfer_payment` | `Transfer_Payment_Profile`, `Transfer_Payment_Fiscal_Year_Budget`, `Transfer_Payment_Stream`, `Transfer_Payment_Objective`, `Transfer_Payment_Outcome`, `Transfer_Payment_Outcome_Performance_Indicator`, `Transfer_Payment_Stream_Outcome`, `Transfer_Payment_Stream_Budget`, `Transfer_Payment_Stream_Eligible_Recipient`, `Transfer_Payment_Stream_Cost_Category_Line_Item`, `Transfer_Payment_Stream_Holdback_Basis`, `Transfer_Payment_Agreement_Subtype`, `Transfer_Payment_Amendment_Type`, `Transfer_Payment_Amendment_Subtype`, `Transfer_Payment_Amendment_Subtype_Type`, `Transfer_Payment_Stream_Commitment`, `Transfer_Payment_Monitor_Type`, `Transfer_Payment_Stream_Area_of_Expertise`, `Transfer_Payment_Stream_Risk_Rating`, `Transfer_Payment_Financial_Limits`, `role_transfer_payment_scope` | La propriété programme/volet et la précision financière sont contraintes. `enforce_role_permission_scope()` et les déclencheurs différés de permission, rôle et portée refusent les graphes incompatibles. Le déclencheur des types/sous-types exige des fiches actives du même volet. |
| `0008_applicant_recipient` | `Applicant_Recipient_Profile`, `Applicant_Recipient_Registry`, `Applicant_Recipient_Agency_Financial_Id`, `Applicant_Recipient_Other_Name`, `Applicant_Recipient_Address`, `Applicant_Recipient_Contact`, `Applicant_Recipient_Funding_History`, `Applicant_Recipient_Funding_History_Recipient` | Le profil possède une identité typée et une agence principale. Les relations actives sont uniques dans leur propriétaire. Le financement est `numeric(19,2)`. Le nettoyage retire un historique sans lien. Les déclencheurs du registre de promoteur imposent ses affectations exactes. |
| `0010_extensions` | `extensions.agency_enablement`, `extensions.stream_configuration`, `extensions.kv_entry`, `extensions.secret_entry` | Activation/configuration est unique par extension et agence/volet. La clé KV est unique sur `(extension_id, owner_type, owner_id, key)`. Le secret est pareillement délimité; texte chiffré, IV, étiquette d’authentification et version de clé sont stockés, jamais le texte clair. |

## Moteurs polymorphes (`0007`)

`0007_polymorphic_common_tp` crée `Common_Entity`, `Entity_Type`, `register_entity()`, les clés typées et les graphes de conception/exécution des examens, recommandations, approbations, achèvements et flux. `Common_Entity_Assignment` remplace les lignes propres aux équipes par un registre exact sans niveau d’accès. Les déclencheurs des examens et recommandations imposent un registre non vide avec un principal. Les membres de recommandation incluent la politique figée d’échec sur Non recommandé. `copy_legacy_rows` est un déplacement de migration, non une API.

Les contraintes `ay_ref_profilegwcoanumber`, `tp_ref_streamid` et `cn_ref_*` lient les identités d’agence/programme et les chaînes typées. Les contraintes `cn_chk_*` restreignent les types légaux et les noms d’approbations supplémentaires. `Common_Review_Setup` doit reprendre le type de son ensemble et l’exécution épingle la version du schéma.

La famille d’approbation — `trg_fn_autopopulate_self_approval`, `trg_fn_enforce_approval_sequence`, `trg_fn_enforce_assigned_user_actions`, `trg_fn_lock_actioned_approval`, `trg_fn_lock_approval_on_terminal_slip`, `trg_fn_require_actual_delegation_detail`, `trg_fn_require_certifications`, `trg_fn_routingslip_forward_status`, les deux fonctions d’instantané du bordereau et `trg_fn_validate_added_step_sequence` — est attachée par les déclencheurs `trg_*` correspondants. Elle peuple l’auto-approbation, impose l’ordre et l’utilisateur assigné, fige les décisions, exige délégation et attestations, fait avancer le bordereau, instantanéise la politique et encadre les étapes insérées. `trg_fn_cascade_routingslip_status` propage l’état terminal.

L’intégrité des revues/recommandations repose sur les contrôles de sous-type, le verrouillage des versions publiées et `trg_fn_reset_additional_reviewer_completion`. `trg_fn_enforce_completion_audit_fields` garde cohérents valeur, auteur et date d’achèvement. `trg_fn_validate_workflow_setup` exige que les paramètres référencés concordent avec la portée et la cible du flux. Chaque fonction nommée est associée au déclencheur de même suffixe inscrit au registre.

## Agrégat d’entente (`0009`)

La racine est `Funding_Case_Agreement_Profile`. Ses enfants couvrent bénéficiaires/adresses; modifications, versions de budget/activités, soumissions d’approbation et révisions; exercices, postes, activités, résultats et responsables; prévisions, réclamations, rapprochements, engagements et paiements avec leurs lignes; ainsi que la surveillance. Le registre d’audit énumère chaque table physique.

Entente, modification, réclamation, rapprochement, prévision, engagement, paiement et surveillance reçoivent une identité `Common_Entity`. Leurs déclencheurs d’affectation imposent et retirent les registres exacts. `uuid_generate_v7` fournit les identifiants de révision si le support natif manque. Les déclencheurs de soumission valident le but et la cible du flux et refusent la modification/suppression du dossier. La validation des révisions exige la concordance de la soumission, de la modification facultative et de l’entente.

La famille `trg_fn_resolve_*` et ses déclencheurs dérivent — sans faire confiance à l’appelant — versions courantes, identité du poste budgétaire, entente des lignes de réclamation/prévision, réclamation d’une ligne rapprochée, portée d’une ligne d’engagement, entente du paiement et engagement de sa ligne. Les contrôles de racine refusent les croisements d’entente. Les déclencheurs de modification exigent une configuration du volet de l’entente.

Les montants sont `numeric(19,2)`, retenues/pourcentages `numeric(5,2)` et risque `numeric(8,2)`. `fc_enforce_commitment_program_funding_total`, invoquée par les familles de déclencheurs des postes, versions et engagements, empêche les affectations actives de dépasser le financement de programme correspondant. Un abaissement ultérieur du budget ne contourne donc pas l’invariant.

## Maintenance manuelle du tableur

Le classeur externe du modèle de données n’est plus maintenu par des scripts globaux de normalisation, comparaison ou synchronisation. Le responsable compare les preuves de la source et du classeur, puis utilise seulement les commandes bornées `data-model:sheet:read`, `data-model:sheet:cell:update` et `data-model:sheet:row:read|update|insert|delete|color|move`.

Chaque écriture nomme la feuille et la ligne et fournit la valeur courante attendue d’une cellule; une différence interrompt l’opération. Le contenu provient d’un fichier explicite, les formules demeurent saisies comme formules et la commande relit les lignes voisines après la mutation. Ne recréez pas un script de rapprochement du classeur entier et ne traitez pas ce processus externe manuel comme une source de migration.

## Vérification et différences de moteur

Le test de schéma canonique migre une base PGlite neuve et inventorie tables, énumérations, colonnes, index, contraintes, fonctions et déclencheurs. Les tests ciblés vérifient sous-types/versions de revue, paires polymorphes, états d’approbation, propriété/versionnement d’entente et totaux financiers. Les suites PostgreSQL vérifient en plus les courses et verrous entre connexions; elles exigent une URL de test PostgreSQL et ne sont pas impliquées par une réussite PGlite.
