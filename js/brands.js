/**
 * Mercadopamina — duende + wordmark horizontal no header
 */
(function (w) {
  'use strict';

  var LOGO_MARK =
    '<img class="brand-logo-mark" src="img/mercadopamina-gnome.png" ' +
    'width="52" height="48" alt="" decoding="async" fetchpriority="high">';

  var WM_MERCADOPAMINA =
    '<span class="mp-wordmark" aria-label="Mercadopamina">' +
    '<span class="mp-wm-full">Mercado<span class="mp-wm-highlight">pamina</span></span>' +
    '</span>';

  var BRANDS = {
    site: {
      name: 'Mercadopamina',
      logoMark: LOGO_MARK,
      wordmark: WM_MERCADOPAMINA,
      color: '#FFC107',
    },
    lockup: function () { return LOGO_MARK + WM_MERCADOPAMINA; },
    wordmark: function () { return WM_MERCADOPAMINA; },
  };

  w.DOPAMINA_BRANDS = BRANDS;
})(window);
