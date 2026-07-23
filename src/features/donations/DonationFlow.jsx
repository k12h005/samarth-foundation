import React from 'react';
import { donationAmounts } from '../../constants';

export default function DonationFlow({
  settings,
  donationTab,
  setDonationTab,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  setOverlay,
  t
}) {
  return (
    <section id="donate" className="section section-lg bg-amber text-inverse" style={{ color: '#fff' }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-label" style={{ color: '#fff' }}>{t.donateLabel}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{t.donateTitle}</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>{t.donateSub}</p>
            <ul style={{ marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {['Daily yoga class and health routines', 'Nutritional plans & medicine management', 'Full security and peaceful habitat'].map((item) => (
                <li className="flex" style={{ gap: 12, alignItems: 'center' }} key={item}>
                  <div style={{ background: 'rgba(255,255,255,0.2)', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            {/* Dynamic Settings UPI QR Display */}
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <img src={settings.activeQrCode || '/assets/images/qr-default.png'} alt="Donation QR Code" style={{ width: '100px', height: '100px', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.25)', background: '#FFF', padding: '4px' }} />
              <div style={{ textAlign: 'left', color: '#fff' }}>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: '700' }}>Scan to Donate via UPI</strong>
                <span style={{ fontSize: '13px', opacity: 0.85, display: 'block', marginTop: '4px' }}>UPI ID: donate@samarth</span>
              </div>
            </div>
          </div>
          <div>
            <div className="donation-widget">
              <div className="donation-tabs">
                {t.donateTabs.map((lbl, idx) => {
                  const tabVal = idx === 0 ? 'monthly' : 'one-time';
                  return <button key={tabVal} type="button" className={`donation-tab ${donationTab === tabVal ? 'active' : ''}`} onClick={() => setDonationTab(tabVal)}>{lbl}</button>;
                })}
              </div>
              <div className="donation-amounts">
                {donationAmounts.map(([amount, impact]) => (
                  <button key={amount} type="button" className={`donation-amount-btn ${selectedAmount === amount ? 'active' : ''}`} onClick={() => { setSelectedAmount(amount); setCustomAmount(String(amount)); }}>
                    <span className="amount">₹{amount}</span>
                    <span className="impact">{donationTab === 'monthly' ? impact : 'One-time support'}</span>
                  </button>
                ))}
              </div>
              <div className="donation-custom">
                <label className="donation-custom-label">Custom Amount</label>
                <div className="donation-custom-input-wrap">
                  <span className="donation-currency">₹</span>
                  <input type="number" className="donation-custom-input" value={customAmount} min="100" onChange={(e) => setCustomAmount(e.target.value)} />
                </div>
              </div>
              
              <button type="button" className="btn btn-primary donate-secure-btn" style={{ width: '100%' }} onClick={() => setOverlay({ type: 'donation', amount: Number(customAmount) || selectedAmount, plan: donationTab })}>
                {t.donateSecure} 🔒
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
