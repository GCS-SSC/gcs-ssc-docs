# Génération de documents

La génération de documents d'entente réunit les modèles bilingues du volet, les données actuelles de l'entente, le stockage de pièces jointes par fournisseur et un dossier d'instantané généré. Le parcours utilisateur et les cinq contrats de route sont décrits dans [Documents d'entente](../agreements/documents.md).

## Pipeline d'exécution

La route de génération capture un instantané autorisé de la base, résout le modèle actif exact et le format demandé, puis charge la source linguistique auprès du fournisseur enregistré sur la pièce. Elle hydrate le contexte localisé et effectue le rendu hors de la transaction d’écriture de l’entente.

Une limite locale au processus autorise deux rendus concurrents par paire organisme/utilisateur; les requêtes supplémentaires reçoivent `429 DOCUMENT_RENDER_BUSY`. Après le rendu, une courte transaction à autorisation actualisée revérifie portée, affectation, cycle de vie et empreinte SHA-256 du contexte principal courant. Des données modifiées produisent `409 DOCUMENT_RENDER_INPUT_CHANGED` au lieu d’enregistrer une sortie périmée. Actualisez et recommencez après stabilisation des sources.

La persistance écrit un objet chez le fournisseur, une pièce commune et un document généré. Un échec de métadonnées tente le nettoyage de l’objet; un échec du dossier généré retire et nettoie sa pièce. Le stockage externe et la base ne forment pas une transaction atomique. Le nettoyage des documents et modèles utilise une compensation au mieux et journalise les échecs; ne supposez pas que chacun possède un travail dans la file des téléversements partagés.

## Rendu et frontière de confiance

Le traitement DOCX normalise les balises à doubles accolades dans `word/*.xml`, puis utilise Docxtemplater avec boucles de paragraphes, sauts de ligne, recherche dans les portées parentes et valeur de remplacement localisée. Le traitement HTML accepte les substitutions pointées et une forme de boucle de collection, et échappe toute valeur substituée.

La conversion HTML vers PDF démarre un navigateur Puppeteer sans interface, désactive JavaScript dans la page et interrompt les requêtes sauf `data:` et `about:`. DOCX vers PDF utilise `libreoffice-convert`; `LIBREOFFICE_SOFFICE_PATH` remplace l'enveloppe `scripts/soffice-flatpak` du dépôt. Un échec de conversion devient l’erreur localisée `LIBREOFFICE_UNAVAILABLE`. LibreOffice dispose de 30 secondes. Chromium partage un budget de rendu de 30 secondes entre ses étapes, avec une limite distincte de deux secondes pour le nettoyage, plutôt qu’un délai complet renouvelé à chaque étape.

Les auteurs de modèles sont des auteurs de contenu privilégiés. Le HTML natif conserve le balisage du modèle, et Puppeteer démarre avec `--no-sandbox`; déployez le service dans la frontière non privilégiée et conteneurisée documentée et réservez la gestion des modèles aux administrateurs de confiance.

## Contrat de contexte

Les clés de premier niveau stables comprennent actuellement `agreement`, `agency`, `department`, `program`, `stream`, `recipient`, `budget`, `activities`, `outcomes`, `expectedOutcomes`, `commitments`, `payments`, `claims` et `forecasts`. Les valeurs absentes deviennent `To be confirmed` ou `A confirmer`; les dates deviennent `YYYY-MM-DD` en format ISO et les montants utilisent le formatage CAD localisé.

L'objet intégré `department` contient des données fixes de Santé Canada plutôt que la configuration d'agence. `recipient.primary` est le premier bénéficiaire lié selon son identifiant, avec la première adresse active trouvée pour lui. Les auteurs de modèles doivent tenir compte de ces deux limites.

L'utilitaire fusionne profondément, de façon séquentielle, les fonctions présentes dans `event.context.documentGenerationContextProviders`. Aucun module, plugiciel hôte ni extension installée actuelle n'enregistre cette propriété. Il s'agit donc d'un point d'intégration interne propre à l'événement, et non d'une capacité déclarée du SDK d'extension. Si une intégration hôte autorisée fournit des fonctions, les dernières remplacent les valeurs scalaires et les tableaux et fusionnent récursivement les objets; elles hydratent les données de rendu hors de la transaction finale d’écriture et peuvent faire échouer la requête.

## Stockage et dossiers

`writeStoredFile` assainit les segments du nom d’objet proposé, crée ou réutilise un type de pièce de l’organisme et délègue les octets au fournisseur sélectionné. La pièce conserve l’identifiant du fournisseur, l’identité opaque de l’objet, le localisateur JSON réservé au serveur, le type MIME, la taille, le nom original, les métadonnées bilingues et la date. `Funding_Case_Agreement_Generated_Document` lie l’entente, le modèle, la pièce produite, la langue et le format.

Lecture et suppression utilisent le fournisseur enregistré, pas la sélection courante pour les nouveaux fichiers. Aucun repli local n’existe. Les identifiants, la durabilité des objets et l’infrastructure relèvent de la configuration du fournisseur. Conservez toutes les implémentations et tous les objets référencés avec la sauvegarde de base.

La suppression retire le dossier généré et sa pièce, puis tente le nettoyage externe. Un échec est journalisé sans restaurer les métadonnées. Le téléchargement exige la relation active exacte accessible et renvoie les en-têtes de type MIME, nom et taille enregistrés. Ces documents sont distincts de la liste des [Pièces jointes](../concepts/attachments.md) téléversées manuellement.

## Outils locaux

Sous Linux ou WSL, installez les outils de conversion propres au dépôt depuis la racine de l'application :

```bash
bun run bun:docgen:install
bun run dev
```

L'installateur met à jour `LIBREOFFICE_SOFFICE_PATH` et `PUPPETEER_CACHE_DIR` dans le fichier Nuxt `.env` ordinaire. Définissez `DOCGEN_ENV_FILE=.env.production` seulement pour viser volontairement un autre fichier d'environnement. Consultez [Démarrage pour les développeurs](./startup.md) et [Déploiement pour l'exploitation](../operator/deployment.md).
