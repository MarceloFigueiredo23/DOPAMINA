/**
 * Marcas paródia — logos caricatos por segmento (inspirados, não cópias).
 */
(function (w) {
  'use strict';

  /* AIFOOD — paródia iFood: boneco-fork faminto + vermelho icônico */
  var LOGO_AIFOOD =
    '<svg class="brand-mark brand-mark--aifood" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="afBg" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stop-color="#ff3b4a"/><stop offset="100%" stop-color="#c41623"/></linearGradient>' +
    '<filter id="afSh"><feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.25"/></filter>' +
    '</defs>' +
    '<rect x="1" y="1" width="46" height="46" rx="14" fill="url(#afBg)" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/>' +
    '<g filter="url(#afSh)">' +
    '<circle cx="24" cy="13" r="5.5" fill="#fff"/>' +
    '<circle cx="22" cy="12" r="1.2" fill="#ea1d2c"/><circle cx="26" cy="12" r="1.2" fill="#ea1d2c"/>' +
    '<path d="M21 15 Q24 17 27 15" stroke="#ea1d2c" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="24" cy="21" rx="7" ry="5.5" fill="#fff"/>' +
    '<path d="M17 24 L14 40 M20 24 L19 40 M24 24 L24 40 M28 24 L29 40 M31 24 L34 40" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M30 10 L33 6 M18 10 L15 6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>' +
  '</g>' +
    '<text x="24" y="46" text-anchor="middle" fill="#fff" font-size="5.5" font-weight="800" font-family="Arial,sans-serif" opacity="0.9">ai</text>' +
    '</svg>';

  /* AMAZOOM — paródia Amazon: "a" + sorriso-seta gigante com olhos e zoom */
  var LOGO_AMAZOOM =
    '<svg class="brand-mark brand-mark--amazoom" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="amzBg" x1="0" y1="0" x2="0" y2="48"><stop offset="0%" stop-color="#1a2634"/><stop offset="100%" stop-color="#0d1117"/></linearGradient>' +
    '</defs>' +
    '<rect x="1" y="1" width="46" height="46" rx="5" fill="url(#amzBg)"/>' +
    '<text x="24" y="21" text-anchor="middle" fill="#fff" font-size="18" font-weight="900" font-family="Georgia,serif">a</text>' +
    '<circle cx="19" cy="17" r="1.3" fill="#ff9900"/><circle cx="29" cy="17" r="1.3" fill="#ff9900"/>' +
    '<path d="M7 30 C14 38, 34 38, 41 28" stroke="#ff9900" stroke-width="4.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M37 26 L43 29 L37 32 Z" fill="#ff9900"/>' +
    '<path d="M38 22 L44 24 L42 26" stroke="#ffcc66" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M40 18 L46 19" stroke="#ffcc66" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>' +
    '<circle cx="15" cy="32" r="1" fill="#232f3e"/><circle cx="33" cy="32" r="1" fill="#232f3e"/>' +
    '</svg>';

  /* SHENIM — paródia SHEIN: cabide + tipografia bold torta + raio fast fashion */
  var LOGO_SHENIM =
    '<svg class="brand-mark brand-mark--shenim" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<rect x="1" y="1" width="46" height="46" rx="3" fill="#0a0a0a"/>' +
    '<path d="M18 8 C18 4, 30 4, 30 8 L30 11" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M14 11 H34" stroke="#fff" stroke-width="2" stroke-linecap="round"/>' +
    '<text x="24" y="26" text-anchor="middle" fill="#fff" font-size="10" font-weight="900" font-family="Arial Black,Arial,sans-serif" transform="rotate(-4 24 26)">SHE</text>' +
    '<text x="24" y="38" text-anchor="middle" fill="#ff2d6a" font-size="10" font-weight="900" font-family="Arial Black,Arial,sans-serif" transform="rotate(3 24 38)">NIM</text>' +
    '<path d="M6 20 L10 18 L8 22 Z" fill="#ff2d6a" opacity="0.9"/>' +
    '<path d="M42 16 L38 18 L40 14 Z" fill="#ff2d6a" opacity="0.9"/>' +
    '<circle cx="40" cy="8" r="2" fill="#ff2d6a" opacity="0.5"/>' +
    '</svg>';

  /* DOPAMINA SHOP — sacola dopamina com raio e olhos */
  var LOGO_DOPAMINA =
    '<svg class="brand-mark brand-mark--dopamina" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="dpBg" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stop-color="#ff2d95"/><stop offset="50%" stop-color="#b026ff"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient>' +
    '<linearGradient id="dpBag" x1="12" y1="14" x2="36" y2="42"><stop offset="0%" stop-color="#fff" stop-opacity="0.95"/><stop offset="100%" stop-color="#e8d4ff"/></linearGradient>' +
    '</defs>' +
    '<rect x="1" y="1" width="46" height="46" rx="14" fill="url(#dpBg)"/>' +
    '<path d="M16 18 C16 14, 32 14, 32 18 L34 38 C34 40, 14 40, 14 38 Z" fill="url(#dpBag)" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>' +
    '<path d="M19 18 C19 15, 29 15, 29 18" stroke="#b026ff" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    '<circle cx="20" cy="28" r="1.5" fill="#b026ff"/><circle cx="28" cy="28" r="1.5" fill="#b026ff"/>' +
    '<path d="M21 31 Q24 33 27 31" stroke="#ff2d95" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M24 8 L26 14 L32 12 L27 17 L29 23 L24 19 L19 23 L21 17 L16 12 L22 14 Z" fill="#00ffa3" stroke="#fff" stroke-width="0.8"/>' +
    '</svg>';

  /* Wordmarks SVG para headers (mais caricatos que texto puro) */
  var WM_AIFOOD =
    '<svg class="brand-wm brand-wm--aifood" viewBox="0 0 120 32" height="28" aria-hidden="true">' +
    '<text x="0" y="24" fill="#fff" font-size="26" font-weight="400" font-style="italic" font-family="Georgia,serif">ai</text>' +
    '<text x="28" y="24" fill="#fff" font-size="26" font-weight="900" font-family="Arial Black,Arial,sans-serif">FOOD</text>' +
    '<circle cx="8" cy="6" r="2" fill="#ffcc00" opacity="0.9"/>' +
    '</svg>';

  var WM_AMAZOOM =
    '<svg class="brand-wm brand-wm--amazoom" viewBox="0 0 150 32" height="28" aria-hidden="true">' +
    '<text x="0" y="22" fill="#fff" font-size="22" font-weight="900" font-family="Arial Black,Arial,sans-serif" letter-spacing="-1">AMAZ</text>' +
    '<text x="72" y="22" fill="#ff9900" font-size="22" font-weight="900" font-family="Arial Black,Arial,sans-serif">OO</text>' +
    '<text x="108" y="22" fill="#fff" font-size="22" font-weight="900" font-family="Arial Black,Arial,sans-serif">M</text>' +
    '<path d="M4 28 Q75 36 146 24" stroke="#ff9900" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M140 22 L146 24 L140 26 Z" fill="#ff9900"/>' +
    '</svg>';

  var WM_SHENIM =
    '<svg class="brand-wm brand-wm--shenim" viewBox="0 0 110 36" height="30" aria-hidden="true">' +
    '<text x="0" y="20" fill="#fff" font-size="20" font-weight="900" font-family="Arial Black,Arial,sans-serif" transform="skewX(-6)">SHE</text>' +
    '<text x="0" y="34" fill="#ff2d6a" font-size="20" font-weight="900" font-family="Arial Black,Arial,sans-serif" transform="skewX(4)">NIM</text>' +
    '<path d="M88 4 L92 10 L98 8 L93 14" stroke="#ff2d6a" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
    '</svg>';

  function wordmarkHtml(tab) {
    if (tab === 'express') return WM_AIFOOD;
    if (tab === 'premium') return WM_AMAZOOM;
    if (tab === 'fashion') return WM_SHENIM;
    return '';
  }

  function wordmark(tab) {
    if (tab === 'express') {
      return '<span class="brand-wordmark brand-wordmark--aifood"><span class="bw-ai">ai</span><span class="bw-rest">FOOD</span></span>';
    }
    if (tab === 'premium') {
      return '<span class="brand-wordmark brand-wordmark--amazoom">AMAZ<span class="bw-o">OO</span>M</span>';
    }
    if (tab === 'fashion') {
      return '<span class="brand-wordmark brand-wordmark--shenim">SHE<span class="bw-accent">NIM</span></span>';
    }
    return '';
  }

  function lockup(tab, size) {
    var b = BRANDS[tab];
    if (!b) return '';
    var cls = 'brand-lockup brand-lockup--' + tab + (size === 'sm' ? ' brand-lockup--sm' : '');
    var wm = size === 'sm' ? wordmark(tab) : (wordmarkHtml(tab) || wordmark(tab));
    return '<div class="' + cls + '">' + b.logoMark + wm + '</div>';
  }

  var BRANDS = {
    site: {
      name: 'DOPAMINA SHOP',
      short: 'DOPAMINA',
      suffix: 'SHOP',
      tagline: 'Compre de mentira. Sinta de verdade.',
      logoMark: LOGO_DOPAMINA,
    },
    express: {
      name: 'AIFOOD',
      subtitle: 'Delivery paródia',
      logoMark: LOGO_AIFOOD,
      color: '#ea1d2c',
      parodyOf: 'apps de delivery',
    },
    premium: {
      name: 'AMAZOOM',
      subtitle: 'Tudo em um clique',
      logoMark: LOGO_AMAZOOM,
      color: '#ff9900',
      parodyOf: 'marketplaces',
    },
    fashion: {
      name: 'SHENIM',
      subtitle: 'Moda ultra rápida',
      logoMark: LOGO_SHENIM,
      color: '#ff2d6a',
      parodyOf: 'fast fashion',
    },
  };

  BRANDS.lockup = lockup;
  BRANDS.wordmark = wordmark;
  w.DOPAMINA_BRANDS = BRANDS;
})(window);
