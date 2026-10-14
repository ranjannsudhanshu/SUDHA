import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import { LoadingState, EmptyState, ErrorState } from '../../components/public/StateViews.jsx';
import {
  getAllCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../../services/certificationService.js';

const emptyForm = { title: '', issuer: '', issueDate: '', credentialUrl: '', image: null };

export default function CertificationsManage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [modalItem, setModalItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setStatus('loading');
    getAllCertifications()
      .then((data) => {
        setItems(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);

  const openCreate = () => setModalItem({ ...emptyForm });
  const openEdit = (item) =>
    setModalItem({
      ...item,
      issueDate: item.issueDate ? item.issueDate.slice(0, 10) : '',
      image: null,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modalItem._id) {
        await updateCertification(modalItem._id, modalItem);
        toast.success('Certification updated');
      } else {
        await createCertification(modalItem);
        toast.success('Certification created');
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
      await deleteCertification(deletingId);
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
          <h1 className="font-display text-2xl font-semibold">Certifications</h1>
          <p className="mt-1 text-sm text-muted">Shown on the public Certifications page.</p>
        </div>
        <button onClick={openCreate} className="btn-outline">
          <FiPlus /> Add
        </button>
      </div>

      <div className="mt-8">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && items.length === 0 && (
          <EmptyState title="No certifications yet" description="Add your first one above." />
        )}

        {status === 'ready' && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="card flex items-center gap-4 p-4">
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded bg-surface2">
                  {item.image?.url && (
                    <img src={item.image.url} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-text">{item.title}</p>
                  <p className="truncate text-sm text-muted">{item.issuer}</p>
                </div>
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
        <Modal
          title={modalItem._id ? 'Edit Certification' : 'Add Certification'}
          onClose={() => setModalItem(null)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                required
                value={modalItem.title}
                onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Issuer</label>
              <input
                required
                value={modalItem.issuer}
                onChange={(e) => setModalItem({ ...modalItem, issuer: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Issue date</label>
              <input
                type="date"
                value={modalItem.issueDate || ''}
                onChange={(e) => setModalItem({ ...modalItem, issueDate: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Credential URL</label>
              <input
                value={modalItem.credentialUrl || ''}
                onChange={(e) => setModalItem({ ...modalItem, credentialUrl: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setModalItem({ ...modalItem, image: e.target.files[0] })}
                className="input"
              />
            </div>

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
