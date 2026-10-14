import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-5xl font-semibold">404</h1>
      <p className="mt-3 text-muted">This page doesn't exist.</p>
      <Link to="/" className="btn mt-8">
        Back to home
      </Link>
    </section>
  );
}
