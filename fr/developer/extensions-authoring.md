# Creer des extensions

Les extensions sont des paquets de code installes que l hote GCS-SSC decouvre au demarrage. Creez une extension lorsqu un processus metier local doit ajouter un comportement sans modifier les ecrans de base pour tous les deploiements.

Cette page est destinee aux developpeurs. Les operateurs devraient utiliser [Concepts : Extensions](../concepts/extensions.md) et les onglets Extensions des agences et volets.

## Contrat D Auteur

Importez les contrats SDK depuis `@gcs-ssc/extensions` et les aides serveur depuis `@gcs-ssc/extensions/server`. N importez pas les chemins internes de l hote comme `~~/server`, `~~/shared`, `~/` ou `#imports` pour les contrats d extension.

| Contrat | Utilisation |
| --- | --- |
| `defineGcsExtension` | Definit le manifeste de l extension. |
| `GcsExtensionJsonConfig` | Forme JSON de la configuration de volet. |
| `ExtensionEntityTabContext` | Props des composants d onglet d entite. |
| `defineGcsExtensionMigration` | Encapsule les migrations Kysely de l extension. |
| `registerGcsExtensionCreateOperationHandler` | Branche les operations de creation d engagements ou paiements. |
| `createGcsExtensionUserError` | Lance des erreurs localisees et visibles par l utilisateur. |
| Aides KV | Stockent l etat d extension par type de proprietaire, id de proprietaire et cle. |

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
| `tests/` | Tests unitaires de config, aides de routes et logique metier. |

## Champs Du Manifeste

```ts
import { defineGcsExtension } from '@gcs-ssc/extensions'

export default defineGcsExtension({
  key: 'gcs-example',
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
| `name` | Nom bilingue requis. |
| `description` | Description bilingue facultative pour les ecrans d administration. |
| `admin` | Composants de configuration d agence et de volet. |
| `client` | Emplacements, onglets d entite, actions de creation et calculateurs. |
| `css`, `i18n`, `assets` | Styles, messages et actifs statiques facultatifs. |
| `serverHandlers` | Routes authentifiees d extension exposees par l hote. |
| `migrations` | Migrations Kysely lancees a l activation ou a la demande. |
| `runtime` | Resolveur facultatif pour activation et configuration d emplacements. |
| `nitroPlugin` | Plugin serveur facultatif pour les hooks. |

L hote valide les chemins de composants, gestionnaires, actifs et migrations afin qu ils restent dans le paquet d extension.

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

Utilisez `admin.streamConfig` lorsque l extension a besoin d options au niveau du volet:

```ts
admin: {
  streamConfig: {
    path: './components/ExampleStreamConfig.vue'
  }
}
```

Le composant recoit la config JSON courante avec `v-model` et le contexte du volet:

```vue
<script setup lang="ts">
import type { GcsExtensionJsonConfig, GcsResolvedExtension } from '@gcs-ssc/extensions'

defineProps<{
  extension: GcsResolvedExtension
  streamId: string
  transferPaymentId?: string
  agencyId?: string
}>()

const config = defineModel<GcsExtensionJsonConfig>({ required: true })
</script>
```

| Regle | Comportement |
| --- | --- |
| La config doit etre JSON | Utilisez seulement primitives, tableaux et objets. |
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

| Regle | Comportement |
| --- | --- |
| Declarez le RBAC pour les donnees d entite | L hote resout l entite, verifie l activation et applique le sujet/action. |
| Les parametres doivent etre explicites | `entity.param` doit correspondre a un parametre de route. |
| Utilisez `GcsExtensionUserError` pour les erreurs utilisateur | Utilisez des messages anglais/francais propres a l extension afin que l API retourne la bonne langue. |
| Validez toutes les entrees | Les gestionnaires d extension valident leurs propres requetes. |
| Respectez la propriete hote | Resoudre entente, promoteur, reclamation, surveillance, volet et agence avant d ecrire. |

## Actions De Creation

| Operation | Surface hote |
| --- | --- |
| `agreement.commitments.create` | Onglet Engagements de l entente. |
| `agreement.payments.create` | Onglet Paiements de l entente. |

```ts
client: {
  createActions: [
    {
      operation: 'agreement.payments.create',
      id: 'generate-payments',
      mode: 'replace',
      label: { en: 'Generate payments', fr: 'Generer les paiements' },
      icon: 'i-lucide-wand-sparkles',
      path: './components/GeneratePaymentsAction.vue',
      rbac: { subject: 'agreement', action: 'update' }
    }
  ]
}
```

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

## Migrations Et Donnees

```ts
import { defineGcsExtensionMigration } from '@gcs-ssc/extensions/server'

export default defineGcsExtensionMigration({
  async up(db) {
    await db.schema.withSchema('extensions').createTable('gcs_example_note').addColumn('id', 'uuid').execute()
  },
  async down(db) {
    await db.schema.withSchema('extensions').dropTable('gcs_example_note').execute()
  }
})
```

| Regle | Comportement |
| --- | --- |
| Les migrations appartiennent a l extension | Utilisez le schema `extensions` et des noms de table propres a l extension. |
| Les chemins sont listes dans le manifeste | L hote lance les migrations listees pour les extensions activees. |
| Les imports de paquet standard sont permis | Les fichiers de migration peuvent importer des dependances comme `kysely`; l hote les resout depuis l installation de l application. |
| L historique est propre a chaque extension | Chaque extension utilise ses propres tables d historique et de verrouillage; les migrations en attente sont suivies separement. |
| Les entrees KV conviennent a l etat simple | Stockez type de proprietaire, id, cle, valeur JSON et etat de suppression logique. |
| Les secrets utilisent le stockage chiffre | Utilisez les aides de secrets du SDK pour cles privees, jetons et identifiants API; ne les stockez pas dans la configuration ni dans le JSON KV. |
| Les workflows complexes meritent des tables explicites | Utilisez des migrations pour rapports, relations, etats ou gros dossiers. |

Les aides de secrets chiffres sont exposees par `@gcs-ssc/extensions/server`: `setEncryptedExtensionSecret`, `getEncryptedExtensionSecret` et `deleteEncryptedExtensionSecret`. Les deploiements de production doivent fournir `GCS_EXTENSION_SECRETS_KEY` comme cle de 32 octets encodee en base64.

## Actifs Et I18n

| Fonction | Champ | Guidance |
| --- | --- | --- |
| Actifs statiques | `assets` | Montez seulement les fichiers requis a l execution avec un `baseURL` unique. |
| Actifs de paquet | `assets.package` et `packagePath` | Utile pour modeles ou actifs tiers. |
| Messages bilingues | `i18n` | Fournissez libelles et erreurs anglais/francais. |
| CSS | `css` | Gardez les styles limites et evitez d ecraser globalement les jetons de l hote. |

## Liste De Verification

| Test | Resultat attendu |
| --- | --- |
| Import du manifeste | `extension.config.ts` importe et valide sans chemins internes de l hote. |
| Activation d agence | L extension apparait dans l onglet Extensions et les migrations s executent. |
| Configuration de volet | Le composant sauvegarde du JSON valide et rejette les combinaisons invalides. |
| Emplacements et onglets | Les composants apparaissent seulement lorsque activation et RBAC le permettent. |
| Gestionnaires serveur | Propriete, activation, RBAC et validation sont appliques. |
| Conflits d actions | Les remplacements multiples sont detectes. |
| Conflits de calculateurs | Les calculateurs multiples sont detectes. |
| Interface bilingue | Libelles, erreurs et onglets existent en anglais et francais. |
| Suppression logique | Les donnees d extension preservent l historique lorsque requis. |
