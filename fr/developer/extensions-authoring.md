# Création d’extensions

Une extension est un paquet de code qui ajoute des fonctions à un déploiement GCS-SSC, comme des onglets, des champs, des calculateurs de paiement ou des boutons d’action. GCS-SSC repère le paquet pendant la compilation Nuxt. Les extensions permettent d’ajouter des fonctions sans modifier les écrans principaux des autres déploiements.

Cette référence décrit les contrats publics pour les développeurs d’extensions. Pour la configuration dans l’application, consultez [Extensions](../concepts/extensions.md) et les onglets Extensions des agences et des volets.

## Contrat de création

L’hôte est l’application GCS-SSC principale. La trousse de développement logiciel, ou SDK, fournit les types, les fonctions et les composants pris en charge pour les extensions. Ces contrats publics précisent ce que l’hôte et l’extension doivent fournir, sans dépendre du code interne de l’hôte.

Importez les contrats du SDK depuis `@gcs-ssc/extensions`, les aides serveur depuis `@gcs-ssc/extensions/server`, les composants d’interface depuis `@gcs-ssc/extensions/ui` et les aides de test depuis `@gcs-ssc/extensions/testing`. N’importez pas les chemins internes de l’hôte comme `~~/server`, `~~/shared`, `~/` ou `#imports` pour les contrats appartenant à l’extension.

Pour la vérification autonome des types Nuxt, importez `@gcs-ssc/extensions/nuxt` une seule fois depuis un fichier ambiant `.d.ts` inclus dans la configuration TypeScript de l’extension. Ce point d’entrée fournit les déclarations de types des variables globales de l’hôte; le code d’interface à l’exécution doit continuer d’utiliser les composants du SDK et ne doit pas référencer directement les noms de composants de l’hôte.

| Contrat | Utilisation |
| --- | --- |
| `defineGcsExtension` | Définit le manifeste de l’extension. |
| `GCS_EXTENSION_SDK_VERSION` | Indique la version actuelle du SDK de l’hôte pour vérifier la compatibilité du manifeste. |
| `GcsExtensionJsonConfig` | Définit la structure JSON de la configuration du volet. |
| `GcsClientExtensionManifest` | Définit le manifeste sécurisé côté client transmis aux composants d’interface de l’extension. |
| `ExtensionEntityTabContext` | Définit les propriétés des composants d’onglet d’entité. |
| `defineGcsExtensionRouteHandler` | Adapte une route au contexte de requête stable du SDK. |
| `defineGcsExtensionNitroPlugin` | Définit un module d’extension Nitro sans importer les variables globales de l’hôte. |
| `defineGcsExtensionMigration` | Encapsule les migrations Kysely appartenant à l’extension. |
| `registerGcsExtensionCreateOperationHandler` | Se raccorde aux opérations principales de création d’engagements ou de paiements. |
| `createGcsExtensionUserError` | Génère, depuis le code serveur, des erreurs d’extension localisées et visibles par l’utilisateur. |
| Aides KV | Stockent l’état non secret de l’extension selon le type de propriétaire, son identifiant et la clé. |
| Aides de secrets chiffrés | Stockent les valeurs sensibles dans le stockage chiffré géré par l’hôte. |
| Composants et clients d’interface | Affichent l’interface de l’hôte de façon sécuritaire et appellent les API de l’extension ou de l’hôte depuis les composants de l’extension. |

## Structure d’un paquet

Un paquet d’extension regroupe sa déclaration, ses écrans, son code serveur et ses tests. Une extension type comprend les éléments suivants :

| Fichier ou dossier | Rôle |
| --- | --- |
| `extension.config.ts` | Manifeste requis exporté avec `defineGcsExtension`. |
| `components/` | Composants Vue pour la configuration administrative, les emplacements d’exécution, les onglets d’entité, les actions de création ou les calculateurs. |
| `server/api/` | Gestionnaires serveur de l’extension exposés par le répartiteur de l’hôte. |
| `server/migrations/` | Migrations appartenant à l’extension. |
| `server/plugins/` | Modules Nitro pour les hooks d’opération de création. |
| `server/runtime.ts` | Résolveur d’exécution facultatif qui peut déterminer dynamiquement l’activation des emplacements. |
| `client/` ou dossier d’actifs | Fichiers statiques montés par le manifeste de l’extension. |
| `i18n/` | Fichiers facultatifs de messages en anglais et en français. |
| `tests/` | Tests unitaires de l’analyse de configuration, des aides de route, de l’interface et de la logique opérationnelle. |

## Champs du manifeste

Le **manifeste** est le fichier de déclaration de l’extension. Il indique à l’hôte son identité, les fonctions nécessaires et l’emplacement de ses composants. Par exemple, une extension qui ajoute des notes de risque à une entente a besoin d’un onglet et d’une route serveur pour enregistrer les notes; les deux doivent être déclarés.

```ts
import { defineGcsExtension } from '@gcs-ssc/extensions'

export default defineGcsExtension({
  key: 'gcs-example',
  sdkVersion: '^0.3.19',
  requiredHostCapabilities: [
    'stream-config-modal',
    'server-handlers',
    'server-handler-rbac',
    'extension-api-client'
  ],
  name: { en: 'Example', fr: 'Exemple' },
  description: {
    en: 'Adds local behaviour.',
    fr: 'Ajoute un comportement local.'
  }
})
```

| Champ | Règle |
| --- | --- |
| `key` | Clé stable de l’extension. Utilisez le format kebab-case en minuscules et ne la modifiez jamais après la création de données. |
| `sdkVersion` | Plage de versions compatibles requise pour le SDK, par exemple `^0.3.19`. L’hôte rejette les versions non prises en charge. |
| `requiredHostCapabilities` | Liste requise des capacités de l’hôte utilisées par le manifeste ou la mise en œuvre. Utilisez une liste vide seulement si aucune capacité n’est nécessaire. Consultez ci-dessous les limites de la déduction lors de la découverte. |
| `name` | Nom bilingue requis. |
| `description` | Description bilingue facultative destinée aux écrans d’administration. |
| `admin` | Composants de configuration de l’agence, de la fenêtre modale du volet ou de la page du volet. |
| `client` | Emplacements d’exécution, onglets d’entité, actions de création et calculateurs de paiement. |
| `css`, `assets` | Styles et actifs facultatifs. Les messages appartiennent à un catalogue SDK de l’extension, pas à une contribution `i18n` du manifeste. |
| `serverHandlers` | Routes authentifiées de l’extension exposées par le répartiteur de l’hôte. |
| `migrations` | Migrations Kysely exécutées lorsque l’extension est activée ou que les migrations sont demandées. |
| `runtime` | Résolveur facultatif de l’activation et de la configuration des emplacements. |
| `nitroPlugin` | Module serveur facultatif pour les hooks, comme l’interception d’une opération de création. |

L’hôte vérifie les chemins des composants, des gestionnaires, des actifs et des migrations pour s’assurer qu’ils demeurent dans le paquet de l’extension.

## Capacités prises en charge

Une **capacité** est une fonction de l’hôte dont l’extension a besoin. Déclarez chaque capacité requise. Lors de la découverte Nuxt, l’hôte repère les fonctions décrites par les champs `admin`, `client`, `serverHandlers`, `migrations`, `runtime`, `assets` et `nitroPlugin` du manifeste. Il rejette les fonctions nécessitant une capacité non déclarée ainsi que les capacités inconnues.

L’hôte n’inspecte pas les importations ou les appels de fonctions. Déclarez aussi les capacités utilisées uniquement dans le code, comme les clients API, les aides KV, les aides de secrets et les hooks d’opération de création.

