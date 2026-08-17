# Modèle de données et intégrité

Les migrations ordonnées enregistrées dans `server/database/production-core-migrations.ts` font autorité. `shared/types/database.d.ts` constitue le contrat Kysely de l’application, mais ne remplace ni les contraintes, ni les fonctions, ni les déclencheurs de la base.

## Schéma ordonné

| Migration | Domaine |
| --- | --- |
| `0001_common` | Énumérations communes, métadonnées, pièces jointes, entités et fondements des examens, approbations et achèvements |
| `0002_users` | Utilisateurs, sessions, comptes et vérification Better Auth |
| `0003_rbac` | Rôles, capacités, affectations et événements d’audit de sécurité |
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

Les chaînes paramètre/membre/exécution propagent les colonnes de type par des clés étrangères composées. Ces valeurs propagées sont des champs d’intégrité, non des données métier modifiables de façon indépendante. Des contraintes plus étroites limitent aussi les types acceptés par chaque moteur d’examen, d’approbation, d’achèvement, de recommandation, de flux ou d’équipe.

## Versions et exécution du cycle de vie

Les configurations publiées d’examen, d’approbation, de recommandation et de flux sont des instantanés immuables. Les dossiers d’exécution épinglent la version/configuration publiée; une modification ultérieure ou la suppression logique d’un dossier de conception ne réécrit donc pas un processus en cours. Les budgets et activités d’entente utilisent également des versions liées aux modifications.

Les déclencheurs PostgreSQL imposent la séquence des approbations, l’immuabilité des décisions, les attestations obligatoires, l’unicité du bordereau actif, les transitions terminales permises, la concordance des paramètres de flux et des invariants financiers/de cycle de vie. La validation applicative améliore les erreurs localisées, mais ne remplace pas ces contraintes.

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
| `0002_users` | `user`, `session`, `account`, `verification` | Better Auth possède ces formes. Le courriel et le jeton de session sont uniques; sessions et comptes sont supprimés en cascade avec l’utilisateur. `enforce_active_session_user()` et `trg_enforce_active_session_user` refusent la session d’un utilisateur supprimé logiquement et verrouillent la ligne active pendant le contrôle. Les jetons de fournisseur et mots de passe ne doivent jamais paraître dans la documentation ou les journaux. |
| `0003_rbac` | `role`, `role_ability`, `user_role_assignment`, `security_audit_event` | Les actions et sujets sont des vocabulaires fermés par contraintes. Capacités actives et affectations utilisateur/rôle sont uniques. `prevent_security_audit_event_mutation()` et `security_audit_event_append_only` refusent toute modification ou suppression d’audit; les types d’événement et de cible sont aussi contraints. |
| `0004_agency` | `Agency_Profile`, `Agency_Cost_Category`, `Agency_Cost_Category_Line_Item`, `Agency_Holdback_Basis`, `Agency_Fiscal_Year`, `Agency_Address_Type`, `Agency_Applicant_Recipient_Subtype`, `Agency_Approval_Behalf_Type`, `Agency_Agreement_Type` | Toutes les références appartiennent à une agence, sont bilingues et supprimables logiquement. Noms/codes bilingues actifs sont uniques dans leur propriétaire; un poste appartient à une catégorie; les plages d’exercice et l’unicité du profil sont contraintes en base. |
| `0005_common_agency` | Relations ajoutées des configurations communes vers `Agency_Profile` | Rend attestations, modèles d’approbation, types de pièces jointes et schémas de formulaire propres à une agence par clés étrangères restrictives. |
| `0006_transfer_payment` | `Transfer_Payment_Profile`, `Transfer_Payment_Fiscal_Year_Budget`, `Transfer_Payment_Stream`, `Transfer_Payment_Objective`, `Transfer_Payment_Outcome`, `Transfer_Payment_Outcome_Performance_Indicator`, `Transfer_Payment_Stream_Outcome`, `Transfer_Payment_Stream_Budget`, `Transfer_Payment_Stream_Eligible_Recipient`, `Transfer_Payment_Stream_Cost_Category_Line_Item`, `Transfer_Payment_Stream_Holdback_Basis`, `Transfer_Payment_Agreement_Subtype`, `Transfer_Payment_Amendment_Type`, `Transfer_Payment_Amendment_Subtype`, `Transfer_Payment_Amendment_Subtype_Type`, `Transfer_Payment_Stream_Commitment`, `Transfer_Payment_Monitor_Type`, `Transfer_Payment_Stream_Area_of_Expertise`, `Transfer_Payment_Stream_Risk_Rating`, `Transfer_Payment_Financial_Limits`, `role_transfer_payment_scope` | Les dates de programme sont ordonnées et les noms actifs sont uniques. Budgets et maximums sont `numeric(19,2)`, pourcentages `numeric(5,2)`, risques `numeric(8,2)` et non négatifs. La propriété composée lie un engagement à un budget du même volet. La fonction `trg_fn_enforce_amendment_subtype_type_stream_scope` et son déclencheur exigent un type et sous-type actifs du même volet. |
| `0008_applicant_recipient` | `Applicant_Recipient_Profile`, `Applicant_Recipient_Registry`, `Applicant_Recipient_Agency_Financial_Id`, `Applicant_Recipient_Other_Name`, `Applicant_Recipient_Address`, `Applicant_Recipient_Contact`, `Applicant_Recipient_Funding_History`, `Applicant_Recipient_Funding_History_Recipient` | Le profil possède une identité typée inscrite et une agence responsable facultative. Les relations actives sont uniques dans leur propriétaire. Le financement est `numeric(19,2)` et un historique peut lier plusieurs bénéficiaires. `trg_fn_soft_delete_unlinked_funding_history` et son déclencheur suppriment logiquement l’historique après le retrait de son dernier lien actif. `ar_ref_profileid` et le déclencheur d’inscription préservent l’identité partagée. |
| `0010_extensions` | `extensions.agency_enablement`, `extensions.stream_configuration`, `extensions.kv_entry`, `extensions.secret_entry` | Activation/configuration est unique par extension et agence/volet. La clé KV est unique sur `(extension_id, owner_type, owner_id, key)`. Le secret est pareillement délimité; texte chiffré, IV, étiquette d’authentification et version de clé sont stockés, jamais le texte clair. |

