# Creer des extensions

Les extensions sont des paquets de code installes que l hote GCS-SSC decouvre au demarrage. Creez une extension lorsqu un processus metier local doit ajouter un comportement sans modifier les ecrans de base pour tous les deploiements.

Cette page est destinee aux developpeurs. Les operateurs devraient utiliser [Concepts : Extensions](../concepts/extensions.md) et les onglets Extensions des agences et volets.

## Contrat D Auteur

Importez les contrats SDK depuis `@gcs-ssc/extensions`, les aides serveur depuis `@gcs-ssc/extensions/server`, les wrappers UI depuis `@gcs-ssc/extensions/ui` et les aides de test depuis `@gcs-ssc/extensions/testing`. N importez pas les chemins internes de l hote comme `~~/server`, `~~/shared`, `~/` ou `#imports` pour les contrats d extension.

| Contrat | Utilisation |
| --- | --- |
| `defineGcsExtension` | Definit le manifeste de l extension. |
| `GCS_EXTENSION_SDK_VERSION` | Version SDK courante de l hote pour la compatibilite du manifeste. |
| `GcsExtensionJsonConfig` | Forme JSON de la configuration de volet. |
| `ExtensionEntityTabContext` | Props des composants d onglet d entite. |
| `defineGcsExtensionMigration` | Encapsule les migrations Kysely de l extension. |
| `defineGcsExtensionRouteHandler` | Encapsule les gestionnaires serveur avec un contexte de route stable. |
| `registerGcsExtensionCreateOperationHandler` | Branche les operations de creation d engagements ou paiements. |
| `createGcsExtensionUserError` | Lance des erreurs localisees et visibles par l utilisateur. |
| Aides KV | Stockent de l etat non secret par type de proprietaire, id et cle. |
| Aides de secrets chiffres | Stockent les valeurs sensibles dans un stockage chiffre gere par l hote. |
| Wrappers UI et clients | Rendent l UI hote et appellent les API d extension ou d hote depuis les composants. |

## Structure De Paquet

| Fichier ou dossier | Utilite |
| --- | --- |
| `extension.config.ts` | Manifeste requis exporte avec `defineGcsExtension`. |
| `components/` | Composants Vue pour configuration, emplacements, onglets, actions ou calculateurs. |
| `server/api/` | Gestionnaires serveur exposes par le repartiteur de l hote. |
| `server/migrations/` | Migrations propres a l extension. |
| `server/plugins/` | Plugins Nitro pour les hooks de creation. |
| `server/runtime.ts` | Resolveur facultatif d activation/configuration d execution. |
| `client/` ou dossier d actifs | Fichiers statiques montes par le manifeste. |
| `i18n/` | Messages anglais/francais facultatifs. |
| `tests/` | Tests unitaires de config, routes, UI et logique metier. |

## Champs Du Manifeste

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

| Champ | Regle |
| --- | --- |
| `key` | Cle stable. Utilisez kebab-case minuscule et ne la changez pas apres creation de donnees. |
| `sdkVersion` | Plage de version SDK compatible requise, par exemple `^0.1.0`. L hote rejette les versions non prises en charge. |
| `requiredHostCapabilities` | Liste requise des capacites hote utilisees par le manifeste ou le code. L hote rejette les capacites manquantes ou inconnues. |
| `name` | Nom bilingue requis. |
| `description` | Description bilingue facultative pour les ecrans d administration. |
| `admin` | Composants de configuration d agence, modale de volet ou page de volet. |
| `client` | Emplacements, onglets d entite, actions de creation et calculateurs. |
| `css`, `i18n`, `assets` | Styles, messages et actifs statiques facultatifs. |
| `serverHandlers` | Routes authentifiees d extension exposees par l hote. |
| `migrations` | Migrations Kysely lancees a l activation ou a la demande. |
| `runtime` | Resolveur facultatif pour activation et configuration d emplacements. |
| `nitroPlugin` | Plugin serveur facultatif pour les hooks. |

L hote valide les chemins de composants, gestionnaires, actifs et migrations afin qu ils restent dans le paquet d extension.

## Capacites Prises En Charge

Declarez chaque capacite dont l extension depend :

