import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ASTRO_I18N, LAUNCH_LOCALES, localeConfig, localeFromPath, localizedPath } from '../src/i18n/locales.mjs';
import { readFileSync, readdirSync } from 'node:fs';
import { checkoutUrl } from '../src/i18n/checkout.mjs';
import { translate, interpolate } from '../src/i18n/ui.mjs';
import { pageAlternates, PUBLISHED_TRANSLATIONS } from '../src/i18n/pages.mjs';

test('English URLs remain unchanged and regional Portuguese stays separate', () => {
  assert.equal(ASTRO_I18N.routing.prefixDefaultLocale, false);
  assert.equal(localizedPath('/pricing/', 'en'), '/pricing/');
  assert.equal(localizedPath('/', 'pt-BR'), '/pt-br/');
  assert.equal(localizedPath('/pt-br/pricing/', 'pt-PT'), '/pt-pt/pricing/');
  assert.equal(localeConfig('pt-BR').wordpress, 'pt_BR');
  assert.equal(localeConfig('pt-PT').wordpress, 'pt_PT');
  assert.equal(LAUNCH_LOCALES.length, 6);
});

test('switching keeps page context, query parameters, and anchors', () => {
  const page = '/de/docs/troubleshooting/?utm_source=wordpress#missing-api-key';
  assert.equal(localeFromPath(page), 'de');
  assert.equal(localizedPath(page, 'ja'), '/ja/docs/troubleshooting/?utm_source=wordpress#missing-api-key');
  assert.equal(localizedPath(page, 'en'), '/docs/troubleshooting/?utm_source=wordpress#missing-api-key');
  assert.equal(localeFromPath('/delegated/'), 'en');
  assert.equal(localizedPath('/ja/rss.xml', 'en'), '/rss.xml');
});

test('invalid locale and non-local URLs cannot produce navigation targets', () => {
  assert.throws(() => localizedPath('/pricing/', 'xx'), RangeError);
  for (const path of ['https://example.com/', '//example.com/', '/\\example.com/']) {
    assert.throws(() => localizedPath(path, 'de'), TypeError);
  }
});

test('only published equivalent pages appear in language and SEO links', () => {
  assert.deepEqual(pageAlternates('/pricing/').map((entry) => entry.code), LAUNCH_LOCALES);
  assert.equal(pageAlternates('/ja/pricing/').length, 6);
  assert.deepEqual(pageAlternates('/blog/').map((entry) => entry.code), ['en']);
  const published = { '/pricing/': ['en', 'ja', 'pt-BR'] };
  const links = pageAlternates('/ja/pricing/', published);
  assert.deepEqual(links.map((entry) => entry.href), ['/pricing/', '/ja/pricing/', '/pt-br/pricing/']);
  assert.deepEqual(links.map((entry) => entry.lang), ['en', 'ja', 'pt-BR']);
  assert.throws(() => pageAlternates('/de/pricing/', published), /Missing published equivalent/);
  assert.deepEqual(pageAlternates('/faq/', published).map((entry) => entry.code), ['en']);
});

test('removing a locale prefix cannot create a protocol-relative URL', () => {
  assert.throws(() => localizedPath('/ja//example.com/', 'en'), TypeError);
  assert.throws(() => localizedPath('/ja/..//example.com/', 'en'), TypeError);
});

test('all registered equivalents have content, translated FAQs and exact plugin help anchors', () => {
  const values = {product: 'P', pro: 'Pro', author: 'A', email: 'a@example.com', version: '1', wp: '6', php: '7.4', creatormonthly: '€9', creatoryearly: '€90', agencymonthly: '€24', agencyyearly: '€240'};
  const anchors = ['missing-api-key', 'invalid-api-key', 'constant-api-key', 'credential-storage-unavailable', 'model-unavailable', 'provider-unreachable', 'provider-refusal', 'invalid-provider-response', 'cost-limit-reached', 'jobs-stay-queued', 'duplicate-job', 'stage-failed', 'extension-error', 'invalid-outline', 'source-urls-fail', 'section-rewrite', 'writer-profile-author', 'seo-plugin-unavailable', 'rate-limit', 'provider-unavailable', 'provider-rejected'];
  for (const locale of LAUNCH_LOCALES.filter((code) => code !== 'en')) {
    const dir = new URL(`../src/content/localized/${locale}/`, import.meta.url);
    const pages = readdirSync(dir).map((file) => JSON.parse(readFileSync(new URL(file, dir), 'utf8')));
    assert.equal(pages.length, Object.keys(PUBLISHED_TRANSLATIONS).length);
    for (const page of pages) {
      assert.ok(PUBLISHED_TRANSLATIONS[page.route ? `/${page.route}/` : '/'].includes(locale));
      assert.equal(page.locale, locale);
      for (const text of [page.title, page.description, ...page.sections.flatMap((section) => [section.title, ...section.paragraphs])]) {
        assert.ok(interpolate(text, values).length > 0);
      }
    }
    assert.equal(pages.find((page) => page.route === 'faq').sections.length, 13);
    const ids = pages.find((page) => page.route === 'docs/troubleshooting').sections.flatMap((section) => section.anchors);
    for (const anchor of anchors) assert.ok(ids.includes(anchor), `${locale}: ${anchor}`);
    assert.equal(translate('Language', locale).length > 0, true);
  }
  assert.throws(() => translate('Missing message', 'de'), /Missing/);
  assert.throws(() => interpolate('{product}', {}), /Missing interpolation/);
});

test('checkout preserves plan, currency and trial while selecting a supported language', () => {
  const original = 'https://checkout.freemius.com/product/1/plan/2/currency/eur/?trial=free';
  for (const locale of LAUNCH_LOCALES) {
    const result = new URL(checkoutUrl(original, locale));
    assert.equal(result.pathname, new URL(original).pathname);
    assert.equal(result.searchParams.get('trial'), 'free');
    assert.equal(result.searchParams.get('language'), ['es', 'de', 'fr'].includes(locale) ? locale : 'en');
  }
  assert.throws(() => checkoutUrl('https://example.com/', 'de'), TypeError);
});
