import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://michalgazda.github.io',
  base: '/high-pres.pl/',
  output: 'static',
  outDir: './dist',
});