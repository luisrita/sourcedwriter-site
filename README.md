# sourcedwriter.com

Marketing and documentation site for **AI Blog Writer with Sources**, built with Astro and deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev
npm run build
```

## Where things live

- `src/config.ts`: product name, URLs, plugin version and WordPress.org links
- `src/content/docs/`: documentation (Markdown, ordered by `order`)
- `src/content/blog/`: guides and articles
- `src/lib/faq.ts`: FAQ shared by `/faq/`, JSON-LD and `llms-full.txt`
- `src/lib/schema.ts`: JSON-LD graph (WebSite, Person, SoftwareApplication, Article, FAQPage, BreadcrumbList)

## LLM and search endpoints

- `/llms.txt`: an index of the site for LLMs ([llmstxt.org](https://llmstxt.org))
- `/llms-full.txt`: all docs, guides and the FAQ in one file
- `/docs/<slug>.md` and `/blog/<slug>.md`: a Markdown copy of each page
- `/robots.txt`: lets search and AI crawlers in and points to the sitemap
- `/sitemap-index.xml` and `/rss.xml`

## When a new plugin version ships

Update `PLUGIN.version` and `testedUpTo` in `src/config.ts`, and add an entry to `src/pages/changelog.astro`. Update any docs the release changes.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`. In the repository settings, set **Pages → Source** to **GitHub Actions**. `public/CNAME` holds the custom domain.
