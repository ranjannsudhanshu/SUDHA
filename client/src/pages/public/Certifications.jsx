import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Seo from '../../components/public/Seo.jsx';
import { LoadingState, EmptyState, ErrorState } from '../../components/public/StateViews.jsx';
import { getAllCertifications } from '../../services/certificationService.js';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function Certifications() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getAllCertifications()
      .then((data) => {
        setItems(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <>
      <Seo title="Certifications" description="Certifications and credentials." />
      <section className="section">
        <h1 className="section-heading">Certifications</h1>

        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && items.length === 0 && (
          <EmptyState title="No certifications added yet" />
        )}

        {status === 'ready' && items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((cert) => (
              <div key={cert._id} className="card overflow-hidden">
                {cert.image?.url && (
                  <img
                    src={cert.image.url}
                    alt={cert.title}
                    className="aspect-video w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold">{cert.title}</h3>
                  <p className="mt-1 text-sm text-accent">{cert.issuer}</p>
                  {cert.issueDate && (
                    <p className="mt-1 text-xs text-muted">{formatDate(cert.issueDate)}</p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent"
                    >
                      View credential <FiExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
