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

  /* Mercadopamina — identidade Dopa Electric (pulso + spark, original) */
  var LOGO_MERCADOPAMINA =
    '<svg class="brand-mark brand-mark--mercadopamina" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="mpLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
    '<stop offset="0%" stop-color="#FF6B4A"/><stop offset="50%" stop-color="#FF3D8E"/><stop offset="100%" stop-color="#00D4AA"/>' +
    '</linearGradient>' +
    '<linearGradient id="mpLogoBg" x1="0%" y1="0%" x2="0%" y2="100%">' +
    '<stop offset="0%" stop-color="#141A24"/><stop offset="100%" stop-color="#080C14"/>' +
    '</linearGradient>' +
    '<filter id="mpGlow" x="-20%" y="-20%" width="140%" height="140%">' +
    '<feGaussianBlur stdDeviation="1.1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter>' +
    '</defs>' +
    '<circle cx="24" cy="24" r="21" fill="url(#mpLogoBg)" stroke="url(#mpLogoGrad)" stroke-width="2.2"/>' +
    '<path d="M9 27 H15 L18.5 15 L24 29 L29.5 13 L33 27 H39" stroke="url(#mpLogoGrad)" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#mpGlow)"/>' +
    '<circle cx="24" cy="29" r="2.4" fill="#FFD166"/>' +
    '<circle cx="29.5" cy="13" r="2" fill="#00D4AA"/>' +
    '<path d="M24 6 V9 M20.5 7.5 L22 9.5 M27.5 7.5 L26 9.5" stroke="#FFD166" stroke-width="1.6" stroke-linecap="round"/>' +
    '<circle cx="16" cy="33" r="1.6" fill="#FF6B4A" opacity="0.75"/>' +
    '<circle cx="32" cy="33" r="1.6" fill="#00D4AA" opacity="0.75"/>' +
    '</svg>';

  var WM_MERCADOPAMINA =
    '<span class="mp-wordmark" aria-label="Mercadopamina">' +
    '<span class="mp-wm-line"><span class="mp-wm-mercado">Mercado</span><span class="mp-wm-pamina">pamina</span></span>' +
    '<span class="mp-wm-tag">terapia de varejo</span></span>';

  /* MERCADÃO — paródia marketplace amarelo/azul */
  var LOGO_MERCADAO =
    '<svg class="brand-mark brand-mark--mercadao" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">' +
    '<rect x="2" y="2" width="44" height="44" rx="12" fill="#fff159"/>' +
    '<path d="M14 28 C18 22 22 20 24 20 C26 20 30 22 34 28" stroke="#3483fa" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    '<circle cx="17" cy="26" r="3" fill="#3483fa"/><circle cx="31" cy="26" r="3" fill="#3483fa"/>' +
    '<path d="M12 14 H36" stroke="#2d3277" stroke-width="2.2" stroke-linecap="round"/>' +
    '</svg>';

  var WM_AIFOOD =
    '<svg class="brand-wm brand-wm--aifood" viewBox="0 0 128 32" height="30" aria-hidden="true">' +
    '<text x="0" y="25" fill="currentColor" font-size="28" font-weight="400" font-style="italic" font-family="Georgia, serif">ai</text>' +
    '<text x="30" y="25" fill="currentColor" font-size="28" font-weight="900" font-family="Arial Black, Arial, sans-serif">FOOD</text>' +
    '</svg>';

  var WM_MERCADAO =
    '<svg class="brand-wm brand-wm--mercadao" viewBox="0 0 168 34" height="30" aria-hidden="true">' +
    '<text x="0" y="24" fill="#2d3277" font-size="22" font-weight="900" font-family="Arial Black, Arial, sans-serif">MERCAD</text>' +
    '<text x="108" y="24" fill="#00a650" font-size="22" font-weight="900" font-family="Arial Black, Arial, sans-serif">ÃO</text>' +
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
    if (tab === 'market') {
      return '<span class="brand-wordmark brand-wordmark--mercadao">MERCAD<span class="bw-green">ÃO</span></span>';
    }
    return '';
  }

  function wordmarkHtml(tab) {
    if (tab === 'express') return WM_AIFOOD;
    if (tab === 'premium') return WM_AMAZOOM;
    if (tab === 'fashion') return WM_SHENIM;
    if (tab === 'market') return WM_MERCADAO;
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
      name: 'Mercadopamina',
      short: 'Mercado',
      suffix: 'pamina',
      logoMark: LOGO_MERCADOPAMINA,
      wordmark: WM_MERCADOPAMINA,
      color: '#FF6B4A',
      accent: '#00D4AA',
    },
    express: { name: 'AIFOOD', logoMark: LOGO_AIFOOD, color: '#ea1d2c' },
    market: { name: 'MERCADÃO', logoMark: LOGO_MERCADAO, color: '#fff159' },
    premium: { name: 'AMAZOOM', logoMark: LOGO_AMAZOOM, color: '#ff9900' },
    fashion: { name: 'SHENIM', logoMark: LOGO_SHENIM, color: '#ff2d6a' },
  };

  BRANDS.lockup = lockup;
  BRANDS.wordmark = wordmark;
  w.DOPAMINA_BRANDS = BRANDS;
})(window);
