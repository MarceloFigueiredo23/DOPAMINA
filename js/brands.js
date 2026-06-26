/**
 * Mercadopamina — duende amarelo sorridente + wordmark
 */
(function (w) {
  'use strict';

  var LOGO_MERCADOPAMINA =
    '<svg class="brand-mark brand-mark--mercadopamina" viewBox="0 0 56 56" width="56" height="56" aria-hidden="true">' +
    '<circle cx="28" cy="28" r="27" fill="#FFFDE7" stroke="#FFC107" stroke-width="2"/>' +
    /* chapéu de duende */ +
    '<path d="M14 24 L28 6 L42 24 Z" fill="#FFD54F" stroke="#F9A825" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<circle cx="28" cy="8" r="3" fill="#FFF8E1" opacity="0.9"/>' +
    /* rosto */ +
    '<circle cx="28" cy="32" r="14" fill="#FFE082" stroke="#F9A825" stroke-width="1.5"/>' +
  /* bochechas */ +
    '<ellipse cx="19" cy="35" rx="4" ry="2.5" fill="#FFAB91" opacity="0.55"/>' +
    '<ellipse cx="37" cy="35" rx="4" ry="2.5" fill="#FFAB91" opacity="0.55"/>' +
    /* olhos felizes */ +
    '<path d="M22 30 Q24 28 26 30" stroke="#4E342E" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M30 30 Q32 28 34 30" stroke="#4E342E" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
    /* sorriso largo */ +
    '<path d="M20 36 Q28 44 36 36" stroke="#4E342E" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    /* mini sacola */ +
    '<rect x="38" y="38" width="10" height="9" rx="2" fill="#FFC107" stroke="#F9A825" stroke-width="1.2"/>' +
    '<path d="M40 38 V35 Q43 33 46 35 V38" fill="none" stroke="#F9A825" stroke-width="1.2"/>' +
    '<circle cx="41" cy="46" r="1.2" fill="#5D4037"/><circle cx="45" cy="46" r="1.2" fill="#5D4037"/>' +
    '</svg>';

  var WM_MERCADOPAMINA =
    '<span class="mp-wordmark" aria-label="Mercadopamina">' +
    '<span class="mp-wm-full">Mercado<span class="mp-wm-highlight">pamina</span></span>' +
    '</span>';

  var BRANDS = {
    site: {
      name: 'Mercadopamina',
      logoMark: LOGO_MERCADOPAMINA,
      wordmark: WM_MERCADOPAMINA,
      color: '#FFC107',
    },
    lockup: function () { return ''; },
    wordmark: function () { return WM_MERCADOPAMINA; },
  };

  w.DOPAMINA_BRANDS = BRANDS;
})(window);