| Capacité | Utilisation |
| --- | --- |
| `configuration-access` | Fixer le rôle minimal de configuration à Contributeur ou Gestionnaire. |
| `agency-only-configuration` | Configurer au niveau organisme, sans éditeur de volet. |
| `file-storage-provider` | Enregistrer l’adaptateur de stockage et son contrat de métadonnées. |
| `agreement-number-provider` | Générer un numéro dans la transaction hôte de création d’entente. |
| `agency-config` | Composant de configuration administrative d’une agence. |
| `stream-config-modal` | Configuration du volet affichée dans la fenêtre modale Extensions du volet. |
| `stream-config-page` | Route de configuration pleine page au moyen de `admin.streamConfigPage`. |
| `entity-tabs` | Onglets d’entente, de promoteur, de réclamation, de surveillance, de possibilité ou de paiement. |
| `textarea-slots` | Composants d’emplacement d’exécution dans les zones prises en charge des pages de l’hôte. |
| `create-actions` | Actions de création d’engagements ou de paiements d’une entente. |
| `payment-amount-calculators` | Composants de calcul du montant des paiements. |
| `server-handlers` | Routes API de l’extension sous `/api/extensions/{extensionKey}`. |
| `server-handler-rbac` | Contexte d’entité et contrôle d’accès en fonction des rôles résolus par l’hôte pour les gestionnaires serveur. |
| `migrations` | Migrations appartenant à l’extension. |
| `runtime-resolution` | Résolveur d’exécution de l’extension pour la disponibilité et la configuration des emplacements. |
| `public-assets` | Actifs statiques montés par l’hôte. |
| `extension-ui` | Composants d’interface et composants d’exécution fournis par l’hôte. |
| `extension-api-client` | `useExtensionApi` ou aides du client API de l’extension. |
| `host-api-client` | `useHostApi` ou aides stables du client API de l’hôte. |
| `extension-kv` | Aides clé-valeur de l’extension pour l’état JSON non secret. |
| `extension-secrets` | Aides de secrets chiffrés de l’extension. |
| `extension-create-operation-hooks` | Hooks Nitro d’opération de création. |
| `extension-lifecycle-hooks` | Hooks de cycle de vie et de création exposés par l’intégration des extensions. |
| `lifecycle-entities` | Entités opérationnelles d’extension qui participent aux mécanismes hôtes d’achèvement, de flux, d’examen direct, d’affectation et d’identité typée. |

## Déclarations d’entités de cycle de vie

Une **entité de cycle de vie** est un dossier créé par une extension qui utilise les règles d’achèvement, d’approbation et d’affectation de l’hôte. Par exemple, un dossier appartenant à une extension peut devoir être achevé et approuvé dans le cadre d’une entente. L’extension décrit le dossier; l’hôte contrôle les permissions et consigne l’historique du cycle de vie.

Utilisez les contrats de cycle de vie du SDK lorsqu’une entité opérationnelle de l’extension a besoin de la gestion du cycle de vie par l’hôte. Ajoutez `lifecycle-entities` à `requiredHostCapabilities`. Chaque type local déclare :

- Des libellés bilingues non vides.
- `completion` défini à `supported` ou `none`.
- `approvalSubmission` défini à `on_completion` ou `none`.
- `standardWorkflow: 'explicit'` et la prise en charge des examens directs.
- `ownerKind` défini à `agreement` ou `proponent`.
- `assignmentMode` défini à `independent` ou `inherited`.
- Le chemin d’un adaptateur serveur dans le paquet.

L’hôte identifie chaque type par `<extension-key>:<local-type>` : deux extensions peuvent ainsi utiliser le même nom de type local sans partager une identité.

L’adaptateur résout et verrouille l’entité concrète, son propriétaire, sa portée et son état opérationnel, puis implémente la validation d’achèvement et tout effet requis lorsque le processus se termine avec succès. Cet effet doit produire le même résultat à partir des mêmes données. L’adaptateur n’autorise pas les requêtes, ne choisit pas l’ordre des verrous, n’affaiblit pas le modèle déclaré de propriété ou d’affectation et ne crée pas lui-même les preuves de cycle de vie. L’installation synchronise la déclaration immuable dans `Common_Entity_Type`; une migration de l’extension utilise ensuite `attachGcsLifecycleEntityIdentity(...)` pour rattacher sa table concrète à `Common_Entity`. Renommer ou modifier une déclaration installée est refusé tant que des identités ou un historique existent.

La lecture hôte exige Lecteur auprès du propriétaire résolu. La création exige Contributeur et l’affectation au parent de création déclaré. La modification, l’achèvement, le démarrage, la reprise ou l’annulation d’un flux et la transition exigent Contributeur et la racine d’affectation exacte déclarée. La suppression exige Gestionnaire et cette affectation.

Une entité indépendante crée sa liste d’affectation, avec le créateur comme utilisateur principal, dans la même opération que le dossier. Une entité héritée résout chaque fois la liste d’affectation de son parent. L’activation de l’extension demeure une barrière supplémentaire.

La gestion de la liste d’affectation exige le rôle Gestionnaire dans la portée, sans exiger que ce gestionnaire soit affecté au dossier. L’hôte refuse les changements après la création d’une preuve d’achèvement ou lorsque le statut est en lecture seule ou terminal. Cette exception ne donne aucun droit de modification ordinaire du dossier.

L’achèvement consigne `not_applicable`, `no_workflow` ou `workflow_started` au moment de sa création. L’absence d’un flux obligatoire produit un conflit et annule la transaction; un achèvement `no_workflow` ne peut recevoir un flux plus tard. Une reprise crée une nouvelle tentative utilisant les mêmes versions publiées que la tentative précédente. Les hooks de fin réussie du processus (terminaison positive) s’exécutent dans la transaction hôte après `no_workflow`, `succeeded` ou `approved`; ils doivent être déterministes, sûrs à réessayer et exempts d’effets externes impossibles à annuler.

## Portée et accès de configuration

La version du SDK public utilisée ici est 0.3.19. Déclarez `configuration-access` pour définir `configurationAccess` à `contributor` ou `manager`; Contributeur est la valeur par défaut. Cela fixe le rôle minimal requis pour activer l’extension et modifier sa configuration JSON. Les permissions pour le travail courant et les affectations exactes aux dossiers sont vérifiées séparément.

Une extension `configurationScope: 'agency'` déclare `agency-only-configuration`. Elle possède seulement l’activation et la configuration d’organisme et ne peut déclarer d’éditeur de volet. Cela convient à une numérotation d’organisme partagée entre volets. Sans cette déclaration, le modèle organisme-plus-volet reste applicable.

## Contrat de fournisseur de stockage

Un **fournisseur de stockage** relie l’application au service qui conserve les fichiers téléversés, les modèles et les documents générés. Les agents continuent d’utiliser les écrans et les permissions de pièces jointes de l’hôte. Le fournisseur assure le stockage derrière ces écrans; il ne décide pas qui peut accéder à un fichier.

Déclarez `file-storage-provider` et une contribution `fileStorageProvider`. La clé d’extension est l’identité permanente du fournisseur; ne la renommez pas après avoir stocké des objets.

```ts
// Fragment dans defineGcsExtension(...)
fileStorageProvider: {
  adapter: { path: './server/storage.ts' }
}
```

L’export par défaut utilise `defineGcsFileStorageProviderAdapter` du SDK serveur. Implémentez `writeObject`, `readObject` et `deleteObject`; normalisez facultativement la configuration avec `validateAgencyConfig`.

| Opération | Contrat |
| --- | --- |
| Écrire | Recevoir nom généré par l’hôte, octets, type de contenu, organisme, objet, cible typée facultative, configuration, lecteur de secrets et métadonnées facultatives. Retourner `{ objectId, locator }`. |
| Lire | Résoudre l’identité et le localisateur enregistrés (les renseignements propres au fournisseur permettant de retrouver l’objet) et retourner `{ bytes, contentType? }`. Ne pas dépendre d’un autre fournisseur actuellement sélectionné. |
| Supprimer | Réussir si l’objet est déjà absent. Le nettoyage peut se répéter après une interruption ou expiration du bail. |

Les identités d’objet sont des chaînes stables non vides d’au plus 512 octets UTF-8, pas des URL temporaires. L’hôte limite le localisateur JSON réservé au serveur à 32 Kio et les métadonnées à 15 Kio. Ne mettez pas d’identifiants secrets dans les métadonnées navigateur et ne supposez pas que le nom est un chemin local. Les objets d’usage sont `attachment`, `document-template` et `generated-document`.

L’hôte gère les métadonnées des pièces jointes, les liens vers les cibles typées, les autorisations, les affectations et les protections liées au statut opérationnel. Le fournisseur gère uniquement ses opérations de stockage et le comportement déclaré de ses métadonnées. Aucun repli local n’existe si le fournisseur sélectionné ou enregistré est indisponible. L’organisme sélectionne un fournisseur pour les nouvelles écritures; les objets existants restent liés au fournisseur qui les a stockés. Les gardes empêchent de désactiver un fournisseur sélectionné ou référencé; le démarrage rejette une implémentation référencée absente.

