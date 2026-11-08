# Sailendra Kamal: Civil Engineering Portfolio

Next.js (static export) + Tailwind + Motion. All content lives in `content/` and is editable from a
web admin panel, so no code is needed to add projects.

## Adding or editing projects (no code)

1. Open **`<your-site>/admin/`**.
2. Click **Sign in with GitHub** and choose *Use a personal access token*. Create the token at
   GitHub → Settings → Developer settings → Fine-grained tokens, for this repository only, with
   **Contents: Read and write**. You must be a collaborator on the repository.
3. Open **Projects → New Project**, fill in the form, upload a cover photo or drawing, and press **Publish**.
4. Wait 1-2 minutes. The site rebuilds and the project appears in the grid with its own page.

Tips:
- Only the **title** is required. Everything else is optional.
- With no cover image, a drawing-style hatch pattern for the category is shown instead.
  Real site photos, drawings and renders make the portfolio much stronger.
- **Order on the page**: 1 is first. Lower numbers come first.
- **Category** drives the filter buttons (shown once there are two or more categories).
- The same panel edits **Profile and contact** and **Software and tools**.

## Where things live

| Path | What |
|---|---|
| `content/projects/*.md` | One file per project (created by the admin panel) |
| `content/profile.json` | Name, headline, bio, focus areas, contact details |
| `content/skills.json` | Tool groups |
| `public/uploads/` | Images uploaded through the admin panel |
| `public/admin/config.yml` | Admin panel form definitions |
| `lib/content.ts` | Reads `content/` at build time |
| `components/` | Page sections |

## Design notes

- Light and dark themes follow the visitor's system setting (tokens in `app/globals.css`).
- Neutral "concrete" greys with one survey-orange accent. Geist and Geist Mono type.
- Icons: Phosphor. Motion: `motion/react`, disabled for reduced-motion users.

## Contact form

By default the form opens the visitor's email app with the message prefilled. To receive messages
directly, create a free form at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
and paste its URL into **Profile and contact → Form service URL**.

## Develop locally

```bash
cd website
npm install
npm run dev      # http://localhost:3000/PF/  (basePath is /PF unless DEPLOY_ENV=custom-domain)
npm run build    # static site in out/
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `website/out`
to the `gh-pages` branch. `.env.production` sets `DEPLOY_ENV=custom-domain` (no `/PF` prefix).
