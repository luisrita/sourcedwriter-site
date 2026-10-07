import { DEFAULT_LOCALE, localeConfig, localeFromPath, localizedPath } from './locales.mjs';

// Equivalents included in the development build; fluent release review is pending.
export const PUBLISHED_TRANSLATIONS = Object.freeze(Object.fromEntries(
  ["/", "/features/", "/pricing/", "/faq/", "/about/", "/privacy/", "/changelog/", "/docs/", "/docs/getting-started/", "/docs/ai-providers-and-api-keys/", "/docs/background-jobs-and-wp-cron/", "/docs/delegated-and-guided-workflows/", "/docs/editor-sidebar-and-rank-math/", "/docs/sources-and-citations/", "/docs/writer-profiles/", "/docs/usage-and-cost-ceilings/", "/docs/troubleshooting/", "/docs/privacy-and-external-services/", "/docs/ai-blog-writer-pro/"].map((path) => [path, Object.freeze(['en', 'ja', 'es', 'de', 'fr', 'pt-BR'])]),
));

export function pageAlternates(path, published = PUBLISHED_TRANSLATIONS) {
  const pathname = new URL(path, 'https://local.invalid').pathname;
  const englishPath = localizedPath(pathname, DEFAULT_LOCALE);
  const current = localeFromPath(path);
  const available = published[englishPath] ?? [DEFAULT_LOCALE];
  if (!available.includes(DEFAULT_LOCALE) || !available.includes(current)) {
    throw new Error(`Missing published equivalent for ${path}`);
  }
  return [...new Set(available)].map((code) => ({
    code,
    ...localeConfig(code),
    href: localizedPath(pathname, code),
  }));
}
