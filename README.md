# Trello‑Clone — Technical README

A lightweight Trello‑style task board demo built with Next.js and TypeScript. This repository is intended as a learning
and starter project to explore modern frontend architecture, component design, and state management with Redux Toolkit.

---

## Overview

Trello‑Clone demonstrates a simple Board & Card system with features such as:

- Multiple boards containing lists of cards
- Adding boards and cards
- Component-driven structure with clear separation of concerns
- Centralized state management using Redux Toolkit

The goal is to provide a clean, engineering‑minded foundation for adding features and experimenting with Next.js +
TypeScript patterns.

---

## Architecture & Design Principles

- Next.js (App Router) for routing and server/client rendering
- TypeScript for static typing and developer ergonomics
- Redux Toolkit for predictable, testable state management
- Small, composable components that are easy to reuse and test
- Incremental, folder-based organization for scalability

---

## Tech stack

- Node.js (recommended >= 16)
- pnpm (recommended) or npm/yarn
- Next.js (App Router)
- React + TypeScript
- Redux Toolkit
- Sass for global styles

---

## Prerequisites

- Node.js >= 16
- pnpm (or npm/yarn). pnpm is recommended for this repository.

---

## Quickstart (PowerShell)

From the repository root run:

```powershell
# install dependencies
pnpm install

# run development server (hot reload)
pnpm dev

# build for production
pnpm build

# run production build locally
pnpm start
```

If using npm:

```powershell
npm install
npm run dev
```

The app runs by default at http://localhost:3000.

---

## Important scripts (package.json)

- `dev` — Next.js development server
- `build` — build for production
- `start` — run the production build
- `lint` — run ESLint (if configured)

Check `package.json` for the exact scripts.

---

## Project structure (key files)

- `app/` — top-level pages and layouts (Next.js App Router)
    - `page.tsx` — main page
    - `layout.tsx` — root layout and global styles
- `src/components/` — UI components
    - `boards/` — board and card components and subcomponents
        - `add-board-card/` — UI to add a new board
        - `add-new-card/` — UI to add a new card
        - `board/` — board view
        - `card/` — card view and comment modal
        - `list-actions/` — actions for lists/boards
    - `redux/ReduxProviderClient.tsx` — client provider wrapper for Redux
- `src/store/` — Redux slices and store configuration
    - `boardsSlice.ts` — state and reducers for boards/cards
    - `store.ts` — store setup
    - `selectors.ts`, `hooks.ts` — selectors and typed hooks
- `src/interfaces/` — TypeScript types and interfaces
- `public/` — static assets (images, icons, etc.)

This structure favors clarity and incremental growth.

---

## Developer notes

- Keep shared types in `src/interfaces/` to avoid duplication and improve type-safety.
- `src/store/boardsSlice.ts` centralizes board/card logic. Add new features by extending this slice or creating
  additional slices.
- Components are intentionally decoupled from external APIs to simplify local development and testing.

---

## Testing & linting

This repository does not include a test framework by default. Recommendations:

- Add Jest + React Testing Library for unit and component tests
- Use ESLint + Prettier for consistent code formatting

Example install command for testing tools (optional):

```powershell
pnpm add -D jest @testing-library/react @testing-library/jest-dom ts-jest
```

---

## Environment variables

There are no required environment variables in the current state. If you connect to an external API later, use
`.env.local` and follow Next.js environment variable conventions.

---

## Deployment

This app is ready to deploy to platforms like Vercel or any Node.js host:

- Vercel will auto-detect the Next.js project and App Router layout.
- On a custom server: `pnpm build` then `pnpm start`.

---

## Troubleshooting

- If the dev server doesn't start, check port 3000 and review terminal error messages.
- TypeScript issues: `pnpm exec tsc --noEmit` to surface type errors.
- Linting: `pnpm lint` (if configured).

---

## Short roadmap (suggested next features)

- Drag & drop between lists (e.g., react-beautiful-dnd or @dnd-kit)
- Persist data via a simple backend (JSON server, Firebase, or a lightweight REST API)
- Add unit & integration tests and CI (GitHub Actions)
- Authentication and multi-user support

---

## Contributing

Contributions are welcome. For small fixes, open a Pull Request. For larger changes, open an Issue first and describe
the proposed design.

---

## References

- Next.js docs: https://nextjs.org/docs
- Redux Toolkit docs: https://redux-toolkit.js.org/

---

If you want, I can:

- provide a bilingual README (English + Persian),
- add example code snippets for store usage and component patterns, or
- add CI/test configuration and badges.

Tell me which of these you'd like next and I will implement it.
