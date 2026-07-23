import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="site-toast site-toast--success" role="status">
      <span className="site-toast__title">Alert</span>
      <span>{message}</span>
    </div>
  );
}
