// Application-wide constants.

export const ROLES = Object.freeze({
  EMPLOYEE: 'employee',
  HR: 'hr',
  COMPANY_ADMIN: 'company_admin',
  TEAM_LEAD: 'teamlead',
  PLATFORM_ADMIN: 'platform_admin',
  SUPPORT_MEMBER: 'support_member',
  TECHNICAL_MEMBER: 'technical_member',
  SUPER_ADMIN: 'super_admin',
});

export const ROLE_LABELS = Object.freeze({
  [ROLES.EMPLOYEE]: 'Employee',
  [ROLES.HR]: 'HR',
  [ROLES.COMPANY_ADMIN]: 'Company Admin',
  [ROLES.TEAM_LEAD]: 'Team Lead',
  [ROLES.PLATFORM_ADMIN]: 'Platform Admin',
  [ROLES.SUPPORT_MEMBER]: 'Support Member',
  [ROLES.TECHNICAL_MEMBER]: 'Technical Member',
  [ROLES.SUPER_ADMIN]: 'Super Admin',
});

// URL segment for each role portal, e.g. /employee/dashboard.
// Matches the folder names under src/pages/.
export const ROLE_BASE_PATHS = Object.freeze({
  [ROLES.EMPLOYEE]: 'employee',
  [ROLES.HR]: 'hr',
  [ROLES.COMPANY_ADMIN]: 'company-admin',
  [ROLES.TEAM_LEAD]: 'teamlead',
  [ROLES.PLATFORM_ADMIN]: 'platform-admin',
  [ROLES.SUPPORT_MEMBER]: 'support-member',
  [ROLES.TECHNICAL_MEMBER]: 'technical-member',
  [ROLES.SUPER_ADMIN]: 'super-admin',
});

// Shared public paths.
export const PATHS = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  ACCEPT_INVITATION: '/accept-invitation',
});

export const STORAGE_KEYS = Object.freeze({
  AUTH: 'emptrack_auth',
  THEME: 'emptrack_theme',
});

export const THEMES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
});
