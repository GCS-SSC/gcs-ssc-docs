# Création d’extensions

Les extensions sont des paquets de code installés que l’hôte GCS-SSC découvre au démarrage. Créez une extension lorsqu’un processus opérationnel nécessite un comportement local sans modifier les écrans principaux des ententes, des promoteurs, des programmes ou de l’administration pour tous les déploiements.

Cette page porte sur la mise en œuvre destinée aux développeurs. Les responsables des opérations devraient consulter [Concepts : Extensions](../concepts/extensions.md) et les onglets Extensions des agences et des volets.

## Contrat de création

Importez les contrats du SDK depuis `@gcs-ssc/extensions`, les aides serveur depuis `@gcs-ssc/extensions/server`, les composants d’interface depuis `@gcs-ssc/extensions/ui` et les aides de test depuis `@gcs-ssc/extensions/testing`. N’importez pas les chemins internes de l’hôte comme `~~/server`, `~~/shared`, `~/` ou `#imports` pour les contrats appartenant à l’extension.

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

Une extension type comprend les éléments suivants :

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

```ts
import { defineGcsExtension } from '@gcs-ssc/extensions'

export default defineGcsExtension({
  key: 'gcs-example',
  sdkVersion: '^0.1.0',
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
| `sdkVersion` | Plage de versions compatibles requise pour le SDK, par exemple `^0.1.0`. L’hôte rejette les versions non prises en charge. |
| `requiredHostCapabilities` | Liste requise des capacités de l’hôte utilisées par le manifeste ou la mise en œuvre. Utilisez une liste vide seulement si aucune capacité n’est nécessaire. Consultez ci-dessous les limites de la déduction au démarrage. |
| `name` | Nom bilingue requis. |
| `description` | Description bilingue facultative destinée aux écrans d’administration. |
| `admin` | Composants de configuration de l’agence, de la fenêtre modale du volet ou de la page du volet. |
| `client` | Emplacements d’exécution, onglets d’entité, actions de création et calculateurs de paiement. |
| `css`, `i18n`, `assets` | Styles côté client, messages localisés et actifs statiques facultatifs. |
| `serverHandlers` | Routes authentifiées de l’extension exposées par le répartiteur de l’hôte. |
| `migrations` | Migrations Kysely exécutées lorsque l’extension est activée ou que les migrations sont demandées. |
| `runtime` | Résolveur facultatif de l’activation et de la configuration des emplacements. |
| `nitroPlugin` | Module serveur facultatif pour les hooks, comme l’interception d’une opération de création. |

L’hôte vérifie les chemins des composants, des gestionnaires, des actifs et des migrations pour s’assurer qu’ils demeurent dans le paquet de l’extension.

## Capacités prises en charge

Déclarez chaque capacité dont dépend l’extension. Au démarrage, l’hôte déduit les capacités représentées directement par les champs `admin`, `client`, `serverHandlers`, `migrations`, `runtime`, `assets` et `nitroPlugin` du manifeste; il rejette les capacités déduites mais non déclarées ainsi que les capacités inconnues. L’hôte n’inspecte pas les importations ou les appels du code de mise en œuvre. Les auteurs doivent donc vérifier séparément les dépendances propres au code, notamment les clients API, les aides KV, les aides de secrets et les hooks d’opération de création.

| Capacité | Utilisation |
| --- | --- |
| `agency-config` | Composant de configuration administrative d’une agence. |
| `stream-config-modal` | Configuration du volet affichée dans la fenêtre modale Extensions du volet. |
| `stream-config-page` | Route de configuration pleine page au moyen de `admin.streamConfigPage`. |
| `entity-tabs` | Onglets d’entente, de promoteur, de réclamation ou de surveillance. |
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

Utilisez `admin.streamConfig` lorsque l’extension nécessite un composant de configuration du volet dans une fenêtre modale :

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

Les emplacements affichent les composants des extensions dans les pages existantes de l’hôte. Les noms d’emplacement pris en charge sont les suivants :

| Emplacement | Zone de l’hôte |
| --- | --- |
| `textarea.after` | Emplacement générique après une zone de texte. |
| `agreement.descriptions.after` | Zone des descriptions française et anglaise d’une entente. |
| `agreement.profile.classification.fields` | Section Classification du profil d’une entente. |
| `agreement.profile.profile.fields` | Section Profil d’une entente. |
| `agreement.profile.risk-management.fields` | Section Gestion du risque du profil d’une entente. |
| `agreement.profile.sections.after` | Zone située après les sections du profil d’une entente. |
| `proponent.descriptions.after` | Zone des descriptions française et anglaise d’un promoteur. |

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

Les onglets d’entité peuvent cibler `agreement`, `proponent`, `claim` ou `monitor`.

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
| `context` | Cible, identifiants de l’agence, du volet, de l’entente, du promoteur, de la réclamation ou de la surveillance, type et identifiant du propriétaire, portée et exigence de contrôle d’accès en fonction des rôles. |
| `config` | Configuration résolue de l’extension pour le volet ou l’agence. |
| `rbac` | Exigence de contrôle d’accès en fonction des rôles déclarée par l’onglet. |

| Règle | Comportement |
| --- | --- |
| Les identifiants d’onglet sont uniques pour chaque cible | Utilisez des identifiants en minuscules au format kebab-case. |
| Les onglets nécessitent l’activation | Les onglets d’entente, de réclamation et de surveillance nécessitent l’activation pour l’agence et le volet; les onglets de promoteur nécessitent l’activation pour l’agence. |
| Les onglets nécessitent un contrôle d’accès | Avant l’affichage, l’hôte vérifie le sujet et l’action déclarés. |
| Les promoteurs sans agence responsable n’affichent aucun onglet | L’activation des onglets d’un promoteur est résolue par l’intermédiaire de son agence responsable. |

## Frontière d’interface du SDK

Importez les composants et les composables fournis par l’hôte depuis `@gcs-ssc/extensions/ui`. N’importez pas `~/`, `~~/`, `#imports`, `#app` ou `#gcs-*`, et n’utilisez pas directement les noms de composants de l’hôte dans un gabarit d’extension. Des composants comme `ExtensionButton`, `ExtensionFormField`, `ExtensionSaveButton` et `ExtensionTable` préservent le comportement de l’hôte derrière un contrat versionné.

