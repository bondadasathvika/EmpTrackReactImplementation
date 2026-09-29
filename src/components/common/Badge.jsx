import { cx } from '../../utils/helpers';

/** variant: neutral | primary | success | warning | danger | info */
export default function Badge({ children, variant = 'neutral', className }) {
  return <span className={cx('badge', `badge-${variant}`, className)}>{children}</span>;
}
