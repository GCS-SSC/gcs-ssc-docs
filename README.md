# GCS-SSC Documentation

Bilingual VitePress documentation for GCS-SSC.

Use Bun 1.3.13, matching the application repository.

## Local Development

```sh
bun install
bun run docs:dev
```

## Build

```sh
bun run docs:build
```

Regenerate source inventories and API route tables, then run the complete documentation gate:

```sh
bun run docs:inventory
bun run docs:references
bun run docs:check
```

The GitHub Pages workflow publishes the site from `main` with `VITEPRESS_BASE=/gcs-ssc-docs/`.
