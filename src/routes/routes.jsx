// Central route configuration.
//
// To add a role's pages:
//   1. Create them in src/pages/<role>/, e.g. src/pages/hr/HrDashboard.jsx
//   2. Export their routes from src/pages/<role>/<role>Routes.jsx (paths are
//      relative to the role's base path) — see pages/employee/employeeRoutes.jsx
//   3. Plug that array into `roleRoutes` below
//   4. Add sidebar entries in src/config/navigation.js
//
// Public pages (landing, login, accept-invitation) go in `publicRoutes`
// with absolute paths from PATHS in utils/constants.js.
import { Navigate, useRoutes } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Layout from '../components/layout/Layout';
import employeeRoutes from '../pages/employee/employeeRoutes';
import Login from '../pages/public/Login';
import teamLeadRoutes from '../pages/teamlead/teamLeadRoutes';
import { PATHS, ROLES } from '../utils/constants';
import { getRoleBasePath } from '../utils/permissions';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// ---- Public (no login required) ----
const publicRoutes = [
  { path: PATHS.HOME, element: <Navigate to={PATHS.LOGIN} replace /> },
  { path: PATHS.LOGIN, element: <Login /> },
];

// ---- Role portals (login + matching role required, rendered inside Layout) ----
const roleRoutes = {
  [ROLES.EMPLOYEE]: employeeRoutes,
  [ROLES.HR]: [],
  [ROLES.COMPANY_ADMIN]: [],
  [ROLES.TEAM_LEAD]: teamLeadRoutes,
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
      icon="ph-magnifying-glass"
      title="Page not found"
      description="The page you are looking for does not exist."
    />
  ),
};

const routes = [...publicRoutes, ...portalRoutes, fallbackRoute];

export default function AppRoutes() {
  return useRoutes(routes);
}