## Moteurs polymorphes (`0007`)

`0007_polymorphic_common_tp` crée `Common_Entity`, le vocabulaire `Entity_Type`, `register_entity()`, les déclencheurs d’inscription des volets, examens et recommandations, ainsi que les clés composées qui lient un identifiant à son type exact. Elle matérialise aussi les graphes de conception/exécution des examens (schémas de revue, listes de contrôle et évaluations, versions, ensembles et membres, réponses, résultats et réviseurs supplémentaires), recommandations, approbations, achèvements, flux et affectations d’équipe à une entité exacte. `copy_legacy_rows` déplace les anciens dossiers pendant la migration; ce n’est pas une API d’exécution.

Les contraintes `ay_ref_profilegwcoanumber`, `tp_ref_streamid` et `cn_ref_*` lient les identités d’agence/programme et les chaînes typées. Les contraintes `cn_chk_*` restreignent les types légaux et les noms d’approbations supplémentaires. `Common_Review_Setup` doit reprendre le type de son ensemble et l’exécution épingle la version du schéma.

La famille d’approbation — `trg_fn_autopopulate_self_approval`, `trg_fn_enforce_approval_sequence`, `trg_fn_enforce_assigned_user_actions`, `trg_fn_lock_actioned_approval`, `trg_fn_lock_approval_on_terminal_slip`, `trg_fn_require_actual_delegation_detail`, `trg_fn_require_certifications`, `trg_fn_routingslip_forward_status`, les deux fonctions d’instantané du bordereau et `trg_fn_validate_added_step_sequence` — est attachée par les déclencheurs `trg_*` correspondants. Elle peuple l’auto-approbation, impose l’ordre et l’utilisateur assigné, fige les décisions, exige délégation et attestations, fait avancer le bordereau, instantanéise la politique et encadre les étapes insérées. `trg_fn_cascade_routingslip_status` propage l’état terminal.

L’intégrité des revues/recommandations repose sur les contrôles de sous-type, le verrouillage des versions publiées et `trg_fn_reset_additional_reviewer_completion`. `trg_fn_enforce_completion_audit_fields` garde cohérents valeur, auteur et date d’achèvement. `trg_fn_validate_workflow_setup` exige que les paramètres référencés concordent avec la portée et la cible du flux. Chaque fonction nommée est associée au déclencheur de même suffixe inscrit au registre.

## Agrégat d’entente (`0009`)

La racine est `Funding_Case_Agreement_Profile`. Ses enfants couvrent bénéficiaires/adresses; modifications et versions de budget/activités/révisions; exercices, postes budgétaires, activités, résultats et responsables; prévisions, réclamations, rapprochements, engagements et paiements avec leurs lignes; ainsi que surveillances, planification, éléments, constatations, suivis, mises à jour et pratiques prometteuses. Le registre d’audit énumère chaque table physique.

Entente, modification, prévision, rapprochement, engagement, paiement et surveillance reçoivent une identité `Common_Entity` par les déclencheurs `trg_register_*`. `uuid_generate_v7` fournit les identifiants ordonnés des révisions si PostgreSQL ne l’offre pas nativement. `trg_fn_create_agreement_working_versions` crée les versions de travail initiales. `trg_fn_validate_agreement_revision` exige que modification, recommandation, versions de budget et d’activités appartiennent à la même entente et au bon contexte de cycle de vie.

La famille `trg_fn_resolve_*` et ses déclencheurs dérivent — sans faire confiance à l’appelant — versions courantes, identité du poste budgétaire, entente des lignes de réclamation/prévision, réclamation d’une ligne rapprochée, portée d’une ligne d’engagement, entente du paiement et engagement de sa ligne. Les contrôles de racine refusent les croisements d’entente. Les déclencheurs de modification exigent une configuration du volet de l’entente.

Les montants sont `numeric(19,2)`, retenues/pourcentages `numeric(5,2)` et risque `numeric(8,2)`. `fc_enforce_commitment_program_funding_total`, invoquée par les familles de déclencheurs des postes, versions et engagements, empêche les affectations actives de dépasser le financement de programme correspondant. Un abaissement ultérieur du budget ne contourne donc pas l’invariant.

## Vérification et différences de moteur

Le test de schéma canonique migre une base PGlite neuve et inventorie tables, énumérations, colonnes, index, contraintes, fonctions et déclencheurs. Les tests ciblés vérifient sous-types/versions de revue, paires polymorphes, états d’approbation, propriété/versionnement d’entente et totaux financiers. Les suites PostgreSQL vérifient en plus les courses et verrous entre connexions; elles exigent une URL de test PostgreSQL et ne sont pas impliquées par une réussite PGlite.
