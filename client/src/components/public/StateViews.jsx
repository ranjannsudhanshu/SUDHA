export function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center py-20 text-muted">
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent" />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', description }) {
  return (
    <div className="rounded-lg border border-dashed border-border py-16 text-center">
      <p className="font-display text-lg text-text">{title}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </div>
  );
}

export function ErrorState({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="rounded-lg border border-accent/30 bg-accent/5 py-10 text-center">
      <p className="text-sm text-accent">{message}</p>
    </div>
  );
}
