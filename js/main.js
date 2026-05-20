// ============================================================
// AADHAAR ASHRAM — Main JavaScript
// ============================================================

/* ── Navbar ──────────────────────────────── */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-nav-close');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('hero-mode');
  } else {
    navbar.classList.remove('scrolled');
    if (document.body.classList.contains('has-hero')) {
      navbar.classList.add('hero-mode');
    }
  }
}, { passive: true });

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
if (mobileClose) {
  mobileClose.addEventListener('click', closeMobileNav);
}
mobileNav && mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobileNav);
});
function closeMobileNav() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Scroll-triggered Animations ─────────── */
const animEls = document.querySelectorAll('.animate');
if (animEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  animEls.forEach(el => observer.observe(el));
}

/* ── Counter Animation ───────────────────── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 2000;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = prefix + value.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('[data-target]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
}

/* ── FAQ Accordion ───────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Donation Widget ─────────────────────── */
const donationAmountBtns = document.querySelectorAll('.donation-amount-btn');
const customInput = document.querySelector('.donation-custom-input');
const donationTabs = document.querySelectorAll('.donation-tab');

donationAmountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    donationAmountBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (customInput) {
      customInput.value = btn.getAttribute('data-amount');
    }
  });
});

donationTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    donationTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ── Animate progress bar on scroll ──────── */
const progressFill = document.querySelector('.donation-progress-fill');
if (progressFill) {
  const pObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        progressFill.style.width = progressFill.getAttribute('data-width') || '68%';
        pObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  pObserver.observe(progressFill);
}

/* ── Masonry Gallery Lightbox ────────────── */
let lightbox = null;
function createLightbox(src, alt) {
  if (lightbox) return;
  lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  const img = document.createElement('img');
  img.src = src; img.alt = alt || ''; img.className = 'lightbox-img';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close'; closeBtn.innerHTML = '&times;'; closeBtn.setAttribute('aria-label','Close');
  const caption = document.createElement('div');
  caption.className = 'lightbox-caption'; caption.textContent = alt || '';
  lightbox.appendChild(closeBtn); lightbox.appendChild(img); lightbox.appendChild(caption);
  const close = () => { document.body.removeChild(lightbox); lightbox = null; };
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  document.body.appendChild(lightbox);
}

document.querySelectorAll('.gallery-masonry-item').forEach(item => {
  const open = () => { const img = item.querySelector('img'); if (img) createLightbox(img.src, img.alt); };
  item.addEventListener('click', open);
  item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
});

/* ── Gallery Filter ──────────────────────── */
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const masonryItems = document.querySelectorAll('.gallery-masonry-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    masonryItems.forEach(item => {
      const show = filter === 'all' || item.getAttribute('data-category') === filter;
      item.style.display = show ? 'block' : 'none';
    });
  });
});

/* ── Smooth active nav link ──────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
if (sections.length && navLinks.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

/* ── Testimonial Carousel ────────────────── */
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
let tIndex = 0;
if (testimonialTrack && testimonialCards.length > 1) {
  setInterval(() => {
    tIndex = (tIndex + 1) % Math.ceil(testimonialCards.length / 3);
    const scrollTo = tIndex * (testimonialTrack.parentElement.offsetWidth + 24);
    testimonialTrack.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }, 5000);
}

/* ── Volunteer Form validation ───────────── */
const volunteerForm = document.querySelector('#volunteer-form');
if (volunteerForm) {
  volunteerForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = volunteerForm.querySelector('[type=submit]');
    btn.textContent = '✓ Application Submitted!';
    btn.style.background = 'var(--clr-secondary)';
    btn.disabled = true;
    setTimeout(() => {
      volunteerForm.reset();
      btn.textContent = 'Apply to Volunteer';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  });
}

/* ── Contact Form ────────────────────────── */
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type=submit]');
    btn.textContent = '✓ Message Sent!';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 4000);
  });
}

/* ── Init ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.hero')) {
    document.body.classList.add('has-hero');
    navbar.classList.add('hero-mode');
  }
  document.body.classList.add('page-enter');
});
