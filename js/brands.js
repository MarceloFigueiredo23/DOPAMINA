/**
 * Marcas paródia — inspiradas nos segmentos, sem copiar logos registrados.
 */
(function (w) {
  'use strict';

  var LOGO_AIFOOD =
    '<svg class="brand-mark brand-mark--aifood" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">' +
    '<rect x="2" y="2" width="40" height="40" rx="12" fill="#ea1d2c"/>' +
    '<path d="M14 30c0-6 4-10 8-10s8 4 8 10" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
    '<circle cx="22" cy="16" r="4" fill="#fff"/>' +
    '<text x="22" y="21" text-anchor="middle" fill="#ea1d2c" font-size="7" font-weight="800" font-family="Arial,sans-serif">ai</text>' +
    '</svg>';

  var LOGO_AMAZOOM =
    '<svg class="brand-mark brand-mark--amazoom" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">' +
    '<rect x="2" y="2" width="40" height="40" rx="4" fill="#131921"/>' +
    '<text x="22" y="19" text-anchor="middle" fill="#fff" font-size="11" font-weight="900" font-family="Arial,sans-serif">a</text>' +
    '<path d="M8 28 Q22 34 36 28" stroke="#ff9900" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M32 26 L36 28 L32 30" fill="#ff9900"/>' +
    '</svg>';

  var LOGO_SHENIM =
    '<svg class="brand-mark brand-mark--shenim" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">' +
    '<rect x="2" y="2" width="40" height="40" rx="2" fill="#111"/>' +
    '<text x="22" y="21" text-anchor="middle" fill="#fff" font-size="9" font-weight="900" font-family="Arial Black,Arial,sans-serif" letter-spacing="-0.5">SHE</text>' +
    '<text x="22" y="32" text-anchor="middle" fill="#ff2d6a" font-size="9" font-weight="900" font-family="Arial Black,Arial,sans-serif" letter-spacing="-0.5">NIM</text>' +
    '</svg>';

  var LOGO_DOPAMINA =
    '<svg class="brand-mark brand-mark--dopamina" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">' +
    '<defs><linearGradient id="dopaGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
    '<stop offset="0%" stop-color="#ff2d95"/><stop offset="100%" stop-color="#b026ff"/></linearGradient></defs>' +
    '<rect x="2" y="2" width="40" height="40" rx="12" fill="url(#dopaGrad)"/>' +
    '<path d="M14 28 L22 12 L30 28 Z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<circle cx="22" cy="24" r="3" fill="#00ffa3"/>' +
    '</svg>';

  function wordmark(name, tab) {
    if (tab === 'express') {
      return '<span class="brand-wordmark brand-wordmark--aifood"><span class="bw-ai">ai</span><span class="bw-rest">FOOD</span></span>';
    }
    if (tab === 'premium') {
      return '<span class="brand-wordmark brand-wordmark--amazoom">AMAZ<span class="bw-o">OO</span>M</span>';
    }
    if (tab === 'fashion') {
      return '<span class="brand-wordmark brand-wordmark--shenim">SHE<span class="bw-accent">NIM</span></span>';
    }
    return '<span class="brand-wordmark">' + name + '</span>';
  }

  function lockup(tab, size) {
    var b = BRANDS[tab];
    if (!b) return '';
    var cls = 'brand-lockup brand-lockup--' + tab + (size === 'sm' ? ' brand-lockup--sm' : '');
    return '<div class="' + cls + '">' + b.logoMark + wordmark(b.name, tab) + '</div>';
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
