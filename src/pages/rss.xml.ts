import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { sortedPosts } from '../lib/markdown';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const posts = await sortedPosts();
  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.id}/`;
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.data.description)}</description>
      <pubDate>${p.data.published.toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.productName)}: Guides</title>
    <link>${SITE.url}/blog/</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE.tagline)}</description>
    <language>${SITE.lang}</language>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
