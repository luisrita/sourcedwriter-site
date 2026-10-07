---
title: Troubleshooting
description: What each AI Blog Writer error means and how to fix it, from API keys and provider limits to stuck jobs, failing sources and section rewrites.
order: 10
updated: 2026-10-07
---

From version 1.5, every error the plugin can explain links to its section on this page with **How to fix this**. If yours is not here, see [Reporting a problem](#reporting-a-problem).

## API keys and settings

<a id="missing-api-key"></a>

### No API key is configured

The selected AI provider has no key yet. Open **AI Blog Writer → Settings**, choose the provider, click **Save Changes**, then paste its key and save again. Keys are stored per provider, so switching provider needs that provider's key. Only administrators can add keys; other users see a message asking them to contact one. See [AI providers and API keys](/docs/ai-providers-and-api-keys/).

<a id="invalid-api-key"></a>

### The provider rejected the API key

The provider answered 401 or 403 (`provider_http_401`, `provider_http_403`): the key was deleted, mistyped, belongs to another provider, or has no access to the API. Create a new key in your provider's dashboard, click **Change key** in Settings, save, and click **Test connection**. A key longer than 512 characters is also rejected; check you copied only the key.

<a id="constant-api-key"></a>

### The key is defined in wp-config.php

A key set with a constant such as `AIBCG_OPENAI_API_KEY` in `wp-config.php` can't be changed or removed from Settings. Edit or remove the constant in `wp-config.php` instead.

<a id="credential-storage-unavailable"></a>

### Secure credential storage is unavailable

Saved keys are encrypted with PHP's Sodium extension, using `AIBCG_ENCRYPTION_KEY` or WordPress's `AUTH_KEY`. If neither is defined or Sodium is missing, the plugin refuses to store a key in plain text. Either define the provider's key constant in `wp-config.php`, or ask your host to enable Sodium and add a long random `AIBCG_ENCRYPTION_KEY` to `wp-config.php`.

If keys that used to work now show as missing, `AUTH_KEY` was probably changed (some security plugins rotate it). Define a stable `AIBCG_ENCRYPTION_KEY` and save the key again.

<a id="model-unavailable"></a>

### Selected model is unavailable

The connection works, but your key can't use the model chosen in Settings. New accounts often need billing set up or a higher usage tier before the newest models are available. Choose another model in **Settings → Default model**, save, and test the connection again.

## AI provider errors

<a id="rate-limit"></a>

### Rate or account limit reached

The provider answered 429 (`provider_http_429`): too many requests in a short time, a spending limit, or no credit left. Check billing and limits in your provider's dashboard, then click **Retry stage** on the job. Finished stages aren't repeated, so a retry only pays for the stage that failed.

<a id="provider-unavailable"></a>

### The provider is temporarily unavailable

The provider answered with a 5xx error (`provider_http_500`, `provider_http_503` and similar). The problem is on the provider's side. Wait a few minutes, check the provider's status page, then click **Retry stage**.

<a id="provider-rejected"></a>

### The provider rejected the request

The provider answered with another 4xx error, such as 400 or 404. The model may have been renamed or retired, or your account may lack access to something the request needs. Test the connection in Settings and choose another model if the test reports one is unavailable. If it keeps happening with a working model, [report it](#reporting-a-problem) with the error code.

<a id="provider-unreachable"></a>

### The request to the provider failed

Your server couldn't reach the provider over HTTPS, or the request timed out. Some hosts block outbound requests or allow only listed domains: ask your host to allow HTTPS to your provider's API (`api.openai.com`, `api.anthropic.com`, `generativelanguage.googleapis.com` or `api.x.ai`). A security plugin that blocks external requests can cause it too. Then click **Retry stage**.

<a id="provider-refusal"></a>

### The provider declined the request

The model refused to write about the topic or follow an instruction, usually because of its safety rules. Reword the topic, talking points or include/avoid notes, then start a new job with **Reuse this brief** on the job page.

<a id="invalid-provider-response"></a>

### The provider returned an unreadable or empty response

The answer was empty, cut off, or didn't match the structure the plugin needs (`empty_provider_response`, `invalid_provider_response`, `invalid_structured_output`). It usually happens once; click **Retry stage**. If it repeats, a very long article can exceed the model's output limit: lower **Approximate words**, or choose a more capable model.

## Jobs

<a id="jobs-stay-queued"></a>

### Jobs stay queued

Each stage runs as a WP-Cron event, and WP-Cron runs only when someone visits the site. On a quiet site, keep the job page open: it checks the status every few seconds, which also keeps stages moving. If `DISABLE_WP_CRON` is set, or WordPress says it could not schedule the job (`queue_unavailable`), stages run only when a server scheduler calls `wp-cron.php`; ask your host to run it every minute. **AI Blog Writer → Diagnostics** shows whether WP-Cron is disabled. Then click **Retry stage**. See [Background jobs and WP-Cron](/docs/background-jobs-and-wp-cron/).

<a id="duplicate-job"></a>

### An identical job is already active

A job with the same brief started in the last five minutes and is still running, usually after a double click. Wait for that job, or cancel it from its page, then try again.

<a id="cost-limit-reached"></a>

### The monthly cost ceiling is reached

A site-wide or per-user monthly ceiling in **Settings → Cost, privacy, and advanced controls** would be exceeded (`cost_limit_reached`, `user_cost_limit_reached`). An administrator can raise the ceiling, or set it to 0 for no limit; otherwise it resets on the first day of the month. The ceiling uses the plugin's estimate, not your provider's bill. See [Usage and cost ceilings](/docs/usage-and-cost-ceilings/).

<a id="stage-failed"></a>

### A stage failed or its result is missing

The outline or draft the next stage needs is missing, or the draft post could not be created (`missing_outline`, `missing_draft`, `invalid_stage`, `post_create_failed`). This can follow a timeout, a database error, or a plugin that blocks post creation. Click **Retry stage**. If it fails again, start a new job with **Reuse this brief** and [report the problem](#reporting-a-problem).

<a id="invalid-outline"></a>

### The outline can't be saved

In Guided mode, an edited outline needs a title and at least one section with a heading, and must stay valid JSON. Check for a missing comma or quote, or reload the job page to start again from the generated outline.

<a id="extension-error"></a>

### An add-on failed

Another plugin that extends AI Blog Writer, such as AI Blog Writer Pro, raised an error during research or a check (`extension_error`). The job continues without that step and lists a warning. Check that the add-on is up to date and that its own settings, such as a search API key, are valid.

## Sources

<a id="source-urls-fail"></a>

### Source URLs could not be used

Your server fetches each source URL, and skips a source with a warning when:

- it isn't a public `http` or `https` address, or points to a private network (`unsafe_source_url`)
- it can't be retrieved: login-only pages, paywalls, sites that block automated requests, more than three redirects, or no answer within 12 seconds (`source_unreachable`)
- it isn't an HTML or plain-text page, such as a PDF or an image (`unsupported_source_type`)
- it has too little readable text, such as a page that builds its content with JavaScript (`weak_source`)

Pages larger than 1 MB are cut at 1 MB. Replace failing URLs with pages you can open in a private browser window without signing in, then create a new job with **Reuse this brief**. See [Sources and citations](/docs/sources-and-citations/).

## Editing and profiles

<a id="section-rewrite"></a>

### A section rewrite can't be applied

Rewrites work on the sections AI Blog Writer created, and protect your edits:

- **The section changed after the preview** (`section_changed`): it was edited after the preview was made. Generate a new preview.
- **The preview expired** (`rewrite_preview_expired`): previews are kept for 15 minutes. Generate a new one.
- **The section wasn't found** (`section_not_found`): it was renamed, ungrouped or deleted. Rewrites need the original group block with its anchor.
- **The section contains a block a rewrite would remove** (`section_unsupported_block`): a section can be rewritten when it holds one heading plus paragraphs, lists, quotes and tables. Move images and other blocks out of the section first, or edit it by hand.

See [Editor sidebar and Rank Math](/docs/editor-sidebar-and-rank-math/).

<a id="writer-profile-author"></a>

### A writer profile's author can't be saved or used

Each writer profile is linked to a WordPress user with the Author role, who is credited with its drafts.

- Name and job title are required.
- Only administrators can create new author accounts. Editors choose an existing Author that no other profile uses; if none is listed, ask an administrator to create one.
- If the linked author was deleted, open the profile and save it again to link or create one before generating.
- If the Author role is missing, another plugin removed it; restore it with a role-management plugin.

See [Writer profiles](/docs/writer-profiles/).

<a id="seo-plugin-unavailable"></a>

### No supported SEO plugin is active

Applying SEO suggestions needs Rank Math to be active (Yoast SEO, All in One SEO and SEOPress need [AI Blog Writer Pro](/docs/ai-blog-writer-pro/)). Activate the SEO plugin and reload the editor. You can always copy the suggestions from the sidebar by hand.

## Reporting a problem

Download the JSON report from **AI Blog Writer → Diagnostics** and email it to [info@sourcedwriter.com](mailto:info@sourcedwriter.com) with the error message and code. The report leaves out API keys, prompts, article text and source notes.
