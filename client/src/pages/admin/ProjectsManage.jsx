import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiArrowUp, FiArrowDown, FiStar } from 'react-icons/fi';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import { LoadingState, EmptyState, ErrorState } from '../../components/public/StateViews.jsx';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from '../../services/projectService.js';

const emptyForm = {
  title: '',
  shortDescription: '',
  detailedDescription: '',
  technologies: '',
  githubUrl: '',
  liveDemoUrl: '',
  featured: false,
  image: null,
};

export default function ProjectsManage() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');
  const [modalItem, setModalItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setStatus('loading');
    getAllProjects()
      .then((data) => {
        setProjects(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);

  const openCreate = () => setModalItem({ ...emptyForm });
  const openEdit = (project) =>
    setModalItem({
      ...project,
      technologies: (project.technologies || []).join(', '),
      image: null,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...modalItem,
        technologies: modalItem.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (modalItem._id) {
        await updateProject(modalItem._id, payload);
        toast.success('Project updated');
      } else {
        await createProject(payload);
        toast.success('Project created');
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
      await deleteProject(deletingId);
      toast.success('Project deleted');
      setDeletingId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const move = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= projects.length) return;

    const reordered = [...projects];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setProjects(reordered);

    try {
      await reorderProjects(reordered.map((p, i) => ({ id: p._id, order: i })));
    } catch {
      toast.error('Could not save new order');
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Projects</h1>
          <p className="mt-1 text-sm text-muted">Use the arrows to control display order.</p>
        </div>
        <button onClick={openCreate} className="btn-outline">
          <FiPlus /> Add project
        </button>
      </div>

      <div className="mt-8">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && projects.length === 0 && (
          <EmptyState title="No projects yet" description="Add your first project above." />
        )}

        {status === 'ready' && projects.length > 0 && (
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={project._id} className="card flex items-center gap-4 p-4">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded p-1 text-muted hover:text-text disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <FiArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === projects.length - 1}
                    className="rounded p-1 text-muted hover:text-text disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <FiArrowDown size={14} />
                  </button>
                </div>

                <div className="h-14 w-20 shrink-0 overflow-hidden rounded bg-surface2">
                  {project.image?.url && (
                    <img src={project.image.url} alt="" className="h-full w-full object-cover" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-medium text-text">
                    {project.title}
                    {project.featured && <FiStar className="text-accent" size={14} />}
                  </p>
                  <p className="truncate text-sm text-muted">{project.shortDescription}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => openEdit(project)}
                    className="rounded-md p-2 text-muted hover:bg-surface2 hover:text-text"
                    aria-label="Edit"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeletingId(project._id)}
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
        <Modal title={modalItem._id ? 'Edit Project' : 'Add Project'} onClose={() => setModalItem(null)}>
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
              <label className="label">Short description (max 200 chars)</label>
              <input
                required
                maxLength={200}
                value={modalItem.shortDescription}
                onChange={(e) => setModalItem({ ...modalItem, shortDescription: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Detailed description</label>
              <textarea
                rows={4}
                value={modalItem.detailedDescription || ''}
                onChange={(e) => setModalItem({ ...modalItem, detailedDescription: e.target.value })}
                className="input resize-none"
              />
            </div>
            <div>
              <label className="label">Technologies (comma-separated)</label>
              <input
                value={modalItem.technologies}
                onChange={(e) => setModalItem({ ...modalItem, technologies: e.target.value })}
                className="input"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">GitHub URL</label>
                <input
                  value={modalItem.githubUrl || ''}
                  onChange={(e) => setModalItem({ ...modalItem, githubUrl: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Live demo URL</label>
                <input
                  value={modalItem.liveDemoUrl || ''}
                  onChange={(e) => setModalItem({ ...modalItem, liveDemoUrl: e.target.value })}
                  className="input"
                />
              </div>
            </div>
            <div>
              <label className="label">Project image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setModalItem({ ...modalItem, image: e.target.files[0] })}
                className="input"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={!!modalItem.featured}
                onChange={(e) => setModalItem({ ...modalItem, featured: e.target.checked })}
                className="h-4 w-4 rounded border-border bg-surface accent-accent"
              />
              Mark as featured
            </label>

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
