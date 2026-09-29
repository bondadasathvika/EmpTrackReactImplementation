import { Link } from 'react-router-dom';
import { Bell, Menu, Moon, Sun } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import { useStore } from '../../store/store';
import { ROLE_LABELS } from '../../utils/constants';
import { getInitials } from '../../utils/helpers';
import { getRoleBasePath } from '../../utils/permissions';

export default function Header({ onMenuClick }) {
  const { user, role } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const unreadCount = useStore((s) => s.unreadNotificationCount);
  const basePath = getRoleBasePath(role);

  return (
    <header className="app-header">
      <button type="button" className="icon-btn header-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={20} />
      </button>

      <div className="header-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link to={`${basePath}/notifications`} className="icon-btn header-notifications" aria-label="Notifications">
          <Bell size={20} />
          {unreadCount > 0 && <span className="header-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
        </Link>

        <Link to={`${basePath}/profile`} className="header-user">
          <span className="avatar">{getInitials(user?.name)}</span>
          <span className="header-user-info">
            <span className="header-user-name">{user?.name}</span>
            <span className="header-user-role">{ROLE_LABELS[role]}</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
