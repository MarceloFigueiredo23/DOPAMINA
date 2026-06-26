/** Realismo — taxa de serviço e reforço de avaliações */
(function (w) {
  'use strict';

  function apply() {
    var cat = w.DOPAMINA_CATALOG;
    if (!cat) return;

    if (w.DOPAMINA_IFOOD && w.DOPAMINA_IFOOD.enrichExpressDishes && cat.express.length) {
      w.DOPAMINA_IFOOD.enrichExpressDishes(cat.express);
    }
  }

  apply();
  w.DOPAMINA_REALISM = { apply: apply, SERVICE_FEE: 0.99 };
})(window);
