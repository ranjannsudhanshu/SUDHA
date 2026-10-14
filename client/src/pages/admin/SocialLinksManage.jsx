import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { getProfile, updateSocialLinks } from '../../services/profileService.js';
import { LoadingState, ErrorState } from '../../components/public/StateViews.jsx';

const platforms = ['facebook', 'linkedin', 'twitter', 'instagram', 'github', 'youtube', 'other'];

export default function SocialLinksManage() {
  const [links, setLinks] = useState(null);
  const [status, setStatus] = useState('loading');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        setLinks(profile.socialLinks || []);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const addLink = () => setLinks([...links, { platform: 'other', url: '', label: '' }]);

  const updateLink = (index, field, value) => {
    const next = [...links];
    next[index] = { ...next[index], [field]: value };
    setLinks(next);
  };

  const removeLink = (index) => setLinks(links.filter((_, i) => i !== index));

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateSocialLinks(links);
      setLinks(updated.socialLinks);
      toast.success('Social links updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save social links');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading') return <LoadingState />;
  if (status === 'error' || !links) return <ErrorState />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Social Links</h1>
          <p className="mt-1 text-sm text-muted">Shown in the site footer, home, and contact page.</p>
        </div>
        <button onClick={addLink} className="btn-outline">
          <FiPlus /> Add link
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {links.length === 0 && <p className="text-sm text-muted">No social links yet.</p>}

        {links.map((link, index) => (
          <div key={index} className="card flex flex-wrap items-center gap-3 p-4">
            <select
              value={link.platform}
              onChange={(e) => updateLink(index, 'platform', e.target.value)}
              className="input w-40"
            >
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
            <input
              value={link.url}
              onChange={(e) => updateLink(index, 'url', e.target.value)}
              placeholder="https://…"
              className="input flex-1"
            />
            {link.platform === 'other' && (
              <input
                value={link.label || ''}
                onChange={(e) => updateLink(index, 'label', e.target.value)}
                placeholder="Label"
                className="input w-32"
              />
            )}
            <button onClick={() => removeLink(index)} className="text-muted hover:text-accent" aria-label="Remove">
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving} className="btn mt-6">
        {saving ? 'Saving…' : 'Save changes'}
      </button>
    </div>
  );
}
