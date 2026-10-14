import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { LAUNCH_LOCALES, localeConfig, localizedPath } from '../src/i18n/locales.mjs';
import { PUBLISHED_TRANSLATIONS, pageAlternates } from '../src/i18n/pages.mjs';

const root = new URL('../dist/', import.meta.url);
const read = (path) => readFileSync(new URL(path.replace(/^\//, ''), root), 'utf8');
const tags = (html, name) => Array.from(html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g')), ([tag]) =>
  Object.fromEntries(Array.from(tag.matchAll(/([\w-]+)="([^"]*)"/g), ([, key, value]) => [key, value])));

test('every built equivalent has self-canonical and reciprocal real language metadata', () => {
  const sitemap = read('sitemap-0.xml');
  for (const path of Object.keys(PUBLISHED_TRANSLATIONS)) {
    for (const code of LAUNCH_LOCALES) {
      const local = localizedPath(path, code);
      const html = read(`${local}index.html`);
      assert.equal(tags(html, 'html')[0].lang, localeConfig(code).lang);
      const links = tags(html, 'link');
      assert.equal(links.find((link) => link.rel === 'canonical').href, `https://sourcedwriter.com${local}`);
      const alternatives = links.filter((link) => link.hreflang);
      assert.equal(alternatives.length, 7);
      for (const alt of pageAlternates(local)) {
        assert.equal(alternatives.find((link) => link.hreflang === alt.lang).href, `https://sourcedwriter.com${alt.href}`);
      }
      assert.ok(sitemap.includes(`https://sourcedwriter.com${local}`));
      assert.equal(tags(html, 'meta').find((tag) => tag.property === 'og:locale').content, localeConfig(code).og);
    }
  }
});

test('localized FAQ, error-help targets and machine-readable twins exist in production output', () => {
  for (const code of LAUNCH_LOCALES.filter((code) => code !== 'en')) {
    const prefix = localeConfig(code).path;
    const html = read(`${prefix}/faq/index.html`);
    const match = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
    const faq = JSON.parse(match[1])['@graph'].find((node) => node['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, 13);
    assert.equal(faq.inLanguage, code);
    const trouble = read(`${prefix}/docs/troubleshooting/index.html`);
    for (const id of ['missing-api-key', 'jobs-stay-queued', 'source-urls-fail', 'section-rewrite', 'rate-limit', 'cost-limit-reached']) {
      assert.ok(trouble.includes(`id="${id}"`));
    }
    for (const path of Object.keys(PUBLISHED_TRANSLATIONS)) {
      const markdown = `${prefix}${path === '/' ? '/index.md' : path.replace(/\/$/, '.md')}`;
      assert.ok(existsSync(new URL(markdown, root)));
      assert.ok(read(markdown).startsWith('# '));
    }
    assert.ok(read(`${prefix}/llms.txt`).includes(`/${prefix}/docs/getting-started.md`));
    assert.ok(read(`${prefix}/llms-full.txt`).length > 3000);
  }
  const blog = read('blog/index.html');
  assert.equal(tags(blog, 'link').filter((link) => link.hreflang && link.hreflang !== 'en' && link.hreflang !== 'x-default').length, 0);
});

test('no built page glues a word to a neighbouring link or inline tag', () => {
  // Astro drops whitespace that contains a line break between text and an inline tag, so "see\n<a>" renders as "see<a>".
  // Latin letters, digits and closing punctuation must not touch an inline tag; CJK text and opening punctuation may.
  const inline = 'a|strong|em|b|i|code|kbd|time|abbr';
  const word = '\\p{Script=Latin}\\p{Script=Greek}\\p{Script=Cyrillic}0-9';
  const before = new RegExp(`[${word}.,;:!?·)\\]”’»]<(?:${inline})\\b`, 'u');
  const after = new RegExp(`</(?:${inline})>[${word}(\\[“‘«]`, 'u');
  const price = new RegExp(`[${word}][€$£]\\d`, 'u');
  const glued = [];
  for (const file of readdirSync(root, { recursive: true }).filter((file) => file.endsWith('.html'))) {
    const html = read(file).replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '');
    for (const pattern of [before, after, price]) {
      const match = html.match(pattern);
      if (match) glued.push(`${file}: …${html.slice(Math.max(0, match.index - 40), match.index + 40)}…`);
    }
  }
  assert.deepEqual(glued, []);
});
