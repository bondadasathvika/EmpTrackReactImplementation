// Sidebar navigation per role. Each member fills in their own role's list
// as pages are added. `path` is relative to the role's base path
// (e.g. 'dashboard' -> /employee/dashboard). `icon` is a lucide-react component.
//
// Example:
//   import { LayoutDashboard } from 'lucide-react';
//   [ROLES.EMPLOYEE]: [{ label: 'Dashboard', path: 'dashboard', icon: LayoutDashboard }],
import { ROLES } from '../utils/constants';

const navigation = {
  [ROLES.EMPLOYEE]: [],
  [ROLES.HR]: [],
  [ROLES.COMPANY_ADMIN]: [],
  [ROLES.TEAM_LEAD]: [],
  [ROLES.PLATFORM_ADMIN]: [],
  [ROLES.SUPPORT_MEMBER]: [],
  [ROLES.TECHNICAL_MEMBER]: [],
  [ROLES.SUPER_ADMIN]: [],
};

export function getNavItems(role) {
  return navigation[role] || [];
}