Les exportations courantes comprennent `ExtensionButton`, `ExtensionFormField`, `ExtensionInput`, `ExtensionSelect`, `ExtensionTable`, `ExtensionResourceLayoutCard`, `ExtensionSection`, `ExtensionSaveButton` et `ExtensionStatusBadge`.

Utilisez `useExtensionApi(extensionKey)` pour les routes de l’extension et `useHostApi()` pour les routes stables de l’hôte. Déclarez `extension-api-client` ou `host-api-client` dans `requiredHostCapabilities`, selon le cas; ne construisez pas d’URL `/api` et n’appelez pas `fetch` directement dans les composants. Le point d’entrée de l’interface fournit aussi des intégrations typées :

| Aide | Contrat |
| --- | --- |
| `useExtensionConfirmDialog` | Options de confirmation asynchrones typées et résultat booléen. |
| `useExtensionFetch<T>` | Références réactives aux données, à l’état, à l’attente, aux erreurs et au rafraîchissement. |
| `useExtensionGroupedTableExpansion<Row>` | État partagé des groupes, des développements, des lignes et de la visibilité. |
| `useExtensionI18n` / `useExtensionToast` | Frontières stables de localisation et de notification. |

L’hôte installe l’environnement d’exécution concret de l’interface. Les tests autonomes peuvent installer les substituts du SDK plutôt que de monter les composants internes de l’hôte.

## Gestionnaires serveur

Utilisez `serverHandlers` pour les points de terminaison authentifiés de l’extension :

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
| Lancer `GcsExtensionUserError` pour les échecs visibles par l’utilisateur | Utilisez les messages localisés de l’extension afin que l’interface puisse les traduire. |
| Valider toutes les entrées | Les gestionnaires de l’extension sont responsables de la validation des requêtes. |
| Respecter les règles de propriété de l’hôte | Résolvez toujours la propriété de l’entente, du promoteur, de la réclamation, de la surveillance, du volet et de l’agence avant l’écriture lorsque l’hôte ne l’a pas déjà fait. |

