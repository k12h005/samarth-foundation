import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';

export default function EventsSlider({
  events,
  activities,
  currentEventIndex,
  setCurrentEventIndex,
  language,
  scrollToSection,
  t
}) {
  const topEvents = events
    .filter((e) => e.status === 'Published')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (topEvents.length === 0) return null;

  return (
    <section id="events" className="section section-lg">
      <div className="container">
        <SectionHeader label={t.journeyLabel} title={t.journeyTitle} subtitle={t.journeySub} />

        <div className="event-slider-container">
          <div className="event-slider-track">
            {topEvents.map((evt, idx) => {
              const isCurrent = idx === currentEventIndex;
              const isPast = idx === (currentEventIndex - 1 + topEvents.length) % topEvents.length;
              const isNext = idx === (currentEventIndex + 1) % topEvents.length;
              
              let slideClass = 'slide-inactive';
              if (isCurrent) slideClass = 'slide-active';
              else if (isPast) slideClass = 'slide-past';
              else if (isNext) slideClass = 'slide-next';

              const relatedAct = activities.find((a) => a.id === evt.relatedActivityId);

              return (
                <div className={`event-slide-card ${slideClass}`} key={evt.id} style={{ display: 'flex', flexDirection: 'row', padding: 0, overflow: 'hidden' }}>
                  {evt.image && (
                    <div className="event-slide-poster" style={{ width: '40%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img src={evt.image} alt={evt.titleEn} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ width: evt.image ? '60%' : '100%', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
                    <div className="slide-badge">🗓️ {evt.date}</div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>{language === 'hi' ? evt.titleHi : evt.titleEn}</h3>
                    <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#666', lineHeight: 1.5 }}>{language === 'hi' ? evt.descHi : evt.descEn}</p>
                    {relatedAct && (
                      <a href="#programs" className="explore-tag" onClick={scrollToSection('programs')}>
                        Explore Program: {language === 'hi' ? relatedAct.titleHi : relatedAct.titleEn} ➜
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="slider-controls">
            <button className="slider-arrow" onClick={() => setCurrentEventIndex((prev) => (prev - 1 + topEvents.length) % topEvents.length)}>←</button>
            <div className="slider-dots">
              {topEvents.map((_, idx) => (
                <span
                  key={idx}
                  className={`slider-dot ${idx === currentEventIndex ? 'active' : ''}`}
                  onClick={() => setCurrentEventIndex(idx)}
                ></span>
              ))}
            </div>
            <button className="slider-arrow" onClick={() => setCurrentEventIndex((prev) => (prev + 1) % topEvents.length)}>→</button>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: '40px' }}>
          <a href="#events-all" className="btn btn-secondary">
            View All Celebrations & Events Calendar →
          </a>
        </div>
      </div>
    </section>
  );
}
