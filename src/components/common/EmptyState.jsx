import { Inbox } from 'lucide-react';
import { cx } from '../../utils/helpers';

/** Placeholder for empty lists, missing data, or not-found routes. */
export default function EmptyState({ icon: Icon = Inbox, title, description, action, className }) {
  return (
    <div className={cx('empty-state', className)}>
      <div className="empty-state-icon">
        <Icon size={28} />
      </div>
      {title && <h3 className="empty-state-title">{title}</h3>}
      {description && <p className="empty-state-description">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
