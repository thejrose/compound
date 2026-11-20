# compound. website

The site is built directly from the Claude Design canvas, so the canvas stays the single source of truth.

- `design/` holds the canvas artboards (`*.dc.html`, desktop and `M-*` mobile) and `canvas.json`. To update the site, replace these files with the latest export from the canvas.
- `build/build.mjs` renders each page from its desktop and mobile artboards. Both are served, and CSS shows one or the other at 880px.
- `build/dc.cjs` is a small renderer for the canvas template format. The same file runs in the browser (`/assets/dc.js`) to make the service map, form pills and mobile menu interactive.
- `build/pages.mjs` holds URLs, page titles, descriptions, and the legal and 404 pages.
- `public/` holds fonts (self-hosted), brand assets and the favicon.

```
npm install
npm run build      # outputs dist/
npm run preview    # serves dist/ locally
```

Netlify: build command `npm run build`, publish directory `dist`. The growth check form posts to Netlify Forms (`growth-check`) and lands on `/thanks/`.
