import React from 'react';

export default function GarlandDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12 select-none" role="separator" aria-label="decorative section divider">
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-primary/40" />
      <div className="flex items-center gap-4">
        <span className="garland-dot opacity-60 scale-90" />
        <span className="garland-dot scale-110" />
        <span className="garland-dot scale-125" />
        <span className="garland-dot scale-110" />
        <span className="garland-dot opacity-60 scale-90" />
      </div>
      <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  );
}
