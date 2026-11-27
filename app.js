/* ==========================================
   THE MONGOLZ GDG SERVER — JAVASCRIPT
   ========================================== */

// ===================== TOAST SYSTEM =====================
function showToast(type, icon, title, msg, duration = 3500) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-text">
      <div class="toast-title">${title}</div>
      ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// ===================== COPY IP =====================
function copyIP() {
  const ip = 'connect.mongolz.gg';
  navigator.clipboard.writeText(`connect ${ip}`).then(() => {
    showToast('success', '📋', 'IP Хуулагдлаа!', `Console: connect ${ip}`, 3000);
  }).catch(() => {
    showToast('info', '🎮', 'Server IP', `connect ${ip}`, 4000);
  });
}

// ===================== CONNECT SERVER =====================
function connectServer(mode, ip) {
  const labels = {
    public: 'Public Server',
    deathmatch: 'Deathmatch Server',
    kz: 'KZ / Bhop Server',
    '5v5': '5v5 Competitive'
  };
  navigator.clipboard.writeText(`connect ${ip}`).then(() => {
    showToast('success', '🎮', `${labels[mode] || mode} нэгдэж байна!`,
      `Clipboard: connect ${ip}`, 3000);
  }).catch(() => {
    showToast('info', '🎮', `${labels[mode] || mode}`, `connect ${ip}`, 4000);
  });
}

// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===================== NAV TOGGLE (Mobile) =====================
function toggleNav() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// ===================== PARTICLES =====================
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 50;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 6;
    const dur = 4 + Math.random() * 6;
    const gold = Math.random() > 0.6;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      left:${x}%;top:${y}%;
      background:${gold ? 'rgba(240,168,0,0.6)' : 'rgba(59,130,246,0.5)'};
      border-radius:50%;
      animation:particleFloat ${dur}s ${delay}s ease-in-out infinite alternate;
      pointer-events:none;
    `;
    container.appendChild(p);
  }
  if (!document.getElementById('particleStyle')) {
    const s = document.createElement('style');
    s.id = 'particleStyle';
    s.textContent = `
      @keyframes particleFloat {
        from { transform: translateY(0) scale(1); opacity: 0.4; }
        to { transform: translateY(-30px) scale(1.5); opacity: 0.9; }
      }
    `;
    document.head.appendChild(s);
  }
})();

// ===================== COUNTER ANIMATION =====================
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = Math.floor(ease * target);
    el.textContent = val.toLocaleString();
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

// ===================== INTERSECTION OBSERVER =====================
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(animateCounter);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .stats-section, .hero-stats-bar').forEach(el => {
  io.observe(el);
});

// Also animate hero counters on page load
document.querySelectorAll('.hero-stats-bar [data-count], .stats-section [data-count]').forEach(el => {
  setTimeout(() => animateCounter(el), 1000);
});

// ===================== MATCH DATA =====================
const MAPS = ['de_dust2', 'de_mirage', 'de_inferno', 'de_ancient', 'de_nuke',
              'de_overpass', 'de_vertigo', 'de_anubis', 'de_cache', 'de_train'];

const MONGOLIAN_NAMES = [
  'Darkmeister','bLitz','Techno','910','maaRaa','tikuak',
  'Chinggis','Kublai','Temujin','ArhanGai','Bayar','Munkh',
  'Sukhbaatar','Gantulga','Erdene','Nominchimeg','Oyunaa',
  'Zolbayar','Ireedui','Usukhbayar','Sodbayar','Garidmagnai',
  'Tuguldur','Enkhbold','Batmunkh','Khongorzul','Ankhbayar',
  'Ganbold','Narantsetseg','Lkhagva','Tserenpuntsag','Doljin',
  'Enkh','Bold','Bat','Gan','Mend','Saran','Nara','Oyun'
];

function getRandName() {
  return MONGOLIAN_NAMES[Math.floor(Math.random() * MONGOLIAN_NAMES.length)];
}

function generateMatch(id) {
  // Featured 3D POV Matches #1, #2, #3
  if (id === 1) {
    return { id: 1, map: 'de_mirage', scoreA: 11, scoreB: 9, teamA: 'Team bLitz', teamB: 'Team Senzu', elapsed: '28:14', status: 'live', has3dPov: true };
  }
  if (id === 2) {
    return { id: 2, map: 'de_inferno', scoreA: 12, scoreB: 11, teamA: 'Nomad Warriors', teamB: 'Ulaanbaatar 5', elapsed: '34:40', status: 'live', has3dPov: true };
  }
  if (id === 3) {
    return { id: 3, map: 'de_anubis', scoreA: 7, scoreB: 8, teamA: 'Steppe Eagles', teamB: 'Gobi Wolves', elapsed: '19:05', status: 'live', has3dPov: true };
  }

  const isLive = id <= 37;
  const map = MAPS[Math.floor(Math.random() * MAPS.length)];
  const scoreA = isLive ? Math.floor(Math.random() * 16) : 0;
  const scoreB = isLive ? Math.floor(Math.random() * 16) : 0;
  const elapsed = isLive ? `${Math.floor(Math.random() * 45) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2,'0')}` : '--:--';

  const teamA = `${getRandName()} 5`;
  const teamB = `${getRandName()} 5`;

  return { id, map, scoreA, scoreB, teamA, teamB, elapsed, status: isLive ? 'live' : 'waiting', has3dPov: false };
}

const ALL_MATCHES = Array.from({ length: 40 }, (_, i) => generateMatch(i + 1));

// Pagination
let currentPage = 1;
const matchesPerPage = 10;
let currentFilter = 'all';
let searchQuery = '';

function getFilteredMatches() {
  let list = [...ALL_MATCHES];
  if (currentFilter === 'live') list = list.filter(m => m.status === 'live');
  if (currentFilter === 'waiting') list = list.filter(m => m.status === 'waiting');
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(m =>
      m.teamA.toLowerCase().includes(q) ||
      m.teamB.toLowerCase().includes(q) ||
      m.map.toLowerCase().includes(q)
    );
  }
  return list;
}

function renderMatches() {
  const grid = document.getElementById('matchesGrid');
  const filtered = getFilteredMatches();
  const totalPages = Math.max(1, Math.ceil(filtered.length / matchesPerPage));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * matchesPerPage;
  const page = filtered.slice(start, start + matchesPerPage);

  grid.innerHTML = '';

  if (page.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);font-family:var(--font-heading)">Тоглолт олдсонгүй</div>`;
  } else {
    page.forEach((m, idx) => {
      const isFeaturedPov = m.id <= 3 && m.status === 'live';
      const card = document.createElement('div');
      card.className = `match-card match-${m.status} ${isFeaturedPov ? 'match-featured-pov' : ''}`;
      card.style.animationDelay = `${idx * 0.04}s`;
      card.innerHTML = `
        <div class="match-header">
          <span class="match-server-num">SERVER #${m.id} ${isFeaturedPov ? '★' : ''}</span>
          ${isFeaturedPov
            ? `<span class="match-live-badge badge-3dpov">🎥 3D POV LIVE</span>`
            : m.status === 'live'
              ? `<span class="match-live-badge badge-live">LIVE (NO GOTV)</span>`
              : `<span class="match-live-badge badge-waiting">⏳ ХҮЛЭЭЖ БАЙНА</span>`
          }
        </div>
        <div class="match-teams">
          <div class="match-team">
            <div class="team-name">${m.teamA}</div>
            ${m.status === 'live' ? `<div class="team-score">${m.scoreA}</div>` : ''}
          </div>
          <div class="match-vs">VS</div>
          <div class="match-team">
            <div class="team-name">${m.teamB}</div>
            ${m.status === 'live' ? `<div class="team-score">${m.scoreB}</div>` : ''}
          </div>
        </div>
        <div class="match-info">
          <span class="match-map">${m.map}</span>
          ${isFeaturedPov
            ? `<span class="match-time" style="color:#fde047;font-weight:800">🎥 3D POV Үзэх</span>`
            : m.status === 'live'
              ? `<span class="match-time" style="color:var(--text-muted)">⚡ GOTV OFF · IP Хуулах</span>`
              : `<span style="color:var(--gold);font-size:0.75rem">Тоглогч хүлээж байна</span>`
          }
          <span class="match-players-count">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
            ${m.status === 'live' ? '10/10' : '8/10'}
          </span>
        </div>
      `;
      card.addEventListener('click', () => {
        if (isFeaturedPov && typeof watchMatchInArena === 'function') {
          watchMatchInArena(m, true);
        } else {
          navigator.clipboard?.writeText(`connect match${m.id}.mongolz.gg`).catch(() => {});
          showToast('info', '⚡', `Server #${m.id} (${m.map}) — IP хуулагдлаа`,
            `3D POV зөвхөн Server #1, #2, #3 дээр ажиллана (Host Load Protection).`, 3500);
        }
      });
      grid.appendChild(card);
    });
  }

  document.getElementById('pageInfo').textContent = `${currentPage} / ${totalPages}`;
  document.getElementById('prevPage').disabled = currentPage <= 1;
  document.getElementById('nextPage').disabled = currentPage >= totalPages;

  // Update counts
  document.getElementById('countAll').textContent = ALL_MATCHES.length;
  document.getElementById('countLive').textContent = ALL_MATCHES.filter(m => m.status === 'live').length;
  document.getElementById('countWaiting').textContent = ALL_MATCHES.filter(m => m.status === 'waiting').length;
}

function filterMatches(filter) {
  currentFilter = filter;
  currentPage = 1;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  renderMatches();
}

function searchMatches(q) {
  searchQuery = q;
  currentPage = 1;
  renderMatches();
}

function changePage(dir) {
  const filtered = getFilteredMatches();
  const totalPages = Math.ceil(filtered.length / matchesPerPage);
  currentPage = Math.max(1, Math.min(currentPage + dir, totalPages));
  renderMatches();
  document.getElementById('matches').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===================== LEADERBOARD =====================
const LB_DATA = {
  rating: [
    { name: 'DarkMeister', elo: 2847, wl: '89/32', kd: '1.84', hs: '48%' },
    { name: 'bLitz', elo: 2791, wl: '102/41', kd: '1.72', hs: '52%' },
    { name: 'Techno', elo: 2654, wl: '76/28', kd: '1.68', hs: '41%' },
    { name: '910', elo: 2612, wl: '88/44', kd: '1.59', hs: '39%' },
    { name: 'tikuak', elo: 2588, wl: '71/36', kd: '1.55', hs: '44%' },
    { name: 'maaRaa', elo: 2510, wl: '65/35', kd: '1.49', hs: '37%' },
    { name: 'Chinggis', elo: 2487, wl: '59/32', kd: '1.46', hs: '43%' },
    { name: 'Kublai', elo: 2432, wl: '72/41', kd: '1.42', hs: '38%' },
    { name: 'Temujin', elo: 2401, wl: '61/37', kd: '1.38', hs: '35%' },
    { name: 'ArhanGai', elo: 2378, wl: '55/34', kd: '1.35', hs: '41%' },
  ],
  kills: [
    { name: 'bLitz', elo: '14,821', wl: '102/41', kd: '1.72', hs: '52%' },
    { name: 'DarkMeister', elo: '13,452', wl: '89/32', kd: '1.84', hs: '48%' },
    { name: '910', elo: '12,988', wl: '88/44', kd: '1.59', hs: '39%' },
    { name: 'Techno', elo: '11,234', wl: '76/28', kd: '1.68', hs: '41%' },
    { name: 'Ganbold', elo: '10,891', wl: '68/40', kd: '1.44', hs: '36%' },
    { name: 'Mongolchin', elo: '10,445', wl: '62/39', kd: '1.41', hs: '33%' },
    { name: 'tikuak', elo: '10,122', wl: '71/36', kd: '1.55', hs: '44%' },
    { name: 'Baatar', elo: '9,854', wl: '58/40', kd: '1.38', hs: '31%' },
    { name: 'Sukhbaa', elo: '9,601', wl: '54/37', kd: '1.34', hs: '37%' },
    { name: 'maaRaa', elo: '9,312', wl: '65/35', kd: '1.49', hs: '37%' },
  ],
  kz: [
    { name: 'kzGod_MN', elo: '12:34.21', wl: 'kz_quantum', kd: '—', hs: 'PRO' },
    { name: 'BhopKing', elo: '13:02.88', wl: 'kz_quantum', kd: '—', hs: 'PRO' },
    { name: '910', elo: '14:11.44', wl: 'kz_quantum', kd: '—', hs: 'PRO' },
    { name: 'TemujinKZ', elo: '15:22.09', wl: 'kz_tankers', kd: '—', hs: 'VIP' },
    { name: 'AltaiFlyer', elo: '16:05.33', wl: 'kz_tankers', kd: '—', hs: 'VIP' },
    { name: 'SteppeRunner', elo: '16:44.12', wl: 'kz_zenith', kd: '—', hs: 'VIP' },
    { name: 'UlaanJump', elo: '17:12.55', wl: 'kz_zenith', kd: '—', hs: 'REG' },
    { name: 'GobiHopper', elo: '17:48.90', wl: 'kz_zenith', kd: '—', hs: 'REG' },
    { name: 'KhangaiClimb', elo: '18:22.14', wl: 'kz_protraining', kd: '—', hs: 'REG' },
    { name: 'MongolBhop', elo: '19:01.77', wl: 'kz_protraining', kd: '—', hs: 'REG' },
  ],
};

let currentLBTab = 'rating';

function switchLBTab(tab) {
  currentLBTab = tab;
  document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderLeaderboard();
}

function getInitials(name) {
  return name.slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  ['#3b82f6','#8b5cf6'], ['#f0a800','#ef4444'], ['#22c55e','#06b6d4'],
  ['#ec4899','#8b5cf6'], ['#f97316','#eab308'], ['#06b6d4','#3b82f6']
];

function renderLeaderboard() {
  const tbody = document.getElementById('lbBody');
  const data = LB_DATA[currentLBTab];
  const isKZ = currentLBTab === 'kz';

  tbody.innerHTML = data.map((row, i) => {
    const colors = AVATAR_COLORS[i % AVATAR_COLORS.length];
    const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : '';
    const rankIcon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1;
    return `
      <tr onclick="openPlayerProfile('${row.name}')" style="cursor:pointer">
        <td><span class="lb-rank ${rankClass}">${rankIcon}</span></td>
        <td>
          <div class="lb-player">
            <div class="lb-avatar" style="background:linear-gradient(135deg,${colors[0]},${colors[1]})">${getInitials(row.name)}</div>
            <span class="lb-name clickable-player">${row.name}</span>
          </div>
        </td>
        <td><span class="lb-elo">${row.elo}</span></td>
        <td><span class="lb-wl">${row.wl}</span></td>
        <td><span class="lb-kd">${row.kd}</span></td>
        <td><span class="lb-hs">${row.hs}</span></td>
      </tr>
    `;
  }).join('');
}

// ===================== REVEAL SCROLL =====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.server-card, .stats-card, .match-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===================== LIVE MATCH TIMER =====================
function updateLiveMatches() {
  ALL_MATCHES.filter(m => m.status === 'live').forEach(m => {
    const [mins, secs] = m.elapsed.split(':').map(Number);
    let totalSecs = mins * 60 + secs + 10;
    if (totalSecs > 2700) totalSecs = 10;
    m.elapsed = `${Math.floor(totalSecs / 60)}:${String(totalSecs % 60).padStart(2, '0')}`;
  });
}

setInterval(() => {
  updateLiveMatches();
  if (currentFilter !== 'waiting') renderMatches();
}, 10000);

// ===================== ACTIVE MATCH COUNT =====================
function updateActiveMatchCount() {
  const liveCount = ALL_MATCHES.filter(m => m.status === 'live').length;
  const el = document.getElementById('activeMatches');
  if (el) el.textContent = `${liveCount} идэвхтэй`;
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  renderMatches();
  renderLeaderboard();
  updateActiveMatchCount();

  // Add reveal to section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Welcome toast
  setTimeout(() => {
    showToast('gold', '🏆', 'The MongolZ GDG Server-т тавтай морил!',
      '847 тоглогч онлайн байна', 4000);
  }, 1200);
});

// ===================== SKIN CHANGER =====================

// --- Weapon SVG shapes (stylized) ---
const WEAPON_SVGS = {
  'AK-47': `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="ak47g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Stock --><rect x="10" y="52" width="80" height="18" rx="4" fill="url(#ak47g)" opacity="0.9"/>
    <!-- Body --><rect x="85" y="44" width="200" height="28" rx="5" fill="url(#ak47g)"/>
    <!-- Barrel --><rect x="280" y="52" width="110" height="10" rx="3" fill="url(#ak47g)" opacity="0.85"/>
    <!-- Magazine --><rect x="140" y="72" width="28" height="40" rx="4" fill="url(#ak47g)" opacity="0.75"/>
    <!-- Grip --><rect x="265" y="60" width="20" height="35" rx="4" fill="url(#ak47g)" opacity="0.75"/>
    <!-- Trigger --><path d="M250 70 Q260 80 250 90" stroke="SKINCOLOR2" stroke-width="3" fill="none"/>
    <!-- Sight --><rect x="170" y="40" width="8" height="6" rx="1" fill="SKINCOLOR2" opacity="0.8"/>
    <rect x="260" y="40" width="12" height="5" rx="1" fill="SKINCOLOR2" opacity="0.8"/>
  </svg>`,
  'M4A4': `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="m4g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <rect x="10" y="54" width="70" height="16" rx="4" fill="url(#m4g)" opacity="0.9"/>
    <rect x="75" y="46" width="190" height="26" rx="5" fill="url(#m4g)"/>
    <rect x="260" y="50" width="130" height="10" rx="3" fill="url(#m4g)" opacity="0.8"/>
    <!-- Handguard stripes --><line x1="90" y1="46" x2="90" y2="72" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
    <line x1="110" y1="46" x2="110" y2="72" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
    <line x1="130" y1="46" x2="130" y2="72" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
    <rect x="145" y="72" width="26" height="38" rx="4" fill="url(#m4g)" opacity="0.7"/>
    <rect x="255" y="58" width="18" height="32" rx="4" fill="url(#m4g)" opacity="0.75"/>
  </svg>`,
  'AWP': `<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="awpg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Long barrel --><rect x="10" y="54" width="250" height="12" rx="3" fill="url(#awpg)" opacity="0.85"/>
    <!-- Body --><rect x="230" y="44" width="150" height="30" rx="6" fill="url(#awpg)"/>
    <!-- Scope --><rect x="270" y="34" width="60" height="16" rx="4" fill="url(#awpg)" opacity="0.9"/>
    <circle cx="300" cy="42" r="7" fill="none" stroke="SKINCOLOR2" stroke-width="2"/>
    <!-- Grip --><rect x="340" y="68" width="22" height="36" rx="5" fill="url(#awpg)" opacity="0.8"/>
    <!-- Stock --><rect x="360" y="52" width="40" height="20" rx="4" fill="url(#awpg)" opacity="0.9"/>
    <!-- Bipod --><line x1="80" y1="66" x2="65" y2="95" stroke="SKINCOLOR2" stroke-width="3"/><line x1="90" y1="66" x2="105" y2="95" stroke="SKINCOLOR2" stroke-width="3"/>
  </svg>`,
  'Desert Eagle': `<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="deagg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Barrel --><rect x="20" y="48" width="160" height="12" rx="3" fill="url(#deagg)" opacity="0.85"/>
    <!-- Slide/Body --><rect x="60" y="40" width="150" height="26" rx="5" fill="url(#deagg)"/>
    <!-- Grip --><rect x="175" y="60" width="30" height="45" rx="6" fill="url(#deagg)" opacity="0.8"/>
    <!-- Trigger guard --><path d="M170 65 Q185 90 170 90" stroke="SKINCOLOR2" stroke-width="2.5" fill="none"/>
    <!-- Slide lines --><line x1="80" y1="40" x2="80" y2="66" stroke="rgba(0,0,0,0.25)" stroke-width="2"/>
    <line x1="100" y1="40" x2="100" y2="66" stroke="rgba(0,0,0,0.25)" stroke-width="2"/>
    <line x1="120" y1="40" x2="120" y2="66" stroke="rgba(0,0,0,0.25)" stroke-width="2"/>
    <!-- Sight --><rect x="70" y="37" width="10" height="5" rx="1" fill="SKINCOLOR2"/>
  </svg>`,
  'USP-S': `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="uspg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Suppressor --><rect x="10" y="52" width="80" height="14" rx="7" fill="url(#uspg)" opacity="0.75"/>
    <!-- Barrel --><rect x="85" y="51" width="80" height="14" rx="3" fill="url(#uspg)" opacity="0.85"/>
    <!-- Body --><rect x="120" y="43" width="120" height="26" rx="5" fill="url(#uspg)"/>
    <!-- Grip --><rect x="205" y="62" width="28" height="40" rx="5" fill="url(#uspg)" opacity="0.8"/>
    <!-- Trigger --><path d="M195 65 Q207 80 195 85" stroke="SKINCOLOR2" stroke-width="2.5" fill="none"/>
  </svg>`,
  'Glock-18': `<svg viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="glkg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <rect x="20" y="50" width="130" height="12" rx="3" fill="url(#glkg)" opacity="0.85"/>
    <rect x="80" y="43" width="130" height="24" rx="5" fill="url(#glkg)"/>
    <rect x="175" y="60" width="26" height="38" rx="5" fill="url(#glkg)" opacity="0.8"/>
    <path d="M165 62 Q177 78 165 82" stroke="SKINCOLOR2" stroke-width="2.5" fill="none"/>
    <!-- Slide serrations --><line x1="90" y1="43" x2="90" y2="67" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
    <line x1="105" y1="43" x2="105" y2="67" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
    <line x1="120" y1="43" x2="120" y2="67" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
  </svg>`,
  'Butterfly': `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="btfg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Handle 1 --><rect x="20" y="54" width="90" height="14" rx="7" fill="url(#btfg)" opacity="0.9"/>
    <!-- Blade --><path d="M105 50 L260 56 L260 64 L105 70 Z" fill="url(#btfg)"/>
    <!-- Blade edge --><line x1="105" y1="56" x2="260" y2="58" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <!-- Handle 2 --><rect x="260" y="54" width="20" height="14" rx="4" fill="url(#btfg)" opacity="0.9"/>
    <!-- Guard --><rect x="98" y="47" width="12" height="26" rx="3" fill="SKINCOLOR2" opacity="0.8"/>
  </svg>`,
  'Karambit': `<svg viewBox="0 0 280 130" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="krmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Handle --><rect x="140" y="52" width="110" height="22" rx="10" fill="url(#krmg)" opacity="0.9"/>
    <!-- Blade curve --><path d="M145 60 Q80 20 40 65 Q20 90 60 100 Q100 108 145 68" fill="url(#krmg)" opacity="0.9"/>
    <!-- Blade shine --><path d="M140 62 Q85 28 50 68" stroke="rgba(255,255,255,0.35)" stroke-width="2" fill="none"/>
    <!-- Finger ring --><circle cx="230" cy="63" r="14" fill="none" stroke="url(#krmg)" stroke-width="8"/>
    <!-- Guard --><rect x="132" y="48" width="14" height="30" rx="4" fill="SKINCOLOR2" opacity="0.8"/>
  </svg>`,
  'Sport Gloves': `<svg viewBox="0 0 280 130" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="spgg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Palm --><ellipse cx="140" cy="75" rx="90" ry="45" fill="url(#spgg)" opacity="0.9"/>
    <!-- Fingers --><rect x="60" y="30" width="22" height="52" rx="11" fill="url(#spgg)"/>
    <rect x="88" y="22" width="22" height="58" rx="11" fill="url(#spgg)"/>
    <rect x="116" y="20" width="22" height="58" rx="11" fill="url(#spgg)"/>
    <rect x="144" y="24" width="22" height="54" rx="11" fill="url(#spgg)"/>
    <!-- Thumb --><ellipse cx="58" cy="85" rx="20" ry="13" fill="url(#spgg)" transform="rotate(-30 58 85)"/>
    <!-- Strap --><rect x="80" y="95" width="120" height="12" rx="6" fill="SKINCOLOR2" opacity="0.6"/>
  </svg>`,
  'Moto Gloves': `<svg viewBox="0 0 280 130" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="mtgg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <ellipse cx="140" cy="78" rx="88" ry="42" fill="url(#mtgg)" opacity="0.9"/>
    <rect x="62" y="34" width="20" height="50" rx="10" fill="url(#mtgg)"/>
    <rect x="88" y="26" width="20" height="56" rx="10" fill="url(#mtgg)"/>
    <rect x="114" y="24" width="20" height="56" rx="10" fill="url(#mtgg)"/>
    <rect x="140" y="28" width="20" height="52" rx="10" fill="url(#mtgg)"/>
    <ellipse cx="58" cy="86" rx="18" ry="12" fill="url(#mtgg)" transform="rotate(-28 58 86)"/>
    <!-- Knuckle pads --><ellipse cx="94" cy="40" rx="10" ry="7" fill="SKINCOLOR2" opacity="0.5"/>
    <ellipse cx="120" cy="37" rx="10" ry="7" fill="SKINCOLOR2" opacity="0.5"/>
    <ellipse cx="146" cy="38" rx="10" ry="7" fill="SKINCOLOR2" opacity="0.5"/>
  </svg>`,
  'SMG': `<svg viewBox="0 0 340 125" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="smgg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Folding Stock --><rect x="20" y="50" width="60" height="10" rx="4" fill="url(#smgg)" opacity="0.85"/>
    <!-- Compact Receiver --><rect x="78" y="42" width="155" height="28" rx="6" fill="url(#smgg)"/>
    <!-- Suppressor/Barrel --><rect x="230" y="50" width="85" height="12" rx="4" fill="url(#smgg)" opacity="0.9"/>
    <!-- Long SMG Mag --><rect x="175" y="70" width="18" height="45" rx="4" fill="url(#smgg)" opacity="0.8"/>
    <!-- Rear Grip --><rect x="105" y="68" width="20" height="36" rx="4" fill="url(#smgg)" opacity="0.85"/>
    <!-- Top Rail --><rect x="92" y="37" width="120" height="5" rx="2" fill="SKINCOLOR2" opacity="0.8"/>
  </svg>`,
  'Heavy': `<svg viewBox="0 0 410 125" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="hvyg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="SKINCOLOR1"/><stop offset="100%" stop-color="SKINCOLOR2"/></linearGradient></defs>
    <!-- Heavy Stock --><polygon points="12,48 85,48 85,72 12,78" fill="url(#hvyg)" opacity="0.9"/>
    <!-- Receiver --><rect x="82" y="42" width="175" height="32" rx="5" fill="url(#hvyg)"/>
    <!-- Heavy Double Barrel & Pump --><rect x="255" y="46" width="135" height="11" rx="3" fill="url(#hvyg)"/>
    <rect x="255" y="59" width="110" height="11" rx="4" fill="SKINCOLOR2" opacity="0.85"/>
    <!-- Box/Shell Mag --><rect x="150" y="74" width="38" height="36" rx="5" fill="url(#hvyg)" opacity="0.8"/>
    <!-- Grip --><rect x="92" y="72" width="22" height="34" rx="4" fill="url(#hvyg)" opacity="0.85"/>
  </svg>`
};

