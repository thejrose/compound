// Builds the compound. website from the Design canvas files in /design.
//
// Each page is rendered twice, from its desktop artboard (X.dc.html) and its
// mobile artboard (M-X.dc.html). Both are served, and CSS shows one or the other
// at the breakpoint. Pages with buttons, pills or menus are hydrated in the
// browser by /assets/dc.js + /assets/boot.js using the same templates.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { PAGES, ROUTE, LEGAL, NOT_FOUND, SITE, GA_ID } from './pages.mjs';

const require = createRequire(import.meta.url);
const DC = require('./dc.cjs');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DESIGN = path.join(ROOT, 'design');
const PUBLIC = path.join(ROOT, 'public');
const DIST = path.join(ROOT, 'dist');
const BREAKPOINT = 880;

const BLOBS = {
  '/_blob/0d2940dd4a7f2e80e6e9cb649ec78bc5': '/brand/wordmark.svg',
  '/_blob/bbbcfed1fdce37cc9bb47571788ebaf8': '/brand/avatar.svg',
};

const FONT_CSS = `@font-face{font-family:"Fraunces";src:url("/fonts/Fraunces-100-900.woff2") format("woff2");font-weight:100 900;font-display:swap}
@font-face{font-family:"Instrument Sans";src:url("/fonts/InstrumentSans-400-700.woff2") format("woff2");font-weight:400 700;font-display:swap}
@font-face{font-family:"IBM Plex Mono";src:url("/fonts/IBMPlexMono-400.woff2") format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"IBM Plex Mono";src:url("/fonts/IBMPlexMono-500.woff2") format("woff2");font-weight:500;font-display:swap}`;

const CONSENT_CSS = `.cp-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:100;max-width:720px;margin:0 auto;box-sizing:border-box;display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center;justify-content:space-between;padding:18px 20px;background:#172033;color:#F2F4F7;border-radius:16px;box-shadow:0 12px 40px rgba(23,32,51,.28);font:400 15px/1.55 'Instrument Sans',Arial,sans-serif;animation:cpFadeA .35s ease both}
.cp-consent__text{margin:0;flex:1 1 320px}.cp-consent__text b{font-weight:600}.cp-consent a{color:#A9C8FF}.cp-consent a:hover{color:#FFFFFF}
.cp-consent__actions{display:flex;gap:10px;flex:none}
.cp-consent__btn{min-height:44px;padding:10px 20px;border-radius:999px;border:1px solid #FFFFFF;background:#FFFFFF;color:#172033;font:600 15px/1 'Instrument Sans',Arial,sans-serif;cursor:pointer}
.cp-consent__btn--ghost{background:transparent;color:#F2F4F7;border-color:#5B6680}
.cp-consent__btn:focus-visible{outline:2px solid #A9C8FF;outline-offset:3px}
@keyframes cpFadeA{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`;

const read = (f) => fs.readFileSync(path.join(DESIGN, f), 'utf8');

// ---------- source preparation (applied to the template before rendering) ----------
function routeFor(name) {
  const r = ROUTE[name.replace(/^M-/, '')];
  if (!r) throw new Error('No route for ' + name);
  return r;
}