La contribution facultative `metadata` déclare un composant client, le chemin d’un validateur serveur, `persistence` (`host` ou `provider`), `mutability` (`upload-only` ou `editable`) et un entier positif `contractVersion`. Les valeurs stockées par l’hôte sont conservées séparément pour chaque fournisseur. La persistance fournisseur exige `readProviderMetadata` et `updateProviderMetadata`. Les mises à jour exigent un contrat enregistré compatible et ne mélangent pas champs hôte et métadonnées fournisseur dans un même PATCH. Avant une modification externe, l’hôte réserve un travail de récupération pour rétablir l’état précédent si l’enregistrement en base échoue. Voir [Pièces jointes](../concepts/attachments.md) et [Travail en arrière-plan](../operator/background-work.md).

## Contrat de fournisseur de numéros d’entente

Ce fournisseur remplit le numéro d’entente lors de sa création. Par exemple, un organisme peut utiliser la séquence `ABC-0000123` dans ses volets pour que les agents n’aient pas à saisir les numéros manuellement. Le développeur doit assurer une attribution sûre lorsque deux agents créent des ententes en même temps.

Déclarez `agreement-number-provider` et `agreementNumberProvider: { path: './server/number.ts' }`. L’export par défaut implémente `GcsAgreementNumberProvider` et retourne seulement le numéro. L’hôte autorise encore la création, valide le profil, résout programme/volet et promoteurs, crée l’entente et affecte son auteur.

Le fournisseur reçoit la transaction hôte active, `agencyId`, `programId`, `streamId`, les configurations de volet et d’organisme et les `sources` stables de création. Les noms incluent `agreement.title_en`, `agreement.title_fr`, les dates d’aide, le numéro financier et les noms/abréviations bilingues de l’organisme, du programme et du volet. Les langues sont explicites et ne dépendent pas de la langue de requête.

Le résultat doit être non vide, déjà nettoyé de ses espaces périphériques, d’au plus 15 caractères Unicode et sans NUL. Plusieurs fournisseurs actifs produisent `AGREEMENT_NUMBER_PROVIDER_CONFLICT`; un résultat invalide produit `INVALID_GENERATED_AGREEMENT_NUMBER`. Sans fournisseur, l’hôte conserve la numérotation manuelle. La recherche de mode est indicative; la création résout et valide de nouveau le fournisseur dans l’opération protégée.

Par exemple, un fournisseur peut allouer une séquence d’organisme dans la transaction et former `ABC-0000123`. Il doit assurer lui-même l’allocation concurrente; compter les ententes côté client ne suffit pas. Un fournisseur `configurationScope: 'agency'` s’applique aux volets de l’organisme sans activation distincte par volet. Compteur et interface de configuration relèvent de sa documentation propre.

## Configuration du volet

Utilisez `admin.agency` lorsque l’extension nécessite des paramètres non secrets à l’échelle de l’agence :

```ts
admin: {
  agency: {
    path: './components/ExampleAgencyConfig.vue'
  }
}
```

Les composants de configuration de l’agence reçoivent la configuration JSON actuelle avec `v-model`, ainsi que les propriétés `extension` et `agencyId`. Stockez les valeurs sensibles au moyen des gestionnaires serveur de l’extension et des aides de secrets chiffrés plutôt que dans la configuration de l’agence.

Utilisez `admin.streamConfig` lorsque l’extension nécessite un composant de configuration du volet dans une fenêtre modale (une boîte de dialogue au-dessus de la page actuelle) :

```ts
admin: {
  streamConfig: {
    path: './components/ExampleStreamConfig.vue'
  }
}
```

Utilisez `admin.streamConfigPage` lorsque la configuration nécessite une page complète réservée à cette fin :

```ts
admin: {
  streamConfigPage: {
    path: './components/ExampleStreamConfigPage.vue'
  }
}
```

Les composants de configuration du volet reçoivent la configuration JSON actuelle avec `v-model` et les propriétés du contexte du volet :

```vue
<script setup lang="ts">
import type { GcsExtensionJsonConfig } from '@gcs-ssc/extensions'
import type { GcsStreamConfigComponentProps } from '@gcs-ssc/extensions/ui'

defineProps<GcsStreamConfigComponentProps>()

const config = defineModel<GcsExtensionJsonConfig>({ required: true })
</script>
```

Les composants pleine page reçoivent aussi `hostLayout: true` et peuvent utiliser l’espace de la page pour une configuration complexe. Les composants de fenêtre modale devraient conserver une présentation compacte.

| Règle | Comportement |
| --- | --- |
| La configuration doit être compatible avec JSON | Stockez uniquement des valeurs primitives, des tableaux et des objets. |
| La configuration n’est pas un stockage de secrets | Stockez des références aux identifiants, et non les valeurs des identifiants. Utilisez les aides de secrets chiffrés pour les secrets. |
| L’activation de l’agence vient en premier | La configuration du volet n’est pas disponible tant que l’extension n’est pas activée pour l’agence. |
| Les composants doivent accepter les identifiants facultatifs | Les contextes plus anciens ou qui ne proviennent pas d’une page peuvent omettre `transferPaymentId` ou `agencyId`. |
| La validation précède l’enregistrement | Rejetez les combinaisons incomplètes dans le composant ou lors de la validation côté serveur de la configuration du volet. |
| La configuration doit pouvoir être versionnée | Ajoutez des champs de version explicites lorsque sa structure peut changer. |

## Emplacements d’exécution

Un **emplacement** est une zone d’une page existante de l’hôte où une extension peut afficher son propre composant. Par exemple, l’emplacement de gestion du risque peut montrer des champs supplémentaires à côté des renseignements de risque existants de l’entente. Les noms d’emplacement pris en charge sont les suivants :

| Emplacement | Zone de l’hôte |
| --- | --- |
| `textarea.after` | Emplacement générique après une zone de texte. |
| `agreement.descriptions.after` | Zone des descriptions française et anglaise d’une entente. |
| `agreement.profile.classification.fields` | Section Classification du profil d’une entente. |
| `agreement.profile.profile.fields` | Section Profil d’une entente. |
| `agreement.profile.risk-management.fields` | Section Gestion du risque du profil d’une entente. |
| `agreement.profile.sections.after` | Zone située après les sections du profil d’une entente. |
| `proponent.descriptions.after` | Zone des descriptions française et anglaise d’un promoteur. |
| `bilingual-field.after` | Champs bilingues à portée explicite avec modèles actifs, libellés et contexte d’autorisation. |
| `payment.evidence` | Preuve du paiement avec données retenues et accès effectif. |

```ts
client: {
  slots: [
    {
      slot: 'agreement.profile.risk-management.fields',
      path: './components/AgreementRiskFields.vue'
    }
  ]
}
```

Les composants d’emplacement devraient rester discrets et ne pas reproduire les champs appartenant à l’hôte. Lorsqu’un emplacement écrit des données appartenant à l’extension, stockez-les sous la clé de l’extension afin que plusieurs extensions ne puissent pas remplacer leurs données respectives.

## Onglets d’entité

Un onglet d’entité donne aux agents une vue distincte sur un dossier existant, comme l’onglet Notes de risque ci-dessous. Les onglets d’entité peuvent cibler `agreement`, `proponent`, `claim`, `monitor`, `opportunity` ou `payment`. Une possibilité utilise le sujet `transfer_payment`; un paiement reste dans le domaine `agreement`.

```ts
client: {
  tabs: [
    {
      target: 'agreement',
      id: 'risk-notes',
      label: { en: 'Risk notes', fr: 'Notes de risque' },
      icon: 'i-lucide-database',
      path: './components/AgreementRiskNotesTab.vue',
      rbac: { subject: 'agreement', action: 'update' }
    }
  ]
}
```

Les composants d’onglet reçoivent les propriétés suivantes :

