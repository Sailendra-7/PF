# Portfolio

Astro site with a live 3D meadow. All text, photos and projects live in `content/` and are edited from the admin panel, so no code changes are needed.

## Editing the site

1. Open `https://<your-site>/admin/` and sign in with GitHub.
2. Edit **Projects**, **Site content > Profile and contact**, **Education and experience** or **Software and tools**.
3. Press Publish. The site rebuilds and updates in a minute or two.

## Local development

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

Deployed by `.github/workflows/deploy.yml` on every push to `main`. If the site lives at `https://<user>.github.io/PF` instead of a custom domain, set `BASE_PATH=/PF` for the build step.

Meadow photo credits: `src/assets/landscapes/CREDITS.md`.
