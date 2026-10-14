import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiUser, FiCode, FiFolder, FiBriefcase, FiBook, FiAward, FiShare2, FiMail, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/admin', label: 'Overview', icon: FiGrid, end: true },
  { to: '/admin/profile', label: 'Profile & About', icon: FiUser },
  { to: '/admin/skills', label: 'Skills', icon: FiCode },
  { to: '/admin/projects', label: 'Projects', icon: FiFolder },
  { to: '/admin/experience', label: 'Experience', icon: FiBriefcase },
  { to: '/admin/education', label: 'Education', icon: FiBook },
  { to: '/admin/certifications', label: 'Certifications', icon: FiAward },
  { to: '/admin/social-links', label: 'Social Links', icon: FiShare2 },
  { to: '/admin/messages', label: 'Messages', icon: FiMail },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navContent = (
    <>
      <div className="px-6 py-5">
        <p className="font-display text-lg font-semibold">Admin</p>
        <p className="mt-0.5 truncate text-xs text-muted">{user?.email}</p>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-surface2 text-accent' : 'text-muted hover:bg-surface2 hover:text-text'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-5 pt-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-surface2 hover:text-accent"
        >
          <FiLogOut size={16} /> Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-bg text-text md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border md:flex">{navContent}</aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
        <p className="font-display font-semibold">Admin</p>
        <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <FiMenu size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex bg-bg md:hidden">
          <div className="flex w-72 flex-col border-r border-border">
            <div className="flex justify-end px-4 pt-4">
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <FiX size={22} />
              </button>
            </div>
            {navContent}
          </div>
        </div>
      )}

      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
