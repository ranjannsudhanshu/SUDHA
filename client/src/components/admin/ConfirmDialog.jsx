export default function ConfirmDialog({ title = 'Are you sure?', description, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-xl">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {description && <p className="mt-2 text-sm text-muted">{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="btn-outline">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
