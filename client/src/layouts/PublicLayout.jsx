import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/public/Navbar.jsx';
import Footer from '../components/public/Footer.jsx';
import { getProfile } from '../services/profileService.js';

export default function PublicLayout() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar name={profile?.name ? initials(profile.name) : 'SAROJ.K'} />
      <main className="flex-1">
        <Outlet context={{ profile }} />
      </main>
      <Footer name={profile?.name?.split(' ')[0] || 'Saroj'} />
    </div>
  );
}

function initials(fullName) {
  // Mirrors the original site's "SAROJ.K" nav-brand style: first name + first
  // initial of the rest, upper-cased.
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].toUpperCase();
  return `${parts[0].toUpperCase()}.${parts[1][0].toUpperCase()}`;
}
