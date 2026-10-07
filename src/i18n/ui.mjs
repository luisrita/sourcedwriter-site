import messages from './ui.json' with { type: 'json' };
import { localeConfig } from './locales.mjs';

export function translate(key, locale = 'en', values = {}) {
  localeConfig(locale);
  const text = locale === 'en' ? key : messages[locale]?.[key];
  if (text === undefined) throw new Error(`Missing ${locale} UI translation: ${key}`);
  return interpolate(text, values);
}

export function interpolate(text, values = {}) {
  return text.replace(/\{([a-z]+)\}/g, (match, key) => {
    if (!Object.hasOwn(values, key)) throw new Error(`Missing interpolation value: ${key}`);
    return String(values[key]);
  });
}
