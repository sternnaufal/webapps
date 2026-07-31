import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://webapps.naufalrakha.my.id',
  output: 'static',

  build: {
    assets: 'assets',
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('404'),
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        if (url === 'https://webapps.naufalrakha.my.id') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (url.includes('/tools/')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.4;
        }
        return item;
      },
    }),
  ],

  server: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});