| Capacite | Utilisation |
| --- | --- |
| `agency-config` | Composant de configuration d agence. |
| `stream-config-modal` | Configuration de volet rendue dans la modale Extensions du volet. |
| `stream-config-page` | Route pleine page de configuration via `admin.streamConfigPage`. |
| `entity-tabs` | Onglets d entente, promoteur, reclamation ou surveillance. |
| `textarea-slots` | Composants d emplacement dans les zones prises en charge. |
| `create-actions` | Actions de creation pour engagements ou paiements d entente. |
| `payment-amount-calculators` | Composants de calcul de montant de paiement. |
| `server-handlers` | Routes API sous `/api/extensions/{extensionKey}`. |
| `server-handler-rbac` | RBAC et contexte d entite resolus par l hote. |
| `migrations` | Migrations propres a l extension. |
| `runtime-resolution` | Resolveur d execution pour disponibilite/configuration. |
| `public-assets` | Actifs statiques montes par l hote. |
| `extension-ui` | Wrappers UI et composants hote fournis. |
| `extension-api-client` | `useExtensionApi` ou clients API d extension. |
| `host-api-client` | `useHostApi` ou clients API hote stables. |
| `extension-kv` | Aides cle-valeur pour etat JSON non secret. |
| `extension-secrets` | Aides de secrets chiffres. |
| `extension-create-operation-hooks` | Hooks Nitro d operation de creation. |
| `extension-lifecycle-hooks` | Hooks de cycle de vie/creation exposes par l integration. |

## Configuration De Volet

Utilisez `admin.agency` lorsque l extension a besoin de reglages non secrets au niveau de l agence:

```ts
admin: {
  agency: {
    path: './components/ExampleAgencyConfig.vue'
  }
}
```

Les composants de configuration d agence recoivent la configuration JSON courante avec `v-model`, ainsi que les props `extension` et `agencyId`. Stockez les valeurs sensibles par des gestionnaires serveur d extension et les aides de secrets chiffres plutot que dans la configuration d agence.

Utilisez `admin.streamConfig` lorsque l extension a besoin d une configuration de volet en modale :

```ts
admin: {
  streamConfig: {
    path: './components/ExampleStreamConfig.vue'
  }
}
```

Utilisez `admin.streamConfigPage` lorsque la configuration a besoin d une page dediee :

```ts
admin: {
  streamConfigPage: {
    path: './components/ExampleStreamConfigPage.vue'
  }
}
```

Les composants de configuration recoivent la config JSON courante avec `v-model` et les props de contexte :

```vue
<script setup lang="ts">
import type { GcsExtensionJsonConfig } from '@gcs-ssc/extensions'
import type { GcsStreamConfigComponentProps } from '@gcs-ssc/extensions/ui'

defineProps<GcsStreamConfigComponentProps>()

const config = defineModel<GcsExtensionJsonConfig>({ required: true })
</script>
```

Les composants pleine page recoivent aussi `hostLayout: true` et peuvent utiliser l espace de page pour une configuration complexe. Les composants de modale devraient rester compacts.

| Regle | Comportement |
| --- | --- |
| La config doit etre JSON | Utilisez seulement primitives, tableaux et objets. |
| La config n est pas un coffre de secrets | Stockez des references d identifiants, pas les valeurs sensibles. Utilisez les aides de secrets chiffres pour les secrets. |
| L agence doit etre activee d abord | La configuration de volet est indisponible tant que l extension n est pas activee a l agence. |
| Les ids optionnels doivent etre toleres | Certains contextes peuvent omettre `transferPaymentId` ou `agencyId`. |
| Validez avant sauvegarde | Rejetez les combinaisons incompletes dans le composant ou la validation serveur. |
| Rendez la config versionnable | Ajoutez un champ de version si la forme peut changer. |

## Emplacements D Execution

Les emplacements affichent des composants d extension dans des pages existantes.

| Emplacement | Zone hote |
| --- | --- |
| `textarea.after` | Apres-zone de texte generique. |
| `agreement.descriptions.after` | Descriptions anglaise/francaise d entente. |
| `agreement.profile.classification.fields` | Section Classification de l entente. |
| `agreement.profile.profile.fields` | Section Profil de l entente. |
| `agreement.profile.risk-management.fields` | Section Gestion du risque de l entente. |
| `agreement.profile.sections.after` | Apres les sections du profil d entente. |
| `proponent.descriptions.after` | Descriptions anglaise/francaise du promoteur. |

Les composants d emplacement doivent rester discrets et ne pas dupliquer les champs de base. Si un emplacement ecrit des donnees, stockez-les sous la cle de l extension.

## Onglets D Entite

Les onglets peuvent cibler `agreement`, `proponent`, `claim` ou `monitor`.

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

