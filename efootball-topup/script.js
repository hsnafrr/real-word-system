/* ============================
   script.js - eFootball Top Up
   ============================ */

// State
let selectedPackage = null;
let userId = '';
let countdownInterval = null;

// Messi SVG character
const MESSI_SVG = `<svg viewBox="0 0 240 380" xmlns="http://www.w3.org/2000/svg" width="240" height="380" class="messi-img">
  <defs>
    <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e6fff"/>
      <stop offset="100%" stop-color="#0a3fa0"/>
    </radialGradient>
    <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#f9d5aa"/>
      <stop offset="100%" stop-color="#e8a87c"/>
    </radialGradient>
  </defs>
  <!-- Shadow -->
  <ellipse cx="120" cy="370" rx="65" ry="10" fill="rgba(0,60,200,0.25)"/>
  <!-- Legs -->
  <rect x="78" y="248" width="36" height="70" rx="10" fill="#0d3fa8"/>
  <rect x="122" y="248" width="36" height="70" rx="10" fill="#0d3fa8"/>
  <!-- Socks -->
  <rect x="78" y="305" width="36" height="26" rx="6" fill="white"/>
  <rect x="122" y="305" width="36" height="26" rx="6" fill="white"/>
  <!-- Shoes -->
  <ellipse cx="96" cy="330" rx="22" ry="9" fill="#111"/>
  <ellipse cx="140" cy="330" rx="22" ry="9" fill="#111"/>
  <!-- Body/Jersey -->
  <path d="M60 155 Q55 200 65 248 L175 248 Q185 200 180 155 Z" fill="url(#bodyGrad)"/>
  <!-- White stripes on jersey -->
  <path d="M105 155 L103 248 L115 248 L117 155 Z" fill="white" opacity="0.15"/>
  <path d="M120 155 L120 248 L132 248 L132 155 Z" fill="white" opacity="0.1"/>
  <!-- Arms -->
  <path d="M62 160 Q32 175 28 205 Q34 215 44 212 Q52 185 68 172 Z" fill="url(#bodyGrad)"/>
  <path d="M178 160 Q208 175 212 205 Q206 215 196 212 Q188 185 172 172 Z" fill="url(#bodyGrad)"/>
  <!-- Hands -->
  <ellipse cx="36" cy="215" rx="12" ry="10" fill="url(#skinGrad)"/>
  <ellipse cx="204" cy="215" rx="12" ry="10" fill="url(#skinGrad)"/>
  <!-- Neck -->
  <rect x="108" y="115" width="24" height="28" rx="8" fill="url(#skinGrad)"/>
  <!-- Head -->
  <ellipse cx="120" cy="92" rx="46" ry="50" fill="url(#skinGrad)"/>
  <!-- Hair - dark brown wavy -->
  <path d="M74 82 Q76 50 120 44 Q164 50 166 82 Q158 62 120 58 Q82 62 74 82Z" fill="#2d1a0a"/>
  <path d="M74 82 Q70 72 76 64 Q78 78 82 80Z" fill="#2d1a0a"/>
  <path d="M166 82 Q170 72 164 64 Q162 78 158 80Z" fill="#2d1a0a"/>
  <!-- Beard stubble -->
  <ellipse cx="120" cy="128" rx="24" ry="8" fill="#c8956c" opacity="0.5"/>
  <!-- Eyes -->
  <ellipse cx="103" cy="92" rx="8" ry="9" fill="white"/>
  <ellipse cx="137" cy="92" rx="8" ry="9" fill="white"/>
  <circle cx="105" cy="93" r="5" fill="#2d1a0a"/>
  <circle cx="139" cy="93" r="5" fill="#2d1a0a"/>
  <circle cx="106" cy="91" r="2" fill="white"/>
  <circle cx="140" cy="91" r="2" fill="white"/>
  <!-- Eyebrows -->
  <path d="M93 82 Q103 78 113 81" stroke="#2d1a0a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M127 81 Q137 78 147 82" stroke="#2d1a0a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Nose -->
  <path d="M118 98 Q115 108 113 112 Q120 116 127 112 Q125 108 122 98Z" fill="#d4956a" opacity="0.7"/>
  <!-- Smile -->
  <path d="M104 122 Q120 134 136 122" stroke="#c0735a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Number 10 -->
  <text x="120" y="215" text-anchor="middle" fill="white" font-size="30" font-weight="900" font-family="Arial" opacity="0.9">10</text>
  <!-- Gold star -->
  <polygon points="120,162 123,171 133,171 125,177 128,186 120,180 112,186 115,177 107,171 117,171" fill="#fbbf24"/>
  <!-- Ball -->
  <circle cx="175" cy="310" r="28" fill="white" stroke="#ddd" stroke-width="1"/>
  <path d="M175 284 L165 300 L180 306 Z" fill="#374151"/>
  <path d="M188 290 L180 306 L196 304 Z" fill="#374151"/>
  <path d="M161 306 L165 298 L152 302 Z" fill="#374151"/>
  <path d="M163 316 L165 300 L152 302 Z" fill="#374151"/>
  <path d="M190 316 L196 304 L188 318 Z" fill="#374151"/>
  <!-- Argentina flag on arm -->
  <rect x="28" y="203" width="16" height="12" rx="2" fill="#74acdf"/>
  <rect x="28" y="207" width="16" height="4" fill="white"/>
</svg>`;

