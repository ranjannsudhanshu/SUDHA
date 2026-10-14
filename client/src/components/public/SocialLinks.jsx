import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaLink,
} from 'react-icons/fa6';

const iconMap = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  github: FaGithub,
  youtube: FaYoutube,
  other: FaLink,
};

export default function SocialLinks({ links = [], className = '' }) {
  if (!links.length) return null;

  return (
    <div className={`flex gap-3 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.platform] || FaLink;
        return (
          <a
            key={link._id || link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label || link.platform}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
