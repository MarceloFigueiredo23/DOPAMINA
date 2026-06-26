/** UI interativa — referências iFood / SHEIN / Amazon */
(function (w) {
  'use strict';

  var USER_NAME = 'Marcelo';
  var ADDR = 'Rua Augusta, 1200 — Consolação';

  function getGreeting() {
    var h = new Date().getHours();
    if (h < 12) return 'Bom dia, ' + USER_NAME;
    if (h < 18) return 'Boa tarde, ' + USER_NAME;
    return 'Boa noite, ' + USER_NAME;
  }

  function isDismissed(id) {
    return localStorage.getItem('dopamina_dismiss_' + id) === '1';
  }

  function dismiss(id) {
    localStorage.setItem('dopamina_dismiss_' + id, '1');
  }

  function loadStamps() {
    return parseInt(localStorage.getItem('dopamina_stamps') || '0', 10);
  }

  function addStamp(n) {
    var v = Math.min(5, loadStamps() + (n || 1));
    localStorage.setItem('dopamina_stamps', String(v));
    return v;
  }

  var AIFOOD_SERVICES = [
    { icon: '🍔', label: 'Restaurantes', cat: 'all' },
    { icon: '🛒', label: 'Mercados', cat: 'all', novo: true },
    { icon: '💊', label: 'Farmácias', cat: 'all', action: 'roulette' },
    { icon: '🍺', label: 'Bebidas', cat: 'all' },
    { icon: '🐾', label: 'Pet Shop', cat: 'all', novo: true },
    { icon: '🛍️', label: 'Shopping', cat: 'all' },
    { icon: '✈️', label: 'Viagens', cat: 'all', novo: true },
    { icon: '🎁', label: 'Presentes', cat: 'all' },
    { icon: '🔥', label: 'Promoções', cat: 'all', action: 'roulette' },
    { icon: '⭐', label: 'Hits', cat: 'all', novo: true, action: 'hits' },
  ];

  var AIFOOD_SLIDES = [
    { img: 'photo-1546069901-ba9599a7e63c', title: 'Almoço a partir de R$ 14,90', sub: 'Entrega grátis em restaurantes parceiros', cta: 'Pedir agora', color: '#ff6b35' },
    { img: 'photo-1565299624946-b28f40a0ae38', title: 'Pizza em dobro', sub: 'Na 2ª unidade até domingo', cta: 'Ver ofertas', color: '#ea1d2c' },
    { img: 'photo-1579584425555-c3ce17fd4351', title: 'Japonesa com 25% OFF', sub: 'Cupom AIFOOD25 automático', cta: 'Eu quero!', color: '#1a1a2e' },
  ];

  var AMAZOOM_SLIDES = [
    { img: 'photo-1517336714731-489689fd1ca8', title: 'AMAZOOM Dia — 1 a 7 de julho', sub: 'Ofertas exclusivas Prime', color: '#232f3e' },
    { img: 'photo-1695048133144-6b33fd7b28b5', title: 'Smartphones a partir de R$ 2.999', sub: 'Parcelamento sem juros', color: '#131921' },
    { img: 'photo-1606813907291-d86efa9b94db', title: 'Games com até 40% OFF', sub: 'Frete GRÁTIS Prime', color: '#37475a' },
  ];

  var MERCADAO_SLIDES = [
    { img: 'photo-1556742049-0cfed4f6a45d', title: '7.7 MERCADÃO — Vem fazer compritta', sub: 'Cupons relâmpago · só simulação', color: '#fff159', textDark: true },
    { img: 'photo-1607082349566-187342175e2f', title: 'Frete grátis na 1ª compra simulada', sub: 'Milhares de produtos', color: '#3483fa' },
    { img: 'photo-1558618666-fcd25c85cd64', title: 'Festival de Grandes Marcas', sub: 'Até 60% OFF · parcelado sem juros', color: '#2d3277' },
  ];

  var MERCADAO_BENEFITS = [
    { icon: '🚚', title: 'Frete grátis', sub: 'Benefício na sua primeira compra simulada.', cta: 'Mostrar produtos' },
    { icon: '👤', title: 'Entre na sua conta', sub: 'Aproveite ofertas no Mercadopamina.', cta: 'Entrar na conta' },
    { icon: '📍', title: 'Insira sua localização', sub: 'Confira prazos de entrega simulados.', cta: 'Informar CEP' },
    { icon: '💳', title: 'Meios de pagamento', sub: 'Pix, cartão e saldo do desafio R$ 1 mi.', cta: 'Ver meios' },
    { icon: '💰', title: 'Menos de R$100', sub: 'Produtos com preços baixos.', cta: 'Mostrar produtos' },
    { icon: '🔥', title: 'Mais vendidos', sub: 'Explore o que é tendência.', cta: 'Ir para ofertas' },
  ];

  var MERCADAO_CATEGORIES = [
    { icon: '📱', label: 'Celulares' },
    { icon: '💻', label: 'Informática' },
    { icon: '🏠', label: 'Casa' },
    { icon: '👟', label: 'Moda' },
    { icon: '📺', label: 'Eletrônicos' },
    { icon: '⚽', label: 'Esportes' },
    { icon: '🐾', label: 'Pet Shop' },
    { icon: '💄', label: 'Beleza' },
    { icon: '🎮', label: 'Games' },
    { icon: '🛒', label: 'Supermercado' },
  ];

  var MERCADOPAMINA_COUPONS = [
    { pct: 18, min: 'Sem gasto mín.', limit: 'R$ 9', title: 'Cupom geral' },
    { pct: 19, min: 'Pedidos R$ 69+', limit: 'R$ 15', title: 'Cupom moda' },
    { pct: 25, min: 'Pedidos R$ 99+', limit: 'R$ 25', title: 'Cupom VIP' },
  ];

  function aifoodHero() {
    if (isDismissed('aifood-pharmacy')) return '';
    return (
      '<div class="aifood-hero-banner" data-dismiss="aifood-pharmacy">' +
      '<button type="button" class="promo-dismiss" aria-label="Fechar">✕</button>' +
      '<div class="aifood-hero-content">' +
      '<span class="aifood-hero-badge">pediu farmácia, ganhou 5 selos</span>' +
      '<h3>Até <strong>60% OFF</strong> em farmácia</h3>' +
      '<p>Advil · Dove · Huggies e muito mais</p>' +
      '<button type="button" class="aifood-hero-cta" data-action="roulette">Eu quero!</button>' +
      '</div>' +
      '<div class="aifood-hero-products">💊🧴🍼</div>' +
      '</div>'
    );
  }

  function aifoodMicroPromo() {
    if (isDismissed('aifood-micro')) return '';
    return (
      '<div class="aifood-micro-promo" data-dismiss="aifood-micro">' +
      '<span class="aifood-micro-icon">💎</span>' +
      '<span>Clube AIFOOD + entrega grátis em pedidos acima de R$ 35</span>' +
      '<button type="button" class="promo-dismiss-sm">✕</button>' +
      '</div>'
    );
  }

  function stampsBar() {
    var n = loadStamps();
    var dots = '';
    for (var i = 0; i < 5; i++) {
      dots += '<span class="stamp-dot' + (i < n ? ' filled' : '') + '"></span>';
    }
    return (
      '<div class="stamps-bar">' +
      '<div class="stamps-info"><strong>' + n + '/5 selos</strong> para frete grátis no Clube</div>' +
      '<div class="stamps-dots">' + dots + '</div>' +
      '</div>'
    );
  }

  function serviceGrid() {
    return (
      '<div class="aifood-services">' +
      AIFOOD_SERVICES.map(function (s) {
        return '<button type="button" class="aifood-service" data-cat="' + s.cat + '"' +
          (s.action ? ' data-saction="' + s.action + '"' : '') + '>' +
          (s.novo ? '<span class="service-novo">Novo</span>' : '') +
          '<span class="service-icon">' + s.icon + '</span>' +
          '<span class="service-label">' + s.label + '</span></button>';
      }).join('') +
      '</div>'
    );
  }

  function carouselHtml(slides, id) {
    var inner = slides.map(function (s, i) {
      return (
        '<div class="carousel-slide' + (i === 0 ? ' active' : '') + (s.textDark ? ' carousel-slide--dark' : '') + '" style="--slide-accent:' + s.color + '">' +
        '<img src="https://images.unsplash.com/' + s.img + '?w=800&h=400&fit=crop&q=80" alt="" />' +
        '<div class="carousel-caption">' +
        '<h4>' + s.title + '</h4><p>' + s.sub + '</p>' +
        '<button type="button" class="carousel-cta">' + (s.cta || 'Ver ofertas') + '</button>' +
        '</div></div>'
      );
    }).join('');
    return (
      '<div class="promo-carousel" data-carousel="' + id + '">' +
      '<div class="carousel-track">' + inner + '</div>' +
      '<button type="button" class="carousel-arrow carousel-prev" aria-label="Anterior">‹</button>' +
      '<button type="button" class="carousel-arrow carousel-next" aria-label="Próximo">›</button>' +
      '<div class="carousel-dots">' + slides.map(function (_, i) {
        return '<span class="carousel-dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '"></span>';
      }).join('') + '</div></div>'
    );
  }

  function mercadaoHomeBlocks() {
    var benefits = MERCADAO_BENEFITS.map(function (b) {
      return '<article class="mercadao-benefit-card">' +
        '<span class="mercadao-benefit-icon">' + b.icon + '</span>' +
        '<h4>' + b.title + '</h4>' +
        '<p>' + b.sub + '</p>' +
        '<button type="button" class="mercadao-benefit-cta" data-action="roulette">' + b.cta + '</button>' +
        '</article>';
    }).join('');
    var cats = MERCADAO_CATEGORIES.map(function (c, i) {
      return '<button type="button" class="mercadao-cat-pill" data-mfilter="' + (i < 4 ? ['eletronicos', 'eletronicos', 'casa', 'moda'][i] : 'all') + '">' +
        '<span>' + c.icon + '</span><span>' + c.label + '</span></button>';
    }).join('');
    return (
      carouselHtml(MERCADAO_SLIDES, 'mercadao') +
      '<div class="mercadao-benefits-grid">' + benefits + '</div>' +
      '<div class="mercadao-meliplus">' +
      '<div class="mercadao-meliplus-text">' +
      '<span class="mercadao-meliplus-badge">Dopi+</span>' +
      '<h3>Viva a experiência MERCADÃO</h3>' +
      '<p>Frete grátis rápido · cashback simulado · entretenimento</p>' +
      '<button type="button" class="mercadao-meliplus-btn" data-action="roulette">Assinar a partir de R$ 9,90</button>' +
      '</div></div>' +
      '<div class="mercadao-categories-row"><h3>Categorias</h3><div class="mercadao-cats-scroll">' + cats + '</div></div>' +
      '<div class="mercadao-section-head"><h3>Ofertas do dia</h3>' +
      '<button type="button" class="mercadao-cupom-btn" data-action="roulette">🎟️ Cupons</button></div>'
    );
  }

  function amazoomHomeBlocks() {
    var cards = [
      { title: 'Continue comprando', type: 'books', items: ['📚', '📖', '📕', '📗'] },
      { title: 'Vem aí o AMAZOOM Dia!', type: 'prime', highlight: '1–7 JUL' },
      { title: 'Ofertas mais vendidas', type: 'deals', badge: '19% off' },
      { title: 'Conheça o Prime', type: 'alexa', text: 'Frete grátis e ofertas exclusivas' },
    ];
    return (
      carouselHtml(AMAZOOM_SLIDES, 'amazoom') +
      '<div class="amazoom-cards">' +
      cards.map(function (c) {
        if (c.type === 'prime') {
          return '<div class="amazoom-card amazoom-card--prime"><h4>' + c.title + '</h4><div class="amazoom-prime-box">📦<span>' + c.highlight + '</span></div></div>';
        }
        if (c.type === 'books') {
          return '<div class="amazoom-card"><h4>' + c.title + '</h4><div class="amazoom-mini-grid">' + c.items.map(function (e) { return '<span>' + e + '</span>'; }).join('') + '</div></div>';
        }
        if (c.type === 'deals') {
          return '<div class="amazoom-card"><h4>' + c.title + '</h4><div class="amazoom-deal"><span class="deal-badge">' + c.badge + '</span><span>🎮 📺</span></div></div>';
        }
        return '<div class="amazoom-card"><h4>' + c.title + '</h4><p>' + c.text + '</p><a href="#" class="amazoom-link" data-action="roulette">Ativar Prime →</a></div>';
      }).join('') +
      '</div>' +
      '<div class="amazoom-section-head"><h3>Recomendados para você</h3>' +
      '<button type="button" class="btn-cupom-sm" data-action="roulette">🎰 Girar cupom</button></div>'
    );
  }

  function shenimHero() {
    return (
      '<div class="shenim-hero-banner">' +
      '<div class="shenim-hero-text"><span class="shenim-hero-hash">#SHENIMMeioDoAno</span>' +
      '<h3>ATÉ <strong>80% OFF</strong></h3>' +
      '<p>Moda feminina, masculina e acessórios</p></div>' +
      '<button type="button" class="shenim-flash-btn" data-action="roulette">Resgatar cupons</button>' +
      '<div class="shenim-countdown" data-countdown="shenim">02:47:33</div>' +
      '</div>'
    );
  }

  function therapyHero(tab) {
    var subs = {
      home: 'Navegue, monte seu carrinho e sinta a emoção de comprar — sem gastar de verdade. Só Mercadopamina.',
      express: 'Peça, acompanhe a entrega e sinta o checkout — sem gastar de verdade.',
      market: 'Tudo que você procura em um só lugar — com a cara do marketplace brasileiro.',
      premium: 'Navegue ofertas, monte o carrinho e acompanhe entregas simuladas em tempo real.',
      fashion: 'Looks, tendências e descontos — a emoção é real, a cobrança não.',
      default: 'Sinta a dopamina sem gastar dinheiro real. A emoção é real, a conta não.',
    };
    return (
      '<section class="therapy-hero therapy-hero--' + (tab || 'default') + '">' +
      '<span class="therapy-hero-kicker">Mega ofertas do dia</span>' +
      '<h1 class="therapy-hero-title">Simulador de Compras para Terapia de Varejo.</h1>' +
      '<p class="therapy-hero-sub">' + (subs[tab] || subs.default) + '</p>' +
      '<div class="therapy-hero-tags">' +
      '<span>🚚 Frete grátis hoje</span><span>Até 60% OFF</span><span>🎰 Roleta de cupons</span>' +
      '</div></section>'
    );
  }

  function promoHubHtml() {
    return (
      '<section class="promo-hub" aria-label="Cupons e ofertas">' +
      '<div class="promo-hub-grid promo-hub-grid--3">' +
      '<button type="button" class="promo-hub-card promo-hub-card--roulette" data-action="roulette">' +
      '<span class="promo-hub-icon">🎰</span><strong>Roleta de cupons</strong>' +
      '<span>Gire e ganhe até 50% OFF</span></button>' +
      '<button type="button" class="promo-hub-card promo-hub-card--coupon" data-promo-coupon="MERCADOPAMINA10">' +
      '<span class="promo-hub-icon">🎟️</span><strong>MERCADOPAMINA10</strong>' +
      '<span>10% OFF no checkout</span></button>' +
      '<div class="promo-hub-card promo-hub-card--timer">' +
      '<span class="promo-hub-icon">⚡</span><strong>Ofertas relâmpago</strong>' +
      '<span>Termina em <b data-countdown="hub">02:47:59</b></span></div>' +
      '</div></section>'
    );
  }

  function shenimCategories() {
    var cats = [
      { img: 'photo-1596755094514-f87e34085b2c', label: 'Camisetas' },
      { img: 'photo-1551028719-00167b16eac5', label: 'Jaquetas' },
      { img: 'photo-1549298916-b41d501d3772', label: 'Tênis' },
      { img: 'photo-1595777457583-95e059d581b8', label: 'Vestidos' },
      { img: 'photo-1548039257-fcc5c4b4d4b0', label: 'Bolsas' },
      { img: 'photo-1571902943202-507ec2618e8f', label: 'Fitness' },
    ];
    return (
      '<div class="shenim-cat-row">' +
      cats.map(function (c) {
        return '<button type="button" class="shenim-cat-circle" data-sfilter="all">' +
          '<img src="https://images.unsplash.com/' + c.img + '?w=120&h=120&fit=crop" alt="" />' +
          '<span>' + c.label + '</span></button>';
      }).join('') +
      '</div>'
    );
  }

  function couponSheetHtml(coupons) {
    return (
      '<div class="coupon-sheet">' +
      '<h3>Ofertas especiais só para você</h3>' +
      '<div class="coupon-list">' +
      coupons.map(function (c) {
        return (
          '<div class="coupon-row">' +
          '<div class="coupon-pct"><strong>' + c.pct + '%</strong><span>OFF</span><small>' + c.min + '</small></div>' +
          '<div class="coupon-detail"><strong>' + c.title + '</strong>' +
          '<p>Limite de ' + c.limit + '</p><p class="coupon-limited">Por tempo limitado</p></div>' +
          '<span class="coupon-chevron">›</span></div>'
        );
      }).join('') +
      '</div>' +
      '<button type="button" class="coupon-save-btn" id="coupon-save-btn">Salvar cupons</button>' +
      '<p class="coupon-footnote">Cupons confirmados após salvar</p>' +
      '</div>'
    );
  }

  function bindCarousels(root) {
    if (!root) return;
    root.querySelectorAll('[data-carousel]').forEach(function (el) {
      var slides = el.querySelectorAll('.carousel-slide');
      var dots = el.querySelectorAll('.carousel-dot');
      var idx = 0;
      var timer;

      function go(n) {
        idx = (n + slides.length) % slides.length;
        slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
        dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
      }

      function startAuto() {
        clearInterval(timer);
        timer = setInterval(function () { go(idx + 1); }, 5000);
      }

      el.querySelector('.carousel-prev')?.addEventListener('click', function () { go(idx - 1); startAuto(); });
      el.querySelector('.carousel-next')?.addEventListener('click', function () { go(idx + 1); startAuto(); });
      dots.forEach(function (d) {
        d.addEventListener('click', function () { go(parseInt(d.dataset.i, 10)); startAuto(); });
      });
      startAuto();
    });
  }

  function bindDismiss(root) {
    if (!root) return;
    root.querySelectorAll('[data-dismiss]').forEach(function (el) {
      var id = el.dataset.dismiss;
      el.querySelector('.promo-dismiss, .promo-dismiss-sm')?.addEventListener('click', function (e) {
        e.stopPropagation();
        dismiss(id);
        el.remove();
      });
    });
  }

  function bindCountdowns(root) {
    if (!root) return;
    root.querySelectorAll('[data-countdown]').forEach(function (el) {
      if (el.dataset.cdInit) return;
      el.dataset.cdInit = '1';
      var key = el.getAttribute('data-countdown') || 'default';
      var sk = 'dopamina_cd_' + key;
      var end = sessionStorage.getItem(sk);
      if (!end) {
        var secs = 2 * 3600 + Math.floor(Math.random() * 3600);
        end = String(Date.now() + secs * 1000);
        sessionStorage.setItem(sk, end);
      }
      function tick() {
        var left = Math.max(0, Math.floor((parseInt(end, 10) - Date.now()) / 1000));
        var h = Math.floor(left / 3600);
        var m = Math.floor((left % 3600) / 60);
        var s = left % 60;
        el.textContent =
          String(h).padStart(2, '0') + ':' +
          String(m).padStart(2, '0') + ':' +
          String(s).padStart(2, '0');
      }
      tick();
      setInterval(tick, 1000);
    });
  }

  function bindInteractive(root, handlers) {
    bindCarousels(root);
    bindDismiss(root);
    bindCountdowns(root);
    if (!root || !handlers) return;
    root.querySelectorAll('[data-action="roulette"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (handlers.onRoulette) handlers.onRoulette();
      });
    });
    root.querySelectorAll('[data-promo-coupon]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (handlers.onPromoCoupon) handlers.onPromoCoupon(btn.dataset.promoCoupon);
      });
    });
    root.querySelectorAll('[data-saction]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var a = btn.dataset.saction;
        if (a === 'roulette' && handlers.onRoulette) handlers.onRoulette();
        if (a === 'hits' && handlers.onHits) handlers.onHits();
      });
    });
    root.querySelectorAll('.aifood-service[data-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.dataset.saction) return;
        if (handlers.onCategory) handlers.onCategory(btn.dataset.cat);
      });
    });
    root.querySelectorAll('.carousel-cta, .aifood-hero-cta').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (handlers.onRoulette) handlers.onRoulette();
      });
    });
  }

  w.DOPAMINA_UI = {
    USER_NAME: USER_NAME,
    ADDR: ADDR,
    getGreeting: getGreeting,
    loadStamps: loadStamps,
    addStamp: addStamp,
    MERCADOPAMINA_COUPONS: MERCADOPAMINA_COUPONS,
    SHENIM_COUPONS: MERCADOPAMINA_COUPONS,
    aifoodHero: aifoodHero,
    aifoodMicroPromo: aifoodMicroPromo,
    stampsBar: stampsBar,
    serviceGrid: serviceGrid,
    carouselHtml: function () { return carouselHtml(AIFOOD_SLIDES, 'aifood'); },
    amazoomHomeBlocks: amazoomHomeBlocks,
    mercadaoHomeBlocks: mercadaoHomeBlocks,
    shenimHero: shenimHero,
    therapyHero: therapyHero,
    promoHubHtml: promoHubHtml,
    shenimCategories: shenimCategories,
    couponSheetHtml: couponSheetHtml,
    bindInteractive: bindInteractive,
    dismiss: dismiss,
    isDismissed: isDismissed,
  };
})(window);
