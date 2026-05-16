# Generation de documents

La generation de documents d entente utilise des modeles portes par le volet, des pieces jointes source stockees et des pieces jointes generees sur l entente.

## Outils locaux

La generation PDF exige LibreOffice pour DOCX vers PDF et Puppeteer pour HTML vers PDF. Sur Linux ou WSL, installez les outils locaux depuis le depot de l application :

```bash
bun run bun:docgen:install
bun run dev
```

L installateur ecrit `LIBREOFFICE_SOFFICE_PATH` et `PUPPETEER_CACHE_DIR` dans le fichier Nuxt `.env` normal. Utilisez `DOCGEN_ENV_FILE=.env.production bun run bun:docgen:install` pour cibler un autre fichier d environnement.

## Modele d execution

- Les modeles du volet vivent dans l onglet Modeles de document du volet.
- Les documents generes vivent dans l onglet Documents de l entente.
- Les modeles DOCX sont rendus avec Docxtemplater et peuvent produire DOCX ou PDF.
- Les modeles HTML sont rendus avec le moteur de balises integre et produisent PDF.
- Les fichiers generes sont stockes comme pieces jointes communes et telecharges par l API de documents d entente.

## Balises de modele

Utilisez des balises pointees a doubles accolades comme `agreement.title`, `recipient.primary.legalName` et `budget.totalProgramFunding`. Utilisez des boucles de section pour les tableaux, par exemple `# activities`, `name` et `/ activities`.

Les valeurs manquantes utilisent une valeur de remplacement selon la langue. Les extensions peuvent ajouter des fournisseurs de contexte de generation par `event.context.documentGenerationContextProviders`.
