---
title: Getting started
description: Install the plugin, connect an AI provider with your own API key, and create your first source-backed WordPress draft in about ten minutes.
order: 1
updated: 2026-09-30
---

AI Blog Writer with Sources turns a brief and a short list of sources into a normal WordPress draft. The draft includes citations, warnings and a record of how it was made. It is never published automatically.

## Requirements

- WordPress 6.0 or later (tested up to 7.1), single site or multisite
- PHP 7.4 or later with the Sodium extension, which is needed to encrypt saved API keys
- An API key from OpenAI, Anthropic, Google (Gemini) or xAI (Grok)
- WP-Cron running, or a server scheduler that calls `wp-cron.php` (see [Background jobs and WP-Cron](/docs/background-jobs-and-wp-cron/))

## 1. Install and activate

The plugin is free on [WordPress.org](https://wordpress.org/plugins/luis-rita-ai-blog-writer/). Install it whichever way you prefer:

- **From your dashboard:** go to **Plugins → Add New Plugin**, search for "Luis Rita AI Blog Writer" (its directory name), then click **Install Now** and **Activate**.
- **By upload:** download the [plugin zip](https://downloads.wordpress.org/plugin/luis-rita-ai-blog-writer.zip), then go to **Plugins → Add New Plugin → Upload Plugin**.
- **With WP-CLI:**

```bash
wp plugin install luis-rita-ai-blog-writer --activate
```

On multisite you can also network-activate it.

A new **AI Blog Writer** menu appears with these screens: Dashboard, New article, Writer profiles, Usage and cost, Settings and Diagnostics.

## 2. Connect your AI provider

1. Open **AI Blog Writer → Settings**.
2. Choose the **AI provider** and click **Save Changes**. Keys are stored per provider, so save after switching.
3. Paste the provider's API key and save again. The key is encrypted before storage and never displayed again.
4. Pick a **Default model** and click **Test connection**.

For stronger isolation you can define the key in `wp-config.php` instead. See [AI providers and API keys](/docs/ai-providers-and-api-keys/).

## 3. Set your defaults

On the same screen, set the default language, approximate length and other content defaults. Under **Cost, privacy, and advanced controls** you can set a monthly cost ceiling and a retention period for prompts, sources and logs.

## 4. Create your first draft

1. Open **AI Blog Writer → New article**.
2. Enter a topic or working title. Add talking points, audience, search intent, a primary phrase and supporting terms if you have them.
3. Paste up to eight **source URLs**, one per line. Only these pages are fetched.
4. Choose a workflow. **Guided** pauses so you can check the sources and the outline. **Delegated** runs straight through to the draft. Start with Guided.
5. Optionally pick a [writer profile](/docs/writer-profiles/).
6. Tick the review acknowledgement and click **Create WordPress draft**.

The job screen shows each stage as it runs. When it finishes you get a link to the draft, the sources used, SEO suggestions and the provider usage for the job.

## 5. Review before you publish

Open the draft in the block editor. The **AI Blog Writer** sidebar shows provenance, warnings, sources and SEO suggestions, and it lets you rewrite a single section. Check every claim against its source before publishing. The guide [How to review an AI-generated article before publishing](/blog/review-ai-generated-article-before-publishing/) has a checklist.
