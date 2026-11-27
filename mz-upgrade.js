/* ==========================================================================
   THE MONGOLZ CS2 SERVER — COMPLETE FEATURE UPGRADE MODULE (mz-upgrade.js)
   1. Multi-page SPA Router (Home, Live, Servers, Skins, Cases, Shop, Top15, Community, Banlist)
   2. Ulaanbaatar, Mongolia Real-Time 4-Season Weather Engine + Manual Override
   3. Exact Server Lineup (2x Public 24-slot, 2x DM, 1x KZ/Bhop, 40x 5v5) + Map Backgrounds
   4. Skin Changer: 16 CS2 Player Models + VIP+ Skin Color Customizer
   5. Exact 3 Case Types (50k ELO Free, 10k Standard, 50k Elite Knife/Glove)
   6. Exact 5 Ranks Shop (VIP, VIP+, Mod, Admin, Overlord) + Warning Modal + Server Choice
   7. Full Top 15 Stats (Kill, HS, AK-47, AWP, Knife, Zeus, Public, KZ)
   8. Official Discord OAuth Login alongside Steam
   9. Dedicated Community Page (Posts, Categories, Likes, Comments)
  10. Direct Call Admin inside Floating Live Chat
   ========================================================================== */

// ===================== 1. MULTI-PAGE SPA ROUTER =====================
let currentPageId = 'home';

function navigatePage(pageId) {
  const validPages = ['home', 'arena', 'servers', 'clanwar', 'skinchanger', 'cases', 'shop', 'leaderboard', 'community', 'banlist'];
  if (!validPages.includes(pageId)) pageId = 'home';
  currentPageId = pageId;

  document.querySelectorAll('.page-section').forEach(sec => {
    const isMatch = sec.dataset.pageId === pageId;
    sec.classList.toggle('active', isMatch);
    sec.style.display = isMatch ? '' : 'none';
  });

  document.querySelectorAll('.nav-links .nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  // Sync mobile bottom navigation active tab
  document.querySelectorAll('#mobileBottomNav .mbn-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  // Close mobile nav if open
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) navLinks.classList.remove('open');

  if (history.replaceState) {
    history.replaceState(null, '', '#' + pageId);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Wrap watchMatchInArena so clicking Featured 5v5 Match #1, #2, #3 jumps straight to Live Arena 3D POV
const _origWatchMatchInArena = window.watchMatchInArena;
window.watchMatchInArena = function(matchObj, open3dPov = true) {
  if (matchObj && matchObj.id <= 3) {
    navigatePage('arena');
  }
  if (typeof _origWatchMatchInArena === 'function') {
    _origWatchMatchInArena(matchObj, open3dPov);
  }
};


// ===================== 2. ULAANBAATAR 4-SEASON WEATHER ENGINE =====================
let ubWeatherMode = 'summer';    // 'auto' | 'winter' | 'rain' | 'spring' | 'summer' | 'autumn'
let ubActiveWeather = 'summer';  // Default to Summer (Bright Sun, Trees, River, Grass & Flowers)
let ubWeatherDesc = 'Улаанбаатар · Зун (+25°C ☀️)';

const ubRainDrops = [];
const ubLeaves = [];
const ubPetals = [];
const ubSummerTrees = [];
const ubSummerFlowers = [];
const ubSummerGrass = [];
const ubRiverRipples = [];
let ubSummerTick = 0;

function initUBWeatherParticles() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  ubRainDrops.length = 0;
  ubLeaves.length = 0;
  ubPetals.length = 0;
  ubSummerTrees.length = 0;
  ubSummerFlowers.length = 0;
  ubSummerGrass.length = 0;
  ubRiverRipples.length = 0;

  for (let i = 0; i < 160; i++) {
    ubRainDrops.push({
      x: Math.random() * w,
      y: Math.random() * h,
      len: 12 + Math.random() * 18,
      vy: 11 + Math.random() * 8,
      vx: -2.2 - Math.random() * 1.5,
      alpha: 0.25 + Math.random() * 0.45
    });
  }

  const leafColors = ['#f59e0b', '#ea580c', '#dc2626', '#eab308', '#b45309'];
  for (let i = 0; i < 55; i++) {
    ubLeaves.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 5 + Math.random() * 7,
      vy: 0.9 + Math.random() * 1.4,
      vx: 0.4 + Math.random() * 0.9,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.06,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      alpha: 0.65 + Math.random() * 0.3
    });
  }

  const petalColors = ['#fbcfe8', '#f9a8d4', '#fdf2f8', '#f472b6'];
  for (let i = 0; i < 65; i++) {
    ubPetals.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 3 + Math.random() * 4,
      vy: 0.7 + Math.random() * 1.1,
      vx: 0.5 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      alpha: 0.55 + Math.random() * 0.35
    });
  }

  // Summer Trees along the hills and riverbanks
  const treeCount = Math.max(12, Math.floor(w / 105));
  for (let i = 0; i < treeCount; i++) {
    const xRatio = (i + 0.3 + Math.random() * 0.4) / treeCount;
    // Leave a natural gap near the river channel around xRatio 0.45-0.62
    const isNearRiver = xRatio > 0.46 && xRatio < 0.60;
    const layer = isNearRiver ? 0 : (i % 3); // 0=far hill, 1=mid hill, 2=near meadow
    const scale = layer === 0 ? 0.58 + Math.random() * 0.18 : layer === 1 ? 0.82 + Math.random() * 0.22 : 1.05 + Math.random() * 0.25;
    ubSummerTrees.push({
      x: xRatio * w,
      layer,
      scale,
      kind: i % 2 === 0 ? 'pine' : 'oak',
      phase: Math.random() * Math.PI * 2,
      green1: i % 2 === 0 ? '#15803d' : '#16a34a',
      green2: i % 2 === 0 ? '#22c55e' : '#4ade80'
    });
  }

  // Summer Grass Blades across the bottom meadow
  const grassCount = Math.max(95, Math.floor(w / 13));
  for (let i = 0; i < grassCount; i++) {
    ubSummerGrass.push({
      x: (i / grassCount) * (w + 80) - 40 + (Math.random() * 10 - 5),
      yOffset: Math.random() * 68,
      height: 16 + Math.random() * 22,
      lean: (Math.random() - 0.5) * 6,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.45 ? '#22c55e' : '#4ade80'
    });
  }

  // Summer Blooming Wildflowers across the bottom meadow
  const flowerPalette = [
    { petal: '#facc15', center: '#b45309' }, // Golden Dandelion
    { petal: '#f472b6', center: '#fef08a' }, // Pink Steppe Flower
    { petal: '#ffffff', center: '#facc15' }, // White Daisy
    { petal: '#38bdf8', center: '#fef08a' }, // Sky Forget-me-not
    { petal: '#fb7185', center: '#fde047' }, // Red Poppy
    { petal: '#c084fc', center: '#fef08a' }  // Violet Iris
  ];
  const flowerCount = Math.max(42, Math.floor(w / 32));
  for (let i = 0; i < flowerCount; i++) {
    const pal = flowerPalette[i % flowerPalette.length];
    ubSummerFlowers.push({
      x: Math.random() * w,
      yOffset: 6 + Math.random() * 64,
      size: 3.6 + Math.random() * 3.2,
      stemH: 12 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      petalColor: pal.petal,
      centerColor: pal.center
    });
  }

  // Animated River Ripples & Water Current Lines
  for (let i = 0; i < 38; i++) {
    ubRiverRipples.push({
      t: Math.random(), // 0 (far upstream) to 1 (foreground bottom)
      speed: 0.0022 + Math.random() * 0.0025,
      lateral: (Math.random() - 0.5) * 0.72, // position across river width
      len: 14 + Math.random() * 24,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function getSeasonFromMonth(month) {
  if (month === 11 || month <= 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'autumn';
}

function applySkyTheme(weather) {
  const sky = document.getElementById('cs2SkyGlow');
  const titleEl = document.getElementById('hudWeatherTitle');
  const labels = {
    winter: '❄️ Өвөл · Цас',
    rain: '🌧️ Бороо · Солонго',
    spring: '🌸 Хавар',
    summer: '☀️ Зун · Нар & Гол ус',
    autumn: '🍂 Намар'
  };
  if (titleEl) {
    titleEl.textContent = `🔫 AK-47 · ${labels[weather] || 'Улаанбаатар'}`;
  }
  if (!sky) return;
  const gradients = {
    winter: 'radial-gradient(ellipse at 50% 0%, rgba(147,197,253,0.22), rgba(15,23,42,0) 70%)',
    rain:   'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.22), rgba(15,23,42,0) 70%)',
    spring: 'radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.18), rgba(34,197,94,0.08) 45%, transparent 72%)',
    summer: 'radial-gradient(circle at 82% 14%, rgba(254,240,138,0.38) 0%, rgba(56,189,248,0.18) 38%, rgba(34,197,94,0.08) 72%, transparent 90%)',
    autumn: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.22), rgba(180,83,9,0.10) 45%, transparent 72%)'
  };
  sky.style.background = gradients[weather] || gradients.summer;
}

async function fetchUlaanbaatarWeather() {
  const tempEl = document.getElementById('ubTempText');
  const month = new Date().getMonth() + 1;
  const fallbackSeason = getSeasonFromMonth(month);
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=47.8864&longitude=106.9057&current=temperature_2m,weather_code&timezone=Asia%2FUlaanbaatar');
    if (!res.ok) throw new Error('Weather API error');
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;

    let resolved = fallbackSeason;
    let condLabel = 'Тогтуун';
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      resolved = 'winter';
      condLabel = 'Цас орж байна ❄️';
    } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
      resolved = 'rain';
      condLabel = 'Бороотой 🌧️';
    } else if (temp <= -2) {
      resolved = 'winter';
      condLabel = 'Хүйтэн / Цастай ❄️';
    } else {
      const seasonNames = { winter: 'Өвөл ❄️', spring: 'Хавар 🌸', summer: 'Зун ☀️', autumn: 'Намар 🍂' };
      condLabel = seasonNames[fallbackSeason];
    }

    ubWeatherDesc = `${temp > 0 ? '+' : ''}${temp}°C · ${condLabel}`;
    if (tempEl) tempEl.textContent = ubWeatherDesc;
    if (ubWeatherMode === 'auto') {
      ubActiveWeather = resolved;
      applySkyTheme(ubActiveWeather);
    }
  } catch (e) {
    const seasonNames = { winter: '-9°C · Өвөл ❄️', spring: '+8°C · Хавар 🌸', summer: '+24°C · Зун ☀️', autumn: '+6°C · Намар 🍂' };
    ubWeatherDesc = seasonNames[fallbackSeason];
    if (tempEl) tempEl.textContent = ubWeatherDesc;
    if (ubWeatherMode === 'auto') {
      ubActiveWeather = fallbackSeason;
      applySkyTheme(ubActiveWeather);
    }
  }
}

function setManualWeather(mode, btn) {
  ubWeatherMode = mode;
  document.querySelectorAll('.hw-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (mode === 'auto') {
    fetchUlaanbaatarWeather();
    showToast('info', '🇲🇳', 'Улаанбаатар Цаг Агаар', 'Автомат горим идэвхжлээ (Live Ulaanbaatar)', 2500);
  } else {
    ubActiveWeather = mode;
    applySkyTheme(ubActiveWeather);
    const names = {
      winter: '❄️ Өвөл · Цас орж байна',
      rain: '🌧️ Бороо & Солонго',
      spring: '🌸 Хаврын улирал',
      summer: '☀️ Зуны нартай өдөр',
      autumn: '🍂 Намрын навчис'
    };
    showToast('info', '🌦️', 'Цаг агаар солигдлоо', names[mode] || mode, 2200);
  }
}

