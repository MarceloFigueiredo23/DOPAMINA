/** Dados AIFOOD — restaurantes reais, avaliações de mercado */
(function (w) {
  'use strict';

  function unsplash(photoId) {
    return 'https://images.unsplash.com/' + photoId + '?w=800&h=500&fit=crop&q=90&auto=format';
  }

  function thumb(photoId) {
    return 'https://images.unsplash.com/' + photoId + '?w=120&h=120&fit=crop&q=90&auto=format';
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
    { id: 'r-bk', shop: 'Burger King', category: 'lanches', cover: unsplash('photo-1571091718767-18b5b1457add'), logo: thumb('photo-1568901346375-23c9450c58cd'), rating: 4.6, reviews: 12400, delivery: '25–40 min', fee: 'Grátis', minOrder: 25, tags: ['Whopper', 'Combo'], badge: 'Super' },
    { id: 'r-mcd', shop: "McDonald's", category: 'lanches', cover: unsplash('photo-1550547660-945a6ffef978'), logo: thumb('photo-1553979459-d2229ba7433b'), rating: 4.5, reviews: 28900, delivery: '20–35 min', fee: 'Grátis', minOrder: 20, tags: ['Big Mac', 'McOferta'], badge: 'Super' },
    { id: 'r-kfc', shop: 'KFC', category: 'lanches', cover: unsplash('photo-1626645731055-7ade1d36b0f8'), logo: thumb('photo-1626082927389-6cd097cdc6ec'), rating: 4.5, reviews: 8900, delivery: '25–40 min', fee: 'Grátis', minOrder: 35, tags: ['Balde', 'Frango'], badge: 'Promo' },
    { id: 'r-craft', shop: 'The Craft Burger', category: 'lanches', cover: unsplash('photo-1586190848861-99aa4a171e90'), logo: thumb('photo-1586190848861-99aa4a171e90'), rating: 4.8, reviews: 1890, delivery: '30–45 min', fee: 'R$ 4,49', minOrder: 35, tags: ['Artesanal', 'Smash'], badge: null },
    { id: 'r-hotdog', shop: 'Hot Dog Paulista', category: 'lanches', cover: unsplash('photo-1612392062798-2aaede41fe5e'), logo: thumb('photo-1612392062798-2aaede41fe5e'), rating: 4.4, reviews: 2100, delivery: '20–30 min', fee: 'Grátis', minOrder: 20, tags: ['Hot dog', 'SP'], badge: null },
    { id: 'r-pizzahut', shop: 'Pizza Hut', category: 'pizza', cover: unsplash('photo-1513104890138-7c749659a591'), logo: thumb('photo-1565299624946-b28f40a0ae38'), rating: 4.6, reviews: 9800, delivery: '35–50 min', fee: 'R$ 5,99', minOrder: 40, tags: ['Pizza grande', 'Calzone'], badge: 'Super' },
    { id: 'r-ramen', shop: 'Ramen Kuma', category: 'japonesa', cover: unsplash('photo-1569718212165-3a8278d5f624'), logo: thumb('photo-1569718212165-3a8278d5f624'), rating: 4.8, reviews: 2340, delivery: '30–45 min', fee: 'Grátis', minOrder: 35, tags: ['Ramen', 'Tonkotsu'], badge: 'Super' },
    { id: 'r-sushi', shop: 'Sushi Prime', category: 'japonesa', cover: unsplash('photo-1579584425555-c3ce17fd4351'), logo: thumb('photo-1579584425555-c3ce17fd4351'), rating: 4.9, reviews: 4100, delivery: '40–55 min', fee: 'R$ 6,99', minOrder: 60, tags: ['Sushi', 'Combinado'], badge: 'Super' },
    { id: 'r-wok', shop: 'Wok Express', category: 'japonesa', cover: unsplash('photo-1612929633738-8fe44f7ec841'), logo: thumb('photo-1612929633738-8fe44f7ec841'), rating: 4.6, reviews: 1780, delivery: '30–45 min', fee: 'Grátis', minOrder: 35, tags: ['Yakisoba', 'Oriental'], badge: null },
    { id: 'r-acai', shop: 'Açaí Concept', category: 'doces', cover: unsplash('photo-1590301157890-4810ed352733'), logo: thumb('photo-1590301157890-4810ed352733'), rating: 4.8, reviews: 6200, delivery: '15–30 min', fee: 'Grátis', minOrder: 20, tags: ['Açaí', '700ml'], badge: 'Super' },
    { id: 'r-dolce', shop: 'Dolce Forno', category: 'doces', cover: unsplash('photo-1519915028121-7d3483d12235'), logo: thumb('photo-1519915028121-7d3483d12235'), rating: 4.7, reviews: 890, delivery: '15–25 min', fee: 'Grátis', minOrder: 18, tags: ['Torta', 'Sobremesa'], badge: null },
    { id: 'r-donut', shop: 'Donuts Factory', category: 'doces', cover: unsplash('photo-1551024506-0bccd28d83a2'), logo: thumb('photo-1551024506-0bccd28d83a2'), rating: 4.7, reviews: 1560, delivery: '20–30 min', fee: 'Grátis', minOrder: 25, tags: ['Donuts', 'Box 6'], badge: 'Promo' },
    { id: 'r-gelato', shop: 'Gelato Italiano', category: 'doces', cover: unsplash('photo-1501443767984-6bdaf0f04e38'), logo: thumb('photo-1501443767984-6bdaf0f04e38'), rating: 4.5, reviews: 980, delivery: '10–20 min', fee: 'Grátis', minOrder: 12, tags: ['Sorvete', 'Casquinha'], badge: null },
    { id: 'r-outback', shop: 'Outback', category: 'brasileira', cover: unsplash('photo-1555939594-58d7cb561ad1'), logo: thumb('photo-1606313564200-e75d5e30476c'), rating: 4.7, reviews: 5600, delivery: '45–60 min', fee: 'R$ 6,99', minOrder: 50, tags: ['Picanha', 'Brownie'], badge: 'Super' },
    { id: 'r-espeto', shop: 'Espetinho do Zé', category: 'brasileira', cover: unsplash('photo-1529042410759-befb1204b368'), logo: thumb('photo-1529042410759-befb1204b368'), rating: 4.6, reviews: 1120, delivery: '25–40 min', fee: 'R$ 3,49', minOrder: 30, tags: ['Espetinho', 'Boteco'], badge: null },
    { id: 'r-nordeste', shop: 'Sabor do Nordeste', category: 'brasileira', cover: unsplash('photo-1606491956689-2ea866880f44'), logo: thumb('photo-1606491956689-2ea866880f44'), rating: 4.7, reviews: 1340, delivery: '20–35 min', fee: 'Grátis', minOrder: 22, tags: ['Tapioca', 'Regional'], badge: null },
    { id: 'r-pastel', shop: 'Pastel da Esquina', category: 'brasileira', cover: unsplash('photo-1626700051175-6818013e1d4f'), logo: thumb('photo-1626700051175-6818013e1d4f'), rating: 4.6, reviews: 2100, delivery: '20–35 min', fee: 'Grátis', minOrder: 25, tags: ['Pastel', 'Frito'], badge: 'Promo' },
    { id: 'r-salgado', shop: 'Empório do Salgado', category: 'brasileira', cover: unsplash('photo-1619228183490-0c4d5c9a4f32'), logo: thumb('photo-1619228183490-0c4d5c9a4f32'), rating: 4.8, reviews: 8900, delivery: '15–25 min', fee: 'Grátis', minOrder: 15, tags: ['Coxinha', 'Salgados'], badge: 'Super' },
    { id: 'r-mineiro', shop: 'Café Mineiro', category: 'brasileira', cover: unsplash('photo-1608198393988-8bb7e09312f3'), logo: thumb('photo-1608198393988-8bb7e09312f3'), rating: 4.9, reviews: 4500, delivery: '15–25 min', fee: 'Grátis', minOrder: 15, tags: ['Pão de queijo'], badge: 'Super' },
    { id: 'r-nonna', shop: 'Cantina Nonna', category: 'italiana', cover: unsplash('photo-1574894709920-11b28e736d22'), logo: thumb('photo-1574894709920-11b28e736d22'), rating: 4.7, reviews: 2450, delivery: '35–50 min', fee: 'Grátis', minOrder: 45, tags: ['Lasanha', 'Italiano'], badge: null },
    { id: 'r-pasta', shop: 'Pasta Fresca', category: 'italiana', cover: unsplash('photo-1621996346565-e3dbc646d9a9'), logo: thumb('photo-1621996346565-e3dbc646d9a9'), rating: 4.7, reviews: 1670, delivery: '30–45 min', fee: 'Grátis', minOrder: 38, tags: ['Massa', '4 queijos'], badge: null },
    { id: 'r-taco', shop: 'Taco Libre', category: 'mexicana', cover: unsplash('photo-1565299585323-38d6b0865b47'), logo: thumb('photo-1565299585323-38d6b0865b47'), rating: 4.6, reviews: 1560, delivery: '30–45 min', fee: 'Grátis', minOrder: 50, tags: ['Tacos', 'Box'], badge: 'Promo' },
    { id: 'r-poke', shop: 'Poke House', category: 'saudavel', cover: unsplash('photo-1546069901-ba9599a7e63c'), logo: thumb('photo-1546069901-ba9599a7e63c'), rating: 4.7, reviews: 1890, delivery: '25–40 min', fee: 'R$ 3,99', minOrder: 40, tags: ['Poke', 'Salmão'], badge: null },
    { id: 'r-crepe', shop: 'Crêperie Paris 6', category: 'cafe', cover: unsplash('photo-1519676867240-f03562e64548'), logo: thumb('photo-1519676867240-f03562e64548'), rating: 4.5, reviews: 780, delivery: '20–30 min', fee: 'Grátis', minOrder: 22, tags: ['Crepe', 'Nutella'], badge: null },
    { id: 'r-brunch', shop: 'Brunch & Co', category: 'cafe', cover: unsplash('photo-1562376552-9d60a4b0920f'), logo: thumb('photo-1562376552-9d60a4b0920f'), rating: 4.5, reviews: 650, delivery: '20–30 min', fee: 'Grátis', minOrder: 28, tags: ['Waffle', 'Brunch'], badge: null },
    { id: 'r-starbucks', shop: 'Starbucks', category: 'bebidas', cover: unsplash('photo-1495474472287-4d776bffd1e5'), logo: thumb('photo-1572497013410-f58864f3b28a'), rating: 4.5, reviews: 8900, delivery: '20–35 min', fee: 'Grátis', minOrder: 20, tags: ['Frappuccino', 'Café'], badge: 'Super' },
    { id: 'r-bubble', shop: 'Bubble Mix', category: 'bebidas', cover: unsplash('photo-1525385133511-4adfa8a3ff9a'), logo: thumb('photo-1525385133511-4adfa8a3ff9a'), rating: 4.4, reviews: 920, delivery: '15–25 min', fee: 'Grátis', minOrder: 18, tags: ['Bubble tea', 'Taro'], badge: 'Novo' },
  ];

  restaurants.forEach(function (r) {
    r.reviewList = restaurantReviews(r.shop);
  });

  var shopToRestaurant = {};
  restaurants.forEach(function (r) {
    shopToRestaurant[r.shop] = r.id;
  });

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
