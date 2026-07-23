import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';

// Load env vars
const JWT_SECRET = process.env.JWT_SECRET || 'samarth-foundation-secret-key-12345';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@samarthfoundation.org';
// Default password hash for 'admin123' if not specified in env
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin123', 10);
const RECOVERY_EMAIL = process.env.RECOVERY_EMAIL || 'recovery@samarthfoundation.org';

// In-memory lockout & active session store
const loginAttempts = {};
let currentResetToken = null;
let currentResetTokenExpiry = null;

// Generate or retrieve TOTP secret for the admin
// In a production setup, we store this in settings.json or env.
// For simplicity, we initialize it and persist it in database/settings.json or use a fixed seed based on secret key.
let totpSecret = process.env.TOTP_SECRET || 'KVKXS22ONZRDGTLH'; // Base32 default

export function getAuthSettings() {
  return {
    email: ADMIN_EMAIL,
    recoveryEmail: RECOVERY_EMAIL,
    totpSecret
  };
}

export function generateTOTPUri() {
  return authenticator.keyuri(ADMIN_EMAIL, 'Samarth Foundation', totpSecret);
}

export async function generateTOTPQr() {
  const uri = generateTOTPUri();
  return await qrcode.toDataURL(uri);
}

export function verifyTOTP(token) {
  return authenticator.check(token, totpSecret);
}

export function handleLoginLockout(ip) {
  const now = Date.now();
  const attempt = loginAttempts[ip] || { count: 0, lockoutUntil: 0 };
  
  if (attempt.lockoutUntil > now) {
    const minutesLeft = Math.ceil((attempt.lockoutUntil - now) / 60000);
    throw new Error(`Too many failed attempts. Account locked. Try again in ${minutesLeft} minutes.`);
  }
}

export function recordFailedAttempt(ip) {
  const now = Date.now();
  const attempt = loginAttempts[ip] || { count: 0, lockoutUntil: 0 };
  attempt.count += 1;
  if (attempt.count >= 5) {
    attempt.lockoutUntil = now + 15 * 60 * 1000; // 15 minutes
    attempt.count = 0; // reset counter after triggering lockout
  }
  loginAttempts[ip] = attempt;
}

export function clearAttempts(ip) {
  delete loginAttempts[ip];
}

export function loginAdmin(email, password, ip) {
  handleLoginLockout(ip);

  if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    recordFailedAttempt(ip);
    throw new Error('Invalid credentials');
  }

  const matches = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  if (!matches) {
    recordFailedAttempt(ip);
    throw new Error('Invalid credentials');
  }

  // Password matches, return JWT token directly for secure session authentication
  clearAttempts(ip);
  const jwtToken = jwt.sign(
    { email: ADMIN_EMAIL, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '12h' }
  );

  return { token: jwtToken, expiresAt: Date.now() + 12 * 60 * 60 * 1000 };
}

export function completeLoginWith2FA(email, token, ip) {
  handleLoginLockout(ip);

  if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    recordFailedAttempt(ip);
    throw new Error('Invalid credentials');
  }

  const isValid = verifyTOTP(token);
  if (!isValid) {
    recordFailedAttempt(ip);
    throw new Error('Invalid 2FA token');
  }

  clearAttempts(ip);

  // Generate 12-hour session JWT token
  const jwtToken = jwt.sign(
    { email: ADMIN_EMAIL, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '12h' }
  );

  return { token: jwtToken, expiresAt: Date.now() + 12 * 60 * 60 * 1000 };
}

export function verifySession(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function generateResetToken() {
  currentResetToken = Math.random().toString(36).substr(2, 8).toUpperCase();
  currentResetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 mins
  return currentResetToken;
}

export function verifyResetToken(token) {
  if (!currentResetToken || Date.now() > currentResetTokenExpiry) {
    return false;
  }
  return currentResetToken === token;
}

export function clearResetToken() {
  currentResetToken = null;
  currentResetTokenExpiry = null;
}
