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

// The maker named in the Terms of sale; Freemius is the seller of record. A postal address
// (a business address is enough) is shown when set; whether it is required is part of
// the legal review. No tax number: Freemius's details are on the invoices.
export const SELLER = {
  name: 'Luis Rita',
  description: 'sole trader in Portugal',
  address: 'Av. 5 de Outubro nº17 (Ed. Tridente), Gabinete 4, Faro 8000-077, Portugal',
};

export const PLUGIN = {
  slug: 'luis-rita-ai-blog-writer',
  version: '1.6.0',
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

// The models offered in Settings, from includes/class-provider-catalog.php in the plugin;
// `recommended` is each provider's default. Update with any release that changes them.
export const MODELS = [
  {
    provider: 'OpenAI', constant: 'AIBCG_OPENAI_API_KEY', recommended: 'GPT-5.6 Luna',
    models: ['GPT-6 Astra', 'GPT-6.1 Sol', 'GPT-6 Luna', 'GPT-5.6 Sol', 'GPT-5.6 Terra', 'GPT-5.6 Luna', 'GPT-5.1', 'GPT-5', 'GPT-5 mini', 'GPT-4.1', 'GPT-4.1 mini', 'GPT-4o', 'GPT-4o mini'],
  },
  {
    provider: 'Anthropic', constant: 'AIBCG_ANTHROPIC_API_KEY', recommended: 'Claude Sonnet 5',
    models: ['Claude Opus 5.5', 'Claude Sonnet 5.5', 'Claude Haiku 5.5', 'Claude Opus 5', 'Claude Sonnet 5', 'Claude Haiku 4.5', 'Claude Opus 4.8', 'Claude Sonnet 4.6'],
  },
  {
    provider: 'Google', constant: 'AIBCG_GOOGLE_API_KEY', recommended: 'Gemini 3.6 Flash',
    models: ['Gemini 4 Argon', 'Gemini 3.8 Flash', 'Gemini 3.6 Flash', 'Gemini 3.5 Flash-Lite', 'Gemini 3.1 Pro Preview', 'Gemini 2.5 Flash'],
  },
  {
    provider: 'xAI', constant: 'AIBCG_XAI_API_KEY', recommended: 'Grok 4.5',
    models: ['Grok 4.7', 'Grok 4.5', 'Grok 4.3'],
  },
];

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
