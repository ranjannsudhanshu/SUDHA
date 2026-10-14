import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import DynamicField from './DynamicField.jsx';
import { LoadingState, EmptyState, ErrorState } from '../public/StateViews.jsx';

/**
 * Config-driven CRUD manager to avoid rebuilding near-identical admin pages.
 *
 * props:
 *  - title, description
 *  - service: { getAll, create, update, remove }
 *  - fields: [{ name, label, type, default }]
 *  - renderRow: (item) => ReactNode  — how each item appears in the list
 */
export default function SimpleCrudManager({ title, description, service, fields, renderRow }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [modalItem, setModalItem] = useState(null); // null = closed, {} = create, {...} = edit
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setStatus('loading');
    service
      .getAll()
      .then((data) => {
        setItems(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);

  const openCreate = () => {
    const defaults = {};
    fields.forEach((f) => (defaults[f.name] = f.default ?? ''));
    setModalItem(defaults);
  };

  const openEdit = (item) => setModalItem({ ...item });

  const handleFieldChange = (name, value) => setModalItem({ ...modalItem, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modalItem._id) {
        await service.update(modalItem._id, modalItem);
        toast.success('Updated successfully');
      } else {
        await service.create(modalItem);
        toast.success('Created successfully');
      }
      setModalItem(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await service.remove(deletingId);
      toast.success('Deleted');
      setDeletingId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        <button onClick={openCreate} className="btn-outline">
          <FiPlus /> Add
        </button>
      </div>

      <div className="mt-8">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && items.length === 0 && (
          <EmptyState title={`No ${title.toLowerCase()} yet`} description="Add your first entry above." />
        )}

        {status === 'ready' && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="card flex items-center justify-between gap-4 p-4">
                <div className="min-w-0 flex-1">{renderRow(item)}</div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="rounded-md p-2 text-muted hover:bg-surface2 hover:text-text"
                    aria-label="Edit"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeletingId(item._id)}
                    className="rounded-md p-2 text-muted hover:bg-surface2 hover:text-accent"
                    aria-label="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalItem && (
        <Modal title={modalItem._id ? `Edit ${title}` : `Add ${title}`} onClose={() => setModalItem(null)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <DynamicField
                key={field.name}
                field={field}
                value={modalItem[field.name]}
                onChange={handleFieldChange}
              />
            ))}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setModalItem(null)} className="btn-outline">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deletingId && (
        <ConfirmDialog
          description="This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
