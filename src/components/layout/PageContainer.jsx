import { useEffect } from 'react';
import config from '../../config/config';
import { cx } from '../../utils/helpers';

/**
 * Standard wrapper for page content: title row with optional actions,
 * then the page body. Also sets the browser tab title.
 *
 * <PageContainer title="My Tasks" subtitle="..." actions={<Button>New</Button>}>...</PageContainer>
 */
export default function PageContainer({ title, subtitle, actions, children, className }) {
  useEffect(() => {
    document.title = title ? `${title} | ${config.appName}` : config.appName;
  }, [title]);

  return (
    <div className={cx('page-container', className)}>
      {(title || actions) && (
        <div className="page-header">
          <div>
            {title && <h1 className="page-title">{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="page-actions">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
