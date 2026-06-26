/**
 * Mercadopamina — logo completa em alta resolução
 */
(function (w) {
  'use strict';

  var V = '31';

  var LOGO_LOCKUP =
    '<img class="brand-logo-full" ' +
    'src="img/mercadopamina-logo.png?v=' + V + '" ' +
    'srcset="img/mercadopamina-logo.png?v=' + V + ' 1x, img/mercadopamina-logo@2x.png?v=' + V + ' 2x" ' +
    'width="180" height="129" alt="Mercadopamina" decoding="async" fetchpriority="high">';

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
