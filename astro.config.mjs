// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
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