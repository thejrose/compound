// Minimal renderer for the Design canvas (.dc.html) template format.
// Runs at build time (with linkedom) and in the browser (for interactive parts),
// so the canvas files stay the single source of truth for the site.
//
// Supports: {{path}} holes in text and attributes, <sc-for>, <sc-if>,
// <dc-import> child components, and on* event bindings ({{fn}}).

const SVG_NS = 'http://www.w3.org/2000/svg';
const WHOLE = /^\{\{\s*([^}]+?)\s*\}\}$/;
const HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;

class DCLogic {
  constructor(props, onChange) {
    this.props = props || {};
    this.state = null;
    this._onChange = onChange || null;
  }
  setState(patch) {
    const next = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state || {}, next);
    if (this._onChange) this._onChange();
  }
  forceUpdate() { if (this._onChange) this._onChange(); }
}

function makeComponent(code) {
  // eslint-disable-next-line no-new-func
  return new Function('DCLogic', code + '\nreturn Component;')(DCLogic);
}

function lookup(path, scope) {
  const p = path.trim();
  if (p === 'true') return true;
  if (p === 'false') return false;
  if (p === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(p)) return Number(p);
  if (/^'.*'$|^".*"$/.test(p)) return p.slice(1, -1);
  const parts = p.split('.');
  for (let i = scope.length - 1; i >= 0; i--) {
    const s = scope[i];
    if (s != null && Object.prototype.hasOwnProperty.call(Object(s), parts[0])) {
      let v = s[parts[0]];
      for (let k = 1; k < parts.length; k++) v = v == null ? undefined : v[parts[k]];
      return v;
    }
  }
  return undefined;
}

function interp(str, scope) {
  const m = str.match(WHOLE);
  if (m) return lookup(m[1], scope);
  return str.replace(HOLE, (_, path) => {
    const v = lookup(path, scope);
    return v == null ? '' : String(v);
  });
}

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function createRenderer(doc) {
  function renderNodes(nodes, scope, ctx, out) {
    for (const node of Array.from(nodes)) {
      if (node.nodeType === 3) {
        out.appendChild(doc.createTextNode(String(interp(node.data, scope) ?? '')));
        continue;
      }
      if (node.nodeType !== 1) continue;
      const tag = node.localName.toLowerCase();
      if (tag === 'helmet') continue;
      if (tag === 'sc-for') {
        const list = interp(node.getAttribute('list') || '', scope) || [];
        const as = node.getAttribute('as') || 'item';
        Array.from(list).forEach((item, i) => renderNodes(node.childNodes, scope.concat([{ [as]: item, $index: i }]), ctx, out));
        continue;
      }
      if (tag === 'sc-if') {
        if (interp(node.getAttribute('value') || '', scope)) renderNodes(node.childNodes, scope, ctx, out);
        continue;
      }
      if (tag === 'dc-import') {
        const name = node.getAttribute('name');
        const props = {};
        for (const a of Array.from(node.attributes)) {
          if (a.name === 'name' || a.name.startsWith('hint-')) continue;
          props[camel(a.name)] = interp(a.value, scope);
        }
        const key = name + '#' + (ctx.childKey++);
        const def = ctx.children[name];
        if (!def) continue;
        let inst = ctx.instances[key];
        if (!inst) inst = ctx.instances[key] = new def.cls(props, ctx.rerender);
        inst.props = props;
        renderNodes(def.tpl.childNodes, [inst.renderVals()], ctx, out);
        continue;
      }
      const isSvg = node.namespaceURI === SVG_NS;
      const el = isSvg ? doc.createElementNS(SVG_NS, node.tagName) : doc.createElement(tag);
      for (const a of Array.from(node.attributes)) {
        const name = a.name;
        if (name.startsWith('hint-')) continue;
        if (/^on[a-z]+$/i.test(name)) {
          const fn = interp(a.value, scope);
          if (typeof fn === 'function') {
            const id = 'h' + (ctx.hid++);
            ctx.handlers[id] = fn;
            el.setAttribute('data-dc-' + name.slice(2).toLowerCase(), id);
          }
          continue;
        }
        let v = interp(a.value, scope);
        if (v === false || v == null) continue;
        if (v === true) v = '';
        el.setAttribute(name.toLowerCase() === 'classname' ? 'class' : name, String(v));
      }
      renderNodes(node.childNodes, scope, ctx, el);
      out.appendChild(el);
    }
  }

  function renderRoot(tplRoot, inst, ctx, out) {
    ctx.handlers = {};
    ctx.hid = 0;
    ctx.childKey = 0;
    renderNodes(tplRoot.childNodes, [inst.renderVals()], ctx, out);
  }

  return { renderRoot };
}

// Patch `oldParent` so its children match `newParent`, keeping element identity
// (so typed form values, focus and scroll positions survive a re-render).
function morph(oldParent, newParent) {
  const a = Array.from(oldParent.childNodes);
  const b = Array.from(newParent.childNodes);
  for (let i = 0; i < b.length; i++) {
    const o = a[i], n = b[i];
    if (!o) { oldParent.appendChild(n); continue; }
    if (o.nodeType !== n.nodeType || o.nodeName !== n.nodeName) { oldParent.replaceChild(n, o); continue; }
    if (o.nodeType !== 1) { if (o.data !== n.data) o.data = n.data; continue; }
    for (const at of Array.from(o.attributes)) if (!n.hasAttribute(at.name)) o.removeAttribute(at.name);
    for (const at of Array.from(n.attributes)) if (o.getAttribute(at.name) !== at.value) o.setAttribute(at.name, at.value);
    morph(o, n);
  }
  for (let i = a.length - 1; i >= b.length; i--) oldParent.removeChild(a[i]);
}

const DC = { DCLogic, makeComponent, createRenderer, morph };
if (typeof module !== 'undefined' && module.exports) module.exports = DC;
if (typeof window !== 'undefined') window.DC = DC;
