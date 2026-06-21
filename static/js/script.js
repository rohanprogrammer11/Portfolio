  // <script>
  // ── LOADER ──
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hide');
    }, 1900);
  });

  // ── CUSTOM CURSOR ──
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .skill-tag, .cert-card, .about-card')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

  // ── ASTRONAUT CHARACTER follows cursor ──
  const astro = document.getElementById('astronaut');
  let ax = window.innerWidth / 2, ay = window.innerHeight / 2;
  let astroX = ax, astroY = ay;
  let lastMx = ax;

  document.addEventListener('mousemove', e => { ax = e.clientX; ay = e.clientY; lastMx = e.clientX; });

  function animateAstro() {
    astroX += (ax - astroX) * 0.07;
    astroY += (ay - astroY) * 0.07;
    astro.style.left = astroX + 'px';
    astro.style.top = astroY + 'px';
    requestAnimationFrame(animateAstro);
  }
  animateAstro();

  // ── PARTICLE CANVAS ──
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  function initParticles() {
    particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.5,
    }));
  }
  initParticles();

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99,102,241,0.55)';
      ctx.fill();
    });
    // draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // ── TYPING ANIMATION ──
  const roles = ['BCA Student 🎓', 'Python Developer 🐍', 'Java Developer ☕', 'Problem Solver 🧩', 'Web Developer 🌐'];
  let ri = 0, ci = 0, deleting = false;
  const typingEl = document.getElementById('typing-text');

  function type() {
    const word = roles[ri];
    if (!deleting) {
      typingEl.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typingEl.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 300); return; }
    }
    setTimeout(type, deleting ? 45 : 85);
  }
  setTimeout(type, 1000);

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.reveal, .stagger, .tl-item');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));

  // ── ANIMATED COUNTERS ──
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 20);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));

  // ── SKILL BARS ──
  const bars = document.querySelectorAll('.skill-bar-fill');
  const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        barIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => barIO.observe(b));
//  </script>
