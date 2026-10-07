import { PLUGIN, PRO, SITE } from '../config';

export function localizedValues(locale: string) {
  const money = new Intl.NumberFormat(locale, { style: 'currency', currency: PRO.prices.currency, maximumFractionDigits: 0 });
  return { product: SITE.productName, pro: PRO.name, author: SITE.author.name, email: SITE.contactEmail,
    version: PLUGIN.version, wp: PLUGIN.requiresWp, php: PLUGIN.requiresPhp,
    creatormonthly: money.format(PRO.prices.creatorMonthly), creatoryearly: money.format(PRO.prices.creatorYearly),
    agencymonthly: money.format(PRO.prices.agencyMonthly), agencyyearly: money.format(PRO.prices.agencyYearly) };
}
