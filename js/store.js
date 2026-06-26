/** Estado global — localStorage */
const KEYS = {
  wallet: 'dopamina_wallet',
  cart: 'dopamina_cart',
  orders: 'dopamina_orders',
  roulette: 'dopamina_roulette_done',
  coupon: 'dopamina_coupon',
  savings: 'dopamina_savings',
};

const INITIAL_WALLET = 999999.99;

export function loadWallet() {
  const v = localStorage.getItem(KEYS.wallet);
  return v !== null ? parseFloat(v) : INITIAL_WALLET;
}

export function saveWallet(amount) {
  localStorage.setItem(KEYS.wallet, String(amount));
}

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.cart) || '[]');
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(KEYS.cart, JSON.stringify(cart));
}

export function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.orders) || '[]');
  } catch {
    return [];
  }
}

export function saveOrders(orders) {
  localStorage.setItem(KEYS.orders, JSON.stringify(orders));
}

export function rouletteDone() {
  return localStorage.getItem(KEYS.roulette) === '1';
}

export function markRouletteDone() {
  localStorage.setItem(KEYS.roulette, '1');
}

export function saveCoupon(coupon) {
  localStorage.setItem(KEYS.coupon, JSON.stringify(coupon));
}

export function loadCoupon() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.coupon) || 'null');
  } catch {
    return null;
  }
}

export function addSavings(amount) {
  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem(KEYS.savings) || '{}');
  data[today] = (data[today] || 0) + amount;
  localStorage.setItem(KEYS.savings, JSON.stringify(data));
  return data;
}

export function loadSavings() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.savings) || '{}');
  } catch {
    return {};
  }
}

export function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
