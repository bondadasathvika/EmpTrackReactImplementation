// Authentication API calls and session persistence.
// While VITE_API_URL is empty (config.useMockAuth), login resolves against
// MOCK_USERS below so the app can be developed without a backend.
import config from '../config/config';
import { ROLES, STORAGE_KEYS } from '../utils/constants';
import { readStorage, writeStorage } from '../utils/helpers';
import api from './api';

// One demo account per role. Password for all: "password".
const MOCK_USERS = [
  { id: 'u1', name: 'Demo Employee', email: 'employee@emptrack.com', role: ROLES.EMPLOYEE },
  { id: 'u2', name: 'Demo HR', email: 'hr@emptrack.com', role: ROLES.HR },
  { id: 'u3', name: 'Demo Company Admin', email: 'companyadmin@emptrack.com', role: ROLES.COMPANY_ADMIN },
  { id: 'u4', name: 'Demo Team Lead', email: 'teamlead@emptrack.com', role: ROLES.TEAM_LEAD },
  { id: 'u5', name: 'Demo Platform Admin', email: 'platformadmin@emptrack.com', role: ROLES.PLATFORM_ADMIN },
  { id: 'u6', name: 'Demo Support Member', email: 'support@emptrack.com', role: ROLES.SUPPORT_MEMBER },
  { id: 'u7', name: 'Demo Technical Member', email: 'technical@emptrack.com', role: ROLES.TECHNICAL_MEMBER },
  { id: 'u8', name: 'Demo Super Admin', email: 'superadmin@emptrack.com', role: ROLES.SUPER_ADMIN },
];
const MOCK_PASSWORD = 'password';

async function mockLogin(email, password) {
  const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || password !== MOCK_PASSWORD) {
    throw new Error('Invalid email or password.');
  }
  return { user, token: `mock-token-${user.id}` };
}

/** Returns { user, token } and persists the session. */
export async function login(email, password) {
  const { user, token } = config.useMockAuth
    ? await mockLogin(email, password)
    : await api.post('/auth/login', { email, password });

  const session = { user, token, expiresAt: Date.now() + config.sessionDuration };
  writeStorage(STORAGE_KEYS.AUTH, session);
  return session;
}

export async function logout() {
  if (!config.useMockAuth) {
    try {
      await api.post('/auth/logout');
    } catch {
      // Clear the local session even if the server call fails.
    }
  }
  writeStorage(STORAGE_KEYS.AUTH, null);
}

/** Placeholder for the accept-invitation flow. */
export function acceptInvitation(token, password) {
  return api.post('/auth/accept-invitation', { token, password });
}

export function changePassword(currentPassword, newPassword) {
  return api.post('/auth/change-password', { currentPassword, newPassword });
}

/** Returns the persisted session, or null if missing or expired. */
export function getStoredSession() {
  const session = readStorage(STORAGE_KEYS.AUTH);
  if (!session?.user || !session?.token) return null;
  if (session.expiresAt && session.expiresAt < Date.now()) {
    writeStorage(STORAGE_KEYS.AUTH, null);
    return null;
  }
  return session;
}
