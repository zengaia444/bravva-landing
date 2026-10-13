// BRAVVA Light mode. Cream is the main color; berry stays the accent.
// Saved per device in localStorage ('bravva-theme' = 'light' | 'dark').
(function () {
  var light = false;
  try { light = localStorage.getItem('bravva-theme') === 'light'; } catch (e) {}
  window.BRAVVA_LIGHT = light;
  // Surfaces (backgrounds, borders) and ink (text, icons) swap separately.
  var SURF = { '3b1030': 'F6EEE2', '2a0b22': 'EFE3D3', '4a1640': 'EFE3D3', '561e4a': 'FFFFFF', '6a2a5c': 'E6D8C5', '7a3a6c': 'D6C3B0' };
  var INK = { 'f6eee2': '3B1030', 'e3cdd3': '6B4A62', 'f0c9d3': 'B0246E', 'ffd21f': 'E0A800', 'ffeb7a': 'F2C230', '9a5a8a': 'C9A9B9', 'b57aa6': 'B58FA5' };
  var ALL = Object.assign({}, SURF, INK);
  function swap(str, map) { return str.replace(/#([0-9a-fA-F]{6})\b/g, function (m, h) { var v = map[h.toLowerCase()]; return v ? '#' + v : m; }); }
  function bgOf(style) { var m = /(?:^|;)\s*background(?:-color|-image)?\s*:([^;]*)/i.exec(style || ''); return m ? m[1] : ''; }
  function isStrong(bg) {
    if (!bg) return false;
    if (/gradient|url\(/i.test(bg)) return true;
    var hexes = bg.match(/#[0-9a-fA-F]{6}/g); if (!hexes) return false;
    return hexes.some(function (h) { return !SURF[h.slice(1).toLowerCase()]; });
  }
  function fixStyle(style, strong) {
    if (strong) return style; // inside a berry, gold or green block: keep its colors
    return style.split(';').map(function (d) {
      var i = d.indexOf(':'); if (i < 0) return d;
      var prop = d.slice(0, i).trim().toLowerCase(), val = d.slice(i + 1);
      if (/^background/.test(prop)) return d.slice(0, i + 1) + swap(val, SURF);
      if (strong) return d;
      return d.slice(0, i + 1) + swap(val, ALL);
    }).join(';');
  }
  function walk(el, strong) {
    if (el.nodeType !== 1) return;
    if (!el.hasAttribute('data-th')) {
      var st = el.getAttribute('style');
      var own = isStrong(bgOf(st));
      if (st) el.setAttribute('style', fixStyle(st, strong));
      if (!strong) ['fill', 'stroke'].forEach(function (a) { var v = el.getAttribute(a); if (v) el.setAttribute(a, swap(v, ALL)); });
      el.setAttribute('data-th', '1');
      strong = strong || own;
    } else {
      strong = strong || isStrong(bgOf(el.getAttribute('style')));
    }
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) walk(c, strong);
  }
  window.__bravvaTheme = function (root) {
    if (!light) return;
    for (var c = root.firstElementChild || null; c; c = c.nextElementSibling) walk(c, false);
  };
  function syncSwitch() {
    var sw = document.getElementById('theme-switch'); if (!sw) return;
    sw.setAttribute('aria-checked', light ? 'true' : 'false');
    sw.style.background = light ? '#34C759' : '#7A3A6C';
    sw.style.justifyContent = light ? 'flex-end' : 'flex-start';
  }
  window.bravvaToggleTheme = function () {
    try { localStorage.setItem('bravva-theme', light ? 'dark' : 'light'); } catch (e) {}
    location.reload();
  };
  if (light) {
    var css = document.createElement('style');
    css.textContent = 'body{background:#EFE3D3!important}a{color:#3B1030}a:hover{color:#B0246E}';
    document.head.appendChild(css);
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', '#F6EEE2');
  }
  document.addEventListener('DOMContentLoaded', function () { if (light) window.__bravvaTheme(document.body); syncSwitch(); });
})();
