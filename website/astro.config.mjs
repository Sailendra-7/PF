import { defineConfig } from 'astro/config';

// Root by default (custom domain, as before). For https://<user>.github.io/PF build with BASE_PATH=/PF.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  trailingSlash: 'ignore',
  vite: {
    build: { chunkSizeWarningLimit: 600 },
  },
});
