import React from 'react';

export default function Stats({ settings }) {
  return (
    <section id="about" className="section bg-warm">
      <div className="container">
        <div className="grid-4">
          <div className="impact-card">
            <span className="impact-number">{settings.residentsServed}+</span>
            <span className="impact-label">Elders Given Home</span>
          </div>
          <div className="impact-card">
            <span className="impact-number">{settings.mealsServed?.toLocaleString()}+</span>
            <span className="impact-label">Meals Served</span>
          </div>
          <div className="impact-card">
            <span className="impact-number">{settings.yearsOfService}</span>
            <span className="impact-label">Years of Service</span>
          </div>
          <div className="impact-card">
            <span className="impact-number">1200+</span>
            <span className="impact-label">Active Volunteers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
