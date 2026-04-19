# DCB Atlas

DCB Atlas is a static React app for exploring VAS / direct carrier billing markets through a map-first editorial interface. It is intentionally JSON-driven and GitHub Pages friendly.

## Stack

- Vite
- React
- React Router
- Tailwind CSS
- `react-simple-maps`
- Local JSON data in `src/data/countries.json`

## Commands

```bash
npm install
npm run generate:data
npm run dev
```

Other useful commands:

```bash
npm run build
npm run lint
```

## Data model

The primary public dataset lives in:

- `src/data/countries.json`

It is generated from `scripts/generate-countries.mjs`, which creates:

- a global country skeleton
- a curated subset of enriched priority markets
- research-pending placeholders for the remaining countries

`privateTags` are allowed in the schema but must never be rendered in the public UI.

## GitHub Pages deployment

The app is configured with a default Vite base path of `/DCB-Atlas/`.

If your repository name is different, build with a custom base:

```bash
$env:GITHUB_PAGES_BASE='your-repo-name'
npm run build
```

For GitHub Pages routing:

- `BrowserRouter` is used in the app
- `public/404.html` provides SPA fallback redirection
- `index.html` restores the redirected path on load

## Notes

- This project is static only: no backend, no CMS, no auth, no external database.
- Public market summaries are intentionally cautious and should not be treated as verified commercial intelligence unless labelled accordingly.
