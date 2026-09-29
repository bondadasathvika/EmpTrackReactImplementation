import { Search, X } from 'lucide-react';
import { cx } from '../../utils/helpers';

/** Controlled search input. onChange receives the string value. */
export default function SearchBar({ value, onChange, placeholder = 'Search…', className, ...rest }) {
  return (
    <div className={cx('search-bar', className)}>
      <Search className="search-bar-icon" size={16} />
      <input
        type="search"
        className="search-bar-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
        {...rest}
      />
      {value && (
        <button type="button" className="search-bar-clear" onClick={() => onChange('')} aria-label="Clear search">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
