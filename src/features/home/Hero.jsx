import React from 'react';

export default function Hero({ settings, currentSlideIndex, t, setOverlay }) {
  return (
    <section className="hero">
      <div className="hero-bg hero-bg-img" style={{ position: 'absolute', inset: 0 }}>
        {(settings.heroSlides || []).map((slideUrl, idx) => (
          <img 
            key={slideUrl} 
            src={slideUrl} 
            alt="Elderly care slideshow image" 
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: idx === currentSlideIndex ? 0.55 : 0,
              transition: 'opacity 1.0s ease-in-out',
              zIndex: idx === currentSlideIndex ? 1 : 0
            }}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <div className="hero-inner">
          <div className="hero-badge"><span className="dot"></span> {t.heroBadge}</div>
          <h1>{t.heroLead} <em>{t.heroEmphasis}</em>.</h1>
          <p className="hero-sub">{settings.aboutTextEn}</p>
          <div className="hero-actions">
            <a href="#donate" className="btn btn-primary btn-lg">{t.donate}</a>
            <button className="hero-video-btn" type="button" onClick={() => setOverlay({ type: 'video', title: t.story, src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' })}>
              <div className="hero-play">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              {t.story}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
