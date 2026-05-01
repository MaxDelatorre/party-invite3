// ── RSVP LINK ──────────────────────────────────────────────
// Paste your Google Form/Poll URL below between the quotes
const RSVP_URL = 'https://forms.gle/ZFypZ9J22qVrS29C6';

document.getElementById('rsvp-link').href = RSVP_URL;

// ── CONFETTI ────────────────────────────────────────────────
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const COLORS = ['#c9a84c', '#e8c97a', '#0d1b3e', '#ffffff', '#f0d080'];
const PIECES = 90;

const confetti = Array.from({ length: PIECES }, () => ({
  x:    Math.random() * window.innerWidth,
  y:    Math.random() * window.innerHeight - window.innerHeight,
  w:    6 + Math.random() * 6,
  h:    10 + Math.random() * 8,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  speed: 1.2 + Math.random() * 2.2,
  angle: Math.random() * Math.PI * 2,
  spin:  (Math.random() - 0.5) * 0.12,
  drift: (Math.random() - 0.5) * 0.6,
  opacity: 0.7 + Math.random() * 0.3,
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();

    p.y     += p.speed;
    p.x     += p.drift;
    p.angle += p.spin;

    // reset when off screen
    if (p.y > canvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawConfetti);
}

drawConfetti();