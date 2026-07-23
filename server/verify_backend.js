import bcrypt from 'bcryptjs';
import { db } from './db.js';
import { loginAdmin, completeLoginWith2FA, verifyResetToken, generateResetToken, getAuthSettings } from './auth.js';

console.log('--- STARTING BACKEND VERIFICATION TEST ---');

// 1. Test database helper
try {
  console.log('Testing JSON DB collections...');
  const testActivity = { titleEn: 'Test Activity', titleHi: 'परीक्षण गतिविधि', descEn: 'Description', descHi: 'विवरण', icon: 'Smile' };
  const inserted = db.insert('activities', testActivity);
  console.log('✔ DB Insert successful:', inserted.id);

  const found = db.findById('activities', inserted.id);
  if (found && found.titleEn === 'Test Activity') {
    console.log('✔ DB FindById verification passed.');
  } else {
    throw new Error('FindById mismatch');
  }

  db.update('activities', inserted.id, { titleEn: 'Updated Test Activity' });
  const updated = db.findById('activities', inserted.id);
  if (updated && updated.titleEn === 'Updated Test Activity') {
    console.log('✔ DB Update verification passed.');
  } else {
    throw new Error('Update mismatch');
  }

  db.delete('activities', inserted.id);
  const deleted = db.findById('activities', inserted.id);
  if (!deleted) {
    console.log('✔ DB Soft Delete verification passed (filtered out).');
  } else {
    throw new Error('Soft delete item still visible in findById');
  }

  // Clean up
  db.hardDelete('activities', inserted.id);
  console.log('✔ DB Hard Delete cleanup completed.');

} catch (err) {
  console.error('❌ Database verification failed:', err);
}

// 2. Test Auth and lockouts
try {
  console.log('Testing Authentication and Lockout routines...');
  
  // Test password reset token
  const resetToken = generateResetToken();
  const isValid = verifyResetToken(resetToken);
  console.log(isValid ? '✔ Reset token generated and verified.' : '❌ Reset token failed.');

  // Test credentials (default setup is admin@samarthfoundation.org / admin123)
  const defaultEmail = 'admin@samarthfoundation.org';
  const defaultPassword = 'admin123';
  
  const loginRes = loginAdmin(defaultEmail, defaultPassword, '127.0.0.1');
  if (loginRes.require2FA) {
    console.log('✔ Credentials matched, successfully flagged for 2FA requirement.');
  }

  // Test lockout trigger with wrong passwords
  console.log('Testing IP Lockout mechanism (5 failures threshold)...');
  const dummyIp = '192.168.1.100';
  let lockoutTriggered = false;
  for (let i = 0; i < 6; i++) {
    try {
      loginAdmin(defaultEmail, 'wrong-password', dummyIp);
    } catch (e) {
      if (e.message.includes('Too many failed attempts')) {
        lockoutTriggered = true;
        console.log(`✔ Account lockout verified on attempt ${i + 1}: ${e.message}`);
      }
    }
  }
  if (!lockoutTriggered) {
    console.error('❌ Lockout mechanism failed to trigger after 5 attempts.');
  }

} catch (err) {
  console.error('❌ Authentication verification failed:', err);
}

console.log('--- BACKEND VERIFICATION TEST COMPLETED ---');
