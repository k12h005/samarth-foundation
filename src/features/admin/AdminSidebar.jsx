import React from 'react';

export default function AdminSidebar({
  adminActiveTab,
  setAdminActiveTab,
  setEditingItem,
  setIsAdminSidebarOpen,
  triggerBackup,
  handleSetup2FA,
  handleLogout
}) {
  const tabs = ['slideshow', 'activities', 'services', 'events', 'bookings', 'donations', 'settings', 'logs'];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo">Samarth Admin</div>
        <div className="admin-sidebar-subtitle">Dignity for Every Elder</div>
      </div>
      <nav className="admin-sidebar-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`admin-tab-btn ${adminActiveTab === tab ? 'active' : ''}`}
            onClick={() => {
              setAdminActiveTab(tab);
              setEditingItem(null);
              setIsAdminSidebarOpen(false);
            }}
          >
            {tab === 'slideshow' ? 'SLIDESHOW' : tab.toUpperCase()}
          </button>
        ))}
      </nav>
      <div className="admin-sidebar-footer">
        <button
          className="admin-tab-btn"
          style={{ background: 'rgba(46, 204, 113, 0.08)', color: '#27ae60', border: '1px solid rgba(46, 204, 113, 0.15)' }}
          onClick={triggerBackup}
        >
          Backup
        </button>
        <button
          className="admin-tab-btn"
          style={{ background: 'rgba(243, 156, 18, 0.08)', color: '#d35400', border: '1px solid rgba(243, 156, 18, 0.15)' }}
          onClick={handleSetup2FA}
        >
          2FA Setup
        </button>
        <button
          className="admin-tab-btn"
          style={{ background: 'rgba(231, 76, 60, 0.08)', color: '#c0392b', border: '1px solid rgba(231, 76, 60, 0.15)' }}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
