/**
 * Marcas paródia — logos caricatos refinados (inspirados, não cópias).
 */
(function (w) {
  'use strict';

  /* AIFOOD — sacola delivery + garfo (paródia iFood) */
  var LOGO_AIFOOD =
    '<svg class="brand-mark brand-mark--aifood" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<defs><linearGradient id="afMarkBg" x1="6" y1="4" x2="42" y2="44"><stop offset="0%" stop-color="#ff5c6a"/><stop offset="100%" stop-color="#c41623"/></linearGradient></defs>' +
    '<rect x="2" y="2" width="44" height="44" rx="14" fill="url(#afMarkBg)"/>' +
    '<path d="M14 18 C14 14 34 14 34 18 L32 34 C32 37 16 37 16 34 Z" fill="#fff" opacity="0.95"/>' +
    '<path d="M18 18 L16.5 36 M22 18 L22 35 M26 18 L26 35 M30 18 L31.5 36" stroke="#ea1d2c" stroke-width="2.2" stroke-linecap="round"/>' +
    '<circle cx="24" cy="12" r="4.5" fill="#fff"/>' +
    '<path d="M19 10.5 Q24 7.5 29 10.5" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6"/>' +
    '</svg>';

  /* AMAZOOM — caixa escura + "a" + sorriso laranja (paródia marketplace) */
  var LOGO_AMAZOOM =
    '<svg class="brand-mark brand-mark--amazoom" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<rect x="2" y="2" width="44" height="44" rx="6" fill="#131921"/>' +
    '<rect x="2" y="2" width="44" height="44" rx="6" fill="none" stroke="#37475a" stroke-width="1"/>' +
    '<text x="24" y="21" text-anchor="middle" fill="#fff" font-size="20" font-weight="900" font-family="Georgia, Times, serif">a</text>' +
    '<path d="M8 31 C15 39 33 39 40 29" stroke="#ff9900" stroke-width="4.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M36 27 L42 29.5 L36 32 Z" fill="#ff9900"/>' +
    '<path d="M38 22 L44 24" stroke="#ffcc66" stroke-width="1.8" stroke-linecap="round" opacity="0.85"/>' +
    '</svg>';

  /* SHENIM — cabide fashion + tipografia SHE/NIM */
  var LOGO_SHENIM =
    '<svg class="brand-mark brand-mark--shenim" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<defs><linearGradient id="shMarkBg" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stop-color="#1a1a22"/><stop offset="100%" stop-color="#050508"/></linearGradient></defs>' +
    '<rect x="2" y="2" width="44" height="44" rx="6" fill="url(#shMarkBg)" stroke="#333" stroke-width="1"/>' +
    '<path d="M16 10 C16 7 32 7 32 10 V13" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<path d="M12 13 H36" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>' +
    '<text x="24" y="28" text-anchor="middle" fill="#fff" font-size="10" font-weight="900" font-family="Arial Black, Arial, sans-serif">SHE</text>' +
    '<text x="24" y="39" text-anchor="middle" fill="#ff2d6a" font-size="10" font-weight="900" font-family="Arial Black, Arial, sans-serif">NIM</text>' +
    '<circle cx="8" cy="18" r="2" fill="#ff2d6a"/><circle cx="40" cy="16" r="2" fill="#ff2d6a"/>' +
    '</svg>';

  /* DopShop — monograma premium */
  var LOGO_DOPSHOP =
    '<svg class="brand-mark brand-mark--dopamina" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="dopaMarkGrad" x1="0" y1="0" x2="44" y2="44"><stop offset="0%" stop-color="#c084fc"/><stop offset="50%" stop-color="#b026ff"/><stop offset="100%" stop-color="#ff2d95"/></linearGradient>' +
    '</defs>' +
    '<rect x="1" y="1" width="42" height="42" rx="11" fill="#12121a" stroke="url(#dopaMarkGrad)" stroke-width="1.5"/>' +
    '<path d="M15 13 H24.5 C29.5 13 33 16.2 33 20.5 C33 24.8 29.5 28 24.5 28 H19 V35" fill="none" stroke="url(#dopaMarkGrad)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="31" cy="13" r="2.25" fill="#00ffa3"/>' +
    '</svg>';

  var WM_AIFOOD =
    '<svg class="brand-wm brand-wm--aifood" viewBox="0 0 128 32" height="30" aria-hidden="true">' +
    '<text x="0" y="25" fill="currentColor" font-size="28" font-weight="400" font-style="italic" font-family="Georgia, serif">ai</text>' +
    '<text x="30" y="25" fill="currentColor" font-size="28" font-weight="900" font-family="Arial Black, Arial, sans-serif">FOOD</text>' +
    '</svg>';

  var WM_AMAZOOM =
    '<svg class="brand-wm brand-wm--amazoom" viewBox="0 0 158 34" height="30" aria-hidden="true">' +
    '<text x="0" y="23" fill="currentColor" font-size="24" font-weight="900" font-family="Arial Black, Arial, sans-serif" letter-spacing="-1">AMAZ</text>' +
    '<text x="78" y="23" fill="#ff9900" font-size="24" font-weight="900" font-family="Arial Black, Arial, sans-serif">OO</text>' +
    '<text x="114" y="23" fill="currentColor" font-size="24" font-weight="900" font-family="Arial Black, Arial, sans-serif">M</text>' +
    '<path d="M2 30 Q79 38 156 28" stroke="#ff9900" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M150 26 L156 28.5 L150 31 Z" fill="#ff9900"/>' +
    '</svg>';

  var WM_SHENIM =
    '<svg class="brand-wm brand-wm--shenim" viewBox="0 0 108 38" height="32" aria-hidden="true">' +
    '<text x="2" y="18" fill="currentColor" font-size="18" font-weight="900" font-family="Arial Black, Arial, sans-serif">SHE</text>' +
    '<text x="2" y="34" fill="#ff2d6a" font-size="18" font-weight="900" font-family="Arial Black, Arial, sans-serif">NIM</text>' +
    '</svg>';

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

  function wordmarkHtml(tab) {
    if (tab === 'express') return WM_AIFOOD;
    if (tab === 'premium') return WM_AMAZOOM;
    if (tab === 'fashion') return WM_SHENIM;
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
      name: 'DopShop',
      short: 'Dop',
      suffix: 'Shop',
      logoMark: LOGO_DOPSHOP,
    },
    express: { name: 'AIFOOD', logoMark: LOGO_AIFOOD, color: '#ea1d2c' },
    premium: { name: 'AMAZOOM', logoMark: LOGO_AMAZOOM, color: '#ff9900' },
    fashion: { name: 'SHENIM', logoMark: LOGO_SHENIM, color: '#ff2d6a' },
  };

  BRANDS.lockup = lockup;
  BRANDS.wordmark = wordmark;
  w.DOPAMINA_BRANDS = BRANDS;
})(window);
