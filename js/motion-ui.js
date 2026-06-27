/**
 * Motion UI — animações suaves via Motion (mesmo motor do Framer Motion)
 * Vanilla JS · CDN ESM · integração com dopamina.js
 */
import { animate, stagger, inView } from 'https://cdn.jsdelivr.net/npm/motion@12.4.7/+esm';

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var springSnappy = { type: 'spring', stiffness: 420, damping: 32, mass: 0.85 };
  var springSoft = { type: 'spring', stiffness: 280, damping: 28, mass: 0.9 };
  var easeOut = [0.22, 1, 0.36, 1];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function cardSelector() {
    return '.ds-card, .amazon-card, .shenim-card, .mercadao-card, .deal-card-rich, [data-motion-card]';
  }

  function markCards(container) {
    if (!container) return [];
    var cards = container.querySelectorAll(cardSelector());
    cards.forEach(function (el, i) {
      el.setAttribute('data-motion-card', '1');
      el.style.setProperty('--motion-i', String(i));
    });
    return Array.from(cards);
  }

  function run(fn) {
    if (reduced) return null;
    try {
      return fn();
    } catch (e) {
      console.warn('[Motion UI]', e);
      return null;
    }
  }

  var API = {
    ready: true,

    init: function () {
      if (reduced) return;
      document.body.classList.add('mp-motion-active');
      this.bindScrollHeader();
      this.bindPressTargets();
      this.heroIntro();
    },

    bindScrollHeader: function () {
      var header = $('#site-header');
      if (!header) return;
      var lastY = 0;
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.scrollY || 0;
          header.classList.toggle('mp-header-elevated', y > 8);
          header.classList.toggle('mp-header-compact', y > 120 && y > lastY);
          lastY = y;
          ticking = false;
        });
      }, { passive: true });
    },

    bindPressTargets: function () {
      document.addEventListener('pointerdown', function (e) {
        var btn = e.target.closest('.ds-add-btn, .amazon-add-btn, .shenim-add-btn, .mercadao-add-btn, .mp-tab, .ds-cat-tab, .shenim-chip');
        if (!btn || reduced) return;
        API.pressButton(btn);
      });
    },

    heroIntro: function () {
      run(function () {
        var hero = $('.mp-home-hero, .dopamina-hero, .shop-hero-block');
        if (hero) {
          hero.classList.add('mp-hero-float');
          animate(hero, { opacity: [0, 1], y: [28, 0], scale: [0.98, 1] }, { duration: 0.65, easing: easeOut });
        }
        var ticker = $('#promo-ticker');
        if (ticker) {
          animate(ticker, { opacity: [0, 1], y: [-8, 0] }, { duration: 0.4, easing: easeOut });
        }
        var header = $('#site-header');
        if (header) {
          animate(header, { opacity: [0, 1], y: [-12, 0] }, { duration: 0.5, delay: 0.05, easing: easeOut });
        }
      });
    },

    staggerGrid: function (grid) {
      if (!grid || reduced) return;
      run(function () {
        var cards = markCards(grid);
        if (!cards.length) return;
        cards.forEach(function (c) { c.classList.add('mp-motion-hidden'); });
        animate(
          cards,
          { opacity: [0, 1], y: [22, 0], scale: [0.97, 1] },
          { delay: stagger(0.045, { start: 0.04 }), duration: 0.48, easing: easeOut }
        ).then(function () {
          cards.forEach(function (c) {
            c.classList.remove('mp-motion-hidden');
          });
        });
        cards.slice(0, 24).forEach(function (card) {
          inView(card, function () {
            animate(card, { y: [0, -3, 0] }, { duration: 0.35, easing: easeOut });
          }, { margin: '-10% 0px -10% 0px', amount: 0.4 });
        });
      });
    },

    viewChange: function (viewName, viewEl) {
      if (!viewEl || reduced) return;
      run(function () {
        var views = document.querySelectorAll('.view');
        views.forEach(function (v) {
          if (v !== viewEl) v.classList.remove('mp-view-visible');
        });
        viewEl.classList.add('mp-view-enter');
        animate(viewEl, { opacity: [0, 1], y: [16, 0] }, { duration: 0.42, easing: easeOut }).then(function () {
          viewEl.classList.remove('mp-view-enter');
          viewEl.classList.add('mp-view-visible');
        });
      });
    },

    openCart: function () {
      if (reduced) return;
      run(function () {
        var overlay = $('#cart-drawer-overlay');
        var drawer = $('#cart-drawer');
        if (overlay) {
          animate(overlay, { opacity: [0, 1] }, { duration: 0.32, easing: easeOut });
        }
        if (drawer) {
          animate(drawer, { x: ['100%', '0%'] }, springSnappy);
        }
        API.staggerList($('#cart-drawer-list'));
      });
    },

    closeCart: function (done) {
      if (reduced) {
        if (done) done();
        return;
      }
      run(function () {
        var overlay = $('#cart-drawer-overlay');
        var drawer = $('#cart-drawer');
        var anims = [];
        if (overlay) anims.push(animate(overlay, { opacity: [1, 0] }, { duration: 0.26, easing: easeOut }));
        if (drawer) anims.push(animate(drawer, { x: ['0%', '100%'] }, { duration: 0.32, easing: easeOut }));
        Promise.all(anims).then(function () {
          if (done) done();
        });
      }) || (done && done());
    },

    staggerList: function (list) {
      if (!list || reduced) return;
      var items = list.querySelectorAll('.cart-drawer-item');
      if (!items.length) return;
      items.forEach(function (el) { el.setAttribute('data-motion-item', '1'); });
      animate(items, { opacity: [0, 1], x: [24, 0] }, { delay: stagger(0.06), duration: 0.38, easing: easeOut });
    },

    openModal: function () {
      if (reduced) return;
      run(function () {
        var backdrop = $('#product-modal-backdrop');
        var panel = $('#product-modal-panel');
        if (backdrop) {
          backdrop.classList.add('mp-backdrop-ready');
          animate(backdrop, { opacity: [0, 1] }, { duration: 0.35, easing: easeOut });
        }
        if (panel) {
          var isMobile = window.innerWidth < 768;
          if (isMobile) {
            animate(panel, { y: ['100%', '0%'], opacity: [0.6, 1] }, springSnappy);
          } else {
            animate(panel, { opacity: [0, 1], scale: [0.92, 1], y: [24, 0] }, springSoft);
          }
        }
      });
    },

    closeModal: function (done) {
      if (reduced) {
        if (done) done();
        return;
      }
      run(function () {
        var backdrop = $('#product-modal-backdrop');
        var panel = $('#product-modal-panel');
        var anims = [];
        if (backdrop) anims.push(animate(backdrop, { opacity: [1, 0] }, { duration: 0.22, easing: easeOut }));
        if (panel) {
          var isMobile = window.innerWidth < 768;
          if (isMobile) {
            anims.push(animate(panel, { y: ['0%', '100%'] }, { duration: 0.28, easing: easeOut }));
          } else {
            anims.push(animate(panel, { opacity: [1, 0], scale: [1, 0.96], y: [0, 16] }, { duration: 0.24, easing: easeOut }));
          }
        }
        Promise.all(anims).then(function () {
          if (backdrop) backdrop.classList.remove('mp-backdrop-ready');
          if (done) done();
        });
      }) || (done && done());
    },

    toast: function (el) {
      if (!el || reduced) return;
      run(function () {
        el.classList.add('mp-toast-visible');
        animate(el, { opacity: [0, 1], y: [20, 0], scale: [0.92, 1] }, springSnappy).then(function () {
          return animate(el, { opacity: [1, 0], y: [0, -8] }, { delay: 1.8, duration: 0.35, easing: easeOut });
        }).then(function () {
          el.classList.remove('mp-toast-visible', 'show');
        });
      });
    },

    pulseCart: function () {
      if (reduced) return;
      var badge = $('#mp-cart-badge');
      if (!badge || badge.hidden) return;
      run(function () {
        animate(badge, { scale: [1, 1.45, 1] }, { duration: 0.45, easing: easeOut });
      });
    },

    pressButton: function (el) {
      if (!el || reduced) return;
      run(function () {
        animate(el, { scale: 0.94 }, { duration: 0.08 }).then(function () {
          return animate(el, { scale: 1 }, springSnappy);
        });
      });
    },

    chipActive: function (el) {
      if (!el || reduced) return;
      var siblings = el.parentElement && el.parentElement.querySelectorAll('.ds-cat-tab, .shenim-chip, .mercadao-filter-chip');
      if (siblings) {
        siblings.forEach(function (s) { s.classList.remove('mp-chip-active'); });
      }
      el.classList.add('mp-chip-active');
      run(function () {
        animate(el, { scale: [0.95, 1.04, 1] }, { duration: 0.32, easing: easeOut });
      });
    },

    addToCartBurst: function (originEl) {
      if (!originEl || reduced) return;
      API.pressButton(originEl);
    },
  };

  window.DOPAMINA_MOTION = API;
  window.dispatchEvent(new CustomEvent('dopamina-motion-ready'));

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { API.init(); });
  } else {
    API.init();
  }
})();