// QRIS display - styled card matching uploaded QRIS
function injectQRIS() {
  const el = document.getElementById('qris-display');
  if (!el) return;
  el.innerHTML = `
    <div style="width:300px;background:white;border-radius:12px;padding:16px;font-family:Arial,sans-serif;color:#111;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <div style="font-size:11px;font-weight:800;letter-spacing:0.05em;color:#e11d48;">
          <span style="font-size:16px;font-weight:900;border:2px solid #e11d48;padding:2px 6px;border-radius:4px;margin-right:4px;letter-spacing:0.1em">QRIS</span>
          <span style="font-size:9px;display:block;color:#555;font-weight:600;margin-top:2px;">QR Code Standar Pembayaran Nasional</span>
        </div>
        <div style="background:#e11d48;color:white;font-size:10px;font-weight:800;padding:4px 8px;border-radius:4px;letter-spacing:0.08em">GPN</div>
      </div>
      <div style="text-align:center;margin:8px 0 4px;">
        <div style="font-weight:900;font-size:14px;letter-spacing:0.05em;">HYVE STUDIO</div>
        <div style="font-size:11px;color:#555;margin-top:2px;">NMID: ID1026482907122</div>
        <div style="font-size:11px;color:#555;">A01</div>
      </div>
      <div style="background:#f3f4f6;border-radius:8px;padding:12px;margin:8px 0;text-align:center;">
        <div style="font-size:11px;color:#888;margin-bottom:6px;">⬛ Scan QR Code di bawah ⬛</div>
        <img src="coin.png" alt="QR" style="width:180px;height:180px;object-fit:contain;opacity:0.15;display:block;margin:0 auto;" />
        <div style="font-size:10px;color:#555;font-weight:700;margin-top:6px;">SATU QRIS UNTUK SEMUA</div>
        <div style="font-size:9px;color:#888;">www.aspi-qris.id</div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:9px;color:#888;padding-top:6px;border-top:1px solid #eee;">
        <span>Dicetak oleh: 93600914</span>
        <span>v0.0.2026.02.11</span>
      </div>
    </div>
  `;
}


const packages = {
  1: { label: 'Starter Pack', coins: 130, price: 20000 },
  2: { label: 'Bronze Pack', coins: 1050, price: 100000 },
  3: { label: 'Silver Pack', coins: 3250, price: 300000 },
  4: { label: 'Gold Pack', coins: 12850, price: 1200000 },
};

// Utility: format rupiah
function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

// ============================
// PARTICLES
// ============================
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#1a56db', '#06b6d4', '#f59e0b', '#10b981', '#8b5cf6', '#3b82f6'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${color};
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}

// ============================
// STEP NAVIGATION
// ============================
function setStep(stepNum) {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.step').forEach(el => {
    el.classList.remove('active', 'done');
  });

  // Show current step
  document.getElementById('step' + stepNum).classList.add('active');

  // Update indicators
  for (let i = 1; i <= 4; i++) {
    const ind = document.getElementById('step-indicator-' + i);
    if (i < stepNum) ind.classList.add('done');
    else if (i === stepNum) ind.classList.add('active');
  }

  // Scroll to form
  document.getElementById('topup-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goToStep1() {
  setStep(1);
}

function goToStep2() {
  const input = document.getElementById('user-id').value.trim();
  if (!input || input.length < 5) {
    showError('user-id', 'Masukkan Player ID yang valid (minimal 5 karakter)!');
    return;
  }
  userId = input;
  // Show UID display
  document.getElementById('uid-display').innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <span>Player ID: <strong style="color:#06b6d4;font-family:'Exo 2',sans-serif;letter-spacing:0.08em">${escapeHtml(userId)}</strong></span>
  `;
  setStep(2);
}

function goToStep3() {
  if (!selectedPackage) {
    showToast('Pilih paket koin terlebih dahulu!', 'warning');
    return;
  }
  const pkg = packages[selectedPackage];
  document.getElementById('summary-uid').textContent = userId;
  document.getElementById('summary-pkg').textContent = pkg.label;
  document.getElementById('summary-coins').textContent = pkg.coins.toLocaleString('id-ID') + ' Koin';
  document.getElementById('summary-price').textContent = formatRupiah(pkg.price);
  setStep(3);
}

function goToPayment() {
  const pkg = packages[selectedPackage];

  // Set payment info
  document.getElementById('pay-amount').textContent = formatRupiah(pkg.price);
  document.getElementById('pay-for').textContent = `${pkg.coins.toLocaleString('id-ID')} Koin · Player ID: ${userId}`;

  // Build WhatsApp message
  const msg = encodeURIComponent(
    `Halo Admin! Saya ingin melakukan top up eFootball:\n\n` +
    `🎮 *Player ID:* ${userId}\n` +
    `📦 *Paket:* ${pkg.label} - ${pkg.coins.toLocaleString('id-ID')} Koin\n` +
    `💰 *Total Bayar:* ${formatRupiah(pkg.price)}\n\n` +
    `Saya sudah melakukan pembayaran via QRIS. Berikut saya lampirkan bukti screenshot pembayaran. Mohon segera diproses. Terima kasih! 🙏`
  );
  const waNumber = '6289620928296';
  document.getElementById('wa-btn').href = `https://wa.me/${waNumber}?text=${msg}`;

  setStep(4);
  startCountdown(15 * 60);
  injectQRIS();
}

