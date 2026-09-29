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
