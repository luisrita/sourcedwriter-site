---
title: Troubleshooting
description: Fix missing API keys, provider errors, jobs stuck in the queue and source URLs that fail to extract, and send a safe diagnostics report.
order: 10
updated: 2026-09-29
---

## Missing or invalid API key

Keys are stored per provider. After changing the provider, click **Save Changes**, then save that provider's key. Keys defined in `wp-config.php` cannot be edited in Settings. Saving keys requires the PHP Sodium extension, so ask your host to enable it if saving fails.

## Provider errors

| Code | Meaning | Fix |
| --- | --- | --- |
| `provider_http_401` | Key rejected | Create a new key and save it again |
| `provider_http_429` | Rate limit or quota | Check billing and limits with your provider, then retry the stage |
| `provider_unreachable` | Server cannot reach the provider over HTTPS | Ask your host about blocked outbound requests |
| Selected model is unavailable | Your account cannot use that model | Choose another model and test the connection |
| `cost_limit_reached` | A cost ceiling would be exceeded | Raise the ceiling or wait until next month |

## Jobs stay queued

WP-Cron is not running. Check **AI Blog Writer → Diagnostics**, schedule `wp-cron.php` from a server scheduler, then click **Retry stage**. See [Background jobs and WP-Cron](/docs/background-jobs-and-wp-cron/).

## Source URLs fail

Sources must be public HTML or plain-text pages. Login-only pages, pages that need JavaScript, private network addresses and responses over 1 MB are rejected. Replace the URL and start a new job.

## Reporting a problem

Download the JSON report from **AI Blog Writer → Diagnostics** and email it to [info@sourcedwriter.com](mailto:info@sourcedwriter.com). The report leaves out API keys, prompts, article text and source notes.
