// JSON-LD builders. Every node uses a stable @id so search engines and
// LLM crawlers can join the site, the author and the plugin into one graph.
import { SITE, PLUGIN, absolute } from '../config';

const ids = {
  website: absolute('/#website'),
  person: absolute('/about/#person'),
  software: absolute('/#software'),
};

export const personNode = () => ({
  '@type': 'Person',
  '@id': ids.person,
  name: SITE.author.name,
  url: SITE.author.url,
});

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': ids.website,
  url: absolute('/'),
  name: SITE.productName,
  alternateName: [SITE.shortName, SITE.domain],
  description: SITE.description,
  inLanguage: SITE.lang,
  publisher: { '@id': ids.person },
});

export const softwareNode = () => ({
  '@type': 'SoftwareApplication',
  '@id': ids.software,
  name: SITE.productName,
  alternateName: SITE.shortName,
  description: SITE.description,
  url: absolute('/'),
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'WordPress plugin',
  operatingSystem: `WordPress ${PLUGIN.requiresWp} or later, PHP ${PLUGIN.requiresPhp} or later`,
  softwareVersion: PLUGIN.version,
  license: PLUGIN.licenseUrl,
  isAccessibleForFree: true,
  author: { '@id': ids.person },
  image: absolute('/images/icon-256x256.png'),
  screenshot: [1, 2, 5, 9].map((n) => absolute(`/images/screenshot-${n}.png`)),
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  featureList: [
    'Drafts built from up to eight source URLs you choose',
    'Citations, warnings and provenance saved with every draft',
    'Delegated or Guided workflow with source and outline review',
    'Bring your own OpenAI, Anthropic, Google or xAI API key',
    'Writer profiles linked to WordPress authors',
    'Single-section rewrite in the block editor',
    'SEO metadata suggestions with optional Rank Math integration',
    'Usage tracking with an optional estimated cost ceiling',
    'Never publishes automatically',
  ],
  datePublished: PLUGIN.released,
  downloadUrl: PLUGIN.downloadUrl,
  installUrl: PLUGIN.wordpressOrgUrl,
  sameAs: [PLUGIN.wordpressOrgUrl],
});

export const breadcrumbNode = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absolute(item.path),
  })),
});

export const articleNode = (a: {
  path: string;
  title: string;
  description: string;
  published: Date;
  updated?: Date;
  type?: 'Article' | 'TechArticle';
}) => ({
  '@type': a.type ?? 'Article',
  '@id': absolute(`${a.path}#article`),
  headline: a.title,
  description: a.description,
  url: absolute(a.path),
  mainEntityOfPage: absolute(a.path),
  datePublished: a.published.toISOString(),
  dateModified: (a.updated ?? a.published).toISOString(),
  inLanguage: SITE.lang,
  author: { '@id': ids.person },
  publisher: { '@id': ids.person },
  image: absolute(SITE.ogImage),
  about: { '@id': ids.software },
  isPartOf: { '@id': ids.website },
});

export const faqNode = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export const graph = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
