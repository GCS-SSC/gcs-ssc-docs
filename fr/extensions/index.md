# Extensions installées

GCS-SSC comprend des extensions facultatives pour des processus financiers et narratifs spécialisés. Une extension installée ne produit aucun effet tant qu’elle n’est pas activée pour une agence et, s’il y a lieu, pour un volet de paiements de transfert.

| Extension                                                        | But                                                                                                                  | Portée de la configuration                        |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [Paiements automatisés](automated-payments.md)                   | Calcule un montant et un plafond de paiement à partir des données financières de l’entente et des règles de retenue. | Volet                                             |
| [Intégration GC Forms](gc-forms.md)                              | Associe les soumissions GC Forms aux dossiers GCS pris en charge.                                                     | Identifiants d’agence et correspondances de volet |
| [Qualité narrative](narrative-quality.md)                        | Évalue dans le navigateur les champs narratifs configurés.                                                           | Volet et champ cible                              |
| [Étiquettes narratives](narrative-tags.md)                       | Suggère et stocke des étiquettes prédéfinies ou dynamiques pour les descriptions d’entente et de promoteur.          | Volet et champ cible                              |
| [Répartition des coûts par résultat](outcome-cost-allocation.md) | Répartit le financement d’une entente par résultat et génère des engagements et des paiements gérés.                 | Volet et entente                                  |

Les administrateurs devraient lire [Extensions](../concepts/extensions.md) avant d’activer un paquet. Les développeurs devraient consulter [Créer des extensions](../developer/extensions-authoring.md) et utiliser le SDK public `@gcs-ssc/extensions`.

## Principes d’exploitation

- Activez une extension pour l’agence avant de configurer un volet.
- Exécutez ses migrations avant d’utiliser les fonctions qui stockent des données propres à l’extension.
- Traitez la configuration du volet comme une configuration opérationnelle et examinez-la avant de modifier un flux actif.
- Conservez les identifiants sensibles dans le stockage chiffré de secrets, jamais dans le JSON du volet.
- Testez le processus d’entente, de paiement, de réclamation ou de contenu narratif touché après une mise à jour.
