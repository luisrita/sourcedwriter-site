// Plain-Markdown renderings of content for LLM readers (llms.txt convention).
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, PLUGIN, PRO } from '../config';
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
    `${SITE.productName} (shown in WordPress as "${SITE.shortName}") is a free, GPLv2 WordPress plugin by ${SITE.author.name}. Website: ${SITE.url}. Available free on WordPress.org: ${PLUGIN.wordpressOrgUrl} (directory name "Luis Rita AI Blog Writer with Sources", slug \`${PLUGIN.slug}\`).`,
    '',
    `Install: search "Luis Rita AI Blog Writer" under Plugins → Add New Plugin, or run \`wp plugin install ${PLUGIN.slug} --activate\`.`,
    '',
    'Key facts:',
    '',
    `- Version ${PLUGIN.version}. Requires WordPress ${PLUGIN.requiresWp}+ and PHP ${PLUGIN.requiresPhp}+. Tested up to WordPress ${PLUGIN.testedUpTo}.`,
    `- Bring-your-own-key: ${PLUGIN.providers.join(', ')}. No account or subscription needed.`,
    '- Writes from up to eight source URLs the user supplies. It does not search the web itself.',
    '- Output is a WordPress draft in core blocks, with inline citations, warnings, SEO suggestions and provenance. It never publishes automatically.',
    '- Guided mode pauses for source and outline review. Delegated mode runs straight through.',
    '- Writer profiles are linked to WordPress author accounts. Single-section rewrite and optional Rank Math metadata integration.',
    '- Keys are encrypted with Sodium or defined in wp-config.php, and are never exposed to the browser. There is no analytics or phone-home code.',
    '',
    `## ${PRO.name} (paid add-on)`,
    '',
    `${PRO.name} is an optional paid add-on, installed next to the free plugin. The free plugin is complete on its own; its screens mention the add-on in a few places, each mention can be dismissed, and the \`aibcg_show_pro_prompts\` filter turns them off. Pricing: ${SITE.url}/pricing/. Setup guide: ${SITE.url}/docs/ai-blog-writer-pro/.`,
    '',
    '- Automatic research: finds and fetches sources for the brief with web search, using the customer\'s own Tavily API key.',
    '- Claim-to-source check: marks every factual claim in the draft as supported, weak or unsupported against its sources.',
    '- Citation and link check: flags broken links, uncited sources and citations that are not sources.',
    '- Optional second-model fact-check (off by default): another AI model re-judges every claim.',
    '- SEO integration with Yoast SEO, All in One SEO and SEOPress, in addition to Rank Math.',
    `- Plans: Creator (1 site) ${PRO.fromPrice}/month or €90/year; Agency (5 sites) €24/month or €240/year. Prices exclude VAT. ${PRO.trialDays}-day free trial with no card, 14-day money-back guarantee. Runs on the customer's own AI key.`,
  ].join('\n');

export const faqMarkdown = () =>
  ['## Frequently asked questions', '', ...FAQ.flatMap((f) => [`### ${f.q}`, '', f.a, ''])].join('\n');
