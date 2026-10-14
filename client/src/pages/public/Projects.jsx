import { useEffect, useState } from 'react';
import Seo from '../../components/public/Seo.jsx';
import ProjectCard from '../../components/public/ProjectCard.jsx';
import { LoadingState, EmptyState, ErrorState } from '../../components/public/StateViews.jsx';
import { getAllProjects } from '../../services/projectService.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getAllProjects()
      .then((data) => {
        setProjects(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <>
      <Seo title="Projects" description="A selection of projects and work." />
      <section className="section">
        <h1 className="section-heading">My Work</h1>

        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && projects.length === 0 && (
          <EmptyState
            title="No projects yet"
            description="Projects added from the admin dashboard will show up here."
          />
        )}

        {status === 'ready' && projects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
