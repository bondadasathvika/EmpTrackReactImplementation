// Central route configuration.
//
// To add a page:
//   1. Create it in src/pages/<role>/, e.g. src/pages/employee/EmployeeDashboard.jsx
//   2. Import it below and add it to that role's array in `roleRoutes`
//      (paths are relative to the role's base path):
//        [ROLES.EMPLOYEE]: [{ path: 'dashboard', element: <EmployeeDashboard /> }],
//   3. Add a sidebar entry in src/config/navigation.js
//
// Public pages (landing, login, accept-invitation) go in `publicRoutes`
// with absolute paths from PATHS in utils/constants.js.
import { useRoutes } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';
import Layout from '../components/layout/Layout';
import { ROLES } from '../utils/constants';
import { getRoleBasePath } from '../utils/permissions';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// ---- Public (no login required) ----
const publicRoutes = [];

// ---- Role portals (login + matching role required, rendered inside Layout) ----
const roleRoutes = {
  [ROLES.EMPLOYEE]: [],
  [ROLES.HR]: [],
  [ROLES.COMPANY_ADMIN]: [],
  [ROLES.TEAM_LEAD]: [],
  [ROLES.PLATFORM_ADMIN]: [],
  [ROLES.SUPPORT_MEMBER]: [],
  [ROLES.TECHNICAL_MEMBER]: [],
  [ROLES.SUPER_ADMIN]: [],
};

const portalRoutes = Object.entries(roleRoutes)
  .filter(([, children]) => children.length > 0)
  .map(([role, children]) => ({
    path: getRoleBasePath(role),
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={[role]}>
          <Layout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children,
  }));

const fallbackRoute = {
  path: '*',
  element: (
    <EmptyState
      icon={SearchX}
      title="Page not found"
      description="The page you are looking for does not exist."
    />
  ),
};

const routes = [...publicRoutes, ...portalRoutes, fallbackRoute];

export default function AppRoutes() {
  return useRoutes(routes);
}
