import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';

export default function Programs({ activities, language, t }) {
  return (
    <section id="programs" className="section bg-warm">
      <div className="container">
        <SectionHeader label={t.programsLabel} title={t.programsTitle} subtitle={t.programsSub} />
        <div className="programs-grid" style={{ marginTop: '40px' }}>
          {activities.map((act) => (
            <div className="program-feature-card" key={act.id}>
              <div>
                <h4>{language === 'hi' ? act.titleHi : act.titleEn}</h4>
                <p>{language === 'hi' ? act.descHi : act.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