function prepForm(src) {
  if (!src.includes('<form aria-label="Request a growth check"')) return src;
  src = src.replace(/<a class="cp-press" href="(?:M-)?Thanks\.dc\.html" style="([^"]*)">(Request my growth check[\s\S]*?)<\/a>/,
    (m, style, inner) => `<button type="submit" class="cp-press" style="${style} border: 0; cursor: pointer; font-family: inherit;">${inner}</button>`);
  src = src.replace('<form aria-label="Request a growth check"',
    '<form name="growth-check" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="company-site" aria-label="Request a growth check"');
  src = src.replace(/(<h2[^>]*>Tell us about your business<\/h2>)/,
    '$1<input type="hidden" name="form-name" value="growth-check"><input type="hidden" name="interests" value="{{interests}}"><p hidden><label>Leave this empty <input name="company-site" tabindex="-1" autocomplete="off"></label></p>');
  src = src.replace('placeholder="Alex Smith"', 'name="name" autocomplete="name" placeholder="Alex Smith"')
    .replace('type="email" placeholder="alex@brand.co.uk"', 'type="email" name="email" autocomplete="email" placeholder="alex@brand.co.uk"')
    .replace('type="url" placeholder="brand.co.uk"', 'type="text" inputmode="url" name="website" autocomplete="url" placeholder="brand.co.uk"')
    .replace(/(Annual online revenue<\/span><select) /, '$1 name="revenue" ')
    .replace(/(\(optional\)<\/span><\/span><select) /, '$1 name="role" ')
    .replace('<textarea ', '<textarea name="message" ')
    .replace('<input type="checkbox" required', '<input type="checkbox" name="consent" value="yes" required')
    .replaceAll('<option>Choose one</option>', '<option value="">Choose one</option>');
  src = src.replace(/(const chips = [\s\S]*?\}\)\);)/, "$1\n    const interests = list.filter((n) => on[n]).join(', ');")
    .replace(/(return \{[^}]*?)chips(\s*\})/, '$1chips, interests$2');
  if (!/chips, interests/.test(src)) throw new Error('Could not wire form interests');
  return src;
}

function prepSource(src, { mobile }) {
  src = prepForm(src);
  for (const [k, v] of Object.entries(BLOBS)) src = src.split(k).join(v);
  src = src.replace(/href="((?:M-)?[A-Za-z-]+)\.dc\.html"/g, (m, name) => `href="${routeFor(name)}"`);
  src = src.replace(/'((?:M-)?[A-Za-z-]+)\.dc\.html'/g, (m, name) => `'${routeFor(name)}'`);
  src = src.replace(/href="#(privacy|cookies|terms)"/g, 'href="/$1/"');
  if (mobile) {
    src = src.replace('width: 390px; overflow-x: hidden;', 'width: 100%; overflow-x: hidden;').replace(' width: 390px;"', '"');
    src = src.replace(/\b(id|for|aria-labelledby|aria-controls|aria-describedby)="([^"{]+)"/g, (m, a, v) => `${a}="${v.split(' ').map((x) => 'm-' + x).join(' ')}"`);
    src = src.replace(/href="#([^"/{]+)"/g, 'href="#m-$1"');
  }
  return src;
}

function parseDesign(src) {
  const { document } = parseHTML(src);
  const x = document.querySelector('x-dc');
  const styles = [];
  const helmet = x.querySelector('helmet');
  if (helmet) { helmet.querySelectorAll('style').forEach((s) => styles.push(s.textContent)); helmet.remove(); }
  const script = document.querySelector('script[data-dc-script]');
  return { x, tplHTML: x.innerHTML, code: script ? script.textContent : 'class Component extends DCLogic { renderVals() { return {}; } }', styles };
}

function loadVariant(file, mobile, extraPrep) {
  let src = prepSource(read(file), { mobile });
  if (extraPrep) src = extraPrep(src, mobile);
  const page = parseDesign(src);
  const children = {};
  const childDefs = {};
  for (const m of src.matchAll(/<dc-import name="([^"]+)"/g)) {
    const name = m[1];
    const child = parseDesign(prepSource(read(name + '.dc.html'), { mobile }));
    children[name] = { cls: DC.makeComponent(child.code), tpl: child.x };
    childDefs[name] = { tpl: child.tplHTML, code: child.code };
    page.styles.push(...child.styles);
  }
  const interactive = /\bon[A-Z][a-z]+="\{\{/.test(src) || Object.values(childDefs).some((d) => /\bon[A-Z][a-z]+="\{\{/.test(d.tpl));
  // server render
  const { document } = parseHTML('<!doctype html><html><body><div id="out"></div></body></html>');
  const out = document.getElementById('out');
  const R = DC.createRenderer(document);
  const Comp = DC.makeComponent(page.code);
  const ctx = { instances: {}, handlers: {}, children, rerender: () => {} };
  R.renderRoot(page.x, new Comp({}), ctx, out);
  return { html: out.innerHTML, tplHTML: page.tplHTML, code: page.code, childDefs, styles: page.styles, interactive };
}

