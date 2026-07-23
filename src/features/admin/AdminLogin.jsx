import React from 'react';

export default function AdminLogin({
  adminEmail,
  setAdminEmail,
  adminPassword,
  setAdminPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  t
}) {
  return (
    <div className="admin-full-page" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <div style={{ maxWidth: 450, width: '100%', margin: '40px auto', background: '#fff', padding: 32, borderRadius: 16, boxShadow: 'var(--shadow-md)' }}>
        <form onSubmit={handleLogin}>
          <h3 style={{ marginBottom: 20, fontFamily: 'var(--font-heading)' }}>Samarth Admin Login</h3>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Admin Email</label>
            <input id="admin-email" className="form-input" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
          </div>
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-password"
                className="form-input"
                type={showPassword ? 'text' : 'password'}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                style={{ paddingRight: '45px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: 0,
                  lineHeight: 1
                }}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? '👁️' : '👁️‍Q'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
