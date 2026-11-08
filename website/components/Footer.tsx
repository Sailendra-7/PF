export default function Footer({ name, role, email }: { name: string; role: string; email: string }) {
  return (
    <footer className="border-t border-line/10">
      <div className="wrap flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-tight">{name}</p>
          <p className="mt-1 text-sm text-muted">{role}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-muted md:items-end">
          {email ? (
            <a href={`mailto:${email}`} className="transition duration-500 ease-out hover:text-ink">
              {email}
            </a>
          ) : null}
          <p>&copy; {new Date().getFullYear()} {name}</p>
        </div>
      </div>
    </footer>
  );
}
