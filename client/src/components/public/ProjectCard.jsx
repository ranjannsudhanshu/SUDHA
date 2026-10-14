import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-surface">
      <div className="aspect-video w-full overflow-hidden bg-surface2">
        {project.image?.url ? (
          <img
            src={project.image.url}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted">
            No image
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bg/95 via-bg/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{project.shortDescription}</p>
        <div className="mt-3 flex gap-3">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-bg"
            >
              <FiExternalLink size={15} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text"
            >
              <FiGithub size={15} />
            </a>
          )}
        </div>
      </div>

      {project.featured && (
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-bg">
          Featured
        </span>
      )}

      {/* Static (non-hover) caption for touch devices without hover support */}
      <div className="p-4 group-hover:hidden md:hidden">
        <h3 className="font-display text-base font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-muted">{project.shortDescription}</p>
      </div>
    </div>
  );
}
