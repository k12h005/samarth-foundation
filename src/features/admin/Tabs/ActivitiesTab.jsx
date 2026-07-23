import React from 'react';

export default function ActivitiesTab({ activities, setEditingItem, setEditType, deleteItem }) {
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
      <h3>Activities Management (Yoga, Nutrition, etc.)</h3>
      <button 
        className="btn btn-primary mb-4" 
        onClick={() => { 
          setEditingItem({ titleEn: '', titleHi: '', descEn: '', descHi: '', icon: '🧘' }); 
          setEditType('activities'); 
        }}
      >
        Add Activity Card
      </button>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
              <th style={{ padding: 10 }}>Title (EN)</th>
              <th style={{ padding: 10 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10 }}>{item.titleEn}</td>
                <td style={{ padding: 10 }}>
                  <button className="btn btn-secondary btn-sm mr-2" onClick={() => { setEditingItem(item); setEditType('activities'); }}>Edit</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => deleteItem('activities', item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
