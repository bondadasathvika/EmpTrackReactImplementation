import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx, isSameDay, toDateKey } from '../../utils/helpers';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Reusable month-view calendar.
 *
 * selected:      Date | null — highlighted day
 * onSelect:      (date) => void — omit for a read-only calendar
 * markers:       { 'YYYY-MM-DD': { variant?: 'success'|'warning'|'danger'|'info'|'primary', label?: string } }
 *                Used by feature pages to color days (attendance, leave, work logs…).
 * renderDay:     optional (date) => node, extra content inside a day cell
 * initialMonth:  Date — month shown first (defaults to selected or today)
 * onMonthChange: (firstDayOfMonth) => void — e.g. to fetch that month's data
 * minDate / maxDate: Date — days outside the range are disabled
 */
export default function Calendar({
  selected = null,
  onSelect,
  markers = {},
  renderDay,
  initialMonth,
  onMonthChange,
  minDate,
  maxDate,
  className,
}) {
  const [viewMonth, setViewMonth] = useState(() => {
    const base = initialMonth || selected || new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const changeMonth = (offset) => {
    const next = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + offset, 1);
    setViewMonth(next);
    onMonthChange?.(next);
  };

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const leadingBlanks = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const isDisabled = (date) =>
    (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) ||
    (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()));

  const cells = [];
  for (let i = 0; i < leadingBlanks; i += 1) {
    cells.push(<div key={`blank-${i}`} className="calendar-cell is-blank" />);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const marker = markers[toDateKey(date)];
    const disabled = isDisabled(date);

    cells.push(
      <button
        key={day}
        type="button"
        className={cx(
          'calendar-cell',
          isSameDay(date, today) && 'is-today',
          isSameDay(date, selected) && 'is-selected',
          marker && `marker-${marker.variant || 'primary'}`,
          !onSelect && 'is-readonly',
        )}
        disabled={disabled}
        title={marker?.label}
        onClick={onSelect && !disabled ? () => onSelect(date) : undefined}
      >
        <span className="calendar-day-number">{day}</span>
        {renderDay?.(date)}
      </button>,
    );
  }

  return (
    <div className={cx('calendar', className)}>
      <div className="calendar-header">
        <button type="button" className="icon-btn" onClick={() => changeMonth(-1)} aria-label="Previous month">
          <ChevronLeft size={18} />
        </button>
        <span className="calendar-title">
          {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button type="button" className="icon-btn" onClick={() => changeMonth(1)} aria-label="Next month">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="calendar-grid">
        {WEEKDAYS.map((d) => (
          <div key={d} className="calendar-weekday">{d}</div>
        ))}
        {cells}
      </div>
    </div>
  );
}
