import { DEFAULT_LOCALE, localeConfig, localeFromPath, localizedPath } from './locales.mjs';

// Key: existing English path. Value: locales with a reviewed, published equivalent.
// Add a locale only after its page, shared chrome, and linked core journey pass review.
// No translated pages have completed that gate in this foundation slice.
export const PUBLISHED_TRANSLATIONS = Object.freeze({});

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
