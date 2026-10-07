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
  version: '1.4.1',
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

// Freemius hosted checkout (product 40688). Agency covers 5 sites. Prices exclude VAT.
const checkout = 'https://checkout.freemius.com/product/40688/plan';

export const PRO = {
  name: 'AI Blog Writer Pro',
  fromPrice: '€9',
  prices: { creatorMonthly: 9, creatorYearly: 90, agencyMonthly: 24, agencyYearly: 240, currency: 'EUR' },
  trialDays: 14,
  trialUrl: `${checkout}/70382/currency/eur/?trial=free`,
  creatorUrl: `${checkout}/70382/currency/eur/?billing_cycle=annual`,
  agencyUrl: `${checkout}/70384/licenses/5/currency/eur/?billing_cycle=annual`,
};

export const NAV = [
  { href: '/features/', label: 'Features' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/docs/', label: 'Docs' },
  { href: '/blog/', label: 'Guides' },
  { href: '/faq/', label: 'FAQ' },
];

export const absolute = (path: string) => new URL(path, SITE.url).toString();
