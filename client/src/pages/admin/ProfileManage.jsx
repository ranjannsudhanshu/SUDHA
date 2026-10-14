import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProfile, updateProfile, updateProfileImage } from '../../services/profileService.js';
import { LoadingState, ErrorState } from '../../components/public/StateViews.jsx';

export default function ProfileManage() {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState('loading');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setForm(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateProfile(form);
      setForm(updated);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const updated = await updateProfileImage(file);
      setForm(updated);
      toast.success('Profile image updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  if (status === 'loading') return <LoadingState />;
  if (status === 'error' || !form) return <ErrorState />;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Profile & About</h1>
      <p className="mt-1 text-sm text-muted">This powers your Home and About pages.</p>

      <div className="mt-8 flex items-center gap-5">
        <div className="h-20 w-20 overflow-hidden rounded-full border border-border bg-surface2">
          {form.profileImage?.url && (
            <img src={form.profileImage.url} alt="Profile" className="h-full w-full object-cover" />
          )}
        </div>
        <label className="btn-outline cursor-pointer">
          {uploadingImage ? 'Uploading…' : 'Change photo'}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={uploadingImage} />
        </label>
      </div>

      <form onSubmit={handleSave} className="mt-8 grid gap-5 md:grid-cols-2">
        <div>
          <label className="label">Full name</label>
          <input name="name" value={form.name || ''} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="label">Title / Role</label>
          <input name="title" value={form.title || ''} onChange={handleChange} className="input" />
        </div>

        <div className="md:col-span-2">
          <label className="label">Hero headline</label>
          <input
            name="heroHeadline"
            value={form.heroHeadline || ''}
            onChange={handleChange}
            className="input"
            placeholder="Hi, it's Saroj Kumar From Bihar"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Tagline (shown under the hero headline)</label>
          <input name="tagline" value={form.tagline || ''} onChange={handleChange} className="input" />
        </div>

        <div className="md:col-span-2">
          <label className="label">Bio</label>
          <textarea
            name="bio"
            rows={6}
            value={form.bio || ''}
            onChange={handleChange}
            className="input resize-none"
          />
        </div>

        <div>
          <label className="label">Location</label>
          <input name="location" value={form.location || ''} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" value={form.email || ''} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="label">Resume URL</label>
          <input
            name="resumeUrl"
            value={form.resumeUrl || ''}
            onChange={handleChange}
            className="input"
            placeholder="https://…/resume.pdf"
          />
        </div>

        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="btn">
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
