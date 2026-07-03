/* ── NAV SCROLL EFFECT ─────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── MOBILE MENU ───────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ─────────────────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.section, .service-card, .testi-card, .step, .about-card, .about-accent-box, .video-mock, .booking-form-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal', 'visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  if (!el.classList.contains('reveal')) {
    el.classList.add('reveal');
  }
  revealObserver.observe(el);
});

/* Hero reveals on load */
document.querySelectorAll('.hero .reveal').forEach(el => {
  setTimeout(() => el.classList.add('visible'), 100);
});

/* ── COUNT-UP ANIMATION ────────────────────────────────────────────── */
function countUp(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('[data-target]');
      nums.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        countUp(el, target);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

/* ── BOOKING FORM ──────────────────────────────────────────────────── */
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      bookingForm.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1200);
  });
}

/* ── EMAIL FORM ────────────────────────────────────────────────────── */
const emailForm = document.getElementById('emailForm');
if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = emailForm.querySelector('button');
    const input = emailForm.querySelector('input');
    btn.textContent = 'Sent! Check your inbox ✓';
    btn.style.background = '#1B5E20';
    btn.disabled = true;
    input.disabled = true;
  });
}

/* ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── ACTIVE NAV LINK HIGHLIGHT ─────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--orange)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