// --- Complete CS2 Weapon Database (All 61 Weapons across 6 Categories) ---
const WEAPONS = {
  rifles: [
    { id:'ak47',   name:'AK-47',        emoji:'🔫', svgKey:'AK-47' },
    { id:'m4a4',   name:'M4A4',         emoji:'🔫', svgKey:'M4A4' },
    { id:'m4a1s',  name:'M4A1-S',       emoji:'🔫', svgKey:'M4A4' },
    { id:'awp',    name:'AWP',          emoji:'🎯', svgKey:'AWP' },
    { id:'galil',  name:'Galil AR',     emoji:'🔫', svgKey:'AK-47' },
    { id:'famas',  name:'FAMAS',        emoji:'🔫', svgKey:'M4A4' },
    { id:'sg553',  name:'SG 553',       emoji:'🔫', svgKey:'AK-47' },
    { id:'aug',    name:'AUG',          emoji:'🔫', svgKey:'M4A4' },
    { id:'ssg08',  name:'SSG 08',       emoji:'🎯', svgKey:'AWP' },
    { id:'scar20', name:'SCAR-20',      emoji:'🎯', svgKey:'AWP' },
    { id:'g3sg1',  name:'G3SG1',        emoji:'🎯', svgKey:'AWP' }
  ],
  pistols: [
    { id:'deagle', name:'Desert Eagle',  emoji:'🔫', svgKey:'Desert Eagle' },
    { id:'usps',   name:'USP-S',         emoji:'🔫', svgKey:'USP-S' },
    { id:'glock',  name:'Glock-18',      emoji:'🔫', svgKey:'Glock-18' },
    { id:'p2000',  name:'P2000',         emoji:'🔫', svgKey:'Glock-18' },
    { id:'p250',   name:'P250',          emoji:'🔫', svgKey:'Glock-18' },
    { id:'fiveseven', name:'Five-SeveN', emoji:'🔫', svgKey:'Glock-18' },
    { id:'tec9',   name:'Tec-9',         emoji:'🔫', svgKey:'USP-S' },
    { id:'cz75',   name:'CZ75-Auto',     emoji:'🔫', svgKey:'USP-S' },
    { id:'dualies',name:'Dual Berettas', emoji:'🔫', svgKey:'Desert Eagle' },
    { id:'r8',     name:'R8 Revolver',   emoji:'🔫', svgKey:'Desert Eagle' }
  ],
  smgs: [
    { id:'mp9',    name:'MP9',           emoji:'⚡', svgKey:'SMG' },
    { id:'mac10',  name:'MAC-10',        emoji:'⚡', svgKey:'SMG' },
    { id:'mp7',    name:'MP7',           emoji:'⚡', svgKey:'SMG' },
    { id:'mp5sd',  name:'MP5-SD',        emoji:'⚡', svgKey:'SMG' },
    { id:'ump45',  name:'UMP-45',        emoji:'⚡', svgKey:'SMG' },
    { id:'p90',    name:'P90',           emoji:'⚡', svgKey:'SMG' },
    { id:'bizon',  name:'PP-Bizon',      emoji:'⚡', svgKey:'SMG' }
  ],
  heavy: [
    { id:'xm1014', name:'XM1014',        emoji:'💥', svgKey:'Heavy' },
    { id:'nova',   name:'Nova',          emoji:'💥', svgKey:'Heavy' },
    { id:'mag7',   name:'MAG-7',         emoji:'💥', svgKey:'Heavy' },
    { id:'sawedoff', name:'Sawed-Off',   emoji:'💥', svgKey:'Heavy' },
    { id:'m249',   name:'M249',          emoji:'💥', svgKey:'Heavy' },
    { id:'negev',  name:'Negev',         emoji:'💥', svgKey:'Heavy' }
  ],
  knives: [
    { id:'karambit',  name:'Karambit',        emoji:'🗡️', svgKey:'Karambit' },
    { id:'butterfly', name:'Butterfly Knife', emoji:'🗡️', svgKey:'Butterfly' },
    { id:'m9knife',   name:'M9 Bayonet',      emoji:'🗡️', svgKey:'Butterfly' },
    { id:'bayonet',   name:'Bayonet',         emoji:'🗡️', svgKey:'Butterfly' },
    { id:'skeleton',  name:'Skeleton Knife',  emoji:'🗡️', svgKey:'Karambit' },
    { id:'talon',     name:'Talon Knife',     emoji:'🗡️', svgKey:'Karambit' },
    { id:'stiletto',  name:'Stiletto Knife',  emoji:'🗡️', svgKey:'Butterfly' },
    { id:'flip',      name:'Flip Knife',      emoji:'🗡️', svgKey:'Butterfly' },
    { id:'ursus',     name:'Ursus Knife',     emoji:'🗡️', svgKey:'Butterfly' },
    { id:'huntsman',  name:'Huntsman Knife',  emoji:'🗡️', svgKey:'Butterfly' },
    { id:'bowie',     name:'Bowie Knife',     emoji:'🗡️', svgKey:'Butterfly' },
    { id:'falchion',  name:'Falchion Knife',  emoji:'🗡️', svgKey:'Butterfly' },
    { id:'shadow',    name:'Shadow Daggers',  emoji:'🗡️', svgKey:'Karambit' },
    { id:'kukri',     name:'Kukri Knife',     emoji:'🗡️', svgKey:'Karambit' },
    { id:'nomad',     name:'Nomad Knife',     emoji:'🗡️', svgKey:'Butterfly' },
    { id:'paracord',  name:'Paracord Knife',  emoji:'🗡️', svgKey:'Butterfly' },
    { id:'survival',  name:'Survival Knife',  emoji:'🗡️', svgKey:'Butterfly' },
    { id:'classic',   name:'Classic Knife',   emoji:'🗡️', svgKey:'Butterfly' },
    { id:'gut',       name:'Gut Knife',       emoji:'🗡️', svgKey:'Karambit' }
  ],
  gloves: [
    { id:'sport',      name:'Sport Gloves',      emoji:'🧤', svgKey:'Sport Gloves' },
    { id:'specialist', name:'Specialist Gloves', emoji:'🧤', svgKey:'Sport Gloves' },
    { id:'driver',     name:'Driver Gloves',     emoji:'🧤', svgKey:'Moto Gloves' },
    { id:'moto',       name:'Moto Gloves',       emoji:'🧤', svgKey:'Moto Gloves' },
    { id:'hand',       name:'Hand Wraps',        emoji:'🧤', svgKey:'Moto Gloves' },
    { id:'hydra',      name:'Hydra Gloves',      emoji:'🧤', svgKey:'Sport Gloves' },
    { id:'bloodhound', name:'Bloodhound Gloves', emoji:'🧤', svgKey:'Moto Gloves' },
    { id:'brokenfang', name:'Broken Fang Gloves',emoji:'🧤', svgKey:'Sport Gloves' }
  ]
};

// Universal Iconic CS2 Finishes available across weapons so EVERY gun/knife/glove has 12-18 skins!
const UNIVERSAL_GUN_SKINS = [
  { name:'Printstream',      rarity:'covert',     emoji:'🖨️', color1:'#ffffff', color2:'#1e1e2f', float:0.0085, wear:'Factory New' },
  { name:'Asiimov',          rarity:'covert',     emoji:'🤖', color1:'#ff8c00', color2:'#16161d', float:0.1810, wear:'Field-Tested' },
  { name:'Hyper Beast',      rarity:'covert',     emoji:'🐉', color1:'#ff5e3a', color2:'#120b29', float:0.0410, wear:'Factory New' },
  { name:'Neo-Noir',         rarity:'classified', emoji:'🌙', color1:'#d946ef', color2:'#1e1b4b', float:0.0220, wear:'Factory New' },
  { name:'Fade (100%)',      rarity:'covert',     emoji:'🌈', color1:'#ff6600', color2:'#9333ea', float:0.0042, wear:'Factory New' },
  { name:'Case Hardened (Blue Gem)', rarity:'classified', emoji:'🔵', color1:'#38bdf8', color2:'#1e3a8a', float:0.0810, wear:'Minimal Wear' },
  { name:'Redline',          rarity:'classified', emoji:'🔴', color1:'#dc2626', color2:'#111111', float:0.1520, wear:'Field-Tested' },
  { name:'Bloodsport',       rarity:'covert',     emoji:'💉', color1:'#ef4444', color2:'#18181b', float:0.0350, wear:'Factory New' },
  { name:'Golden Coil',      rarity:'covert',     emoji:'🐍', color1:'#ffd700', color2:'#1c1917', float:0.0190, wear:'Factory New' },
  { name:'Cyrex',            rarity:'classified', emoji:'⚡', color1:'#ef4444', color2:'#e5e7eb', float:0.0550, wear:'Factory New' },
  { name:'Water Elemental',  rarity:'restricted', emoji:'💧', color1:'#06b6d4', color2:'#0c4a6e', float:0.0680, wear:'Minimal Wear' },
  { name:'Decimator',        rarity:'restricted', emoji:'🔮', color1:'#ec4899', color2:'#3b82f6', float:0.0720, wear:'Minimal Wear' },
  { name:'Whiteout',         rarity:'mil',        emoji:'⬜', color1:'#f8fafc', color2:'#94a3b8', float:0.0610, wear:'Factory New' },
  { name:'Nightwish',        rarity:'covert',     emoji:'🌌', color1:'#22d3ee', color2:'#701a75', float:0.0290, wear:'Factory New' }
];

const UNIVERSAL_KNIFE_SKINS = [
  { name:'Doppler (Ruby)',       rarity:'covert',     emoji:'♦️', color1:'#ff1e42', color2:'#4c0519', float:0.0065, wear:'Factory New' },
  { name:'Doppler (Sapphire)',   rarity:'covert',     emoji:'🔷', color1:'#2563eb', color2:'#0f172a', float:0.0052, wear:'Factory New' },
  { name:'Gamma Doppler (Emerald)', rarity:'covert',  emoji:'💚', color1:'#10b981', color2:'#022c22', float:0.0048, wear:'Factory New' },
  { name:'Fade (100% Full)',     rarity:'covert',     emoji:'🌈', color1:'#ff6600', color2:'#9b2ef4', float:0.0039, wear:'Factory New' },
  { name:'Marble Fade (Fire & Ice)', rarity:'covert', emoji:'🌊', color1:'#ef4444', color2:'#1d4ed8', float:0.0078, wear:'Factory New' },
  { name:'Case Hardened (#387 Blue Gem)', rarity:'covert', emoji:'💎', color1:'#38bdf8', color2:'#1e40af', float:0.0450, wear:'Factory New' },
  { name:'Tiger Tooth',          rarity:'covert',     emoji:'🐯', color1:'#f59e0b', color2:'#1c1917', float:0.0082, wear:'Factory New' },
  { name:'Lore',                 rarity:'covert',     emoji:'🐉', color1:'#eab308', color2:'#422006', float:0.0180, wear:'Factory New' },
  { name:'Crimson Web',          rarity:'classified', emoji:'🕷️', color1:'#991b1b', color2:'#09090b', float:0.0680, wear:'Factory New' },
  { name:'Autotronic',           rarity:'classified', emoji:'🤖', color1:'#dc2626', color2:'#52525b', float:0.0420, wear:'Factory New' },
  { name:'Slaughter',            rarity:'classified', emoji:'🩸', color1:'#f43f5e', color2:'#881337', float:0.0310, wear:'Factory New' },
  { name:'Black Laminate',       rarity:'restricted', emoji:'🖤', color1:'#52525b', color2:'#09090b', float:0.0950, wear:'Minimal Wear' },
  { name:'Blue Steel',           rarity:'restricted', emoji:'💙', color1:'#64748b', color2:'#1e293b', float:0.1120, wear:'Minimal Wear' },
  { name:'Vanilla',              rarity:'mil',        emoji:'⬜', color1:'#d4d4d8', color2:'#52525b', float:0.0300, wear:'Factory New' }
];

const UNIVERSAL_GLOVE_SKINS = [
  { name:"Pandora's Box",        rarity:'covert',     emoji:'🎁', color1:'#a855f7', color2:'#2e1065', float:0.0680, wear:'Minimal Wear' },
  { name:'Vice',                 rarity:'covert',     emoji:'🌴', color1:'#ec4899', color2:'#06b6d4', float:0.0620, wear:'Minimal Wear' },
  { name:'Hedge Maze',           rarity:'covert',     emoji:'🌿', color1:'#22c55e', color2:'#052e16', float:0.0710, wear:'Minimal Wear' },
  { name:'Superconductor',       rarity:'covert',     emoji:'⚡', color1:'#38bdf8', color2:'#1e293b', float:0.0750, wear:'Minimal Wear' },
  { name:'Crimson Kimono',       rarity:'covert',     emoji:'👘', color1:'#ef4444', color2:'#18181b', float:0.0640, wear:'Minimal Wear' },
  { name:'Spearmint',            rarity:'covert',     emoji:'🍃', color1:'#34d399', color2:'#064e3b', float:0.0720, wear:'Minimal Wear' },
  { name:'Slingshot',            rarity:'classified', emoji:'🔥', color1:'#dc2626', color2:'#f5f5f4', float:0.0820, wear:'Minimal Wear' },
  { name:'Amphibious',           rarity:'classified', emoji:'🌊', color1:'#3b82f6', color2:'#e2e8f0', float:0.0880, wear:'Minimal Wear' },
  { name:'King Snake',           rarity:'classified', emoji:'🐍', color1:'#f8fafc', color2:'#78716c', float:0.0790, wear:'Minimal Wear' },
  { name:'Cobalt Skulls',        rarity:'classified', emoji:'💀', color1:'#2563eb', color2:'#09090b', float:0.0910, wear:'Minimal Wear' },
  { name:'Snow Leopard',         rarity:'restricted', emoji:'🐆', color1:'#f1f5f9', color2:'#334155', float:0.0840, wear:'Minimal Wear' },
  { name:'Nocts',                rarity:'restricted', emoji:'🌑', color1:'#27272a', color2:'#09090b', float:0.0650, wear:'Factory New' }
];

// --- Weapon-specific signature skins merged with universal skins ---
const SKINS_DB = {
  ak47: [
    { name:'Wild Lotus',       rarity:'covert',     emoji:'🌸', color1:'#e879a0', color2:'#2d0a1f', float:0.0120, wear:'Factory New' },
    { name:'Fire Serpent',     rarity:'covert',     emoji:'🔴', color1:'#eb4b4b', color2:'#7a1a1a', float:0.0680, wear:'Factory New' },
    { name:'Case Hardened (661)', rarity:'covert',  emoji:'💎', color1:'#38bdf8', color2:'#1e3a8a', float:0.0420, wear:'Factory New' },
    { name:'Gold Arabesque',   rarity:'covert',     emoji:'👑', color1:'#ffd700', color2:'#78350f', float:0.0150, wear:'Factory New' },
    { name:'Vulcan',           rarity:'covert',     emoji:'⚡', color1:'#38bdf8', color2:'#1e293b', float:0.0241, wear:'Factory New' },
    { name:'Inheritance',      rarity:'covert',     emoji:'🏺', color1:'#f8fafc', color2:'#1d4ed8', float:0.0110, wear:'Factory New' },
    { name:'Fuel Injector',    rarity:'covert',     emoji:'⚙️', color1:'#facc15', color2:'#27272a', float:0.0310, wear:'Factory New' },
    { name:'Hydroponic',       rarity:'classified', emoji:'🍃', color1:'#4ade80', color2:'#e2e8f0', float:0.0420, wear:'Factory New' }
  ],
  m4a4: [
    { name:'Howl (Contraband)',rarity:'contraband', emoji:'🐺', color1:'#ef4444', color2:'#450a0a', float:0.0180, wear:'Factory New' },
    { name:'Poseidon',         rarity:'classified', emoji:'🔱', color1:'#06b6d4', color2:'#083344', float:0.0240, wear:'Factory New' },
    { name:'The Emperor',      rarity:'covert',     emoji:'👑', color1:'#f0a800', color2:'#1e1b4b', float:0.0340, wear:'Factory New' },
    { name:'Eye of Horus',     rarity:'covert',     emoji:'👁️', color1:'#fbbf24', color2:'#0c4a6e', float:0.0150, wear:'Factory New' },
    { name:'Temukau',          rarity:'covert',     emoji:'🌸', color1:'#f472b6', color2:'#eff6ff', float:0.0210, wear:'Factory New' }
  ],
  m4a1s: [
    { name:'Welcome to the Jungle', rarity:'covert', emoji:'🌴', color1:'#22c55e', color2:'#ca8a04', float:0.0140, wear:'Factory New' },
    { name:'Knight',           rarity:'classified', emoji:'⚔️', color1:'#ffd700', color2:'#18181b', float:0.0080, wear:'Factory New' },
    { name:'Hot Rod',          rarity:'classified', emoji:'🏎️', color1:'#dc2626', color2:'#450a0a', float:0.0065, wear:'Factory New' },
    { name:'Blue Phosphor',    rarity:'classified', emoji:'💙', color1:'#3b82f6', color2:'#0f172a', float:0.0050, wear:'Factory New' },
    { name:'Vaporwave',        rarity:'covert',     emoji:'🌆', color1:'#e879f9', color2:'#22d3ee', float:0.0190, wear:'Factory New' }
  ],
  awp: [
    { name:'Dragon Lore',      rarity:'covert',     emoji:'🐉', color1:'#eab308', color2:'#713f12', float:0.0072, wear:'Factory New' },
    { name:'Gungnir',          rarity:'covert',     emoji:'⚡', color1:'#38bdf8', color2:'#1e3a8a', float:0.0058, wear:'Factory New' },
    { name:'Medusa',           rarity:'covert',     emoji:'🐍', color1:'#10b981', color2:'#064e3b', float:0.0190, wear:'Factory New' },
    { name:'The Prince',       rarity:'covert',     emoji:'👑', color1:'#dc2626', color2:'#ca8a04', float:0.0140, wear:'Factory New' },
    { name:'Desert Hydra',     rarity:'covert',     emoji:'🦂', color1:'#fb923c', color2:'#f8fafc', float:0.0120, wear:'Factory New' },
    { name:'Chrome Cannon',    rarity:'covert',     emoji:'💿', color1:'#c084fc', color2:'#38bdf8', float:0.0150, wear:'Factory New' },
    { name:'Lightning Strike', rarity:'covert',     emoji:'🌩️', color1:'#a855f7', color2:'#1e1b4b', float:0.0045, wear:'Factory New' }
  ],
  deagle: [
    { name:'Blaze',            rarity:'restricted', emoji:'🔥', color1:'#ff8c00', color2:'#18181b', float:0.0062, wear:'Factory New' },
    { name:'Emerald Jörmungandr', rarity:'restricted', emoji:'🐍', color1:'#10b981', color2:'#064e3b', float:0.0140, wear:'Factory New' },
    { name:'Ocean Drive',      rarity:'covert',     emoji:'🌊', color1:'#ec4899', color2:'#0284c7', float:0.0220, wear:'Factory New' },
    { name:'Code Red',         rarity:'covert',     emoji:'🚨', color1:'#ef4444', color2:'#f8fafc', float:0.0180, wear:'Factory New' }
  ],
  usps: [
    { name:'Kill Confirmed',   rarity:'covert',     emoji:'💀', color1:'#dc2626', color2:'#450a0a', float:0.0140, wear:'Factory New' },
    { name:'Traitor',          rarity:'covert',     emoji:'🃏', color1:'#eab308', color2:'#991b1b', float:0.0190, wear:'Factory New' },
    { name:'Target Acquired',  rarity:'classified', emoji:'🎯', color1:'#ef4444', color2:'#1e293b', float:0.0210, wear:'Factory New' }
  ],
  glock: [
    { name:'Gamma Doppler (Emerald)', rarity:'covert', emoji:'💚', color1:'#10b981', color2:'#022c22', float:0.0055, wear:'Factory New' },
    { name:'Twilight Galaxy',  rarity:'classified', emoji:'🌌', color1:'#38bdf8', color2:'#0f172a', float:0.0180, wear:'Factory New' },
    { name:'Gold Toof',        rarity:'covert',     emoji:'🦷', color1:'#ec4899', color2:'#eab308', float:0.0220, wear:'Factory New' }
  ]
};

function getAllWeaponsFlat() {
  return [
    ...WEAPONS.rifles,
    ...WEAPONS.pistols,
    ...WEAPONS.smgs,
    ...WEAPONS.heavy,
    ...WEAPONS.knives,
    ...WEAPONS.gloves
  ];
}

function getSkinsForWeapon(wid) {
  const isKnife = WEAPONS.knives.some(w => w.id === wid);
  const isGlove = WEAPONS.gloves.some(w => w.id === wid);

  const customList = SKINS_DB[wid] || [];
  const basePool = isKnife
    ? UNIVERSAL_KNIFE_SKINS
    : isGlove
      ? UNIVERSAL_GLOVE_SKINS
      : UNIVERSAL_GUN_SKINS;

  const existingNames = new Set(customList.map(s => s.name));
  const merged = [...customList];
  for (const s of basePool) {
    if (!existingNames.has(s.name)) {
      merged.push(s);
    }
  }
  return merged;
}

// --- Rarity config ---
const RARITY_CONFIG = {
  contraband: { label:'Contraband', class:'rarity-covert', text:'rc-covert', color:'#f59e0b' },
  covert:     { label:'Covert',     class:'rarity-covert', text:'rc-covert', color:'#eb4b4b' },
  classified: { label:'Classified', class:'rarity-classified', text:'rc-classified', color:'#d32ce6' },
  restricted: { label:'Restricted', class:'rarity-restricted', text:'rc-restricted', color:'#8847ff' },
  mil:        { label:'Mil-Spec',   class:'rarity-mil', text:'rc-mil', color:'#4b69ff' },
  industrial: { label:'Industrial', class:'rarity-industrial', text:'rc-industrial', color:'#5e98d9' },
  consumer:   { label:'Consumer',   class:'rarity-consumer', text:'rc-consumer', color:'#b0c3d9' },
  blue:       { label:'Restricted', class:'rarity-restricted', text:'rc-restricted', color:'#8847ff' }
};

function getRarityKey(r) { return RARITY_CONFIG[r] || RARITY_CONFIG.consumer; }

// --- STATE ---
let sc_weaponCat  = 'rifles';
let sc_weaponId   = 'ak47';
let sc_weaponData = WEAPONS.rifles[0];
let sc_skinIdx    = 0;
let sc_rarityFilter = 'all';
let sc_weaponSearch = '';
let sc_skinSearch = '';
let sc_statTrak = false;
let sc_customFloat = null;
let sc_equipped   = {}; // weaponId -> skin

function getFilteredSkinsForCurrentWeapon() {
  let skins = getSkinsForWeapon(sc_weaponId);
  if (sc_rarityFilter !== 'all') {
    skins = skins.filter(s => {
      if (sc_rarityFilter === 'covert') return s.rarity === 'covert' || s.rarity === 'contraband';
      if (sc_rarityFilter === 'classified') return s.rarity === 'classified';
      if (sc_rarityFilter === 'restricted') return s.rarity === 'restricted' || s.rarity === 'blue';
      if (sc_rarityFilter === 'mil') return s.rarity === 'mil';
      return true;
    });
  }
  if (sc_skinSearch) {
    const q = sc_skinSearch.toLowerCase();
    skins = skins.filter(s => s.name.toLowerCase().includes(q));
  }
  return skins;
}