Les écritures protégées d’une extension utilisent le protocole `writeAuthorization` fourni par l’hôte. Celui-ci sépare l’autorisation récente en deux phases afin que les verrous des tables d’autorisation ne soient jamais acquis après les verrous de l’extension ou de l’entité. Un gestionnaire d’écriture doit rejeter l’absence de ce protocole avant d’exécuter sa logique transactionnelle :

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

L’ordre requis est le suivant : `lockAuthState(trx)`, verrous enregistrés du cycle de vie de l’agence et du volet, autorisation de la portée ou de l’entité actuelle, puis lectures et écritures protégées. Privilégiez `authorizeCurrentScope`; `authorizeCurrentEntity` demeure la solution de compatibilité. Traitez l’absence du protocole, le rejet d’une phase ou le changement de portée comme une erreur fatale et laissez l’erreur sortir de la fonction de rappel afin que toutes les écritures protégées soient annulées.

Les routes qui présentent des choix d’entente doivent appeler `context.agreementAccess.listVisibleOptions(db, { streamId, action })`; l’hôte applique les règles de visibilité liées aux rôles et aux équipes et retourne uniquement les ententes actives. Lorsqu’une transaction écrit un dossier appartenant à une entente choisie par une telle route, exigez `writeAuthorization.lockAndAuthorizeAgreement` et appelez-le après les verrous du cycle de vie et l’autorisation de la route actuelle. L’absence du rappel constitue une erreur fatale. L’hôte verrouille l’entente, résout de nouveau son volet actif et effectue une autorisation récente de l’entente dans la même transaction. Un résultat `false` signifie que l’entente est inactive ou qu’elle n’appartient plus au volet demandé; un refus d’autorisation produit une erreur.

## Actions de création

Les extensions peuvent ajouter ou remplacer les actions de création suivantes :

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

Les hooks d’opération de création côté serveur appartiennent à un module Nitro :

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

Les calculateurs de paiement peuvent fournir un montant suggéré, un montant maximal, une devise, des détails explicatifs, un état de chargement et des données d’extension pour `agreement.payments.create`. Un seul calculateur activé peut s’appliquer à la surface de création des paiements à la fois.

| Règle | Comportement |
| --- | --- |
| Le calculateur doit correspondre à l’opération | L’hôte actuel prend en charge la création des paiements d’une entente. |
| Le calculateur doit être unique pour l’opération | Les calculateurs activés en conflit bloquent le formulaire de l’hôte. |
| Le montant maximal est appliqué dans le formulaire | L’utilisateur ne peut pas enregistrer un montant supérieur au maximum établi par le calculateur. |
| La validation serveur demeure requise | Vérifiez de nouveau les montants générés avant d’écrire les dossiers. |

## Migrations, stockage KV et secrets

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

Les gardes devraient lancer des erreurs d’extension localisées et visibles par l’utilisateur pour les conflits opérationnels qu’il peut corriger. Elles doivent être déterministes, liées à la transaction et sécuritaires lorsque les routes de l’hôte les appellent hors de l’interface de l’extension.

## Actifs et internationalisation

| Fonctionnalité | Champ du manifeste | Orientation |
| --- | --- | --- |
| Actifs statiques de l’extension | `assets` | Montez seulement les fichiers nécessaires à l’exécution et choisissez une valeur `baseURL` unique. |
| Actifs du paquet | `assets.package` et `packagePath` | Conviennent aux fichiers de modèles ou aux actifs de tiers regroupés dans le paquet. |
| Messages bilingues | `i18n` | Fournissez des fichiers de messages en anglais et en français pour les libellés et les erreurs de l’interface. |
| CSS | `css` | Limitez la portée des styles et évitez de remplacer globalement les jetons de conception de l’hôte. |

## Liste de vérification des tests

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
