---
title: Privacy and external services
description: What the plugin sends to your AI provider, source URLs, and optional usage data, what it stores, retention, export and erasure, and uninstall.
order: 9
updated: 2026-10-07
---

The plugin sends data to the AI provider you configure and the source URLs you supply. From version 1.5, an administrator can also choose to share anonymous usage data with the plugin author; it is off by default. Nothing is sent while you install or activate the plugin.

## 1. Your AI provider

| Action | What is sent |
| --- | --- |
| Test connection, and once when an administrator submits a new brief | The API key and a request for the model list. No content. |
| Outline stage | Key, model, brief fields (topic, talking points, audience, search intent, keyword phrases, tone, length, language, market, call to action, include/avoid notes), today's date, the writer profile, and the extracted notes, titles and URLs of the selected sources |
| Draft stage | The same as the outline stage, plus the approved outline |
| Topic ideas (New article → Need a topic?) | Key, the subject you type, the brief's audience, language and market, today's date, and the titles of up to 50 recent posts (published, scheduled, pending and drafts) so the ideas avoid them |
| Keyword ideas (New article → Suggest keywords) | Key, the topic, the brief's audience, language and market, and today's date |
| Propose writer profile | Key, your prompt text and any writing sample you paste |
| Rewrite section | Key, the section content, your instruction and that section's source notes |

**Never sent:** WordPress credentials, other database contents, visitor data or payment data. API keys stay on the server.

Your provider's terms and data policies apply to what it receives: [OpenAI](https://openai.com/policies/privacy-policy/), [Anthropic](https://www.anthropic.com/legal/privacy), [Google](https://ai.google.dev/gemini-api/terms), [xAI](https://x.ai/legal/privacy-policy).

## 2. Source URLs you supply

Your server fetches each URL with a plain HTTP request identified as `Luis-Rita-AI-Blog-Writer/<version>; <your site URL>`. No brief content, key or user data is sent. Private addresses are rejected, redirects are limited to three, and responses are capped at 1 MB.

<a id="usage-data"></a>

## 3. Usage data (optional, off by default)

Usage data helps the plugin author see whether people get the plugin working, where jobs fail, and which features are used. It is sent only if an administrator ticks **Share anonymous usage data** on the first-run screen or in **Settings → Usage data**. Nothing in the plugin changes when you turn it on or off.

**Where it goes:** `https://telemetry.sourcedwriter.com/v1/batch`, a server run by the plugin author (Luis Rita) on Cloudflare. It is sent once a day, and once more when the plugin is deactivated.

**What identifies your site:** a random install ID created when usage data is turned on. It is not derived from your site address, database or keys, and a new one is created if you turn usage data off and on again. Jobs are referred to by a short code derived from the job number and the install ID, which can't be turned back into the job number.

**Never sent:** your site address (or a hash of it), names, email addresses, user or post IDs, API keys, briefs, topics, keywords, source URLs or domains, prompts, outlines, article text, writer profiles, or error messages. Numbers are sent as ranges, versions as major.minor, the locale as its language only, and times rounded to the hour.

**What the server keeps:** the events below with the install ID, plugin version and date received, for 24 months. It does not store IP addresses or request headers, and request logs are off.

**Your controls:**

- **Settings → Usage data** turns it on or off. Turning it off deletes the install ID and any events not yet sent; nothing more is sent, not even the change.
- **Diagnostics → Usage data** shows the install ID, when data was last sent, and the exact events waiting to be sent. **Delete data on server** deletes everything sent from your site and turns usage data off.
- `define( 'AIBCG_DISABLE_TELEMETRY', true );` in `wp-config.php` keeps it off and hides the option, for agencies and hosts managing many sites.
- Uninstalling deletes the usage data settings and queue and sends nothing.

These are all the events the plugin can send, generated from the plugin's own list:

<!-- usage-data-events:start -->

