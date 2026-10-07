import { localeConfig } from './locales.mjs';

// Supported by Freemius hosted checkout. Japanese and Portuguese currently fall back to English.
// https://v3.freemius.com/help/documentation/checkout/features/local-languages-currencies/
export function checkoutUrl(value, locale) {
  localeConfig(locale);
  const url = new URL(value);
  if (url.origin !== 'https://checkout.freemius.com') throw new TypeError('Expected Freemius checkout URL');
  url.searchParams.set('language', ['es', 'de', 'fr'].includes(locale) ? locale : 'en');
  return url.toString();
}
