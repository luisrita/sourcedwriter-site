import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { localeConfig } from '../../i18n/locales.mjs';
import { localizedValues } from '../../lib/localized';
import { interpolate } from '../../i18n/ui.mjs';
import { PLUGIN, PRO, SITE } from '../../config';

export async function getStaticPaths() {
  return (await getCollection('localized')).map((entry) => ({
    params: { locale: localeConfig(entry.data.locale).path, slug: entry.data.route || 'index' }, props: { entry },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { title, sections } = props.entry.data;
  const values = localizedValues(props.locale || props.entry.data.locale);
  const body = [`# ${title}`, ...sections.flatMap((section: { title: string; paragraphs: string[] }) =>
    [`## ${section.title}`, ...section.paragraphs]), ''].join('\n\n');
  return new Response(interpolate(body, values), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