| Propriété | Contenu |
| --- | --- |
| `extensionKey` | Clé de l’extension provenant du manifeste. |
| `context` | Le contexte dépend du type de cible. Les cibles ordinaires incluent l’organisme, le propriétaire et la portée résolus. Le promoteur inclut `applicantRecipientId`, l’identité du propriétaire et une liste `agencies` autorisée, sans organisme/portée unique. |
| `config` | Configuration résolue de l’extension pour le volet ou l’agence. |
| `rbac` | Exigence de contrôle d’accès en fonction des rôles déclarée par l’onglet. |

| Règle | Comportement |
| --- | --- |
| Les identifiants d’onglet sont uniques pour chaque cible | Utilisez des identifiants en minuscules au format kebab-case. |
| Les onglets nécessitent l’activation | Les onglets d’entente, de réclamation et de surveillance nécessitent l’activation pour l’agence et le volet; les onglets de promoteur nécessitent l’activation pour l’agence. |
| Les onglets nécessitent un contrôle d’accès | Avant l’affichage, l’hôte vérifie le sujet et l’action déclarés. |
| Contextes d’organisme du promoteur | L’hôte retourne les organismes actifs autorisés avec activation/configuration dans `context.agencies`; aucun sélecteur d’organisme responsable n’est requis. `agencyReadRequired` peut restreindre davantage la disponibilité. |

## Frontière d’interface du SDK

Les composants d’interface du SDK sont des versions prises en charge des composants de l’hôte. Les composables sont des fonctions réutilisables pour charger des données ou afficher une notification, par exemple.

Importez les composants et les composables fournis par l’hôte depuis `@gcs-ssc/extensions/ui`. N’importez pas `~/`, `~~/`, `#imports`, `#app` ou `#gcs-*`, et n’utilisez pas directement les noms de composants de l’hôte dans un gabarit d’extension. Des composants comme `ExtensionButton`, `ExtensionFormField`, `ExtensionSaveButton` et `ExtensionTable` préservent le comportement de l’hôte derrière un contrat versionné.

Les exportations courantes comprennent `ExtensionButton`, `ExtensionFormField`, `ExtensionInput`, `ExtensionSelect`, `ExtensionTable`, `ExtensionResourceLayoutCard`, `ExtensionSection`, `ExtensionSaveButton` et `ExtensionStatusBadge`.

Utilisez `useExtensionApi(extensionKey)` pour les routes de l’extension et `useHostApi()` pour les routes stables de l’hôte. Déclarez `extension-api-client` ou `host-api-client` dans `requiredHostCapabilities`, selon le cas; ne construisez pas d’URL `/api` et n’appelez pas `fetch` directement dans les composants. Le point d’entrée de l’interface fournit aussi des intégrations typées :

| Aide | Contrat |
| --- | --- |
| `useExtensionConfirmDialog` | Options de confirmation asynchrones typées et résultat booléen. |
| `useExtensionFetch<T>` | Références réactives aux données, à l’état, à l’attente, aux erreurs et au rafraîchissement. |
| `useExtensionGroupedTableExpansion<Row>` | État partagé des groupes, des développements, des lignes et de la visibilité. |
| `useExtensionI18n(messages)` / `useExtensionToast` | Messages propres à l’extension avec langue et formatage numérique de l’hôte, et notifications. |

L’hôte installe l’environnement d’exécution concret de l’interface. Les tests autonomes peuvent installer les substituts du SDK plutôt que de monter les composants internes de l’hôte.

## Gestionnaires serveur

Le **RBAC** est le contrôle d’accès en fonction des rôles : l’hôte vérifie si le rôle de l’utilisateur permet l’action déclarée sur le dossier concerné. Afficher un onglet ou un bouton ne remplace pas cette vérification côté serveur.

Un gestionnaire serveur reçoit une requête d’un écran d’extension et effectue le travail côté serveur, comme enregistrer une note de risque. Un point de terminaison est l’adresse utilisée pour envoyer cette requête. Utilisez `serverHandlers` pour les points de terminaison authentifiés de l’extension :

```ts
serverHandlers: [
  {
    route: '/agreements/[agreementId]/risk-notes',
    method: 'post',
    path: './server/api/risk-notes.post.ts',
    rbac: {
      subject: 'agreement',
      action: 'update',
      entity: {
        target: 'agreement',
        param: 'agreementId'
      }
    }
  }
]
```

Les fichiers de gestionnaire devraient utiliser `defineGcsExtensionRouteHandler` :

```ts
import { defineGcsExtensionRouteHandler } from '@gcs-ssc/extensions/server'

export default defineGcsExtensionRouteHandler(async ({ db, params, config, entity, readBody }) => {
  const body = await readBody<{ note?: string }>()
  return { ok: true, agreementId: params.agreementId, config, entity, body, dbAvailable: Boolean(db) }
})
```

Le contexte de route stable contient `db`, `params`, `auth`, `config`, `entity`, `stream`, `agency`, `authorizedScope`, `writeAuthorization`, `agreementAccess`, `readBody` et `getHeader`. `context.event` demeure disponible comme solution de dernier recours, mais les gestionnaires ordinaires ne devraient pas lire directement les éléments internes H3 de l’hôte.

| Règle | Comportement |
| --- | --- |
| Déclarer le contrôle d’accès pour les données d’entité | L’hôte résout l’entité à partir du paramètre de route, vérifie l’activation de l’extension, transmet la configuration et le contexte, puis applique le sujet et l’action déclarés. |
| Conserver des paramètres de route explicites | La valeur `entity.param`, `stream.param` ou `agency.param` doit correspondre au nom d’un paramètre de route. |
| Utiliser `auth: "manual"` seulement de façon intentionnelle | Les gestionnaires manuels doivent effectuer leur propre autorisation de domaine; ils ne peuvent pas combiner `auth: "manual"` avec `rbac`. |
| Lancer `GcsExtensionUserError` pour les échecs visibles par l’utilisateur | Fournissez les messages bilingues propres à l’extension; le serveur sélectionne la langue de la requête avant de retourner l’erreur. |
| Valider toutes les entrées | Les gestionnaires de l’extension sont responsables de la validation des requêtes. |
| Respecter les règles de propriété de l’hôte | Résolvez toujours la propriété de l’entente, du promoteur, de la réclamation, de la surveillance, du volet et de l’agence avant l’écriture lorsque l’hôte ne l’a pas déjà fait. |

Les gestionnaires manuels qui résolvent la propriété d’un volet doivent appeler `resolveExtensionStreamContext(db, streamId)` pour résoudre la chaîne de propriété active. Cette aide retourne `agencyId`, `profileId`, `streamId` et la portée d’entité canonique uniquement lorsque le volet, son profil de paiement de transfert et l’agence propriétaire sont tous actifs ; traitez `null` comme une ressource indisponible et interrompez l’opération.

Les écritures protégées d’une extension utilisent le protocole `writeAuthorization` fourni par l’hôte. Il vérifie les permissions actuelles en deux phases. Les verrous des tables de permissions précèdent ainsi les verrous de l’extension ou de l’entité, et une requête peut être refusée si l’accès change pendant l’attente. Un gestionnaire d’écriture doit rejeter l’absence de ce protocole avant d’exécuter sa logique transactionnelle :

```ts
import { defineGcsExtensionRouteHandler } from '@gcs-ssc/extensions/server'

export default defineGcsExtensionRouteHandler(async context => {
  const writeAuthorization = context.writeAuthorization
  if (!writeAuthorization) {
    throw new Error('Une autorisation transactionnelle de l’extension est requise pour cette écriture.')
  }

  // Dans la transaction de l’extension :
  // await writeAuthorization.lockAuthState(trx)
  // Acquérez les verrous du cycle de vie de l’agence et du volet, puis ceux des entités requises.
  // const authorizeCurrentScope = writeAuthorization.authorizeCurrentScope
  // if (authorizeCurrentScope) {
  //   await authorizeCurrentScope(trx)
  // } else {
  //   await writeAuthorization.authorizeCurrentEntity(trx)
  // }
  // Relisez l’état protégé et effectuez l’écriture seulement après les deux phases.
})
```

L’ordre requis est le suivant : `lockAuthState(trx)`, verrous enregistrés du cycle de vie de l’agence et du volet, verrous requis de l’extension et des entités, autorisation de la portée ou de l’entité actuelle, puis lectures et écritures protégées. Privilégiez `authorizeCurrentScope`; `authorizeCurrentEntity` demeure la solution de compatibilité. Traitez l’absence du protocole, le rejet d’une phase ou le changement de portée comme une erreur fatale et laissez l’erreur sortir de la fonction de rappel afin que toutes les écritures protégées soient annulées.

