import React from 'react';
import { policyContent } from '../../constants';

export default function Footer({ settings, scrollToSection, setOverlay }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="name">Samarth Foundation</div>
            <div className="tagline">Where Every Elder Finds Home</div>
            <p>Providing dignified, compassionate care for elderly individuals in Delhi NCR since 2008. We believe aging should be a celebration of life.</p>
            <div style={{ margin: 'var(--space-4) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <a href={`tel:${settings.phoneMain}`} style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.41 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
                {settings.phoneMain}
              </a>
              <a href={`mailto:${settings.primaryEmail}`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {settings.primaryEmail}
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="#about" onClick={scrollToSection('about')}>About Us</a>
              <a href="#services" onClick={scrollToSection('services')}>Our Services</a>
              <a href="#residents" onClick={scrollToSection('residents')}>Resident Stories</a>
              <a href="#events" onClick={scrollToSection('events')}>Events</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Get Involved</h4>
            <div className="footer-links">
              <a href="#donate" onClick={scrollToSection('donate')}>Donate Monthly</a>
              <a href="#volunteer" onClick={scrollToSection('volunteer')}>Become a Volunteer</a>
              <a href="#contact" onClick={scrollToSection('contact')}>Contact Us</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>80G Certificate</h4>
            <div className="footer-reg">
              NGO Status: Trust Registered<br />
              NGO Darpan ID: DL/2009/00028<br />
              80G Reg: DEL/80G/2008/112
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; 2026 Samarth Foundation. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <button type="button" className="open-policy" onClick={() => setOverlay({ type: 'policy', ...policyContent.privacy })}>Privacy Policy</button>
            <button type="button" className="open-policy" onClick={() => setOverlay({ type: 'policy', ...policyContent.terms })}>Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
