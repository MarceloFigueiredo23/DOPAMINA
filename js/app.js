import { CATALOG, getProduct, isExpress } from './catalog.js';
import {
  loadWallet, saveWallet, loadCart, saveCart, loadOrders, saveOrders,
  loadCoupon, formatBRL, addSavings, rouletteDone, markRouletteDone, saveCoupon,
} from './store.js';
import { initRoulette } from './roulette.js';
import { runProductTracking, runExpressTracking } from './tracking.js';

let currentTab = 'express';
let currentView = 'shop';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function cartTotal(cart) {
  return cart.reduce((sum, item) => {
    const p = getProduct(item.id);
    return sum + (p?.price || 0) * item.qty;
  }, 0);
}

function applyCoupon(subtotal, coupon) {
  if (!coupon) return { total: subtotal, discount: 0, freeShipping: false };
  let discount = 0;
  let freeShipping = false;
  if (coupon.type === 'percent') discount = subtotal * coupon.discount;
  if (coupon.type === 'bonus') discount = Math.min(coupon.discount, subtotal);
  if (coupon.type === 'shipping') freeShipping = true;
  return { total: Math.max(0, subtotal - discount), discount, freeShipping };
}

function updateHeader() {
  const wallet = loadWallet();
  const cart = loadCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  $('#wallet-balance').textContent = formatBRL(wallet);
  $('#cart-count').textContent = count;
  $('#cart-count').hidden = count === 0;
}

function renderProducts() {
  const grid = $('#product-grid');
  const items = CATALOG[currentTab];
  grid.innerHTML = items
    .map(
      (p) => `
    <article class="product-card" data-id="${p.id}">
      <span class="product-tag">${p.tag}</span>
      <div class="product-emoji">${p.emoji}</div>
      <p class="product-shop">${p.shop}</p>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-footer">
        <span class="product-price">${formatBRL(p.price)}</span>
        <button type="button" class="btn btn-add" data-add="${p.id}">+ Carrinho</button>
      </div>
    </article>`
    )
    .join('');

  grid.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(btn.dataset.add));
  });
}

function addToCart(id) {
  const cart = loadCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart(cart);
  updateHeader();
  flashToast('Adicionado ao carrinho! 🛒');
}

function flashToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function showView(view) {
  currentView = view;
  $$('.view').forEach((v) => v.classList.remove('active'));
  $(`#view-${view}`)?.classList.add('active');
  $$('.nav-link').forEach((l) => l.classList.toggle('active', l.dataset.view === view));

  if (view === 'shop') renderProducts();
  if (view === 'cart') renderCart();
  if (view === 'profile') renderProfile();
}

function renderCart() {
  const cart = loadCart();
  const coupon = loadCoupon();
  const subtotal = cartTotal(cart);
  const { total, discount, freeShipping } = applyCoupon(subtotal, coupon);

  const list = $('#cart-list');
  if (!cart.length) {
    list.innerHTML = '<p class="empty">Carrinho vazio. Vá gastar dinheiro de mentira!</p>';
    $('#cart-summary').hidden = true;
    return;
  }

  list.innerHTML = cart
    .map((item) => {
      const p = getProduct(item.id);
      if (!p) return '';
      return `
      <div class="cart-item">
        <span class="cart-emoji">${p.emoji}</span>
        <div class="cart-info">
          <strong>${p.name}</strong>
          <span>${formatBRL(p.price)} × ${item.qty}</span>
        </div>
        <div class="cart-qty">
          <button type="button" data-qty="${item.id}" data-delta="-1">−</button>
          <span>${item.qty}</span>
          <button type="button" data-qty="${item.id}" data-delta="1">+</button>
        </div>
        <button type="button" class="cart-remove" data-remove="${item.id}">✕</button>
      </div>`;
    })
    .join('');

  list.querySelectorAll('[data-qty]').forEach((btn) => {
    btn.addEventListener('click', () => {
      changeQty(btn.dataset.qty, parseInt(btn.dataset.delta, 10));
    });
  });
  list.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
  });

  $('#cart-summary').hidden = false;
  $('#cart-subtotal').textContent = formatBRL(subtotal);
  $('#cart-discount').textContent = discount > 0 ? `−${formatBRL(discount)}` : '—';
  $('#cart-shipping').textContent = freeShipping ? 'GRÁTIS 🎉' : formatBRL(subtotal > 200 ? 0 : 12.9);
  $('#cart-total').textContent = formatBRL(total + (freeShipping || subtotal > 200 ? 0 : 12.9));
}

