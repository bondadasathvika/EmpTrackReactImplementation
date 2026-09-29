import { Loader2 } from 'lucide-react';
import { cx } from '../../utils/helpers';

/**
 * variant: primary | secondary | outline | ghost | danger
 * size:    sm | md | lg
 * icon:    a lucide-react component, e.g. icon={Plus}
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  fullWidth = false,
  type = 'button',
  className,
  disabled,
  ...rest
}) {
  return (
    <button
      type={type}
      className={cx('btn', `btn-${variant}`, `btn-${size}`, fullWidth && 'btn-block', className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Loader2 className="btn-icon spin" /> : Icon && <Icon className="btn-icon" />}
      {children}
    </button>
  );
}
