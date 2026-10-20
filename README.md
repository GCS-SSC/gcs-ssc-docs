# GCS-SSC documentation

English and French guides for using GCS-SSC to manage grants and contributions. The site also includes setup instructions for administrators and technical references for developers and operators.

Start with [the English guide](en/index.md) or [le guide français](fr/index.md). The commands below are for people editing or maintaining this documentation.

Use Bun 1.3.13 to run these commands.

## Local development

```sh
bun install
bun run docs:dev
```

Open the local address printed in the terminal. For example, after editing a payment guide, use this preview to check its wording and links in both languages.

## Build

```sh
bun run docs:build
```

For wording changes, run the complete documentation check against the application's ignored reference clone at `.reference-repos/gcs-ssc`:

```sh
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check
```

This checks matching English and French page structure, coverage, navigation, links and headings, then builds the site. After application-driven updates, regenerate the source inventory and API reference before checking:

```sh
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:inventory
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:references
GCS_SSC_SOURCE=.reference-repos/gcs-ssc bun run docs:check
```

Keep matching English and French pages aligned. Follow [the repository guidance](AGENTS.md) when preparing the reference clone or synchronizing application changes.

The GitHub Pages workflow publishes the site from `main` with `VITEPRESS_BASE=/gcs-ssc-docs/`.
