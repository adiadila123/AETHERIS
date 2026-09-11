# AETHERIS

AETHERIS explores the boundary between imagination and reality, turning the impossible into visuals — a cinematic portfolio experience for spatial architecture, worldbuilding, and speculative environments.

## Features

- **Hero experience** — full-screen looping video background with interactive parallax and ambient audio toggle.
- **Works archive** — curated project showcase with category filters (dropdown on mobile, pill tabs on desktop) and a detailed case-study modal per project.
- **Observatory** — an interactive atmosphere/lighting portal for exploring environment state (phase, bloom, ripple intensity, stardust, ring tilt, audio drone).
- **Synthesis Lab** — a speculative worldbuilding & architecture forge.
- **Navigation drawer & info modals** for studio sections and details.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/) for dev server and bundling
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for animations
- [lucide-react](https://lucide.dev/) for icons
- [Express](https://expressjs.com/) (server-side integration)
- [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini API)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values (e.g. Gemini API key) before running the app.

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:3000` by default.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Type checking / lint

```bash
npm run lint
```

## Project Structure

```
src/
├── App.tsx                 # App shell and top-level state
├── main.tsx                 # Entry point
├── index.css                 # Global styles
├── types.ts                   # Shared TypeScript types
├── data/
│   └── projects.ts             # Portfolio project data
└── components/
    ├── Navbar.tsx
    ├── NavigationDrawer.tsx
    ├── HeroContent.tsx
    ├── HeroVideoBackground.tsx
    ├── ScrollIndicator.tsx
    ├── ShowcaseModal.tsx        # Works archive with filters
    ├── ProjectDetailModal.tsx
    ├── ObservatoryModal.tsx
    ├── SynthesisLabModal.tsx
    └── InfoModal.tsx
```

## License

Apache-2.0
