/**
 * Mercadopamina — duende + wordmark horizontal no header
 */
(function (w) {
  'use strict';

  var LOGO_LOCKUP =
    '<img class="brand-logo-mark" src="img/mercadopamina-gnome.png?v=26" ' +
    'width="40" height="40" alt="" decoding="async" fetchpriority="high">' +
    '<span class="mp-wordmark" aria-hidden="true">' +
    '<span class="mp-wm-full">Mercado<span class="mp-wm-highlight">pamina</span></span>' +
    '</span>';

  var BRANDS = {
    site: {
      name: 'Mercadopamina',
      logoMark: LOGO_LOCKUP,
      wordmark: '',
      color: '#FFC107',
    },
    lockup: function () { return LOGO_LOCKUP; },
    wordmark: function () { return ''; },
  };

  w.DOPAMINA_BRANDS = BRANDS;
})(window);
