// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sourcedwriter.com',
  // GitHub Pages serves /path/ and redirects /path to it, so canonical URLs end in a slash.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
