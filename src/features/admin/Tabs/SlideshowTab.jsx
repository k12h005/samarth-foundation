import React from 'react';

export default function SlideshowTab({ settings, setSettings, handleSettingsUpdate }) {
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
      <h3>Hero Slideshow Management</h3>
      <p style={{ fontSize: '14px', color: 'var(--clr-text-muted)', marginBottom: '20px' }}>
        Upload or configure image links to display in the main website landing page hero background slideshow.
      </p>
      
      <form onSubmit={handleSettingsUpdate}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {(settings.heroSlides || []).map((slideUrl, idx) => (
            <div key={idx} className="admin-slideshow-row">
              <div style={{ width: '80px', height: '60px', borderRadius: '6px', overflow: 'hidden', background: '#eee', flexShrink: 0 }}>
                <img src={slideUrl} alt={`Slide ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = 'https://placehold.co/100x80?text=Invalid'} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '4px' }}>Slide #{idx + 1} Image URL</label>
                <input 
                  className="form-input" 
                  value={slideUrl} 
                  onChange={(e) => {
                    const newSlides = [...settings.heroSlides];
                    newSlides[idx] = e.target.value;
                    setSettings({ ...settings, heroSlides: newSlides });
                  }}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="admin-slideshow-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  style={{ minHeight: '36px', height: '36px', padding: '0 12px' }} 
                  disabled={idx === 0}
                  onClick={() => {
                    const newSlides = [...settings.heroSlides];
                    const temp = newSlides[idx];
                    newSlides[idx] = newSlides[idx - 1];
                    newSlides[idx - 1] = temp;
                    setSettings({ ...settings, heroSlides: newSlides });
                  }}
                >
                  ↑ Move Up
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  style={{ minHeight: '36px', height: '36px', padding: '0 12px' }} 
                  disabled={idx === settings.heroSlides.length - 1}
                  onClick={() => {
                    const newSlides = [...settings.heroSlides];
                    const temp = newSlides[idx];
                    newSlides[idx] = newSlides[idx + 1];
                    newSlides[idx + 1] = temp;
                    setSettings({ ...settings, heroSlides: newSlides });
                  }}
                >
                  ↓ Move Down
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  style={{ minHeight: '36px', height: '36px', padding: '0 12px', color: 'var(--clr-rose)', borderColor: 'var(--clr-rose)' }} 
                  onClick={() => {
                    const newSlides = (settings.heroSlides || []).filter((_, sIdx) => sIdx !== idx);
                    setSettings({ ...settings, heroSlides: newSlides });
                  }}
                >
                  ✕ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-slideshow-bottom-actions">
          <button 
            type="button" 
            className="btn btn-secondary btn-sm" 
            onClick={() => {
              const newSlides = [...(settings.heroSlides || []), ''];
              setSettings({ ...settings, heroSlides: newSlides });
            }}
          >
            + Add Slide Image URL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            Save Slideshow Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
