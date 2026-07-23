import React from 'react';
import { assets } from '../../constants';

export default function Residents({ settings, language, t }) {
  return (
    <section id="residents" className="section section-lg">
      <div className="container">
        <div className="story-block">
          <div className="story-image-wrap">
            <img src={assets.community} alt="Elders playing games and smiling" />
          </div>
          <div className="story-content">
            <span className="section-label">{t.residentLabel}</span>
            <h2 className="section-title">{language === 'hi' ? 'समर्थ आश्रम में जीवन' : 'Life at Samarth Foundation'}</h2>
            <p>{language === 'hi' ? settings.lifeAtSamarthTextHi : settings.lifeAtSamarthTextEn}</p>
            <blockquote className="story-quote">
              “{t.residentQuote}”
              <span style={{ fontSize: 'var(--text-sm)', fontStyle: 'normal', fontWeight: 600, color: 'var(--clr-primary)', marginTop: 8, display: 'block' }}>
                — {t.residentAttribution}
              </span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
