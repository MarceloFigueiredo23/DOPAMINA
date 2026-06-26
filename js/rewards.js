/**
 * Mercadopamina — moedas, reações e efeitos ao adicionar ao carrinho.
 */
(function (w) {
  'use strict';

  var KEY = 'dopamina_coins';

  var REACTIONS = [
    'Boa escolha! Quase parece compra real 🛒',
    'Ih, quase cliquei em pagar de verdade 😅',
    'Sua sacola está ficando irresistível ✨',
    'Dopamina subindo — continue navegando 🧠',
    'Esse desconto não existe na vida real 🔥',
    'Mais um passo rumo ao checkout…',
    'Produto original — foto confere com anúncio ✓',
    'Frete grátis mental ativado 🚚',
  ];

  function loadCoins() {
    return parseInt(localStorage.getItem(KEY) || '0', 10) || 0;
  }

  function saveCoins(n) {
    localStorage.setItem(KEY, String(Math.max(0, n)));
    updateCoinDisplay();
  }

  function addCoins(amount) {
    var total = loadCoins() + Math.max(0, amount);
    saveCoins(total);
    return total;
  }

  function coinsForProduct(p) {
    if (!p) return 3;
    var price = p.price || 10;
    var base = Math.max(2, Math.min(48, Math.round(price / 75)));
    var promo = p.oldPrice && p.oldPrice > p.price ? 5 : 0;
    var hot = (p.reviews || 0) >= 5000 ? 2 : 0;
    return base + promo + hot;
  }

  function pickReaction(p, dopaPct) {
    if (dopaPct >= 90) return 'PICO MERCADOPAMINA — finalize o pedido! 💥';
    if (dopaPct >= 70) return 'Rush de compra no máximo 🔥';
    if (dopaPct >= 45) return 'Prazer da compra ativado — continue! ✨';
    if (p && p.brand) return p.brand + ' adicionado — foto igual ao anúncio ✓';
    return REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
  }

  function burstCoords(evt) {
    if (evt && evt.clientX) return { x: evt.clientX, y: evt.clientY };
    var cart = document.querySelector('.site-header-cart');
    if (cart) {
      var r = cart.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  function spawnCoinBurst(x, y, amount) {
    var layer = document.getElementById('fx-layer');
    if (!layer) return;
    var n = Math.min(14, 5 + Math.floor(amount / 4));
    var i;
    for (i = 0; i < n; i++) {
      var coin = document.createElement('span');
      coin.className = 'fx-coin';
      coin.textContent = '🪙';
      coin.style.left = (x + (Math.random() - 0.5) * 48) + 'px';
      coin.style.top = y + 'px';
      coin.style.setProperty('--dx', ((Math.random() - 0.5) * 140) + 'px'));
      coin.style.setProperty('--dy', (-50 - Math.random() * 110) + 'px');
      coin.style.animationDelay = (i * 0.04) + 's';
      layer.appendChild(coin);
      coin.addEventListener('animationend', function () { this.remove(); });
    }
    var pop = document.createElement('span');
    pop.className = 'fx-coin-pop';
    pop.textContent = '+' + amount + ' moedas';
    pop.style.left = x + 'px';
    pop.style.top = (y - 24) + 'px';
    layer.appendChild(pop);
    pop.addEventListener('animationend', function () { pop.remove(); });
  }

  function spawnSparkle(x, y) {
    var layer = document.getElementById('fx-layer');
    if (!layer) return;
    var icons = ['✨', '💫', '⭐', '🛍️'];
    for (var i = 0; i < 5; i++) {
      var s = document.createElement('span');
      s.className = 'fx-sparkle';
      s.textContent = icons[i % icons.length];
      s.style.left = (x + (Math.random() - 0.5) * 56) + 'px';
      s.style.top = (y + (Math.random() - 0.5) * 36) + 'px';
      layer.appendChild(s);
      s.addEventListener('animationend', function () { s.remove(); });
    }
  }

  function flyToHeader(x, y) {
    var target = document.getElementById('header-coins');
    if (!target) return;
    var layer = document.getElementById('fx-layer');
    if (!layer) return;
    var tr = target.getBoundingClientRect();
    var fly = document.createElement('span');
    fly.className = 'fx-coin-fly';
    fly.textContent = '🪙';
    fly.style.left = x + 'px';
    fly.style.top = y + 'px';
    fly.style.setProperty('--tx', (tr.left + tr.width / 2 - x) + 'px');
    fly.style.setProperty('--ty', (tr.top + tr.height / 2 - y) + 'px');
    layer.appendChild(fly);
    fly.addEventListener('animationend', function () {
      fly.remove();
      target.classList.add('coin-pulse');
      setTimeout(function () { target.classList.remove('coin-pulse'); }, 500);
    });
  }

  function updateCoinDisplay() {
    var n = loadCoins();
    var txt = n.toLocaleString('pt-BR');
    ['header-coins-val', 'promo-hub-coins'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = txt;
    });
    var wrap = document.getElementById('header-coins');
    if (wrap) wrap.hidden = false;
  }

  function onAddToCart(p, dopaPct, evt) {
    var coins = coinsForProduct(p);
    var total = addCoins(coins);
    var c = burstCoords(evt);
    spawnCoinBurst(c.x, c.y, coins);
    flyToHeader(c.x, c.y);
    if (dopaPct >= 50) spawnSparkle(c.x, c.y);
    return {
      coins: coins,
      total: total,
      reaction: pickReaction(p, dopaPct),
      savings: p && p.oldPrice && p.oldPrice > p.price ? p.oldPrice - p.price : 0,
    };
  }

  w.DOPAMINA_REWARDS = {
    loadCoins: loadCoins,
    addCoins: addCoins,
    coinsForProduct: coinsForProduct,
    pickReaction: pickReaction,
    spawnCoinBurst: spawnCoinBurst,
    spawnSparkle: spawnSparkle,
    updateCoinDisplay: updateCoinDisplay,
    onAddToCart: onAddToCart,
  };
})(window);
