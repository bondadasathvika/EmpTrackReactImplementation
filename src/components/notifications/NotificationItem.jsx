import { AlertTriangle, Bell, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cx, timeAgo } from '../../utils/helpers';

const TYPE_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

/**
 * One row in a notification list.
 * notification: { id, title, message, createdAt, read, type?: 'info'|'success'|'warning'|'error' }
 * onClick:      (notification) => void
 * onMarkRead:   (notification) => void — shows a "Mark as read" action on unread items
 */
export default function NotificationItem({ notification, onClick, onMarkRead }) {
  const { title, message, createdAt, read, type } = notification;
  const Icon = TYPE_ICONS[type] || Bell;

  return (
    <div
      className={cx('notification-item', !read && 'is-unread', onClick && 'is-clickable')}
      onClick={onClick ? () => onClick(notification) : undefined}
    >
      <div className={cx('notification-icon', `notification-${type || 'info'}`)}>
        <Icon size={18} />
      </div>
      <div className="notification-content">
        <p className="notification-title">{title}</p>
        {message && <p className="notification-message">{message}</p>}
        {createdAt && <span className="notification-time">{timeAgo(createdAt)}</span>}
      </div>
      {!read && onMarkRead && (
        <button
          type="button"
          className="notification-action"
          onClick={(e) => {
            e.stopPropagation();
            onMarkRead(notification);
          }}
        >
          Mark as read
        </button>
      )}
    </div>
  );
}
