# Sailendra Kamal: One Piece–themed Civil Engineering Portfolio

Next.js (static export) + Tailwind + Framer Motion + GSAP, deployed to GitHub Pages.
All content lives in `content/` and is editable from a web admin panel. No code needed.

## Adding or editing projects (no code)

1. Go to **`<your-site>/admin/`**.
2. Click **Sign in with GitHub** and choose *Use a personal access token*.
   Create a token at GitHub → Settings → Developer settings → Fine-grained tokens, for this
   repository only, with **Contents: Read and write**. (You must be a collaborator on the repo.)
3. Open **Projects → New Project**, fill in the form, upload a cover photo, and press **Publish**.
4. Wait about 1–2 minutes. GitHub Actions rebuilds the site, and the new project appears as a new
   island on the voyage map and as a card, with its own page.

Tips:
- **Order on the map**: 1 is the first island. Lower numbers come first.
- **Featured** projects get a red ribbon.
- **Category** drives the filter buttons (they appear once you have two or more categories).
- Only the **title** is required. Everything else is optional and has a safe fallback.
- The same panel edits **Profile and contact** (name, photo, bio, email…) and **Skills**.

## Where things live

| Path | What |
|---|---|
| `content/projects/*.md` | One file per project (what the admin panel creates) |
| `content/profile.json` | Name, poster nickname/bounty, bio, contact details |
| `content/skills.json` | Skill groups ("crew roles") |
| `public/uploads/` | Images uploaded through the admin panel |
| `public/admin/config.yml` | Admin panel form definitions |
| `lib/content.ts` | Reads `content/` at build time |
| `components/` | Themed sections (Hero poster, VoyageMap, Skills, Contact…) |

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

*Fan-inspired design with original artwork. Not affiliated with or endorsed by the creators of One Piece.*
