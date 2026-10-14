const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function TimelineItem({ title, subtitle, location, startDate, endDate, current, description }) {
  return (
    <div className="relative border-l border-border pl-6">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
      <p className="text-xs uppercase tracking-wide text-muted">
        {formatDate(startDate)} — {current ? 'Present' : formatDate(endDate) || 'Present'}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold">{title}</h3>
      <p className="text-sm text-accent">
        {subtitle}
        {location ? ` · ${location}` : ''}
      </p>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
    </div>
  );
}
