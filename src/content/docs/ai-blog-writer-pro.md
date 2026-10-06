---
title: AI Blog Writer Pro
description: Set up the paid add-on that finds sources automatically and checks every claim in your drafts against them. License, Tavily key, and what the checks mean.
order: 11
updated: 2026-10-06
---

AI Blog Writer Pro is a paid add-on for the free plugin. It adds three things:

- **Find sources automatically.** It searches the web for sources when you start an article, so you don't have to paste URLs.
- **Claim-to-source check.** After the draft is written, every factual claim is marked as supported, weakly supported or unsupported by the sources.
- **Citation and link check.** It flags broken links, sources the draft never cites, and citations to pages that aren't sources.

Like the free plugin, it runs on your own AI key. Plans and the free trial are on the [pricing page](/pricing/).

## Requirements

- AI Blog Writer with Sources **1.1.0 or later**, installed and connected to an AI provider (see [Getting started](/docs/getting-started/))
- A license or free trial of AI Blog Writer Pro: Creator covers 1 site, Agency 5
- A Tavily account for automatic research. The free plan is enough for most sites.

## 1. Get a license or start the trial

On the [pricing page](/pricing/), start the 14-day free trial (no card needed) or buy Creator or Agency. Checkout is handled by Freemius, our reseller. The email you receive afterwards contains your **license key** and a link to download the add-on.

## 2. Install the add-on

1. Download the `ai-blog-writer-pro` ZIP from the link in that email.
2. In WordPress, go to **Plugins → Add New Plugin → Upload Plugin**, choose the ZIP, then click **Install Now** and **Activate**.

If the free plugin is missing or older than 1.1.0, the add-on shows a notice on the Plugins screen and does nothing else until you install or update it.

## 3. Activate your license

1. Open **AI Blog Writer → Pro license**.
2. Paste your license key and click **Activate License**.

The page then shows your plan or trial, and **Account** and **Upgrade** appear in the menu. Each license works on as many sites as your plan covers. To move a license to another site, deactivate it on the old one first, from **Account**.

## 4. Add your Tavily key

Automatic research searches the web through [Tavily](https://www.tavily.com/), using your own account.

1. Sign up at [app.tavily.com](https://app.tavily.com/) and copy your API key. The free plan includes 1,000 credits a month; an article uses about 3.
2. In WordPress, open **AI Blog Writer → Settings** and scroll to **Automatic research**.
3. Paste the key into **Tavily API key** and click **Save Changes**. The key is encrypted before it's stored and never shown again.

You can also define the key in `wp-config.php` instead:

```php
define( 'AIBCG_TAVILY_API_KEY', 'tvly-…' );
```

In the same section you can choose:

- **New articles:** whether "Find sources automatically" starts ticked (on by default).
- **Search depth:** Basic uses 1 credit per search. Advanced uses 2 and searches more thoroughly.

## Finding sources automatically

On **New article**, tick **Find sources automatically** under **Additional options**. You can still paste source URLs as well; yours come first.

When the job runs, the add-on:

1. Asks your AI model for up to three search queries based on the brief. For topics with figures that change, such as prices or statistics, at least one query asks for current information.
2. Searches Tavily with each query.
3. Adds the best pages, with their text, until the article has 8 sources in total.

Sources found this way are labelled **(found automatically)** on the job screen. In **Guided** mode you review them before the outline is written, as with your own URLs.

## Draft checks

Both checks run after the draft is written and before the WordPress post is created. Results appear under **Checks** on the job screen and in the editor sidebar. The checks only flag problems; your draft is never changed. A check that fails to run adds a warning, and you still get your draft.

### Claim-to-source check

Every factual claim in the draft (numbers, prices, dates, names, rules, cause and effect) is compared with the sources' text:

| Result | Meaning |
| --- | --- |
| **Supported** | A source states it. Supported claims are counted in the summary but not listed. |
| **Weak** | A source covers it but differs on a specific point, such as a figure, date, place or scope, or says it only as a possibility. The explanation names the difference. |
| **Unsupported** | No source states it, including when the source the draft cites doesn't say it. |

Advice, opinions and conclusions aren't checked. If any claim is unsupported, the draft's warnings say so.

Review weak and unsupported claims before publishing: add a source, soften the wording, or remove the claim.

The check makes one extra request to your AI provider per draft, about the size of the drafting request. It runs only when the article has sources.

### Citation and link check

- **Citations that aren't sources:** the AI cited a page that isn't one of the article's sources. The free plugin leaves such links out of the post, and this check tells you it happened.
- **Uncited sources:** sources the draft never cites.
- **Links:** every cited page and the call-to-action link is opened once. "Page not found" (404 or 410) counts as **broken** and fails the check. Other errors, such as a site blocking automated requests or a timeout, show as **unconfirmed**; open those by hand.

This check doesn't use AI.

You can switch either check off in **AI Blog Writer → Settings → Draft checks**.

## Troubleshooting

**"Find sources automatically" doesn't appear on New article.**
It needs an active license or trial and a saved Tavily key. Check **Pro license** and **Settings → Automatic research**. The Settings section says what's missing.

**"Automatic research failed: Tavily rejected the API key."**
Copy the key again from your Tavily account, paste it into Settings and save. Your draft was still written from the URLs you supplied.

**"Your Tavily plan or spending limit is reached."**
Your monthly credits are used up. Wait until they reset on the 1st, or raise the limit in your Tavily account.

**My license or trial ended.**
Automatic research and the checks stop until you renew from the [pricing page](/pricing/). Everything in the free plugin, and every draft you created, keeps working.

## Privacy

The add-on sends search queries written from your brief to Tavily, which may use them to improve its services ([Tavily terms](https://www.tavily.com/terms), [privacy](https://www.tavily.com/privacy)). The claim check sends the draft and the sources' text to your AI provider, as drafting does. License activation sends your site URL and the add-on's version and state to Freemius ([privacy](https://freemius.com/privacy/)). For what the free plugin sends, see [Privacy and external services](/docs/privacy-and-external-services/).

Refunds: within 14 days of purchase, no questions asked.