// ---------- page assembly ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsonSafe = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function dedupeCss(blocks) {
  const seen = new Set();
  const out = [];
  for (const b of blocks) for (const line of b.split('\n')) {
    const t = line.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out.join('\n');
}

function assemble(meta, desktop, mobile) {
  const css = [FONT_CSS, dedupeCss([...desktop.styles, ...mobile.styles]),
    `html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}body{margin:0;background:#FFFFFF}`,
    `.dc-m{display:none}@media (max-width:${BREAKPOINT}px){.dc-d{display:none}.dc-m{display:block}}`,
    CONSENT_CSS].join('\n');
  const variant = (v, key) => {
    const attrs = v.interactive ? ` data-dc-def="def-${key}" data-dc-tpl="tpl-${key}"` : '';
    return `<div class="dc-${key}"${attrs}>${v.html}</div>`;
  };
  const defs = [['d', desktop], ['m', mobile]].filter(([, v]) => v.interactive).map(([key, v]) =>
    `<template id="tpl-${key}">${v.tplHTML}</template>\n<script type="application/json" id="def-${key}">${jsonSafe({ code: v.code, children: v.childDefs })}</script>`).join('\n');
  const needsJs = desktop.interactive || mobile.interactive;
  const title = meta.title;
  return `<!doctype html>
<html lang="en-GB"${GA_ID ? ` data-ga-id="${GA_ID}"` : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(meta.description)}">
${meta.noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="canonical" href="${SITE}${meta.path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="compound.">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${SITE}${meta.path}">
<meta name="theme-color" content="#172033">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/Fraunces-100-900.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/InstrumentSans-400-700.woff2" as="font" type="font/woff2" crossorigin>
<style>
${css}
</style>
</head>
<body>
${variant(desktop, 'd')}
${variant(mobile, 'm')}
${defs}
${needsJs ? '<script src="/assets/dc.js" defer></script>\n<script src="/assets/boot.js" defer></script>\n' : ''}<script src="/assets/consent.js" defer></script>
</body>
</html>
`;
}

function writePage(routePath, html) {
  const file = routePath === '/404' ? path.join(DIST, '404.html') : path.join(DIST, routePath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// Replace the first content <section> after the header (used for legal and 404 pages built on the Thank-you shell)
function replaceMainSection(html, mobile) {
  return (src) => {
    const h = src.indexOf('</header>');
    const a = src.indexOf('<section', h);
    const b = src.indexOf('</section>', a) + '</section>'.length;
    return src.slice(0, a) + html(mobile) + src.slice(b);
  };
}

// ---------- build ----------
fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(PUBLIC, DIST, { recursive: true });
fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });
fs.copyFileSync(path.join(ROOT, 'build', 'dc.cjs'), path.join(DIST, 'assets', 'dc.js'));
fs.copyFileSync(path.join(ROOT, 'build', 'boot.js'), path.join(DIST, 'assets', 'boot.js'));
fs.copyFileSync(path.join(ROOT, 'build', 'consent.js'), path.join(DIST, 'assets', 'consent.js'));

const sitemap = [];
for (const p of PAGES) {
  const d = loadVariant(p.file + '.dc.html', false);
  const m = loadVariant('M-' + p.file + '.dc.html', true);
  writePage(p.path, assemble(p, d, m));
  if (!p.noindex) sitemap.push(p.path);
  console.log('built', p.path);
}
for (const p of [...LEGAL, NOT_FOUND]) {
  const d = loadVariant('Thanks.dc.html', false, (src) => replaceMainSection(p.body, false)(src));
  const m = loadVariant('M-Thanks.dc.html', true, (src) => replaceMainSection(p.body, true)(src));
  writePage(p.path, assemble(p, d, m));
  if (!p.noindex) sitemap.push(p.path);
  console.log('built', p.path);
}
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('done');
