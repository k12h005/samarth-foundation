import React from 'react';

export default function ContactForm({ settings, showToast, t }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Message submitted successfully.');
    e.target.reset();
  };

  return (
    <section id="contact" className="section section-lg">
      <div className="container">
        <div className="grid-2">
          <div>
            <span className="section-label">{t.contactLabel}</span>
            <h2 className="section-title">{t.contactTitle}</h2>
            <p className="section-subtitle">{t.contactSub}</p>
            
            <div className="section-note" style={{ margin: '20px 0' }}>
              <h3>Contact Numbers</h3>
              <p><strong>Primary:</strong> {settings.phoneMain}</p>
              <p><strong>Emergency:</strong> {settings.phoneEmergency}</p>
              <p><strong>Email:</strong> {settings.primaryEmail}</p>
            </div>

            {settings.mapsIframeUrl && (
              <div className="map-embed" style={{ borderRadius: 12, overflow: 'hidden' }}>
                <iframe
                  src={settings.mapsIframeUrl}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Samarth Foundation Location Map"
                />
              </div>
            )}
          </div>
          
          <div>
            <div className="donation-widget">
              <h3>Send A Message</h3>
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