Les routes qui présentent des choix d’entente doivent appeler `context.agreementAccess.listVisibleOptions(db, { streamId, action })`; l’hôte applique la visibilité du rôle de portée pour la lecture et le rôle accompagné d’une affectation exacte pour la modification, puis retourne uniquement les ententes actives. Lorsqu’une transaction écrit un dossier appartenant à une entente choisie par une telle route, exigez `writeAuthorization.lockAndAuthorizeAgreement` et appelez-le après les verrous du cycle de vie et l’autorisation de la route actuelle. L’absence du rappel constitue une erreur fatale. L’hôte verrouille l’entente, résout de nouveau son volet actif et effectue une autorisation récente de l’entente dans la même transaction. Un résultat `false` signifie que l’entente est inactive ou qu’elle n’appartient plus au volet demandé; un refus d’autorisation produit une erreur.

## Actions de création

Une action de création est un bouton ou une commande qui lance la création. Par exemple, Générer les paiements peut ouvrir l’écran de création d’une extension dans l’onglet Paiements de l’entente. Les extensions peuvent ajouter ou remplacer les actions de création suivantes :

| Opération | Surface de l’hôte |
| --- | --- |
| `agreement.commitments.create` | Onglet Engagements d’une entente. |
| `agreement.payments.create` | Onglet Paiements d’une entente. |

```ts
client: {
  createActions: [
    {
      operation: 'agreement.payments.create',
      id: 'generate-payments',
      mode: 'replace',
      label: { en: 'Generate payments', fr: 'Générer les paiements' },
      icon: 'i-lucide-wand-sparkles',
      path: './components/GeneratePaymentsAction.vue',
      rbac: { subject: 'agreement', action: 'update' }
    }
  ]
}
```

| Mode | Comportement |
| --- | --- |
| `append` | Conserve le bouton Ajouter de l’hôte et ajoute l’action de l’extension à côté. |
| `replace` | Masque le bouton Ajouter de l’hôte lorsqu’un seul remplacement activé existe. |

Si plusieurs extensions activées remplacent la même opération, l’hôte bloque l’action jusqu’à ce que la configuration soit corrigée. Les composants d’action de création reçoivent l’opération, le contexte, la configuration, le libellé, l’icône, l’exigence de contrôle d’accès et une fonction de rappel `onCreated`. Appelez `onCreated()` après une création réussie afin que l’hôte actualise le tableau.

Un **hook** est du code que l’hôte appelle à un moment défini d’une opération. Les hooks d’opération de création côté serveur appartiennent à un module Nitro, chargé par le serveur de l’application :

```ts
import {
  defineGcsExtensionNitroPlugin,
  registerGcsExtensionCreateOperationHandler
} from '@gcs-ssc/extensions/server'

export default defineGcsExtensionNitroPlugin(nitroApp => {
  registerGcsExtensionCreateOperationHandler(
    'gcs-example',
    'agreement.payments.create',
    async context => ({ status: 'continue' }),
    nitroApp
  )
})
```

| Résultat du hook | Comportement |
| --- | --- |
| `continue` ou aucun résultat | La création principale se poursuit. |
| `handled` | L’extension fournit la réponse et la création principale s’arrête. |

Lorsqu’un hook de création bloque une action que l’utilisateur peut corriger, lancez `createGcsExtensionUserError` avec des valeurs bilingues pour `message` et `details`. L’hôte résout ces messages selon la langue de la requête et les retourne dans la structure normale des erreurs d’API.

## Calculateurs de montant des paiements

Les calculateurs de paiement fournissent un montant suggéré, un maximum, une devise, une explication, un état de chargement et des données d’extension pour `agreement.payments.create`. Par exemple, un calculateur peut expliquer le maximum avant que l’agent enregistre le paiement. Le serveur doit toujours valider le montant. Un seul calculateur activé peut s’appliquer à la création des paiements à la fois.

| Règle | Comportement |
| --- | --- |
| Le calculateur doit correspondre à l’opération | L’hôte actuel prend en charge la création des paiements d’une entente. |
| Le calculateur doit être unique pour l’opération | Les calculateurs activés en conflit bloquent le formulaire de l’hôte. |
| Le montant maximal est appliqué dans le formulaire | L’utilisateur ne peut pas enregistrer un montant supérieur au maximum établi par le calculateur. |
| La validation serveur demeure requise | Vérifiez de nouveau les montants générés avant d’écrire les dossiers. |

## Migrations, stockage KV et secrets

Une **migration** crée ou modifie les tables de base de données de l’extension. **KV** désigne le stockage clé-valeur : des valeurs simples enregistrées sous une clé. Un **secret** est une valeur sensible, comme le mot de passe d’un service externe ou un jeton d’API. Conservez les secrets dans le stockage chiffré, séparément des paramètres ordinaires.

```ts
import {
  defineGcsExtensionMigration,
  setEncryptedExtensionSecret,
  getEncryptedExtensionSecret,
  deleteEncryptedExtensionSecret
} from '@gcs-ssc/extensions/server'
```

| Stockage | Utilisation |
| --- | --- |
| Les migrations appartiennent à l’extension | Utilisez le schéma `extensions` et des noms de table propres à l’extension. |
| Les chemins des migrations figurent dans le manifeste | L’hôte exécute les migrations indiquées pour les extensions activées. |
| Les importations de paquets standards sont permises | Les fichiers de migration peuvent importer des dépendances d’exécution comme `kysely`; l’hôte les résout à partir de l’installation de l’application. |
| L’historique des migrations est propre à chaque extension | Chaque extension utilise ses propres tables d’historique et de verrouillage, de sorte que les migrations en attente sont suivies indépendamment. |
| Aides KV | Stockent un état JSON simple et non secret selon le type de propriétaire, son identifiant et la clé. Les entrées KV sont supprimées logiquement. |
| Aides de secrets chiffrés | Stockent des valeurs JSON sensibles comme des clés privées, des jetons d’API, des jetons d’actualisation, des secrets de signature ou des identifiants de services externes. |
| Privilégier des tables explicites pour les processus complexes | Utilisez des migrations lorsque l’extension nécessite des rapports, des relations, des états de processus ou de volumineux dossiers. |

Les secrets chiffrés utilisent la table `extensions.secret_entry` et le chiffrement AES-256-GCM. Les valeurs sont liées à la clé de l’extension, au type de propriétaire, à l’identifiant du propriétaire, à la clé du secret et à la version de la clé. Les métadonnées peuvent contenir des champs non sensibles destinés aux listes, comme un libellé ou un suffixe masqué.

La clé racine de chiffrement de l’hôte est `GCS_EXTENSION_SECRETS_KEY`, un secret de déploiement de 32 octets encodé en base64. Ne la stockez pas dans la configuration de l’extension, le stockage KV, le contrôle des versions, les données initiales des environnements réels ou la configuration d’exécution visible dans le navigateur.

Les aides de secrets chiffrés sont exportées depuis `@gcs-ssc/extensions/server` : `setEncryptedExtensionSecret`, `getEncryptedExtensionSecret` et `deleteEncryptedExtensionSecret`.

## Verrous et gardes du cycle de vie

Une **transaction** est un groupe de modifications en base de données qui réussissent ensemble ou sont annulées ensemble. Un **verrou** empêche des opérations incompatibles de modifier les données protégées au même moment. Une **garde** refuse une opération qui enfreindrait une règle métier. Par exemple, une garde peut bloquer la suppression d’une entente dont l’historique appartenant à l’extension doit rester disponible.

Les extensions qui génèrent des dossiers durables à partir de la configuration doivent se coordonner avec les changements de cycle de vie de l’hôte. Toutes les aides du cycle de vie nécessitent une `Transaction` Kysely active. Le passage d’un client `Kysely` racine provoque volontairement une erreur de type, car les verrous consultatifs transactionnels seraient libérés après chaque instruction.

