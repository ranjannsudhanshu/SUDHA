import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description }) {
  const fullTitle = title ? `${title} — Sudhanshu Ranjan` : 'Sudhanshu Ranjan — Cyber Security';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
}
