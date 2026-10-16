---
title: "How to write source-backed WordPress drafts with xAI Grok"
description: "Get an xAI API key, add it to WordPress, choose a Grok model, and write a cited first draft from your own sources, with costs and privacy explained."
published: 2026-10-16
---

[AI Blog Writer with Sources](/) is a free WordPress plugin that turns a brief and the pages you trust into a cited draft, on your own AI key. This tutorial sets it up with xAI's Grok models: getting a key, adding it to WordPress, choosing a model, and writing a first draft. It takes about ten minutes.

## 1. Get an API key

You need a xAI API key, from the [xAI Console](https://console.x.ai/):

1. Sign in to the [xAI Console](https://console.x.ai/). An X Premium subscription is not needed and doesn't include API usage.
2. Add a payment method and load credits for your team; the API bills against that balance.
3. Open **API Keys**, create a key, and copy it. It is shown only once.
4. Check the console for spending limits and for any data-sharing offers before you opt in: some promotional credits are tied to sharing your API data.

Treat the key like a password: anyone who has it can spend your credits.

## 2. Add the key to WordPress

1. Install and activate **AI Blog Writer with Sources** from Plugins → Add New Plugin.
2. Open **AI Blog Writer → Settings**, choose **xAI** as the AI provider, and click **Save Changes**.
3. Paste the key into the API key field and save again. It is encrypted before it is stored, and never shown again or sent to the browser.
4. Click **Test connection**. This sends only the key and a request for the list of models, no content.

To keep the key out of the database, define it in `wp-config.php` instead:

```php
define( 'AIBCG_XAI_API_KEY', 'your-key' );
```

## 3. Choose a model

Pick the model under **Default model** in Settings. The plugin offers:

| Model | Described in Settings as |
| --- | --- |
| Grok 4.5 | Recommended frontier model |
| Grok 4.3 | Fast general model |

Start with **Grok 4.5**, the default. Use **Grok 4.3** when speed and cost matter more than depth. Which models you can use also depends on your xAI account.

## 4. Write your first draft

1. Open **AI Blog Writer → New article** and give it a topic.
2. Paste three to five pages you would cite yourself under **Source URLs**.
3. Choose **Guided** to review the sources and the outline before anything is written.
4. Create the draft, then open it in the block editor. Each claim cites the source it came from.

The [getting started guide](/docs/getting-started/) walks through the brief in detail.

## Costs and limits

xAI bills your account for every request: the outline, the draft, and tools such as section rewrites. The plugin records the usage of each job. To see costs too, enter your model's prices per million input and output tokens in **Settings → Cost, privacy, and advanced controls**, from xAI's pricing page; each job then shows an estimated cost, and **Usage and cost** the month's estimate for the site. With prices entered, a **monthly cost ceiling** stops jobs that would go over it. Set a spending limit with xAI as well; its invoice is the final figure. See [usage and cost ceilings](/docs/usage-and-cost-ceilings/).

## Data and privacy

When a job runs, the plugin sends xAI the brief, the writer profile, and the notes extracted from your selected sources. It never sends WordPress credentials, other database content, or visitor data. Read [xAI's terms of service](https://x.ai/legal/terms-of-service) and [privacy policy](https://x.ai/legal/privacy-policy), and don't opt your team into sharing API data if you send client or unpublished material. The full list of what is sent is in [Privacy and external services](/docs/privacy-and-external-services/).

## If something goes wrong

- **The key is rejected (`provider_http_401`)**: create a new key and save it again.
- **Rate limit or quota (`provider_http_429`)**: check your balance and limits with xAI.
- **"Selected model is unavailable"**: choose another model, save, and test again.

More fixes are on the [troubleshooting page](/docs/troubleshooting/).
