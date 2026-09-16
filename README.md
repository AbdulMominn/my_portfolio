# Abdul Momin — Software Engineering Portfolio

I built this portfolio to present my work as a software engineer with a primary focus on full-stack product development. It also gives visitors the option to view the same verified experience through backend, AI application engineering, solutions engineering, and cloud/platform perspectives.

The profile switcher changes emphasis and ordering without changing the underlying facts about my experience or projects.

## What I built

- A profile-based presentation for different software-engineering roles.
- Data-driven experience, project, skills, and education sections.
- A first-visit AM introduction with reduced-motion support.
- Scroll-aware navigation and a right-side section indicator.
- Expandable project technology lists.
- Responsive layouts for desktop, tablet, and mobile screens.
- Accessible navigation, focus states, semantic sections, and skip links.
- Open Graph and X metadata with a custom social-preview image.

## Technology

I built the site with:

- React 19
- TypeScript 6
- Vite 8
- Custom CSS with design tokens, Grid, Flexbox, and responsive media queries
- ESLint with TypeScript and React rules

The project intentionally has a small dependency footprint and does not require a component library or animation framework.

## Project structure

```text
src/
├── components/
│   ├── education/
│   ├── experience/
│   ├── hero/
│   ├── navigation/
│   ├── profile-switcher/
│   ├── projects/
│   ├── skills/
│   └── ui/
├── data/
│   ├── portfolio.ts
│   └── profiles.ts
├── hooks/
├── styles/
│   ├── components.css
│   ├── global.css
│   └── tokens.css
├── types/
├── App.tsx
├── index.css
└── main.tsx
```

I keep the canonical portfolio content in `src/data/portfolio.ts`. The role-specific emphasis and ordering live in `src/data/profiles.ts`, while shared design values are defined in `src/styles/tokens.css`.

`PORTFOLIO_CONTENT_GUIDE.md` documents the verified facts and wording constraints I use when updating the portfolio.

## Running the project locally

Use a recent Node.js LTS release, then run:

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

## Validation and production build

```bash
npm run lint
npm run build
npm run preview
```

The production build is generated in `dist/` and can be deployed to any static hosting provider.

## Updating the portfolio

- I update experience, projects, skills, education, and contact links in `src/data/portfolio.ts`.
- I update profile headlines, summaries, featured work, and skill ordering in `src/data/profiles.ts`.
- I update colors, typography, spacing, and shared visual values in `src/styles/tokens.css`.
- I update component-specific styling in `src/styles/components.css`.
- I update SEO and social-sharing metadata in `index.html`.

## About me

I am a recent Applied Computer Science graduate based in Antwerp, Belgium. I am interested in software-engineering opportunities where I can contribute across product development, backend systems, applied AI, technical integrations, and cloud platforms.

- [LinkedIn](https://www.linkedin.com/in/abdul-momin-1561b8203)
- [GitHub](https://github.com/AbdulMominn)
- [Email](mailto:abdulmominam7@gmail.com)
