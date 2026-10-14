import { useEffect, useState } from 'react';
import Seo from '../../components/public/Seo.jsx';
import { LoadingState, EmptyState, ErrorState } from '../../components/public/StateViews.jsx';
import { skillService } from '../../services/simpleResourceServices.js';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    skillService
      .getAll()
      .then((data) => {
        setSkills(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const grouped = skills.reduce((acc, skill) => {
    const key = skill.category || 'General';
    acc[key] = acc[key] || [];
    acc[key].push(skill);
    return acc;
  }, {});

  return (
    <>
      <Seo title="Skills" description="Technical skills and areas of expertise." />
      <section className="section">
        <h1 className="section-heading">Skills</h1>

        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && skills.length === 0 && (
          <EmptyState title="No skills listed yet" />
        )}

        {status === 'ready' && skills.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="card p-6">
                <h2 className="mb-4 font-display text-lg font-semibold">{category}</h2>
                <ul className="space-y-3">
                  {items.map((skill) => (
                    <li key={skill._id} className="flex items-center justify-between text-sm">
                      <span className="text-text">{skill.name}</span>
                      {typeof skill.proficiency === 'number' && (
                        <div className="ml-4 h-1.5 w-24 overflow-hidden rounded-full bg-surface2">
                          <div
                            className="h-full bg-accent"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
