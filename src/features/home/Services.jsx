import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';

export default function Services({ services, language, t }) {
  return (
    <section id="services" className="section section-lg">
      <div className="container">
        <SectionHeader label={t.servicesLabel} title={t.servicesTitle} subtitle={t.servicesSub} />
        <div className="services-grid" style={{ marginTop: '40px' }}>
          {services.map((srv) => (
            <div className="service-card" key={srv.id}>
              <h3>{language === 'hi' ? srv.titleHi : srv.titleEn}</h3>
              <p>{language === 'hi' ? srv.descHi : srv.descEn}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
