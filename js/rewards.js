/**
 * Mercadopamina — efeitos visuais e sons ao adicionar ao carrinho / checkout.
 */
(function (w) {
  'use strict';

  var SOUND_KEY = 'dopamina_sound_on';
  var audioCtx = null;

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

  function soundsEnabled() {
    return localStorage.getItem(SOUND_KEY) !== '0';
  }

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (w.AudioContext || w.webkitAudioContext)();
    }
    return audioCtx;
  }

  function unlockAudio() {
    if (!soundsEnabled()) return;
    try {
      var ctx = getAudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
    } catch (e) { /* ignore */ }
  }

  function playTone(freqStart, freqEnd, duration, volume, type) {
    if (!soundsEnabled()) return;
    try {
      unlockAudio();
      var ctx = getAudioCtx();
      var t = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freqStart, t);
      if (freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), t + duration * 0.6);
      }
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(volume, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + duration + 0.02);
    } catch (e) { /* ignore */ }
  }

  function playCoinDrop() {
    playTone(720 + Math.random() * 280, 1100 + Math.random() * 200, 0.11, 0.09, 'triangle');
  }

  function playCoinShower() {
    var delays = [0, 55, 110, 70, 140, 200, 90, 160, 230, 280, 120, 190];
    delays.forEach(function (d) {
      setTimeout(function () {
        playTone(520 + Math.random() * 520, 900 + Math.random() * 400, 0.14, 0.07, 'triangle');
      }, d);
    });
  }

  function playWinChime() {
    playTone(523, 784, 0.18, 0.08, 'sine');
    setTimeout(function () { playTone(659, 988, 0.22, 0.07, 'sine'); }, 120);
    setTimeout(function () { playTone(784, 1175, 0.28, 0.06, 'sine'); }, 240);
  }

  function playSpinTick() {
    playTone(180 + Math.random() * 40, 120, 0.04, 0.03, 'square');
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
    var cart = document.querySelector('[data-view="cart"]');
    if (cart) {
      var r = cart.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    return { x: window.innerWidth / 2, y: window.innerHeight * 0.35 };
  }

  function getFxLayer() {
    var layer = document.getElementById('fx-layer');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'fx-layer';
      layer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(layer);
    }
    return layer;
  }

  function spawnFallingCoins(x, y, amount) {
    var layer = getFxLayer();
    var n = Math.min(18, 6 + Math.floor(amount / 3));
    var i;
    for (i = 0; i < n; i++) {
      (function (idx) {
        var coin = document.createElement('span');
        coin.className = 'fx-coin-fall';
        coin.textContent = '🪙';
        var spread = 100 + Math.random() * 60;
        var startX = x + (Math.random() - 0.5) * spread;
        var startY = y - 40 - Math.random() * 50;
        coin.style.left = startX + 'px';
        coin.style.top = startY + 'px';
        coin.style.setProperty('--fall-dy', (100 + Math.random() * 220) + 'px');
        coin.style.setProperty('--fall-dx', ((Math.random() - 0.5) * 90) + 'px');
        coin.style.setProperty('--fall-rot', (200 + Math.random() * 400) + 'deg');
        coin.style.animationDelay = (idx * 0.045) + 's';
        coin.style.animationDuration = (0.75 + Math.random() * 0.45) + 's';
        layer.appendChild(coin);
        coin.addEventListener('animationend', function () { coin.remove(); });
        setTimeout(playCoinDrop, idx * 45);
      })(i);
    }
  }

  function spawnCoinBurst(x, y, amount) {
    var layer = getFxLayer();
    var n = Math.min(10, 4 + Math.floor(amount / 5));
    var i;
    for (i = 0; i < n; i++) {
      var coin = document.createElement('span');
      coin.className = 'fx-coin';
      coin.textContent = '🪙';
      coin.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
      coin.style.top = y + 'px';
      coin.style.setProperty('--dx', ((Math.random() - 0.5) * 100) + 'px');
      coin.style.setProperty('--dy', (-30 - Math.random() * 70) + 'px');
      coin.style.animationDelay = (i * 0.03) + 's';
      layer.appendChild(coin);
      coin.addEventListener('animationend', function () { this.remove(); });
    }
    var pop = document.createElement('span');
    pop.className = 'fx-coin-pop';
    pop.textContent = '+' + amount;
    pop.style.left = x + 'px';
    pop.style.top = (y - 28) + 'px';
    layer.appendChild(pop);
    pop.addEventListener('animationend', function () { pop.remove(); });
  }

  function spawnCheckoutRain() {
    var layer = getFxLayer();
    var wW = window.innerWidth;
    var count = Math.min(28, Math.max(14, Math.floor(wW / 40)));
    var i;
    for (i = 0; i < count; i++) {
      (function (idx) {
        var coin = document.createElement('span');
        coin.className = 'fx-coin-rain';
        coin.textContent = '🪙';
        coin.style.left = (Math.random() * wW) + 'px';
        coin.style.top = (-20 - Math.random() * 80) + 'px';
        coin.style.setProperty('--rain-dy', (window.innerHeight + 80 + Math.random() * 120) + 'px');
        coin.style.setProperty('--rain-dx', ((Math.random() - 0.5) * 60) + 'px');
        coin.style.setProperty('--rain-rot', (360 + Math.random() * 720) + 'deg');
        coin.style.animationDelay = (idx * 0.07) + 's';
        coin.style.animationDuration = (1.1 + Math.random() * 0.7) + 's';
        layer.appendChild(coin);
        coin.addEventListener('animationend', function () { coin.remove(); });
      })(i);
    }
    playCoinShower();
  }

  function spawnSparkle(x, y) {
    var layer = getFxLayer();
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

  function onAddToCart(p, dopaPct, evt) {
    unlockAudio();
    var coins = coinsForProduct(p);
    var c = burstCoords(evt);
    spawnFallingCoins(c.x, c.y, coins);
    spawnCoinBurst(c.x, c.y, coins);
    if (dopaPct >= 50) spawnSparkle(c.x, c.y);
    return {
      coins: coins,
      reaction: pickReaction(p, dopaPct),
      savings: p && p.oldPrice && p.oldPrice > p.price ? p.oldPrice - p.price : 0,
    };
  }

  function onCheckoutComplete() {
    unlockAudio();
    spawnCheckoutRain();
    playWinChime();
  }

  function onRouletteWin() {
    unlockAudio();
    playWinChime();
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight * 0.42;
    spawnFallingCoins(cx, cy, 20);
    setTimeout(function () { spawnFallingCoins(cx, cy, 15); }, 400);
  }

  function bindAudioUnlock() {
    var once = function () {
      unlockAudio();
      document.removeEventListener('pointerdown', once, true);
      document.removeEventListener('keydown', once, true);
    };
    document.addEventListener('pointerdown', once, true);
    document.addEventListener('keydown', once, true);
  }

  bindAudioUnlock();

  w.DOPAMINA_REWARDS = {
    coinsForProduct: coinsForProduct,
    pickReaction: pickReaction,
    spawnFallingCoins: spawnFallingCoins,
    spawnCheckoutRain: spawnCheckoutRain,
    spawnSparkle: spawnSparkle,
    onAddToCart: onAddToCart,
    onCheckoutComplete: onCheckoutComplete,
    onRouletteWin: onRouletteWin,
    playSpinTick: playSpinTick,
    playCoinDrop: playCoinDrop,
    unlockAudio: unlockAudio,
    soundsEnabled: soundsEnabled,
  };
})(window);
