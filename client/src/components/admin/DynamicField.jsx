export default function DynamicField({ field, value, onChange }) {
  const { name, label, type = 'text' } = field;

  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 text-sm text-text">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(name, e.target.checked)}
          className="h-4 w-4 rounded border-border bg-surface accent-accent"
        />
        {label}
      </label>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        <label className="label">{label}</label>
        <textarea
          rows={4}
          value={value || ''}
          onChange={(e) => onChange(name, e.target.value)}
          className="input resize-none"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(name, e.target.value)}
        className="input"
      />
    </div>
  );
}
