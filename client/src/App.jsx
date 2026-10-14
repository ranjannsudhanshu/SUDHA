import { Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout.jsx';
import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import Skills from './pages/public/Skills.jsx';
import Projects from './pages/public/Projects.jsx';
import Experience from './pages/public/Experience.jsx';
import Education from './pages/public/Education.jsx';
import Certifications from './pages/public/Certifications.jsx';
import Contact from './pages/public/Contact.jsx';
import NotFound from './pages/public/NotFound.jsx';

import AdminLayout from './layouts/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProfileManage from './pages/admin/ProfileManage.jsx';
import SkillsManage from './pages/admin/SkillsManage.jsx';
import ProjectsManage from './pages/admin/ProjectsManage.jsx';
import ExperienceManage from './pages/admin/ExperienceManage.jsx';
import EducationManage from './pages/admin/EducationManage.jsx';
import CertificationsManage from './pages/admin/CertificationsManage.jsx';
import SocialLinksManage from './pages/admin/SocialLinksManage.jsx';
import MessagesManage from './pages/admin/MessagesManage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin login (outside the protected layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin dashboard (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileManage />} />
        <Route path="skills" element={<SkillsManage />} />
        <Route path="projects" element={<ProjectsManage />} />
        <Route path="experience" element={<ExperienceManage />} />
        <Route path="education" element={<EducationManage />} />
        <Route path="certifications" element={<CertificationsManage />} />
        <Route path="social-links" element={<SocialLinksManage />} />
        <Route path="messages" element={<MessagesManage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
