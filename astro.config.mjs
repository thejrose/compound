import { defineConfig } from 'astro/config';

// Static site. Set `site` to the real domain once it's decided.
export default defineConfig({
  site: 'https://compound-website.netlify.app',
  trailingSlash: 'ignore',
});
