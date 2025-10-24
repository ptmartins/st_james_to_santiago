// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel({}),
  integrations: [react()],
  vite: {
    build: {
      sourcemap: true
    },
    optimizeDeps: {
      include: ['chart.js', 'chart.js/auto']
    },
    ssr: {
      noExternal: ['chart.js']
    }
  }
});