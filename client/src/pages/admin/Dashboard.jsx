import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiCode, FiBriefcase, FiBook, FiAward, FiMail } from 'react-icons/fi';
import { getDashboardSummary } from '../../services/miscServices.js';
import { LoadingState, ErrorState } from '../../components/public/StateViews.jsx';

const cards = [
  { key: 'projects', label: 'Projects', icon: FiFolder, to: '/admin/projects' },
  { key: 'skills', label: 'Skills', icon: FiCode, to: '/admin/skills' },
  { key: 'experience', label: 'Experience', icon: FiBriefcase, to: '/admin/experience' },
  { key: 'education', label: 'Education', icon: FiBook, to: '/admin/education' },
  { key: 'certifications', label: 'Certifications', icon: FiAward, to: '/admin/certifications' },
  { key: 'unreadMessages', label: 'Unread messages', icon: FiMail, to: '/admin/messages' },
];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getDashboardSummary()
      .then((data) => {
        setSummary(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Overview</h1>
      <p className="mt-1 text-sm text-muted">A quick snapshot of your portfolio content.</p>

      {status === 'loading' && <LoadingState />}
      {status === 'error' && <ErrorState />}

      {status === 'ready' && (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {cards.map(({ key, label, icon: Icon, to }) => (
            <Link key={key} to={to} className="card p-5 transition-colors hover:border-accent">
              <Icon className="text-accent" size={20} />
              <p className="mt-3 text-2xl font-semibold">{summary[key] ?? 0}</p>
              <p className="text-sm text-muted">{label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
