# Incidence documentaire de l’audit historique

Cette page consigne l’effet des constats d’audit historiques sur la documentation. Elle aide les responsables de la documentation à expliquer le comportement actuel et à retirer les conseils périmés. Les sources actuelles peuvent ne plus contenir les anciens dossiers d’audit; le registre peut donc être vide. Cela ne signifie **pas** que l’application n’a aucun journal d’audit; consultez les [journaux d’audit et d’accès](../admin/audit.md).

Par exemple, si un ancien constat décrivait un problème d’accès qui a été corrigé, le guide doit expliquer la règle d’accès actuelle. Il ne doit pas demander à un agent de répéter l’ancienne solution de contournement. Les responsables vérifient les sources actuelles et les tests de régression avant de considérer un élément comme entièrement vérifié. Les détails sensibles de sécurité, les diagnostics bruts, les identifiants et les anciennes étapes dangereuses sont omis.

## Règles de disposition

- Expliquer ce que l’application fait maintenant et ce que cela signifie pour l’agent.
- Retirer les anciennes solutions de contournement qui dépendaient d’une anomalie; ne pas les présenter comme des étapes prises en charge.
- Confirmer le comportement à l’aide du code exécutable actuel, des migrations de base de données, des connexions entre services en cours d’exécution et des tests de régression.
- Marquer un élément comme entièrement vérifié seulement après avoir documenté la règle actuelle en anglais et en français, ou après avoir consigné la preuve qu’elle ne s’applique plus.

## Registre des incidences (0)

| Élément | Domaine documentaire actuel | Disposition de l’incidence actuelle | Source |
| --- | --- | --- | --- |
