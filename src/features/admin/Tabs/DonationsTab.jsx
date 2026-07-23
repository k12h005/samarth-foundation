import React from 'react';

export default function DonationsTab({ donations, setEditingItem, setEditType, deleteItem }) {
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
      <h3>Donation Log Register</h3>
      <button 
        className="btn btn-primary mb-4" 
        onClick={() => { 
          setEditingItem({ name: '', email: '', amount: 500, plan: 'one-time', note: '' }); 
          setEditType('donations'); 
        }}
      >
        Record Offline Donation
      </button>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
              <th style={{ padding: 10 }}>Date</th>
              <th style={{ padding: 10 }}>Donor</th>
              <th style={{ padding: 10 }}>Amount</th>
              <th style={{ padding: 10 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10 }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: 10 }}>{item.name}</td>
                <td style={{ padding: 10 }}>₹{item.amount}</td>
                <td style={{ padding: 10 }}>
                  <button className="btn btn-secondary btn-sm mr-2" onClick={() => { setEditingItem(item); setEditType('donations'); }}>Edit</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => deleteItem('donations', item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
