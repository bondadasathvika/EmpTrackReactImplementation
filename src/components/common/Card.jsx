import { cx } from '../../utils/helpers';

/** Surface container with an optional header (title, subtitle, actions) and footer. */
export default function Card({ title, subtitle, actions, footer, children, className, ...rest }) {
  const hasHeader = title || subtitle || actions;

  return (
    <section className={cx('card', className)} {...rest}>
      {hasHeader && (
        <header className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </header>
      )}
      <div className="card-body">{children}</div>
      {footer && <footer className="card-footer">{footer}</footer>}
    </section>
  );
}
