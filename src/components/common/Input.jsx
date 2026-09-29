import { useId } from 'react';
import { cx } from '../../utils/helpers';

/**
 * Labelled form field. Renders <input> by default;
 * pass as="textarea" or as="select" (with <option> children) for other controls.
 */
export default function Input({
  label,
  error,
  hint,
  as: Control = 'input',
  id,
  required,
  className,
  children,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cx('form-field', className)}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <Control
        id={inputId}
        className={cx('form-control', error && 'is-invalid')}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...rest}
      >
        {children}
      </Control>
      {error ? (
        <p id={`${inputId}-error`} className="form-error">{error}</p>
      ) : (
        hint && <p id={`${inputId}-hint`} className="form-hint">{hint}</p>
      )}
    </div>
  );
}