function drawColoredClouds(ctx, w, h, rgbTop, rgbMid) {
  if (typeof cs2Clouds === 'undefined') return;
  for (const cl of cs2Clouds) {
    cl.x += cl.speed;
    if (cl.x - 220 * cl.scale > w) cl.x = -220 * cl.scale;
    const px = cl.x + (window.currentParallaxX || 0) * cl.z * 26;
    const py = cl.y + (window.currentParallaxY || 0) * cl.z * 14;
    const s = cl.scale;
    ctx.save();
    ctx.translate(px, py);
    const puffs = [
      { dx: -75 * s, dy: 10 * s, rx: 65 * s, ry: 32 * s },
      { dx: -25 * s, dy: -6 * s, rx: 78 * s, ry: 42 * s },
      { dx: 35 * s,  dy: 0 * s,  rx: 72 * s, ry: 38 * s },
      { dx: 85 * s,  dy: 12 * s, rx: 58 * s, ry: 28 * s }
    ];
    for (const p of puffs) {
      const grad = ctx.createRadialGradient(p.dx, p.dy - p.ry * 0.3, p.ry * 0.1, p.dx, p.dy, p.rx);
      grad.addColorStop(0, `rgba(${rgbTop}, ${cl.alpha * 1.25})`);
      grad.addColorStop(0.55, `rgba(${rgbMid}, ${cl.alpha * 0.85})`);
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(p.dx, p.dy, p.rx, p.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawRainbowArc(ctx, w, h) {
  ctx.save();
  const cx = w * 0.52;
  const cy = h * 0.72;
  const baseR = Math.min(w, h) * 0.56;
  const colors = [
    'rgba(239,68,68,0.16)',
    'rgba(249,115,22,0.16)',
    'rgba(234,179,8,0.16)',
    'rgba(34,197,94,0.16)',
    'rgba(59,130,246,0.16)',
    'rgba(139,92,246,0.16)'
  ];
  colors.forEach((col, i) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(cx, cy, baseR - i * 13, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();
  });
  ctx.restore();
}

function drawSeasonalGround(ctx, w, h, color1, color2, ridgeColor, px, py) {
  ctx.save();
  const nearGrad = ctx.createLinearGradient(0, h - 95, 0, h);
  nearGrad.addColorStop(0, color1);
  nearGrad.addColorStop(1, color2);
  ctx.fillStyle = nearGrad;
  ctx.beginPath();
  ctx.moveTo(-100, h);
  ctx.quadraticCurveTo(w * 0.28 + px * 35, h - 82 + py * 18, w * 0.62 + px * 35, h - 52 + py * 18);
  ctx.quadraticCurveTo(w * 0.88 + px * 35, h - 34 + py * 18, w + 100, h - 72 + py * 18);
  ctx.lineTo(w + 100, h);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = ridgeColor;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-100, h - 55 + py * 18);
  ctx.quadraticCurveTo(w * 0.28 + px * 35, h - 82 + py * 18, w * 0.62 + px * 35, h - 52 + py * 18);
  ctx.quadraticCurveTo(w * 0.88 + px * 35, h - 34 + py * 18, w + 100, h - 72 + py * 18);
  ctx.stroke();
  ctx.restore();
}

window.renderUBWeatherScene = function(ctx, w, h, px = 0, py = 0) {
  if (ubActiveWeather === 'winter') {
    if (typeof drawWinterClouds === 'function') drawWinterClouds(ctx, w, h);
    if (typeof drawSnowGround === 'function') drawSnowGround(ctx, w, h);
    if (typeof updateAndDrawSnowflakes === 'function') updateAndDrawSnowflakes(ctx, w, h);
    return;
  }

  if (ubActiveWeather === 'rain') {
    drawRainbowArc(ctx, w, h);
    drawColoredClouds(ctx, w, h, '100, 116, 139', '51, 65, 85');
    drawSeasonalGround(ctx, w, h, 'rgba(30, 58, 95, 0.45)', 'rgba(15, 23, 42, 0.72)', 'rgba(56, 189, 248, 0.45)', px, py);
    ctx.save();
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.55)';
    ctx.lineWidth = 1.3;
    for (const r of ubRainDrops) {
      r.x += r.vx;
      r.y += r.vy;
      if (r.y > h) { r.y = -20; r.x = Math.random() * w; }
      if (r.x < 0) r.x = w;
      ctx.globalAlpha = r.alpha;
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x + r.vx * 1.4, r.y + r.len);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (ubActiveWeather === 'spring') {
    drawColoredClouds(ctx, w, h, '248, 250, 252', '203, 213, 225');
    drawSeasonalGround(ctx, w, h, 'rgba(34, 197, 94, 0.28)', 'rgba(20, 83, 45, 0.55)', 'rgba(134, 239, 172, 0.45)', px, py);
    for (const p of ubPetals) {
      p.phase += 0.03;
      p.x += p.vx + Math.sin(p.phase) * 0.8;
      p.y += p.vy;
      if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
      if (p.x > w + 10) p.x = -10;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.phase);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 1.4, p.r * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    return;
  }

  if (ubActiveWeather === 'summer') {
    ubSummerTick += 1;
    const parXFar = px * 16;
    const parYFar = py * 10;
    const parXMid = px * 28;
    const parYMid = py * 16;
    const parXNear = px * 42;
    const parYNear = py * 22;

    // 1. BRIGHT BLAZING SUMMER SUN WITH ROTATING RAYS AT THE TOP
    const sunX = w * 0.84 + px * 14;
    const sunY = h * 0.14 + py * 10;
    ctx.save();
    ctx.translate(sunX, sunY);

    // Outer large warm sun aura
    const outerAura = ctx.createRadialGradient(0, 0, 12, 0, 0, 290);
    outerAura.addColorStop(0, 'rgba(254, 240, 138, 0.72)');
    outerAura.addColorStop(0.28, 'rgba(250, 204, 21, 0.34)');
    outerAura.addColorStop(0.62, 'rgba(245, 158, 11, 0.11)');
    outerAura.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = outerAura;
    ctx.beginPath();
    ctx.arc(0, 0, 290, 0, Math.PI * 2);
    ctx.fill();

    // Rotating golden sunbeams / god-rays
    ctx.save();
    ctx.rotate(ubSummerTick * 0.0025);
    const rayCount = 12;
    for (let r = 0; r < rayCount; r++) {
      ctx.rotate((Math.PI * 2) / rayCount);
      const rayGrad = ctx.createLinearGradient(0, 0, 230, 0);
      rayGrad.addColorStop(0, 'rgba(254, 249, 195, 0.42)');
      rayGrad.addColorStop(0.6, 'rgba(250, 204, 21, 0.12)');
      rayGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(230, -24);
      ctx.lineTo(230, 24);
      ctx.lineTo(0, 6);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Bright dazzling sun core
    const coreGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 52);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.55, '#fef08a');
    coreGrad.addColorStop(0.85, '#facc15');
    coreGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = coreGrad;
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 35;
    ctx.beginPath();
    ctx.arc(0, 0, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. FLUFFY WHITE SUMMER CLOUDS
    drawColoredClouds(ctx, w, h, '255, 255, 255', '186, 230, 253');

    // Helper for drawing swaying summer trees
    function drawTreeAt(tx, ty, s, kind, phase, g1, g2) {
      const sway = Math.sin(ubSummerTick * 0.025 + phase) * 3.5 * s;
      ctx.save();
      ctx.translate(tx, ty);

      // Trunk
      ctx.fillStyle = '#5c3a21';
      ctx.beginPath();
      ctx.moveTo(-4 * s, 0);
      ctx.lineTo(4 * s, 0);
      ctx.lineTo(2.2 * s + sway * 0.25, -24 * s);
      ctx.lineTo(-2.2 * s + sway * 0.25, -24 * s);
      ctx.closePath();
      ctx.fill();

      if (kind === 'pine') {
        // 3-tier lush pine tree
        const tiers = [
          { y: -14 * s, w: 22 * s, h: 22 * s },
          { y: -27 * s, w: 18 * s, h: 20 * s },
          { y: -39 * s, w: 13 * s, h: 17 * s }
        ];
        tiers.forEach((tr, idx) => {
          ctx.fillStyle = idx === 2 ? g2 : g1;
          ctx.beginPath();
          ctx.moveTo(-tr.w + sway * (0.3 + idx * 0.2), tr.y);
          ctx.lineTo(tr.w + sway * (0.3 + idx * 0.2), tr.y);
          ctx.lineTo(sway * (0.5 + idx * 0.25), tr.y - tr.h);
          ctx.closePath();
          ctx.fill();
        });
      } else {
        // Broadleaf summer tree with sunlit crown
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(-8 * s + sway * 0.6, -27 * s, 12 * s, 0, Math.PI * 2);
        ctx.arc(8 * s + sway * 0.6, -27 * s, 11 * s, 0, Math.PI * 2);
        ctx.arc(sway * 0.8, -36 * s, 14 * s, 0, Math.PI * 2);
        ctx.fill();

        // Sunlit top-right foliage highlight
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(4 * s + sway * 0.8, -37 * s, 9 * s, 0, Math.PI * 2);
        ctx.arc(10 * s + sway * 0.6, -29 * s, 7.5 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 3. FAR GREEN SUMMER HILLS + FAR TREES
    ctx.save();
    const farHillGrad = ctx.createLinearGradient(0, h - 185, 0, h);
    farHillGrad.addColorStop(0, 'rgba(22, 163, 74, 0.36)');
    farHillGrad.addColorStop(1, 'rgba(20, 83, 45, 0.58)');
    ctx.fillStyle = farHillGrad;
    ctx.beginPath();
    ctx.moveTo(-100, h);
    ctx.quadraticCurveTo(w * 0.22 + parXFar, h - 170 + parYFar, w * 0.52 + parXFar, h - 118 + parYFar);
    ctx.quadraticCurveTo(w * 0.82 + parXFar, h - 76 + parYFar, w + 100, h - 145 + parYFar);
    ctx.lineTo(w + 100, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    for (const tr of ubSummerTrees) {
      if (tr.layer === 0) {
        const ty = h - 112 + Math.sin(tr.x * 0.005) * 18 + parYFar;
        drawTreeAt(tr.x + parXFar, ty, tr.scale, tr.kind, tr.phase, tr.green1, tr.green2);
      }
    }

    // 4. MID-GROUND LUSH MEADOW HILLS + MID TREES
    ctx.save();
    const midHillGrad = ctx.createLinearGradient(0, h - 140, 0, h);
    midHillGrad.addColorStop(0, 'rgba(34, 197, 94, 0.52)');
    midHillGrad.addColorStop(1, 'rgba(21, 128, 61, 0.72)');
    ctx.fillStyle = midHillGrad;
    ctx.beginPath();
    ctx.moveTo(-100, h);
    ctx.quadraticCurveTo(w * 0.18 + parXMid, h - 92 + parYMid, w * 0.45 + parXMid, h - 125 + parYMid);
    ctx.quadraticCurveTo(w * 0.76 + parXMid, h - 148 + parYMid, w + 100, h - 85 + parYMid);
    ctx.lineTo(w + 100, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    for (const tr of ubSummerTrees) {
      if (tr.layer === 1) {
        const ty = h - 84 + Math.cos(tr.x * 0.006) * 14 + parYMid;
        drawTreeAt(tr.x + parXMid, ty, tr.scale, tr.kind, tr.phase, tr.green1, tr.green2);
      }
    }

    // 5. FOREGROUND SUNLIT GREEN MEADOW
    ctx.save();
    const nearMeadowGrad = ctx.createLinearGradient(0, h - 95, 0, h);
    nearMeadowGrad.addColorStop(0, 'rgba(74, 222, 128, 0.68)');
    nearMeadowGrad.addColorStop(0.5, 'rgba(34, 197, 94, 0.80)');
    nearMeadowGrad.addColorStop(1, 'rgba(21, 128, 61, 0.92)');
    ctx.fillStyle = nearMeadowGrad;
    ctx.beginPath();
    ctx.moveTo(-100, h);
    ctx.quadraticCurveTo(w * 0.28 + parXNear, h - 94 + parYNear, w * 0.62 + parXNear, h - 58 + parYNear);
    ctx.quadraticCurveTo(w * 0.88 + parXNear, h - 38 + parYNear, w + 100, h - 76 + parYNear);
    ctx.lineTo(w + 100, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 6. FLOWING CRYSTAL BLUE RIVER WINDING THROUGH THE MEADOW
    const rTopY = h - 118 + parYMid;
    const rBotY = h + 6;
    function getRiverCenter(t) {
      // Smooth S-curve winding from x=0.47*w upstream to x=0.58*w at the bottom
      const baseX = w * (0.47 + t * 0.11) + Math.sin(t * Math.PI * 1.45) * 58;
      const parShift = parXMid * (1 - t) + parXNear * t;
      return baseX + parShift;
    }
    function getRiverHalfWidth(t) {
      return 16 + Math.pow(t, 1.25) * 95;
    }

    ctx.save();
    // River grassy/golden shore border
    ctx.fillStyle = 'rgba(250, 204, 21, 0.35)';
    ctx.beginPath();
    const steps = 22;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const ry = rTopY + (rBotY - rTopY) * t;
      const rx = getRiverCenter(t) - getRiverHalfWidth(t) - 6;
      if (i === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    }
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const ry = rTopY + (rBotY - rTopY) * t;
      const rx = getRiverCenter(t) + getRiverHalfWidth(t) + 6;
      ctx.lineTo(rx, ry);
    }
    ctx.closePath();
    ctx.fill();

    // River water body
    const riverGrad = ctx.createLinearGradient(0, rTopY, 0, rBotY);
    riverGrad.addColorStop(0, 'rgba(14, 165, 233, 0.78)');
    riverGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.86)');
    riverGrad.addColorStop(1, 'rgba(2, 132, 199, 0.94)');
    ctx.fillStyle = riverGrad;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const ry = rTopY + (rBotY - rTopY) * t;
      const rx = getRiverCenter(t) - getRiverHalfWidth(t);
      if (i === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    }
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const ry = rTopY + (rBotY - rTopY) * t;
      const rx = getRiverCenter(t) + getRiverHalfWidth(t);
      ctx.lineTo(rx, ry);
    }
    ctx.closePath();
    ctx.fill();

    // Animated flowing water ripples & sun sparkles inside the river
    for (const rp of ubRiverRipples) {
      rp.t += rp.speed;
      if (rp.t > 1) rp.t -= 1;
      const ry = rTopY + (rBotY - rTopY) * rp.t;
      const hw = getRiverHalfWidth(rp.t);
      const rx = getRiverCenter(rp.t) + rp.lateral * hw;
      const waveW = (8 + rp.t * 22);
      const alpha = Math.sin(rp.t * Math.PI) * 0.75;

      // Flowing water wave line
      ctx.strokeStyle = `rgba(224, 242, 254, ${alpha})`;
      ctx.lineWidth = 1.2 + rp.t * 1.3;
      ctx.beginPath();
      ctx.moveTo(rx - waveW * 0.5, ry);
      ctx.quadraticCurveTo(rx, ry + Math.sin(ubSummerTick * 0.08 + rp.phase) * 2.5, rx + waveW * 0.5, ry);
      ctx.stroke();

      // Golden sun reflection sparkle on water
      if (Math.sin(ubSummerTick * 0.09 + rp.phase) > 0.65) {
        ctx.fillStyle = `rgba(254, 240, 138, ${alpha})`;
        ctx.beginPath();
        ctx.arc(rx, ry, 1.4 + rp.t * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // 7. FOREGROUND TREES
    for (const tr of ubSummerTrees) {
      if (tr.layer === 2) {
        const ty = h - 42 + Math.sin(tr.x * 0.008) * 10 + parYNear;
        drawTreeAt(tr.x + parXNear, ty, tr.scale, tr.kind, tr.phase, tr.green1, tr.green2);
      }
    }

    // 8. SWAYING GREEN GRASS BLADES ACROSS THE FOREGROUND MEADOW
    ctx.save();
    ctx.lineCap = 'round';
    for (const gr of ubSummerGrass) {
      const gx = gr.x + parXNear;
      const gy = h - gr.yOffset + parYNear * 0.6;
      // Skip grass directly in the middle of the water channel
      const tEst = Math.max(0, Math.min(1, (gy - rTopY) / (rBotY - rTopY)));
      if (Math.abs(gx - getRiverCenter(tEst)) < getRiverHalfWidth(tEst) * 0.88) continue;

      const sway = Math.sin(ubSummerTick * 0.04 + gr.phase) * 5.5;
      ctx.strokeStyle = gr.color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx + gr.lean * 0.5 + sway * 0.5, gy - gr.height * 0.5, gx + gr.lean + sway, gy - gr.height);
      ctx.stroke();
    }
    ctx.restore();

    // 9. BLOOMING SUMMER WILDFLOWERS (DANDELIONS, DAISIES, POPPIES, FORGET-ME-NOTS)
    ctx.save();
    for (const fl of ubSummerFlowers) {
      const fx = fl.x + parXNear;
      const fy = h - fl.yOffset + parYNear * 0.6;
      const tEst = Math.max(0, Math.min(1, (fy - rTopY) / (rBotY - rTopY)));
      if (Math.abs(fx - getRiverCenter(tEst)) < getRiverHalfWidth(tEst) * 0.95) continue;

      const sway = Math.sin(ubSummerTick * 0.038 + fl.phase) * 4;
      const headX = fx + sway;
      const headY = fy - fl.stemH;

      // Green flower stem
      ctx.strokeStyle = '#15803d';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.quadraticCurveTo(fx + sway * 0.5, fy - fl.stemH * 0.5, headX, headY);
      ctx.stroke();

      // 5 Flower petals
      ctx.fillStyle = fl.petalColor;
      for (let p = 0; p < 5; p++) {
        const ang = (p * Math.PI * 2) / 5 + ubSummerTick * 0.005;
        const pxPos = headX + Math.cos(ang) * fl.size * 0.85;
        const pyPos = headY + Math.sin(ang) * fl.size * 0.85;
        ctx.beginPath();
        ctx.arc(pxPos, pyPos, fl.size * 0.62, 0, Math.PI * 2);
        ctx.fill();
      }

      // Flower center
      ctx.fillStyle = fl.centerColor;
      ctx.beginPath();
      ctx.arc(headX, headY, fl.size * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  // Autumn
  drawColoredClouds(ctx, w, h, '253, 230, 138', '217, 119, 6');
  drawSeasonalGround(ctx, w, h, 'rgba(180, 83, 9, 0.36)', 'rgba(69, 26, 3, 0.65)', 'rgba(251, 191, 36, 0.45)', px, py);
  for (const lf of ubLeaves) {
    lf.angle += lf.spin;
    lf.x += lf.vx + Math.sin(lf.angle) * 0.7;
    lf.y += lf.vy;
    if (lf.y > h + 15) { lf.y = -15; lf.x = Math.random() * w; }
    if (lf.x > w + 15) lf.x = -15;
    ctx.save();
    ctx.globalAlpha = lf.alpha;
    ctx.translate(lf.x, lf.y);
    ctx.rotate(lf.angle);
    ctx.fillStyle = lf.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, lf.size, lf.size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
};


// ===================== 3. SERVERS (2 PUBLIC 24-SLOT, 2 DM, 1 KZ) + MAP BACKGROUNDS =====================
const MAP_BG_CONFIG = {
  de_dust2:    { img: 'assets/images/map_dust2.jpg',  tint: 'rgba(245, 158, 11, 0.18)' },
  de_mirage:   { img: 'assets/images/map_mirage.jpg', tint: 'rgba(234, 88, 12, 0.18)' },
  de_inferno:  { img: 'assets/images/map_mirage.jpg', tint: 'rgba(220, 38, 38, 0.24)' },
  de_ancient:  { img: 'assets/images/hero_bg.jpg',    tint: 'rgba(22, 163, 74, 0.25)' },
  de_nuke:     { img: 'assets/images/hero_bg.jpg',    tint: 'rgba(59, 130, 246, 0.26)' },
  de_anubis:   { img: 'assets/images/map_dust2.jpg',  tint: 'rgba(234, 179, 8, 0.24)' },
  de_overpass: { img: 'assets/images/hero_bg.jpg',    tint: 'rgba(16, 185, 129, 0.24)' },
  de_vertigo:  { img: 'assets/images/map_surf.jpg',   tint: 'rgba(14, 165, 233, 0.26)' },
  kz_neon_bhop:{ img: 'assets/images/map_surf.jpg',   tint: 'rgba(168, 85, 247, 0.26)' }
};

function getMapBgInfo(mapName) {
  return MAP_BG_CONFIG[mapName] || { img: 'assets/images/hero_bg.jpg', tint: 'rgba(59,130,246,0.2)' };
}

const COMMUNITY_SERVERS = [
  {
    id: 'pub1', mode: 'public', title: 'PUBLIC #1', badge: '24 SLOT',
    desc: '24 хүнтэй сонгодог Public сервер · Бүх skin, VIP +HP, хөгжилтэй тоглолт.',
    players: 22, maxPlayers: 24, map: 'de_dust2', tick: '128-tick',
    ip: 'connect.mongolz.gg:27015', tags: ['24 Slot', 'Auto-Balance', '!ws !knife']
  },
  {
    id: 'pub2', mode: 'public', title: 'PUBLIC #2', badge: '24 SLOT',
    desc: '24 хүнтэй Public #2 · Mirage / Inferno / Dust2 rotation, шинэ тоглогчдод нээлттэй.',
    players: 19, maxPlayers: 24, map: 'de_mirage', tick: '128-tick',
    ip: 'connect.mongolz.gg:27016', tags: ['24 Slot', 'Map Vote', 'Fun']
  },
  {
    id: 'dm1', mode: 'deathmatch', title: 'DEATHMATCH #1 (FFA)', badge: 'AIM WARMUP',
    desc: '128-tick Free-For-All DM сервер · Шууд respawn, AK/M4/AWP бэлтгэл.',
    players: 18, maxPlayers: 20, map: 'de_mirage', tick: '128-tick',
    ip: 'connect.mongolz.gg:27017', tags: ['FFA', 'Instant Respawn', '128-tick']
  },
  {
    id: 'dm2', mode: 'deathmatch', title: 'DEATHMATCH #2 (HS / PISTOL)', badge: 'HEADSHOT',
    desc: 'Headshot & Pistol aim дасгалжуулалт · Pro тоглогчид шиг буудлагаа сайжруул.',
    players: 16, maxPlayers: 20, map: 'de_dust2', tick: '128-tick',
    ip: 'connect.mongolz.gg:27018', tags: ['HS Only', 'Pistols', '128-tick']
  },
  {
    id: 'kz1', mode: 'kz', title: 'KZ / BHOP #1', badge: '★ RECORDS',
    desc: 'KZ Climb & Bunny Hop сервер · Timer, checkpoint, дэлхийн болон Монголын рекорд.',
    players: 18, maxPlayers: 32, map: 'kz_neon_bhop', tick: '128-tick',
    ip: 'connect.mongolz.gg:27019', tags: ['Timer', 'KZ + Bhop', 'Top 15 DB']
  }
];

function renderCommunityServers() {
  const grid = document.getElementById('communityServersGrid');
  if (!grid) return;
  grid.innerHTML = COMMUNITY_SERVERS.map(srv => {
    const pct = Math.round((srv.players / srv.maxPlayers) * 100);
    const bg = getMapBgInfo(srv.map);
    return `
      <div class="server-card server-card-mapbg" data-mode="${srv.mode}" style="--map-img: url('${bg.img}'); --map-tint: ${bg.tint}">
        <div class="card-map-overlay"></div>
        <div class="card-header">
          <span class="srv-map-pill">🗺️ ${srv.map}</span>
          <div class="card-status status-online"><span class="status-pulse"></span>${srv.badge}</div>
        </div>
        <h3 class="card-title">${srv.title}</h3>
        <p class="card-desc">${srv.desc}</p>
        <div class="card-meta">
          <div class="meta-row">
            <span class="meta-label">Тоглогч</span>
            <div class="player-bar"><div class="player-fill" style="width:${pct}%"></div></div>
            <span class="meta-value">${srv.players}/${srv.maxPlayers}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Tick / IP</span>
            <span class="meta-value blue">${srv.tick}</span>
          </div>
        </div>
        <div class="card-tags">
          ${srv.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <button class="card-btn" onclick="connectServer('${srv.mode}','${srv.ip}')">
          ▶ Нэгдэх (${srv.ip.split(':')[1]})
        </button>
      </div>
    `;
  }).join('');

  updateHeroOnlineBreakdown();
}

function updateHeroOnlineBreakdown() {
  const pub = COMMUNITY_SERVERS.filter(s => s.mode === 'public').reduce((a, b) => a + b.players, 0);
  const dm  = COMMUNITY_SERVERS.filter(s => s.mode === 'deathmatch').reduce((a, b) => a + b.players, 0);
  const kz  = COMMUNITY_SERVERS.filter(s => s.mode === 'kz').reduce((a, b) => a + b.players, 0);
  let comp = 380;
  if (typeof ALL_MATCHES !== 'undefined') {
    comp = ALL_MATCHES.reduce((acc, m) => acc + (m.status === 'live' ? 10 : 8), 0);
  }
  const total = pub + dm + kz + comp;
  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('onlinePublicCount', pub);
  setTxt('onlineDmCount', dm);
  setTxt('onlineKzCount', kz);
  setTxt('onlineCompCount', comp);
  setTxt('heroTotalOnlineBadge', total);
  setTxt('heroTotalOnlineNum', total);
}

// Enhance 5v5 renderMatches so every match card shows its map background image!
const _origRenderMatches = window.renderMatches;
window.renderMatches = function() {
  if (typeof _origRenderMatches === 'function') {
    _origRenderMatches();
  }
  const cards = document.querySelectorAll('#matchesGrid .match-card');
  cards.forEach(card => {
    const mapEl = card.querySelector('.match-map');
    if (!mapEl) return;
    const mapName = mapEl.textContent.trim();
    const bg = getMapBgInfo(mapName);
    card.classList.add('match-card-mapbg');
    card.style.setProperty('--map-img', `url('${bg.img}')`);
    card.style.setProperty('--map-tint', bg.tint);
  });
};


// ===================== 4. SKIN CHANGER: PLAYER MODELS + VIP+ SKIN COLOR =====================
let vipCustomSkinColor = '';

function hasVipOrAbove() {
  if (typeof activeRankId === 'undefined') return false;
  return ['vip', 'vip_plus', 'moderator', 'admin', 'overlord'].includes(activeRankId);
}

function updateVipColorLockUI() {
  const badge = document.getElementById('vipColorLockBadge');
  const upBtn = document.getElementById('vipColorUpgradeBtn');
  const box = document.getElementById('vipColorBox');
  if (!badge) return;
  if (hasVipOrAbove()) {
    badge.textContent = '✅ VIP+ Нээлттэй';
    badge.style.color = '#4ade80';
    badge.style.borderColor = 'rgba(34,197,94,0.4)';
    if (upBtn) upBtn.style.display = 'none';
    if (box) box.classList.add('unlocked');
  } else {
    badge.textContent = '🔒 VIP болон түүнээс дээш';
    badge.style.color = '#fbbf24';
    if (upBtn) upBtn.style.display = '';
    if (box) box.classList.remove('unlocked');
  }
}

function setVipSkinColor(hex, btn) {
  if (hex && !hasVipOrAbove()) {
    showToast('warning', '🔒', 'VIP+ Эрх шаардлагатай', 'Skin-ийхээ өнгийг тусгайлан солихын тулд VIP болон түүнээс дээш эрх авна уу!', 3800);
    return;
  }
  vipCustomSkinColor = hex;
  document.querySelectorAll('.svc-swatch').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const svgWrap = document.getElementById('weaponSvg');
  const previewBox = document.getElementById('previewBox');
  if (svgWrap) {
    if (hex) {
      svgWrap.style.filter = `drop-shadow(0 0 22px ${hex}) drop-shadow(0 0 8px ${hex})`;
    } else {
      svgWrap.style.filter = '';
    }
  }
  if (previewBox) {
    previewBox.style.boxShadow = hex ? `inset 0 0 45px ${hex}44, 0 0 24px ${hex}33` : '';
  }
  if (hex) {
    showToast('success', '🎨', 'VIP Skin Өнгө', `Таны skin-ийн тусгай өнгө (${hex}) идэвхжлээ!`, 2200);
  }
}

function initPlayerModelsInSkinChanger() {
  if (typeof WEAPONS === 'undefined' || typeof SKINS_DB === 'undefined') return;

  WEAPONS.agents = [
    { id: 'agent_sas', name: 'SAS Tactical (CT)', emoji: '🛡️', isAgent: true },
    { id: 'agent_ava', name: 'Special Agent Ava (CT)', emoji: '🛡️', isAgent: true },
    { id: 'agent_goggles', name: 'Cmdr. Davida Goggles (CT)', emoji: '🛡️', isAgent: true },
    { id: 'agent_fbi_sniper', name: 'FBI Sniper (CT)', emoji: '🛡️', isAgent: true },
    { id: 'agent_seal_frogman', name: 'SEAL Frogman (CT)', emoji: '🛡️', isAgent: true },
    { id: 'agent_gendarmerie', name: 'Chef d\'Escadron Rouchard (CT)', emoji: '🛡️', isAgent: true },
    { id: 'agent_number_k', name: 'Number K — Professionals (T)', emoji: '💀', isAgent: true },
    { id: 'agent_darryl_miami', name: 'Sir Bloody Miami Darryl (T)', emoji: '💀', isAgent: true },
    { id: 'agent_romanov', name: 'The Doctor Romanov (T)', emoji: '💀', isAgent: true },
    { id: 'agent_phoenix', name: 'Street Soldier Phoenix (T)', emoji: '💀', isAgent: true },
    { id: 'agent_sabre', name: 'Blackwolf Sabre (T)', emoji: '💀', isAgent: true },
    { id: 'agent_guerrilla', name: 'Elite Trapper Solman (T)', emoji: '💀', isAgent: true },
    { id: 'agent_vip_cyber', name: '⭐ VIP Cyber Ghost', emoji: '🤖', isAgent: true },
    { id: 'agent_vip_mongol', name: '💎 VIP+ Mongol Warrior', emoji: '🏹', isAgent: true },
    { id: 'agent_admin_crimson', name: '👑 Admin Crimson Reaper', emoji: '👹', isAgent: true },
    { id: 'agent_overlord_gold', name: '⚡ Overlord Golden Emperor', emoji: '👑', isAgent: true }
  ];

  const agentSvgStr = `<svg viewBox="0 0 260 150" width="220" height="130" fill="none">
    <defs>
      <linearGradient id="agGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/>
      </linearGradient>
    </defs>
    <circle cx="130" cy="34" r="20" fill="url(#agGrad)" stroke="#fff" stroke-width="1.5"/>
    <rect x="116" y="27" width="28" height="8" rx="4" fill="#0f172a"/>
    <path d="M96 66 C96 55 164 55 164 66 L172 118 L148 118 L144 144 L116 144 L112 118 L88 118 Z" fill="url(#agGrad)" stroke="#fff" stroke-width="1.5"/>
    <rect x="112" y="72" width="36" height="24" rx="4" fill="rgba(0,0,0,0.35)" stroke="#ffd000" stroke-width="1"/>
    <text x="130" y="88" fill="#ffd000" font-family="Orbitron" font-size="10" font-weight="900" text-anchor="middle">MZ</text>
  </svg>`;

  if (typeof WEAPON_SVGS !== 'undefined') {
    WEAPON_SVGS['Agent'] = agentSvgStr;
  }

  WEAPONS.agents.forEach(ag => {
    ag.svgKey = 'Agent';
    SKINS_DB[ag.id] = [
      { name: 'Default Tactical', rarity: 'restricted', emoji: ag.emoji, color1: '#3b82f6', color2: '#0f172a', float: 0.02, wear: 'Factory New' },
      { name: 'MongolZ Gold Edition', rarity: 'covert', emoji: '👑', color1: '#f0a800', color2: '#451a03', float: 0.008, wear: 'Factory New' },
      { name: 'Stealth Shadow', rarity: 'classified', emoji: '🕶️', color1: '#475569', color2: '#020617', float: 0.03, wear: 'Factory New' }
    ];
  });
}


// ===================== 5. EXACT 3 CASE TYPES =====================
function upgradeCasesToExactThree() {
  if (typeof CS2_CASES === 'undefined') return;
  CS2_CASES.length = 0;
  CS2_CASES.push(
    {
      id: 'elo_50k',
      name: '🏆 50,000 ELO REWARD CASE',
      sub: '50,000 ELO хүрэх бүрд 1 удаа ҮНЭГҮЙ skin задлах кейс унана!',
      emoji: '🏆',
      price: 0,
      isEloCase: true,
      badge: '50K ELO FREE',
      accent: '#22c55e',
      items: [
        { weaponId: 'glock', weaponName: 'Glock-18', skinName: 'Water Elemental', emoji: '💧', rarity: 'restricted', color: '#8847ff', sellPrice: 2500, weight: 28, color1: '#00bcd4', color2: '#01579b', float: 0.06, wear: 'Minimal Wear' },
        { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Redline', emoji: '🔴', rarity: 'classified', color: '#d32ce6', sellPrice: 4500, weight: 24, color1: '#c0392b', color2: '#1a0808', float: 0.14, wear: 'Field-Tested' },
        { weaponId: 'm4a1s', weaponName: 'M4A1-S', skinName: 'Printstream', emoji: '🤍', rarity: 'covert', color: '#eb4b4b', sellPrice: 7500, weight: 18, color1: '#ffffff', color2: '#1e293b', float: 0.02, wear: 'Factory New' },
        { weaponId: 'deagle', weaponName: 'Desert Eagle', skinName: 'Blaze', emoji: '🔥', rarity: 'covert', color: '#eb4b4b', sellPrice: 12000, weight: 14, color1: '#ff8c00', color2: '#1a0500', float: 0.01, wear: 'Factory New' },
        { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Vulcan', emoji: '⚡', rarity: 'covert', color: '#eb4b4b', sellPrice: 16000, weight: 10, color1: '#38bdf8', color2: '#0f172a', float: 0.03, wear: 'Factory New' },
        { weaponId: 'awp', weaponName: 'AWP', skinName: 'Asiimov', emoji: '🤖', rarity: 'covert', color: '#eb4b4b', sellPrice: 22000, weight: 6, color1: '#f97316', color2: '#111827', float: 0.18, wear: 'Field-Tested' }
      ]
    },
    {
      id: 'standard_10k',
      name: '📦 STANDARD CASE (10K MZ)',
      sub: '10,000 MZ Coin — CS2-ийн хамгийн эрэлттэй бууны skin-үүд унана',
      emoji: '📦',
      price: 10000,
      badge: '10,000 MZ',
      accent: '#3b82f6',
      items: [
        { weaponId: 'usps', weaponName: 'USP-S', skinName: 'Neo-Noir', emoji: '🌙', rarity: 'classified', color: '#d32ce6', sellPrice: 6500, weight: 28, color1: '#9b2ef4', color2: '#1a0a2e', float: 0.06, wear: 'Minimal Wear' },
        { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Bloodsport', emoji: '💉', rarity: 'classified', color: '#d32ce6', sellPrice: 9500, weight: 24, color1: '#cc0000', color2: '#111111', float: 0.04, wear: 'Factory New' },
        { weaponId: 'm4a4', weaponName: 'M4A4', skinName: 'Neo-Noir', emoji: '💜', rarity: 'covert', color: '#eb4b4b', sellPrice: 12500, weight: 19, color1: '#ec4899', color2: '#1e1b4b', float: 0.05, wear: 'Factory New' },
        { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Fire Serpent', emoji: '🐍', rarity: 'covert', color: '#eb4b4b', sellPrice: 18000, weight: 14, color1: '#22c55e', color2: '#14532d', float: 0.07, wear: 'Minimal Wear' },
        { weaponId: 'awp', weaponName: 'AWP', skinName: 'Hyper Beast', emoji: '👾', rarity: 'covert', color: '#eb4b4b', sellPrice: 24000, weight: 10, color1: '#a855f7', color2: '#0f172a', float: 0.02, wear: 'Factory New' },
        { weaponId: 'm4a4', weaponName: 'M4A4', skinName: 'Howl (Contraband)', emoji: '🐺', rarity: 'covert', color: '#eb4b4b', sellPrice: 38000, weight: 5, color1: '#dc2626', color2: '#450a0a', float: 0.03, wear: 'Factory New' }
      ]
    },
    {
      id: 'elite_50k',
      name: '👑 ELITE KNIFE & GLOVE CASE (50K MZ)',
      sub: '50,000 MZ Coin — Ховор Skin-үүд + Аз таарвал ★ Хутга & Бээлий унана!',
      emoji: '👑',
      price: 50000,
      badge: '★ ХУТГА & БЭЭЛИЙ',
      accent: '#ffd700',
      items: [
        { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Wild Lotus', emoji: '🌸', rarity: 'covert', color: '#eb4b4b', sellPrice: 38000, weight: 28, color1: '#e879a0', color2: '#2d0a1f', float: 0.02, wear: 'Factory New' },
        { weaponId: 'awp', weaponName: 'AWP', skinName: 'Gungnir', emoji: '⚡', rarity: 'covert', color: '#eb4b4b', sellPrice: 46000, weight: 22, color1: '#5b9bd5', color2: '#1a2d44', float: 0.009, wear: 'Factory New' },
        { weaponId: 'awp', weaponName: 'AWP', skinName: 'Dragon Lore (FN)', emoji: '🐉', rarity: 'covert', color: '#eb4b4b', sellPrice: 68000, weight: 16, color1: '#c8860a', color2: '#5c3800', float: 0.007, wear: 'Factory New' },
        { weaponId: 'sport', weaponName: '★ Sport Gloves', skinName: "Pandora's Box", emoji: '🧤', rarity: 'gold', color: '#ffd700', sellPrice: 95000, weight: 13, color1: '#9b2ef4', color2: '#2d0040', float: 0.06, wear: 'Minimal Wear' },
        { weaponId: 'butterfly', weaponName: '★ Butterfly Knife', skinName: 'Fade 100%', emoji: '🗡️', rarity: 'gold', color: '#ffd700', sellPrice: 135000, weight: 12, color1: '#ff6600', color2: '#9b2ef4', float: 0.004, wear: 'Factory New' },
        { weaponId: 'karambit', weaponName: '★ Karambit', skinName: 'Gamma Doppler Emerald', emoji: '💎', rarity: 'gold', color: '#ffd700', sellPrice: 180000, weight: 9, color1: '#22c55e', color2: '#052e16', float: 0.005, wear: 'Factory New' }
      ]
    }
  );
  if (typeof renderCaseSelector === 'function') renderCaseSelector();
  if (typeof selectCaseTier === 'function') selectCaseTier(0);
}


// ===================== 6. EXACT 5 RANKS SHOP + WARNING MODAL + SERVER CHOICE =====================
const EXACT_RANKS = [
  {
    id: 'vip',
    name: 'VIP',
    emoji: '⭐',
    color: '#22c55e',
    chatTag: '[VIP]',
    tagline: 'Энгийн тоглогчоос ялгарах VIP давуу эрхүүд',
    popular: false,
    needsServer: true,
    durations: [
      { days: 7,  label: '7 хоног',  price: 10000 },
      { days: 30, label: '30 хоног', price: 30000 }
    ],
    perks: [
      'Энгийн хүн хутгалж эсвэл Zeus хийвэл +10 HP нэмнэ',
      'Гранат шидэхэд өнгөт мөр гарна (Colored Grenade Trail)',
      'Player Model сонголтоор тусдаа өөрчилнө',
      'Skin Changer дээр Skin-ийхээ өнгийг солих эрх',
      'Тоглоом, Сайт болон Discord дээр [VIP] таг & давуу эрх'
    ]
  },
  {
    id: 'vip_plus',
    name: 'VIP+',
    emoji: '💎',
    color: '#f0a800',
    chatTag: '[VIP+]',
    tagline: 'Хамгийн эрэлттэй — Хутга/Zeus +20 HP & Онцгой Model',
    popular: true,
    needsServer: true,
    durations: [
      { days: 7,  label: '7 хоног',  price: 18000 },
      { days: 30, label: '30 хоног', price: 40000 }
    ],
    perks: [
      'Энгийн хүн хутгалж эсвэл Zeus хийвэл +20 HP нэмнэ',
      'Гранат шидэхэд тод өнгөт мөртэй (Neon Trail)',
      'VIP+ онцгой Player Model-ууд + Skin өнгө солих эрх',
      'Алтан [VIP+] таг · Discord & Сайт дээр VIP+ давуу эрх',
      '5v5 Match & Public серверт дараалалгүй орох (Reserved Slot)'
    ]
  },
  {
    id: 'moderator',
    name: 'MODERATOR',
    emoji: '🛡️',
    color: '#3b82f6',
    chatTag: '[MOD]',
    tagline: 'VIP+ бүх эрх + Серверийн дэг журам сахиулах эрх',
    popular: false,
    needsServer: true,
    durations: [
      { days: 30,  label: '30 хоног', price: 60000 },
      { days: 90,  label: '90 хоног', price: 120000 },
      { days: 999, label: 'Үүрдийн',  price: 250000 }
    ],
    perks: [
      'VIP болон VIP+-ийн бүх эрх 100% багтсан',
      'kick, slay, mute, gag, silence, chat & mic хаах эрх',
      'votemap ажиллуулах болон тоглогчдыг хянах',
      'Cheater байвал түр зуурын бан (Temp-Ban) хийх эрх',
      'Public / Deathmatch / Competitive аль дээр авахаа сонгоно'
    ]
  },
  {
    id: 'admin',
    name: 'ADMIN',
    emoji: '👑',
    color: '#ef4444',
    chatTag: '[ADMIN]',
    tagline: 'Улаан тагтай бүрэн Админ · Бүх 40x 5v5 дараалалгүй Spec',
    popular: false,
    needsServer: true,
    durations: [
      { days: 30,  label: '30 хоног', price: 80000 },
      { days: 90,  label: '90 хоног', price: 200000 },
      { days: 999, label: 'Үүрдийн',  price: 500000 }
    ],
    perks: [
      'VIP, VIP+ болон Moderator-ийн бүх эрх багтсан',
      'Бүх 40 ширхэг 5v5 серверт дараалалгүй Spec хийх эрх',
      'Улаан [ADMIN] таг + Тусгай Admin Skin & Player Model',
      'Map солих, Match Start / Pause, Perm-Ban хүртэл өгөх эрх',
      'Public / Deathmatch / Competitive аль дээр авахаа сонгоно'
    ]
  },
  {
    id: 'overlord',
    name: 'OVERLORD',
    emoji: '⚡',
    color: '#d946ef',
    chatTag: '[★OVERLORD★]',
    tagline: 'Хамгийн том Админ — Бүх 45 сервер & 40 Match дээр бүрэн эрхтэй!',
    popular: false,
    isOverlord: true,
    needsServer: false,
    durations: [
      { days: 999, label: 'Бүх Match · Үүрдийн', price: 3000000 }
    ],
    perks: [
      'Алтан-ягаан [★OVERLORD★] цол — Бүх match & серверт эрхтэй',
      'Бүрэн RCON эрх & Серверийн тохиргоо удирдах',
      'Дурын 3 хүнийг Moderator-оор томилох онцгой эрх',
      'Бүх Ban / Mute цуцлах & Тусгай Overlord командууд',
      'Серверт ороход бүх тоглогчдод Overlord мэндчилгээ гарна!'
    ]
  }
];

const rankSelectedDurIdx = { vip: 0, vip_plus: 0, moderator: 0, admin: 0, overlord: 0 };
let pendingPurchaseRankId = null;
let pendingPurchaseServer = 'Public';

function selectRankCardDuration(rankId, idx) {
  rankSelectedDurIdx[rankId] = idx;
  renderExactRanksShop();
}

function renderExactRanksShop() {
  const grid = document.getElementById('ranksGrid');
  const dp = document.getElementById('durationPicker');
  if (dp) dp.style.display = 'none';
  if (!grid) return;

  grid.innerHTML = EXACT_RANKS.map(rank => {
    const durIdx = rankSelectedDurIdx[rank.id] || 0;
    const dur = rank.durations[durIdx];
    const isActive = typeof activeRankId !== 'undefined' && activeRankId === rank.id;
    return `
      <div class="rank-card ${rank.popular ? 'rank-popular' : ''} ${rank.isOverlord ? 'rank-overlord' : ''} ${isActive ? 'rank-owned' : ''}" style="--rc-color:${rank.color};--rank-color:${rank.color}">
        ${rank.popular ? '<div class="rank-ribbon">🔥 ХАМГИЙН ЭРЭЛТТЭЙ</div>' : ''}
        ${rank.isOverlord ? '<div class="rank-ribbon overlord-ribbon">👑 ДЭЭД АДМИН · БҮХ MATCH</div>' : ''}
        <div class="rank-header">
          <div class="rank-emoji">${rank.emoji}</div>
          <div class="rank-title-wrap">
            <div class="rank-name">${rank.name}</div>
            <span class="rank-chat-tag ${rank.isOverlord ? 'overlord-tag' : ''}" style="color:${rank.color};border-color:${rank.color}55;background:${rank.color}18">${rank.chatTag}</span>
          </div>
        </div>
        <p class="rank-tagline">${rank.tagline}</p>

        <div class="rank-dur-pills">
          ${rank.durations.map((d, i) => `
            <button type="button" class="rdp-btn ${i === durIdx ? 'active' : ''}" onclick="selectRankCardDuration('${rank.id}', ${i})">
              ${d.label}
            </button>
          `).join('')}
        </div>

        <div class="rank-price-box">
          <div class="rank-price">${dur.price.toLocaleString()} <small>MZ COIN</small></div>
          <div class="rank-dur-row">
            <span class="rank-dur-pill">⏱ ${dur.label}</span>
            <span class="rank-srv-pill">${rank.needsServer ? '🖥️ Сервер сонгоно' : '🌐 Бүх 45 сервер'}</span>
          </div>
        </div>

        <ul class="rank-perks">
          ${rank.perks.map(p => `<li><span class="rp-check">✓</span><span>${p}</span></li>`).join('')}
        </ul>

        <button class="rank-buy-btn" onclick="openRankWarningModal('${rank.id}')">
          ${isActive ? '✅ Идэвхтэй эрх (Сунгах)' : `🛒 Худалдан авах · ${dur.price.toLocaleString()} MZ`}
        </button>
      </div>
    `;
  }).join('');
}

function openRankWarningModal(rankId) {
  const rank = EXACT_RANKS.find(r => r.id === rankId);
  if (!rank) return;
  pendingPurchaseRankId = rankId;
  pendingPurchaseServer = rank.needsServer ? 'Public' : 'Бүх сервер & 40x 5v5 Match';

  const dur = rank.durations[rankSelectedDurIdx[rankId] || 0];
  const sumBox = document.getElementById('rwSummaryBox');
  const srvWrap = document.getElementById('rwServerSelectWrap');
  const agreeCb = document.getElementById('rwAgreeCheckbox');
  if (agreeCb) agreeCb.checked = false;

  if (sumBox) {
    sumBox.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <div>
          <div style="font-weight:800;font-size:1.05rem;color:${rank.color}">${rank.emoji} ${rank.name} ${rank.chatTag}</div>
          <div style="font-size:0.8rem;color:var(--text-secondary)">Хугацаа: <strong>${dur.label}</strong></div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-display);font-size:1.15rem;font-weight:900;color:#ffd000">${dur.price.toLocaleString()} MZ</div>
          <div style="font-size:0.74rem;color:var(--text-muted)">Таны үлдэгдэл: ${(window.mzBalance || 0).toLocaleString()} MZ</div>
        </div>
      </div>
    `;
  }
  if (srvWrap) {
    srvWrap.style.display = rank.needsServer ? '' : 'none';
    document.querySelectorAll('.rw-srv-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  }
  const modal = document.getElementById('rankWarningModal');
  if (modal) modal.classList.add('open');
}

function closeRankWarningModal() {
  const modal = document.getElementById('rankWarningModal');
  if (modal) modal.classList.remove('open');
}

function pickRankServer(srvName, btn) {
  pendingPurchaseServer = srvName;
  document.querySelectorAll('.rw-srv-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function executeConfirmedRankPurchase() {
  const agreeCb = document.getElementById('rwAgreeCheckbox');
  if (agreeCb && !agreeCb.checked) {
    showToast('warning', '⚠️', 'Санамж зөвшөөрөх', 'Худалдан авахын өмнө дүрэм, санамжийг зөвшөөрсөн чагтаа дарна уу!', 3200);
    return;
  }
  const rank = EXACT_RANKS.find(r => r.id === pendingPurchaseRankId);
  if (!rank) return;
  const dur = rank.durations[rankSelectedDurIdx[rank.id] || 0];

  if (typeof mzBalance !== 'undefined' && mzBalance < dur.price) {
    closeRankWarningModal();
    showToast('warning', '🪙', 'MZ Coin хүрэлцэхгүй байна', `${dur.price.toLocaleString()} MZ шаардлагатай. Дээд хэсгээс MZ Coin цэнэглээрэй!`, 4000);
    if (typeof openTopupModal === 'function') openTopupModal();
    return;
  }

  if (typeof mzBalance !== 'undefined') mzBalance -= dur.price;
  if (typeof activeRankId !== 'undefined') activeRankId = rank.id;

  const rankText = document.getElementById('userRankText');
  if (rankText) rankText.textContent = `${rank.name} (${pendingPurchaseServer})`;
  const shopRankEl = document.getElementById('shopCurrentRank');
  if (shopRankEl) shopRankEl.innerHTML = `<span style="color:${rank.color};font-weight:800">${rank.chatTag} ${rank.name}</span> · ${pendingPurchaseServer}`;

  if (typeof ownedItems !== 'undefined') {
    ownedItems.unshift(`${rank.emoji} ${rank.name} (${dur.label} · ${pendingPurchaseServer})`);
  }
  if (typeof updateMzWalletUI === 'function') updateMzWalletUI();
  if (typeof renderOwnedStrip === 'function') renderOwnedStrip();
  renderExactRanksShop();
  updateVipColorLockUI();
  closeRankWarningModal();

  showToast('success', rank.emoji, `${rank.name} Эрх Идэвхжлээ!`, `${pendingPurchaseServer} дээр ${dur.label} хугацаатай амжилттай идэвхжлээ!`, 4500);
  if (rank.isOverlord && typeof appendChatMessage === 'function') {
    appendChatMessage('[★OVERLORD★]', '#d946ef', 'SYSTEM', '⚡ ШИНЭ OVERLORD АДМИН НЭГДЛЭЭ! Бүх тоглогчид мэндчилж байна! 👑');
  }
}

// Override app.js renderRanksShop so our exact 5 ranks always render
window.renderRanksShop = renderExactRanksShop;


// ===================== 7. FULL TOP 15 LEADERBOARD (8 CATEGORIES) =====================
const TOP15_PLAYERS = [
  'bLitz', 'Senzu', '910', 'Techno4K', 'mzinho',
  'Zolboo_MN', 'Khaan_AWP', 'TemkaCS', 'Tuguldur99', 'Anand_Aim',
  'Bilguun_UB', 'Chingis_Pro', 'Batuka_MZ', 'Ochir_HS', 'Enkhee_KZ'
];

const TOP15_CONFIG = {
  kills:    { cols: ['#', 'Тоглогч', 'Нийт Алалт', 'HS%', 'K/D', 'ELO'],            unit: 'kills', base: 18420, step: 740 },
  headshot: { cols: ['#', 'Тоглогч', 'Headshot Алалт', 'HS%', 'K/D', 'Тоглолт'],    unit: 'HS',    base: 11250, step: 490 },
  ak47:     { cols: ['#', 'Тоглогч', 'AK-47 Алалт', 'AK HS%', 'Нарийвчлал', 'ELO'], unit: 'AK',    base: 8940,  step: 380 },
  awp:      { cols: ['#', 'Тоглогч', 'AWP Алалт', 'No-Scope', 'K/D', 'ELO'],        unit: 'AWP',   base: 7620,  step: 340 },
  knife:    { cols: ['#', 'Тоглогч', 'Хутга Алалт', 'Backstab%', 'VIP +HP', 'ELO'], unit: 'Knife', base: 642,   step: 29 },
  zeus:     { cols: ['#', 'Тоглогч', 'Zeus Алалт', 'Онолт%', 'Streak', 'ELO'],      unit: 'Zeus',  base: 418,   step: 21 },
  public:   { cols: ['#', 'Тоглогч', 'Public Оноо', 'Алалт', 'K/D', 'Цаг'],         unit: 'PTS',   base: 54200, step: 2100 },
  kz:       { cols: ['#', 'Тоглогч', 'KZ Record', 'Map', 'Bhop Jump', 'Оноо'],      unit: 'time',  base: 42.18, step: 1.45 }
};

let activeTop15Tab = 'kills';

window.switchLBTab = function(tab) {
  activeTop15Tab = TOP15_CONFIG[tab] ? tab : 'kills';
  document.querySelectorAll('.lb-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.lbtab === activeTop15Tab);
  });
  renderTop15Leaderboard();
};

function renderTop15Leaderboard() {
  const headRow = document.getElementById('lbHeadRow');
  const tbody = document.getElementById('lbBody');
  const cfg = TOP15_CONFIG[activeTop15Tab];
  if (!tbody || !cfg) return;

  if (headRow) {
    headRow.innerHTML = cfg.cols.map(c => `<th>${c}</th>`).join('');
  }

  const kzMaps = ['kz_neon_bhop', 'kz_quantum', 'kz_colors_v2', 'bhop_mongol', 'kz_synergy'];
  const offset = Object.keys(TOP15_CONFIG).indexOf(activeTop15Tab);

  tbody.innerHTML = Array.from({ length: 15 }, (_, i) => {
    const pName = TOP15_PLAYERS[(i + offset * 2) % TOP15_PLAYERS.length];
    const rankNum = i + 1;
    const medal = rankNum === 1 ? '🥇' : rankNum === 2 ? '🥈' : rankNum === 3 ? '🥉' : `#${rankNum}`;
    const avatarColor = (typeof AVATAR_COLORS !== 'undefined') ? AVATAR_COLORS[i % AVATAR_COLORS.length] : '#f0a800';
    const kd = (2.15 - i * 0.06).toFixed(2);
    const hs = Math.max(38, 72 - i * 2);
    const elo = 2850 - i * 75;

    let col3, col4, col5, col6;
    if (activeTop15Tab === 'kz') {
      const sec = (cfg.base + i * cfg.step).toFixed(2);
      col3 = `<span style="color:#a855f7;font-weight:800">00:${sec}</span>`;
      col4 = kzMaps[i % kzMaps.length];
      col5 = `${282 - i * 2} u/s`;
      col6 = `${(15400 - i * 620).toLocaleString()}`;
    } else if (activeTop15Tab === 'public') {
      col3 = `<span style="color:#ffd000;font-weight:800">${(cfg.base - i * cfg.step).toLocaleString()}</span>`;
      col4 = (6400 - i * 290).toLocaleString();
      col5 = kd;
      col6 = `${(320 - i * 14)} цаг`;
    } else if (activeTop15Tab === 'knife') {
      col3 = `<span style="color:#ef4444;font-weight:800">🗡️ ${cfg.base - i * cfg.step}</span>`;
      col4 = `${74 - i}%`;
      col5 = i < 5 ? '+20 HP' : '+10 HP';
      col6 = elo;
    } else if (activeTop15Tab === 'zeus') {
      col3 = `<span style="color:#38bdf8;font-weight:800">⚡ ${cfg.base - i * cfg.step}</span>`;
      col4 = `${88 - i * 2}%`;
      col5 = `${Math.max(2, 9 - Math.floor(i / 2))}x`;
      col6 = elo;
    } else {
      col3 = `<span style="color:#ffd000;font-weight:800">${(cfg.base - i * cfg.step).toLocaleString()}</span>`;
      col4 = `${hs}%`;
      col5 = kd;
      col6 = elo;
    }

    return `
      <tr onclick="if(typeof openPlayerProfile==='function')openPlayerProfile('${pName}')" style="cursor:pointer">
        <td class="lb-rank">${medal}</td>
        <td>
          <div class="lb-player">
            <div class="lb-avatar" style="background:${avatarColor}">${pName.slice(0, 2).toUpperCase()}</div>
            <span class="lb-name">${pName}</span>
          </div>
        </td>
        <td>${col3}</td>
        <td>${col4}</td>
        <td>${col5}</td>
        <td>${col6}</td>
      </tr>
    `;
  }).join('');
}
window.renderLeaderboard = renderTop15Leaderboard;


// ===================== 8. OFFICIAL DISCORD AUTH =====================
let linkedDiscordUser = null;

function openDiscordModal() {
  const m = document.getElementById('discordModal');
  if (m) m.classList.add('open');
}
function closeDiscordModal() {
  const m = document.getElementById('discordModal');
  if (m) m.classList.remove('open');
}
function redirectToRealDiscordOAuth() {
  const redirectUri = encodeURIComponent(window.location.href.split('#')[0]);
  const url = `https://discord.com/oauth2/authorize?client_id=123456789012345678&response_type=code&redirect_uri=${redirectUri}&scope=identify%20guilds.join`;
  showToast('info', '💬', 'Discord OAuth2', 'Discord албан ёсны нэвтрэх хуудас руу шилжиж байна...', 3000);
  window.open(url, '_blank', 'noopener');
}
function confirmDiscordLink() {
  const input = document.getElementById('discordUserInput');
  const username = (input ? input.value.trim() : '') || 'MongolZ_Pro#0001';
  linkedDiscordUser = { username };
  try { localStorage.setItem('mz_discord_user', JSON.stringify(linkedDiscordUser)); } catch (e) {}
  renderDiscordNav();
  closeDiscordModal();
  showToast('success', '💬', 'Discord Холбогдлоо!', `${username} амжилттай нэвтэрлээ.`, 3200);
}
function renderDiscordNav() {
  const area = document.getElementById('discordNavArea');
  if (!area) return;
  if (linkedDiscordUser) {
    area.innerHTML = `
      <button class="btn-discord-nav linked" onclick="openDiscordModal()" title="Discord холбогдсон">
        <span>💬 ${linkedDiscordUser.username.split('#')[0]}</span>
      </button>
    `;
  }
}


// ===================== 9. DEDICATED COMMUNITY PAGE =====================
const DEFAULT_COMMUNITY_POSTS = [
  {
    id: 1,
    author: 'bLitz',
    tag: '[★OVERLORD★]',
    tagColor: '#d946ef',
    cat: 'guide',
    catLabel: '📚 Зөвлөмж & Smoke',
    time: '2 цагийн өмнө',
    title: 'de_mirage Window + Jungle Instant Smoke (CS2 Sub-tick)',
    body: 'T-Spawn-аас 1-р болон 2-р байрлалаас Jump-Throw хийхэд яг Window хаагдах шинэ CS2 lineup. 5v5 сервер дээрээ туршаад үзээрэй манайхаан!',
    likes: 84,
    liked: false,
    comments: [
      { author: 'Senzu', text: 'Энэ smoke үнэхээр хурдан унадаг шүү, баярлалаа!' },
      { author: 'Zolboo_MN', text: 'Public #1 дээр туршиж үзлээ яг орж байна 🔥' }
    ]
  },
  {
    id: 2,
    author: 'Senzu',
    tag: '[ADMIN]',
    tagColor: '#ef4444',
    cat: 'config',
    catLabel: '⚙️ Config & Crosshair',
    time: '5 цагийн өмнө',
    title: 'Миний CS2 Pro Crosshair код & 1280x960 Stretched тохиргоо',
    body: 'Олон хүн асуусан болохоор энд хуваалцлаа -> Crosshair Code: CSGO-MZ26-BLITZ-PRO9-HEAD-SHOT | Sensitivity: 1.65 @ 400 DPI.',
    likes: 129,
    liked: false,
    comments: [
      { author: 'TemkaCS', text: 'Энэ crosshair-аар DM #2 дээр HS% шууд өслөө 🎯' }
    ]
  },
  {
    id: 3,
    author: '910',
    tag: '[VIP+]',
    tagColor: '#f0a800',
    cat: 'highlight',
    catLabel: '🎬 Highlights',
    time: 'Өчигдөр',
    title: '5v5 Server #12 дээр AWP 1v5 Clutch + Knife kill хийлээ!',
    body: '11-11 дээр B-site дээр ганцаараа үлдээд 4 хүнийг AWP-аар унагаад сүүлийн хүнийг хутгалж +20 HP аваад раунд авсан нь хамгийн гоё мөч байлаа 😂',
    likes: 96,
    liked: false,
    comments: [
      { author: 'Techno4K', text: 'GOTV дээр шууд үзсэн, галзуу clutch байсан 🔥' }
    ]
  },
  {
    id: 4,
    author: 'Anand_Aim',
    tag: '[VIP]',
    tagColor: '#22c55e',
    cat: 'discussion',
    catLabel: '💬 Санал бодол',
    time: '2 өдрийн өмнө',
    title: '50,000 MZ Кейснээс Butterfly Fade унагасан хүн байна уу?',
    body: 'Сая 50k ELO хүрээд үнэгүй кейсээ задалсан чинь AK-47 Vulcan уналаа. Одоо 50k MZ цуглуулж байгаад Elite Knife кейс задлах гэж байна, амжилт хүсээрэй!',
    likes: 53,
    liked: false,
    comments: []
  }
];

let communityPosts = [];
let activeCommFilter = 'all';

function loadCommunityPosts() {
  try {
    const saved = localStorage.getItem('mz_community_posts');
    communityPosts = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_COMMUNITY_POSTS));
  } catch (e) {
    communityPosts = JSON.parse(JSON.stringify(DEFAULT_COMMUNITY_POSTS));
  }
}

function saveCommunityPosts() {
  try { localStorage.setItem('mz_community_posts', JSON.stringify(communityPosts)); } catch (e) {}
}

function toggleNewPostForm() {
  const el = document.getElementById('commComposer');
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function filterCommunityPosts(cat, btn) {
  activeCommFilter = cat;
  document.querySelectorAll('.comm-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCommunityFeed();
}

function publishCommunityPost() {
  const titleEl = document.getElementById('commPostTitle');
  const bodyEl = document.getElementById('commPostBody');
  const catEl = document.getElementById('commPostCat');
  const title = titleEl ? titleEl.value.trim() : '';
  const body = bodyEl ? bodyEl.value.trim() : '';
  if (!title || !body) {
    showToast('warning', '✍️', 'Мэдээлэл дутуу', 'Гарчиг болон агуулгаа бичнэ үү!', 2500);
    return;
  }
  const catLabels = {
    discussion: '💬 Санал бодол',
    guide: '📚 Зөвлөмж & Smoke',
    highlight: '🎬 Highlights',
    config: '⚙️ Config & Crosshair'
  };
  const cat = catEl ? catEl.value : 'discussion';
  const author = (typeof currentSteamUser !== 'undefined' && currentSteamUser)
    ? currentSteamUser.name
    : (linkedDiscordUser ? linkedDiscordUser.username.split('#')[0] : 'MongolZ_Player');

  communityPosts.unshift({
    id: Date.now(),
    author,
    tag: hasVipOrAbove() ? `[${(activeRankId || 'VIP').toUpperCase()}]` : '[ТОГЛОГЧ]',
    tagColor: hasVipOrAbove() ? '#f0a800' : '#94a3b8',
    cat,
    catLabel: catLabels[cat] || '💬 Санал бодол',
    time: 'Дөнгөж сая',
    title,
    body,
    likes: 1,
    liked: true,
    comments: []
  });

  saveCommunityPosts();
  if (titleEl) titleEl.value = '';
  if (bodyEl) bodyEl.value = '';
  toggleNewPostForm();
  renderCommunityFeed();
  showToast('success', '🚀', 'Пост нийтлэгдлээ!', 'Таны нийтлэл Community хэсэгт амжилттай орлоо.', 3000);
}

function togglePostLike(postId) {
  const post = communityPosts.find(p => p.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  saveCommunityPosts();
  renderCommunityFeed();
}

function addPostComment(postId, event) {
  event.preventDefault();
  const input = document.getElementById(`commInput-${postId}`);
  const text = input ? input.value.trim() : '';
  if (!text) return;
  const post = communityPosts.find(p => p.id === postId);
  if (!post) return;
  const author = (typeof currentSteamUser !== 'undefined' && currentSteamUser)
    ? currentSteamUser.name
    : (linkedDiscordUser ? linkedDiscordUser.username.split('#')[0] : 'Зочин');
  post.comments.push({ author, text });
  saveCommunityPosts();
  renderCommunityFeed();
}

function renderCommunityFeed() {
  const feed = document.getElementById('communityFeed');
  if (!feed) return;
  const list = activeCommFilter === 'all'
    ? communityPosts
    : communityPosts.filter(p => p.cat === activeCommFilter);

  if (list.length === 0) {
    feed.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)">Энэ ангилалд одоогоор пост алга. Эхний постыг та оруулаарай!</div>`;
    return;
  }

  feed.innerHTML = list.map(p => `
    <article class="comm-card">
      <div class="comm-card-top">
        <div class="comm-author-row">
          <span class="comm-tag" style="color:${p.tagColor}">${p.tag}</span>
          <strong class="comm-author">${p.author}</strong>
          <span class="comm-time">· ${p.time}</span>
        </div>
        <span class="comm-cat-pill">${p.catLabel}</span>
      </div>
      <h3 class="comm-card-title">${p.title}</h3>
      <p class="comm-card-body">${p.body}</p>
      <div class="comm-card-actions">
        <button type="button" class="comm-like-btn ${p.liked ? 'liked' : ''}" onclick="togglePostLike(${p.id})">
          ${p.liked ? '❤️' : '🤍'} Like (${p.likes})
        </button>
        <span class="comm-comment-count">💬 ${p.comments.length} сэтгэгдэл</span>
      </div>
      <div class="comm-comments-box">
        ${p.comments.map(c => `
          <div class="comm-comment-item">
            <strong>${c.author}:</strong> <span>${c.text}</span>
          </div>
        `).join('')}
        <form class="comm-comment-form" onsubmit="addPostComment(${p.id}, event)">
          <input type="text" id="commInput-${p.id}" class="steam-input" placeholder="Сэтгэгдэл бичих..." maxlength="200" />
          <button type="submit" class="comm-send-btn">Илгээх</button>
        </form>
      </div>
    </article>
  `).join('');
}


// ===================== 10. DIRECT CALL ADMIN IN LIVE CHAT =====================
window.switchChatTab = function(tab, btn) {
  document.querySelectorAll('.lc-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const map = { chat: 'lcFeedChat', admin: 'lcFeedAdmin', drops: 'lcFeedDrops' };
  document.querySelectorAll('.lc-feed').forEach(f => f.classList.remove('active'));
  const target = document.getElementById(map[tab] || 'lcFeedChat');
  if (target) target.classList.add('active');
};

function submitCallAdmin() {
  const srv = document.getElementById('adminCallServer')?.value || 'Public #1';
  const reason = document.getElementById('adminCallReason')?.value || 'Cheater';
  const note = document.getElementById('adminCallNote')?.value.trim() || 'Яаралтай шалгаж өгнө үү!';

  if (typeof appendChatMessage === 'function') {
    appendChatMessage('[🚨 АДМИН ДУУДЛАГА]', '#ef4444', 'SYSTEM', `${srv} · ${reason} — "${note}"`);
  }
  const noteEl = document.getElementById('adminCallNote');
  if (noteEl) noteEl.value = '';

  showToast('success', '🚨', 'Админ дуудлага илгээгдлээ!', `${srv} руу онлайн Админ руу яаралтай мэдэгдэл очлоо.`, 4000);

  // Switch back to chat tab so user sees the alert & admin reply
  const chatTabBtn = document.querySelector('.lc-tab');
  window.switchChatTab('chat', chatTabBtn);

  setTimeout(() => {
    if (typeof appendChatMessage === 'function') {
      appendChatMessage('[ADMIN]', '#ef4444', 'Senzu', `Хүлээж авлаа! ${srv} руу Spec хийж шалгаж эхэллээ 🛡️`);
    }
  }, 2200);
}


// ===================== BOOTSTRAP UPGRADE ON DOM READY =====================
window.addEventListener('DOMContentLoaded', () => {
  // Set generous starter balance for easy testing if still at default 2500
  if (typeof mzBalance !== 'undefined' && mzBalance <= 2500) {
    mzBalance = 25000;
    if (typeof updateMzWalletUI === 'function') updateMzWalletUI();
  }

  // Restore saved Discord user
  try {
    const savedDisc = localStorage.getItem('mz_discord_user');
    if (savedDisc) {
      linkedDiscordUser = JSON.parse(savedDisc);
      renderDiscordNav();
    }
  } catch (e) {}

  // Init weather particles & apply summer theme + fetch live Ulaanbaatar weather
  initUBWeatherParticles();
  applySkyTheme(ubActiveWeather);
  fetchUlaanbaatarWeather();
  window.addEventListener('resize', initUBWeatherParticles);

  // Init Community Servers (2 Public 24-slot, 2 DM, 1 KZ) + Map Backgrounds on 5v5
  renderCommunityServers();
  if (typeof renderMatches === 'function') renderMatches();

  // Init Player Models & VIP Color Customizer
  initPlayerModelsInSkinChanger();
  updateVipColorLockUI();

  // Init Exact 3 Cases
  upgradeCasesToExactThree();

  // Init Exact 5 Ranks Shop
  renderExactRanksShop();

  // Init Full Top 15 Leaderboard
  renderTop15Leaderboard();

  // Init Community Page
  loadCommunityPosts();
  renderCommunityFeed();

  // Init Multi-Page Router from URL hash
  const initialHash = (window.location.hash || '#home').replace('#', '');
  navigatePage(initialHash);
});


// ===================== 11. REAL CS2 HD PNG SKINS API + 63+ OFFICIAL AGENTS + 3D INSPECT VIEWER =====================

const CS2_WEAPON_DEFINDEX = {
  deagle: 1, dualies: 2, fiveseven: 3, glock: 4, ak47: 7, aug: 8, awp: 9, famas: 10,
  g3sg1: 11, galil: 13, m249: 14, m4a4: 16, mac10: 17, p90: 19, mp5sd: 23, ump45: 24,
  xm1014: 25, bizon: 26, mag7: 27, negev: 28, sawedoff: 29, tec9: 30, p2000: 32,
  mp7: 33, mp9: 34, nova: 35, p250: 36, scar20: 38, sg553: 39, ssg08: 40,
  m4a1s: 60, usps: 61, cz75: 63, r8: 64,
  bayonet: 500, classic: 503, flip: 505, gut: 506, karambit: 507, m9knife: 508,
  huntsman: 509, falchion: 512, bowie: 514, butterfly: 515, shadow: 516, paracord: 517,
  survival: 518, ursus: 519, nomad: 521, stiletto: 522, talon: 523, skeleton: 525, kukri: 526,
  bloodhound: 5027, sport: 5030, driver: 5031, hand: 5032, moto: 5033, specialist: 5034,
  hydra: 5035, brokenfang: 4725
};

// Normalized CS2 API weapon name -> our local weapon ID
const API_WEAPON_NAME_TO_ID = {
  ak47: 'ak47', m4a4: 'm4a4', m4a1s: 'm4a1s', awp: 'awp', galilar: 'galil', famas: 'famas',
  sg553: 'sg553', aug: 'aug', ssg08: 'ssg08', scar20: 'scar20', g3sg1: 'g3sg1',
  deserteagle: 'deagle', usps: 'usps', glock18: 'glock', p2000: 'p2000', p250: 'p250',
  fiveseven: 'fiveseven', tec9: 'tec9', cz75auto: 'cz75', dualberettas: 'dualies', r8revolver: 'r8',
  mp9: 'mp9', mac10: 'mac10', mp7: 'mp7', mp5sd: 'mp5sd', ump45: 'ump45', p90: 'p90', ppbizon: 'bizon',
  xm1014: 'xm1014', nova: 'nova', mag7: 'mag7', sawedoff: 'sawedoff', m249: 'm249', negev: 'negev',
  karambit: 'karambit', butterflyknife: 'butterfly', m9bayonet: 'm9knife', bayonet: 'bayonet',
  skeletonknife: 'skeleton', talonknife: 'talon', stilettoknife: 'stiletto', flipknife: 'flip',
  ursusknife: 'ursus', huntsmanknife: 'huntsman', bowieknife: 'bowie', falchionknife: 'falchion',
  shadowdaggers: 'shadow', kukriknife: 'kukri', nomadknife: 'nomad', paracordknife: 'paracord',
  survivalknife: 'survival', classicknife: 'classic', gutknife: 'gut',
  sportgloves: 'sport', specialistgloves: 'specialist', drivergloves: 'driver', motogloves: 'moto',
  handwraps: 'hand', hydragloves: 'hydra', bloodhoundgloves: 'bloodhound', brokenfanggloves: 'brokenfang'
};

const RARITY_SORT_RANK = {
  contraband: 0, covert: 1, classified: 2, restricted: 3, mil: 4, industrial: 5, consumer: 6
};

const RARITY_COLORS = {
  contraband: ['#f59e0b', '#451a03'],
  covert: ['#eb4b4b', '#3b0a0a'],
  classified: ['#d32ce6', '#2e1065'],
  restricted: ['#8847ff', '#1e1b4b'],
  mil: ['#4b69ff', '#0f172a'],
  industrial: ['#5e98d9', '#0f172a'],
  consumer: ['#94a3b8', '#0f172a']
};

function mapApiRarity(apiRarity) {
  const r = (apiRarity?.name || '').toLowerCase();
  if (r.includes('contraband')) return 'contraband';
  if (r.includes('covert') || r.includes('extraordinary') || r.includes('master')) return 'covert';
  if (r.includes('classified') || r.includes('superior')) return 'classified';
  if (r.includes('restricted') || r.includes('exceptional')) return 'restricted';
  if (r.includes('mil-spec') || r.includes('distinguished')) return 'mil';
  if (r.includes('industrial')) return 'industrial';
  return 'consumer';
}

// Cache: normalized "weaponName|skinName" -> { image, paintId }
const realCs2SkinLookup = new Map();
const realCs2WeaponFallbackImg = new Map();
const apiRealSkinsLoaded = new Set();
let currentExportTab = 'chat';

function normalizeSkinKey(wepName, skinName) {
  const w = (wepName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const s = (skinName || '').toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');
  return `${w}|${s}`;
}

function getRealSkinData(weaponName, skinObj) {
  if (!skinObj) return null;
  if (skinObj.image) return { image: skinObj.image, paintId: skinObj.paintId || 0 };

  const key = normalizeSkinKey(weaponName, skinObj.name);
  if (realCs2SkinLookup.has(key)) return realCs2SkinLookup.get(key);

  const wClean = (weaponName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const sClean = (skinObj.name || '').toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');
  for (const [k, v] of realCs2SkinLookup.entries()) {
    if (k.startsWith(wClean + '|') && (k.includes(sClean) || sClean.includes(k.split('|')[1]))) {
      return v;
    }
  }
  return null;
}

// Override getSkinsForWeapon so weapons loaded from real CS2 API return 100% real skins (zero missing images!)
const _origGetSkinsForWeapon = window.getSkinsForWeapon;
window.getSkinsForWeapon = function(wid) {
  if (apiRealSkinsLoaded.has(wid) && Array.isArray(SKINS_DB[wid]) && SKINS_DB[wid].length > 0) {
    return SKINS_DB[wid];
  }
  if (typeof _origGetSkinsForWeapon === 'function') return _origGetSkinsForWeapon(wid);
  return SKINS_DB[wid] || [];
};

async function loadRealCS2SkinImagesFromAPI() {
  const statusEl = document.getElementById('realSkinApiStatus');
  try {
    const [skinsRes, agentsRes] = await Promise.all([
      fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json'),
      fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/agents.json')
    ]);

    let totalSkinsCount = 0;
    let totalAgentsCount = 0;

    // 1. Populate ALL 61 weapons with ALL official CS2 skins + real HD PNG images
    if (skinsRes.ok) {
      const allSkins = await skinsRes.json();
      const groupedByWid = {};

      for (const item of allSkins) {
        if (!item.image || !item.weapon || !item.pattern) continue;
        const wName = item.weapon.name;
        const pName = item.pattern.name;
        const wClean = wName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const key = normalizeSkinKey(wName, pName);
        const paintId = parseInt(item.paint_index, 10) || 0;
        const entry = { image: item.image, paintId };

        if (!realCs2SkinLookup.has(key)) {
          realCs2SkinLookup.set(key, entry);
          totalSkinsCount++;
        }
        if (!realCs2WeaponFallbackImg.has(wClean)) {
          realCs2WeaponFallbackImg.set(wClean, item.image);
        }

        const wid = API_WEAPON_NAME_TO_ID[wClean];
        if (wid) {
          if (!groupedByWid[wid]) groupedByWid[wid] = [];
          if (!groupedByWid[wid].some(x => x.name.toLowerCase() === pName.toLowerCase())) {
            const rarity = mapApiRarity(item.rarity);
            const [c1, c2] = RARITY_COLORS[rarity] || ['#f0a800', '#0f172a'];
            groupedByWid[wid].push({
              name: pName,
              rarity,
              emoji: '🖼️',
              image: item.image,
              paintId,
              color1: c1,
              color2: c2,
              float: typeof item.min_float === 'number' ? Math.max(0.005, item.min_float + 0.01) : 0.015,
              wear: 'Factory New'
            });
          }
        }
      }

      // Preserve user's custom uploaded skins at the top of each weapon
      let customSaved = {};
      try { customSaved = JSON.parse(localStorage.getItem('mz_custom_skins') || '{}'); } catch (e) {}

      for (const [wid, list] of Object.entries(groupedByWid)) {
        list.sort((a, b) => (RARITY_SORT_RANK[a.rarity] ?? 9) - (RARITY_SORT_RANK[b.rarity] ?? 9));
        const customList = Array.isArray(customSaved[wid]) ? customSaved[wid] : [];
        SKINS_DB[wid] = [...customList, ...list];
        apiRealSkinsLoaded.add(wid);
      }
    }

    // 2. Populate ALL 63+ Official CS2 Player Models (Agents) with real HD PNG renders
    if (agentsRes.ok && typeof WEAPONS !== 'undefined') {
      const allAgents = await agentsRes.json();
      const apiAgents = [];

      allAgents.sort((a, b) => {
        const ra = RARITY_SORT_RANK[mapApiRarity(a.rarity)] ?? 9;
        const rb = RARITY_SORT_RANK[mapApiRarity(b.rarity)] ?? 9;
        return ra - rb;
      });

      for (const ag of allAgents) {
        if (!ag.image || !ag.name) continue;
        const isCT = (ag.team?.name || '').toLowerCase().includes('counter');
        const aid = 'agent_' + String(ag.id || ag.name).toLowerCase().replace(/[^a-z0-9]/g, '_');
        const rarity = mapApiRarity(ag.rarity);
        const [c1, c2] = RARITY_COLORS[rarity] || ['#3b82f6', '#0f172a'];
        const factionTag = isCT ? 'CT' : 'T';

        apiAgents.push({
          id: aid,
          name: `${ag.name} (${factionTag})`,
          emoji: isCT ? '🛡️' : '💀',
          svgKey: 'Agent',
          image: ag.image,
          isAgent: true,
          team: factionTag
        });

        SKINS_DB[aid] = [
          {
            name: 'Official CS2 Model',
            rarity,
            emoji: isCT ? '🛡️' : '💀',
            image: ag.image,
            color1: c1,
            color2: c2,
            float: 0.005,
            wear: 'Factory New',
            filterCss: ''
          },
          {
            name: 'MongolZ Gold Showcase',
            rarity: 'covert',
            emoji: '👑',
            image: ag.image,
            color1: '#f0a800',
            color2: '#451a03',
            float: 0.002,
            wear: 'Factory New',
            filterCss: 'sepia(0.28) saturate(1.45) brightness(1.08)'
          },
          {
            name: 'Stealth Night Ops',
            rarity: 'classified',
            emoji: '🕶️',
            image: ag.image,
            color1: '#64748b',
            color2: '#020617',
            float: 0.012,
            wear: 'Factory New',
            filterCss: 'contrast(1.18) saturate(0.72) brightness(0.92)'
          }
        ];
        apiRealSkinsLoaded.add(aid);
        totalAgentsCount++;
      }

      if (apiAgents.length > 0) {
        // Keep 4 exclusive MongolZ VIP/Admin/Overlord models at the end
        const exclusives = (WEAPONS.agents || []).filter(a => a.id.includes('vip') || a.id.includes('admin') || a.id.includes('overlord'));
        WEAPONS.agents = [...apiAgents, ...exclusives];
        const tabBtn = document.getElementById('scAgentsTabBtn');
        if (tabBtn) tabBtn.textContent = `🧍 Player Models (${WEAPONS.agents.length})`;
      }
    }

    if (statusEl) {
      statusEl.textContent = `🖼️ ${totalSkinsCount.toLocaleString()}+ CS2 HD Скин · 🧍 ${totalAgentsCount} Жинхэнэ Player Model · 🧊 3D Inspect`;
    }

    if (typeof renderWeaponList === 'function') renderWeaponList();
    if (typeof renderSkinsGrid === 'function') renderSkinsGrid();
    if (typeof updatePreview === 'function') updatePreview();
    if (typeof renderEquippedStrip === 'function') renderEquippedStrip();
  } catch (e) {
    if (statusEl) {
      statusEl.textContent = '🎨 Offline SVG горим (Өөрөө PNG зураг нэмэх боломжтой)';
    }
  }
}

// Load saved custom user skins from localStorage
function loadCustomSavedSkins() {
  try {
    const saved = JSON.parse(localStorage.getItem('mz_custom_skins') || '{}');
    for (const [wid, list] of Object.entries(saved)) {
      if (!SKINS_DB[wid]) SKINS_DB[wid] = [];
      for (const sk of list) {
        if (!SKINS_DB[wid].some(x => x.name === sk.name)) {
          SKINS_DB[wid].unshift(sk);
        }
      }
    }
  } catch (e) {}
}

// Wrap renderWeaponList so agents display crisp HD mini avatars
const _origRenderWeaponList = window.renderWeaponList;
window.renderWeaponList = function() {
  if (typeof _origRenderWeaponList === 'function') _origRenderWeaponList();
  const list = document.getElementById('weaponList');
  if (!list || typeof WEAPONS === 'undefined') return;
  const items = list.querySelectorAll('.sc-weapon-item');
  let weapons = WEAPONS[sc_weaponCat] || WEAPONS.rifles;
  if (typeof sc_weaponSearch !== 'undefined' && sc_weaponSearch) {
    const q = sc_weaponSearch.toLowerCase();
    weapons = getAllWeaponsFlat().filter(w => w.name.toLowerCase().includes(q) || w.id.toLowerCase().includes(q));
  }
  items.forEach((el, idx) => {
    const w = weapons[idx];
    if (w && w.image) {
      const emojiSpan = el.querySelector('.sc-wep-emoji');
      if (emojiSpan) {
        emojiSpan.innerHTML = `<img src="${w.image}" alt="${w.name}" class="sc-wep-mini-img" loading="lazy" />`;
      }
    }
  });
};

// Wrap updatePreview, renderSkinsGrid, renderEquippedStrip to display real HD PNGs for BOTH weapons AND agents
const _origUpdatePreview = window.updatePreview;
window.updatePreview = function() {
  if (typeof _origUpdatePreview === 'function') _origUpdatePreview();
  if (typeof sc_weaponData === 'undefined') return;

  const filteredSkins = typeof getFilteredSkinsForCurrentWeapon === 'function' ? getFilteredSkinsForCurrentWeapon() : [];
  const allSkins = typeof getSkinsForWeapon === 'function' ? getSkinsForWeapon(sc_weaponId) : [];
  const skin = filteredSkins[sc_skinIdx] || allSkins[0];
  if (!skin) return;

  const isAgent = !!sc_weaponData.isAgent || sc_weaponCat === 'agents';
  const realData = getRealSkinData(sc_weaponData.name, skin) || (sc_weaponData.image ? { image: sc_weaponData.image, paintId: 0 } : null);
  const svgContainer = document.getElementById('weaponSvg');
  if (svgContainer && realData && realData.image) {
    const extraFilter = skin.filterCss ? `style="filter: drop-shadow(0 18px 28px rgba(0,0,0,0.85)) ${skin.filterCss}"` : '';
    svgContainer.innerHTML = `<img src="${realData.image}" alt="${sc_weaponData.name} | ${skin.name}" class="sc-real-skin-img ${isAgent ? 'is-agent-img' : ''}" ${extraFilter} draggable="false" />`;
  }
  apply3DSkinTransform();
};

const _origRenderSkinsGrid = window.renderSkinsGrid;
window.renderSkinsGrid = function() {
  if (typeof _origRenderSkinsGrid === 'function') _origRenderSkinsGrid();
  if (typeof sc_weaponData === 'undefined') return;

  const grid = document.getElementById('skinsGrid');
  if (!grid) return;
  const isAgent = !!sc_weaponData.isAgent || sc_weaponCat === 'agents';
  const skins = typeof getFilteredSkinsForCurrentWeapon === 'function' ? getFilteredSkinsForCurrentWeapon() : [];
  const cards = grid.querySelectorAll('.skin-card');
  cards.forEach((card, idx) => {
    const sk = skins[idx];
    if (!sk) return;
    const realData = getRealSkinData(sc_weaponData.name, sk) || (sc_weaponData.image ? { image: sc_weaponData.image } : null);
    const emojiEl = card.querySelector('.skin-card-emoji');
    if (emojiEl && realData && realData.image) {
      const styleAttr = sk.filterCss ? `style="filter:${sk.filterCss}"` : '';
      emojiEl.innerHTML = `<img src="${realData.image}" alt="${sk.name}" class="skin-card-thumb ${isAgent ? 'is-agent-thumb' : ''}" ${styleAttr} loading="lazy" />`;
    }
  });
};

const _origRenderEquippedStrip = window.renderEquippedStrip;
window.renderEquippedStrip = function() {
  if (typeof _origRenderEquippedStrip === 'function') _origRenderEquippedStrip();
  const list = document.getElementById('equippedList');
  if (!list || typeof sc_equipped === 'undefined') return;
  const equipped = Object.values(sc_equipped);
  const slots = list.querySelectorAll('.eq-slot');
  slots.forEach((slot, idx) => {
    const eq = equipped[idx];
    if (!eq) return;
    const realData = getRealSkinData(eq.weaponName, eq);
    const emojiEl = slot.querySelector('.eq-slot-emoji');
    if (emojiEl && realData && realData.image) {
      emojiEl.innerHTML = `<img src="${realData.image}" alt="${eq.name}" class="eq-slot-thumb" loading="lazy" />`;
    }
  });
};

// ===================== 11B. INTERACTIVE 3D CRISP ROTATE & INSPECT ENGINE =====================
const sc3dState = {
  rotX: -6,
  rotY: -14,
  zoom: 1.05,
  dragging: false,
  autoSpin: false,
  lastX: 0,
  lastY: 0,
  rafId: null
};

function apply3DSkinTransform() {
  const card = document.getElementById('sc3dCard');
  const sheen = document.getElementById('sc3dSheen');
  if (!card) return;

  card.style.transform = `scale(${sc3dState.zoom.toFixed(2)}) rotateX(${sc3dState.rotX.toFixed(1)}deg) rotateY(${sc3dState.rotY.toFixed(1)}deg)`;

  if (sheen) {
    const angle = 115 + (sc3dState.rotY % 360) * 0.7;
    const pos = 50 + Math.sin((sc3dState.rotY * Math.PI) / 180) * 35;
    sheen.style.background = `linear-gradient(${angle}deg, transparent ${Math.max(5, pos - 22)}%, rgba(255,255,255,0.22) ${pos}%, transparent ${Math.min(95, pos + 22)}%)`;
  }
}

function step3DAutoSpin() {
  if (!sc3dState.autoSpin) {
    sc3dState.rafId = null;
    return;
  }
  if (!sc3dState.dragging) {
    sc3dState.rotY = (sc3dState.rotY + 1.25) % 360;
    sc3dState.rotX = Math.sin((sc3dState.rotY * Math.PI) / 180) * 8;
    apply3DSkinTransform();
  }
  sc3dState.rafId = requestAnimationFrame(step3DAutoSpin);
}

function toggle3DAutoSpin() {
  sc3dState.autoSpin = !sc3dState.autoSpin;
  const btn = document.getElementById('sc3dSpinBtn');
  const stage = document.getElementById('previewWeapon');
  if (btn) btn.classList.toggle('active', sc3dState.autoSpin);
  if (stage) stage.classList.toggle('spinning', sc3dState.autoSpin);
  if (sc3dState.autoSpin && !sc3dState.rafId) {
    sc3dState.rafId = requestAnimationFrame(step3DAutoSpin);
  }
}

function zoom3DSkin(delta) {
  sc3dState.zoom = Math.max(0.75, Math.min(2.2, sc3dState.zoom + delta));
  apply3DSkinTransform();
}

function reset3DSkinView() {
  sc3dState.rotX = -6;
  sc3dState.rotY = -14;
  sc3dState.zoom = 1.05;
  if (sc3dState.autoSpin) toggle3DAutoSpin();
  apply3DSkinTransform();
}

// Enhance Inspect button to launch smooth 3D 360° showcase spin
window.inspectSkin = function() {
  if (!sc3dState.autoSpin) toggle3DAutoSpin();
  sc3dState.zoom = Math.max(sc3dState.zoom, 1.22);
  apply3DSkinTransform();
  if (typeof showToast === 'function' && typeof sc_weaponData !== 'undefined') {
    const skinName = document.getElementById('previewSkin')?.textContent || '';
    showToast('info', '🧊', `3D Inspect: ${sc_weaponData.name} | ${skinName}`, 'Хулганаар чирж 360° эргүүлэх эсвэл Scroll-оор томруулж харна уу!', 3000);
  }
};

function init3DSkinViewer() {
  const stage = document.getElementById('previewWeapon');
  const box = document.getElementById('previewBox');
  if (!stage) return;

  // Prevent background AK-47 gunshot sound when rotating skins in 3D
  if (box) {
    box.addEventListener('mousedown', (e) => e.stopPropagation());
  }

  stage.addEventListener('pointerdown', (e) => {
    sc3dState.dragging = true;
    sc3dState.lastX = e.clientX;
    sc3dState.lastY = e.clientY;
    stage.classList.add('dragging');
    stage.setPointerCapture?.(e.pointerId);
    e.stopPropagation();
  });

  stage.addEventListener('pointermove', (e) => {
    if (!sc3dState.dragging) return;
    const dx = e.clientX - sc3dState.lastX;
    const dy = e.clientY - sc3dState.lastY;
    sc3dState.lastX = e.clientX;
    sc3dState.lastY = e.clientY;

    sc3dState.rotY += dx * 0.65;
    sc3dState.rotX = Math.max(-55, Math.min(55, sc3dState.rotX - dy * 0.45));
    apply3DSkinTransform();
  });

  const endDrag = () => {
    sc3dState.dragging = false;
    stage.classList.remove('dragging');
  };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.12 : -0.12;
    zoom3DSkin(delta);
  }, { passive: false });

  stage.addEventListener('dblclick', () => reset3DSkinView());

  apply3DSkinTransform();
}

// ---- CUSTOM SKIN / IMAGE UPLOAD MODAL ----
function openCustomSkinModal() {
  const modal = document.getElementById('customSkinModal');
  const wepLabel = document.getElementById('csModalWeaponName');
  if (wepLabel && typeof sc_weaponData !== 'undefined') {
    wepLabel.textContent = sc_weaponData.name;
  }
  if (modal) modal.classList.add('open');
}

function closeCustomSkinModal() {
  document.getElementById('customSkinModal')?.classList.remove('open');
}

function saveCustomSkinFromModal() {
  const name = (document.getElementById('csSkinNameInput')?.value || '').trim();
  const imgUrl = (document.getElementById('csSkinImgUrlInput')?.value || '').trim();
  const fileInput = document.getElementById('csSkinFileInput');
  const rarity = document.getElementById('csSkinRarityInput')?.value || 'covert';
  const paintId = parseInt(document.getElementById('csSkinPaintIdInput')?.value || '0', 10) || 0;

  if (!name) {
    showToast('info', '⚠️', 'Скиний нэрээ оруулна уу!', 'Жнь: MongolZ Gold', 2500);
    return;
  }

  const finalizeAdd = (finalImage) => {
    const newSkin = {
      name,
      rarity,
      emoji: '🖼️',
      image: finalImage,
      paintId,
      color1: '#f0a800',
      color2: '#1e1b4b',
      float: 0.0085,
      wear: 'Factory New'
    };

    if (!SKINS_DB[sc_weaponId]) SKINS_DB[sc_weaponId] = [];
    SKINS_DB[sc_weaponId].unshift(newSkin);

    try {
      const saved = JSON.parse(localStorage.getItem('mz_custom_skins') || '{}');
      if (!saved[sc_weaponId]) saved[sc_weaponId] = [];
      saved[sc_weaponId].unshift(newSkin);
      localStorage.setItem('mz_custom_skins', JSON.stringify(saved));
    } catch (e) {}

    sc_skinIdx = 0;
    sc_rarityFilter = 'all';
    closeCustomSkinModal();
    renderSkinsGrid();
    updatePreview();
    equipSkin();

    document.getElementById('csSkinNameInput').value = '';
    document.getElementById('csSkinImgUrlInput').value = '';
    if (fileInput) fileInput.value = '';
    showToast('gold', '🖼️', `Шинэ скин нэмэгдлээ: ${sc_weaponData.name} | ${name}`, 'Skin Changer дээр зүүгдлээ!', 3500);
  };

  if (fileInput && fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (ev) => finalizeAdd(ev.target.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    finalizeAdd(imgUrl);
  }
}

// ---- CS2 SERVER WEAPONPAINTS EXPORT MODAL ----
function openServerSkinExportModal() {
  const modal = document.getElementById('serverSkinExportModal');
  if (modal) modal.classList.add('open');
  switchExportTab('chat');
}

function closeServerSkinExportModal() {
  document.getElementById('serverSkinExportModal')?.classList.remove('open');
}

function switchExportTab(tab) {
  currentExportTab = tab;
  ['chat', 'sql', 'json'].forEach(t => {
    const el = document.getElementById(`expTab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (el) el.classList.toggle('active', t === tab);
  });

  const ta = document.getElementById('serverExportTextarea');
  if (!ta) return;

  const equipped = Object.values(sc_equipped || {});
  const steamId = (window.steamUser && window.steamUser.steamId) ? window.steamUser.steamId : '76561198992841023';

  if (equipped.length === 0) {
    ta.value = '// Та одоогоор Skin Changer дээр скин зүүгээгүй байна.\n// Эхлээд буу сонгоод "⚡ Equip" эсвэл "⚡ Бүх буунд Pro Skin зүүх" дарна уу!';
    return;
  }

  if (tab === 'chat') {
    const lines = [
      `// === THE MONGOLZ CS2 SERVER (!wp / WeaponPaints) ===`,
      `// Тоглоом руу ороод чат дээр !wp гэж бичээд скинээ синк хийнэ үү:`,
      `!wp`
    ];
    equipped.forEach(eq => {
      const defIdx = CS2_WEAPON_DEFINDEX[eq.weaponId] || 7;
      const real = getRealSkinData(eq.weaponName, eq);
      const paintId = eq.paintId || (real && real.paintId) || 344;
      const wear = (eq.float || 0.01).toFixed(4);
      lines.push(`css_wp ${defIdx} ${paintId} ${wear} ${eq.statTrak ? 1 : 0}   // ${eq.weaponName} | ${eq.name}`);
    });
    ta.value = lines.join('\n');
  } else if (tab === 'sql') {
    const lines = [
      `-- CounterStrikeSharp WeaponPaints (MySQL wp_player_skins)`,
      `-- SteamID64: ${steamId}`,
      ``
    ];
    equipped.forEach(eq => {
      const defIdx = CS2_WEAPON_DEFINDEX[eq.weaponId] || 7;
      const real = getRealSkinData(eq.weaponName, eq);
      const paintId = eq.paintId || (real && real.paintId) || 344;
      const wear = (eq.float || 0.01).toFixed(4);
      const st = eq.statTrak ? 1 : 0;
      lines.push(`INSERT INTO wp_player_skins (steamid, weapon_team, weapon_defindex, weapon_paint_id, weapon_wear, weapon_seed, weapon_stattrak) VALUES ('${steamId}', 0, ${defIdx}, ${paintId}, ${wear}, 661, ${st}) ON DUPLICATE KEY UPDATE weapon_paint_id=${paintId}, weapon_wear=${wear}, weapon_stattrak=${st}; -- ${eq.weaponName} | ${eq.name}`);
    });
    ta.value = lines.join('\n');
  } else {
    const payload = {
      steamid64: steamId,
      updated_at: new Date().toISOString(),
      skins: equipped.map(eq => {
        const real = getRealSkinData(eq.weaponName, eq);
        return {
          weapon_id: eq.weaponId,
          weapon_defindex: CS2_WEAPON_DEFINDEX[eq.weaponId] || 7,
          weapon_name: eq.weaponName,
          skin_name: eq.name,
          paint_index: eq.paintId || (real && real.paintId) || 0,
          wear: Number((eq.float || 0.01).toFixed(4)),
          stattrak: !!eq.statTrak,
          image: (real && real.image) || eq.image || ''
        };
      })
    };
    ta.value = JSON.stringify(payload, null, 2);
  }
}

function copyServerSkinExport() {
  const ta = document.getElementById('serverExportTextarea');
  if (!ta) return;
  navigator.clipboard?.writeText(ta.value).catch(() => {});
  showToast('success', '📋', 'Скиний код амжилттай хуулагдлаа!', 'CS2 сервер эсвэл WeaponPaints database руу хуулж тавина уу.', 3500);
}

window.addEventListener('DOMContentLoaded', () => {
  loadCustomSavedSkins();
  init3DSkinViewer();
  loadRealCS2SkinImagesFromAPI();
});


// ===================== 12. CLAN WAR ARENA ENGINE (KING OF THE MAP, BOUNTY, VETO, BRACKET, LFT) =====================

const CW_CS2_MAPS = [
  { key: 'de_mirage',   name: 'Mirage',   emoji: '🏜️', kingTag: 'KHAN', daysHeld: 6, record: '9W - 1L', tax: 2000, img: 'https://raw.githubusercontent.com/ghostcap-gaming/cs2-map-images/main/cs2/de_mirage.jpg',   fallback: 'assets/images/map_mirage.jpg', tint: 'rgba(245, 158, 11, 0.28)' },
  { key: 'de_dust2',    name: 'Dust2',    emoji: '☀️', kingTag: 'MGL',  daysHeld: 4, record: '7W - 2L', tax: 2000, img: 'https://raw.githubusercontent.com/ghostcap-gaming/cs2-map-images/main/cs2/de_dust2.jpg',    fallback: 'assets/images/map_dust2.jpg',  tint: 'rgba(234, 179, 8, 0.28)' },
  { key: 'de_inferno',  name: 'Inferno',  emoji: '🔥', kingTag: 'GDG',  daysHeld: 3, record: '6W - 1L', tax: 2000, img: 'https://raw.githubusercontent.com/ghostcap-gaming/cs2-map-images/main/cs2/de_inferno.jpg',  fallback: 'assets/images/map_mirage.jpg', tint: 'rgba(239, 68, 68, 0.30)' },
  { key: 'de_nuke',     name: 'Nuke',     emoji: '☢️', kingTag: 'UBX',  daysHeld: 2, record: '5W - 2L', tax: 2000, img: 'https://raw.githubusercontent.com/ghostcap-gaming/cs2-map-images/main/cs2/de_nuke.jpg',     fallback: 'assets/images/hero_bg.jpg',    tint: 'rgba(59, 130, 246, 0.30)' },
  { key: 'de_ancient',  name: 'Ancient',  emoji: '🌿', kingTag: 'WOLF', daysHeld: 5, record: '6W - 0L', tax: 2000, img: 'https://raw.githubusercontent.com/ghostcap-gaming/cs2-map-images/main/cs2/de_ancient.jpg',  fallback: 'assets/images/hero_bg.jpg',    tint: 'rgba(34, 197, 94, 0.30)' },
  { key: 'de_anubis',   name: 'Anubis',   emoji: '🏺', kingTag: 'KHAN', daysHeld: 3, record: '4W - 1L', tax: 2000, img: 'https://raw.githubusercontent.com/ghostcap-gaming/cs2-map-images/main/cs2/de_anubis.jpg',   fallback: 'assets/images/map_dust2.jpg',  tint: 'rgba(245, 158, 11, 0.30)' },
  { key: 'de_overpass', name: 'Overpass', emoji: '🌉', kingTag: 'NOIR', daysHeld: 1, record: '3W - 1L', tax: 2000, img: 'https://raw.githubusercontent.com/ghostcap-gaming/cs2-map-images/main/cs2/de_overpass.jpg', fallback: 'assets/images/map_surf.jpg',   tint: 'rgba(16, 185, 129, 0.30)' }
];

function bind3DMapTilt(container) {
  if (!container) return;
  container.querySelectorAll('.cw-map-card, .cw-veto-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('banned')) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotY = (x - 0.5) * 18;
      const rotX = (0.5 - y) * 14;
      const px = (0.5 - x) * 14;
      const py = (0.5 - y) * 10;
      card.style.transform = `rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) translateY(-4px)`;
      card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      card.style.setProperty('--px', `${px.toFixed(1)}px`);
      card.style.setProperty('--py', `${py.toFixed(1)}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.setProperty('--px', '0px');
      card.style.setProperty('--py', '0px');
    });
  });
}

let cwClans = [
  { id: 'c_khan', tag: 'KHAN', name: 'Chinggis Five',    color: '#f0a800', members: 7, max: 7, elo: 2840, wins: 28, losses: 4,  streak: 6, needRole: '' },
  { id: 'c_mgl',  tag: 'MGL',  name: 'MongolZ Academy',  color: '#3b82f6', members: 6, max: 7, elo: 2715, wins: 24, losses: 6,  streak: 4, needRole: 'AWPer' },
  { id: 'c_gdg',  tag: 'GDG',  name: 'Golden Dragon',    color: '#22c55e', members: 6, max: 7, elo: 2590, wins: 20, losses: 7,  streak: 3, needRole: 'IGL' },
  { id: 'c_wolf', tag: 'WOLF', name: 'Steppe Wolves',    color: '#a855f7', members: 5, max: 7, elo: 2480, wins: 17, losses: 8,  streak: 2, needRole: 'Entry Fragger' },
  { id: 'c_ubx',  tag: 'UBX',  name: 'Ulaanbaatar X',    color: '#06b6d4', members: 6, max: 7, elo: 2390, wins: 15, losses: 9,  streak: 1, needRole: 'Rifler' },
  { id: 'c_noir', tag: 'NOIR', name: 'Dark Nomads',      color: '#ec4899', members: 5, max: 7, elo: 2260, wins: 13, losses: 11, streak: 0, needRole: 'Lurker' },
  { id: 'c_apex', tag: 'APEX', name: 'Apex Mongolia',    color: '#f97316', members: 5, max: 7, elo: 2140, wins: 10, losses: 12, streak: 0, needRole: 'AWPer' },
  { id: 'c_sky',  tag: 'SKY',  name: 'Blue Sky Esports', color: '#38bdf8', members: 5, max: 7, elo: 2020, wins: 8,  losses: 13, streak: 0, needRole: 'Entry Fragger' }
];

let cwUserClan = null;
let cwCupRegistered = false;

let cwLftPlayers = [
  { name: 'Temuulen_AWP', role: 'AWPer',         elo: 2680, kd: '1.34' },
  { name: 'BoldooEntry',  role: 'Entry Fragger', elo: 2420, kd: '1.19' },
  { name: 'NaraaIGL',     role: 'IGL',           elo: 2510, kd: '1.08' },
  { name: 'Sukhbat99',    role: 'Rifler',        elo: 2190, kd: '1.15' }
];

const cwVetoState = {
  opponentId: 'c_khan',
  format: 'BO1',
  wager: 5000,
  banned: [],
  turn: 'user', // 'user' | 'enemy' | 'done'
  pickedMaps: []
};

function loadClanWarStorage() {
  try {
    const savedClan = localStorage.getItem('mz_user_clan');
    if (savedClan) {
      cwUserClan = JSON.parse(savedClan);
      if (!cwClans.some(c => c.id === cwUserClan.id)) {
        cwClans.push(cwUserClan);
      }
    }
    const savedLft = localStorage.getItem('mz_cw_lft');
    if (savedLft) {
      const parsed = JSON.parse(savedLft);
      if (Array.isArray(parsed) && parsed.length) cwLftPlayers = parsed;
    }
  } catch (e) {}
}

function switchClanWarTab(tabKey) {
  document.querySelectorAll('#cwTabs .cw-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cwtab === tabKey);
  });
  document.querySelectorAll('.cw-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `cwPanel-${tabKey}`);
  });
}

function renderClanWarTopCards() {
  const myCard = document.getElementById('cwMyClanCard');
  const bountyCard = document.getElementById('cwBountyCard');

  if (myCard) {
    if (cwUserClan) {
      myCard.innerHTML = `
        <div>
          <div style="font-size:0.74rem;color:#4ade80;font-weight:700;margin-bottom:5px">✅ ТАНЫ ИДЭВХТЭЙ КЛАН</div>
          <div style="font-size:1.05rem;font-weight:800;color:#fff">
            <span class="cw-tag-pill" style="background:${cwUserClan.color}">[${cwUserClan.tag}]</span>
            ${cwUserClan.name}
          </div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px">
            ELO: <strong style="color:#fde047">${cwUserClan.elo}</strong> · Гишүүд: ${cwUserClan.members}/${cwUserClan.max} · ${cwUserClan.wins}W-${cwUserClan.losses}L
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="cw-btn-gold" onclick="switchClanWarTab('veto')">⚔️ Тулаанд Дуудах</button>
          <button type="button" class="cw-btn-outline" onclick="leaveUserClan()">Гарах</button>
        </div>
      `;
    } else {
      myCard.innerHTML = `
        <div>
          <div style="font-size:0.74rem;color:#fde047;font-weight:700;margin-bottom:5px">🛡️ ТАНЫ КЛАН</div>
          <div style="font-size:0.98rem;font-weight:800;color:#fff">Та одоогоор кланд элсээгүй байна</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:3px">Үнэгүй шинэ клан үүсгээд 5 найзтайгаа Clan War эхлүүлээрэй!</div>
        </div>
        <button type="button" class="cw-btn-gold" onclick="openCreateClanModal()">➕ Шинэ Клан Үүсгэх</button>
      `;
    }
  }

  if (bountyCard) {
    const topStreakClan = [...cwClans].sort((a, b) => b.streak - a.streak)[0];
    const bountyAmt = Math.max(15000, topStreakClan.streak * 5000);
    bountyCard.innerHTML = `
      <div>
        <div style="font-size:0.74rem;color:#fca5a5;font-weight:800;margin-bottom:5px">🔥 ИДЭВХТЭЙ BOUNTY (АВАРГЫГ УНАГА!)</div>
        <div style="font-size:1.02rem;font-weight:800;color:#fff">
          <span class="cw-tag-pill" style="background:${topStreakClan.color}">[${topStreakClan.tag}]</span>
          ${topStreakClan.name}
          <span class="cw-bounty-badge" style="margin-left:6px">🔥 ${topStreakClan.streak}x Streak</span>
        </div>
        <div style="font-size:0.78rem;color:#fecaca;margin-top:4px">
          Тэднийг ялсан анхны клан: <strong style="color:#fde047">+${bountyAmt.toLocaleString()} MZ Coin</strong> шууд авна!
        </div>
      </div>
      <button type="button" class="cw-btn-danger" onclick="challengeSpecificClan('${topStreakClan.id}')">🎯 Bounty Агнах</button>
    `;
  }
}

function renderClanWarMaps() {
  const grid = document.getElementById('cwMapsGrid');
  if (!grid) return;

  grid.innerHTML = CW_CS2_MAPS.map(m => {
    const king = cwClans.find(c => c.tag === m.kingTag) || cwClans[0];
    return `
      <div class="cw-map-card" style="--map-tint:${m.tint}">
        <div class="cw-map-bg-3d" style="background-image: url('${m.img}'), url('${m.fallback}')"></div>
        <div class="cw-map-vignette"></div>
        <div class="cw-map-glare"></div>
        <div class="cw-map-content">
          <div class="cw-map-top">
            <span class="cw-map-name">${m.emoji} ${m.name}</span>
            <span class="cw-map-tax">+${m.tax.toLocaleString()} MZ/өдөр</span>
          </div>
          <div class="cw-map-king">
            <div class="cw-map-king-lbl">👑 ОДООГИЙН МАПЫН ЭЗЭН</div>
            <div class="cw-map-king-row">
              <span><span class="cw-tag-pill" style="background:${king.color}">[${king.tag}]</span>${king.name}</span>
            </div>
          </div>
          <div class="cw-map-meta">
            <span>🗓️ ${m.daysHeld} өдөр барьж буй</span>
            <span>📊 ${m.record}</span>
          </div>
          <button type="button" class="cw-btn-gold" style="width:100%" onclick="challengeSpecificClan('${king.id}', '${m.name}')">
            ⚔️ ${m.name} дээр Дуудах
          </button>
        </div>
      </div>
    `;
  }).join('');
  bind3DMapTilt(grid);
}

function renderClanWarRankings() {
  const tbody = document.getElementById('cwRankingsBody');
  if (!tbody) return;

  const sorted = [...cwClans].sort((a, b) => b.elo - a.elo);
  tbody.innerHTML = sorted.map((c, idx) => {
    const isMine = cwUserClan && cwUserClan.id === c.id;
    const bounty = c.streak >= 3 ? `<span class="cw-bounty-badge">🔥 ${c.streak}W · +${(c.streak * 5000).toLocaleString()} MZ</span>` : `<span style="color:var(--text-muted);font-size:0.78rem">${c.streak}W Streak</span>`;
    return `
      <tr style="${isMine ? 'background:rgba(240,168,0,0.09)' : ''}">
        <td><strong>#${idx + 1}</strong></td>
        <td>
          <span class="cw-tag-pill" style="background:${c.color}">[${c.tag}]</span>
          <strong>${c.name}</strong> ${isMine ? '<span style="color:#4ade80;font-size:0.72rem">(Таны клан)</span>' : ''}
        </td>
        <td>${c.members}/${c.max}</td>
        <td><strong style="color:#fde047">${c.elo}</strong></td>
        <td><span style="color:#4ade80">${c.wins}W</span> / <span style="color:#f87171">${c.losses}L</span></td>
        <td>${bounty}</td>
        <td>
          ${isMine
            ? `<button type="button" class="cw-btn-outline" onclick="switchClanWarTab('veto')">🗺️ Veto</button>`
            : `<button type="button" class="cw-btn-gold" style="padding:6px 12px;font-size:0.76rem" onclick="challengeSpecificClan('${c.id}')">⚔️ Дуудах</button>`
          }
        </td>
      </tr>
    `;
  }).join('');
}

function populateVetoOpponents() {
  const sel = document.getElementById('cwVetoOpponent');
  if (!sel) return;
  const opponents = cwClans.filter(c => !cwUserClan || c.id !== cwUserClan.id);
  sel.innerHTML = opponents.map(c => `<option value="${c.id}" ${c.id === cwVetoState.opponentId ? 'selected' : ''}>[${c.tag}] ${c.name} (${c.elo} ELO)</option>`).join('');
  if (!opponents.some(c => c.id === cwVetoState.opponentId) && opponents[0]) {
    cwVetoState.opponentId = opponents[0].id;
  }
}

function challengeSpecificClan(clanId, focusMapName) {
  cwVetoState.opponentId = clanId;
  resetClanVeto();
  populateVetoOpponents();
  switchClanWarTab('veto');
  const opp = cwClans.find(c => c.id === clanId);
  if (opp && typeof showToast === 'function') {
    showToast('gold', '⚔️', `[${opp.tag}] ${opp.name} руу дуудлага бэлтгэлээ!`, focusMapName ? `${focusMapName} мап эсвэл Map Veto хийгээд тоглолтоо эхлүүлнэ үү.` : 'Бооцоо ба мапаа сонгоод BAN хийж эхэлнэ үү.', 3500);
  }
}

function onVetoSetupChange() {
  cwVetoState.opponentId = document.getElementById('cwVetoOpponent')?.value || cwVetoState.opponentId;
  cwVetoState.format = document.getElementById('cwVetoFormat')?.value || 'BO1';
  cwVetoState.wager = parseInt(document.getElementById('cwVetoWager')?.value || '0', 10) || 0;
  resetClanVeto();
}

function resetClanVeto() {
  cwVetoState.banned = [];
  cwVetoState.pickedMaps = [];
  cwVetoState.turn = 'user';
  renderClanVeto();
}

function clickVetoMap(mapKey) {
  if (cwVetoState.turn !== 'user') return;
  if (cwVetoState.banned.includes(mapKey)) return;

  const targetRemaining = cwVetoState.format === 'BO3' ? 3 : 1;
  cwVetoState.banned.push(mapKey);

  const remaining = CW_CS2_MAPS.filter(m => !cwVetoState.banned.includes(m.key));
  if (remaining.length <= targetRemaining) {
    cwVetoState.turn = 'done';
    cwVetoState.pickedMaps = remaining;
    renderClanVeto();
    return;
  }

  cwVetoState.turn = 'enemy';
  renderClanVeto();

  // Enemy clan auto-bans after short realistic pause
  setTimeout(() => {
    const remNow = CW_CS2_MAPS.filter(m => !cwVetoState.banned.includes(m.key));
    if (remNow.length > targetRemaining) {
      const enemyBan = remNow[Math.floor(Math.random() * remNow.length)];
      cwVetoState.banned.push(enemyBan.key);
    }
    const remAfter = CW_CS2_MAPS.filter(m => !cwVetoState.banned.includes(m.key));
    if (remAfter.length <= targetRemaining) {
      cwVetoState.turn = 'done';
      cwVetoState.pickedMaps = remAfter;
    } else {
      cwVetoState.turn = 'user';
    }
    renderClanVeto();
  }, 450);
}

function renderClanVeto() {
  const statusEl = document.getElementById('cwVetoStatus');
  const mapsEl = document.getElementById('cwVetoMaps');
  const roomEl = document.getElementById('cwVetoRoom');
  if (!statusEl || !mapsEl || !roomEl) return;

  const opp = cwClans.find(c => c.id === cwVetoState.opponentId) || cwClans[0];
  const myTag = cwUserClan ? `[${cwUserClan.tag}]` : '[YOUR CLAN]';
  const targetRemaining = cwVetoState.format === 'BO3' ? 3 : 1;
  const remCount = CW_CS2_MAPS.length - cwVetoState.banned.length;

  if (cwVetoState.turn === 'user') {
    statusEl.innerHTML = `<span>🟢 ТАНЫ ЭЭЛЖ (${myTag}): Тоглохгүй 1 мап дээр дарж <strong>BAN</strong> хийнэ үү</span><span>Үлдсэн: ${remCount} → Зорилт: ${targetRemaining} (${cwVetoState.format})</span>`;
  } else if (cwVetoState.turn === 'enemy') {
    statusEl.innerHTML = `<span>⏳ [${opp.tag}] ${opp.name} мап сонгож BAN хийж байна...</span><span>${cwVetoState.format}</span>`;
  } else {
    const mapNames = cwVetoState.pickedMaps.map(m => `${m.emoji} ${m.name}`).join(' · ');
    statusEl.innerHTML = `<span>✅ MAP VETO ДУУСЛАА! Сонгогдсон мап: <strong style="color:#4ade80">${mapNames}</strong></span><span>🪙 Шагналын сан: ${(cwVetoState.wager * 2).toLocaleString()} MZ</span>`;
  }

  mapsEl.innerHTML = CW_CS2_MAPS.map(m => {
    const isBanned = cwVetoState.banned.includes(m.key);
    const isPicked = cwVetoState.turn === 'done' && !isBanned;
    const badge = isBanned ? '❌ BANNED' : (isPicked ? '✅ ТОГЛОХ МАП' : '🚫 Дарж BAN хийх');
    return `
      <div class="cw-veto-card ${isBanned ? 'banned' : ''} ${isPicked ? 'picked' : ''}" style="--map-tint:${m.tint}" onclick="clickVetoMap('${m.key}')">
        <div class="cw-map-bg-3d" style="background-image: url('${m.img}'), url('${m.fallback}')"></div>
        <div class="cw-map-vignette"></div>
        <div class="cw-map-glare"></div>
        <div class="cw-map-content" style="align-items:center">
          <div class="cw-veto-name" style="font-weight:900;color:#fff;font-size:1.05rem;text-shadow:0 3px 10px rgba(0,0,0,0.9)">${m.emoji} ${m.name}</div>
          <div style="font-size:0.74rem;font-weight:800;padding:3px 9px;border-radius:999px;background:rgba(2,6,23,0.72);color:${isPicked ? '#4ade80' : (isBanned ? '#f87171' : '#e2e8f0')}">${badge}</div>
        </div>
      </div>
    `;
  }).join('');
  bind3DMapTilt(mapsEl);

  if (cwVetoState.turn === 'done') {
    const mapNames = cwVetoState.pickedMaps.map(m => m.name).join(', ');
    const connectCmd = `connect 103.229.120.45:27051; password mzwar`;
    roomEl.style.display = 'block';
    roomEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap">
        <div>
          <div style="font-size:0.76rem;color:#4ade80;font-weight:800;margin-bottom:4px">🎮 CLAN WAR 5v5 ӨРӨӨ БЭЛЭН БОЛЛОО!</div>
          <div style="font-size:1.05rem;font-weight:900;color:#fff">${myTag} vs [${opp.tag}] ${opp.name} · ${cwVetoState.format} (${mapNames})</div>
          <div style="font-size:0.82rem;color:#cbd5e1;margin-top:5px">
            Бооцоо: <strong style="color:#fde047">${(cwVetoState.wager * 2).toLocaleString()} MZ Coin</strong> · Сервер: <code style="color:#4ade80">${connectCmd}</code>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="cw-btn-gold" onclick="copyClanWarIp('${connectCmd}')">📋 IP Хуулах & Тоглох</button>
          <button type="button" class="cw-btn-outline" onclick="navigatePage('arena')">📺 Live Arena</button>
        </div>
      </div>
    `;
  } else {
    roomEl.style.display = 'none';
  }
}

function copyClanWarIp(cmd) {
  navigator.clipboard?.writeText(cmd).catch(() => {});
  if (typeof showToast === 'function') {
    showToast('success', '⚔️', 'Clan War 5v5 IP хуулагдлаа!', 'CS2 Console (~) дээр Paste хийж орно уу. Амжилт!', 3500);
  }
}

function renderClanWarBracket() {
  const container = document.getElementById('cwBracketContainer');
  if (!container) return;

  const userTeamName = cwCupRegistered && cwUserClan ? `[${cwUserClan.tag}] ${cwUserClan.name}` : '[SKY] Blue Sky';
  container.innerHTML = `
    <div>
      <div class="cw-br-col-title">⚔️ Шөвгийн 8 (Quarterfinals)</div>
      <div class="cw-br-list">
        <div class="cw-br-match">
          <div class="cw-br-team winner"><span>[KHAN] Chinggis Five</span><span class="cw-br-score">13</span></div>
          <div class="cw-br-team"><span>${userTeamName}</span><span class="cw-br-score">8</span></div>
        </div>
        <div class="cw-br-match">
          <div class="cw-br-team winner"><span>[GDG] Golden Dragon</span><span class="cw-br-score">13</span></div>
          <div class="cw-br-team"><span>[NOIR] Dark Nomads</span><span class="cw-br-score">10</span></div>
        </div>
        <div class="cw-br-match">
          <div class="cw-br-team winner"><span>[MGL] MongolZ Academy</span><span class="cw-br-score">13</span></div>
          <div class="cw-br-team"><span>[APEX] Apex Mongolia</span><span class="cw-br-score">6</span></div>
        </div>
        <div class="cw-br-match">
          <div class="cw-br-team winner"><span>[WOLF] Steppe Wolves</span><span class="cw-br-score">13</span></div>
          <div class="cw-br-team"><span>[UBX] Ulaanbaatar X</span><span class="cw-br-score">11</span></div>
        </div>
      </div>
    </div>

    <div>
      <div class="cw-br-col-title">🔥 Хагас Шигшээ (Semifinals)</div>
      <div class="cw-br-list">
        <div class="cw-br-match">
          <div class="cw-br-team winner"><span>[KHAN] Chinggis Five</span><span class="cw-br-score">2</span></div>
          <div class="cw-br-team"><span>[GDG] Golden Dragon</span><span class="cw-br-score">1</span></div>
        </div>
        <div class="cw-br-match">
          <div class="cw-br-team winner"><span>[MGL] MongolZ Academy</span><span class="cw-br-score">2</span></div>
          <div class="cw-br-team"><span>[WOLF] Steppe Wolves</span><span class="cw-br-score">0</span></div>
        </div>
      </div>
    </div>

    <div>
      <div class="cw-br-col-title">🏆 ИХ ФИНАЛ (BO3 · LIVE)</div>
      <div class="cw-br-list">
        <div class="cw-br-match final">
          <div class="cw-br-team winner"><span>👑 [KHAN] Chinggis Five</span><span class="cw-br-score">1</span></div>
          <div class="cw-br-team"><span>⚔️ [MGL] MongolZ Academy</span><span class="cw-br-score">1</span></div>
        </div>
        <div style="text-align:center;padding:12px;border-radius:11px;background:rgba(240,168,0,0.1);border:1px solid rgba(240,168,0,0.35)">
          <div style="font-size:0.76rem;color:#fde047;font-weight:800;margin-bottom:6px">🥇 ТҮРҮҮЛСЭН КЛАНЫ ШАГНАЛ</div>
          <div style="font-size:0.84rem;color:#fff;font-weight:700;margin-bottom:10px">5x VIP+ Эрх · 100,000 MZ Coin · Алтан Цом</div>
          <button type="button" class="cw-btn-gold" onclick="navigatePage('arena')">📺 Финалыг Live Үзэх</button>
        </div>
      </div>
    </div>
  `;
}

function registerForWeeklyCup() {
  if (!cwUserClan) {
    openCreateClanModal();
    if (typeof showToast === 'function') {
      showToast('info', '⚔️', 'Эхлээд кланаа үүсгэнэ үү!', 'Клан үүсгэсний дараа Долоо хоногийн Цомд бүртгүүлэх боломжтой.', 3000);
    }
    return;
  }
  cwCupRegistered = true;
  const btn = document.getElementById('cwRegisterCupBtn');
  if (btn) btn.textContent = '✅ Цомд Бүртгэгдсэн';
  renderClanWarBracket();
  if (typeof showToast === 'function') {
    showToast('gold', '🏆', `[${cwUserClan.tag}] ${cwUserClan.name} Цомд бүртгэгдлээ!`, 'Бямба гараг 20:00 цагаас Шөвгийн 8 эхэлнэ.', 3500);
  }
}

function renderClanWarRecruit() {
  const lftEl = document.getElementById('cwLftList');
  const recEl = document.getElementById('cwRecruitingList');

  if (lftEl) {
    lftEl.innerHTML = cwLftPlayers.map(p => `
      <div class="cw-rec-item">
        <div>
          <strong style="color:#fff">${p.name}</strong>
          <span class="cw-tag-pill" style="background:#3b82f6;color:#fff;margin-left:6px;font-size:0.7rem">${p.role}</span>
          <div style="font-size:0.76rem;color:var(--text-muted);margin-top:3px">ELO: <strong style="color:#fde047">${p.elo}</strong> · K/D: ${p.kd}</div>
        </div>
        <button type="button" class="cw-btn-outline" onclick="inviteLftPlayer('${p.name}')">📩 Кланд Урих</button>
      </div>
    `).join('');
  }

  if (recEl) {
    const recruiting = cwClans.filter(c => c.needRole);
    recEl.innerHTML = recruiting.map(c => `
      <div class="cw-rec-item">
        <div>
          <span class="cw-tag-pill" style="background:${c.color}">[${c.tag}]</span>
          <strong style="color:#fff">${c.name}</strong>
          <div style="font-size:0.76rem;color:var(--text-muted);margin-top:3px">
            Хайж буй үүрэг: <strong style="color:#4ade80">${c.needRole}</strong> · ELO: ${c.elo} · Гишүүд: ${c.members}/${c.max}
          </div>
        </div>
        <button type="button" class="cw-btn-gold" style="padding:7px 12px;font-size:0.76rem" onclick="applyToClan('${c.name}')">✋ Элсэх Хүсэлт</button>
      </div>
    `).join('');
  }
}

function postLftListing(e) {
  e.preventDefault();
  const name = (document.getElementById('cwLftName')?.value || '').trim();
  const role = document.getElementById('cwLftRole')?.value || 'Rifler';
  const elo = parseInt(document.getElementById('cwLftElo')?.value || '2200', 10) || 2200;
  if (!name) return;

  cwLftPlayers.unshift({ name, role, elo, kd: '1.22' });
  try { localStorage.setItem('mz_cw_lft', JSON.stringify(cwLftPlayers)); } catch (err) {}
  document.getElementById('cwLftName').value = '';
  renderClanWarRecruit();
  if (typeof showToast === 'function') {
    showToast('success', '📢', 'LFT зар амжилттай тавигдлаа!', `${name} (${role} · ${elo} ELO) — Кланууд таныг урих боломжтой.`, 3200);
  }
}

function inviteLftPlayer(playerName) {
  if (typeof showToast === 'function') {
    showToast('gold', '📩', `${playerName} руу кланы урилга илгээгдлээ!`, 'Тоглогч зөвшөөрмөгц танай кланд нэмэгдэнэ.', 3000);
  }
}

function applyToClan(clanName) {
  if (typeof showToast === 'function') {
    showToast('success', '✋', `${clanName} руу элсэх хүсэлт илгээлээ!`, 'Кланы ахлагч шалгаад хариу өгнө.', 3000);
  }
}

function openCreateClanModal() {
  document.getElementById('createClanModal')?.classList.add('open');
}

function closeCreateClanModal() {
  document.getElementById('createClanModal')?.classList.remove('open');
}

function submitCreateClan(e) {
  e.preventDefault();
  const name = (document.getElementById('cwNewName')?.value || '').trim();
  const tag = (document.getElementById('cwNewTag')?.value || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
  const color = document.getElementById('cwNewColor')?.value || '#f0a800';
  if (!name || tag.length < 2) {
    if (typeof showToast === 'function') showToast('info', '⚠️', 'Кланы нэр болон 2-5 үсэгтэй TAG оруулна уу!', '', 2500);
    return;
  }

  cwUserClan = {
    id: 'c_user_' + Date.now(),
    tag,
    name,
    color,
    members: 1,
    max: 7,
    elo: 2000,
    wins: 0,
    losses: 0,
    streak: 0,
    needRole: 'Rifler'
  };

  cwClans = cwClans.filter(c => !c.id.startsWith('c_user_'));
  cwClans.push(cwUserClan);
  try { localStorage.setItem('mz_user_clan', JSON.stringify(cwUserClan)); } catch (err) {}

  closeCreateClanModal();
  renderAllClanWar();
  if (typeof showToast === 'function') {
    showToast('gold', '⚔️', `[${tag}] ${name} клан амжилттай үүслээ!`, 'Одоо Map-ийн Эзэд рүү дуудаж тулаан эхлүүлээрэй!', 3800);
  }
}

function leaveUserClan() {
  if (!cwUserClan) return;
  const oldName = cwUserClan.name;
  cwClans = cwClans.filter(c => c.id !== cwUserClan.id);
  cwUserClan = null;
  try { localStorage.removeItem('mz_user_clan'); } catch (err) {}
  renderAllClanWar();
  if (typeof showToast === 'function') {
    showToast('info', '👋', `${oldName} кланаас гарлаа.`, 'Хүссэн үедээ шинэ клан үүсгэх боломжтой.', 2500);
  }
}

function renderAllClanWar() {
  renderClanWarTopCards();
  renderClanWarMaps();
  renderClanWarRankings();
  populateVetoOpponents();
  renderClanVeto();
  renderClanWarBracket();
  renderClanWarRecruit();
}

window.addEventListener('DOMContentLoaded', () => {
  loadClanWarStorage();
  renderAllClanWar();
});


// ===================== 13. MOBILE APP UX, RIGHT SLIDE DRAWER & PERFORMANCE OPTIMIZER =====================
function openMobileDrawer() {
  document.getElementById('mobileDrawerBackdrop')?.classList.add('open');
  document.getElementById('mobileSideDrawer')?.classList.add('open');
  document.querySelectorAll('#mobileSideDrawer .mob-drawer-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === currentPageId);
  });
}

function closeMobileDrawer() {
  document.getElementById('mobileDrawerBackdrop')?.classList.remove('open');
  document.getElementById('mobileSideDrawer')?.classList.remove('open');
}

function mobileDrawerGo(pageId) {
  closeMobileDrawer();
  navigatePage(pageId);
}

// Override toggleNav so clicking ☰ opens the clean Right Slide-In Drawer instead of overlapping navbar links
window.toggleNav = function() {
  const drawer = document.getElementById('mobileSideDrawer');
  if (drawer) {
    if (drawer.classList.contains('open')) closeMobileDrawer();
    else openMobileDrawer();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const isMobileScreen = window.innerWidth <= 860 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  if (!isMobileScreen) return;

  // 1. Hide Weather/Chicken HUD completely on phones (exact ID: cs2HuntHud)
  const hud = document.getElementById('cs2HuntHud');
  if (hud) hud.style.display = 'none';

  // 2. Start Live Chat collapsed (minimized) on phones so it never blocks the screen on load
  const chatWidget = document.getElementById('liveChatWidget');
  const chatBtn = document.getElementById('lcToggleBtn');
  if (chatWidget) {
    chatWidget.classList.add('minimized');
    if (chatBtn) chatBtn.textContent = '+';
  }

  // 3. Disable custom crosshair & accidental gunshot SFX on touchscreens
  if (typeof cs2CrosshairEnabled !== 'undefined') cs2CrosshairEnabled = false;
  if (typeof cs2SfxEnabled !== 'undefined') cs2SfxEnabled = false;
  document.body.classList.remove('cs2-aim-active');
  const crosshairEl = document.getElementById('cs2Crosshair');
  if (crosshairEl) crosshairEl.style.display = 'none';

  // 4. Keep background chicken count lightweight for smooth 60fps mobile scrolling
  if (typeof cs2Chickens !== 'undefined' && Array.isArray(cs2Chickens) && cs2Chickens.length > 6) {
    cs2Chickens.length = 6;
  }
});
