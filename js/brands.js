/**
 * Mercadopamina — logo PNG (duende + wordmark integrado)
 */
(function (w) {
  'use strict';

  var LOGO_MERCADOPAMINA =
    '<img class="brand-logo-img" src="img/mercadopamina-logo.png" ' +
    'srcset="img/mercadopamina-logo.png 1x" ' +
    'width="180" height="120" alt="Mercadopamina" decoding="async" fetchpriority="high">';

  var WM_MERCADOPAMINA = '';

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
