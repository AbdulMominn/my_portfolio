# Abdul Momin — CV / Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A high-performance, interactive CV/portfolio website built with **React 19**, **TypeScript**, and **Vite**. Features a dark-themed glassmorphism design with parallax effects, smooth scroll animations, and full responsiveness across all devices.

> 🌐 **Live Demo:** [abdulmomin.dev](https://abdulmomin-dev.vercel.app) *(or your deployed URL)*

---

## ✨ Features

- **Parallax Hero** — Background image responds to mouse movement for a depth effect.
- **Glassmorphism UI** — Frosted-glass cards with backdrop blur, subtle borders, and hover elevation.
- **Scroll-Reveal Animations** — Sections fade and slide into view via `IntersectionObserver`.
- **Grain Texture Overlay** — Subtle noise filter over the entire page for a premium tactile feel.
- **Responsive Grid Layouts** — Projects and skills sections use adaptive CSS grids (3 → 2 → 1 column).
- **Scroll-Aware Navigation** — Fixed nav bar gains background blur on scroll; mobile hamburger menu with full-screen overlay.
- **Custom Scrollbar** — Minimal, themed scrollbar consistent with the dark palette.
- **Optimized Build** — Vite-powered with TypeScript strict mode and tree-shaking.

---

## 🛠️ Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | React 19                          |
| Language    | TypeScript ~6.0                   |
| Build Tool  | Vite 8                            |
| Styling     | CSS3 (Custom Properties, Keyframes, Grid, Backdrop Filter) |
| Linting     | ESLint 10 + `typescript-eslint`   |
| Icons       | Inline SVG / HTML entities         |
| Deployment  | Vercel / Netlify / GitHub Pages   |

---

## 📁 Project Structure

```text
abdulmomin-cv/
├── index.html                 # Entry HTML with inline SVG favicon
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint flat config
├── package.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.tsx               # ReactDOM entry point
    ├── App.tsx                # All components + data (SKILLS, EXPERIENCE, PROJECTS, EDUCATION)
    ├── App.css                # Full stylesheet: theme variables, layout, animations, responsive
    ├── index.css              # Minimal base reset
    └── assets/
        ├── hero.png           # Hero background image
        └── 7733001d...jpg     # Secondary background asset
```

> **Note:** All components and data live in a single `App.tsx` file, making it straightforward to edit content without navigating multiple files.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn** or **pnpm**

### Install & Run

```bash
# Clone the repository
git clone https://github.com/AbdulMominn/my_portfolio.git
cd my_portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser — hot reload is enabled.

### Build for Production

```bash
npm run build     # Output → dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 🎨 Customization

### Content (Experience, Projects, Skills, Education)

All data is defined as constant arrays/objects at the top of `src/App.tsx`:

| Constant       | Description                        |
|----------------|------------------------------------|
| `SKILLS`       | Categorized skill tags             |
| `EXPERIENCE`   | Work/internship entries with bullets |
| `PROJECTS`     | Project cards with tags, description, tech |
| `EDUCATION`    | Degree entries                     |

Edit the data directly — components render automatically.

### Theme & Styling

Global design tokens are defined as CSS custom properties in `:root` inside `src/App.css`:

```css
:root {
    --bg: #0e120e;          /* Page background */
    --gold: #b8ba90;        /* Accent color */
    --green-light: #74885c; /* Secondary accent */
    --text-1: #f0ead8;      /* Primary text */
    --blur: blur(16px);     /* Glass blur radius */
    --radius: 16px;         /* Card border radius */
    /* ... */
}
```

### Background Image

Replace the hero background by updating the `background-image` URL in the `.hero-bg-parallax` class in `src/App.css` (line ~234). You can use a local asset or an external URL.

### SEO & Meta Tags

Update the `<title>` and add `<meta>` tags (description, Open Graph, Twitter Card) in `index.html` for better social sharing.

---

## 📱 Responsive Breakpoints

- **≤ 640px** — Single-column layouts, mobile nav overlay, smaller hero text.
- **641 – 900px** — 2-column grids for projects and skills.
- **> 900px** — Full 3-column desktop layout.

---

## 👤 Author

**Abdul Momin**  
Applied Computer Science — Karel de Grote Hogeschool, Antwerp

- [LinkedIn](https://www.linkedin.com/in/abdul-momin-1561b8203)
- [Email](mailto:abdulmominam7@gmail.com)
- [GitHub](https://github.com/AbdulMominn)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).