# Document Generation

Agreement document generation uses stream-scoped templates, stored source attachments, and generated agreement attachments.

## Local tools

PDF generation needs LibreOffice for DOCX-to-PDF and Puppeteer for HTML-to-PDF. On Linux or WSL, install repo-local tools from the app repository:

```bash
bun run bun:docgen:install
bun run dev
```

The installer writes `LIBREOFFICE_SOFFICE_PATH` and `PUPPETEER_CACHE_DIR` into the normal Nuxt `.env` file. Use `DOCGEN_ENV_FILE=.env.production bun run bun:docgen:install` when targeting another env file.

## Runtime model

- Stream templates live on the stream Document Templates tab.
- Agreement generated documents live on the agreement Documents tab.
- DOCX templates are rendered with Docxtemplater and can output DOCX or PDF.
- HTML templates are rendered with the built-in tag renderer and output PDF.
- Generated files are stored as common attachments and downloaded through the agreement document API.

## Template tags

Use double-brace dotted tags such as `agreement.title`, `recipient.primary.legalName`, and `budget.totalProgramFunding`. Use section loops for arrays, for example `# activities`, `name`, and `/ activities`.

Missing values fall back to a language-specific placeholder. Extensions can add document-generation context providers through `event.context.documentGenerationContextProviders`.
