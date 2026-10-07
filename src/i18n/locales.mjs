// Website locales are separate from WordPress interface and article preferences.
// English keeps its existing unprefixed URLs. Five editions are available in the development branch.
export const LOCALES = Object.freeze({
  en: Object.freeze({ path: '', lang: 'en', og: 'en_GB', wordpress: 'en_US', label: 'English' }),
  ja: Object.freeze({ path: 'ja', lang: 'ja', og: 'ja_JP', wordpress: 'ja', label: '日本語' }),
  es: Object.freeze({ path: 'es', lang: 'es', og: 'es_ES', wordpress: 'es_ES', label: 'Español' }),
  de: Object.freeze({ path: 'de', lang: 'de', og: 'de_DE', wordpress: 'de_DE', label: 'Deutsch' }),
  fr: Object.freeze({ path: 'fr', lang: 'fr', og: 'fr_FR', wordpress: 'fr_FR', label: 'Français' }),
  'pt-BR': Object.freeze({ path: 'pt-br', lang: 'pt-BR', og: 'pt_BR', wordpress: 'pt_BR', label: 'Português (Brasil)' }),
  'pt-PT': Object.freeze({ path: 'pt-pt', lang: 'pt-PT', og: 'pt_PT', wordpress: 'pt_PT', label: 'Português (Portugal)' }),
});

export const DEFAULT_LOCALE = 'en';
export const LAUNCH_LOCALES = Object.freeze(['en', 'ja', 'es', 'de', 'fr', 'pt-BR']);
export const ASTRO_I18N = {
  defaultLocale: DEFAULT_LOCALE,
  locales: Object.entries(LOCALES).map(([code, locale]) =>
    locale.path && locale.path !== code ? { path: locale.path, codes: [code] } : code,
  ),
  routing: { prefixDefaultLocale: false },
};

export function localeConfig(code) {
  if (!Object.hasOwn(LOCALES, code)) throw new RangeError(`Unknown locale: ${code}`);
  return LOCALES[code];
}

function internalUrl(path) {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//') || path.includes('\\')) {
    throw new TypeError('Expected a root-relative internal URL.');
  }
  const url = new URL(path, 'https://local.invalid');
  if (url.pathname.startsWith('//')) throw new TypeError('Expected a local path.');
  return url;
}

export function localeFromPath(path) {
  const url = internalUrl(path);
  const prefix = url.pathname.split('/')[1];
  return Object.entries(LOCALES).find(([, locale]) => locale.path && locale.path === prefix)?.[0] ?? DEFAULT_LOCALE;
}

// Preserve campaign parameters and fragments when switching equivalent pages.
export function localizedPath(path, code) {
  const url = internalUrl(path);
  const current = localeConfig(localeFromPath(path));
  const target = localeConfig(code);
  let pathname = current.path ? url.pathname.slice(current.path.length + 1) : url.pathname;
  pathname = pathname || '/';
  if (pathname.startsWith('//')) throw new TypeError('Expected a local path after locale removal.');
  if (!pathname.endsWith('/') && !pathname.split('/').at(-1).includes('.')) pathname += '/';
  return `${target.path ? '/' + target.path : ''}${pathname}${url.search}${url.hash}`;
}
