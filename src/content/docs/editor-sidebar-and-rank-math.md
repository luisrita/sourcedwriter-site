---
title: Editor sidebar and Rank Math
description: Use the AI Blog Writer panel in the block editor to check provenance, warnings and sources, rewrite one section, and apply SEO metadata to Rank Math.
order: 6
updated: 2026-10-07
---

Generated drafts are ordinary WordPress posts made of core blocks. They keep working if you deactivate the plugin. While it is active, the block editor shows an **AI Blog Writer Details** sidebar.

## Sidebar panels

- **Provenance**: job ID, provider, model and generation time.
- **Warnings**: everything to check before publishing (see [Sources and citations](/docs/sources-and-citations/)).
- **Sources**: every source used, with retrieval dates.
- **SEO suggestions**: meta title, meta description and focus keyword.
- **Rewrite one section**: see below.

A reminder at the bottom of the sidebar says that generated content can contain errors or unsupported claims.

## Rewrite one section

Choose a section and an action (**Rewrite for clarity**, **Shorten**, **Expand**, **Change tone**, **Add supporting detail** or **Remove unsupported detail**), then click **Generate preview**. Only that section's content, the action and the draft's source notes go to the provider. The preview lists any warnings; nothing changes until you confirm, and the previous version stays in Revisions. The rest of the post stays as it is.

### Regenerate using selected sources

From version 1.5, when the draft has sources, the action list also offers **Regenerate using selected sources**. Tick the sources the section should rest on, including ones you left out in Guided mode, and generate a preview. The section is rebuilt from those sources only: claims they support are kept and cited, claims they don't support are removed and listed as warnings, and relevant facts from the sources are added. Use it after you find a better source, or when a section leans on general knowledge you would rather back up.

## Rank Math integration

When Rank Math is active, the SEO suggestions panel can apply the suggested **meta title**, **meta description** and **focus keyword** to Rank Math. Values you already set in Rank Math are kept unless you choose to replace them.

Without Rank Math, copy the suggestions into your SEO plugin by hand.
