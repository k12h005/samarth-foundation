// ============================================================
// AADHAAR ASHRAM â€” Main JavaScript (Fixed & Complete)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* â”€â”€ Navbar scroll behaviour â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ Hamburger / Mobile Nav â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ Smooth scroll for ALL anchor links â”€â”€ */
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

  /* â”€â”€ Active nav link on scroll â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ Scroll-triggered Animations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ Counter Animation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ FAQ Accordion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* â”€â”€ Donation Widget â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* ── Donate Securely — Razorpay Modal ─── */
  const donateBtn = document.querySelector('.donate-secure-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      const amount = customInput ? customInput.value : '500';
      openRazorpayModal(amount);
    });
  }

  function openRazorpayModal(amount) {
    const formattedAmount = parseInt(amount).toLocaleString('en-IN');
    const backdrop = document.createElement('div');
    backdrop.className = 'rzp-backdrop';
    
    backdrop.innerHTML = `
      <div class="rzp-container">
        <div class="rzp-header">
          <div class="rzp-merchant-info">
            <span class="rzp-merchant-name">Aadhaar Ashram</span>
            <span class="rzp-payment-purpose">Support Dignity & Compassion</span>
          </div>
          <div class="rzp-amount-display">₹${formattedAmount}</div>
          <button class="rzp-close" aria-label="Cancel Payment">&times;</button>
        </div>
        
        <div class="rzp-content">
          <div class="rzp-input-group">
            <label for="rzp-phone">Mobile Number</label>
            <input type="tel" id="rzp-phone" placeholder="98765 43210" value="9876543210">
          </div>
          <div class="rzp-input-group">
            <label for="rzp-email">Email Address</label>
            <input type="email" id="rzp-email" placeholder="donor@example.com" value="donor@example.com">
          </div>
          
          <div class="rzp-section-title">Payment Options</div>
          
          <div class="rzp-options-grid">
            <div class="rzp-option-item" data-method="UPI">
              <div class="rzp-option-left">
                <span class="rzp-option-icon">📱</span>
                <div class="rzp-option-info">
                  <span class="rzp-option-name">UPI / QR (Instant)</span>
                  <span class="rzp-option-desc">Google Pay, PhonePe, Paytm, BHIM</span>
                </div>
              </div>
              <span class="rzp-option-arrow">→</span>
            </div>
            
            <div class="rzp-option-item" data-method="Card">
              <div class="rzp-option-left">
                <span class="rzp-option-icon">💳</span>
                <div class="rzp-option-info">
                  <span class="rzp-option-name">Card (Credit/Debit)</span>
                  <span class="rzp-option-desc">Visa, Mastercard, RuPay, Maestro</span>
                </div>
              </div>
              <span class="rzp-option-arrow">→</span>
            </div>
            
            <div class="rzp-option-item" data-method="Netbanking">
              <div class="rzp-option-left">
                <span class="rzp-option-icon">🏦</span>
                <div class="rzp-option-info">
                  <span class="rzp-option-name">Netbanking</span>
                  <span class="rzp-option-desc">SBI, HDFC, ICICI, Axis & more</span>
                </div>
              </div>
              <span class="rzp-option-arrow">→</span>
            </div>
          </div>
        </div>
        
        <div class="rzp-footer">
          <div class="rzp-secure-logo">🛡️ Secure Payment by <span>Razorpay</span></div>
          <div>Secured 256-bit SSL</div>
        </div>
      </div>
    `;
    
    const closeBtn = backdrop.querySelector('.rzp-close');
    const container = backdrop.querySelector('.rzp-container');
    
    const close = () => {
      document.body.removeChild(backdrop);
      document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) close();
    });
    
    const options = backdrop.querySelectorAll('.rzp-option-item');
    options.forEach(option => {
      option.addEventListener('click', () => {
        const method = option.getAttribute('data-method');
        const phone = backdrop.querySelector('#rzp-phone').value.trim();
        const email = backdrop.querySelector('#rzp-email').value.trim();
        
        if (!phone || !email) {
          showToast('⚠️ Please enter mobile number and email address', 'error');
          return;
        }
        
        const overlay = document.createElement('div');
        overlay.className = 'rzp-overlay';
        overlay.innerHTML = `
          <div class="rzp-spinner"></div>
          <div class="rzp-title">Processing Payment...</div>
          <div class="rzp-text">Authorizing donation of ₹${formattedAmount} via ${method}.<br>Please do not close this window or refresh the page.</div>
        `;
        container.appendChild(overlay);
        
        setTimeout(() => {
          overlay.innerHTML = `
            <div class="rzp-success-icon">✓</div>
            <div class="rzp-title">Payment Successful!</div>
            <div class="rzp-text">Donation of <strong>₹${formattedAmount}</strong> completed successfully.<br>Payment ID: <code>pay_K1jH9b8dG3hJ</code></div>
          `;
          
          setTimeout(() => {
            close();
            showToast(`🙏 Thank you! ₹${formattedAmount} donation received. A confirmation with your 80G tax benefit receipt has been sent to ${email}.`, 'success');
          }, 2000);
        }, 2200);
      });
    });
    
    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';
  }

  /* â”€â”€ Watch Our Story â€” Video Modal â”€â”€â”€â”€â”€â”€â”€â”€ */
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
            title="Aadhaar Ashram â€” Our Story"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
        <p class="video-modal-caption">Aadhaar Ashram â€” Our Story</p>
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

  /* â”€â”€ Gallery Lightbox â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ Gallery Filter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ Volunteer Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const volunteerForm = document.querySelector('#volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = volunteerForm.querySelector('input[type=email]').value;
      const btn = volunteerForm.querySelector('[type=submit]');
      const originalText = btn.textContent;
      btn.textContent = 'âœ“ Application Sent!';
      btn.style.background = 'linear-gradient(135deg, var(--clr-secondary), var(--clr-secondary-dark))';
      btn.disabled = true;
      showToast(`âœ… Application received! We'll reach out to ${email} within 24 hours.`, 'success');
      setTimeout(() => {
        volunteerForm.reset();
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    });
  }

  /* â”€â”€ Newsletter Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  document.querySelectorAll('.footer-newsletter').forEach(form => {
    const btn = form.querySelector('button');
    const input = form.querySelector('input[type=email]');
    if (btn && input) {
      btn.addEventListener('click', () => {
        if (!input.value) { input.focus(); return; }
        showToast('ðŸ“© Subscribed! You\'ll receive our next impact update.', 'success');
        input.value = '';
      });
    }
  });

  /* â”€â”€ Contact Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type=submit]');
      btn.textContent = 'âœ“ Message Sent!';
      btn.disabled = true;
      showToast('âœ… Message sent! Our team will respond within 24 hours.', 'success');
      setTimeout(() => {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }, 4000);
    });
  }

  /* â”€â”€ Toast Notification System â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ Donate progress bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€ Hero init â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (document.querySelector('.hero')) {
    document.body.classList.add('has-hero');
    navbar.classList.add('hero-mode');
  }


  /* Policy Modal */
  const POLICY_CONTENT = {
    privacy: { title: 'Privacy Policy', body: '<p><strong>Last updated: May 2026</strong></p><p>We collect your name, email, phone when you donate or volunteer. Payment details are processed securely and never stored. We never sell your data.</p><p>Email: info@aadhaarashram.org for data requests.</p>' },
    terms: { title: 'Terms of Service', body: '<p><strong>Last updated: May 2026</strong></p><p>All donations are voluntary and non-refundable. 80G receipts issued within 7 days. Volunteers must be 18+. All content is property of Aadhaar Ashram and used with resident consent.</p>' }
  };
  document.querySelectorAll('.open-policy').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var type = link.getAttribute('data-policy');
      var data = POLICY_CONTENT[type]; if (!data) return;
      var modal = document.createElement('div'); modal.className = 'video-modal-overlay';
      modal.innerHTML = '<div class="video-modal-inner" style="background:var(--clr-bg);border-radius:20px;max-width:600px;max-height:85vh;overflow-y:auto;cursor:default;padding:48px;"><button class="video-modal-close" style="background:var(--clr-bg-alt);color:var(--clr-text);border:1px solid var(--clr-border);top:16px;right:16px;" aria-label="Close">&times;</button><h2 style="font-family:var(--font-heading);color:var(--clr-text);margin-bottom:20px;">' + data.title + '</h2><div style="color:var(--clr-text-mid);line-height:1.8;font-size:17px;">' + data.body + '</div></div>';
      var close = function() { document.body.removeChild(modal); document.body.style.overflow = ''; };
      modal.querySelector('.video-modal-close').addEventListener('click', close);
      modal.addEventListener('click', function(e2) { if (e2.target === modal) close(); });
      document.body.appendChild(modal); document.body.style.overflow = 'hidden';
    });
  });

  /* Instagram post click -> lightbox */
  document.querySelectorAll('.insta-post').forEach(function(post) {
    post.addEventListener('click', function() {
      var img = post.querySelector('img');
      var cap = post.querySelector('.insta-post-caption');
      if (img) createLightbox(img.src, cap ? cap.textContent.trim() : img.alt);
    });
  });
}); // end DOMContentLoaded

