// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production domain (already purchased). Drives sitemap + canonical URLs.
  site: 'https://cognitioncoffee.co',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx(), sitemap()],

  markdown: {
    // Editorial code blocks that sit nicely on the cream paper.
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
