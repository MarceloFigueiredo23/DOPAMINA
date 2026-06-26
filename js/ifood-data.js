/** Dados AIFOOD — restaurantes e marcas reais, logos oficiais (Wikimedia) */
(function (w) {
  'use strict';

  function unsplash(photoId) {
    return 'https://images.unsplash.com/' + photoId + '?w=800&h=500&fit=crop&q=90&auto=format';
  }

  function wikiThumb(path, width) {
    var file = path.split('/').pop();
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + path + '/' + width + 'px-' + file;
  }

  function brandLogo(path, width) {
    var file = path.split('/').pop();
    if (file.indexOf('.svg') >= 0) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + path + '/' + width + 'px-' + file + '.png';
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + path + '/' + width + 'px-' + file;
  }

  function restaurantReviews(name) {
    return [
      { user: 'Marcos T.', stars: 5, text: name + ' é minha opção fixa de fim de semana. Qualidade consistente.', date: 'há 2 dias', verified: true },
      { user: 'Juliana S.', stars: 5, text: 'Embalagem segura e pedido completo. Chegou antes do horário previsto.', date: 'há 4 dias', verified: true },
      { user: 'Pedro H.', stars: 4, text: 'Muito bom no geral. Frete um pouco caro em horário de pico.', date: 'há 1 semana', verified: true },
      { user: 'Luciana F.', stars: 3, text: 'Demorou quase 1h no sábado. Comida chegou morna.', date: 'há 3 dias', verified: true },
      { user: 'André M.', stars: 2, text: 'Veio item errado no pedido. Resolveram com crédito no app.', date: 'há 6 dias', verified: true },
      { user: 'Patrícia N.', stars: 4, text: 'Preço justo para a região. Porções honestas.', date: 'há 2 semanas', verified: false },
    ];
  }

  var categories = [
    { id: 'all', label: 'Início', icon: '🏠' },
    { id: 'lanches', label: 'Lanches', icon: '🍔' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'japonesa', label: 'Japonesa', icon: '🍣' },
    { id: 'brasileira', label: 'Brasileira', icon: '🥩' },
    { id: 'doces', label: 'Doces', icon: '🍰' },
    { id: 'italiana', label: 'Italiana', icon: '🍝' },
    { id: 'mexicana', label: 'Mexicana', icon: '🌮' },
    { id: 'saudavel', label: 'Saudável', icon: '🥗' },
    { id: 'bebidas', label: 'Bebidas', icon: '🧋' },
    { id: 'cafe', label: 'Café', icon: '☕' },
  ];

  var restaurants = [
    { id: 'r-bk', shop: 'Burger King', category: 'lanches', cover: wikiThumb('8/85/Burger_King_Whopper.jpg', 800), logo: brandLogo('5/5a/Burger_King_2020.svg', 120), rating: 4.6, reviews: 12400, delivery: '25–40 min', fee: 'Grátis', minOrder: 25, tags: ['Whopper', 'Combo'], badge: 'Super' },
    { id: 'r-mcd', shop: "McDonald's", category: 'lanches', cover: wikiThumb('4/4f/McDonald%27s_Big_Mac_hamburger.jpg', 800), logo: brandLogo('c/ce/McDonald%27s_logo.svg', 120), rating: 4.5, reviews: 28900, delivery: '20–35 min', fee: 'Grátis', minOrder: 20, tags: ['Big Mac', 'McOferta'], badge: 'Super' },
    { id: 'r-kfc', shop: 'KFC', category: 'lanches', cover: wikiThumb('2/2e/KFC_Original_Recipe_fried_chicken.jpg', 800), logo: brandLogo('8/82/KFC_logo.svg', 120), rating: 4.5, reviews: 8900, delivery: '25–40 min', fee: 'Grátis', minOrder: 35, tags: ['Balde', 'Frango'], badge: 'Promo' },
    { id: 'r-subway', shop: 'Subway', category: 'lanches', cover: wikiThumb('5/57/Subway_sandwich.jpg', 800), logo: brandLogo('6/6f/Subway_2016_logo.svg', 120), rating: 4.5, reviews: 6780, delivery: '20–35 min', fee: 'Grátis', minOrder: 25, tags: ['Sub 30cm', 'Sanduíche'], badge: null },
    { id: 'r-bobs', shop: "Bob's", category: 'lanches', cover: wikiThumb('6/6e/Bobs_hamburger.jpg', 800), logo: brandLogo('4/4a/Bob%27s_logo.svg', 120), rating: 4.4, reviews: 9200, delivery: '25–40 min', fee: 'Grátis', minOrder: 25, tags: ['Duplo', 'Combo'], badge: null },
    { id: 'r-craft', shop: 'The Craft Burger', category: 'lanches', cover: wikiThumb('6/6d/Cheeseburger.jpg', 800), logo: brandLogo('6/6d/Cheeseburger.jpg', 120), rating: 4.8, reviews: 1890, delivery: '30–45 min', fee: 'R$ 4,49', minOrder: 35, tags: ['Artesanal', 'Smash'], badge: null },
    { id: 'r-hotdog', shop: 'Hot Dog Paulista', category: 'lanches', cover: wikiThumb('4/4c/Hot_dog_with_mustard.jpg', 800), logo: brandLogo('4/4c/Hot_dog_with_mustard.jpg', 120), rating: 4.4, reviews: 2100, delivery: '20–30 min', fee: 'Grátis', minOrder: 20, tags: ['Hot dog', 'SP'], badge: null },
    { id: 'r-pizzahut', shop: 'Pizza Hut', category: 'pizza', cover: wikiThumb('a/a3/Pizza_Hut_Pizza.jpg', 800), logo: brandLogo('7/73/Pizza_Hut_international_logo_2014.svg', 120), rating: 4.6, reviews: 9800, delivery: '35–50 min', fee: 'R$ 5,99', minOrder: 40, tags: ['Pizza grande', 'Calzone'], badge: 'Super' },
    { id: 'r-dominos', shop: "Domino's Pizza", category: 'pizza', cover: wikiThumb('a/a3/Pizza_Hut_Pizza.jpg', 800), logo: brandLogo('7/7a/Domino%27s_pizza_logo.svg', 120), rating: 4.6, reviews: 8900, delivery: '30–45 min', fee: 'R$ 4,99', minOrder: 35, tags: ['Pepperoni', 'Borda'], badge: 'Promo' },
    { id: 'r-habibs', shop: "Habib's", category: 'brasileira', cover: wikiThumb('4/4e/Esfiha.jpg', 800), logo: brandLogo('5/5e/Habib%27s_logo.svg', 120), rating: 4.4, reviews: 15600, delivery: '25–40 min', fee: 'Grátis', minOrder: 20, tags: ['Esfiha', 'Árabe'], badge: 'Super' },
    { id: 'r-giraffas', shop: 'Giraffas', category: 'brasileira', cover: wikiThumb('3/3f/Plated_steak_with_rice_and_beans.jpg', 800), logo: brandLogo('8/8a/Giraffas_logo.svg', 120), rating: 4.5, reviews: 5600, delivery: '30–45 min', fee: 'Grátis', minOrder: 30, tags: ['Executivo', 'Picanha'], badge: null },
    { id: 'r-ramen', shop: 'Ramen Kuma', category: 'japonesa', cover: wikiThumb('9/94/Ramen_Tonkotsu.jpg', 800), logo: brandLogo('9/94/Ramen_Tonkotsu.jpg', 120), rating: 4.8, reviews: 2340, delivery: '30–45 min', fee: 'Grátis', minOrder: 35, tags: ['Ramen', 'Tonkotsu'], badge: 'Super' },
    { id: 'r-sushi', shop: 'Sushi Prime', category: 'japonesa', cover: wikiThumb('6/60/Sushi_platter.jpg', 800), logo: brandLogo('6/60/Sushi_platter.jpg', 120), rating: 4.9, reviews: 4100, delivery: '40–55 min', fee: 'R$ 6,99', minOrder: 60, tags: ['Sushi', 'Combinado'], badge: 'Super' },
    { id: 'r-wok', shop: 'Wok Express', category: 'japonesa', cover: wikiThumb('0/0a/Yakisoba.jpg', 800), logo: brandLogo('0/0a/Yakisoba.jpg', 120), rating: 4.6, reviews: 1780, delivery: '30–45 min', fee: 'Grátis', minOrder: 35, tags: ['Yakisoba', 'Oriental'], badge: null },
    { id: 'r-acai', shop: 'Açaí Concept', category: 'doces', cover: wikiThumb('7/7a/Acai_bowl_with_fruit.jpg', 800), logo: brandLogo('7/7a/Acai_bowl_with_fruit.jpg', 120), rating: 4.8, reviews: 6200, delivery: '15–30 min', fee: 'Grátis', minOrder: 20, tags: ['Açaí', '700ml'], badge: 'Super' },
    { id: 'r-donut', shop: 'Donuts Factory', category: 'doces', cover: wikiThumb('3/31/Doughnuts_in_a_box.jpg', 800), logo: brandLogo('3/31/Doughnuts_in_a_box.jpg', 120), rating: 4.7, reviews: 1560, delivery: '20–30 min', fee: 'Grátis', minOrder: 25, tags: ['Donuts', 'Box 6'], badge: 'Promo' },
    { id: 'r-gelato', shop: 'Gelato Italiano', category: 'doces', cover: wikiThumb('2/2e/Ice_cream_cone.jpg', 800), logo: brandLogo('2/2e/Ice_cream_cone.jpg', 120), rating: 4.5, reviews: 980, delivery: '10–20 min', fee: 'Grátis', minOrder: 12, tags: ['Sorvete', 'Casquinha'], badge: null },
    { id: 'r-outback', shop: 'Outback', category: 'brasileira', cover: wikiThumb('4/4f/Picanha_na_chapa.jpg', 800), logo: brandLogo('5/5e/Outback_Steakhouse_Logo.svg', 120), rating: 4.7, reviews: 5600, delivery: '45–60 min', fee: 'R$ 6,99', minOrder: 50, tags: ['Picanha', 'Brownie'], badge: 'Super' },
    { id: 'r-espeto', shop: 'Espetinho do Zé', category: 'brasileira', cover: wikiThumb('9/9e/Kebab_skewers.jpg', 800), logo: brandLogo('9/9e/Kebab_skewers.jpg', 120), rating: 4.6, reviews: 1120, delivery: '25–40 min', fee: 'R$ 3,49', minOrder: 30, tags: ['Espetinho', 'Boteco'], badge: null },
    { id: 'r-pastel', shop: 'Pastel da Esquina', category: 'brasileira', cover: wikiThumb('9/9a/Pastel_brasileiro.jpg', 800), logo: brandLogo('9/9a/Pastel_brasileiro.jpg', 120), rating: 4.6, reviews: 2100, delivery: '20–35 min', fee: 'Grátis', minOrder: 25, tags: ['Pastel', 'Frito'], badge: 'Promo' },
    { id: 'r-salgado', shop: 'Empório do Salgado', category: 'brasileira', cover: wikiThumb('8/8a/Coxinha_Brasil.jpg', 800), logo: brandLogo('8/8a/Coxinha_Brasil.jpg', 120), rating: 4.8, reviews: 8900, delivery: '15–25 min', fee: 'Grátis', minOrder: 15, tags: ['Coxinha', 'Salgados'], badge: 'Super' },
    { id: 'r-mineiro', shop: 'Café Mineiro', category: 'brasileira', cover: wikiThumb('6/6b/Pao_de_queijo.jpg', 800), logo: brandLogo('6/6b/Pao_de_queijo.jpg', 120), rating: 4.9, reviews: 4500, delivery: '15–25 min', fee: 'Grátis', minOrder: 15, tags: ['Pão de queijo'], badge: 'Super' },
    { id: 'r-nonna', shop: 'Cantina Nonna', category: 'italiana', cover: wikiThumb('b/ba/Lasagna_-_Freshly_baked.jpg', 800), logo: brandLogo('b/ba/Lasagna_-_Freshly_baked.jpg', 120), rating: 4.7, reviews: 2450, delivery: '35–50 min', fee: 'Grátis', minOrder: 45, tags: ['Lasanha', 'Italiano'], badge: null },
    { id: 'r-pasta', shop: 'Pasta Fresca', category: 'italiana', cover: wikiThumb('9/91/Penne_quattro_formaggi.jpg', 800), logo: brandLogo('9/91/Penne_quattro_formaggi.jpg', 120), rating: 4.7, reviews: 1670, delivery: '30–45 min', fee: 'Grátis', minOrder: 38, tags: ['Massa', '4 queijos'], badge: null },
    { id: 'r-taco', shop: 'Taco Libre', category: 'mexicana', cover: wikiThumb('7/73/Tacos_de_carne_asada.jpg', 800), logo: brandLogo('7/73/Tacos_de_carne_asada.jpg', 120), rating: 4.6, reviews: 1560, delivery: '30–45 min', fee: 'Grátis', minOrder: 50, tags: ['Tacos', 'Box'], badge: 'Promo' },
    { id: 'r-poke', shop: 'Poke House', category: 'saudavel', cover: wikiThumb('4/4e/Poke_bowl.jpg', 800), logo: brandLogo('4/4e/Poke_bowl.jpg', 120), rating: 4.7, reviews: 1890, delivery: '25–40 min', fee: 'R$ 3,99', minOrder: 40, tags: ['Poke', 'Salmão'], badge: null },
    { id: 'r-crepe', shop: 'Crêperie Paris 6', category: 'cafe', cover: wikiThumb('1/1a/Crepes_with_Nutella_and_strawberries.jpg', 800), logo: brandLogo('1/1a/Crepes_with_Nutella_and_strawberries.jpg', 120), rating: 4.5, reviews: 780, delivery: '20–30 min', fee: 'Grátis', minOrder: 22, tags: ['Crepe', 'Nutella'], badge: null },
    { id: 'r-brunch', shop: 'Brunch & Co', category: 'cafe', cover: wikiThumb('3/3a/Waffles_with_strawberries.jpg', 800), logo: brandLogo('3/3a/Waffles_with_strawberries.jpg', 120), rating: 4.5, reviews: 650, delivery: '20–30 min', fee: 'Grátis', minOrder: 28, tags: ['Waffle', 'Brunch'], badge: null },
    { id: 'r-starbucks', shop: 'Starbucks', category: 'bebidas', cover: wikiThumb('5/5e/Frappuccino.jpg', 800), logo: brandLogo('d/d3/Starbucks_Corporation_Logo_2011.svg', 120), rating: 4.5, reviews: 8900, delivery: '20–35 min', fee: 'Grátis', minOrder: 20, tags: ['Frappuccino', 'Café'], badge: 'Super' },
    { id: 'r-bubble', shop: 'Bubble Mix', category: 'bebidas', cover: wikiThumb('9/9f/Bubble_tea_taro.jpg', 800), logo: brandLogo('9/9f/Bubble_tea_taro.jpg', 120), rating: 4.4, reviews: 920, delivery: '15–25 min', fee: 'Grátis', minOrder: 18, tags: ['Bubble tea', 'Taro'], badge: 'Novo' },
  ];

  restaurants.forEach(function (r) {
    r.reviewList = restaurantReviews(r.shop);
  });

  var shopToRestaurant = {
    'Burger King': 'r-bk',
    "McDonald's": 'r-mcd',
    'KFC': 'r-kfc',
    'Subway': 'r-subway',
    "Bob's": 'r-bobs',
    'The Craft Burger': 'r-craft',
    'Hot Dog Paulista': 'r-hotdog',
    'Pizza Hut': 'r-pizzahut',
    "Domino's Pizza": 'r-dominos',
    "Habib's": 'r-habibs',
    'Giraffas': 'r-giraffas',
    'Ramen Kuma': 'r-ramen',
    'Sushi Prime': 'r-sushi',
    'Wok Express': 'r-wok',
    'Açaí Concept': 'r-acai',
    'Donuts Factory': 'r-donut',
    'Gelato Italiano': 'r-gelato',
    'Outback': 'r-outback',
    'Espetinho do Zé': 'r-espeto',
    'Pastel da Esquina': 'r-pastel',
    'Empório do Salgado': 'r-salgado',
    'Café Mineiro': 'r-mineiro',
    'Cantina Nonna': 'r-nonna',
    'Pasta Fresca': 'r-pasta',
    'Taco Libre': 'r-taco',
    'Poke House': 'r-poke',
    'Crêperie Paris 6': 'r-crepe',
    'Brunch & Co': 'r-brunch',
    'Starbucks': 'r-starbucks',
    'Bubble Mix': 'r-bubble',
  };

  function enrichExpressDishes(dishes) {
    dishes.forEach(function (d) {
      d.restaurantId = shopToRestaurant[d.shop] || 'r-bk';
      var rest = restaurants.find(function (r) { return r.id === d.restaurantId; });
      d.category = rest ? rest.category : 'lanches';
    });
    return dishes;
  }

  function getRestaurant(id) {
    return restaurants.find(function (r) { return r.id === id; });
  }

  function getRestaurants(categoryId, search) {
    var list = restaurants.slice();
    if (categoryId && categoryId !== 'all') {
      list = list.filter(function (r) { return r.category === categoryId; });
    }
    if (search) {
      var q = search.toLowerCase();
      list = list.filter(function (r) {
        return r.shop.toLowerCase().indexOf(q) >= 0 ||
          r.tags.some(function (t) { return t.toLowerCase().indexOf(q) >= 0; });
      });
    }
    return list;
  }

  function getDishesByRestaurant(restaurantId, allDishes) {
    return allDishes.filter(function (d) { return d.restaurantId === restaurantId; });
  }

  w.DOPAMINA_IFOOD = {
    categories: categories,
    restaurants: restaurants,
    shopToRestaurant: shopToRestaurant,
    enrichExpressDishes: enrichExpressDishes,
    getRestaurant: getRestaurant,
    getRestaurants: getRestaurants,
    getDishesByRestaurant: getDishesByRestaurant,
  };

  if (w.DOPAMINA_CATALOG && w.DOPAMINA_CATALOG.express) {
    enrichExpressDishes(w.DOPAMINA_CATALOG.express);
  }
})(window);
