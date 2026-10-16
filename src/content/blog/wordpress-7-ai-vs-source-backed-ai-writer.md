---
title: "WordPress 7.0's AI features and a source-backed AI writer: an honest comparison"
description: "What WordPress 7.0 and its official AI plugin do, what they don't, where they're the better choice, and where a source-backed drafting plugin fits alongside."
published: 2026-10-16
---

WordPress 7.0 brought AI into core, and the official **AI** plugin (formerly AI Experiments) builds writing and editing features on top of it. If you're choosing how to use AI on a WordPress site, it's fair to ask whether you still need a separate plugin. This is our honest answer, including where WordPress's own features are the better choice. The facts below were checked on 16 October 2026; both projects move quickly.

## What WordPress 7.0 adds

WordPress 7.0, released in May 2026, adds **infrastructure**, not writing features:

- **Connectors**: a Settings → Connectors screen where you connect an AI provider once, so plugins can use that connection instead of each asking for its own key.
- **The AI Client**: a provider-agnostic interface plugins use to send requests to whichever model the site has connected.
- **Abilities**: a registry of actions the site can perform, with permission checks, introduced in 6.9 and extended to the editor in 7.0, so AI tools and agents can act on a site within your rules.

Core sends nothing to any AI provider until you connect one, and it doesn't write anything by itself. User-facing features come from plugins.

## What the official AI plugin adds

The [AI plugin](https://wordpress.org/plugins/ai/) is WordPress's own set of opt-in AI features for the block editor and admin. As of version 1.4.0 they include:

- **Editing helpers**: title, excerpt, slug and meta description suggestions; summaries; shortening, expanding or rephrasing selected blocks; translation of paragraphs and headings; type-ahead suggestions.
- **Review**: editorial notes, block by block, on accessibility, readability, grammar and SEO.
- **Media**: alt text, and image generation and editing.
- **Site management**: tag and category suggestions, comment moderation and reply suggestions, and site-wide editorial guidelines for its features to follow.

What it doesn't do, as of 1.4.0, is draft a whole article from a brief, and its page doesn't mention working from sources, citing them, or checking claims against them.

## Other built-in AI writing

Hosts, Jetpack and several SEO plugins also include AI writing assistants in the editor. They vary, but most generate or rewrite text from a prompt and the model's own knowledge, often on the vendor's credits rather than your own key. They're quick for a first pass. What they generally don't give you is a record of where each fact came from.

## Where a source-backed writer is different

[AI Blog Writer with Sources](/) is built for one job: a complete first draft you can check. The differences are in how that draft is made:

- **It writes from sources you choose.** The draft rests on up to eight pages you supply, fetched by your own server, and cites them inline next to the claims they support.
- **You review before it writes.** In Guided mode the job pauses so you can untick weak sources and edit the outline before any text exists.
- **It writes in a defined voice.** Writer profiles hold a voice, its opinions and the words it never uses, and credit drafts to the linked author.
- **It keeps a record.** The provider, model, time, sources and warnings are saved with each draft, and nothing is published automatically.
- **It controls spending.** Usage and estimated cost are recorded per job, from each model's list price, with monthly ceilings for the site and each user.

[AI Blog Writer Pro](/pricing/) adds automatic research and a claim-to-source check that marks each factual claim as supported, weakly supported or unsupported.

## Where WordPress's AI is the better choice

Be honest about the overlap. Choose WordPress's own AI features when:

- **You're editing, not drafting.** Titles, excerpts, summaries, meta descriptions and rephrasing a paragraph are exactly what the AI plugin does, without another plugin.
- **You want alt text, translation or comment moderation.** We don't do these.
- **You want one connection for everything.** With Connectors, one key serves every plugin that uses the AI Client. AI Blog Writer doesn't use Connectors yet; you add a key in its own settings.
- **Your content doesn't rest on facts that change.** If an article is opinion or personal experience, a sourcing step adds little.

## They work together

These aren't either-or. A sensible setup uses the AI plugin for editing and site tasks, such as alt text, excerpts and editorial notes, and a source-backed writer for the first draft of articles where accuracy matters, then reviews the result like any other writer's work.

| Task | WordPress 7.0 + AI plugin | AI Blog Writer with Sources |
| --- | --- | --- |
| Draft a whole article from a brief | Not as of 1.4.0 | Yes |
| Write from sources you choose, with inline citations | No | Yes |
| Review sources and outline before writing | No | Yes (Guided mode) |
| Titles, excerpts, summaries, meta descriptions | Yes | Meta title, description and slug suggestions per draft |
| Rephrase or resize selected blocks | Yes | Rewrite one section, or regenerate it from chosen sources |
| Alt text, translation, comment moderation | Yes | No |
| One provider connection shared by plugins | Yes (Connectors) | Not yet: its own key settings |
| Providers | OpenAI, Anthropic, Google and others via connectors | OpenAI, Anthropic, Google, xAI |

Whichever you use, the rule is the same: AI output is a draft, and someone who knows the subject checks it before it's published. Our guide to [verifying AI-written claims](/blog/verify-ai-written-claims-before-publishing/) works for both.
