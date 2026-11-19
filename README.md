# Greece Is Shrinking: A Data Story

Interactive data visualizations about Greece's declining birth rate and ageing population.

Built with React, Vite, Tailwind CSS and Google Charts.

Live site: http://kostantinostheo.github.io/greece-is-shrinking-a-data-story

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at http://localhost:5173/greece-is-shrinking-a-data-story/ |
| `npm run build` | Production build into `build/` |
| `npm run preview` | Serve the production build locally |

The site is served from `/greece-is-shrinking-a-data-story/` (see `base` in `vite.config.mjs`).

## Project structure

| Path | Contents |
| --- | --- |
| `src/components/` | One folder per section or chart (Hero, Mothers, Housing, Team, ...) |
| `src/resources/datasets/` | The datasets behind the charts, as separate JSON files |
| `src/story/` | Story copy and facts shown alongside the charts |
| `src/theme/` | Light and dark theme context |
| `src/hooks/` | Shared hooks, such as scroll reveal |

## Deployment

Deployment is automatic and runs on GitHub Actions (`.github/workflows/deploy.yml`). You don't need to build or publish by hand.

| Event | What happens |
| --- | --- |
| Pull request into `main` | Installs and builds only, to catch a broken build before the merge |
| Push or merge to `main` | Builds and deploys to GitHub Pages |
| Manual run from the Actions tab | Builds and deploys |

The workflow also copies `index.html` to `404.html`, so deep links and page refreshes work on GitHub Pages, which has no server-side routing.

One-time setup: in the repository go to **Settings > Pages** and set **Source** to **GitHub Actions**.

Typical flow: work on `develop`, open a pull request into `main`, wait for the build check to pass, then merge. The merge deploys the site.
