---
title: An AI content workflow for WordPress agencies
description: "A repeatable workflow for AI-assisted client content: set each client up once, brief from sources, check before drafting, and review in two passes."
published: 2026-10-14
---

AI makes the first draft cheap. For an agency, that moves the cost somewhere else: into checking facts the model guessed, rewriting a voice that sounds like no one, and explaining to a client where a claim came from. A good workflow puts the checking **before** the draft exists, so there is less to fix after it. Here is one that works across many client sites.

## 1. Set each client up once

Most of the quality comes from decisions you make once per client, not per article:

- **Their own AI account and a spending cap.** A key per client keeps billing clean: the provider charges that account, and there is nothing to mark up or reconcile. Set a monthly limit so a busy month can't surprise anyone. See [using your own AI API key in WordPress](/blog/use-your-own-ai-api-key-in-wordpress/).
- **A voice profile.** Who writes, for whom, what they believe, the words they use and the ones they never use, with a sample of their real writing. "Friendly and professional" changes nothing; "never says *solution*, gives a verdict in the last paragraph" does.
- **Approved sources.** The client's own product, pricing and policy pages first, then the third-party sources they trust. Note the ones they don't.
- **A claims policy.** What needs the client's sign-off: prices, guarantees, comparisons with competitors, anything medical, legal or financial.

Keep these in the client's site or your project notes, where the next writer will find them.

## 2. Brief, don't prompt

A prompt asks the model to fill gaps; a brief closes them. For each article, write down:

- the reader and what they want to decide or do
- the primary phrase and supporting terms
- the points the article must make, and the call to action
- facts to include and claims to avoid
- **three to five sources** the article should rest on

Save a brief per content type (product guide, comparison, local service page) and reuse it. Most of an article's accuracy is set here.

## 3. Check sources and the outline before drafting

Two short checkpoints catch the expensive mistakes:

1. **Sources.** Skim what was extracted from each page and its date. Drop anything stale, off topic or not authoritative. A draft can only be as current as its sources.
2. **Outline.** Fix the structure while it is a list of headings: missing sections, wrong order, a section the client won't want. Restructuring a finished draft costs far more.

## 4. Draft inside WordPress

Copying from a chat window into the client's site loses formatting, links and any record of where the text came from. Draft directly as blocks in the client's WordPress, as a **draft**, credited to the right author, with each claim linked to its source. The editor then works in the place the article will live.

## 5. Review in two passes

Split the review by who knows what:

| Pass | Who | Checks |
| --- | --- | --- |
| Facts | Your editor | Every number, name, date, rule and comparison traced to a source; anything unsupported fixed, qualified or cut |
| Fit | The client | Positioning, voice, offers, and anything in the claims policy |

The editor's pass is described step by step in [how to verify AI-written claims before publishing](/blog/verify-ai-written-claims-before-publishing/), and the full read-through in [reviewing an AI-generated article before publishing](/blog/review-ai-generated-article-before-publishing/). Send the client a draft that has already passed the first one; they should never be your fact-checker.

## 6. Keep a record

Months later a client will ask where a figure came from. Keep, with each post, the sources it was written from and when they were read, the model that wrote it, and who approved it. Agree with each client whether and how AI assistance is disclosed, and apply it consistently.

## 7. Measure cost and editing time

Track two numbers per client: what the AI provider charged per article, and how long editing took. Rising editing time usually points back to step 1 or 2, a vague voice profile or thin sources, not to the model.

## Where tooling helps

The workflow is the same whatever you use, but some of it can live in the client's WordPress. [AI Blog Writer with Sources](/agencies/) runs on each client's own AI key with a monthly cost ceiling, keeps a writer profile per client author, drafts from the URLs you supply, cites them inline and records when each was read, and in Guided mode pauses for source and outline approval before writing. Provenance is saved with each post, and nothing is published automatically.

[AI Blog Writer Pro](/pricing/) adds the checks that speed up the editor's pass: every factual claim marked as supported, weakly supported or unsupported by the sources, and a citation and link check. The Agency plan covers five sites.
