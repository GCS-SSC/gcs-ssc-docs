# Génération de documents

La génération de documents d'entente réunit les modèles bilingues du volet, les données actuelles de l'entente, le stockage local de pièces jointes et un dossier d'instantané généré. Le parcours utilisateur et les cinq contrats de route sont décrits dans [Documents d'entente](../agreements/documents.md).

## Pipeline d'exécution

`generateAgreementDocument` dans `server/utils/document-generation.ts` exécute la séquence suivante dans la transaction de création d'entente dont l'autorisation vient d'être renouvelée :

1. résoudre un modèle `fundingcaseagreement` actif du volet actuel de l'entente;
2. confirmer que la sortie demandée figure dans `egcs_tp_outputformats`;
3. lire la pièce jointe source anglaise ou française au moyen du fournisseur local;
4. construire le contexte localisé à partir des relations actuelles de l'entente;
5. effectuer le rendu DOCX ou HTML natif, ou le convertir en PDF;
6. écrire une pièce jointe commune privée;
7. insérer `Funding_Case_Agreement_Generated_Document`.

L'échec de l'insertion des métadonnées de pièce jointe supprime le nouvel objet. L'échec de l'insertion du dossier généré supprime logiquement la pièce jointe et retire son objet. Puisque les octets du système de fichiers ne participent pas à la transaction PostgreSQL/PGlite, les exploitants doivent tout de même détecter les écarts entre stockage et base de données lors d'une interruption de processus ou d'un échec de validation.

## Rendu et frontière de confiance

Le traitement DOCX normalise les balises à doubles accolades dans `word/*.xml`, puis utilise Docxtemplater avec boucles de paragraphes, sauts de ligne, recherche dans les portées parentes et valeur de remplacement localisée. Le traitement HTML accepte les substitutions pointées et une forme de boucle de collection, et échappe toute valeur substituée.

La conversion HTML vers PDF démarre un navigateur Puppeteer sans interface, désactive JavaScript dans la page et interrompt les requêtes sauf `data:` et `about:`. DOCX vers PDF utilise `libreoffice-convert`; `LIBREOFFICE_SOFFICE_PATH` remplace l'enveloppe `scripts/soffice-flatpak` du dépôt. Un échec de conversion devient l'erreur localisée `LIBREOFFICE_UNAVAILABLE`.

Les auteurs de modèles sont des auteurs de contenu privilégiés. Le HTML natif conserve le balisage du modèle, et Puppeteer démarre avec `--no-sandbox`; déployez le service dans la frontière non privilégiée et conteneurisée documentée et réservez la gestion des modèles aux administrateurs de confiance.

## Contrat de contexte

Les clés de premier niveau stables comprennent actuellement `agreement`, `agency`, `department`, `program`, `stream`, `recipient`, `budget`, `activities`, `outcomes`, `expectedOutcomes`, `commitments`, `payments`, `claims` et `forecasts`. Les valeurs absentes deviennent `To be confirmed` ou `A confirmer`; les dates deviennent `YYYY-MM-DD` en format ISO et les montants utilisent le formatage CAD localisé.

L'objet intégré `department` contient des données fixes de Santé Canada plutôt que la configuration d'agence. `recipient.primary` est le premier bénéficiaire lié selon son identifiant, avec la première adresse active trouvée pour lui. Les auteurs de modèles doivent tenir compte de ces deux limites.

L'utilitaire fusionne profondément, de façon séquentielle, les fonctions présentes dans `event.context.documentGenerationContextProviders`. Aucun module, plugiciel hôte ni extension installée actuelle n'enregistre cette propriété. Il s'agit donc d'un point d'intégration interne propre à l'événement, et non d'une capacité déclarée du SDK d'extension. Si une intégration hôte autorisée fournit des fonctions, les dernières remplacent les valeurs scalaires et les tableaux et fusionnent récursivement les objets; elles s'exécutent dans la transaction de génération et peuvent faire échouer la requête.

## Stockage et dossiers

`writeStoredFile` assainit les segments de nom et de dossier, crée ou réutilise le type de pièce jointe de l'agence, écrit dans le compartiment `local-document-templates`, puis conserve le fournisseur, la clé d'objet, le type MIME, la taille, les noms, les descriptions et l'heure de création. `Funding_Case_Agreement_Generated_Document` référence l'entente, le modèle et la pièce jointe générée et limite le format à `docx`, `html` ou `pdf`.

Le stockage local rejette les chemins absolus ou traversants, les liens symboliques, les objets non réguliers, la mauvaise propriété POSIX, l'accès du groupe ou des autres et les espaces de noms ancêtres non sécuritaires. Il écrit un fichier temporaire exclusif de mode 0600, puis le renomme atomiquement. Configurez `GCS_LOCAL_FILE_STORAGE_DIR` comme chemin durable appartenant au service et sauvegardez-le avec la base de données.

La suppression active logiquement le document généré et la pièce jointe dans une transaction, puis supprime les octets après la validation. Un échec de nettoyage autre que ENOENT est journalisé sans annuler la suppression des métadonnées. Le téléchargement exige l'appartenance à l'entente et des dossiers actifs, puis retourne les en-têtes de type MIME, de nom et de longueur enregistrés.

## Outils locaux

Sous Linux ou WSL, installez les outils de conversion propres au dépôt depuis la racine de l'application :

```bash
bun run bun:docgen:install
bun run dev
```

L'installateur met à jour `LIBREOFFICE_SOFFICE_PATH` et `PUPPETEER_CACHE_DIR` dans le fichier Nuxt `.env` ordinaire. Définissez `DOCGEN_ENV_FILE=.env.production` seulement pour viser volontairement un autre fichier d'environnement. Consultez [Démarrage pour les développeurs](./startup.md) et [Déploiement pour l'exploitation](../operator/deployment.md).
