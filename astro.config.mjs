// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    icon({
      // Without this, astro-icon bundles the ENTIRE mdi set by default.
      // RootTree uses brand icons, so load the collections we actually use.
      include: {
        'simple-icons': ['*'],
        lucide: ['*']
      }
    })
  ]
});