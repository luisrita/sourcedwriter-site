import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ASTRO_I18N, LAUNCH_LOCALES, localeConfig, localeFromPath, localizedPath } from '../src/i18n/locales.mjs';
import { pageAlternates } from '../src/i18n/pages.mjs';

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
  assert.deepEqual(pageAlternates('/pricing/').map((entry) => entry.code), ['en']);
  assert.throws(() => pageAlternates('/ja/pricing/'), /Missing published equivalent/);
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
