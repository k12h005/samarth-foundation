import React from 'react';
import AdminSidebar from './AdminSidebar';
import EditItemModal from './components/EditItemModal';
import SlideshowTab from './Tabs/SlideshowTab';
import ActivitiesTab from './Tabs/ActivitiesTab';
import ServicesTab from './Tabs/ServicesTab';
import EventsTab from './Tabs/EventsTab';
import BookingsTab from './Tabs/BookingsTab';
import DonationsTab from './Tabs/DonationsTab';
import SettingsTab from './Tabs/SettingsTab';
import LogsTab from './Tabs/LogsTab';

export default function AdminDashboard({
  isAdminSidebarOpen,
  setIsAdminSidebarOpen,
  adminActiveTab,
  setAdminActiveTab,
  editingItem,
  setEditingItem,
  editType,
  setEditType,
  qrCode2FA,
  activities,
  services,
  events,
  bookings,
  donations,
  settings,
  setSettings,
  logs,
  triggerBackup,
  handleSetup2FA,
  handleLogout,
  saveItem,
  deleteItem,
  handleSettingsUpdate
}) {
  return (
    <div className="admin-full-page">
      {/* Sidebar backdrop for mobile */}
      <div className={`admin-sidebar-backdrop ${isAdminSidebarOpen ? 'show' : ''}`} onClick={() => setIsAdminSidebarOpen(false)}></div>

      {/* Mobile Header Bar */}
      <div className="admin-mobile-bar">
        <button className="admin-menu-toggle" onClick={() => setIsAdminSidebarOpen(true)}>☰</button>
        <div style={{ fontWeight: 'bold', fontSize: 16, fontFamily: 'var(--font-heading)', color: 'var(--clr-primary-dark)' }}>Samarth Admin</div>
        <a href="/" className="btn btn-secondary btn-sm" style={{ minHeight: '32px', height: '32px', padding: '0 12px' }}>Exit</a>
      </div>

      {/* Sidebar */}
      <AdminSidebar
        adminActiveTab={adminActiveTab}
        setAdminActiveTab={setAdminActiveTab}
        setEditingItem={setEditingItem}
        setIsAdminSidebarOpen={setIsAdminSidebarOpen}
        triggerBackup={triggerBackup}
        handleSetup2FA={handleSetup2FA}
        handleLogout={handleLogout}
      />

      {/* Content Area */}
      <main className="admin-main-content">
        <div className="admin-content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 24, textTransform: 'capitalize', fontFamily: 'var(--font-heading)' }}>{adminActiveTab} Management</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--clr-text-muted)', fontSize: 14 }}>Configure and update public site datasets.</p>
            </div>
            <a href="/" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex' }}>Go to Homepage</a>
          </div>

          {qrCode2FA && (
            <div style={{ background: '#fcfcfc', padding: 20, borderRadius: 12, marginBottom: 24, textAlign: 'center', border: '1px dashed var(--clr-border)' }}>
              <h4 style={{ margin: 0 }}>Google Authenticator Setup</h4>
              <img src={qrCode2FA} alt="2FA QR Code" style={{ maxWidth: 160, display: 'inline-block', margin: '12px 0' }} />
              <p style={{ margin: 0, fontSize: 13, color: 'var(--clr-text-mid)' }}>Scan the code in Authenticator to generate 6-digit tokens.</p>
            </div>
          )}

          {/* CRUD Tabs */}
          {adminActiveTab === 'slideshow' && (
            <SlideshowTab
              settings={settings}
              setSettings={setSettings}
              handleSettingsUpdate={handleSettingsUpdate}
            />
          )}

          {adminActiveTab === 'activities' && (
            <ActivitiesTab
              activities={activities}
              setEditingItem={setEditingItem}
              setEditType={setEditType}
              deleteItem={deleteItem}
            />
          )}

          {adminActiveTab === 'services' && (
            <ServicesTab
              services={services}
              setEditingItem={setEditingItem}
              setEditType={setEditType}
              deleteItem={deleteItem}
            />
          )}

          {adminActiveTab === 'events' && (
            <EventsTab
              events={events}
              setEditingItem={setEditingItem}
              setEditType={setEditType}
              deleteItem={deleteItem}
            />
          )}

          {adminActiveTab === 'bookings' && (
            <BookingsTab
              bookings={bookings}
              saveItem={saveItem}
            />
          )}

          {adminActiveTab === 'donations' && (
            <DonationsTab
              donations={donations}
              setEditingItem={setEditingItem}
              setEditType={setEditType}
              deleteItem={deleteItem}
            />
          )}

          {adminActiveTab === 'settings' && (
            <SettingsTab
              settings={settings}
              setSettings={setSettings}
              handleSettingsUpdate={handleSettingsUpdate}
            />
          )}

          {adminActiveTab === 'logs' && (
            <LogsTab
              logs={logs}
            />
          )}
        </div>
      </main>

      {/* Edit Modal Overlay */}
      <EditItemModal
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        editType={editType}
        activities={activities}
        saveItem={saveItem}
      />
    </div>
  );
}