Après `writeAuthorization.lockAuthState(trx)`, appelez `lockGcsExtensionLifecycleScope(trx, extensionKey, agencyId, streamId)` avant les verrous propres à l’extension ou à l’entité. L’ordre canonique du domaine est la portée de l’agence, la portée du volet, puis les verrous propres à l’extension ou à l’entité. Relisez la configuration après le verrouillage, appelez `authorizeCurrentScope(trx)` ou sa solution de compatibilité `authorizeCurrentEntity`, puis seulement ensuite lisez ou modifiez l’état protégé.

Enregistrez les hooks de cycle de vie depuis `defineGcsExtensionNitroPlugin` :

| Enregistrement | Utilisation |
| --- | --- |
| `registerGcsExtensionDisableGuard` | Refuse la désactivation à l’échelle de l’agence ou du volet lorsque l’état appartenant à l’extension nécessite encore son exécution. |
| `registerGcsExtensionAgreementLifecycleLock` | Acquiert les verrous d’entente de l’extension avant le verrou de ligne de l’hôte. |
| `registerGcsExtensionAgreementStreamChangeGuard` | Refuse le déplacement d’une entente vers un autre volet lorsque celui-ci invaliderait l’état appartenant à l’extension. |
| `registerGcsExtensionAgreementDeleteGuard` | Refuse la suppression d’une entente lorsque l’historique ou la provenance générée appartenant à l’extension doit être conservé. |
| `registerGcsExtensionAgreementPaymentMutationGuard` | Valide les modifications, les suppressions et les changements d’état des paiements et de leurs lignes dans les transactions de l’hôte. |

L’hôte exécute la garde de suppression d’une entente après l’acquisition des verrous du cycle de vie de l’extension et avant la suppression de l’entente, dans la même transaction de l’hôte. La garde doit lire l’état protégé de l’extension au moyen de la transaction fournie et lancer une erreur pour refuser la suppression; l’erreur se propage afin que la suppression de l’entente et toutes les écritures connexes soient annulées ensemble. Ne reportez pas la vérification et n’effectuez pas la requête au moyen d’un client de base de données racine.

Les gardes devraient lancer des erreurs d’extension localisées et visibles par l’utilisateur pour les conflits opérationnels qu’il peut corriger. Pour les mêmes données, les gardes doivent produire le même résultat. Elles doivent utiliser la transaction fournie et rester sûres lorsque les routes de l’hôte les appellent hors de l’interface de l’extension.

## Actifs et internationalisation

Les **actifs** sont les fichiers fournis avec l’extension, comme des images ou des fichiers de modèles. L’**internationalisation**, aussi appelée i18n, fournit la bonne langue et le bon format numérique. Les agents doivent recevoir des libellés et des erreurs compréhensibles en anglais et en français.

| Fonctionnalité | Champ du manifeste | Orientation |
| --- | --- | --- |
| Actifs statiques de l’extension | `assets` | Montez seulement les fichiers nécessaires à l’exécution et choisissez une valeur `baseURL` unique. |
| Actifs du paquet | `assets.package` et `packagePath` | Conviennent aux fichiers de modèles ou aux actifs de tiers regroupés dans le paquet. |
| Messages bilingues | Catalogue du paquet | Définir les mêmes clés françaises/anglaises avec `defineGcsExtensionMessages`, puis importer le catalogue. |
| CSS | `css` | Limitez la portée des styles et évitez de remplacer globalement les jetons de conception de l’hôte. |

### Messages propres à l’extension

```ts
import { defineGcsExtensionMessages } from '@gcs-ssc/extensions'
import { useExtensionI18n } from '@gcs-ssc/extensions/ui'

const messages = defineGcsExtensionMessages({
  en: { 'files.count': '{count} files' },
  fr: { 'files.count': '{count} fichiers' }
})
const { t, locale, n } = useExtensionI18n(messages)
const label = t('files.count', { count: 3 })
```

Le SDK vérifie que les deux langues ont exactement les mêmes clés de messages et paramètres, comme `{count}`. Il crée une copie indépendante et non modifiable du catalogue, puis recherche uniquement les clés de ce catalogue. Une clé ou valeur d’interpolation absente produit une erreur; aucun repli sur les clés hôte, message lié ou enregistrement global n’existe. Utilisez la langue réactive pour l’affichage et `n` pour les nombres. Les messages serveur et détails de `createGcsExtensionUserError` devraient fournir `{ en, fr }`; une chaîne simple est un texte déjà résolu, pas une clé hôte.

## Opérations externes bornées

Les lectures et mises à jour des métadonnées gérées par le fournisseur reçoivent le champ facultatif `signal` dans leur contexte d’opération.

L’hôte fixe une limite de temps pour certaines opérations d’extension, notamment les crochets de modification de profil de promoteur, la validation du stockage, la modification des métadonnées du fournisseur et leur restauration. `GCS_EXTENSION_OPERATION_TIMEOUT_MS` vaut 10 000 ms par défaut, avec un minimum de 100 ms. Le rappel reçoit un `AbortSignal`; transmettez-le aux opérations annulables et arrêtez le travail après l’annulation. Le délai interrompt l’attente de l’hôte, mais ne peut annuler de force un effet externe produit par un rappel qui ignore le signal.

Exécutez les gardes transactionnelles avec la transaction fournie, rendez les opérations distantes idempotentes (répéter la même requête ne doit pas produire un effet en double) et distinguez un échec d’écriture en base d’un résultat de fournisseur incertain. Un délai dépassé pendant une modification de promoteur retourne `EXTENSION_OPERATION_TIMEOUT` (503). Rechargez le dossier et rapprochez tout effet externe avant de réessayer; un délai dépassé ne prouve pas qu’un service distant n’a rien fait. Le rétablissement des métadonnées utilise la compensation décrite dans [Pièces jointes](../concepts/attachments.md). Cette limite ne s’applique pas universellement à chaque gestionnaire d’extension ni au rendu de documents.

## Espaces d’organisme et pages de détail

Un espace d’organisme regroupe les écrans d’une extension pour un organisme. Une page de détail montre un dossier sélectionné dans un onglet d’entente, comme une affectation financière. Ces écrans doivent conserver les règles de propriété et d’accès des dossiers qu’ils affichent.

Déclarez `agency-workspace` et `agency-workspace-navigation` avec `admin.agencyWorkspace` et un composant `admin.agency`. Fournissez un libellé bilingue, des onglets non vides avec identifiants minuscules uniques et libellés bilingues, et `navigation: { category: 'management', order: 40 }`. La catégorie doit être `management` ou `administration`, et l’ordre doit être un entier signé sûr. Les valeurs inférieures apparaissent en premier dans la catégorie. En cas d’égalité, l’identifiant stable `extension:<extension-key>` détermine l’ordre, indépendamment de la langue et de l’ordre de découverte. Une déclaration sans navigation fait échouer la compilation. L’hôte expose les organismes autorisés et conserve l’espace sélectionné lors du changement de langue; installation, activation et politique de configuration s’appliquent. Les écrans concrets de connecteur possèdent leur propre documentation.

L’hôte fournit aussi le cadre des détails de formulaire d’organisme à `/en/extension/[id]/agencies/[agencyId]/forms/[formId]` et `/fr/extension/[id]/agences/[agencyId]/formulaires/[formId]`. Leurs routes enfants `/flow` et `/parcours` sélectionnent la vue du parcours. `ExtensionsAgencyFormPage` exige un espace d’organisme accessible, une extension activée avec un onglet `forms` et son composant d’organisme enregistré. Un échec de lecture des espaces ou du registre affiche **Réessayer**. Si l’espace accessible, l’onglet de formulaires activé ou le composant manque, l’hôte affiche **Non disponible**.

Le cadre transmet `section="forms"`, `detail-form-id`, `form-flow-only` et `form-editor-view` au composant d’extension, avec les contextes d’organisme, d’extension, de configuration et de lecture seule. Le paramètre `view` accepte `test` ou `publish`. Toute autre valeur sélectionne `edit`. La route du parcours fixe `form-flow-only` à true. Les événements `form-flow` naviguent entre ces vues, `close-form` revient à la section `forms` de l’espace, et `form-collection-label` définit son libellé de fil d’Ariane. Un `formId` égal à `new` redirige vers cette collection. L’extension gère la modification, les essais, la publication et leur autorisation serveur. Ces routes ne définissent pas un modèle de formulaire appartenant à l’hôte.

