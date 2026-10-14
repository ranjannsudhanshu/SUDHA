import { useEffect, useState } from 'react';
import Seo from '../../components/public/Seo.jsx';
import TimelineItem from '../../components/public/TimelineItem.jsx';
import { LoadingState, EmptyState, ErrorState } from '../../components/public/StateViews.jsx';
import { experienceService } from '../../services/simpleResourceServices.js';

export default function Experience() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    experienceService
      .getAll()
      .then((data) => {
        setItems(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <>
      <Seo title="Experience" description="Professional work experience." />
      <section className="section">
        <h1 className="section-heading">Experience</h1>

        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && items.length === 0 && (
          <EmptyState title="No experience listed yet" />
        )}

        {status === 'ready' && items.length > 0 && (
          <div className="space-y-10">
            {items.map((item) => (
              <TimelineItem
                key={item._id}
                title={item.role}
                subtitle={item.company}
                location={item.location}
                startDate={item.startDate}
                endDate={item.endDate}
                current={item.current}
                description={item.description}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
