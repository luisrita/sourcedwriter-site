import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LAUNCH_LOCALES, localeConfig, localizedPath } from '../../i18n/locales.mjs';
import { localizedValues } from '../../lib/localized';
import { interpolate } from '../../i18n/ui.mjs';
import { PLUGIN, PRO, SITE, absolute } from '../../config';

export function getStaticPaths() {
  return LAUNCH_LOCALES.filter((code) => code !== 'en').map((locale) => ({ params: { locale: localeConfig(locale).path }, props: { locale } }));
}

export const GET: APIRoute = async ({ props }) => {
  const docs = await getCollection('localized', (entry) => entry.data.locale === props.locale);
  const values = localizedValues(props.locale || props.entry.data.locale);
  const body = [`# ${SITE.productName}`, '', ...docs.map(({ data }) =>
    `- [${interpolate(data.title, values)}](${absolute(localizedPath(data.route ? `/${data.route}.md` : '/index.md', props.locale))})`), ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