function changeQty(id, delta) {
  let cart = loadCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  saveCart(cart);
  updateHeader();
  renderCart();
}

function removeFromCart(id) {
  saveCart(loadCart().filter((i) => i.id !== id));
  updateHeader();
  renderCart();
}

function renderProfile() {
  const savings = JSON.parse(localStorage.getItem('dopamina_savings') || '{}');
  const orders = loadOrders();
  const totalSaved = Object.values(savings).reduce((a, b) => a + b, 0);
  const days = Object.keys(savings).sort().slice(-7);

  $('#profile-saved').textContent = formatBRL(totalSaved);
  $('#profile-orders').textContent = orders.length;

  const chart = $('#savings-chart');
  if (!days.length) {
    chart.innerHTML = '<p class="empty">Nenhuma compra de mentira ainda. Comece!</p>';
    return;
  }

  const max = Math.max(...days.map((d) => savings[d]), 1);
  chart.innerHTML = days
    .map((d) => {
      const h = Math.round((savings[d] / max) * 100);
      const label = d.slice(5).replace('-', '/');
      return `<div class="bar-wrap"><div class="bar" style="height:${h}%"></div><span>${label}</span><small>${formatBRL(savings[d])}</small></div>`;
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

  const coupon = loadCoupon();
  const subtotal = cartTotal(cart);
  const { total, discount } = applyCoupon(subtotal, coupon);
  const shipping = subtotal > 200 ? 0 : 12.9;
  const finalTotal = total + shipping;

  let wallet = loadWallet();
  if (finalTotal > wallet) {
    flashToast('Saldo insuficiente… brincadeira, recarregue a página 😄');
    wallet = 999999.99;
    saveWallet(wallet);
  }

  saveWallet(wallet - finalTotal);
  addSavings(finalTotal);

  const hasExpress = cart.some((i) => isExpress(i.id));
  const hasPremium = cart.some((i) => !isExpress(i.id));
  const orderType = hasExpress && hasPremium ? 'mixed' : hasExpress ? 'express' : 'premium';

  const order = {
    id: 'DOP-' + Date.now().toString(36).toUpperCase(),
    items: [...cart],
    total: finalTotal,
    address,
    name,
    type: orderType,
    createdAt: new Date().toISOString(),
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

  mapEl.innerHTML = '';
  expressEl.innerHTML = '';
  statusEl.textContent = 'Processando pagamento com 1 clique…';

  setTimeout(() => {
    statusEl.textContent = '✅ Pagamento aprovado! Dinheiro zero debitado.';

    if (order.type === 'express' || order.type === 'mixed') {
      expressEl.hidden = false;
      $('#tracking-express-title').hidden = false;
      runExpressTracking(expressEl, () => {});
    } else {
      expressEl.hidden = true;
      $('#tracking-express-title').hidden = true;
    }

    if (order.type === 'premium' || order.type === 'mixed') {
      mapEl.hidden = false;
      $('#tracking-map-title').hidden = false;
      setTimeout(() => {
        runProductTracking(mapEl, order.address, (msg) => {
          statusEl.textContent = msg;
        });
      }, order.type === 'mixed' ? 15000 : 500);
    } else {
      mapEl.hidden = true;
      $('#tracking-map-title').hidden = true;
    }
  }, 1500);
}

function init() {
  updateHeader();

  $$('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      $$('.tab-btn').forEach((b) => b.classList.toggle('active', b === btn));
      const hint = $('#tab-hint');
      if (hint) {
        hint.textContent =
          currentTab === 'express'
            ? 'Entrega em até 1 hora (na sua cabeça)'
            : 'Entrega em 3 a 5 dias — rota baleia das Fiji 🐋';
      }
      renderProducts();
    });
  });

  document.querySelectorAll('[data-view]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showView(el.dataset.view);
    });
  });

  $('#checkout-form')?.addEventListener('submit', processCheckout);
  $('#btn-checkout')?.addEventListener('click', () => {
    if (!loadCart().length) {
      flashToast('Carrinho vazio!');
      return;
    }
    showView('checkout');
  });

  if (!rouletteDone()) {
    initRoulette((prize) => {
      markRouletteDone();
      if (prize.type !== 'none') {
        saveCoupon(prize);
        $('#coupon-badge').textContent = `Cupom: ${prize.label}`;
        $('#coupon-badge').hidden = false;
      }
    });
  }

  const coupon = loadCoupon();
  if (coupon) {
    $('#coupon-badge').textContent = `Cupom: ${coupon.label}`;
    $('#coupon-badge').hidden = false;
  }

  showView('shop');
}

document.addEventListener('DOMContentLoaded', init);
