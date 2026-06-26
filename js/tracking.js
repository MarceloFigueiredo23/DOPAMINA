/** Rastreio — baleia de Fiji + pacote até o endereço (Leaflet) */

const FIJI = {
  lat: -17.713371,
  lng: 178.065032,
  mapsUrl: 'https://www.google.com/maps/place/Fiji/@-17.713371,178.065032,8z',
};
const BRAZIL_COAST = { lat: -23.0, lng: -43.5 };

export async function geocodeAddress(address) {
  const q = encodeURIComponent(address);
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`,
      { headers: { 'Accept-Language': 'pt-BR' } }
    );
    const data = await res.json();
    if (data?.[0]) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), label: data[0].display_name };
    }
  } catch (_) { /* fallback */ }
  return { lat: -23.5505, lng: -46.6333, label: address || 'São Paulo, Brasil' };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpCoord(c1, c2, t) {
  return { lat: lerp(c1.lat, c2.lat, t), lng: lerp(c1.lng, c2.lng, t) };
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

function animateAlong(map, path, icon, duration, onStep) {
  return new Promise((resolve) => {
    const totalSegments = path.length - 1;
    const start = performance.now();

    const marker = L.marker(path[0], { icon, zIndexOffset: 1000 }).addTo(map);

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const segProgress = progress * totalSegments;
      const segIndex = Math.min(Math.floor(segProgress), totalSegments - 1);
      const localT = segProgress - segIndex;
      const pos = lerpCoord(path[segIndex], path[segIndex + 1], localT);
      marker.setLatLng([pos.lat, pos.lng]);
      onStep?.(progress, pos);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        resolve(marker);
      }
    }
    requestAnimationFrame(frame);
  });
}

function makeEmojiIcon(emoji, size = 40) {
  return L.divIcon({
    className: 'map-emoji-marker',
    html: `<span style="font-size:${size}px;line-height:1">${emoji}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export async function runProductTracking(container, address, onStatus) {
  const dest = await geocodeAddress(address);
  onStatus?.('Geolocalizando seu endereço imaginário…');

  container.innerHTML = '';
  if (container._leaflet_map) {
    container._leaflet_map.remove();
  }

  const map = L.map(container, { zoomControl: true, scrollWheelZoom: true });
  container._leaflet_map = map;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 18,
  }).addTo(map);

  map.setView([FIJI.lat, FIJI.lng], 3);

  const oceanPath = buildOceanPath(dest);
  const routeLine = L.polyline(
    oceanPath.map((p) => [p.lat, p.lng]),
    { color: '#7c3aed', weight: 3, dashArray: '8 8', opacity: 0.7 }
  ).addTo(map);

  L.marker([FIJI.lat, FIJI.lng], { icon: makeEmojiIcon('🏝️', 32) })
    .bindPopup('Ilhas Fiji — ponto de partida')
    .addTo(map);

  onStatus?.('🐋 Baleia saiu das Fiji com seu pedido!');

  const whaleIcon = makeEmojiIcon('🐋', 48);
  await animateAlong(map, oceanPath.slice(0, 7), whaleIcon, 12000, (p) => {
    if (p > 0.3 && p < 0.35) onStatus?.('🌊 Baleia atravessando o Pacífico…');
    if (p > 0.6 && p < 0.65) onStatus?.('🌊 Quase chegando na América do Sul…');
  });

  onStatus?.('🏖️ Baleia chegou em terra! Transferindo para o pacote…');

  const landStart = oceanPath[6];
  const landPath = [landStart, oceanPath[7], dest];
  routeLine.setStyle({ color: '#ff2d6a', dashArray: null });

  const packageIcon = makeEmojiIcon('📦', 36);
  await animateAlong(map, landPath, packageIcon, 8000, (p) => {
    if (p > 0.5) onStatus?.('📦 Pacote a caminho da sua casa…');
  });

  L.marker([dest.lat, dest.lng], { icon: makeEmojiIcon('🏠', 36) })
    .bindPopup(`Entrega imaginária: ${dest.label}`)
    .addTo(map);

  map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
  onStatus?.('✅ Pedido entregue! (Na sua imaginação)');
}

/** Timeline express — comida até 1h */
export function runExpressTracking(statusEl, onComplete) {
  const steps = [
    { text: 'Restaurante confirmou seu pedido', delay: 0 },
    { text: '👨‍🍳 Preparando com carinho fake…', delay: 8000 },
    { text: '🛵 Motoboy pegou seu pedido', delay: 20000 },
    { text: '📍 A 5 min da sua casa imaginária', delay: 35000 },
    { text: '✅ Entregue! Bom apetite (mental)', delay: 50000 },
  ];

  const list = document.createElement('div');
  list.className = 'tracking-timeline';
  statusEl.innerHTML = '';
  statusEl.appendChild(list);

  steps.forEach((step, i) => {
    setTimeout(() => {
      const item = document.createElement('div');
      item.className = 'timeline-item active';
      item.innerHTML = `<span class="timeline-dot"></span><span>${step.text}</span>`;
      list.appendChild(item);
      if (i === steps.length - 1) onComplete?.();
    }, step.delay);
  });
}
