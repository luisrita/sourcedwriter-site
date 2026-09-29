import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { entryMarkdown } from '../../lib/markdown';

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs');
  return docs.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(entryMarkdown(props.entry as CollectionEntry<'docs'>), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
