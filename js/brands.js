/**
 * Mercadopamina — marca única (carrinho feliz + wordmark alegre)
 */
(function (w) {
  'use strict';

  var LOGO_MERCADOPAMINA =
    '<svg class="brand-mark brand-mark--mercadopamina" viewBox="0 0 56 56" width="56" height="56" aria-hidden="true">' +
    '<circle cx="28" cy="28" r="27" fill="#FFF8E1" stroke="#FFC107" stroke-width="2"/>' +
    '<path d="M12 26 V16 Q28 8 44 16 V26" fill="none" stroke="#F9A825" stroke-width="3" stroke-linecap="round"/>' +
    '<rect x="11" y="26" width="34" height="20" rx="9" fill="#FFD54F" stroke="#F9A825" stroke-width="2"/>' +
    '<circle cx="21" cy="35" r="2.8" fill="#4E342E"/>' +
    '<circle cx="35" cy="35" r="2.8" fill="#4E342E"/>' +
    '<path d="M21 40 Q28 46 35 40" fill="none" stroke="#4E342E" stroke-width="2.5" stroke-linecap="round"/>' +
    '<ellipse cx="16" cy="38" rx="3.5" ry="2" fill="#FFAB91" opacity="0.65"/>' +
    '<ellipse cx="40" cy="38" rx="3.5" ry="2" fill="#FFAB91" opacity="0.65"/>' +
    '<circle cx="17" cy="48" r="4" fill="#5D4037"/><circle cx="39" cy="48" r="4" fill="#5D4037"/>' +
    '<path d="M42 12 Q46 10 48 14" stroke="#F9A825" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/>' +
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
