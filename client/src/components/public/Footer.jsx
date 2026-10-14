export default function Footer({ name = 'S.R' }) {
  return (
    <footer className="border-t border-border/60 py-8">
      <p className="mx-auto max-w-content px-6 text-center text-sm text-muted md:px-10">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </p>
    </footer>
  );
}
