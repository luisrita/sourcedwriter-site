---
title: AI providers and API keys
description: Connect OpenAI, Anthropic Claude, Google Gemini or xAI Grok with your own API key, store it encrypted or in wp-config.php, and test the connection.
order: 2
updated: 2026-09-29
---

The plugin is bring-your-own-key. You pay your AI provider directly, and the plugin author never sees your key, your content or your billing.

## Supported providers

| Provider | Models | Endpoints used |
| --- | --- | --- |
| OpenAI | GPT models | `api.openai.com/v1/models`, `/v1/responses` |
| Anthropic | Claude models | `api.anthropic.com/v1/models`, `/v1/messages` |
| Google | Gemini models | `generativelanguage.googleapis.com/v1beta/models` |
| xAI | Grok models | `api.x.ai/v1/models`, `/v1/chat/completions` |

The model list comes from your provider account, so you only see models your key can use. Whether a model is available still depends on that account.

## Option A: save the key in Settings

1. Open **AI Blog Writer → Settings**.
2. Choose the provider and click **Save Changes**.
3. Paste the key into **New … API key** and save.

Saved keys are encrypted with Sodium. The encryption key is `AIBCG_ENCRYPTION_KEY` if you define it, otherwise WordPress's `AUTH_KEY`. Define a stable `AIBCG_ENCRYPTION_KEY` in `wp-config.php` so that rotating `AUTH_KEY` does not make saved keys unreadable.

```php
define( 'AIBCG_ENCRYPTION_KEY', 'a-long-random-string-that-never-changes' );
```

## Option B: define the key in wp-config.php

This keeps the key out of the database entirely:

```php
define( 'AIBCG_OPENAI_API_KEY', 'your-key' );
define( 'AIBCG_ANTHROPIC_API_KEY', 'your-key' );
define( 'AIBCG_GOOGLE_API_KEY', 'your-key' );
define( 'AIBCG_XAI_API_KEY', 'your-key' );
```

Keys defined this way appear in Settings as "Defined by … in wp-config.php" and cannot be edited there.

## How keys are protected

- Keys are used only in server-side requests.
- They are never sent to the browser and never returned by the REST API.
- They are never sent to the plugin author.
- The Diagnostics report leaves out keys, prompts, article text and source notes.

## Test the connection

Click **Test connection** after saving. This sends only the key and a request for the model list, with no content. The same check runs once when an administrator submits a new brief.

## Common errors

- `provider_http_401`: the provider rejected the key. Create a new key and save it again.
- `provider_http_429`: you hit a rate limit or ran out of quota. Check billing with your provider.
- `provider_unreachable`: your server cannot reach the provider over HTTPS. Ask your host whether outbound requests are blocked.
- "Selected model is unavailable": choose another model and test again.
