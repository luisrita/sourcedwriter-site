---
title: "How to write source-backed WordPress drafts with Claude"
description: "Get an Anthropic API key, add it to WordPress, choose a Claude model, and write a cited first draft from your own sources, with costs and privacy explained."
published: 2026-10-16
---

[AI Blog Writer with Sources](/) is a free WordPress plugin that turns a brief and the pages you trust into a cited draft, on your own AI key. This tutorial sets it up with Anthropic's Claude models: getting a key, adding it to WordPress, choosing a model, and writing a first draft. It takes about ten minutes.

## 1. Get an API key

You need a Anthropic API key, from the [Claude Console](https://platform.claude.com/):

1. Sign in to the [Claude Console](https://platform.claude.com/), Anthropic's developer platform. A Claude.ai subscription (Pro or Max) is a separate product and does not include API usage.
2. Buy prepaid credits under **Billing**. The API doesn't work with a zero balance.
3. Open **API keys**, create a key in your workspace, and copy it. It starts with `sk-ant-` and is shown only once.
4. Optionally, set a spending limit for the workspace.

Treat the key like a password: anyone who has it can spend your credits.

## 2. Add the key to WordPress

1. Install and activate **AI Blog Writer with Sources** from Plugins → Add New Plugin.
2. Open **AI Blog Writer → Settings**, choose **Anthropic** as the AI provider, and click **Save Changes**.
3. Paste the key into the API key field and save again. It is encrypted before it is stored, and never shown again or sent to the browser.
4. Click **Test connection**. This sends only the key and a request for the list of models, no content.

To keep the key out of the database, define it in `wp-config.php` instead:

```php
define( 'AIBCG_ANTHROPIC_API_KEY', 'your-key' );
```

## 3. Choose a model

Pick the model under **Default model** in Settings. The plugin offers:

| Model | Described in Settings as |
| --- | --- |
| Claude Opus 5 | Highest capability |
| Claude Sonnet 5 | Recommended balance |
| Claude Haiku 4.5 | Fast and economical |
| Claude Opus 4.8 | Previous Opus model |
| Claude Sonnet 4.6 | Previous Sonnet model |

Start with **Claude Sonnet 5**, the default: it balances writing quality and cost, and follows a writer profile's voice closely. Choose **Claude Haiku 4.5** for lower cost on shorter or simpler articles, and **Claude Opus 5** when a topic needs the most careful reasoning, at a noticeably higher price per draft. Which models you can use also depends on your Anthropic account.

## 4. Write your first draft

1. Open **AI Blog Writer → New article** and give it a topic.
2. Paste three to five pages you would cite yourself under **Source URLs**.
3. Choose **Guided** to review the sources and the outline before anything is written.
4. Create the draft, then open it in the block editor. Each claim cites the source it came from.

The [getting started guide](/docs/getting-started/) walks through the brief in detail.

## Costs and limits

Anthropic bills your account for every request: the outline, the draft, and tools such as section rewrites. The plugin records the usage of each job. To see costs too, enter your model's prices per million input and output tokens in **Settings → Cost, privacy, and advanced controls**, from Anthropic's pricing page; each job then shows an estimated cost, and **Usage and cost** the month's estimate for the site. With prices entered, a **monthly cost ceiling** stops jobs that would go over it. Set a spending limit with Anthropic as well; its invoice is the final figure. See [usage and cost ceilings](/docs/usage-and-cost-ceilings/).

## Data and privacy

When a job runs, the plugin sends Anthropic the brief, the writer profile, and the notes extracted from your selected sources. It never sends WordPress credentials, other database content, or visitor data. Anthropic states that it does not use data sent through its commercial API to train its models by default. See [Anthropic's commercial terms](https://www.anthropic.com/legal/commercial-terms) and [privacy policy](https://www.anthropic.com/legal/privacy). The full list of what is sent is in [Privacy and external services](/docs/privacy-and-external-services/).

## If something goes wrong

- **The key is rejected (`provider_http_401`)**: create a new key and save it again.
- **Rate limit or quota (`provider_http_429`)**: check your balance and limits with Anthropic.
- **"Selected model is unavailable"**: choose another model, save, and test again.

More fixes are on the [troubleshooting page](/docs/troubleshooting/).
