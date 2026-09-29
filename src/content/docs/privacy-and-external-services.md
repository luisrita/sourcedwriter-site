---
title: Privacy and external services
description: Exactly what the plugin sends to your AI provider and source URLs, what it stores in your database, retention, personal-data export and erasure, and uninstall.
order: 9
updated: 2026-09-29
---

The plugin sends data to only two kinds of destination: the AI provider you configure, and the source URLs you supply. Nothing is sent while you install or activate it, or while it sits idle. Nothing is ever sent to the plugin author, and the plugin contains no analytics, tracking or phone-home code.

## 1. Your AI provider

| Action | What is sent |
| --- | --- |
| Test connection, and once when an administrator submits a new brief | The API key and a request for the model list. No content. |
| Outline stage | Key, model, brief fields (topic, talking points, audience, search intent, keyword phrases, tone, length, language, market, call to action, include/avoid notes), the writer profile, and the extracted notes, titles and URLs of the selected sources |
| Draft stage | The same as the outline stage, plus the approved outline |
| Propose writer profile | Key, your prompt text and any writing sample you paste |
| Rewrite section | Key, the section content, your instruction and that section's source notes |

**Never sent:** WordPress credentials, other database contents, visitor data or payment data. API keys stay on the server.

Your provider's terms and data policies apply to what it receives: [OpenAI](https://openai.com/policies/privacy-policy/), [Anthropic](https://www.anthropic.com/legal/privacy), [Google](https://ai.google.dev/gemini-api/terms), [xAI](https://x.ai/legal/privacy-policy).

## 2. Source URLs you supply

Your server fetches each URL with a plain HTTP request identified as `Luis-Rita-AI-Blog-Writer/<version>; <your site URL>`. No brief content, key or user data is sent. Private addresses are rejected, redirects are limited to three, and responses are capped at 1 MB.

## What is stored, and where

Everything is stored in your own WordPress database:

- jobs, meaning the brief, status, settings snapshot, owner and linked post
- sources and extracted notes
- versions of the outline and draft
- usage and estimated cost per request
- writer profiles
- post meta on generated drafts: job ID, provenance, SEO suggestions and warnings
- the review acknowledgement, in user meta
- settings and encrypted API keys, in options

## Retention

A daily WP-Cron event applies the **Prompt/source/log retention days** setting, which defaults to 90. For finished jobs older than that, it deletes sources and artifacts and clears the stored brief. Older usage rows are also deleted. Generated posts are always kept.

## Personal data export and erasure

- **Tools → Export Personal Data** includes a user's jobs and writer profiles.
- **Tools → Erase Personal Data** removes their profiles, sources, artifacts, generated-content post meta and acknowledgement, and unlinks their jobs and usage. Posts are kept.

## Uninstall

Uninstalling always removes the plugin's capabilities. To also delete plugin tables, options, encrypted keys, transients and metadata on every site, first define:

```php
define( 'AIBCG_REMOVE_DATA_ON_UNINSTALL', true );
```

Generated posts and linked author accounts are always kept.

## Multisite

The plugin can be activated per site or network-wide. With network activation, every site is set up, including sites created later. Each site keeps its own API keys, settings, jobs and writer profiles.
