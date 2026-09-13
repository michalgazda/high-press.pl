import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://michalgazda.github.io',
  base: '/high-press.pl/',
  output: 'static',
  outDir: './dist',
});