## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project notes

- Product facts must match the plugin's `readme.txt` (repo `luis-rita-ai-blog-writer-dev`). Do not claim features that aren't shipped, and don't mention planned paid features until they are released.
- Names, URLs and the launch flag live in `src/config.ts`. Never hard-code the product name elsewhere in templates.
- New docs and guides go in `src/content/`. They show up automatically in navigation, the sitemap, `llms.txt`, `llms-full.txt` and the `.md` endpoints.
