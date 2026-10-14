import { useOutletContext } from 'react-router-dom';
import Seo from '../../components/public/Seo.jsx';
import { EmptyState } from '../../components/public/StateViews.jsx';

export default function About() {
  const { profile } = useOutletContext();

  return (
    <>
      <Seo title="About" description={profile?.bio?.slice(0, 155)} />

      <section className="section">
        <h1 className="section-heading">About Me</h1>

        <div className="grid gap-12 md:grid-cols-[280px_1fr]">
          <div className="mx-auto w-56 md:mx-0 md:w-full">
            {profile?.profileImage?.url ? (
              <img
                src={profile.profileImage.url}
                alt={profile.name}
                className="aspect-square w-full rounded-lg border border-border object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-dashed border-border text-muted">
                No photo yet
              </div>
            )}
          </div>

          <div>
            {profile?.bio ? (
              <p className="whitespace-pre-line text-base leading-relaxed text-muted">
                {profile.bio}
              </p>
            ) : (
              <EmptyState
                title="Bio coming soon"
                description="Add a bio from the admin dashboard to introduce yourself here."
              />
            )}

            {profile?.location && (
              <p className="mt-6 text-sm text-muted">
                <span className="text-text">Location:</span> {profile.location}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
