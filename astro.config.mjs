import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mault.ai',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
