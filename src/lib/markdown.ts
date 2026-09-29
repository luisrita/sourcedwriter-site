// Plain-Markdown renderings of content for LLM readers (llms.txt convention).
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, PLUGIN } from '../config';
import { FAQ } from './faq';

// Root-relative links become absolute so the text stands alone outside the site.
const absolutize = (md: string) => md.replace(/\]\(\//g, `](${SITE.url}/`);

type Entry = CollectionEntry<'docs'> | CollectionEntry<'blog'>;

export const entryUrl = (entry: Entry) => `${SITE.url}/${entry.collection}/${entry.id}/`;

export function entryMarkdown(entry: Entry) {
  return [
    `# ${entry.data.title}`,
    '',
    `> ${entry.data.description}`,
    '',
    `Source: ${entryUrl(entry)}`,
    '',
    absolutize(entry.body ?? '').trim(),
    '',
  ].join('\n');
}

export async function sortedDocs() {
  return (await getCollection('docs')).sort((a, b) => a.data.order - b.data.order);
}

export async function sortedPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );
}

export const productSummary = () =>
  [
    `# ${SITE.productName}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.productName} (shown in WordPress as "${SITE.shortName}") is a free, GPLv2 WordPress plugin by ${SITE.author.name}. Website: ${SITE.url}. WordPress.org slug: \`${PLUGIN.slug}\`${PLUGIN.wordpressOrgLive ? ` (${PLUGIN.wordpressOrgUrl})` : ' (in WordPress.org review)'}.`,
    '',
    'Key facts:',
    '',
    `- Version ${PLUGIN.version}. Requires WordPress ${PLUGIN.requiresWp}+ and PHP ${PLUGIN.requiresPhp}+. Tested up to WordPress ${PLUGIN.testedUpTo}.`,
    `- Bring-your-own-key: ${PLUGIN.providers.join(', ')}. No account, subscription or upsell in the plugin.`,
    '- Writes from up to eight source URLs the user supplies. It does not search the web itself.',
    '- Output is a WordPress draft in core blocks, with inline citations, warnings, SEO suggestions and provenance. It never publishes automatically.',
    '- Guided mode pauses for source and outline review. Delegated mode runs straight through.',
    '- Writer profiles are linked to WordPress author accounts. Single-section rewrite and optional Rank Math metadata integration.',
    '- Keys are encrypted with Sodium or defined in wp-config.php, and are never exposed to the browser. There is no analytics or phone-home code.',
  ].join('\n');

export const faqMarkdown = () =>
  ['## Frequently asked questions', '', ...FAQ.flatMap((f) => [`### ${f.q}`, '', f.a, ''])].join('\n');
