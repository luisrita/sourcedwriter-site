---
title: Usage and cost ceilings
description: Track provider token usage and estimated cost per job, and set site-wide or per-user monthly cost ceilings so spending on your own API key stays predictable.
order: 7
updated: 2026-09-29
---

Because you use your own key, you pay your AI provider directly. The plugin records usage for each request so you can see where the money goes.

## Usage and cost screen

**AI Blog Writer → Usage and cost** shows the provider connection state, the funding source (your own key) and the estimated site cost for the current month. Each finished job also shows its own usage.

## How cost is estimated

From version 1.6, the plugin knows each model's list price per million input and output tokens, checked against the providers' pricing pages on the date shown in Settings, and multiplies it by the usage the provider reports. Under **Cost, privacy, and advanced controls**, a note below the price fields shows the list price of the selected model.

To use your own prices instead, for example a negotiated rate, enter them in **Input cost / 1M units (USD)** and **Output cost / 1M units (USD)**; they then apply to every model. A model with no known list price has no estimate until you enter its prices. The result is always an estimate, and your provider's invoice is the final figure.

## Cost ceilings

Under **Cost, privacy, and advanced controls**:

- **Monthly cost ceiling (USD)**: a limit for the whole site.
- **Per-user monthly ceiling (USD)**: a limit for each user's jobs.

A value of `0` means no ceiling. Before each paid stage, the plugin checks whether that stage would push the month over a ceiling. If it would, the job stops with `cost_limit_reached`: "Monthly cost ceiling would be exceeded. Raise the limit or wait until next month."

Ceilings are a guardrail inside WordPress. Also set a spending limit in your provider's dashboard.
