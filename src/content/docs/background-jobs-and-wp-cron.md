---
title: Background jobs and WP-Cron
description: How generation runs as resumable WP-Cron stages, what to do on low-traffic sites or with DISABLE_WP_CRON, and how to run a stage with WP-CLI.
order: 8
updated: 2026-09-29
---

Generating an article takes longer than a normal web request should, so each stage runs in the background as a resumable WP-Cron event. A slow provider or a timeout does not lose finished work.

## Normal sites

WP-Cron runs when your site receives requests. The job screen checks the status every few seconds, so stages keep moving while it is open. If you close it, the job continues with the next request to your site.

## Low-traffic sites

It works, but a job left alone may wait for the next visitor. Keep the job screen open until the draft is ready, or set up a real scheduler as below.

## Sites with DISABLE_WP_CRON

If `wp-config.php` contains `define( 'DISABLE_WP_CRON', true );`, stages only advance when a server scheduler calls `wp-cron.php`. Run it every minute:

```bash
* * * * * curl -s https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

or with WP-CLI:

```bash
* * * * * cd /path/to/wordpress && wp cron event run --due-now >/dev/null 2>&1
```

## Run one stage with WP-CLI

Administrators can advance a job by one stage:

```bash
wp aibcg job run <job-id>
```

## Jobs stuck in "queued"

This means WP-Cron is not running. Open **AI Blog Writer → Diagnostics** to check, schedule `wp-cron.php` as shown above, then click **Retry stage** on the job.