// ---- RENDER WEAPON LIST ----
function renderWeaponList() {
  const list = document.getElementById('weaponList');
  if (!list) return;
  let weapons = WEAPONS[sc_weaponCat] || WEAPONS.rifles;
  if (sc_weaponSearch) {
    const q = sc_weaponSearch.toLowerCase();
    weapons = getAllWeaponsFlat().filter(w => w.name.toLowerCase().includes(q) || w.id.toLowerCase().includes(q));
  }
  list.innerHTML = weapons.map(w => `
    <div class="sc-weapon-item ${w.id === sc_weaponId ? 'selected' : ''}"
         onclick="selectWeapon('${w.id}')">
      <span class="sc-wep-emoji">${w.emoji}</span>
      <span class="sc-wep-name">${w.name}</span>
      ${sc_equipped[w.id] ? '<span class="sc-wep-equipped-dot"></span>' : ''}
    </div>
  `).join('') || `<div style="padding:12px;color:var(--text-muted);font-size:0.8rem">Зэвсэг олдсонгүй</div>`;
}

function filterWeaponList(val) {
  sc_weaponSearch = (val || '').trim();
  renderWeaponList();
}

function filterSkinSearch(val) {
  sc_skinSearch = (val || '').trim();
  sc_skinIdx = 0;
  renderSkinsGrid();
  updatePreview();
}

function selectWeaponCat(cat) {
  sc_weaponCat = cat;
  sc_weaponSearch = '';
  const searchInp = document.getElementById('weaponSearchInput');
  if (searchInp) searchInp.value = '';

  document.querySelectorAll('.sc-wep-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-cat="${cat}"]`)?.classList.add('active');
  const first = WEAPONS[cat][0];
  selectWeapon(first.id);
}

function selectWeapon(wid) {
  sc_weaponId = wid;
  sc_skinIdx = 0;
  sc_customFloat = null;
  sc_weaponData = getAllWeaponsFlat().find(w => w.id === wid) || WEAPONS.rifles[0];
  renderWeaponList();
  renderSkinsGrid();
  updatePreview();
}

// ---- RENDER SKINS GRID ----
function renderSkinsGrid() {
  const grid = document.getElementById('skinsGrid');
  if (!grid) return;
  const skins = getFilteredSkinsForCurrentWeapon();
  const countTitle = document.getElementById('skinsCountTitle');
  if (countTitle) countTitle.textContent = `Skin-үүд (${skins.length})`;

  const equippedSkin = sc_equipped[sc_weaponId];
  grid.innerHTML = skins.map((skin, idx) => {
    const rc = getRarityKey(skin.rarity);
    const isActive = idx === sc_skinIdx;
    const isEq = equippedSkin && equippedSkin.name === skin.name;
    return `
      <div class="skin-card ${rc.class} ${isActive ? 'active-skin' : ''} ${isEq ? 'equipped-skin' : ''}"
           onclick="selectSkin(${idx})">
        <div class="skin-equip-badge">EQ</div>
        <div class="skin-card-emoji">${skin.emoji}</div>
        <div class="skin-card-name ${rc.text}">${skin.name}</div>
      </div>
    `;
  }).join('') || `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:20px;font-size:0.85rem">Энэ ангилалд skin олдсонгүй</div>`;
}

function selectSkin(idx) {
  sc_skinIdx = idx;
  sc_customFloat = null;
  renderSkinsGrid();
  updatePreview();
}

function filterRarity(r) {
  sc_rarityFilter = r;
  sc_skinIdx = 0;
  document.querySelectorAll('.rf-btn[data-rarity]').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-rarity="${r}"]`)?.classList.add('active');
  renderSkinsGrid();
  updatePreview();
}

function toggleStatTrak() {
  sc_statTrak = !sc_statTrak;
  const btn = document.getElementById('statTrakBtn');
  if (btn) {
    btn.textContent = sc_statTrak ? '🔢 StatTrak™: ON' : '🔢 StatTrak™: OFF';
    btn.style.borderColor = sc_statTrak ? '#f97316' : '';
    btn.style.color = sc_statTrak ? '#fb923c' : '';
  }
  updatePreview();
}

function onCustomFloatChange(val) {
  sc_customFloat = parseFloat(val);
  updatePreview();
}

function getWearFromFloat(f) {
  if (f < 0.07) return { color: '#4ade80', label: 'Factory New' };
  if (f < 0.15) return { color: '#a3e635', label: 'Minimal Wear' };
  if (f < 0.38) return { color: '#facc15', label: 'Field-Tested' };
  if (f < 0.45) return { color: '#fb923c', label: 'Well-Worn' };
  return { color: '#ef4444', label: 'Battle-Scarred' };
}

// ---- UPDATE PREVIEW ----
function updatePreview() {
  const filteredSkins = getFilteredSkinsForCurrentWeapon();
  const allSkins = getSkinsForWeapon(sc_weaponId);
  const skin = filteredSkins[sc_skinIdx] || allSkins[0];
  if (!skin) return;

  const wepData = sc_weaponData;
  const rc = getRarityKey(skin.rarity);

  // Update weapon SVG
  const svgKey = wepData.svgKey || 'AK-47';
  const svgStr = (WEAPON_SVGS[svgKey] || WEAPON_SVGS['AK-47'])
    .replace(/SKINCOLOR1/g, skin.color1)
    .replace(/SKINCOLOR2/g, skin.color2);

  document.getElementById('weaponSvg').innerHTML = svgStr;

  const previewBg = document.querySelector('.sc-preview-bg');
  if (previewBg) previewBg.style.background =
    `radial-gradient(ellipse at center, ${skin.color1}28 0%, transparent 70%)`;

  const stPrefix = sc_statTrak ? 'StatTrak™ ' : '';
  document.getElementById('previewName').textContent = `${stPrefix}${wepData.name}`;
  document.getElementById('previewSkin').textContent = skin.name;
  document.getElementById('previewSkin').style.color = rc.color;

  const rarityLabel = document.getElementById('previewRarity');
  rarityLabel.innerHTML = `<span class="rarity-dot" style="background:${rc.color}"></span> ${rc.label}`;
  rarityLabel.style.color = rc.color;

  // Float
  const f = sc_customFloat !== null ? sc_customFloat : skin.float;
  document.getElementById('floatVal').textContent = f.toFixed(4);
  document.getElementById('floatIndicator').style.left = `${Math.min(99, f * 100)}%`;
  const slider = document.getElementById('customFloatSlider');
  if (slider && sc_customFloat === null) slider.value = f;

  const wearInfo = getWearFromFloat(f);
  const wl = document.getElementById('wearLabel');
  wl.textContent = wearInfo.label;
  wl.style.color = wearInfo.color;

  // Equip button state
  const eq = sc_equipped[sc_weaponId];
  const equipBtn = document.getElementById('equipBtn');
  if (eq && eq.name === skin.name) {
    equipBtn.textContent = '✓ Equipped';
    equipBtn.classList.add('equipped');
  } else {
    equipBtn.textContent = '⚡ Equip';
    equipBtn.classList.remove('equipped');
  }
}

// ---- EQUIP ----
function equipSkin() {
  const filteredSkins = getFilteredSkinsForCurrentWeapon();
  const allSkins = getSkinsForWeapon(sc_weaponId);
  const skin = filteredSkins[sc_skinIdx] || allSkins[0];
  if (!skin) return;

  const finalFloat = sc_customFloat !== null ? sc_customFloat : skin.float;
  const wearInfo = getWearFromFloat(finalFloat);

  sc_equipped[sc_weaponId] = {
    ...skin,
    float: finalFloat,
    wear: wearInfo.label,
    statTrak: sc_statTrak,
    weaponName: sc_weaponData.name,
    weaponId: sc_weaponId,
    emoji: sc_weaponData.emoji
  };
  renderWeaponList();
  renderSkinsGrid();
  updatePreview();
  renderEquippedStrip();

  showToast('success', '✅', `${sc_statTrak ? 'StatTrak™ ' : ''}${sc_weaponData.name} | ${skin.name} equipped!`,
    `Float: ${finalFloat.toFixed(4)} · ${wearInfo.label}`, 3000);
}

// ---- EQUIP ALL 61 WEAPONS WITH PRO SKINS IN 1 CLICK ----
function equipFullProLoadout() {
  const allWeps = getAllWeaponsFlat();
  allWeps.forEach(w => {
    const skins = getSkinsForWeapon(w.id);
    const bestSkin = skins[0];
    if (bestSkin) {
      sc_equipped[w.id] = {
        ...bestSkin,
        weaponName: w.name,
        weaponId: w.id,
        emoji: w.emoji
      };
    }
  });
  renderWeaponList();
  renderSkinsGrid();
  updatePreview();
  renderEquippedStrip();
  showToast('gold', '⚡', `Бүх ${allWeps.length} зэвсэгт Pro Skin суулаа!`, 'Буу, Гар буу, SMG, Хүнд буу, Хутга, Бээлий бүгд тохируулагдлаа.', 4000);
}

// ---- INSPECT ----
function inspectSkin() {
  const filteredSkins = getFilteredSkinsForCurrentWeapon();
  const allSkins = getSkinsForWeapon(sc_weaponId);
  const skin = filteredSkins[sc_skinIdx] || allSkins[0];
  if (!skin) return;
  const rc = getRarityKey(skin.rarity);
  const f = sc_customFloat !== null ? sc_customFloat : skin.float;
  const wearInfo = getWearFromFloat(f);
  showToast('info', skin.emoji,
    `${sc_statTrak ? 'StatTrak™ ' : ''}${sc_weaponData.name} | ${skin.name}`,
    `${rc.label} · Float: ${f.toFixed(4)} · ${wearInfo.label}`, 4500);
}

// ---- EQUIPPED STRIP ----
function renderEquippedStrip() {
  const list = document.getElementById('equippedList');
  if (!list) return;
  const equipped = Object.values(sc_equipped);
  if (equipped.length === 0) {
    list.innerHTML = `<div style="color:var(--text-muted);font-size:0.85rem;font-family:var(--font-heading);padding:8px">Одоохондоо skin equip хийгдээгүй байна. Дээрхээс сонгох эсвэл "⚡ Бүх буунд Pro Skin зүүх" товчийг дараарай!</div>`;
    return;
  }
  list.innerHTML = equipped.map(eq => {
    const rc = getRarityKey(eq.rarity);
    return `
      <div class="eq-slot ${rc.class}" title="${eq.weaponName} | ${eq.name} (${eq.float?.toFixed(4) || '0.01'})" onclick="quickSelectEquipped('${eq.weaponId}')">
        <div class="eq-slot-emoji">${eq.emoji || '🔫'}</div>
        <div class="eq-slot-weapon">${eq.weaponName}</div>
        <div class="eq-slot-skin ${rc.text}">${eq.name}</div>
      </div>
    `;
  }).join('');
}

function quickSelectEquipped(wid) {
  for (const [cat, weapons] of Object.entries(WEAPONS)) {
    const found = weapons.find(w => w.id === wid);
    if (found) {
      sc_weaponCat = cat;
      document.querySelectorAll('.sc-wep-tab').forEach(t => t.classList.remove('active'));
      const tab = document.querySelector(`[data-cat="${cat}"]`);
      if (tab) tab.classList.add('active');
      selectWeapon(wid);
      document.getElementById('skinchanger').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  }
}

// ---- INIT SKIN CHANGER ----
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderWeaponList();
    renderSkinsGrid();
    updatePreview();
    renderEquippedStrip();
  }, 100);
});


// ===================== MZ COIN & SHOP SYSTEM =====================

let mzBalance = 2500;
let currentRank = null; // { id, name, color, badge, durationText }
let selectedDuration = 30; // 7, 30, 90, 999
let ownedItems = [];
let dailyBonusClaimed = false;
let selectedTopupIdx = 1;
let selectedPaymentMethod = 'QPay';

const DURATION_CONFIG = {
  7:   { mult: 0.35, label: '7 хоног' },
  30:  { mult: 1.0,  label: '30 хоног' },
  90:  { mult: 2.4,  label: '90 хоног (-20%)' },
  999: { mult: 5.5,  label: 'Үүрдийн (Lifetime)' }
};

const SHOP_RANKS = [
  {
    id: 'vip',
    name: 'VIP',
    emoji: '⭐',
    color: '#22c55e',
    chatTag: '[VIP]',
    tagline: 'Серверт дараалалгүй орох болон үндсэн VIP давуу эрхүүд',
    basePrice: 5000,
    popular: false,
    perks: [
      'Reserved Slot (Сервер дүүрсэн үед шууд орох)',
      'Чат дээр ногоон [VIP] таг & өнгөтэй нэр',
      'Раунд бүрд +100 HP / Kevlar + Helmet (Public)',
      'Kill хийхэд +15 HP нэмэгдэх & Grenade багц',
      '!ws !knife !gloves бүх Float тохируулах эрх',
      'MZ Coin 1.2x хурдан цуглуулах'
    ]
  },
  {
    id: 'vip_plus',
    name: 'VIP+',
    emoji: '💎',
    color: '#f0a800',
    chatTag: '[VIP+]',
    tagline: 'Хамгийн эрэлттэй багц — VIP бүх эрх дээр тусгай эффектүүд',
    basePrice: 10000,
    popular: true,
    perks: [
      'VIP эрхийн бүх давуу талууд багтсан',
      'Алтан [VIP+] чат таг + Scoreboard Clan Tag',
      'MVP болоход өөрийн дуртай дуу явах (MVP Anthem)',
      'Double Jump (Public & KZ-д тусгай эффект)',
      'Гранат шидэхэд өнгөт мөр (Neon Grenade Trail)',
      '5v5 Match дээр Map Vote 2x хүчтэй + Captain эрх'
    ]
  },
  {
    id: 'moderator',
    name: 'MODERATOR',
    emoji: '🛡️',
    color: '#a855f7',
    chatTag: '[MOD]',
    tagline: 'Серверийн дэг журам сахиулах & тоглогч удирдах эрх',
    basePrice: 25000,
    popular: false,
    perks: [
      'VIP+ багцын бүх давуу талууд багтсан',
      'Ягаан [MOD] таг + Discord Moderator роль',
      '!mute, !gag, !silence (Чат/Мик хаах команд)',
      '!kick болон !slay (Дүрэм зөрчигчийг гаргах)',
      '!vote map / !spec (Тоглогчдыг хянах камер)',
      'Cheater сэжиглэгдвэл шууд तүр бан хийх (Temp-Ban)'
    ]
  },
  {
    id: 'admin',
    name: 'SERVER ADMIN',
    emoji: '👑',
    color: '#ef4444',
    chatTag: '[ADMIN]',
    tagline: 'Серверийн бүрэн удирдлага, бан команд болон дээд зэрэглэл',
    basePrice: 50000,
    popular: false,
    perks: [
      'VIP+ болон Moderator-ийн бүх эрх багтсан',
      'Улаан [ADMIN] онцгой таг + Killfeed эффект',
      '!ban / !unban / !addban бүрэн админ цэс (!admin)',
      'Map солих, Warmup/Pause удирдах, RCON хязгаарлагдмал эрх',
      'Бүх 40x 5v5 болон Public серверт дараалалгүй + Спек эрх',
      'Сар бүр +5,000 MZ Coin урамшуулал & Тусгай Admin Skin'
    ]
  },
  {
    id: 'overlord',
    name: 'OVERLORD',
    emoji: '⚡',
    color: '#ff2a85',
    chatTag: '[★OVERLORD★]',
    tagline: 'Дээд зэрэглэлийн Том Админ — Бүх серверийн ерөнхий удирдлага & RCON',
    basePrice: 100000,
    popular: false,
    isOverlord: true,
    perks: [
      'Server Admin, Moderator, VIP+ бүх эрх 100% багтсан',
      'Солонгон [★OVERLORD★] цол + Алтан/Ягаан Аура мөр',
      'Бүрэн RCON эрх, сервер тохиргоо & Модератор томилох',
      '5v5 Тэмцээн удирдах, Бүх бан цуцлах & Тусгай команд',
      'Серверт ороход бүх тоглогчийн дэлгэц дээр Overlord мэндчилгээ гарна',
      'Сар бүр +15,000 MZ Coin + ★ Golden Knife Кейс 3ш үнэгүй'
    ]
  }
];

const SHOP_PERKS = [
  {
    id: 'custom_tag',
    name: 'Custom Chat & Score Tag',
    sub: 'Тоглогчийн тусгай цол',
    emoji: '🏷️',
    desc: 'Чат болон TAB scoreboard дээр өөрийн хүссэн үг, өнгөөр таг тавих эрх (Жнь: [GOD], [MONGOLZ]).',
    price: 3500
  },
  {
    id: 'reserved_slot',
    name: 'VIP Reserved Slot (30 хоног)',
    sub: 'Дараалалгүй нэвтрэх',
    emoji: '🚀',
    desc: 'Public, DM болон 5v5 сервер дүүрсэн үед хүлээлгүйгээр шууд нэвтэрч орох эрх.',
    price: 2500
  },
  {
    id: 'mvp_kit',
    name: 'Custom MVP Music Kit',
    sub: 'Дуут эффект',
    emoji: '🎵',
    desc: 'Раундын MVP болох үед сервер даяар таны сонгосон Монгол эсвэл гадаад дуу эгшиглэнэ.',
    price: 4000
  },
  {
    id: 'elo_reset',
    name: 'ELO & K/D Stats Reset',
    sub: 'Статистик шинэчлэх',
    emoji: '🔄',
    desc: '5v5 болон Public серверийн K/D, Winrate, ELO оноогоо 1000-аас шинээр цэвэрлэж эхлэх.',
    price: 3000
  },
  {
    id: 'unban_pass',
    name: 'Unban / Cooldown Арилгах',
    sub: 'Торгууль цуцлах',
    emoji: '🔓',
    desc: '5v5 Match-аас гарсан Cooldown эсвэл энгийн анхааруулах баныг шууд цуцлах эрх (Cheat банд хамаарахгүй).',
    price: 8000
  },
  {
    id: 'aura_trail',
    name: 'Golden Aura & Trail',
    sub: 'Харагдах эффект',
    emoji: '✨',
    desc: 'KZ/Bhop болон Public серверт гүйх, үсрэх үед алтан гэрэлт мөр үлдээх онцгой эффект.',
    price: 4500
  }
];

const COIN_PACKAGES = [
  { coins: 5000,   bonus: 0,     mnt: 5000,   tag: 'Эхлэл' },
  { coins: 10000,  bonus: 1000,  mnt: 10000,  tag: '+10% BONUS' },
  { coins: 25000,  bonus: 4000,  mnt: 25000,  tag: '+16% BONUS' },
  { coins: 50000,  bonus: 10000, mnt: 50000,  tag: '🔥 ХИТ (+20%)' },
  { coins: 100000, bonus: 25000, mnt: 100000, tag: '👑 PRO (+25%)' },
  { coins: 200000, bonus: 60000, mnt: 200000, tag: '💎 ELITE (+30%)' }
];

function formatNum(n) {
  return n.toLocaleString('en-US');
}

function updateMzWalletUI() {
  const navBal = document.getElementById('mzBalance');
  const shopBal = document.getElementById('shopMzBalance');
  if (navBal) navBal.textContent = formatNum(mzBalance);
  if (shopBal) shopBal.textContent = formatNum(mzBalance);

  const rankPill = document.getElementById('userRankPill');
  const rankText = document.getElementById('userRankText');
  const shopRank = document.getElementById('shopCurrentRank');

  if (currentRank) {
    if (rankText) rankText.textContent = currentRank.name;
    if (rankPill) {
      rankPill.style.borderColor = currentRank.color;
      rankPill.style.color = currentRank.color;
      rankPill.querySelector('.rank-dot').style.background = currentRank.color;
    }
    if (shopRank) {
      shopRank.innerHTML = `<span style="color:${currentRank.color}">${currentRank.emoji} ${currentRank.name}</span> <small style="color:var(--text-muted);font-size:0.8rem">(${currentRank.durationText})</small>`;
    }
  }
}

function renderRanksShop() {
  const grid = document.getElementById('ranksGrid');
  if (!grid) return;
  const dur = DURATION_CONFIG[selectedDuration];

  grid.innerHTML = SHOP_RANKS.map(r => {
    const finalPrice = Math.round((r.basePrice * dur.mult) / 100) * 100;
    const isOwned = currentRank && currentRank.id === r.id;
    return `
      <div class="rank-card ${r.isOverlord ? 'rank-overlord' : ''}" style="--rc-color:${r.color}">
        ${r.popular ? `<div class="rank-popular-ribbon">★ ХАМГИЙН ЭРЭЛТТЭЙ</div>` : ''}
        ${r.isOverlord ? `<div class="rank-popular-ribbon" style="background:rgba(255,42,133,0.22);color:#ff7ab8;border-color:#ff2a85">⚡ ТОМ АДМИН</div>` : ''}
        <div class="rank-icon-wrap" style="border-color:${r.color}44;background:${r.color}15">${r.emoji}</div>
        <div class="rank-chat-preview">
          <span style="color:${r.color};font-weight:800">${r.chatTag}</span>
          <span style="color:#fff">bLitz:</span>
          <span style="color:var(--text-secondary)">gg wp!</span>
        </div>
        <div class="rank-name" style="color:${r.color}">${r.name}</div>
        <div class="rank-tagline">${r.tagline}</div>

        <div class="rank-price-box">
          <div class="rank-price-val">${formatNum(finalPrice)} <small>MZ</small></div>
          <div class="rank-price-duration">/ ${dur.label}</div>
        </div>

        <ul class="rank-perks-list">
          ${r.perks.map(p => `<li><span class="perk-check">✓</span><span>${p}</span></li>`).join('')}
        </ul>

        <button class="rank-buy-btn ${isOwned ? 'owned' : ''}" onclick="buyRank('${r.id}')">
          ${isOwned ? '✓ Идэвхжсэн байна (Сунгах)' : `⚡ ${r.name} Авах`}
        </button>
      </div>
    `;
  }).join('');
}

function renderPerksShop() {
  const grid = document.getElementById('perksGrid');
  if (!grid) return;
  grid.innerHTML = SHOP_PERKS.map(p => {
    const owned = ownedItems.some(i => i.id === p.id);
    return `
      <div class="perk-card">
        <div class="perk-top">
          <div class="perk-emoji">${p.emoji}</div>
          <div>
            <div class="perk-title">${p.name}</div>
            <div class="perk-sub">${p.sub}</div>
          </div>
        </div>
        <div class="perk-desc">${p.desc}</div>
        <div class="perk-footer">
          <div class="perk-cost">${formatNum(p.price)} MZ</div>
          <button class="perk-buy-btn" onclick="buyPerk('${p.id}')">
            ${owned ? '✓ Авсан (Дахин авах)' : '🛒 Авах'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderCoinsShop() {
  const grid = document.getElementById('coinsGrid');
  if (!grid) return;
  grid.innerHTML = COIN_PACKAGES.map((pack, idx) => {
    const total = pack.coins + pack.bonus;
    return `
      <div class="coin-pack-card">
        ${pack.bonus > 0 ? `<div class="coin-pack-bonus">${pack.tag}</div>` : ''}
        <div class="mz-coin-icon lg" style="margin-bottom:6px">MZ</div>
        <div class="coin-pack-amount">${formatNum(total)} MZ</div>
        <div class="coin-pack-mnt">${formatNum(pack.mnt)}₮ ${pack.bonus > 0 ? `<span style="color:#4ade80;font-size:0.8rem">(+${formatNum(pack.bonus)} бонус)</span>` : ''}</div>
        <button class="btn-topup-main" style="width:100%" onclick="openTopupModal(${idx})">
          ⚡ Цэнэглэх
        </button>
      </div>
    `;
  }).join('');
}

function renderOwnedStrip() {
  const list = document.getElementById('ownedItemsList');
  if (!list) return;
  if (ownedItems.length === 0) {
    list.innerHTML = `<div style="color:var(--text-muted);font-size:0.85rem;font-family:var(--font-heading)">Та одоогоор дэлгүүрээс эрх эсвэл нэмэлт зүйл аваагүй байна.</div>`;
    return;
  }
  list.innerHTML = ownedItems.map(item => `
    <div class="owned-pill" style="border-color:${item.color || 'var(--gold)'}55">
      <span>${item.emoji}</span>
      <span style="color:${item.color || '#fff'}">${item.name}</span>
      <span style="font-size:0.75rem;color:var(--text-muted)">${item.meta || 'Идэвхтэй'}</span>
    </div>
  `).join('');
}

function switchShopTab(tab) {
  document.querySelectorAll('.shop-tab').forEach(b => b.classList.remove('active'));
  const activeTab = document.querySelector(`[data-shoptab="${tab}"]`);
  if (activeTab) activeTab.classList.add('active');

  document.querySelectorAll('.shop-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`shopPanel-${tab}`);
  if (panel) panel.classList.add('active');

  const dp = document.getElementById('durationPicker');
  if (dp) dp.style.display = tab === 'ranks' ? 'flex' : 'none';
}

function selectDuration(days) {
  selectedDuration = days;
  document.querySelectorAll('.dp-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-days="${days}"]`);
  if (btn) btn.classList.add('active');
  renderRanksShop();
}

function buyRank(rankId) {
  const r = SHOP_RANKS.find(x => x.id === rankId);
  if (!r) return;
  const dur = DURATION_CONFIG[selectedDuration];
  const cost = Math.round((r.basePrice * dur.mult) / 100) * 100;

  if (mzBalance < cost) {
    showToast('info', '🪙', 'MZ Coin хүрэлцэхгүй байна!',
      `${r.name} авахад ${formatNum(cost)} MZ шаардлагатай. Дансаа цэнэглэнэ үү.`, 4000);
    openTopupModal();
    return;
  }

  mzBalance -= cost;
  currentRank = {
    id: r.id,
    name: r.name,
    emoji: r.emoji,
    color: r.color,
    durationText: dur.label
  };

  ownedItems.unshift({
    id: r.id,
    name: `${r.name} Эрх`,
    emoji: r.emoji,
    color: r.color,
    meta: dur.label
  });

  updateMzWalletUI();
  renderRanksShop();
  renderOwnedStrip();

  showToast('gold', r.emoji, `Баяр хүргэе! ${r.name} эрх идэвхжлээ!`,
    `Хугацаа: ${dur.label} · Бүх серверт таны ${r.chatTag} цол орлоо.`, 4500);
}

function buyPerk(perkId) {
  const p = SHOP_PERKS.find(x => x.id === perkId);
  if (!p) return;

  if (mzBalance < p.price) {
    showToast('info', '🪙', 'MZ Coin хүрэлцэхгүй байна!',
      `${p.name} авахад ${formatNum(p.price)} MZ шаардлагатай.`, 4000);
    openTopupModal();
    return;
  }

  mzBalance -= p.price;
  ownedItems.unshift({
    id: p.id,
    name: p.name,
    emoji: p.emoji,
    color: '#f0a800',
    meta: 'Идэвхтэй'
  });

  updateMzWalletUI();
  renderPerksShop();
  renderOwnedStrip();

  showToast('success', p.emoji, `${p.name} амжилттай авлаа!`,
    `Серверт ороход автоматаар идэвхжинэ.`, 3500);
}

function claimDailyBonus() {
  if (dailyBonusClaimed) return;
  dailyBonusClaimed = true;
  mzBalance += 500;
  updateMzWalletUI();

  const btn = document.getElementById('dailyBonusBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '✓ Өнөөдрийн бонус авсан (+500 MZ)';
  }

  showToast('gold', '🎁', '+500 MZ Coin нэмэгдлээ!',
    'Өдрийн урамшуулал таны дансанд орлоо.', 3500);
}

// ---- TOPUP MODAL ----
function renderModalTopupPackages() {
  const wrap = document.getElementById('modalTopupPackages');
  if (!wrap) return;
  wrap.innerHTML = COIN_PACKAGES.map((p, idx) => {
    const total = p.coins + p.bonus;
    return `
      <div class="tp-item ${idx === selectedTopupIdx ? 'active' : ''}" onclick="selectTopupPackage(${idx})">
        <div class="tp-coins">+${formatNum(total)} MZ</div>
        <div class="tp-mnt">${formatNum(p.mnt)}₮</div>
      </div>
    `;
  }).join('');

  const cur = COIN_PACKAGES[selectedTopupIdx];
  const priceEl = document.getElementById('topupPriceMNT');
  const coinsEl = document.getElementById('topupCoinsReceive');
  if (priceEl) priceEl.textContent = `${formatNum(cur.mnt)}₮`;
  if (coinsEl) coinsEl.textContent = `+${formatNum(cur.coins + cur.bonus)} MZ`;
}

function selectTopupPackage(idx) {
  selectedTopupIdx = idx;
  renderModalTopupPackages();
}

function selectPaymentMethod(btn, method) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.pm-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function openTopupModal(packIdx) {
  if (typeof packIdx === 'number') selectedTopupIdx = packIdx;
  renderModalTopupPackages();
  const modal = document.getElementById('topupModal');
  if (modal) modal.classList.add('open');
}

function closeTopupModal() {
  const modal = document.getElementById('topupModal');
  if (modal) modal.classList.remove('open');
}

function confirmTopup() {
  const pack = COIN_PACKAGES[selectedTopupIdx];
  const total = pack.coins + pack.bonus;
  mzBalance += total;
  updateMzWalletUI();
  closeTopupModal();

  showToast('gold', '⚡', `+${formatNum(total)} MZ Coin цэнэглэгдлээ!`,
    `Төлбөрийн хэлбэр: ${selectedPaymentMethod} · Таны үлдэгдэл: ${formatNum(mzBalance)} MZ`, 4500);
}

// Init Shop on load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    updateMzWalletUI();
    renderRanksShop();
    renderPerksShop();
    renderCoinsShop();
    renderOwnedStrip();
  }, 120);
});

