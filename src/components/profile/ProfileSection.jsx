import Card from '../common/Card';

/**
 * A titled block of label/value pairs for profile screens
 * (e.g. "Personal Information", "Work Information").
 * fields:   [{ label, value }] — empty values render as "—"
 * actions:  optional node in the section header (e.g. an Edit button)
 * children: optional extra content below the fields (e.g. skills, a form)
 */
export default function ProfileSection({ title, subtitle, fields = [], actions, children }) {
  return (
    <Card title={title} subtitle={subtitle} actions={actions} className="profile-section">
      {fields.length > 0 && (
        <dl className="profile-fields">
          {fields.map(({ label, value }) => (
            <div key={label} className="profile-field">
              <dt>{label}</dt>
              <dd>{value || value === 0 ? value : '—'}</dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </Card>
  );
}