Un onglet d’entente peut déclarer `detailPage: { path: './components/AllocationDetail.vue' }` et `entity-detail-pages`. L’hôte enregistre le composant et fournit le contexte de l’entente et les permissions du dossier dans son espace de détail partagé. Les autres cibles ne peuvent déclarer de page de détail. `agencyConfigVisibility` filtre la configuration sans autoriser le serveur. Conservez la résolution du propriétaire, les états de chargement et de reprise, et la section de l’URL entre la liste et le détail.

## Champs bilingues et preuves de paiement

Ces deux intégrations répondent à des tâches différentes des agents : proposer du texte dans l’autre langue et expliquer un calcul de paiement enregistré. Une traduction proposée reste un brouillon à examiner. La preuve de paiement conserve le calcul enregistré même si les budgets changent par la suite.

Déclarez `bilingual-field-slots` pour `bilingual-field.after` et utilisez le contexte typé du SDK. Les champs conservent modèles anglais/français distincts, libellés, limites multiligne/longueur et états désactivés/lecture seule. Une traduction proposée modifie le brouillon; l’utilisateur doit encore examiner et enregistrer. L’hôte résout explicitement l’autorité `agency`, `transfer_payment`, `agreement` ou `applicant_recipient`. N’empruntez pas l’autorité d’une entente pour un champ d’organisme distinct et ne transmettez pas d’organisme arbitraire à un emplacement de promoteur; ce dernier reçoit les configurations autorisées en tableau.

Déclarez `payment-evidence` pour `payment.evidence`. L’emplacement rend le contrat enregistré du calcul de paiement; il ne recalcule pas silencieusement l’historique à partir des budgets ou catalogues actuels. L’hôte expose séparément entrées financières et calcul retenu. Présentez des sections bilingues lisibles et des montants exacts. Ne les remplacez pas par des données techniques brutes. Fournisseur de traduction, glossaires et formules relèvent de leurs extensions.

## Lectures financières partagées et imputation

L’**imputation** répartit un montant financier entre des lignes comptables admissibles. L’extension peut proposer la répartition, mais l’hôte vérifie le total, la capacité disponible et les montants déjà payés. Un plancher payé est le minimum qu’une ligne doit conserver pour couvrir les paiements existants; un bassin est une capacité disponible partagée.

Déclarez `agreement-payment-capacity` et utilisez `requireGcsExtensionAgreementFinancials(context)`. L’hôte lie le service à l’entente autorisée et à la base de données ou à la transaction active. Le service expose les entrées de calcul, les projections des montants payés, les recouvrements de réclamation, la comptabilité effective, le contexte d’imputation, la couverture payée de chaque ligne, la validation de l’imputation et la capacité d’engagement. Il renouvelle l’autorité avant les lectures et refuse une devise incompatible ou un paiement exclu/une ligne d’engagement d’une autre entente. Une capacité absente échoue sans repli local. Lire les projections ne donne ni accès aux dossiers sources ni affectation ni droit d’écriture.

Déclarez `coding-allocator` avec `codingAllocator: { path: './server/coding.ts' }`. Le répartiteur reçoit montant exact, type de sortie (engagement, paiement, créance ou note de crédit), catalogue du volet, contexte retenu/actuel, planchers payés et bassins disponibles. Retournez les lignes exactes `{ codingLineId, amount }`, une enveloppe `lines` avec `policy` retenue ou `null` pour l’imputation manuelle. L’hôte valide catalogue, identifiants uniques, égalité du total, planchers et capacité partagée avant l’enregistrement dans la transaction. Une surcharge `accountCatalog` est refusée : les comptes doivent être disponibles au volet. Les gardes peuvent interroger `codingAccounts.list` de l’organisme actif par type, devise et exercice facultatif.

Par exemple, deux lignes de `600.00` et `400.00` pour un paiement de `1000.00` doivent être admissibles et tenir dans les bassins. Un total de `999.99`, un compte indisponible ou une réduction sous la couverture payée échoue; corrigez la configuration et reprenez sans modifier la preuve immuable. Les pondérations propres à l’extension restent dans son guide.

## Échange de possibilité et importation de réception

Un connecteur peut publier une possibilité de financement dans un autre système et importer une demande soumise comme réception. L’importation place la réception dans la file de travail d’un groupe; un utilisateur doit ensuite la réclamer pour être affecté. Les contrats ci-dessous empêchent une importation de contourner les permissions ou de créer deux fois la même soumission.

Les routes authentifiées avec contrôle d’accès déclaré reçoivent `GcsExtensionWriteAuthorization`. Appelez `lockAuthState(trx)` dans la transaction propriétaire avant les verrous d’extension, puis renouvelez l’autorité de route. Les rappels refusent une autre transaction ou l’absence du contexte utilisateur verrouillé. Transmettre un identifiant ne donne aucune autorité sur un organisme ou programme arbitraire.

`projectFundingOpportunity(trx, opportunityId)` renouvelle l’autorité et exige séparément `transfer_payment:update` au programme propriétaire. Une route liée à une possibilité doit demander ce même ID; une route d’organisme/volet doit correspondre au propriétaire actuel et aux volets sélectionnés. Une possibilité indisponible/incompatible retourne `null`. La projection contient identifiants exacts, noms bilingues d’organisme/programme/volet, tous les volets, noms/objectifs de possibilité, dates et heures de journée entière, ainsi que `active` et `editable`. La sortie hôte inclut aussi les métadonnées de types de pièces externes. `active` décrit les indicateurs de statut; créer une réception vérifie séparément la fenêtre inclusive. Le rappel peut retourner des métadonnées inactives afin de désactiver un appel déjà publié.

`createFundingCaseIntake(trx, input)` exige aussi `funding_case:create` à la portée actuelle et revérifie le propriétaire après verrouillage de la possibilité. Fournissez les IDs canoniques de possibilité, promoteur, groupe et demande; `intakeId` facultatif désigne un reçu hôte retenu. `application` et `sourceExport` sont des objets JSON; `sourceSystem` est du texte non vide nettoyé, au plus 100 caractères, `sourceSubmissionId` au plus 255. Une nouvelle importation exige statut d’organisme admissible non brouillon/modifiable/non terminal, fenêtre de date inclusive, promoteur lisible, groupe affectable du même organisme et statut Brouillon d’organisme. La réception créée attend dans la file de groupe sans utilisateurs; la réclamation établit l’affectation.

Traitez explicitement les résultats : `created` retourne `intakeId`/`draftStatusId`, `already_imported` retourne l’ID conservé. Les indisponibilités sont `opportunity_unavailable`, `recipient_unavailable`, `group_unavailable` et `draft_status_unavailable`; les conflits sont `intake_id_conflict`, `source_conflict` et `application_id_conflict`. Un refus métier lève `FUNDING_CASE_EXCHANGE_FORBIDDEN`. Ne transformez pas un conflit en nouvelle insertion.

Par exemple, si une soumission a été importée mais son accusé perdu, reprenez avec la même identité/export source et l’ID hôte retenu si disponible. L’hôte vérifie possibilité, promoteur, demande et historique source non modifiable et retourne l’ID existant même après fermeture de l’appel. Il ne remplace pas la demande retenue et ne rouvre pas l’historique. Les importations de service d’organisme utilisent l’autorisation planifiée liée aux capacités et leurs contrôles d’affiliation du bénéficiaire actif; ne substituez pas les permissions de route utilisateur à cette frontière. Voir [Portail](../intake/portal.md).

## Rendu partagé des diagrammes

Utilisez ce composant pour montrer aux agents les étapes et les choix d’un processus. Il dessine le diagramme et permet de le télécharger; il n’exécute pas le processus et ne décide pas si un dossier peut passer à l’étape suivante.

Les extensions importent `ExtensionFlowDiagram` et `FlowDiagramDefinition` depuis `@gcs-ssc/extensions/ui`; l’hôte utilise `CommonFlowDiagram` et `@gcs-ssc/diagrams`. Fournissez des nœuds ordonnés déjà localisés avec IDs uniques et cibles valides explicites. Les types de nœud sont `start`, `step`, `decision` et `end`; les routes `direct`, `conditional`, `default` ou `failure`. Seuls les nœuds avec `selectLabel` émettent une sélection; `selectedNodeId` marque le choix.

