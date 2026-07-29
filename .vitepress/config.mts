import { defineConfig } from 'vitepress'

const sharedSidebar = (locale: 'en' | 'fr') => {
  const p = `/${locale}/`
  const labels = locale === 'fr'
    ? {
        start: 'Démarrage',
        home: 'Accueil',
        login: 'Connexion',
        navigation: 'Navigation',
        setup: 'Système vide',
        admin: 'Administration',
        agencies: 'Agences',
        common: 'Commun',
        roles: 'Rôles',
        users: 'Utilisateurs',
        programs: 'Programmes',
        programOverview: 'Vue d’ensemble',
        streams: 'Volets',
        schemas: 'Schémas d’évaluation',
        templates: 'Modèles d’approbation',
        agreements: 'Ententes',
        agreementOverview: 'Vue d’ensemble',
        children: 'Flux enfants',
        budget: 'Budget',
        addresses: 'Adresses',
        agreementProponents: 'Promoteurs',
        activities: 'Activités',
        commitments: 'Engagements',
        payments: 'Paiements',
        forecasts: 'Prévisions',
        claims: 'Réclamations',
        documents: 'Documents',
        monitors: 'Surveillances',
        proponents: 'Promoteurs',
        proponentOverview: 'Vue d’ensemble',
        proponentFinancialIds: 'Identifiants financiers',
        proponentOtherNames: 'Autres noms',
        proponentAddresses: 'Adresses',
        proponentContacts: 'Contacts',
        proponentReviews: 'Examens',
        proponentAgreements: 'Ententes',
        proponentTeam: 'Équipe',
        concepts: 'Concepts',
        rbac: 'RBAC',
        extensions: 'Extensions',
        installedExtensions: 'Extensions installées',
        installedOverview: 'Vue d’ensemble',
        automatedPayments: 'Paiements automatisés',
        gcForms: 'Intégration GC Forms',
        narrativeQuality: 'Qualité narrative',
        narrativeTags: 'Étiquettes narratives',
        outcomeAllocation: 'Répartition des coûts par résultat',
        approvals: 'Approbations et achèvements',
        bilingualism: 'Bilinguisme',
        deletion: 'Suppression logique',
        developer: 'Référence développeur',
        architecture: 'Architecture',
        routes: 'Routes',
        testing: 'Tests',
        startup: 'Démarrage local',
        extensionAuthoring: 'Créer des extensions',
        documentGeneration: 'Génération de documents'
      }
    : {
        start: 'Getting Started',
        home: 'Home',
        login: 'Login',
        navigation: 'Navigation',
        setup: 'Empty System Setup',
        admin: 'Administration',
        agencies: 'Agencies',
        common: 'Common Admin',
        roles: 'Roles',
        users: 'Users',
        programs: 'Programs',
        programOverview: 'Overview',
        streams: 'Streams',
        schemas: 'Assessment Schemas',
        templates: 'Approval Templates',
        agreements: 'Agreements',
        agreementOverview: 'Overview',
        children: 'Child Workflows',
        budget: 'Budget',
        addresses: 'Addresses',
        agreementProponents: 'Proponents',
        activities: 'Activities',
        commitments: 'Commitments',
        payments: 'Payments',
        forecasts: 'Forecasts',
        claims: 'Claims',
        documents: 'Documents',
        monitors: 'Monitors',
        proponents: 'Proponents',
        proponentOverview: 'Overview',
        proponentFinancialIds: 'Agency Financial IDs',
        proponentOtherNames: 'Other Names',
        proponentAddresses: 'Addresses',
        proponentContacts: 'Contacts',
        proponentReviews: 'Reviews',
        proponentAgreements: 'Agreements',
        proponentTeam: 'Team',
        concepts: 'Concepts',
        rbac: 'RBAC',
        extensions: 'Extensions',
        installedExtensions: 'Installed Extensions',
        installedOverview: 'Overview',
        automatedPayments: 'Automated Payments',
        gcForms: 'GC Forms Integration',
        narrativeQuality: 'Narrative Quality',
        narrativeTags: 'Narrative Tags',
        outcomeAllocation: 'Outcome Cost Allocation',
        approvals: 'Approvals and Completions',
        bilingualism: 'Bilingualism',
        deletion: 'Soft Deletion',
        developer: 'Developer Reference',
        architecture: 'Architecture',
        routes: 'Routes',
        testing: 'Testing',
        startup: 'Startup',
        extensionAuthoring: 'Authoring Extensions',
        documentGeneration: 'Document Generation'
      }

  return [
    {
      text: labels.start,
      items: [
        { text: labels.home, link: p },
        { text: labels.login, link: `${p}getting-started/login` },
        { text: labels.navigation, link: `${p}getting-started/navigation` },
        { text: labels.setup, link: `${p}getting-started/empty-system-setup` }
      ]
    },
    {
      text: labels.admin,
      items: [
        { text: labels.agencies, link: `${p}admin/agencies` },
        { text: labels.common, link: `${p}admin/common-admin` },
        { text: labels.roles, link: `${p}admin/roles` },
        { text: labels.users, link: `${p}admin/users` }
      ]
    },
    {
      text: labels.programs,
      items: [
        { text: labels.programOverview, link: `${p}programs/` },
        { text: labels.streams, link: `${p}programs/streams` },
        { text: labels.schemas, link: `${p}programs/assessment-schemas` },
        { text: labels.templates, link: `${p}programs/approval-templates` }
      ]
    },
    {
      text: labels.agreements,
      items: [
        { text: labels.agreementOverview, link: `${p}agreements/` },
        { text: labels.children, link: `${p}agreements/child-workflows` },
        { text: labels.budget, link: `${p}agreements/budget` },
        { text: labels.addresses, link: `${p}agreements/addresses` },
        { text: labels.agreementProponents, link: `${p}agreements/applicant-recipients` },
        { text: labels.activities, link: `${p}agreements/activities` },
        { text: labels.commitments, link: `${p}agreements/commitments` },
        { text: labels.payments, link: `${p}agreements/payments` },
        { text: labels.forecasts, link: `${p}agreements/forecasts` },
        { text: labels.claims, link: `${p}agreements/claims` },
        { text: labels.documents, link: `${p}agreements/documents` },
        { text: labels.monitors, link: `${p}agreements/monitors` }
      ]
    },
    {
      text: labels.proponents,
      items: [
        { text: labels.proponentOverview, link: `${p}proponents/` },
        { text: labels.proponentFinancialIds, link: `${p}proponents/agency-financial-ids` },
        { text: labels.proponentOtherNames, link: `${p}proponents/other-names` },
        { text: labels.proponentAddresses, link: `${p}proponents/addresses` },
        { text: labels.proponentContacts, link: `${p}proponents/contacts` },
        { text: labels.proponentReviews, link: `${p}proponents/reviews` },
        { text: labels.proponentAgreements, link: `${p}proponents/agreements` },
        { text: labels.proponentTeam, link: `${p}proponents/team` }
      ]
    },
    {
      text: labels.concepts,
      items: [
        { text: labels.rbac, link: `${p}concepts/rbac` },
        { text: labels.extensions, link: `${p}concepts/extensions` },
        { text: labels.approvals, link: `${p}concepts/approvals-completions` },
        { text: labels.bilingualism, link: `${p}concepts/bilingualism` },
        { text: labels.deletion, link: `${p}concepts/soft-deletion` }
      ]
    },
    {
      text: labels.developer,
      items: [
        { text: labels.architecture, link: `${p}developer/architecture` },
        { text: labels.routes, link: `${p}developer/routes` },
        { text: labels.extensionAuthoring, link: `${p}developer/extensions-authoring` },
        { text: labels.documentGeneration, link: `${p}developer/document-generation` },
        { text: labels.testing, link: `${p}developer/testing` },
        { text: labels.startup, link: `${p}developer/startup` }
      ]
    },
    {
      text: labels.installedExtensions,
      items: [
        { text: labels.installedOverview, link: `${p}extensions/` },
        { text: labels.automatedPayments, link: `${p}extensions/automated-payments` },
        { text: labels.gcForms, link: `${p}extensions/gc-forms` },
        { text: labels.narrativeQuality, link: `${p}extensions/narrative-quality` },
        { text: labels.narrativeTags, link: `${p}extensions/narrative-tags` },
        { text: labels.outcomeAllocation, link: `${p}extensions/outcome-cost-allocation` }
      ]
    }
  ]
}

export default defineConfig({
  base: process.env.VITEPRESS_BASE ?? '/',
  title: 'GCS-SSC Documentation',
  description: 'Bilingual documentation for the Grants and Contributions System',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'English', link: '/en/' },
      { text: 'Français', link: '/fr/' }
    ],
    sidebar: sharedSidebar('en'),
    search: {
      provider: 'local'
    }
  },
  locales: {
    en: {
      label: 'English',
      lang: 'en-CA',
      title: 'GCS-SSC Documentation',
      description: 'Documentation for GCS-SSC',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Extensions', link: '/en/extensions/' },
          { text: 'Français', link: '/fr/' }
        ],
        sidebar: sharedSidebar('en')
      }
    },
    fr: {
      label: 'Français',
      lang: 'fr-CA',
      title: 'Documentation GCS-SSC',
      description: 'Documentation de GCS-SSC',
      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/fr/' },
          { text: 'Extensions', link: '/fr/extensions/' },
          { text: 'English', link: '/en/' }
        ],
        sidebar: sharedSidebar('fr')
      }
    }
  }
})
