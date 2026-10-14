import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { productSummary, sortedDocs, sortedPosts } from '../lib/markdown';

// https://llmstxt.org — an index that points LLMs at clean Markdown versions of each page.
export const GET: APIRoute = async () => {
  const docs = await sortedDocs();
  const posts = await sortedPosts();
  const md = (collection: string, id: string) => `${SITE.url}/${collection}/${id}.md`;

  const body = [
    productSummary(),
    '',
    '## Docs',
    '',
    ...docs.map((d) => `- [${d.data.title}](${md('docs', d.id)}): ${d.data.description}`),
    '',
    '## Guides',
    '',
    ...posts.map((p) => `- [${p.data.title}](${md('blog', p.id)}): ${p.data.description}`),
    '',
    '## Product pages',
    '',
    `- [Features](${SITE.url}/features/): Every feature in the free plugin, with screenshots`,
    `- [Pricing](${SITE.url}/pricing/): Free plugin vs AI Blog Writer Pro (Creator and Agency plans), with the full comparison`,
    `- [See how it works](${SITE.url}/demo/): A step-by-step tour of one article, from the brief and source review to the cited draft in the block editor`,
    `- [For publishers](${SITE.url}/publishers/): For bloggers and site owners: cited drafts in your own voice on your own AI key, topic ideas, section rewrites, typical cost, and the Creator plan`,
    `- [For agencies](${SITE.url}/agencies/): Client drafts on each client's own AI key, writer profiles per client, Guided review, cost ceilings, and the Agency plan`,
    `- [FAQ](${SITE.url}/faq/): Auto-publishing, web search, models, costs, key safety, Rank Math, multisite`,
    `- [Changelog](${SITE.url}/changelog/): Release history`,
    '',
    '## Optional',
    '',
    `- [llms-full.txt](${SITE.url}/llms-full.txt): All docs, guides and the FAQ in one file`,
    `- [About](${SITE.url}/about/): Who builds the plugin and how to get in touch`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
