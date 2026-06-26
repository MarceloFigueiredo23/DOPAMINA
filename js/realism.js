/** Camada de realismo — nomes, preços e textos de mercado BR */
(function (w) {
  'use strict';

  var SHOP_NAMES = {
    'Burger Dopamina': 'Burguer Lab · Moema',
    'Pizza Neurônio': 'Forno 88 Pizzaria',
    'Rei do Fake': 'Grill & Burger',
    'Frango Dopamina': 'Wing Street',
    'Tokyo Fake': 'Ramen House Shin',
    'Açaí do Paraíso': 'Açaí Concept',
    'Dog Mentiroso': 'Hot Dog Express',
    'Sushi Imaginário': 'Sushi Prime',
    'El Dopamina': 'Taco Libre',
    'Doce Ilusão': 'Dolce Forno',
    'Shake da Fé': 'Milk Bar',
    'Havai Fake': 'Poke House',
    'Nonna Dopamina': 'Cantina Nonna',
    'Crepe Paris': 'Crêperie Paris 6',
    'Grill Imaginário': 'Churrascaria Fogo Nobre',
    'Feira Fake': 'Pastel da Esquina',
    'Salgados do Zé': 'Empório do Salgado',
    'Brunch Fake': 'Brunch & Co',
    'Espeto Dourado': 'Espetinho do Zé',
    'Pasta Dopamina': 'Pasta Fresca',
    'Boba Fake': 'Bubble Mix',
    'Nordeste Fake': 'Sabor do Nordeste',
    'Donut Neurônio': 'Donuts Factory',
    'KFC Imaginário': 'Chicken Box',
    'Mineiro Fake': 'Café Mineiro',
    'Craft Burger': 'The Craft Burger',
    'Gelato Fake': 'Gelato Italiano',
    'China Fake': 'Wok Express',
    'Dopamina Tech': 'Amazon.com.br',
    'Game Fake': 'Amazon.com.br',
    'Eletro Dopamina': 'Amazon.com.br',
    'Vision Fake': 'Amazon.com.br',
    'Casa Inteligente': 'Amazon.com.br',
  };

  var FOOD_NAMES = {
    f01: 'X-Bacon Duplo 180g',
    f02: 'Pizza Grande 8 Queijos (35cm)',
    f03: 'Combo Whopper + Batata Média + Coca 500ml',
    f04: 'Bucket 12 Asas Picantes',
    f05: 'Ramen Tonkotsu Especial',
    f06: 'Açaí 700ml + Nutella + Banana',
    f07: 'Hot Dog Chicago Completo',
    f08: 'Combo Sushi — 50 peças',
    f09: 'Taco Box Família (4 pessoas)',
    f10: 'Brownie com Sorvete',
    f11: 'Milk-shake Oreo 500ml',
    f12: 'Poke Salmão Premium',
    f13: 'Lasanha Bolonhesa (serve 2)',
    f14: 'Crepe Nutella com Morango',
    f15: 'Misto de Carnes 800g + Acompanhamentos',
    f16: 'Caixa Pastel de Carne (6 un)',
    f17: 'Coxinha de Frango c/ Catupiry',
    f18: 'Waffle Belga + Frutas',
    f19: 'Espetinho Misto (5 espetos)',
    f20: 'Penne Quattro Formaggi',
    f21: 'Bubble Tea Taro 500ml',
    f22: 'Tapioca de Carne de Sol',
    f23: 'Box Donuts (6 unidades)',
    f24: 'Balde Frango Crocante (10 pcs)',
    f25: 'Pão de Queijo (20 unidades)',
    f26: 'Smash Burger Duplo',
    f27: 'Casquinha 2 Bolas',
    f28: 'Yakisoba de Carne (700g)',
    f29: 'Calzone de Calabresa',
    f30: 'Fatia Torta de Limão',
  };

  var FOOD_PRICES = {
    f01: 36.9, f02: 74.9, f03: 49.9, f04: 59.9, f05: 42.9, f06: 39.9, f07: 27.9,
    f08: 109.9, f09: 68.9, f10: 28.9, f11: 22.9, f12: 54.9, f13: 58.9, f14: 26.9,
    f15: 89.9, f16: 32.9, f17: 16.9, f18: 32.9, f19: 38.9, f20: 44.9, f21: 19.9,
    f22: 24.9, f23: 36.9, f24: 54.9, f25: 17.9, f26: 45.9, f27: 14.9, f28: 41.9,
    f29: 48.9, f30: 19.9,
  };

  var PREMIUM_PRICES = {
    p01: 11499, p02: 27999, p03: 4299, p04: 8499, p05: 8999, p06: 24999,
    p07: 6499, p08: 3999, p09: 3499, p10: 4299, p11: 9499, p12: 13999,
    p13: 42999, p14: 1699, p15: 799, p16: 4999, p17: 2299, p18: 17499,
    p19: 19999, p20: 3799, p21: 2499, p22: 11999, p23: 2999, p24: 3999,
    p25: 1999, p26: 7999, p27: 6299, p28: 6999, p29: 5499, p30: 5999,
  };

  var PREMIUM_OLD = {
    p01: 12999, p02: 31999, p03: 4999, p04: 9499, p05: 10499, p06: 28999,
    p07: 7299, p15: 999, p17: 2699,
  };

  function foodReview(name) {
    return [
      { user: 'Camila R.', stars: 5, text: name + ' chegou quentinho e bem embalado. Voltarei a pedir.', date: 'há 2 dias', verified: true },
      { user: 'Rafael M.', stars: 4, text: 'Sabor muito bom e porção justa. Entrega levou 5 min a mais que o previsto.', date: 'há 5 dias', verified: true },
      { user: 'Ana Paula', stars: 5, text: 'Um dos melhores pedidos que fiz pelo app. Recomendo.', date: 'há 1 semana', verified: true },
      { user: 'Bruno S.', stars: 2, text: 'Veio sem o molho extra que pedi. Comida estava boa, mas faltou atenção.', date: 'há 3 dias', verified: true },
      { user: 'Fernanda L.', stars: 3, text: 'Ok para o preço. Nada excepcional, mas resolve.', date: 'há 2 semanas', verified: false },
    ];
  }

  function productReview(name) {
    return [
      { user: 'Compra verificada', stars: 5, title: 'Excelente produto', text: name + ' chegou lacrado, dentro do prazo. Funcionando perfeitamente.', date: '18 jun 2026', helpful: 124 },
      { user: 'João V.', stars: 4, title: 'Bom custo-benefício', text: 'Atendeu expectativa. Embalagem da Amazon impecável.', date: '8 jun 2026', helpful: 56 },
      { user: 'Mariana K.', stars: 5, title: 'Recomendo', text: 'Entrega rápida com Prime. Produto original.', date: '1 jun 2026', helpful: 31 },
      { user: 'Carlos E.', stars: 3, title: 'Poderia ser melhor', text: 'Produto ok, mas achei o preço salgado mesmo em promoção.', date: '25 mai 2026', helpful: 12 },
    ];
  }

  function restaurantReview(name) {
    return [
      { user: 'Marcos T.', stars: 5, text: 'Comida sempre no ponto. ' + name + ' é minha opção fixa de fim de semana.', date: 'há 2 dias', verified: true },
      { user: 'Juliana S.', stars: 5, text: 'Embalagem segura e pedido completo. Entrega antes do horário.', date: 'há 4 dias', verified: true },
      { user: 'Pedro H.', stars: 4, text: 'Muito bom no geral. Só achei o frete um pouco caro em horário de pico.', date: 'há 1 semana', verified: true },
      { user: 'Luciana F.', stars: 2, text: 'Demorou quase 1h. Comida chegou morna.', date: 'há 3 dias', verified: true },
      { user: 'André M.', stars: 1, text: 'Veio item errado no pedido. Tive que pedir de novo.', date: 'há 6 dias', verified: true },
      { user: 'Patrícia N.', stars: 4, text: 'Qualidade consistente. Preço justo para a região.', date: 'há 2 semanas', verified: false },
    ];
  }

  function apply() {
    var cat = w.DOPAMINA_CATALOG;
    if (!cat) return;

    cat.express.forEach(function (p) {
      if (SHOP_NAMES[p.shop]) p.shop = SHOP_NAMES[p.shop];
      if (FOOD_NAMES[p.id]) p.name = FOOD_NAMES[p.id];
      if (FOOD_PRICES[p.id]) p.price = FOOD_PRICES[p.id];
      p.reviewList = foodReview(p.name);
      p.desc = p.desc.replace(/fake|mentira|imaginár|simulac|fictíc/gi, '').trim() ||
        'Preparado na hora com ingredientes selecionados. Entrega rápida na sua região.';
    });

    cat.premium.forEach(function (p) {
      if (SHOP_NAMES[p.shop]) p.shop = SHOP_NAMES[p.shop];
      if (PREMIUM_PRICES[p.id]) p.price = PREMIUM_PRICES[p.id];
      if (PREMIUM_OLD[p.id]) p.oldPrice = PREMIUM_OLD[p.id];
      p.reviewList = productReview(p.name);
      p.desc = p.desc.replace(/fake|mentira|imaginár|simulac|fictíc|sonhos/gi, '').trim() ||
        'Produto novo, lacrado de fábrica. Envio pela AMAZOOM com nota fiscal.';
    });

    (cat.fashion || []).forEach(function (p) {
      p.shop = 'SHENIM';
      p.reviewList = productReview(p.name);
      p.desc = p.desc.replace(/fake|mentira|imaginár|simulac|fictíc/gi, '').trim() ||
        'Peça com acabamento premium. Envio rápido para todo o Brasil.';
    });

    if (w.DOPAMINA_IFOOD && w.DOPAMINA_IFOOD.restaurants) {
      w.DOPAMINA_IFOOD.restaurants.forEach(function (r) {
        if (SHOP_NAMES[r.shop]) r.shop = SHOP_NAMES[r.shop];
        else {
          Object.keys(SHOP_NAMES).forEach(function (old) {
            if (r.shop === old) r.shop = SHOP_NAMES[old];
          });
        }
        r.reviewList = restaurantReview(r.shop);
      });
      if (cat.express.length) w.DOPAMINA_IFOOD.enrichExpressDishes(cat.express);
    }
  }

  apply();
  w.DOPAMINA_REALISM = { apply: apply, SERVICE_FEE: 0.99 };
})(window);
