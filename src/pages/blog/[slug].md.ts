import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { entryMarkdown } from '../../lib/markdown';

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(entryMarkdown(props.entry as CollectionEntry<'blog'>), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
