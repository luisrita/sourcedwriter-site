---
title: How to use your own AI API key in WordPress safely
description: "Get an OpenAI, Claude, Gemini or Grok API key, store it safely in WordPress, cap spending, and know what to check in any bring-your-own-key plugin."
published: 2026-09-29
---

Many WordPress AI plugins ask for your own API key. This approach is usually called bring-your-own-key (BYOK). You pay the AI provider directly at their rates instead of paying a markup on credits, and your content goes to a provider you chose under that provider's terms.

It also makes you responsible for a secret that can spend money. Here is how to handle it properly.

## Step 1: Create a key with the provider

Create an account and a key in the provider's developer console:

- **OpenAI** (GPT models): platform.openai.com
- **Anthropic** (Claude models): console.anthropic.com
- **Google** (Gemini models): aistudio.google.com
- **xAI** (Grok models): console.x.ai

Good practice when creating it:

- **One key per site.** If one leaks, you revoke it without breaking every other site.
- **A descriptive name**, such as `example.com-wordpress`, so usage is easy to attribute.
- **A spending limit or budget alert** on the provider account, if the provider offers one. This is your real safety net.

## Step 2: Decide where the key lives

There are two reasonable places.

### In wp-config.php (strongest)

The key never touches the database, so a database dump, backup or staging copy doesn't leak it. A well-built plugin reads a constant such as:

```php
define( 'AIBCG_OPENAI_API_KEY', 'your-key' );
```

The trade-off is that changing the key means editing a server file.

### Encrypted in the database

This is more convenient, because an administrator can paste and rotate it from Settings. Check that the plugin **encrypts** the key rather than storing it in plain text. In WordPress this usually means Sodium with a key derived from `AUTH_KEY` or a dedicated constant. If the encryption key comes from `AUTH_KEY`, rotating the salts can make saved keys unreadable. A dedicated, stable constant avoids that.

## Step 3: Check what the plugin does with the key

Before you paste a key into any plugin, find the answers to these questions in its readme or docs:

1. **Does the key ever reach the browser?** It shouldn't. Calls to the provider should happen on the server, and the key should never appear in page source or REST API responses.
2. **Where does it send data?** A good readme lists every external endpoint, and WordPress.org guidelines require plugins to disclose external services.
3. **Does anything go to the plugin author?** With BYOK there is usually no reason for it to.
4. **Does it redact keys from diagnostics and logs?**
5. **Does it clean up on uninstall?**

## Step 4: Control spending inside WordPress

Provider limits act on the whole account. Inside WordPress, look for per-site and per-user limits so one enthusiastic editor can't use up the month's budget. The plugin should also record usage per job, so you can see which articles cost what.

## Step 5: Rotate and revoke

- Rotate keys when someone with access leaves, or on a regular schedule.
- Revoke at once if a key appears in a repository, a support ticket or a screenshot.
- After rotating, run the plugin's connection test.

## How AI Blog Writer with Sources handles keys

For reference, this is how [AI Blog Writer with Sources](/) answers the checklist:

- Keys can live in `wp-config.php` (`AIBCG_OPENAI_API_KEY`, `AIBCG_ANTHROPIC_API_KEY`, `AIBCG_GOOGLE_API_KEY`, `AIBCG_XAI_API_KEY`) or be saved encrypted with Sodium under a stable `AIBCG_ENCRYPTION_KEY`.
- Keys are used only on the server and are never returned by REST or shown after saving.
- Every endpoint it calls is listed in [Privacy and external services](/docs/privacy-and-external-services/). Nothing goes to the plugin author.
- Monthly cost ceilings can be set per site and per user, with usage recorded for each job ([Usage and cost ceilings](/docs/usage-and-cost-ceilings/)).
- The diagnostics report leaves out keys, prompts and article text.
