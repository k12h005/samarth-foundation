import React from 'react';

export default function DonationOverlay({ overlay, settings, handleDonationSubmit, t }) {
  return (
    <div>
      <h2>{t.donationFlowTitle}</h2>
      <p>{t.donationFlowSub}</p>
      <div style={{ textAlign: 'center', margin: '20px 0', border: '1px solid #eee', padding: 16, borderRadius: 8 }}>
        <img src={settings.activeQrCode || '/assets/images/qr-default.png'} alt="Donation QR Code" style={{ maxWidth: 180, display: 'inline-block' }} />
        <p style={{ marginTop: 8, fontWeight: 'bold' }}>UPI ID: donate@samarth</p>
        <p style={{ color: 'var(--clr-text-mid)' }}>Scan & Donate ₹{overlay.amount} ({overlay.plan})</p>
      </div>
      <form onSubmit={handleDonationSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="donor-name">{t.donationName} *</label>
          <input id="donor-name" name="name" type="text" className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="donor-email">{t.donationEmail} *</label>
          <input id="donor-email" name="email" type="email" className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="donation-note">{t.donationNote}</label>
          <textarea id="donation-note" name="note" className="form-textarea" placeholder="Optional note" />
        </div>
        <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Record Donation Offline</button>
      </form>
    </div>
  );
}
