import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description }) {
  const fullTitle = title ? `${title} — Saroj Kumar` : 'Saroj Kumar — Web Developer';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
}