Le moteur fournit une disposition adaptative, des connexions, des contrôles accessibles, un thème et des téléchargements locaux. Le format SVG conserve les formes natives, le texte interrogeable et le canevas complet. Le format PNG utilise quatre fois la largeur et la hauteur CSS, avec un fond opaque. Si l’exportation échoue, le diagramme reste disponible avec une action de reprise localisée. Le moteur n’exécute ni règles de formulaire ni transitions de flux. Conservez l’état métier et la traduction hors du moteur.

## Importations planifiées et gestionnaires de file

La file de l’hôte exécute le travail planifié en arrière-plan. Un gestionnaire planifié effectue du travail récurrent sans qu’un agent appuie sur un bouton. Il peut, par exemple, importer de nouvelles soumissions comme brouillons. Une exécution peut se répéter; l’extension doit donc conserver la requête et sa clé de prévention des doublons pour reprendre sans risque.

Déclarez `scheduled-agreement-import` ou `scheduled-intake-import` pour la frontière d’importation concernée, et `background-queue` pour le travail récurrent. Importez `registerGcsExtensionQueueHandler` de `@gcs-ssc/extensions/server`. Fournissez l’application Nitro du module activé et un gestionnaire avec `extensionKey`, un `id` local au paquet, `queueLevel` et un `run` asynchrone borné.

Utilisez des minuscules séparées par des traits d’union pour `extensionKey` et `id`, comme `example-connector` et `import-submissions`. Le SDK ajoute le préfixe pour former `example-connector:import-submissions`; ne le fournissez pas vous-même. L’identifiant complet accepte au plus 240 caractères. Choisissez un niveau pris en charge : 0 pour 10 secondes, 1 pour 5 minutes, 2 pour 30 minutes ou 3 pour 1 heure. `intervalMs`, l’ancienne capacité `l1-queue` et `registerGcsExtensionL1QueueHandler` ne sont plus pris en charge.

L’inscription refuse les identifiants en double, les niveaux invalides, les propriétaires non déclarés et les espaces de noms incompatibles. Les extensions partagent l’exécution entre serveurs; l’exécution locale au processus est réservée à l’hôte. Les inscriptions deviennent visibles seulement après la réussite de toute l’activation du module. Un échec élimine ses inscriptions pour permettre une nouvelle tentative. L’ordonnanceur exécute seulement les extensions activées pour au moins un organisme actif, après les migrations. Un nouveau gestionnaire attend le prochain cycle futur. Consultez [Travail en arrière-plan](../operator/background-work.md) pour les horaires, baux et délais de reprise.

Le contexte `GcsQueueContext` fournit la base de données de l’hôte, `createWriteAuthorization(extensionKey, agencyId)` et l’exécution Audit pour un organisme avec `runForAgency`. Utilisez les rappels d’autorisation liés à la transaction avant de créer une réception, une réclamation ou une prévision importée. Les importations d’entente revérifient l’organisme, le volet, le bénéficiaire lié si nécessaire, l’utilisateur principal actif, le statut et les restrictions liées à la clôture. Elles créent des brouillons, pas des approbations. Un gestionnaire peut s’exécuter plusieurs fois pour le même travail. Les files métier persistantes doivent conserver la requête exacte à reprendre et sa clé d’idempotence, qui identifie les requêtes répétées pour la même opération. Voir [Travail en arrière-plan](../operator/background-work.md) pour baux, délais et surveillance.

### Versions des prévisions importées

Le SDK 0.3.18 change `createAgreementForecast(trx, input)` : l’hôte attribue la version au dossier de prévision. Retirez `version` de chaque ligne mensuelle. Fournissez `agreementId`, `streamId`, `fiscalYearId`, `applicantRecipientId` et `lineItems`. Chaque ligne contient `budgetLineItemId`, `month` (0–11), le montant exact `amount` et `currency`. Utilisez les identités des lignes du budget actuel pour l’exercice de l’entente sélectionné et la devise de l’entente. L’hôte exige de 1 à 2400 lignes, des montants non négatifs et aucune répétition de paire ligne budgétaire/mois.

L’importation crée un brouillon inactif, affecte son utilisateur principal et retourne `{ status: 'created', forecastId, version, lineItemIds, draftStatusId }`. `version` est un entier exact sous forme de chaîne : la numérotation commence à `'0'` pour chaque entente/exercice et inclut les dossiers supprimés, donc les anciens numéros ne sont jamais réutilisés. Conservez la valeur retournée; ne calculez pas de version mensuelle et n’activez pas vous-même le dossier importé. L’achèvement et l’approbation déterminent l’activation.

Par exemple, si les versions `'0'` et `'1'` existent déjà pour l’exercice 2026–2027 d’une entente, importer douze lignes mensuelles de `'1000.00'` crée la version `'2'`, un brouillon inactif distinct totalisant `'12000.00'`. Elle ne remplace pas la prévision active. Les calculs de paiement partagés utilisent le dossier de prévision actif et toutes ses lignes mensuelles, même si un brouillon porte un numéro supérieur.

Traitez `agreement_unavailable`, `recipient_unavailable`, `fiscal_year_unavailable` et `draft_status_unavailable` avant d’annoncer une réussite. Actualisez l’entente, le lien du bénéficiaire, le budget actuel ou le statut Brouillon d’organisme selon le problème, puis réessayez par la même voie d’autorisation. Si la transaction échoue, elle annule la prévision et ses lignes. Chaque appel de création réussi produit une autre version. Conservez le résultat et vérifiez une réponse incertaine avant d’envoyer une autre demande de création.

## Liste de vérification des tests

Vérifiez ce que les agents voient et ce que le serveur impose. Par exemple, masquer un bouton ne doit pas être la seule protection contre un enregistrement non autorisé. Utilisez la liste ci-dessous pour tester la configuration, les permissions, la protection des dossiers et le comportement bilingue.

Utilisez `installExtensionTestUiRuntime` depuis `@gcs-ssc/extensions/testing` pour les tests autonomes de composants qui nécessitent les composants d’interface de l’hôte.

| Test | Résultat attendu |
| --- | --- |
| Importation du manifeste | `extension.config.ts` s’importe et se valide sans utiliser les éléments internes de l’hôte. |
| Déclarations de capacités | Chaque fonctionnalité de l’hôte utilisée figure dans `requiredHostCapabilities`. |
| Activation pour une agence | L’extension apparaît dans l’onglet Extensions de l’agence et les migrations sont exécutées. |
| Configuration du volet | La fenêtre modale ou la page complète enregistre un JSON valide et rejette les combinaisons invalides. |
| Emplacements d’exécution et onglets | Les composants s’affichent seulement lorsque l’activation pour l’agence ou le volet et le contrôle d’accès le permettent. |
| Gestionnaires serveur | Les règles de propriété, l’activation, le contrôle d’accès ou l’autorisation manuelle et la validation sont appliqués. |
| Clients API | `useExtensionApi` et `useHostApi` produisent les chemins attendus et gèrent les erreurs. |
| Traitement des secrets | Les secrets sont chiffrés et déchiffrés côté serveur et ne sont jamais retournés dans la configuration du navigateur. |
| Contrat de transaction | Les aides du cycle de vie reçoivent une `Transaction`, et non un client de base de données racine. |
| Écritures concurrentes du cycle de vie | Les changements de configuration, la désactivation et la génération sont sérialisés selon l’ordre de verrouillage canonique. |
| Autorisation périmée | Une requête qui perd son accès pendant l’attente est rejetée par la deuxième phase de `writeAuthorization`, après les verrous du cycle de vie. |
| Gardes du cycle de vie | La désactivation, le déplacement d’une entente et les modifications de paiement ne peuvent pas invalider les dossiers appartenant à l’extension. |
| Garde de suppression d’une entente | La suppression est refusée dans la transaction de l’hôte lorsque l’historique ou la provenance générée appartenant à l’extension nécessite encore l’entente. |
| Conflits entre les actions de création | Les actions de remplacement en double sont détectées. |
| Conflits entre les calculateurs de paiement | Les calculateurs en double sont détectés. |
| Interface bilingue | Les libellés, les erreurs et les noms d’onglet sont présents en anglais et en français. |
| Suppression logique | Les suppressions de données appartenant à l’extension conservent les données historiques lorsque cela est requis. |
