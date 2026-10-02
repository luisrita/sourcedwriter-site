// Single source of truth for names, URLs and release facts.
// Change the brand here and every page, schema block and llms.txt follows.

export const SITE = {
  url: 'https://sourcedwriter.com',
  domain: 'sourcedwriter.com',
  // Public product name. Keep it identical everywhere so search engines and
  // LLMs resolve every page to one entity.
  productName: 'AI Blog Writer with Sources',
  shortName: 'AI Blog Writer',
  tagline: 'Source-backed WordPress drafts you can check before you publish',
  description:
    'A WordPress plugin that turns your brief and the sources you choose into an editable draft with citations, warnings and provenance. Bring your own OpenAI, Claude, Gemini or Grok API key. Never publishes automatically.',
  author: {
    name: 'Luis Rita',
    url: 'https://sourcedwriter.com/about/',
  },
  contactEmail: 'info@sourcedwriter.com',
  locale: 'en_GB',
  lang: 'en',
  ogImage: '/images/og-default.png',
};

export const PLUGIN = {
  slug: 'luis-rita-ai-blog-writer',
  version: '1.1.0',
  requiresWp: '6.0',
  testedUpTo: '7.1',
  requiresPhp: '7.4',
  license: 'GPL-2.0-or-later',
  licenseUrl: 'https://www.gnu.org/licenses/gpl-2.0.html',
  wordpressOrgUrl: 'https://wordpress.org/plugins/luis-rita-ai-blog-writer/',
  // Always serves the current stable release.
  downloadUrl: 'https://downloads.wordpress.org/plugin/luis-rita-ai-blog-writer.zip',
  released: '2026-09-30',
  providers: ['OpenAI (GPT)', 'Anthropic (Claude)', 'Google (Gemini)', 'xAI (Grok)'],
};

export const NAV = [
  { href: '/features/', label: 'Features' },
  { href: '/docs/', label: 'Docs' },
  { href: '/blog/', label: 'Guides' },
  { href: '/faq/', label: 'FAQ' },
];

export const absolute = (path: string) => new URL(path, SITE.url).toString();
