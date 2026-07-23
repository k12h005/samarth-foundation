import React from 'react';

export default function SettingsTab({ settings, setSettings, handleSettingsUpdate }) {
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
      <h3>General Configuration</h3>
      <form onSubmit={handleSettingsUpdate}>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Meals Served Counter</label>
            <input type="number" className="form-input" value={settings.mealsServed} onChange={(e) => setSettings({ ...settings, mealsServed: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label className="form-label">Residents Served Counter</label>
            <input type="number" className="form-input" value={settings.residentsServed} onChange={(e) => setSettings({ ...settings, residentsServed: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label className="form-label">Primary Email</label>
            <input className="form-input" type="email" value={settings.primaryEmail} onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Emergency Line</label>
            <input className="form-input" value={settings.phoneEmergency} onChange={(e) => setSettings({ ...settings, phoneEmergency: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Maps Embed URL</label>
          <input className="form-input" value={settings.mapsIframeUrl} onChange={(e) => setSettings({ ...settings, mapsIframeUrl: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">About Us Copy (EN)</label>
          <textarea className="form-textarea" value={settings.aboutTextEn} onChange={(e) => setSettings({ ...settings, aboutTextEn: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">About Us Copy (HI)</label>
          <textarea className="form-textarea" value={settings.aboutTextHi} onChange={(e) => setSettings({ ...settings, aboutTextHi: e.target.value })} />
        </div>
        <div className="form-group" style={{ marginTop: '20px' }}>
          <label className="form-label">Donation QR Image URL</label>
          <input className="form-input" value={settings.activeQrCode || ''} onChange={(e) => setSettings({ ...settings, activeQrCode: e.target.value })} placeholder="https://..." />
        </div>
        <button type="submit" className="btn btn-primary mt-4">Save Site Config</button>
      </form>
    </div>
  );
}
