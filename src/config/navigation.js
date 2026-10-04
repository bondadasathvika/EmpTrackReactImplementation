// Sidebar navigation per role (from the original js/components/layout.js).
// Each member fills in their own role's list as pages are added.
//
//   label: link text
//   path:  relative to the role's base path ('dashboard' -> /employee/dashboard)
//   icon:  Phosphor icon class, e.g. 'ph-squares-four'
//   match: optional URL fragments that also mark the item active
//          (e.g. 'Assigned Tasks' stays active on update-task)
import { ROLES } from '../utils/constants';

const navigation = {
  [ROLES.EMPLOYEE]: [
    { label: 'Dashboard', path: 'dashboard', icon: 'ph-squares-four' },
    { label: 'Assigned Tasks', path: 'tasks', icon: 'ph-briefcase', match: ['task'] },
    { label: 'View Issue Status', path: 'issues-list', icon: 'ph-warning-circle', match: ['issue'] },
    { label: 'Work Logs', path: 'work-logs', icon: 'ph-clock' },
    { label: 'Attendance', path: 'attendance', icon: 'ph-calendar-check' },
    { label: 'Leave Request', path: 'leave-request', icon: 'ph-calendar-x' },
  ],
  [ROLES.HR]: [],
  [ROLES.COMPANY_ADMIN]: [],
  [ROLES.TEAM_LEAD]: [
    { label: 'Dashboard', path: 'dashboard', icon: 'ph-squares-four' },
    { label: 'Work Monitoring', path: 'work-monitoring', icon: 'ph-monitor' },
    { label: 'Assign Tasks', path: 'tasks', icon: 'ph-clipboard-text' },
    { label: 'Issue Management', path: 'issue-management', icon: 'ph-warning-circle', match: ['assign-issue', 'resolve-issue'] },
    { label: 'Escalations', path: 'escalations', icon: 'ph-warning', match: ['escalate-to-hr', 'employee-raised-issues'] },
    { label: 'Attendance', path: 'attendance', icon: 'ph-calendar-check' },
    { label: 'Leave Management', path: 'leave', icon: 'ph-calendar-x' },
    { label: 'Team Performance', path: 'team-performance', icon: 'ph-users-three' },
    { label: 'Reports', path: 'reports', icon: 'ph-chart-bar' },
  ],
  [ROLES.PLATFORM_ADMIN]: [],
  [ROLES.SUPPORT_MEMBER]: [],
  [ROLES.TECHNICAL_MEMBER]: [],
  [ROLES.SUPER_ADMIN]: [],
};

export function getNavItems(role) {
  return navigation[role] || [];
}