| Prop | Contenu |
| --- | --- |
| `extensionKey` | Cle du manifeste. |
| `context` | Cible, ids agence/volet/entente/promoteur/reclamation/surveillance, proprietaire, portee et exigence RBAC. |
| `config` | Configuration resolue de volet ou d agence. |
| `rbac` | Exigence RBAC declaree par l onglet. |

| Regle | Comportement |
| --- | --- |
| Les ids d onglet sont uniques par cible | Utilisez kebab-case minuscule. |
| Les onglets exigent l activation | Entente, reclamation et surveillance exigent activation agence et volet; promoteur exige activation agence. |
| Les onglets exigent le RBAC | L hote verifie le sujet et l action declares avant affichage. |
| Les promoteurs sans agence principale n affichent pas d onglets | L activation des onglets promoteur passe par l agence principale. |

## Gestionnaires Serveur

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

Le contexte stable contient `db`, `params`, `auth`, `config`, `entity`, `stream`, `agency`, `authorizedScope`, `readBody` et `getHeader`. `context.event` reste disponible comme echappatoire, mais les gestionnaires normaux ne devraient pas lire les details H3 internes de l hote.

| Regle | Comportement |
| --- | --- |
| Declarez le RBAC pour les donnees d entite | L hote resout l entite depuis le parametre de route, verifie l activation, transmet config/contexte et applique le sujet/action. |
| Les parametres doivent etre explicites | `entity.param`, `stream.param` ou `agency.param` doit correspondre a un parametre de route. |
| Utilisez `auth: "manual"` seulement deliberement | Les gestionnaires manuels doivent faire leur propre autorisation metier; ils ne peuvent pas combiner `auth: "manual"` avec `rbac`. |
| Utilisez `GcsExtensionUserError` pour les erreurs utilisateur | Les messages localises de l extension permettent la traduction par l interface. |
| Validez toutes les entrees | Les gestionnaires d extension valident leurs propres requetes. |
| Respectez la propriete hote | Resoudre entente, promoteur, reclamation, surveillance, volet et agence avant d ecrire lorsque l hote ne l a pas deja fait. |

## Runtime UI

`@gcs-ssc/extensions/ui` expose les wrappers et composables fournis par l hote. Utilisez-les au lieu d importer Nuxt UI ou les composants `Common*` de l hote directement.

Les exports courants incluent `ExtensionButton`, `ExtensionFormField`, `ExtensionInput`, `ExtensionSelect`, `ExtensionTable`, `ExtensionResourceLayoutCard`, `ExtensionSection`, `ExtensionSaveButton`, `ExtensionStatusBadge`, `useExtensionI18n`, `useExtensionToast`, `useExtensionFetch`, `useExtensionApi`, `useHostApi` et `useExtensionGroupedTableExpansion`.

Utilisez `useExtensionApi(extensionKey)` pour les routes propres a l extension sous `/api/extensions/{extensionKey}`. Utilisez `useHostApi()` seulement pour les routes hote stables et declarez `host-api-client`.

## Actions De Creation

| Operation | Surface hote |
| --- | --- |
| `agreement.commitments.create` | Onglet Engagements de l entente. |
| `agreement.payments.create` | Onglet Paiements de l entente. |

| Mode | Comportement |
| --- | --- |
| `append` | Garde le bouton Ajouter de l hote et ajoute l action d extension. |
| `replace` | Cache le bouton Ajouter lorsqu un seul remplacement actif existe. |

Si plusieurs extensions actives remplacent la meme operation, l hote bloque l action jusqu a correction de la configuration. Appelez `onCreated()` apres une creation reussie pour rafraichir la table.

Un hook serveur de creation vit dans un plugin Nitro:

```ts
import { registerGcsExtensionCreateOperationHandler } from '@gcs-ssc/extensions/server'

export default defineNitroPlugin(nitroApp => {
  registerGcsExtensionCreateOperationHandler(
    'gcs-example',
    'agreement.payments.create',
    async context => ({ status: 'continue' }),
    nitroApp
  )
})
```

| Resultat | Comportement |
| --- | --- |
| `continue` ou aucun resultat | La creation de base continue. |
| `handled` | L extension fournit la reponse et la creation de base s arrete. |

Lorsqu un hook de creation bloque une action corrigeable par l utilisateur, lancez `createGcsExtensionUserError` avec des valeurs bilingues pour `message` et `details`. L hote choisit la langue de la requete et retourne ces messages dans la forme d erreur API normale.

