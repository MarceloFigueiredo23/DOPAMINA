/** Dados iFood — categorias, restaurantes, avaliações por loja */
(function (w) {
  'use strict';

  function img(id) {
    return 'https://images.unsplash.com/' + id + '?w=800&h=500&fit=crop&q=85&auto=format';
  }
  function thumb(id) {
    return 'https://images.unsplash.com/' + id + '?w=120&h=120&fit=crop&q=85&auto=format';
  }

  function restaurantReviews(name, vibe) {
    var good = [
      { user: 'Marcos T.', stars: 5, text: name + ' é tipo terapia, só que com fome e sem cobrança no cartão.', date: 'há 2 dias', verified: true },
      { user: 'Juliana S.', stars: 5, text: 'Pedido fake, satisfação real. Meu cérebro agradeceu em ' + vibe + '.', date: 'há 4 dias', verified: true },
      { user: 'Pedro "Ratão"', stars: 4, text: 'Quase perfeito. Faltou só a comida de verdade, mas aí eu falava.', date: 'há 1 semana', verified: true },
    ];
    var bad = [
      { user: 'Karen Delivery', stars: 2, text: 'Demorou 38 min NA MINHA CABEÇA. iFood imaginário devia ter SLA.', date: 'há 3 dias', verified: true },
      { user: 'Ex-namorado', stars: 1, text: 'Pedi sem cebola. Veio com cebola nos meus pensamentos intrusivos.', date: 'há 5 dias', verified: false },
      { user: 'Contador', stars: 3, text: 'Comida ótima, mas não emitiu nota fiscal da simulação. Desconfiei.', date: 'há 2 semanas', verified: true },
      { user: 'Mãe', stars: 4, text: 'Gostei, mas "isso não é jantar, isso é capricho digital". Ela não entende arte.', date: 'há 1 semana', verified: false },
    ];
    return good.concat(bad);
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
    { id: 'r-burger', shop: 'Burger Dopamina', category: 'lanches', cover: img('photo-1571091718767-18b5b1457add'), logo: thumb('photo-1568901346375-23c9450c58cd'), rating: 4.8, reviews: 3240, delivery: '20–35 min', fee: 'Grátis', minOrder: 25, tags: ['Burger artesanal', 'Promoção'], badge: 'Super', vibe: 'burger suculento' },
    { id: 'r-craft', shop: 'Craft Burger', category: 'lanches', cover: img('photo-1550547660-945a6ffef978'), logo: thumb('photo-1586190848861-99aa4a171e90'), rating: 4.7, reviews: 1890, delivery: '30–45 min', fee: 'R$ 4,49', minOrder: 35, tags: ['Gourmet', 'Duplo blend'], badge: null, vibe: 'hambúrguer premium' },
    { id: 'r-rei', shop: 'Rei do Fake', category: 'lanches', cover: img('photo-1553979459-d2229ba7433b'), logo: thumb('photo-1553979459-d2229ba7433b'), rating: 4.6, reviews: 2100, delivery: '20–35 min', fee: 'Grátis', minOrder: 30, tags: ['Combo', 'Fast food'], badge: 'Promo', vibe: 'combo clássico' },
    { id: 'r-dog', shop: 'Dog Mentiroso', category: 'lanches', cover: img('photo-1612392062798-2aaede41fe5e'), logo: thumb('photo-1612392062798-2aaede41fe5e'), rating: 4.5, reviews: 890, delivery: '20–30 min', fee: 'Grátis', minOrder: 20, tags: ['Hot dog', 'Street food'], badge: null, vibe: 'hot dog triplo' },
    { id: 'r-pizza', shop: 'Pizza Neurônio', category: 'pizza', cover: img('photo-1513104890138-7c749659a591'), logo: thumb('photo-1513104890138-7c749659a591'), rating: 4.9, reviews: 5670, delivery: '35–50 min', fee: 'R$ 4,99', minOrder: 40, tags: ['Pizza gigante', '8 queijos'], badge: 'Super', vibe: 'pizza colossal' },
    { id: 'r-frango', shop: 'Frango Dopamina', category: 'lanches', cover: img('photo-1626082927389-6cd097cdc6ec'), logo: thumb('photo-1626082927389-6cd097cdc6ec'), rating: 4.6, reviews: 1450, delivery: '30–45 min', fee: 'R$ 3,99', minOrder: 35, tags: ['Frango', 'Picante'], badge: null, vibe: 'asinhas picantes' },
    { id: 'r-kfc', shop: 'KFC Imaginário', category: 'lanches', cover: img('photo-1626645731055-7ade1d36b0f8'), logo: thumb('photo-1626645731055-7ade1d36b0f8'), rating: 4.5, reviews: 3200, delivery: '25–40 min', fee: 'Grátis', minOrder: 45, tags: ['Bucket', 'Crocante'], badge: 'Promo', vibe: 'frango frito' },
    { id: 'r-tokyo', shop: 'Tokyo Fake', category: 'japonesa', cover: img('photo-1569718212165-3a8278d5f624'), logo: thumb('photo-1569718212165-3a8278d5f624'), rating: 4.8, reviews: 2340, delivery: '25–40 min', fee: 'Grátis', minOrder: 30, tags: ['Ramen', 'Japonês'], badge: 'Super', vibe: 'ramen quente' },
    { id: 'r-sushi', shop: 'Sushi Imaginário', category: 'japonesa', cover: img('photo-1579584425555-c3ce17fd4351'), logo: thumb('photo-1579584425555-c3ce17fd4351'), rating: 4.9, reviews: 4100, delivery: '40–55 min', fee: 'R$ 6,99', minOrder: 60, tags: ['Sushi', 'Premium'], badge: 'Super', vibe: 'sushi fresco' },
    { id: 'r-china', shop: 'China Fake', category: 'japonesa', cover: img('photo-1612929633738-8fe44f7ec841'), logo: thumb('photo-1612929633738-8fe44f7ec841'), rating: 4.6, reviews: 1780, delivery: '30–45 min', fee: 'Grátis', minOrder: 35, tags: ['Yakisoba', 'Oriental'], badge: null, vibe: 'yakisoba' },
    { id: 'r-acai', shop: 'Açaí do Paraíso', category: 'doces', cover: img('photo-1590301157890-4810ed352733'), logo: thumb('photo-1590301157890-4810ed352733'), rating: 4.9, reviews: 6200, delivery: '15–30 min', fee: 'Grátis', minOrder: 20, tags: ['Açaí', 'Gigante'], badge: 'Super', vibe: 'açaí com nutella' },
    { id: 'r-doce', shop: 'Doce Ilusão', category: 'doces', cover: img('photo-1606313564200-e75d5e30476c'), logo: thumb('photo-1606313564200-e75d5e30476c'), rating: 4.8, reviews: 2890, delivery: '20–35 min', fee: 'Grátis', minOrder: 25, tags: ['Sobremesa', 'Brownie'], badge: null, vibe: 'doces viciantes' },
    { id: 'r-donut', shop: 'Donut Neurônio', category: 'doces', cover: img('photo-1551024506-0bccd28d83a2'), logo: thumb('photo-1551024506-0bccd28d83a2'), rating: 4.7, reviews: 1560, delivery: '20–30 min', fee: 'Grátis', minOrder: 25, tags: ['Donuts', 'Kit 6'], badge: 'Promo', vibe: 'donuts coloridos' },
    { id: 'r-gelato', shop: 'Gelato Fake', category: 'doces', cover: img('photo-1501443767984-6bdaf0f04e38'), logo: thumb('photo-1501443767984-6bdaf0f04e38'), rating: 4.5, reviews: 980, delivery: '10–20 min', fee: 'Grátis', minOrder: 15, tags: ['Sorvete', 'Gelato'], badge: null, vibe: 'sorvete italiano' },
    { id: 'r-grill', shop: 'Grill Imaginário', category: 'brasileira', cover: img('photo-1555939594-58d7cb561ad1'), logo: thumb('photo-1555939594-58d7cb561ad1'), rating: 4.9, reviews: 3800, delivery: '45–60 min', fee: 'R$ 7,99', minOrder: 70, tags: ['Churrasco', 'Misto'], badge: 'Super', vibe: 'churrasco de domingo' },
    { id: 'r-espeto', shop: 'Espeto Dourado', category: 'brasileira', cover: img('photo-1529042410759-befb1204b368'), logo: thumb('photo-1529042410759-befb1204b368'), rating: 4.6, reviews: 1120, delivery: '25–40 min', fee: 'R$ 3,49', minOrder: 30, tags: ['Boteco', 'Espetinho'], badge: null, vibe: 'espetinho de boteco' },
    { id: 'r-nordeste', shop: 'Nordeste Fake', category: 'brasileira', cover: img('photo-1606491956689-2ea866880f44'), logo: thumb('photo-1606491956689-2ea866880f44'), rating: 4.7, reviews: 1340, delivery: '20–35 min', fee: 'Grátis', minOrder: 22, tags: ['Tapioca', 'Regional'], badge: null, vibe: 'tapioca nordestina' },
    { id: 'r-feira', shop: 'Feira Fake', category: 'brasileira', cover: img('photo-1626700051175-6818013e1d4f'), logo: thumb('photo-1626700051175-6818013e1d4f'), rating: 4.6, reviews: 2100, delivery: '20–35 min', fee: 'Grátis', minOrder: 25, tags: ['Pastel', 'Feira'], badge: 'Promo', vibe: 'pastel de feira' },
    { id: 'r-ze', shop: 'Salgados do Zé', category: 'brasileira', cover: img('photo-1619228183490-0c4d5c9a4f32'), logo: thumb('photo-1619228183490-0c4d5c9a4f32'), rating: 4.8, reviews: 8900, delivery: '15–25 min', fee: 'Grátis', minOrder: 18, tags: ['Coxinha', 'Salgados'], badge: 'Super', vibe: 'coxinha de tarde' },
    { id: 'r-mineiro', shop: 'Mineiro Fake', category: 'brasileira', cover: img('photo-1608198393988-8bb7e09312f3'), logo: thumb('photo-1608198393988-8bb7e09312f3'), rating: 4.9, reviews: 4500, delivery: '15–25 min', fee: 'Grátis', minOrder: 15, tags: ['Pão de queijo', 'Mineiro'], badge: 'Super', vibe: 'pão de queijo quentinho' },
    { id: 'r-nonna', shop: 'Nonna Dopamina', category: 'italiana', cover: img('photo-1574894709920-11b28e736d22'), logo: thumb('photo-1574894709920-11b28e736d22'), rating: 4.8, reviews: 2450, delivery: '35–50 min', fee: 'Grátis', minOrder: 45, tags: ['Lasanha', 'Italiano'], badge: null, vibe: 'lasanha da nonna' },
    { id: 'r-pasta', shop: 'Pasta Dopamina', category: 'italiana', cover: img('photo-1621996346565-e3dbc646d9a9'), logo: thumb('photo-1621996346565-e3dbc646d9a9'), rating: 4.7, reviews: 1670, delivery: '30–45 min', fee: 'Grátis', minOrder: 38, tags: ['4 queijos', 'Cremoso'], badge: null, vibe: 'macarrão cremoso' },
    { id: 'r-mex', shop: 'El Dopamina', category: 'mexicana', cover: img('photo-1565299585323-38d6b0865b47'), logo: thumb('photo-1565299585323-38d6b0865b47'), rating: 4.7, reviews: 1560, delivery: '30–45 min', fee: 'Grátis', minOrder: 50, tags: ['Tacos', 'Mexicano'], badge: 'Promo', vibe: 'tacos explosivos' },
    { id: 'r-havai', shop: 'Havai Fake', category: 'saudavel', cover: img('photo-1546069901-ba9599a7e63c'), logo: thumb('photo-1546069901-ba9599a7e63c'), rating: 4.7, reviews: 1890, delivery: '25–40 min', fee: 'R$ 2,99', minOrder: 40, tags: ['Poke', 'Fit'], badge: null, vibe: 'poke bowl' },
    { id: 'r-crepe', shop: 'Crepe Paris', category: 'cafe', cover: img('photo-1519676867240-f03562e64548'), logo: thumb('photo-1519676867240-f03562e64548'), rating: 4.5, reviews: 780, delivery: '20–30 min', fee: 'Grátis', minOrder: 22, tags: ['Crepe', 'Doce'], badge: null, vibe: 'crepe parisiense' },
    { id: 'r-brunch', shop: 'Brunch Fake', category: 'cafe', cover: img('photo-1562376552-9d60a4b0920f'), logo: thumb('photo-1562376552-9d60a4b0920f'), rating: 4.5, reviews: 650, delivery: '20–30 min', fee: 'Grátis', minOrder: 28, tags: ['Waffle', 'Brunch'], badge: null, vibe: 'waffle belga' },
    { id: 'r-shake', shop: 'Shake da Fé', category: 'bebidas', cover: img('photo-1572497013410-f58864f3b28a'), logo: thumb('photo-1572497013410-f58864f3b28a'), rating: 4.6, reviews: 1340, delivery: '15–25 min', fee: 'Grátis', minOrder: 18, tags: ['Milk-shake', 'Oreo'], badge: null, vibe: 'milk-shake grosso' },
    { id: 'r-boba', shop: 'Boba Fake', category: 'bebidas', cover: img('photo-1525385133511-4adfa8a3ff9a'), logo: thumb('photo-1525385133511-4adfa8a3ff9a'), rating: 4.4, reviews: 920, delivery: '15–25 min', fee: 'Grátis', minOrder: 18, tags: ['Bubble tea', 'Taro'], badge: 'Novo', vibe: 'bubble tea' },
  ];

  restaurants.forEach(function (r) {
    r.reviewList = restaurantReviews(r.shop, r.vibe);
  });

  var shopToRestaurant = {};
  restaurants.forEach(function (r) {
    shopToRestaurant[r.shop] = r.id;
  });

  function enrichExpressDishes(dishes) {
    dishes.forEach(function (d) {
      d.restaurantId = shopToRestaurant[d.shop] || 'r-burger';
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
