/** Roleta de desconto — sempre ganha (SVG + DOM) */
const PRIZES = [
  { label: '50% OFF', discount: 0.5, type: 'percent', icon: '🎉' },
  { label: 'Frete Grátis', discount: 0, type: 'shipping', icon: '🚚' },
  { label: '70% OFF', discount: 0.7, type: 'percent', icon: '🔥' },
  { label: 'R$ 100 bônus', discount: 100, type: 'bonus', icon: '💰' },
  { label: '30% OFF', discount: 0.3, type: 'percent', icon: '✨' },
  { label: 'Frete Grátis', discount: 0, type: 'shipping', icon: '🐋' },
  { label: '90% OFF', discount: 0.9, type: 'percent', icon: '🤯' },
  { label: 'Cupom VIP', discount: 0.4, type: 'percent', icon: '👑' },
];

const SKIP_COUPON = { label: 'Sem cupom', discount: 0, type: 'none', icon: '😌' };

let spinning = false;

function closeOverlay(overlay) {
  overlay.classList.remove('is-open');
  document.body.classList.remove('roulette-open');
}

function finishRoulette(overlay, prize, onComplete) {
  closeOverlay(overlay);
  onComplete?.(prize);
}

export function openRoulette(onComplete) {
  const overlay = document.getElementById('roulette-overlay');
  const wheel = document.getElementById('roulette-wheel');
  const spinBtn = document.getElementById('roulette-spin');
  const result = document.getElementById('roulette-result');
  const stage = document.getElementById('roulette-stage');
  const closeBtn = document.getElementById('roulette-close-x');

  if (!overlay || !wheel) return;

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

  // Força repaint da roleta
  requestAnimationFrame(() => {
    wheel.style.transition = '';
  });

  const onClose = () => {
    if (spinning) return;
    finishRoulette(overlay, SKIP_COUPON, onComplete);
  };

  closeBtn?.replaceWith(closeBtn.cloneNode(true));
  document.getElementById('roulette-close-x')?.addEventListener('click', onClose);

  spinBtn?.replaceWith(spinBtn.cloneNode(true));
  const freshSpin = document.getElementById('roulette-spin');
  freshSpin?.addEventListener('click', () => spinWheel(wheel, freshSpin, overlay, result, stage, onComplete));
}

function spinWheel(wheel, spinBtn, overlay, result, stage, onComplete) {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;

  const winIndex = Math.floor(Math.random() * PRIZES.length);
  const sliceDeg = 360 / PRIZES.length;
  const spins = 5 + Math.floor(Math.random() * 3);
  // Ponteiro no topo: fatia vencedora precisa parar em cima
  const targetDeg = spins * 360 + (360 - winIndex * sliceDeg - sliceDeg / 2);

  wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
  wheel.style.transform = `rotate(${targetDeg}deg)`;

  const onEnd = () => {
    wheel.removeEventListener('transitionend', onEnd);
    const prize = PRIZES[winIndex];
    showPrize(prize, overlay, result, stage, spinBtn, onComplete);
  };

  wheel.addEventListener('transitionend', onEnd);

  // Fallback se transitionend não disparar
  setTimeout(() => {
    if (spinning) {
      wheel.removeEventListener('transitionend', onEnd);
      showPrize(PRIZES[winIndex], overlay, result, stage, spinBtn, onComplete);
    }
  }, 4500);
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
  result.innerHTML = `
    <div class="roulette-prize">
      <span class="prize-icon">${prize.icon}</span>
      <h2>Você ganhou: ${prize.label}!</h2>
      <p>Cupom aplicado automaticamente. Compre à vontade — é de mentira mesmo.</p>
      <button type="button" class="btn btn-primary" id="roulette-confirm">Começar a gastar 🛒</button>
    </div>
  `;

  document.getElementById('roulette-confirm')?.addEventListener('click', () => {
    finishRoulette(overlay, prize, onComplete);
  });
}

export function buildWheelSVG() {
  const svg = document.getElementById('roulette-svg');
  if (!svg) return;

  svg.innerHTML = '';
  const cx = 140;
  const cy = 140;
  const r = 130;
  const slice = (2 * Math.PI) / PRIZES.length;

  PRIZES.forEach((prize, i) => {
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
      `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
    );
    path.setAttribute('fill', i % 2 === 0 ? '#ff2d6a' : '#7c3aed');
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

export function initRoulette(onComplete) {
  buildWheelSVG();
  openRoulette(onComplete);
}

export { PRIZES, SKIP_COUPON };
