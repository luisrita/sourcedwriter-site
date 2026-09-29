import type { APIRoute } from 'astro';
import { entryMarkdown, faqMarkdown, productSummary, sortedDocs, sortedPosts } from '../lib/markdown';

// Every doc, guide and FAQ answer in one file, for LLMs that ingest a single document.
export const GET: APIRoute = async () => {
  const docs = await sortedDocs();
  const posts = await sortedPosts();

  const body = [
    productSummary(),
    '',
    faqMarkdown(),
    '# Documentation',
    '',
    ...docs.map((d) => entryMarkdown(d).replace(/^# /, '## ').replace(/\n#/g, '\n##')),
    '# Guides',
    '',
    ...posts.map((p) => entryMarkdown(p).replace(/^# /, '## ').replace(/\n#/g, '\n##')),
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
