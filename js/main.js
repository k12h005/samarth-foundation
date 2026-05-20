// ============================================================
// AADHAAR ASHRAM — Main JavaScript (Fixed & Complete)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll behaviour ───────────── */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  function updateNav() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('hero-mode');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('hero-mode');
    }
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ── Hamburger / Mobile Nav ───────────── */
  function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (hamburger) hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  mobileNav && mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  /* ── Smooth scroll for ALL anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 16 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileNav();
      }
    });
  });

  /* ── Active nav link on scroll ──────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* ── Scroll-triggered Animations ────────── */
  const animEls = document.querySelectorAll('.animate');
  if ('IntersectionObserver' in window && animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('is-visible'));
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
      el.textContent = prefix + Math.round(eased * target).toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
  const counters = document.querySelectorAll('[data-target]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    counters.forEach(c => counterObs.observe(c));
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
      if (customInput) customInput.value = btn.getAttribute('data-amount');
    });
  });

  donationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      donationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ── Donate Securely — Thank You Toast ───── */
  const donateBtn = document.querySelector('.donate-secure-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      const amount = customInput ? customInput.value : '500';
      showToast(`🙏 Thank you! ₹${parseInt(amount).toLocaleString('en-IN')} donation initiated. You'll receive a confirmation + 80G receipt by email.`, 'success');
    });
  }

  /* ── Watch Our Story — Video Modal ──────── */
  const videoBtns = document.querySelectorAll('.hero-video-btn');
  videoBtns.forEach(btn => {
    btn.addEventListener('click', () => openVideoModal());
  });

  function openVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal-overlay';
    modal.innerHTML = `
      <div class="video-modal-inner">
        <button class="video-modal-close" aria-label="Close video">&times;</button>
        <div class="video-modal-embed">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
            title="Aadhaar Ashram — Our Story"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
        <p class="video-modal-caption">Aadhaar Ashram — Our Story</p>
      </div>`;
    const close = () => { document.body.removeChild(modal); document.body.style.overflow = ''; };
    modal.querySelector('.video-modal-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', function escVid(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escVid); }
    });
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  }

  /* ── Gallery Lightbox ────────────────────── */
  let lightbox = null;
  function createLightbox(src, alt) {
    if (lightbox) return;
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    const img = document.createElement('img');
    img.src = src; img.alt = alt || ''; img.className = 'lightbox-img';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close'; closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption'; caption.textContent = alt || '';
    lightbox.appendChild(closeBtn); lightbox.appendChild(img); lightbox.appendChild(caption);
    const close = () => { if (lightbox && document.body.contains(lightbox)) document.body.removeChild(lightbox); lightbox = null; };
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function escLb(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escLb); }
    });
    document.body.appendChild(lightbox);
  }

  document.querySelectorAll('.gallery-masonry-item').forEach(item => {
    const open = () => {
      const img = item.querySelector('img');
      if (img) createLightbox(img.src, img.alt || item.querySelector('.gallery-masonry-caption')?.textContent || '');
    };
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
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.style.display = match ? 'block' : 'none';
      });
    });
  });

  /* ── Volunteer Form ──────────────────────── */
  const volunteerForm = document.querySelector('#volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = volunteerForm.querySelector('input[type=email]').value;
      const btn = volunteerForm.querySelector('[type=submit]');
      const originalText = btn.textContent;
      btn.textContent = '✓ Application Sent!';
      btn.style.background = 'linear-gradient(135deg, var(--clr-secondary), var(--clr-secondary-dark))';
      btn.disabled = true;
      showToast(`✅ Application received! We'll reach out to ${email} within 24 hours.`, 'success');
      setTimeout(() => {
        volunteerForm.reset();
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    });
  }

  /* ── Newsletter Form ─────────────────────── */
  document.querySelectorAll('.footer-newsletter').forEach(form => {
    const btn = form.querySelector('button');
    const input = form.querySelector('input[type=email]');
    if (btn && input) {
      btn.addEventListener('click', () => {
        if (!input.value) { input.focus(); return; }
        showToast('📩 Subscribed! You\'ll receive our next impact update.', 'success');
        input.value = '';
      });
    }
  });

  /* ── Contact Form ────────────────────────── */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type=submit]');
      btn.textContent = '✓ Message Sent!';
      btn.disabled = true;
      showToast('✅ Message sent! Our team will respond within 24 hours.', 'success');
      setTimeout(() => {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }, 4000);
    });
  }

  /* ── Toast Notification System ───────────── */
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <span class="toast-msg">${message}</span>
      <button class="toast-close" aria-label="Close notification">&times;</button>`;
    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => { toast.classList.remove('toast-visible'); setTimeout(() => toast.remove(), 400); }, 5000);
  }

  /* ── Donate progress bar ─────────────────── */
  const progressFill = document.querySelector('.donation-progress-fill');
  if (progressFill) {
    const pObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          progressFill.style.width = progressFill.getAttribute('data-width') || '68%';
          pObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    pObs.observe(progressFill);
  }

  /* ── Hero init ───────────────────────────── */
  if (document.querySelector('.hero')) {
    document.body.classList.add('has-hero');
    navbar.classList.add('hero-mode');
  }

}); // end DOMContentLoaded
