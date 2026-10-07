import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LAUNCH_LOCALES, localeConfig } from '../../i18n/locales.mjs';
import { localizedValues } from '../../lib/localized';
import { interpolate } from '../../i18n/ui.mjs';
import { PLUGIN, PRO, SITE } from '../../config';

export function getStaticPaths() {
  return LAUNCH_LOCALES.filter((code) => code !== 'en').map((locale) => ({ params: { locale: localeConfig(locale).path }, props: { locale } }));
}

export const GET: APIRoute = async ({ props }) => {
  const entries = await getCollection('localized', (entry) => entry.data.locale === props.locale);
  const values = localizedValues(props.locale || props.entry.data.locale);
  const copy = (text: string) => interpolate(text, values);
  const body = entries.map(({ data }) => [`# ${copy(data.title)}`, '',
    ...data.sections.flatMap((section) => [`## ${copy(section.title)}`, '', ...section.paragraphs.flatMap((paragraph) => [copy(paragraph), ''])]),
  ].join('\n')).join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
