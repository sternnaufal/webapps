import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
        item.changefreq = item.url.endsWith('/') ? 'weekly' : 'monthly';
        item.priority = item.url.endsWith('/tools/') ? 0.8 : 0.6;
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
});
