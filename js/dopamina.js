(function () {
  'use strict';

  /* ── catalog (catalog-data.js) ── */
  const CATALOG = window.DOPAMINA_CATALOG || { express: [], premium: [], fashion: [] };

  function getProduct(id) {
    return CATALOG.express.concat(CATALOG.premium).concat(CATALOG.fashion || []).find(function (p) {
      return p.id === id;
    });
  }

  function isExpress(id) {
    return id.charAt(0) === 'f';
  }

  function isFashion(id) {
    return id.charAt(0) === 'm';
  }

  function isRetail(id) {
    return id.charAt(0) === 'p' || id.charAt(0) === 'm';
  }

  /* ── store.js ── */
  const KEYS = {
    wallet: 'dopamina_wallet',
    cart: 'dopamina_cart',
    orders: 'dopamina_orders',
    roulette: 'dopamina_roulette_done',
    rouletteTab: 'dopamina_roulette_tab_',
    coupon: 'dopamina_coupon',
    savings: 'dopamina_savings',
    shenimCoupons: 'dopamina_shenim_coupons',
  };

  const UI = window.DOPAMINA_UI || {};

  const UNLIMITED_WALLET = 999999999.99;

  function loadWallet() {
    var v = localStorage.getItem(KEYS.wallet);
    var n = v !== null ? parseFloat(v) : UNLIMITED_WALLET;
    if (!isFinite(n) || n < 1000000) {
      n = UNLIMITED_WALLET;
      localStorage.setItem(KEYS.wallet, String(n));
    }
    return n;
  }

  function saveWallet() {
    localStorage.setItem(KEYS.wallet, String(UNLIMITED_WALLET));
  }

  function ensureUnlimitedWallet() {
    saveWallet();
  }

  const SERVICE_FEE = (window.DOPAMINA_REALISM && window.DOPAMINA_REALISM.SERVICE_FEE) || 0.99;

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.cart) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  }

  function loadOrders() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.orders) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(KEYS.orders, JSON.stringify(orders));
  }

  function rouletteDoneForTab(tab) {
    return localStorage.getItem(KEYS.rouletteTab + (tab || currentTab)) === '1';
  }

  function markRouletteDoneForTab(tab) {
    localStorage.setItem(KEYS.rouletteTab + (tab || currentTab), '1');
    localStorage.setItem(KEYS.roulette, '1');
  }

  function rouletteDone() {
    return rouletteDoneForTab('express');
  }

  function markRouletteDone() {
    markRouletteDoneForTab(currentTab);
  }

  function saveCoupon(coupon) {
    localStorage.setItem(KEYS.coupon, JSON.stringify(coupon));
  }

  function loadCoupon() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.coupon) || 'null');
    } catch (e) {
      return null;
    }
  }

  function addSavings(amount) {
    const today = new Date().toISOString().slice(0, 10);
    const data = JSON.parse(localStorage.getItem(KEYS.savings) || '{}');
    data[today] = (data[today] || 0) + amount;
    localStorage.setItem(KEYS.savings, JSON.stringify(data));
    return data;
  }

  function loadSavings() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.savings) || '{}');
    } catch (e) {
      return {};
    }
  }

  function formatBRL(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /* ── roulette.js ── */
  const TAB_PRIZES = {
    express: [
      { label: '50% OFF', discount: 0.5, type: 'percent', icon: '🍔' },
      { label: 'Frete Grátis', discount: 0, type: 'shipping', icon: '🛵' },
      { label: 'R$ 20 OFF', discount: 20, type: 'bonus', icon: '💊' },
      { label: '30% OFF', discount: 0.3, type: 'percent', icon: '🍕' },
      { label: 'Frete Grátis', discount: 0, type: 'shipping', icon: '🎁' },
      { label: '40% OFF', discount: 0.4, type: 'percent', icon: '🔥' },
      { label: 'R$ 15 OFF', discount: 15, type: 'bonus', icon: '☕' },
      { label: 'VIP Clube', discount: 0.35, type: 'percent', icon: '💎' },
    ],
    premium: [
      { label: '15% OFF', discount: 0.15, type: 'percent', icon: '📦' },
      { label: 'Prime Grátis', discount: 0, type: 'shipping', icon: '⭐' },
      { label: 'R$ 200 OFF', discount: 200, type: 'bonus', icon: '💻' },
      { label: '20% OFF', discount: 0.2, type: 'percent', icon: '🎮' },
      { label: 'Frete Grátis', discount: 0, type: 'shipping', icon: '🚚' },
      { label: '25% OFF', discount: 0.25, type: 'percent', icon: '📱' },
      { label: 'R$ 100 OFF', discount: 100, type: 'bonus', icon: '🎧' },
      { label: 'Cupom Prime', discount: 0.3, type: 'percent', icon: '👑' },
    ],
    fashion: [
      { label: '18% OFF', discount: 0.18, type: 'percent', icon: '👗' },
      { label: '25% OFF', discount: 0.25, type: 'percent', icon: '🔥' },
      { label: 'Frete Grátis', discount: 0, type: 'shipping', icon: '✈️' },
      { label: '19% OFF', discount: 0.19, type: 'percent', icon: '👟' },
      { label: 'R$ 30 OFF', discount: 30, type: 'bonus', icon: '👜' },
      { label: '30% OFF', discount: 0.3, type: 'percent', icon: '💄' },
      { label: '15% OFF', discount: 0.15, type: 'percent', icon: '🧥' },
      { label: 'VIP Moda', discount: 0.35, type: 'percent', icon: '✨' },
    ],
  };

  function getPrizes() {
    return TAB_PRIZES[rouletteTab] || TAB_PRIZES.express;
  }

  const SKIP_COUPON = { label: 'Sem cupom', discount: 0, type: 'none', icon: '😌' };

  function openCouponSheet(onSave) {
    var overlay = $('#coupon-overlay');
    var wrap = $('#coupon-sheet-wrap');
    if (!overlay || !wrap || !UI.couponSheetHtml) return;
    wrap.innerHTML = UI.couponSheetHtml(UI.SHENIM_COUPONS || []);
    overlay.hidden = false;
    overlay.onclick = function (e) {
      if (e.target === overlay) overlay.hidden = true;
    };
    var saveBtn = $('#coupon-save-btn');
    if (saveBtn) {
      saveBtn.onclick = function () {
        localStorage.setItem(KEYS.shenimCoupons, '1');
        var best = { label: '25% OFF moda', discount: 0.25, type: 'percent', icon: '👗' };
        saveCoupon(best);
        updateCouponBadge();
        overlay.hidden = true;
        flashToast('Cupons salvos na sua conta!');
        if (onSave) onSave(best);
      };
    }
  }

  function updateCouponBadge() {
    var coupon = loadCoupon();
    var badge = $('#coupon-badge');
    if (badge && coupon) {
      badge.textContent = 'Cupom: ' + coupon.label;
      badge.hidden = false;
    }
  }

  function triggerRoulette(tab) {
    rouletteTab = tab || currentTab;
    openRoulette(function (prize) {
      markRouletteDoneForTab(rouletteTab);
      if (prize.type !== 'none') {
        saveCoupon(prize);
        updateCouponBadge();
        if (UI.addStamp) UI.addStamp(1);
      }
      if (rouletteTab === 'fashion' && prize.type !== 'none') {
        setTimeout(function () { openCouponSheet(); }, 400);
      }
      flashToast(prize.type !== 'none' ? 'Cupom ' + prize.label + ' ativado!' : 'Tudo bem, sem cupom desta vez');
    });
  }

  let rouletteTab = 'express';
  let spinning = false;

  function closeOverlay(overlay) {
    overlay.classList.remove('is-open');
    document.body.classList.remove('roulette-open');
  }

  function finishRoulette(overlay, prize, onComplete) {
    closeOverlay(overlay);
    if (onComplete) onComplete(prize);
  }

  function buildWheelSVG() {
    const svg = document.getElementById('roulette-svg');
    if (!svg) return;

    const PRIZES = getPrizes();
    var colors = rouletteTab === 'express' ? ['#ea1d2c', '#ff6b6b'] :
      rouletteTab === 'premium' ? ['#ff9900', '#232f3e'] : ['#ff2d6a', '#111'];

    svg.innerHTML = '';
    const cx = 140;
    const cy = 140;
    const r = 130;
    const slice = (2 * Math.PI) / PRIZES.length;

    PRIZES.forEach(function (prize, i) {
      const start = i * slice - Math.PI / 2;
      const end = start + slice;
      const x1 = cx + r * Math.cos(start);
      const y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(end);
      const y2 = cy + r * Math.sin(end);
      const large = slice > Math.PI ? 1 : 0;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute(
        'd',
        'M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x2 + ' ' + y2 + ' Z'
      );
      path.setAttribute('fill', colors[i % 2]);
      path.setAttribute('stroke', '#fff');
      path.setAttribute('stroke-width', '2');
      svg.appendChild(path);

      const mid = start + slice / 2;
      const tx = cx + r * 0.62 * Math.cos(mid);
      const ty = cy + r * 0.62 * Math.sin(mid);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', tx);
      text.setAttribute('y', ty);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('font-size', '22');
      text.textContent = prize.icon;
      svg.appendChild(text);
    });
  }

  function showPrize(prize, overlay, result, stage, spinBtn, onComplete) {
    spinning = false;
    if (stage) stage.hidden = true;
    if (spinBtn) spinBtn.hidden = true;

    if (!result) {
      finishRoulette(overlay, prize, onComplete);
      return;
    }

    result.hidden = false;
    result.innerHTML =
      '<div class="roulette-prize">' +
      '<span class="prize-icon">' + prize.icon + '</span>' +
      '<h2>Você ganhou: ' + prize.label + '!</h2>' +
      '<p>Cupom aplicado no seu pedido.</p>' +
      '<button type="button" class="btn btn-primary" id="roulette-confirm">Ver ofertas</button>' +
      '</div>';

    const confirmBtn = document.getElementById('roulette-confirm');
    if (confirmBtn) {
      confirmBtn.onclick = function () {
        finishRoulette(overlay, prize, onComplete);
      };
    }
  }

  function spinWheel(wheel, spinBtn, overlay, result, stage, onComplete) {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;

    const PRIZES = getPrizes();
    const winIndex = Math.floor(Math.random() * PRIZES.length);
    const sliceDeg = 360 / PRIZES.length;
    const spins = 5 + Math.floor(Math.random() * 3);
    const targetDeg = spins * 360 + (360 - winIndex * sliceDeg - sliceDeg / 2);

    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = 'rotate(' + targetDeg + 'deg)';

    let finished = false;

    function onEnd() {
      if (finished) return;
      finished = true;
      wheel.removeEventListener('transitionend', onEnd);
      showPrize(PRIZES[winIndex], overlay, result, stage, spinBtn, onComplete);
    }

    wheel.addEventListener('transitionend', onEnd);

    setTimeout(function () {
      if (!finished) onEnd();
    }, 4500);
  }

  function openRoulette(onComplete) {
    const overlay = document.getElementById('roulette-overlay');
    const wheel = document.getElementById('roulette-wheel');
    const spinBtn = document.getElementById('roulette-spin');
    const result = document.getElementById('roulette-result');
    const stage = document.getElementById('roulette-stage');
    const closeBtn = document.getElementById('roulette-close-x');
    const modal = overlay ? overlay.querySelector('.roulette-modal') : null;
    const tabLabel = { express: 'AIFOOD', premium: 'AMAZOOM', fashion: 'SHENIM' };

    if (!overlay || !wheel) return;

    if (modal) {
      modal.className = 'roulette-modal roulette-' + rouletteTab;
      var h1 = modal.querySelector('h1');
      var p = modal.querySelector('p');
      if (h1) h1.textContent = 'Roleta ' + (tabLabel[rouletteTab] || 'Dopamina');
      if (p) p.textContent = 'Gire e ganhe cupons exclusivos no ' + (tabLabel[rouletteTab] || 'app') + '!';
    }

    buildWheelSVG();

    spinning = false;
    wheel.style.transform = 'rotate(0deg)';
    wheel.style.transition = 'none';
    if (result) {
      result.hidden = true;
      result.innerHTML = '';
    }
    if (stage) stage.hidden = false;
    if (spinBtn) {
      spinBtn.disabled = false;
      spinBtn.hidden = false;
    }

    overlay.classList.add('is-open');
    document.body.classList.add('roulette-open');

    requestAnimationFrame(function () {
      wheel.style.transition = '';
    });

    if (closeBtn) {
      closeBtn.onclick = function () {
        if (spinning) return;
        finishRoulette(overlay, SKIP_COUPON, onComplete);
      };
    }

    if (spinBtn) {
      spinBtn.onclick = function () {
        spinWheel(wheel, spinBtn, overlay, result, stage, onComplete);
      };
    }
  }

  function initRoulette(onComplete) {
    rouletteTab = currentTab;
    openRoulette(onComplete);
  }

  function promoHandlers() {
    return {
      onRoulette: function () { triggerRoulette(currentTab); },
      onHits: function () {
        flashToast('🔥 Hits do momento — até 60% OFF!');
        triggerRoulette('express');
      },
      onCategory: function (cat) {
        ifoodCategory = cat;
        ifoodRestaurantId = null;
        renderShop();
      },
    };
  }

  function bindPromoArea(root) {
    if (UI.bindInteractive) UI.bindInteractive(root, promoHandlers());
  }

  /* ── tracking.js ── */
  const FIJI = {
    lat: -17.713371,
    lng: 178.065032,
    label: 'Fiji',
    mapsUrl: 'https://www.google.com/maps/place/Fiji/@-17.713371,178.065032,8z',
  };
  const BRAZIL_COAST = { lat: -23.0, lng: -43.5 };

  const OCEAN_TIME_SHARE = 0.68;

  const DELIVERY_DURATION_MS = {
    express: 60 * 60 * 1000,
    premium: 5 * 24 * 60 * 60 * 1000,
    fashion: 3 * 24 * 60 * 60 * 1000,
    mixed: 5 * 24 * 60 * 60 * 1000,
  };

  const DELIVERY_META = {
    express: { eta: 'Previsão: até 1 hora (AIFOOD)', unit: 'hour' },
    premium: { eta: 'Previsão: 5 dias úteis (AMAZOOM)', unit: 'day' },
    fashion: { eta: 'Previsão: 3 dias úteis (SHENIM)', unit: 'day' },
    mixed: { eta: 'Comida em até 1h · Produtos em 3–5 dias', unit: 'day' },
  };

  function getDeliveryDurationMs(orderType) {
    return DELIVERY_DURATION_MS[orderType] || DELIVERY_DURATION_MS.premium;
  }

  function getDeliveryMeta(orderType) {
    return DELIVERY_META[orderType] || DELIVERY_META.premium;
  }

  function getOrderDeliveryEnd(order) {
    if (order.deliverAt) return new Date(order.deliverAt).getTime();
    var start = new Date(order.createdAt).getTime();
    var dur = order.deliveryDurationMs || getDeliveryDurationMs(order.type);
    return start + dur;
  }

  function getOrderProgress(order) {
    var start = new Date(order.createdAt).getTime();
    var end = getOrderDeliveryEnd(order);
    if (end <= start) return 1;
    return Math.min(1, Math.max(0, (Date.now() - start) / (end - start)));
  }

  function formatRemaining(ms) {
    if (ms <= 0) return '✅ Entrega concluída';
    var totalMin = Math.ceil(ms / 60000);
    var days = Math.floor(totalMin / (60 * 24));
    var hours = Math.floor((totalMin % (60 * 24)) / 60);
    var mins = totalMin % 60;
    if (days > 0) return '⏱ ' + days + 'd ' + hours + 'h ' + mins + 'min restantes';
    if (hours > 0) return '⏱ ' + hours + 'h ' + mins + 'min restantes';
    return '⏱ ' + mins + ' min restantes';
  }

  function formatProgressPct(p) {
    return Math.round(p * 100) + '% do trajeto';
  }

  function stopLiveTracking(container) {
    if (container && container._trackingIv) {
      clearInterval(container._trackingIv);
      container._trackingIv = null;
    }
  }

  function buildOceanPath(dest) {
    return [
      FIJI,
      { lat: -10, lng: 160 },
      { lat: 0, lng: 120 },
      { lat: 5, lng: 80 },
      { lat: -5, lng: 40 },
      { lat: -15, lng: -10 },
      BRAZIL_COAST,
      { lat: lerp(BRAZIL_COAST.lat, dest.lat, 0.5), lng: lerp(BRAZIL_COAST.lng, dest.lng, 0.5) },
      dest,
    ];
  }

  function mapStatusForProgress(orderType, progress, phase) {
    if (progress >= 1) {
      return orderType === 'express' ? '✅ Entregue — dentro de 1 hora' : '✅ Pedido entregue no endereço';
    }
    if (phase === 'ocean') {
      if (progress > 0.5) return '🐋 Baleia cruzando o Pacífico (somente água)';
      return '🐋 Pedido saiu de Fiji — rota marítima';
    }
    if (orderType === 'express') return '🛵 Entregador em terra firme — rumo ao seu endereço';
    if (orderType === 'fashion') return '📦 Pacote em rota terrestre (SHENIM)';
    return '📦 Pacote em rota terrestre (AMAZOOM)';
  }

  function geocodeAddress(address) {
    const q = encodeURIComponent(address);
    return fetch(
      'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + q,
      { headers: { 'Accept-Language': 'pt-BR' } }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data && data[0]) {
          return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            label: data[0].display_name,
          };
        }
        return { lat: -23.5505, lng: -46.6333, label: address || 'São Paulo, Brasil' };
      })
      .catch(function () {
        return { lat: -23.5505, lng: -46.6333, label: address || 'São Paulo, Brasil' };
      });
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpCoord(c1, c2, t) {
    return { lat: lerp(c1.lat, c2.lat, t), lng: lerp(c1.lng, c2.lng, t) };
  }

  function positionOnPath(path, t) {
    if (!path.length) return { lat: 0, lng: 0 };
    if (t <= 0) return path[0];
    if (t >= 1) return path[path.length - 1];
    var totalSegments = path.length - 1;
    var segProgress = t * totalSegments;
    var segIndex = Math.min(Math.floor(segProgress), totalSegments - 1);
    var localT = segProgress - segIndex;
    return lerpCoord(path[segIndex], path[segIndex + 1], localT);
  }

  function trailToPosition(path, t) {
    var coords = [];
    if (!path.length) return coords;
    var totalSegments = path.length - 1;
    var segProgress = t * totalSegments;
    var segIndex = Math.min(Math.floor(segProgress), totalSegments - 1);
    for (var i = 0; i <= segIndex; i++) {
      coords.push([path[i].lat, path[i].lng]);
    }
    var pos = positionOnPath(path, t);
    coords.push([pos.lat, pos.lng]);
    return coords;
  }

  function makeEmojiIcon(emoji, size) {
    if (size === undefined) size = 40;
    return L.divIcon({
      className: 'map-emoji-marker',
      html: '<span style="font-size:' + size + 'px;line-height:1">' + emoji + '</span>',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }

  function runLiveTracking(container, order, callbacks) {
    var onStatus = callbacks && callbacks.onStatus;
    var onCountdown = callbacks && callbacks.onCountdown;
    var onPhase = callbacks && callbacks.onPhase;
    var orderType = order.type;
    var landEmoji = orderType === 'express' ? '🛵' : '📦';

    stopLiveTracking(container);

    return geocodeAddress(order.address).then(function (dest) {
      container.innerHTML = '';
      if (container._leaflet_map) {
        try { container._leaflet_map.remove(); } catch (e) { /* ignore */ }
      }

      var map = L.map(container, { zoomControl: true, scrollWheelZoom: true });
      container._leaflet_map = map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18,
      }).addTo(map);

      var fullPath = buildOceanPath(dest);
      var oceanPath = fullPath.slice(0, 7);
      var landPath = [fullPath[6], fullPath[7], fullPath[8]];
      var coast = fullPath[6];

      map.setView([FIJI.lat, FIJI.lng], 3);

      var oceanTrail = L.polyline([], { color: '#3b82f6', weight: 4, opacity: 0.85 }).addTo(map);
      var landTrail = L.polyline([], { color: '#ff9900', weight: 4, opacity: 0.9 }).addTo(map);
      var oceanPlan = L.polyline(
        oceanPath.map(function (p) { return [p.lat, p.lng]; }),
        { color: '#3b82f6', weight: 2, dashArray: '8 10', opacity: 0.35 }
      ).addTo(map);
      var landPlan = L.polyline(
        landPath.map(function (p) { return [p.lat, p.lng]; }),
        { color: '#ff9900', weight: 2, dashArray: '8 10', opacity: 0.35 }
      ).addTo(map);

      L.marker([FIJI.lat, FIJI.lng], { icon: makeEmojiIcon('🏝️', 32) })
        .bindPopup('<strong>Fiji</strong><br>Partida do pedido')
        .addTo(map);

      L.marker([dest.lat, dest.lng], { icon: makeEmojiIcon('🏠', 30) })
        .bindPopup('Entrega: ' + dest.label)
        .addTo(map);

      var whaleMarker = L.marker([FIJI.lat, FIJI.lng], { icon: makeEmojiIcon('🐋', 44), zIndexOffset: 1000 }).addTo(map);
      var landMarker = L.marker([coast.lat, coast.lng], {
        icon: makeEmojiIcon(landEmoji, 38),
        zIndexOffset: 1000,
      }).addTo(map);
      landMarker.setOpacity(0);

      var boundsSet = false;

      function tick() {
        var progress = getOrderProgress(order);
        var remaining = getOrderDeliveryEnd(order) - Date.now();
        var phase = progress < OCEAN_TIME_SHARE ? 'ocean' : 'land';

        if (phase === 'ocean') {
          var oceanT = progress / OCEAN_TIME_SHARE;
          var whalePos = positionOnPath(oceanPath, oceanT);
          whaleMarker.setLatLng([whalePos.lat, whalePos.lng]);
          whaleMarker.setOpacity(1);
          landMarker.setOpacity(0);
          oceanTrail.setLatLngs(trailToPosition(oceanPath, oceanT));
          landTrail.setLatLngs([]);
        } else {
          var landT = (progress - OCEAN_TIME_SHARE) / (1 - OCEAN_TIME_SHARE);
          var landPos = positionOnPath(landPath, landT);
          whaleMarker.setLatLng([coast.lat, coast.lng]);
          whaleMarker.setOpacity(0.35);
          landMarker.setLatLng([landPos.lat, landPos.lng]);
          landMarker.setOpacity(1);
          oceanTrail.setLatLngs(oceanPath.map(function (p) { return [p.lat, p.lng]; }));
          landTrail.setLatLngs(trailToPosition(landPath, landT));
        }

        if (progress >= 1) {
          landMarker.setLatLng([dest.lat, dest.lng]);
          landMarker.setOpacity(1);
          whaleMarker.setOpacity(0);
          landTrail.setLatLngs(landPath.map(function (p) { return [p.lat, p.lng]; }));
          stopLiveTracking(container);
        }

        try {
          if (!boundsSet) {
            map.fitBounds(L.latLngBounds(fullPath.map(function (p) { return [p.lat, p.lng]; })), { padding: [36, 36], maxZoom: 6 });
            boundsSet = true;
          }
        } catch (e) { /* ignore */ }

        if (onCountdown) onCountdown(formatRemaining(remaining));
        if (onPhase) {
          onPhase(
            phase === 'ocean'
              ? '🌊 Fase marítima · baleia no oceano (' + formatProgressPct(progress) + ')'
              : '🏙️ Fase terrestre · ' + landEmoji + ' em terra (' + formatProgressPct(progress) + ')'
          );
        }
        if (onStatus) onStatus(mapStatusForProgress(orderType, progress, phase));
      }

      tick();
      container._trackingIv = setInterval(tick, 1000);
    });
  }

  function runExpressTracking(statusEl, order, onComplete) {
    var steps = [
      { pct: 0, text: '🏝️ Pedido saiu de Fiji' },
      { pct: 0.1, text: 'Restaurante confirmou o pedido' },
      { pct: 0.3, text: '🐋 Baleia em rota marítima (somente água)' },
      { pct: OCEAN_TIME_SHARE, text: '🏖️ Desembarque no Brasil — entrega em terra' },
      { pct: 0.85, text: '🛵 Entregador a caminho do endereço' },
      { pct: 1, text: '✅ Pedido entregue — dentro de 1 hora' },
    ];

    var shown = {};
    var list = document.createElement('div');
    list.className = 'tracking-timeline';
    statusEl.innerHTML = '';
    statusEl.appendChild(list);

    if (statusEl._expressIv) clearInterval(statusEl._expressIv);

    function tick() {
      var p = getOrderProgress(order);
      steps.forEach(function (step, i) {
        if (p >= step.pct && !shown[i]) {
          shown[i] = true;
          var item = document.createElement('div');
          item.className = 'timeline-item active';
          item.innerHTML = '<span class="timeline-dot"></span><span>' + step.text + '</span>';
          list.appendChild(item);
          if (i === steps.length - 1 && onComplete) onComplete();
        }
      });
      if (p >= 1 && statusEl._expressIv) {
        clearInterval(statusEl._expressIv);
        statusEl._expressIv = null;
      }
    }

    tick();
    statusEl._expressIv = setInterval(tick, 2000);
  }

  /* ── app.js ── */
  let currentTab = 'express';
  let currentView = 'shop';
  const IFOOD = window.DOPAMINA_IFOOD || {};
  let ifoodCategory = 'all';
  let ifoodRestaurantId = null;
  let ifoodRestaurantTab = 'menu';
  let ifoodSearch = '';
  let shenimFilter = 'all';

  function $(sel) {
    return document.querySelector(sel);
  }

  function $$(sel) {
    return document.querySelectorAll(sel);
  }

  function cartTotal(cart) {
    return cart.reduce(function (sum, item) {
      const p = getProduct(item.id);
      return sum + (p ? p.price : 0) * item.qty;
    }, 0);
  }

  function applyCoupon(subtotal, coupon) {
    if (!coupon) return { total: subtotal, discount: 0, freeShipping: false };
    let discount = 0;
    let freeShipping = false;
    if (coupon.type === 'percent') discount = subtotal * coupon.discount;
    if (coupon.type === 'bonus') discount = Math.min(coupon.discount, subtotal);
    if (coupon.type === 'shipping') freeShipping = true;
    return { total: Math.max(0, subtotal - discount), discount: discount, freeShipping: freeShipping };
  }

  function updateHeader() {
    const cart = loadCart();
    const count = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var bal = $('#wallet-balance');
    if (bal) bal.textContent = formatBRL(loadWallet());
    $('#cart-count').textContent = count;
    $('#cart-count').hidden = count === 0;
    var ic = $('#aifood-cart-count');
    if (ic) { ic.textContent = count; ic.hidden = count === 0; }
    var ac = $('#amazoom-cart-count');
    if (ac) { ac.textContent = count; ac.hidden = count === 0; }
  }

  var TAB_LABELS = { express: 'AIFOOD', premium: 'AMAZOOM', fashion: 'SHENIM' };

  function renderHubTabs() {
    return '<div class="shop-hub"><div class="shop-hub-tabs">' +
      ['express', 'premium', 'fashion'].map(function (tab) {
        return '<button type="button" class="shop-hub-tab shop-hub-tab--' + tab + (currentTab === tab ? ' active' : '') + '" data-tab="' + tab + '">' + TAB_LABELS[tab] + '</button>';
      }).join('') +
      '</div></div>';
  }

  function bindHubTabs(zone) {
    zone.querySelectorAll('[data-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentTab = btn.dataset.tab;
        ifoodRestaurantId = null;
        applyShopTheme();
        renderShop();
        if (currentTab === 'fashion' && !localStorage.getItem(KEYS.shenimCoupons)) {
          setTimeout(function () { openCouponSheet(); }, 700);
        }
      });
    });
  }

  function calcCartTotals(cart, coupon) {
    const subtotal = cartTotal(cart);
    const { total, discount, freeShipping } = applyCoupon(subtotal, coupon);
    const hasFood = cart.some(function (i) { return isExpress(i.id); });
    const hasRetail = cart.some(function (i) { return isRetail(i.id); });
    var shipping = 0;
    if (hasFood && !freeShipping) shipping += subtotal > 80 ? 0 : 8.99;
    if (hasRetail && !freeShipping) shipping += subtotal > 200 ? 0 : 14.9;
    if (freeShipping) shipping = 0;
    var service = hasFood ? SERVICE_FEE : 0;
    return { subtotal: subtotal, discount: discount, shipping: shipping, service: service, total: total + shipping + service };
  }

  function starsHtml(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let s = '';
    for (let i = 0; i < 5; i++) {
      if (i < full) s += '★';
      else if (i === full && half) s += '½';
      else s += '☆';
    }
    return s;
  }

  function updateAppChrome(view) {
    var tabChromeViews = ['shop', 'cart', 'profile'];
    var showAifoodChrome = currentTab === 'express' && tabChromeViews.indexOf(view) >= 0;
    var showShenimChrome = currentTab === 'fashion' && tabChromeViews.indexOf(view) >= 0;
    var showMainHeader = !showAifoodChrome && !showShenimChrome;
    var mainH = $('#main-header');
    var ifoodNav = $('#ifood-bottom-nav');
    var shenimNav = $('#shenim-bottom-nav');
    if (mainH) mainH.hidden = !showMainHeader;
    if (ifoodNav) ifoodNav.hidden = !showAifoodChrome;
    if (shenimNav) shenimNav.hidden = !showShenimChrome;
    document.body.classList.toggle('has-ifood-nav', showAifoodChrome);
    document.body.classList.toggle('has-shenim-nav', showShenimChrome);
    document.body.classList.toggle(
      'flow-checkout',
      ['cart', 'checkout', 'tracking', 'profile'].indexOf(view) >= 0
    );
    var pd = $('#profile-dot');
    if (pd) pd.hidden = loadOrders().length === 0;
  }

  function applyShopTheme() {
    document.body.classList.remove('theme-express', 'theme-premium', 'theme-fashion');
    var theme = currentTab === 'express' ? 'theme-express' : currentTab === 'fashion' ? 'theme-fashion' : 'theme-premium';
    document.body.classList.add(theme);
    const shell = $('#shop-shell');
    if (shell) shell.className = 'shop-shell ' + theme;
    updateAppChrome(currentView);
  }

  function renderReviewsHtml(reviews) {
    return (reviews || []).map(function (r) {
      var cls = r.stars >= 4 ? 'review-good' : r.stars <= 2 ? 'review-bad' : 'review-mid';
      return (
        '<div class="review-card ' + cls + '">' +
        '<div class="review-header"><strong>' + r.user + '</strong><span class="stars-row">' + starsHtml(r.stars) + '</span>' +
        (r.verified ? '<span class="review-verified">✓ Pedido verificado</span>' : '') + '</div>' +
        '<p class="review-text">' + r.text + '</p><p class="review-date">' + r.date + '</p></div>'
      );
    }).join('');
  }


  function renderShopHeader() {
    const zone = $('#shop-header-zone');
    if (!zone) return;

    var hub = renderHubTabs();

    if (currentTab === 'express') {
      var backBtn = ifoodRestaurantId ? '<button type="button" class="ifood-back" id="ifood-back">← Voltar</button>' : '';
      var cats = (IFOOD.categories || []).map(function (c) {
        return '<button type="button" class="ifood-cat' + (ifoodCategory === c.id && !ifoodRestaurantId ? ' active' : '') + '" data-cat="' + c.id + '"><span class="ifood-cat-icon">' + c.icon + '</span><span>' + c.label + '</span></button>';
      }).join('');
      var cartHidden = loadCart().length === 0 ? ' hidden' : '';

      zone.innerHTML = hub +
        '<div class="aifood-shell">' +
        '<div class="aifood-top-bar">' +
        '<div class="aifood-top-row">' +
        '<span class="aifood-logo">AI<span>FOOD</span></span>' +
        '<button type="button" class="aifood-addr-chip">📍 ' + (UI.ADDR || 'Rua Augusta, 1200') + ' <span class="aifood-chevron">›</span></button>' +
        '<button type="button" class="aifood-top-cart nav-link" data-view="cart">🛒 <span id="aifood-cart-count" class="cart-count"' + cartHidden + '>' + loadCart().reduce(function (s, i) { return s + i.qty; }, 0) + '</span></button>' +
        '</div></div>' +
        '<div class="aifood-greeting-row">' +
        '<div><strong>' + (UI.getGreeting ? UI.getGreeting() : 'Olá!') + '</strong>' +
        '<small>📍 ' + (UI.ADDR || 'Sua região') + '</small></div>' +
        '<div class="aifood-header-actions">' +
        '<button type="button" class="aifood-icon-btn" title="Clube">💎</button>' +
        '<button type="button" class="aifood-icon-btn" title="Notificações">🔔<span class="notif-badge">9+</span></button>' +
        '</div></div>' +
        '<div class="ifood-app">' + backBtn +
        '<div class="ifood-search-wrap"><span class="ifood-search-icon">🔍</span><input type="search" class="ifood-search-input" placeholder="Buscar restaurante ou prato…" id="shop-search" value="' + (ifoodSearch || '') + '" /></div>' +
        (ifoodRestaurantId ? '' : '<div class="ifood-categories">' + cats + '</div>') +
        '</div></div>';
    } else if (currentTab === 'premium') {
      zone.innerHTML = hub +
        '<div class="amazoom-top"><div class="amazoom-top-inner">' +
        '<div class="amazoom-logo">AMAZ<span>OOM</span></div>' +
        '<div class="amazoom-loc">📍 Enviar para <strong>' + (UI.USER_NAME || 'Você') + '</strong> · Campinas</div>' +
        '<div class="amazon-search-bar"><input type="search" placeholder="Buscar na AMAZOOM" id="shop-search" /><button type="button">🔍</button></div>' +
        '<button type="button" class="amazoom-cart nav-link" data-view="cart">🛒 <span id="amazoom-cart-count" class="cart-count"' + (loadCart().length ? '' : ' hidden') + '>' + loadCart().reduce(function (s, i) { return s + i.qty; }, 0) + '</span></button>' +
        '</div></div>' +
        '<div class="amazoom-subnav">' +
        '<a href="#">☰ Todos</a><a href="#">Ofertas do Dia</a><a href="#">Prime</a>' +
        '<a href="#" data-action-link="roulette">Cupons</a><a href="#">Mais Vendidos</a><a href="#">Eletrônicos</a>' +
        '</div>';
    } else {
      var shenimChips = [
        { id: 'all', label: 'Tudo' },
        { id: 'Feminino', label: 'Feminino' },
        { id: 'Masculino', label: 'Masculino' },
        { id: 'Calçados', label: 'Calçados' },
        { id: 'Acessórios', label: 'Acessórios' },
      ].map(function (c) {
        return '<button type="button" class="shenim-chip' + (shenimFilter === c.id ? ' active' : '') + '" data-sfilter="' + c.id + '">' + c.label + '</button>';
      }).join('');

      zone.innerHTML = hub +
        '<div class="shenim-top">' +
        '<div class="shenim-top-row"><div class="shenim-logo">SHE<span>NIM</span></div>' +
        '<button type="button" class="shenim-cart-btn nav-link" data-view="cart">🛒</button></div>' +
        '<div class="shenim-search-wrap"><span>🔍</span><input type="search" id="shop-search" placeholder="Buscar moda, tendências, looks…" value="' + (ifoodSearch || '') + '" /></div>' +
        '<div class="shenim-chips">' + shenimChips + '</div>' +
        '</div>';
    }

    bindHubTabs(zone);

    var searchEl = $('#shop-search');
    if (searchEl) {
      searchEl.addEventListener('input', function () {
        ifoodSearch = searchEl.value;
        if (currentTab === 'express' && !ifoodRestaurantId) renderExpressHome();
        if (currentTab === 'fashion') renderShenimProducts();
      });
    }
    var backEl = $('#ifood-back');
    if (backEl) backEl.onclick = function () { ifoodRestaurantId = null; ifoodRestaurantTab = 'menu'; renderShop(); };
    zone.querySelectorAll('[data-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () { ifoodCategory = btn.dataset.cat; ifoodRestaurantId = null; renderShop(); });
    });
    zone.querySelectorAll('[data-action-link="roulette"]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); triggerRoulette('premium'); });
    });
    zone.querySelectorAll('[data-sfilter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        shenimFilter = btn.dataset.sfilter;
        zone.querySelectorAll('[data-sfilter]').forEach(function (b) {
          b.classList.toggle('active', b.dataset.sfilter === shenimFilter);
        });
        renderShenimProducts();
      });
    });
  }

  function renderRestaurantCard(r) {
    var feeClass = r.fee === 'Grátis' ? 'free' : '';
    var badge = r.badge ? '<span class="ifood-rest-badge ifood-rest-badge--' + r.badge.toLowerCase() + '">' + r.badge + '</span>' : '';
    return '<article class="ifood-rest-card" data-restaurant="' + r.id + '"><div class="ifood-rest-cover-wrap"><img class="ifood-rest-cover" src="' + r.cover + '" alt="' + r.shop + '" loading="lazy" />' + badge + '</div><div class="ifood-rest-body"><img class="ifood-rest-logo" src="' + r.logo + '" alt="" /><div class="ifood-rest-info"><h3>' + r.shop + '</h3><div class="ifood-stars"><span class="star">' + starsHtml(r.rating) + '</span> <strong>' + r.rating + '</strong> <span class="count">(' + r.reviews + ')</span></div><p class="ifood-rest-tags">' + r.tags.join(' · ') + '</p><div class="ifood-meta"><span>🕐 ' + r.delivery + '</span><span class="' + feeClass + '">🛵 ' + r.fee + '</span><span>· Mín. ' + formatBRL(r.minOrder) + '</span></div></div></div></article>';
  }

  function renderExpressHome() {
    var grid = $('#product-grid');
    grid.className = 'ifood-home';
    var list = IFOOD.getRestaurants ? IFOOD.getRestaurants(ifoodCategory, ifoodSearch) : [];
    var catLabel = (IFOOD.categories || []).find(function (c) { return c.id === ifoodCategory; });
    var title = ifoodCategory === 'all' ? 'Restaurantes perto de você' : (catLabel ? catLabel.label : 'Restaurantes');
    var extras = '';
    if (UI.aifoodHero) extras += UI.aifoodHero();
    if (UI.aifoodMicroPromo) extras += UI.aifoodMicroPromo();
    if (UI.stampsBar) extras += UI.stampsBar();
    if (UI.serviceGrid) extras += UI.serviceGrid();
    if (UI.carouselHtml) extras += UI.carouselHtml();
    grid.innerHTML = extras +
      '<h2 class="ifood-section-title">' + title + ' <span class="ifood-count">' + list.length + ' lojas</span></h2>' +
      '<div class="ifood-rest-list">' + list.map(renderRestaurantCard).join('') + '</div>';
    bindPromoArea(grid);
    grid.querySelectorAll('[data-restaurant]').forEach(function (el) {
      el.addEventListener('click', function () { ifoodRestaurantId = el.dataset.restaurant; ifoodRestaurantTab = 'menu'; renderShop(); window.scrollTo(0, 0); });
    });
  }

  function renderExpressRestaurant(restaurantId) {
    var grid = $('#product-grid');
    var r = IFOOD.getRestaurant ? IFOOD.getRestaurant(restaurantId) : null;
    if (!r) { ifoodRestaurantId = null; renderExpressHome(); return; }
    var dishes = IFOOD.getDishesByRestaurant ? IFOOD.getDishesByRestaurant(restaurantId, CATALOG.express) : [];
    grid.className = 'ifood-restaurant-page';
    var menuTab = ifoodRestaurantTab === 'menu';
    var reviewsTab = ifoodRestaurantTab === 'reviews';
    var aboutTab = ifoodRestaurantTab === 'about';
    var menuHtml = dishes.map(function (p) {
      return '<article class="ifood-dish" data-open="' + p.id + '"><img class="ifood-dish-img" src="' + p.image + '" alt="' + p.name + '" loading="lazy" /><div class="ifood-dish-body">' + (p.tag ? '<span class="ifood-tag">' + p.tag + '</span>' : '') + '<h3>' + p.name + '</h3><p class="ifood-dish-desc">' + p.desc + '</p><div class="ifood-stars"><span class="star">' + starsHtml(p.rating) + '</span> <span class="count">(' + p.reviews + ')</span></div><div class="ifood-dish-footer"><span class="ifood-price">' + formatBRL(p.price) + '</span><button type="button" class="ifood-add" data-add="' + p.id + '">Adicionar</button></div></div></article>';
    }).join('');
    grid.innerHTML = '<div class="ifood-rest-hero"><img class="ifood-rest-hero-cover" src="' + r.cover + '" alt="" /><div class="ifood-rest-hero-info"><img class="ifood-rest-hero-logo" src="' + r.logo + '" alt="" /><div><h2>' + r.shop + '</h2><div class="ifood-stars"><span class="star">' + starsHtml(r.rating) + '</span> <strong>' + r.rating + '</strong> <span class="count"> · ' + r.reviews + ' avaliações</span></div><div class="ifood-meta"><span>🕐 ' + r.delivery + '</span><span class="' + (r.fee === 'Grátis' ? 'free' : '') + '">🛵 ' + r.fee + '</span><span>· Mín. ' + formatBRL(r.minOrder) + '</span></div><p class="ifood-rest-hero-tags">' + r.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</p></div></div></div>' +
      '<div class="ifood-rest-tabs"><button type="button" class="ifood-rest-tab' + (menuTab ? ' active' : '') + '" data-rtab="menu">Cardápio</button><button type="button" class="ifood-rest-tab' + (aboutTab ? ' active' : '') + '" data-rtab="about">Sobre</button><button type="button" class="ifood-rest-tab' + (reviewsTab ? ' active' : '') + '" data-rtab="reviews">Avaliações (' + r.reviews + ')</button></div>' +
      '<div class="ifood-rest-content">' + (menuTab ? '<div class="ifood-list">' + menuHtml + '</div>' : '') + (aboutTab ? '<div class="ifood-about"><p><strong>' + r.shop + '</strong> — restaurante parceiro.</p><p>Especialidade em ' + r.vibe + '.</p></div>' : '') + (reviewsTab ? '<div class="ifood-reviews-summary"><div class="ifood-big-rating">' + r.rating + '</div><div><div class="stars-row">' + starsHtml(r.rating) + '</div><p>' + r.reviews + ' avaliações de clientes</p></div></div><div class="ifood-reviews-list">' + renderReviewsHtml(r.reviewList) + '</div>' : '') + '</div>';
    grid.querySelectorAll('[data-rtab]').forEach(function (btn) { btn.addEventListener('click', function () { ifoodRestaurantTab = btn.dataset.rtab; renderExpressRestaurant(restaurantId); }); });
    grid.querySelectorAll('[data-add]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); addToCart(btn.dataset.add); }); });
    grid.querySelectorAll('[data-open]').forEach(function (el) { el.addEventListener('click', function (e) { if (e.target.closest('[data-add]')) return; openProductModal(el.dataset.open); }); });
  }

  function renderShenimProducts() {
    var grid = $('#product-grid');
    var items = (CATALOG.fashion || []).filter(function (p) {
      if (shenimFilter === 'all') return true;
      return p.tag === shenimFilter || (p.tag && p.tag.indexOf(shenimFilter) >= 0);
    });
    if (ifoodSearch) {
      var q = ifoodSearch.toLowerCase();
      items = items.filter(function (p) {
        return p.name.toLowerCase().indexOf(q) >= 0 || (p.tag && p.tag.toLowerCase().indexOf(q) >= 0);
      });
    }
    grid.className = 'shenim-home';
    var heroBlock = (UI.shenimHero ? UI.shenimHero() : '') + (UI.shenimCategories ? UI.shenimCategories() : '');
    var gridInner = items.map(function (p) {
      var pct = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      return '<article class="shenim-card" data-open="' + p.id + '">' +
        '<div class="shenim-card-img-wrap">' +
        (pct > 0 ? '<span class="shenim-sale">−' + pct + '%</span>' : '') +
        '<img class="shenim-card-img" src="' + p.image + '" alt="' + p.name + '" loading="lazy" /></div>' +
        '<h3>' + p.name + '</h3>' +
        '<div class="shenim-stars"><span class="star">' + starsHtml(p.rating) + '</span> <span>(' + p.reviews + ')</span></div>' +
        '<div class="shenim-price-row"><span class="shenim-price">' + formatBRL(p.price) + '</span>' +
        (p.oldPrice ? '<span class="shenim-old">' + formatBRL(p.oldPrice) + '</span>' : '') + '</div>' +
        '<button type="button" class="shenim-add-btn" data-add="' + p.id + '">Adicionar</button></article>';
    }).join('');
    grid.innerHTML = heroBlock + '<div class="shenim-grid">' + gridInner + '</div>';
    bindPromoArea(grid);
    grid.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function (e) { e.stopPropagation(); addToCart(btn.dataset.add); });
    });
    grid.querySelectorAll('[data-open]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.target.closest('[data-add]')) return;
        openProductModal(el.dataset.open);
      });
    });
  }

  function renderAmazonProducts() {
    var grid = $('#product-grid');
    var items = CATALOG.premium || [];
    var homeBlocks = UI.amazoomHomeBlocks ? UI.amazoomHomeBlocks() : '';
    var cardsHtml = items.map(function (p) {
      return '<article class="amazon-card" data-open="' + p.id + '"><img class="amazon-card-img" src="' + p.image + '" alt="' + p.name + '" loading="lazy" />' + (p.prime ? '<span class="amazon-prime">prime</span>' : '') + '<h3>' + p.name + '</h3><div class="amazon-stars"><span class="star">' + starsHtml(p.rating) + '</span> <a href="#">' + p.reviews + ' avaliações</a></div><div class="amazon-price-block"><div class="amazon-price">' + formatBRL(p.price) + '</div>' + (p.oldPrice ? '<div class="amazon-old-price">De: ' + formatBRL(p.oldPrice) + '</div>' : '') + '</div><button type="button" class="amazon-add-btn" data-add="' + p.id + '">Adicionar ao carrinho</button></article>';
    }).join('');
    grid.className = 'amazoom-home';
    grid.innerHTML = homeBlocks + '<div class="amazon-grid">' + cardsHtml + '</div>';
    bindPromoArea(grid);
    grid.querySelectorAll('[data-add]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); addToCart(btn.dataset.add); }); });
    grid.querySelectorAll('[data-open]').forEach(function (el) { el.addEventListener('click', function (e) { if (e.target.closest('[data-add]')) return; openProductModal(el.dataset.open); }); });
  }

  function renderProducts() {
    applyShopTheme();
    renderShopHeader();
    if (currentTab === 'express') {
      if (ifoodRestaurantId) renderExpressRestaurant(ifoodRestaurantId);
      else renderExpressHome();
    } else if (currentTab === 'fashion') {
      renderShenimProducts();
    } else {
      renderAmazonProducts();
    }
  }

  function renderShop() {
    renderProducts();
  }

  function openProductModal(id) {
    const p = getProduct(id);
    if (!p) return;
    const modal = $('#product-modal');
    const panel = $('#product-modal-panel');
    const express = isExpress(id);

    if (express) {
      var rest = IFOOD.getRestaurant && p.restaurantId ? IFOOD.getRestaurant(p.restaurantId) : null;
      panel.innerHTML =
        '<button type="button" class="modal-close" id="modal-close-btn">✕</button>' +
        '<img class="detail-ifood-img" src="' + p.image + '" alt="' + p.name + '" />' +
        '<div class="detail-ifood-body">' +
        '<span class="ifood-tag">' + p.tag + '</span>' +
        '<h2>' + p.name + '</h2>' +
        '<p class="ifood-dish-shop">' + (rest ? '<a href="#" id="modal-goto-rest">' + rest.shop + '</a>' : p.shop) + ' · 🕐 ' + p.delivery + '</p>' +
        '<div class="ifood-stars"><span class="stars-row">' + starsHtml(p.rating) + '</span> <strong>' + p.rating + '</strong> (' + p.reviews + ' avaliações do prato)</div>' +
        '<p style="margin-top:12px;color:var(--shop-muted)">' + p.desc + '</p>' +
        '<div class="detail-section"><h4>Ingredientes</h4><div class="ingredients-list">' +
        (p.ingredients || []).map(function (ing) { return '<span class="ingredient-chip">' + ing + '</span>'; }).join('') +
        '</div></div>' +
        '<div class="detail-section"><h4>O que dizem sobre este prato</h4>' +
        renderReviewsHtml(p.reviewList) +
        (rest ? '<div class="detail-section"><h4>Avaliações do restaurante · ' + rest.shop + '</h4>' + renderReviewsHtml(rest.reviewList) + '</div>' : '') +
        '</div>' +
        '<div class="detail-sticky-bar"><span class="ifood-price">' + formatBRL(p.price) + '</span>' +
        '<button type="button" class="btn-add-large" data-add="' + p.id + '">Adicionar ao pedido</button></div>';
      var gotoRest = $('#modal-goto-rest');
      if (gotoRest && p.restaurantId) {
        gotoRest.onclick = function (e) {
          e.preventDefault();
          closeProductModal();
          ifoodRestaurantId = p.restaurantId;
          ifoodRestaurantTab = 'reviews';
          showView('shop');
        };
      }
    } else if (isFashion(id)) {
      var sizesHtml = (p.sizes || []).map(function (s) {
        return '<button type="button" class="shenim-size">' + s + '</button>';
      }).join('');
      panel.innerHTML =
        '<button type="button" class="modal-close" id="modal-close-btn">✕</button>' +
        '<div class="detail-shenim">' +
        '<img class="detail-shenim-img" src="' + p.image + '" alt="' + p.name + '" />' +
        '<div class="detail-shenim-body">' +
        '<span class="shenim-tag">' + p.tag + '</span>' +
        '<h2>' + p.name + '</h2>' +
        '<div class="shenim-stars"><span class="stars-row">' + starsHtml(p.rating) + '</span> (' + p.reviews + ' avaliações)</div>' +
        '<p class="detail-shenim-desc">' + p.desc + '</p>' +
        '<div class="shenim-price-row"><span class="shenim-price">' + formatBRL(p.price) + '</span>' +
        (p.oldPrice ? '<span class="shenim-old">' + formatBRL(p.oldPrice) + '</span>' : '') + '</div>' +
        '<div class="detail-section"><h4>Tamanho</h4><div class="shenim-sizes">' + sizesHtml + '</div></div>' +
        '<div class="detail-section"><h4>Avaliações</h4>' +
        (p.reviewList || []).map(function (r) {
          return '<div class="review-card"><div class="review-header"><strong>' + r.user + '</strong><span class="stars-row">' + starsHtml(r.stars) + '</span></div>' +
            '<p class="review-text">' + r.text + '</p><p class="review-date">' + r.date + '</p></div>';
        }).join('') +
        '</div>' +
        '<div class="detail-sticky-bar"><button type="button" class="shenim-add-btn btn-add-large" data-add="' + p.id + '">Adicionar à sacola</button></div>' +
        '</div></div>';
    } else {
      panel.innerHTML =
        '<button type="button" class="modal-close" id="modal-close-btn">✕</button>' +
        '<div class="detail-amazon">' +
        '<div><img class="detail-amazon-img" src="' + p.image + '" alt="' + p.name + '" /></div>' +
        '<div>' +
        '<h2>' + p.name + '</h2>' +
        '<div class="amazon-stars"><span class="stars-row">' + starsHtml(p.rating) + '</span> <a href="#">' + p.reviews + ' avaliações globais</a></div>' +
        '<p style="margin:12px 0;color:var(--shop-muted)">' + p.desc + '</p>' +
        '<div class="detail-amazon-buybox">' +
        (p.prime ? '<span class="amazon-prime">✓ Entrega GRÁTIS Prime</span><br><br>' : '') +
        '<div class="amazon-price">' + formatBRL(p.price) + '</div>' +
        (p.oldPrice ? '<div class="amazon-old-price">Preço de tabela: ' + formatBRL(p.oldPrice) + '</div>' : '') +
        '<p style="font-size:0.85rem;color:var(--shop-green);margin-top:8px">Em estoque</p>' +
        '<button type="button" class="amazon-add-btn" style="margin-top:12px" data-add="' + p.id + '">Adicionar ao carrinho</button>' +
        '</div>' +
        '<div class="detail-section"><h4>Especificações</h4><ul class="specs-list">' +
        (p.specs || []).map(function (s) { return '<li>' + s + '</li>'; }).join('') +
        '</ul></div>' +
        '<div class="detail-section"><h4>Comentários de clientes</h4>' +
        (p.reviewList || []).map(function (r) {
          return '<div class="review-card"><div class="review-header"><strong>' + r.user + '</strong><span class="stars-row">' + starsHtml(r.stars) + '</span></div>' +
            '<p class="amazon-review-title">' + r.title + '</p><p class="review-text">' + r.text + '</p>' +
            '<p class="review-date">' + r.date + '</p><p class="amazon-helpful">' + r.helpful + ' pessoas acharam útil</p></div>';
        }).join('') +
        '</div></div></div>';
    }

    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    $('#modal-close-btn').onclick = closeProductModal;
    $('#product-modal-backdrop').onclick = closeProductModal;
    panel.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.onclick = function () {
        addToCart(btn.dataset.add);
        closeProductModal();
      };
    });
  }

  function closeProductModal() {
    const modal = $('#product-modal');
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  }

  function addToCart(id) {
    const cart = loadCart();
    const existing = cart.find(function (i) {
      return i.id === id;
    });
    if (existing) existing.qty += 1;
    else cart.push({ id: id, qty: 1 });
    saveCart(cart);
    updateHeader();
    flashToast('Adicionado à sacola');
    if (currentView === 'cart') renderCart();
  }

  function flashToast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () {
      t.classList.remove('show');
    }, 2200);
  }

  function showView(view) {
    currentView = view;
    $$('.view').forEach(function (v) {
      v.classList.remove('active');
    });
    const viewEl = $('#view-' + view);
    if (viewEl) viewEl.classList.add('active');
    $$('.nav-link').forEach(function (l) {
      l.classList.toggle('active', l.dataset.view === view);
    });

    updateAppChrome(view);

    if (view === 'shop') renderShop();
    if (view === 'cart') renderCart();
    if (view === 'profile') renderProfile();
    if (view === 'checkout') {
      renderCheckoutSummary();
      prefillCheckout();
    }

    $$('.ifood-nav-item').forEach(function (n) {
      n.classList.toggle('active', n.dataset.view === view);
    });

    window.scrollTo(0, 0);
  }

  function renderCheckoutSummary() {
    var box = $('#checkout-total-box');
    if (!box) return;
    var cart = loadCart();
    var t = calcCartTotals(cart, loadCoupon());
    box.innerHTML = '<div class="summary-row"><span>Subtotal</span><span>' + formatBRL(t.subtotal) + '</span></div>' +
      (t.discount > 0 ? '<div class="summary-row"><span>Desconto</span><span>−' + formatBRL(t.discount) + '</span></div>' : '') +
      '<div class="summary-row"><span>Entrega</span><span>' + (t.shipping === 0 ? 'Grátis' : formatBRL(t.shipping)) + '</span></div>' +
      (t.service > 0 ? '<div class="summary-row"><span>Taxa de serviço</span><span>' + formatBRL(t.service) + '</span></div>' : '') +
      '<div class="summary-row total"><span>Total do pedido</span><span>' + formatBRL(t.total) + '</span></div>';
    var btn = $('#checkout-submit-btn');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Fazer pedido · ' + formatBRL(t.total);
    }
  }

  function renderCart() {
    const cart = loadCart();
    const coupon = loadCoupon();
    const t = calcCartTotals(cart, coupon);

    const list = $('#cart-list');
    if (!cart.length) {
      list.innerHTML = '<p class="empty">Sua sacola está vazia.</p>';
      $('#cart-summary').hidden = true;
      return;
    }

    list.innerHTML = cart
      .map(function (item) {
        const p = getProduct(item.id);
        if (!p) return '';
        return (
          '<div class="cart-item">' +
          '<img class="cart-item-img" src="' + (p.image || '') + '" alt="" />' +
          '<div class="cart-info">' +
          '<strong>' + p.name + '</strong>' +
          '<span class="cart-shop">' + (p.shop || '') + '</span>' +
          '<span>' + formatBRL(p.price) + ' × ' + item.qty + '</span>' +
          '</div>' +
          '<div class="cart-qty">' +
          '<button type="button" data-qty="' + item.id + '" data-delta="-1">−</button>' +
          '<span>' + item.qty + '</span>' +
          '<button type="button" data-qty="' + item.id + '" data-delta="1">+</button>' +
          '</div>' +
          '<button type="button" class="cart-remove" data-remove="' + item.id + '">✕</button>' +
          '</div>'
        );
      })
      .join('');

    list.querySelectorAll('[data-qty]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        changeQty(btn.dataset.qty, parseInt(btn.dataset.delta, 10));
      });
    });
    list.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(btn.dataset.remove);
      });
    });

    $('#cart-summary').hidden = false;
    $('#cart-subtotal').textContent = formatBRL(t.subtotal);
    $('#cart-discount').textContent = t.discount > 0 ? '−' + formatBRL(t.discount) : '—';
    $('#cart-shipping').textContent = t.shipping === 0 ? 'Grátis' : formatBRL(t.shipping);
    var svc = $('#cart-service');
    if (svc) svc.textContent = t.service > 0 ? formatBRL(t.service) : '—';
    $('#cart-total').textContent = formatBRL(t.total);
  }

  function changeQty(id, delta) {
    let cart = loadCart();
    const item = cart.find(function (i) {
      return i.id === id;
    });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(function (i) {
      return i.id !== id;
    });
    saveCart(cart);
    updateHeader();
    renderCart();
  }

  function removeFromCart(id) {
    saveCart(
      loadCart().filter(function (i) {
        return i.id !== id;
      })
    );
    updateHeader();
    renderCart();
  }

  function renderProfile() {
    const savings = loadSavings();
    const orders = loadOrders();
    const totalSaved = Object.values(savings).reduce(function (a, b) {
      return a + b;
    }, 0);
    const days = Object.keys(savings).sort().slice(-7);

    $('#profile-saved').textContent = formatBRL(totalSaved);
    $('#profile-orders').textContent = orders.length;

    const chart = $('#savings-chart');
    var stampsHtml = UI.stampsBar ? UI.stampsBar() : '';
    if (!days.length) {
      chart.innerHTML = stampsHtml + '<p class="empty">Nenhum pedido ainda. Explore o AIFOOD, AMAZOOM ou SHENIM!</p>';
      return;
    }

    const max = Math.max.apply(
      null,
      days.map(function (d) {
        return savings[d];
      }).concat([1])
    );
    chart.innerHTML = stampsHtml + days
      .map(function (d) {
        const h = Math.round((savings[d] / max) * 100);
        const label = d.slice(5).replace('-', '/');
        return (
          '<div class="bar-wrap">' +
          '<div class="bar" style="height:' + h + '%"></div>' +
          '<span>' + label + '</span>' +
          '<small>' + formatBRL(savings[d]) + '</small>' +
          '</div>'
        );
      })
      .join('');
  }

  function processCheckout(e) {
    e.preventDefault();
    const cart = loadCart();
    if (!cart.length) return;

    const address = $('#checkout-address').value.trim();
    const name = $('#checkout-name').value.trim();
    if (!address || !name) {
      flashToast('Preencha nome e endereço!');
      return;
    }

    const t = calcCartTotals(cart, loadCoupon());
    const finalTotal = t.total;
    const complement = $('#checkout-complement') ? $('#checkout-complement').value.trim() : '';
    const fullAddress = complement ? address + ' — ' + complement : address;

    saveWallet();
    addSavings(finalTotal);
    if (UI.addStamp) UI.addStamp(1);

    const hasExpress = cart.some(function (i) { return isExpress(i.id); });
    const hasPremium = cart.some(function (i) { return i.id.charAt(0) === 'p'; });
    const hasFashion = cart.some(function (i) { return isFashion(i.id); });
    var types = [];
    if (hasExpress) types.push('express');
    if (hasPremium) types.push('premium');
    if (hasFashion) types.push('fashion');
    const orderType = types.length > 1 ? 'mixed' : (types[0] || 'premium');

    var prefixMap = { express: 'AFD', premium: 'AMZ', fashion: 'SHN', mixed: 'PED' };
    const orderPrefix = prefixMap[orderType] || 'PED';
    const order = {
      id: orderPrefix + '-' + Date.now().toString(36).toUpperCase().slice(-8),
      items: cart.slice(),
      total: finalTotal,
      address: fullAddress,
      name: name,
      type: orderType,
      createdAt: new Date().toISOString(),
      deliveryDurationMs: getDeliveryDurationMs(orderType),
      deliverAt: new Date(Date.now() + getDeliveryDurationMs(orderType)).toISOString(),
    };

    const orders = loadOrders();
    orders.unshift(order);
    saveOrders(orders);
    saveCart([]);
    updateHeader();

    showTracking(order);
  }

  function showTracking(order) {
    showView('tracking');
    $('#tracking-order-id').textContent = order.id;
    $('#tracking-address').textContent = order.address;

    const mapEl = $('#tracking-map');
    const expressEl = $('#tracking-express');
    const statusEl = $('#tracking-status');
    const expressTitle = $('#tracking-express-title');
    const mapTitle = $('#tracking-map-title');
    const etaEl = $('#tracking-eta');
    const countdownEl = $('#tracking-countdown');
    const phaseEl = $('#tracking-phase');
    const meta = getDeliveryMeta(order.type);

    if (!mapEl || !expressEl || !statusEl) return;

    stopLiveTracking(mapEl);
    mapEl.innerHTML = '';
    expressEl.innerHTML = '';
    if (expressEl._expressIv) {
      clearInterval(expressEl._expressIv);
      expressEl._expressIv = null;
    }
    if (mapEl._leaflet_map) {
      try { mapEl._leaflet_map.remove(); } catch (err) { /* ignore */ }
      mapEl._leaflet_map = null;
    }

    expressEl.hidden = true;
    if (expressTitle) expressTitle.hidden = true;
    mapEl.hidden = false;
    if (mapTitle) {
      mapTitle.hidden = false;
      mapTitle.textContent = 'Rastreamento · partida Fiji';
    }
    if (etaEl) etaEl.textContent = meta.eta;
    if (countdownEl) countdownEl.textContent = formatRemaining(getOrderDeliveryEnd(order) - Date.now());
    if (phaseEl) phaseEl.textContent = '';

    statusEl.textContent = 'Confirmando pagamento…';

    setTimeout(function () {
      statusEl.textContent = 'Pagamento aprovado. Rastreio em tempo real ativado.';

      if (order.type === 'express' || order.type === 'mixed') {
        expressEl.hidden = false;
        if (expressTitle) {
          expressTitle.hidden = false;
          expressTitle.textContent = 'Entrega rápida · AIFOOD (até 1 hora)';
        }
        runExpressTracking(expressEl, order, function () {});
      }

      if (typeof L === 'undefined') {
        mapEl.innerHTML = '<p class="empty">Mapa indisponível — rastreio ativo em tempo real.</p>';
        return;
      }
      try {
        runLiveTracking(mapEl, order, {
          onStatus: function (msg) { statusEl.textContent = msg; },
          onCountdown: function (text) { if (countdownEl) countdownEl.textContent = text; },
          onPhase: function (text) { if (phaseEl) phaseEl.textContent = text; },
        }).catch(function () {
          mapEl.innerHTML = '<p class="empty">Rastreio ativo — saída Fiji, entrega em andamento.</p>';
        });
      } catch (err) {
        mapEl.innerHTML = '<p class="empty">Rastreio ativo — saída Fiji, entrega em andamento.</p>';
      }
    }, 1500);
  }

  function bindGlobalUI() {
    document.body.addEventListener('click', function (e) {
      var rouletteBtn = e.target.closest('[data-action="roulette"]');
      if (rouletteBtn && !e.target.closest('#roulette-overlay')) {
        e.preventDefault();
        var tab = currentTab;
        if (rouletteBtn.id === 'nav-cupons') tab = 'express';
        if (rouletteBtn.id === 'shenim-cupons') tab = 'fashion';
        triggerRoulette(tab);
        return;
      }

      var rouletteLink = e.target.closest('[data-action-link="roulette"]');
      if (rouletteLink) {
        e.preventDefault();
        triggerRoulette('premium');
        return;
      }

      var searchBtn = e.target.closest('[data-focus="search"]');
      if (searchBtn) {
        e.preventDefault();
        showView('shop');
        setTimeout(function () {
          var s = $('#shop-search');
          if (s) { s.focus(); s.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        }, 150);
        return;
      }

      var nav = e.target.closest('[data-view]');
      if (nav && nav.tagName !== 'FORM') {
        e.preventDefault();
        showView(nav.dataset.view);
      }
    });
  }

  function prefillCheckout() {
    var nameEl = $('#checkout-name');
    var addrEl = $('#checkout-address');
    if (nameEl && !nameEl.value) nameEl.value = UI.USER_NAME || 'Marcelo';
    if (addrEl && !addrEl.value) addrEl.value = 'Rua Augusta, 1200, Consolação, São Paulo';
  }

  function init() {
    try {
      runInit();
    } catch (err) {
      console.error('Dopamina erro:', err);
      const box = document.createElement('div');
      box.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#1a1228;color:#fff;padding:24px;font-family:sans-serif;overflow:auto';
      box.innerHTML = '<h2>Dopamina — erro ao carregar</h2><p>' + err.message + '</p><p>Use <strong>INICIAR.bat</strong> na pasta dopamina ou abra via <code>http://localhost:8765</code></p>';
      document.body.appendChild(box);
    }
  }

  function runInit() {
    ensureUnlimitedWallet();
    updateHeader();
    applyShopTheme();
    bindGlobalUI();

    const checkoutForm = $('#checkout-form');
    if (checkoutForm) checkoutForm.addEventListener('submit', processCheckout);

    const btnCheckout = $('#btn-checkout');
    if (btnCheckout) {
      btnCheckout.addEventListener('click', function () {
        if (!loadCart().length) {
          flashToast('Sacola vazia');
          return;
        }
        prefillCheckout();
        showView('checkout');
      });
    }

    document.querySelectorAll('.pay-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        document.querySelectorAll('.pay-option').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        var radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });

    if (!rouletteDoneForTab('express')) {
      rouletteTab = 'express';
      initRoulette(function (prize) {
        markRouletteDoneForTab('express');
        if (prize.type !== 'none') {
          saveCoupon(prize);
          updateCouponBadge();
          if (UI.addStamp) UI.addStamp(1);
        }
      });
    }

    updateCouponBadge();
    showView('shop');
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeProductModal();
  });

  document.addEventListener('DOMContentLoaded', init);
})();
