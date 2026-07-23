import React from 'react';

export default function BookingsTab({ bookings, saveItem }) {
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
      <h3>Booking Approvals</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
            <th style={{ padding: 10 }}>Date</th>
            <th style={{ padding: 10 }}>Visitor</th>
            <th style={{ padding: 10 }}>Status</th>
            <th style={{ padding: 10 }}>Update</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 10 }}>{item.date}</td>
              <td style={{ padding: 10 }}>{item.name} ({item.email})</td>
              <td style={{ padding: 10 }}>{item.status || 'Pending'}</td>
              <td style={{ padding: 10 }}>
                <select
                  value={item.status || 'Pending'}
                  className="form-select"
                  style={{ padding: '4px 8px' }}
                  onChange={(e) => saveItem('bookings', { status: e.target.value }, item.id)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                  <option value="No-show">No-show</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