// ===================== 3D CS2 CHICKEN HUNT & CROSSHAIR ENGINE =====================

const CHICKEN_TYPES = [
  {
    type: 'white',
    name: 'White Chicken',
    bodyColor: '#f8fafc',
    wingColor: '#e2e8f0',
    combColor: '#ef4444',
    beakColor: '#f59e0b',
    hp: 1,
    speed: 1.0,
    reward: 5,
    weight: 38
  },
  {
    type: 'brown',
    name: 'Inferno Chicken',
    bodyColor: '#b45309',
    wingColor: '#92400e',
    combColor: '#dc2626',
    beakColor: '#fbbf24',
    hp: 1,
    speed: 1.15,
    reward: 10,
    weight: 24
  },
  {
    type: 'party',
    name: 'Party Hat Chicken',
    bodyColor: '#ffffff',
    wingColor: '#cbd5e1',
    combColor: '#ec4899',
    beakColor: '#f59e0b',
    hat: 'party',
    hp: 1,
    speed: 1.2,
    reward: 15,
    weight: 16
  },
  {
    type: 'sweater',
    name: 'Sweater Chicken',
    bodyColor: '#f1f5f9',
    wingColor: '#cbd5e1',
    combColor: '#ef4444',
    beakColor: '#f59e0b',
    sweater: true,
    hp: 1,
    speed: 1.05,
    reward: 20,
    weight: 10
  },
  {
    type: 'helmet',
    name: 'Armored Chicken',
    bodyColor: '#e2e8f0',
    wingColor: '#94a3b8',
    combColor: '#ef4444',
    beakColor: '#f59e0b',
    helmet: true,
    hp: 2,
    speed: 0.95,
    reward: 30,
    weight: 7
  },
  {
    type: 'golden',
    name: 'Golden MongolZ Chicken',
    bodyColor: '#ffd700',
    wingColor: '#f0a800',
    combColor: '#ff2a85',
    beakColor: '#ffffff',
    golden: true,
    hp: 1,
    speed: 1.85,
    reward: 50,
    weight: 6
  },
  {
    type: 'weekly_drop_kilowatt',
    name: '⚡ Weekly Drop: Kilowatt Chicken',
    bodyColor: '#06b6d4',
    wingColor: '#0284c7',
    combColor: '#fde047',
    beakColor: '#f59e0b',
    hat: 'party',
    golden: true,
    hp: 1,
    speed: 1.55,
    reward: 75,
    weight: 7
  },
  {
    type: 'weekly_drop_gallery',
    name: '🎁 Weekly Drop: Gallery Case Chicken',
    bodyColor: '#ec4899',
    wingColor: '#a855f7',
    combColor: '#ffd700',
    beakColor: '#ffffff',
    sweater: true,
    golden: true,
    hp: 1,
    speed: 1.65,
    reward: 100,
    weight: 5
  },
  {
    type: 'weekly_drop_zombie',
    name: '🧟 Weekly Drop: Zombie Chicken',
    bodyColor: '#4ade80',
    wingColor: '#16a34a',
    combColor: '#ef4444',
    beakColor: '#fbbf24',
    helmet: true,
    hp: 2,
    speed: 1.25,
    reward: 65,
    weight: 6
  }
];

let cs2CrosshairEnabled = true;
let cs2SfxEnabled = true;
let chickenKills = 0;
let chickenStreak = 0;
let chickenCoinsEarned = 0;
let lastKillTime = 0;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetParallaxX = 0;
let targetParallaxY = 0;
let currentParallaxX = 0;
let currentParallaxY = 0;

const cs2Chickens = [];
const cs2Feathers = [];
const cs2FloatingTexts = [];
const cs2BulletHoles = [];
const cs2Snowflakes = [];
const cs2Clouds = [];

// Web Audio Synthesizer for Realistic CS2 AK-47 Gunshot, Headshot Dink & Chicken Squawk
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function makeDistortionCurve(amount = 45) {
  const k = amount;
  const n = 44100;
  const curve = new Float32Array(n);
  const deg = Math.PI / 180;
  for (let i = 0; i < n; ++i) {
    const x = (i * 2) / n - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

function playGunshotSound(isHit, isDink) {
  if (!cs2SfxEnabled) return;
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. AK-47 Heavy 7.62mm Muzzle Thump (Low-end punch)
    const punchOsc = ctx.createOscillator();
    const punchGain = ctx.createGain();
    punchOsc.type = 'triangle';
    punchOsc.frequency.setValueAtTime(165, now);
    punchOsc.frequency.exponentialRampToValueAtTime(36, now + 0.085);
    punchGain.gain.setValueAtTime(0.55, now);
    punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
    punchOsc.connect(punchGain);
    punchGain.connect(ctx.destination);
    punchOsc.start(now);
    punchOsc.stop(now + 0.1);

    // 2. AK-47 Supersonic Crack & Powder Blast (Distorted wideband noise + outdoor tail)
    const duration = 0.36;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      // Sharp initial crack + long snowy valley echo decay
      const env = t < 0.035
        ? Math.exp(-t / 0.012) * 1.2
        : 0.32 * Math.exp(-(t - 0.035) / 0.095);
      data[i] = (Math.random() * 2 - 1) * env;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'peaking';
    bandpass.frequency.setValueAtTime(1450, now);
    bandpass.Q.setValueAtTime(0.9, now);
    bandpass.gain.setValueAtTime(10, now);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(4800, now);
    lowpass.frequency.exponentialRampToValueAtTime(650, now + 0.34);

    const shaper = ctx.createWaveShaper();
    shaper.curve = makeDistortionCurve(60);

    const blastGain = ctx.createGain();
    blastGain.gain.setValueAtTime(0.38, now);
    blastGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(bandpass);
    bandpass.connect(shaper);
    shaper.connect(lowpass);
    lowpass.connect(blastGain);
    blastGain.connect(ctx.destination);
    noise.start(now);

    // 3. AK-47 Metallic Bolt Carrier Clack (signature Kalashnikov action ring)
    const boltOsc = ctx.createOscillator();
    const boltGain = ctx.createGain();
    boltOsc.type = 'square';
    boltOsc.frequency.setValueAtTime(920, now + 0.028);
    boltOsc.frequency.exponentialRampToValueAtTime(510, now + 0.068);
    boltGain.gain.setValueAtTime(0.08, now + 0.028);
    boltGain.gain.exponentialRampToValueAtTime(0.001, now + 0.072);
    boltOsc.connect(boltGain);
    boltGain.connect(ctx.destination);
    boltOsc.start(now + 0.028);
    boltOsc.stop(now + 0.075);

    // 4. Chicken squawk + hitmarker tick on hit
    if (isHit) {
      const osc = ctx.createOscillator();
      const hitGain = ctx.createGain();
      osc.type = isDink ? 'triangle' : 'sawtooth';
      if (isDink) {
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.09);
      } else {
        osc.frequency.setValueAtTime(580, now + 0.02);
        osc.frequency.linearRampToValueAtTime(920, now + 0.07);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.18);
      }
      hitGain.gain.setValueAtTime(0.15, now);
      hitGain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
      osc.connect(hitGain);
      hitGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.19);
    }
  } catch (e) {}
}

function pickChickenType() {
  const totalWeight = CHICKEN_TYPES.reduce((s, t) => s + t.weight, 0);
  let r = Math.random() * totalWeight;
  for (const t of CHICKEN_TYPES) {
    if (r < t.weight) return t;
    r -= t.weight;
  }
  return CHICKEN_TYPES[0];
}

function createChicken(spawnAnywhere = false) {
  const tpl = pickChickenType();
  // z depth from 0.48 (far in 3D snowfield) to 1.15 (close foreground snow)
  const z = 0.48 + Math.random() * 0.67;
  const dir = Math.random() < 0.5 ? 1 : -1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  const x = spawnAnywhere
    ? Math.random() * (w - 120) + 60
    : (dir === 1 ? -60 : w + 60);

  // Place chickens mostly across the lower snowy field & mid-ground
  const y = h * (0.35 + Math.random() * 0.57);

  return {
    ...tpl,
    maxHp: tpl.hp,
    x,
    y,
    z,
    dir,
    vx: dir * tpl.speed * (0.7 + z * 0.75),
    vy: 0,
    jumpY: 0,
    jumpVy: 0,
    phase: Math.random() * Math.PI * 2,
    peckTimer: 0,
    scaredTimer: 0,
    hasHelmet: !!tpl.helmet,
    radius: 24 * z
  };
}

function spawnChickenWave() {
  for (let i = 0; i < 5; i++) {
    if (cs2Chickens.length < 28) {
      cs2Chickens.push(createChicken(true));
    }
  }
  showToast('gold', '🐔', 'Шинэ тахианы сүрэг гарч ирлээ!', 'AK-47-оороо онилоод буудаарай!', 2500);
}

function spawnFeathers(x, y, z, color, isGolden) {
  const count = isGolden ? 26 : 16;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = (1.5 + Math.random() * 5.5) * z;
    cs2Feathers.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - 2.2,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      size: (5 + Math.random() * 6) * z,
      color: isGolden && Math.random() < 0.5 ? '#ffd700' : color,
      alpha: 1,
      life: 0,
      maxLife: 45 + Math.random() * 30
    });
  }
}

function pushKillfeed(chickenName, reward, isGolden) {
  const feed = document.getElementById('cs2Killfeed');
  if (!feed) return;
  const killerName = (window.steamUser && window.steamUser.name) ? window.steamUser.name : 'YOU';
  const item = document.createElement('div');
  item.className = 'kf-item';
  item.innerHTML = `
    <span class="kf-killer">${killerName}</span>
    <span class="kf-weapon">🔫 [AK-47]</span>
    <span class="kf-hs">💥</span>
    <span class="kf-victim">${isGolden ? '👑 ' : '🐔 '}${chickenName}</span>
  `;
  feed.prepend(item);
  if (isGolden && typeof pushLiveDrop === 'function') {
    pushLiveDrop(`👑 <strong>${killerName}</strong> [AK-47]-аар <strong>Golden MongolZ Chicken</strong> унагалаа! 🎯`);
  }
  while (feed.children.length > 4) {
    feed.lastElementChild.remove();
  }
  setTimeout(() => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.3s ease';
    setTimeout(() => item.remove(), 300);
  }, 3200);
}

