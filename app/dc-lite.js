// Tiny renderer for the BRAVVA prototype screens: {{holes}}, <sc-if>, <sc-for>, onClick.
(function () {
  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) { Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch); window.__dcRender(); }
  }
  window.DCLogic = DCLogic;
  const HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  function lookup(path, scopes) {
    if (path === 'true') return true; if (path === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    const parts = path.split('.');
    for (const sc of scopes) {
      if (sc && parts[0] in sc) { let v = sc; for (const p of parts) { v = v == null ? undefined : v[p]; } return v; }
    }
    return undefined;
  }
  function whole(str) { const m = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/.exec(str || ''); return m ? m[1] : null; }
  function interp(str, scopes) { return str.replace(HOLE, (_, p) => { const v = lookup(p, scopes); return v == null ? '' : String(v); }); }
  function build(node, scopes, out, ns) {
    if (node.nodeType === 3) { out.appendChild(document.createTextNode(interp(node.nodeValue, scopes))); return; }
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toLowerCase();
    if (tag === 'sc-if') {
      const p = whole(node.getAttribute('value'));
      if (p && lookup(p, scopes)) node.childNodes.forEach((c) => build(c, scopes, out, ns));
      return;
    }
    if (tag === 'sc-for') {
      const list = lookup(whole(node.getAttribute('list')), scopes) || [];
      const as = node.getAttribute('as') || 'item';
      list.forEach((item, i) => node.childNodes.forEach((c) => build(c, [{ [as]: item, $index: i }].concat(scopes), out, ns)));
      return;
    }
    const NS = (tag === 'svg' || ns) ? 'http://www.w3.org/2000/svg' : null;
    const el = NS ? document.createElementNS(NS, node.tagName === 'svg' || NS ? node.localName : tag) : document.createElement(tag);
    for (const a of Array.from(node.attributes)) {
      if (a.name.startsWith('hint-')) continue;
      const p = whole(a.value);
      if (a.name.startsWith('on') && p) { const fn = lookup(p, scopes); if (typeof fn === 'function') el.addEventListener(a.name.slice(2), fn); continue; }
      el.setAttribute(a.name, interp(a.value, scopes));
    }
    node.childNodes.forEach((c) => build(c, scopes, el, NS));
    out.appendChild(el);
  }
  window.dcMount = function (Component) {
    const tpl = document.getElementById('dc-template');
    const root = document.getElementById('dc-root');
    const comp = new Component({});
    window.__dcRender = function () {
      const keep = {};
      root.querySelectorAll('input[id]').forEach((i) => { keep[i.id] = i.value; });
      const frag = document.createDocumentFragment();
      const vals = comp.renderVals();
      tpl.content.childNodes.forEach((c) => build(c, [vals], frag));
      root.replaceChildren(frag);
      Object.keys(keep).forEach((id) => { const i = document.getElementById(id); if (i) i.value = keep[id]; });
    };
    window.__dcRender();
  };
})();