| Event | When | Properties |
| --- | --- | --- |
| `telemetry_enabled` | Usage data is turned on. | `source` (onboarding / settings) |
| `heartbeat` | Once a day, with the daily send. | `wp_version` (major.minor); `php_version` (major.minor); `language` (language code); `multisite` (yes/no); `network_active` (yes/no); `cron_disabled` (yes/no); `provider` (openai / anthropic / google / xai); `model` (model ID); `key_source` (constant / encrypted_option / none); `rank_math_active` (yes/no); `profiles` (range: 0, 1, 2-5, 6-20, 21+); `generating_users` (range: 0, 1, 2-5, 6-20, 21+); `cost_ceiling_set` (yes/no); `retention_days` (range: 1-30, 31-90, 91+) |
| `plugin_deactivated` | The plugin is deactivated. | `days_since_enabled` (range: 0, 1, 2-7, 8-30, 31-90, 91+) |
| `connection_tested` | The AI provider connection is tested. | `provider` (openai / anthropic / google / xai); `result` (error code from the list below) |
| `settings_saved` | Settings are saved with a change. | `provider` (openai / anthropic / google / xai); `model` (model ID); `provider_changed` (yes/no); `model_changed` (yes/no) |
| `job_created` | A new article job is created. | `job_ref` (job reference); `mode` (delegated / guided); `sources` (count, 0–8); `profile_used` (yes/no); `length` (range: 0-800, 801-1500, 1501-2500, 2501+); `has_primary_phrase` (yes/no); `first_job` (yes/no) |
| `brief_suggested` | Topic or keyword ideas are requested on New article. | `kind` (topics / keywords); `result` (error code from the list below) |
| `sources_reviewed` | Sources are confirmed in Guided mode. | `job_ref` (job reference); `kept` (count, 0–20); `removed` (count, 0–20) |
| `outline_approved` | An outline is approved in Guided mode. | `job_ref` (job reference); `edited` (yes/no); `sections` (count, 0–30) |
| `job_completed` | A draft post is created. | `job_ref` (job reference); `mode` (delegated / guided); `provider` (openai / anthropic / google / xai); `model` (model ID); `duration` (range: <1m, 1-5m, 5-15m, 15-60m, 1-24h, 24h+); `input_units` (range: <10k, 10-50k, 50-200k, 200k+); `output_units` (range: <10k, 10-50k, 50-200k, 200k+); `estimated_cost_usd` (USD, to the cent); `sections` (count, 0–30); `sources_used` (count, 0–20); `word_count` (range: 0-799, 800-1500, 1501-2500, 2501+) |
| `job_failed` | A job stage fails. | `job_ref` (job reference); `stage` (research / outline / draft / checks / queue / other); `error` (error code from the list below); `provider` (openai / anthropic / google / xai); `model` (model ID) |
| `job_cancelled` | A job is cancelled. | `job_ref` (job reference); `stage` (research / outline / draft / checks / queue / other) |
| `section_rewritten` | A section rewrite is previewed or applied in the post editor. | `outcome` (previewed / applied / expired / conflict); `result` (error code from the list below); `from_sources` (yes/no) |
| `seo_applied` | SEO suggestions are applied to an SEO plugin. | `fields_applied` (count, 0–10); `fields_skipped` (count, 0–10); `overwrite` (yes/no) |
| `profile_saved` | A writer profile is saved. | `is_new` (yes/no); `author` (linked_existing / created_new / unchanged); `from_proposal` (yes/no) |
| `profile_previewed` | A writer profile style preview is requested. | `result` (error code from the list below) |
| `profile_proposed` | An AI writer profile proposal is requested. | `result` (error code from the list below); `had_sample` (yes/no) |
| `cost_limit_reached` | A monthly cost ceiling stops a job or request. | `scope` (site / user) |

Error codes: `ok`, `missing_api_key`, `invalid_api_key`, `constant_api_key`, `model_unavailable`, `provider_unreachable`, `provider_refusal`, `empty_provider_response`, `invalid_provider_response`, `invalid_structured_output`, `invalid_outline`, `missing_outline`, `missing_draft`, `invalid_stage`, `queue_unavailable`, `post_create_failed`, `extension_error`, `source_unreachable`, `unsafe_source_url`, `unsupported_source_type`, `weak_source`, `cost_limit_reached`, `user_cost_limit_reached`, `section_changed`, `section_not_found`, `section_unsupported_block`, `rewrite_preview_expired`, `profile_input_required`, `seo_plugin_unavailable`, `http_4xx`, `http_429`, `http_5xx`, `timeout`, `other`.

<!-- usage-data-events:end -->

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
- if usage data is on, its install ID and the events waiting to be sent, in the `aibcg_telemetry` option

## Retention

A daily WP-Cron event applies the **Prompt/source/log retention days** setting, which defaults to 90. For finished jobs older than that, it deletes sources and artifacts and clears the stored brief. Older usage rows are also deleted. Generated posts are always kept.

## Personal data export and erasure

- **Tools → Export Personal Data** includes a user's jobs and writer profiles.
- **Tools → Erase Personal Data** removes their profiles, sources, artifacts, generated-content post meta and acknowledgement, and unlinks their jobs and usage. Posts are kept.

## Uninstall

Uninstalling always removes the plugin's capabilities and the usage data option. To also delete plugin tables, options, encrypted keys, transients and metadata on every site, first define:

```php
define( 'AIBCG_REMOVE_DATA_ON_UNINSTALL', true );
```

Generated posts and linked author accounts are always kept.

## Multisite

The plugin can be activated per site or network-wide. With network activation, every site is set up, including sites created later. Each site keeps its own API keys, settings, jobs and writer profiles.
