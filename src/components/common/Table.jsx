import { cx } from '../../utils/helpers';

/**
 * Generic data table.
 * columns: [{ key, header, render?: (row) => node, align?: 'left'|'center'|'right', width? }]
 * data:    array of row objects
 * rowKey:  field name or (row) => key
 */
export default function Table({
  columns,
  data = [],
  rowKey = 'id',
  onRowClick,
  loading = false,
  emptyMessage = 'No records found.',
  className,
}) {
  const getKey = (row, index) => (typeof rowKey === 'function' ? rowKey(row) : row[rowKey] ?? index);

  let body;
  if (loading || data.length === 0) {
    body = (
      <tr>
        <td className="table-empty" colSpan={columns.length}>
          {loading ? 'Loading…' : emptyMessage}
        </td>
      </tr>
    );
  } else {
    body = data.map((row, index) => (
      <tr
        key={getKey(row, index)}
        onClick={onRowClick ? () => onRowClick(row) : undefined}
        className={cx(onRowClick && 'is-clickable')}
      >
        {columns.map((col) => (
          <td key={col.key} style={{ textAlign: col.align }}>
            {col.render ? col.render(row) : row[col.key]}
          </td>
        ))}
      </tr>
    ));
  }

  return (
    <div className={cx('table-wrapper', className)}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ textAlign: col.align, width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
}
