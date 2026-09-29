---
title: Delegated and Guided workflows
description: How each job moves from research to outline to draft, and when to use Guided mode to review sources and the outline before the plugin writes.
order: 3
updated: 2026-09-29
---

Every job runs in three stages: **research**, **outline** and **draft**. The workflow you choose decides whether the job stops for your approval between stages.

## The three stages

1. **Research.** Your server fetches each source URL you supplied, removes duplicates and extracts notes with the page title and retrieval date. Sources that fail are listed as warnings. If none are usable, the draft is told to leave out or flag precise claims it cannot support.
2. **Outline.** The provider receives your brief, the writer profile and the extracted notes, and returns a section-by-section outline.
3. **Draft.** The provider writes the article from the approved outline. The plugin saves it as a WordPress draft in normal blocks, with sources, warnings, SEO suggestions and provenance attached.

## Guided: pause for source and outline approval

Guided stops twice:

- **After research**, so you can read each source's extracted notes and retrieval date and deselect sources that are out of date or off topic.
- **After the outline**, so you can edit sections, reorder them or remove them before any article text is written.

Use Guided for new topics, for YMYL subjects (health, money, legal, safety) and whenever the sources vary in quality. It costs the same in provider usage, and the article is only as good as the sources and outline you approve.

## Delegated: run through to the draft

Delegated goes from research to outline to draft without stopping. The first time you use it, you must confirm that generated content needs human review. Use it when you trust your sources and have used the brief format before. You still review the finished draft.

## What never happens

- The plugin never searches the web by itself. Only the URLs you supply are fetched.
- It never publishes. Every successful job ends as a draft.
- It never edits existing posts. Each job creates a new draft.

## Cancelling and retrying

You can cancel a job while it runs. If a stage fails, for example because the provider hit a rate limit, fix the cause and click **Retry stage** on the job screen. Finished stages are kept, so a retry does not pay for them again.