function resetAll() {
  selectedPackage = null;
  userId = '';
  document.getElementById('user-id').value = '';
  document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('btn-step2').disabled = true;
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  setStep(1);
}

// ============================
// PACKAGE SELECTION
// ============================
function selectPackage(id) {
  selectedPackage = id;
  document.querySelectorAll('.package-card').forEach((card, idx) => {
    card.classList.remove('selected');
  });
  document.getElementById('pkg-' + id).classList.add('selected');
  document.getElementById('btn-step2').disabled = false;

  // Play selection animation
  const card = document.getElementById('pkg-' + id);
  card.style.transform = 'scale(0.97)';
  setTimeout(() => { card.style.transform = ''; }, 200);
}

// ============================
// COUNTDOWN TIMER
// ============================
function startCountdown(seconds) {
  if (countdownInterval) clearInterval(countdownInterval);
  let remaining = seconds;
  updateTimerDisplay(remaining);

  countdownInterval = setInterval(() => {
    remaining--;
    updateTimerDisplay(remaining);
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('timer-display').textContent = 'EXPIRED';
      document.getElementById('timer-display').style.color = '#ef4444';
      showToast('Waktu pembayaran habis! Silakan coba lagi.', 'error');
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  const el = document.getElementById('timer-display');
  if (el) {
    el.textContent = `${m}:${s}`;
    if (seconds <= 60) {
      el.style.color = '#ef4444';
    } else if (seconds <= 180) {
      el.style.color = '#f59e0b';
    }
  }
}

// ============================
// ERROR / TOAST
// ============================
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.style.borderColor = '#ef4444';
  input.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.2)';

  // Remove existing error
  const existingErr = input.parentElement.parentElement.querySelector('.error-msg');
  if (existingErr) existingErr.remove();

  const err = document.createElement('span');
  err.className = 'error-msg';
  err.style.cssText = 'display:block;margin-top:8px;font-size:13px;color:#fca5a5;';
  err.textContent = '⚠️ ' + message;
  input.parentElement.after(err);

  setTimeout(() => {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    if (err.parentNode) err.remove();
  }, 3000);
}

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const colors = {
    info: { bg: 'rgba(26,86,219,0.95)', border: '#3b82f6' },
    warning: { bg: 'rgba(245,158,11,0.95)', border: '#fcd34d' },
    error: { bg: 'rgba(239,68,68,0.95)', border: '#fca5a5' },
    success: { bg: 'rgba(16,185,129,0.95)', border: '#34d399' },
  };
  const c = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${c.bg};
    border: 1px solid ${c.border};
    color: white;
    padding: 14px 24px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 600;
    z-index: 9999;
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
    white-space: nowrap;
    font-family: 'Inter', sans-serif;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
  }, 3500);
}

// ============================
// UTILITIES
// ============================
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// Enter key on input
document.addEventListener('DOMContentLoaded', () => {
  createParticles();

  // Inject Messi SVG
  const messiContainer = document.getElementById('messi-container');
  if (messiContainer) messiContainer.innerHTML = MESSI_SVG;

  document.getElementById('user-id').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') goToStep2();
  });

  // Only allow numeric input for User ID
  document.getElementById('user-id').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  // Coin floating animation on package hover
  document.querySelectorAll('.pkg-coin').forEach(coin => {
    const parent = coin.closest('.package-card');
    parent.addEventListener('mouseenter', () => {
      coin.style.transform = 'scale(1.1) rotate(-8deg)';
      coin.style.transition = 'transform 0.3s ease';
    });
    parent.addEventListener('mouseleave', () => {
      coin.style.transform = '';
    });
  });

  // Initialize first step
  setStep(1);

  // Add smooth entrance animation
  setTimeout(() => {
    document.querySelector('.form-card').style.opacity = '1';
  }, 100);
});
