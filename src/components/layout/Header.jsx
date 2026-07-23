import React from 'react';

export default function Header({
  language,
  setLanguage,
  activeSection,
  scrollToSection,
  isScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  t
}) {
  return (
    <>
      <header className={`top-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="top-navbar-inner">
          <a href="#about" className="top-navbar-logo" onClick={scrollToSection('about')}>
            <div className="top-navbar-logo-icon">SF</div>
            <div className="top-navbar-logo-text">
              <strong>Samarth NGO</strong>
              <span>Dignity for Every Elder</span>
            </div>
          </a>
          
          <nav className="top-navbar-links">
            <a href="#about" className={`top-nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={scrollToSection('about')}>{language === 'hi' ? 'परिचय' : 'About Us'}</a>
            <a href="#happiness" className={`top-nav-link ${activeSection === 'happiness' ? 'active' : ''}`} onClick={scrollToSection('happiness')}>{language === 'hi' ? 'संतुष्टि' : 'Happiness'}</a>
            <a href="#services" className={`top-nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={scrollToSection('services')}>{t.nav.services}</a>
            <a href="#programs" className={`top-nav-link ${activeSection === 'programs' ? 'active' : ''}`} onClick={scrollToSection('programs')}>{t.nav.programs}</a>
            <a href="#events" className={`top-nav-link ${activeSection === 'events' ? 'active' : ''}`} onClick={scrollToSection('events')}>{language === 'hi' ? 'इवेंट्स' : 'Events'}</a>
            <a href="#donate" className={`top-nav-link ${activeSection === 'donate' ? 'active' : ''}`} onClick={scrollToSection('donate')}>{language === 'hi' ? 'दान' : 'Donate'}</a>
            <a href="#volunteer" className={`top-nav-link ${activeSection === 'volunteer' ? 'active' : ''}`} onClick={scrollToSection('volunteer')}>{language === 'hi' ? 'स्वयंसेवा' : 'Volunteer'}</a>
            <a href="#contact" className={`top-nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={scrollToSection('contact')}>{language === 'hi' ? 'संपर्क' : 'Contact'}</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-secondary btn-sm header-lang-btn" onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}>
              {t.lang}
            </button>
            <button className="hamburger-menu-btn" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close-btn" onClick={() => setIsMobileMenuOpen(false)}>×</button>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0 10px 0' }}>
          <button className="btn btn-secondary" onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')} style={{ width: '80%', padding: '12px 24px', fontSize: '16px' }}>
            {t.lang}
          </button>
        </div>
        <nav className="mobile-nav-menu-links">
          <a href="#about" onClick={(e) => { scrollToSection('about')(e); setIsMobileMenuOpen(false); }}>{language === 'hi' ? 'परिचय' : 'About Us'}</a>
          <a href="#happiness" onClick={(e) => { scrollToSection('happiness')(e); setIsMobileMenuOpen(false); }}>{language === 'hi' ? 'संतुष्टि' : 'Happiness'}</a>
          <a href="#services" onClick={(e) => { scrollToSection('services')(e); setIsMobileMenuOpen(false); }}>{t.nav.services}</a>
          <a href="#programs" onClick={(e) => { scrollToSection('programs')(e); setIsMobileMenuOpen(false); }}>{t.nav.programs}</a>
          <a href="#events" onClick={(e) => { scrollToSection('events')(e); setIsMobileMenuOpen(false); }}>{language === 'hi' ? 'इवेंट्स' : 'Events'}</a>
          <a href="#donate" onClick={(e) => { scrollToSection('donate')(e); setIsMobileMenuOpen(false); }}>{language === 'hi' ? 'दान' : 'Donate'}</a>
          <a href="#volunteer" onClick={(e) => { scrollToSection('volunteer')(e); setIsMobileMenuOpen(false); }}>{language === 'hi' ? 'स्वयंसेवा' : 'Volunteer'}</a>
          <a href="#contact" onClick={(e) => { scrollToSection('contact')(e); setIsMobileMenuOpen(false); }}>{language === 'hi' ? 'संपर्क' : 'Contact'}</a>
        </nav>
      </div>
    </>
  );
}
