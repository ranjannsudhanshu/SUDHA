import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import Seo from '../../components/public/Seo.jsx';
import SocialLinks from '../../components/public/SocialLinks.jsx';
import { submitContactMessage } from '../../services/miscServices.js';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const { profile } = useOutletContext();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitContactMessage(form);
      toast.success(res.message || 'Message sent!');
      setForm(initialForm);
    } catch (err) {
      const message = err.response?.data?.message || 'Could not send your message. Please try again.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Contact" description="Get in touch." />
      <section className="section">
        <h1 className="section-heading">Contact Me</h1>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            {profile?.email && (
              <p className="mb-3 flex items-center gap-2 text-sm text-muted">
                <FiMail /> {profile.email}
              </p>
            )}
            {profile?.phone && (
              <p className="mb-6 flex items-center gap-2 text-sm text-muted">
                <FiPhone /> {profile.phone}
              </p>
            )}

            {profile?.socialLinks?.length > 0 && (
              <SocialLinks links={profile.socialLinks} className="mb-8" />
            )}

            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} download className="btn-outline">
                Download CV <FiDownload />
              </a>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="input"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="label" htmlFor="email">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="input"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="label" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                className="input resize-none"
                placeholder="How can I help?"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn w-full sm:w-auto">
              {submitting ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