## Calculateurs De Montant

Les calculateurs de paiement peuvent fournir montant suggere, plafond, devise, details, etat de chargement et donnees d extension pour `agreement.payments.create`. Un seul calculateur actif peut s appliquer a la fois.

| Regle | Comportement |
| --- | --- |
| Le calculateur doit correspondre a l operation | L hote actuel prend en charge la creation de paiements d entente. |
| Le calculateur doit etre unique | Les conflits entre calculateurs actifs bloquent le formulaire. |
| Le plafond est applique dans le formulaire | L utilisateur ne peut pas sauvegarder un montant au-dessus du plafond. |
| La validation serveur reste requise | Reverifiez les montants generes avant d ecrire. |

## Migrations, KV Et Secrets

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
| Les migrations appartiennent a l extension | Utilisez le schema `extensions` et des noms de table propres a l extension. |
| Les chemins sont listes dans le manifeste | L hote lance les migrations listees pour les extensions activees. |
| Les imports de paquet standard sont permis | Les fichiers de migration peuvent importer des dependances comme `kysely`; l hote les resout depuis l installation de l application. |
| L historique est propre a chaque extension | Chaque extension utilise ses propres tables d historique et de verrouillage; les migrations en attente sont suivies separement. |
| Aides KV | Stockez un etat JSON simple non secret par type de proprietaire, id et cle. Les entrees KV sont supprimees logiquement. |
| Aides de secrets chiffres | Stockez des valeurs JSON sensibles comme cles privees, jetons API, jetons de rafraichissement, secrets de signature ou identifiants de service externe. |
| Les workflows complexes meritent des tables explicites | Utilisez des migrations pour rapports, relations, etats ou gros dossiers. |

Les secrets chiffres utilisent la table `extensions.secret_entry` et AES-256-GCM. Les valeurs sont liees a la cle d extension, au type de proprietaire, a l id de proprietaire, a la cle de secret et a la version de cle. Les metadonnees peuvent stocker seulement des champs non sensibles, comme une etiquette ou un suffixe masque.

La cle racine de chiffrement de l hote est `GCS_EXTENSION_SECRETS_KEY`, une cle de deploiement de 32 octets encodee en base64. Ne la stockez pas dans la config d extension, KV, controle source, donnees semees de vrais environnements ou config runtime visible au navigateur.

Les aides de secrets chiffres sont exposees par `@gcs-ssc/extensions/server`: `setEncryptedExtensionSecret`, `getEncryptedExtensionSecret` et `deleteEncryptedExtensionSecret`.

## Actifs Et I18n

| Fonction | Champ | Guidance |
| --- | --- | --- |
| Actifs statiques | `assets` | Montez seulement les fichiers requis a l execution avec un `baseURL` unique. |
| Actifs de paquet | `assets.package` et `packagePath` | Utile pour modeles ou actifs tiers. |
| Messages bilingues | `i18n` | Fournissez libelles et erreurs anglais/francais. |
| CSS | `css` | Gardez les styles limites et evitez d ecraser globalement les jetons de l hote. |

## Liste De Verification

Utilisez `installExtensionTestUiRuntime` depuis `@gcs-ssc/extensions/testing` pour les tests autonomes de composants qui ont besoin des wrappers UI de l hote.

| Test | Resultat attendu |
| --- | --- |
| Import du manifeste | `extension.config.ts` importe et valide sans chemins internes de l hote. |
| Declarations de capacites | Chaque fonction hote utilisee est listee dans `requiredHostCapabilities`. |
| Activation d agence | L extension apparait dans l onglet Extensions et les migrations s executent. |
| Configuration de volet | La modale ou page sauvegarde du JSON valide et rejette les combinaisons invalides. |
| Emplacements et onglets | Les composants apparaissent seulement lorsque activation et RBAC le permettent. |
| Gestionnaires serveur | Propriete, activation, RBAC ou autorisation manuelle et validation sont appliques. |
| Clients API | `useExtensionApi` et `useHostApi` produisent les chemins attendus et gerent les erreurs. |
| Secrets | Les secrets sont chiffres/dechiffres cote serveur et jamais retournes a la config navigateur. |
| Conflits d actions | Les remplacements multiples sont detectes. |
| Conflits de calculateurs | Les calculateurs multiples sont detectes. |
| Interface bilingue | Libelles, erreurs et onglets existent en anglais et francais. |
| Suppression logique | Les donnees d extension preservent l historique lorsque requis. |
