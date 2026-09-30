// Shared by /faq/, the home page and llms-full.txt, so answers never drift apart.
export const FAQ = [
  {
    q: 'What is AI Blog Writer with Sources?',
    a: 'A free WordPress plugin that turns a brief and up to eight source URLs you choose into an editable WordPress draft. The draft includes inline citations, warnings about claims to check, SEO suggestions and a provenance record. It uses your own OpenAI, Anthropic, Google or xAI API key.',
  },
  {
    q: 'How do I install it?',
    a: 'It is free on WordPress.org at https://wordpress.org/plugins/luis-rita-ai-blog-writer/. In WordPress, go to Plugins → Add New Plugin, search for "Luis Rita AI Blog Writer" (its directory name) and activate it, or run wp plugin install luis-rita-ai-blog-writer --activate. Then add your AI provider key under AI Blog Writer → Settings.',
  },
  {
    q: 'Does it publish automatically?',
    a: 'No. Every successful generation creates a WordPress draft. A person must review it and press Publish.',
  },
  {
    q: 'Does it search the web automatically?',
    a: 'No. The plugin fetches only the URLs you supply in the brief, from your own server.',
  },
  {
    q: 'Which AI models does it support?',
    a: 'GPT models from OpenAI, Claude models from Anthropic, Gemini models from Google and Grok models from xAI. The model list comes from your own provider account.',
  },
  {
    q: 'Do I need an account or subscription with the plugin author?',
    a: 'No. The plugin is bring-your-own-key. You pay your AI provider directly, and the plugin stores no billing data and sends nothing to the plugin author.',
  },
  {
    q: 'How much does it cost to generate an article?',
    a: 'The plugin is free. Each article uses provider tokens billed by your AI provider at their current rates, and the cost depends on the model, the article length and the amount of source material. The plugin records usage per job and can enforce monthly cost ceilings per site and per user.',
  },
  {
    q: 'Is my API key safe?',
    a: 'Keys are used only in server-side requests, are never sent to the browser or returned by the REST API, and are stored encrypted with Sodium. They can also be defined in wp-config.php so they never touch the database.',
  },
  {
    q: 'What happens to my posts if I deactivate or uninstall the plugin?',
    a: 'Generated posts are normal WordPress block content and are always kept. Plugin data is removed on uninstall only if you define AIBCG_REMOVE_DATA_ON_UNINSTALL as true.',
  },
  {
    q: 'Does it work with Rank Math?',
    a: 'Yes. When Rank Math is active, the editor sidebar can apply the suggested meta title, meta description and focus keyword. Values you already set in Rank Math are kept unless you choose to replace them.',
  },
  {
    q: 'Does it support multisite and other languages?',
    a: 'Yes to both. It can be activated per site or network-wide, and each site keeps its own keys and settings. Drafts can be generated in about 30 languages, including English, Spanish, Portuguese, French, German, Japanese and Arabic.',
  },
  {
    q: 'Does it work on low-traffic sites or with WP-Cron disabled?',
    a: 'Yes. Generation runs as resumable WP-Cron stages. The job screen keeps stages moving while it is open, and with DISABLE_WP_CRON you schedule wp-cron.php every minute or run a stage with wp aibcg job run <job-id>.',
  },
  {
    q: 'Is AI-generated content accurate enough to publish as is?',
    a: 'No AI output should be published unreviewed. Generated content can contain errors, unsupported claims or bias. The plugin makes review faster by tying claims to sources and listing warnings, but a person must check the draft. No ranking, traffic, accuracy or legal-safety guarantee is made.',
  },
];
