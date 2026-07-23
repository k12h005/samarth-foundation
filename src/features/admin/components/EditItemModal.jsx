import React from 'react';

export default function EditItemModal({
  editingItem,
  setEditingItem,
  editType,
  activities,
  saveItem
}) {
  if (!editingItem) return null;

  return (
    <div className="site-modal-overlay">
      <div className="site-modal" style={{ maxWidth: 700, padding: 32, background: '#fff', borderRadius: 16, boxShadow: 'var(--shadow-lg)' }}>
        <button className="site-modal__close" onClick={() => setEditingItem(null)}>×</button>
        <h3 style={{ marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>Setup Card Details</h3>
        <form onSubmit={(e) => { e.preventDefault(); saveItem(editType, editingItem, editingItem.id); }}>
          {(editType === 'activities' || editType === 'services') && (
            <>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Card Image URL (Optional)</label>
                <input className="form-input" value={editingItem.image || ''} onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })} placeholder="https://images.unsplash.com/..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Title (EN)</label>
                  <input className="form-input" value={editingItem.titleEn || ''} onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value })} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Title (HI) <span style={{fontSize: '11px', color: 'var(--clr-text-muted)'}}>(Optional - Auto-translates)</span></label>
                  <input className="form-input" value={editingItem.titleHi || ''} onChange={(e) => setEditingItem({ ...editingItem, titleHi: e.target.value })} placeholder="स्वचालित अनुवाद" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Description (EN)</label>
                  <textarea className="form-textarea" rows="4" value={editingItem.descEn || ''} onChange={(e) => setEditingItem({ ...editingItem, descEn: e.target.value })} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Description (HI) <span style={{fontSize: '11px', color: 'var(--clr-text-muted)'}}>(Optional - Auto-translates)</span></label>
                  <textarea className="form-textarea" rows="4" value={editingItem.descHi || ''} onChange={(e) => setEditingItem({ ...editingItem, descHi: e.target.value })} placeholder="स्वचालित अनुवाद" />
                </div>
              </div>
            </>
          )}

          {editType === 'events' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Date</label>
                  <input type="date" className="form-input" value={editingItem.date || ''} onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Status</label>
                  <select className="form-select" value={editingItem.status || 'Draft'} onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}>
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Title (EN)</label>
                  <input className="form-input" value={editingItem.titleEn || ''} onChange={(e) => {
                    const slugified = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingItem({ ...editingItem, titleEn: e.target.value, slug: slugified });
                  }} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Title (HI) <span style={{fontSize: '11px', color: 'var(--clr-text-muted)'}}>(Optional - Auto-translates)</span></label>
                  <input className="form-input" value={editingItem.titleHi || ''} onChange={(e) => setEditingItem({ ...editingItem, titleHi: e.target.value })} placeholder="स्वचालित अनुवाद" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Slug</label>
                  <input className="form-input" value={editingItem.slug || ''} onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Associated Activity to Explore</label>
                  <select className="form-select" value={editingItem.relatedActivityId || ''} onChange={(e) => setEditingItem({ ...editingItem, relatedActivityId: e.target.value })}>
                    <option value="">-- None --</option>
                    {activities.map(a => (
                      <option key={a.id} value={a.id}>{a.titleEn}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Description (EN)</label>
                  <textarea className="form-textarea" rows="3" value={editingItem.descEn || ''} onChange={(e) => setEditingItem({ ...editingItem, descEn: e.target.value })} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Description (HI) <span style={{fontSize: '11px', color: 'var(--clr-text-muted)'}}>(Optional - Auto-translates)</span></label>
                  <textarea className="form-textarea" rows="3" value={editingItem.descHi || ''} onChange={(e) => setEditingItem({ ...editingItem, descHi: e.target.value })} placeholder="स्वचालित अनुवाद" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Event Poster Image URL (Optional)</label>
                <input className="form-input" value={editingItem.image || ''} onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })} placeholder="https://images.unsplash.com/..." />
              </div>
            </>
          )}

          {editType === 'donations' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Donor Name</label>
                  <input className="form-input" value={editingItem.name || ''} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Donor Email</label>
                  <input className="form-input" type="email" value={editingItem.email || ''} onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Amount (₹)</label>
                  <input type="number" className="form-input" value={editingItem.amount || 0} onChange={(e) => setEditingItem({ ...editingItem, amount: Number(e.target.value) })} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Plan Type</label>
                  <select className="form-select" value={editingItem.plan || 'one-time'} onChange={(e) => setEditingItem({ ...editingItem, plan: e.target.value })}>
                    <option value="one-time">One-time</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Note</label>
                <textarea className="form-textarea" rows="3" value={editingItem.note || ''} onChange={(e) => setEditingItem({ ...editingItem, note: e.target.value })} />
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary mt-6" style={{ width: '100%' }}>Confirm and Save</button>
        </form>
      </div>
    </div>
  );
}
