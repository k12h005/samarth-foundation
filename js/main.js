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

    const close = () => {
      if (document.body.contains(backdrop)) document.body.removeChild(backdrop);
      document.body.style.overflow = '';
    };

    function shell(content, showBack) {
      return `<div class="rzp-container">
        <div class="rzp-header">
          <div class="rzp-header-left">
            ${showBack ? '<button class="rzp-back" aria-label="Back">&#8592;</button>' : ''}
            <div class="rzp-merchant-info">
              <span class="rzp-merchant-name">Aadhaar Ashram</span>
              <span class="rzp-payment-purpose">Support Dignity &amp; Compassion</span>
            </div>
          </div>
          <div class="rzp-amount-display">&#8377;${formattedAmount}</div>
          <button class="rzp-close" aria-label="Cancel">&times;</button>
        </div>
        <div class="rzp-content">${content}</div>
        <div class="rzp-footer">
          <div class="rzp-secure-logo">&#128737;&#65039; Secure Payment by <span style="color:#2563eb;font-weight:700">Razorpay</span></div>
          <div>Secured 256-bit SSL</div>
        </div>
      </div>`;
    }

    function bind(backFn) {
      const cb = backdrop.querySelector('.rzp-close');
      const bb = backdrop.querySelector('.rzp-back');
      if (cb) cb.addEventListener('click', close);
      if (bb && backFn) bb.addEventListener('click', backFn);
      backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
    }

    function showProcessing(method, email) {
      const container = backdrop.querySelector('.rzp-container');
      const ov = document.createElement('div');
      ov.className = 'rzp-overlay';
      ov.innerHTML = `<div class="rzp-spinner"></div>
        <div class="rzp-title">Processing Payment...</div>
        <div class="rzp-text">Authorizing &#8377;${formattedAmount} via ${method}.<br>Do not close or refresh the page.</div>`;
      container.appendChild(ov);
      setTimeout(() => {
        ov.innerHTML = `<div class="rzp-success-icon">&#10003;</div>
          <div class="rzp-title">Payment Successful!</div>
          <div class="rzp-text">Donation of <strong>&#8377;${formattedAmount}</strong> completed successfully.<br>Payment ID: <code>pay_K1jH9b8dG3hJ</code></div>`;
        setTimeout(() => {
          close();
          showToast(`&#129309; Thank you! &#8377;${formattedAmount} received. 80G tax receipt sent to ${email}.`, 'success');
        }, 2000);
      }, 2200);
    }

    function showMain() {
      backdrop.innerHTML = shell(`
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
            <div class="rzp-option-left"><span class="rzp-option-icon">&#128241;</span>
              <div class="rzp-option-info">
                <span class="rzp-option-name">UPI / QR (Instant)</span>
                <span class="rzp-option-desc">Google Pay, PhonePe, Paytm, BHIM</span>
              </div>
            </div><span class="rzp-option-arrow">&#8594;</span>
          </div>
          <div class="rzp-option-item" data-method="Card">
            <div class="rzp-option-left"><span class="rzp-option-icon">&#128179;</span>
              <div class="rzp-option-info">
                <span class="rzp-option-name">Card (Credit/Debit)</span>
                <span class="rzp-option-desc">Visa, Mastercard, RuPay, Maestro</span>
              </div>
            </div><span class="rzp-option-arrow">&#8594;</span>
          </div>
          <div class="rzp-option-item" data-method="NB">
            <div class="rzp-option-left"><span class="rzp-option-icon">&#127968;</span>
              <div class="rzp-option-info">
                <span class="rzp-option-name">Netbanking</span>
                <span class="rzp-option-desc">SBI, HDFC, ICICI, Axis &amp; more</span>
              </div>
            </div><span class="rzp-option-arrow">&#8594;</span>
          </div>
        </div>`, false);
      bind(null);
      backdrop.querySelectorAll('.rzp-option-item').forEach(opt => {
        opt.addEventListener('click', () => {
          const ph = backdrop.querySelector('#rzp-phone').value.trim();
          const em = backdrop.querySelector('#rzp-email').value.trim();
          if (!ph || !em) { showToast('Please enter mobile and email', 'error'); return; }
          const m = opt.dataset.method;
          if (m === 'UPI') showUPI(em);
          else if (m === 'Card') showCard(em);
          else showNB(em);
        });
      });
    }

    function showUPI(email) {
      backdrop.innerHTML = shell(`
        <div class="rzp-input-group">
          <label for="rzp-upi">UPI ID</label>
          <input type="text" id="rzp-upi" placeholder="yourname@okaxis">
          <span class="rzp-input-hint">e.g. name@paytm &nbsp;|&nbsp; name@ybl &nbsp;|&nbsp; name@okicici</span>
        </div>
        <button class="rzp-pay-btn" id="rzp-upi-pay">Verify &amp; Pay &#8377;${formattedAmount}</button>
        <div class="rzp-or-divider"><span>OR</span></div>
        <p style="text-align:center;font-size:13px;color:#888;margin-bottom:10px;">Scan QR with any UPI app</p>
        <div class="rzp-qr-wrapper">
          <div class="rzp-qr-code">
            <svg viewBox="0 0 100 100" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="white"/>
              <rect x="5" y="5" width="25" height="25" rx="3" fill="#1a1a2e"/>
              <rect x="9" y="9" width="17" height="17" rx="2" fill="white"/>
              <rect x="12" y="12" width="11" height="11" rx="1" fill="#1a1a2e"/>
              <rect x="70" y="5" width="25" height="25" rx="3" fill="#1a1a2e"/>
              <rect x="74" y="9" width="17" height="17" rx="2" fill="white"/>
              <rect x="77" y="12" width="11" height="11" rx="1" fill="#1a1a2e"/>
              <rect x="5" y="70" width="25" height="25" rx="3" fill="#1a1a2e"/>
              <rect x="9" y="74" width="17" height="17" rx="2" fill="white"/>
              <rect x="12" y="77" width="11" height="11" rx="1" fill="#1a1a2e"/>
              <rect x="35" y="5" width="5" height="5" fill="#1a1a2e"/>
              <rect x="43" y="5" width="5" height="5" fill="#1a1a2e"/>
              <rect x="55" y="5" width="5" height="5" fill="#1a1a2e"/>
              <rect x="63" y="5" width="5" height="5" fill="#1a1a2e"/>
              <rect x="35" y="13" width="5" height="5" fill="#1a1a2e"/>
              <rect x="51" y="13" width="5" height="5" fill="#1a1a2e"/>
              <rect x="59" y="13" width="5" height="5" fill="#1a1a2e"/>
              <rect x="43" y="21" width="5" height="5" fill="#1a1a2e"/>
              <rect x="55" y="21" width="5" height="5" fill="#1a1a2e"/>
              <rect x="5" y="35" width="5" height="5" fill="#1a1a2e"/>
              <rect x="21" y="35" width="5" height="5" fill="#1a1a2e"/>
              <rect x="35" y="35" width="5" height="5" fill="#1a1a2e"/>
              <rect x="51" y="35" width="5" height="5" fill="#1a1a2e"/>
              <rect x="63" y="35" width="5" height="5" fill="#1a1a2e"/>
              <rect x="79" y="35" width="5" height="5" fill="#1a1a2e"/>
              <rect x="5" y="43" width="5" height="5" fill="#1a1a2e"/>
              <rect x="21" y="43" width="5" height="5" fill="#1a1a2e"/>
              <rect x="55" y="43" width="5" height="5" fill="#1a1a2e"/>
              <rect x="71" y="43" width="5" height="5" fill="#1a1a2e"/>
              <rect x="87" y="43" width="5" height="5" fill="#1a1a2e"/>
              <rect x="5" y="51" width="5" height="5" fill="#1a1a2e"/>
              <rect x="13" y="51" width="5" height="5" fill="#1a1a2e"/>
              <rect x="35" y="51" width="5" height="5" fill="#1a1a2e"/>
              <rect x="59" y="51" width="5" height="5" fill="#1a1a2e"/>
              <rect x="79" y="51" width="5" height="5" fill="#1a1a2e"/>
              <rect x="5" y="59" width="5" height="5" fill="#1a1a2e"/>
              <rect x="43" y="59" width="5" height="5" fill="#1a1a2e"/>
              <rect x="63" y="59" width="5" height="5" fill="#1a1a2e"/>
              <rect x="87" y="59" width="5" height="5" fill="#1a1a2e"/>
              <rect x="35" y="75" width="5" height="5" fill="#1a1a2e"/>
              <rect x="55" y="75" width="5" height="5" fill="#1a1a2e"/>
              <rect x="71" y="75" width="5" height="5" fill="#1a1a2e"/>
              <rect x="51" y="83" width="5" height="5" fill="#1a1a2e"/>
              <rect x="79" y="83" width="5" height="5" fill="#1a1a2e"/>
              <rect x="35" y="91" width="5" height="5" fill="#1a1a2e"/>
              <rect x="63" y="91" width="5" height="5" fill="#1a1a2e"/>
              <rect x="44" y="44" width="12" height="12" rx="2" fill="white"/>
              <text x="50" y="53" text-anchor="middle" font-size="7" fill="#E8834A" font-weight="bold">AA</text>
            </svg>
          </div>
          <p class="rzp-qr-hint">&#8377;${formattedAmount} to Aadhaar Ashram</p>
        </div>`, true);
      bind(showMain);
      document.getElementById('rzp-upi-pay').addEventListener('click', () => {
        const uid = document.getElementById('rzp-upi').value.trim();
        if (!uid.includes('@')) { showToast('Enter a valid UPI ID (e.g. name@paytm)', 'error'); return; }
        showProcessing('UPI', email);
      });
    }

    function showCard(email) {
      backdrop.innerHTML = shell(`
        <div class="rzp-card-icons">
          <span class="rzp-card-badge visa">VISA</span>
          <span class="rzp-card-badge mc">MC</span>
          <span class="rzp-card-badge rupay">RuPay</span>
        </div>
        <div class="rzp-input-group">
          <label for="rzp-cardno">Card Number</label>
          <input type="text" id="rzp-cardno" placeholder="1234  5678  9012  3456" maxlength="22">
        </div>
        <div class="rzp-input-group">
          <label for="rzp-cname">Cardholder Name</label>
          <input type="text" id="rzp-cname" placeholder="Name as on card">
        </div>
        <div class="rzp-card-row">
          <div class="rzp-input-group">
            <label for="rzp-exp">Expiry (MM/YY)</label>
            <input type="text" id="rzp-exp" placeholder="MM / YY" maxlength="7">
          </div>
          <div class="rzp-input-group">
            <label for="rzp-cvv">CVV</label>
            <input type="password" id="rzp-cvv" placeholder="&bull;&bull;&bull;" maxlength="3">
          </div>
        </div>
        <button class="rzp-pay-btn" id="rzp-card-pay">Pay &#8377;${formattedAmount} Securely</button>`, true);
      bind(showMain);
      document.getElementById('rzp-cardno').addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '').slice(0, 16);
        this.value = v.replace(/(\d{4})(?=\d)/g, '$1  ');
      });
      document.getElementById('rzp-exp').addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '').slice(0, 4);
        if (v.length >= 2) v = v.slice(0, 2) + ' / ' + v.slice(2);
        this.value = v;
      });
      document.getElementById('rzp-card-pay').addEventListener('click', () => {
        const cn = document.getElementById('rzp-cardno').value.replace(/\s/g, '');
        const nm = document.getElementById('rzp-cname').value.trim();
        const ex = document.getElementById('rzp-exp').value.trim();
        const cv = document.getElementById('rzp-cvv').value.trim();
        if (cn.length < 16) { showToast('Enter a valid 16-digit card number', 'error'); return; }
        if (!nm) { showToast('Enter the cardholder name', 'error'); return; }
        if (ex.length < 7) { showToast('Enter a valid expiry date', 'error'); return; }
        if (cv.length < 3) { showToast('Enter a valid CVV', 'error'); return; }
        showOTP(email);
      });
    }

    function showOTP(email) {
      backdrop.innerHTML = shell(`
        <div class="rzp-otp-header">
          <div class="rzp-otp-icon">&#128242;</div>
          <h3>OTP Verification</h3>
          <p>An OTP has been sent to your registered mobile number ending in <strong>&bull;&bull;&bull;&bull;3210</strong></p>
        </div>
        <div class="rzp-input-group">
          <label for="rzp-otp">Enter OTP</label>
          <input type="text" id="rzp-otp" placeholder="&bull; &bull; &bull; &bull; &bull; &bull;" maxlength="6" autocomplete="one-time-code" class="rzp-otp-input">
          <span class="rzp-input-hint">OTP valid for 10 minutes</span>
        </div>
        <div class="rzp-otp-resend">Didn't receive? <button class="rzp-link-btn" id="rzp-resend">Resend OTP</button></div>
        <button class="rzp-pay-btn" id="rzp-otp-pay">Verify &amp; Pay &#8377;${formattedAmount}</button>`, true);
      bind(() => showCard(email));
      document.getElementById('rzp-resend').addEventListener('click', () => showToast('OTP resent to ****3210', 'success'));
      document.getElementById('rzp-otp-pay').addEventListener('click', () => {
        const otp = document.getElementById('rzp-otp').value.trim();
        if (otp.length < 4) { showToast('Enter the OTP sent to your phone', 'error'); return; }
        showProcessing('Card', email);
      });
    }

    function showNB(email) {
      const banks = [
        { n: 'SBI', c: '#1a3c6e' }, { n: 'HDFC', c: '#004c97' },
        { n: 'ICICI', c: '#b02a30' }, { n: 'Axis', c: '#800000' },
        { n: 'Kotak', c: '#e31e24' }, { n: 'PNB', c: '#002366' }
      ];
      backdrop.innerHTML = shell(`
        <div class="rzp-section-title">Select Your Bank</div>
        <div class="rzp-bank-grid">
          ${banks.map(b => `<div class="rzp-bank-item" data-bank="${b.n}">
            <div class="rzp-bank-logo" style="background:${b.c}">${b.n}</div>
            <span class="rzp-bank-name">${b.n}</span>
          </div>`).join('')}
        </div>
        <div class="rzp-input-group" style="margin-top:20px">
          <label for="rzp-obank">Other Banks</label>
          <select id="rzp-obank" class="rzp-select">
            <option value="">— Select Bank —</option>
            <option>Bank of Baroda</option><option>Canara Bank</option>
            <option>Union Bank</option><option>IDBI Bank</option>
            <option>IndusInd Bank</option><option>Yes Bank</option>
            <option>Federal Bank</option><option>Karnataka Bank</option>
          </select>
        </div>
        <button class="rzp-pay-btn" id="rzp-nb-pay" disabled>Proceed to Bank</button>`, true);
      bind(showMain);
      let sel = '';
      const btn = backdrop.querySelector('#rzp-nb-pay');
      backdrop.querySelectorAll('.rzp-bank-item').forEach(item => {
        item.addEventListener('click', () => {
          backdrop.querySelectorAll('.rzp-bank-item').forEach(b => b.classList.remove('selected'));
          item.classList.add('selected');
          sel = item.dataset.bank;
          btn.disabled = false;
          btn.textContent = 'Proceed to ' + sel;
        });
      });
      backdrop.querySelector('#rzp-obank').addEventListener('change', function () {
        if (this.value) {
          backdrop.querySelectorAll('.rzp-bank-item').forEach(b => b.classList.remove('selected'));
          sel = this.value;
          btn.disabled = false;
          btn.textContent = 'Proceed to ' + sel;
        }
      });
      btn.addEventListener('click', () => { if (sel) showProcessing('Netbanking', email); });
    }

    showMain();
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

