import React from 'react';

export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="text-center">
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle" style={{ margin: '0 auto' }}>{subtitle}</p>
    </div>
  );
}