function drawChicken(ctx, c) {
  const parX = currentParallaxX * c.z * 32;
  const parY = currentParallaxY * c.z * 22;
  const cx = c.x + parX;
  const cy = c.y + parY + c.jumpY;
  const s = c.z;

  ctx.save();
  ctx.translate(cx, cy);

  // Ground shadow
  ctx.save();
  ctx.translate(0, -c.jumpY + 18 * s);
  ctx.scale(1, 0.32);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
  ctx.beginPath();
  ctx.arc(0, 0, 18 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Golden aura if golden chicken
  if (c.golden) {
    const grad = ctx.createRadialGradient(0, 0, 2 * s, 0, 0, 32 * s);
    grad.addColorStop(0, 'rgba(255, 215, 0, 0.45)');
    grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 32 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  // Flip according to walking direction
  ctx.scale(c.dir, 1);

  const bob = Math.sin(c.phase) * 2.5 * s;
  const legSwing = Math.sin(c.phase) * 6 * s;

  // Legs
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.2 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-4 * s, 10 * s);
  ctx.lineTo((-4 + legSwing * 0.5) * s, 19 * s);
  ctx.moveTo(4 * s, 10 * s);
  ctx.lineTo((4 - legSwing * 0.5) * s, 19 * s);
  ctx.stroke();

  // Tail feathers
  ctx.fillStyle = c.wingColor;
  ctx.beginPath();
  ctx.ellipse(-16 * s, (-2 + bob) * s, 8 * s, 5 * s, -0.4, 0, Math.PI * 2);
  ctx.fill();

  // Plump Body (3D shaded gradient)
  ctx.fillStyle = c.bodyColor;
  ctx.beginPath();
  ctx.ellipse(0, bob, 16 * s, 13 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 1.2 * s;
  ctx.strokeStyle = 'rgba(0,0,0,0.45)';
  ctx.stroke();

  // Holiday Sweater if sweater variant
  if (c.sweater) {
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(0, bob + 1 * s, 14.5 * s, 10 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.moveTo(-12 * s, bob);
    ctx.lineTo(12 * s, bob);
    ctx.stroke();
  }

  // Wing flap
  const wingFlap = Math.abs(Math.sin(c.phase * 1.3)) * 0.35;
  ctx.fillStyle = c.wingColor;
  ctx.beginPath();
  ctx.ellipse(-2 * s, (1 + bob) * s, 9 * s, 6 * s, -wingFlap, 0, Math.PI * 2);
  ctx.fill();

  // Head & Neck
  const headX = 12 * s;
  const headY = (-10 + bob * 0.8) * s;
  ctx.fillStyle = c.bodyColor;
  ctx.beginPath();
  ctx.arc(headX, headY, 8.5 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
  ctx.lineWidth = 1 * s;
  ctx.stroke();

  // Red Comb (on top of head) unless covered by helmet
  if (!c.hasHelmet) {
    ctx.fillStyle = c.combColor;
    ctx.beginPath();
    ctx.arc(headX - 2 * s, headY - 9 * s, 3.2 * s, 0, Math.PI * 2);
    ctx.arc(headX + 2 * s, headY - 8.5 * s, 2.8 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  // Party Hat
  if (c.hat === 'party') {
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.moveTo(headX - 5 * s, headY - 6 * s);
    ctx.lineTo(headX + 5 * s, headY - 6 * s);
    ctx.lineTo(headX, headY - 21 * s);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(headX, headY - 21 * s, 2.6 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  // Tactical Helmet
  if (c.hasHelmet) {
    ctx.fillStyle = '#365314';
    ctx.beginPath();
    ctx.arc(headX, headY - 2 * s, 9.5 * s, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#1a2e05';
    ctx.lineWidth = 1.5 * s;
    ctx.stroke();
  }

  // Beak
  ctx.fillStyle = c.beakColor;
  ctx.beginPath();
  ctx.moveTo(headX + 7 * s, headY - 2 * s);
  ctx.lineTo(headX + 14 * s, headY + 1 * s);
  ctx.lineTo(headX + 7 * s, headY + 4 * s);
  ctx.closePath();
  ctx.fill();

  // Wattle under beak
  ctx.fillStyle = c.combColor;
  ctx.beginPath();
  ctx.arc(headX + 6 * s, headY + 6 * s, 2.6 * s, 0, Math.PI * 2);
  ctx.fill();

  // Eye
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.arc(headX + 3 * s, headY - 1.5 * s, 1.7 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function initWinterScene() {
  cs2Clouds.length = 0;
  cs2Snowflakes.length = 0;
  const w = window.innerWidth;
  const h = window.innerHeight;

  // Create 9 volumetric winter clouds at the top of the sky
  for (let i = 0; i < 9; i++) {
    const z = 0.4 + Math.random() * 0.7;
    cs2Clouds.push({
      x: (w / 9) * i + (Math.random() * 120 - 60),
      y: 28 + Math.random() * (h * 0.18),
      z,
      speed: (0.12 + Math.random() * 0.22) * z,
      scale: (0.75 + Math.random() * 0.65) * z,
      alpha: 0.16 + Math.random() * 0.16
    });
  }

  // Create 185 3D falling snowflakes across depth layers
  for (let i = 0; i < 185; i++) {
    const z = 0.35 + Math.random() * 0.95;
    cs2Snowflakes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      z,
      r: (1.2 + Math.random() * 2.8) * z,
      vy: (0.65 + Math.random() * 1.45) * z,
      vx: (Math.random() - 0.35) * 0.6 * z,
      swayAmp: 0.4 + Math.random() * 1.1,
      swaySpeed: 0.01 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
      alpha: Math.min(0.95, 0.35 + z * 0.5)
    });
  }
}

function drawWinterClouds(ctx, w, h) {
  for (const cl of cs2Clouds) {
    cl.x += cl.speed;
    if (cl.x - 220 * cl.scale > w) {
      cl.x = -220 * cl.scale;
    }

    const px = cl.x + currentParallaxX * cl.z * 26;
    const py = cl.y + currentParallaxY * cl.z * 14;
    const s = cl.scale;

    ctx.save();
    ctx.translate(px, py);

    // Soft volumetric winter cloud puffs
    const puffs = [
      { dx: -75 * s, dy: 10 * s, rx: 65 * s, ry: 32 * s },
      { dx: -25 * s, dy: -6 * s, rx: 78 * s, ry: 42 * s },
      { dx: 35 * s,  dy: 0 * s,  rx: 72 * s, ry: 38 * s },
      { dx: 85 * s,  dy: 12 * s, rx: 58 * s, ry: 28 * s }
    ];

    for (const p of puffs) {
      const grad = ctx.createRadialGradient(p.dx, p.dy - p.ry * 0.3, p.ry * 0.1, p.dx, p.dy, p.rx);
      grad.addColorStop(0, `rgba(226, 240, 255, ${cl.alpha * 1.25})`);
      grad.addColorStop(0.55, `rgba(148, 179, 218, ${cl.alpha * 0.85})`);
      grad.addColorStop(1, 'rgba(30, 41, 59, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(p.dx, p.dy, p.rx, p.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function drawSnowGround(ctx, w, h) {
  const parXFar = currentParallaxX * 16;
  const parYFar = currentParallaxY * 10;
  const parXMid = currentParallaxX * 28;
  const parYMid = currentParallaxY * 16;
  const parXNear = currentParallaxX * 42;
  const parYNear = currentParallaxY * 22;

  ctx.save();

  // 1. Far distant snowy hills
  const farGrad = ctx.createLinearGradient(0, h - 185, 0, h);
  farGrad.addColorStop(0, 'rgba(148, 178, 214, 0.28)');
  farGrad.addColorStop(1, 'rgba(71, 98, 136, 0.45)');
  ctx.fillStyle = farGrad;
  ctx.beginPath();
  ctx.moveTo(-100, h);
  ctx.quadraticCurveTo(w * 0.22 + parXFar, h - 165 + parYFar, w * 0.52 + parXFar, h - 115 + parYFar);
  ctx.quadraticCurveTo(w * 0.82 + parXFar, h - 70 + parYFar, w + 100, h - 140 + parYFar);
  ctx.lineTo(w + 100, h);
  ctx.closePath();
  ctx.fill();

  // 2. Mid-ground snowdrifts
  const midGrad = ctx.createLinearGradient(0, h - 135, 0, h);
  midGrad.addColorStop(0, 'rgba(203, 224, 248, 0.42)');
  midGrad.addColorStop(1, 'rgba(116, 149, 190, 0.58)');
  ctx.fillStyle = midGrad;
  ctx.beginPath();
  ctx.moveTo(-100, h);
  ctx.quadraticCurveTo(w * 0.18 + parXMid, h - 85 + parYMid, w * 0.45 + parXMid, h - 120 + parYMid);
  ctx.quadraticCurveTo(w * 0.76 + parXMid, h - 145 + parYMid, w + 100, h - 80 + parYMid);
  ctx.lineTo(w + 100, h);
  ctx.closePath();
  ctx.fill();

  // 3. Foreground bright snow blanket at the bottom
  const nearGrad = ctx.createLinearGradient(0, h - 88, 0, h);
  nearGrad.addColorStop(0, 'rgba(241, 248, 255, 0.68)');
  nearGrad.addColorStop(0.5, 'rgba(219, 234, 254, 0.78)');
  nearGrad.addColorStop(1, 'rgba(186, 212, 245, 0.90)');
  ctx.fillStyle = nearGrad;
  ctx.beginPath();
  ctx.moveTo(-100, h);
  ctx.quadraticCurveTo(w * 0.28 + parXNear, h - 92 + parYNear, w * 0.62 + parXNear, h - 56 + parYNear);
  ctx.quadraticCurveTo(w * 0.88 + parXNear, h - 34 + parYNear, w + 100, h - 74 + parYNear);
  ctx.lineTo(w + 100, h);
  ctx.closePath();
  ctx.fill();

  // Soft icy ridge shine on foreground snow
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-100, h - 55 + parYNear);
  ctx.quadraticCurveTo(w * 0.28 + parXNear, h - 92 + parYNear, w * 0.62 + parXNear, h - 56 + parYNear);
  ctx.quadraticCurveTo(w * 0.88 + parXNear, h - 34 + parYNear, w + 100, h - 74 + parYNear);
  ctx.stroke();

  ctx.restore();
}

function updateAndDrawSnowflakes(ctx, w, h) {
  for (const sf of cs2Snowflakes) {
    sf.phase += sf.swaySpeed;
    sf.x += sf.vx + Math.sin(sf.phase) * sf.swayAmp * 0.45;
    sf.y += sf.vy;

    if (sf.y > h + 15) {
      sf.y = -12;
      sf.x = Math.random() * w;
    }
    if (sf.x > w + 20) sf.x = -15;
    if (sf.x < -20) sf.x = w + 15;

    const sx = sf.x + currentParallaxX * sf.z * 34;
    const sy = sf.y + currentParallaxY * sf.z * 20;

    ctx.save();
    ctx.globalAlpha = sf.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(224, 242, 254, 0.85)';
    ctx.shadowBlur = sf.r * 2;
    ctx.beginPath();
    ctx.arc(sx, sy, sf.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function initCs2ChickenEngine() {
  const canvas = document.getElementById('cs2ChickenCanvas');
  const crosshair = document.getElementById('cs2Crosshair');
  const hitmarker = document.getElementById('chHitmarker');
  const world = document.getElementById('cs2World');
  if (!canvas || !crosshair) return;

  const ctx = canvas.getContext('2d');
  document.body.classList.add('cs2-crosshair-active');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  initWinterScene();
  window.addEventListener('resize', () => {
    resizeCanvas();
    initWinterScene();
  });

  // Initial flock of chickens in 3D space
  for (let i = 0; i < 14; i++) {
    cs2Chickens.push(createChicken(true));
  }

  // Mouse move: update CS2 crosshair + 3D camera tilt
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cs2CrosshairEnabled) {
      crosshair.style.left = `${mouseX}px`;
      crosshair.style.top = `${mouseY}px`;
    }

    // Normalized -1 to +1
    targetParallaxX = (mouseX / window.innerWidth - 0.5) * 2;
    targetParallaxY = (mouseY / window.innerHeight - 0.5) * 2;

    // Check if aiming over a chicken
    let aimingAtChicken = false;
    for (const c of cs2Chickens) {
      const cx = c.x + currentParallaxX * c.z * 32;
      const cy = c.y + currentParallaxY * c.z * 22 + c.jumpY;
      const dist = Math.hypot(mouseX - cx, mouseY - cy);
      if (dist <= c.radius * 1.15) {
        aimingAtChicken = true;
        break;
      }
    }
    crosshair.classList.toggle('target-lock', aimingAtChicken);
  });

  // Shoot AK-47 on mousedown
  window.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;

    // Don't block or trigger shot noise if clicking UI buttons, links, inputs, modals
    const interactive = e.target.closest('button, a, input, select, .skin-card, .sc-weapon-item, .mz-wallet, .cs2-hunt-hud, .mz-modal');
    if (interactive) return;

    // Crosshair recoil animation
    crosshair.classList.remove('shooting');
    void crosshair.offsetWidth;
    crosshair.classList.add('shooting');
    setTimeout(() => crosshair.classList.remove('shooting'), 110);

    // Check hit from front-most chicken (highest z) to back
    const sorted = [...cs2Chickens].sort((a, b) => b.z - a.z);
    let hitChicken = null;
    for (const c of sorted) {
      const cx = c.x + currentParallaxX * c.z * 32;
      const cy = c.y + currentParallaxY * c.z * 22 + c.jumpY;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist <= c.radius * 1.35) {
        hitChicken = c;
        break;
      }
    }

    if (hitChicken) {
      const cx = hitChicken.x + currentParallaxX * hitChicken.z * 32;
      const cy = hitChicken.y + currentParallaxY * hitChicken.z * 22 + hitChicken.jumpY;

      // Show red X hitmarker on crosshair
      if (hitmarker) {
        hitmarker.classList.add('active');
        setTimeout(() => hitmarker.classList.remove('active'), 140);
      }

      hitChicken.hp -= 1;

      if (hitChicken.hp > 0 && hitChicken.hasHelmet) {
        // Helmet knocked off! ("DINK!")
        hitChicken.hasHelmet = false;
        hitChicken.jumpVy = -6.5;
        hitChicken.vx *= -1.6;
        hitChicken.dir *= -1;
        playGunshotSound(true, true);
        spawnFeathers(cx, cy - 12, hitChicken.z, '#94a3b8', false);
        cs2FloatingTexts.push({
          x: cx,
          y: cy - 20,
          text: '🔫 [AK-47] 🪖 DINK! -55 HP',
          color: '#fbbf24',
          alpha: 1,
          vy: -1.8
        });
      } else {
        // Chicken eliminated!
        playGunshotSound(true, false);
        spawnFeathers(cx, cy, hitChicken.z, hitChicken.bodyColor, hitChicken.golden);

        const now = Date.now();
        if (now - lastKillTime < 3500) {
          chickenStreak += 1;
        } else {
          chickenStreak = 1;
        }
        lastKillTime = now;

        chickenKills += 1;

        // Update HUD (Fun mode — no MZ Coin reward for chickens)
        const kEl = document.getElementById('chickenKillsVal');
        const sEl = document.getElementById('chickenStreakVal');
        if (kEl) kEl.textContent = chickenKills;
        if (sEl) sEl.textContent = `${chickenStreak}x`;

        cs2FloatingTexts.push({
          x: cx,
          y: cy - 10,
          text: `🔫 [AK-47] ${hitChicken.golden ? '👑 GOLDEN!' : 'BOOM!'}${chickenStreak >= 2 ? ` (${chickenStreak}x!)` : ''}`,
          color: hitChicken.golden ? '#ffd700' : '#4ade80',
          alpha: 1,
          vy: -2.1
        });

        pushKillfeed(hitChicken.name, 0, hitChicken.golden);

        // Remove & respawn a new chicken after delay
        const idx = cs2Chickens.indexOf(hitChicken);
        if (idx !== -1) cs2Chickens.splice(idx, 1);
        setTimeout(() => {
          if (cs2Chickens.length < 16) cs2Chickens.push(createChicken(false));
        }, 1100);
      }
    } else {
      // Missed shot: AK-47 gunshot + snow splash + scare nearby chickens
      playGunshotSound(false, false);
      cs2BulletHoles.push({ x: e.clientX, y: e.clientY, alpha: 0.95 });
      spawnFeathers(e.clientX, e.clientY, 0.55, '#e0f2fe', false);
      for (const c of cs2Chickens) {
        const cx = c.x + currentParallaxX * c.z * 32;
        const cy = c.y + currentParallaxY * c.z * 22;
        if (Math.hypot(e.clientX - cx, e.clientY - cy) < 160) {
          c.jumpVy = -5.5;
          c.scaredTimer = 50;
          c.dir = cx > e.clientX ? 1 : -1;
          c.vx = c.dir * c.speed * 2.2;
        }
      }
    }
  });

  // Main 60fps render loop
  function animate() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Smooth 3D camera parallax
    currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
    currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;

    if (world) {
      const rotY = currentParallaxX * 6;
      const rotX = -currentParallaxY * 5;
      world.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${(-currentParallaxX * 18).toFixed(1)}px, ${(-currentParallaxY * 14).toFixed(1)}px, 0)`;
    }

    // 1-3. Ulaanbaatar 4-Season Weather Engine (Snow, Rain+Rainbow, Spring, Summer, Autumn)
    if (typeof window.renderUBWeatherScene === 'function') {
      window.renderUBWeatherScene(ctx, w, h, currentParallaxX, currentParallaxY);
    } else {
      drawWinterClouds(ctx, w, h);
      drawSnowGround(ctx, w, h);
      updateAndDrawSnowflakes(ctx, w, h);
    }

    // 4. Bullet sparks / Muzzle flashes
    for (let i = cs2BulletHoles.length - 1; i >= 0; i--) {
      const b = cs2BulletHoles[i];
      ctx.fillStyle = `rgba(255, 208, 0, ${b.alpha})`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
      b.alpha -= 0.04;
      if (b.alpha <= 0) cs2BulletHoles.splice(i, 1);
    }

    // 5. Sort chickens by Z depth so closer chickens render in front
    cs2Chickens.sort((a, b) => a.z - b.z);

    for (const c of cs2Chickens) {
      c.phase += (c.scaredTimer > 0 ? 0.38 : 0.18) * c.speed;
      if (c.scaredTimer > 0) {
        c.scaredTimer--;
        if (c.scaredTimer === 0) {
          c.vx = c.dir * c.speed * (0.7 + c.z * 0.75);
        }
      }

      c.x += c.vx;

      // Occasional random jump
      if (c.jumpY === 0 && Math.random() < 0.004) {
        c.jumpVy = -4.2 * c.z;
      }
      c.jumpY += c.jumpVy;
      if (c.jumpY < 0) {
        c.jumpVy += 0.28;
      } else {
        c.jumpY = 0;
        c.jumpVy = 0;
      }

      // Wrap around screen edges
      if (c.dir === 1 && c.x > w + 80) {
        c.x = -70;
        c.y = h * (0.35 + Math.random() * 0.57);
      } else if (c.dir === -1 && c.x < -80) {
        c.x = w + 70;
        c.y = h * (0.35 + Math.random() * 0.57);
      }

      drawChicken(ctx, c);
    }

    // 6. Feathers & Snow splash particles
    for (let i = cs2Feathers.length - 1; i >= 0; i--) {
      const f = cs2Feathers[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.14; // gravity
      f.vx *= 0.98;
      f.rot += f.vRot;
      f.life++;
      f.alpha = 1 - f.life / f.maxLife;

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);
      ctx.globalAlpha = Math.max(0, f.alpha);
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, f.size, f.size * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (f.life >= f.maxLife) cs2Feathers.splice(i, 1);
    }

    // 7. Floating +MZ Coin & AK-47 Kill texts
    for (let i = cs2FloatingTexts.length - 1; i >= 0; i--) {
      const ft = cs2FloatingTexts[i];
      ft.y += ft.vy;
      ft.alpha -= 0.018;

      ctx.save();
      ctx.font = '800 13px Orbitron, sans-serif';
      ctx.fillStyle = ft.color;
      ctx.globalAlpha = Math.max(0, ft.alpha);
      ctx.shadowColor = 'rgba(0,0,0,0.9)';
      ctx.shadowBlur = 6;
      ctx.fillText(ft.text, ft.x - 55, ft.y);
      ctx.restore();

      if (ft.alpha <= 0) cs2FloatingTexts.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// HUD Controls
function setCrosshairColor(color, btn) {
  const ch = document.getElementById('cs2Crosshair');
  if (ch) ch.style.setProperty('--ch-color', color);
  document.querySelectorAll('.ch-color-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function toggleCs2Crosshair() {
  cs2CrosshairEnabled = !cs2CrosshairEnabled;
  const ch = document.getElementById('cs2Crosshair');
  const btn = document.getElementById('btnToggleCrosshair');
  if (ch) ch.classList.toggle('hidden', !cs2CrosshairEnabled);
  document.body.classList.toggle('cs2-crosshair-active', cs2CrosshairEnabled);
  if (btn) {
    btn.classList.toggle('active', cs2CrosshairEnabled);
    btn.textContent = cs2CrosshairEnabled ? '🎯 Crosshair: ON' : '🎯 Crosshair: OFF';
  }
}

function toggleCs2Sfx() {
  cs2SfxEnabled = !cs2SfxEnabled;
  const btn = document.getElementById('btnToggleSfx');
  if (btn) {
    btn.classList.toggle('active', cs2SfxEnabled);
    btn.textContent = cs2SfxEnabled ? '🔊 Дуу: ON' : '🔇 Дуу: OFF';
  }
}

function toggleHuntHud() {
  const hud = document.getElementById('cs2HuntHud');
  if (hud) hud.classList.toggle('minimized');
}

document.addEventListener('DOMContentLoaded', () => {
  initCs2ChickenEngine();
});

// ===================== STEAM AUTH, BANLIST, PLAYER PROFILE & LIVE CHAT =====================

window.steamUser = null;
let selectedSteamAvatar = '🐺';
let steamBonusReceived = false;

function redirectToRealSteamOpenID() {
  // Official Valve Steam OpenID 2.0 redirect flow
  const returnUrl = window.location.origin + window.location.pathname;
  const realm = window.location.origin;
  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnUrl,
    'openid.realm': realm,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
  });
  window.location.href = `https://steamcommunity.com/openid/login?${params.toString()}`;
}

function handleDiscordClick(e) {
  showToast('info', '💬', 'The MongolZ GDG Discord', 'Албан ёсны Discord сервер лүү шилжиж байна...', 3000);
}

function loadSavedSteamUser() {
  try {
    // 1. Check if returning from official Steam OpenID 2.0 login callback
    const urlParams = new URLSearchParams(window.location.search);
    const claimedId = urlParams.get('openid.claimed_id') || urlParams.get('openid.identity') || '';
    const match = claimedId.match(/steamcommunity\.com\/openid\/id\/(\d{17})/);
    if (match && match[1]) {
      const verifiedSteamId = match[1];
      const shortSuffix = verifiedSteamId.slice(-4);
      const prevSaved = localStorage.getItem('mz_steam_user');
      const prevObj = prevSaved ? JSON.parse(prevSaved) : null;

      window.steamUser = {
        name: (prevObj && prevObj.name && prevObj.name !== 'MGL_Shooter') ? prevObj.name : `Steam_${shortSuffix}`,
        steamId: verifiedSteamId,
        avatar: (prevObj && prevObj.avatar) ? prevObj.avatar : '🎮',
        faceitLvl: 10,
        elo: 2740,
        kd: '1.68',
        hs: '52%',
        winrate: '69%',
        verifiedOpenID: true
      };
      localStorage.setItem('mz_steam_user', JSON.stringify(window.steamUser));

      // Clean OpenID query params from URL bar
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);

      if (!steamBonusReceived) {
        steamBonusReceived = true;
        mzBalance += 1000;
        updateMzWalletUI();
      }
      renderSteamNav();
      setTimeout(() => {
        showToast('gold', '🎮', `Steam OpenID Баталгаажлаа!`, `SteamID64: ${verifiedSteamId} · +1,000 MZ Coin урамшуулал орлоо!`, 5000);
      }, 600);
      return;
    }

    // 2. Otherwise load from localStorage if previously signed in
    const saved = localStorage.getItem('mz_steam_user');
    if (saved) {
      window.steamUser = JSON.parse(saved);
      steamBonusReceived = true;
      renderSteamNav();
    }
  } catch (e) {}
}

function openSteamModal() {
  const modal = document.getElementById('steamModal');
  if (!modal) return;
  if (window.steamUser) {
    document.getElementById('steamNickInput').value = window.steamUser.name;
    document.getElementById('steamIdInput').value = window.steamUser.steamId;
  }
  modal.classList.add('open');
}

function closeSteamModal() {
  const modal = document.getElementById('steamModal');
  if (modal) modal.classList.remove('open');
}

function pickSteamAvatar(emoji, btn) {
  selectedSteamAvatar = emoji;
  document.querySelectorAll('#steamAvatarPicker .sa-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function fillSteamPreset(name, steamId, emoji) {
  document.getElementById('steamNickInput').value = name;
  document.getElementById('steamIdInput').value = steamId;
  selectedSteamAvatar = emoji;
  document.querySelectorAll('#steamAvatarPicker .sa-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === emoji);
  });
}

function confirmSteamLink() {
  const nick = (document.getElementById('steamNickInput').value || '').trim() || 'MGL_Shooter';
  const rawId = (document.getElementById('steamIdInput').value || '').trim() || '76561198992841023';
  const cleanId = rawId.replace(/^https?:\/\/steamcommunity\.com\/(id|profiles)\//i, '').replace(/\/$/, '');

  window.steamUser = {
    name: nick,
    steamId: cleanId,
    avatar: selectedSteamAvatar,
    faceitLvl: 10,
    elo: 2685,
    kd: '1.64',
    hs: '51%',
    winrate: '68%'
  };

  try {
    localStorage.setItem('mz_steam_user', JSON.stringify(window.steamUser));
  } catch (e) {}

  if (!steamBonusReceived) {
    steamBonusReceived = true;
    mzBalance += 1000;
    updateMzWalletUI();
    showToast('gold', '🎁', `Steam холбогдлоо: ${nick}!`, '+1,000 MZ Coin урамшуулал таны дансанд орлоо!', 4500);
  } else {
    showToast('success', '✅', `Steam профайл шинэчлэгдлээ: ${nick}`, `SteamID: ${cleanId}`, 3200);
  }

  renderSteamNav();
  closeSteamModal();
  pushLiveDrop(`🎮 <strong>${nick}</strong> Steam аккаунтаа сервертэй холболоо!`);
}

function renderSteamNav() {
  const area = document.getElementById('steamNavArea');
  if (!area) return;
  if (!window.steamUser) return;

  area.innerHTML = `
    <div class="steam-user-pill" onclick="inspectCurrentPlayer()" title="Профайл харах / Steam солих">
      <div class="sup-avatar">${window.steamUser.avatar}</div>
      <span class="sup-name">${window.steamUser.name}</span>
      <span class="sup-lvl">LVL 10</span>
    </div>
  `;
}

function inspectCurrentPlayer() {
  if (!window.steamUser) {
    openSteamModal();
    return;
  }
  openPlayerProfile(window.steamUser.name);
}

// ---- BANLIST & SOURCEBANS DATA ----
const BANLIST_DATA = [
  { date: '10 мин өмнө', name: 'xX_SpinBot_Xx', steamId: '76561199102938471', reason: 'Aimbot / Spinbot (GDG AI Detection)', admin: '🤖 GDG Shield AI', duration: 'Үүрдийн', type: 'cheat', status: 'perm' },
  { date: '28 мин өмнө', name: 's1mple_fake', steamId: '76561198847362519', reason: 'Wallhack / ESP сэжигтэй (Demo Review)', admin: '👑 Admin bLitz', duration: 'Үүрдийн', type: 'cheat', status: 'perm' },
  { date: '1 цагийн өмнө', name: 'ToxicBoy_MN', steamId: '76561198392019283', reason: 'Voice Chat доромжлол / Mic Spam', admin: '🛡️ Mod Techno', duration: '24 цаг', type: 'mute', status: 'temp' },
  { date: '2 цагийн өмнө', name: 'AFK_Master', steamId: '76561198475639102', reason: '5v5 Competitive тоглолтоос дундаас гарсан', admin: '⚡ Auto-Matchmaking', duration: '2 цаг', type: 'temp', status: 'temp' },
  { date: '3 цагийн өмнө', name: 'NoRecoil_Pro', steamId: '76561199019283746', reason: 'External Triggerbot / Macro', admin: '🤖 GDG Shield AI', duration: 'Үүрдийн', type: 'cheat', status: 'perm' },
  { date: '5 цагийн өмнө', name: 'TeamKiller99', steamId: '76561198283746591', reason: 'Багийн тоглогчоо санаатай буудсан (Griefing)', admin: '🛡️ Mod 910', duration: '7 хоног', type: 'temp', status: 'temp' },
  { date: 'Өчигдөр', name: 'BhopScript_KZ', steamId: '76561198746352410', reason: 'Auto-Strafe / Bhop Hack on KZ Server', admin: '🤖 KZ Anti-Cheat', duration: '30 хоног', type: 'cheat', status: 'temp' },
  { date: 'Өчигдөр', name: 'Nomad_Warrior', steamId: '76561198112233445', reason: 'Чат спам (Хугацаа дууссан)', admin: '🛡️ Mod maaRaa', duration: '30 мин', type: 'mute', status: 'expired' }
];

let currentBanFilter = 'all';
let currentBanSearch = '';

function renderBanlist() {
  const tbody = document.getElementById('banlistBody');
  if (!tbody) return;

  const filtered = BANLIST_DATA.filter(b => {
    const matchTab = currentBanFilter === 'all' || b.type === currentBanFilter;
    const q = currentBanSearch.toLowerCase();
    const matchSearch = !q || b.name.toLowerCase().includes(q) || b.steamId.toLowerCase().includes(q) || b.reason.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  tbody.innerHTML = filtered.map(b => {
    const badgeLabel = b.status === 'perm' ? '🔴 БАНДУУЛСАН' : b.status === 'temp' ? '🟡 ХУГАЦААТАЙ' : '🟢 ДУУССАН';
    return `
      <tr onclick="openPlayerProfile('${b.name}', '${b.steamId}', '${b.status}')" style="cursor:pointer">
        <td style="color:var(--text-muted);font-size:0.82rem">${b.date}</td>
        <td>
          <div style="display:flex;flex-direction:column">
            <span class="clickable-player" style="font-weight:700;color:#fff">${b.name}</span>
            <span style="font-size:0.74rem;color:#66c0f4">STEAM_1:${b.steamId}</span>
          </div>
        </td>
        <td style="color:var(--text-secondary);font-size:0.86rem">${b.reason}</td>
        <td style="font-family:var(--font-heading);font-weight:700;color:var(--gold)">${b.admin}</td>
        <td style="font-family:var(--font-display);font-size:0.8rem">${b.duration}</td>
        <td><span class="ban-badge ${b.status}">${badgeLabel}</span></td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted)">Тоглогч олдсонгүй</td></tr>`;
}

function filterBans(type, btn) {
  currentBanFilter = type;
  document.querySelectorAll('.ban-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderBanlist();
}

function searchBans(val) {
  currentBanSearch = val || '';
  renderBanlist();
}

// ---- FACEIT-STYLE PLAYER PROFILE MODAL ----
function openPlayerProfile(playerName, customSteamId, banStatus) {
  const modal = document.getElementById('playerProfileModal');
  const body = document.getElementById('playerProfileBody');
  if (!modal || !body) return;

  // Check if this is the current linked user or leaderboard player
  const isSelf = window.steamUser && window.steamUser.name.toLowerCase() === playerName.toLowerCase();
  const lbEntry = [...LB_DATA.rating, ...LB_DATA.kills].find(x => x.name.toLowerCase() === playerName.toLowerCase());

  const hash = playerName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const steamId = customSteamId || (isSelf ? window.steamUser.steamId : `76561198${100000000 + (hash * 918273) % 899999999}`);
  const elo = isSelf ? window.steamUser.elo : (lbEntry && typeof lbEntry.elo === 'number' ? lbEntry.elo : (banStatus === 'perm' ? 840 : 1950 + (hash % 850)));
  const faceitLvl = banStatus === 'perm' ? 1 : Math.min(10, Math.max(4, Math.floor(elo / 250)));
  const kd = isSelf ? window.steamUser.kd : (lbEntry && lbEntry.kd !== '—' ? lbEntry.kd : (1.12 + (hash % 65) / 100).toFixed(2));
  const hs = isSelf ? window.steamUser.hs : (lbEntry && lbEntry.hs.includes('%') ? lbEntry.hs : `${42 + (hash % 24)}%`);
  const winrate = isSelf ? window.steamUser.winrate : `${54 + (hash % 22)}%`;
  const avatar = isSelf ? window.steamUser.avatar : ['🐺', '🦅', '🔥', '🎯', '🐉', '👑'][hash % 6];
  const rankBadge = isSelf && currentRank ? `<span style="color:${currentRank.color};font-weight:800">[${currentRank.name}]</span>` : (banStatus === 'perm' ? '<span style="color:#ef4444;font-weight:800">[BANNED]</span>' : '<span style="color:#22c55e;font-weight:800">[VERIFIED]</span>');

  const matches = banStatus === 'perm' ? ['L', 'L', 'L', 'W', 'L'] : ['W', 'W', 'L', 'W', 'W'];

  body.innerHTML = `
    <div class="pp-header-card">
      <div class="pp-user-left">
        <div class="pp-avatar">${avatar}</div>
        <div>
          <div class="pp-name">${rankBadge} ${playerName}</div>
          <div class="pp-steamid">SteamID64: ${steamId} <button onclick="copySteamId('${steamId}')" style="margin-left:6px;padding:1px 7px;border-radius:4px;border:1px solid #66c0f4;background:transparent;color:#66c0f4;cursor:pointer;font-size:0.7rem">Copy</button></div>
        </div>
      </div>
      <div class="pp-faceit-box">
        <div class="faceit-lvl-circle">${faceitLvl}</div>
        <div>
          <div style="font-size:0.65rem;color:var(--text-muted);font-family:var(--font-display)">GDG ELO</div>
          <div style="font-size:1.1rem;font-weight:900;font-family:var(--font-display);color:#fff">${elo}</div>
        </div>
      </div>
    </div>

    <div class="pp-stats-grid">
      <div class="pp-stat-box">
        <div class="pp-stat-label">K/D RATIO</div>
        <div class="pp-stat-val" style="color:#4ade80">${kd}</div>
      </div>
      <div class="pp-stat-box">
        <div class="pp-stat-label">HEADSHOT %</div>
        <div class="pp-stat-val" style="color:var(--gold-bright)">${hs}</div>
      </div>
      <div class="pp-stat-box">
        <div class="pp-stat-label">WINRATE</div>
        <div class="pp-stat-val" style="color:#60a5fa">${winrate}</div>
      </div>
      <div class="pp-stat-box">
        <div class="pp-stat-label">FAV WEAPON</div>
        <div class="pp-stat-val">🔫 AK-47</div>
      </div>
    </div>

    <div>
      <div style="font-family:var(--font-display);font-size:0.68rem;color:var(--text-muted);letter-spacing:0.12em;margin-bottom:10px">Шилдэг Мапууд (Map Winrate)</div>
      <div class="pp-maps-list">
        <div class="pp-map-row">
          <span style="width:95px">de_mirage</span>
          <div class="pp-map-bar"><div class="pp-map-fill" style="width:74%"></div></div>
          <span style="color:#4ade80;font-weight:700">74%</span>
        </div>
        <div class="pp-map-row">
          <span style="width:95px">de_inferno</span>
          <div class="pp-map-bar"><div class="pp-map-fill" style="width:66%"></div></div>
          <span style="color:#4ade80;font-weight:700">66%</span>
        </div>
        <div class="pp-map-row">
          <span style="width:95px">de_anubis</span>
          <div class="pp-map-bar"><div class="pp-map-fill" style="width:59%"></div></div>
          <span style="color:var(--gold-bright);font-weight:700">59%</span>
        </div>
      </div>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding-top:8px;border-top:1px solid var(--border)">
      <div>
        <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:5px">Сүүлийн 5 тоглолт (5v5):</div>
        <div class="pp-matches-row">
          ${matches.map(m => `<span class="pp-match-pill ${m}">${m}</span>`).join('')}
        </div>
      </div>
      ${isSelf ? `<button class="btn-steam-login" onclick="closePlayerProfile();openSteamModal()">⚙️ Steam Профайл засах</button>` : ''}
    </div>
  `;

  modal.classList.add('open');
}

function closePlayerProfile() {
  const modal = document.getElementById('playerProfileModal');
  if (modal) modal.classList.remove('open');
}

function copySteamId(id) {
  navigator.clipboard?.writeText(id).catch(() => {});
  showToast('info', '📋', 'SteamID64 хуулагдлаа!', id, 2500);
}

// ---- FLOATING LIVE CHAT & RARE DROPS TICKER ----
const INITIAL_CHAT_MESSAGES = [
  { tag: '[VIP+]', tagColor: '#f0a800', author: 'bLitz', text: '5v5 #12 сервер дээр +2 хүн дутуу байна орж ирээрэй манайхаан!' },
  { tag: '[MOD]', tagColor: '#a855f7', author: 'Techno', text: 'Шинэ өвлийн цастай фон болон AK-47 тахиа бууддаг гоё болсон байна шүү 🔥' },
  { tag: '[VIP]', tagColor: '#22c55e', author: 'Senzu', text: 'Алтан тахиа буудаад +50 MZ Coin авчихлаа хаха 🐔👑' },
  { tag: '[PRO]', tagColor: '#3b82f6', author: '910', text: 'Skin changer дээр AWP Dragon Lore FN тавьчихсан, сервер дээр гялалзаж байна' },
  { tag: '[ADMIN]', tagColor: '#ef4444', author: 'DarkMeister', text: 'Steam аккаунтаа холбовол +1,000 MZ Coin үнэгүй өгч байгаа шүү!' }
];

const INITIAL_DROPS = [
  '🔪 <strong>bLitz</strong> Skin Changer дээр <strong>Karambit | Gamma Doppler</strong> тохирууллаа!',
  '👑 <strong>Techno</strong> Дэлгүүрээс <strong>VIP+ (30 хоног)</strong> эрх идэвхжүүллээ!',
  '🔨 <strong>GDG Shield AI</strong> тоглогч <strong>xX_SpinBot_Xx</strong>-ийг Aimbot шалтгаанаар бандлаа!',
  '🐔 <strong>Senzu</strong> [AK-47]-аар <strong>Golden MongolZ Chicken</strong> буудаж <strong>+50 MZ</strong> авлаа!'
];

const BOT_CHAT_POOL = [
  { tag: '[VIP+]', tagColor: '#f0a800', author: 'maaRaa', text: 'DM сервер дээр AK-47 халаалт хийе орж ирээрэй!' },
  { tag: '[VIP]', tagColor: '#22c55e', author: 'Chinggis', text: 'Mirage 5v5 #04 эхлэх гэж байна +1!' },
  { tag: '[PLAYER]', tagColor: '#94a3b8', author: 'Temujin', text: 'Тахиа буудсаар байгаад VIP авах MZ Coin цуглуулчихлаа 😂' },
  { tag: '[MOD]', tagColor: '#a855f7', author: 'tikuak', text: 'Cheater харвал чат дээр бичээрэй, шууд шалгаад бан хийнэ 🛡️' }
];

function appendChatMessage(tag, tagColor, author, text) {
  const feed = document.getElementById('lcFeedChat');
  if (!feed) return;
  const div = document.createElement('div');
  div.className = 'lc-msg';
  div.innerHTML = `
    <span class="lc-msg-tag" style="color:${tagColor}">${tag}</span>
    <span class="lc-msg-author" onclick="openPlayerProfile('${author}')">${author}:</span>
    <span class="lc-msg-text">${text}</span>
  `;
  feed.appendChild(div);
  while (feed.children.length > 25) {
    feed.firstElementChild.remove();
  }
  feed.scrollTop = feed.scrollHeight;
}

function pushLiveDrop(htmlText) {
  const feed = document.getElementById('lcFeedDrops');
  if (!feed) return;
  const div = document.createElement('div');
  div.className = 'lc-drop-item';
  div.innerHTML = `<span>${htmlText}</span>`;
  feed.prepend(div);
  while (feed.children.length > 20) {
    feed.lastElementChild.remove();
  }
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('lcInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const author = (window.steamUser && window.steamUser.name) ? window.steamUser.name : 'Guest_MN';
  const tag = currentRank ? `[${currentRank.name}]` : (window.steamUser ? '[STEAM]' : '[ТОГЛОГЧ]');
  const tagColor = currentRank ? currentRank.color : (window.steamUser ? '#66c0f4' : '#94a3b8');

  appendChatMessage(tag, tagColor, author, text.replace(/</g, '&lt;'));
  input.value = '';
}

function sendQuickChat(msg) {
  const author = (window.steamUser && window.steamUser.name) ? window.steamUser.name : 'Guest_MN';
  const tag = currentRank ? `[${currentRank.name}]` : (window.steamUser ? '[STEAM]' : '[ТОГЛОГЧ]');
  const tagColor = currentRank ? currentRank.color : (window.steamUser ? '#66c0f4' : '#94a3b8');
  appendChatMessage(tag, tagColor, author, msg);
}

function toggleLiveChat() {
  const widget = document.getElementById('liveChatWidget');
  const btn = document.getElementById('lcToggleBtn');
  if (!widget) return;
  widget.classList.toggle('minimized');
  if (btn) btn.textContent = widget.classList.contains('minimized') ? '+' : '−';
}

function switchChatTab(tab, btn) {
  document.querySelectorAll('.lc-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('lcFeedChat')?.classList.toggle('active', tab === 'chat');
  document.getElementById('lcFeedDrops')?.classList.toggle('active', tab === 'drops');
}

function initLiveChatAndDrops() {
  INITIAL_CHAT_MESSAGES.forEach(m => appendChatMessage(m.tag, m.tagColor, m.author, m.text));
  INITIAL_DROPS.forEach(d => pushLiveDrop(d));

  // Periodic realistic community chat activity
  let botIdx = 0;
  setInterval(() => {
    const m = BOT_CHAT_POOL[botIdx % BOT_CHAT_POOL.length];
    botIdx++;
    appendChatMessage(m.tag, m.tagColor, m.author, m.text);
  }, 18000);
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedSteamUser();
  renderBanlist();
  initLiveChatAndDrops();
});

// ===================== GDG LIVE ARENA & SPONSOR SCREEN ENGINE =====================

let currentArenaMode = 'gotv'; // 'gotv' | 'stream' | 'sponsor'
let arenaAutoRotate = true;
let activeChannelIdx = 0;
let activeSponsorIdx = 0;
let streamSpecIdx = 0;

const ARENA_CHANNELS = [
  {
    id: '01',
    title: '5v5 Competitive #01',
    map: 'de_mirage',
    teamCT: 'Team bLitz',
    teamT: 'Team Senzu',
    scoreCT: 11,
    scoreT: 9,
    viewers: 342,
    ctPlayers: [
      { name: 'bLitz', hp: 100, wep: 'M4A1-S', kd: '21/11' },
      { name: 'Techno4K', hp: 84, wep: 'M4A4', kd: '18/13' },
      { name: '910', hp: 100, wep: 'AWP', kd: '24/9' },
      { name: 'mzinho', hp: 62, wep: 'M4A1-S', kd: '15/14' },
      { name: 'maaRaa', hp: 0, wep: 'USP-S', kd: '12/15' }
    ],
    tPlayers: [
      { name: 'Senzu', hp: 100, wep: 'AK-47', kd: '23/12' },
      { name: 'DarkMeister', hp: 91, wep: 'AK-47', kd: '19/14' },
      { name: 'tikuak', hp: 100, wep: 'AWP', kd: '17/13' },
      { name: 'Chinggis', hp: 45, wep: 'AK-47', kd: '14/16' },
      { name: 'Kublai', hp: 0, wep: 'Glock-18', kd: '11/17' }
    ]
  },
  {
    id: '02',
    title: '5v5 Competitive #02',
    map: 'de_inferno',
    teamCT: 'Nomad Warriors',
    teamT: 'Ulaanbaatar 5',
    scoreCT: 12,
    scoreT: 11,
    viewers: 215,
    ctPlayers: [
      { name: 'Temujin', hp: 100, wep: 'M4A4', kd: '22/15' },
      { name: 'ArhanGai', hp: 100, wep: 'AWP', kd: '20/14' },
      { name: 'Ganbold', hp: 78, wep: 'M4A1-S', kd: '16/16' },
      { name: 'Baatar', hp: 54, wep: 'FAMAS', kd: '14/17' },
      { name: 'Sukhbaa', hp: 100, wep: 'M4A1-S', kd: '13/15' }
    ],
    tPlayers: [
      { name: 'Mongolchin', hp: 100, wep: 'AK-47', kd: '25/14' },
      { name: 'Subedei', hp: 88, wep: 'AK-47', kd: '18/15' },
      { name: 'Jebe_AWP', hp: 100, wep: 'AWP', kd: '19/13' },
      { name: 'Khubilai', hp: 0, wep: 'AK-47', kd: '12/18' },
      { name: 'BatuKhan', hp: 65, wep: 'Galil AR', kd: '11/17' }
    ]
  },
  {
    id: '03',
    title: '5v5 Competitive #03',
    map: 'de_anubis',
    teamCT: 'Steppe Eagles',
    teamT: 'Gobi Wolves',
    scoreCT: 7,
    scoreT: 8,
    viewers: 164,
    ctPlayers: [
      { name: 'AltaiFlyer', hp: 100, wep: 'M4A1-S', kd: '15/10' },
      { name: 'SteppeRunner', hp: 92, wep: 'AWP', kd: '14/9' },
      { name: 'UlaanJump', hp: 100, wep: 'M4A4', kd: '12/11' },
      { name: 'GobiHopper', hp: 38, wep: 'MP9', kd: '10/12' },
      { name: 'Khangai', hp: 0, wep: 'USP-S', kd: '8/13' }
    ],
    tPlayers: [
      { name: 'kzGod_MN', hp: 100, wep: 'AK-47', kd: '18/9' },
      { name: 'BhopKing', hp: 100, wep: 'AK-47', kd: '15/10' },
      { name: 'Falcon_MN', hp: 74, wep: 'AWP', kd: '13/11' },
      { name: 'Wolf_CS', hp: 100, wep: 'AK-47', kd: '11/11' },
      { name: 'HunterX', hp: 0, wep: 'Tec-9', kd: '9/13' }
    ]
  }
];

const ARENA_SPONSORS = [
  {
    badge: 'OFFICIAL SERVER PARTNER',
    brand: 'THE MONGOLZ GDG STORE',
    title: 'VIP+ БАГЦ АВААД БҮХ СЕРВЕРТ ДАРААЛАЛГҮЙ НЭВТРЭЭРЭЙ',
    desc: 'Алтан [VIP+] чат цол, MVP дуу, Double Jump, Neon Trail болон 90 хоногийн багцад -20% хямдрал идэвхтэй байна!',
    ctaText: '🛒 Дэлгүүр лүү очих',
    ctaAction: "document.getElementById('shop').scrollIntoView({behavior:'smooth'})"
  },
  {
    badge: 'GAMING GEAR SPONSOR',
    brand: 'MONGOLZ PRO ESPORTS GEAR',
    title: 'CS2 360Hz МОНИТОР & ХУЛГАНА — GDG ТОГЛОГЧДОД -15% OFF',
    desc: 'Pro тоглогчдын ашигладаг ZOWIE, Logitech Superlight 2 болон Wooting гар дээр MONGOLZ промо кодоор хямдрал аваарай.',
    ctaText: '🎁 Промо код хуулах',
    ctaAction: "navigator.clipboard?.writeText('MONGOLZ2026');showToast('gold','🎁','Промо код хуулагдлаа: MONGOLZ2026','Бүх партнёр дэлгүүрт 15% хямдарна',3500)"
  },
  {
    badge: 'ADVERTISE ON GDG ARENA',
    brand: 'ТАНЫ СУРТАЛЧИЛГАА ЭНД',
    title: 'ӨДӨРТ 12,000+ CS2 ТОГЛОГЧ ОРДОГ ДЭЛГЭЦ ДЭЭР БРЕНДЭЭ БАЙРШУУЛ',
    desc: 'Тоглолтын дундуур болон сайтын төв дэлгэц дээр өөрийн компьютер ланд, дэлгүүр, YouTube/Twitch сувгаа сурталчлаарай.',
    ctaText: '📢 Сурталчилгаа захиалах',
    ctaAction: 'openAdBookingModal()'
  }
];

function renderArenaChannels() {
  const list = document.getElementById('arenaChannelList');
  if (!list) return;
  list.innerHTML = ARENA_CHANNELS.map((ch, idx) => `
    <div class="as-channel-item ${idx === activeChannelIdx && currentArenaMode !== 'sponsor' ? 'active' : ''}" onclick="selectArenaChannel(${idx})">
      <div class="asc-top">
        <span>📡 ${ch.title}</span>
        <span class="asc-score">${ch.scoreCT} : ${ch.scoreT}</span>
      </div>
      <div class="asc-sub">
        <span>${ch.teamCT} vs ${ch.teamT}</span>
        <span style="color:var(--gold)">${ch.map}</span>
      </div>
    </div>
  `).join('');
}

function renderGotvView() {
  const ch = ARENA_CHANNELS[activeChannelIdx];
  if (!ch) return;

  document.getElementById('arenaChannelTitle').textContent = `${ch.title} · ${ch.map}`;
  document.getElementById('arenaViewerCount').textContent = ch.viewers;
  document.getElementById('gotvTeamCT').textContent = ch.teamCT;
  document.getElementById('gotvTeamT').textContent = ch.teamT;
  document.getElementById('gotvScoreCT').textContent = ch.scoreCT;
  document.getElementById('gotvScoreT').textContent = ch.scoreT;
  document.getElementById('gotvRoundText').textContent = `ROUND ${ch.scoreCT + ch.scoreT + 1} / 24`;
  document.getElementById('gotvMapPill').textContent = `${ch.map} · 128-tick`;

  const ctEl = document.getElementById('gotvRosterCT');
  const tEl = document.getElementById('gotvRosterT');

  if (ctEl) {
    ctEl.innerHTML = ch.ctPlayers.map(p => `
      <div class="gr-player ${p.hp <= 0 ? 'dead' : ''}" onclick="openPlayerProfile('${p.name}')" style="cursor:pointer">
        <div class="gr-top">
          <span>${p.name}</span>
          <span style="color:${p.hp > 0 ? '#60a5fa' : '#ef4444'}">${p.hp > 0 ? `${p.hp} HP` : '💀'}</span>
        </div>
        <div class="gr-sub">
          <span>🔫 ${p.wep}</span>
          <span>${p.kd}</span>
        </div>
        <div class="gr-hp-bar" style="width:${Math.max(0, p.hp)}%"></div>
      </div>
    `).join('');
  }

  if (tEl) {
    tEl.innerHTML = ch.tPlayers.map(p => `
      <div class="gr-player ${p.hp <= 0 ? 'dead' : ''}" onclick="openPlayerProfile('${p.name}')" style="cursor:pointer">
        <div class="gr-top">
          <span>${p.name}</span>
          <span style="color:${p.hp > 0 ? '#f0a800' : '#ef4444'}">${p.hp > 0 ? `${p.hp} HP` : '💀'}</span>
        </div>
        <div class="gr-sub">
          <span>🔫 ${p.wep}</span>
          <span>${p.kd}</span>
        </div>
        <div class="gr-hp-bar" style="width:${Math.max(0, p.hp)}%"></div>
      </div>
    `).join('');
  }
}

function buildMediaEmbedHtml(rawUrl) {
  if (!rawUrl) return '';
  const url = rawUrl.trim();
  if (!url) return '';

  // 1. Check YouTube URL (watch?v=, youtu.be/, shorts/, embed/, live/)
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const vid = ytMatch[1];
    return `<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1&mute=0&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  // 2. Check Twitch channel or video URL
  const twMatch = url.match(/twitch\.tv\/([a-zA-Z0-9_]+)/);
  if (twMatch && twMatch[1]) {
    const channel = twMatch[1];
    const parentHost = window.location.hostname || 'localhost';
    return `<iframe src="https://player.twitch.tv/?channel=${channel}&parent=${parentHost}&autoplay=true" allowfullscreen></iframe>`;
  }

  // 3. Direct Video file (.mp4, .webm, .ogg)
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    return `<video src="${url}" controls autoplay loop playsinline></video>`;
  }

  // 4. Direct Image file (.png, .jpg, .jpeg, .gif, .webp)
  if (/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(url)) {
    return `<img src="${url}" alt="Sponsor Media" />`;
  }

  // 5. Fallback generic iframe if https:// link
  if (/^https?:\/\//i.test(url)) {
    return `<iframe src="${url}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  return '';
}

function renderSponsorStage() {
  const wrap = document.getElementById('sponsorStage');
  if (!wrap) return;
  const sp = ARENA_SPONSORS[activeSponsorIdx % ARENA_SPONSORS.length];
  const mediaHtml = sp.mediaUrl ? `<div class="sp-media-box">${buildMediaEmbedHtml(sp.mediaUrl)}</div>` : '';

  wrap.innerHTML = `
    <div class="sp-billboard-badge">📢 ${sp.badge}</div>
    <div class="sp-billboard-brand">${sp.brand}</div>
    ${mediaHtml}
    <h3 class="sp-billboard-title" style="${sp.mediaUrl ? 'font-size:1.3rem;margin-bottom:6px' : ''}">${sp.title}</h3>
    <p class="sp-billboard-desc" style="${sp.mediaUrl ? 'margin-bottom:14px' : ''}">${sp.desc}</p>
    <div class="sp-billboard-actions">
      <button class="btn-topup-main" onclick="${sp.ctaAction}">${sp.ctaText}</button>
      <button class="at-mode-btn" onclick="openAdBookingModal()">🔗 Видео / Баннер линк солих</button>
      <button class="at-mode-btn" onclick="setArenaMode('gotv')">📡 Шууд тоглолт руу буцах</button>
    </div>
    <div class="sp-dots">
      ${ARENA_SPONSORS.map((_, i) => `<button class="sp-dot ${i === activeSponsorIdx ? 'active' : ''}" onclick="selectSponsorSlide(${i})"></button>`).join('')}
    </div>
  `;

  const ticker = document.getElementById('arenaPartnerTicker');
  if (ticker) ticker.textContent = `📢 ${sp.brand}: ${sp.title}`;
}

function playQuickVideoLink() {
  const input = document.getElementById('quickVideoUrlInput');
  const raw = (input?.value || '').trim();
  if (!raw) {
    showToast('info', '🔗', 'Видео линк оруулна уу!', 'YouTube, Twitch эсвэл MP4 видео линк хуулж тавина уу.', 3000);
    return;
  }
  const embedHtml = buildMediaEmbedHtml(raw);
  if (!embedHtml) {
    showToast('info', '⚠️', 'Линк танигдсангүй', 'Зөв YouTube, Twitch эсвэл .mp4 линк оруулна уу.', 3000);
    return;
  }

  const embedBox = document.getElementById('customStreamEmbed');
  const canvas = document.getElementById('streamPovCanvas');
  const topOv = document.getElementById('streamOverlayTop');
  const botOv = document.getElementById('streamOverlayBottom');

  if (embedBox) {
    embedBox.innerHTML = embedHtml;
    embedBox.style.display = 'block';
    const child = embedBox.firstElementChild;
    if (child) {
      child.style.width = '100%';
      child.style.height = '380px';
      child.style.border = 'none';
    }
  }
  if (canvas) canvas.style.display = 'none';
  if (topOv) topOv.style.display = 'none';
  if (botOv) botOv.style.display = 'none';

  arenaAutoRotate = false;
  const autoBtn = document.getElementById('arenaAutoBtn');
  if (autoBtn) {
    autoBtn.classList.remove('active');
    autoBtn.textContent = '🔄 Auto: OFF';
  }
  showToast('success', '🎬', 'Видео дэлгэц дээр тоглож эхэллээ!', 'Auto-Rotate түр унтарлаа.', 3000);
}

function resetToPovCanvas() {
  const embedBox = document.getElementById('customStreamEmbed');
  const canvas = document.getElementById('streamPovCanvas');
  const topOv = document.getElementById('streamOverlayTop');
  const botOv = document.getElementById('streamOverlayBottom');

  if (embedBox) {
    embedBox.innerHTML = '';
    embedBox.style.display = 'none';
  }
  if (canvas) canvas.style.display = 'block';
  if (topOv) topOv.style.display = 'flex';
  if (botOv) botOv.style.display = 'flex';
}

function selectSponsorSlide(idx) {
  activeSponsorIdx = idx;
  renderSponsorStage();
}

function setArenaMode(mode) {
  currentArenaMode = mode;
  document.querySelectorAll('.at-mode-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-arenamode') === mode);
  });
  document.querySelectorAll('.arena-view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`arenaView-${mode}`);
  if (target) target.classList.add('active');

  const badge = document.getElementById('arenaLiveBadge');
  const badgeTxt = document.getElementById('arenaBadgeText');
  if (mode === 'sponsor') {
    badge?.classList.add('ad-mode');
    if (badgeTxt) badgeTxt.textContent = 'SPONSOR AD';
    renderSponsorStage();
  } else {
    badge?.classList.remove('ad-mode');
    if (badgeTxt) badgeTxt.textContent = mode === 'gotv' ? 'GOTV LIVE' : 'STREAM LIVE';
  }
  renderArenaChannels();
}

function getAllChannelPlayers(ch) {
  if (!ch) return [];
  const ct = (ch.ctPlayers || []).map(p => ({ ...p, side: 'CT' }));
  const t  = (ch.tPlayers  || []).map(p => ({ ...p, side: 'T' }));
  return [...ct, ...t];
}

function renderPovPlayerStrip() {
  const strip = document.getElementById('povPlayerStrip');
  const ch = ARENA_CHANNELS[activeChannelIdx];
  if (!strip || !ch) return;

  const players = getAllChannelPlayers(ch);
  if (streamSpecIdx >= players.length) streamSpecIdx = 0;

  strip.innerHTML = players.map((p, idx) => `
    <button type="button" class="pov-plr-btn ${p.side.toLowerCase()} ${idx === streamSpecIdx ? 'active' : ''} ${p.hp <= 0 ? 'dead' : ''}" onclick="selectPovSpectator(${idx})">
      <span style="color:${p.side === 'CT' ? '#60a5fa' : '#f0a800'}">[${p.side}]</span>
      <span>${p.name}</span>
      <span style="font-size:0.7rem;color:${p.hp > 0 ? '#4ade80' : '#ef4444'}">${p.hp > 0 ? `${p.hp}HP` : '💀'}</span>
    </button>
  `).join('');

  updatePovHudOverlay();
}

function updatePovHudOverlay() {
  const ch = ARENA_CHANNELS[activeChannelIdx];
  if (!ch) return;
  const players = getAllChannelPlayers(ch);
  const p = players[streamSpecIdx] || players[0];
  if (!p) return;

  const skinMap = {
    'AK-47': 'AK-47 | Wild Lotus',
    'M4A1-S': 'M4A1-S | Printstream',
    'M4A4': 'M4A4 | Howl',
    'AWP': 'AWP | Dragon Lore',
    'USP-S': 'USP-S | Kill Confirmed',
    'Glock-18': 'Glock-18 | Fade',
    'FAMAS': 'FAMAS | Commemoration',
    'Galil AR': 'Galil AR | Chatterbox',
    'MP9': 'MP9 | Starlight Protector',
    'Tec-9': 'Tec-9 | Fuel Injector'
  };

  const srvTag = document.getElementById('streamServerTag');
  const plrTag = document.getElementById('streamPovPlayer');
  const hpEl   = document.getElementById('streamHpVal');
  const armEl  = document.getElementById('streamArmorVal');
  const wepEl  = document.getElementById('streamWepVal');
  const kdEl   = document.getElementById('streamKdVal');

  if (srvTag) srvTag.textContent = `🎥 3D POV LIVE · MATCH #${ch.id} (${ch.map})`;
  if (plrTag) plrTag.textContent = `🎯 Spectating: [${p.side}] ${p.name}`;
  if (hpEl)   hpEl.textContent = p.hp > 0 ? p.hp : 100;
  if (armEl)  armEl.textContent = p.hp > 0 ? 100 : 0;
  if (wepEl)  wepEl.textContent = skinMap[p.wep] || `${p.wep} | Pro Skin`;
  if (kdEl)   kdEl.textContent = p.kd;
}

function selectPovSpectator(idx) {
  streamSpecIdx = idx;
  resetToPovCanvas();
  renderPovPlayerStrip();
}

function selectArenaChannel(idx) {
  activeChannelIdx = Math.max(0, Math.min(2, idx)); // Only Match #1, #2, #3
  streamSpecIdx = 0;
  if (currentArenaMode === 'sponsor') {
    setArenaMode('gotv');
  }
  renderGotvView();
  renderArenaChannels();
  renderPovPlayerStrip();
}

function watchMatchInArena(matchObj, open3dPov = true) {
  // Only Matches #1, #2, #3 support 3D POV Spectating (Host Load Protection)
  if (matchObj.id > 3) {
    showToast('info', '⚡', `Server #${matchObj.id} дээр 3D POV унтраалттай`,
      'Хост комд ачаалал өгөхгүйн тулд зөвхөн Match #1, #2, #3 дээр 3D POV шууд дамжуулалт ажиллана.', 3800);
    return;
  }

  activeChannelIdx = matchObj.id - 1;
  streamSpecIdx = 0;
  setArenaMode(open3dPov ? 'stream' : 'gotv');
  resetToPovCanvas();
  renderGotvView();
  renderArenaChannels();
  renderPovPlayerStrip();
  document.getElementById('arena')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('gold', '🎥', `5v5 Match #0${matchObj.id} — 3D POV Шууд Камер!`,
    `${matchObj.teamA} vs ${matchObj.teamB} (${matchObj.map}) · Тоглогчдоо сольж үзээрэй!`, 3500);
}

function toggleArenaAutoRotate() {
  arenaAutoRotate = !arenaAutoRotate;
  const btn = document.getElementById('arenaAutoBtn');
  if (btn) {
    btn.classList.toggle('active', arenaAutoRotate);
    btn.textContent = arenaAutoRotate ? '🔄 Auto: ON' : '🔄 Auto: OFF';
  }
}

function cycleStreamSpectator() {
  const ch = ARENA_CHANNELS[activeChannelIdx];
  const players = getAllChannelPlayers(ch);
  if (players.length === 0) return;
  streamSpecIdx = (streamSpecIdx + 1) % players.length;
  resetToPovCanvas();
  renderPovPlayerStrip();
}

function launchCs2GotvConnect() {
  const ch = ARENA_CHANNELS[activeChannelIdx] || ARENA_CHANNELS[0];
  const gotvPort = 27020 + (activeChannelIdx + 1);
  const cmd = `connect connect.mongolz.gg:${gotvPort}`;
  navigator.clipboard?.writeText(cmd).catch(() => {});
  showToast('gold', '🎮', `CS2 GOTV Spectator (#${ch.id} ${ch.map})`,
    `Консол команд хуулагдлаа: ${cmd}`, 4000);
  window.location.href = `steam://connect/connect.mongolz.gg:${gotvPort}`;
}

function openAdBookingModal() {
  document.getElementById('adBookingModal')?.classList.add('open');
}

function closeAdBookingModal() {
  document.getElementById('adBookingModal')?.classList.remove('open');
}

function submitCustomAd() {
  const brand = (document.getElementById('adBrandInput')?.value || '').trim() || 'CUSTOM PARTNER';
  const title = (document.getElementById('adTitleInput')?.value || '').trim() || 'Манай серверт нэгдээрэй!';
  const desc = (document.getElementById('adDescInput')?.value || '').trim() || 'GDG Arena дэлгэц дээрх тусгай сурталчилгаа';
  const mediaUrl = (document.getElementById('adMediaUrlInput')?.value || '').trim();

  if (mzBalance < 2000) {
    showToast('info', '🪙', 'MZ Coin хүрэлцэхгүй байна!', 'Сурталчилгаа байршуулахад 2,000 MZ шаардлагатай.', 3500);
    closeAdBookingModal();
    openTopupModal();
    return;
  }

  mzBalance -= 2000;
  updateMzWalletUI();

  ARENA_SPONSORS.unshift({
    badge: mediaUrl ? 'VIDEO / MEDIA SPONSOR' : 'VERIFIED COMMUNITY AD',
    brand: brand.toUpperCase(),
    title: title,
    desc: desc,
    mediaUrl: mediaUrl,
    ctaText: '🔥 Дэлгэрэнгүй үзэх',
    ctaAction: `showToast('gold','📢','${brand.replace(/'/g, '')}','${desc.replace(/'/g, '')}',4000)`
  });

  if (mediaUrl) {
    arenaAutoRotate = false;
    const autoBtn = document.getElementById('arenaAutoBtn');
    if (autoBtn) {
      autoBtn.classList.remove('active');
      autoBtn.textContent = '🔄 Auto: OFF';
    }
  }

  activeSponsorIdx = 0;
  closeAdBookingModal();
  setArenaMode('sponsor');
  showToast('gold', '📺', 'Таны сурталчилгаа Дэлгэц дээр байршлаа!', `${brand} — ${mediaUrl ? 'Видео тоглож эхэллээ!' : 'Бүх үзэгчдэд харагдаж эхэллээ.'}`, 4500);
}

// ---- GOTV 2D TACTICAL RADAR & 3D FIRST-PERSON POV SPECTATING ENGINE ----
function initArenaCanvases() {
  const radarCanvas = document.getElementById('gotvRadarCanvas');
  const povCanvas = document.getElementById('streamPovCanvas');
  if (!radarCanvas) return;

  const rCtx = radarCanvas.getContext('2d');
  const pCtx = povCanvas ? povCanvas.getContext('2d') : null;

  // 5 CT dots & 5 T dots on radar
  const radarDots = [
    { side: 'ct', label: '1', x: 95,  y: 95,  vx: 0.45, vy: 0.25 },
    { side: 'ct', label: '2', x: 115, y: 155, vx: 0.35, vy: -0.3 },
    { side: 'ct', label: '3', x: 210, y: 140, vx: -0.25, vy: 0.35 },
    { side: 'ct', label: '4', x: 110, y: 225, vx: 0.4,  vy: 0.15 },
    { side: 't',  label: '1', x: 335, y: 85,  vx: -0.5, vy: 0.25 },
    { side: 't',  label: '2', x: 315, y: 150, vx: -0.45, vy: -0.2 },
    { side: 't',  label: '3', x: 255, y: 165, vx: -0.35, vy: 0.3 },
    { side: 't',  label: '4', x: 330, y: 225, vx: -0.4, vy: -0.25 }
  ];

  let radarTick = 0;

  // 3D POV Combat Simulation State for Matches #1, #2, #3
  const povEnemy = {
    xOffset: 80,
    targetX: -70,
    hp: 100,
    respawnTimer: 0,
    isFiring: false,
    recoilY: 0,
    ammo: 30,
    killsFeed: []
  };

  function drawGotvRadar() {
    const w = radarCanvas.width;
    const h = radarCanvas.height;
    rCtx.clearRect(0, 0, w, h);

    // Tactical grid
    rCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    rCtx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      rCtx.beginPath(); rCtx.moveTo(x, 0); rCtx.lineTo(x, h); rCtx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      rCtx.beginPath(); rCtx.moveTo(0, y); rCtx.lineTo(w, y); rCtx.stroke();
    }

    // Map corridors / zones
    rCtx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
    rCtx.fillStyle = 'rgba(30, 41, 59, 0.45)';
    rCtx.lineWidth = 1.5;

    rCtx.fillRect(60, 45, 95, 70);
    rCtx.strokeRect(60, 45, 95, 70);
    rCtx.fillRect(175, 115, 95, 65);
    rCtx.strokeRect(175, 115, 95, 65);
    rCtx.fillRect(65, 190, 90, 68);
    rCtx.strokeRect(65, 190, 90, 68);
    rCtx.fillRect(295, 65, 90, 170);
    rCtx.strokeRect(295, 65, 90, 170);

    rCtx.font = '700 10px Orbitron, sans-serif';
    rCtx.fillStyle = 'rgba(240, 168, 0, 0.75)';
    rCtx.fillText('A SITE', 86, 84);
    rCtx.fillText('B SITE', 88, 228);
    rCtx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    rCtx.fillText('MID', 210, 152);
    rCtx.fillText('T SPAWN', 314, 154);

    const smokeRadius = 22 + Math.sin(radarTick * 0.04) * 3;
    const sGrad = rCtx.createRadialGradient(220, 148, 4, 220, 148, smokeRadius);
    sGrad.addColorStop(0, 'rgba(203, 213, 225, 0.45)');
    sGrad.addColorStop(1, 'rgba(203, 213, 225, 0)');
    rCtx.fillStyle = sGrad;
    rCtx.beginPath();
    rCtx.arc(220, 148, smokeRadius, 0, Math.PI * 2);
    rCtx.fill();

    for (const d of radarDots) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 55 || d.x > w - 55) d.vx *= -1;
      if (d.y < 40 || d.y > h - 40) d.vy *= -1;

      rCtx.save();
      rCtx.beginPath();
      rCtx.arc(d.x, d.y, 7, 0, Math.PI * 2);
      rCtx.fillStyle = d.side === 'ct' ? '#3b82f6' : '#f0a800';
      rCtx.shadowColor = d.side === 'ct' ? '#3b82f6' : '#f0a800';
      rCtx.shadowBlur = 8;
      rCtx.fill();
      rCtx.fillStyle = '#07070b';
      rCtx.font = '800 8px Orbitron, sans-serif';
      rCtx.fillText(d.label, d.x - 3, d.y + 3);
      rCtx.restore();
    }

    if (radarTick % 28 < 6) {
      const ct = radarDots[radarTick % 4];
      const t = radarDots[4 + (radarTick % 4)];
      rCtx.strokeStyle = 'rgba(255, 215, 0, 0.55)';
      rCtx.lineWidth = 1.2;
      rCtx.beginPath();
      rCtx.moveTo(ct.x, ct.y);
      rCtx.lineTo(t.x, t.y);
      rCtx.stroke();
    }
  }

  function drawStreamPov() {
    if (!pCtx || currentArenaMode !== 'stream') return;
    const w = povCanvas.width;
    const h = povCanvas.height;
    pCtx.clearRect(0, 0, w, h);

    const ch = ARENA_CHANNELS[activeChannelIdx] || ARENA_CHANNELS[0];
    const players = getAllChannelPlayers(ch);
    const activePlr = players[streamSpecIdx] || players[0] || { name: 'bLitz', side: 'CT', wep: 'AK-47' };
    const enemies = players.filter(x => x.side !== activePlr.side);
    const enemyPlr = enemies[Math.floor(radarTick / 160) % Math.max(1, enemies.length)] || { name: 'Senzu', side: 'T' };

    // Map color theme (#01 de_mirage, #02 de_inferno, #03 de_anubis)
    const mapThemes = {
      de_mirage:  { sky1: '#1e3a5f', sky2: '#3b526b', wall: '#c29b61', wallDark: '#8c6b3f', floor: '#735736', accent: '#f0a800' },
      de_inferno: { sky1: '#1e293b', sky2: '#475569', wall: '#b45309', wallDark: '#7c2d12', floor: '#57534e', accent: '#ef4444' },
      de_anubis:  { sky1: '#0c4a6e', sky2: '#0284c7', wall: '#d97706', wallDark: '#92400e', floor: '#78350f', accent: '#fbbf24' }
    };
    const theme = mapThemes[ch.map] || mapThemes.de_mirage;

    // Update enemy movement & auto-aim combat loop
    if (povEnemy.respawnTimer > 0) {
      povEnemy.respawnTimer--;
      if (povEnemy.respawnTimer === 0) {
        povEnemy.hp = 100;
        povEnemy.xOffset = (Math.random() > 0.5 ? 1 : -1) * (65 + Math.random() * 55);
        povEnemy.targetX = (Math.random() - 0.5) * 40;
      }
    } else {
      povEnemy.xOffset += (povEnemy.targetX - povEnemy.xOffset) * 0.035;
    }

    // Camera pan tracking toward enemy
    const camPanX = povEnemy.respawnTimer === 0
      ? -povEnemy.xOffset * 0.88 + Math.sin(radarTick * 0.04) * 6
      : Math.sin(radarTick * 0.03) * 32;
    const camPanY = Math.cos(radarTick * 0.05) * 5;

    const cx = w / 2;
    const cy = h / 2;
    const horizonY = cy - 12 + camPanY;

    // 1. Sky ceiling
    const skyGrad = pCtx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, theme.sky1);
    skyGrad.addColorStop(1, theme.sky2);
    pCtx.fillStyle = skyGrad;
    pCtx.fillRect(0, 0, w, horizonY);

    // 2. 3D Floor perspective
    const floorGrad = pCtx.createLinearGradient(0, horizonY, 0, h);
    floorGrad.addColorStop(0, '#1e1b18');
    floorGrad.addColorStop(1, theme.floor);
    pCtx.fillStyle = floorGrad;
    pCtx.fillRect(0, horizonY, w, h - horizonY);

    // Perspective floor tiles
    pCtx.strokeStyle = 'rgba(255,255,255,0.07)';
    pCtx.lineWidth = 1;
    for (let i = -6; i <= 6; i++) {
      pCtx.beginPath();
      pCtx.moveTo(cx + camPanX + i * 25, horizonY);
      pCtx.lineTo(cx + camPanX * 2.2 + i * 135, h);
      pCtx.stroke();
    }
    for (let d = 1; d <= 5; d++) {
      const fy = horizonY + Math.pow(d / 5, 1.7) * (h - horizonY);
      pCtx.beginPath();
      pCtx.moveTo(0, fy);
      pCtx.lineTo(w, fy);
      pCtx.stroke();
    }

    // 3. 3D Corridor Left Wall, Right Wall & Back Bombsite Arch
    const backLeft = cx + camPanX - 155;
    const backRight = cx + camPanX + 155;
    const backTop = horizonY - 75;
    const backBot = horizonY + 38;

    // Left 3D wall
    pCtx.fillStyle = theme.wallDark;
    pCtx.beginPath();
    pCtx.moveTo(0, 0);
    pCtx.lineTo(backLeft, backTop);
    pCtx.lineTo(backLeft, backBot);
    pCtx.lineTo(0, h);
    pCtx.closePath();
    pCtx.fill();

    // Right 3D wall
    pCtx.beginPath();
    pCtx.moveTo(w, 0);
    pCtx.lineTo(backRight, backTop);
    pCtx.lineTo(backRight, backBot);
    pCtx.lineTo(w, h);
    pCtx.closePath();
    pCtx.fill();

    // Back Bombsite Wall & Cover Boxes
    pCtx.fillStyle = theme.wall;
    pCtx.fillRect(backLeft, backTop, backRight - backLeft, backBot - backTop);
    pCtx.strokeStyle = 'rgba(0,0,0,0.45)';
    pCtx.lineWidth = 2;
    pCtx.strokeRect(backLeft, backTop, backRight - backLeft, backBot - backTop);

    // Bombsite A Callout spray on wall
    pCtx.font = '900 18px Orbitron, sans-serif';
    pCtx.fillStyle = 'rgba(239, 68, 68, 0.55)';
    pCtx.fillText('[ A SITE ]', cx + camPanX - 48, backTop + 32);

    // Cover crate on left & right
    pCtx.fillStyle = '#44403c';
    pCtx.fillRect(backLeft + 18, backBot - 42, 52, 46);
    pCtx.strokeRect(backLeft + 18, backBot - 42, 52, 46);
    pCtx.fillRect(backRight - 72, backBot - 48, 54, 52);
    pCtx.strokeRect(backRight - 72, backBot - 48, 54, 52);

    // 4. ENEMY 3D MODEL PEEKING & FIREFIGHT
    const enemyScreenX = cx + camPanX + povEnemy.xOffset;
    const enemyScreenY = backBot + 8;
    const distToCrosshair = Math.abs(enemyScreenX - cx);

    povEnemy.isFiring = false;
    if (povEnemy.respawnTimer === 0) {
      // Draw Enemy Agent Model
      pCtx.save();
      pCtx.translate(enemyScreenX, enemyScreenY);

      // Legs
      pCtx.fillStyle = '#1e293b';
      pCtx.fillRect(-10, -24, 8, 24);
      pCtx.fillRect(2, -24, 8, 24);

      // Torso (T Gold/Brown or CT Blue)
      pCtx.fillStyle = enemyPlr.side === 'T' ? '#b45309' : '#1d4ed8';
      pCtx.fillRect(-13, -56, 26, 33);

      // Weapon across chest
      pCtx.fillStyle = '#09090b';
      pCtx.fillRect(-18, -44, 36, 6);

      // Head + Helmet
      pCtx.fillStyle = '#fde68a';
      pCtx.beginPath();
      pCtx.arc(0, -66, 9, 0, Math.PI * 2);
      pCtx.fill();
      pCtx.fillStyle = enemyPlr.side === 'T' ? '#991b1b' : '#1e3a8a';
      pCtx.beginPath();
      pCtx.arc(0, -68, 9.5, Math.PI, 0);
      pCtx.fill();

      // Enemy Name & HP Bar above head
      pCtx.font = '700 10px Rajdhani, sans-serif';
      pCtx.fillStyle = '#f87171';
      pCtx.fillText(enemyPlr.name, -18, -84);
      pCtx.fillStyle = 'rgba(0,0,0,0.7)';
      pCtx.fillRect(-18, -80, 36, 4);
      pCtx.fillStyle = '#ef4444';
      pCtx.fillRect(-18, -80, (povEnemy.hp / 100) * 36, 4);
      pCtx.restore();

      // Auto-Fire when crosshair is aligned with enemy!
      if (distToCrosshair < 22 && radarTick % 5 === 0) {
        povEnemy.isFiring = true;
        povEnemy.recoilY = 9;
        povEnemy.hp -= activePlr.wep === 'AWP' ? 100 : 34;
        povEnemy.ammo = povEnemy.ammo > 1 ? povEnemy.ammo - 1 : 30;
        const ammoEl = document.getElementById('streamAmmoVal');
        if (ammoEl) ammoEl.textContent = `${povEnemy.ammo} / 90`;

        // Blood/Spark hit at enemy head
        pCtx.fillStyle = '#ff2a2a';
        pCtx.beginPath();
        pCtx.arc(enemyScreenX, enemyScreenY - 64, 11, 0, Math.PI * 2);
        pCtx.fill();

        if (povEnemy.hp <= 0) {
          povEnemy.respawnTimer = 48;
          povEnemy.killsFeed.unshift({
            killer: activePlr.name,
            wep: activePlr.wep,
            victim: enemyPlr.name,
            alpha: 1.0
          });
          if (povEnemy.killsFeed.length > 3) povEnemy.killsFeed.pop();
        }
      }
    }

    povEnemy.recoilY *= 0.78;

    // 5. BULLET TRACER & MUZZLE FLASH WHEN FIRING
    if (povEnemy.isFiring) {
      // Tracer from gun barrel to crosshair
      pCtx.strokeStyle = 'rgba(255, 230, 128, 0.85)';
      pCtx.lineWidth = 2;
      pCtx.beginPath();
      pCtx.moveTo(w - 175, h - 90);
      pCtx.lineTo(cx, cy - 8);
      pCtx.stroke();

      // Muzzle flash glow
      const mf = pCtx.createRadialGradient(w - 185, h - 95, 2, w - 185, h - 95, 42);
      mf.addColorStop(0, '#ffffff');
      mf.addColorStop(0.4, '#fde047');
      mf.addColorStop(1, 'rgba(245, 158, 11, 0)');
      pCtx.fillStyle = mf;
      pCtx.beginPath();
      pCtx.arc(w - 185, h - 95, 42, 0, Math.PI * 2);
      pCtx.fill();
    }

    // 6. FIRST-PERSON 3D WEAPON VIEWMODEL IN GLOVED HANDS
    pCtx.save();
    const bobX = Math.sin(radarTick * 0.08) * 5;
    const bobY = Math.abs(Math.cos(radarTick * 0.08)) * 4 + povEnemy.recoilY;
    pCtx.translate(w - 205 + bobX, h - 105 + bobY);
    pCtx.rotate(-0.22 + povEnemy.recoilY * 0.012);

    // Barrel extending forward-left toward center
    pCtx.fillStyle = '#334155';
    pCtx.fillRect(-75, 16, 85, 8);
    // Receiver body with skin gradient
    const gunGrad = pCtx.createLinearGradient(0, 10, 170, 44);
    gunGrad.addColorStop(0, activePlr.wep === 'AWP' ? '#eab308' : activePlr.wep === 'M4A1-S' ? '#f8fafc' : '#ec4899');
    gunGrad.addColorStop(1, '#1e1b4b');
    pCtx.fillStyle = gunGrad;
    pCtx.fillRect(0, 12, 165, 26);
    pCtx.strokeStyle = '#ffd700';
    pCtx.lineWidth = 1.5;
    pCtx.strokeRect(0, 12, 165, 26);

    // Scope if AWP
    if (activePlr.wep === 'AWP') {
      pCtx.fillStyle = '#0f172a';
      pCtx.fillRect(25, -4, 78, 12);
    }

    // Sport Gloves holding weapon
    pCtx.fillStyle = '#7c3aed';
    pCtx.beginPath();
    pCtx.arc(15, 38, 16, 0, Math.PI * 2);
    pCtx.arc(105, 44, 18, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.restore();

    // 7. CENTER CS2 CROSSHAIR + RED HITMARKER X
    const chGap = 4 + povEnemy.recoilY * 0.7;
    pCtx.strokeStyle = '#00ff66';
    pCtx.lineWidth = 2;
    pCtx.beginPath();
    pCtx.moveTo(cx - 12 - chGap, cy); pCtx.lineTo(cx - chGap, cy);
    pCtx.moveTo(cx + chGap, cy);      pCtx.lineTo(cx + 12 + chGap, cy);
    pCtx.moveTo(cx, cy - 12 - chGap); pCtx.lineTo(cx, cy - chGap);
    pCtx.moveTo(cx, cy + chGap);      pCtx.lineTo(cx, cy + 12 + chGap);
    pCtx.stroke();

    if (povEnemy.isFiring || povEnemy.respawnTimer > 38) {
      pCtx.strokeStyle = '#ff2a2a';
      pCtx.lineWidth = 2;
      pCtx.beginPath();
      pCtx.moveTo(cx - 8, cy - 8); pCtx.lineTo(cx - 3, cy - 3);
      pCtx.moveTo(cx + 8, cy - 8); pCtx.lineTo(cx + 3, cy - 3);
      pCtx.moveTo(cx - 8, cy + 8); pCtx.lineTo(cx - 3, cy + 3);
      pCtx.moveTo(cx + 8, cy + 8); pCtx.lineTo(cx + 3, cy + 3);
      pCtx.stroke();
    }

    // 8. LIVE POV KILLFEED OVERLAY INSIDE 3D SCREEN
    for (let i = povEnemy.killsFeed.length - 1; i >= 0; i--) {
      const kf = povEnemy.killsFeed[i];
      kf.alpha -= 0.005;
      if (kf.alpha <= 0) {
        povEnemy.killsFeed.splice(i, 1);
        continue;
      }
      pCtx.save();
      pCtx.globalAlpha = Math.min(1, kf.alpha);
      pCtx.fillStyle = 'rgba(7, 9, 16, 0.82)';
      pCtx.strokeStyle = 'rgba(240, 168, 0, 0.55)';
      pCtx.lineWidth = 1;
      const ky = 52 + i * 26;
      pCtx.fillRect(w - 245, ky, 228, 22);
      pCtx.strokeRect(w - 245, ky, 228, 22);
      pCtx.font = '700 11px Rajdhani, sans-serif';
      pCtx.fillStyle = '#60a5fa';
      pCtx.fillText(`${kf.killer} [${kf.wep}] 💥 HS ${kf.victim}`, w - 236, ky + 15);
      pCtx.restore();
    }
  }

  function loopArena() {
    radarTick++;
    if (currentArenaMode === 'gotv') {
      drawGotvRadar();
    } else if (currentArenaMode === 'stream') {
      drawStreamPov();
    }
    requestAnimationFrame(loopArena);
  }

  requestAnimationFrame(loopArena);
}

const GOTV_CASTER_LINES = [
  '🎙️ <strong>GOTV:</strong> bLitz [AK-47]-аар A-Site дээр 2 тоглогч унагалаа!',
  '🎙️ <strong>GOTV:</strong> 910 Mid дээр AWP-аар эхний фраг (Opening Kill) авлаа!',
  '🎙️ <strong>GOTV:</strong> Senzu B-Apps руу Flashbang шидээд дайрч орлоо!',
  '🎙️ <strong>GOTV:</strong> Techno4K 1v2 Clutch амжилттай хийж раунд авлаа!'
];

document.addEventListener('DOMContentLoaded', () => {
  renderArenaChannels();
  renderGotvView();
  renderSponsorStage();
  renderPovPlayerStrip();
  initArenaCanvases();

  // Caster ticker & round clock
  let casterIdx = 0;
  let roundSec = 74;
  setInterval(() => {
    roundSec = roundSec > 12 ? roundSec - 1 : 115;
    const min = Math.floor(roundSec / 60);
    const sec = String(roundSec % 60).padStart(2, '0');
    const timerEl = document.getElementById('gotvTimerText');
    if (timerEl) timerEl.textContent = `0${min}:${sec}`;

    if (roundSec % 8 === 0) {
      casterIdx = (casterIdx + 1) % GOTV_CASTER_LINES.length;
      const ticker = document.getElementById('gotvEventTicker');
      if (ticker) ticker.innerHTML = GOTV_CASTER_LINES[casterIdx];
    }
  }, 1000);

  // Auto-Rotate between Live Match and Sponsor Ad every 24s when Auto is ON
  setInterval(() => {
    if (!arenaAutoRotate) return;
    if (currentArenaMode === 'gotv') {
      activeSponsorIdx = (activeSponsorIdx + 1) % ARENA_SPONSORS.length;
      setArenaMode('sponsor');
      setTimeout(() => {
        if (arenaAutoRotate && currentArenaMode === 'sponsor') {
          setArenaMode('gotv');
        }
      }, 7000);
    }
  }, 24000);
});

// ===================== CS2 CASE OPENING ROULETTE ENGINE =====================

const CS2_CASES = [
  {
    id: 'elo_50k',
    name: '50,000 ELO MILESTONE CASE',
    sub: '+50,000 ELO хүрэх бүрд 1 удаа ҮНЭГҮЙ задлах эрх нэмэгдэнэ',
    emoji: '🏆',
    price: 0,
    isEloCase: true,
    badge: '50K ELO REWARD',
    accent: '#22c55e',
    items: [
      { weaponId: 'glock', weaponName: 'Glock-18', skinName: 'Water Elemental', emoji: '💧', rarity: 'restricted', color: '#8847ff', sellPrice: 350, weight: 28, color1: '#00bcd4', color2: '#01579b', float: 0.06, wear: 'Minimal Wear' },
      { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Phantom Disruptor', emoji: '👻', rarity: 'restricted', color: '#8847ff', sellPrice: 550, weight: 22, color1: '#7ecef5', color2: '#1a2a35', float: 0.08, wear: 'Minimal Wear' },
      { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Redline', emoji: '🟣', rarity: 'classified', color: '#d32ce6', sellPrice: 850, weight: 18, color1: '#c0392b', color2: '#1a0808', float: 0.15, wear: 'Field-Tested' },
      { weaponId: 'deagle', weaponName: 'Desert Eagle', skinName: 'Blaze', emoji: '🔥', rarity: 'covert', color: '#eb4b4b', sellPrice: 1500, weight: 14, color1: '#ff8c00', color2: '#1a0500', float: 0.01, wear: 'Factory New' },
      { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Vulcan', emoji: '⚡', rarity: 'covert', color: '#eb4b4b', sellPrice: 2200, weight: 10, color1: '#e0e0e0', color2: '#2c2c2c', float: 0.04, wear: 'Factory New' },
      { weaponId: 'karambit', weaponName: '★ Karambit', skinName: 'Case Hardened', emoji: '🗡️', rarity: 'gold', color: '#ffd700', sellPrice: 4500, weight: 8, color1: '#4a90d9', color2: '#1e3a5f', float: 0.08, wear: 'Minimal Wear' }
    ]
  },
  {
    id: 'mongolz_starter',
    name: 'MONGOLZ STARTER CASE',
    sub: 'AK-47, M4A4 болон Desert Eagle-ийн шилдэг скинүүд',
    emoji: '📦',
    price: 500,
    badge: 'POPULAR',
    accent: '#3b82f6',
    items: [
      { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Jaguar', emoji: '🐆', rarity: 'restricted', color: '#8847ff', sellPrice: 350, weight: 28, color1: '#f5a623', color2: '#3d2000', float: 0.05, wear: 'Factory New' },
      { weaponId: 'm4a4', weaponName: 'M4A4', skinName: 'In Living Color', emoji: '🌈', rarity: 'restricted', color: '#8847ff', sellPrice: 450, weight: 24, color1: '#ff4499', color2: '#00aaff', float: 0.08, wear: 'Minimal Wear' },
      { weaponId: 'usps', weaponName: 'USP-S', skinName: 'Neo-Noir', emoji: '🌙', rarity: 'classified', color: '#d32ce6', sellPrice: 650, weight: 20, color1: '#9b2ef4', color2: '#1a0a2e', float: 0.07, wear: 'Minimal Wear' },
      { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Bloodsport', emoji: '💉', rarity: 'classified', color: '#d32ce6', sellPrice: 900, weight: 15, color1: '#cc0000', color2: '#111111', float: 0.06, wear: 'Factory New' },
      { weaponId: 'm4a1s', weaponName: 'M4A1-S', skinName: 'Printstream', emoji: '🖨️', rarity: 'covert', color: '#eb4b4b', sellPrice: 1600, weight: 9, color1: '#ffffff', color2: '#1a1a2e', float: 0.01, wear: 'Factory New' },
      { weaponId: 'butterfly', weaponName: '★ Butterfly', skinName: 'Tiger Tooth', emoji: '🐯', rarity: 'gold', color: '#ffd700', sellPrice: 4200, weight: 4, color1: '#ff8c00', color2: '#111111', float: 0.008, wear: 'Factory New' }
    ]
  },
  {
    id: 'gdg_pro',
    name: 'GDG PRO LEGENDS CASE',
    sub: 'Fire Serpent, Wild Lotus, Howl болон VIP эрх унах магадлалтай',
    emoji: '🔥',
    price: 1500,
    badge: 'HIGH TIER',
    accent: '#a855f7',
    items: [
      { weaponId: 'awp', weaponName: 'AWP', skinName: 'Asiimov', emoji: '🤖', rarity: 'classified', color: '#d32ce6', sellPrice: 1100, weight: 28, color1: '#ff8c00', color2: '#111111', float: 0.18, wear: 'Field-Tested' },
      { weaponId: 'usps', weaponName: 'USP-S', skinName: 'Kill Confirmed', emoji: '💀', rarity: 'covert', color: '#eb4b4b', sellPrice: 1450, weight: 24, color1: '#b8860b', color2: '#1a1000', float: 0.02, wear: 'Factory New' },
      { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Fire Serpent', emoji: '🔴', rarity: 'covert', color: '#eb4b4b', sellPrice: 2100, weight: 18, color1: '#eb4b4b', color2: '#7a1a1a', float: 0.07, wear: 'Minimal Wear' },
      { weaponId: 'ak47', weaponName: 'AK-47', skinName: 'Wild Lotus', emoji: '🌸', rarity: 'covert', color: '#eb4b4b', sellPrice: 2800, weight: 14, color1: '#e879a0', color2: '#2d0a1f', float: 0.02, wear: 'Factory New' },
      { weaponId: 'm4a4', weaponName: 'M4A4', skinName: 'Howl (Contraband)', emoji: '🐺', rarity: 'covert', color: '#eb4b4b', sellPrice: 3600, weight: 10, color1: '#cc2200', color2: '#330800', float: 0.03, wear: 'Factory New' },
      { weaponId: 'karambit', weaponName: '★ Karambit', skinName: 'Gamma Doppler', emoji: '💎', rarity: 'gold', color: '#ffd700', sellPrice: 6500, weight: 6, color1: '#2ecc71', color2: '#0a1a0a', float: 0.008, wear: 'Factory New' }
    ]
  },
  {
    id: 'golden_knife',
    name: '★ GOLDEN KNIFE & LORE CASE',
    sub: 'Дэлхийн хамгийн үнэтэй Хутга, Бээлий болон AWP Dragon Lore',
    emoji: '👑',
    price: 3500,
    badge: '★ JACKPOT',
    accent: '#ffd700',
    items: [
      { weaponId: 'awp', weaponName: 'AWP', skinName: 'Gungnir', emoji: '⚡', rarity: 'covert', color: '#eb4b4b', sellPrice: 2600, weight: 26, color1: '#5b9bd5', color2: '#1a2d44', float: 0.006, wear: 'Factory New' },
      { weaponId: 'sport', weaponName: '★ Sport Gloves', skinName: "Pandora's Box", emoji: '🧤', rarity: 'gold', color: '#ffd700', sellPrice: 3900, weight: 22, color1: '#9b2ef4', color2: '#2d0040', float: 0.06, wear: 'Minimal Wear' },
      { weaponId: 'moto', weaponName: '★ Moto Gloves', skinName: 'Spearmint', emoji: '🌿', rarity: 'gold', color: '#ffd700', sellPrice: 4400, weight: 18, color1: '#4caf50', color2: '#0a2a0a', float: 0.06, wear: 'Minimal Wear' },
      { weaponId: 'butterfly', weaponName: '★ Butterfly', skinName: 'Fade 100%', emoji: '🌈', rarity: 'gold', color: '#ffd700', sellPrice: 5800, weight: 15, color1: '#ff6600', color2: '#9b2ef4', float: 0.004, wear: 'Factory New' },
      { weaponId: 'karambit', weaponName: '★ Karambit', skinName: 'Marble Fade', emoji: '🌊', rarity: 'gold', color: '#ffd700', sellPrice: 6900, weight: 11, color1: '#ff4400', color2: '#0044cc', float: 0.005, wear: 'Factory New' },
      { weaponId: 'awp', weaponName: '★ AWP', skinName: 'Dragon Lore (FN)', emoji: '🐉', rarity: 'gold', color: '#ffd700', sellPrice: 12000, weight: 8, color1: '#c8860a', color2: '#5c3800', float: 0.007, wear: 'Factory New' }
    ]
  }
];

const ELO_MILESTONE_STEP = 50000;
let userTotalElo = 37500;
let eloMilestonesClaimed = 0;
let eloFreeCaseKeys = 0;

let selectedCaseIdx = 0;
let isCaseSpinning = false;
let caseFastMode = false;
let lastWonCaseItem = null;
const caseWonHistory = [];

function updateEloMilestoneUI() {
  // Check if user crossed any new 50,000 ELO milestones
  const totalMilestonesReached = Math.floor(userTotalElo / ELO_MILESTONE_STEP);
  if (totalMilestonesReached > eloMilestonesClaimed) {
    const newlyEarnedKeys = totalMilestonesReached - eloMilestonesClaimed;
    eloMilestonesClaimed = totalMilestonesReached;
    eloFreeCaseKeys += newlyEarnedKeys;

    showToast('gold', '🏆', `${formatNum(totalMilestonesReached * ELO_MILESTONE_STEP)} ELO хүрлээ!`,
      `+${newlyEarnedKeys}ш Үнэгүй 50K ELO Кейс задлах эрх нэмэгдлээ! (Нийт: ${eloFreeCaseKeys} эрх)`, 4500);
  }

  const nextMilestone = (Math.floor(userTotalElo / ELO_MILESTONE_STEP) + 1) * ELO_MILESTONE_STEP;
  const currentStepProgress = userTotalElo % ELO_MILESTONE_STEP;
  const pct = Math.min(100, Math.round((currentStepProgress / ELO_MILESTONE_STEP) * 100));

  const eloTxt = document.getElementById('userTotalEloText');
  const nextTxt = document.getElementById('nextEloMilestoneText');
  const fillEl = document.getElementById('eloMilestoneFill');
  const keysEl = document.getElementById('eloFreeKeysCount');

  if (eloTxt) eloTxt.textContent = formatNum(userTotalElo);
  if (nextTxt) nextTxt.textContent = `${formatNum(nextMilestone)} ELO`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (keysEl) keysEl.textContent = eloFreeCaseKeys;

  renderCaseSelector();
  const activeCase = CS2_CASES[selectedCaseIdx];
  if (activeCase && activeCase.isEloCase) {
    const costEl = document.getElementById('activeCaseCostText');
    if (costEl) {
      costEl.textContent = eloFreeCaseKeys > 0
        ? `ҮНЭГҮЙ · ${eloFreeCaseKeys} ЭРХ БАЙНА`
        : `${formatNum(nextMilestone - userTotalElo)} ELO ДУТУУ`;
    }
  }
}

function addSimulatedElo(amount = 12500) {
  userTotalElo += amount;
  updateEloMilestoneUI();
}

function playCaseTickSound(pitch = 680) {
  if (!cs2SfxEnabled) return;
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.6, now + 0.035);
    gain.gain.setValueAtTime(0.11, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.042);
  } catch (e) {}
}

function playCaseWinSound(isGold) {
  if (!cs2SfxEnabled) return;
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = isGold ? [523.25, 659.25, 783.99, 1046.5] : [440, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = isGold ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      gain.gain.setValueAtTime(0.14, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.36);
    });
  } catch (e) {}
}

function renderCaseSelector() {
  const grid = document.getElementById('caseSelectorGrid');
  if (!grid) return;
  grid.innerHTML = CS2_CASES.map((c, idx) => {
    let priceLabel = `${formatNum(c.price)} MZ`;
    if (c.isEloCase) {
      priceLabel = eloFreeCaseKeys > 0
        ? `🔑 ҮНЭГҮЙ (${eloFreeCaseKeys} ЭРХ)`
        : `50,000 ELO ТУТАМД 1 ЭРХ`;
    }
    return `
      <div class="case-box-card ${idx === selectedCaseIdx ? 'active' : ''}" style="--case-accent:${c.accent}" onclick="selectCaseTier(${idx})">
        <span class="cbc-badge">${c.badge}</span>
        <div class="cbc-emoji">${c.emoji}</div>
        <div class="cbc-title">${c.name}</div>
        <div class="cbc-sub">${c.sub}</div>
        <div class="cbc-price">${priceLabel}</div>
      </div>
    `;
  }).join('');
}

function selectCaseTier(idx) {
  if (isCaseSpinning) return;
  selectedCaseIdx = idx;
  const c = CS2_CASES[idx];
  renderCaseSelector();

  document.getElementById('activeCaseEmoji').textContent = c.emoji;
  document.getElementById('activeCaseName').textContent = c.name;
  document.getElementById('activeCaseSub').textContent = c.sub;

  const nextMilestone = (Math.floor(userTotalElo / ELO_MILESTONE_STEP) + 1) * ELO_MILESTONE_STEP;
  const costTxt = c.isEloCase
    ? (eloFreeCaseKeys > 0 ? `ҮНЭГҮЙ · ${eloFreeCaseKeys} ЭРХ БАЙНА` : `${formatNum(nextMilestone - userTotalElo)} ELO ДУТУУ`)
    : `${formatNum(c.price)} MZ`;
  document.getElementById('activeCaseCostText').textContent = costTxt;

  const winBanner = document.getElementById('caseWinBanner');
  if (winBanner) winBanner.style.display = 'none';

  renderCaseContents(c);
  populateInitialRouletteStrip(c);
}

function renderCaseContents(c) {
  const grid = document.getElementById('caseContentsGrid');
  if (!grid) return;
  grid.innerHTML = c.items.map(item => `
    <div class="cc-item" style="--rl-color:${item.color}">
      <div class="cc-item-emoji">${item.emoji}</div>
      <div class="cc-item-wep">${item.weaponName}</div>
      <div class="cc-item-skin">${item.skinName}</div>
      <div class="cc-item-val">${formatNum(item.sellPrice)} MZ</div>
    </div>
  `).join('');
}

function pickWeightedCaseItem(items) {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let r = Math.random() * total;
  for (const item of items) {
    if (r < item.weight) return item;
    r -= item.weight;
  }
  return items[0];
}

function populateInitialRouletteStrip(c) {
  const track = document.getElementById('rouletteTrack');
  if (!track) return;
  track.style.transition = 'none';
  track.style.transform = 'translate3d(0px, 0, 0)';

  const cards = [];
  for (let i = 0; i < 20; i++) {
    const it = pickWeightedCaseItem(c.items);
    cards.push(`
      <div class="rl-card" style="--rl-color:${it.color}">
        <div class="rl-emoji">${it.emoji}</div>
        <div class="rl-weapon">${it.weaponName}</div>
        <div class="rl-skin">${it.skinName}</div>
      </div>
    `);
  }
  track.innerHTML = cards.join('');
}

function toggleCaseFastMode() {
  caseFastMode = !caseFastMode;
  const btn = document.getElementById('caseFastBtn');
  if (btn) {
    btn.classList.toggle('active', caseFastMode);
    btn.textContent = caseFastMode ? '⚡ Хурдан эргүүлэх: ON' : '⚡ Хурдан эргүүлэх: OFF';
  }
}

function spinCaseRoulette() {
  if (isCaseSpinning) return;
  const c = CS2_CASES[selectedCaseIdx];
  if (!c) return;

  if (c.isEloCase) {
    if (eloFreeCaseKeys <= 0) {
      const nextMilestone = (Math.floor(userTotalElo / ELO_MILESTONE_STEP) + 1) * ELO_MILESTONE_STEP;
      const needed = nextMilestone - userTotalElo;
      showToast('info', '🏆', '50,000 ELO Кейс эрх одоогоор 0 байна!',
        `Дараагийн үнэгүй кейс задлахад ${formatNum(needed)} ELO дутуу байна. "+12,500 ELO Нэмэх" товч дээр дарж туршаарай!`, 4200);
      return;
    }
    eloFreeCaseKeys -= 1;
    updateEloMilestoneUI();
  } else {
    if (mzBalance < c.price) {
      showToast('info', '🪙', 'MZ Coin хүрэлцэхгүй байна!', `${c.name} задлахад ${formatNum(c.price)} MZ шаардлагатай.`, 3500);
      openTopupModal();
      return;
    }
    mzBalance -= c.price;
    updateMzWalletUI();
  }
  renderCaseSelector();

  isCaseSpinning = true;
  const btn = document.getElementById('btnOpenCase');
  if (btn) btn.disabled = true;

  const winBanner = document.getElementById('caseWinBanner');
  if (winBanner) winBanner.style.display = 'none';

  // Build 55 cards strip; winning item sits at index 44
  const WIN_INDEX = 44;
  const TOTAL_CARDS = 54;
  const winningItem = pickWeightedCaseItem(c.items);
  lastWonCaseItem = { ...winningItem, sold: false };

  const track = document.getElementById('rouletteTrack');
  const viewport = document.getElementById('rouletteViewport');
  if (!track || !viewport) return;

  track.style.transition = 'none';
  track.style.transform = 'translate3d(0px, 0, 0)';

  const htmlCards = [];
  for (let i = 0; i < TOTAL_CARDS; i++) {
    const it = i === WIN_INDEX ? winningItem : pickWeightedCaseItem(c.items);
    htmlCards.push(`
      <div class="rl-card" style="--rl-color:${it.color}">
        <div class="rl-emoji">${it.emoji}</div>
        <div class="rl-weapon">${it.weaponName}</div>
        <div class="rl-skin">${it.skinName}</div>
      </div>
    `);
  }
  track.innerHTML = htmlCards.join('');

  // Force reflow before starting CSS transition
  void track.offsetWidth;

  const CARD_WIDTH = 136;
  const CARD_GAP = 10;
  const STEP = CARD_WIDTH + CARD_GAP; // 146px per card
  const viewportCenter = viewport.clientWidth / 2;
  // Randomize landing offset inside the winning card so it feels like real CS2
  const jitter = (Math.random() - 0.5) * 76;
  const targetX = -(16 + WIN_INDEX * STEP + CARD_WIDTH / 2 - viewportCenter + jitter);

  const spinDurationSec = caseFastMode ? 1.6 : 4.6;
  track.style.transition = `transform ${spinDurationSec}s cubic-bezier(0.12, 0.82, 0.18, 1)`;
  track.style.transform = `translate3d(${targetX.toFixed(1)}px, 0, 0)`;

  // Schedule realistic CS2 tick sounds as cards pass center pointer
  const totalTicks = caseFastMode ? 14 : 34;
  for (let t = 0; t < totalTicks; t++) {
    const progress = t / totalTicks;
    const delayMs = Math.pow(progress, 2.25) * (spinDurationSec * 960);
    setTimeout(() => {
      if (isCaseSpinning) playCaseTickSound(620 + (t % 5) * 35);
    }, delayMs);
  }

  setTimeout(() => {
    isCaseSpinning = false;
    if (btn) btn.disabled = false;

    const nextMilestone = (Math.floor(userTotalElo / ELO_MILESTONE_STEP) + 1) * ELO_MILESTONE_STEP;
    const costTxt = c.isEloCase
      ? (eloFreeCaseKeys > 0 ? `ҮНЭГҮЙ · ${eloFreeCaseKeys} ЭРХ БАЙНА` : `${formatNum(nextMilestone - userTotalElo)} ELO ДУТУУ`)
      : `${formatNum(c.price)} MZ`;
    document.getElementById('activeCaseCostText').textContent = costTxt;

    showCaseWinResult(winningItem);
  }, spinDurationSec * 1000 + 80);
}

function showCaseWinResult(item) {
  const isGold = item.rarity === 'gold' || item.rarity === 'covert';
  playCaseWinSound(isGold);

  const banner = document.getElementById('caseWinBanner');
  if (banner) {
    banner.style.display = 'flex';
    banner.style.borderColor = item.color;
  }

  document.getElementById('wonItemEmoji').textContent = item.emoji;
  document.getElementById('wonItemEmoji').style.borderColor = item.color;

  const tagEl = document.getElementById('wonItemRarityTag');
  if (tagEl) {
    tagEl.textContent = item.rarity === 'gold' ? '★ RARE SPECIAL ITEM (GOLD)' : `${item.rarity.toUpperCase()} GRADE SKIN`;
    tagEl.style.color = item.color;
  }

  document.getElementById('wonItemFullName').textContent = `${item.weaponName} | ${item.skinName}`;
  document.getElementById('wonItemSellPrice').textContent = `${formatNum(item.sellPrice)} MZ`;
  document.getElementById('wonItemSellBtnVal').textContent = formatNum(item.sellPrice);

  const sellBtn = document.getElementById('btnSellWonItem');
  if (sellBtn) {
    sellBtn.disabled = false;
    sellBtn.innerHTML = `🪙 Зарах (+<span id="wonItemSellBtnVal">${formatNum(item.sellPrice)}</span> MZ)`;
  }

  caseWonHistory.unshift(item);
  renderCaseWonHistory();

  const playerName = (window.steamUser && window.steamUser.name) ? window.steamUser.name : 'Тоглогч';
  if (typeof pushLiveDrop === 'function') {
    pushLiveDrop(`${item.emoji} <strong>${playerName}</strong> кейс задлаад <strong style="color:${item.color}">${item.weaponName} | ${item.skinName}</strong> хожлоо!`);
  }

  showToast(isGold ? 'gold' : 'success', item.emoji,
    `Кейснээс уналаа: ${item.weaponName} | ${item.skinName}!`,
    `Үнэлгээ: ${formatNum(item.sellPrice)} MZ Coin`, 4200);
}

function equipWonCaseItem() {
  if (!lastWonCaseItem) return;
  const it = lastWonCaseItem;
  const cleanWeaponName = it.weaponName.replace('★ ', '');

  sc_equipped[it.weaponId] = {
    name: it.skinName,
    rarity: it.rarity === 'gold' ? 'covert' : it.rarity,
    emoji: it.emoji,
    color1: it.color1 || '#f0a800',
    color2: it.color2 || '#1a1a2e',
    float: it.float || 0.01,
    wear: it.wear || 'Factory New',
    weaponName: cleanWeaponName,
    weaponId: it.weaponId
  };

  renderWeaponList();
  renderSkinsGrid();
  updatePreview();
  renderEquippedStrip();

  showToast('success', '⚡', `${cleanWeaponName} | ${it.skinName} зүүгдлээ!`, 'Skin Changer-т автоматаар тохируулагдлаа.', 3200);
}

function sellWonCaseItem() {
  if (!lastWonCaseItem || lastWonCaseItem.sold) return;
  lastWonCaseItem.sold = true;
  mzBalance += lastWonCaseItem.sellPrice;
  updateMzWalletUI();

  const sellBtn = document.getElementById('btnSellWonItem');
  if (sellBtn) {
    sellBtn.disabled = true;
    sellBtn.textContent = `✓ Зарагдсан (+${formatNum(lastWonCaseItem.sellPrice)} MZ)`;
  }

  showToast('gold', '🪙', `+${formatNum(lastWonCaseItem.sellPrice)} MZ Coin нэмэгдлээ!`,
    `${lastWonCaseItem.weaponName} | ${lastWonCaseItem.skinName} амжилттай зарагдлаа.`, 3200);
}

function renderCaseWonHistory() {
  const list = document.getElementById('caseWonHistoryList');
  if (!list) return;
  if (caseWonHistory.length === 0) {
    list.innerHTML = `<div style="color:var(--text-muted);font-size:0.85rem;font-family:var(--font-heading);padding:6px">Одоогоор кейс задлаагүй байна. 50,000 ELO хүрэх бүрдээ эсвэл MZ Coin-оор кейс задлаарай!</div>`;
    return;
  }
  list.innerHTML = caseWonHistory.slice(0, 12).map(it => `
    <div class="eq-slot" style="border-bottom:3px solid ${it.color}">
      <div class="eq-slot-emoji">${it.emoji}</div>
      <div class="eq-slot-weapon">${it.weaponName}</div>
      <div class="eq-slot-skin" style="color:${it.color}">${it.skinName}</div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    updateEloMilestoneUI();
    renderCaseSelector();
    selectCaseTier(0);
    renderCaseWonHistory();
  }, 140);
});
