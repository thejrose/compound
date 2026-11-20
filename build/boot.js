// Hydrates each rendered canvas page root so its buttons, pills and menus work.
(function () {
  var DC = window.DC;
  function tplFromString(html) { var t = document.createElement('template'); t.innerHTML = html; return t.content; }
  function boot(root) {
    var def = JSON.parse(document.getElementById(root.getAttribute('data-dc-def')).textContent);
    var tpl = document.getElementById(root.getAttribute('data-dc-tpl')).content;
    var R = DC.createRenderer(document);
    var queued = false;
    function rerender() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; draw(); });
    }
    var children = {};
    Object.keys(def.children || {}).forEach(function (name) {
      children[name] = { cls: DC.makeComponent(def.children[name].code), tpl: tplFromString(def.children[name].tpl) };
    });
    var ctx = { instances: {}, handlers: {}, children: children, rerender: rerender };
    var Comp = DC.makeComponent(def.code);
    var inst = new Comp({}, rerender);
    function draw() {
      var frag = document.createDocumentFragment();
      R.renderRoot(tpl, inst, ctx, frag);
      DC.morph(root, frag);
    }
    root.addEventListener('click', function (e) {
      var el = e.target.closest('[data-dc-click]');
      if (!el || !root.contains(el)) return;
      var fn = ctx.handlers[el.getAttribute('data-dc-click')];
      if (fn) fn(e);
    });
    draw();
  }
  function start() { document.querySelectorAll('[data-dc-def]').forEach(boot); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
