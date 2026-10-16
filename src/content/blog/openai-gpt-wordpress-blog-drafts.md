---
title: "How to write source-backed WordPress drafts with OpenAI GPT models"
description: "Get an OpenAI API key, add it to WordPress, choose a GPT model, and write a cited first draft from your own sources, with costs and privacy explained."
published: 2026-10-16
---

[AI Blog Writer with Sources](/) is a free WordPress plugin that turns a brief and the pages you trust into a cited draft, on your own AI key. This tutorial sets it up with OpenAI's GPT models: getting a key, adding it to WordPress, choosing a model, and writing a first draft. It takes about ten minutes.

## 1. Get an API key

You need a OpenAI API key, from the [OpenAI API platform](https://platform.openai.com/api-keys):

1. Sign in to the [OpenAI API platform](https://platform.openai.com/) with your account.
2. Add a payment method or buy prepaid credits under **Billing**. The API is billed separately from a ChatGPT subscription: a ChatGPT Plus or Pro plan does not include API usage.
3. Open **API keys**, create a new secret key in your project, and copy it. It is shown only once.
4. Optionally, set a monthly budget for the project, so a busy month can never surprise you.

Treat the key like a password: anyone who has it can spend your credits.

## 2. Add the key to WordPress

1. Install and activate **AI Blog Writer with Sources** from Plugins → Add New Plugin.
2. Open **AI Blog Writer → Settings**, choose **OpenAI** as the AI provider, and click **Save Changes**.
3. Paste the key into the API key field and save again. It is encrypted before it is stored, and never shown again or sent to the browser.
4. Click **Test connection**. This sends only the key and a request for the list of models, no content.

To keep the key out of the database, define it in `wp-config.php` instead:

```php
define( 'AIBCG_OPENAI_API_KEY', 'your-key' );
```

## 3. Choose a model

Pick the model under **Default model** in Settings. The plugin offers:

| Model | Described in Settings as |
| --- | --- |
| GPT-6 Astra | Highest capability |
| GPT-6.1 Sol | Near-flagship capability at lower cost |
| GPT-6 Luna | Most efficient current model |
| GPT-5.6 Sol | Previous high-capability model |
| GPT-5.6 Terra | Balanced capability and cost |
| GPT-5.6 Luna | Recommended, efficient high-volume generation |
| GPT-5.1 | Previous frontier model |
| GPT-5 | Previous reasoning model |
| GPT-5 mini | Faster and lower cost |
| GPT-4.1 | Strong non-reasoning model |
| GPT-4.1 mini | Faster previous model |
| GPT-4o | Legacy multimodal model |
| GPT-4o mini | Low-cost legacy model |

Start with **GPT-5.6 Luna**, the default: it handles source-backed drafting well at a very low price. In our benchmark of 2 October 2026, a 1,200-word draft from three sources cost about one US cent on it. **GPT-6 Luna** costs half as much and keeps closer to the requested length, but in our evaluation of 16 October 2026 it wrote far fewer warnings for the editor, so check its drafts more carefully. For complex topics, try GPT-5.6 Terra or GPT-6.1 Sol, at roughly ten times Luna's price. Which models you can use also depends on your OpenAI account.

## 4. Write your first draft

1. Open **AI Blog Writer → New article** and give it a topic.
2. Paste three to five pages you would cite yourself under **Source URLs**.
3. Choose **Guided** to review the sources and the outline before anything is written.
4. Create the draft, then open it in the block editor. Each claim cites the source it came from.

The [getting started guide](/docs/getting-started/) walks through the brief in detail.

## Costs and limits

OpenAI bills your account for every request: the outline, the draft, and tools such as section rewrites. The plugin records the usage of each job and estimates its cost from the model's list price, and **Usage and cost** shows the month's estimate for the site. Set a **monthly cost ceiling** in Settings, and a spending limit with OpenAI, so neither can surprise you; OpenAI's invoice is the final figure. See [usage and cost ceilings](/docs/usage-and-cost-ceilings/).

## Data and privacy

When a job runs, the plugin sends OpenAI the brief, the writer profile, and the notes extracted from your selected sources. It never sends WordPress credentials, other database content, or visitor data. OpenAI states that data sent through its API is not used to train its models by default. Check the current terms in [OpenAI's API data usage policy](https://developers.openai.com/api/docs/guides/your-data). The full list of what is sent is in [Privacy and external services](/docs/privacy-and-external-services/).

## If something goes wrong

- **The key is rejected (`provider_http_401`)**: create a new key and save it again.
- **Rate limit or quota (`provider_http_429`)**: check your balance and limits with OpenAI.
- **"Selected model is unavailable"**: choose another model, save, and test again.

More fixes are on the [troubleshooting page](/docs/troubleshooting/).
