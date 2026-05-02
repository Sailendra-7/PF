# Futuristic Portfolio (Next.js)

A premium, space-tech inspired personal portfolio built with:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy to GitHub Pages

This project is configured for static export and GitHub Pages deployment.

1. Push to the `main` branch.
2. In GitHub repository settings, enable Pages from the `gh-pages` branch.
3. GitHub Actions will build the site and publish the exported `out/` folder.

If you change the repository name, update the `basePath` in `next.config.ts`.

## Structure

- `app/page.tsx` - main page composition + GSAP setup
- `components/Navbar.tsx` - sticky blurred navbar + active section state
- `components/Hero.tsx` - full-screen hero with animated entrance
- `components/About.tsx` - introduction and education section
- `components/Projects.tsx` - animated project cards
- `components/Skills.tsx` - skills grid with icon accents
- `components/Contact.tsx` - contact form and social links
- `app/globals.css` - global theme and utility classes
