import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';

export default function Testimonials({ testimonials, language, t }) {
  return (
    <section id="happiness" className="section section-lg bg-warm">
      <div className="container">
        <SectionHeader label={t.happinessLabel} title={t.happinessTitle} subtitle={t.happinessSub} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
          {testimonials.map((tst) => (
            <div key={tst.id} className="speech-bubble-container">
              <div className="speech-bubble">
                “{language === 'hi' ? tst.quoteHi : tst.quoteEn}”
              </div>
              <div className="speech-bubble-author">
                — <strong>{language === 'hi' ? tst.nameHi : tst.nameEn}</strong>, {tst.age} years old
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
