---
title: "How to write source-backed WordPress drafts with Google Gemini"
description: "Get a Gemini API key from Google AI Studio, add it to WordPress, choose a model, and write a cited first draft from your own sources, with free-tier caveats."
published: 2026-10-16
---

[AI Blog Writer with Sources](/) is a free WordPress plugin that turns a brief and the pages you trust into a cited draft, on your own AI key. This tutorial sets it up with Google's Gemini models: getting a key, adding it to WordPress, choosing a model, and writing a first draft. It takes about ten minutes.

## 1. Get an API key

You need a Google API key, from [Google AI Studio](https://aistudio.google.com/):

1. Sign in to [Google AI Studio](https://aistudio.google.com/) with your Google account.
2. Choose **Get API key** and create a key. Keys belong to a Google Cloud project; AI Studio can create one for you.
3. Copy the key.
4. For anything beyond testing, turn on billing for the project (see *Data and privacy* below), and consider a budget alert in Google Cloud.

Treat the key like a password: anyone who has it can spend your credits.

## 2. Add the key to WordPress

1. Install and activate **AI Blog Writer with Sources** from Plugins → Add New Plugin.
2. Open **AI Blog Writer → Settings**, choose **Google** as the AI provider, and click **Save Changes**.
3. Paste the key into the API key field and save again. It is encrypted before it is stored, and never shown again or sent to the browser.
4. Click **Test connection**. This sends only the key and a request for the list of models, no content.

To keep the key out of the database, define it in `wp-config.php` instead:

```php
define( 'AIBCG_GOOGLE_API_KEY', 'your-key' );
```

## 3. Choose a model

Pick the model under **Default model** in Settings. The plugin offers:

| Model | Described in Settings as |
| --- | --- |
| Gemini 3.6 Flash | Recommended balance |
| Gemini 3.5 Flash | Frontier performance |
| Gemini 3.5 Flash-Lite | Fast and economical |
| Gemini 3.1 Pro Preview | Complex work |
| Gemini 2.5 Flash | Previous stable model |

Start with **Gemini 3.6 Flash**, the default: fast, inexpensive, and good at working from long source notes. Use **Flash-Lite** to keep costs lowest, and **Gemini 3.1 Pro Preview** for complex topics; preview models can change or be withdrawn at short notice. Which models you can use also depends on your Google account.

## 4. Write your first draft

1. Open **AI Blog Writer → New article** and give it a topic.
2. Paste three to five pages you would cite yourself under **Source URLs**.
3. Choose **Guided** to review the sources and the outline before anything is written.
4. Create the draft, then open it in the block editor. Each claim cites the source it came from.

The [getting started guide](/docs/getting-started/) walks through the brief in detail.

## Costs and limits

Google bills your account for every request: the outline, the draft, and tools such as section rewrites. The plugin records the usage of each job. To see costs too, enter your model's prices per million input and output tokens in **Settings → Cost, privacy, and advanced controls**, from Google's pricing page; each job then shows an estimated cost, and **Usage and cost** the month's estimate for the site. With prices entered, a **monthly cost ceiling** stops jobs that would go over it. Set a spending limit with Google as well; its invoice is the final figure. See [usage and cost ceilings](/docs/usage-and-cost-ceilings/).

## Data and privacy

When a job runs, the plugin sends Google the brief, the writer profile, and the notes extracted from your selected sources. It never sends WordPress credentials, other database content, or visitor data. **The free tier is not private.** Google's Gemini API terms allow content sent on the free tier to be used to improve Google's products, and people may review it; on the paid tier it isn't. Don't send client material or unpublished work through a free-tier key. Read the current [Gemini API terms](https://ai.google.dev/gemini-api/terms) before choosing. The full list of what is sent is in [Privacy and external services](/docs/privacy-and-external-services/).

## If something goes wrong

- **The key is rejected (`provider_http_401`)**: create a new key and save it again.
- **Rate limit or quota (`provider_http_429`)**: check your balance and limits with Google.
- **"Selected model is unavailable"**: choose another model, save, and test again.

More fixes are on the [troubleshooting page](/docs/troubleshooting/).
