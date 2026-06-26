/**
 * Mercadopamina — duende HD + nome em fonte (nítido)
 */
(function (w) {
  'use strict';

  var V = '32';

  var WORDMARK =
    '<span class="mp-wordmark" aria-hidden="true">' +
    '<span class="mp-wm-full">Mercado<span class="mp-wm-highlight">pamina</span></span>' +
    '</span>';

  var LOGO_MARK =
    '<img class="brand-logo-mark" src="img/mercadopamina-gnome.png?v=' + V + '" ' +
    'srcset="img/mercadopamina-gnome.png?v=' + V + ' 1x, img/mercadopamina-gnome@2x.png?v=' + V + ' 2x" ' +
    'width="63" height="48" alt="" decoding="async" fetchpriority="high">';

  var LOGO_LOCKUP = LOGO_MARK + WORDMARK;

  var BRANDS = {
    site: {
      name: 'Mercadopamina',
      logoMark: LOGO_LOCKUP,
      wordmark: WORDMARK,
      color: '#FFC107',
    },
    lockup: function () { return LOGO_LOCKUP; },
    wordmark: function () { return WORDMARK; },
  };

  w.DOPAMINA_BRANDS = BRANDS;
})(window);
