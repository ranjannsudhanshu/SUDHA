import { FiX } from 'react-icons/fi';

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-16">
      <div className="w-full max-w-lg rounded-lg border border-border bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-muted hover:text-text" aria-label="Close">
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
