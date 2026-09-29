---
title: Sources and citations
description: What makes a good source URL, how the plugin fetches and extracts it, how citations appear in the draft, and what the warnings mean.
order: 4
updated: 2026-09-29
---

Sources are the point of this plugin. The draft is written from notes extracted from pages you chose, and each claim links back to its source so you can check it.

## Supplying sources

Paste up to **eight URLs** in the brief, one per line. For best results:

- Use primary sources: the official timetable, the regulation, the vendor's documentation, the original study.
- Use public HTML or plain-text pages. PDFs, login-only pages and pages that load their content with JavaScript may not extract.
- Mix sources rather than sending several pages from one site.
- Put facts the article must include in **Facts, products, competitors, or claims to include or avoid**, and give each one a source.

## How pages are fetched

Your own server fetches each URL with a plain HTTP request identified as `Luis-Rita-AI-Blog-Writer/<version>; <your site URL>`. Nothing from your brief, your key or your users goes with it. For safety:

- Private and local network addresses are rejected.
- At most three redirects are followed.
- Responses are capped at 1 MB.

## Citations in the draft

Claims taken from a source are followed by a link to it, with the source title as link text, for example *(Operator name — Timetable and fares)*. The **Sources** panel in the editor sidebar lists every source with its retrieval date.

## Warnings

The **Warnings** panel collects anything you should check before publishing, such as:

- a source that could not be fetched, or one you deselected during review
- time-sensitive facts like prices, schedules or rules, with the date they were retrieved
- claims the brief asked for that no source supported, which were left out or flagged

Treat warnings as a checklist. A draft with no warnings still needs a human read.

## Without sources

You can run a job with no URLs. The plugin then adds a warning, and the model is told to leave out or flag precise claims such as numbers, dates, prices and quotes. Expect a more general article.
