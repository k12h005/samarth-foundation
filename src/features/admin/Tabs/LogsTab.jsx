import React from 'react';

export default function LogsTab({ logs }) {
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
      <h3>System Audit Trail</h3>
      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {logs.map((log) => (
          <div key={log.id} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
            <span className="tag tag-green">{log.action}</span> <strong>{log.target}</strong>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>{log.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
