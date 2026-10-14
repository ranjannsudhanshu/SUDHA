import { useOutletContext, Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import Seo from '../../components/public/Seo.jsx';
import SocialLinks from '../../components/public/SocialLinks.jsx';

export default function Home() {
  const { profile } = useOutletContext();

  const firstName = profile?.name?.split(' ')[0] || 'Saroj';
  const restOfName = profile?.name?.split(' ').slice(1).join(' ') || 'Kumar';

  return (
    <>
      <Seo
        title="Home"
        description={profile?.tagline || 'Web developer portfolio, projects, and experience.'}
      />

      <section className="section flex min-h-[calc(100vh-73px)] flex-col justify-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          {profile?.title || 'Web Developer'}
        </p>

        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          {profile?.heroHeadline || `Hi, it's ${firstName} ${restOfName}`}
        </h1>

        {profile?.tagline && (
          <p className="mt-6 max-w-lg text-base text-muted">{profile.tagline}</p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/projects" className="btn">
            View my work
            <FiArrowRight />
          </Link>
          {profile?.resumeUrl && (
            <a href={profile.resumeUrl} download className="btn-outline">
              Download resume
              <FiDownload />
            </a>
          )}
        </div>

        {profile?.socialLinks?.length > 0 && (
          <SocialLinks links={profile.socialLinks} className="mt-12" />
        )}
      </section>
    </>
  );
}
