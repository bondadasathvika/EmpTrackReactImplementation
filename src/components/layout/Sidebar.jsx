import { NavLink } from 'react-router-dom';
import { Circle, LogOut, UserCheck, X } from 'lucide-react';
import config from '../../config/config';
import { getNavItems } from '../../config/navigation';
import useAuth from '../../hooks/useAuth';
import { cx } from '../../utils/helpers';
import { getRoleBasePath } from '../../utils/permissions';

export default function Sidebar({ isOpen, onClose }) {
  const { role, logout } = useAuth();
  const basePath = getRoleBasePath(role);
  const items = getNavItems(role);

  return (
    <>
      <div className={cx('sidebar-overlay', isOpen && 'is-visible')} onClick={onClose} />
      <aside className={cx('sidebar', isOpen && 'is-open')}>
        <div className="sidebar-brand">
          <span className="sidebar-logo">
            <UserCheck size={20} />
          </span>
          <span className="sidebar-brand-name">{config.appName}</span>
          <button type="button" className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {items.map(({ label, path, icon: Icon = Circle }) => (
            <NavLink
              key={path}
              to={`${basePath}/${path}`}
              className={({ isActive }) => cx('sidebar-link', isActive && 'is-active')}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="sidebar-link" onClick={logout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
